/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der fetch-Funktion fuer Browser und NodeJS
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module net/common
 * @author SB
 */


// core

import { Factory } from '@lingualogic-speech/core';


// Konstanten

export const FETCH_FACTORY_NAME = 'FetchFactory';
export const FETCH_TYPE_NAME = 'Fetch';


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;
// declare let fetch: any;


// Konstanten

const FETCH_NODEJS_LIB = 'node-fetch';


/**
 * Die WebSocketFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebSocket
 */

export class FetchFactory extends Factory {


    private mFetchFunc: any = null;

    // Public, um Promise abzufragen, wenn null, dann ist Klassen-Package dynamisch geladen

    fetchInitPromise: Promise<void> = null;

    // public fuer Abfrage auf RuntimeType NodejS oder Browser

    runtimeType = 'undefined';


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || FETCH_FACTORY_NAME, aRegisterFlag );
        // console.log('FetchFactory: constructor');
        // asynchrones Laden der Fetch-Funktion
        this.fetchInitPromise = this._initFetch();
        // wenn fertig, dann Promise loeschen
        this.fetchInitPromise.then(() => {
            this.fetchInitPromise = null;
        })
    }


    /**
     * dynamischer Import der richtigen Fetch-Funktion fuer Browser oder NodeJS
     */

     private async _initFetch() {
        // console.log('FetchFactory._initFetch: start');
        // Fully functional Node & core modules.
        // it is true for Node.js, Electron, NW.JS
        // it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            // NodeJS-Version der WebSocket laden
            try {
                // TODO: muss Variable sein, um dynamischen Import ohne Pruefung zu machen
                const fileName = FETCH_NODEJS_LIB;
                // fetch-Funktion fuer NodeJS laden
                const fetchFunc = await import( fileName );
                console.log('FetchFactory._initFetch: fetch = ', fetchFunc );
                if ( fetchFunc && fetchFunc.default ) {
                    this.mFetchFunc = fetchFunc.default;
                } else {
                    this.mFetchFunc = fetchFunc;
                }
                this.runtimeType = 'node';
                // console.log('FetchFactory._initFetch: node');
            } catch ( aException ) {
                console.log('FetchFactory._initFetch: node-fetch Package wurde nicht geladen ', aException);
            }
        } else if ( typeof window !== 'undefined' ) {
            // Browser-Version der WebSocket laden
            try {
                if ( typeof window.fetch !== 'undefined') {
                    this.mFetchFunc = window.fetch;
                } 
                if ( this.mFetchFunc ) {
                    this.runtimeType = 'browser';
                    // console.log('FetchFactory._initFetch: browser');
                } 
            } catch ( aException ) {
                console.log('FetchFactory._initFetch: fetch-Funktion wurde nicht geladen ', aException);
            }
        } else {
            console.log('FetchFactory._initFetch: kein fetch-Funktion geladen');
        }
        // console.log('FetchFactory._initFetch: end');
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return FETCH_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return FETCH_FACTORY_NAME;
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
        if ( this.fetchInitPromise ) {
            throw new Error('FetchFactory.create: Laden der fetch-Funktion nicht abgeschlossen');
        }
        // auslesen der fetch-Funktion, wenn vorhanden
        return this.mFetchFunc;
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
        if ( this.fetchInitPromise ) {
            try {
                await this.fetchInitPromise;
            } catch ( aException ) {
                console.log('FetchFactory.createAsync: Exception ', aException);
            }
            this.fetchInitPromise = null;
        }
        // auslesen der fethc-Funktion, wenn vorhanden
        return this.create( aObjectName, aObjectClass, aRegisterFlag );
    }

}
