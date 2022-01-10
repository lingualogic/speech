/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der NetBaseWebsocket-Klasse und -Instanz fuer Browser
 *
 * Letzte Aenderung: 05.07.2021
 * Status: rot
 *
 * @module net/websocket
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// net

import { INetBaseWebSocket, NetBaseWebSocket } from './net-base-websocket';


// Konstanten

export const NETBASEWEBSOCKET_FACTORY_NAME = 'NetBaseWebSocketFactory';
export const NETBASEWEBSOCKET_TYPE_NAME = 'NetBaseWebSocket';


/**
 * Die NetBaseWebSocketFactory Klasse kapselt die Pruefung und Erzeugung einer NetBaseWebSocket-Instanz
 */

export class NetBaseWebSocketFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || NETBASEWEBSOCKET_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return NETBASEWEBSOCKET_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return NETBASEWEBSOCKET_FACTORY_NAME;
    }


    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aObjectClass?: string, aRegisterFlag = true ): INetBaseWebSocket {
        try {        
            // neue Instanz der Websocket zurueckgeben
            // console.log('NetBaseWebSocketFactory.create: start', aObjectName);
            const webSocket = new NetBaseWebSocket( aObjectName );
            // console.log('NetBaseWebSocketFactory.create: end', aObjectName);
            return webSocket;
        } catch ( aException ) {
            return null;
        }
    }

}
