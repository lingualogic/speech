/** @packageDocumentation
 * Globale Konstanten fuer Intent
 *
 * API-Version: 1.2
 * Datum: 28.08.2019
 *
 * Letzte Aenderung: 28.08.2019
 * Status: rot
 *
 * @module intent
 * @author SB
 */


// Konstanten

export const INTENT_TYPE_NAME = 'Intent';
export const INTENT_BUILDER_NAME = 'IntentBuilder';
export const INTENT_FACTORY_NAME = 'IntentFactory';
export const INTENT_COMPONENTBUILDER_NAME = 'IntentComponentBuilder';
export const INTENT_COMPONENTFACTORY_NAME = 'IntentComponentFactory';

export const INTENT_COMPONENT_NAME = 'IntentComponent';
export const INTENT_MOCK_NAME = 'IntentMock';


/** @export
 * Servicename zur Erzeugung des Default IntentService. Wird in der IntentServiceFactory verwendet.
 */

export const INTENT_SERVICE_NAME = 'IntentService';


/** @export
 * Servicename zur Erzeugung des IntentService Mock zum testen. Wird in der IntentServiceFactory verwendet.
 */

export const INTENT_SERVICEMOCK_NAME = 'IntentServiceMock';

/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

export const INTENT_ASYNC_EVENT = false;


// NLU-Konstanten (muessen mit den Konstenten in NLU synchron gehalten werden!)

export const INTENT_HTML5_NLU = 'NLUHtml5';
export const INTENT_NUANCE_NLU = 'NLUNuance';
export const INTENT_GOOGLE_NLU = 'NLUGoogle';
export const INTENT_MICROSOFT_NLU = 'NLUMicrosoft';
export const INTENT_RASA_NLU = 'NLURasa';


// Sprach-Konstanten

/** Deutsch */
export const INTENT_DE_LANGUAGE = 'de';
/** Englisch */
export const INTENT_EN_LANGUAGE = 'en';
/** Default Sprache eingestellt */
export const INTENT_DEFAULT_LANGUAGE = INTENT_DE_LANGUAGE;
/** Undefiniert */
export const INTENT_UNDEFINE_LANGUAGE = '';
