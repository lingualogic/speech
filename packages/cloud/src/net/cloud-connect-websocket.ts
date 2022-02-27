/** @packageDocumentation
 * Definiert die WebSocket-Verbindung zum Cloud-Service
 *
 * Letzte Aenderung: 23.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// cloud

import { ICloudPortConfig } from '../port/cloud-port-config.interface';
import { ICloudWebSocket } from './cloud-websocket.interface';
import { CloudConnect } from './cloud-connect';


/**
 * Dient zur Verbindungsaufnahme mit GCloud Credentials.
 */

export class CloudConnectWebSocket extends CloudConnect {


    // externe Komponente

    protected mWebSocket: ICloudWebSocket = null;
    protected mWebSocketOldOnErrorFunc: any = null;


    /**
     * Erzeugt eine Instanz von Connect
     *
     * @param aConfig - CloudGoogle Config Objekt
     */

    constructor( aConnectName: string, aConfig: ICloudPortConfig, aWebSocket: ICloudWebSocket ) {
        super( aConnectName || 'CloudConnectWebSocket', aConfig );
        // kann auch Null sein, wenn Server nicht vorhanden ist !
        this.mWebSocket = aWebSocket;
        if ( this.mWebSocket ) {
            this.mWebSocketOldOnErrorFunc = this.mWebSocket.onError;
        }
    }


    /**
     * Verbindungsaufbau mit CloudGoogle-Service.
     */

    protected _connect( aOption: any ): number {
        // console.log('CloudConnectWebSocket._connect:', aOption);
        // pruefen, ob WebSocket vorhanden ist
        if ( !this.mWebSocket ) {
            this.error( '_connect', 'keine WebSocket vorhanden') ;
            return -1;
        }
        // WebSocket Nachrichtenfunktion eintragen
        this.mWebSocket.onMessage = (aMessage: any) => {
            // console.log('CloudGoogleConnect.connect: onMessage = ', aMessage.data );
            if ( typeof aMessage.data === 'string' ) {
                // console.log('CloudConnectWebSocket.onMessage: String-Nachricht', aMessage);
                // Nachricht von CloudGoogle verarbeiten
                try {
                    const message = JSON.parse( aMessage.data );
                    // console.log('CloudConnectWebSocket: onMessage.data = ', message );
                    if ( aOption.onmessage ) {
                        aOption.onmessage( message );
                    } else {
                        this.error( '_connect.onMessage', 'keine Message-Funktion vorhanden') ;
                        return -1;
                    }
                } catch ( aException ) {
                    this.exception( '_connect.onMessage', aException );
                    return -1;
                }
            } else if ( typeof aMessage.data === 'object' ) {
                // console.log('CloudConnectWebSocket.onMessage: Objekt-Daten');
                if ( aOption.ondata ) {
                    aOption.ondata( aMessage.data );
                } else {
                    this.error( '_connect.onMessage', 'keine Daten-Funktion vorhanden') ;
                    return -1;
                }
            }
            return 0;
        };
        // TODO: notwendige Fehlerfunktion zum loeschen des ConnectFlags als Workaround
        // sollte spaeter einmal refaktorisiert werden
        this.mWebSocket.onError = (aError: any) => {
            // console.log('CloudConnectWebsocket._connect: webSocket.onError ', aError.message);
            // alte Fehlerfunktion aufrufen
            // console.log('CloudConnectWebSocket._connect: errorFunc = ',  this.mWebSocketOldOnErrorFunc);
            if ( typeof  this.mWebSocketOldOnErrorFunc === 'function' ) {
                this.mWebSocketOldOnErrorFunc( aError );
            }
            // pruefen auf Websocket-Close Error
            if ( aError.message === 'WebSocket wurde nicht vom Client geschlossen' || 
                 aError.message === 'CloudFraunhoferWebSocket.sendMessage: WebSocket ist nicht verbunden' ) {
                this.mConnectFlag = false;
                // Disconnect-Signal senden, wenn Server Verbindung abgebrochen hat
                if ( typeof this.onDisconnect === 'function' ) {
                    this.onDisconnect();
                }
            }
            return 0;
        } 
        return 0;
    }


    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */

    _disconnect(): number {
        if ( this.mWebSocket ) {
            this.mWebSocket.onMessage = null;
        }
        return 0;
    }


    // Data Helpers


    sendJSON( aMessage: any ): number {
        // console.log('CloudConncectWebSocket.sendJson: start ', this.mWebSocket);
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
