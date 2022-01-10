/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der WebSocket-Klasse und -Instanz fuer Browser und NodeJS
 *
 * Letzte Aenderung: 31.07.2021
 * Status: rot
 *
 * @module net/common
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// Konstanten

export const WEBSOCKET_FACTORY_NAME = 'WebSocketFactory';
export const WEBSOCKET_TYPE_NAME = 'WebSocket';


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;


// Konstanten

const WEBSOCKET_NODEJS_LIB = 'ws';


/**
 * Die WebSocketFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebSocket
 */

export class WebSocketFactory extends Factory {


    private mWebSocketClass: any = null;

    // Public, um Promise abzufragen, wenn null, dann ist Klassen-Package dynamisch geladen

    webSocketClassPromise: Promise<void> = null;

    // public fuer Abfrage auf RuntimeType NodejS oder Browser

    runtimeType = 'undefined';


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || WEBSOCKET_FACTORY_NAME, aRegisterFlag );
        // console.log('WebSocketFactory: constructor');
        // asynchrones Laden der WebSocket-Klasse
        this.webSocketClassPromise = this._initWebSocket();
        // wenn fertig, dann Promise loeschen
        this.webSocketClassPromise.then(() => {
            this.webSocketClassPromise = null;
        })
    }


    /**
     * dynamischer Import der richtigen BaseWebSocket-Klasse fuer Browser oder NodeJS
     */

     private async _initWebSocket() {
        // console.log('WebSocketFactory._initWebSocket: start');
        // Fully functional Node & core modules.
        // it is true for Node.js, Electron, NW.JS
        // it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            // NodeJS-Version der WebSocket laden
            try {
                // TODO: muss Variable sein, um dynamischen Import ohne Pruefung zu machen
                const fileName = WEBSOCKET_NODEJS_LIB;
                // webSocket-Klasse fuer NodeJS laden
                const ws = await import( fileName );
                // console.log('WebSocketFactory._initWebSocket: ws = ', ws );
                if ( ws && ws.default ) {
                    this.mWebSocketClass = ws.default;
                } else {
                    this.mWebSocketClass = ws;
                }
                this.runtimeType = 'node';
                // console.log('WebSocketFactory._initWebSocket: node');
            } catch ( aException ) {
                console.log('WebSocketFactory._initWebSocket: WS-Package wurde nicht geladen ', aException);
            }
        } else if ( typeof window !== 'undefined' ) {
            // Browser-Version der WebSocket laden
            try {
                if ( typeof WebSocket !== 'undefined') {
                    this.mWebSocketClass = WebSocket;
                } else if ( typeof (window as any).MozWebSocket !== 'undefined') {
                    this.mWebSocketClass = (window as any).MozWebSocket
                } else if (typeof window !== 'undefined') {
                    this.mWebSocketClass = window.WebSocket || (window as any).MozWebSocket
                }
                if ( this.mWebSocketClass ) {
                    this.runtimeType = 'browser';
                    // console.log('WebSocketFactory._initWebSocket: browser');
                } 
            } catch ( aException ) {
                console.log('WebSocketFactory._initWebSocket: WebSocket-Klasse wurde nicht geladen ', aException);
            }
        } else {
            console.log('WebSocketFactory._initWebSocket: kein WebSocket-Klasse geladen');
        }
        // console.log('WebSocketFactory._initWebSocket: end');
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return WEBSOCKET_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return WEBSOCKET_FACTORY_NAME;
    }


    /**
     * Erzeugt ein neues Objekt (synchron)
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aObjectClass?: string, aRegisterFlag = true ): any {
        // pruefen auf geladene WebSocket-Klasse
        if ( this.webSocketClassPromise ) {
            throw new Error('WebSocketFactory.create: Laden der WebSocket-Klasse nicht abgeschlossen');
        }
        // auslesen der WebSocket-Klasse, wenn vorhanden
        return this.mWebSocketClass;
    }


    /**
     * Erzeugt ein neues Objket (asynchron)
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    async createAsync( aObjectName?: string, aObjectClass?: string, aRegisterFlag = true ): Promise<any> {
        // warten auf asynchrone Initialisierung fuer die WebSocket-Klasse
        if ( this.webSocketClassPromise ) {
            try {
                await this.webSocketClassPromise;
            } catch ( aException ) {
                console.log('WebSocketFactory.createAsync: Exception ', aException);
            }
            this.webSocketClassPromise = null;
        }
        // auslesen der WebSocket-Klasse, wenn vorhanden
        return this.create( aObjectName, aObjectClass, aRegisterFlag );
    }

}
