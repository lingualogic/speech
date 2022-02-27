/** @packageDocumentation
 * Recorder-Anbindung fuer Cloud API
 * 
 * TODO: muss spaeter nach Audio uebertragen werden
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/audio
 * @author SB
 */


// core

import { IErrorBase } from '@lingualogic-speech/core';


export interface ICloudAudioRecorder extends IErrorBase {

    // Event-Funktionen


    onStop: any;
    onError: any;
    onAudioStart: any;
    onAudioStop: any;
    onStreamStart: any;
    onStreamStop: any;
    onStreamData: any;


    // Recorder-Funktionen

   
    clear(): void;


    isRecording(): boolean;

    setStopRecorderFunc( aStopRecorderFunc: any ): void;

    setStopVolumeFunc( aStopVolumeFunc: any ): void;


    /**
     * startet die Aufnahme
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    start( aOption ): number;


    /**
     * beendet die Aufnahme
     * 
     * @returns Fehlercode 0 oder -1
     */

    stop(): number;

}
