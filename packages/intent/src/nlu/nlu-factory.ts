/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer NLU
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// nlu

import {
    NLU_FACTORY_NAME,
    NLU_TYPE_NAME,
    NLU_DEFAULT_NAME,
    NLU_GROUP_NAME,
    NLU_PLUGIN_NAME,
    NLU_HTML5_NAME,
    NLU_NUANCE_NAME,
    NLU_GOOGLE_NAME,
    NLU_MICROSOFT_NAME,
    NLU_RASA_NAME,
    NLU_MOCK_NAME
} from './nlu-const';
import { NLUInterface } from './nlu.interface';
import { NLUMock } from './nlu-mock';
import { NLUHtml5 } from './nlu-html5';
import { NLUNuance } from './nlu-nuance';
import { NLUGoogle } from './nlu-google';
import { NLUMicrosoft } from './nlu-microsoft';
import { NLURasa } from './nlu-rasa';
import { NLUGroup } from './nlu-group';


// Global API

export class NLUFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'NLUFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return NLU_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return NLU_FACTORY_NAME;
    }


    /**
     * Erzeugt eine NLU zum vorgegebenen NLU-Namen. Wird ein falscher NLU-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPluginName - Instanzen-Name der zu erzeugenden NLU
     * @param aPluginClass - Klassen-Name der zu erzeugenden NLU
     * @param aRegisterFlag - bestimmt, ob NLU im PluginManager registriert wird
     *
     * @return {NLUInterface} gibt NLU Instanz oder null zurueck
     */

    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): NLUInterface {
        let nlu: NLUInterface = null;
        switch ( aPluginClass ) {
            case NLU_GROUP_NAME:
                nlu = new NLUGroup( this, aPluginName, aRegisterFlag );
                break;
            // Default-NLU
            case NLU_PLUGIN_NAME:
                // durchfallen ist beabsichtigt, da NLUNuance als Default-Plugin
                // verwendet wird
            case NLU_NUANCE_NAME:
                nlu = new NLUNuance( aPluginName, aRegisterFlag );
                break;
            case NLU_GOOGLE_NAME:
                nlu = new NLUGoogle( aPluginName, aRegisterFlag );
                break;
            case NLU_MICROSOFT_NAME:
                nlu = new NLUMicrosoft( aPluginName, aRegisterFlag );
                break;
            case NLU_RASA_NAME:
                nlu = new NLURasa( aPluginName, aRegisterFlag );
                break;
            case NLU_HTML5_NAME:
                nlu = new NLUHtml5( aPluginName, aRegisterFlag );
                break;
            // Mock-NLU
            case NLU_MOCK_NAME:
                nlu = new NLUMock( NLU_MOCK_NAME, aRegisterFlag );
                break;
            // keine NLU erkannt
            default:
                this.error( '_newPlugin', 'keine NLU vorhanden' );
                break;
        }
        return nlu;
    }


    /**
     * Kann verschiedene Versionen der NLU
     * zurueckgeben, einschließlich eines NLU-Mocks.
     *
     * @param [aPluginName] - Instanzen-Name der zu erzeugenden NLU
     * @param [aPluginClass] - Klassen-Name der zu erzeugenden NLU
     * @param [aRegisterFlag] - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return gibt eine NLU Instanz oder null zurueck
     */

    create( aPluginName = '', aPluginClass = '', aRegisterFlag = true ): NLUInterface {
        const nluName = aPluginName || NLU_DEFAULT_NAME;
        const nluClass = aPluginClass || NLU_DEFAULT_NAME;

        // NLU erzeugen

        try {
            return this._newPlugin( nluName, nluClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
