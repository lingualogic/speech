/** @packageDocumentation
 *
 * Nachrichten Interface fuer Komponenten
 *
 * @module core/message
 * @author SB
 */


export interface IMessage {
    // Typ der Nachricht
    type: string;
    // Name der sendenden Komponente
    source: string;
    // Name der empfangenden Komponente
    dest: string;
    // Nachrichten Aktion
    action: string;
    // session-ID
    session?: string;
    // Nachrichten Daten Typ
    dataType?: string;
    // Nachrichten Daten
    data?: any;
    // Fehler
    error?: any;
}
