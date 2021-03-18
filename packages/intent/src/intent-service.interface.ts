/** @packageDocumentation
 * Oeffentliche IntentService Schnittstelle, fuer alle IntentService-APIs.
 *
 * API-Version: 1.0
 * Datum:       24.10.2020
 *
 * Letzte Aenderung: 24.10.2020
 * Status: gruen
 *
 * @module intent
 * @author SB
 */


// service

import { ServiceInterface, EventEmitter } from '@speech/service';


// intent

import { IntentDataInterface } from './intent-data.interface';


// Global API


/**
 * IntentService Schnittstelle
 */

export interface IntentServiceInterface extends ServiceInterface {


    // Service-Eigenschaften

    nlu: string;
    nlus: string[];
    language: string;
    languages: string[];
    text: string;


    // Service-Events

    listenResultEvent:  EventEmitter<any>;
    resultEvent: EventEmitter<IntentDataInterface>;


    // NLU-Funktionen


    /**
     * pruefen auf NLU
     */

    isNLU(): boolean;


    /**
     * NLU fuer die Sprachanalyse einfuegen
     *
     * @param {string} aNLUName - Name der einzufuegenden NLU
     * @param {string} aNLUType - Typ der einzufuegenden NLU
     * @param {any} aNLUOption - Optionen fuer die einzufuegende NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    insertNLU( aNLUName: string, aNLUType: string, aNLUOption: any ): number;


    /**
     * NLU entfernen
     *
     * @param {string} aNLUName - Name der einzufuegenden NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeNLU( aNLUName: string ): number;


    /**
     * NLU fuer die Sprachanalyse einstellen
     *
     * @param {string} aNLUName - einzustellende NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setNLU( aNLUName: string ): number;


    /**
     * Rueckgabe der eingestellten NLU
     *
     * @return {string} eingestellte NLU
     */

    getNLU(): string;


    /**
     * Liste aller verfuegbaren NLUs zurueckgeben
     *
     * @return {Array<string>} Liste der vorhandenen NLUs zurueckgeben oder leere Liste
     */

    getNLUList(): Array<string>;


    // Language-Funktionen


    /**
     * Sprache fuer die Spracheingabe einstellen
     *
     * @param {string} aLanguage - einzustellende Sprache als Kurzname ('de' oder 'en')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number;


    /**
     * Rueckgabe der eingestellten Sprache
     *
     * @return {string} eingestellte Sprache als Kurzstring ('de' oder 'en')
     */

    getLanguage(): string;


    /**
     * Liste aller verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en) oder leere Liste
     */

    getLanguageList(): Array<string>;


    /**
     * Eintragen des zu analysierenden Textes
     *
     * @param {string} aText - Text fuer die Sprachanalyse
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setText( aText: string ): number;


    /**
     * Rueckgabe des aktuell eingestellten Analysetextes
     *
     * @return {string} Text
     */

    getText(): string;

}
