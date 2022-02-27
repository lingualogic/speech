/** @packageDocumentation
 * AudioPlayer Schnittstelle
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module audio/player
 * @author SB
 */


// core

import { IPlugin } from '@lingualogic-speech/core';


// Funktionen

export type AudioPlayFunc = (aAudioFilePath: string, aAudioId: string) => number;
export type AudioStopFunc = () => number;


// Events

export type OnAudioStartFunc = () => number;
export type OnAudioStopFunc = () => number;
export type OnAudioUnlockFunc = (aState: string) => number;

export interface IAudioPlayer extends IPlugin {

    // Events

    onAudioStart: OnAudioStartFunc;
    onAudioStop: OnAudioStopFunc;
    onAudioUnlock: OnAudioUnlockFunc;


    // Audio-Funktionen

    getAudioContext(): AudioContext;
    unlockAudio(): void;
    isUnlockAudio(): boolean;

    setAudioFormat( aAudioFormat: string ): number;
    getAudioFormat(): string;

    // Player-Funktionen

    isLoad(): boolean;
    isPlay(): boolean;
    isCancel(): boolean;

    playPcmData( aAudioData: any ): number;
    play( aAudioFilePath: string, aAudioId: string ): number;
    playFile( aFileName: string ): number;
    stop(): number;

    // Binding-Funktionen

    getPlayFunc(): AudioPlayFunc;
    getStopFunc(): AudioStopFunc;

}
