/** @packageDocumentation
 * Diese Komponente dient zum Aufbau und zur Verwaltung einer WebSocket-Verbindung
 * mit dem SpeechServer.
 *
 * Letzte Aenderung: 04.07.2021
 * Status: rot
 *
 * @module net/websocket
 * @author SB
 */


// core

import { ErrorBase, FactoryManager } from '@speech/core';


// net

import { WebSocketFactory, WEBSOCKET_FACTORY_NAME } from './../common/websocket-factory';
import { OnNetOpenFunc, OnNetCloseFunc, OnNetMessageFunc, OnNetErrorFunc } from './../net-function.type';
import { INetBaseWebSocket } from './net-base-websocket.interface';
export { INetBaseWebSocket };


// Konstanten

/** Zeitintervall fuer Verbindung erneut aufbauen */
export const NET_CONNECTINTERVAL_TIMEOUT = 5000;


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;
declare type WebSocket = any;


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
 * Die Net Klasse kapselt eine Base-WebSocket
 */

export class NetBaseWebSocket extends ErrorBase implements INetBaseWebSocket {

    mRuntimeType = 'undefined';


    /**
     * WebSocket-Klasse
     * @member {Object} mWebSocketClass
     * @private
     */

    protected mWebSocketClass: any = null;


    // WebSocket

    protected mWebSocketUrl = '';
    protected mWebSocket: WebSocket = null;
    protected mWebSocketOpenFlag = false;


    // Verbindungswiederholungen

    protected mConnectInfiniteFlag = false;
    protected mConnectIntervalId: any = 0;
    protected mConnectIntervalTimeout = NET_CONNECTINTERVAL_TIMEOUT;


    // Ereignisse

    protected mOnOpenFunc: OnNetOpenFunc = null;
    protected mOnCloseFunc: OnNetCloseFunc = null;
    protected mOnMessageFunc: OnNetMessageFunc = null;
    protected mOnErrorFunc: OnNetErrorFunc = null;


    /**
     * Creates an instance of Net-WebSocket.
     *
     * @param {string} aClassName - Name der erbenden Klasse
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'NetBaseWebSocket' );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));
        // festlegen des Runtime-Typs
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            this.mRuntimeType = 'node';
        } else if ( typeof window !== 'undefined' ) {
            this.mRuntimeType = 'browser';
        }
    }


    /**
     * Asynchrone Initialisierung der WebSocket-Factory
     * muss vor init() einmalig aufgerufen werden
     */

    // TODO: eventuell noch nicht an der richtigen Stelle

    static async initFactory(): Promise<boolean> {
        // pruefen, ob Factory bereits vorhanden ist

        if ( FactoryManager.find( WEBSOCKET_FACTORY_NAME )) {
            return true;
        }

        // Initialisierung der WebSocketFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen

        const webSocketFactory = FactoryManager.get( WEBSOCKET_FACTORY_NAME, WebSocketFactory ) as WebSocketFactory;
        if ( !webSocketFactory ) {
            console.log( 'NetBaseWebSocket.initFactory: keine WebSocket-Fabrik vorhanden' );
            return false;
        }

        // asynchrones erzeugen der WebSocket-Klasse

        if ( !await webSocketFactory.createAsync()) {
            console.log( 'NetBaseWebSocket.initFactory: keine WebSocket-Klasse vorhanden' );
            return false;
        }
        return true;
    }


    /**
     * Initialisierung der WebSocket-Verbindung (asynchron!)
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ) {
        // console.log('NetBaseWebSocket.init: start', aOption);

        // pruefen auf vorhandenen WebSocket

        if ( !this._detectWebSocket()) {
            return -1;
        }

        // pruefen auf staendigen Verbindungsaufbau

        if ( aOption && aOption.connectInfiniteFlag ) {
            this.mConnectInfiniteFlag = true;
            if ( this.isErrorOutput()) {
                console.log('NetBaseWebSocket.init: ConnectInfinite eingeschaltet');
            }
        }

        // console.log('NetBaseWebSocket.init: end');
        return 0;
    }


    /**
     * WebSocket schliessen
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        if ( this.mWebSocket ) {
            this.mWebSocket.onopen = null;
            this.mWebSocket.onclose = null;
            this.mWebSocket.onmessage = null;
            this.mWebSocket.onerror = null;
            this.close();
            this.mWebSocket = null;
        }
        this.mWebSocketOpenFlag = false;
        this.mWebSocketClass = null;
        this.mWebSocketUrl = '';
        this.mConnectInfiniteFlag = false;
        this.mConnectIntervalId = 0;
        this.mConnectIntervalTimeout = NET_CONNECTINTERVAL_TIMEOUT;

        // Ereignisse

        this.mOnOpenFunc = null;
        this.mOnCloseFunc = null;
        this.mOnMessageFunc = null;
        this.mOnErrorFunc = null;

        return 0;
    }


    isInit(): boolean {
        if ( this.mWebSocketClass ) {
            return true;
        }
        return false;
    }


    getRuntimeType(): string {
        return this.mRuntimeType;
    }


    /**
     * Feststellen, ob WebSocket API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn WebSocket existiert, false sonst
     */

