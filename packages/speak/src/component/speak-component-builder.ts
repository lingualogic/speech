/** @packageDocumentation
 * SpeakComponentBuilder erzeugt die lokale Speak-Komponente
 *
 * Letzte Aenderung: 25.10.2020
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// core

import { Builder, BuilderConfigInterface } from '@speech/core';


// audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AudioPlayerFactory, AudioPlayerInterface } from '@speech/audio';


// tts

import { TTS_FACTORY_NAME, TTS_DEFAULT_NAME } from '../tts/tts-const';
import { TTSFactory } from '../tts/tts-factory';
import { TTSInterface } from '../tts/tts.interface';


// speak

import { SPEAK_COMPONENTBUILDER_NAME, SPEAK_COMPONENTFACTORY_NAME, SPEAK_COMPONENT_NAME, SPEAK_TYPE_NAME } from '../speak-const';
import { SpeakComponentInterface } from './speak-component.interface';
import { SpeakComponentFactory } from './speak-component-factory';


/**
 * Klasse SpeakComponentBuilder zum Erzeugen der Speak-Komponente
 */

export class SpeakComponentBuilder extends Builder {


    /**
     * SpeakBuilder erzeugen
     */

    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || SPEAK_TYPE_NAME, aRegisterFlag );
    }


    getType(): string {
        return SPEAK_TYPE_NAME;
    }


    getClass(): string {
        return 'SpeakComponentBuilder';
    }


    /**
     * Erzeugt Speak-Komponente
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der Speak-Komponente
     */

    build( aConfig?: BuilderConfigInterface ): SpeakComponentInterface {
        // console.log('SpeakComponentBuilder.build: start');
        // pruefen, ob Komponente schon vorhanden ist
        const componentName = this._getComponentName( aConfig ) || SPEAK_COMPONENT_NAME;
        let speak = this._findComponent( componentName ) as SpeakComponentInterface;
        if ( speak ) {
            return speak;
        }
        // neue Komponente erzeugen
        try {
            speak = this._buildComponent( aConfig );
            const tts = this._getPlugin( TTS_DEFAULT_NAME, TTS_DEFAULT_NAME, TTS_FACTORY_NAME, TTSFactory ) as TTSInterface;
            const audioPlayer = this._getPlugin( AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_FACTORY_NAME, AudioPlayerFactory ) as AudioPlayerInterface;
            if ( this._binder( speak, tts, audioPlayer ) !== 0 ) {
                this.error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return speak;
        } catch ( aException ) {
            this.exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Speak-Komponente erzeugt
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der Komponente
     */

    protected _buildComponent( aConfig?: BuilderConfigInterface ): SpeakComponentInterface {
        const componentName = this._getComponentName( aConfig ) || SPEAK_COMPONENT_NAME;
        const componentClass = this._getComponentClass( aConfig ) || SPEAK_COMPONENT_NAME;
        return this._getPlugin( componentName, componentClass, SPEAK_COMPONENTFACTORY_NAME, SpeakComponentFactory ) as SpeakComponentInterface;
    }


    /**
     * Binden der Komponente mit den Plugins
     *
     * @param aSpeak - Speak-Komponente
     * @param aTTS  - TTS-Plugin
     * @param aAudioPlayer - AudioPlayer-Plugin
     * @param aNet - Net-Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    protected _binder( aSpeak: SpeakComponentInterface, aTTS: TTSInterface, aAudioPlayer: AudioPlayerInterface ): number {
        if ( !aSpeak ) {
            this.error( '_binder', 'Keine Speak-Komponente vorhanden' );
            return -1;
        }
        if ( !aTTS ) {
            this.error( '_binder', 'Kein TTS-Plugin vorhanden' );
            return -1;
        }
        if ( !aAudioPlayer ) {
            this.error( '_binder', 'Kein AudioPlayer-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen der Plugins
        if ( aSpeak.insertPlugin( aTTS.getName(), aTTS ) !== 0 ) {
            this.error( '_binder', 'TTS-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        if ( aSpeak.insertPlugin( aAudioPlayer.getName(), aAudioPlayer ) !== 0 ) {
            this.error( '_binder', 'AudioPlayer-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        // Event-Verbindungen zwischen TTS und Speak
        aTTS.onInit = aSpeak.onInit;
        aTTS.onSpeakStart = aSpeak.onStart;
        aTTS.onSpeakStop = aSpeak.onStop;
        aTTS.onError = aSpeak.onError;
        // TODO: Umstellung auf Audio-Komponente, diese kann dann mehrere Instanzen des
        //       AudioPlayers verwalten (analog zu Audio-Kanaelen)
        // Event-Verbindung zwischen Audio und Speak (Problem mit mehrfacher Einbindung!)
        aAudioPlayer.onAudioStart = aSpeak.onStart;
        aAudioPlayer.onAudioStop = aSpeak.onStop;
        aAudioPlayer.onAudioUnlock = aSpeak.onAudioUnlock;
        aAudioPlayer.onError = aSpeak.onError;
        return 0;
    }

}
