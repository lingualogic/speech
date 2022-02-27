/** @packageDocumentation
 * AudioBrowserRecorder, sendet Audiostream vom Mikrophon
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module audio/base
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// audio

import { AudioCodec } from './audio-codec';
import { AudioResampler } from './audio-resampler';


// Konstanten

export const AUDIO_PCM_CODEC = 'audio/L16;rate=16000';
export const AUDIO_DEFAULT_CODEC = AUDIO_PCM_CODEC;

export const AUDIO_BUFFER_SIZE = 2048;
export const AUDIO_DEFAULT_SAMPLERATE = 16000;


/**
 * Klasse AudioRecorder zum Aufnehmen von Audiodaten und streamen
 */

export class AudioBrowserRecorder extends ErrorBase {

    // Komponenten

    private mAudioContext: AudioContext = null;
    private mAudioCodec: AudioCodec = null;
    private mResampler: AudioResampler = null;
    // FLag fuer eigenen Server an der WebSocket
    private mServerFlag = false;

    // Audio-Paramter

    private mBufferSize = AUDIO_BUFFER_SIZE;
    private mSampleRate = AUDIO_DEFAULT_SAMPLERATE; // 16k up to server
    private mCodec = AUDIO_DEFAULT_CODEC;

    // Audio-Knoten

    private mAudioInputNode = null;
    private mAnalyseNode = null;
    private mRecordingNode = null;

    // Audio-Daten

    private mUserMediaStream: MediaStream = null;
    private mChannelDataList = [];
    private mBytesRecorded = 0;
    private mRecordingFlag = false;

    // Event-Funktionen

    private mOnVolumeFunc: (volume: any) => void = null;
    private mOnEndedFunc: (aBuffer: ArrayBuffer) => void = null;

    private mOnMicrophoneStartFunc: () => void = null;
    private mOnMicrophoneStopFunc: () => void = null;

    private mOnStreamStartFunc: () => void = null;
    private mOnStreamStopFunc: () => void = null;
    private mOnStreamDataFunc: (aStreamData: any) => number = null;


    /**
     * Konstruktor
     *
     * @param {WebSocket} aWebSocket - WebSocket-Objekt oder null
     * @param {AudioContext} aAudioContext - AudioContext-Objekt
     * @param {(aVolumeData) => void} aVolumeCallback - Callback-Funktion
     */

    constructor( aAudioContext: AudioContext, aVolumeCallback: (aVolumeData: any) => void ) {
        super( 'AudioBrowserRecorder' );
        this.mAudioContext = aAudioContext;
        this.mOnVolumeFunc = aVolumeCallback;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        this.mAudioCodec = new AudioCodec();

        /****
        if ($("#codec").val() === "audio/L16;rate=8000" || $("#codec").val() === "audio/opus;rate=8000") {
            mSampleRate = 8000;
        }
        ****/

        // console.log('AudioBrowserRecorder:', this.mAudioContext.sampleRate, this.mSampleRate, this.mBufferSize);
        try {
            this.mResampler = new AudioResampler( this.mAudioContext.sampleRate, this.mSampleRate, 1, this.mBufferSize, undefined );
        } catch ( aException ) {
            // console.log('AudioRecorder: Exception', aException.message);
            this.exception( 'constructor', aException );
            // Exception wird geworfen, da AudioRecorder nicht funktionsfaehig ist !
            throw new Error('AudioBrowserRecorder nicht initialisiert');
        }

        // this.opusEncoderSetup( this.mSampleRate );
    }


    /**
     * Setzen, ob eigener Server an WebSocket oder nicht
     *
     * @param aServerFlag - true, wenn eigener Server an WebSocket, sonst false
     */

    setServer( aServerFlag: boolean ) {
        this.mServerFlag = aServerFlag;
    }


    // Recorder-Funktionen


    /**
     * Hier wird der MediaStream wieder geschlossen, damit das Mikrofon-Symbol
     * im Browser wieder verschwindet.
     *
     * @private
     */

