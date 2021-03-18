/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines CloudAmazonPorts
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// core

import { PortFactory, PortInterface } from '@speech/core';


// amazon

import { CLOUDAMAZON_TYPE_NAME, CLOUDAMAZON_FACTORY_NAME, CLOUDAMAZON_DEFAULT_NAME, CLOUDAMAZON_PORT_NAME, CLOUDAMAZON_MOCK_NAME } from './cloud-amazon-const';
import { CloudAmazonMock } from './cloud-amazon-mock';
import { CloudAmazonPort } from './cloud-amazon-port';


// Global API

export class CloudAmazonFactory extends PortFactory {

    // Konstruktor

    constructor() {
        super( 'CloudAmazonFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return CLOUDAMAZON_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return CLOUDAMAZON_FACTORY_NAME;
    }


    /**
     * Erzeugt einen Port zum vorgegebenen Port-Namen. Wird ein falscher Port-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPortName - Instanz-Name des zu erzeugenden Ports
     * @üaram aPortClass - Klassen-Name des zu erzeugenden Ports
     * @param aRegisterFlag - bestimmt, ob Port im PortManager registriert wird
     *
     * @return {PortInterface} gibt Port Instanz oder null zurueck
     */

    protected _newPort( aPortName: string, aPortClass: string, aRegisterFlag: boolean ): PortInterface {
        let port: PortInterface = null;
        switch ( aPortClass ) {
            case CLOUDAMAZON_DEFAULT_NAME:
            case CLOUDAMAZON_PORT_NAME:
                port = new CloudAmazonPort( aPortName, aRegisterFlag );
                break;
            // Mock-Port
            case CLOUDAMAZON_MOCK_NAME:
                port = new CloudAmazonMock( CLOUDAMAZON_MOCK_NAME, aRegisterFlag );
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
        const portName = aPortName || CLOUDAMAZON_DEFAULT_NAME;
        const portClass = aPortClass || CLOUDAMAZON_DEFAULT_NAME;

        // Port erzeugen

        try {
            return this._newPort( portName, portClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
