/** @packageDocumentation
 * Cloud-Device Konfiguration Verwaltung
 *
 * Letzte Aenderung: 10.11.2021
 * Status: gruen
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { CloudBaseConfig } from './../config/cloud-base-config'
import { ICloudDeviceOption } from './cloud-device-option.interface';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
export { ICloudDeviceConfig };


export class CloudDeviceConfig extends CloudBaseConfig implements ICloudDeviceConfig {


    /**
     * Creates an instance of AmazonConfig.
     */

    constructor( aOption: ICloudDeviceOption ) {
        super( 'CloudDeviceConfig', aOption );
    }


    protected _createParameterList(): void {
        this.mParameterList.set( 'deviceName', { name: 'deviceName', type: 'string', data: '' });
        this.mParameterList.set( 'deviceClass', { name: 'deviceClass', type: 'string', data: '' });
        this.mParameterList.set( 'deviceType', { name: 'deviceType', type: 'string', data: '' });
        this.mParameterList.set( 'serverFlag', { name: 'serverFlag', type: 'boolean', data: false });
        this.mParameterList.set( 'serverUrl', { name: 'serverUrl', type: 'string', data: '' });
        this.mParameterList.set( 'tokenServerUrl', { name: 'tokenServerUrl', type: 'string', data: '' });
        this.mParameterList.set( 'projectId', { name: 'projectId', type: 'string', data: '' });
        this.mParameterList.set( 'sessionId', { name: 'sessionId', type: 'string', data: '' });
        this.mParameterList.set( 'environmentName', { name: 'environmentName', type: 'string', data: '' });
        this.mParameterList.set( 'dynamicCredentialsFlag', { name: 'dynamicCredentialsFlag', type: 'boolean', data: false });
        this.mParameterList.set( 'appId', { name: 'appId', type: 'string', data: '' });
        this.mParameterList.set( 'appKey', { name: 'appKey', type: 'string', data: '' });
        this.mParameterList.set( 'userId', { name: 'userId', type: 'string', data: '' });
        this.mParameterList.set( 'errorOutputFlag', { name: 'errorOutputFlag', type: 'boolean', data: false });
    }


    // Konfigurations-Funktionen


    set deviceName( aDeviceName: string ) {
        this.setString( 'deviceName', aDeviceName );
    }

    get deviceName() {
        return this.getString( 'deviceName' );
    }

    set deviceClass( aDeviceClass: string ) {
        this.setString( 'deviceClass', aDeviceClass );
    }

    get deviceClass() {
        return this.getString( 'deviceClass' );
    }

    set deviceType( aDeviceType: string ) {
        this.setString( 'deviceType', aDeviceType );
    }

    get deviceType() {
        return this.getString( 'deviceType' );
    }

    set serverUrl( aUrl: string ) {
        this.setString( 'serverUrl', aUrl );
    }

    get serverUrl() {
        return this.getString( 'serverUrl' );
    }

    set tokenServerUrl( aUrl: string ) {
        this.setString( 'tokenServerUrl', aUrl );
    }

    get tokenServerUrl() {
        return this.getString( 'tokenServerUrl' );
    }

    set projectId( aProjectId: string ) {
        this.setString( 'projectId', aProjectId );
    }

    get projectId() {
        return this.getString( 'projectId' );
    }

    set sessionId( aSessionId: string ) {
        this.setString( 'sessionId', aSessionId );
    }

    get sessionId() {
        return this.getString( 'sessionId' );
    }

    set environmentName( aEnvironmentName: string ) {
        this.setString( 'environmentName', aEnvironmentName );
    }

    get environmentName() {
        return this.getString( 'environmentName' );
    }

    set appId( aAppId: string ) {
        this.setString( 'appId', aAppId );
    }

    get appId() {
        return this.getString( 'appId' );
    }

    set appKey( aAppKey: string ) {
        this.setString( 'appKey', aAppKey );
    }

    get appKey() {
        return this.getString( 'appKey' );
    }

    set userId( aUserId: string ) {
        this.setString( 'userId', aUserId );
    }

    get userId() {
        return this.getString( 'userId' );
    }

    set errorOutputFlag( aErrorOutputFlag: boolean ) {
        this.setBoolean( 'errorOutputFlag', aErrorOutputFlag );
    }

    get errorOutputFlag() {
        return this.getBoolean( 'errorOutputFlag' );
    }

}
