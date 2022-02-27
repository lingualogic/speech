/** @packageDocumentation
 * ASR Anbindung an den Cloud-Service mit einem TokenServer
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// net

import { FetchFactory } from '@lingualogic-speech/net';


// cloud

import { CLOUD_ASR_TYPE } from './cloud-device-const';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { ICloudAudioRecorder } from '../audio/cloud-audio-recorder.interface';
import { ICloudToken, CloudToken } from '../token/cloud-token';
import { CloudDeviceASR } from './cloud-device-asr';


// Konstanten

const CLOUDGOOGLE_ASRSERVER_URL = 'https://speech.googleapis.com/v1/speech:recognize';


export class CloudDeviceASRToken extends CloudDeviceASR {


    // Token-Objekt

    private mToken: ICloudToken = null;


    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect, aFetchFactory: FetchFactory, aAudioRecorder: ICloudAudioRecorder ) {
        super( aConfig , aConnect, aAudioRecorder );
        if ( aAudioRecorder ) {
            aAudioRecorder.setStopRecorderFunc((aBuffer: ArrayBuffer) => this._onEndedFunc( aBuffer ));
        }
        // CloudToken erzeugen zum holen eines Tokens vom Tokenserver
        this.mToken = new CloudToken( aConfig.tokenServerUrl, aConfig.appKey, aFetchFactory );
    }


    getClassName(): string {
        return 'CloudDeviceASRToken';
    }

    
    getType(): string {
        return CLOUD_ASR_TYPE;
    }


    // Token-Funktionen


    clearToken(): number {
        return this.mToken.clearToken();
    }


    // ASR-Funktionen


    /**
     * Detect ASR zurueckgeben
     */

    protected async _getSpeechToText( aLanguageCode: string, aEncoding: string, aAudioData: string): Promise<string> {
        try {
            const accessToken = await this.mToken.getAccessToken();
            const fetchFunc = this.mToken.getFetchFunc();
            if ( fetchFunc ) {
                const response = await fetchFunc( CLOUDGOOGLE_ASRSERVER_URL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        config: {
                            encoding: 'LINEAR16',
                            languageCode: 'de-DE',
                            sampleRateHertz: 16000
                        },
                        audio: {
                            content: aAudioData
                        }
                    })
                });

                const responseJSON = await response.json();
                // JSON-Nachricht als Ergebnis zurueckgeben
                if ( responseJSON ) {
                    // console.log('CloudGoogleASR2.getSpeechToText: ', responseJSON);
                    this._onOptionMessage( responseJSON );
                }
                this._onStop();
                return responseJSON;
            }
            this.error( 'getSpeechToText', 'keine Fetch-Funktion vorhanden' );
            this._onStop();
            return '';
        } catch ( aException ) {
            this.exception( 'getSpeechToText', aException );
            this._onStop();
            return '';
        }
    }


    // Message-Funktionen


    protected _onSpeechResult( aResult: any ): void {
        if ( aResult && aResult.length > 0 ) {
            const text = aResult[ 0 ].transcript;
            const confidence = aResult[ 0 ].confidence;
            // console.log('Transkript: ', text, '  Confidence: ', confidence );
            // Ergebnis zurueckgeben
            this._onResult( aResult );
        }
    }


    protected _onSpeechEnd(): void {
        // console.log('CloudGoogleASR2._onSpeechEnd: Ende der Spracheingabe');
    }


    protected _onOptionMessage( aMessage: any): void {
        // pruefen auf Spracherkennung
        // console.log('CloudGoogleASR2._onOptionMessage: ', aMessage);
        if ( aMessage.results && aMessage.results.length > 0 ) {
            this._onSpeechResult( aMessage.results[ 0 ].alternatives );
        }
    }


    // ASR-Funktionen


    /**
     * Callback-Funktion fuer Ende der Audioaufnahme
     *
     * @param aBuffer - Audiodaten, die an CloudGoogle gesendet werden
     */

    protected _onEndedFunc( aBuffer: ArrayBuffer ) {
        // console.log('CloudGoogleASR._onEndedFunc: ', aBuffer);
        // wird asynchron ausgefuhert
        this._getSpeechToText( 'de-DE', 'LINEAR16', this.encodeBase64( aBuffer ));
    }

}
