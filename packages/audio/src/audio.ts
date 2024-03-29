/** @packageDocumentation
 * Dialog API Wrapper fuer AudioComponent (erst mal AudioPlayer)
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module audio
 * @author SB
 */


// core

import { OnSpeechInitFunc, OnSpeechErrorFunc, FactoryManager, PluginManager } from '@lingualogic-speech/core';


// Audio

import { AUDIO_API_VERSION } from './audio-version';
import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT } from './audio-const';
import { OnAudioStartFunc, OnAudioStopFunc, OnAudioUnlockFunc } from './audio-function.type';
import { IAudio } from './audio.interface';
import { IAudioPlayer } from './player/audio-player.interface';
import { AudioPlayerFactory } from './player/audio-player-factory';


/** @export
 * Audio Klasse als API-Wrapper fuer die AudioComponent
 */

export class Audio implements IAudio {

    // interne Komponenten

    mAudioPlayer: IAudioPlayer = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Bots
     */

    constructor( aOption?: any ) {
        if ( this._init( aOption ) !== 0 ) {
            throw new Error('Audio nicht initialisiert');
        }
    }


    /**
     * Initialisierung des Bots
     *
     * @private
     * @param {any} aOption - optionale Parameter zur Konfiguration
     *
     * @return {number} errorCode(0,-1)
     */

    _init( aOption?: any ): number {
        if ( this.mAudioPlayer ) {
            return 0;
        }

        try {
            // erzeugen der Bot-Komponente

            const audioPlayerFactory = FactoryManager.get( AUDIOPLAYER_FACTORY_NAME, AudioPlayerFactory );
            this.mAudioPlayer = PluginManager.get( AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_PLUGIN_NAME, audioPlayerFactory ) as IAudioPlayer;
            if ( !this.mAudioPlayer ) {
                console.log('Audio._init: kein AudioPlayer erzeugt');
                return -1;
            }

            // AudioPlayer initialisieren

            if ( !this.mAudioPlayer.isInit()) {
                if ( this.mAudioPlayer.init( aOption ) !== 0 ) {
                    console.log('Audio._init: AudioPlayer nicht initialisiert');
                    return -1;
                }
            }

            return 0;
        } catch ( aException ) {
            console.log('Audio._init: Exception ', aException.message);
            return -1;
        }
    }


    // Komponenten-Funktionen


    getVersion(): string {
        return AUDIO_API_VERSION;
    }


    isErrorOutput(): boolean {
        return this.mAudioPlayer.isErrorOutput();
    }


    setErrorOutputOn(): void {
        this.mAudioPlayer.setErrorOutputOn();
    }


    setErrorOutputOff(): void {
        this.mAudioPlayer.setErrorOutputOff();
    }


    // Event-Funktionen


    addInitEvent( aPluginName: string, aEventFunc: OnSpeechInitFunc ): number {
        return 0;
    }

    addPlayerStartEvent( aPluginName: string, aEventFunc: OnAudioStartFunc ): number {
        this.mAudioPlayer.onAudioStart = aEventFunc;
        return 0;
    }

    addPlayerStopEvent( aPluginName: string, aEventFunc: OnAudioStopFunc ): number {
        this.mAudioPlayer.onAudioStop = aEventFunc;
        return 0;
    }

    addUnlockEvent( aPluginName: string, aEventFunc: OnAudioUnlockFunc ): number {
        this.mAudioPlayer.onAudioUnlock = aEventFunc;
        return 0;
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        this.mAudioPlayer.onError = aEventFunc;
        return 0;
    }


    removeInitEvent( aPluginName: string ): number {
        return 0;
    }

    removePlayerStartEvent( aPluginName: string ): number {
        return 0;
    }

    removePlayerStopEvent( aPluginName: string ): number {
        return 0;
    }

    removeUnlockEvent( aPluginName: string ): number {
        return 0;
    }

    removeErrorEvent( aPluginName: string ): number {
        return 0;
    }

    removeAllEvent( aPluginName: string ): number {
        return 0;
    }


    // Audio-Funktionen


    unlockAudio(): void {
        return this.mAudioPlayer.unlockAudio();
    }


    isUnlockAudio(): boolean {
        return this.mAudioPlayer.isUnlockAudio();
    }


    getAudioFormatList(): string[] {
        return [ AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT ];
    }


    setAudioFormat( aAudioFormat: string): number {
        return this.mAudioPlayer.setAudioFormat( aAudioFormat );
    }


    getAudioFormat(): string {
        return this.mAudioPlayer.getAudioFormat();
    }


    // Player-Funktionen


    play( aDataPath: string, aName: string ): number {
        return this.mAudioPlayer.play( aDataPath, aName );
    }

    playFile( aFileName: string ): number {
        return this.mAudioPlayer.playFile( aFileName );
    }

    /**
     * Abspielen von Audiodaten
     *
     * @param aAudioData - Base64 String fuer Audiodaten
     */

    playData( aAudioData: string ): number {
        return this.mAudioPlayer.playPcmData( atob( aAudioData ));
    }

    stopPlay(): number {
        return this.mAudioPlayer.stop();
    }


    // @deprecated
    stop(): number {
        return this.mAudioPlayer.stop();
    }

}
