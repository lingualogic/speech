/** @packageDocumentation
 *
 * Nachrichten Interface fuer Komponenten
 *
 * @module core/session
 * @author SB
 */


export interface SessionInterface {
    // eindeutige Session-ID fuer diese Aktion
    session: string;
    // Name der aufrufenden Komponente
    source: string;
    // Aktion
    action: string;
    // Datentyp
    dataType?: string;
    // Daten
    data?: any;
}
