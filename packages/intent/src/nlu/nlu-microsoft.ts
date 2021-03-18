/** @packageDocumentation
 * Diese Komponente dient der Spracherkennung mit Hilfe von Microsoft-NLU
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// cloud

import { CLOUD_MICROSOFT_PORT, CLOUD_NLU_ACTION } from '@speech/cloud';


// nlu

import { NLU_MICROSOFT_NAME } from './nlu-const';
import { NLUPort } from './nlu-port';


/**
 * Diese Klasse kapselt die Microsoft Texteingabe
 */

export class NLUMicrosoft extends NLUPort {


    /**
     * NLUMicrosoft Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( CLOUD_MICROSOFT_PORT, aPluginName || NLU_MICROSOFT_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUMicrosoft';
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
        return 0;
    }


    // Text-Funktionen


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isListen(): boolean {
        return false;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // console.log('NLUNuance._getRecognitionResult:', aEvent);
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
        // console.log('NLUMicrosoft._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            conceptList: [],
            literal: '',
            speech: '',
            error: ''
        };
        try {
            // Mapping der Daten auf IntentData
            intentData.intent = aEvent.topScoringIntent.intent;
            intentData.confidence = aEvent.topScoringIntent.score;
            // Konzepte kopieren, wenn vorhanden
            if ( aEvent.entities ) {
                // console.log('NluMicrosoft._getRecognitionIntentResult:', aEvent.entities);
                for ( const entity of aEvent.entities ) {
                    const concept = { concept: entity.type, value: entity.entity, literal: entity.entity, confidence: entity.score };
                    // console.log('NluMicrosoft._getRecognitionIntentResult: concept = ', concept);
                    intentData.conceptList.push( concept );
                }
            }
            intentData.literal = aEvent.query;
            // intentData.speech = aEvent.fulfillment.speech;
        } catch ( aException ) {
            this.exception( '_getRecognitionIntentResult', aException );
            intentData.error = 'Exception:' + aException.message;
        }
        return intentData;
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    protected _startRecognition(): number {
        return -1;
    }

}
