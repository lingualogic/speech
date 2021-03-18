/** @packageDocumentation
 * Diese Komponente dient der Spracherkennung mit Hilfe von Google Dialogflow-NLU
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// cloud

import { CLOUD_GOOGLE_PORT, CLOUD_NLU_ACTION, CLOUD_ASRNLU_ACTION } from '@speech/cloud';


// nlu

import { NLU_GOOGLE_NAME } from './nlu-const';
import { NLUPort } from './nlu-port';


/**
 * Diese Klasse kapselt die Google Texteingabe
 */

export class NLUGoogle extends NLUPort {


    /**
     * NLUGoogle Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_GOOGLE_PORT, aPluginName || NLU_GOOGLE_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUGoogle';
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
        // console.log('NLUGoogle._onInternResult:', aResult);
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
        return 0;
    }


    protected _checkErrorMessage( aErrorMessage: string ): void {
        // console.log('NLUGoogle._initRecognition: errorEvent = ', aError.message);
        // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
        if ( aErrorMessage === 'GoogleNLU2.getAccessTokenFromServer: Failed to fetch' ) {
            this.setActiveOff();
        }
    }


    // Text-Funktionen


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // console.log('NLUGoogle._getRecognitionResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        return aEvent;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionIntentResult( aEvent: any ): any {
        // console.log('NLUGoogle._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            conceptList: [],
            literal: '',
            speech: '',
            audioFormat: '',
            audio: '',
            error: ''
        };
        try {
            // pruefen auf Dialogflow-V2
            if ( aEvent.queryResult ) {
                // console.log('NLUGoogle._getRecognitionIntentResult:', aEvent);
                if ( aEvent.queryResult.intent ) {
                    intentData.intent = aEvent.queryResult.intent.displayName;
                }
                intentData.confidence = aEvent.queryResult.intentDetectionConfidence;
                intentData.literal = aEvent.queryResult.queryText;
                intentData.speech = aEvent.queryResult.fulfillmentText;
                if ( aEvent.queryResult.parameters ) {
                    for ( const property in aEvent.queryResult.parameters ) {
                        if ( aEvent.queryResult.parameters.hasOwnProperty( property )) {
                            intentData.conceptList.push({ concept: property, value: aEvent.queryResult.parameters[property], literal: aEvent.queryResult.parameters[property], confidence: 1 });
                        }
                    }
                }
                if ( aEvent.outputAudio ) {
                    intentData.audio = aEvent.outputAudio;
                    intentData.audioFormat = aEvent.outputAudioConfig.audioEncoding;
                }
            } else {
                // Mapping der Daten auf IntentData
                intentData.intent = aEvent.metadata.intentName;
                intentData.confidence = aEvent.score;
                // intentData.confidence = 1.0;
                // Konzepte kopieren, wenn vorhanden
                /**** TODO: Konzepte muessen in Google erst noch ausprobiert werden
                if ( aEvent[0].concepts ) {
                    console.log('NluNuance._getRecognitionIntentResult:', aEvent[0].concepts);
                    for ( let conceptName in aEvent[0].concepts ) {
                        let concept = { concept: conceptName, value: '', literal: ''}
                        console.log('NluNuance._getRecognitionIntentResult: concept = ', conceptName);
                        concept.value = aEvent[0].concepts[conceptName][0].value;
                        concept.literal = aEvent[0].concepts[conceptName][0].literal;
                        intentData.conceptList.push( concept );
                    }
                }
                ****/
                if ( aEvent.parameters ) {
                    for ( const property in aEvent.parameters ) {
                        if ( aEvent.parameters.hasOwnProperty( property )) {
                            intentData.conceptList.push({ concept: property, value: aEvent.parameters[property], literal: aEvent.parameters[property], confidence: 1 });
                        }
                    }
                }
                intentData.literal = aEvent.resolvedQuery;
                intentData.speech = aEvent.fulfillment.speech;
            }
        } catch ( aException ) {
            this.exception( '_getRecognitionIntentResult', aException );
            intentData.error = 'Exception:' + aException.message;
        }
        return intentData;
    }

}
