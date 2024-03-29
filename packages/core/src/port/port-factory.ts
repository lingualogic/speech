/** @packageDocumentation
 * PortFactory zur Erzeugung von Ports
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// factory

import { Factory } from './../factory/factory';


// port

import { IPortFactory } from './port-factory.interface';
import { IPort } from './port.interface';
import { Port } from './port';


/**
 * Implementiert die Port Fabrik
 *
 * @export
 * @class PortFactory
 * @implements {IPortFactory}
 */

export class PortFactory extends Factory implements IPortFactory {

    /**
     * Creates an instance of PortFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */

    constructor( aFactoryName?: string ) {
        super( aFactoryName || 'PortFactory' );
    }


    getType(): string {
        return 'Port';
    }


    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return 'PortFactory';
    }


    // Port-Funktionen


    protected _newPort( aPortName: string, aPortClass: string, aRegisterFlag: boolean ): IPort {
        return new Port( aPortName, aRegisterFlag );
    }


    /**
     * Erzeugt ein neuen Port
     *
     * @param [aPortName] - Instanzen-Name des Ports
     * @param [aPortClass] - Klassen-Name des Ports
     * @param [aRegisterFlag] - legt fest, ob der Port im PortManager registriert wird
     *
     * @return Instanz des Ports
     */

    create( aPortName = '', aPortClass = '', aRegisterFlag = true ): IPort {
        const portName = aPortName || 'Port';
        const portClass = aPortClass || 'Port';
        try {
            return this._newPort( portName, portClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'PortFactory.create', aException );
            return null;
        }
    }

}
