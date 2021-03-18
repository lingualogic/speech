/** @packageDocumentation
 * Hier wird die Nuance-Spracherkennung implementiert. Ist NuancePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 25.07.2020
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// cloud

import { CLOUD_NUANCE_PORT } from '@speech/cloud';


// asr

import { ASR_NUANCE_NAME } from './asr-const';
import { ASRPort } from './asr-port';


/**
 * Die ASRNUance Klasse kapselt die Nuance-ASR
 */

export class ASRNuance extends ASRPort {


    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_NUANCE_PORT, aPluginName || ASR_NUANCE_NAME, aRegisterFlag );
        // TODO: muss wegben unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mListenLanguage = 'deu-DEU';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRNuance';
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
                this.mListenLanguage = 'deu-DEU';
                break;

            case 'en':
                this.mListenLanguage = 'eng-USA';
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
     * @return {string} Rueckgabe des Sprachcodes (de, en)
     */

    getLanguage(): string {
        let language = '';
        switch ( this.mListenLanguage ) {
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


    // Recognition-Funktionen


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // console.log('ARSNuance._getRecognitionResult:', aEvent);
        return aEvent[0];
    }

}
