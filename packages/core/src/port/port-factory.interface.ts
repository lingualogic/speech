/** @packageDocumentation
 * PortFactory-Interface fuer die Erzeugung von Port-Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// factory

import { IFactory } from './../factory/factory.interface';


// port

import { IPort } from './port.interface';



/**
 * Erzeugt einen neuen Port
 *
 * @export
 * @interface IPortFactory
 */

export interface IPortFactory extends IFactory {


    /**
     * Erzeugt eine neue Port-Komponente zum uebergebenen Port Namen
     *
     * @param [aPortName] - Instanz-Name des zu erzeugenden Ports
     * @param [aPortClass] - Klassen-Name des zu erzeugenden Ports
     * @param [aRegisterFlag] - true, wenn Port global im PortManager eingetragen werden soll
     *
     * @return Port Instanz oder null
     */

    create( aPortName?: string, aPortClass?: string, aRegisterFlag?: boolean ): IPort;
}
