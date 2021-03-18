/** @packageDocumentation
 * Funktionstypen fuer Service
 *
 * API-Version: 1.0
 * Datum: 15.10.2020
 *
 * Letzte Aenderung: 15.10.2020
 * Status: rot
 *
 * @module service
 * @author SB
 */


// Global API


// Funktionen

/** Definiert die Start Funktion */
export type ServiceStartFunc = () => number;
/** Definiert die Stop Funktion */
export type ServiceStopFunc = () => number;


// Events

/** Definiert Ereignisfunktion fuer gestarteten Service */
export type OnServiceStartFunc = () => number;
/** Definiert Ereignisfunktion fuer beendeten Service */
export type OnServiceStopFunc = () => number;
