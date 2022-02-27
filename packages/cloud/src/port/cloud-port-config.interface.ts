/** @packageDocumentation
 * Cloud-Port Konfiguration Verwaltung API
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// cloud

import { ICloudDeviceConfigGroup } from '../device/cloud-device-config-group.interface';


export interface ICloudPortConfig extends ICloudDeviceConfigGroup {


    // Attribute

    portName: string;
    portClass: string;
    serverFlag: boolean; 
    serverUrl: string;
    tokenServerUrl: string;
    projectId: string;
    sessionId: string;
    environmentName: string;
    dynamicCredentialsFlag: boolean;
    appId: string;
    appKey: string;
    userId: string;

}
