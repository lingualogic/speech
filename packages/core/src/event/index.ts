/** @packageDocumentation
 * Globale Export-Datei fuer Event
 *
 * Version: 2.0
 * Datum:   28.06.2021
 *
 * Definiert das gesamte Event-API:
 *
 *      EventFunctionList  - Liste von Observern fuer den gleichen Event
 *      EventEmitter       - Liste von Observern fuer den gleichen Event (RxJS-Schnittstelle)
 *
 * @module core/event
 * @author SB
 */


// Global API


export { EventFunc } from './event-function.type';
export { IEventData } from './event-data.interface';
export { EventFunctionList } from './event-function-list';
