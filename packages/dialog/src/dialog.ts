/** @packageDocumentation
 * Dialog API Wrapper fuer DialogComponent
 *
 * Letzte Aenderung: 27.10.2020
 * Status: rot
 *
 * @module dialog
 * @author SB
 */


// core

import { OnSpeechErrorFunc } from '@speech/core';


// base

import { Base } from '@speech/base';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_ASYNC_EVENT } from './dialog-const';
import {
    OnDialogJsonFunc,
    OnDialogParseFunc,
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc
} from './dialog-function.type';
import { DialogStateContextInterface } from './dialog-state-context.interface';
import { DialogActionInterface } from './dialog-action.interface';
import { DialogOptionInterface } from './dialog-option.interface';
import { DialogDataInterface } from './dialog-data.interface';
import { DialogSpeakInterface } from './dialog-speak.interface';
import { DialogInterface } from './dialog.interface';
import { DialogComponentInterface } from './component/dialog-component.interface';


/** @export
 * Dialog Klasse als API-Wrapper fuer die DialogComponent
 */

export class Dialog extends Base implements DialogInterface {


    // interne Dialog-Komponente

    private mDialogComponent: DialogComponentInterface;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Dialogs
     */

    constructor( aOption?: DialogOptionInterface ) {
        super( aOption );
        this.mDialogComponent = this.mComponent as DialogComponentInterface;
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    protected _getBuilderName(): string {
        return DIALOG_TYPE_NAME;
    }


    // Event-Funktionen


    addDialogJsonEvent( aPluginName: string, aEventFunc: OnDialogJsonFunc ): number {
        return this.mDialogComponent.addDialogJsonEvent( aPluginName, aEventFunc );
    }

    addDialogParseEvent( aPluginName: string, aEventFunc: OnDialogParseFunc ): number {
        return this.mDialogComponent.addDialogParseEvent( aPluginName, aEventFunc );
    }

    addDialogSetEvent( aPluginName: string, aEventFunc: OnDialogSetFunc ): number {
        return this.mDialogComponent.addDialogSetEvent( aPluginName, aEventFunc );
    }

    addDialogStartEvent( aPluginName: string, aEventFunc: OnDialogStartFunc ): number {
        return this.mDialogComponent.addDialogStartEvent( aPluginName, aEventFunc );
    }

    addDialogStopEvent( aPluginName: string, aEventFunc: OnDialogStopFunc ): number {
        return this.mDialogComponent.addDialogStopEvent( aPluginName, aEventFunc );
    }

    addDialogStateSetEvent( aPluginName: string, aEventFunc: OnDialogStateSetFunc ): number {
        return this.mDialogComponent.addDialogStateSetEvent( aPluginName, aEventFunc );
    }

    addDialogActionEvent( aPluginName: string, aEventFunc: OnDialogActionFunc ): number {
        return this.mDialogComponent.addDialogActionEvent( aPluginName, aEventFunc );
    }

    addDialogActionStopEvent( aPluginName: string, aEventFunc: OnDialogActionStopFunc ): number {
        return this.mDialogComponent.addDialogActionStopEvent( aPluginName, aEventFunc );
    }

    addDialogSpeakEvent( aPluginName: string, aEventFunc: OnDialogSpeakFunc ): number {
        return this.mDialogComponent.addDialogSpeakEvent( aPluginName, aEventFunc );
    }

    addDialogSpeakStartEvent( aPluginName: string, aEventFunc: OnDialogSpeakStartFunc ): number {
        return this.mDialogComponent.addDialogSpeakStartEvent( aPluginName, aEventFunc );
    }

    addDialogSpeakStopEvent( aPluginName: string, aEventFunc: OnDialogSpeakStopFunc ): number {
        return this.mDialogComponent.addDialogSpeakStopEvent( aPluginName, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        return this.mDialogComponent.addErrorEvent( aPluginName, aEventFunc );
    }

    removeDialogJsonEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogJsonEvent( aPluginName );
    }

    removeDialogParseEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogParseEvent( aPluginName );
    }

    removeDialogSetEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogSetEvent( aPluginName );
    }
    removeDialogStartEvent( aPluginName ): number {
        return this.mDialogComponent.removeDialogStartEvent( aPluginName );
    }

    removeDialogStopEvent( aPluginName ): number {
        return this.mDialogComponent.removeDialogStopEvent( aPluginName );
    }

    removeDialogStateSetEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogStateSetEvent( aPluginName );
    }

    removeDialogActionEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogActionEvent( aPluginName );
    }

    removeDialogActionStopEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogActionStopEvent( aPluginName );
    }

    removeDialogSpeakEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogSpeakEvent( aPluginName );
    }

    removeDialogSpeakStartEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogSpeakStartEvent( aPluginName );
    }

    removeDialogSpeakStopEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeDialogSpeakStopEvent( aPluginName );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeErrorEvent( aPluginName );
    }

    removeAllEvent( aPluginName: string ): number {
        return this.mDialogComponent.removeAllEvent( aPluginName );
    }


    // Json-Funktionen


    transformJsonFile( aJsonFileName: string ): number {
        return this.mDialogComponent.transformJsonFile( aJsonFileName );
    }


    transformJsonData( aJsonData: DialogDataInterface[]): number {
        return this.mDialogComponent.transformJsonData( aJsonData );
    }


    /**
     * Json-Daten importieren und im Dialogspeicher ablegen
     *
     * @param {DialogServiceDataInterface} aJsonDialogData - Json-Dialogdaten
     *
     * @returns {number}
     */

    import( aJsonDialogData: DialogDataInterface[]): number {
        return this.transformJsonData( aJsonDialogData );
    }


    // Parser-Funktionen


    parseSpeechDefFile( aDefFileName: string ): number {
        return this.mDialogComponent.parseSpeechDefFile( aDefFileName );
    }


    parseSpeechDefData( aDefData: string ): number {
        return this.mDialogComponent.parseSpeechDefData( aDefData );
    }


    // Dialog-Funktionen


    clearDialog(): number {
        return this.mDialogComponent.clearDialog();
    }

    setDialog( aDialogName: string ): number {
        return this.mDialogComponent.setDialog( aDialogName );
    }

    getDialog(): string {
        return this.mDialogComponent.getDialog();
    }


    toggleDialog(): number {
        return this.mDialogComponent.toggleDialog();
    }


    /**
     * Dialog ein/ausschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    toggle(): number {
        return this.toggleDialog();
    }


    setDialogFilePath( aDialogFilePath: string ): number {
        return this.mDialogComponent.setDialogFilePath( aDialogFilePath );
    }

    getDialogFilePath(): string {
        return this.mDialogComponent.getDialogFilePath();
    }


    /**
     * Eintragen eines Dialogdateiverzeichnisses (z.B. 'assets/speech/').
     * Muss mit '/' abgeschlossen werden !
     *
     * @param {string} aFilePath - lokales Verzeichnis zu den Dialogdaten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setPath( aFilePath: string): number {
        return this.setDialogFilePath( aFilePath );
    }


    /**
     * Rueckgabe des aktuell eingetragenen Dialogverzeichnisses
     *
     * @return {string} aktuelles Dialogverzeichnis zurueckgeben
     */

    getPath(): string {
        return this.getDialogFilePath();
    }


    setDialogFileName( aDialogFileName: string ): number {
        return this.mDialogComponent.setDialogFileName( aDialogFileName );
    }

    getDialogFileName(): string {
        return this.mDialogComponent.getDialogFileName();
    }


    /**
     * Eintragen einer Dialogdatei (z.B. 'speech.def'). Beinhalted das
     * Dialogskript fuer den Dialoginterpreter.
     *
     * @param {string} aFileName - Dialogskriptdateiname
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setFile( aFileName: string): number {
        return this.setDialogFileName( aFileName );
    }


    /**
     * Rueckgabe des aktuell eingetragenen Dialogdateinamens
     *
     * @return {string} aktuellen Dialogdateinamen zurueckgeben
     */

    getFile(): string {
        return this.getDialogFileName();
    }


    loadDialogFile( aDialogFileName: string ): number {
        return this.mDialogComponent.loadDialogFile( aDialogFileName );
    }

    writeDialogData( aDialogData: string ): number {
        return this.mDialogComponent.writeDialogData( aDialogData );
    }


    /**
     * Dialogskript parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogData - Dialogskript
     *
     * @returns {number}
     */

    parse( aDialogData: string ): number {
        return this.writeDialogData( aDialogData );
    }


    /**
     * Dialogskript Datei parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogFileName - Dialogskript Dateiname
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    parseFile( aDialogFileName?: string ): number {
        return this.loadDialogFile( aDialogFileName );
    }


    skipNextSpeak(): number {
        return this.mDialogComponent.skipNextSpeak();
    }


    // Zustands-Funktionen


    setDialogState( aState: string, aContext?: DialogStateContextInterface ): number {
        return this.mDialogComponent.setDialogState( aState, aContext );
    }

    getDialogState(): string {
        return this.mDialogComponent.getDialogState();
    }


    /**
     * Dialogzustand setzen
     *
     * @param {string} aStateName - Name des Dialogzustands im Dialogskript
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setState( aStateName: string ): number {
        return this.setDialogState( aStateName );
    }


    /**
     * Hier wird der aktuelle Dialogzustand zurueckgegeben
     *
     * @return {string} Rueckgabe des Dialogzustandsnamens
     */

    getState(): string {
        return this.getDialogState();
    }


    setDialogStateContext( aContext: DialogStateContextInterface ): number {
        return this.mDialogComponent.setDialogStateContext( aContext );
    }


    /**
     * Dialogzustandskontext eintragen. Der Kontext dient zur variablen Steuerung der Dialogzustaende.
     *
     * @param {*} aStateContext - Dialogzustantskontext
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    setStateContext( aStateContext: any ): number {
        return this.setDialogStateContext( aStateContext );
    }


    // Kontext-Funktionen


    clearContext(): number {
        return this.mDialogComponent.clearContext();
    }

    addContextElement( aElementName: string, aContextName: string ): number {
        return this.mDialogComponent.addContextElement( aElementName, aContextName );
    }

    removeContextElement( aElementName: string, aContextName: string ): number {
        return this.mDialogComponent.removeContextElement( aElementName, aContextName );
    }

}
