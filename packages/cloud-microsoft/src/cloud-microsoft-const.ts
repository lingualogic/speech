/** @packageDocumentation
 * Globale Konstanten fuer CloudMicrosoft
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// Default-Konstanten

export const CLOUDMICROSOFT_TYPE_NAME = 'CloudMicrosoft';
export const CLOUDMICROSOFT_FACTORY_NAME = 'CloudMicrosoftFactory';
export const CLOUDMICROSOFT_PORT_NAME = 'CloudMicrosoftPort';
export const CLOUDMICROSOFT_MOCK_NAME = 'CloudMicrosoftMock';
export const CLOUDMICROSOFT_DEFAULT_NAME = CLOUDMICROSOFT_PORT_NAME;


// Default URL des CloudMicrosoft-Service

export const CLOUDMICROSOFT_SERVER_URL = '';
export const CLOUDMICROSOFT_DEFAULT_URL = CLOUDMICROSOFT_SERVER_URL;


// Aktionen

export const CLOUDMICROSOFT_NLU_ACTION = 'NLU';
export const CLOUDMICROSOFT_ASR_ACTION = 'ASR';
export const CLOUDMICROSOFT_ASRNLU_ACTION = 'ASRNLU';
export const CLOUDMICROSOFT_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const CLOUDMICROSOFT_CONFIG_PATH = 'assets/';
export const CLOUDMICROSOFT_CONFIG_FILE = 'microsoft.json';
export const CLOUDMICROSOFT_CONFIG_LOAD = false;


// Sprachen


export const CLOUDMICROSOFT_DE_LANGUAGE = 'de-DE';
export const CLOUDMICROSOFT_EN_LANGUAGE = 'en-US';
export const CLOUDMICROSOFT_DEFAULT_LANGUAGE = CLOUDMICROSOFT_DE_LANGUAGE;


// ASR

export const CLOUDMICROSOFT_ASR_LANGUAGE1 = 'deu-DEU';
export const CLOUDMICROSOFT_ASR_LANGUAGE2 = 'eng-USA';
export const CLOUDMICROSOFT_ASR_LANGUAGE = CLOUDMICROSOFT_ASR_LANGUAGE1;

// TTS

export const CLOUDMICROSOFT_TTS_LANGUAGE1 = 'de-DE';
export const CLOUDMICROSOFT_TTS_LANGUAGE2 = 'en-US';
export const CLOUDMICROSOFT_TTS_LANGUAGE = CLOUDMICROSOFT_TTS_LANGUAGE1;


// CloudMicrosoft Stimmen

export const CLOUDMICROSOFT_TTS_VOICE1 = 'de-DE-Hedda';
export const CLOUDMICROSOFT_TTS_VOICE2 = 'de-DE-HeddaRUS';
export const CLOUDMICROSOFT_TTS_VOICE3 = 'de-DE-Stefan-Apollo';
export const CLOUDMICROSOFT_TTS_VOICE = CLOUDMICROSOFT_TTS_VOICE1;
export const CLOUDMICROSOFT_DEFAULT_VOICE = CLOUDMICROSOFT_TTS_VOICE;

export const CLOUDMICROSOFT_AUDIOTTS_ID = 789;


// Audio-Codec

export const CLOUDMICROSOFT_PCM_CODEC = 'audio/L16;rate=16000';
export const CLOUDMICROSOFT_DEFAULT_CODEC = CLOUDMICROSOFT_PCM_CODEC;


// Audio-Konstanten

export const CLOUDMICROSOFT_AUDIOBUFFER_SIZE = 2048;
export const CLOUDMICROSOFT_AUDIOSAMPLE_RATE = 16000;
export const CLOUDMICROSOFT_AUDIO_FORMAT = 'raw-16khz-16bit-mono-pcm';


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

const CLOUDMICROSOFT_NOACTION_TIMEOUT = 0;
