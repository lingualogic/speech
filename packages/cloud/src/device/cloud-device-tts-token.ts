/** @packageDocumentation
 * TTSToken Anbindung an den Cloud-Service (Tokenserver)
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// net

import { FetchFactory } from '@lingualogic-speech/net';


// audio

import { AudioBrowserPlayer } from '@lingualogic-speech/audio';


// cloud

import { CLOUD_TTS_TYPE } from './cloud-device-const';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { ICloudToken, CloudToken } from '../token/cloud-token';
import { CloudDevice } from './cloud-device';


// Konstanten

const CLOUDGOOGLE_TTSSERVER_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';


export class CloudDeviceTTSToken extends CloudDevice {


    // Token-Objekt

    private mToken: ICloudToken = null;


    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;


    /**
     * Erzeugt eine Instanz von CloudGoogleTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */

    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect, aFetchFactory: FetchFactory, aAudioContext: any ) {
        super( aConfig, aConnect );
        this.mAudioContext = aAudioContext;
        // CloudToken erzeugen zum holen eines Tokens vom Tokenserver
        this.mToken = new CloudToken( aConfig.tokenServerUrl, aConfig.appKey, aFetchFactory );
    }


    getClassName(): string {
        return 'CloudDeviceTTSToken';
    }

    
    getType(): string {
        return CLOUD_TTS_TYPE;
    }


    // Token-Funktionen


    clearToken(): number {
        return this.mToken.clearToken();
    }


    /**
     * Detect Intent zurueckgeben
     */

    async getTextToSpeech( aText: string, aLanguage: string, aVoice: string, aFormat: string): Promise<string> {
        try {
            const accessToken = await this.mToken.getAccessToken();
            const fetchFunc = this.mToken.getFetchFunc();
            if ( fetchFunc ) {
                const response = await fetchFunc( CLOUDGOOGLE_TTSSERVER_URL, {
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
                // console.log('CloudDeviceTTSToken.getTextToSpeak: ', responseJSON);
                return responseJSON;
            }
            this.error( 'getTextToSpeech', 'keine Fetch-Funktion vorhanden' );
            return '';
        } catch ( aException ) {
            this.exception( 'getTextToSpeech', aException );
            return '';
        }
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

                    this.mAudioPlayer = new AudioBrowserPlayer( this.mAudioContext );
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
                    this._onError( new Error( 'TTSToken-Exception: ' + aException.message ));
                }
                // this._onStop();
            }, (aError: any) => {
                // console.log('CloudGoogleTTS2._start: Promise-Error ', aError)
                this._onError( new Error( 'TTSToken-Error: ' + aError.message ));
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

