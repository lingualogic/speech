/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines CloudPorts
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// core

import { PortFactory, IPort } from '@lingualogic-speech/core';


// cloud

import { CLOUD_TYPE_NAME, CLOUD_FACTORY_NAME, CLOUD_DEFAULT_NAME, CLOUD_PORT_NAME, CLOUD_MOCK_NAME } from './cloud-port-const';
import { CloudPortMock } from './cloud-port-mock';
import { CloudPort } from './cloud-port';


// Global API

export class CloudPortFactory extends PortFactory {

    // Konstruktor

    constructor( aFactoryName?: string ) {
        super( aFactoryName || 'CloudPortFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return CLOUD_TYPE_NAME;
    }


    /**
     * Hier werden abgeleitete Devices zurueckgegeben
     * 
     * @param aDeviceClass - Klasse des Devices
     * @param aConfig - Device-Konfiguration
     * @returns Device oder null
     */

     protected _newCustomPort( aPortName: string, aPortClass: string, aRegisterFlag: boolean ): IPort {
        // muss von erbenden Klassen ueberschireben werden
        return null;
    }


    /**
     * Erzeugt einen Port zum vorgegebenen Port-Namen. Wird ein falscher Port-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPortName - Name des zu erzeugenden Ports
     * @param aRegisterFlag - bestimmt, ob Port im PortManager registriert wird
     *
     * @return {IPort} gibt Port Instanz oder null zurueck
     */

    protected _newPort( aPortName: string, aPortClass: string, aRegisterFlag: boolean ): IPort {
        let port: IPort = null;
        switch ( aPortClass ) {
            case CLOUD_DEFAULT_NAME:
            case CLOUD_PORT_NAME:
                port = new CloudPort( aPortName, aRegisterFlag );
                break;
            // Mock-Port
            case CLOUD_MOCK_NAME:
                port = new CloudPortMock( CLOUD_MOCK_NAME, aRegisterFlag );
                break;
            // keinen Port erkannt
            default:
                try {
                    port = this._newCustomPort( aPortName, aPortClass, aRegisterFlag );
                } catch ( aException ) {
                    this.exception( '_newPort', aException );
                }
                if ( !port ) {
                    this.error( '_newPort', 'kein Port vorhanden' );
                }
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
     * @return {IPort} Port Instanz wird zurueckgegeben
     */

    create( aPortName?: string, aPortClass = '', aRegisterFlag = true ): IPort {
        const portName = aPortName || CLOUD_DEFAULT_NAME;
        const portClass = aPortClass || CLOUD_DEFAULT_NAME;

        // Port erzeugen

        try {
            return this._newPort( portName, portClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }

    }

}
