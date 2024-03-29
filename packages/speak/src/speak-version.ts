/** @packageDocumentation
 * Speak Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum:   05.09.2018
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@lingualogic-speech/core';


// Versions-Konstanten

export const SPEAK_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const SPEAK_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const SPEAK_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const SPEAK_VERSION_DATE = SPEECH_VERSION_DATE;
export const SPEAK_VERSION_STRING = SPEAK_VERSION_NUMBER + '.' + SPEAK_VERSION_BUILD + ' vom ' + SPEAK_VERSION_DATE + ' (' + SPEAK_VERSION_TYPE + ')';

export const SPEAK_API_VERSION = '1.4';
