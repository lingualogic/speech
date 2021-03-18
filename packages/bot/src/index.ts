/** @packageDocumentation
 * Globale Export-Datei fuer Bot
 *
 * Version: 1.1
 * Datum:   20.10.2020
 *
 * Definiert das gesamte Bot-API:
 *
 * @module bot
 * @author SB
 */


// Global API


export { BOT_API_VERSION, BOT_VERSION_STRING } from './bot-version';
export { BOT_TYPE_NAME, BOT_MOCK_NAME, BOT_SERVICE_NAME, BOT_COMPONENT_NAME, BOT_COMPONENTFACTORY_NAME, BOT_COMPONENTBUILDER_NAME } from './bot-const';
export { BotComponentBuilder } from './component/bot-component-builder';
export { BotComponentFactory } from './component/bot-component-factory';
export { BotComponentInterface } from './component/bot-component.interface';
export { BotComponent } from './component/bot-component';
export { BotActionInterface } from './bot-action.interface';
export { BotDataInterface } from './bot-data.interface';
export { BotOptionInterface } from './bot-option.interface';
export { BotInterface } from './bot.interface';
export { BotFactory } from './bot-factory';
export { Bot } from './bot';


// Service API

export { BotServiceConfig } from './bot-service-config';
export { BotServiceInterface } from './bot-service.interface';
export { BotService } from './bot-service';
