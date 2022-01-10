/** @packageDocumentation
 * Hier wird die Google-Spracherkennung implementiert. Ist GooglePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 15.10.2021
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// core

import { CLOUD_GOOGLE_PORT } from '@speech/core';


// asr

import { ASR_GOOGLE_NAME } from './asr-const';
import { ASRPort } from './asr-port';


/**
 * Die ASRGoogle Klasse kapselt die Google-ASR
 */

export class ASRGoogle extends ASRPort {


    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_GOOGLE_NAME, aRegisterFlag );
        this.setCloudPortName( CLOUD_GOOGLE_PORT );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRGoogle';
    }


    // Recognition-Funktionen


    protected _checkErrorMessage( aErrorMessage: string ): void {
        // console.log('ASRGoogle._initRecognition: errorEvent = ', aErrorMessage);
        // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
        if ( aErrorMessage === 'GoogleASR2.getAccessTokenFromServer: Failed to fetch' ) {
            this.setActiveOff();
        }
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // console.log('ARSGoogle._getRecognitionResult:', aEvent);
        return aEvent[0].transcript;
    }

}
