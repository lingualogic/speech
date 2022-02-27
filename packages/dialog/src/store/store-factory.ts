/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Store Version
 * Store wird als Singleton verwaltet
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// core

import { PluginFactory } from '@lingualogic-speech/core';


// store

import { STORE_FACTORY_NAME, STORE_PLUGIN_NAME, STORE_MOCK_NAME } from './store-const';
import { IStore } from './store.interface';
import { StorePlugin } from './store-plugin';


// Global API

export class StoreFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'StoreFactory' );
    }

    getName(): string {
        return STORE_FACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): IStore {
        return new StorePlugin( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Store Plugins
     * zurueckgeben, einschließlich eines Store-Mocks.
     *
     * @param aPluginName - Instanzen-Name des zu erzeugenden Store Plugins
     * @param aPluginClass - Klassen-Name des zu erzeugenden Store Plugins
     * @param aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return Store Plugin wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): IStore {
        const pluginName = aPluginName || STORE_PLUGIN_NAME;
        const pluginClass = aPluginClass || STORE_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginClass === STORE_MOCK_NAME ) {
            // TODO: Einbau des Store-Mocks
            // return new StoreMock();
        }

        // Store erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
