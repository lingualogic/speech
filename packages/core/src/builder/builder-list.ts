/** @packageDocumentation
 * Builder-Liste zur Speicherung von Plugin-Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */

// error

import { ErrorBase } from './../error/error-base';


// builder

import { IBuilder } from './builder.interface';


/**
 * Klasse BuilderList zur Speicherung von Buildern
 *
 * @export
 * @class BuilderList
 */

export class BuilderList extends ErrorBase {

    /**
     * Map mit allen erzeugten Buildern
     */

    private mBuilderList = new Map<string, IBuilder>();


    /**
     * Iterator fuer BuilderList
     */

    private mBuilderIterator: IterableIterator<IBuilder>;


    /**
     * Creates an instance of PluginList.
     */

    constructor() {
        super( 'BuilderList' );
        this.mBuilderIterator = this.mBuilderList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Builder
     *
     * @return {number} size - Anzahl der Builder in der Liste
     */

    getSize(): number {
        return this.mBuilderList.size;
    }


    /**
     * Eintragen eines Builders
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {IBuilder} aBuilder - Builder Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aBuilderName: string, aBuilder: IBuilder ): number {
        try {
            if ( !aBuilderName ) {
                this.error( 'insert', 'kein Buildername uebergeben' );
                return -1;
            }
            if ( !aBuilder ) {
                this.error( 'insert', 'kein Builder uebergeben' );
                return -1;
            }
            // console.log('BuilderList.insert:', this.mBuilderList.size, this.mBuilderList.has( aBuilderName ));
            if ( this.mBuilderList.has( aBuilderName )) {
                this.error( 'insert', 'Builder existiert bereits' );
                return -1;
            }
            this.mBuilderList.set( aBuilderName, aBuilder );
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Builders
     *
     * @param {string} aBuilderName - Name des Builders
     * @returns {IBuilder} - Builder Instanz
     */

    find( aBuilderName: string ): IBuilder {
        try {
            return this.mBuilderList.get( aBuilderName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * ersten Builder der Liste zurueckgeben
     *
     * @return {IBuilder} - Builder Instanz
     */

    first(): IBuilder  {
        try {
            this.mBuilderIterator = this.mBuilderList.values();
            return this.mBuilderIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechsten Builder der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {IBuilder} - Builder Instanz
     */

    next(): IBuilder {
        try {
            return this.mBuilderIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eines Builders aus der Liste
     *
     * @param {string} aBuilderName - Name des Builders
     * @return {number} errorCode(0,-1)
     */

    remove( aBuilderName: string ): number {
        try {
            this.mBuilderList.delete( aBuilderName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mBuilderList.clear();
            return 0;
        } catch ( aException ) {
            this.exception('clear', aException );
            return -1;
        }
    }

}
