/** @packageDocumentation
 * Speak Option Schnittstelle
 *
 * API-Version: 1.3
 * Datum:       15.10.2020
 *
 * Letzte Aenderung: 24.10.2020
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// base

import { BaseOptionInterface } from '@speech/base';


/** @export
 * SpeakOption Schnittstelle fuer optionale Konfigurationsparameter von Speak bei der Initialisierung
 */

export interface SpeakOptionInterface extends BaseOptionInterface {
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
