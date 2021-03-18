/** @packageDocumentation
 * CloudGoogle Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { ErrorBase, PortTransaction } from '@speech/core';


// cloud-google

import { CLOUDGOOGLE_DEFAULT_LANGUAGE, CLOUDGOOGLE_DEFAULT_VOICE, CLOUDGOOGLE_DEFAULT_CODEC } from '../cloud-google-const';
import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleConnect } from '../net/cloud-google-connect';


/**
 * Basisklasse akller CloudGoogle-Geraete
 */

export class CloudGoogleDevice extends ErrorBase {

    // initialisierung

    protected mInitFlag = false;

    // innere Komponenten

    protected mConfig: CloudGoogleConfig = null;
    protected mConnect: CloudGoogleConnect = null;


    // Transaktion

    protected mTransaction: PortTransaction = null;


    // Event-Funktionen

    onStart: (aTransaction: PortTransaction) => void = null;
    onStop: (aTransaction: PortTransaction) => void = null;
    onResult: (aTransaction: PortTransaction) => void = null;
    onError: (aTransaction: PortTransaction) => void = null;
    onClose: (aTransaction: PortTransaction) => void = null;


    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aDeviceName: string, aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect ) {
        super( aDeviceName || 'CloudGoogleDevice' );
        this.mConfig = aConfig;
        this.mConnect = aConnect;
        this.mInitFlag = true;
        this.setErrorOutput( aConfig.isErrorOutput());
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    clearToken(): void {
        // muss von erbenden Klassen ueberschrieben werden
    }

    // Event-Funktionen


    /**
     * StartEvent und Beginn der Transaktion
     *
     * @protected
     */

    protected _onStart(): number {
        // console.log('CloudGoogleDevice._onStart');
        if ( this.mTransaction && this.onStart ) {
            this.onStart( this.mTransaction );
        }
        return 0;
    }


    /**
     * Stop-Event und Ende der Transaktion
     *
     * @protected
     */

    protected _onStop(): number {
        // console.log('CloudGoogleDevice._onStop:', this.mTransaction, this.onStop );
        if ( this.mTransaction && this.onStop ) {
            this.onStop( this.mTransaction );
        }
        // Transaktion wird geloescht
        this.mTransaction = null;
        return 0;
    }


    /**
     * Ergebnis Event
     *
     * @protected
     * @param aResult- Ergebnis von CloudGoogle
     */

    protected _onResult( aResult: any ): number {
        if ( this.mTransaction && this.onResult ) {
            this.mTransaction.result = aResult;
            this.onResult( this.mTransaction );
        }
        return 0;
    }


    /**
     * Fehler-Event
     *
     * @protected
     * @param aError
     */

    protected _onError( aError: any ): number {
        if ( this.mTransaction && this.onError ) {
            this.mTransaction.error = aError;
            this.onError( this.mTransaction );
        }
        return 0;
    }


    /**
     * WebSocket schliessen Event, deutet auf einen Fehler hin
     *
     * @protected
     */

    protected _onClose(): number {
        if ( this.mTransaction && this.onClose ) {
            this.onClose( this.mTransaction );
        }
        return 0;
    }


    /**
     * Initialisierung der Geraete Optionen
     *
     * @protected
     *
     * @return {any} Default Optionen fuer die NLU
     */

    // TODO: wird in CloudGoogle nicht gebraucht
    /****
    protected _getDefaultOption(): any {
        // console.log('NuanceASR._getDefaultOption: start');
        const defaultOption = {

            onopen: () => {
                // console.log( 'NuanceNLU: Service verbunden' );
                this._onStart();
            },

            onclose: () => {
                // console.log( 'NuanceNLU: Websocket Closed' );
                this._onClose();
                this._onStop();
            },

            onerror: (aError: any) => {
                // console.error('NuanceNLU._getDefaultOption: error = ', aError);
                this._onError( aError );
                this._onStop();
            }

        };
        return defaultOption;
    }
    ****/

    // TODO: wird in CloudGoogle nicht gebraucht
    /****
    _createOption( aOverrideOption: any): any {
        // console.log( 'NuanceNLU._createOption:', aOverrideOption );
        const option = Object.assign( aOverrideOption, this._getDefaultOption());
        option.appId = aOverrideOption.appId || this.mConfig.appId || '';
        option.appKey = aOverrideOption.appKey || this.mConfig.appKey || '';
        option.userId = aOverrideOption.userId || this.mConfig.userId;
        option.tag = aOverrideOption.tag || this.mConfig.nluTag || '';
        option.language = aOverrideOption.language || CLOUDGOOGLE_DEFAULT_LANGUAGE;
        option.text = aOverrideOption.text || '';
        option.voice = aOverrideOption.voice || CLOUDGOOGLE_DEFAULT_VOICE;
        option.codec = aOverrideOption.codec || CLOUDGOOGLE_DEFAULT_CODEC;
        return option;
    }
    ****/


    // Nachrichten senden


    // TODO: wird in CloudGoogle nicht gebraucht
    /****
    _sendQueryEndMessage( aTransactionId: number ): number {
        const queryEndMessage = {
            'message': 'query_end',
            'transaction_id': aTransactionId
        };
        return this.mConnect.sendJSON( queryEndMessage );
    }
    ****/


    // Geraete-Funktionen


    /**
     * Interne Geraete Startfunktion
     *
     * @protected
     * @param {*} aOption - optionale Parameter
     */

    protected _start( aOption: any ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */

    protected _stop(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * Geraeteaktion starten
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aTransaction: PortTransaction, aOption?: any ): number {
        // console.log('CloudGoogleDevice.start:', aTransaction, aOption);
        if ( !aTransaction ) {
            this.error( 'start', 'keine Transaktion uebergeben' );
            return -1;
        }
        // pruefen auf vorhandene Transaktion
        if ( this.mTransaction ) {
            this.error( 'start', 'vorherige Transaktion nicht beendet' );
            return -1;
        }
        // Transaktion eintragen
        this.mTransaction = aTransaction;
        try {
            if ( this._start( aOption ) !== 0 ) {
                this.mTransaction = null;
                return -1;
            }
            return 0;
        } catch ( aException ) {
            this.exception( 'start', aException );
            return -1;
        }
    }


    /**
     * Geraeteaktion beenden
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop( aTransaction: PortTransaction ): number {
        // console.log('CloudGoogleDevice.stop:', aTransaction);
        if ( !aTransaction ) {
            this.error( 'stop', 'keine Transaktion uebergeben' );
            return -1;
        }
        // pruefen auf vorhandene Transaktion
        if ( !this.mTransaction ) {
            this.error( 'stop', 'keine Transaktion gestartet' );
            return -1;
        }
        // pruefen auf gleiche Transaktion
        if ( this.mTransaction.transactionId !== aTransaction.transactionId ) {
            this.error( 'stop', 'Transaktions-ID stimmt nicht ueberein' );
            return -1;
        }
        try {
            this._stop();
            return 0;
        } catch ( aException ) {
            this.exception( 'stop', aException );
            return -1;
        }
    }


    /**
     * pruefen auf vorhandene Transaktion
     */

    isTransaction(): boolean {
        if ( this.mTransaction ) {
            return true;
        }
        return false;
    }


    /**
     * Transaktion zurueckgeben
     */

    getTransaction(): PortTransaction {
        return this.mTransaction;
    }


    /**
     * Transaktion loeschen
     */

    clearTransaction(): void {
        this.mTransaction = null;
    }

}
