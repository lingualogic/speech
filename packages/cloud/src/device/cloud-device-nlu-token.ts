/** @packageDocumentation
 * NLU Anbindung an den Cloud-Service, hier wird nur ein Text in einen Intent umgewandelt
 * Zugriff erfolgt mit Hilfe eines AccessTokens, welche vom Tokenserver geholt werden muss.
 * Das AccessToken hat eine Stunde Gueltigkeit.
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

import { CLOUD_ASRNLU_TYPE } from './cloud-device-const';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { ICloudAudioRecorder } from '../audio/cloud-audio-recorder.interface';
import { ICloudToken, CloudToken } from '../token/cloud-token';
import { CloudDeviceNLU } from './cloud-device-nlu';


// Konstanten

const DIALOGFLOW_SERVER_URL = 'https://dialogflow.googleapis.com/v2/projects';


export class CloudDeviceNLUToken extends CloudDeviceNLU {


    // Audio

    private mAudioRecorder: ICloudAudioRecorder = null;
    private mAudioPlayer = null;


    // weitere Attribute

    private mStopFlag = false;
    private mSpeakFlag = false;


    // Token-Objekt

    private mToken: ICloudToken = null;


    /**
     * Erzeugt eine Instanz von DialogflowNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect, aFetchFactory: FetchFactory, aAudioRecorder: ICloudAudioRecorder ) {
        super( aConfig, aConnect );
        if ( aAudioRecorder ) {
            aAudioRecorder.setStopRecorderFunc((aBuffer: ArrayBuffer) => {
                if ( !this.mStopFlag ) {
                    // Hier wird der Intent geholt
                    this._getDetectIntentAudio( this.encodeBase64( aBuffer ), '' ).then(( aResponse: any ) => {
                        this._responseIntent( aResponse );
                    }, (aError: any) => {
                        // console.log('CloudGoogleNLU2._start: Promise-Error ', aError)
                        this._onError( new Error( 'NLU-Error: ' + aError.message ));
                        this._onStop();
                    });
                }
            });
            aAudioRecorder.setStopVolumeFunc(() => this._stopASR());
        }
        // CloudToken erzeugen zum holen eines Tokens vom Tokenserver
        this.mToken = new CloudToken( aConfig.tokenServerUrl,aConfig.appKey, aFetchFactory );
    }


    getClassName(): string {
        return 'CloudDeviceNLUToken';
    }

    
    getType(): string {
        return CLOUD_ASRNLU_TYPE;
    }

    // Token-Funktionen


    clearToken(): number {
        return this.mToken.clearToken();
    }


    // NLU-Funktionen


    /**
     * Detect Intent Text zurueckgeben
     */

    protected async _getDetectIntentText( aText: string, aLanguage: string): Promise<string> {
        try {
            // Session
            let sessionId = this.mConfig.sessionId;
            // Zufalls-Session, wenn keine Session vorhanden
            if ( !sessionId ) {
                sessionId = Math.floor(Math.random() * Math.floor(9999999999)).toString();
                this.mConfig.sessionId = sessionId;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentText: sessionId = ', sessionId);
            // Server-URL fuer Draft-Version des Dialogflow-Agenten
            let serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.projectId}/agent/sessions/${sessionId}:detectIntent`;
            // Server-URL fuer published Environment-Version des Dialogflow-Agenten
            if ( this.mConfig.environmentName ) {
                serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.projectId}/agent/environments/${this.mConfig.environmentName}/users/-/sessions/${sessionId}:detectIntent`;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentText: serverUrl = ', serverUrl);
            const accessToken = await this.mToken.getAccessToken();
            const fetchFunc = this.mToken.getFetchFunc();
            // console.log('CloudGoogleNLU2.getDetectIntentText: accessToken = ', accessToken);
            if ( fetchFunc ) {
                const response = await fetchFunc( serverUrl, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        queryInput: {
                            text: {
                                text: aText,
                                languageCode: aLanguage
                            }
                        }
                    })
                });
                // console.log('CloudGoogleNLU2.getDetectIntentText: response = ', response);
                const responseJSON = await response.json();
                // console.log('CloudGoogleNLU2.getDetectIntentText: ', responseJSON);
                return responseJSON;
            }
            this.error( 'getDetectIntentText', 'keine Fetch-Funktion vorhanden' );
            return '';
        } catch ( aException ) {
            console.log('CloudGoogleNLU2.getDetectIntentText: Exception', aException);
            this.exception( 'getDetectIntentText', aException );
            return '';
        }
    }


    /**
     * Detect Intent Audio zurueckgeben
     */

    protected async _getDetectIntentAudio( aAudioData: string, aLanguage: string): Promise<string> {
        try {
            // Session
            let sessionId = this.mConfig.sessionId;
            // Zufalls-Session, wenn keine Session vorhanden
            if ( !sessionId ) {
                sessionId = Math.floor(Math.random() * Math.floor(9999999999)).toString();
                this.mConfig.sessionId = sessionId;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: sessionId = ', sessionId);
            // Server-URL fuer Draft-Version des Dialogflow-Agenten
            let serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.projectId}/agent/sessions/${sessionId}:detectIntent`;
            // Server-URL fuer published Environment-Version des Dialogflow-Agenten
            if ( this.mConfig.environmentName ) {
                serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.projectId}/agent/environments/${this.mConfig.environmentName}/users/-/sessions/${sessionId}:detectIntent`;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: serverUrl = ', serverUrl);
            const accessToken = await this.mToken.getAccessToken();
            const fetchFunc = this.mToken.getFetchFunc();
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: accessToken = ', accessToken);
            if ( fetchFunc ) {
                const response = await fetchFunc( serverUrl, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        queryInput: {
                            audioConfig: {
                                audioEncoding: 'AUDIO_ENCODING_LINEAR_16',
                                languageCode: 'de',
                                sampleRateHertz: 16000
                            }
                        },
                        inputAudio: aAudioData
                    })
                });
                // console.log('CloudGoogleNLU2.getDetectIntentAudio: ', response);
                const responseJSON = await response.json();
                // console.log('CloudGoogleNLU2.getDetectIntentAudio: ', responseJSON);
                return responseJSON;
            }
            return new Promise<any>((resolve, reject) => {
                reject(new Error('kein Fetch vorhanden'));
            });
        } catch ( aException ) {
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: Exception', aException);
            this.exception( 'getDetectIntentAudio', aException );
            return new Promise<any>((resolve, reject) => {
                reject(new Error('Exception in getDetectIntentAudio'));
            });
        }
    }


    /**
     * Verarbeitet den empfangenen Intent
     *
     * @param aResponse
     */

    protected _responseIntent( aResponse: any ): void {
        // console.log('CloudGoogleNLU2._readIntent: response = ', aResponse );
        let ttsResult = -1;
        try {
            // Intent zurueckgeben

            this._onResult( aResponse );

            // pruefen auf Abspielen von Audio (MP3)

            if ( this.mSpeakFlag && !this.mStopFlag ) {
                // pruefen auf MP3-Codec
                if ( aResponse.outputAudioConfig && aResponse.outputAudioConfig.audioEncoding === 'OUTPUT_AUDIO_ENCODING_MP3' ) {
                    ttsResult = this._startTTS( aResponse.outputAudio );
                } else {
                    this._onError( new Error('NLU-Error: no MP3-Format'));
                }
            }
        } catch ( aException ) {
            this._onError( new Error( 'NLU-Exception: ' + aException.message ));
        }

        // pruefen auf TTS gestartet

        if ( ttsResult !== 0 ) {
            this._onStop();
        }
    }


    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */

    protected _start( aOption: any ): number {
        // console.log('CloudGoogleNLU2._start:', aOption);
        this.mStopFlag = false;
        try {

            if ( !this.mConfig.tokenServerUrl ) {
                this.error( '_start', 'kein Tokenserver vorhanden' );
                return -1;
            }

            if ( !this.mConfig.projectId ) {
                this.error( '_start', 'keine ProjektID vorhanden' );
                return -1;
            }

            // pruefen auf Audioaufnahme

            if ( !aOption.text ) {
                return this._startASR( aOption );
            } else {
                // Hier wird die Antwort zurueckgegeben

                this._getDetectIntentText( aOption.text, aOption.language ).then(( aResponse ) => {
                    this._responseIntent( aResponse );
                }, (aError: any) => {
                    // console.log('CloudGoogleNLU2._start: Promise-Error ', aError)
                    this._onError( new Error( 'NLU-Error: ' + aError.message ));
                    this._onStop();
                });
            }

            return 0;
        } catch ( aException ) {
            this.exception( '_start', aException );
            return -1;
        }
    }


    protected _stop(): number {
        // console.log('CloudGoogleNLU._stop');
        this.mStopFlag = true;
        this._stopASR();
        this._stopTTS();
        this._onStop();
        return 0;
    }


    // ASR-Funktionen


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _startASR( aOption ): number {
        // console.log('CloudGoogleASR2._startASR:', aOption);

        // WebSocket eintragen

        if ( this.mConnect ) {
            aOption.webSocket = this.mConnect.webSocket;
        }

        // Recorder starten

        if ( this.mAudioRecorder ) {
            return this.mAudioRecorder.start( aOption );
        }

        return -1;
    }
        

    /**
     * Beenden der Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stopASR(): number {
        // console.log('CloudGoogleASR2._stopASR');
        
        if ( this.mAudioRecorder ) {
            return this.mAudioRecorder.stop();
        }

        return -1;
    }


    // TTS-Funktionen


    /**
     * TTS starten
     *
     * @param aOptions
     */

    protected _startTTS( aAudioData: any ): number {
        /* TODO: CloudAudioPlayer muss erst noch erstellt werden
        // console.log('CloudGoogleNLU2._startTTS:', aOptions);
        try {
            // pruefen auf vorhandene Audiodaten

            if ( !aAudioData ) {
                return -1;
            }

            // Audioplayer erzeugen

            this.mAudioPlayer = new AudioBrowserPlayer( this.mAudioContext );
            this.mAudioPlayer.start();
            const options = {
                onaudiostart: () => {
                    // console.log('CloudGoogleNLU2._startTTS: Audioplayer gestartet');
                    // TODO: Audiostart-Event einbauen
                },
                onaudioend: () => {
                    // console.log('CloudGoogleNLU2._startTTS: Audioplayer beenden');
                    // TODO: Audiostop einbauen
                    this._stop();
                }
            };
            // MP3-Audio dekodieren
            // console.log('CloudGoogleNLU2._startTTS: play Audio MP3');
            this.mAudioPlayer.decodeAudio( options, this.decodeBase64( aAudioData ));
            return 0;
        } catch ( aException ) {
            this._onError( new Error( 'NLU2-Exception: ' + aException.message ));
            return -1;
        }
        */
        return 0;
    }


    /**
     * Stoppen der TTS
     */

    protected _stopTTS(): number {
        // console.log('CloudGoogleNLU2._stopTTS');
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
