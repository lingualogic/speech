/** @packageDocumentation
 * service Version und Build Konstanten
 *
 * Letzte Aenderung: 15.10.2020
 * Status: gruen
 *
 * @module service
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@speech/core';


// Versions-Konstanten

export const SERVICE_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const SERVICE_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const SERVICE_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const SERVICE_VERSION_DATE = SPEECH_VERSION_DATE;
export const SERVICE_VERSION_STRING = SERVICE_VERSION_NUMBER + '.' + SERVICE_VERSION_BUILD + ' vom ' + SERVICE_VERSION_DATE + ' (' + SERVICE_VERSION_TYPE + ')';

export const SERVICE_API_VERSION = '1.0';