    protected _detectWebSocket() {
        // console.log('NetBrowserWebSocket._detectWebSocket:', window.WebSocket);

        // Initialisierung der WebSocketFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen

        const webSocketFactory = FactoryManager.get( WEBSOCKET_FACTORY_NAME, WebSocketFactory ) as WebSocketFactory;
        if ( !webSocketFactory ) {
            this.error( '_detectWebSocket', 'keine WebSocket-Fabrik vorhanden' );
            return false;
        }

        try {
            // console.log('NetBaseWebSocket._detectWebSocket: start Factory.create');
            this.mWebSocketClass = webSocketFactory.create();
            // console.log('NetBaseWebSocket._detectWebSocket: end Factory.create: ', this.mWebSocketClass);
            if ( this.mWebSocketClass === null ) {
                this.error( '_detectWebSocket', 'keine WebSocketClass vorhanden' );
                return false;
            }
        } catch (aException) {
            this.exception( '_detectWebSocket', aException );
            return false;
        }

        return true;
    }


    /**
     * WebSocket-Verbindung aufbauen
     *
     * @param {string} aUrl - WebSocket-Adresse
     * @return {number} errorCode (0,-1)
     */

    open( aUrl?: string ): number {
        // console.log('NetBaseWebSocket.open');
        if ( this.isOpen()) {
            this.error( 'open', 'bereits geoeffnet' );
            return -1;
        }

        // erste Verbindung aufbauen

        return this._connect( aUrl );
    }


    /**
     * WebSocket-Verbindung beenden
     *
     * @return {number} errorCode (0,-1)
     */

    close(): number {
        // console.log('NetBaseWebSocket.close');
        this.mWebSocketOpenFlag = false;
        if ( this.mWebSocket ) {
            this._clearInfiniteConnect();
            try {
                // TODO: sonst wird der Close-Event nicht erzeugt
                // this.mWebSocket.onclose = () => {};
                this.mWebSocket.close( 1000, 'Closing normally');
            } catch (aException) {
                this.exception( 'close', aException );
                this.mWebSocket = null;
                return -1;
            }
        }
        return 0;
    }


    /**
     * pruefen auf geoeffnete WebSocket-Verbindung mit dem SpeechServer
     *
     * @return {boolean} true, wenn WebSocket verbunden
     */

    isOpen(): boolean {
        return this.mWebSocketOpenFlag;
    }


    isConnect(): boolean {
        if ( this.mWebSocket && this.mWebSocket.readyState === 1 ) {
            return true;
        }
        return false;
    }


    /**
     * Rueckgabe des WebSocket-Zustands als TEXT
     */

    getState(): string {
        if ( !this.mWebSocket ) {
            return 'NULL';
        }
        let stateStr = '';
        switch ( this.mWebSocket.readyState ) {
        case 0:
            stateStr = 'CONNECTING';
            break;
        case 1:
            stateStr = 'OPEN';
            break;
        case 2:
            stateStr = 'CLOSING';
            break;
        case 3:
            stateStr = 'CLOSED';
            break;
        default:
            stateStr = 'UNKNOW';
            break;
        }
        return stateStr;
    }


