/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines ActionElement-Plugins
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module action/elemenet
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// element

import { ACTIONELEMENT_FACTORY_NAME, ACTIONELEMENT_PLUGIN_NAME, ACTIONELEMENT_MOCK_NAME } from './action-element-const';
import { ActionElementInterface } from './action-element.interface';
import { ActionElement } from './action-element';


// Global API


/** @export
 * ActionElementFactory zur Erzeugung eines ActionElement-Plugin
 */

export class ActionElementFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ActionElementFactory' );
    }

    getName(): string {
        return ACTIONELEMENT_FACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ActionElementInterface {
        return new ActionElement( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des ActionElement-Plugin
     * zurueckgeben, einschließlich eines ActionElement-Mocks.
     *
     * @param aPluginName - Instanz-Name des zu erzeugenden Plugins
     * @param aPluginClass - Klassen-Name des zu erzeugenden Plugins
     * @param aRegisterFlag - wenn true, wird Plugin in PluginManager eingetragen
     *
     * @return Plugin Instanz oder null wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): ActionElementInterface {
        const pluginName = aPluginName || ACTIONELEMENT_PLUGIN_NAME;
        const pluginClass = aPluginClass || ACTIONELEMENT_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginClass === ACTIONELEMENT_MOCK_NAME ) {
            // TODO: Einbau des ActionElement-Mocks
            // return new ActionElementMock();
        }

        // ActionElement-Plugin erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
