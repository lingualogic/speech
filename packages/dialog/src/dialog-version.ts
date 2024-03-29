/** @packageDocumentation
 * Dialog Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum:   07.09.2018
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// core

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@lingualogic-speech/core';

// Versions-Konstanten

export const DIALOG_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const DIALOG_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const DIALOG_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const DIALOG_VERSION_DATE = SPEECH_VERSION_DATE;
export const DIALOG_VERSION_STRING = DIALOG_VERSION_NUMBER + '.' + DIALOG_VERSION_BUILD + ' vom ' + DIALOG_VERSION_DATE + ' (' + DIALOG_VERSION_TYPE + ')';

export const DIALOG_API_VERSION = DIALOG_VERSION_STRING;
