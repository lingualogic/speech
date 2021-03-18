/** @packageDocumentation
 * Hier wird die ASRPort als Adapter fuer CloudPort implementiert.
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// core

import { EventDataInterface, PortInterface } from '@speech/core';


// cloud

import { CLOUD_ASR_ACTION, CloudManager } from '@speech/cloud';


// asr

import { ASR_PORT_NAME } from './asr-const';
import { ASRPlugin } from './asr-plugin';


/**
 * Die ASRPort Klasse kapselt die Google-ASR
 */

export class ASRPort extends ASRPlugin {

    // externer Google-Port

    protected mPort: PortInterface = null;
    protected mPortName = '';
    protected mCloudPortName = '';


    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aCloudPortName - Name des CloudPorts, mit dem der ASRPort verbunden werden soll
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aCloudPortName: string, aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_PORT_NAME, aRegisterFlag );
        this.mPortName = aPluginName;
        this.mCloudPortName = aCloudPortName;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRPort';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Port
        if ( this.mPort ) {
            this.mPort.removeAllEvent( this.mPortName );
            this.mPort = null;
        }
        return super.done();
    }


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        if ( this.mPort ) {
            // console.log('TTSGoogle._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mPort.setErrorOutputOn();
            } else {
                this.mPort.setErrorOutputOff();
            }
        }
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Port existiert, false sonst
     */

    protected _detectRecognition(): boolean {
        this.mPort = CloudManager.findPort( this.mCloudPortName );
        if ( !this.mPort ) {
            this.error( '_detectRecognition', 'kein Port vorhanden' );
            return false;
        }
        return true;
    }


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Synthese
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initRecognition( aOption?: any ): number {
        // console.log('ASRPort._initRecognition:', aOption);
        if ( !this.mPort ) {
            this.error( '_initRecognition', 'kein Port vorhanden' );
            return -1;
        }
        if ( !this.mPort.isInit()) {
            this.error( '_initRecognition', 'Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mPort.isOpen()) {
            this.error( '_initRecognition', 'Port ist nicht geoeffnet' );
            return -1;
        }
        this.mPort.addStartEvent( this.mPortName, (aEventData: EventDataInterface) => {
            // console.log('ASRPort._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mPort.addStopEvent( this.mPortName, (aEventData: EventDataInterface) => {
            // onsole.log('ASRPort._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mPort.addResultEvent( this.mPortName, (aEventData: EventDataInterface) => {
            // console.log('ASRPort._initRecognition: resultEvent = ', aEventData);
            this._onRecognitionResult( aEventData.data );
            return 0;
        });
        this.mPort.addErrorEvent( this.mPortName, (aError: any) => {
            // console.log('ASRPort._initRecognition: errorEvent = ', aError.message);
            // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
            this._checkErrorMessage( aError.message );
            this._onRecognitionError( aError );
            return 0;
        });
        return 0;
    }


    protected _checkErrorMessage( aErrorMessage: string ): void {
        // muss von erbenden Klassen ueberschrieben werden
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean} True, wenn Recognition vorhanden ist, False sonst
     */

    protected _isRecognition(): boolean {
        if ( this.mPort ) {
            return this.mPort.isAction( CLOUD_ASR_ACTION );
        }
        return false;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // console.log('ARSGoogle._getRecognitionResult:', aEvent);
        return aEvent[0].transcript;
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    protected _startRecognition(): number {
        // console.log('ASRPort._startRecognition');
        if ( this.mPort ) {
            // console.log('ASRPort._startRecognition:', this._getASRLanguage());
            return this.mPort.start( this.mPortName, CLOUD_ASR_ACTION, { language: this._getASRLanguage() });
        }
        return -1;
    }


    /**
     * stoppt die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stopRecognition(): number {
        // console.log('ASRPort._stopRecognition');
        if ( this.mPort ) {
            return this.mPort.stop( this.mPortName, CLOUD_ASR_ACTION );
        }
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _abortRecognition(): number {
        if ( this.mPort ) {
            // TODO: Abort muss in Port noch eingebaut werden
            // return this.mPort.abort( CLOUD_ASR_ACTION );
            return this._stopRecognition();
        }
        return -1;
    }


    /**
     * prueft, ob die Recognition im Port laeuft
     */

    protected _isRecognitionRunning(): boolean {
        // console.log('TTSGoogle._isRecognitionRunning');
        if ( this.mPort ) {
            // console.log('ASRPort._isRecognitionRunning: ', this.mPort.isRunning( this.mPortName, this.mCloudPortName ));
            return this.mPort.isRunning( this.mPortName, CLOUD_ASR_ACTION );
        }
        return false;
    }

}
