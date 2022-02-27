/** @packageDocumentation
 * CloudDevice Fabrik zur Erzeugung von Devices
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module cloud/device
 * @author SB
 */


// factory

import { Factory } from '@lingualogic-speech/core';


// net

import { FetchFactory } from '@lingualogic-speech/net';


// audio

import { IAudioHtml5Reader } from '@lingualogic-speech/audio';


// cloud

import { 
    CLOUD_DEVICEASR_CLASS,
    CLOUD_DEVICEASRTOKEN_CLASS,
    CLOUD_DEVICENLU_CLASS,
    CLOUD_DEVICENLUTOKEN_CLASS,
    CLOUD_DEVICETTS_CLASS,
    CLOUD_DEVICETTSTOKEN_CLASS 
} from './cloud-device-const';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { CloudAudioRecorder } from '../audio/cloud-audio-recorder';
import { ICloudDeviceConfigGroup } from './cloud-device-config-group.interface';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudDevice } from './cloud-device.interface';
import { CloudDeviceASR } from './cloud-device-asr';
import { CloudDeviceASRToken } from './cloud-device-asr-token';
import { CloudDeviceNLU } from './cloud-device-nlu';
import { CloudDeviceNLUToken } from './cloud-device-nlu-token';
import { CloudDeviceTTS } from './cloud-device-tts';
import { CloudDeviceTTSToken } from './cloud-device-tts-token';
import { ICloudDeviceFactory } from './cloud-device-factory.interface';
export { ICloudDeviceFactory };


/**
 * Implementiert die CloudDevice Fabrik
 *
 * @export
 * @class CloudDeviceFactory
 * @implements {ICloudDeviceFactory}
 */

export class CloudDeviceFactory extends Factory implements ICloudDeviceFactory {


    // Singletons von Config und Connect fuer das Device

    protected mConfig: ICloudDeviceConfigGroup = null;
    protected mConnect: ICloudConnect = null;
    protected mFetchFactory: FetchFactory = null;
    protected mAudioContext: any = null;              // TODO: muss nach Audio verlegt werden
    protected mGetUserMedia: any = null;              // TODO: muss nach AudioRecorder verlegt werden
    protected mAudioReader: IAudioHtml5Reader = null; // TODO: muss nach Audio verlegt werden


    /**
     * Creates an instance of PluginFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */

    constructor( aFactoryName: string, aConfig: ICloudDeviceConfigGroup, aConnect: ICloudConnect, aFetchFactory: FetchFactory, aAudioContext: any, aGetUserMedia: any, aAudioReader: IAudioHtml5Reader ) {
        super( aFactoryName || 'CloudDeviceFactory' );
        this.mConfig = aConfig;
        this.mConnect = aConnect;
        this.mFetchFactory = aFetchFactory;
        this.mAudioContext = aAudioContext;
        this.mGetUserMedia = aGetUserMedia;
        this.mAudioReader = aAudioReader;
    }


    getType(): string {
        return 'CloudDevice';
    }


    // Device-Funktionen


    /**
     * Hier werden abgeleitete Devices zurueckgegeben
     * 
     * @param aDeviceClass - Klasse des Devices
     * @param aConfig - Device-Konfiguration
     * @returns Device oder null
     */

    protected _newCustomDevice( aDeviceClass: string, aConfig: ICloudDeviceConfig ): ICloudDevice {
        // muss von erbenden Klassen ueberschireben werden
        return null;
    }


    /**
     * Device auswaehlen
     * 
     * @param aDeviceName - Name des ausgewaehlten Geraetes (wird zur Zeit nicht benutzt, ist identisch mit DeviceClass)
     * @param aDeviceClass - Klassenname des ausgewaehlten Geraetes
     * @returns 
     */

    protected _newDevice( aDeviceName: string, aDeviceClass: string ): ICloudDevice {
        let device: ICloudDevice = null;
        let config = null;
        if ( !this.mConfig ) {
            this.error( '_newDevice', 'keine DeviceGroup-Konfiguration vorhanden' );
            return null;
        }
        // Konfiguration auslesen
        config = this.mConfig.findDeviceConfig( aDeviceName );
        if ( !config ) {
            this.error( '_newDevice', 'keine Device-Konfiguration vorhanden ' + aDeviceName );
            return null;
        }
        switch ( aDeviceClass ) {
            // ASR-Devices
            case CLOUD_DEVICEASR_CLASS:
                device = new CloudDeviceASR( config, this.mConnect, new CloudAudioRecorder( this.mAudioContext, this.mGetUserMedia, this.mAudioReader ));
                break;
            case CLOUD_DEVICEASRTOKEN_CLASS:
                device = new CloudDeviceASRToken( config, this.mConnect, this.mFetchFactory, new CloudAudioRecorder( this.mAudioContext, this.mGetUserMedia, this.mAudioReader ));
                break;
            // NLU-Devices
            case CLOUD_DEVICENLU_CLASS:
                device = new CloudDeviceNLU( config, this.mConnect );
                break;
            case CLOUD_DEVICENLUTOKEN_CLASS:
                device = new CloudDeviceNLUToken( config, this.mConnect, this.mFetchFactory, new CloudAudioRecorder( this.mAudioContext, this.mGetUserMedia, this.mAudioReader ));
                break;
            // TTS-Devices
            case CLOUD_DEVICETTS_CLASS:
                device = new CloudDeviceTTS( config, this.mConnect, this.mAudioContext );
                break;
            case CLOUD_DEVICETTSTOKEN_CLASS:
                device = new CloudDeviceTTSToken( config, this.mConnect, this.mFetchFactory, this.mAudioContext );
                break;    
            // kein Device erkannt
            default:
                try {
                    device = this._newCustomDevice( aDeviceClass, config );
                } catch ( aException ) {
                    this.exception( '_newDevice', aException );
                }
                if ( !device ) {
                    this.error( '_newDevice', 'keine gueltige Device-Klasse ' + aDeviceClass );
                }
                break;
        }
        return device;
    }


    /**
     * Erzeugt ein neues Device
     *
     * @param aDeviceName - Instanzen-Name des Devices
     * @param aDeviceClass - Klassen-Name des Devices
     *
     * @return {ICloudDevice} Instanz des Devices
     */

    create( aDeviceName: string , aDeviceClass: string ): ICloudDevice {
        if ( !aDeviceName ) {
            return null;
        }
        if ( !aDeviceClass ) {
            return null;
        }
        try {
            return this._newDevice( aDeviceName, aDeviceClass );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
