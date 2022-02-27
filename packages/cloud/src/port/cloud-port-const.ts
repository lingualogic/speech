/** @packageDocumentation
 * Globale Konstanten fuer CloudGoogle
 *
 * Letzte Aenderung: 25.10.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */



// Port-Group Konstanten

export const CLOUD_PORTCREATE_FLAG = true;   // definiert den Defaultwert fuer die Erzeugung der Ports


// Default URL des Amazon-Service

export const CLOUD_TYPE_NAME = 'CloudPort';
export const CLOUD_FACTORY_NAME = 'CloudPortFactory';
export const CLOUD_PORT_NAME = 'CloudPort';
export const CLOUD_MOCK_NAME = 'CloudPortMock';
export const CLOUD_DEFAULT_NAME = CLOUD_PORT_NAME;

export const CLOUD_SERVER_URL = 'ws://localhost:7050';
export const CLOUD_DEFAULT_URL = CLOUD_SERVER_URL;


// Aktionen

export const CLOUD_NLU_ACTION = 'NLU';
export const CLOUD_ASR_ACTION = 'ASR';
export const CLOUD_ASRNLU_ACTION = 'ASRNLU';
export const CLOUD_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const CLOUD_CONFIG_PATH = 'assets/';
export const CLOUD_CONFIG_FILE = 'cloud.json';
export const CLOUD_CONFIG_LOAD = false;


// Sprachen


export const CLOUD_DE_LANGUAGE = 'de-DE';
export const CLOUD_EN_LANGUAGE = 'en-US';
export const CLOUD_DEFAULT_LANGUAGE = CLOUD_DE_LANGUAGE;

// NLU

export const CLOUD_NLU2_FLAG = true;

// ASR

export const CLOUD_ASR_LANGUAGE1 = 'de-DE';
export const CLOUD_ASR_LANGUAGE2 = 'en-US';
export const CLOUD_ASR_LANGUAGE = CLOUD_ASR_LANGUAGE1;

// TTS

export const CLOUD_TTS_LANGUAGE1 = 'de-DE';
export const CLOUD_TTS_LANGUAGE2 = 'en-US';
export const CLOUD_TTS_LANGUAGE = CLOUD_TTS_LANGUAGE1;


