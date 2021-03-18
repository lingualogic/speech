/** @packageDocumentation
 * Globale Konstanten fuer CloudAmazon
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// Default-Konstanten

export const CLOUDAMAZON_TYPE_NAME = 'CloudAmazon';
export const CLOUDAMAZON_FACTORY_NAME = 'CloudAmazonFactory';
export const CLOUDAMAZON_PORT_NAME = 'CloudAmazonPort';
export const CLOUDAMAZON_MOCK_NAME = 'CloudAmazonMock';
export const CLOUDAMAZON_DEFAULT_NAME = CLOUDAMAZON_PORT_NAME;


// Default URL des Amazon-Service

export const CLOUDAMAZON_SERVER_URL = '';
export const CLOUDAMAZON_DEFAULT_URL = CLOUDAMAZON_SERVER_URL;


// Aktionen

export const CLOUDAMAZON_NLU_ACTION = 'NLU';
export const CLOUDAMAZON_ASR_ACTION = 'ASR';
export const CLOUDAMAZON_ASRNLU_ACTION = 'ASRNLU';
export const CLOUDAMAZON_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const CLOUDAMAZON_CONFIG_PATH = 'assets/';
export const CLOUDAMAZON_CONFIG_FILE = 'cloud-amazon.json';
export const CLOUDAMAZON_CONFIG_LOAD = false;


// Sprachen


export const CLOUDAMAZON_DE_LANGUAGE = 'de-DE';
export const CLOUDAMAZON_EN_LANGUAGE = 'en-US';
export const CLOUDAMAZON_DEFAULT_LANGUAGE = CLOUDAMAZON_DE_LANGUAGE;


// ASR

export const CLOUDAMAZON_ASR_LANGUAGE1 = 'deu-DEU';
export const CLOUDAMAZON_ASR_LANGUAGE2 = 'eng-USA';
export const CLOUDAMAZON_ASR_LANGUAGE = CLOUDAMAZON_ASR_LANGUAGE1;

// TTS

export const CLOUDAMAZON_TTS_LANGUAGE1 = 'de-DE';
export const CLOUDAMAZON_TTS_LANGUAGE2 = 'en-US';
export const CLOUDAMAZON_TTS_LANGUAGE = CLOUDAMAZON_TTS_LANGUAGE1;


// Amazon Stimmen

export const CLOUDAMAZON_TTS_VOICE1 = 'Vicki';
export const CLOUDAMAZON_TTS_VOICE2 = 'Markus';
export const CLOUDAMAZON_TTS_VOICE3 = 'Anna-ML';
export const CLOUDAMAZON_TTS_VOICE4 = 'Petra-ML';
export const CLOUDAMAZON_TTS_VOICE = CLOUDAMAZON_TTS_VOICE1;
export const CLOUDAMAZON_DEFAULT_VOICE = CLOUDAMAZON_TTS_VOICE;

export const CLOUDAMAZON_AUDIOTTS_ID = 789;


// Audio-Codec

export const CLOUDAMAZON_PCM_CODEC = 'audio/L16;rate=16000';
export const CLOUDAMAZON_DEFAULT_CODEC = CLOUDAMAZON_PCM_CODEC;


// Audio-Konstanten

export const CLOUDAMAZON_AUDIOBUFFER_SIZE = 2048;
export const CLOUDAMAZON_AUDIOSAMPLE_RATE = 16000;
export const CLOUDAMAZON_AUDIO_FORMAT = 'pcm';


// Wenn der Action-Timeout im Port abgeschaltet werden soll

export const CLOUDAMAZON_NOACTION_TIMEOUT = 0;
