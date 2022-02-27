/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Cloud
 *
 * Version: 1.0
 * Datum:   31.10.2021
 *
 * Definiert das gesamte Speech-Cloud-API:
 *
 *      CloudManager  - Hauptprogramm von Speech-Cloud
 *
 * @module cloud
 * @author SB
 */


// Global API


// Global API


// audio

export * from './audio/cloud-audio-const';

export { ICloudAudioCodec } from './audio/cloud-audio-codec.interface';
export { CloudAudioCodec } from './audio/cloud-audio-codec';

export { ICloudAudioRecorder } from './audio/cloud-audio-recorder.interface';
export { CloudAudioRecorder } from './audio/cloud-audio-recorder';

// device-config

export { ICloudDeviceConfigGroup } from './device/cloud-device-config-group.interface';
export { CloudDeviceConfigGroup } from './device/cloud-device-config-group';
export { CloudDeviceConfigList } from './device/cloud-device-config-list';
export { ICloudDeviceConfig } from './device/cloud-device-config.interface';
export { CloudDeviceConfig } from './device/cloud-device-config';

// device-factory

export { ICloudDeviceFactory } from './device/cloud-device-factory.interface';
export { CloudDeviceFactory } from './device/cloud-device-factory';

// device-group

export { ICloudDeviceGroupOption } from './device/cloud-device-group-option.interface';
export { ICloudDeviceGroup } from './device/cloud-device-group.interface';
export { CloudDeviceGroup } from './device/cloud-device-group';
export { CloudDeviceList } from './device/cloud-device-list';

// device

export { ICloudDeviceOption } from './device/cloud-device-option.interface';
export { ICloudDevice } from './device/cloud-device.interface';
export { CloudDevice } from './device/cloud-device';
export { CloudDeviceASR } from './device/cloud-device-asr';
export { CloudDeviceASRToken } from './device/cloud-device-asr-token';
export { CloudDeviceNLU } from './device/cloud-device-nlu';
export { CloudDeviceNLUToken } from './device/cloud-device-nlu-token';
export { CloudDeviceTTS } from './device/cloud-device-tts';
export { CloudDeviceTTSToken } from './device/cloud-device-tts-token';

// net

export { ICloudConnectFactory } from './net/cloud-connect-factory.interface';
export { CloudConnectFactory } from './net/cloud-connect-factory';

export { ICloudConnect } from './net/cloud-connect.interface';
export { CloudConnect } from './net/cloud-connect';
export { CloudConnectWebSocket } from './net/cloud-connect-websocket';

export { CloudNetwork } from './net/cloud-network';

export { ICloudWebSocket } from './net/cloud-websocket.interface';
export { CloudWebSocket } from './net/cloud-websocket';

// port-const

export * from './port/cloud-port-const';
export * from './port/cloud-port-version';

// port-config

export { ICloudPortConfigData } from './port/cloud-port-config-data.interface';
export{ ICloudPortConfig } from './port/cloud-port-config.interface';
export { CloudPortConfig } from './port/cloud-port-config';

// factory

export { CloudPortFactory } from './port/cloud-port-factory';

// port

export { ICloudPortOption } from './port/cloud-port-option.interface';
export { ICloudPortGroup } from './port/cloud-port-group.interface';
export { CloudPortGroup } from './port/cloud-port-group';
export { CloudPort } from './port/cloud-port';
export { CloudPortMock } from './port/cloud-port-mock';

// token

export { ICloudToken } from './token/cloud-token.interface';
export { CloudToken } from './token/cloud-token';


// cloud

export { CLOUD_AMAZON_PORT, CLOUD_GOOGLE_PORT, CLOUD_MICROSOFT_PORT, CLOUD_RASA_PORT } from './cloud-const';

export { ICloudOption } from './cloud-option.interface';
export { CloudManager } from './cloud-manager';
