/** @packageDocumentation
 * Public Dialog Speak Schnittstelle
 *
 * API-Version: 2.0
 * Datum:   13.10.2021
 *
 * Letzte Aenderung: 13.10.2021
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// Global API


/** @export
 * Speak-Event Schnittstelle fuer das Speak-Datentransferobjekt
 */

export interface IDialogSpeak {
    /** definiertes Ereignis */
    event: string;
    /** aktueller Dialogzustand */
    state: string;
    /** eindeutiger Audiodateiname fuer die Sprachausgabe */
    id: string;
    /** zu synthetisierender Text fuer die Sprachausgabe */
    text: string;
    /** Zeitdauer, die fuer die Sprachausgabe gewartet wird */
    timeout: number;
}


/**
 * @deprecated Ersetzen mit IDialogSpeak, wird in Version 0.7 entfernt
 */

export interface DialogServiceSpeakInterface extends IDialogSpeak {}
