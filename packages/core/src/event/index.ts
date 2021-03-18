/** @packageDocumentation
 * Globale Export-Datei fuer Event
 *
 * Version: 1.1
 * Datum:   24.10.2020
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
export { EventDataInterface } from './event-data.interface';
export { EventFunctionList } from './event-function-list';
