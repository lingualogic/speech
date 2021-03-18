/** @packageDocumentation
 * NLU Anbindung an den CloudGoogle-Service, hier wird nur ein Text in einen Intent umgewandelt
 * Zugriff erfolgt mit Hilfe eines AccessTokens, welche vom Dialogflow-Tokenserver geholt werden muss.
 * Das AccessToken hat eine Stunde Gueltigkeit.
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// common

import { AudioPlayer, AudioRecorder } from '@speech/common';


// cloud-google

import { CLOUDGOOGLE_PCM_CODEC } from '../cloud-google-const';
import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleConnect } from '../net/cloud-google-connect';
import { CloudGoogleDevice } from './cloud-google-device';


// Konstanten

const DIALOGFLOW_SERVER_URL = 'https://dialogflow.googleapis.com/v2/projects';


// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird

export const ASR_BEGINMAXVOLUME_COUNTER = 100;
export const ASR_ENDMAXVOLUME_COUNTER = 20;
export const ASR_TIMEOUTVOLUME_COUNTER = 150;

// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird

const ASR_MINVOLUME_THRESHOLD = 127.0;
const ASR_MAXVOLUME_THRESHOLD = 128.0;


export class CloudGoogleNLU2 extends CloudGoogleDevice {

    private mAccessToken = '';
    private mAccessTokenDate = new Date();
    private mAccessTokenDuration = 0;
    private mOptions = {};

    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;

    // HTML5-Komponenten

    private mGetUserMedia = null;

    // weitere Attribute

    private mAudioRecorder = null;
    private mUserMediaStream = null;
    private mRecordingFlag = false;
    private mStopFlag = false;
    private mSpeakFlag = false;
    private mVolumeCounter = 0;
    private mMaxVolumeCounter = ASR_BEGINMAXVOLUME_COUNTER;
    private mTimeoutCounter = 0;
    private mMicrophoneFlag = false;


    /**
     * Erzeugt eine Instanz von DialogflowNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect, aAudioContext: any, aGetUserMedia: any ) {
        super( 'CloudGoogleNLU2', aConfig, aConnect );
        this.mAudioContext = aAudioContext;
        this.mGetUserMedia = aGetUserMedia;
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
            const response = await fetch( this.mConfig.dialogflowTokenServerUrl, {
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
            // console.log( 'CloudGoogleNLU2.getAccessTokenFromServer: ', this.mAccessToken, this.mAccessTokenDuration );
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


    // NLU-Funktionen


    /**
     * Detect Intent Text zurueckgeben
     */

    async getDetectIntentText( aText: string, aLanguage: string): Promise<string> {
        try {
            // Session
            let sessionId = this.mConfig.dialogflowSessionId;
            // Zufalls-Session, wenn keine Session vorhanden
            if ( !sessionId ) {
                sessionId = Math.floor(Math.random() * Math.floor(9999999999)).toString();
                this.mConfig.dialogflowSessionId = sessionId;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentText: sessionId = ', sessionId);
            // Server-URL fuer Draft-Version des Dialogflow-Agenten
            let serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.dialogflowProjectId}/agent/sessions/${sessionId}:detectIntent`;
            // Server-URL fuer published Environment-Version des Dialogflow-Agenten
            if ( this.mConfig.dialogflowEnvironmentName ) {
                serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.dialogflowProjectId}/agent/environments/${this.mConfig.dialogflowEnvironmentName}/users/-/sessions/${sessionId}:detectIntent`;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentText: serverUrl = ', serverUrl);
            const accessToken = await this.getAccessToken();
            // console.log('CloudGoogleNLU2.getDetectIntentText: accessToken = ', accessToken);
            const response = await fetch( serverUrl, {
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

            const responseJSON = await response.json();
            // console.log('CloudGoogleNLU2.getDetectIntentText: ', responseJSON);
            return responseJSON;
        } catch ( aException ) {
            // console.log('CloudGoogleNLU2.getDetectIntentText: Exception', aException);
            this.exception( 'getDetectIntentText', aException );
            return new Promise<any>((resolve, reject) => {
                reject(new Error('Exception in getDetectIntentText'));
            });
        }
    }


    /**
     * Detect Intent Audio zurueckgeben
     */

    async getDetectIntentAudio( aAudioData: string, aLanguage: string): Promise<string> {
        try {
            // Session
            let sessionId = this.mConfig.dialogflowSessionId;
            // Zufalls-Session, wenn keine Session vorhanden
            if ( !sessionId ) {
                sessionId = Math.floor(Math.random() * Math.floor(9999999999)).toString();
                this.mConfig.dialogflowSessionId = sessionId;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: sessionId = ', sessionId);
            // Server-URL fuer Draft-Version des Dialogflow-Agenten
            let serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.dialogflowProjectId}/agent/sessions/${sessionId}:detectIntent`;
            // Server-URL fuer published Environment-Version des Dialogflow-Agenten
            if ( this.mConfig.dialogflowEnvironmentName ) {
                serverUrl = `${DIALOGFLOW_SERVER_URL}/${this.mConfig.dialogflowProjectId}/agent/environments/${this.mConfig.dialogflowEnvironmentName}/users/-/sessions/${sessionId}:detectIntent`;
            }
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: serverUrl = ', serverUrl);
            const accessToken = await this.getAccessToken();
            // console.log('CloudGoogleNLU2.getDetectIntentAudio: accessToken = ', accessToken);
            const response = await fetch( serverUrl, {
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

    protected _responseIntent( aOption: any, aResponse: any ): void {
        // console.log('CloudGoogleNLU2._readIntent: response = ', aResponse );
        let ttsResult = -1;
        try {
            // Intent zurueckgeben

            this._onResult( aResponse );

            // pruefen auf Abspielen von Audio (MP3)

            if ( this.mSpeakFlag && !this.mStopFlag ) {
                // pruefen auf MP3-Codec
                if ( aResponse.outputAudioConfig && aResponse.outputAudioConfig.audioEncoding === 'OUTPUT_AUDIO_ENCODING_MP3' ) {
                    ttsResult = this._startTTS( aOption, aResponse.outputAudio );
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

            if ( !this.mConfig.dialogflowTokenServerUrl ) {
                this.error( '_start', 'kein Tokenserver vorhanden' );
                return -1;
            }

            if ( !this.mConfig.dialogflowProjectId ) {
                this.error( '_start', 'keine ProjektID vorhanden' );
                return -1;
            }

            // pruefen auf Audioaufnahme

            if ( !aOption.text ) {
                return this._startASR( aOption );
            } else {
                // Hier wird die Antwort zurueckgegeben

                this.getDetectIntentText( aOption.text, aOption.language ).then(( aResponse ) => {
                    this._responseIntent( aOption, aResponse );
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
        this._stopASR( {} );
        this._stopTTS();
        this._onStop();
        return 0;
    }


    // ASR-Funktionen


    encodeBase64( aBuffer: ArrayBuffer ): string {
        if ( window.btoa ) {
            let binary = '';
            const bytes = new Uint8Array( aBuffer );
            const len = bytes.byteLength;
            for ( let i = 0; i < len; i++ ) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
        }
        return '';
    }


    /**
     * Pruefen auf vorhandenem Volumen
     * @param aVolumeData - Audiodaten zum pruefen auf Volumen
     */

    isVolume( aVolumeData: any ): boolean {
        this.mVolumeCounter += 1;
        this.mTimeoutCounter += 1;
        if ( aVolumeData ) {
            try {
                // Berechnung des Volumens
                const length = aVolumeData.length;
                let volumeSum = 0;
                for ( let i = 0; i < length; i++ ) {
                    volumeSum += aVolumeData[ i ] * aVolumeData[ i ];
                }
                const volume = Math.sqrt( volumeSum / length );
                // console.log('CloudGoogleNLU2.isVolume:', volume);
                if ( volume < ASR_MINVOLUME_THRESHOLD || volume > ASR_MAXVOLUME_THRESHOLD ) {
                    // console.log('CloudGoogleNLU2.isVolume:', volume);
                    this.mVolumeCounter = 0;
                    this.mMaxVolumeCounter = ASR_ENDMAXVOLUME_COUNTER;
                }
            } catch ( aException ) {
                this.exception( 'isVolume', aException );
            }
        }
        // console.log( 'CloudGoogleASR2.isVolume:', aVolumeData);
        if ( this.mVolumeCounter === this.mMaxVolumeCounter ) {
            // console.log('CloudGoogleASR2.isVolume: VolumeCounter hat beendet')
            return false;
        }
        if ( this.mTimeoutCounter === ASR_TIMEOUTVOLUME_COUNTER ) {
            // console.log('CloudGoogleASR2.isVolume: TimeoutCounter hat beendet')
            return false;
        }
        return true;
    }


    /**
     * Pruefen auf vorhandene Mikrofone-Hardware
     * TODO: ist leider nur eingeschraenkt zu gebrauchen, weil die verschiedenen Browser
     *       unterschiedliche Deviceinfos zurueckgeben! Als einziges kann 'audioinput'
     *       abgeprueft werden, weil die device-ID manchmal leer ist, obwohl ein Mikro
     *       vorhanden ist.
     * @param aOption
     */

    protected _detectMicrophone(): Promise<any> {
        // console.log('CloudGoogleNLU2._detectMicrophone: start');
        return new Promise( resolve => {
            if ( !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices ) {
                // console.log("enumerateDevices() not supported.");
                // Mikrofon wird als vorhanden angenommen, weil es nicht preufbar ist
                resolve( true );
            } else {
                // List cameras and microphones.
                // console.log('CloudGoogleNLU2._detectMicrophone: navigator start');

                navigator.mediaDevices.enumerateDevices()
                .then( devices => {
                    // console.log('CloudGoogleNLU2._detectMicrophone: devices start');
                    let microphoneFlag = false;
                    devices.forEach( device => {
                        // console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
                        // Microphone ist vorhanden, wenn audioinput vorhanden sind
                        if ( device.kind === 'audioinput' ) {
                            microphoneFlag = true;
                        }
                    });
                    resolve( microphoneFlag );
                })
                .catch( aError => {
                    // console.log( aError.name + ": " + aError.message);
                    // ist ein Fehler aufgetreten, wird das Microphone als vorhanden angenommen
                    resolve( true );
                });
            }
        });
    }


    /**
     * hier wird ein Audio uebertragen
     *
     * @param aOption
     */

    protected _startASRAudio( aOption: any ): void {

    }


    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */

    protected _startASRRecording( aOption: any ): void {
        // console.log('CloudGoogleASR2._startASR:', aOption);

        this.mMaxVolumeCounter = ASR_BEGINMAXVOLUME_COUNTER;
        this.mVolumeCounter = 0;
        this.mTimeoutCounter = 0;

        // Audiosource einrichten

        try {
            this.mAudioRecorder = new AudioRecorder( null, this.mAudioContext, (aVolumeData: any) => {
                // console.log( 'CloudGoogleASR2._startASR: volumeCallback ' + aVolumeData + '\n\n\n');
                if ( !this.isVolume( aVolumeData )) {
                    this._stopASR( aOption );
                }
            });

            // pruefen auf Mikrofon oder Audiodaten
            if ( aOption.userMediaStream ) {
                this.mAudioRecorder.start( aOption.userMediaStream, CLOUDGOOGLE_PCM_CODEC );
            } else if ( aOption.audioData ) {
                this.mAudioRecorder.startAudio( aOption.audioData, CLOUDGOOGLE_PCM_CODEC );
            } else {
                // console.log('CloudGoogleASR2._startASR: keine Audiodaten vorhanden');
                this.error( '_startASRRecording', 'keine Audiodaten vorhanden' );
                this._stop();
                return;
            }
            this.mRecordingFlag = true;
        } catch ( aException ) {
            this.exception( '_startASRRecording', aException );
            this._stopASR( aOption );
        }
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _startASR( aOption ): number {
        // console.log('CloudGoogleNLU2._startASR:', aOption.language);
        if ( this.mRecordingFlag ) {
            this.error( '_startASR', 'ASR laeuft bereits' );
            return -1;
        }

        // TODO: Hier muss zwischen vorhandenen Audiodaten zum Streamen und dem Mikrofon
        //       als Audioquelle unterschieden werden.

        if ( aOption && aOption.audioURL ) {
            const option = {
                audioURL: aOption.audioURL,
                language: aOption.language
            };
            try {
                this._startASRAudio( option );
            } catch ( aException ) {
                this.exception( '_startASR', aException );
                return -1;
            }
        } else {
            // console.log('CloudGoogleNLU2._startASR: getUserMedia = ', this.mGetUserMedia);
            if ( !this.mGetUserMedia ) {
                // TODO: diese Fehlermeldung sollte nicht notwendig sein, ist erst mal ein Workaround
                this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                this.error( '_startASR', 'kein getUserMedia vorhanden' );
                return -1;
            }
            try {
                // pruefen auf vorhandenes Mikrofon
                this._detectMicrophone().then((aMicrophoneFlag: boolean) => {
                    // console.log('CloudGoogleNLU2._startASR: microphoneFlag = ', aMicrophoneFlag);
                    if ( !aMicrophoneFlag ) {
                        // TODO: diese Fehlermeldung sollte nicht notwendig sein, ist erst mal ein Workaround
                        this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                        this.error( '_startASR', 'kein Microphone vorhanden' );
                        // hier muss die ASR sofort beendet werden
                        this._onStop();
                    } else {
                        // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                        // console.log('CloudGoogleNLU2._start: getUserMedia = ', this.mGetUserMedia);
                        this.mGetUserMedia({ audio: true, video: false }).then((stream: any) => {
                            // console.log('CloudGoogleNLU2._start: getUserMedia = ', stream);
                            this.mUserMediaStream = stream;
                            const option = {
                                userMediaStream: this.mUserMediaStream,
                                language: aOption.language
                            };
                            this._startASRRecording( option );
                        }, (aError: any) => {
                            // console.log('NuanceASR._start: getMediaError', aError);
                            this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                            this.error( '_startASR', 'keine UserMedia erzeugt: ' + aError.message );
                            // hier muss die ASR sofort beendet werden
                            this._onStop();
                        });
                    }
                });
                return 0;
            } catch ( aException ) {
                this.exception( '_startASR', aException );
                return -1;
            }
        }
        this.error( '_startASR', 'ASR ist nicht implementiert' );
        return -1;
    }


    /**
     * Beenden der Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stopASR( aOption: any ): number {
        // console.log('CloudGoogleASR2._stop: start');
        this.mRecordingFlag = false;
        if ( !this.mAudioRecorder ) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop((aBuffer: ArrayBuffer) => {
                if ( !this.mStopFlag ) {
                    // Hier wird der Intent geholt
                    this.getDetectIntentAudio( this.encodeBase64( aBuffer ), '' ).then(( aResponse: any ) => {
                        this._responseIntent( aOption, aResponse );
                    }, (aError: any) => {
                        // console.log('CloudGoogleNLU2._start: Promise-Error ', aError)
                        this._onError( new Error( 'NLU-Error: ' + aError.message ));
                        this._onStop();
                    });
                }
            });
            this.mAudioRecorder = null;
            // console.log('CloudGoogleASR2._stop: end');
            return 0;
        } catch ( aException ) {
            this.exception( '_stop', aException );
            return -1;
        }
    }


    // TTS-Funktionen


    /**
     * Dekodieren der String-Base64 Codierung
     *
     * @param aBase64Text
     */

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

    protected _startTTS( aOptions: any, aAudioData: any ): number {
        // console.log('CloudGoogleNLU2._startTTS:', aOptions);
        try {
            // pruefen auf vorhandene Audiodaten

            if ( !aAudioData ) {
                return -1;
            }

            // Audioplayer erzeugen

            this.mAudioPlayer = new AudioPlayer( this.mAudioContext );
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
