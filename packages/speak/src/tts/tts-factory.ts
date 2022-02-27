/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer TTS Version
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// plugin

import { PluginFactory } from '@lingualogic-speech/core';


// tts

import { TTS_TYPE_NAME, TTS_FACTORY_NAME, TTS_DEFAULT_NAME, TTS_GROUP_NAME, TTS_PLUGIN_NAME, TTS_MOCK_NAME, TTS_HTML5_NAME, TTS_AMAZON_NAME, TTS_GOOGLE_NAME, TTS_MICROSOFT_NAME } from './tts-const';
import { ITTS } from './tts.interface';
import { TTSMock } from './tts-mock';
import { TTSHtml5 } from './tts-html5';
import { TTSAmazon } from './tts-amazon';
import { TTSGoogle } from './tts-google';
import { TTSMicrosoft } from './tts-microsoft';
import { TTSGroup } from './tts-group';


// Global API

export class TTSFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'TTSFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return TTS_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return TTS_FACTORY_NAME;
    }


    /**
     * Erzeugt eine TTS zum vorgegebenen TTS-Namen. Wird ein falscher TTS-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPluginName - Instanzen-Name der zu erzeugenden TTS
     * @param aPluginClass - Klassen-Name der zu erzeugenden TTS
     * @param aRegisterFlag - bestimmt, ob TTS im PluginManager registriert wird
     *
     * @return gibt TTS Instanz oder null zurueck
     */

    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): ITTS {
        let tts: ITTS = null;
        switch ( aPluginClass ) {
            case TTS_GROUP_NAME:
                tts = new TTSGroup( this, aPluginName, aRegisterFlag );
                break;
            // Default-TTS
            case TTS_PLUGIN_NAME:
                // durchfallen ist beabsichtigt, da TTSHtml5 als Default-Plugin
                // verwendet wird
            /* typescript-eslint-disable no-fallthrough */                
            case TTS_HTML5_NAME:
                tts = new TTSHtml5( aPluginName, aRegisterFlag );
                break;
            // Amazon-TTS
            case TTS_AMAZON_NAME:
                tts = new TTSAmazon( aPluginName, aRegisterFlag );
                break;
            // Google-TTS
            case TTS_GOOGLE_NAME:
                tts = new TTSGoogle( aPluginName, aRegisterFlag );
                break;
            // Microsoft-TTS
            case TTS_MICROSOFT_NAME:
                tts = new TTSMicrosoft( aPluginName, aRegisterFlag );
                break;
            // Mock-TTS
            case TTS_MOCK_NAME:
                tts = new TTSMock( TTS_MOCK_NAME, aRegisterFlag );
                break;
            // keine TTS erkannt
            default:
                this.error( '_newPlugin', 'keine TTS vorhanden' );
                break;
        }
        return tts;
    }


    /**
     * Kann verschiedene Versionen der TTS
     * zurueckgeben, einschließlich eines TTS-Mocks.
     *
     * @param [aPluginName] - Instanzen-Name der zu erzeugenden TTS-Komponente
     * @param [aPluginClass] - Klassen-Name der zu erzeugenden TTS-Komponente
     * @param [aRegisterFlag] - wenn true, wird Plugin in PluginManager eingetragen
     *
     * @return TTS-Komponente wird zurueckgegeben
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): ITTS {
        const pluginName = aPluginName || TTS_DEFAULT_NAME;
        const pluginClass = aPluginClass || TTS_DEFAULT_NAME;

        // TTS erzeugen

        try {
            return this._newPlugin( pluginName, pluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
