/** @packageDocumentation
 * Globale Konstanten fuer Bot
 *
 * API-Version: 1.0
 * Datum:   06.09.2018
 *
 * Letzte Aenderung: 06.09.2018
 * Status: gruen
 *
 * @module bot
 * @author SB
 */


// Konstanten

export const BOT_COMPONENTBUILDER_NAME = 'BotComponentBuilder';
export const BOT_COMPONENTFACTORY_NAME = 'BotComponentFactory';
export const BOT_TYPE_NAME = 'Bot';

// TODO: sollte nicht mehr benutzt werden, anstelle dessen BOT_COMPONENT_NAME
// export const BOT_PLUGIN_NAME = 'Bot';
export const BOT_COMPONENT_NAME = 'BotComponent';
export const BOT_MOCK_NAME = 'BotMock';


/** @export
 * Servicename zur Erzeugung des Default BotService. Wird in der BotServiceFactory verwendet.
 */

export const BOT_SERVICE_NAME = 'BotService';


/** @export
 * Servicename zur Erzeugung des BotService Mock zum testen. Wird in der BotServiceFactory verwendet.
 */

export const BOT_SERVICEMOCK_NAME = 'BotServiceMock';


/** @export
 * Name der globalen Default Botdefinitionsdatei, die in BotService eingelesen wird.
 */

export const BOT_DIALOGFILE_NAME = 'speech.def';


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

export const BOT_ASYNC_EVENT = true;

