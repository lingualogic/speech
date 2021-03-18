/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines CloudRasaPorts
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// core

import { PortFactory, PortInterface } from '@speech/core';


// cloud-rasa

import { CLOUDRASA_TYPE_NAME, CLOUDRASA_FACTORY_NAME, CLOUDRASA_DEFAULT_NAME, CLOUDRASA_PORT_NAME, CLOUDRASA_MOCK_NAME } from './cloud-rasa-const';
import { CloudRasaMock } from './cloud-rasa-mock';
import { CloudRasaPort } from './cloud-rasa-port';


// Global API

export class CloudRasaFactory extends PortFactory {

    // Konstruktor

    constructor() {
        super( 'CloudRasaFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return CLOUDRASA_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return CLOUDRASA_FACTORY_NAME;
    }


    /**
     * Erzeugt einen Port zum vorgegebenen Port-Namen. Wird ein falscher Port-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPortName - Name des zu erzeugenden Ports
     * @param aRegisterFlag - bestimmt, ob Port im PortManager registriert wird
     *
     * @return {PortInterface} gibt Port Instanz oder null zurueck
     */

    protected _newPort( aPortName: string, aPortClass: string, aRegisterFlag: boolean ): PortInterface {
        let port: PortInterface = null;
        switch ( aPortName ) {
            case CLOUDRASA_DEFAULT_NAME:
            case CLOUDRASA_PORT_NAME:
                port = new CloudRasaPort( aPortName, aRegisterFlag );
                break;
            // Mock-Port
            case CLOUDRASA_MOCK_NAME:
                port = new CloudRasaMock( CLOUDRASA_MOCK_NAME, aRegisterFlag );
                break;
            // keinen Port erkannt
            default:
                this.error( '_newPort', 'kein Port vorhanden' );
                break;
        }
        return port;
    }


    /**
     * Kann verschiedene Versionen des Ports
     * zurueckgeben, einschließlich eines Port-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Ports
     * @param {boolean} aRegisterFlag - wenn true, wird Port in PortManager eingetragen
     *
     * @return {PortInterface} Port Instanz wird zurueckgegeben
     */

    create( aPortName?: string, aPortClass = '', aRegisterFlag = true ): PortInterface {
        const portName = aPortName || CLOUDRASA_DEFAULT_NAME;
        const portClass = aPortClass || CLOUDRASA_DEFAULT_NAME;

        // Port erzeugen

        try {
            return this._newPort( portName, portClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
