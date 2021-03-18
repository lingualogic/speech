/** @packageDocumentation
 * PortFactory-Interface fuer die Erzeugung von Port-Komponenten
 *
 * Letzte Aenderung: 16.10.2020
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// factory

import { FactoryInterface } from './../factory/factory.interface';


// port

import { PortInterface } from './port.interface';



/**
 * Erzeugt einen neuen Port
 *
 * @export
 * @interface PortFactoryInterface
 */

export interface PortFactoryInterface extends FactoryInterface {


    /**
     * Erzeugt eine neue Port-Komponente zum uebergebenen Port Namen
     *
     * @param [aPortName] - Instanz-Name des zu erzeugenden Ports
     * @param [aPortClass] - Klassen-Name des zu erzeugenden Ports
     * @param [aRegisterFlag] - true, wenn Port global im PortManager eingetragen werden soll
     *
     * @return Port Instanz oder null
     */

    create( aPortName?: string, aPortClass?: string, aRegisterFlag?: boolean ): PortInterface;
}
