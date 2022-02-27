/** @packageDocumentation
 * Fabrik zur Erzeugung einer SpeakComponent
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module speak/component
 * @author SB
 */


// core

import { PluginFactory } from '@lingualogic-speech/core';


// speak

import { SPEAK_COMPONENTFACTORY_NAME, SPEAK_COMPONENT_NAME, SPEAK_MOCK_NAME, SPEAK_TYPE_NAME } from '../speak-const';
import { ISpeakComponent } from './speak-component.interface';
import { SpeakComponent } from './speak-component';


// Global API

export class SpeakComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'SpeakComponentFactory' );
    }

    getType(): string {
        return SPEAK_TYPE_NAME;
    }

    getName(): string {
        return SPEAK_COMPONENTFACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ISpeakComponent {
        return new SpeakComponent( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen der Speak
     * zurueckgeben, einschließlich eines Speak-Mocks.
     *
     * @param [aPluignName] - Instanzen-Name der zu erzeugenden Speak-Komponente
     * @param [aPluginClass] - Klassen-Name der zu erzeugenden Speak-Komponente
     * @param [aRegisterFlag] - wenn true, wird Plugin in PluginFactory eingetragen
     *
     * @return Speak-Komponente wird zurueckgegeben
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): ISpeakComponent {
        const pluginName = aPluginName || SPEAK_COMPONENT_NAME;
        const pluginClass = aPluginClass || SPEAK_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( pluginName === SPEAK_MOCK_NAME ) {
            // TODO: Einbau des Speak-Mocks
            // return new SpeakMock();
        }

        // Speak erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
