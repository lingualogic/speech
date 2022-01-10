/** @packageDocumentation
 * PluginGroup Schnittstelle
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// plugin

import { IPlugin } from './plugin.interface';


/**
 * Definiert die Schnittstelle fuer eine PluginGroup
 */

export interface IPluginGroup extends IPlugin {

    // Plugin-Funktionen

    insertPlugin( aPluginName: string, aPlugin: IPlugin ): number;
    removePlugin( aPluginName: string ): number;
    removeAllPlugin(): number;

    findPlugin( aPluginName: string ): IPlugin;
    firstPlugin(): IPlugin;
    nextPlugin(): IPlugin;

    isPlugin( aPluginName: string): boolean;
    getPluginSize(): number;

    startPlugin( aPluginName: string, aOption?: any ): number;
    stopPlugin( aPluginName: string ): number;

    startAllPlugin( aOption?: any ): number;
    stopAllPlugin(): number;
}
