/** @packageDocumentation
 * CloudGoogleMock zum Testen des CloudGoogle Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { Port, PortTransaction } from '@speech/core';


// cloud-google

import {
    CLOUDGOOGLE_TYPE_NAME,
    CLOUDGOOGLE_MOCK_NAME,
    CLOUDGOOGLE_NLU_ACTION,
    CLOUDGOOGLE_ASRNLU_ACTION,
    CLOUDGOOGLE_ASR_ACTION,
    CLOUDGOOGLE_TTS_ACTION,
    CLOUDGOOGLE_DEFAULT_LANGUAGE,
    CLOUDGOOGLE_DEFAULT_VOICE
} from './cloud-google-const';
import { CloudGoogleConfigDataInterface } from './cloud-google-config-data.interface';


// Konstanten


// Asynchrones senden von Events nach 100 millisekunden

const GOOGLEMOCK_CALLBACK_TIMEOUT = 100;


/**
 * Definiert die CloudGoogleMock-Klasse
 */

export class CloudGoogleMock extends Port {

    webSocketFlag = true;
    audioContextFlag = true;
    getUserMediaFlag = true;

    googleNLUFlag = true;
    googleASRFlag = true;
    googleTTSFlag = true;

    // weitere Attribute

    disconnectFlag = true;
    defaultOptions = null;
    codec = '';

    intentName = 'TestIntent';
    intentConfidence = 1.0;
    intentSpeech = 'TestSpeech';

    mDynamicCredentialsFlag = false;
    mTransaction: PortTransaction = null;
    mRunningFlag = false;

    // Credentials

