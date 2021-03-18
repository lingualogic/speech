/** @packageDocumentation
 * PluginFactory-Interface fuer die Erzeugung von Plugin-Komponenten
 *
 * Letzte Aenderung: 16.10.2020
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// factory

import { FactoryInterface } from './../factory/factory.interface';


// plugin

import { PluginInterface } from './plugin.interface';



/**
 * Erzeugt ein neues Plugin
 *
 * @export
 * @interface PluginFactoryInterface
 */

export interface PluginFactoryInterface extends FactoryInterface {


    /**
     * Erzeugt eine neue Plugin-Komponente zum uebergebenen Plugin Namen
     *
     * @param [aPluginName] - Instanzen-Name des zu erzeugenden Plugins
     * @param [aPluginClass] - Klassen-Name des zu erzeugenden Plugins
     * @param [aRegisterFlag] - true, wenn Plugin global im PluginManager eingetragen werden soll
     *
     * @return {PluginInterface} - Plugin Instanz oder null
     */

    create( aPluginName?: string, aPluginClass?: string, aRegisterFlag?: boolean ): PluginInterface;
}
