/** @packageDocumentation
 * Cloud-Port Konfiguration Verwaltung
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// cloud-google

import { CloudDeviceConfigGroup } from '../device/cloud-device-config-group';
import { ICloudPortOption } from './cloud-port-option.interface';
import { ICloudPortConfig } from './cloud-port-config.interface';
export { ICloudPortConfig };


interface ICloudConfigData {
    name: string,
    type: string,
    data: any
}


export class CloudPortConfig extends CloudDeviceConfigGroup implements ICloudPortConfig {


    /**
     * Creates an instance of AmazonConfig.
     */

    constructor( aOption: ICloudPortOption ) {
        super( 'CloudPortConfig', aOption );
    }


    protected _createParameterList(): void {
        this.mParameterList.set( 'portName', { name: 'portName', type: 'string', data: '' });
        this.mParameterList.set( 'portClass', { name: 'portClass', type: 'string', data: '' });
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
        super._createParameterList();
    }


    // Konfigurations-Funktionen


    set portName( aPortName: string ) {
        this.setString( 'portName', aPortName );
    }

    get portName() {
        return this.getString( 'portName' );
    }

    set portClass( aPortClass: string ) {
        this.setString( 'portClass', aPortClass );
    }

    get portClass() {
        return this.getString( 'portClass' );
    }

    set serverFlag( aServerFlag: boolean ) {
        this.setBoolean( 'serverFlag', aServerFlag );
    }

    get serverFlag() {
        return this.getBoolean( 'serverFlag' );
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

    set dynamicCredentialsFlag( aDynamicCredentialsFlag: boolean ) {
        this.setBoolean( 'dynamicCredentialsFlag', aDynamicCredentialsFlag );
    }

    get dynamicCredentialsFlag() {
        return this.getBoolean( 'dynamicCredentialsFlag' );
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

}
