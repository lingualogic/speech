/** @packageDocumentation
 * NLU Anbindung an den CloudRasa-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// cloud-rasa

import { CloudRasaConfig } from '../cloud-rasa-config';
import { CloudRasaConnect } from '../net/cloud-rasa-connect';
import { CloudRasaDevice } from './cloud-rasa-device';


export class CloudRasaNLU extends CloudRasaDevice {


    /**
     * Erzeugt eine Instanz von NuanceNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aConfig: CloudRasaConfig, aConnect: CloudRasaConnect ) {
        super( 'CloudRasaNLU', aConfig, aConnect );
    }


    // NLU-Funktionen


    /**
     * Senden eines Http-Request an die TTS fuer die Audiosynthese
     *
     * @private
     * @param aText - Text fuer die NLU
     */

    protected _sendToNLU( aText: string ): number {
        console.log('_sendToNLU:', aText);
        try {
            const baseUrl = this.mConfig.serverUrl + '/model/parse?token=' + this.mConfig.appKey;
            console.log('_sendToNLU.url:', baseUrl);
            const xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', baseUrl);
            // xmlHttpRequest.setRequestHeader( 'Authorization', 'Bearer ' + aAccessToken );
            // xmlHttpRequest.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
            xmlHttpRequest.setRequestHeader( 'Accept', '*/*' );
            xmlHttpRequest.setRequestHeader( 'cache-control', 'no-cache' );
            xmlHttpRequest.setRequestHeader( 'Content-Type', 'text/plain' );
            // xmlHttpRequest.responseType = 'application/json';

            // Audiodaten empfangen

            xmlHttpRequest.onload = () => {
                // Json-Daten als Ergebnis vom NLU-Server
                console.log('Response:', xmlHttpRequest.response);
                try {
                    this._onResult( JSON.parse( xmlHttpRequest.response ));
                } catch ( aException ) {
                    this.exception( '_sendToNLU', aException );
                }
                this._onStop();
            };

            // Fehlerbehandlung

            xmlHttpRequest.onerror = (aError: any) => {
                console.log('_sendToNLU.error:', xmlHttpRequest);
                this.error( '_sendToNLU', 'Fehler aufgetreten' );
                this._onStop();
            };

            // Text als Json an NLU senden

            const jsonText = `{ "text": "${aText}" }`;
            // console.log('_sendToNLU.jsonText:', jsonText);
            xmlHttpRequest.send( jsonText );
            return 0;
        } catch ( aException ) {
            this.exception( '_sendToNLU', aException );
            return -1;
        }
    }


    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */

    protected _start( aOptions: any ): void {
        console.log('CloudRasaNLU._startNLU:', aOptions);
        try {
            if ( !this.mConfig.appKey ) {
                this.error( '_start', 'kein AppKey vorhanden' );
                return;
            }
            // CloudRasa aufrufen
            this._sendToNLU( aOptions.text );
        } catch ( aException ) {
            this.exception( '_start', aException );
        }
    }


    protected _stop(): void {
        console.log('CloudRasaNLU._stop');
    }

}
