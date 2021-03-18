/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer ListenComponent
 * ListenComponent wird als Singleton verwaltet
 *
 * Letzte Aenderung: 25.10.2020
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENTFACTORY_NAME, LISTEN_COMPONENT_NAME, LISTEN_MOCK_NAME } from '../listen-const';
import { ListenComponentInterface } from './listen-component.interface';
import { ListenComponent } from './listen-component';


// Global API

export class ListenComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ListenComponentFactory' );
    }

    getName(): string {
        return LISTEN_COMPONENTFACTORY_NAME;
    }

    getType(): string {
        return LISTEN_TYPE_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ListenComponentInterface {
        return new ListenComponent( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen der Listen
     * zurueckgeben, einschließlich eines Listen-Mocks.
     *
     * @param [aPluginName] - Instanzen-Name der zu erzeugenden Listen-Komponente
     * @param [aPluginClass] - Klassen-Name der zu erzeugenden Listen-Komponente
     * @param [aRegisterFlag] - wenn true, dann in PluginManager eintragen
     *
     * @return Listen-Komponente wird zurueckgegeben
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): ListenComponentInterface {
        const pluginName = aPluginName || LISTEN_COMPONENT_NAME;
        const pluginClass = aPluginClass || LISTEN_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( pluginName === LISTEN_MOCK_NAME ) {
            // TODO: Einbau des Listen-Mocks
            // return new ListenMock();
        }

        // Listen-Komponente erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
