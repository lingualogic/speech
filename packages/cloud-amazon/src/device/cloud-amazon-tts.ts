/** @packageDocumentation
 * TTS Anbindung an den CloudAmazon-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// common

import { AudioPlayer } from '@speech/common';


// cloud-amazon

import { CLOUDAMAZON_PCM_CODEC, CLOUDAMAZON_AUDIO_FORMAT, CLOUDAMAZON_AUDIOSAMPLE_RATE } from '../cloud-amazon-const';
import { CloudAmazonConfig } from '../cloud-amazon-config';
import { CloudAmazonConnect } from '../net/cloud-amazon-connect';
import { CloudAmazonDevice } from './cloud-amazon-device';


/**
 * CloudAmazonTTS Klasse fuer Sprachausgaben
 */

export class CloudAmazonTTS extends CloudAmazonDevice {

    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;


    /**
     * Erzeugt eine Instanz von CloudAmazonTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */

    constructor( aConfig: CloudAmazonConfig, aConnect: CloudAmazonConnect, aAudioContext: any ) {
        super( 'CloudAmazonTTS', aConfig, aConnect );
        this.mAudioContext = aAudioContext;
    }



    /**
     * Startet die Sprachausgabe
     *
     * @param aOptions - Parameter text, language und voice fuer die Sprach-TTS
     */

    protected _start( aOptions: any ): number {
        // console.log('CloudAmazonTTS._start: Start', aOptions);

        if ( !aOptions || !aOptions.text || typeof aOptions.text !== 'string' ) {
            this.error( '_start', 'kein Text uebergeben' );
            return -1;
        }
        try {
            // Audio-Player erzeugen

            this.mAudioPlayer = new AudioPlayer( this.mAudioContext );
            if ( !this.mAudioPlayer ) {
                this.error( '_start', 'AudioPlayer wurde nicht erzeugt' );
                return -1;
            }

            this.mAudioPlayer.onAudioStart = () => {
                // console.log('CloudAmazonTTS._start: AudioStartEvent');
                this._onStart();
            };

            this.mAudioPlayer.onAudioStop = () => {
                // console.log('CloudAmazonTTS._start: AudioStopEvent');
                this._onStop();
            };

            // CloudAmazon-Credentials ausgeben

            // AWS.config.region = this.mConfig.region;
            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: this.mConfig.identityPoolId });

            // console.log('CloudAmazonTTS._start: Credentials', AWS.config.region, AWS.config.credentials);

            // Create synthesizeSpeech params JSON
            // console.log('CloudAmazonTTS: Speech-Parameter erzeugen');

            // Create the Polly service object
            const polly = new (window as any).AWS.Polly({apiVersion: '2016-06-10'});

            // Parameter fuer Polly
            const params = {
                LanguageCode: aOptions.language || 'de-DE',
                OutputFormat: CLOUDAMAZON_AUDIO_FORMAT,
                SampleRate: '' + CLOUDAMAZON_AUDIOSAMPLE_RATE,
                Text: aOptions.text || '',
                TextType: 'text',
                VoiceId: aOptions.voice || 'Vicki'
            };

            polly.synthesizeSpeech( params, (aError: any, aData: any) => {
                // console.log('CloudAmazonTTS._start: synthesizeSpeech');
                if ( aError ) {
                    // console.log('CloudAmazonTTS._start: syntheseSpeech Error = ', aError);
                    this._onError( aError );
                    this._onStop();
                } else if ( aData ) {
                    // console.log('CloudAmazonTTS._start: syntheseSpeech AudioStream start');
                    this.mAudioPlayer.decode({ codec: CLOUDAMAZON_PCM_CODEC }, aData.AudioStream );
                    // console.log('CloudAmazonTTS._start: syntheseSpeech AudioStream end');
                }
            });

            // Audioplayer starten

            this.mAudioPlayer.start();
            return 0;
        } catch ( aException ) {
            this.exception( '_start', aException );
            return -1;
        }

        // console.log('CloudAmazonTTS._start: End');
    }


    protected _stop(): number {
        // console.log('CloudAmazonTTS._stop:', this.mAudioPlayer);
        if ( this.mAudioPlayer ) {
            this.mAudioPlayer.stop();
            this.mAudioPlayer = null;
        }
        return 0;
    }

}

