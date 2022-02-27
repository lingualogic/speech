/** @packageDocumentation
 * CloudDeviceFactory-Interface fuer die Erzeugung von Devices
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module cloud/device
 * @author SB
 */


// factory

import { IFactory } from '@lingualogic-speech/core';


// cloud

import { ICloudDevice } from './cloud-device.interface';



/**
 * Erzeugt ein neues Device
 *
 * @export
 * @interface ICloudDeviceFactory
 */

export interface ICloudDeviceFactory extends IFactory {


    /**
     * Erzeugt ein neues Device zum uebergebenen Device Namen
     *
     * @param [aDeviceName] - Instanzen-Name des zu erzeugenden Devices
     * @param [aDeviceClass] - Klassen-Name des zu erzeugenden Devices
     *
     * @return {ICloudDevice} - Device Instanz oder null
     */

    create( aDeviceName?: string, aDeviceClass?: string ): ICloudDevice;

}
