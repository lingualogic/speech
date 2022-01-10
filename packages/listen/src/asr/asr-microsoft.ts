/** @packageDocumentation
 * Hier wird die Microsoft-Spracherkennung implementiert. Ist MicrosoftPort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 15.10.2021
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// core

import { CLOUD_MICROSOFT_PORT } from '@speech/core';


// asr

import { ASR_MICROSOFT_NAME } from './asr-const';
import { ASRPort } from './asr-port';


/**
 * Die ASRMicrosoft Klasse kapselt die Microsoft-ASR
 */

export class ASRMicrosoft extends ASRPort {


    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_MICROSOFT_NAME, aRegisterFlag );
        this.setCloudPortName( CLOUD_MICROSOFT_PORT );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRMicrosoft';
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
        // console.log('ARSMicrosoft._getRecognitionResult:', aEvent);
        return aEvent.text;
    }

}
