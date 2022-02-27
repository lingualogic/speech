/** @packageDocumentation
 * Definiert die Verbindung zum Cloud-Service
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// cloud

import { ICloudPortConfig } from '../port/cloud-port-config.interface';
import { ICloudConnect } from './cloud-connect.interface';
export { ICloudConnect };


/**
 * Dient zur Verbindungsaufnahme mit GCloud Credentials.
 */

export class CloudConnect extends ErrorBase implements ICloudConnect {


    // innere Komponenten

    protected mConfig: ICloudPortConfig = null;


    // Verbindung vorhanden

    protected mConnectFlag = false;


    // Event-Funktionen

    onDisconnect: () => void = null;


    /**
     * Erzeugt eine Instanz von Connect
     *
     * @param aConfig - CloudGoogle Config Objekt
     */

    constructor( aConnectClassName: string, aConfig: ICloudPortConfig ) {
        super( aConnectClassName || 'CloudConnect' );
        this.mConfig = aConfig;
    }


    // Verbindungs-Funktionen

    isConnect(): boolean {
        return this.mConnectFlag;
    }


    /**
     * Wird nur zu Beginn der Websocket-Verbindung gesendet
     * 
     * @returns Fehlercode 0 oder -1
     */

     protected _sendFirstMessage( isConnectFlag: boolean ): number {
        // kann von erbenden Klassen ueberschrieben werden
        return 0;
    }


    /**
     * interne Connect-Funktion
     * 
     * @param aOption 
     * @returns Fehlerciode 0 oder -1
     */

    protected _connect( aOptioin: any ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }    

    
    /**
     * Verbindungsaufbau mit CloudGoogle-Service.
     */

    connect( aOption: any ): number {
        // Initialize the CloudGoogle Cognito credentials provider
        // console.log('CloudConnect: isConnect = ', this.isConnect());
        if ( this.isConnect()) {
            // neue erste Nachricht senden, bei bestehender Verbindung
            if ( this._sendFirstMessage( true ) !== 0 ) {
                this.error('connect', 'Fehler beim Senden von FirstMessage');
                return -1;
            }
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        try {
            const result = this._connect( aOption );
            // console.log('CloudConnect.connect: _connect = ', result);
            if ( result !== 0 ) {
                return result;
            }
            // notwendig erste Nachricht vor der Nutzung der ASR

            if ( this._sendFirstMessage( false ) !== 0 ) {
                this.error('connect', 'Fehler beim Senden von FirstMessage');
                return -1;
            }
            this.mConnectFlag = true;
            return 0;
        } catch ( aException ) {
            console.log('CloudConnect.connect: Exception = ', aException);
            this.exception( 'connect', aException );
            return -1;
        }
    }



    /**
     * interne Disconnect-Funktion
     * @returns Fehlercode 0 oder -1
     */

    protected _disconnect(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */

    disconnect(): number {
        this.mConnectFlag = false;
        try {   
            return this._disconnect();
        } catch ( aException ) {
            this.exception( 'connect', aException );
            return -1;
        }
    }


    // Data Helpers


    sendJSON( aMessage: any ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * Html5-WebSocket zurueckgeben
     */

    get webSocket() {
        // muss von erbenden Klassen ueberschrieben werden
        return null;
    }

}
