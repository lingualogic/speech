/** @packageDocumentation
 * Hier wird die Microsoft-Sprachausgabe implementiert. Ist MicrosoftPort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// core

import { CLOUD_MICROSOFT_PORT } from '@lingualogic-speech/core';


// tts

import { TTS_MICROSOFT_NAME } from './tts-const';
import { TTSPort } from './tts-port';


/**
 * Die TTSMicrosoft Klasse kapselt die Microsoft-TTS
 */

export class TTSMicrosoft extends TTSPort {

    /**
     * TTSMicrosoft Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_MICROSOFT_PORT, aPluginName || TTS_MICROSOFT_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSMicrosoft';
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
            return [ 'de-DE-Hedda', 'de-DE-HeddaRUS', 'de-DE-Stefan-Apollo' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'en-US-BenjaminRUS', 'en-US-JessaRUS', 'en-US-ZiraRUS' ];
        }
        return [];
    }

}
