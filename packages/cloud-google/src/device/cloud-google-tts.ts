/** @packageDocumentation
 * TTS Anbindung an den CloudGoogle-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// common

import { AudioPlayer } from '@speech/common';


// cloud-google

import { CloudGoogleConfig } from '../cloud-google-config';
import { CloudGoogleConnect } from '../net/cloud-google-connect';
import { CloudGoogleDevice } from './cloud-google-device';



export class CloudGoogleTTS extends CloudGoogleDevice {

    // Audio

    private mAudioContext = null;
    private mAudioPlayer = null;


    /**
     * Erzeugt eine Instanz von CloudGoogleTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */

    constructor( aConfig: CloudGoogleConfig, aConnect: CloudGoogleConnect, aAudioContext: any ) {
        super( 'CloudGoogleTTS', aConfig, aConnect );
        this.mAudioContext = aAudioContext;
    }


    /**
     * Initialisierung der TTS Optionen
     *
     * @protected
     *
     * @return {any} Default Optionen fuer die TTS
     */

    // TODO: wird von CloudGoogle nicht benoetigt
    /****
    _getDefaultOption(): any {
        // console.log('NuanceTTS._getDefaultOption: start');

        const defaultOption = super._getDefaultOption();

        defaultOption['onresult'] = ( aMessage: any) => {
            // console.log( 'NuanceTTS._getDefaultOption: onresult', aMessage );
            if ( aMessage.result_type === 'NMDP_TTS_CMD' || aMessage.result_type === 'NVC_TTS_CMD' ) {
                // console.log('NuanceTTS._getDefaultOption: onresult = NMDP_TTS_CMD', aMessage);
            } else if ( aMessage.message === 'query_error' ) {
                // console.log('NuanceTTS._getDefaultOption: onresult error = ', aMessage.reason);
                this._onError( new Error( 'TTS-Error.' + aMessage.message + ': ' + aMessage.reason ));
                this._onStop();
            } else if ( aMessage.message === 'disconnect' ) {
                if ( aMessage.reason !== 'Transaction completed.' ) {
                    // console.error('TTS-Error:', aMessage.reason);
                    this._onError( new Error( 'TTS-Error.' + aMessage.message + ': ' + aMessage.reason ));
                }
            }
        };

        defaultOption['onttsdecode'] = (aOption: any, aAudioData: any) => {
            // console.log('NuanceTTS._getDefaultOption: ondecode');
            if ( this.mAudioPlayer ) {
                this.mAudioPlayer.decode( aOption, aAudioData );
            }
        };

        defaultOption['onttsstart'] = () => {
            // console.log('NuanceTTS._getDefaultOption: onttsstart');
            if ( this.mAudioPlayer ) {
                this.mAudioPlayer.start();
            }
        };

        defaultOption['onttscomplete'] = () => {
            // console.log('NuanceTTS._getDefaultOption: onttscomplete');
            if ( this.mAudioPlayer ) {
                this._onResult( this.mAudioPlayer.mQueue );
            }
        };

        // wenn Audio wirklich abgespielt wird

        defaultOption['onaudiostart'] = () => {
            // console.log('NuanceTTS._getDefaultOption: onaudiostart');
            // TODO: muss eigentlich ein onAudioStart-Event sein
            this._onStart();
        };

        defaultOption['onaudioend'] = () => {
            // console.log('NuanceTTS._getDefaultOption: onaudioend');
            // TODO: muss eigentlich ein onAudioEnd-Event sein
            this.mAudioPlayer = null;
            this._onStop();
        };

        return defaultOption;
    }
    ****/


    // Nachrichten senden


    // TODO: wird von CloudGoogle nicht benoetigt
    /****
    _sendQueryBeginMessage( aTransactionId: number, aLanguage: string, aVoice: string, aCodec: string ): number {
        // console.log('NuanceTTS._sendStartMessage:', aTransactionId, aLanguage, aVoice, aCodec);
        const queryBeginMessage = {
            'message': 'query_begin',
            'transaction_id': aTransactionId,
            'command': 'NMDP_TTS_CMD',
            'language': aLanguage,
            'codec': aCodec,
            'tts_voice': aVoice
        };
        return this.mConnect.sendJSON( queryBeginMessage );
    }
    ****/


    // TODO: wird von CloudGoogle nicht benoetigt
    /****
    _sendQueryParameterMessage( aTransactionId: number, aText: string ): number {
        // console.log('NuanceTTS._sendSynthesizeMessage:', aTransactionId, aText);
        const queryParameterMessage = {
            'message': 'query_parameter',
            'transaction_id': aTransactionId,
            'parameter_name': 'TEXT_TO_READ',
            'parameter_type': 'dictionary',
            'dictionary': {
                'audio_id': NUANCE_AUDIOTTS_ID,
                'tts_input': aText,
                'tts_type': 'text'
            }
        };
        return this.mConnect.sendJSON( queryParameterMessage );
    }
    ****/


    /**
     * TTS starten
     *
     * @param aOptions
     */

    protected _start( aOptions: any ): number {
        console.log('CloudGoogleTTS._start:', aOptions);

        aOptions.onmessage = (aMessage: any) => {
            console.log('===> Nachricht: ', aMessage );
        };

        aOptions.ondata = (aData: any) => {
            console.log('===> Daten ');

            // Audioplayer erzeugen

            this.mAudioPlayer = new AudioPlayer( this.mAudioContext );
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

        this.mConnect.connect( aOptions );
        this.mConnect.sendJSON({ event: 'googleTTSAudioStart', text: aOptions.text, language: aOptions.language, voice: aOptions.voice });
        return 0;
    }


    protected _stop(): number {
        console.log('CloudGoogleTTS._stop');

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

