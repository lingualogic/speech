/** @packageDocumentation
 * CloudConnectFactory-Interface fuer die Erzeugung von Connects
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// factory

import { IFactory } from '@lingualogic-speech/core';


// cloud

import { ICloudConnect } from './cloud-connect.interface';



/**
 * Erzeugt ein neues Connect
 *
 * @export
 * @interface ICloudConnectFactory
 */

export interface ICloudConnectFactory extends IFactory {


    /**
     * Erzeugt ein neues Connect zum uebergebenen Device Namen
     *
     * @param [aConnectName] - Instanzen-Name des zu erzeugenden Connect
     * @param [aConnectClass] - Klassen-Name des zu erzeugenden Connect
     *
     * @return {ICloudDevice} - Device Instanz oder null
     */

    create( aConnectName?: string, aConnectClass?: string ): ICloudConnect;

}
