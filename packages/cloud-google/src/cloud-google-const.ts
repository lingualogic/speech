/** @packageDocumentation
 * Globale Konstanten fuer CloudGoogle
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// Default-Konstanten

export const CLOUDGOOGLE_TYPE_NAME = 'CloudGoogle';
export const CLOUDGOOGLE_FACTORY_NAME = 'CloudGoogleFactory';
export const CLOUDGOOGLE_PORT_NAME = 'CloudGooglePort';
export const CLOUDGOOGLE_MOCK_NAME = 'CloudGoogleMock';
export const CLOUDGOOGLE_DEFAULT_NAME = CLOUDGOOGLE_PORT_NAME;


// Default URL des Amazon-Service

export const CLOUDGOOGLE_SERVER_URL = 'ws://localhost:7050';
export const CLOUDGOOGLE_DEFAULT_URL = CLOUDGOOGLE_SERVER_URL;


// Aktionen

export const CLOUDGOOGLE_NLU_ACTION = 'NLU';
export const CLOUDGOOGLE_ASR_ACTION = 'ASR';
export const CLOUDGOOGLE_ASRNLU_ACTION = 'ASRNLU';
export const CLOUDGOOGLE_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const CLOUDGOOGLE_CONFIG_PATH = 'assets/';
export const CLOUDGOOGLE_CONFIG_FILE = 'cloud-google.json';
export const CLOUDGOOGLE_CONFIG_LOAD = false;


// Sprachen


export const CLOUDGOOGLE_DE_LANGUAGE = 'de-DE';
export const CLOUDGOOGLE_EN_LANGUAGE = 'en-US';
export const CLOUDGOOGLE_DEFAULT_LANGUAGE = CLOUDGOOGLE_DE_LANGUAGE;

// NLU

export const CLOUDGOOGLE_NLU2_FLAG = true;

// ASR

export const CLOUDGOOGLE_ASR_LANGUAGE1 = 'de-DE';
export const CLOUDGOOGLE_ASR_LANGUAGE2 = 'en-US';
export const CLOUDGOOGLE_ASR_LANGUAGE = CLOUDGOOGLE_ASR_LANGUAGE1;

// TTS

export const CLOUDGOOGLE_TTS_LANGUAGE1 = 'de-DE';
export const CLOUDGOOGLE_TTS_LANGUAGE2 = 'en-US';
export const CLOUDGOOGLE_TTS_LANGUAGE = CLOUDGOOGLE_TTS_LANGUAGE1;


// Amazon Stimmen

export const CLOUDGOOGLE_TTS_VOICE1 = 'Yannick';
export const CLOUDGOOGLE_TTS_VOICE2 = 'Markus';
export const CLOUDGOOGLE_TTS_VOICE3 = 'Anna-ML';
export const CLOUDGOOGLE_TTS_VOICE4 = 'Petra-ML';
export const CLOUDGOOGLE_TTS_VOICE = CLOUDGOOGLE_TTS_VOICE4;
export const CLOUDGOOGLE_DEFAULT_VOICE = CLOUDGOOGLE_TTS_VOICE;

export const CLOUDGOOGLE_AUDIOTTS_ID = 789;


// Audio-Codec

export const CLOUDGOOGLE_PCM_CODEC = 'audio/L16;rate=16000';
export const CLOUDGOOGLE_DEFAULT_CODEC = CLOUDGOOGLE_PCM_CODEC;


// Audio-Konstanten

export const CLOUDGOOGLE_AUDIOBUFFER_SIZE = 2048;
export const CLOUDGOOGLE_AUDIOSAMPLE_RATE = 16000;


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

export const CLOUDGOOGLE_NOACTION_TIMEOUT = 0;
