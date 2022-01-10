/** @packageDocumentation
 * Die NetWork-Komponente dient zum testen einer Internet-Verbindung (online/offline)
 *
 * Letzte Aenderung: 07.07.2021
 * Status: rot
 *
 * @module net
 * @author SB
 */


// core

import { ErrorBase, FactoryManager } from '@speech/core';


// net

import { OnNetOnlineFunc, OnNetOfflineFunc, OnNetErrorFunc } from './net-function.type';
import { INetBaseConnect } from './connect/net-base-connect.interface';
import { NetBaseConnectFactory, NETCONNECT_FACTORY_NAME } from './connect/net-base-connect-factory';


/**
 * Die Net Klasse kapselt eine Internet
 */

export class NetConnect extends ErrorBase {


    private mInitFlag = false;

    // Ereignisse

    private mOnOnlineFunc: OnNetOnlineFunc = null;
    private mOnOfflineFunc: OnNetOfflineFunc = null;
    private mOnErrorFunc: OnNetErrorFunc = null;


    // inneres Connect-Objekt

    private mBaseConnectFactory: NetBaseConnectFactory = null;
    private mBaseConnect: INetBaseConnect = null;


    /**
     * Creates an instance of Net-WebSocket.
     *
     * @param {string} aClassName - Name der erbenden Klasse
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'NetConnect' );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
        this.mBaseConnectFactory = FactoryManager.get( NETCONNECT_FACTORY_NAME, NetBaseConnectFactory ) as NetBaseConnectFactory;
    }


    /**
     * Initialisierung
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('NetHtml5Connect.init:', aOption);

        // einlesen des BaseConnect-Singletons

        try {
            if ( !this.mBaseConnectFactory ) {
                return -1;
            }
            this.mBaseConnect = this.mBaseConnectFactory.create();
            if ( !this.mBaseConnect ) {
                return -1;
            }
            // einfuegen der Funktionen in die Ereignisse
            this.mBaseConnect.addOnlineEvent( this._getErrorClassName(), () => this._onOnline());
            this.mBaseConnect.addOfflineEvent( this._getErrorClassName(), () => this._onOffline());
            this.mBaseConnect.addErrorEvent( this._getErrorClassName(), (aError: any) => this._onError( aError ));
        } catch ( aException ) {
            this.exception( 'init', aException );
            return -1;
        }

        this.mInitFlag = true;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * Freigabe
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        // entfernen der Funktionen aus den Ereignissen
        if ( this.mBaseConnect ) {
            this.mBaseConnect.removeAllEvent( this._getErrorClassName());
        }
        this.mBaseConnect = null;
        this.mOnOnlineFunc = null;
        this.mOnOfflineFunc = null;
        this.mOnErrorFunc = null;
        this.mInitFlag = false;
        return 0;
    }


    isOnline(): boolean {
        if ( this.mBaseConnect ) {
            return this.mBaseConnect.isOnline();
        }
        return false;
    }


    // Events eintragen


    /**
     * Event-Funktion fuer Online
     *
     * @param {function} aOnOnlineFunc - Ereignis fuer Online
     */

    set onOnline( aOnOnlineFunc: OnNetOnlineFunc ) {
        this.mOnOnlineFunc = aOnOnlineFunc;
    }


    /**
     * Event-Funktion fuer Offline
     *
     * @param {function} aOnOfflineFunc - Ereignis fuer Offline
     */

    set onOffline( aOnOfflineFunc: OnNetOfflineFunc ) {
        this.mOnOfflineFunc = aOnOfflineFunc;
    }


    /**
     * Error-Event Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnErrorFunc
     */

    set onError( aOnErrorFunc: OnNetErrorFunc ) {
        // console.log('NetHtml5WebSocket.onError:', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
    }


    // Event-Funktionen


    /**
     * Online-Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onOnline(): number {
        // console.log('NetHtml5Connect._onOnline');
        if ( typeof this.mOnOnlineFunc === 'function' ) {
            try {
                return this.mOnOnlineFunc();
            } catch ( aException ) {
                this.exception( '_onOnline', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Offline-Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onOffline(): number {
        // console.log('NetHtml5Connect._onOffline');
        if ( typeof this.mOnOfflineFunc === 'function' ) {
            try {
                return this.mOnOfflineFunc();
            } catch ( aException ) {
                this.exception( '_onOffline', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */

    protected _onError( aError: any ): number {
        // console.log('NetHtml5Connect._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                return this.mOnErrorFunc( aError );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this.exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION NetConnect._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }

}
