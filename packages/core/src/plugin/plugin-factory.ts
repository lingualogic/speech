/** @packageDocumentation
 * Plugin Fabrik zur Erzeugung von Plugins
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// factory

import { Factory } from './../factory/factory';


// plugin

import { IPluginFactory } from './plugin-factory.interface';
import { IPlugin } from './plugin.interface';
import { Plugin } from './plugin';


/**
 * Implementiert die Plugin Fabrik
 *
 * @export
 * @class PluginFactory
 * @implements {IPluginFactory}
 */

export class PluginFactory extends Factory implements IPluginFactory {

    /**
     * Creates an instance of PluginFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */

    constructor( aFactoryName?: string ) {
        super( aFactoryName || 'PluginFactory' );
    }

    getType(): string {
        return 'Plugin';
    }


    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return 'PluginFactory';
    }


    // Plugin-Funktionen


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): IPlugin {
        return new Plugin( aPluginName, aRegisterFlag );
    }


    /**
     * Erzeugt ein neues Plugin
     *
     * @param [aPluginName] - Instanzen-Name des Plugins
     * @param [aPluginClass] - Klassen-Name des Plugins
     * @param [aRegisterFlag] - legt fest, ob Plugin in PluginManager eingetragen wird
     *
     * @return {IPlugin} plugin - Instanz des Plugins
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): IPlugin {
        const pluginName = aPluginName || 'Plugin';
        const pluginClass = aPluginClass || 'Plugin';
        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'PluginFactory.create', aException );
            return null;
        }
    }

}
