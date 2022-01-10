/** @packageDocumentation
 * Diese Komponente dient zum Aufbau und zur Verwaltung einer WebSocket-Verbindung fuer Browser/NodeJS
 * mit dem SpeechServer.
 *
 * Letzte Aenderung: 24.10.2021
 * Status: rot
 *
 * @module net
 * @author SB
 */


// core

import { IErrorBase } from '@speech/core';


/**
 * Die Net Klasse kapselt eine WebSocket
 */

export interface INetBaseWebSocket extends IErrorBase {


    // Attribute

    webSocket: any;
    webSocketUrl: any;


    // Events

    onOpen: any;
    onClose: any;
    onMessage: any;
    onError: any;


    /**
     * Initialisierung der WebSocket-Verbindung (asynchron!)
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number;


    /**
     * WebSocket schliessen
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number;


    isInit(): boolean;

    getRuntimeType(): string;


    /**
     * WebSocket-Verbindung aufbauen
     *
     * @param {string} aUrl - WebSocket-Adresse
     * @return {number} errorCode (0,-1)
     */

    open( aUrl?: string ): number;


    /**
     * WebSocket-Verbindung beenden
     *
     * @return {number} errorCode (0,-1)
     */

    close(): number;


    /**
     * pruefen auf geoeffnete WebSocket-Verbindung mit dem SpeechServer
     *
     * @return {boolean} true, wenn WebSocket verbunden
     */

    isOpen(): boolean;


    isConnect(): boolean;


    /**
     * Rueckgabe des WebSocket-Zustands als TEXT
     */

    getState(): string;


    /**
     * Nachricht als JSON-Objekt versenden
     *
     * @param {Object} aMessage
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendMessage( aMessage: any ): number;


    /**
     * Nachricht als JSON-Objekt versenden
     *
     * @param {ArrayBuffer} aStream
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendStream( aStream: ArrayBuffer ): number;

}
