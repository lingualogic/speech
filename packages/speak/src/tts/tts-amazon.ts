/** @packageDocumentation
 * Hier wird die Amazon-Sprachausgabe implementiert. Ist AmazonPort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 15.10.2021
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// core

import { CLOUD_AMAZON_PORT } from '@speech/core';


// tts

import { TTS_AMAZON_NAME } from './tts-const';
import { TTSPort} from './tts-port';


/**
 * Die TTSAmazon Klasse kapselt die Amazon-TTS
 */

export class TTSAmazon extends TTSPort {

    /**
     * TTSAmazon Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_AMAZON_PORT, aPluginName || TTS_AMAZON_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSAmazon';
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
            return [ 'Marlene', 'Hans', 'Vicki' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'Ivy', 'Joey', 'Joanna', 'Justin', 'Kendra', 'Matthew', 'Kimberly', 'Salli' ];
        }
        return [];
    }

}
