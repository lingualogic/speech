/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Interpreter Version
 * Interpreter wird als Singleton verwaltet
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/interpreter
 * @author SB
 */


// core

import { PluginFactory } from '@lingualogic-speech/core';


// interpreter

import { INTERPRETER_FACTORY_NAME, INTERPRETER_PLUGIN_NAME, INTERPRETER_MOCK_NAME } from './interpreter-const';
import { IInterpreter } from './interpreter.interface';
import { InterpreterPlugin } from './interpreter-plugin';


// Global API

export class InterpreterFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'InterpreterFactory' );
    }

    getName(): string {
        return INTERPRETER_FACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): IInterpreter {
        return new InterpreterPlugin( aPluginName, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Interpreters
     * zurueckgeben, einschließlich eines Interpreter-Mocks.
     *
     * @param aPluginName - Instanz-Name des zu erzeugenden Plugins
     * @param aPluginClass - Klassen-Name des zu erzeugenden Plugins
     * @param aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return Interpreter wird zurueckgegeben
     */

    create( aPluginName?: string, aPluginClass = '', aRegisterFlag = true ): IInterpreter {
        const pluginName = aPluginName || INTERPRETER_PLUGIN_NAME;
        const pluginClass = aPluginClass || INTERPRETER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginName === INTERPRETER_MOCK_NAME ) {
            // TODO: Einbau des Interpreter-Mocks
            // return new InterpreterMock();
        }

        // Interpreter erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