    protected _closeMediaStream(): void {
        try {
            // Schliessen des MediaStreams
            if ( this.mUserMediaStream ) {
                // pruefen, ob Tracks vorhanden sind
                if ( this.mUserMediaStream.getAudioTracks ) {
                    const trackList = this.mUserMediaStream.getAudioTracks();
                    // console.log('AudioRecorder.start: Tracks = ', trackList);
                    for ( const track of trackList ) {
                        if ( track.stop ) {
                            track.stop();
                        }
                    }
                }
            }
        } catch ( aException ) {
            // console.log('AudioRecorder._closeMediaStream: Exception', aException);
            this.exception( '_closeMediaStream', aException );
        }
        this.mUserMediaStream = null;
    }


    getAudioData( aDataList: any[]): ArrayBuffer {
        // console.log('GoogleAudioRecorder2.getAudioData', aDataList);

        // pruefen auf Gesamtanzahl aller Bytes

        let count = 0;
        for ( const array of aDataList ) {
            count += array.length;
        }

        // Arraybuffer mit Gesamtanzahl der Bytes erzeugen

        const typedArray = new Int16Array( count );
        let index = 0;
        for ( const array of aDataList ) {
            for ( let i = 0; i < array.length; i++ ) {
                typedArray[ index ] = array[ i ];
                index++;
            }
        }

        // Buffer zurueckgeben

        return typedArray.buffer;
    }


    /**
     * Hier wird der Ende-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    protected _onEnded(): number {
        // console.log('AudioRecorder._onEnded:', this.mOnEndedFunc);

        // Verarbeiten der Daten zu einem ArrayBuffer

        const buffer = this.getAudioData( this.mChannelDataList );

        if ( typeof this.mOnEndedFunc === 'function' ) {
            try {
                this.mOnEndedFunc( buffer );
            } catch ( aException ) {
                // console.log('AudioRecorder._onEnded: Exception', aException);
                this.exception( '_onEnded', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Hier wird der Microphone Start-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    protected _onMicrophoneStart(): number {
        // console.log('AudioRecorder._onMicrophoneStart:', this.mOnMicrophoneStartFunc);
        if ( typeof this.mOnMicrophoneStartFunc === 'function' ) {
            try {
                this.mOnMicrophoneStartFunc();
            } catch ( aException ) {
                // console.log('AudioRecorder._onMicrophoneStart: Exception', aException);
                this.exception( '_onMicrophoneStart', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Hier wird der Microphone Start-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    protected _onMicrophoneStop(): number {
        // console.log('AudioRecorder._onMicrophoneStop:', this.mOnMicrophoneStopFunc);
        if ( typeof this.mOnMicrophoneStopFunc === 'function' ) {
            try {
                this.mOnMicrophoneStopFunc();
            } catch ( aException ) {
                // console.log('AudioRecorder._onMicrophoneStop: Exception', aException);
                this.exception( '_onMicrophoneStop', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Hier wird der Volumen-Callback Aufruf getaetigt
     *
     * @private
     * @param {*} aVolumeData - Volumendaten zur Auswertung
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _onVolume( aVolumeData: any ): number {
        // console.log('AudioRecorder._onVolume:', aVolumeData);
        if ( typeof this.mOnVolumeFunc === 'function' ) {
            try {
                this.mOnVolumeFunc( aVolumeData );
            } catch ( aException ) {
                // console.log('AudioRecorder._onVolume: Exception', aException);
                this.exception( '_onVolume', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Audioprozess Funktion
     *
     * @private
     * @param {*} aEvent - AudioProzess-Event mit InputDaten vom Mikrofon
     */

