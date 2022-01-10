/** @packageDocumentation
 * Die NetConnect-Komponente dient zum testen einer Internet-Verbindung (online/offline) fuer den Browser
 * Bei NodeJS wird immer eine bestehende Internet-Verbindung vorausgesetzt.
 * Hybrid aus Plugin und Component ohne Erben von Plugin oder Component
 *
 * Letzte Aenderung: 07.07.2021
 * Status: rot
 *
 * @module net/connect
 * @author SB
 */


// core

import { ErrorBase, EventFunctionList, EventFunc } from '@speech/core';


// net

import { NET_ONLINE_EVENT, NET_OFFLINE_EVENT, NET_ERROR_EVENT } from './../net-event-const';
import { OnNetOnlineFunc, OnNetOfflineFunc, OnNetErrorFunc } from './../net-function.type';
import { INetBaseConnect } from './net-base-connect.interface';


// Konstanten

export const NET_CONNECT_NAME = 'NetConnect';


/**
 * Die Net Klasse kapselt eine Internet
 */

export class NetBaseConnect extends ErrorBase implements INetBaseConnect {


    protected mInitFlag = false;

    // Events

    private mOnlineEvent = new EventFunctionList( NET_ONLINE_EVENT, NET_CONNECT_NAME );
    private mOfflineEvent = new EventFunctionList( NET_OFFLINE_EVENT, NET_CONNECT_NAME );
    private mErrorEvent = new EventFunctionList( NET_ERROR_EVENT, NET_CONNECT_NAME );


    /**
     * Creates an instance of Net-WebSocket.
     *
     * @param {string} aClassName - Name der erbenden Klasse
     */

    constructor( aClassName?: string ) {
        super( aClassName || NET_CONNECT_NAME );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.mOnlineEvent.setComponentName( aClassName || NET_CONNECT_NAME );
        this.mOfflineEvent.setComponentName( aClassName || NET_CONNECT_NAME );
        this.mErrorEvent.setComponentName( aClassName || NET_CONNECT_NAME );
        // TODO: _getErrorOutputFunc muss noch implementiert werden (Plugin)
        // this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
        // this.mOnlineEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        // this.mOfflineEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        // this.mOfflineEvent.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Initialisieurng fuer Verbindungspruefung
     * 
     * @returns 0 oder -1
     */

     protected _initConnect(): number {
        // muss von erbenden Klassen ueberschrieben werden 
        return 0;
    }


    /**
     * Initialisierung
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('NetConnect.init:', aOption);

        // Verbindungspruefung einrichten

        if ( this._initConnect() !== 0 ) {
            return -1;
        }

        this.mInitFlag = true;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }

    
    getRuntimeType(): string {
        return 'undefined';
    }


    /**
     * Freigabe
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        // alle Events loeschen

        this.mOnlineEvent.clear();
        this.mOfflineEvent.clear();
        this.mErrorEvent.clear();
        this.mInitFlag = false;
        return 0;
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

     setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        this.mOnlineEvent.setErrorOutput( aErrorOutputFlag );
        this.mOfflineEvent.setErrorOutput( aErrorOutputFlag );
        this.mErrorEvent.setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Online
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onOnline(): number {
        // console.log('NetConnect._onOnline');
        return this.mOnlineEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Offline
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onOffline(): number {
        // console.log('NetConnect._onOffline');
        return this.mOfflineEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Error
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onError(): number {
        // console.log('NetConnect._onError');
        return this.mErrorEvent.dispatch();
    }


    /**
     * Rueckgabe der Online-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onOnline() {
        return () => this._onOnline();
    }


    /**
     * Rueckgabe der Offline-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onOffline() {
        return () => this._onOffline();
    }


    /**
     * Rueckgabe der Error-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onError() {
        return () => this._onError();
    }


    /**
     * EventFunktion eintragen
     *
     * @param {string} aPluginName - Name des Listeners
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorcode(0,-1)
     */

    addEventListener( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number {
        // console.log('BaseComponent.addEventListener:', aPluginName, aEventName, aEventFunc);
        let result = 0;
        switch ( aEventName ) {
            case NET_ONLINE_EVENT:
                result = this.mOnlineEvent.addListener( aPluginName, aEventFunc );
                break;

            case NET_OFFLINE_EVENT:
                result = this.mOfflineEvent.addListener( aPluginName, aEventFunc );
                break;

            case NET_ERROR_EVENT:
                result = this.mErrorEvent.addListener( aPluginName, aEventFunc );
                break;
    
            default:
                this.error('addEventListener', 'kein gueltiger Event');
                result = -1;
                break;
        }
        return result;
    }


    /**
     * EventFunktion entfernen
     *
     * @param {string} aPluginName - Name des Listeners (Pluginname)
     * @param {string} aEventName - Name des Events
     */

    removeEventListener( aPluginName: string, aEventName: string ): number {
        let result = 0;
        switch ( aEventName ) {
            case NET_ONLINE_EVENT:
                result = this.mOnlineEvent.removeListener( aPluginName );
                break;

            case NET_OFFLINE_EVENT:
                result = this.mOfflineEvent.removeListener( aPluginName );
                break;

            case NET_ERROR_EVENT:
                result = this.mErrorEvent.removeListener( aPluginName );
                break;
    
            default:
                this.error('removeEventListener', 'kein gueltiger Event');
                result = -1;
                break;
        }
        return result;
    }


    addOnlineEvent( aPluginName: string, aEventFunc: OnNetOnlineFunc ): number {
        return this.addEventListener( aPluginName, NET_ONLINE_EVENT, aEventFunc );
    }

    addOfflineEvent( aPluginName: string, aEventFunc: OnNetOfflineFunc ): number {
        return this.addEventListener( aPluginName, NET_OFFLINE_EVENT, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnNetErrorFunc ): number {
        return this.addEventListener( aPluginName, NET_ERROR_EVENT, aEventFunc );
    }


    removeOnlineEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, NET_ONLINE_EVENT );
    }

    removeOfflineEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, NET_OFFLINE_EVENT );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, NET_ERROR_EVENT );
    }

    removeAllEvent( aPluginName: string ): number {
        if ( !aPluginName ) {
            this.error('removeAllEvent', 'kein Pluginname uebergeben');
            return -1;
        }
        this.removeOnlineEvent( aPluginName );
        this.removeOfflineEvent( aPluginName );
        this.removeErrorEvent( aPluginName );
        return 0;
    }


    // Connect-Funktionen


    /**
     * Explizites Anstossen einer weiteren Internet-Pruefung
     */

    checkConnect(): Promise<any> {
        // muss von erbenden Klassen ueberschrieben werden
        return new Promise((resolve, reject) => { resolve( this.isOnline())});
    }


    isOnline(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return true;
    }

}
