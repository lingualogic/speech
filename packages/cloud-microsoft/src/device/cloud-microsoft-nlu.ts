/** @packageDocumentation
 * NLU Anbindung an den CloudMicrosoft-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// cloud-microsoft

import { CloudMicrosoftConfig } from '../cloud-microsoft-config';
import { CloudMicrosoftConnect } from '../net/cloud-microsoft-connect';
import { CloudMicrosoftDevice } from './cloud-microsoft-device';


export class CloudMicrosoftNLU extends CloudMicrosoftDevice {


    /**
     * Erzeugt eine Instanz der NLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zum Server
     */

    constructor( aConfig: CloudMicrosoftConfig, aConnect: CloudMicrosoftConnect ) {
        super( 'CloudMicrosoftNLU', aConfig, aConnect );
    }


    // NLU-Funktionen


    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */

    protected _start( aOptions: any ): void {
        // console.log('CloudMicrosoftNLU._start: ', aOptions);
        try {
            // pruefen auf vorhandenen Luis-Endpunkt

            const luisEndpoint = this.mConfig.luisEndpoint;
            if ( !luisEndpoint ) {
                this._onError( new Error( 'NLU-Error: kein Luis-Endpunkt vorhanden'));
                this._onStop();
                return;
            }

            // Http-Request fuer Luis-Abfrage senden

            const httpRequest = new XMLHttpRequest();
            const url = luisEndpoint + aOptions.text;

            httpRequest.responseType = 'json';

            httpRequest.onload = (aEvent: any) => {
                try {
                    // console.log('CloudMicrosoftNLU._start: onload ', httpRequest.response);
                    this._onResult( httpRequest.response );
                } catch ( aException ) {
                    this._onError( new Error( 'NLU-Exception: ' + aException.message));
                }
                this._onStop();
            };

            httpRequest.onerror = (aEvent: any) => {
                console.log('CloudMicrosoftNLU._start: onerror ', aEvent);
            };

            httpRequest.onabort = (aEvent: any) => {
                console.log('CloudMicrosoftNLU._start: onabort ', aEvent);
            };

            httpRequest.open( 'GET', url );
            httpRequest.send();
        } catch ( aException ) {
            this.exception( '_start', aException );
        }
    }


    protected _stop(): void {
        // console.log('CloudMicrosoftNLU._stop');
    }

}
