/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer JSON Version
 * JSON wird als Singleton verwaltet
 *
 * Letzte Aenderung: 27.10.2020
 * Status: rot
 *
 * @module dialog/json
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// json

import { JSON_FACTORY_NAME, JSON_PLUGIN_NAME, JSON_MOCK_NAME } from './json-const';
import { JsonInterface } from './json.interface';
import { JsonPlugin } from './json-plugin';


// Global API


/** @export
 * JsonFactory Klasse
 */

export class JsonFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'JsonFactory' );
    }


    getName(): string {
        return JSON_FACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): JsonInterface {
        return new JsonPlugin( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Json Plugins
     * zurueckgeben, einschließlich eines Json-Mocks.
     *
     * @param aPluginName - Name des zu erzeugenden Json Plugins
     * @param aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return Json Plugin wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): JsonInterface {
        const pluginName = aPluginName || JSON_PLUGIN_NAME;
        const pluginClass = aPluginClass || JSON_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginClass === JSON_MOCK_NAME ) {
            // TODO: Einbau des Mocks
            // return new JsonMock();
        }

        // Json erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
