/** @packageDocumentation
 * Event Rueckgabedaten, die jeder Event zurueckgibt
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/event
 * @author SB
 */


export interface IEventData {
    // Event
    event: string;
    // Eventtyp
    type: string;
    // Quelle, die den Event erzeugt hat
    source: string;
    // Ziel, welches den Event empfaengt
    dest: string;
    // Rueckgabewert des Events (0, -1)
    result: number;
    // beliebige Daten
    data: any;
}
