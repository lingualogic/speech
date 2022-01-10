/** @packageDocumentation
 * Globale Konstanten fuer Speak
 *
 * API-Version: 2.0
 * Datum: 15.10.2021
 *
 * Letzte Aenderung: 15.10.2021
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// Konstanten

export const SPEAK_COMPONENTBUILDER_NAME = 'SpeakComponentBuilder';
export const SPEAK_COMPONENTFACTORY_NAME = 'SpeakComponentFactory';
export const SPEAK_TYPE_NAME = 'Speak';

export const SPEAK_COMPONENT_NAME = 'SpeakComponent';
export const SPEAK_MOCK_NAME = 'SpeakMock';


/** @export
 * Servicename zur Erzeugung des Default SpeakService. Wird in der SpeakServiceFactory verwendet.
 */

export const SPEAK_SERVICE_NAME = 'SpeakService';


/** @export
 * Servicename zur Erzeugung des SpeakService Mock zum testen. Wird in der SpeakServiceFactory verwendet.
 */

export const SPEAK_SERVICEMOCK_NAME = 'SpeakServiceMock';


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

export const SPEAK_ASYNC_EVENT = false;


// Default-Konstanten fuer Audio

export const SPEAK_AUDIOFILE_PATH = 'assets/';
export const SPEAK_AUDIO_FLAG = false;


// TTS-Konstanten (muessen mit den Konstenten in TTS synchron gehalten werden!)

export const SPEAK_HTML5_TTS = 'TTSHtml5';
export const SPEAK_AMAZON_TTS = 'TTSAmazon';
export const SPEAK_GOOGLE_TTS = 'TTSGoogle';
export const SPEAK_MICROSOFT_TTS = 'TTSMicrosoft';


// Audio-Konstanten

export const SPEAK_MP3_AUDIOFORMAT = 'mp3';
export const SPEAK_WAV_AUDIOFORMAT = 'wav';


// Sprach-Konstanten

/** Deutsch */
export const SPEAK_DE_LANGUAGE = 'de';
/** Englisch */
export const SPEAK_EN_LANGUAGE = 'en';
/** Default Sprache eingestellt */
export const SPEAK_DEFAULT_LANGUAGE = SPEAK_DE_LANGUAGE;
/** Undefiniert */
export const SPEAK_UNDEFINE_LANGUAGE = '';


// Stimmen-Konstanten

/** Undefiniert */
export const SPEAK_UNDEFINE_VOICE = '';


