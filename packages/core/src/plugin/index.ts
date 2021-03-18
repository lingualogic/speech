/** @packageDocumentation
 * Globale Export-Datei fuer Plugin
 *
 * Version: 1.1
 * Datum:   14.10.2020
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
export { PluginFactoryInterface } from './plugin-factory.interface';
export { PluginGroup } from './plugin-group';
export { PluginGroupInterface } from './plugin-group.interface';
export { Plugin } from './plugin';
export { PluginInterface } from './plugin.interface';

