/** @packageDocumentation
 * TTS Anbindung an den CloudMicrosoft-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// common

import { AudioPlayer } from '@speech/common';


// cloud-microsoft

import { CLOUDMICROSOFT_PCM_CODEC, CLOUDMICROSOFT_AUDIO_FORMAT } from '../cloud-microsoft-const';
import { CloudMicrosoftConfig } from '../cloud-microsoft-config';
import { CloudMicrosoftConnect } from '../net/cloud-microsoft-connect';
import { CloudMicrosoftDevice } from './cloud-microsoft-device';


// Konstanten


const CLOUDMICROSOFT_ACCESSTOKEN_URL = '.api.cognitive.microsoft.com/sts/v1.0/issueToken';
const CLOUDMICROSOFT_TTS_URL = '.tts.speech.microsoft.com/cognitiveservices/v1';


/**
 * CloudMicrosoftTTS Klasse fuer Sprachausgaben
 */

export class CloudMicrosoftTTS extends CloudMicrosoftDevice {

    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;

    // Token

    private mAccessToken = '';


    /**
     * Erzeugt eine Instanz von CloudMicrosoftTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */

    constructor( aConfig: CloudMicrosoftConfig, aConnect: CloudMicrosoftConnect, aAudioContext: any ) {
        super( 'CloudMicrosoftTTS', aConfig, aConnect );
        this.mAudioContext = aAudioContext;
    }


    /**
     * Access-Token holen fuer Zugriff auf die TTS. Ist fuer 10 Minuten gueltig.
     *
     * @private
     * @param aRegion - Region von CloudMicrosoft
     * @param aSubscriptionKey - Zugriffsschluessel von CloudMicrosoft
     *
     * @return Promise mit dem AccessToken
     */

    protected _getAccessToken( aRegion: string, aSubscriptionKey: string ): Promise<string> {
        return new Promise((aResolve: any, aReject: any) => {
            try {
                const baseUrl = 'https://' + aRegion + CLOUDMICROSOFT_ACCESSTOKEN_URL;
                const xmlHttpRequest = new XMLHttpRequest();
                this.mAccessToken = '';
                // synchrone Verarbeitung des Http-Requests
                xmlHttpRequest.open('POST', baseUrl);
                xmlHttpRequest.setRequestHeader( 'Ocp-Apim-Subscription-Key', aSubscriptionKey );

                // Auslesen des AccessTokens

                xmlHttpRequest.onload = () => {
                    try {
                        // let token = JSON.parse( atob( xmlHttpRequest.responseText.split(".")[1]));
                        this.mAccessToken = xmlHttpRequest.responseText;
                        aResolve( this.mAccessToken );
                    } catch ( aException ) {
                        this.exception( 'getAccessToken', aException );
                        aReject();
                    }
                };

                // Fehlerbehandlung

                xmlHttpRequest.onerror = (aError: any) => {
                    this.error( 'getAccessToken', aError.message);
                    aReject();
                };

                xmlHttpRequest.send('');
            } catch ( aException ) {
                this.exception( '_getAccessToken', aException );
                aReject();
            }
        });
    }


    /**
     * Rueckgabe eines SSML-Textes fuer CloudMicrosofts TTS
     *
     * @private
     * @param aText - reiner Ausgabetext fuer die Umwandlung
     * @param aLanguage - Sprache
     * @param aVoice - Stimme
     *
     * @return generierter SSML-Text
     */

    protected _getSSMLBody( aText: string, aLanguage: string, aVoice: string ): string {
        if ( !aText ) {
            this.error( 'getSSMLBody', 'kein Text uebergeben' );
            return '';
        }
        if ( !aLanguage ) {
            this.error( 'getSSMLBody', 'keine Sprache uebergeben' );
            return '';
        }
        if ( !aVoice ) {
            this.error( 'getSSMLBody', 'keine Stimme uebergeben' );
            return '';
        }
        return `<?xml version="1.0"?><speak version="1.0" xml:lang="${aLanguage}"><voice xml:lang="${aLanguage}" name="${aVoice}">${aText}</voice></speak>`;
    }


