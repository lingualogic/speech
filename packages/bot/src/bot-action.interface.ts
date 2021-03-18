/**
 * Public Bot Aktion Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       13.07.2020
 *
 * @module bot
 * @author SB
 */


// Global API


/** @export
 * Action Event Schnittstelle fuer das Action-Datentransferobjekt
 */

export interface BotActionInterface {
    /** aktueller Dialogzustand */
    state: string;
    /** definierte Aktion */
    action: string;
    /** Objekttyp fuer die Aktion */
    type: string;
    /** eindeutiger Objektname fuer die Aktion */
    id: string;
}

