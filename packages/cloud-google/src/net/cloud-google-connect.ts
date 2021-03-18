/** @packageDocumentation
 * Definiert die Verbindung zum CloudGoogle-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// cloud-google

import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleWebSocket } from './cloud-google-websocket';


/**
 * Dient zur Verbindungsaufnahme mit GCloud Credentials.
 */

export class CloudGoogleConnect extends ErrorBase {


    // innere Komponenten

    private mConfig: CloudGoogleConfig = null;

    // externe Komponente

    private mWebSocket: CloudGoogleWebSocket = null;


    // Verbindung vorhanden

    private mConnectFlag = false;


    /**
     * Erzeugt eine Instanz von Connect
     *
     * @param aConfig - CloudGoogle Config Objekt
     */

    constructor( aConfig: CloudGoogleConfig, aWebSocket: CloudGoogleWebSocket ) {
        super( 'CloudGoogleConnect' );
        this.mConfig = aConfig;
        // kann auch Null sein, wenn Server nicht vorhanden ist !
        this.mWebSocket = aWebSocket;
    }


    // Verbindungs-Funktionen

    isConnect(): boolean {
        return this.mConnectFlag;
    }


    /**
     * Verbindungsaufbau mit CloudGoogle-Service.
     */

    connect( aOption: any ): number {
        // Initialize the CloudGoogle Cognito credentials provider
        // console.log('CloudGoogleConnect: onMessage einbinden');
        if ( this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        // pruefen, ob WebSocket vorhanden ist
        if ( !this.mWebSocket ) {
            this.mConnectFlag = true;
            return 0;
        }
        // WebSocket Nachrichtenfunktion eintragen
        try {
            this.mWebSocket.onMessage = (aMessage: any) => {
                // console.log('CloudGoogleConnect.connect: onMessage = ', aMessage.data );
                if ( typeof aMessage.data === 'string' ) {
                    console.log('CloudGoogleConnect.onMessage: String-Nachricht');
                    // Nachricht von CloudGoogle verarbeiten
                    try {
                        const message = JSON.parse( aMessage.data );
                        // console.log('CloudGoogleConnect: onMessage.data = ', message );
                        if ( aOption.onmessage ) {
                            aOption.onmessage( message );
                        } else {
                            this.error( 'connect.onMessage', 'keine Message-Funktion vorhanden') ;
                        }
                    } catch ( aException ) {
                        this.exception( 'connect.onMessage', aException );
                        return -1;
                    }
                } else if ( typeof aMessage.data === 'object' ) {
                    console.log('CloudGoogleConnect.onMessage: Objekt-Daten');
                    if ( aOption.ondata ) {
                        aOption.ondata( aMessage.data );
                    } else {
                        this.error( 'connect.onMessage', 'keine Daten-Funktion vorhanden') ;
                    }
                }
                return 0;
            };
            // pruefen auf Credentials
            this.mConnectFlag = true;
            return 0;
        } catch ( aException ) {
            this.exception( 'connect', aException );
            return -1;
        }
    }


    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */

    disconnect(): number {
        this.mConnectFlag = false;
        if ( this.mWebSocket ) {
            this.mWebSocket.onMessage = null;
        }
        return 0;
    }


    // Data Helpers


    sendJSON( aMessage: any ): number {
        if ( this.mWebSocket ) {
            return this.mWebSocket.sendMessage( aMessage );
        }
        return -1;
    }


    /**
     * Html5-WebSocket zurueckgeben
     */

    get webSocket() {
        if ( this.mWebSocket ) {
            return this.mWebSocket.webSocket;
        }
        return null;
    }

}
