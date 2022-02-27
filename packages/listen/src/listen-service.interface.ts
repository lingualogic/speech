/** @packageDocumentation
 * Oeffentliche ListenService Schnittstelle, fuer alle ListenService-APIs.
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module listen
 * @author SB
 */


// service

import { IService, EventEmitter } from '@lingualogic-speech/service';


// Global API


/**
 * ListenService Schnittstelle
 */

export interface IListenService extends IService {


    // Service-Eigenschaften

    asr: string;
    asrs: string[];
    language: string;
    languages: string[];
    mode: string;
    modes: string[];


    // Service-Events

    resultEvent: EventEmitter<any>;
    interimResultEvent: EventEmitter<any>;
    noMatchEvent: EventEmitter<any>;
    recognitionStartEvent: EventEmitter<any>;
    recognitionStopEvent: EventEmitter<any>;
    audioStartEvent: EventEmitter<any>;
    audioStopEvent: EventEmitter<any>;
    soundStartEvent: EventEmitter<any>;
    soundStopEvent: EventEmitter<any>;
    speechStartEvent: EventEmitter<any>;
    speechStopEvent: EventEmitter<any>;


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     */

    isASR(): boolean;


    /**
     * ASR fuer die Spracheingabe einstellen
     *
     * @param {string} aASRName - einzustellende TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number;


    /**
     * Rueckgabe der eingestellten ASR
     *
     * @return {string} eingestellte ASR
     */

    getASR(): string;


    /**
     * Liste aller verfuegbaren ASRs zurueckgeben
     *
     * @return {Array<string>} Liste der vorhandenen ASRs zurueckgeben oder leere Liste
     */

    getASRList(): Array<string>;


    // Timeout-Funktionen


    /**
     * Timeout fuer die Spracheingabe einstellen
     *
     * @param {number} aTimeout - einzustellender Timeout in Millisekunden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTimeout( aTimeout: number ): number;


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


    // Mode-Funktionen


    /**
     * Eingabemodus fuer die Spracheingabe pruefen
     *
     * @param {string} aMode - einzustellender Modus ('Command' oder 'Dictate')
     *
     * @return {number} True, wenn uebergebener Mode gueltig ist, sonst False
     */

    isMode( aMode: string ): boolean;


    /**
     * pruefen ob Eingabemodus Command fuer die Spracheingabe eingestellt ist
     *
     * @return {number} True, wenn Command Modus eingestellt ist, sonst False
     */

    isCommandMode(): boolean;


    /**
     * pruefen ob Eingabemodus Dictate fuer die Spracheingabe eingestellt ist
     *
     * @return {number} True, wenn Dictate Modus eingestellt ist, sonst False
     */

    isDictateMode(): boolean;


    /**
     * Eingabemodus fuer die Spracheingabe einstellen
     *
     * @param {string} aMode - einzustellender Modus ('Command' oder 'Dictate')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number;


    /**
     * Rueckgabe des eingestellten Eingabemodus
     *
     * @return {string} eingestellter Modus ('Command' oder 'Dictate')
     */

    getMode(): string;


    /**
     * Liste aller verfuegbaren Eingabemodi (Command, Dictate) zurueckgeben
     *
     * @return {Array<string>} Liste der Eingabemodi zurueckgeben (Command, Dictate) oder leere Liste
     */

    getModeList(): Array<string>;


}
