/** @packageDocumentation
 * Diese Komponente dient zum Aufbau und zur Verwaltung eines HTML5-WebWorkers als SpeechServer im Browser
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gelb
 *
 * @module net
 * @author SB
 */


// global

import { SPEECH_WEBWORKER_FILE, SPEECH_WEBWORKER_PATH, SPEECH_WEBWORKER_TYPE, FactoryManager, MESSAGE_COMPONENT_TYPE, IMessage } from '@speech/core';


// common

import { WebWorkerFactory, WEBWORKER_FACTORY_NAME } from './common/webworker-factory';


// net

import { NET_WEBWORKER_NAME } from './net-const';
import { NetPlugin } from './net-plugin';


/* Kommentar: NetOptions
 *
 * Beim Aufruf von init(options) koennen optionale Werte zur Konfiguration uebergeben werden.
 * Zur Zeit wird ein optionaler Wert fuer die Verbindungswiederholung uebergeben:
 *
 *      netOptions: { webWorkerPath: '<path>' }
 *
 *      webWorkerPath - uebergeordneter Pfad oberhalb des speech-Pfades oder leer
 */


/**
 * Die NetWebWorker Klasse kapselt einen HTML5-WebWorker
 */

export class NetWebWorker extends NetPlugin {

    // Standard WebWorker eintragen als Defaultfunktion

    private mWebWorkerFactory: WebWorkerFactory = null;

    private mWebWorkerClass: typeof Worker = null;
    private mWebWorker: Worker = null;
    private mWebWorkerPath = '';


    /**
     * Creates an instance of NetWebWorker.
     *
     * @param {boolean} aRegisterFlag - wird in PluginManager eingetragen, wenn true
     */

    constructor( aRegisterFlag = true ) {
        super( NET_WEBWORKER_NAME, aRegisterFlag );
    }


    getClass(): string {
        return 'NetWebWorker';
    }


    /**
     * Initialisierung des SpeechWokerManagers
     *
     * @param {Object} aOptions - Optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOptions?: any ): number {
        // console.log('NetWebWorker.init:', aOptions);

        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this.error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // Initialisierung der WebSocketFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen

        this.mWebWorkerFactory = FactoryManager.get( WEBWORKER_FACTORY_NAME, WebWorkerFactory ) as WebWorkerFactory;

        // pruefen auf vorhandenen WebWorker in HTML5

        if ( !this._detectWebWorker()) {
            return -1;
        }

        // pruefen auf Options

        if ( aOptions && aOptions.webWorkerPath ) {
            this.mWebWorkerPath = aOptions.webWorkerPath;
        }

        return super.init( aOptions );
    }


    /**
     * WebSocket schliessen
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        this.mWebWorkerClass = null;
        this.mWebWorker = null;
        this.mWebWorkerPath = '';
        this.close();
        return super.done();
    }


    /**
     * Feststellen, ob HTML5 WebWorker API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn WebWorker existiert, false sonst
     */

    protected _detectWebWorker(): boolean {
        // pruefen auf Fabrik

        if ( !this.mWebWorkerFactory ) {
            this.error( '_detectWebWorker', 'keine WebWorker-Fabrik vorhanden' );
            return false;
        }

        // auslesen der WebWorker-Klassen, wenn vorhanden

        try {
            this.mWebWorkerClass = this.mWebWorkerFactory.getWebWorkerClass();
        } catch (aException) {
            this.exception( '_detectWebWorker', aException );
            return false;
        }

        // pruefen auf vorhandenen WebWorker in HTML5

        if ( this.mWebWorkerClass === null ) {
            this.error( '_detectWebWorker', 'Unable to use the WebWorker API' );
            return false;
        }

        return true;
    }


    /**
     * Rueckgabe des Net-Typs
     *
     * @returns {string} netType
     */

    getType(): string {
        return SPEECH_WEBWORKER_TYPE;
    }


    // Event-Funktionen


