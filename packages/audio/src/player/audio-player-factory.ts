/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines AudioPlayer
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module audio/player
 * @author SB
 */


// core

import { PluginFactory } from '@lingualogic-speech/core';


// audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_MOCK_NAME } from '../audio-const';
import { IAudioPlayer } from './audio-player.interface';
import { AudioPlayer } from './audio-player';


// Global API

export class AudioPlayerFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'AudioPlayerFactory' );
    }


    isMock(): boolean {
        return false;
    }


    getName(): string {
        return AUDIOPLAYER_FACTORY_NAME;
    }


    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): IAudioPlayer {
        return new AudioPlayer( AUDIOPLAYER_PLUGIN_NAME, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des AudioPlayer
     * zurueckgeben, einschließlich eines AudioPlayer-Mocks.
     *
     * @param aPlayerName - Instanzen-Name der zu erzeugenden AudioPlayer
     * @param aPlayerClass - Klassen-Name des zu erzeugenden AudioPlayer
     * @param aRegisterFlag - wenn gesetzt wird das Plugin im PluginManager eingetragen
     *
     * @return AudioPlayer wird zurueckgegeben
     */

    create( aPlayerName = '', aPlayerClass = '', aRegisterFlag = true ): IAudioPlayer {
        const playerName = aPlayerName || AUDIOPLAYER_PLUGIN_NAME;
        const playerClass = aPlayerClass || AUDIOPLAYER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( playerName === AUDIOPLAYER_MOCK_NAME ) {
            // TODO: Einbau des AudioPlayer-Mocks
            // return new AudioPlayerMock();
        }

        // AudioPlayer erzeugen

        try {
            return this._newPlugin( playerName, playerClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
