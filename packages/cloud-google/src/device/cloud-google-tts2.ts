/** @packageDocumentation
 * TTS2 Anbindung an den CloudGoogle-Service (Tokenserver)
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// common

import { AudioPlayer } from '@speech/common';


// cloud-google

import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleConnect } from '../net/cloud-google-connect';
import { CloudGoogleDevice } from './cloud-google-device';


// Konstanten

const CLOUDGOOGLE_TTSSERVER_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';


export class CloudGoogleTTS2 extends CloudGoogleDevice {

    // Access-Token

    private mAccessToken = '';
    private mAccessTokenDate = new Date();
    private mAccessTokenDuration = 0;


    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;


    /**
     * Erzeugt eine Instanz von CloudGoogleTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */

    constructor( aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect, aAudioContext: any ) {
        super( 'CloudGoogleTTS2', aConfig, aConnect );
        this.mAudioContext = aAudioContext;
        // Prefetch des Tokens, dient dem Starten des Tokenservers in der Cloud
        this.getAccessTokenFromServer();
    }


    // Token-Funktionen


    clearToken(): void {
        this.mAccessToken = '';
        this.mAccessTokenDate = new Date();
        this.mAccessTokenDuration = 0;
    }


    /**
     * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
     */

    getDiffTime( date1, date2 ): number {
        return date2.getTime() - date1.getTime();
    }


    /**
     * Token wird direkt vom Tokenserver geholt
     */

    async getAccessTokenFromServer(): Promise<any> {
        try {
            const response = await fetch( this.mConfig.serverUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await response.json();
            // console.log('AccessToken: ', responseJSON);
            this.mAccessTokenDate = new Date();
            this.mAccessToken = responseJSON.token || '';
            this.mAccessTokenDuration = responseJSON.time || 0;
            // console.log( 'CloudGoogleTTS2.getAccessTokenFromServer: ', this.mAccessToken, this.mAccessTokenDuration );
        } catch ( aException ) {
            this.mInitFlag = false;
            this.exception('getAccessTokenFromServer', aException);
        }
    }


    /**
     * Token wird zurueckgegeben
     */

    async getAccessToken(): Promise<string> {
        // Token nur vom Tokenserver holen, wenn die Gueltigkeitsdauer abgelaufen ist
        const currentDate = new Date();
        const diffTime = Math.round( this.getDiffTime( this.mAccessTokenDate, currentDate ) / 1000 );
        if ( diffTime > this.mAccessTokenDuration ) {
            await this.getAccessTokenFromServer();
        }
        return this.mAccessToken;
    }


    /**
     * Detect Intent zurueckgeben
     */

    async getTextToSpeech( aText: string, aLanguage: string, aVoice: string, aFormat: string): Promise<string> {
        const accessToken = await this.getAccessToken();
        const response = await fetch( CLOUDGOOGLE_TTSSERVER_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: {
                    text: aText
                },
                voice: {
                    languageCode: aLanguage,
                    name: aVoice
                },
                audioConfig: {
                    audioEncoding: aFormat
                }
            })
        });

        const responseJSON = await response.json();
        // console.log('CloudGoogleTTS2.getTextToSpeak: ', responseJSON);
        return responseJSON;
    }


    decodeBase64( aBase64Text: string ): ArrayBuffer {
        if ( window.atob ) {
            const binary_string = window.atob( aBase64Text );
            const len = binary_string.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
        return new ArrayBuffer(1);
    }


    /**
     * TTS starten
     *
     * @param aOptions
     */

    protected _start( aOptions: any ): number {
        // console.log('CloudGoogleTTS2._start:', aOptions);
        try {
            if ( !this.mConfig.serverUrl ) {
                this.error( '_start', 'kein Tokenserver vorhanden' );
                return -1;
            }
            // Hier wird die Antwort zurueckgegeben
            this.getTextToSpeech( aOptions.text, aOptions.language, aOptions.voice, 'MP3' ).then(( aResponse ) => {
                // console.log('CloudGoogleTTS2._start: response = ', aResponse );
                try {
                    // Audioplayer erzeugen

                    this.mAudioPlayer = new AudioPlayer( this.mAudioContext );
                    this.mAudioPlayer.start();
                    const options = {
                        // codec: CLOUDGOOGLE_PCM_CODEC,
                        onaudiostart: () => {
                            // console.log('Audioplayer gestartet');
                        },
                        onaudioend: () => {
                            // console.log('Audioplayer beenden');
                            this._stop();
                        }
                    };
                    // Stream dekodieren
                    // this.mAudioPlayer.decodeOld( options, aData );
                    // MP3-Audio dekodieren
                    const audioContent = (aResponse as any).audioContent;
                    // console.log('CloudGoogleTTS2._start:', audioContent);
                    this.mAudioPlayer.decodeAudio( options, this.decodeBase64( audioContent ));
                    this._onResult( aResponse );
                } catch ( aException ) {
                    this._onError( new Error( 'TTS2-Exception: ' + aException.message ));
                }
                // this._onStop();
            }, (aError: any) => {
                // console.log('CloudGoogleTTS2._start: Promise-Error ', aError)
                this._onError( new Error( 'TTS2-Error: ' + aError.message ));
                this._onStop();
            });
            return 0;
        } catch ( aException ) {
            this.exception( '_start', aException );
            return -1;
        }
    }


    protected _stop(): number {
        // console.log('CloudGoogleTTS2._stop');

        // this.mConnect.sendJSON( audioEndMessage );

        if ( this.mAudioPlayer ) {
            // fuer Streams
            // this.mAudioPlayer.stopOld();
            // fuer MP3
            this.mAudioPlayer.stopAudio();
            this._onStop();
        }
        return 0;
    }

}

