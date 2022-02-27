/** @packageDocumentation
 * Definiert die WebSocket API fuer den Speech-Server als Verbindung zu Cloud
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// common

import { INetBaseWebSocket } from '@lingualogic-speech/net';


export interface ICloudWebSocket extends INetBaseWebSocket {


    // Attribut-Funktionen

    setToken( aToken: string ): void;

    getToken(): string;
    

    // Verbindungs-Funktionen

    connect( aUrl: string ): number;

    disconnect(): void;

    
    // Nachrichten-Funktionen

    sendJSON( aJson: any ): number;

}
