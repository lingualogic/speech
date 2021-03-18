/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines DialogComponent
 *
 * Letzte Aenderung: 27.10.2020
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENTFACTORY_NAME, DIALOG_COMPONENT_NAME, DIALOG_MOCK_NAME } from '../dialog-const';
import { DialogComponentInterface } from './dialog-component.interface';
import { DialogComponent } from './dialog-component';


// Global API


/** @export
 * DialogComponentFactory Klasse
 */

export class DialogComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'DialogComponentFactory' );
    }


    getName(): string {
        return DIALOG_COMPONENTFACTORY_NAME;
    }


    getType(): string {
        return DIALOG_TYPE_NAME;
    }


    /**
     * Kann verschiedene Versionen des Dialog Plugins
     * zurueckgeben, einschließlich eines Dialog-Mocks.
     *
     * @param aPluginName - Instanzen-Name der zu erzeugenden Dialog Komponente
     * @param aPluginClass - Klassen-Name der zu erzeugenden Dialog Komponente
     * @param aRegisterFlag - eintragen in PluginManager
     *
     * @return Dialog wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): DialogComponentInterface {
        const pluginName = aPluginName || DIALOG_COMPONENT_NAME;
        const pluginClass = aPluginClass || DIALOG_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( pluginClass === DIALOG_MOCK_NAME ) {
            // TODO: Einbau des Dialog-Mocks
            // return new DialogMock();
        }

        // Dialog erzeugen

        try {
            return new DialogComponent( aPluginName, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
