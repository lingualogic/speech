/** @packageDocumentation
 * DialogComponentBuilder
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// core

import { Builder, IBuilderConfig } from '@lingualogic-speech/core';


// file

import { FILEREADER_FACTORY_NAME, FILEREADER_PLUGIN_NAME, FileReaderFactory, IFileReader } from '@lingualogic-speech/file';


// store

import { STORE_FACTORY_NAME, STORE_PLUGIN_NAME } from '../store/store-const';
import { StoreFactory } from '../store/store-factory';
import { IStore } from '../store/store.interface';


// json

import { JSON_FACTORY_NAME, JSON_PLUGIN_NAME } from '../json/json-const';
import { JsonFactory } from '../json/json-factory';
import { IJson } from '../json/json.interface';


// parser

import { PARSER_FACTORY_NAME, PARSER_PLUGIN_NAME } from '../parser/parser-const';
import { ParserFactory } from '../parser/parser-factory';
import { IParser } from '../parser/parser.interface';


// interpreter

import { INTERPRETER_FACTORY_NAME, INTERPRETER_PLUGIN_NAME } from '../interpreter/interpreter-const';
import { InterpreterFactory } from '../interpreter/interpreter-factory';
import { IInterpreter } from '../interpreter/interpreter.interface';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENTBUILDER_NAME, DIALOG_COMPONENTFACTORY_NAME, DIALOG_COMPONENT_NAME } from '../dialog-const';
import { DialogComponentFactory } from './dialog-component-factory';
import { IDialogComponent } from './dialog-component.interface';


/** @export
 * Klasse DialogComponentBuilder zum Erzeugen der Dialog-Komponente
 */

