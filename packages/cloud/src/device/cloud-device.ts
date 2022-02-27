/** @packageDocumentation
 * Cloud Geraete Basisklasse 
 *
 * Letzte Aenderung: 23.02.2022
 * Status: gruen
 *
 * @module cloud/device
 * @author SB
 */


// core

import { ErrorBase, PortTransaction } from '@lingualogic-speech/core';


// cloud

import { ICloudAudioCodec, CloudAudioCodec } from '../audio/cloud-audio-codec';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudDevice } from './cloud-device.interface';
export { ICloudDevice };


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;


/**
 * Basisklasse akller Cloud-Geraete
 */

export class CloudDevice extends ErrorBase implements ICloudDevice {


    // initialisierung

    protected mDeviceName = '';
    protected mInitFlag = false;


    // innere Komponenten

    protected mConfig: ICloudDeviceConfig = null;
    protected mConnect: ICloudConnect = null;
    protected mAudioCodec: ICloudAudioCodec = null;

    // Transaktion

    protected mTransaction: PortTransaction = null;


    // Event-Funktionen

    onStart: (aTransaction: PortTransaction) => void = null;
    onStop: (aTransaction: PortTransaction) => void = null;
    onStartAudio: (aTransaction: PortTransaction) => void = null;
    onStopAudio: (aTransaction: PortTransaction) => void = null;
    onResult: (aTransaction: PortTransaction) => void = null;
    onError: (aTransaction: PortTransaction) => void = null;
    onClose: (aTransaction: PortTransaction) => void = null;


    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect ) {
        super( aConfig.deviceClass || 'CloudDevice' );
        this.mDeviceName = aConfig.deviceName || 'CloudDevice';
        this.mConfig = aConfig;
        this.mConnect = aConnect;
        // einbinden des Disconnect-Signals
        if ( this.mConnect ) {
            // alles wird gestoppt, wenn disconnect vom Server ausgeloest wurde
            this.mConnect.onDisconnect = () => {
                // console.log('CloudDevice: onDisconnect -> stop');
                if ( this.mTransaction ) {
                    this.stop( this.mTransaction );
                }
                this._onStop();
            }
        }
        // TODO: wirt temporaer hier erzeugt, bis Refaktoring in Audio abgeschlossen ist
        this.mAudioCodec = new CloudAudioCodec();
        this.setErrorOutput( aConfig.errorOutputFlag );
    }


    /**
     * Hier werden die Optionen des Devices gesetzt
     * 
     * @param aOption - Option-Datenobjekt 
     * @returns Fehlercode 0 oder -1
     */

    protected _setOption( aOption: any ): number {
        if ( !aOption ) {
            return 0;
        }
        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }
        return 0;
    }


    /**
     * Initialisierung des Devices
     * 
     * @param aOption - Option-Datenobjekt
     * @returns 
     */

    init( aOption?: any ): number {
        // kann von erbenden Klassen ueberschrieben werden
        if ( this._setOption( aOption ) !== 0 ) {
            return -1;
        }
        this.mInitFlag = true;
        return 0;
    }


    done(): number {
        this.mInitFlag = false;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    getClassName(): string {
        return this._getErrorClassName();
    }


    getType(): string {
        return 'Generic';
    }

    getName(): string {
        return this.mDeviceName;
    }


    // Token-Funktionen


    clearToken(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    getToken(): string {
        // muss von erbenden Klassen ueberschrieben werden
        return '';
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        if ( this.mConnect ) this.mConnect.setErrorOutput( aErrorOutputFlag );
    }
    

    // Event-Funktionen


    /**
     * StartEvent und Beginn der Transaktion
     *
     * @protected
     */

    protected _onStart(): number {
        // console.log('CloudGoogleDevice._onStart');
        if ( this.mTransaction && this.onStart ) {
            this.onStart( this.mTransaction );
        }
        return 0;
    }


    /**
     * Stop-Event und Ende der Transaktion
     *
     * @protected
     */

    protected _onStop(): number {
        // console.log('CloudDevice._onStop:', this.mTransaction, this.onStop );
        if ( this.mTransaction && this.onStop ) {
            this.onStop( this.mTransaction );
        }
        // Transaktion wird geloescht
        this.mTransaction = null;
        return 0;
    }


    /**
     * StartAudioEvent und Beginn der Transaktion
     *
     * @protected
     */

     protected _onStartAudio(): number {
        // console.log('CloudDevice._onStartAudio');
        if ( this.mTransaction && this.onStartAudio ) {
            this.onStartAudio( this.mTransaction );
        }
        return 0;
    }


    /**
     * StopAudioEvent und Ende der Transaktion
     *
     * @protected
     */

    protected _onStopAudio(): number {
        // console.log('CloudDevice._onStopAudio');
        if ( this.mTransaction && this.onStopAudio ) {
            this.onStopAudio( this.mTransaction );
        }
        return 0;
    }


    /**
     * Ergebnis Event
     *
     * @protected
     * @param aResult- Ergebnis von CloudGoogle
     */

    protected _onResult( aResult: any ): number {
        if ( this.mTransaction && this.onResult ) {
            this.mTransaction.result = aResult;
            this.onResult( this.mTransaction );
        }
        return 0;
    }


    /**
     * Fehler-Event
     *
     * @protected
     * @param aError
     */

    protected _onError( aError: any ): number {
        if ( this.mTransaction && this.onError ) {
            this.mTransaction.error = aError;
            this.onError( this.mTransaction );
        }
        return 0;
    }


    /**
     * WebSocket schliessen Event, deutet auf einen Fehler hin
     *
     * @protected
     */

    protected _onClose(): number {
        if ( this.mTransaction && this.onClose ) {
            this.onClose( this.mTransaction );
        }
        return 0;
    }


    // TODO: Die Codex-Funktionen sollten nicht hier sein, sondern in Audio,
    //       wird in Zuge der Refaktorisierung dorthin verlagert

    // Codier-Funktionen


    /**
     * 
     * @param aBuffer 
     * @returns 
     */

    encodeBase64( aBuffer: ArrayBuffer ): string {
        return this.mAudioCodec.encodeBase64( aBuffer );
    }


    /**
     * Dekodieren der String-Base64 Codierung
     *
     * @param aBase64Text
     */

    decodeBase64( aBase64Text: string ): ArrayBuffer {
        return this.mAudioCodec.decodeBase64( aBase64Text );
    }


    // Geraete-Funktionen


    /**
     * Interne Geraete Startfunktion
     *
     * @protected
     * @param {*} aOption - optionale Parameter
     */

    protected _start( aOption: any ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */

    protected _stop(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * Geraeteaktion starten
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aTransaction: PortTransaction, aOption?: any ): number {
        // console.log('CloudDevice.start:', aTransaction, aOption);
        if ( !aTransaction ) {
            this.error( 'start', 'keine Transaktion uebergeben' );
            return -1;
        }
        // pruefen auf vorhandene Transaktion
        if ( this.mTransaction ) {
            this.error( 'start', 'vorherige Transaktion nicht beendet' );
            return -1;
        }
        // Transaktion eintragen
        this.mTransaction = aTransaction;
        try {
            if ( this._start( aOption ) !== 0 ) {
                // console.log( 'CloudDevice.start: _start = -1');
                this.mTransaction = null;
                return -1;
            }
            return 0;
        } catch ( aException ) {
            this.exception( 'start', aException );
            return -1;
        }
    }


    /**
     * Geraeteaktion beenden
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop( aTransaction: PortTransaction ): number {
        // console.log('CloudDevice.stop: start', aTransaction);
        if ( !aTransaction ) {
            this.error( 'stop', 'keine Transaktion uebergeben' );
            return -1;
        }
        // pruefen auf vorhandene Transaktion
        if ( !this.mTransaction ) {
            this.error( 'stop', 'keine Transaktion gestartet' );
            return -1;
        }
        // pruefen auf gleiche Transaktion
        if ( this.mTransaction.transactionId !== aTransaction.transactionId ) {
            this.error( 'stop', 'Transaktions-ID stimmt nicht ueberein' );
            return -1;
        }
        // Device stoppen
        try {
            // console.log('CloudDevice.stop: _stop');
            return this._stop();
        } catch ( aException ) {
            this.exception( 'stop', aException );
            return -1;
        }
    }


    /**
     * pruefen auf vorhandene Transaktion
     */

    isTransaction(): boolean {
        if ( this.mTransaction ) {
            return true;
        }
        return false;
    }


    /**
     * Transaktion zurueckgeben
     */

    getTransaction(): PortTransaction {
        return this.mTransaction;
    }


    /**
     * Transaktion loeschen
     */

    clearTransaction(): void {
        this.mTransaction = null;
    }

}