    protected _onAudioProcess( aEvent: any ): void {
        // console.log('AudioRecorder._onAudioProcess: ', this.mRecordingFlag, aEvent);
        try {
            // Audioprozess beenden
            if ( !this.mRecordingFlag ) {
                // console.log('AudioBrowserRecorder._onAudioProcess: stop');
                this.mAudioInputNode.disconnect( this.mAnalyseNode );
                this.mAnalyseNode.disconnect( this.mRecordingNode );
                this.mRecordingNode.disconnect( this.mAudioContext.destination );
                this._closeMediaStream();
                this._onMicrophoneStop();
                this._onStreamStop();
                this._onEnded();
                // Nachricht an eigenen Server, um Streaming zu beenden
                /* TODO: muss in entsprechende ASR als StreamStop-Funktion verschoben werden
                if ( this.mWebSocket && this.mServerFlag ) {
                    this.mWebSocket.send( JSON.stringify({ event: 'googleASRAudioStop' }));
                }
                */
                // console.log('AudioRecorder._onAudioProcess: disconnect');
                // TODO: hier sollte ein Event fuer das ausgeschaltete Mikrofon hin
                return;
            }
            // Audiodaten sammeln
            const inputData = aEvent.inputBuffer.getChannelData( 0 );
            const _inputData = this.mResampler.resampler( inputData );
            // this.mChannelDataList.push( _inputData );
            this.mBytesRecorded += _inputData.length;
            const ampArray = new Uint8Array( this.mAnalyseNode.frequencyBinCount );
            this.mAnalyseNode.getByteTimeDomainData( ampArray );
            // pruefen auf Codec
            if ( this.mAudioCodec.findPcmCodec( this.mCodec )) {
                const encodedList = this.mAudioCodec.encodePCM( _inputData, this.mCodec );
                encodedList.forEach((typedArray: any) => {
                    // console.log('AudioRecorder._onAudioProcess:', typedArray);
                    // TODO: hier muessen die Daten zu einem einzigen Array gesammelt werden
                    // Daten senden ueber WebSocket
                    if ( this._onStreamData( typedArray ) !== 0 ) {
                        // AudioRecorder muss sofort abgebrochen werden !
                        this.mRecordingFlag = false;
                        return;
                    }
                    /* TODO: muss in ASR als StreamData-Funktion verschoben werden
                    if ( this.mWebSocket ) {
                        this.mWebSocket.send( typedArray.buffer );
                    }
                    */
                    this.mChannelDataList.push( typedArray );
                });
            } else {
                // andere Codec sind nicht implementiert
                this.error( '_onAudioProcess', 'Codec nicht implementiert' );
            }
            /* TODO: muss neu entwickelt werden
            if ( this.mServerFlag ) {
                // TODO: muss neu entwickelt werden, um Recording-Stop zu finden
                // this._onVolume( ampArray );
            } else {
                this._onVolume( ampArray );
            }
            */
            this._onVolume( ampArray );
        } catch ( aException ) {
            this.exception( '_onAudioProcess', aException );
        }
    }


    // Stream-Events


    /**
     * Hier wird ein Stream gestartet Event gesendet
     */

    protected _onStreamStart(): void {
        // console.log('AudioBrowserRecorder._onStreamStart');
        if ( typeof this.mOnStreamStartFunc === 'function' ) {
            try {
                this.mOnStreamStartFunc();
            } catch ( aException ) {
                // console.log('AudioBrowserRecorder._onStreamStart: Exception', aException);
                this.exception( '_onStreamStart', aException );
            }
        }
    }


    /**
     * Hier wird ein Stream beendet Event gesendet
     */

    protected _onStreamStop(): void {
        // console.log('AudioBrowserRecorder._onStreamStop');
        if ( typeof this.mOnStreamStopFunc === 'function' ) {
            try {
                this.mOnStreamStopFunc();
            } catch ( aException ) {
                // console.log('AudioBrowserRecorder._onStreamStop: Exception', aException);
                this.exception( '_onStreamStop', aException );
            }
        }
    }


    /**
     * Hier wird ein Stream Daten Event gesendet
     */

     protected _onStreamData( aStreamData: any ): number {
        // console.log('AudioBrowserRecorder._onStreamData');
        if ( typeof this.mOnStreamDataFunc === 'function' ) {
            try {
                return this.mOnStreamDataFunc( aStreamData );
            } catch ( aException ) {
                // console.log('AudioBrowserRecorder._onStreamStop: Exception', aException);
                this.exception( '_onStreamData', aException );
                return -1;
            }
        }
        return 0;
    }


    set onStreamStart( aStreamStartFunc: () => void ) {
        this.mOnStreamStartFunc = aStreamStartFunc;
    }


    set onStreamStop( aStreamStopFunc: () => void ) {
        this.mOnStreamStopFunc = aStreamStopFunc;
    }


