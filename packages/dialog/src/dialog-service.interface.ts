/** @packageDocumentation
 * Oeffentliche Dialog Schnittstelle
 *
 * API-Version: 2.1
 * Datum:   02.02.2022
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module dialog
 * @author SB
 */


// service

import { IService, EventEmitter } from '@lingualogic-speech/service';


// dialog

import { IDialogStateContext } from './dialog-state-context.interface';
import { IDialogAction } from './dialog-action.interface';
import { IDialogData } from './dialog-data.interface';
import { IDialogSpeak } from './dialog-speak.interface';


// Global API


/** @export
 * Dialog Schnittstelle
 */

export interface IDialogService extends IService {

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
    actionEvent: EventEmitter<IDialogAction>;
    actionStopEvent: EventEmitter<any>;
    speakEvent: EventEmitter<IDialogSpeak>;
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

    import( aJsonDialogData: IDialogData[]): number;


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
     * pruefen, ob es den Zustand ueberhaupt gibt
     * 
     * @param aState - Name des zu pruefenden Zustands
     * @returns True - Zustand existiert
     */
    
    isExistState( aState: string ): boolean;


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
