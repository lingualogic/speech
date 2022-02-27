/** @packageDocumentation
 * Public Dialog Aktion Schnittstelle
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
 * Action Event Schnittstelle fuer das Action-Datentransferobjekt
 */

export interface IDialogAction {
    /** definiertes Ereignis */
    event: string;
    /** aktueller Dialogzustand */
    state: string;
    /** definierte Aktion */
    action: string;
    /** Objekttyp fuer die Aktion */
    type: string;
    /** eindeutiger Objektname fuer die Aktion */
    id: string;
}


/**
 * @deprecated Ersetzen mit IDialogAction, wird in Version 0.7 entfernt
 */

export interface DialogServiceActionInterface extends IDialogAction {}

