/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer ASR
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// asr

import {
    ASR_FACTORY_NAME,
    ASR_TYPE_NAME,
    ASR_DEFAULT_NAME,
    ASR_PLUGIN_NAME,
    ASR_HTML5_NAME,
    ASR_NUANCE_NAME,
    ASR_GOOGLE_NAME,
    ASR_MICROSOFT_NAME,
    ASR_MOCK_NAME,
    ASR_GROUP_NAME } from './asr-const';
import { ASRInterface } from './asr.interface';
import { ASRMock } from './asr-mock';
import { ASRHtml5 } from './asr-html5';
import { ASRNuance } from './asr-nuance';
import { ASRGoogle } from './asr-google';
import { ASRMicrosoft } from './asr-microsoft';
import { ASRGroup } from './asr-group';


// Global API

export class ASRFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ASRFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der ASR-Fabrik zurueck
     */

    getType(): string {
        return ASR_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return ASR_FACTORY_NAME;
    }


    /**
     * Erzeugt eine ASR zum vorgegebenen ASR-Namen. Wird ein falscher ASR-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPluginName - Instanzen-Name der zu erzeugenden ASR
     * @param aPluginClass - Klassen-Name der zu erzeugenden ASR
     * @param aRegisterFlag - bestimmt, ob ASR im PluginManager registriert wird
     *
     * @return gibt ASR Instanz oder null zurueck
     */

    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ASRInterface {
        let asr: ASRInterface = null;
        switch ( aPluginClass ) {
            case ASR_GROUP_NAME:
                asr = new ASRGroup( this, aPluginName, aRegisterFlag );
                break;
            // Default-ASR
            case ASR_PLUGIN_NAME:
                // durchfallen ist beabsichtigt, da ASRHtml5 als Default-Plugin
                // verwendet wird
            case ASR_HTML5_NAME:
                asr = new ASRHtml5( aPluginName, aRegisterFlag );
                break;
            // Nuance-ASR
            case ASR_NUANCE_NAME:
                asr = new ASRNuance( aPluginName, aRegisterFlag );
                break;
            // Google-ASR
            case ASR_GOOGLE_NAME:
                asr = new ASRGoogle( aPluginName, aRegisterFlag );
                break;
            // Microsoft-ASR
            case ASR_MICROSOFT_NAME:
                asr = new ASRMicrosoft( aPluginName, aRegisterFlag );
                break;
            // Mock-ASR
            case ASR_MOCK_NAME:
                asr = new ASRMock( ASR_MOCK_NAME, aRegisterFlag );
                break;
            // keine ASR erkannt
            default:
                this.error( '_newPlugin', 'keine ASR vorhanden' );
                break;
        }
        return asr;
    }


    /**
     * Kann verschiedene Versionen der ASR
     * zurueckgeben, einschließlich eines ASR-Mocks.
     *
     * @param [aPluginName] - Instanzen-Name der zu erzeugenden ASR
     * @param [aPluginClass] - Klassen-Name der zu erzeugenden ASR
     * @param [aRegisterFlag] - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {ASRInterface} gibt eine ASR Instanz oder null zurueck
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): ASRInterface {
        const pluginName = aPluginName || ASR_DEFAULT_NAME;
        const pluginClass = aPluginClass || ASR_DEFAULT_NAME;

        // ASR erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
