/** @packageDocumentation
 * Definiert die WebSocket fuer den Speech-Server als Verbindung zu CloudGoogle
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// common

import { NetHtml5WebSocket } from '@speech/common';


export class CloudGoogleWebSocket extends NetHtml5WebSocket {


    constructor() {
        super( 'CloudGoogleWebSocket' );
    }


    connect( aUrl: string ): number {
        // pruefen auf URL
        if ( !aUrl ) {
            this.error( 'connect', 'keine URL vorhanden' );
            return -1;
        }
        // console.log('CloudGoogleWebSocket.connect: start', aUrl);
        if ( this._connect( aUrl ) !== 0 ) {
            // console.log('CloudGoogleWebSocket.connect: keine Verbindung moeglich', aUrl);
            this.error( 'open', 'keine Verbindung moeglich' );
            return -1;
        }
        // console.log('CloudGoogleWebSocket.connect: ende', this.mTimeout);
        return 0;
    }


    disconnect(): void {
        // TODO: muss geloescht weerden, da sonst falsche Nachrichten an NuanceConnect versendet werden !
        this.onMessage = null;
        this.close();
    }

    // Data Helpers

    sendJSON( aJson: any ): void {
        this.sendMessage( aJson );
    }

}
