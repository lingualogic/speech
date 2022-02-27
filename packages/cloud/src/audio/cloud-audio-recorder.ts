/** @packageDocumentation
 * Recorder-Anbindung fuer Cloud
 * 
 * TODO: muss spaeter nach Audio uebertragen werden
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module cloud/audio
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// audio

import { IAudioHtml5Reader, AudioBrowserRecorder } from '@lingualogic-speech/audio';


// cloud

import { CLOUD_PCM_CODEC, ASR_BEGINMAXVOLUME_COUNTER, ASR_ENDMAXVOLUME_COUNTER, ASR_TIMEOUTVOLUME_COUNTER, ASR_MINVOLUME_THRESHOLD, ASR_MAXVOLUME_THRESHOLD } from './cloud-audio-const';
import { ICloudAudioRecorder } from './cloud-audio-recorder.interface';
export { ICloudAudioRecorder };


export class CloudAudioRecorder extends ErrorBase implements ICloudAudioRecorder {

    // TODO: muss nach Audio verschoben werden
    // Audio HTML5-Komponenten

    private mAudioContext = null;
    private mGetUserMedia = null;


    // AudioReader, fuer Einlesen von Audiodateien, anstatt das Mikrofon zu benutzen

    private mAudioReader: IAudioHtml5Reader = null;


    // weitere Attribute

    protected mAudioRecorder = null;
    private mUserMediaStream = null;
    private mVolumeCounter = 0;
    private mMaxVolumeCounter = ASR_BEGINMAXVOLUME_COUNTER;
    private mTimeoutCounter = 0;
    private mRecordingFlag = false;
    private mMicrophoneFlag = false;
    private mBreakFlag = false;

    // Recorder-Func

    private mStopRecorderFunc: any = null;
    private mStopVolumeFunc: any = null;


    // Events

    private mOnStopFunc: any = null;
    private mOnErrorFunc: any = null;
    private mOnAudioStartFunc: any = null;
    private mOnAudioStopFunc: any = null;
    private mOnStreamStartFunc: any = null;
    private mOnStreamStopFunc: any = null;
    private mOnStreamDataFunc: any = null;


    constructor( aAudioContext: any, aGetUserMedia: any, aAudioReader: IAudioHtml5Reader ) {
        super( 'CloudAudioRecorder' );
        this.mAudioContext = aAudioContext;
        this.mGetUserMedia = aGetUserMedia;
        this.mAudioReader = aAudioReader;
    }


    // Event-Funktionen

    
    protected _onStop(): void {
        // TODO: Event weiterleiten an Funktion
        // console.log('CloudAudioRecorder._onStop:', this.mOnStopFunc);
        if ( typeof this.mOnStopFunc === 'function' ) {
            this.mOnStopFunc();
        }
    }


    set onStop( aStopFunc: any ) {
        // console.log('CloudAudioRecorder.onStop:', aStopFunc);
        this.mOnStopFunc = aStopFunc;
    }


    protected _onError( aError: any ): void {
        // TODO: Event weiterleiten an Funktion
        if ( typeof this.mOnErrorFunc === 'function' ) {
            this.mOnErrorFunc( aError );
        }
    }


    set onError( aErrorFunc: any ) {
        this.mOnErrorFunc = aErrorFunc;
    }


    set onAudioStart( aAudioStartFunc: any ) {
        this.mOnAudioStartFunc = aAudioStartFunc;
    }

    set onAudioStop( aAudioStopFunc: any ) {
        this.mOnAudioStopFunc = aAudioStopFunc;
    }


    /* TODO: wird eventuell nicht benoetigt
    protected _onStreamData( aStreamData: any ): void {
        console.log('CloudAudioRecorder._onStreamData');
        if ( typeof this.mOnStreamDataFunc === 'function' ) {
            this.mOnStreamDataFunc( aStreamData );
        }
    }
    */

    set onStreamStart( aStreamStartFunc: any ) {
        this.mOnStreamStartFunc = aStreamStartFunc;
    }

    set onStreamStop( aStreamStopFunc: any ) {
        this.mOnStreamStopFunc = aStreamStopFunc;
    }

    set onStreamData( aStreamDataFunc: any ) {
        this.mOnStreamDataFunc = aStreamDataFunc;
    }


    // Volume-Funktionen


    clear(): void {
        this.mMaxVolumeCounter = ASR_BEGINMAXVOLUME_COUNTER;
        this.mVolumeCounter = 0;
        this.mTimeoutCounter = 0;
    }


    isRecording(): boolean {
        return this.mRecordingFlag;
    }


    /**
     * Pruefen auf vorhandene Mikrofone-Hardware
     * TODO: ist leider nur eingeschraenkt zu gebrauchen, weil die verschiedenen Browser
     *       unterschiedliche Deviceinfos zurueckgeben! Als einziges kann 'audioinput'
     *       abgeprueft werden, weil die device-ID manchmal leer ist, obwohl ein Mikro
     *       vorhanden ist.
     */

    protected _detectMicrophone(): Promise<any> {
        // console.log('CloudAudioRecorder._detectMicrophone: start');
        return new Promise( resolve => {
            if ( !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices ) {
                // console.log("CloudAudioRecorder._detectMicrophone: enumerateDevices() not supported");
                // Mikrofon wird als vorhanden angenommen, weil es nicht pruefbar ist
                resolve( true );
            } else {
                // List cameras and microphones.
                // console.log('CloudAudioRecorder._detectMicrophone: navigator start');

                navigator.mediaDevices.enumerateDevices()
                .then( devices => {
                    // console.log('CloudAudioRecorder._detectMicrophone: devices start');
                    let microphoneFlag = false;
                    devices.forEach( device => {
                        // console.log('CloudAudioRecorder._detectMicrophone:  kind = ' + device.kind + "  device = " + device.label + "  id = " + device.deviceId);
                        // Microphone ist vorhanden, wenn audioinput vorhanden sind
                        if ( device.kind === 'audioinput' ) {
                            microphoneFlag = true;
                        }
                    });
                    resolve( microphoneFlag );
                })
                .catch( aError => {
                    console.log( 'CloudAudioRecorder._detectMicrophone: Error ' + aError.name + ": " + aError.message);
                    // ist ein Fehler aufgetreten, wird das Microphone als vorhanden angenommen
                    resolve( true );
                });
            }
        });
    }


    /**
     * Pruefen auf vorhandenem Volumen
     * @param aVolumeData - Audiodaten zum pruefen auf Volumen
     */

    protected _isVolume( aVolumeData: any ): boolean {
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
                // console.log('CloudAudioRecorder.isVolume:', volume);
                if ( volume < ASR_MINVOLUME_THRESHOLD || volume > ASR_MAXVOLUME_THRESHOLD ) {
                    // console.log('CloudAudioRecorder.isVolume:', volume);
                    this.mVolumeCounter = 0;
                    this.mMaxVolumeCounter = ASR_ENDMAXVOLUME_COUNTER;
                }
            } catch ( aException ) {
                this.exception( 'isVolume', aException );
            }
        }
        // console.log( 'CloudAudioRecorder.isVolume:', aVolumeData);
        if ( this.mVolumeCounter === this.mMaxVolumeCounter ) {
            // console.log('CloudAudioRecorder.isVolume: VolumeCounter hat beendet')
            return false;
        }
        if ( this.mTimeoutCounter === ASR_TIMEOUTVOLUME_COUNTER ) {
            // console.log('CloudAudioRecorder.isVolume: TimeoutCounter hat beendet')
            return false;
        }
        return true;
    }


    /**
     * Audiodaten verwenden
     * 
     * @param aOption - optionale Parameter
     * @returns 
     */

    protected _startAudio( aOption: any ): number {
        // TODO: muss noch implementiert werden
        return -1;
    }


    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption - optionale Werte fuer
     */

    protected _startRecorder( aOption: any ): number {
        // console.log('CloudAudioRecorder._startRecorder:', aOption);

        this.clear();

        // Audiosource einrichten

        try {
            // TODO: WebSocket muss durch Stream-Callback Funktion ausgetauscht werden, Audio muss von WebSocket entkoppelt werden
            this.mAudioRecorder = new AudioBrowserRecorder( this.mAudioContext, (aVolumeData: any) => {
                // console.log( 'CloudAudioRecorder._startRecorder: volumeCallback ' + aVolumeData + '\n\n\n');
                /* TODO: Fraunhofer-Server stellt selbst das Ende einer Spracheingabe fest, daher wird hier temporaer gesperrt
                if ( !this._isVolume( aVolumeData )) {
                    this._stopVolume();
                }
                */
            });

            // Mikrofon Ein/Aus-Eventfunktionen einbinden

            this.mAudioRecorder.onMicrophoneStart = this.mOnAudioStartFunc;
            this.mAudioRecorder.onMicrophoneStop = this.mOnAudioStopFunc;

            // AudioStream Funktionen einbinden

            this.mAudioRecorder.onStreamStart = this.mOnStreamStartFunc;
            this.mAudioRecorder.onStreamStop = this.mOnStreamStopFunc;
            this.mAudioRecorder.onStreamData = this.mOnStreamDataFunc;

            // pruefen auf Mikrofon oder Audiodaten
            if ( aOption.userMediaStream ) {
                this.mAudioRecorder.start( aOption.userMediaStream, CLOUD_PCM_CODEC );
            } else if ( aOption.audioData ) {
                this.mAudioRecorder.startAudio( aOption.audioData, CLOUD_PCM_CODEC );
            } else {
                console.log('CloudAudioRecorder._startRecorder: keine Audiodaten vorhanden');
                this.error( 'start', 'keine Audiodaten vorhanden' );
                return -1;
            }
            if ( this.mBreakFlag ) {
                return -1;
            }
            // console.log('CloudAudioRecorder._startRecorder');
            this.mRecordingFlag = true;
            return 0;
        } catch ( aException ) {
            this.exception( '_startRecorder', aException );
            return -1;
        }
    }


    /**
     * StopRecorder-Funktion eintragen
     */

    setStopRecorderFunc( aStopRecorderFunc: any ): void {
        this.mStopRecorderFunc = aStopRecorderFunc;
    }


    protected _stopRecorder(): void {
        // console.log('CloudAudioRecorder._stopRecorder');
        this.mRecordingFlag = false;
        if ( !this.mAudioRecorder ) {
            return;
        }
        if ( typeof this.mStopRecorderFunc === 'function' ) {
            this.mAudioRecorder.stop( this.mStopRecorderFunc );
        } else {
            this.mAudioRecorder.stop(() => {
                this._onStop();
            });
        }
        this.mAudioRecorder = null;
    }


    /**
     * StopVolume-Funktion eintragen, wenn Volumen Grenzwert unterschritten hat
     */

    setStopVolumeFunc( aStopVolumeFunc: any ): void {
        this.mStopVolumeFunc = aStopVolumeFunc;
    }

    protected _stopVolume(): void {
        if ( typeof this.mStopVolumeFunc === 'function' ) {
            // console.log('CloudAudioRecorder._stopVolume: Aufruf von StopVolumeFunc ');
            this.mStopVolumeFunc();
        } else {
            // console.log('CloudAudioRecorder._stopVolume: Aufruf von _stopRecorder');
            this._stopRecorder();
        }
    }


    /**
     * startet die Aufnahme
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    start( aOption ): number {
        // console.log('CloudAudioRecorder.start:', aOption);

        this.mBreakFlag = false;

        if ( this.mRecordingFlag ) {
            this.error( 'start', 'AudioRecorder laeuft bereits' );
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
                if ( this._startAudio( option ) !== 0 ) {
                    this._onError( new Error( 'Fehler bei Recorder Ausfuehrung' ));
                    this._onStop();
                }
                return 0;
            } catch ( aException ) {
                this.exception( 'start', aException );
                return -1;
            }
        } else {
            if ( !this.mGetUserMedia ) {
                this.error( 'start', 'kein getUserMedia vorhanden' );
                return -1;
            }
            try {
                // pruefen auf vorhandenes Mikrofon
                this._detectMicrophone().then((aMicrophoneFlag: boolean) => {
                    // console.log('CloudAudioRecorder.start: microphoneFlag = ', aMicrophoneFlag);
                    if ( !aMicrophoneFlag ) {
                        // TODO: diese Fehlermeldung sollte nicht notwendig sein, ist erst mal ein Workaround
                        this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                        this.error( 'start', 'kein Microphone vorhanden' );
                        // hier muss die ASR sofort beendet werden
                        this._onStop();
                    } else {
                        if ( this.mBreakFlag ) {
                            this._onStop();
                            return;
                        }
                        // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                        // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                        this.mGetUserMedia({ audio: true, video: false }).then((stream: any) => {
                            // console.log(CloudDeviceASR._start: getUserMedia = ', stream);
                            this.mUserMediaStream = stream;
                            const option = {
                                webSocket: aOption.webSocket,
                                userMediaStream: this.mUserMediaStream,
                                language: aOption.language
                            };
                            if ( this.mBreakFlag ) {
                                this._onStop();
                                return;
                            }
                            try {
                                if ( this._startRecorder( option ) !== 0 ) {
                                    this._onError( new Error( 'Fehler bei Recorder Ausfuehrung' ));
                                    this._onStop();
                                }
                            } catch ( aException ) {
                                this.exception( 'start', aException );
                                this._onError( new Error( 'ASR-Exception: Fehler bei ASR Ausfuehrung' ));
                                this._onStop();
                            }
                        }, (aError) => {
                            // console.log('CloudDeviceASR._start: getMediaError', aError);
                            this.error( 'start', 'keine UserMedia erzeugt: ' + aError.message );
                            this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                            // hier muss die ASR sofort beendet werden
                            this._onStop();
                        });
                    }
                });
                return 0;
            } catch ( aException ) {
                this.exception( '_start', aException );
                return -1;
            }
        }
    }


    /**
     * beendet die Aufnahme
     * 
     * @returns Fehlercode 0 oder -1
     */

    stop(): number {
        // console.log('CloudAudioRecorder.stop');
        this.mBreakFlag = true;
        try {
            this._stopRecorder();
            return 0;
        } catch ( aException ) {
            this.exception( 'stop', aException );
            return -1;
        }
    }

}
