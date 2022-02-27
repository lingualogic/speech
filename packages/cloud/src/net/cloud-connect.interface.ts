/** @packageDocumentation
 * Definiert die Verbindung zum Cloud-Service API
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// core

import { IErrorBase } from '@lingualogic-speech/core';


/**
 * Dient zur Verbindungsaufnahme mit externen Server
 */

export interface ICloudConnect extends IErrorBase {

    // Attribute


    webSocket: any;


    // Connect-Events

    onDisconnect: () => void;


    // Verbindungs-Funktionen

    isConnect(): boolean;


    /**
     * Verbindungsaufbau mit CloudGoogle-Service.
     */

    connect( aOption: any ): number;


    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */

    disconnect(): number;


    // Data Helpers


    sendJSON( aMessage: any ): number;

}
