/** @packageDocumentation
 * ASR Anbindung an den CloudGoogle-Service
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


// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird

export const ASR_MAXVOLUME_COUNTER = 50;
export const ASR_TIMEOUTVOLUME_COUNTER = 200;

// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird

const ASR_MINVOLUME_THRESHOLD = 127.0;
const ASR_MAXVOLUME_THRESHOLD = 128.0;


export class CloudGoogleASR extends CloudGoogleDevice {

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


    constructor( aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect, aAudioContext: any, aGetUserMedia: any, aAudioReader: AudioHtml5ReaderInterface ) {
        super( 'CloudGoogleASR', aConfig , aConnect );
        this.mAudioContext = aAudioContext;
        this.mGetUserMedia = aGetUserMedia;
        this.mAudioReader = aAudioReader;
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
        // Dienst beenden
        this._stop();
    }


    protected _onSpeechEnd(): void {
        // console.log('Ende der Spracheingabe');
    }


    protected _onOptionMessage( aMessage: any): void {
        // pruefen auf Spracherkennung
        // console.log('_onOptionMessage: ', aMessage);
        if ( aMessage.speechEventType === 'SPEECH_EVENT_UNSPECIFIED' ) {
            if ( aMessage.results && aMessage.results.length > 0 ) {
                this._onSpeechResult( aMessage.results[ 0 ].alternatives );
            }
        } else if ( aMessage.speechEventType === 'END_OF_SINGLE_UTTERANCE' ) {
            this._onSpeechEnd();
        }
    }


    // ASR-Funktionen


    protected _startAudio(  aOption: any ): void {

    }


    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */

    protected _startASR(  aOption: any ): void {

        // Speech-Message-Funktion

        aOption.onmessage = (aMessage: any) => this._onOptionMessage( aMessage );

        // logische Verbindung aufbauen

        this.mConnect.connect( aOption );

        // Audiosource einrichten

        try {
            this.mAudioRecorder = new AudioRecorder( this.mConnect.webSocket, this.mAudioContext, (volume: any) => {
                aOption.onvolume( volume );
            });
            // Setzen des eigenen Servers
            this.mAudioRecorder.setServer( true );
            // pruefen auf Mikrofon oder Audiodaten
            if ( aOption.userMediaStream ) {
                this.mAudioRecorder.start( aOption.userMediaStream, CLOUDGOOGLE_PCM_CODEC );
            } else if ( aOption.audioData ) {
                this.mAudioRecorder.startAudio( aOption.audioData, CLOUDGOOGLE_PCM_CODEC );
            } else {
                console.log('CloudGoogleASR._startASR: keine Audiodaten vorhanden');
                return;
            }
            this.mRecordingFlag = true;
        } catch ( aException ) {
            this.exception( '_start', aException );
        }
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _start( aOption ): number {
        // console.log('CloudGoogleASR._start:', aOption.language);
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
                        language: aOption.language
                    };
                    try {
                        this._startASR( option );
                    } catch ( aException ) {
                        this.exception( '_start', aException );
                    }
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
        this.error( '_stop', 'ASR ist nicht implementiert' );
        return -1;
    }


    protected _stop(): number {
        // console.log('CloudGoogleASR._stop');
        this.mRecordingFlag = false;
        if ( !this.mAudioRecorder ) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop(() => {
                this._onStop();
            });
            this.mAudioRecorder = null;
            return 0;
        } catch ( aException ) {
            this.exception( '_stop', aException );
            return -1;
        }
    }

}
