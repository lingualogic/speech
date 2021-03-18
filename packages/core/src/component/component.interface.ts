/** @packageDocumentation
 * Komponenten Schnittstelle
 *
 * Letzte Aenderung: 14.10.2020
 * Status: rot
 *
 * @module core/component
 * @author SB
 */


// event

import { EventFunc } from '../event/event-function.type';


// message

import { MessageInterface } from './../message/message.interface';


// plugin

import { PluginGroupInterface } from '../plugin/plugin-group.interface';


// Funktionen

export type ComponentSendMessageFunc = ( aMessage: MessageInterface ) => number;
export type ComponentHandleMessageFunc = ( aMessage: MessageInterface ) => boolean;


/**
 * Definiert die Schnittstelle fuer eine Komponente
 */

export interface ComponentInterface extends PluginGroupInterface {


    // Component-Funktionen

    getVersion(): string;


    // Netz-Funktionen


    connect(): number;
    isConnect(): boolean;

    getNetType(): string;


    // Message-Funktionen


    setSendMessageFunc( aSendMessageFunc: ComponentSendMessageFunc ): number;


    sendMessage( aMessage: MessageInterface ): number;


    /**
     * Nachrichten verarbeiten
     *
     * @param {MessageInterface} aMessage - zu verarbeitende Nachricht
     *
     * @return Rueckgabe, ob Nachricht verarbeitet wurde (true) oder nicht (false)
     */

    handleMessage( aMessage: MessageInterface ): boolean;


    /**
     * Rueckgabe der Nachrichtenverarbeitungsfunktion
     *
     * @return {PluginHandleMessageFunc} handleMessageFunc
     */

    getHandleMessageFunc(): ComponentHandleMessageFunc;


    // Event-Funktionen


    addEventListener( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number;
    removeEventListener( aPluginName: string, aEventName: string ): number;
}