    /**
     * Nachricht als JSON-Objekt versenden
     *
     * @param {Object} aMessage
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendMessage( aMessage: any ): number {
        // console.log('NetBaseWebSocket.sendMessage: start', aMessage);
        if ( !this.isOpen()) {
            this.error( 'sendMessage', 'WebSocket ist nicht geoeffnet' );
            return -1;
        }
        if ( !this.mWebSocket ) {
            // TODO: kann zu einer Endlosschleife fuehren, wenn der Fehler ueber sendMessage versendet werden soll !
            this.error( 'sendMessage', 'keine WebSocket vorhanden' );
            return -1;
        }
        try {
            this.mWebSocket.send( JSON.stringify( aMessage ));
            return 0;
        } catch (aException) {
            // TODO: kann zu einer Endlosschleife fuehren, wenn der Fehler ueber sendMessage versendet werden soll !
            this.exception( 'sendMessage', aException );
            return -1;
        }
    }


    /**
     * Nachricht als JSON-Objekt versenden
     *
     * @param {ArrayBuffer} aStream
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendStream( aStream: ArrayBuffer ): number {
        // console.log('NetBaseWebSocket.sendStream: start');
        if ( !this.isOpen()) {
            this.error( 'sendStream', 'WebSocket ist nicht geoeffnet' );
            return -1;
        }
        if ( !this.mWebSocket ) {
            // TODO: kann zu einer Endlosschleife fuehren, wenn der Fehler ueber sendMessage versendet werden soll !
            this.error( 'sendStream', 'keine WebSocket vorhanden' );
            return -1;
        }
        try {
            this.mWebSocket.send( aStream );
            return 0;
        } catch (aException) {
            // TODO: kann zu einer Endlosschleife fuehren, wenn der Fehler ueber sendMessage versendet werden soll !
            this.exception( 'sendStream', aException );
            return -1;
        }
    }


    get webSocket() {
        return this.mWebSocket;
    }


    set webSocketUrl( aUrl: string ) {
        this.mWebSocketUrl = aUrl;
    }


    get webSocketUrl() {
        return this.mWebSocketUrl;
    }


    // Events eintragen


    /**
     * Event-Funktion fuer erzeugten WebWorker
     *
     * @param {function} aOnOpenFunc - Ereignis fuer erzeugten WebWorker
     */

    set onOpen( aOnOpenFunc: OnNetOpenFunc ) {
        this.mOnOpenFunc = aOnOpenFunc;
    }


    /**
     * Event-Funktion fuer geloeschten WebWorker
     *
     * @param {function} aOnCloseFunc - Ereignis fuer geloeschten WebWorker
     */

    set onClose( aOnCloseFunc: OnNetCloseFunc ) {
        this.mOnCloseFunc = aOnCloseFunc;
    }


    /**
     * Event-Funktion fuer empfangene Nachrichten
     *
     * @param {function} aOnMessageFunc - Ereignis fuer empfangene Nachricht
     */

    set onMessage( aOnMessageFunc: OnNetMessageFunc ) {
        this.mOnMessageFunc = aOnMessageFunc;
    }


    /**
     * Error-Event Funktion eintragen
     *
     * @param {function} aOnErrorFunc
     */

    set onError( aOnErrorFunc: OnNetErrorFunc ) {
        // console.log('NetBaseWebSocket.onError:', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
    }


    // Event-Funktionen


    /**
     * Oeffnen Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onOpen(): number {
        // console.log('NetBaseWebSocket._onOpen');
        // Open-Ereignisfunktion aufrufen
        if ( typeof this.mOnOpenFunc === 'function' ) {
            try {
                return this.mOnOpenFunc( this.mWebSocketUrl );
            } catch ( aException ) {
                this.exception( '_onOpen', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Schliessen Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onClose(): number {
        // console.log('NetBaseWebSocket._onClose');
        if ( typeof this.mOnCloseFunc === 'function' ) {
            try {
                // console.log('NetBaseWebSocket._onClose:', this.mOnCloseFunc);
                return this.mOnCloseFunc();
            } catch ( aException ) {
                this.exception( '_onClose', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Nachricht empfangen Ereignis
     *
     * @private
     * @param {*} aMessage - Message
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onMessage( aMessage: any ): number {
        // console.log('NetBaseWebSocket._onMesseage:', aMessage);
        if ( typeof this.mOnMessageFunc === 'function' ) {
            try {
                return this.mOnMessageFunc( aMessage );
            } catch ( aException ) {
                this.exception( '_onMessage', aException );
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
        // console.log('NetBaseWebSocket._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('NetBaseWebSocket._onError: call', this.mOnErrorFunc);
                let error = aError;
                if ( aError.type === 'error' ) {
                    if ( this.mWebSocket && this.mWebSocket.readyState === 3 ) {
                        error = new Error( 'Verbindung wurde nicht aufgebaut' );
                    }
                }
                return this.mOnErrorFunc( error );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this.exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION NetBaseWebSocket._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * WebSocket oeffnen Ereignis
     *
     * @private
     * @param {Object} aEvent - Oeffnen Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webSocketOpen( aEvent: any ): number {
        // console.log('NetBaseWebSocket._webSocketOpen: start', aEvent);
        this.mWebSocketOpenFlag = true;
        this._clearInfiniteConnect();
        // TODO: Dieser Event wird nicht mehr benoetigt (erst mal wird ein MessageEvent-Dummy versendet)
        // die Message-Daten sind nicht mehr richtig, deshalb wird hier keine Nachricht mehr versendet
        // if ( this._onMessage({ data: '{ "event": "start" }' }) !== 0 ) { return -1; }
        if ( this._onOpen() !== 0 ) { return -1; }
        // console.log('NetBaseWebSocket._webSocketOpen: end');
        return 0;
    }


    /**
     * WebSocket schliessen Ereignis
     *
     * @private
     * @param {Object} aEvent - Schliessen Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webSocketClose( aEvent: any ): number {
        // console.log('NetBaseWebSocket._webSocketClose:', aEvent);
        this.mWebSocketOpenFlag = false;
        this.mWebSocket = null;
        this._setInfiniteConnect();
        return this._onClose();
    }


    /**
     * WebSocket Nachricht empfangen Ereignis
     *
     * @private
     * @param {Object} aEvent - Message Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webSocketMessage( aMessage: any ): number {
        // console.log('NetBaseWebSocket._webSocketMessage:', aMessage);
        // TODO: hier wird Nachricht noch aufbereitet
        try {
            // Nachricht wird roh weitergegeben
            return this._onMessage( aMessage );
        } catch (aException) {
            this.exception( '_webSocketMessage', aException );
            return -1;
        }
    }


    /**
     * WebSocket Error Ereignis
     *
     * @private
     * @param {Object} aEvent - Error Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webSocketError( aEvent: any ): number {
        // console.log('NetBaseWebSocket._webSocketError: ', aEvent, aEvent.message);
        // pruefen auf Fehlermeldung
        return this._onError( new Error( 'WebSocket wurde nicht verbunden' ));
    }


    /**
     * Aufbau der WebSocket-Verbindung mit dem Speech-Server
     *
     * @private
     * @return {number} errorCode (0,-1) Fehlercode
     */

