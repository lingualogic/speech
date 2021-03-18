/** @packageDocumentation
 * Agent-Version
 *
 * Letzte Aenderung: 28.10.2020
 * Status: rot
 *
 * @module agent
 * @author SB
 */


// core

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@speech/core';


// Versions-Konstanten

export const AGENT_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const AGENT_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const AGENT_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const AGENT_VERSION_DATE = SPEECH_VERSION_DATE;
export const AGENT_VERSION_STRING = AGENT_VERSION_NUMBER + '.' + AGENT_VERSION_BUILD + ' vom ' + AGENT_VERSION_DATE + ' (' + AGENT_VERSION_TYPE + ')';

export const AGENT_API_VERSION = '1.0';
