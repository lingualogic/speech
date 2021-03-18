/** @packageDocumentation
 * Hier wird die Nuance-Sprachausgabe implementiert. Ist NuancePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// cloud

import { CLOUD_NUANCE_PORT } from '@speech/cloud';

// tts

import { TTS_NUANCE_NAME } from './tts-const';
import { TTSPort } from './tts-port';


/**
 * Die TTSNUance Klasse kapselt die Nuance-TTS
 */

export class TTSNuance extends TTSPort {


    /**
     * TTSNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_NUANCE_PORT, aPluginName || TTS_NUANCE_NAME, aRegisterFlag );
        // TODO: muss wegben unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mSpeakLanguage = 'deu-DEU';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSNuance';
    }


    // Language-Funktionen


    /**
     * Traegt eine neue Sprache ein
     *
     * @param {string} aLanguage - de oder en
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        let result = 0;
        switch ( aLanguage ) {
            case 'de':
                this.mSpeakLanguage = 'deu-DEU';
                break;

            case 'en':
                this.mSpeakLanguage = 'eng-USA';
                break;

            default:
                this.error( 'setLanguage', 'keine gueltige Sprache uebergeben' );
                result = -1;
                break;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        let language = '';
        switch ( this.mSpeakLanguage ) {
            case 'deu-DEU':
                language = 'de';
                break;

            case 'eng-USA':
                language = 'en';
                break;

            default:
                // TODO: Eventuell muss hier language='' wegen Rollup-Problem hin
                language = '';
                break;
        }
        return language;
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
            return [ 'Anna-ML', 'Petra-ML', 'Markus', 'Yannick' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'Allison', 'Ava', 'Samantha', 'Susan', 'Zoe', 'Tom' ];
        }
        return [];
    }

}
