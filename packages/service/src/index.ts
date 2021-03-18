/** @packageDocumentation
 * Globale Export-Datei fuer Service
 *
 * Version: 1.0
 * Datum:   15.10.2020
 *
 * Definiert das gesamte Service-API:
 *
 * @module service
 * @author SB
 */


// Global API

export { EventEmitter, EventEmitterFunc } from './event-emitter';

export * from './service-const';
export { SERVICE_API_VERSION, SERVICE_VERSION_STRING } from './service-version';
export { ServiceLock } from './service-lock';
export { ServiceManager } from './service-manager';
export { ServiceInterface } from './service.interface';
export { Service } from './service';
