/** @packageDocumentation
 * Hier wird die Google-Sprachausgabe implementiert. Ist GooglePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 15.10.2021
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// core

import { CLOUD_GOOGLE_PORT } from '@speech/core';


// tts

import { TTS_GOOGLE_NAME } from './tts-const';
import { TTSPort } from './tts-port';


/**
 * Die TTSGoogle Klasse kapselt die Google-TTS
 */

export class TTSGoogle extends TTSPort {


    /**
     * TTSGoogle Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_GOOGLE_PORT, aPluginName || TTS_GOOGLE_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSGoogle';
    }


    protected _checkErrorMessage( aErrorMessage: string ): void {
        // console.log('TTSGoogle._initSynthesis: errorEvent = ', aError.message);
        // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
        if ( aErrorMessage === 'GoogleTTS2.getAccessTokenFromServer: Failed to fetch' ) {
            this.setActiveOff();
        }
    }


    // Voice-Funktionen


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        // Deutschland
        if ( this.getLanguage() === 'de' ) {
            return [ 'de-DE-Standard-A', 'de-DE-Standard-B', 'de-DE-Wavenet-A', 'de-DE-Wavenet-B', 'de-DE-Wavenet-C', 'de-DE-Wavenet-D' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'en-US-Standard-B', 'en-US-Standard-C', 'en-US-Standard-D', 'en-US-Standard-E', 'en-US-Wavenet-A', 'en-US-Wavenet-B', 'en-US-Wavenet-C', 'en-US-Wavenet-D' ];
        }
        return [];
    }

}
