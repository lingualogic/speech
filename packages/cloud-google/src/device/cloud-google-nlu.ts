/** @packageDocumentation
 * NLU Anbindung an den CloudGoogle-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// Dialogflow V1 SDK

import { ApiAiClient } from '../dialogflow/ApiAiClient';


// cloud-google

import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleConnect } from '../net/cloud-google-connect';
import { CloudGoogleDevice } from './cloud-google-device';


export class CloudGoogleNLU extends CloudGoogleDevice {


    private mDialogflowClient: ApiAiClient;


    /**
     * Erzeugt eine Instanz von NuanceNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect ) {
        super( 'CloudGoogleNLU', aConfig, aConnect );
    }


    // NLU-Funktionen


    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */

    protected _start( aOptions: any ): number {
        // console.log('CloudGoogleNLU._startNLU:', aOptions);
        try {
            if ( !this.mConfig.appKey ) {
                this.error( '_start', 'kein AppKey vorhanden' );
                return -1;
            }
            // Dialogflow V1 Verbindung erzeugen (gilt nur noch bis Oktober 2019)
            this.mDialogflowClient = new ApiAiClient({ accessToken: this.mConfig.appKey });
            // Hier wird die Antwort zurueckgegeben
            this.mDialogflowClient.textRequest( aOptions.text ).then(( aResponse ) => {
                // console.log('CloudGoogleNlu._start: response = ', aResponse.result);
                try {
                    this._onResult( aResponse.result );
                } catch ( aException ) {
                    this._onError( new Error( 'NLU-Exception: ' + aException.message));
                }
                this._onStop();
            }, (aError: any) => {
                console.log('CloudGoogleNlu._start: Promise-Error ', aError);
                this._onError( new Error( 'NLU-Error: ' + aError.message));
            });
            return 0;
        } catch ( aException ) {
            this.exception( '_start', aException );
            return -1;
        }
    }


    protected _stop(): number {
        // console.log('CloudGoogleNLU._stop');
        return 0;
    }

}
