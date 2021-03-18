/** @packageDocumentation
 * Event-Funktionsliste, um Eventfunktionen verschiedener Listener zu speichern
 *
 * Letzte Aenderung: 17.10.2020
 * Status: gruen
 *
 * @module core/event
 * @author SB
 */


// error

import { ErrorBase } from '../error/error-base';


// event

import { EventFunc } from './event-function.type';


/**
 * Klasse EventFunctionList
 *
 * @export
 * @class EventFunctionList
 */

export class EventFunctionList extends ErrorBase {


    private mEventName = 'Event';
    private mComponentName = 'Component';

    // TODO: Asynchrone Events sind noch nicht freigegeben, muessen erst noch getestet werden !

    private mAsyncFlag = false;

    // Plugin-Name, Event-Funktion

    private mFunctionList = new Map<string, EventFunc>();


    /**
     *Creates an instance of EventList.
     *
     * @param {string} aEventName - Name des Events
     * @param {string} aComponentName - Name der QuellKomponente des Events
     * @param {boolean} aAsyncFlag - legt fest, ob der Event asynchron ausgeliefert wird (experimentell)
     */

    constructor( aEventName: string, aComponentName?: string, aAsyncFlag = false ) {
        super( 'EventFunctionList' );
        this.mEventName = aEventName;
        this.mComponentName = aComponentName;
        this.mAsyncFlag = aAsyncFlag;
    }


    setComponentName( aComponentName: string ): void {
        this.mComponentName = aComponentName;
    }


    getComponentName(): string {
        return this.mComponentName;
    }


    /**
     * Rueckgabe des Event-Namens
     *
     * @returns {string} eventName
     */

    getName(): string {
        return this.mEventName;
    }


    /**
     * Anzahl der Listener zurueckgeben
     *
     * @returns {number} listenerSize
     */

    getSize(): number {
        return this.mFunctionList.size;
    }


    /**
     * Einfuegen eines Events zum Listener
     *
     * @param {string} aListenerName - Name des Listeners (Pluginname)
     * @param {EventFunc} aEventFunc - Eventfunktion fuer diesen Event
     *
     * @returns {number} errorCode(0,-1)
     */

    addListener( aListenerName: string, aEventFunc: EventFunc ): number {
        // console.log('EventFunctionList.addListener:', this.getComponentName(), this.getName(), aListenerName, aEventFunc);
        if ( !aListenerName ) {
            this.error( 'addListener', 'kein Listenername uebergeben ' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        if ( typeof aEventFunc !== 'function' ) {
            this.error( 'addListener', 'keine Eventfunktion uebergeben ' + aListenerName + ',' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        if ( this.mFunctionList.has( aListenerName )) {
            this.error( 'addListener', 'Eventfunktion bereits vorhanden ' + aListenerName + ',' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        // console.log('EventFunctionList.addEventListener: Elementfunktion eingetragen', aListenerName, this.getComponentName(), this.getName());
        this.mFunctionList.set( aListenerName, aEventFunc );
        return 0;
    }


    /**
     * Entfernen eines Events zum Listener
     *
     * @param {string} aListenerName - Name des Listeners (Pluginname)
     *
     * @returns {number} errorCode(0,-1)
     */

    removeListener( aListenerName: string ): number {
        if ( !aListenerName ) {
            this.error( 'removeListener', 'kein Listenername uebergeben' + ',' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        /**** TODO: Diese Fehlerausgabe ist nicht notwendig!
        if ( !this.mFunctionList.has( aListenerName )) {
            this.error( 'removeListener', 'Eventfunktion nicht vorhanden ' + aListenerName + ', ' + this.getComponentName() + ', ' + this.getName());
            return -1;
        }
        ****/
        // console.log('EventFunctionList.removeEventListener: Elementfunktion entfernt', aListenerName, this.getComponentName(), this.getName());
        this.mFunctionList.delete( aListenerName );
        return 0;
    }


    /**
     * Ereignis ausloesen
     *
     * @param {any} aEvent - optionale Ereignisdaten
     *
     * @returns {number} errorCode(0,-1)
     */

    dispatch( aEvent?: any ): number {
        // console.log('EventFunctionList.dispatch:', this.getName(), aEvent);
        let result = 0;
        this.mFunctionList.forEach((eventFunc: EventFunc) => {
            // console.log('EventFunctionList.dispatch:', this.getComponentName(), this.getName(), eventFunc);
            if ( this.mAsyncFlag ) {
                // asynchrone Ausfuehrung des Events
                setTimeout( function() {
                    try {
                        eventFunc( aEvent );
                    } catch ( aException ) {
                        console.log('EventFunction.dispatch: Exception', aException);
                    }}, 0 );
            } else {
                try {
                    // synchrone Ausfuehrung des Events
                    if ( eventFunc( aEvent ) !== 0 ) {
                        result = -1;
                    }
                } catch ( aException ) {
                    // console.log('EventFunctionList.dispatch:', this.getComponentName(), this.getName(), eventFunc);
                    this.exception( 'dispatch', aException );
                    result = -1;
                }
            }
        });
        return result;
    }


    /**
     * Ereignis fuer einen einzelnen Listener ausloesen
     *
     * @param {string} aListenerName - Name des Listeners, an den die Ereignisse versendet werden
     * @param {any} aEvent - optionale Ereignisdaten
     *
     * @returns {number} errorCode(0,-1)
     */

    dispatchListener( aListenerName: string, aEvent?: any ): number {
        // console.log('EventFunctionList.dispatchListener:', aListenerName, this.getName(), aEvent);
        if ( !aListenerName ) {
            this.error( 'dispatchListener', 'kein Listenername uebergeben ' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        // Aufruf der Eventfunktion des Listeners
        let result = 0;
        const eventFunc = this.mFunctionList.get( aListenerName );
        if ( eventFunc ) {
            // console.log('EventFunctionList.dispatchListener:', aListenerName, this.getComponentName(), this.getName(), eventFunc);
            if ( this.mAsyncFlag ) {
                // asynchrone Ausfuehrung des Events
                setTimeout( function() {
                    try {
                        eventFunc( aEvent );
                    } catch ( aException ) {
                        console.log('EventFunction.dispatchListener: Exception', aException);
                    }}, 0 );
            } else {
                // synchrone Ausfuehrung des Events
                try {
                    result = eventFunc( aEvent );
                } catch ( aException ) {
                    // console.log('EventFunctionList.dispatchListener:', aListenerName, this.getComponentName(), this.getName(), eventFunc);
                    this.exception( 'dispatchListener', aException );
                    result = -1;
                }
            }
        }
        return result;
    }


    /**
     * Ereignisfunktionsliste loeschen
     */

    clear(): void {
        this.mFunctionList.clear();
    }

}
