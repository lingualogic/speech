/**
 * NetManager zur Verwaltung der richtigen Implementierung von Plugins fuer Browser oder NodeJS
 * 
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module net/browser
 * @author SB
 */


// core

import { FactoryManager } from '@lingualogic-speech/core';


// net

import { NET_FACTORY_NAME, NET_WEBSOCKET_NAME } from './net-const';
import { NetFactory } from './net-factory';
import { INet } from './net.interface';
import { NetBaseManager } from './websocket/net-base-manager';


export class NetManager {


    static mInitFlag = false;


    // WebSockets

    static mNetFactory: NetFactory = null;
    static mWebSocketMap: Map<string, INet> = new Map<string, INet>(); 


    /**
     * global einmal asynchron initialisieren
     * @returns 
     */

    static async init() {
        if ( NetManager.mInitFlag ) {
            return 0;
        }
        // NwetBaseManager initialisieren
        if ( await NetBaseManager.init() !== 0 ) {
            return -1;
        }
        // console.log('NetManager.init: start');
        // NetFactory erzeugen
        NetManager.mNetFactory = NetManager._initNet();
        if ( !NetManager.mNetFactory ) {
            return -1;
        }
        NetManager.mInitFlag = true;
        // console.log('NetManager.init: end');
        return 0;
    }


    static isInit(): boolean {
        return NetManager.mInitFlag;
    }


    static clear(): void {
        NetBaseManager.clear();
        NetManager._doneWebSocket();
        NetManager.mInitFlag = false;
    }


    // WebSocket-Funktionen


    /**
     * NetFactory erzeugen
     */

    private static _initNet(): NetFactory {
        return FactoryManager.get( NET_FACTORY_NAME, NetFactory ) as NetFactory;
    }


    private static _doneWebSocket(): void {
        NetManager.mWebSocketMap.forEach(( value ) => {
            value.done();
        });
        NetManager.mWebSocketMap.clear();
        NetManager.mNetFactory = null;
    }


    /**
     * neuen WebSocket erzeugen
     * 
     * @param aWebSocketName - eindeutiger WebSocket-Name
     * @returns 
     */

    private static _addWebSocket( aWebSocketName: string ): INet {
        if ( !aWebSocketName ) {
            return null;
        }
        if ( NetManager.mNetFactory ) {
            const webSocket = NetManager.mNetFactory.create( aWebSocketName, NET_WEBSOCKET_NAME, false );
            // console.log('NetManager._addWebSocket:', webSocket);
            if ( webSocket ) {
                if ( webSocket.init() === 0 ) { 
                    // console.log('NetManager._addWebSocket: init');
                    NetManager.mWebSocketMap.set( aWebSocketName, webSocket );
                    return webSocket;
                } else {
                    console.log('NetManager.addWebSocket: socket nicht initalisiert');
                    webSocket.done();
                }
            }
        }
        // console.log('NetManager.addWebSocket: keine Klasse vorhanden');
        return null;
    }


    /**
     * WebSocket loeschen
     * 
     * @param aWebSocketName 
     */
    static removeWebSocket( aWebSocketName: string ): void {
        const webSocket = NetManager.findWebSocket( aWebSocketName );
        if ( webSocket ) {
            webSocket.done();
            NetManager.mWebSocketMap.delete( aWebSocketName );
        }
    }


    /**
     * WebSocket zurueckgeben
     */

    static findWebSocket( aWebSocketName: string ): INet {
        if ( aWebSocketName ) {
            const webSocket = NetManager.mWebSocketMap.get( aWebSocketName );
            if ( webSocket ) {
                return webSocket;
            }
        }
        return null;
    }


    /**
     * WebSocket zurueckgeben oder neu erzeugen
     */

    static getWebSocket( aWebSocketName: string ): INet {
        const webSocket = NetManager.findWebSocket( aWebSocketName );
        if ( webSocket ) {
            return webSocket;
        }
        return NetManager._addWebSocket( aWebSocketName );
    }

}