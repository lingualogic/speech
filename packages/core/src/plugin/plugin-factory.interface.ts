/** @packageDocumentation
 * PluginFactory-Interface fuer die Erzeugung von Plugin-Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// factory

import { IFactory } from './../factory/factory.interface';


// plugin

import { IPlugin } from './plugin.interface';



/**
 * Erzeugt ein neues Plugin
 *
 * @export
 * @interface IPluginFactory
 */

export interface IPluginFactory extends IFactory {


    /**
     * Erzeugt eine neue Plugin-Komponente zum uebergebenen Plugin Namen
     *
     * @param [aPluginName] - Instanzen-Name des zu erzeugenden Plugins
     * @param [aPluginClass] - Klassen-Name des zu erzeugenden Plugins
     * @param [aRegisterFlag] - true, wenn Plugin global im PluginManager eingetragen werden soll
     *
     * @return {IPlugin} - Plugin Instanz oder null
     */

    create( aPluginName?: string, aPluginClass?: string, aRegisterFlag?: boolean ): IPlugin;
}
