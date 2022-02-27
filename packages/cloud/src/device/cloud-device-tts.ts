/** @packageDocumentation
 * TTS Anbindung an den Cloud-Service
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// audio

import { AudioBrowserPlayer } from '@lingualogic-speech/audio';


// cloud

import { CLOUD_TTS_TYPE } from './cloud-device-const';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { CloudDevice } from './cloud-device';



export class CloudDeviceTTS extends CloudDevice {

    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;


    /**
     * Erzeugt eine Instanz von CloudGoogleTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */

    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect, aAudioContext: any ) {
        super( aConfig, aConnect );
        this.mAudioContext = aAudioContext;
    }


    getClassName(): string {
        return 'CloudDeviceTTS';
    }

    
    getType(): string {
        return CLOUD_TTS_TYPE;
    }


    /**
     * TTS starten
     *
     * @param aOptions
     */

    protected _start( aOptions: any ): number {
        console.log('CloudDeviceTTS._start:', aOptions);

        aOptions.onmessage = (aMessage: any) => {
            console.log('===> Nachricht: ', aMessage );
        };

        aOptions.ondata = (aData: any) => {
            console.log('===> Daten ');

            // Audioplayer erzeugen

            this.mAudioPlayer = new AudioBrowserPlayer( this.mAudioContext );
            this.mAudioPlayer.start();
            const options = {
                // codec: CLOUDGOOGLE_PCM_CODEC,
                onaudiostart: () => {
                    console.log('Audioplayer gestartet');
                },
                onaudioend: () => {
                    console.log('Audioplayer beenden');
                    this._stop();
                }
            };
            // Stream dekodieren
            // this.mAudioPlayer.decodeOld( options, aData );
            // MP3-Audio dekodieren
            this.mAudioPlayer.decodeAudio( options, aData );
            // this._stop();
        };

        // logische Verbindung mit CloudGoogle-Server aufbauen

        // this.mConnect.connect( aOptions );
        // this.mConnect.sendJSON({ event: 'googleTTSAudioStart', text: aOptions.text, language: aOptions.language, voice: aOptions.voice });
        return 0;
    }


    protected _stop(): number {
        console.log('CloudDeviceTTS._stop');

        // this.mConnect.sendJSON( audioEndMessage );

        if ( this.mAudioPlayer ) {
            // fuer Streams
            // this.mAudioPlayer.stopOld();
            // fuer MP3
            this.mAudioPlayer.stopAudio();
            this._onStop();
        }
        return 0;
    }

}

