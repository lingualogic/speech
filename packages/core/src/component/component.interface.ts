/** @packageDocumentation
 * Komponenten Schnittstelle
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/component
 * @author SB
 */


// event

import { EventFunc } from '../event/event-function.type';


// message

import { IMessage } from './../message/message.interface';


// plugin

import { IPluginGroup } from '../plugin/plugin-group.interface';


// Funktionen

export type ComponentSendMessageFunc = ( aMessage: IMessage ) => number;
export type ComponentHandleMessageFunc = ( aMessage: IMessage ) => boolean;


/**
 * Definiert die Schnittstelle fuer eine Komponente
 */

export interface IComponent extends IPluginGroup {


    // Component-Funktionen

    getVersion(): string;


    // Netz-Funktionen


    connect(): number;
    isConnect(): boolean;

    getNetType(): string;


    // Message-Funktionen


    setSendMessageFunc( aSendMessageFunc: ComponentSendMessageFunc ): number;


    sendMessage( aMessage: IMessage ): number;


    /**
     * Nachrichten verarbeiten
     *
     * @param {IMessage} aMessage - zu verarbeitende Nachricht
     *
     * @return Rueckgabe, ob Nachricht verarbeitet wurde (true) oder nicht (false)
     */

    handleMessage( aMessage: IMessage ): boolean;


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
