/** @packageDocumentation
 * Globale Export-Datei fuer Plugin
 *
 * Version: 2.0
 * Datum:   28.06.2021
 *
 * Definiert das gesamte Plugin-API:
 *
 *      PluginManager   - Manager fuer alle Plugins
 *      PluginFactory   - Factory fuer ein Plugin
 *      PluginGroup     - Verwaltet mehrere Plugins als Gruppe
 *      Plugin          - Plugin fuer eine bestimmte Funktionalitaet
 *
 * @module core/plugin
 * @author SB
 */


// Global API


export { PluginList } from './plugin-list';
export { PluginManager } from './plugin-manager';
export { PluginFactory } from './plugin-factory';
export { IPluginFactory } from './plugin-factory.interface';
export { PluginGroup } from './plugin-group';
export { IPluginGroup } from './plugin-group.interface';
export { Plugin } from './plugin';
export { IPlugin } from './plugin.interface';

