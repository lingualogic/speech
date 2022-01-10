/** @packageDocumentation
 * Globale Export-Datei fuer Core
 *
 * Version: 2.0
 * Datum:   01.11.2021
 *
 * Definiert das gesamte Core-API:
 *
 *      Builder             - Manager fuer Builder und Builder-Klasse
 *      Common              - Basisklasse fuer alle Komponenten
 *      Component           - Basisklasse fuer alle Komponenten
 *      Const               - Globale Konstanten
 *      Error               - Basisklasse fuer alle Klassen mit Fehlerbehandlung
 *      Event               - Liste von Observern fuer den gleichen Event
 *      Interface           - Globale Interfaces und Funktionsprototypen
 *      Factory             - Manager aller Factories und Factory-Klasse
 *      Message             - Message-Interface fuer alle Message-Objekte
 *      Plugin              - Manager aller Plugins und Plugin-Klassen
 *      Port                - Manager aller Portss und Port-Klassen
 *      Session             - Session-Interface fuer alle Session-Objekte
 *      System              - Manager fuer BuilderManager, FactoryManager und PluginManager
 *
 * @module core
 * @author SB
 */


// Global API


// builder

export { BuilderManager } from './builder/builder-manager';
export { IBuilderConfig } from './builder/builder-config.interface';
export { IBuilder } from './builder/builder.interface';
export { Builder } from './builder/builder';


// common

export * as SpeechError from './common/speech-error';
export { SpeechBrowser } from './common/speech-browser';


// component

export { ComponentManager } from './component/component-manager';
export { IComponent, ComponentSendMessageFunc, ComponentHandleMessageFunc } from './component/component.interface';
export { Component } from './component/component';


// const

export * from './const/speech-api-const';
export * from './const/speech-event-const';
export * from './const/speech-message-const';
export * from './const/speech-version';


// error

export { IErrorBase } from './error/error-base.interface';
export { ErrorBase } from './error/error-base';


// event

export { EventFunc } from './event/event-function.type';
export { IEventData } from './event/event-data.interface';
export { EventFunctionList } from './event/event-function-list';


// factory

export { FactoryManager } from './factory/factory-manager';
export { IFactory } from './factory/factory.interface';
export { Factory } from './factory/factory';


// interface

export * from './interface/speech-function.type';
export * from './interface/speech-message.interface';


// message

export * from './message/message-const';
export { SendMessageFunc, HandleMessageFunc } from './message/message-function.type';
export { IMessage } from './message/message.interface';


// plugin

export { PluginList } from './plugin/plugin-list';
export { PluginManager } from './plugin/plugin-manager';
export { PluginFactory } from './plugin/plugin-factory';
export { IPluginFactory } from './plugin/plugin-factory.interface';
export { IPluginGroup } from './plugin/plugin-group.interface';
export { IPlugin } from './plugin/plugin.interface';
export { PluginGroup } from './plugin/plugin-group';
export { Plugin } from './plugin/plugin';


// port

export {
    PORT_INIT_EVENT,
    PORT_OPEN_EVENT,
    PORT_CLOSE_EVENT,
    PORT_START_EVENT,
    PORT_STOP_EVENT,
    PORT_RESULT_EVENT,
    PORT_ERROR_EVENT
} from './port/port-event-const';
export {
    PORT_NLP_ACTION,
    PORT_NLU_ACTION,
    PORT_ASR_ACTION,
    PORT_ASRNLU_ACTION,
    PORT_TTS_ACTION
} from './port/port-action-const';
// TODO: sollte eigentlich erst in CloudPort definiert sein, Abhaengigkeit wird spaeter aufgeloest
//       dazu muessen die Port-Namen als Konfiguration induziert werden
export {
    CLOUD_AMAZON_PORT,
    CLOUD_GOOGLE_PORT,
    CLOUD_MICROSOFT_PORT,
    CLOUD_RASA_PORT
} from './port/port-cloud-const';
export { PortList } from './port/port-list';
export { PortManager } from './port/port-manager';
export { IPortFactory } from './port/port-factory.interface';
export { PortFactory } from './port/port-factory';
export { PortTransaction } from './port/port-transaction';
export { IPort } from './port/port.interface';
export { Port } from './port/port';


// session

export { ISession } from './session/session.interface';


// system

export { SystemManager } from './system/system-manager';
export { SpeechManager } from './system/speech-manager';
