/** @packageDocumentation
 * Oeffentliche Dialog Schnittstelle
 *
 * API-Version: 1.3
 * Datum:   07.09.2019
 *
 * Letzte Aenderung: 28.10.2020
 * Status: rot
 *
 * @module dialog
 * @author SB
 */


// service

import { ServiceInterface, EventEmitter } from '@speech/service';


// dialog

import { DialogStateContextInterface } from './dialog-state-context.interface';
import { DialogActionInterface } from './dialog-action.interface';
import { DialogDataInterface } from './dialog-data.interface';
import { DialogSpeakInterface } from './dialog-speak.interface';


// Global API


/** @export
 * Dialog Schnittstelle
 */

export interface DialogServiceInterface extends ServiceInterface {

    // Service-Attribute

    /**
     * Eigenschaft Path eintragen fuer das Dialogverzeichnis.
     */

    path: string;


    /**
     * Eigenschaft File eintragen fuer die aktuelle Dialogdatei.
     */

    file: string;


    /**
     * Eigenschaft Dialog eintragen.
     */

    dialog: string;


    /**
     * Eigenschaft State setzen.
     */

    state: string;


    /**
     * Eigenschaft Kontext eintragen.
     */

    context: any;


    // Service-Events

    setDialogEvent: EventEmitter<string>;
    importEvent: EventEmitter<any>;
    parseEvent: EventEmitter<any>;
    startEvent: EventEmitter<any>;
    stopEvent: EventEmitter<any>;
    setStateEvent: EventEmitter<string>;
    actionEvent: EventEmitter<DialogActionInterface>;
    actionStopEvent: EventEmitter<any>;
    speakEvent: EventEmitter<DialogSpeakInterface>;
    speakStopEvent: EventEmitter<any>;


    // Dialog-Funktionen


    /**
     * Eintragen eines Dialogdateiverzeichnisses (z.B. 'assets/speech/').
     * Muss mit '/' abgeschlossen werden !
     *
     * @param {string} aFilePath - lokales Verzeichnis zu den Dialogdaten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setPath( aFilePath: string): number;


    /**
     * Rueckgabe des aktuell eingetragenen Dialogverzeichnisses
     *
     * @return {string} aktuelles Dialogverzeichnis zurueckgeben
     */

    getPath(): string;


    /**
     * Eintragen einer Dialogdatei (z.B. 'speech.def'). Beinhalted das
     * Dialogskript fuer den Dialoginterpreter.
     *
     * @param {string} aFileName - Dialogskriptdateiname
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setFile( aFileName: string): number;


    /**
     * Rueckgabe des aktuell eingetragenen Dialogdateinamens
     *
     * @return {string} aktuellen Dialogdateinamen zurueckgeben
     */

    getFile(): string;


    /**
     * alle Dialogdaten aus dem Dialogspeicher loeschen.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearDialog(): number;


    /**
     * Dialog ueber seinen Namen einstellen. Der Dialog muss im Dialogskript vorhanden sein.
     *
     * @param {string} aDialogName - Name des Dialogs im Dialogskript
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialog( aDialogName: string ): number;


    /**
     * Aktuell eingestellten Dialog zurueckgeben
     *
     * @return {string} Rueckgabe des Dialognamens
     */

    getDialog(): string;


    /**
     * Json-Daten importieren und im Dialogspeicher ablegen
     *
     * @param aJsonDialogData - Json-Dialogdaten
     *
     * @returns {number}
     */

    import( aJsonDialogData: DialogDataInterface[]): number;


    /**
     * Dialogskript parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogData - Dialogskript
     *
     * @returns {number}
     */

    parse( aDialogData: string ): number;


    /**
     * Dialogskript Datei parsen und im Dialogspeicher ablegen
     *
     * @param {string} aDialogFileName - Dialogskript Dateiname
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    parseFile( aDialogFileName?: string ): number;


    /**
     * Dialog ein/ausschalten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    toggle(): number;


    // Dialogzustands-Funktionen


    /**
     * Dialogzustand setzen
     *
     * @param {string} aStateName - Name des Dialogzustands im Dialogskript
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setState( aStateName: string ): number;


    /**
     * Hier wird der aktuelle Dialogzustand zurueckgegeben
     *
     * @return {string} Rueckgabe des Dialogzustandsnamens
     */

    getState(): string;


    /**
     * Dialogzustandskontext eintragen. Der Kontext dient zur variablen Steuerung der Dialogzustaende.
     *
     * @param {*} aStateContext - Dialogzustantskontext
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    setStateContext( aStateContext: any ): number;



    // Kontext-Funktionen


    /**
     * Loeschen des aktuellen Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearContext(): number;


    /**
     * Eintragen eines Kontextes zu einem Element.
     *
     * @param {string} aElementName - Name des Elementes
     * @param {string} aContextName - Name des Kontexts
     *
     * @returns {number}
     */

    addContextElement( aElementName: string, aContextName: string ): number;


    /**
     * Entfernen eines Kontextes zu einem Element.
     *
     * @param {string} aElementName - Name des Elementes
     * @param {string} aContextName - Name des Kontexts
     *
     * @returns {number}
     */

    removeContextElement( aElementName: string, aContextName: string ): number;

}
