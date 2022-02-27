/** @packageDocumentation
 * Cloud Konfiguration Verwaltungs API fuer alle CloudPort-Konfigurationen 
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// core

import { IErrorBase } from '@lingualogic-speech/core';


// cloud

import { ICloudOption } from './cloud-option.interface';


export interface ICloudConfig extends IErrorBase {


    // Attribute

    
    configPath: string;
    configFile: string;
    configLoadFlag: boolean;


    // events

    onInit: (aResult: number) => void;
    onResult: (aResult: any) => void;
    onError: (aError: number)  => void;
    

    /**
     * Initialisierung von FileReader
     *
     * @param {ICloudGoogleOption} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: ICloudOption ): number;


    /**
     * Freigabe der Komponente
     */

    done(): number;

    isInit(): boolean;


    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */

    read(): number;
    
}
