/** @packageDocumentation
 * Plugin-Liste zur Speicherung von Plugin-Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// error

import { ErrorBase } from './../error/error-base';


// plugin

import { IPlugin } from './plugin.interface';


/**
 * Klasse PluginList zur Speicherung von Plugin-Komponenten
 *
 * @export
 * @class PluginList
 */

export class PluginList extends ErrorBase {

    private mPluginList = new Map<string, IPlugin>();
    private mPluginIterator: IterableIterator<IPlugin>;


    /**
     * Creates an instance of PluginList.
     */

    constructor() {
        super( 'PluginList' );
        this.mPluginIterator = this.mPluginList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Plugins
     *
     * @return {number} size - Anzahl der Plugins in der Liste
     */

    getSize(): number {
        return this.mPluginList.size;
    }


    /**
     * Rueckgabe aller vorhandenen Plugin-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mPluginList.keys());
    }


    /**
     * Eintragen eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {IPlugin} aPlugin - Plugin Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aPluginName: string, aPlugin: IPlugin ): number {
        try {
            if ( !aPluginName ) {
                this.error( 'insert', 'kein Pluginname uebergeben' );
                return -1;
            }
            if ( !aPlugin ) {
                this.error( 'insert', 'kein Plugin uebergeben' );
                return -1;
            }
            if ( this.mPluginList.has( aPluginName )) {
                this.error( 'insert', 'Plugin existiert bereits ' + aPluginName );
                return -1;
            }
            this.mPluginList.set( aPluginName, aPlugin );
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     * @returns {IPlugin} - Plugin Instanz oder null
     */

    find( aPluginName: string ): IPlugin {
        try {
            return this.mPluginList.get( aPluginName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erstes Plugin der Liste zurueckgeben
     *
     * @return {IPlugin} - Plugin Instanz oder null
     */

    first(): IPlugin {
        try {
            this.mPluginIterator = this.mPluginList.values();
            return this.mPluginIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }

    }


    /**
     * naechstes Plugin der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {IPlugin} - Plugin Instanz oder null
     */

    next(): IPlugin {
        try {
            return this.mPluginIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eines Plugins aus der Liste
     *
     * @param {string} aPluginName - Name des Plugins
     * @return {number} errorCode(0,-1)
     */

    remove( aPluginName: string ): number {
        try {
            this.mPluginList.delete( aPluginName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller Plugins aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mPluginList.clear();
            return 0;
        } catch ( aException ) {
            this.exception( 'clear', aException );
            return -1;
        }
    }

}
