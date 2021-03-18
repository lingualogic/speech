/** @packageDocumentation
 * Diese Komponente dient der Spracherkennung mit Hilfe von Nuance NLU
 * sowohl mit Audio wie auch Text.
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// cloud

import { CLOUD_NUANCE_PORT, CLOUD_NLU_ACTION, CLOUD_ASRNLU_ACTION, CLOUD_ASR_ACTION } from '@speech/cloud';


// nlu

import { NLU_NUANCE_NAME } from './nlu-const';
import { NLUPort } from './nlu-port';


/**
 * Diese Klasse kapselt die Nuance-Sprach oder -Texteingabe
 */

export class NLUNuance extends NLUPort {


    /**
     * NLUNuance Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_NUANCE_PORT, aPluginName || NLU_NUANCE_NAME, aRegisterFlag );
        // TODO: muss wegben unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mListenLanguage = 'deu-DEU';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUNuance';
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
     * Interne Ergebnis-Verarbeitung
     *
     * @param {*} aResult - beliebiges Ergebnis
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _onInternResult( aResult: any ): number {
        // console.log('NLUNuance._onInternResult:', aResult);
        if ( aResult.type === CLOUD_NLU_ACTION ) {
            return this._onRecognitionIntentResult( aResult.data );
        }
        if ( aResult.type === CLOUD_ASRNLU_ACTION ) {
            // Unterscheiden von Transkription als String und Intent als Objekt
            if ( typeof aResult.data[ 0 ] === 'string' ) {
                return this._onRecognitionResult( aResult.data );
            } else {
                return this._onRecognitionIntentResult( aResult.data );
            }
        }
        if ( aResult.type === CLOUD_ASR_ACTION ) {
            return this._onRecognitionResult( aResult.data );
        }
        return 0;
    }


    // Text-Funktionen


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // console.log('NLUNuance._getRecognitionResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        return aEvent[0];
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionIntentResult( aEvent: any ): any {
        // console.log('NLUNuance._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            conceptList: [],
            literal: '',
            error: ''
        };
        try {
            // Mapping der Daten auf IntentData
            intentData.intent = aEvent[0].action.intent.value;
            intentData.confidence = aEvent[0].action.intent.confidence;
            // Konzepte kopieren, wenn vorhanden
            if ( aEvent[ 0 ].concepts ) {
                console.log('NluNuance._getRecognitionIntentResult:', aEvent[0].concepts);
                const concepts = aEvent[ 0 ];
                // tslint:disable-next-line: forin
                for ( const conceptName in concepts ) {
                    const concept = { concept: conceptName, value: '', literal: '', confidence: 1 };
                    console.log('NluNuance._getRecognitionIntentResult: concept = ', conceptName);
                    concept.value = aEvent[0].concepts[conceptName][0].value;
                    concept.literal = aEvent[0].concepts[conceptName][0].literal;
                    intentData.conceptList.push( concept );
                }
            }
            intentData.literal = aEvent[0].literal;
        } catch ( aException ) {
            this.exception( '_getRecognitionIntentResult', aException );
            intentData.error = 'Exception:' + aException.message;
        }
        return intentData;
    }

}
