/** @packageDocumentation
 * CloudDevice-Liste zur Speicherung von Devices
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

import { ICloudDevice } from './cloud-device.interface';


/**
 * Klasse DeviceList zur Speicherung von Devices
 *
 * @export
 * @class CloudDeviceList
 */

export class CloudDeviceList extends ErrorBase {

    private mDeviceList = new Map<string, ICloudDevice>();
    private mDeviceIterator: IterableIterator<ICloudDevice>;


    /**
     * Creates an instance of DeviceList.
     */

    constructor() {
        super( 'CloudDeviceList' );
        this.mDeviceIterator = this.mDeviceList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Devices
     *
     * @return {number} size - Anzahl der Devices in der Liste
     */

    getSize(): number {
        return this.mDeviceList.size;
    }


    /**
     * Rueckgabe aller vorhandenen Device-Namen
     *
     * @return {Array<string>} Rueckgabe aller Device-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mDeviceList.keys());
    }


    /**
     * Eintragen eines Devices
     *
     * @param {string} aDeviceName - Name des Devices
     * @param {ICloudDevice} aDevice - Device Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aDeviceName: string, aDevice: ICloudDevice ): number {
        try {
            if ( !aDeviceName ) {
                this.error( 'insert', 'kein Devicename uebergeben' );
                return -1;
            }
            if ( !aDevice ) {
                this.error( 'insert', 'kein Device uebergeben' );
                return -1;
            }
            if ( this.mDeviceList.has( aDeviceName )) {
                this.error( 'insert', 'Device existiert bereits ' + aDeviceName );
                return -1;
            }
            this.mDeviceList.set( aDeviceName, aDevice );
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Devices
     *
     * @param {string} aDeviceName - Name des Devices
     * @returns {ICloudDevice} - Device Instanz oder null
     */

    find( aDeviceName: string ): ICloudDevice {
        try {
            return this.mDeviceList.get( aDeviceName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erstes Device der Liste zurueckgeben
     *
     * @return {ICloudDevice} - Device Instanz oder null
     */

    first(): ICloudDevice {
        try {
            this.mDeviceIterator = this.mDeviceList.values();
            return this.mDeviceIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }

    }


    /**
     * naechstes Device der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {ICloudDevice} - Device Instanz oder null
     */

    next(): ICloudDevice {
        try {
            return this.mDeviceIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eines Devices aus der Liste
     *
     * @param {string} aDeviceName - Name des Devices
     * @return {number} errorCode(0,-1)
     */

    remove( aDeviceName: string ): number {
        try {
            this.mDeviceList.delete( aDeviceName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller Devices aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mDeviceList.clear();
            return 0;
        } catch ( aException ) {
            this.exception( 'clear', aException );
            return -1;
        }
    }

}
