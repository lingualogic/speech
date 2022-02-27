/** @packageDocumentation
 * ICloudDeviceConfigGroup als Manager fuer alle Device-Konfigurationen.
 *
 * Letzte Aenderung: 10.11.2021
 * Status: gruen
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { CLOUD_DEVICECREATE_FLAG } from './cloud-device-const';
import { CloudBaseConfig } from './../config/cloud-base-config';
import { ICloudDeviceOption } from './cloud-device-option.interface';
import { ICloudDeviceGroupOption } from './cloud-device-group-option.interface';
import { CloudDeviceConfigList } from './cloud-device-config-list';
import { ICloudDeviceConfigGroup } from './cloud-device-config-group.interface';
import { ICloudDeviceConfig, CloudDeviceConfig } from './cloud-device-config';
export { ICloudDeviceConfigGroup };


/**
 * Definiert die Basisklasse aller ICloudDeviceGroup
 */

export class CloudDeviceConfigGroup extends CloudBaseConfig implements ICloudDeviceConfigGroup {


    // Liste aller eingefuegten Konfigurationen

    protected mConfigList: CloudDeviceConfigList = null;


    /**
     * Erzeugt eine Instanz von ICloudDeviceGroup
     *
     * @param aOption - optionale Parameter
     */

    constructor( aConfigClass: string, aOption: ICloudDeviceGroupOption ) {
        super( aConfigClass || 'CloudDeviceConfigGroup', aOption );
        // Liste erzeugen
        this.mConfigList = new CloudDeviceConfigList();
        // erzeugen aller Konfigurationen 
        this._createConfigList( aOption );
    }


    protected _createParameterList(): void {
        this.mParameterList.set( 'deviceOptionList', { name: 'deviceOptionList', type: 'array', data: [] });
        this.mParameterList.set( 'deviceCreateFlag', { name: 'deviceCreateFlag', type: 'boolean', data: CLOUD_DEVICECREATE_FLAG });
        this.mParameterList.set( 'errorOutputFlag', { name: 'errorOutputFlag', type: 'boolean', data: false });
    }


    /**
     * Hier wird ein neues DeviceConfig-Objekt erzeugt
     * 
     * @param aOption - DeviceOptionen fuer das DeviceConfig-Objekt
     * @returns DeviceConfig-Objekt
     */

    protected _newDeviceConfig( aOption: ICloudDeviceOption ): ICloudDeviceConfig {
        return new CloudDeviceConfig( aOption );
    }


    /**
     * Hier werden die Config-Objekte zu den Optionen erzeugt und in die ConfigListe eingetragen
     * @param aDeviceGroupOption - alle Optionen fuer alle Devices eines Ports
     */

    protected _createConfigList( aDeviceGroupOption: ICloudDeviceGroupOption ): number {
        // console.log('_createConfigList: start');
        if ( !aDeviceGroupOption ) {
            this.error( '_createConfigList', 'keine DeviceGroup-Optionen uebergeben' );
            return -1;
        }

        if ( !aDeviceGroupOption.deviceOptionList ) {
            this.error( '_createConfigList', 'keine DeviceOption-Liste vorhanden' );
            return -1;
        }

        // alle Optionen auslesen

        try {
            let config: ICloudDeviceConfig = null;
            let result = 0;
            for ( const option of aDeviceGroupOption.deviceOptionList ) {
                // console.log('CloudDeviceConfigGroup._CreateConfigList: option = ', option);
                if ( typeof option.deviceName === 'string' && option.deviceName ) {
                    config = this._newDeviceConfig( option );
                    // console.log('ClouddeviceConfigGgroup._createConfigList:', config);
                    if ( config ) {
                        this.mConfigList.insert( option.deviceName, config );
                    } else {
                        this.error( '_createConfigList', 'keine DeviceConfig erzeugt' );
                        result = -1;
                    }
                } else {
                    this.error( '_createConfigList', 'kein DeviceName vorhanden' );
                    result = -1;
                }
            }
            // console.log('_createConfigList: end', result);
            return result;
        } catch ( aException ) {
            this.exception( '_createConfigList', aException );
            // console.log('_createConfigList: end Exception ', -1);
            return -1;
        }
    }


    /**
     * erste Device-Konfiguration zurueckgeben
     * 
     * @returns Device-Konfiguration oder null
     */

    firstDeviceConfig(): ICloudDeviceConfig {
        const config = this.mConfigList.first();
        if ( !config ) {
            return null;
        }
        return config;
    }


    /**
     * naechste Device-Konfiguration zurueckgeben
     * 
     * @returns Device-Konfiguration oder null
     */

    nextDeviceConfig(): ICloudDeviceConfig {
        const config = this.mConfigList.next();
        if ( !config ) {
            return null;
        }
        return config;
    }


    /**
     * Konfiguration fuer ein Device zurueckgeben
     * 
     * @param aDeviceName - Name des Devices, dessen Konfiguration geholt werden soll
     * @returns Device-Konfiguration
     */

    findDeviceConfig( aDeviceName: string ): ICloudDeviceConfig {
        const config = this.mConfigList.find( aDeviceName );
        if ( !config ) {
            return null;
        }
        return config;
    }

    
    /**
     * DeviceNamen-Liste zurueckgeben
     * @returns Namensliste aller vorhandenen Device-Konfigurationen
     */
    
    getDeviceNameList(): string[] {
        return this.mConfigList.getNameList();
    }


    // Konfigurations-Funktionen


    set deviceCreateFlag( aCreateFlag: boolean ) {
        this.setBoolean( 'deviceCreateFlag', aCreateFlag );
    }

    get deviceCreateFlag() {
        return this.getBoolean( 'deviceCreateFlag' );
    }

    set errorOutputFlag( aErrorOutputFlag: boolean ) {
        this.setBoolean( 'errorOutputFlag', aErrorOutputFlag );
    }

    get errorOutputFlag() {
        return this.getBoolean( 'errorOutputFlag' );
    }


}
