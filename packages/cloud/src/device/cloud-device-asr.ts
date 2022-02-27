/** @packageDocumentation
 * ASR Anbindung an den Cloud-Service
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { CLOUD_ASR_TYPE } from './cloud-device-const';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { ICloudAudioRecorder } from '../audio/cloud-audio-recorder';
import { CloudDevice } from './cloud-device';


export class CloudDeviceASR extends CloudDevice {


    // AudioRecorder fuer die Cloud

    protected mAudioRecorder: ICloudAudioRecorder = null;


    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect, aAudioRecorder: ICloudAudioRecorder ) {
        super( aConfig , aConnect );
        this.mAudioRecorder = aAudioRecorder;
        // Events eintragen
        if ( this.mAudioRecorder ) {
            // console.log('CloudDeviceASR: stopFunc = ', this._onStop());
            this.mAudioRecorder.onStop = () => this._onStop();
            this.mAudioRecorder.onError = (aError: any) => this._onError( aError );
        }
        // console.log('CloudDeviceASR: AudioRecorder = ', this.mAudioRecorder);
    }


    getType(): string {
        return CLOUD_ASR_TYPE;
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

     setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        if ( this.mAudioRecorder ) this.mAudioRecorder.setErrorOutput( aErrorOutputFlag );
    }


    // Message-Funktionen


    protected _getSpeechResult( aResult: any ): any {
        // muss von erbenden Klassen ueberschrieben werden
        // Transformation des Ergebnisses
        return aResult;
    }


    protected _onSpeechResult( aResult: any ): void {
        // console.log('cloudDeviceASR._onSpeechResult:', aResult);
        if ( aResult ) {
            this._onResult( this._getSpeechResult( aResult ));
        }
        this._stop();
    }


    protected _onSpeechEnd(): void {
        // console.log('Ende der Spracheingabe');
    }


    protected _onOptionMessage( aMessage: any): void {
        if ( aMessage ) {
            this._onSpeechResult( aMessage );
        }
    }



    protected _onStreamStart(): void {
        // muss von erbenden Klassen ueberschrieben werden
        // console.log('CloudDeviceASR._onStreamStart');
    }


    protected _onStreamStop(): void {
        // muss von erbenden Klassen ueberschrieben werden
        // console.log('CloudDeviceASR._onStreamStop');
        // TODO: Workaround, um Transaktion zu beenden
        this._onStop();
    }


    protected _onStreamData( aStreamData: any): number {
        // muss von erbenden Klassen ueberschrieben werden
        // console.log('CloudDeviceASR._onStreamData');
        return 0;
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _start( aOption ): number {
        // console.log('CloudDeviceASR._start:', aOption.language);

        // Speech-Message-Funktion

        aOption.onmessage = (aMessage: any) => this._onOptionMessage( aMessage );

        // logische Verbindung aufbauen

        if ( this.mConnect ) {
            if ( this.mConnect.connect( aOption ) !== 0 ) {
                // console.log('CloudDeviceAsr._start: connect = -1');
                return -1;
            }
            aOption.webSocket = this.mConnect.webSocket;
        }

        // Recorder starten
        
        if ( this.mAudioRecorder ) {
            this.mAudioRecorder.onAudioStart = () => this._onStartAudio();
            this.mAudioRecorder.onAudioStop = () => this._onStopAudio();
            this.mAudioRecorder.onStreamStart = () => this._onStreamStart();
            this.mAudioRecorder.onStreamStop = () => this._onStreamStop();
            this.mAudioRecorder.onStreamData = (aStreamData: any) => this._onStreamData( aStreamData );
            const result = this.mAudioRecorder.start( aOption );
            // console.log('CloudDeviceAsr._start: audioRecorder = ', result);
            return result;
        }

        // console.log('CloudDeviceAsr._start: end = -1');
        return -1;
    }


    protected _stop(): number {
        // console.log('CloudDeviceASR._stop');

        if ( this.mAudioRecorder ) {
            return this.mAudioRecorder.stop();
        }

        return -1;
    }

}
