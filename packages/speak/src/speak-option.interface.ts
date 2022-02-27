/** @packageDocumentation
 * Speak Option Schnittstelle
 *
 * API-Version: 2.0
 * Datum:       13.10.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// base

import { IBaseOption } from '@lingualogic-speech/base';


/** @export
 * SpeakOption Schnittstelle fuer optionale Konfigurationsparameter von Speak bei der Initialisierung
 */

export interface ISpeakOption extends IBaseOption {
    /** setzt die Sprache fuer die Sprachausgabe ( de, en )*/
    speakLanguage?: string;
    /** globaler Audiokontext wird von HTML5 definiert, und der App uebergeben */
    audioContext?: AudioContext;
    /** Audioformat MP3 oder WAV */
    audioFormat?: string;
    /** Verzeichnis, in dem die Audiodateien liegen */
    audioFilePath?: string;
    /** True, wenn Audiodateien abgespielt werden sollen */
    audioFlag?: boolean;
}


/**
 * @deprecated Ersetzen mit ISpeakOption, wird in Version 0.7 entfernt
 */

/* typescript-eslint-disable no-empty-interface */ 
export interface SpeakServiceOptionInterface extends ISpeakOption {}
