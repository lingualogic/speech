/** @packageDocumentation
 * Base Version und Build Konstanten
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module base
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@lingualogic-speech/core';


// Versions-Konstanten

export const BASE_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const BASE_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const BASE_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const BASE_VERSION_DATE = SPEECH_VERSION_DATE;
export const BASE_VERSION_STRING = BASE_VERSION_NUMBER + '.' + BASE_VERSION_BUILD + ' vom ' + BASE_VERSION_DATE + ' (' + BASE_VERSION_TYPE + ')';

export const BASE_API_VERSION = '1.1';