    set onStreamData( aStreamDataFunc: (aStreamData: any) => number ) {
        this.mOnStreamDataFunc = aStreamDataFunc;
    }


    // Recrder-Funktionen


    /**
     * Startet die Audioaufnahmen und das Audiostreaming
     *
     * @param {MediaStream} aUserMediaStream - MediaStream vom Aufnahmegeraet(Mikrofon)
     * @param {string} aCodec - Audio-Codec
     */

    start( aUserMediaStream: MediaStream, aCodec: string ): void {
        // console.log('AudioRecorder.start: start', aUserMediaStream, aCodec);
        this.mRecordingFlag = true;
        this.mUserMediaStream = aUserMediaStream;
        this.mCodec = aCodec;
        // Fuer Chrome muss hier mAudioContext.resume() aufgerufen werden, da Chrome das Web-API mit einer Policy versehen hat,
        // nach der nur nach einer User-Aktion das Web-API ausgefuehrt werden kann. Wenn der Context vor einer User-Aktion
        // erzeugt wird, ist er im syspend-Modus und muss mit resume() umgeschaltet werden.
        this.mAudioContext.resume().then(() => {
            // console.log('AudioRecorder.start: resume')
            try {
                // Nachricht an eigenen Server, um mit Streaming zu beginnen
                this._onStreamStart();
                /* TODO: muss in ASR als StreamStart-Funktion uebertragen werden
                if ( this.mWebSocket && this.mServerFlag ) {
                    this.mWebSocket.send( JSON.stringify({ event: 'googleASRAudioStart' }));
                }
                */
                this.mAudioInputNode = this.mAudioContext.createMediaStreamSource( this.mUserMediaStream );
                this.mAnalyseNode = this.mAudioContext.createAnalyser();
                this.mRecordingNode = this.mAudioContext.createScriptProcessor( this.mBufferSize, 1, 2 );
                // Audioprozess-Funktion
                this.mRecordingNode.onaudioprocess = (aEvent: any) => this._onAudioProcess( aEvent );
                // alle Audioknoten miteinander verbinden
                this.mAudioInputNode.connect( this.mAnalyseNode );
                this.mAnalyseNode.connect( this.mRecordingNode );
                this.mRecordingNode.connect( this.mAudioContext.destination );
                // Event fuer das eingeschaltete Mikrofon
                this._onMicrophoneStart();
            } catch ( aException ) {
                // console.log('AudioRecorder.start: Exception', aException);
                this.exception( 'start', aException );
            }
            // console.log('AudioRecorder.start: end');
        }, (aError: any) => {
            // console.log('AudioRecorder.start: Resume-Error', aError);
            if ( aError && aError.message ) {
                this.error( 'start.resume', aError.message );
            }
        });
    }


    /**
     * Audiodaten fuer Uebertragung nach Nuance verwenden, anstelle des Mikrofons
     *
     * @param {*} aAudioData - Audiodaten aus Audiodatei
     * @param {string} aCodec - Audio-Codec
     */

    // TODO: Problem mit der Uebertragung an Nuance als Stream

    startAudio( aAudioData: any, aCodec: string ): void {
        // console.log('AudioRecorder.startAudio:', aCodec);
        // TODO: Audiodaten in Bloecke aufteilen und verarbeiten
        // Schleife fuer alle Audiodaten versenden
    }


    /**
     * Stop-Funktion fuer Audioaufnahme
     *
     * @param {() => void} aOnEndedFunc - Handler fuer Ende der Audioaufnahme
     */

    stop( aOnEndedFunc: () => void ): void {
        // console.log('AudioBrowserRecorder.stop');
        this.mOnEndedFunc = aOnEndedFunc;
        this.mRecordingFlag = false;
    }


    // Event-Funktionen


    set onMicrophoneStart( aMicrophoneStartFunc: () => void ) {
        this.mOnMicrophoneStartFunc = aMicrophoneStartFunc;
    }

    set onMicrophoneStop( aMicrophoneStopFunc: () => void ) {
        this.mOnMicrophoneStopFunc = aMicrophoneStopFunc;
    }

}
