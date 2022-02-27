/** @packageDocumentation
 * Net Schnittstelle
 *
 * Version: 2.0
 * Datum:   09.02.2022
 *
 * @module net
 * @author SB
 */

// core

import { OnSpeechErrorFunc, IPlugin, SendMessageFunc, HandleMessageFunc, IMessage } from '@lingualogic-speech/core';


// net

import { OnNetOpenFunc, OnNetCloseFunc, OnNetMessageFunc } from './net-function.type';


/**
 * INet Interface
 */

export interface INet extends IPlugin {

    // Events

    onOpen: OnNetOpenFunc;
    onClose: OnNetCloseFunc;
    onMessage: OnNetMessageFunc;
    onError: OnSpeechErrorFunc;

    // Net-Funktionen

    open( aUrl?: string ): number;
    close(): number;

    isOpen(): boolean;
    getState(): string;

    // Nachrichten Funktionen

    sendMessage( aMessage: IMessage ): number;
    getSendMessageFunc(): SendMessageFunc;

    handleMessage( aMessage: IMessage ): number;
    setHandleMessageFunc( aPluginName: string, aHandleMessageFunc: HandleMessageFunc ): number;
}
