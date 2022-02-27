/** @packageDocumentation
 * PortConfigGroup Schnittstelle
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// cloud

import { ICloudBaseConfig } from './../config/cloud-base-config.interface';
import { ICloudPortConfig } from './cloud-port-config.interface';


/**
 * Definiert die Schnittstelle fuer eine PortGroup
 */

export interface ICloudPortConfigGroup extends ICloudBaseConfig {

    // Attribute
    
    portCreateFlag: boolean;
    errorOutputFlag: boolean;

    // Config-Funktionen

    firstPortConfig(): ICloudPortConfig
    nextPortConfig(): ICloudPortConfig

    findPortConfig( aPortName: string ): ICloudPortConfig;
    
    getPortNameList(): string[];
    
}