export class DialogComponentBuilder extends Builder {


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || DIALOG_TYPE_NAME, aRegisterFlag );
    }


    getClass(): string {
        return 'DialogComponentBuilder';
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return DIALOG_TYPE_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der erzeugten Komponente oder null
     */

    build( aConfig?: IBuilderConfig ): IDialogComponent {
        // pruefen auf vorhandene Komponente
        // pruefen, ob Komponente schon vorhanden ist
        const componentName = this._getComponentName( aConfig ) || DIALOG_COMPONENT_NAME;
        let dialog = this._findComponent( componentName ) as IDialogComponent;
        if ( dialog ) {
            return dialog;
        }
        // neue Komponente erzeugen
        try {
            dialog = this._buildComponent( aConfig );
            const fileReader = this._getPlugin( FILEREADER_PLUGIN_NAME, FILEREADER_PLUGIN_NAME, FILEREADER_FACTORY_NAME, FileReaderFactory ) as IFileReader;
            const store = this._getPlugin( STORE_PLUGIN_NAME, STORE_PLUGIN_NAME, STORE_FACTORY_NAME, StoreFactory ) as IStore;
            const json = this._getPlugin( JSON_PLUGIN_NAME, JSON_PLUGIN_NAME, JSON_FACTORY_NAME, JsonFactory ) as IJson;
            const parser = this._getPlugin( PARSER_PLUGIN_NAME, PARSER_PLUGIN_NAME, PARSER_FACTORY_NAME, ParserFactory ) as IParser;
            const interpreter = this._getPlugin( INTERPRETER_PLUGIN_NAME, INTERPRETER_PLUGIN_NAME, INTERPRETER_FACTORY_NAME, InterpreterFactory ) as IInterpreter;
            if ( this._binder( dialog, fileReader, store, json, parser, interpreter ) !== 0 ) {
                this.error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return dialog;
        } catch ( aException ) {
            this.exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singelton erzeugt
     *
     * @private
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return {IDialog} component - Rueckgabe des Component-Singletons
     */

    protected _buildComponent( aConfig: IBuilderConfig ): IDialogComponent {
        const componentName = this._getComponentName( aConfig ) || DIALOG_COMPONENT_NAME;
        const componentClass = this._getComponentClass( aConfig ) || DIALOG_COMPONENT_NAME;
        return this._getPlugin( componentName, componentClass, DIALOG_COMPONENTFACTORY_NAME, DialogComponentFactory ) as IDialogComponent;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {IDialogComponent} aDialog - Diaog Komponente
     * @param {IFileReader} aFileReader - FileRader Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    // tslint:disable-next-line: max-line-length
    protected _binder( aDialog: IDialogComponent, aFileReader: IFileReader, aStore: IStore, aJson: IJson, aParser: IParser, aInterpreter: IInterpreter ): number {
        if ( !aDialog ) {
            this.error( '_binder', 'Dialog nicht vorhanden' );
            return -1;
        }
        if ( !aFileReader ) {
            this.error( '_binder', 'FileReader nicht vorhanden' );
            return -1;
        }
        if ( !aStore ) {
            this.error( '_binder', 'Store nicht vorhanden' );
            return -1;
        }
        if ( !aJson ) {
            this.error( '_binder', 'Json nicht vorhanden' );
            return -1;
        }
        if ( !aParser ) {
            this.error( '_binder', 'Parser nicht vorhanden' );
            return -1;
        }
        if ( !aInterpreter ) {
            this.error( '_binder', 'Interpreter nicht vorhanden' );
            return -1;
        }
        // Plugins eintragen
        if ( aDialog.insertPlugin( aFileReader.getName(), aFileReader ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aStore.getName(), aStore ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aJson.getName(), aJson ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aParser.getName(), aParser ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aInterpreter.getName(), aInterpreter ) !== 0 ) { return -1; }
        // binden der FileReader-Funktionen
        if ( aDialog.setReadFileFunc( aFileReader.getReadFunc()) !== 0 ) { return -1; }
        aFileReader.onRead = aDialog.getWriteFileDataFunc();
        aFileReader.onError = aDialog.onError;
        // binden von Store an Json
        aJson.setNewDialogFunc( aStore.getNewDialogFunc());
        aJson.setNewDialogStateFunc( aStore.getNewDialogStateFunc());
        // binden von Store an Parser
        aParser.setNewDialogFunc(aStore.getNewDialogFunc());
        aParser.setNewDialogStateFunc(aStore.getNewDialogStateFunc());
        // binden von Store an Interpreter
        aInterpreter.setGetDialogStateFunc(aStore.getGetDialogStateFunc());
        aInterpreter.onError = aDialog.onError;
        // binden von Json und Dialog
        aDialog.setTransformJsonFileFunc(aJson.getTransformJsonFileFunc());
        aDialog.setTransformJsonDataFunc(aJson.getTransformJsonDataFunc());
        aJson.onJsonEnd = aDialog.onDialogJson;
        aJson.onError = aDialog.onError;
        // binden von Parser und Dialog
        aDialog.setParseSpeechDefFileFunc(aParser.getParseSpeechDefFileFunc());
        aDialog.setParseSpeechDefDataFunc(aParser.getParseSpeechDefDataFunc());
        aParser.onParserEnd = aDialog.onDialogParse;
        aParser.onError = aDialog.onError;
        // binden von Interpreter und Dialog
        aInterpreter.onDialogSet = aDialog.onDialogSet;
        aInterpreter.onDialogStart = aDialog.onDialogStart;
        aInterpreter.onDialogStop = aDialog.onDialogStop;
        aInterpreter.onDialogStateSet = aDialog.onDialogStateSet;
        aInterpreter.onDialogAction = aDialog.onDialogAction;
        aInterpreter.onDialogSpeak = aDialog.onDialogSpeak;
        aInterpreter.onDialogSpeakStart = aDialog.onDialogSpeakStart;
        aInterpreter.onDialogSpeakStop = aDialog.onDialogSpeakStop;
        aInterpreter.onError = aDialog.onError;
        return 0;
    }

}
