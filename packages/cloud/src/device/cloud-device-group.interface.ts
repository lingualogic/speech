/** @packageDocumentation
 * DeviceGroup Schnittstelle
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// core

import { IErrorBase } from '@lingualogic-speech/core'


// cloud 

import { ICloudDevice, OnCloudDeviceFunc } from './cloud-device.interface';


/**
 * Definiert die Schnittstelle fuer eine DeviceGroup
 */

export interface ICloudDeviceGroup extends IErrorBase {

    // Event-Funktionen

    onStart: OnCloudDeviceFunc;
    onStop: OnCloudDeviceFunc;
    onStartAudio: OnCloudDeviceFunc;
    onStopAudio: OnCloudDeviceFunc;
    onResult: OnCloudDeviceFunc;
    onError: OnCloudDeviceFunc;
    onClose: OnCloudDeviceFunc;


    // Group-Funktionen

    init( aOption?: any ): number;
    isInit(): boolean;
    done(): number

    getClassName(): string;

    getType(): string;

    getName(): string;


    // Token-Funktionen


    clearToken(): number;

    getToken( aDeviceType: string ): string;


    // Device-Funktionen

    
    insertDevice( aDeviceType: string, aDeviceName: string ): number;
    removeDevice( aDeviceType: string ): number;
    removeAllDevice(): number;

    findDevice( aDeviceType: string ): ICloudDevice;
    firstDevice(): ICloudDevice;
    nextDevice(): ICloudDevice;

    getDeviceTypeList(): Array<string>

    isCurrentDevice(): boolean;
    setCurrentDevice( aDeviceType: string ): number;
    getCurrentDevice(): ICloudDevice;
    getCurrentDeviceType(): string;
    getCurrentDeviceName(): string;
    
    isDevice( aDeviceType: string): boolean;
    getDeviceSize(): number;

    startDevice( aDeviceType: string, aOption?: any ): number;
    stopDevice( aDeviceType: string ): number;

    startAllDevice( aOption?: any ): number;
    stopAllDevice(): number;
    
}
