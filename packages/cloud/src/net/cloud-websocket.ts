/** @packageDocumentation
 * Definiert die WebSocket fuer den Speech-Server als Verbindung zu Cloud
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// speech

import { NetBaseWebSocket } from '@lingualogic-speech/net';


// cloud

import { ICloudPortConfig } from './../port/cloud-port-config.interface';
import { ICloudWebSocket } from './cloud-websocket.interface';
export { ICloudWebSocket };


export class CloudWebSocket extends NetBaseWebSocket implements ICloudWebSocket {


    protected mPortConfig: ICloudPortConfig = null;


    constructor( aClassName: string, aPortConfig: ICloudPortConfig ) {
        super( aClassName || 'CloudWebSocket' );
        this.mPortConfig = aPortConfig;
    }


    // Attribut-Funktionen


    setToken( aToken: string ): void {
        // muss von erbenden Klassen ueberschrieben werden
    }

    getToken(): string {
        // muss von erbenden Klassen ueberschrieben werden
        return '';
    }


    // Verbindungs-Funktionen

    connect( aUrl: string ): number {
        // pruefen auf URL
        if ( !aUrl ) {
            this.error( 'connect', 'keine URL vorhanden' );
            return -1;
        }
        // console.log('CloudWebSocket.connect: start', aUrl);
        if ( this._connect( aUrl ) !== 0 ) {
            // console.log('CloudWebSocket.connect: keine Verbindung moeglich', aUrl);
            this.error( 'open', 'keine Verbindung moeglich' );
            return -1;
        }
        // console.log('CloudWebSocket.connect: ende', this.mTimeout);
        return 0;
    }


    disconnect(): void {
        // TODO: muss geloescht weerden, da sonst falsche Nachrichten an Connect versendet werden !
        this.onMessage = null;
        this.close();
    }


    // Data Helpers

    sendJSON( aJson: any ): number {
        return this.sendMessage( aJson );
    }

}