    /**
     * WebWorker oeffnen Nachricht
     *
     * @private
     * @param {Object} aEvent - Oeffnen Ereignis
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webWorkerOpen( aEvent: any ): number {
        // console.log('NetWebWorker._webWorkerOpen:', aEvent);
        // TODO: ist diese Nachricht angemessen und richtig?
        const message: IMessage = {
            type: MESSAGE_COMPONENT_TYPE,
            source: this.getName(),
            dest: '',
            action: 'start'
        };
        this._onMessage( message );
        if ( this._onOpen() !== 0 ) { return -1; }
        return 0;
    }


    /**
     * WebWorker schliessen Ereignis
     *
     * @private
     * @param {Object} aEvent - Schliessen Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webWorkerClose( aEvent: any ) {
        // console.log('NetWebWorker._webWorkerClose:', aEvent);
        return this._onClose();
    }


    /**
     * WebWorker Nachricht empfangen Ereignis
     *
     * @private
     * @param {Object} aMessageEvent - Message Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webWorkerMessage( aMessageEvent: any ) {
        // console.log('NetWebWorker._webWorkerMessage:', aMessageEvent.data);
        try {
            this._onMessage( aMessageEvent.data );
        } catch (aException) {
            this.exception( '_webWorkerMessage', aException );
            return -1;
        }
        return 0;
    }


    /**
     * WebWorker Error Ereignis
     *
     * @private
     * @param {Object} aErrorEvent - Error Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _webWorkerError( aErrorEvent: any ) {
        // console.log('NetWebWorker._webWorkerError:', aErrorEvent);
        return this._onError( aErrorEvent );
    }


    // WebWorker-Funktionen


    /**
     * WebWorker erzeugen
     *
     * @return {number} errorCode (0,-1)
     */

    open( aUrl?: string ): number {
        if ( !this.isInit()) {
            this.error( 'open', 'nicht initialisiert' );
            return -1;
        }

        if ( this.isOpen()) {
            this.error( 'open', 'bereits geoeffnet' );
            return -1;
        }

        // WebWorker erzeugen

        try {
            if ( !this.mWebWorkerClass ) {
                this.error( 'open', 'keine WebWorkerClass vorhanden' );
                return -1;
            }
            const workerFile = this.mWebWorkerPath + SPEECH_WEBWORKER_PATH + SPEECH_WEBWORKER_FILE;
            this.mWebWorker = new this.mWebWorkerClass( workerFile );
            // console.log('NetWebWorker.open:', this.mWebWorker);
            if ( !this.mWebWorker ) {
                this.error( 'open', 'kein WebWorker erzeugt' );
                return -1;
            }
            this.mWebWorker.onmessage = (aMessageEvent: any) => {
                this._webWorkerMessage( aMessageEvent );
            };

            this.mWebWorker.onerror = (aErrorEvent: any) => {
                aErrorEvent.preventDefault();
                // TODO: muss in normale Fehlerbehandlung uebertragen werden
                console.log('NetWebWorker.open: Error', aErrorEvent);
                this.mWebWorker = null;
                this._webWorkerError( new Error('WebWorker nicht initialisiert'));
            };
            return this._webWorkerOpen('');
        } catch (aException) {
            this.exception( 'open', aException );
            return -1;
        }
    }


    /**
     * WebWorker beenden
     *
     * @return {number} errorCode (0,-1)
     */

    close(): number {
        if ( this.mWebWorker ) {
            const worker = this.mWebWorker;
            this.mWebWorker = null;
            try {
                this._webWorkerClose('');
                worker.terminate();
                return 0;
            } catch (aException) {
                this.exception( 'close', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * pruefen auf vorhandenen WebWorker
     *
     * @return {boolean} true, wenn WebWorker vorhanden ist
     */

    isOpen(): boolean {
        if ( this.mWebWorker ) {
            return true;
        }
        return false;
    }


    /**
     * Rueckgabe des WebWorker-Zustands als TEXT
     */

    getState(): string {
        if ( !this.mWebWorker ) {
            return 'NULL';
        }
        return 'OPEN';
    }


    /**
     * Nachricht an WebWorker versenden
     *
     * @param {Object} aMessage
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendMessage( aMessage: any ): number {
        // console.log('NetWebWorker.sendMessage:', aMessage);
        if ( this.mWebWorker ) {
            try {
                this.mWebWorker.postMessage( aMessage );
                return 0;
            } catch (aException) {
                // TODO: eventuell Problem mit Endlosschleife, wenn Fehlernachrichten hierueber gesendet werden
                this.exception( 'sendMessage', aException );
            }
        }
        return -1;
    }

}
