/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer IntentComponent
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// intent

import { INTENT_TYPE_NAME, INTENT_COMPONENTFACTORY_NAME, INTENT_COMPONENT_NAME, INTENT_MOCK_NAME } from '../intent-const';
import { IntentComponentInterface } from './intent-component.interface';
import { IntentComponent } from './intent-component';


// Global API

export class IntentComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'IntentComponentFactory' );
    }

    getName(): string {
        return INTENT_COMPONENTFACTORY_NAME;
    }

    getType(): string {
        return INTENT_TYPE_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): IntentComponentInterface {
        return new IntentComponent( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen von Intent
     * zurueckgeben, einschließlich eines Intent-Mocks.
     *
     * @param [aPluginName] - Instanzen-Name der zu erzeugenden Komponente
     * @param [aPluginClass] - Klassen-Name der zu erzeuggenden Komponente
     * @param aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return Intent wird zurueckgegeben
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): IntentComponentInterface {
        const intentName = aPluginName || INTENT_COMPONENT_NAME;
        const intentClass = aPluginClass || INTENT_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( intentName === INTENT_MOCK_NAME ) {
            // TODO: Einbau des Intent-Mocks
            // return new IntentMock();
        }

        // Intent-Singleton erzeugen

        try {
            return this._newPlugin( intentName, intentClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
