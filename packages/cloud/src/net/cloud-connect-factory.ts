/** @packageDocumentation
 * CloudConnect Fabrik zur Erzeugung von Connects
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/net
 * @author SB
 */


// factory

import { Factory } from '@lingualogic-speech/core';


// cloud

import { CLOUD_BASE_CONNECT, CLOUD_WEBSOCKET_CONNECT } from './../cloud-const';
import { ICloudConnectFactory } from './cloud-connect-factory.interface';
import { ICloudPortConfig } from '../port/cloud-port-config.interface';
import { ICloudWebSocket } from './cloud-websocket.interface';
import { ICloudConnect } from './cloud-connect.interface';
import { CloudConnect } from './cloud-connect';
import { CloudConnectWebSocket } from './cloud-connect-websocket';


/**
 * Implementiert die CloudConnect Fabrik
 *
 * @export
 * @class CloudConnectFactory
 * @implements {ICloudConnectFactory}
 */

export class CloudConnectFactory extends Factory implements ICloudConnectFactory {


    // Singletons von Config und Connect fuer das Device

    mConfig: ICloudPortConfig = null;
    mWebSocket: ICloudWebSocket = null;

    /**
     * Creates an instance of PluginFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */

    constructor( aFactoryName: string, aConfig: ICloudPortConfig, aWebSocket: ICloudWebSocket ) {
        super( aFactoryName || 'CloudConnectFactory' );
        this.mConfig = aConfig;
        this.mWebSocket = aWebSocket;
    }


    getType(): string {
        return 'CloudConnect';
    }


    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return 'CloudConnectFactory';
    }


    // Connect-Funktionen


    protected _newConnect( aConnectName: string, aConnectClass: string ): ICloudConnect {
        let connect: ICloudConnect = null;
        switch ( aConnectClass ) {
            case CLOUD_BASE_CONNECT:
                connect = new CloudConnect( aConnectName, this.mConfig );
                break;
            // Default-TTS
            case CLOUD_WEBSOCKET_CONNECT:
                connect = new CloudConnectWebSocket( '', this.mConfig, this.mWebSocket );
                break;
            default:
                this.error( '_newConnect', 'kein Connect vorhanden' );
                break;
        }
        return connect;
    }


    /**
     * Erzeugt ein neues Connects
     *
     * @param [aConnectName] - Instanzen-Name des Devices
     * @param [aConnectClass] - Klassen-Name des Devices
     *
     * @return {ICloudConnect} Instanz des Connect
     */

    create( aConnectName = '', aConnectClass = '' ): ICloudConnect {
        const connectName = aConnectName || CLOUD_BASE_CONNECT;
        const connectClass = aConnectClass || CLOUD_BASE_CONNECT;
        try {
            return this._newConnect( connectName, connectClass );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