    googleAppId = '';
    googleAppKey = '';
    googleNluTag = '';
    googleServerUrl = '';
    dialogflowTokenServerUrl = '';
    dialogflowProjectId = '';
    dialogflowSessionId = '';
    dialogflowEnvironmentName = '';


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDGOOGLE_MOCK_NAME, aRegisterFlag );
    }


    // Port-Funktionen


    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */

    isMock(): boolean {
        return true;
    }


    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return CLOUDGOOGLE_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudGoogleMock';
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    _checkCredentials( aOption: any ): boolean {
        if ( !aOption ) {
            return false;
        }

        if ( typeof aOption.googleAppKey === 'string' ) {
            this.googleAppKey = aOption.googleAppKey;
        }

        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019

        if ( typeof aOption.googleAppKey !== 'string' ) { return false; }
        if ( !aOption.googleAppKey ) { return false; }

        // App-Parameter sind vorhanden

        return true;
    }


    /**
     * initialisert den Port
     *
     * erlaubte optionale Parameter:
     *
     *      activeFlag      - legt fest, ob der Port zum Start aktiviert ist oder nicht
     *      errorOutputFlag - legt fest, ob die Fehlerausgabe auf der Konsole erfolgt
     *
     *
     * @param {any} aOption - optionale Parameter fuer die Konfiguration des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('NuanceMock: init start', aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( (this as any).mInitFlag ) {
            this.error('init', 'Init bereits aufgerufen');
            return 0;
        }

        // pruefen auf Error-OutputFlag (Port wird erst am Ende aufgerufen, daher wird das ErrorOutputFlag nicht vorher gesetzt)

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' && aOption.errorOutputFlag ) {
            this.setErrorOutputOn();
        } else {
            this.setErrorOutputOff();
        }

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.googleDynamicCredentialsFlag === 'boolean' && aOption.googleDynamicCredentialsFlag ) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
            this._checkCredentials( aOption );
        } else {
            // pruefen auf Nuance App-Credientials Uebergabe

            if ( !this._checkCredentials( aOption )) {
                if ( this.isErrorOutput() || ( aOption && aOption.errorOutputFlag )) {
                    this.error( 'init', 'keine AppId und/oder AppKey als Parameter uebergeben' );
                }
                return -1;
            }
        }

        // WebSocket

        if ( !this.webSocketFlag ) {
            // WEnn die WebSocket nicht vorhanden ist, geht gar nichts !
            this.error( 'init', 'keine WebSocket vorhanden' );
            this._onInit( -1 );
            return -1;
        }

        // TODO: soll spaeter in die Audio-Komponente
        // AudioContext

        if ( !this.audioContextFlag ) {
            // wenn der Audiokontext nicht vorhanden ist, gehen TTS und ASR nicht
            this.error( 'init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet' );
            this._onInit( -1 );
        }

        this.googleNLUFlag = true;
        if ( this.audioContextFlag ) {
            this.googleASRFlag = true;
            if ( this.getUserMediaFlag ) {
                this.googleTTSFlag = true;
            }
        }

        if ( this.isErrorOutput()) {
            if ( this.googleNLUFlag ) {
                console.log('CloudGoogleMock: NLU ist vorhanden');
            } else {
                console.log('CloudGoogleMock: NLU ist nicht vorhanden');
            }
            if ( this.googleTTSFlag ) {
                console.log('CloudGoogleMock: TTS ist vorhanden');
            } else {
                console.log('CloudGoogleMock: TTS ist nicht vorhanden');
            }
            if ( this.googleASRFlag ) {
                console.log('CloudGoogleMock: ASR ist vorhanden');
            } else {
                console.log('CloudGoogleMock: ASR ist nicht vorhanden');
            }
        }
        this._onInit( 0 );
        // console.log('NuanceMock.init: ende');
        return super.init( aOption );
    }


    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done( aFreeFlag = false ): number {
        super.done();

        this.webSocketFlag = true;
        this.audioContextFlag = true;
        this.getUserMediaFlag = true;

        this.googleNLUFlag = false;
        this.googleASRFlag = false;
        this.googleTTSFlag = false;

        // weitere Attribute

        this.disconnectFlag = true;
        this.defaultOptions = null;
        this.codec = '';
        this.mTransaction = null;
        this.mRunningFlag = false;
        return 0;
    }


    /**
     * setzt den Port wieder auf Defaultwerte und uebergebene optionale Parameter.
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    reset( aOption?: any ): number {
        this.mTransaction = null;
        this.mRunningFlag = false;
        return super.reset( aOption );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Stop aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */

    _onStop( aDest: string, aType: string ): number {
        // console.log('NuancePort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        return super._onStop( aDest, aType );
    }


    // Port-Funktionen


    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {CloudGoogleConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudGoogleConfigDataInterface ): number {
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                // this.googleAppId = aConfigData.googleAppId;
                this.googleAppKey = aConfigData.googleAppKey;
                this.googleServerUrl = aConfigData.googleServerUrl;
                this.dialogflowTokenServerUrl = aConfigData.dialogflowTokenServerUrl;
                this.dialogflowProjectId = aConfigData.dialogflowProjectId;
                this.dialogflowSessionId = aConfigData.dialogflowSessionId;
                this.dialogflowEnvironmentName = aConfigData.dialogflowEnvironmentName;
                /****
                if ( typeof aConfigData.googleNluTag === 'string' ) {
                    this.googleNluTag = aConfigData.googleNluTag;
                }
                ****/
                return 0;
            } catch ( aException ) {
                this.exception( 'setConfig', aException );
                return -1;
            }
        } else {
            this.error( 'setConfig', 'Keine dynamischen Credentials erlaubt');
            return -1;
        }
    }


    /**
     * Rueckgabe der aktuellen Port-Konfiguration
     *
     * @return {CloudGoogleConfigDataInterface} aktuelle Portkonfigurationsdaten
     */

    getConfig(): CloudGoogleConfigDataInterface {
        const configData: CloudGoogleConfigDataInterface = {
            // googleAppId: this.googleAppId,
            googleAppKey: this.googleAppKey,
            googleServerUrl: this.googleServerUrl,
            dialogflowTokenServerUrl: this.dialogflowTokenServerUrl,
            dialogflowProjectId: this.dialogflowProjectId,
            dialogflowSessionId: this.dialogflowSessionId,
            dialogflowEnvironmentName: this.dialogflowEnvironmentName
            // googleNluTag: this.googleNluTag
        };
        return configData;
    }


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean {
        return !this.disconnectFlag;
    }


    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */

    open( aOption?: any ): number {
        // console.log('NuanceMock._connect:', this.disconnectFlag);
        if ( !this.disconnectFlag ) {
            // Kein Fehler, Verbindung ist bereits vorhanden
            return 0;
        }
        this.disconnectFlag = false;
        // console.log('WebSocket Verbindung aufgebaut');
        this._onOpen();
        return 0;
    }


    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    close(): number {
        this.disconnectFlag = true;
        return 0;
    }


    /**
     * Pruefen auf beschaeftigten Port.
     *
     * @return {boolean} True, Port ist beschaeftigt, False sonst
     */

    isRunning(): boolean {
        return this.mRunningFlag;
    }


    _isCredentials(): boolean {
        if ( this.googleAppKey ) {
            return true;
        }
        return false;
    }

    /**
     * Pruefen, welche Nuance-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        let result = false;
        switch ( aAction ) {
            case CLOUDGOOGLE_NLU_ACTION:
                result = this.googleNLUFlag;
                break;
            case CLOUDGOOGLE_ASRNLU_ACTION:
            case CLOUDGOOGLE_ASR_ACTION:
                result = this.googleASRFlag;
                break;
            case CLOUDGOOGLE_TTS_ACTION:
                result = this.googleTTSFlag;
                break;
            default:
                break;
        }
        return result;
    }


    /**
     * Portaktion starten
     *
     * @param {string} aAction - optional auszufuehrende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aPluginName: string, aAction: string, aOption?: any ): number {
        // pruefen, ob eine Aktion bereits laeuft
        if ( this.isRunning()) {
            this.error( 'start', 'Aktion laeuft bereits' );
            return -1;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'start', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this._isCredentials()) {
            this.error( 'start', 'Port hat keine Credentials' );
            return -1;
        }
        // pruefen auf laufende Transaktion
        if ( this.mTransaction ) {
            this.error( 'start', 'andere Transaktion laeuft noch' );
            return -1;
        }
        const option = aOption || {};
        // Aktion ausfuehren
        this.mRunningFlag = true;
        let result = 0;
        switch ( aAction ) {
            case CLOUDGOOGLE_NLU_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDGOOGLE_NLU_ACTION );
                result = this._startNLU( this.mTransaction, option.text, option.language || CLOUDGOOGLE_DEFAULT_LANGUAGE );
                break;
            case CLOUDGOOGLE_ASRNLU_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDGOOGLE_ASRNLU_ACTION );
                result = this._startASR( this.mTransaction, option.language || CLOUDGOOGLE_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false );
                break;
            case CLOUDGOOGLE_ASR_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDGOOGLE_ASR_ACTION );
                result = this._startASR( this.mTransaction, option.language || CLOUDGOOGLE_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false );
                break;
            case CLOUDGOOGLE_TTS_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDGOOGLE_TTS_ACTION );
                result = this._startTTS( this.mTransaction, option.text, option.language || CLOUDGOOGLE_DEFAULT_LANGUAGE, option.voice || CLOUDGOOGLE_DEFAULT_VOICE );
                break;
            default:
                this.error( 'start', 'Keine gueltige Aktion uebergeben ' + aAction );
                result = -1;
                break;
        }
        return result;
    }


    /**
     * Portaktion beenden
     *
     * @param {string} aAction - optional zu beendende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop( aPluginName: string, aAction?: string, aOption?: any ): number {
        // console.log('NuancePort.stop:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if ( !this.isRunning()) {
            // console.log('NuancePort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'stop', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this._isCredentials()) {
            this.error( 'stop', 'Port hat keine Credentials' );
            return -1;
        }
        // pruefen auf laufende Transaktion
        if ( !this.mTransaction ) {
            this.error( 'stop', 'keine Transaktion vorhanden' );
            return -1;
        }
        // pruefen auf uebereinstimmende Transaktion
        if ( aPluginName !== this.mTransaction.plugin ) {
            this.error( 'stop', 'PluginName der Transaktion stimmt nicht ueberein ' + aPluginName + ' != ' + this.mTransaction.plugin );
            return -1;
        }
        if ( aAction ) {
            if ( aAction !== this.mTransaction.type ) {
                this.error( 'stop', 'Typ der Transaktion stimmt nicht ueberein ' + aAction + ' != ' + this.mTransaction.type );
                return -1;
            }
        } else {
            aAction = this.mTransaction.type;
        }
        let result = 0;
        // console.log('NuancePort.stop: Action = ', aAction);
        switch ( aAction ) {
            case CLOUDGOOGLE_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
            case CLOUDGOOGLE_ASRNLU_ACTION:
            case CLOUDGOOGLE_ASR_ACTION:
                result = this._stopASR( this.mTransaction );
                break;
            case CLOUDGOOGLE_TTS_ACTION:
                result = this._stopTTS( this.mTransaction );
                break;
            default:
                this.error( 'stop', 'Keine gueltige Aktion uebergeben ' + aAction );
                result = -1;
                break;
        }
        this.mTransaction = null;
        this.mRunningFlag = false;
        return result;
    }


    // Nuance-Funktionen



    // Text-Funktionen


    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _startNLU( aTransaction: PortTransaction, aText: string, aLanguage: string ): number {
        if ( !aText ) {
            this.error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !this.googleNLUFlag ) {
            this.error( '_startNLU', 'keine Nuance NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart( aTransaction.plugin, aTransaction.type );
            const event = {
                metadata: {
                    intentName: this.intentName
                },
                fulfillment: {
                    speech: this.intentSpeech
                },
                resolvedQuery: aText,
                score: this.intentConfidence
            };
            aTransaction.result = event;
            console.log('CloudGoogleMock._startNLU: _onResult wird aufgerufen');
            this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
            this._onStop( aTransaction.plugin, aTransaction.type );
            return 0;
        } catch ( aException ) {
            this.exception( '_startNLU', aException );
            return -1;
        }
    }


    /**
     * stoppt die Analyse
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopNLU( aTransaction: PortTransaction ): number {
        this._onStop( aTransaction.plugin, aTransaction.type );
        // kein Stop der NLU notwendig
        return 0;
    }


    // ASR-Funktionen


    /**
     * startet die Recognition
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    _startASR( aTransaction: PortTransaction, aLanguage: string, aAudioUrl: string, aUseNLUFlag = false, aProgressiveFlag = false ): number {
        // console.log('NuancePort._startASR');
        if ( !this.googleASRFlag ) {
            this.error( '_startASR', 'keine Nuance ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart( aTransaction.plugin, aTransaction.type );
            aTransaction.result = 'Testtext';
            this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
            this._onStop( aTransaction.plugin, aTransaction.type );
            return 0;
        } catch ( aException ) {
            this.exception( '_startASR', aException );
            return -1;
        }
    }


    /**
     * stoppt die Recognition
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopASR( aTransaction: PortTransaction ): number {
        if ( !this.googleASRFlag ) {
            this.error( '_stopASR', 'keine Nuance ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            this._onStop( aTransaction.plugin, aTransaction.type );
            return 0;
        } catch ( aException ) {
            this.exception( '_stopASR', aException );
            return -1;
        }
    }


    // TTS-Funktionen


    /**
     * startet die TTS
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _startTTS( aTransaction: PortTransaction, aText: string, aLanguage: string, aVoice: string ): number {
        if ( !aText ) {
            this.error( '_startTTS', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !this.googleTTSFlag ) {
            this.error( '_startTTS', 'keine Nuance TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart( aTransaction.plugin, aTransaction.type );
            // asynchron TTS-Stop Event senden
            setTimeout( () => this._onStop( aTransaction.plugin, aTransaction.type ), GOOGLEMOCK_CALLBACK_TIMEOUT );
            return 0;
        } catch ( aException ) {
            this.exception( '_startTTS', aException );
            return -1;
        }
    }


    /**
     * stoppt die TTS
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopTTS( aTransaction: PortTransaction ): number {
        if ( !this.googleTTSFlag ) {
            this.error( '_stopTTS', 'keine Nuance TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            this._onStop( aTransaction.plugin, aTransaction.type );
            return 0;
        } catch ( aException ) {
            this.exception( '_stopTTS', aException );
            return -1;
        }
    }

}
