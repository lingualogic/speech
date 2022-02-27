/** @packageDocumentation
 * CloudDeviceConfig-Liste zur Speicherung von Device-Konfigurationen
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module cloud/device
 * @author SB
 */


// error

import { ErrorBase } from '@lingualogic-speech/core';


// cloud

import { ICloudDeviceConfig } from './cloud-device-config.interface';


/**
 * Klasse DeviceList zur Speicherung von Devices
 *
 * @export
 * @class CloudDeviceConfigList
 */

export class CloudDeviceConfigList extends ErrorBase {


    private mConfigList = new Map<string, ICloudDeviceConfig>();
    private mConfigIterator: IterableIterator<ICloudDeviceConfig>;


    /**
     * Creates an instance of ConfigList.
     */

    constructor() {
        super( 'CloudDeviceConfigList' );
        this.mConfigIterator = this.mConfigList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Devices
     *
     * @return {number} size - Anzahl der Devices in der Liste
     */

    getSize(): number {
        return this.mConfigList.size;
    }


    /**
     * Rueckgabe aller vorhandenen Device-Namen
     *
     * @return {Array<string>} Rueckgabe aller Device-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mConfigList.keys());
    }


    /**
     * Eintragen eines Devices
     *
     * @param {string} aDeviceName - Name des Devices
     * @param {ICloudDeviceConfig} aDeviceConfig - Device Konfiguration
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aDeviceName: string, aDeviceConfig: ICloudDeviceConfig ): number {
        try {
            if ( !aDeviceName ) {
                this.error( 'insert', 'kein Devicename uebergeben' );
                return -1;
            }
            if ( !aDeviceConfig ) {
                this.error( 'insert', 'kein DeviceConfig uebergeben' );
                return -1;
            }
            if ( this.mConfigList.has( aDeviceName )) {
                this.error( 'insert', 'DeviceConfig existiert bereits ' + aDeviceName );
                return -1;
            }
            this.mConfigList.set( aDeviceName, aDeviceConfig );
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben einer DeviceConfig
     *
     * @param {string} aDeviceName - Name des Devices
     * @returns {ICloudDeviceConfig} - Device Konfiguration oder null
     */

    find( aDeviceName: string ): ICloudDeviceConfig {
        try {
            return this.mConfigList.get( aDeviceName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erste DeviceConfig der Liste zurueckgeben
     *
     * @return {ICloudDeviceConfig} - Device Konfiguration oder null
     */

    first(): ICloudDeviceConfig {
        try {
            this.mConfigIterator = this.mConfigList.values();
            return this.mConfigIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechstes DeviceConfig der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {ICloudDevice} - Device Instanz oder null
     */

    next(): ICloudDeviceConfig {
        try {
            return this.mConfigIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen einer DeviceConfig aus der Liste
     *
     * @param {string} aDeviceName - Name des Devices
     * @return {number} errorCode(0,-1)
     */

    remove( aDeviceName: string ): number {
        try {
            this.mConfigList.delete( aDeviceName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller DeviceConfigs aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mConfigList.clear();
            return 0;
        } catch ( aException ) {
            this.exception( 'clear', aException );
            return -1;
        }
    }

}
