/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines CloudMicrosoftPorts
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// core

import { PortFactory, PortInterface } from '@speech/core';


// cloud-microsoft

import { CLOUDMICROSOFT_TYPE_NAME, CLOUDMICROSOFT_FACTORY_NAME, CLOUDMICROSOFT_DEFAULT_NAME, CLOUDMICROSOFT_PORT_NAME, CLOUDMICROSOFT_MOCK_NAME } from './cloud-microsoft-const';
import { CloudMicrosoftMock } from './cloud-microsoft-mock';
import { CloudMicrosoftPort } from './cloud-microsoft-port';


// Global API

export class CloudMicrosoftFactory extends PortFactory {

    // Konstruktor

    constructor() {
        super( 'CloudMicrosoftFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return CLOUDMICROSOFT_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return CLOUDMICROSOFT_FACTORY_NAME;
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
        switch ( aPortClass ) {
            case CLOUDMICROSOFT_DEFAULT_NAME:
            case CLOUDMICROSOFT_PORT_NAME:
                port = new CloudMicrosoftPort( aPortName, aRegisterFlag );
                break;
            // Mock-Port
            case CLOUDMICROSOFT_MOCK_NAME:
                port = new CloudMicrosoftMock( CLOUDMICROSOFT_MOCK_NAME, aRegisterFlag );
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
        const portName = aPortName || CLOUDMICROSOFT_DEFAULT_NAME;
        const portClass = aPortClass || CLOUDMICROSOFT_DEFAULT_NAME;

        // Port erzeugen

        try {
            return this._newPort( portName, portClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
