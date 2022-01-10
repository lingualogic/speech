/** @packageDocumentation
 * Diese Komponente dient zum Aufbau und zur Verwaltung einer Browser/NodeJS-WebSocket-Verbindung
 * mit dem SpeechServer.
 *
 * Letzte Aenderung: 07.07.2021
 * Status: rot
 *
 * @module net
 * @author SB
 */


// net

import { NET_WEBSOCKET_TYPE, NET_WEBSOCKET_NAME, NET_WEBSOCKET_URL } from './net-const';
import { NetBaseWebSocket } from './websocket/net-base-websocket';
import { NetBaseManager } from './websocket/net-base-manager';
import { NetPlugin } from './net-plugin';


/* Kommentar: NetOptions
 *
 * Beim Aufruf von init(options) koennen optionale Werte zur Konfiguration uebergeben werden.
 * Zur Zeit wird ein optionaler Wert fuer die Verbindungswiederholung uebergeben:
 *
 *      netOptions: { connectInfiniteFlag: true }
 *
 *      connectInfiniteFlag - true, wenn Verbindung alle NET_CONNECT_INTERVAL Millisekunden erneut
 *                            aufgebaut werden soll.
 *                            Defaultwert ist false.
 */


/**
 * Die Net Klasse kapselt eine HTML5-WebSocket
 */

export class NetWebSocket extends NetPlugin {


    // innere Html5-WebSocket Implementierung

    private mBaseWebSocket: NetBaseWebSocket = null;


    /**
     * Creates an instance of NetWebSocket.
     */

    constructor( aPluginName?: string, aRegisterFlag = false ) {
        super( aPluginName || NET_WEBSOCKET_NAME, aRegisterFlag );
        // console.log('NetWebSocket: start getBaseWebSocket');
        this.mBaseWebSocket = NetBaseManager.getBaseWebSocket( aPluginName || NET_WEBSOCKET_NAME ) as NetBaseWebSocket;
        // console.log('NetWebSocket: end getBaseWebSocket');
        // Event-Funktionen eintragen
        this.mBaseWebSocket.onError = this.onError;
        this.mBaseWebSocket.onOpen = this.onOpen;
        this.mBaseWebSocket.onClose = this.onClose;
        this.mBaseWebSocket.onMessage = (aMessage: any) => this._onWebSocketMessage( aMessage );
    }


    getClass(): string {
        return 'NetWebSocket';
    }


    /**
     * Rueckgabe des Net-Typs
     *
     * @returns {string} netType
     */

    getType(): string {
        return NET_WEBSOCKET_TYPE;
    }


    /**
     * Initialisierung der WebSocket-Verbindung
     *
     * @param {Object} aOptions - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOptions?: any ): number {
        // console.log('SpeechNet.init:', aNetOptions);

        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this.error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // NetHtml5WebSocket initialisieren

        if ( this.mBaseWebSocket.init( aOptions ) !== 0 ) {
            return -1;
        }

        return super.init( aOptions );
    }


    /**
     * WebSocket schliessen
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        try {
            this.close();
            this.mBaseWebSocket.done();
            return super.done();
        } catch ( aException ) {
            this.exception( 'done', aException );
            return -1;
        }
    }


    // Error-Funktionen


    setErrorOutput( aOutputFlag: boolean): void {
        super.setErrorOutput( aOutputFlag );
        this.mBaseWebSocket.setErrorOutput( aOutputFlag );
    }


    // Message-Funktionen


    /**
     * Rohe WebSocket-Message empfange und als bearbeitete Nachricht weiterreichen
     *
     * @private
     * @param {*} aMessage - roher MessageEvent von der WebSocket
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onWebSocketMessage( aMessage: any ): number {
        // console.log('NetWebSocket._onWebSocketMesseagee:', aMessage);
        if ( typeof this.mOnMessageFunc === 'function' ) {
            try {
                return this.mOnMessageFunc( JSON.parse( aMessage.data ));
            } catch ( aException ) {
                this.exception( '_onWebSocketMessage', aException );
                return -1;
            }
        }
        return 0;
    }


    // WebSocket-Funktionen


    /**
     * WebSocket-Verbindung aufbauen
     *
     * @return {number} errorCode (0,-1)
     */

    open( aUrl?: string ): number {
        if ( !this.isInit()) {
            this.error( 'open', 'nicht initialisiert' );
            return -1;
        }

        if ( this.mBaseWebSocket.isOpen()) {
            this.error( '.open', 'bereits geoeffnet' );
            return -1;
        }

        // erste Verbindung aufbauen

        let webSocketUrl = NET_WEBSOCKET_URL;
        if ( aUrl ) {
            webSocketUrl = aUrl;
        }
        if ( this.mBaseWebSocket.open( webSocketUrl ) !== 0 ) {
            this.error( 'open', 'keine Verbindung moeglich' );
            return -1;
        }

        return 0;
    }


    /**
     * WebSocket-Verbindung beenden
     *
     * @return {number} errorCode (0,-1)
     */

    close(): number {
        return this.mBaseWebSocket.close();
    }


    /**
     * pruefen auf geoeffnete WebSocket-Verbindung mit dem SpeechServer
     *
     * @return {boolean} true, wenn WebSocket verbunden
     */

    isOpen(): boolean {
        return this.mBaseWebSocket.isOpen();
    }


    /**
     * Rueckgabe des WebSocket-Zustands als TEXT
     */

    getState(): string {
        return this.mBaseWebSocket.getState();
    }


    /**
     * Nachricht als JSON-Objekt versenden
     *
     * @param {Object} aMessage
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendMessage( aMessage: any ): number {
        // console.log('NetWebSocket.sendMessage: start');
        if ( this.isOpen()) {
            return this.mBaseWebSocket.sendMessage( aMessage );
        }
        return -1;
    }

}
