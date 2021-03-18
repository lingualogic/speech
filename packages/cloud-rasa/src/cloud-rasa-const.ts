/** @packageDocumentation
 * Globale Konstanten fuer CloudRasa
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// Default-Konstanten

export const CLOUDRASA_TYPE_NAME = 'CloudRasa';
export const CLOUDRASA_FACTORY_NAME = 'CloudRasaFactory';
export const CLOUDRASA_PORT_NAME = 'CloudRasaPort';
export const CLOUDRASA_MOCK_NAME = 'CloudRasaMock';
export const CLOUDRASA_DEFAULT_NAME = CLOUDRASA_PORT_NAME;


// Default URL des CloudRasa-Service

export const CLOUDRASA_SERVER_URL = 'http://localhost:5005';
export const CLOUDRASA_DEFAULT_URL = CLOUDRASA_SERVER_URL;


// Aktionen

export const CLOUDRASA_NLU_ACTION = 'NLU';


// Konfigurationsdaten

export const CLOUDRASA_CONFIG_PATH = 'assets/';
export const CLOUDRASA_CONFIG_FILE = 'cloud-rasa.json';
export const CLOUDRASA_CONFIG_LOAD = false;


// Sprachen


export const CLOUDRASA_DE_LANGUAGE = 'de-DE';
export const CLOUDRASA_EN_LANGUAGE = 'en-US';
export const CLOUDRASA_DEFAULT_LANGUAGE = CLOUDRASA_DE_LANGUAGE;


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

const CLOUDRASA_NOACTION_TIMEOUT = 0;
