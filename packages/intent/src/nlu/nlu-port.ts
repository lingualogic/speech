/** @packageDocumentation
 * Diese Komponente bindet einen CloudPort ein.
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// core

import { EventDataInterface, PortInterface } from '@speech/core';


// cloud

import { CLOUD_NLU_ACTION, CLOUD_ASRNLU_ACTION, CloudManager } from '@speech/cloud';


// nlu

import { NLU_PORT_NAME } from './nlu-const';
import { NLUPlugin } from './nlu-plugin';


/**
 * Diese Klasse kapselt die CloudPort-Einbindung
 */

export class NLUPort extends NLUPlugin {

    // externes Port-Objekt

    protected mPort: PortInterface = null;
    protected mPortName = '';
    protected mCloudPortName = '';


    /**
     * NLUPort Objekt erzeugen
     *
     * @param {string} aCloudPortName - Name des CloudPorts, mit dem der NLUPort verbunden werden soll
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor(  aCloudPortName: string, aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || NLU_PORT_NAME, aRegisterFlag );
        this.mPortName = aPluginName;
        this.mCloudPortName = aCloudPortName;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUPort';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // pruefen auf Google-Port
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
            // console.log('TTSNuance._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mPort.setErrorOutputOn();
            } else {
                this.mPort.setErrorOutputOff();
            }
        }
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Google SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
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
     * Interne Ergebnis-Verarbeitung
     *
     * @param {*} aResult - beliebiges Ergebnis
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _onInternResult( aResult: any ): number {
        // console.log('NLUPort._onInternResult:', aResult);
        if ( aResult.type === CLOUD_NLU_ACTION ) {
            return this._onRecognitionIntentResult( aResult.data );
        }
        if ( aResult.type === CLOUD_ASRNLU_ACTION ) {
            // Unterscheiden von Transkription als String und Intent als Objekt
            if ( typeof aResult.data[ 0 ] === 'string' ) {
                return this._onRecognitionResult( aResult.data );
            } else {
                return this._onRecognitionIntentResult( aResult.data );
            }
        }
        return 0;
    }


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initRecognition( aOption?: any ): number {
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
            // console.log('NLUPort._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mPort.addStopEvent( this.mPortName, (aEventData: EventDataInterface) => {
            // console.log('NLUPort._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mPort.addResultEvent( this.mPortName, (aEventData: EventDataInterface) => {
            // console.log('NLUPort._initRecognition: resultEvent = ', aEventData);
            this._onInternResult( aEventData );
            return 0;
        });
        this.mPort.addErrorEvent( this.mPortName, (aError: any) => {
            // console.log('NLUPort._initRecognition: errorEvent = ', aError.message);
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


    // Text-Funktionen


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    protected _isRecognition(): boolean {
        if ( this.mPort ) {
            // console.log('NLUPort._isRecognition:', this.mPort.isAction( CLOUD_NLU_ACTION ));
            return this.mPort.isAction( CLOUD_NLU_ACTION );
        }
        return false;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isIntent(): boolean {
        if ( this.mPort ) {
            return this.mPort.isAction( CLOUD_NLU_ACTION );
        }
        return false;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isListen(): boolean {
        if ( this.mPort ) {
            return this.mPort.isAction( CLOUD_ASRNLU_ACTION );
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
        // console.log('NLUPort._getRecognitionResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        return aEvent;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

     // TODO: Diese Transformation sollte in den Ports bereits durchgefuehrt werden.
    protected _getRecognitionIntentResult( aEvent: any ): any {
        // console.log('NLUPort._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            conceptList: [],
            literal: '',
            speech: '',
            audioFormat: '',
            audio: '',
            error: ''
        };
        try {
            // pruefen auf Dialogflow-V2
            if ( aEvent.queryResult ) {
                // console.log('NLUPort._getRecognitionIntentResult:', aEvent);
                if ( aEvent.queryResult.intent ) {
                    intentData.intent = aEvent.queryResult.intent.displayName;
                }
                intentData.confidence = aEvent.queryResult.intentDetectionConfidence;
                intentData.literal = aEvent.queryResult.queryText;
                intentData.speech = aEvent.queryResult.fulfillmentText;
                if ( aEvent.queryResult.parameters ) {
                    for ( const property in aEvent.queryResult.parameters ) {
                        if ( aEvent.queryResult.parameters.hasOwnProperty( property )) {
                            intentData.conceptList.push({ concept: property, value: aEvent.queryResult.parameters[property], literal: aEvent.queryResult.parameters[property], confidence: 1 });
                        }
                    }
                }
                if ( aEvent.outputAudio ) {
                    intentData.audio = aEvent.outputAudio;
                    intentData.audioFormat = aEvent.outputAudioConfig.audioEncoding;
                }
            } else {
                // Mapping der Daten auf IntentData
                intentData.intent = aEvent.metadata.intentName;
                intentData.confidence = aEvent.score;
                // intentData.confidence = 1.0;
                // Konzepte kopieren, wenn vorhanden
                /**** TODO: Konzepte muessen in Google erst noch ausprobiert werden
                if ( aEvent[0].concepts ) {
                    console.log('NluNuance._getRecognitionIntentResult:', aEvent[0].concepts);
                    for ( let conceptName in aEvent[0].concepts ) {
                        let concept = { concept: conceptName, value: '', literal: ''}
                        console.log('NluNuance._getRecognitionIntentResult: concept = ', conceptName);
                        concept.value = aEvent[0].concepts[conceptName][0].value;
                        concept.literal = aEvent[0].concepts[conceptName][0].literal;
                        intentData.conceptList.push( concept );
                    }
                }
                ****/
                if ( aEvent.parameters ) {
                    for ( const property in aEvent.parameters ) {
                        if ( aEvent.parameters.hasOwnProperty( property )) {
                            intentData.conceptList.push({ concept: property, value: aEvent.parameters[property], literal: aEvent.parameters[property], confidence: 1 });
                        }
                    }
                }
                intentData.literal = aEvent.resolvedQuery;
                intentData.speech = aEvent.fulfillment.speech;
            }
        } catch ( aException ) {
            this.exception( '_getRecognitionIntentResult', aException );
            intentData.error = 'Exception:' + aException.message;
        }
        return intentData;
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    protected _startRecognition(): number {
        if ( !this.mPort ) {
            return -1;
        }
        return this.mPort.start( this.mPortName, CLOUD_ASRNLU_ACTION, { language: this._getNLULanguage()});
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    protected _startRecognitionIntent( aText: string ): number {
        if ( !this.mPort ) {
            return -1;
        }
        return this.mPort.start( this.mPortName, CLOUD_NLU_ACTION, { text: aText, language: this._getNLULanguage()});
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stopRecognition(): number {
        if ( !this.mPort ) {
            return -1;
        }
        return this.mPort.stop( this.mPortName );
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _abortRecognition(): number {
        return this._stopRecognition();
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    protected _isRecognitionRunning(): boolean {
        // console.log('TTSNuance._isSynthesisRunning');
        if ( this.mPort ) {
            // TODO: solange mehrere Actions verwendet werden in der NLU, wird die Action nicht uebergeben
            // return this.mPort.isRunning( NLU_NUANCE_NAME, NUANCE_NLU_ACTION );
            return this.mPort.isRunning( this.mPortName );
        }
        return false;
    }

}
