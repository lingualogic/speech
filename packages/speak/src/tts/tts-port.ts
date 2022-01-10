/** @packageDocumentation
 * Hier wird der TTS-Portadapter implementiert.
 *
 * Letzte Aenderung: 15.10.2021
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// event

import { IEventData, IPort, PortManager, PORT_TTS_ACTION } from '@speech/core';


// tts

import { TTS_PORT_NAME } from './tts-const';
import { TTSPlugin } from './tts-plugin';


/**
 * Die TTSPort Klasse kapselt den TTS-Portadapter
 */

export class TTSPort extends TTSPlugin {

    // externes Port-Objekt

    protected mPort: IPort = null;
    protected mPortName = '';
    protected mCloudPortName = '';


    /**
     * TTSPort Objekt erzeugen.
     *
     * @param {string} aCloudPortName - Name des CloudPorts, mit dem der TTSPort verbunden werden soll
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aCloudPortName: string, aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || TTS_PORT_NAME, aRegisterFlag );
        this.mPortName = aPluginName;
        this.mCloudPortName = aCloudPortName;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSPort';
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
            // console.log('TTSPort._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mPort.setErrorOutputOn();
            } else {
                this.mPort.setErrorOutputOff();
            }
        }
    }


    // Voice-Funktionen


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        // TODO: muss in den Port selbst verlagert werden als Funktion
        // Deutschland
        if ( this.getLanguage() === 'de' ) {
            return [];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [];
        }
        return [];
    }


    // Synthese-Funktionen


    /**
     * Feststellen, ob Amazon-Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Amazon-Port existiert, false sonst
     */

    protected _detectSynthesis(): boolean {
        this.mPort = PortManager.find( this.mCloudPortName );
        // console.log('TTSPort._detectSynthesis:', this.mCloudPortName, this.mPort);
        if ( !this.mPort ) {
            this.error( '_detectSynthesis', 'kein Port vorhanden' );
            return false;
        }
        return true;
    }


    /**
     * Initialisierung der Synthese
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Synthese
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initSynthesis( aOption?: any ): number {
        // console.log('TTSPort._initSynthesis:', aOption);
        if ( !this.mPort ) {
            this.error( '_initSynthesis', 'kein Port vorhanden' );
            return -1;
        }
        if ( !this.mPort.isInit()) {
            this.error( '_initSynthesis', 'Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mPort.isOpen()) {
            this.error( '_initSynthesis', 'Port ist nicht geoeffnet' );
            return -1;
        }
        this.mPort.addStartEvent( this.mPortName, (aEventData: IEventData) => {
            // console.log('TTSPort._initSynthesis: startEvent = ', aEventData);
            this._onSynthesisStart();
            return 0;
        });
        this.mPort.addStopEvent( this.mPortName, (aEventData: IEventData) => {
            // console.log('TTSPort._initSynthesis: stopEvent = ', aEventData);
            this._onSynthesisEnd();
            return 0;
        });
        this.mPort.addErrorEvent( this.mPortName, (aError: any) => {
            // console.log('TTSPort._initSynthesis: errorEvent = ', aError.message);
            this._checkErrorMessage( aError.message );
            this._onSynthesisError({ error: aError.message });
            return 0;
        });
        return 0;
    }


    protected _checkErrorMessage( aErrorMessage: string ): void {
        // muss von erbenden Klassen ueberschrieben werden
    }


    /**
     * pruefen auf vorhandene Synthese
     *
     * @returns {boolean} True, wenn Synthese vorhanden ist, False sonst
     */

    protected _isSynthesis(): boolean {
        if ( this.mPort ) {
            return this.mPort.isAction( PORT_TTS_ACTION );
        }
        return false;
    }


    /**
     * Erzeugen der Synthese-Objekte
     *
     * @protected
     * @param {string} aText - zu synthethisiernder Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _createSynthesis( aText: string ): number {
        return 0;
    }


    /**
     * startet die Synthese
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    protected _startSynthesis( aText: string ): number {
        if ( this.mPort ) {
            // console.log('TTSPort._startSynthesis:', aText, this._getTTSLanguage(), this.getVoice());
            return this.mPort.start( this.mPortName, PORT_TTS_ACTION, { text: aText, language: this._getTTSLanguage(), voice: this.getVoice()});
        }
        return -1;
    }


    /**
     * stoppt die Synthese
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stopSynthesis(): number {
        if ( this.mPort ) {
            // console.log('TTSPort._stopSynthesis:', this._getTTSLanguage(), this.getVoice());
            return this.mPort.stop( this.mPortName, PORT_TTS_ACTION );
        }
        return -1;
    }


    /**
     * prueft, ob die Synthese im Port laeuft
     */

    protected _isSynthesisRunning(): boolean {
        // console.log('TTSPort._isSynthesisRunning');
        if ( this.mPort ) {
            return this.mPort.isRunning( this.mPortName, PORT_TTS_ACTION );
        }
        return false;
    }

}
