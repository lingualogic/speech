/** @packageDocumentation
 * Globale Export-Datei fuer Core
 *
 * Version: 1.3
 * Datum:   17.10.2020
 *
 * Definiert das gesamte Core-API:
 *
 *      Builder             - Manager fuer Builder und Builder-Klasse
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
export { BuilderConfigInterface } from './builder/builder-config.interface';
export { BuilderInterface } from './builder/builder.interface';
export { Builder } from './builder/builder';


// component

export { ComponentManager } from './component/component-manager';
export { ComponentInterface, ComponentSendMessageFunc, ComponentHandleMessageFunc } from './component/component.interface';
export { Component } from './component/component';


// const

export * from './const/speech-api-const';
export * from './const/speech-event-const';
export * from './const/speech-message-const';
export * from './const/speech-version';


// error

export { ErrorBase } from './error/error-base';


// event

export { EventFunc } from './event/event-function.type';
export { EventDataInterface } from './event/event-data.interface';
export { EventFunctionList } from './event/event-function-list';


// factory

export { FactoryManager } from './factory/factory-manager';
export { FactoryInterface } from './factory/factory.interface';
export { Factory } from './factory/factory';


// interface

export * from './interface/speech-function.type';
export * from './interface/speech-message.interface';


// message

export * from './message/message-const';
export { MessageInterface } from './message/message.interface';


// plugin

export { PluginList } from './plugin/plugin-list';
export { PluginManager } from './plugin/plugin-manager';
export { PluginFactory } from './plugin/plugin-factory';
export { PluginFactoryInterface } from './plugin/plugin-factory.interface';
export { PluginGroupInterface } from './plugin/plugin-group.interface';
export { PluginInterface } from './plugin/plugin.interface';
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
export { PortList } from './port/port-list';
export { PortManager } from './port/port-manager';
export { PortFactory } from './port/port-factory';
export { PortInterface } from './port/port.interface';
export { PortTransaction } from './port/port-transaction';
export { Port } from './port/port';


// session

export { SessionInterface } from './session/session.interface';


// system

export { SystemManager } from './system/system-manager';
