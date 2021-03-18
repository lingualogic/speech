/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines CloudGooglePorts
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { PortFactory, PortInterface } from '@speech/core';


// cloud-google

import { CLOUDGOOGLE_TYPE_NAME, CLOUDGOOGLE_FACTORY_NAME, CLOUDGOOGLE_DEFAULT_NAME, CLOUDGOOGLE_PORT_NAME, CLOUDGOOGLE_MOCK_NAME } from './cloud-google-const';
import { CloudGoogleMock } from './cloud-google-mock';
import { CloudGooglePort } from './cloud-google-port';


// Global API

export class CloudGoogleFactory extends PortFactory {

    // Konstruktor

    constructor() {
        super( 'CloudGoogleFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return CLOUDGOOGLE_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return CLOUDGOOGLE_FACTORY_NAME;
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
            case CLOUDGOOGLE_DEFAULT_NAME:
            case CLOUDGOOGLE_PORT_NAME:
                port = new CloudGooglePort( aPortName, aRegisterFlag );
                break;
            // Mock-Port
            case CLOUDGOOGLE_MOCK_NAME:
                port = new CloudGoogleMock( CLOUDGOOGLE_MOCK_NAME, aRegisterFlag );
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
        const portName = aPortName || CLOUDGOOGLE_DEFAULT_NAME;
        const portClass = aPortClass || CLOUDGOOGLE_DEFAULT_NAME;

        // Port erzeugen

        try {
            return this._newPort( portName, portClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
