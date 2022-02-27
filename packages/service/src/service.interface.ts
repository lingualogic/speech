/** @packageDocumentation
 * Oeffentliche Service Schnittstelle, fuer alle Service-APIs.
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module service
 * @author SB
 */


// service

import { EventEmitter } from './event-emitter';


// Global API


/**
 * Service Schnittstelle
 */

export interface IService {

    // Service-Eigenschaften

    active: boolean;
    errorOutput: boolean;


    // Service-Events

    initEvent:  EventEmitter<any>;
    startEvent: EventEmitter<any>;
    stopEvent: EventEmitter<any>;
    errorEvent: EventEmitter<any>;


    // Service-Funktionen


    /**
     * Komponenten-Name zurueckgeben
     *
     * @return Komponenten-Name
     */

    getComponentName(): string;


    /**
     * Name der konkreten Service-Instanz zurueckgeben
     *
     * @return Service-Name
     */

    getName(): string;


    /**
     * Version des Services zurueckgeben
     *
     * @return Service-Version
     */

    getVersion(): string;


    /**
     * API-Version des Services zurueckgeben
     *
     * @return API-Version des Service
     */

    getApiVersion(): string;


    /**
     * Initialisierung des Service
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     * @return  Fehlercode 0 oder -1
     */

    init( aOption?: any): number;


    /**
     * Service auf initialen Zustand zuruecksetzen
     *
     * @param {*} aOption - optionale Parameter
     */

    reset( aOption?: any ): number;


    /**
     * pruefen auf initialisierten Service
     *
     * @return {boolean} Rueckgabe, ob Service initialisiert ist
     */

    isInit(): boolean;


    /**
     * pruefen auf aktiven Service
     *
     * @return {boolean} activeFlag
     */

    isActive(): boolean;


    /**
     * Service aktivieren
     *
     * @return {number} Fehercode 0 oder -1
     */

    setActiveOn(): number;


    /**
     * Service daktivieren
     *
     * @return {number} Fehlercode oder -1
     */

    setActiveOff(): number;


    /**
     * pruefen auf Fehlerausgabe auf die Konsole
     *
     * @return {boolean} errorOutputFlag
     */

    isErrorOutput(): boolean;


    /**
     * Fehlerausgabe auf Konsole einschalten
     */

    setErrorOutputOn(): void;


    /**
     * Fehlerausgabe auf Konsole ausschalten
     */

    setErrorOutputOff(): void;


    // Service-Funktionen


    /**
     * pruefen, ob Service gerade beschaeftigt ist
     *
     * @return True, Service ist beschaeftigt, False sonst
     */

    isRunning(): boolean;


    /**
     * Startet die Aufgabe.
     *
     * @return Fehlercode 0 oder -1
     */

    start(): number;


    /**
     * Stoppt die Aufgabe
     *
     * @return Fehlercode 0 oder -1
     */

    stop(): number;


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * @param aTestCommand - Testkommando
     * @param aTestData - optionale Testdaten
     *
     * @return Rueckgabe der Testergebnisse
     */

    test( aTestCommand: string, aTestData?: any ): any;

}
