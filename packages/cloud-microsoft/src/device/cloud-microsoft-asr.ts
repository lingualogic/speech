/** @packageDocumentation
 * ASR Anbindung an den CloudMicrosoft-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// common

import { AudioHtml5ReaderInterface } from '@speech/common';


// cloud-microsoft

import { CloudMicrosoftConfig } from '../cloud-microsoft-config';
import { CloudMicrosoftConnect } from '../net/cloud-microsoft-connect';
import { CloudMicrosoftDevice } from './cloud-microsoft-device';


// Konstanten


// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird

export const ASR_MAXVOLUME_COUNTER = 50;
export const ASR_TIMEOUTVOLUME_COUNTER = 200;

// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird

const ASR_MINVOLUME_THRESHOLD = 127.0;
const ASR_MAXVOLUME_THRESHOLD = 128.0;


export class CloudMicrosoftASR extends CloudMicrosoftDevice {

    // HTML5-Komponenten

    private mAudioContext = null;
    private mGetUserMedia = null;


    // AudioReader, fuer Einlesen von Audiodateien, anstatt das Mikrofon zu benutzen

    private mAudioReader: AudioHtml5ReaderInterface = null;


    // weitere Attribute

    private mAudioRecorder = null;
    private mUserMediaStream = null;
    private mRequestId = 0;
    private mVolumeCounter = 0;
    private mTimeoutCounter = 0;
    private mRecordingFlag = false;
    private mRecognizer = null;


    constructor( aConfig: CloudMicrosoftConfig, aConnect: CloudMicrosoftConnect, aAudioContext: any, aGetUserMedia: any, aAudioReader: AudioHtml5ReaderInterface ) {
        super( 'CloudMicrosoftASR', aConfig , aConnect );
        this.mAudioContext = aAudioContext;
        this.mGetUserMedia = aGetUserMedia;
        this.mAudioReader = aAudioReader;
    }



    // ASR-Funktionen



    protected _startAudio(  aOption: any ): void {

    }


    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */

     // TODO: Muss mehr dem SDK von CloudMicrosoft angepasst werden fuer die Fehlerbehandung

    protected _startASR(  aOption: any ): number {
        try {
            if ( !(window as any).SpeechSDK ) {
                this.error( '_startASR', 'kein CloudMicrosoft SpeechSDK vorhanden' );
                return -1;
            }

            // Sprache einstellen

            const speechConfig = this.mConnect.speechConfig;
            if ( !speechConfig ) {
                this.error( '_startASR', 'kein CloudMicrosoft SpeechConfig vorhanden' );
                return -1;
            }
            speechConfig.speechRecognitionLanguage = 'de-DE';
            if ( aOption.language ) {
                speechConfig.speechRecognitionLanguage = aOption.language;
            }

            // Mikrofon als Audioquelle holen

            const audioConfig  = (window as any).SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

            // Speech Recognition aufrufen

            this.mRecordingFlag = true;
            this.mRecognizer = new (window as any).SpeechSDK.SpeechRecognizer( speechConfig, audioConfig );
            this.mRecognizer.recognizeOnceAsync(
                (aResult) => {
                    // console.log('CloudMicrosoftASR._startASR:', aResult);
                    // pruefen auf vorgekommenen Fehler
                    if ( !aResult.privErrorDetails ) {
                        this._onResult( aResult );
                        this._stop();
                    }
                },
                (aError) => {
                    // console.log('CloudMicrosoftASR._startASR: Error ', aError);
                    this._onError( new Error('ASR-Error: ' + aError ));
                    this._stop();
            });
            return 0;
        } catch ( aException ) {
            this.exception( '_startASR', aException );
            return -1;
        }
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _start( aOption: any ): number {
        // console.log('CloudMicrosoftASR._start:', aOption.language);
        if ( this.mRecordingFlag ) {
            this.error( '_start', 'ASR laeuft bereits' );
            return -1;
        }

        /*
        // TODO: Hier muss zwischen vorhandenen Audiodaten zum Streamen und dem Mikrofon
        //       als Audioquelle unterschieden werden.

        if ( aOption && aOption.audioURL ) {
            const option = {
                audioURL: aOption.audioURL,
                language: aOption.language
            };
            if ( aOption.nlu ) {
                option['nlu'] = true;
                option['tag'] = this.mConfig.nluTag;
            }
            if ( aOption.progressive ) {
                option['progressive'] = true;
            }
            try {
                this._startAudio( option );
            } catch ( aException ) {
                this._exception( '_start', aException );
            }
        } else {
            if ( !this.mGetUserMedia ) {
                this._error( '_start', 'kein getUserMedia vorhanden' );
                return -1;
            }
            this.mVolumeCounter = 0;
            this.mTimeoutCounter = 0;
            try {
                // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                this.mGetUserMedia({ audio: true, video: false }).then((stream: any) => {
                    // console.log('NuanceASR._start: getUserMedia = ', stream);
                    this.mUserMediaStream = stream;
                    const option = {
                        userMediaStream: this.mUserMediaStream,
                        language: aOption.language,
                        tag: this.mConfig.nluTag
                    };
                    if ( aOption.nlu ) {
                        option['nlu'] = true;
                    }
                    if ( aOption.progressive ) {
                        option['progressive'] = true;
                    }
                    try {
                        this._startASR( option );
                    } catch ( aException ) {
                        this._exception( '_start', aException );
                    }
                }, (aError) => {
                    // console.log('NuanceASR._start: getMediaError', aError);
                    this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                    this._error( '_start', 'keine UserMedia erzeugt: ' + aError.message );
                    // hier muss die ASR sofort beendet werden
                    this._onStop();
                });
                return 0;
            } catch ( aException ) {
                this._exception( '_start', aException );
                return -1;
            }
        }
        */
        const option = {
            language: aOption.language,
        };
        return this._startASR( option );
    }


    protected _stop(): number {
        // console.log('CloudMicrosoftASR._stop');
        this.mRecordingFlag = false;
        try {
            if ( this.mRecognizer ) {
                this.mRecognizer.close();
                this.mRecognizer = null;
                this._onStop();
            }
            return 0;
        } catch ( aException ) {
            return -1;
        }
    }

}
