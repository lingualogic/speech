/** @packageDocumentation
 * Fabrik zur Erzeugung einer BotComponent
 *
 * Letzte Aenderung: 26.10.2020
 * Status: gruen
 *
 * @module bot/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// bot

import { BOT_TYPE_NAME, BOT_COMPONENTFACTORY_NAME, BOT_COMPONENT_NAME, BOT_MOCK_NAME } from '../bot-const';
import { BotComponentInterface } from './bot-component.interface';
import { BotComponent } from './bot-component';


// Global API


/** @export
 * BotComponentFactory zur Erzeugung einer neuen BotComponent Instanz
 */

export class BotComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'BotComponentFactory' );
    }


    getType(): string {
        return BOT_TYPE_NAME;
    }


    getName(): string {
        return BOT_COMPONENTFACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): BotComponentInterface {
        return new BotComponent( aPluginName, aRegisterFlag );
    }

    /**
     * Kann verschiedene Versionen des Bot
     * zurueckgeben, einschließlich eines Bot-Mocks.
     *
     * @param aPluginName - Instanzen-Name der zu erzeugenden Bot Komponente
     * @param aPluginClass - Klassen-Name der zu erzeugenden Bot Komponente
     * @param aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return BotComponent wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): BotComponentInterface {
        const pluginName = aPluginName || BOT_COMPONENT_NAME;
        const pluginClass = aPluginClass || BOT_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( pluginClass === BOT_MOCK_NAME ) {
            // TODO: Einbau des Listen-Mocks
            // return new ListenMock();
        }

        // Bot erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
