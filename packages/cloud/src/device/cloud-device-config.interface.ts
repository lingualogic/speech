/** @packageDocumentation
 * Cloud-Device Konfiguration Verwaltung API
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { ICloudBaseConfig } from './../config/cloud-base-config.interface';


export interface ICloudDeviceConfig extends ICloudBaseConfig {

    // Attribute
    
    deviceName: string;
    deviceClass: string;
    deviceType: string;
    serverUrl: string;
    tokenServerUrl: string;
    projectId: string;
    sessionId: string;
    environmentName: string;
    appId: string;
    appKey: string;
    userId: string;
    errorOutputFlag: boolean;

}