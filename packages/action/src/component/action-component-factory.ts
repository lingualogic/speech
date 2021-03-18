/** @packageDocumentation
 * Fabrik zur Erzeugung einer ActionComponent
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module action/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// action

import { ACTION_TYPE_NAME, ACTION_COMPONENTFACTORY_NAME, ACTION_COMPONENT_NAME, ACTION_MOCK_NAME } from '../action-const';
import { ActionComponentInterface } from './action-component.interface';
import { ActionComponent } from './action-component';


// Global API


/** @export
 * ActionComponentFactory zur Erzeugung einer neuen ActionComponent Instanz
 */

export class ActionComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ActionComponentFactory' );
    }

    getName(): string {
        return ACTION_COMPONENTFACTORY_NAME;
    }

    getType(): string {
        return ACTION_TYPE_NAME;
    }

    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ActionComponentInterface {
        return new ActionComponent( aPluginName, aRegisterFlag );
    }

    /**
     * Kann verschiedene Versionen von Action
     * zurueckgeben, einschließlich eines Action-Mocks.
     *
     * @param aPluginName - Instanzen-Name der zu erzeugenden Komponente
     * @param aPluginClass - Klassen-Name der zu erzeugenden Komponente
     * @param aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return ActionComponent wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): ActionComponentInterface {
        const pluginName = aPluginName || ACTION_COMPONENT_NAME;
        const pluginClass = aPluginClass || ACTION_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( pluginName === ACTION_MOCK_NAME ) {
            // TODO: Einbau des Action-Mocks
            // return new ActionMock();
        }

        // Action erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
