/** @packageDocumentation
 * PluginManager zur Verwaltung aller Plugins
 *
 * Letzte Aenderung: 16.10.2020
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { ErrorBase } from './../error/error-base';


// plugin

import { PluginFactoryInterface } from './plugin-factory.interface';
import { PluginInterface } from './plugin.interface';
import { PluginList } from './plugin-list';


export class PluginManager {

    private static mPluginList = new PluginList();


    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    private static mErrorBase = new ErrorBase( 'PluginManager' );


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        PluginManager.mPluginList.setErrorOutputOn();
        PluginManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        PluginManager.mPluginList.setErrorOutputOff();
        PluginManager.mErrorBase.setErrorOutputOff();
    }

    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PluginManager.mPluginList.setErrorOutputFunc( aErrorFunc );
        PluginManager.mErrorBase.setErrorOutputFunc( aErrorFunc );
    }


    // Plugin-Funktionen


    /**
     * Rueckgabe der Anzahl vorhandener Plugins
     *
     * @return {number} size - Anzahl der Plugins in der Liste
     */

    static getSize(): number {
        return PluginManager.mPluginList.getSize();
    }


    /**
     * Rueckgabe aller vorhandenen Plugin-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */

    static getNameList(): Array<string> {
        return PluginManager.mPluginList.getNameList();
    }


    /**
     * Rueckgabe eines Plugins.
     *
     * @param aPluginName - Instanzen-Name des Plugins
     * @param [aPluginClass] - Klassen-Name des Plugins
     * @param [aPluginFactory] - Plugin Fabrik Klasse
     *
     * @return Rueckgabe des Plugins oder null
     */

    static get( aPluginName: string, aPluginClass?: string, aPluginFactory?: PluginFactoryInterface ): PluginInterface {
        if ( !aPluginName ) {
            PluginManager.mErrorBase.error( 'get', 'kein PluginName uebergeben' );
            return null;
        }
        const plugin = PluginManager.find( aPluginName );
        // console.log('PluginManager.get: name = ', aPluginName, ' plugin = ', plugin);
        if ( plugin ) {
            // console.log('PluginManager.get: Plugin wurde gefunden', aPluginName);
            return plugin;
        }
        if ( !aPluginFactory ) {
            PluginManager.mErrorBase.error( 'get', 'keine PluginFactoryClass uebergeben' );
            return null;
        }
        // console.log('PluginManager.get: Plugin wurde erzeugt', aPluginName);
        return aPluginFactory.create( aPluginName, aPluginClass );
    }


    /**
     * Rueckgabe eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {AudioPluginInterface} - Rueckgabe des AudioPlugins
     */

    static find( aPluginName: string ): PluginInterface {
        const plugin = PluginManager.mPluginList.find( aPluginName );
        if ( !plugin ) {
            return null;
        }
        return plugin;
    }


    /**
     * Eintragen eines Plugin
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {PluginInterface} aPlugin - Plugin
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    static insert( aPluginName: string, aPlugin: PluginInterface ): number {
        return PluginManager.mPluginList.insert( aPluginName, aPlugin );
    }


    /**
     * Entfernt das Plugin aus der Liste
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    static remove( aPluginName: string ): number {
        return PluginManager.mPluginList.remove( aPluginName );
    }


    /**
     * Entfernt alle Plugins. Die Plugins werden vorher mit done() freigegeben.
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    static clear(): number {
        let plugin = PluginManager.mPluginList.first();
        while ( plugin ) {
            try {
                // Plugins muessen freigegeben werden, um ihre Ressourcen ebenfalls freizugeben
                plugin.done();
            } catch ( aException ) {
                PluginManager.mErrorBase.exception( 'clear', aException );
            }
            plugin = PluginManager.mPluginList.next();
        }
        return PluginManager.mPluginList.clear();
    }

}
