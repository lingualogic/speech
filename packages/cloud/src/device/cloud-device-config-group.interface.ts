/** @packageDocumentation
 * DeviceConfigGroup Schnittstelle
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { ICloudBaseConfig } from './../config/cloud-base-config.interface';
import { ICloudDeviceConfig } from './cloud-device-config.interface';


/**
 * Definiert die Schnittstelle fuer eine DeviceGroup
 */

export interface ICloudDeviceConfigGroup extends ICloudBaseConfig {

    // Attribute
    
    deviceCreateFlag: boolean;
    errorOutputFlag: boolean;

    
    // Config-Funktionen

    firstDeviceConfig(): ICloudDeviceConfig
    nextDeviceConfig(): ICloudDeviceConfig

    findDeviceConfig( aDeviceName: string ): ICloudDeviceConfig;
    
    getDeviceNameList(): string[];
    
}
