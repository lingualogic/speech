/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Parser Version
 * Parser wird als Singleton verwaltet
 *
 * Letzte Aenderung: 27.10.2020
 * Status: gelb
 *
 * @module dialog/parser
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';

// parser

import { PARSER_FACTORY_NAME, PARSER_PLUGIN_NAME, PARSER_MOCK_NAME } from './parser-const';
import { ParserInterface } from './parser.interface';
import { ParserPlugin } from './parser-plugin';


// Global API


/** @export
 * ParserFactory Klasse
 */

export class ParserFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ParserFactory' );
    }


    getName(): string {
        return PARSER_FACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ParserInterface {
        return new ParserPlugin( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Parser Plugins
     * zurueckgeben, einschließlich eines Parser-Mocks.
     *
     * @param aPluginName - Instanzen-Name des zu erzeugenden Parser Plugins
     * @param aPluginClass - Klassen-Name des zu erzeugenden Parser Plugins
     * @param aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return Parser Plugin wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): ParserInterface {
        const pluginName = aPluginName || PARSER_PLUGIN_NAME;
        const pluginClass = aPluginClass || PARSER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginClass === PARSER_MOCK_NAME ) {
            // TODO: Einbau des Parser-Mocks
            // return new ParserMock();
        }

        // Parser erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
