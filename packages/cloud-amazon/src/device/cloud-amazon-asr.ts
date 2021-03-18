/** @packageDocumentation
 * ASR Anbindung an den CloudAmazon Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// common

import { AudioHtml5ReaderInterface } from '@speech/common';


// cloud-amazon

import { CloudAmazonConfig } from '../cloud-amazon-config';
import { CloudAmazonConnect } from '../net/cloud-amazon-connect';
import { CloudAmazonDevice } from './cloud-amazon-device';


// Konstanten


// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird

export const ASR_MAXVOLUME_COUNTER = 50;
export const ASR_TIMEOUTVOLUME_COUNTER = 200;

// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird

const ASR_MINVOLUME_THRESHOLD = 127.0;
const ASR_MAXVOLUME_THRESHOLD = 128.0;


export class CloudAmazonASR extends CloudAmazonDevice {

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


    constructor( aConfig: CloudAmazonConfig, aConnect: CloudAmazonConnect, aAudioContext: any, aGetUserMedia: any, aAudioReader: AudioHtml5ReaderInterface ) {
        super( 'CloudAmazonASR', aConfig , aConnect );
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

    protected _startASR(  aOption: any ): void {

    }


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _start( aOption: any ): number {
        /****
        // console.log('AmazonASR._start:', aOption.language);
        if ( this.mRecordingFlag ) {
            this._error( '_start', 'ASR laeuft bereits' );
            return -1;
        }

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
        return 0;
        ****/
       this.error( '_start', 'ASR ist nicht implementiert' );
       return -1;
   }


    protected _stop(): number {
        /****
        // console.log('NuanceASR._stop');
        this.mRecordingFlag = false;
        if ( !this.mAudioRecorder ) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop(() => {
            const _audio_end = {
                    'message': 'audio_end',
                    'audio_id': this.mRequestId
                };
                this.mConnect.sendJSON( _audio_end );
            });
            this.mAudioRecorder = null;
            return 0;
        } catch ( aException ) {
            this._exception( '_stop', aException );
            return -1;
        }
        ****/
        this.error( '_stop', 'ASR ist nicht implementiert' );
        return -1;
    }

}