    /**
     * Senden eines Http-Request an die TTS fuer die Audiosynthese
     *
     * @private
     * @param aOption - optionale Parameter
     * @param aRegion - Name der Region von CloudMicrosoft
     * @param aAccessToken - Text des Tokens fuer den Zugriff auf die TTS
     * @param aBody - SSML Text fuer die Umwandlung in einen Audio-Stream
     */

    protected _sendToTTS( aOption: any, aRegion: string, aAccessToken: string, aSSMLText: string ): number {
        try {
            const baseUrl = 'https://' + aRegion + CLOUDMICROSOFT_TTS_URL;
            const xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', baseUrl);
            xmlHttpRequest.setRequestHeader( 'Authorization', 'Bearer ' + aAccessToken );
            xmlHttpRequest.setRequestHeader( 'cache-control', 'no-cache' );
            xmlHttpRequest.setRequestHeader( 'X-CloudMicrosoft-OutputFormat', CLOUDMICROSOFT_AUDIO_FORMAT );
            xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/ssml+xml' );
            xmlHttpRequest.responseType = 'arraybuffer';

            // Audiodaten empfangen

            xmlHttpRequest.onload = () => {
                // Audiodaten als Ergebnis
                // console.log('Response:', xmlHttpRequest);

                // Audiodaten verarbeiten

                this.mAudioPlayer.decode( aOption, xmlHttpRequest.response );
            };

            // Fehlerbehandlung

            xmlHttpRequest.onerror = (aError: any) => {
                this.error( '_sentToTTS', aError.message );
            };

            // SSML-Text an TTS senden

            xmlHttpRequest.send( aSSMLText );
            return 0;
        } catch ( aException ) {
            this.exception( '_sendToTTS', aException );
            return -1;
        }
    }


    /**
     * Startet die Sprachausgabe
     *
     * @private
     * @param aOptions - Parameter text, language und voice fuer die Sprach-TTS
     */

    protected _start( aOptions: any ): number {
        // console.log('CloudMicrosoftTTS._start: Start', aOptions);

        if ( !aOptions || !aOptions.text || typeof aOptions.text !== 'string' ) {
            this.error( '_start', 'kein Text uebergeben' );
            return -1;
        }
        try {
            // Audio-Player erzeugen

            this.mAudioPlayer = new AudioPlayer( this.mAudioContext );
            if ( !this.mAudioPlayer ) {
                this.error( '_start', 'AudioPlayer wurde nicht erzeugt' );
                return -1;
            }

            this.mAudioPlayer.onAudioStart = () => {
                // console.log('CloudMicrosoftTTS._start: AudioStartEvent');
                this._onStart();
            };

            this.mAudioPlayer.onAudioStop = () => {
                // console.log('CloudMicrosoftTTS._start: AudioStopEvent');
                this._onStop();
            };

            // SSML-Body holen

            const ssmlText = this._getSSMLBody( aOptions.text, aOptions.language, aOptions.voice );
            if ( !ssmlText ) {
                return -1;
            }

            // Accesstoken holen

            const option = {
                codec: CLOUDMICROSOFT_PCM_CODEC
            };

            this._getAccessToken( this.mConfig.region, this.mConfig.subscriptionKey )
                .then((aAccessToken: string) => {
                    // Sprachsyntese ausfuehren

                    this._sendToTTS( option, this.mConfig.region, aAccessToken, ssmlText );
                })
                .catch(() => {
                    // Fehler aufgetreten
                });

            // Audioplayer starten

            this.mAudioPlayer.start();
            return 0;
        } catch ( aException ) {
            this.exception( '_start', aException );
            return -1;
        }

        // console.log('CloudMicrosoftTTS._start: End');
    }


    /**
     * Sprachausgabe beenden
     */

    protected _stop(): number {
        // console.log('CloudMicrosoftTTS._stop:', this.mAudioPlayer);
        if ( this.mAudioPlayer ) {
            this.mAudioPlayer.stop();
            this.mAudioPlayer = null;
        }
        return 0;
    }

}

