/** @packageDocumentation
 * Cloud Konfiguration Verwaltung API
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/config
 * @author SB
 */


// core

import { IErrorBase } from '@lingualogic-speech/core';


export interface ICloudBaseConfig extends IErrorBase {

    getOption(): any;

    // generische Funktionen zum Zugriff auf Config-Parameter

    isString( aParamName: string ): boolean;
    setString( aParamName: string, aValue: string ): void;
    getString( aParamName: string ): string;

    isNumber( aParamName: string ): boolean;
    setNumber( aParamName: string, aValue: number ): void;
    getNumber( aParamName: string ): number;

    isBoolean( aParamName: string ): boolean;
    setBoolean( aParamName: string, aValue: boolean ): void;
    getBoolean( aParamName: string ): boolean;

    isObject( aParamName: string, aObjectType: string ):boolean;
    setObject( aParamName: string, aObjectType: string, aValue: any ): void;
    getObject( aParamName: string, aObjectType: string ): any;

    isArray( aParamName: string ): boolean;
    setArray( aParamName: string, aValue: []): void;
    getArray( aParamName: string ): [];

}
