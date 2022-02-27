/** @packageDocumentation
 * Cloud Konfiguration Verwaltung
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/config
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// cloud-google

import { ICloudBaseConfig } from './cloud-base-config.interface';
export { ICloudBaseConfig };


interface ICloudConfigData {
    name: string,
    type: string,
    data: any
}


export class CloudBaseConfig extends ErrorBase implements ICloudBaseConfig {

    // Parameter-Map

    protected mParameterList: Map<string, ICloudConfigData>;

    // Optiondaten

    private mOption: any = null;


    /**
     * Creates an instance of AmazonConfig.
     */

    constructor( aConfigClass: string, aOption: any ) {
        super( aConfigClass || 'CloudBaseConfig' );
        this.mParameterList = new Map<string, ICloudConfigData>();
        this.mOption = aOption;
        this._createParameterList();
        this._setOption( aOption );
    }


    protected _createParameterList(): void {
        // muss von erbenden Klassen ueberschrieben werden
    }


    protected _findParameter( aParamName: string ): ICloudConfigData {
        return this.mParameterList.get( aParamName );
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: any ): number {
        // console.log('CloudPortConfig._setOption: ', aOption);
        if ( !aOption ) {
            return 0;
        }

        // Parameter in Parameterliste eintragen

        this.mParameterList.forEach((aValue: any) => {
            try {
                if ( aOption.hasOwnProperty( aValue.name )) {
                    let param = aOption[ aValue.name ];
                    if ( param && typeof param === aValue.type ) {
                        aValue.data = param;
                        // console.log('CloudBaseConfig._setPortOption:', aValue);
                    }
                }
            } catch ( aException ) {
                console.log('CloudBaseConfig._setPortOption: Exception ', aException);
                this.exception( '_setOption', aException );
            }
        });
        // console.log('CloudBaseConfig._setPortOption:', this.mParameterList);

        return 0;
    }


    /**
     * Rueckgabe der Options
     * @returns DeviceOption
     */

    getOption(): any {
        return this.mOption;
    }
    

    // generische Funktionen zum Zugriff auf Config-Parameter


    isString( aParamName: string ): boolean {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'string' ) {
            return true;
        }
        return false;
    }

    setString( aParamName: string, aValue: string ): void {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'string' ) {
            param.data = aValue;
        }
    }

    getString( aParamName: string ): string {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'string' ) {
            return param.data;
        }
        return '';
    }

    isNumber( aParamName: string ): boolean {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'number' ) {
            return true;
        }
        return false;
    }

    setNumber( aParamName: string, aValue: number ): void {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'number' ) {
            param.data = aValue;
        }
    }

    getNumber( aParamName: string ): number {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'number' ) {
            return param.data;
        }
        return 0;
    }

    isBoolean( aParamName: string ): boolean {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'boolean' ) {
            return true;
        }
        return false;
    }

    setBoolean( aParamName: string, aValue: boolean ): void {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'boolean' ) {
            param.data = aValue;
        }
    }

    getBoolean( aParamName: string ): boolean {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'boolean' ) {
            return param.data;
        }
        return false;
    }

    isObject( aParamName: string, aObjectType: string ):boolean {
        const param = this._findParameter( aParamName );
        if ( param && param.type === aObjectType ) {
            return true;
        }
        return false;
    }

    setObject( aParamName: string, aObjectType: string, aValue: any ): void {
        const param = this._findParameter( aParamName );
        if ( param && param.type === aObjectType ) {
            param.data = aValue;
        }
    }

    getObject( aParamName: string, aObjectType: string ): any {
        const param = this._findParameter( aParamName );
        if ( param && param.type === aObjectType ) {
            return param.data;
        }
        return {};
    }

    isArray( aParamName: string ): boolean {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'array' ) {
            return true;
        }
        return false;
    }

    setArray( aParamName: string, aValue: []): void {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'array' ) {
            param.data = aValue;
        }
    }

    getArray( aParamName: string ): [] {
        const param = this._findParameter( aParamName );
        if ( param && param.type === 'array' ) {
            return param.data;
        }
        return [];
    }

}
