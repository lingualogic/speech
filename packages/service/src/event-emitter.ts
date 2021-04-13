/** @packageDocumentation
 * EventEmitter, um Eventfunktionen als Event zu kapseln (RXJS nachemfunden)
 *
 * Letzte Aenderung: 25.10.2020
 * Status: gruen
 *
 * @module service
 * @author SB
 */


export type EventEmitterFunc = (aEvent: any) => void;


/**
 * Klasse EventUnsubscribe zum Loeschen einer Event-Funktion aus dem EventEmitter
 */

export class EventUnsubscribe {

    private mEventEmitter: EventEmitter<any>;
    private mIndex: number;


    constructor( aEventEmitter: EventEmitter<any>, aIndex: number ) {
        this.mEventEmitter = aEventEmitter;
        this.mIndex = aIndex;
    }


    /**
     * Loeschen der EventFunktion aus dem Event-Emitter
     */

    unsubscribe(): void {
        if ( this.mEventEmitter ) {
            this.mEventEmitter.unsubscribe( this.mIndex );
        }
        this.mEventEmitter = null;
        this.mIndex = -1;
    }

}


/**
 * Klasse EventEmitter zum Versenden von Events an eingetragene Event-Funktionen
 */

export class EventEmitter<T extends any> {


    // TODO: Asynchrone Events sind noch nicht freigegeben, muessen erst noch getestet werden !

    private mAsyncFlag = false;

    // Event-Funktionsliste

    private mFunctionList: EventEmitterFunc[] = [];


    /**
     * Creates an instance of EventEmitter.
     *
     * @param {boolean} aAsyncFlag - legt fest, ob der Event asynchron ausgeliefert wird (experimentell)
     */

    constructor( aAsyncFlag = false ) {
        this.mAsyncFlag = aAsyncFlag;
    }


    /**
     * Aufruf der Event-Funktion
     *
     * @param aEventFunc - auszufuehrende Event-Funktion
     * @param aEvent - zu uebertragende Event-Daten
     *
     * @return Fehlercode 0 oder -1
     */

    private _callEventFunction( aEventFunc: EventEmitterFunc, aEvent?: T ): number {
        if ( typeof aEventFunc !== 'function' ) {
            console.log( 'EventEmitter._callEventFunction: Keine Event-Funktion uebergeben');
            return -1;
        }
        try {
            aEventFunc( aEvent );
            return 0;
        } catch ( aException ) {
            console.log( 'EventEmitter._callEventFunction: Exception ', aException.message );
            return -1;
        }
    }


    /**
     * Event versenden an alle vorhandenen Event-Funktionen
     *
     * @param value Wert des Events
     */

    emit( aEvent?: T ): void {
        for ( const eventFunc of this.mFunctionList ) {
            if ( eventFunc ) {
                if ( this.mAsyncFlag ) {
                    setTimeout(() => this._callEventFunction( eventFunc, aEvent ), 0 );
                } else {
                    this._callEventFunction( eventFunc, aEvent );
                }
            }
        }
    }


    /**
     * Eintragen einer neuen Event-Funktion
     *
     * @param aEventFunc - gueltive Event-Funktion
     *
     * @return Unsubscribe-Objekt zum Loeschen der Event-Funktion aus der Funktions-Liste
     */

    subscribe( aEventFunc: EventEmitterFunc ): EventUnsubscribe {
        if ( aEventFunc && typeof aEventFunc === 'function' ) {
            // Schleife fuer leere Position in der Funktionsliste
            let index = -1;
            for ( let pos = 0; pos < this.mFunctionList.length; pos++ ) {
                if ( this.mFunctionList[ pos ] === null ) {
                    index = pos;
                    this.mFunctionList[ index ] = aEventFunc;
                    break;
                }
            }
            // pruefen, ob Position gefunden wurde
            if ( index === -1 ) {
                index = this.mFunctionList.push( aEventFunc ) - 1;
            }
            return new EventUnsubscribe( this, index );
        }
        return null;
    }


    /**
     * Loeschen einer Event-Funktion aus der Event-Funktionsliste
     *
     * @param aIndex - Index, an dem die Funktion geloescht werden soll
     */

    unsubscribe( aIndex: number ): void {
        if ( aIndex > -1 && aIndex < this.mFunctionList.length ) {
            if ( aIndex + 1 === this.mFunctionList.length ) {
                this.mFunctionList.pop();
            } else {
                this.mFunctionList[ aIndex ] = null;
            }
        }
    }


    /**
     * Loeschen der Funktionsliste
     */

    clear(): void {
        this.mFunctionList = [];
    }

}