    protected _connect( aUrl?: string ): number {
        // console.log('NetBaseWebSocket._connect:', aUrl);
        if ( this.isOpen()) {
            // Verbindung ist vorhanden
            return 0;
        }

        if ( this.mWebSocket ) {
            // WebSocket existiert noch
            this.error( '_connect', 'webSocket noch nicht geschlossen' );
            return -1;
        }

        // pruefen auf WebSocketClass

        if ( !this.mWebSocketClass ) {
            this.error( '_connect', 'keine WebSocketClass vorhanden' );
            return -1;
        }

        // pruefen auf Url

        if ( aUrl ) {
            this.mWebSocketUrl = aUrl;
        }

        if ( !this.mWebSocketUrl ) {
            this.error( '_connect', 'keine WebSocketUrl vorhanden' );
            return -1;
        }

        try {
            // console.log('NetBaseWebSocket._connect: webSocketClass = ', this.mWebSocketClass)
            this.mWebSocket = new this.mWebSocketClass( this.mWebSocketUrl );
            if ( !this.mWebSocket ) {
                this.error( '_connect', 'keine WebSocket erzeugt' );
                return -1;
            }

            // Ereignisfunktionen eintragen

            this.mWebSocket.binaryType = 'arraybuffer';
            this.mWebSocket.onopen = (aEvent: any) => this._webSocketOpen( aEvent );
            this.mWebSocket.onclose = (aEvent: any) => this._webSocketClose( aEvent );
            this.mWebSocket.onmessage = (aEvent: any) => this._webSocketMessage( aEvent );
            this.mWebSocket.onerror = (aEvent: any) => this._webSocketError( aEvent );

            // console.log('NetBaseWebSocket._connect:', this.mWebSocket);
            return 0;
        } catch (aException) {
            // console.log('NetBaseWebSocket._connect: Exception', aException);
            this.exception( '_connect', aException );
            this.mWebSocket = null;
            return -1;
        }
    }


    /**
     * Erzeugen der Intervall-Aufrufe fuer Connect
     *
     * @private
     */

    protected _setInfiniteConnect(): void {
        // pruefen auf ConnectInfinite

        if ( !this.mConnectInfiniteFlag ) {
            return;
        }

        // console.log('NetBaseWebSocket._setInfiniteConnect: start', this.mConnectIntervalId);
        if ( this.mConnectIntervalId === 0 ) {
            this.mConnectIntervalId = setInterval(() => {
                this._connect( this.mWebSocketUrl );
            }, this.mConnectIntervalTimeout );
            // console.log('NetBaseWebSocket._setInfiniteConnect: set', this.mConnectIntervalId);
        }
    }


    /**
     * Loeschen der Intervall-Connect Aufrufe
     *
     * @private
     */

    protected _clearInfiniteConnect(): void {
        // console.log('NetBaseWebSocket._clearInfiniteConnect: start', this.mConnectIntervalId);
        if ( this.mConnectIntervalId !== 0 ) {
            clearInterval( this.mConnectIntervalId );
            this.mConnectIntervalId = 0;
            // console.log('NetBaseWebSocket._clearInfiniteConnect: clear', this.mConnectIntervalId);
        }
    }

}
