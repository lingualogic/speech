/** @packageDocumentation
 * Globale Export-Datei fuer Cloud/Audio
 * 
 * TODO: ist nur uebergangsweise hier, wird nach Audio verschoben.
 * 
 * Version: 2.0
 * Datum:   31.10.2021
 *
 * Definiert das gesamte CloudAudio-API:
 *
 *      CloudAudioCodec        - Umwandlung AudioDaten <--> PCM Codec
 *      CloudAudioRecorder     - AudioRecorder fuer Mikrofon und AudioStream
 *
 * @module cloud/audio
 * @author SB
 */


// Global API


export * from './cloud-audio-const';

export { ICloudAudioCodec } from './cloud-audio-codec.interface';
export { CloudAudioCodec } from './cloud-audio-codec';

export { ICloudAudioRecorder } from './cloud-audio-recorder.interface';
export { CloudAudioRecorder } from './cloud-audio-recorder';
