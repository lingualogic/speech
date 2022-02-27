/** @packageDocumentation
 * ICloudPortConfigGroup als Manager fuer alle Port-Konfigurationen.
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// cloud

import { CLOUD_PORTCREATE_FLAG } from './cloud-port-const';
import { CloudBaseConfig } from './../config/cloud-base-config';
import { ICloudPortOption } from './cloud-port-option.interface';
import { ICloudPortGroupOption } from './cloud-port-group-option.interface';
import { CloudPortConfigList } from './cloud-port-config-list';
import { ICloudPortConfigGroup } from './cloud-port-config-group.interface';
import { ICloudPortConfig, CloudPortConfig } from './cloud-port-config';
export { ICloudPortConfigGroup };


/**
 * Definiert die Basisklasse aller ICloudPortGroup
 */

export class CloudPortConfigGroup extends CloudBaseConfig implements ICloudPortConfigGroup {


    // Liste aller eingefuegten Konfigurationen

    protected mConfigList: CloudPortConfigList = null;


    /**
     * Erzeugt eine Instanz von ICloudPortGroup
     *
     * @param aOption - optionale Parameter
     */

    constructor( aConfigClass: string, aOption: ICloudPortGroupOption ) {
        super( aConfigClass || 'CloudPortConfigGroup', aOption );
        // Liste erzeugen
        this.mConfigList = new CloudPortConfigList();
        // erzeugen aller Konfigurationen 
        this._createConfigList( aOption );
    }


    protected _createParameterList(): void {
        this.mParameterList.set( 'portOptionList', { name: 'deviceOptionList', type: 'array', data: [] });
        this.mParameterList.set( 'portCreateFlag', { name: 'deviceCreateFlag', type: 'boolean', data: CLOUD_PORTCREATE_FLAG });
        this.mParameterList.set( 'errorOutputFlag', { name: 'errorOutputFlag', type: 'boolean', data: false });
    }


    /**
     * Hier wird ein neues PortConfig-Objekt erzeugt
     * 
     * @param aOption - PortOptionen fuer das PortConfig-Objekt
     * @returns PortConfig-Objekt
     */

    protected _newPortConfig( aOption: ICloudPortOption ): ICloudPortConfig {
        return new CloudPortConfig( aOption );
    }


    /**
     * Hier werden die Config-Objekte zu den Optionen erzeugt und in die ConfigListe eingetragen
     * @param aPortGroupOption - alle Optionen fuer alle Ports eines Ports
     */

    protected _createConfigList( aPortGroupOption: ICloudPortGroupOption ): number {
        // console.log('_createConfigList: start');
        if ( !aPortGroupOption ) {
            // this.error( '_createConfigList', 'keine PortGroup-Optionen uebergeben' );
            return -1;
        }

        if ( !aPortGroupOption.portOptionList ) {
            // this.error( '_createConfigList', 'keine PortOption-Liste vorhanden' );
            return -1;
        }

        // alle Optionen auslesen

        try {
            let config: ICloudPortConfig = null;
            let result = 0;
            for ( const option of aPortGroupOption.portOptionList ) {
                // console.log('CloudPortConfigGroup._CreateConfigList: option = ', option);
                if ( typeof option.portName === 'string' && option.portName ) {
                    config = this._newPortConfig( option );
                    // console.log('CloudportConfigGgroup._createConfigList:', config);
                    if ( config ) {
                        this.mConfigList.insert( option.portName, config );
                    } else {
                        // this.error( '_createConfigList', 'keine PortConfig erzeugt' );
                        result = -1;
                    }
                } else {
                    // this.error( '_createConfigList', 'kein PortName vorhanden' );
                    result = -1;
                }
            }
            // console.log('_createConfigList: end', result);
            return result;
        } catch ( aException ) {
            // this.exception( '_createConfigList', aException );
            // console.log('_createConfigList: end Exception ', -1);
            return -1;
        }
    }


    /**
     * erste Port-Konfiguration zurueckgeben
     * 
     * @returns Port-Konfiguration oder null
     */

    firstPortConfig(): ICloudPortConfig {
        const config = this.mConfigList.first();
        if ( !config ) {
            return null;
        }
        return config;
    }


    /**
     * naechste Port-Konfiguration zurueckgeben
     * 
     * @returns Port-Konfiguration oder null
     */

    nextPortConfig(): ICloudPortConfig {
        const config = this.mConfigList.next();
        if ( !config ) {
            return null;
        }
        return config;
    }


    /**
     * Konfiguration fuer ein Port zurueckgeben
     * 
     * @param aPortName - Name des Ports, dessen Konfiguration geholt werden soll
     * @returns Port-Konfiguration
     */

    findPortConfig( aPortName: string ): ICloudPortConfig {
        const config = this.mConfigList.find( aPortName );
        if ( !config ) {
            return null;
        }
        return config;
    }

    
    /**
     * PortNamen-Liste zurueckgeben
     * @returns Namensliste aller vorhandenen Port-Konfigurationen
     */
    
    getPortNameList(): string[] {
        return this.mConfigList.getNameList();
    }


    // Konfigurations-Funktionen


    set portCreateFlag( aCreateFlag: boolean ) {
        this.setBoolean( 'portCreateFlag', aCreateFlag );
    }

    get portCreateFlag() {
        return this.getBoolean( 'portCreateFlag' );
    }

    set errorOutputFlag( aErrorOutputFlag: boolean ) {
        this.setBoolean( 'errorOutputFlag', aErrorOutputFlag );
    }

    get errorOutputFlag() {
        return this.getBoolean( 'errorOutputFlag' );
    }

}
