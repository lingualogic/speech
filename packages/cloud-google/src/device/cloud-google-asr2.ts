/** @packageDocumentation
 * ASR Anbindung an den CloudGoogle-Service (Tokenserver)
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// common

import { AudioHtml5ReaderInterface, AudioRecorder } from '@speech/common';


// cloud-google

import { CLOUDGOOGLE_PCM_CODEC } from '../cloud-google-const';
import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleConnect } from '../net/cloud-google-connect';
import { CloudGoogleDevice } from './cloud-google-device';


// Konstanten

const CLOUDGOOGLE_ASRSERVER_URL = 'https://speech.googleapis.com/v1/speech:recognize';


// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird

export const ASR_MAXVOLUME_COUNTER = 30;
export const ASR_TIMEOUTVOLUME_COUNTER = 200;

// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird

const ASR_MINVOLUME_THRESHOLD = 127.0;
const ASR_MAXVOLUME_THRESHOLD = 128.0;


export class CloudGoogleASR2 extends CloudGoogleDevice {

    // Access-Token

    private mAccessToken = '';
    private mAccessTokenDate = new Date();
    private mAccessTokenDuration = 0;


    // HTML5-Komponenten

    private mAudioContext = null;
    private mGetUserMedia = null;


    // AudioReader, fuer Einlesen von Audiodateien, anstatt das Mikrofon zu benutzen

    private mAudioReader: AudioHtml5ReaderInterface = null;


    // weitere Attribute

    private mAudioRecorder = null;
    private mUserMediaStream = null;
    private mRecordingFlag = false;
    private mVolumeCounter = 0;
    private mTimeoutCounter = 0;


    constructor( aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect, aAudioContext: any, aGetUserMedia: any, aAudioReader: AudioHtml5ReaderInterface ) {
        super( 'CloudGoogleASR2', aConfig , aConnect );
        this.mAudioContext = aAudioContext;
        this.mGetUserMedia = aGetUserMedia;
        this.mAudioReader = aAudioReader;
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
            // console.log( 'CloudGoogleASR2.getAccessTokenFromServer: ', this.mAccessToken, this.mAccessTokenDuration );
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

    async getSpeechToText( aLanguageCode: string, aEncoding: string, aAudioData: string): Promise<string> {
        try {
            const accessToken = await this.getAccessToken();
            const response = await fetch( CLOUDGOOGLE_ASRSERVER_URL, {
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
        } catch ( aException ) {
            this.exception( 'getSpeechToText', aException );
            this._onStop();
        }
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
                // console.log('CloudGoogleASR2.isVolume:', volume);
                if ( volume < ASR_MINVOLUME_THRESHOLD || volume > ASR_MAXVOLUME_THRESHOLD ) {
                    // console.log('CloudGoogleASR2.isVolume: set Null', volume);
                    this.mVolumeCounter = 0;
                }
            } catch ( aException ) {
                this.exception( 'isVolume', aException );
            }
        }
        // console.log( 'CloudGoogleASR2.isVolume:', aVolumeData);
        if ( this.mVolumeCounter === ASR_MAXVOLUME_COUNTER ) {
            // console.log('CloudGoogleASR2.isVolume: VolumeCounter hat beendet')
            return false;
        }
        if ( this.mTimeoutCounter === ASR_TIMEOUTVOLUME_COUNTER ) {
            // console.log('CloudGoogleASR2.isVolume: TimeoutCounter hat beendet')
            return false;
        }
        return true;
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
        this.getSpeechToText( 'de-DE', 'LINEAR16', this.encodeBase64( aBuffer ));
    }


    /**
     * hier wird ein Audio uebertragen
     *
     * @param aOption
     */

    protected _startAudio( aOption: any ): void {

    }


    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */

    protected _startASR(  aOption: any ): void {
        // console.log('CloudGoogleASR2._startASR:', aOption);

        this.mVolumeCounter = 0;
        this.mTimeoutCounter = 0;

        // Audiosource einrichten

        try {
            this.mAudioRecorder = new AudioRecorder( null, this.mAudioContext, (aVolumeData: any) => {
                // console.log( 'CloudGoogleASR2._startASR: volumeCallback ' + aVolumeData + '\n\n\n');
                if ( !this.isVolume( aVolumeData )) {
                    this._stop();
                }
            });

            // pruefen auf Mikrofon oder Audiodaten
            if ( aOption.userMediaStream ) {
                this.mAudioRecorder.start( aOption.userMediaStream, CLOUDGOOGLE_PCM_CODEC );
            } else if ( aOption.audioData ) {
                this.mAudioRecorder.startAudio( aOption.audioData, CLOUDGOOGLE_PCM_CODEC );
            } else {
                // console.log('CloudGoogleASR2._startASR: keine Audiodaten vorhanden');
                this.error( '_startASR', 'keine Audiodaten vorhanden' );
                this._stop();
                return;
            }
            this.mRecordingFlag = true;
        } catch ( aException ) {
            this.exception( '_startASR', aException );
            this._stop();
        }
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _start( aOption ): number {
        // console.log('CloudGoogleASR2._start:', aOption.language);
        if ( this.mRecordingFlag ) {
            this.error( '_start', 'ASR laeuft bereits' );
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
                this._startAudio( option );
            } catch ( aException ) {
                this.exception( '_start', aException );
            }
        } else {
            if ( !this.mGetUserMedia ) {
                this.error( '_start', 'kein getUserMedia vorhanden' );
                return -1;
            }
            try {
                // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                this.mGetUserMedia({ audio: true, video: false }).then((stream: any) => {
                    // console.log('CloudGoogleASR2._start: getUserMedia = ', stream);
                    this.mUserMediaStream = stream;
                    const option = {
                        userMediaStream: this.mUserMediaStream,
                        language: aOption.language
                    };
                    this._startASR( option );
                }, (aError) => {
                    // console.log('NuanceASR._start: getMediaError', aError);
                    this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                    this.error( '_start', 'keine UserMedia erzeugt: ' + aError.message );
                    // hier muss die ASR sofort beendet werden
                    this._onStop();
                });
                return 0;
            } catch ( aException ) {
                this.exception( '_start', aException );
                return -1;
            }
        }
        this.error( '_start', 'ASR ist nicht implementiert' );
        return -1;
    }


    /**
     * Beenden der Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stop(): number {
        // console.log('CloudGoogleASR2._stop: start');
        this.mRecordingFlag = false;
        if ( !this.mAudioRecorder ) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop((aBuffer: ArrayBuffer) => {
                this._onEndedFunc( aBuffer );
            });
            this.mAudioRecorder = null;
            // console.log('CloudGoogleASR2._stop: end');
            return 0;
        } catch ( aException ) {
            this.exception( '_stop', aException );
            return -1;
        }
    }

}
