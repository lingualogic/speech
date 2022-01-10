/** @packageDocumentation
 * TTS Schnittstelle
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gelb
 *
 * @module speak/tts
 * @author SB
 */


// plugin

import { IPlugin } from '@speech/core';


// Funktionen

export type TTSStartSpeakFunc = (aText: string) => number;
export type TTSStopSpeakFunc = () => number;


// Events

export type OnTTSSpeakStartFunc = () => number;
export type OnTTSSpeakStopFunc = () => number;


/**
 * ITTS Interface
 */

export interface ITTS extends IPlugin {

    // Speak-Events

    onSpeakStart: OnTTSSpeakStartFunc;
    onSpeakStop: OnTTSSpeakStopFunc;


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     *
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean;


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number;


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string;


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string>;


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {SpeakLanguage} aLanguage
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number;


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {SpeakLanguage}
     * @memberof ISpeak
     */

    getLanguage(): string;

    getLanguageList(): Array<string>;


    // Voice-Funktionen


    setVoice( aVoice: string ): number;
    getVoice(): string;

    getVoiceList(): Array<string>;


    // Speak-Funktionen


    isSpeakRunning(): boolean;
    startSpeak( aText: string ): number;
    stopSpeak(): number;

    // Binding-Funktionen

    getStartSpeakFunc(): TTSStartSpeakFunc;
    getStopSpeakFunc(): TTSStopSpeakFunc;

}
