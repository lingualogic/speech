/**
 * NetManager zur Verwaltung der richtigen Implementierung von Plugins fuer Browser oder NodeJS
 * 
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module net/websocket
 * @author SB
 */


// core

import { FactoryManager } from '@lingualogic-speech/core';


// net

import { NetBaseWebSocketFactory, NETBASEWEBSOCKET_FACTORY_NAME } from './net-base-websocket-factory';
import { INetBaseWebSocket } from './net-base-websocket.interface';
import { NetBaseWebSocket } from './net-base-websocket';


export class NetBaseManager {


    static mInitFlag = false;


    // Base-WebSockets

    static mBaseWebSocketFactory: NetBaseWebSocketFactory = null;
    static mBaseWebSocketMap: Map<string, INetBaseWebSocket> = new Map<string, INetBaseWebSocket>(); 


    /**
     * global einmal asynchron initialisieren
     * @returns 
     */

    static async init() {
        if ( NetBaseManager.mInitFlag ) {
            return 0;
        }
        // console.log('NetBaseManager.init: start');
        // BaseWebSocket-Factory holen
        NetBaseManager.mBaseWebSocketFactory = NetBaseManager._initBaseWebSocket();
        if ( !NetBaseManager.mBaseWebSocketFactory ) {
            return -1;
        }
        // BaseWebsocket-Factory asynchron initialisieren
        if ( !await NetBaseWebSocket.initFactory()) {
            return -1;
        }
        NetBaseManager.mInitFlag = true;
        // console.log('NetBaseManager.init: end');
        return 0;
    }


    static isInit(): boolean {
        return NetBaseManager.mInitFlag;
    }


    static clear(): void {
        NetBaseManager._doneBaseWebSocket();
        NetBaseManager.mInitFlag = false;
    }


    // BaseWebSocket-Funktionen


    /**
     * dynamischer Import der richtigen BaseWebSocket-Klasse fuer Browser oder NodeJS
     */

    private static _initBaseWebSocket(): NetBaseWebSocketFactory {
        return FactoryManager.get( NETBASEWEBSOCKET_FACTORY_NAME, NetBaseWebSocketFactory ) as NetBaseWebSocketFactory;
    }


    private static _doneBaseWebSocket(): void {
        NetBaseManager.mBaseWebSocketMap.forEach(( value ) => {
            value.done();
        });
        NetBaseManager.mBaseWebSocketMap.clear();
        NetBaseManager.mBaseWebSocketFactory = null;
    }


    /**
     * neuen BaseWebSocket erzeugen
     * 
     * @param aWebSocketName 
     * @returns 
     */

    private static _addBaseWebSocket( aWebSocketName: string ): INetBaseWebSocket {
        if ( !aWebSocketName ) {
            return null;
        }
        if ( NetBaseManager.mBaseWebSocketFactory ) {
            // console.log('NetBaseManager.addBaseWebSocket: create WebSocket');
            const webSocket = NetBaseManager.mBaseWebSocketFactory.create( aWebSocketName );
            // console.log('NetBaseManager.addBaseWebSocket: socket = ', webSocket);
            if ( webSocket ) {
                if ( webSocket.init() === 0 ) { 
                    // console.log('NetBaseManager.addBaseWebSocket: socket init');
                    NetBaseManager.mBaseWebSocketMap.set( aWebSocketName, webSocket );
                    return webSocket;
                } else {
                    console.log('NetBaseManager.addBaseWebSocket: Socket nicht initalisiert');
                    webSocket.done();
                }
            } else {
                console.log('NetBaseManager.addBaseWebSocket: Socket nicht erzeugt');
            }
        }
        console.log('NetBaseManager.addBaseWebSocket: keine Factory vorhanden');
        return null;
    }


    /**
     * BaseWebSocket loeschen
     * 
     * @param aWebSocketName 
     */
    static removeBaseWebSocket( aWebSocketName: string ): void {
        const webSocket = NetBaseManager.mBaseWebSocketMap.get( aWebSocketName );
        if ( webSocket ) {
            webSocket.done();
            NetBaseManager.mBaseWebSocketMap.delete( aWebSocketName );
        }
    }


    /**
     * BaseWebSocket zurueckgeben
     */

    static findBaseWebSocket( aWebSocketName: string ): INetBaseWebSocket {
        if ( aWebSocketName ) {
            const webSocket = NetBaseManager.mBaseWebSocketMap.get( aWebSocketName );
            if ( webSocket ) {
                return webSocket;
            }
        }
        return null;
    }


    /**
     * WebSocket zurueckgeben oder neu erzeugen
     */

    static getBaseWebSocket( aWebSocketName: string ): INetBaseWebSocket {
        // console.log('NetManager.getBaseWebSocket: start', aWebSocketName);
        const webSocket = NetBaseManager.findBaseWebSocket( aWebSocketName );
        if ( webSocket ) {
            // console.log('NetManager.getBaseWebSocket: find', aWebSocketName);
            return webSocket;
        }
        // console.log('NetManager.getBaseWebSocket: add', aWebSocketName);
        return NetBaseManager._addBaseWebSocket( aWebSocketName );
    }

}