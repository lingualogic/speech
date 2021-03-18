/** @packageDocumentation
 * CloudAmazonMock zum Testen des CloudAmazon Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// core

import { Port, PortTransaction } from '@speech/core';


// amazon

import {
    CLOUDAMAZON_TYPE_NAME,
    CLOUDAMAZON_MOCK_NAME,
    CLOUDAMAZON_NLU_ACTION,
    CLOUDAMAZON_ASRNLU_ACTION,
    CLOUDAMAZON_ASR_ACTION,
    CLOUDAMAZON_TTS_ACTION,
    CLOUDAMAZON_DEFAULT_LANGUAGE,
    CLOUDAMAZON_DEFAULT_VOICE
} from './cloud-amazon-const';
import { CloudAmazonConfigDataInterface } from './cloud-amazon-config-data.interface';


// Konstanten


// Asynchrones senden von Events nach 100 millisekunden

const CLOUDAMAZONMOCK_CALLBACK_TIMEOUT = 100;


/**
 * Definiert die CloudAmazonMock-Klasse
 */

export class CloudAmazonMock extends Port {

    audioContextFlag = true;
    getUserMediaFlag = true;

    amazonNLUFlag = true;
    amazonASRFlag = true;
    amazonTTSFlag = true;

    // weitere Attribute

    disconnectFlag = true;
    defaultOptions = null;
    codec = '';

    intentName = 'TestIntent';
    intentConfidence = 1.0;

    mDynamicCredentialsFlag = false;
    mTransaction: PortTransaction = null;
    mRunningFlag = false;

    // Credentials

    amazonRegion = '';
    amazonIdentityPoolId = '';
    amazonNluTag = '';


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDAMAZON_MOCK_NAME, aRegisterFlag );
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
        return CLOUDAMAZON_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudAmazonMock';
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    _checkCredentials( aOption: any ): boolean {
        if ( !aOption ) {
            return false;
        }

        if ( typeof aOption.amazonRegion === 'string' ) {
            this.amazonRegion = aOption.amazonRegion;
        }

        if ( typeof aOption.amazonIdentityPoolId === 'string' ) {
            this.amazonIdentityPoolId = aOption.amazonIdentityPoolId;
        }

        if ( typeof aOption.amazonNluTag === 'string' ) {
            this.amazonNluTag = aOption.amazonNluTag;
        }

        // App-Parameter pruefen

        if ( typeof aOption.amazonRegion !== 'string' ) { return false; }
        if ( !aOption.amazonRegion ) { return false; }
        if ( typeof aOption.amazonIdentityPoolId !== 'string' ) { return false; }
        if ( !aOption.amazonIdentityPoolId ) { return false; }

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
        // console.log('CloudAmazonMock: init start', aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( (this as any).mInitFlag ) {
            this.error('init', 'Init bereits aufgerufen');
            return 0;
        }

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.amazonDynamicCredentialsFlag === 'boolean' && aOption.amazonDynamicCredentialsFlag ) {
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

        // TODO: soll spaeter in die Audio-Komponente
        // AudioContext

        if ( !this.audioContextFlag ) {
            // wenn der Audiokontext nicht vorhanden ist, gehen TTS und ASR nicht
            this.error( 'init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet' );
            this._onInit( -1 );
        }

        this.amazonNLUFlag = true;
        if ( this.audioContextFlag ) {
            this.amazonASRFlag = true;
            if ( this.getUserMediaFlag ) {
                this.amazonTTSFlag = true;
            }
        }

        if ( this.isErrorOutput()) {
            if ( this.amazonNLUFlag ) {
                console.log('CloudAmazonMock: NLU ist vorhanden');
            } else {
                console.log('CloudAmazonMock: NLU ist nicht vorhanden');
            }
            if ( this.amazonTTSFlag ) {
                console.log('CloudAmazonMock: TTS ist vorhanden');
            } else {
                console.log('CloudAmazonMock: TTS ist nicht vorhanden');
            }
            if ( this.amazonASRFlag ) {
                console.log('CloudAmazonMock: ASR ist vorhanden');
            } else {
                console.log('CloudAmazonMock: ASR ist nicht vorhanden');
            }
        }
        this._onInit( 0 );
        // console.log('CloudAmazonMock.init: ende');
        return super.init( aOption );
    }


    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done( aFreeFlag = false ): number {
        super.done();

        this.audioContextFlag = true;
        this.getUserMediaFlag = true;

        this.amazonNLUFlag = false;
        this.amazonASRFlag = false;
        this.amazonTTSFlag = false;

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
     * @param {CloudAmazonConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudAmazonConfigDataInterface ): number {
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                this.amazonRegion = aConfigData.amazonRegion;
                this.amazonIdentityPoolId = aConfigData.amazonIdentityPoolId;
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
     * @return {CloudAmazonConfigDataInterface} aktuelle Portkonfigurationsdaten
     */

    getConfig(): CloudAmazonConfigDataInterface {
        const configData: CloudAmazonConfigDataInterface = {
            amazonRegion: this.amazonRegion,
            amazonIdentityPoolId: this.amazonIdentityPoolId,
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
        if ( this.amazonRegion && this.amazonIdentityPoolId ) {
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
            case CLOUDAMAZON_NLU_ACTION:
                result = this.amazonNLUFlag;
                break;
            case CLOUDAMAZON_ASR_ACTION:
                result = this.amazonASRFlag;
                break;
            case CLOUDAMAZON_TTS_ACTION:
                result = this.amazonTTSFlag;
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
            case CLOUDAMAZON_NLU_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDAMAZON_NLU_ACTION );
                result = this._startNLU( this.mTransaction, option.text, option.language || CLOUDAMAZON_DEFAULT_LANGUAGE );
                break;
            case CLOUDAMAZON_ASRNLU_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDAMAZON_ASRNLU_ACTION );
                result = this._startASR( this.mTransaction, option.language || CLOUDAMAZON_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false );
                break;
            case CLOUDAMAZON_ASR_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDAMAZON_ASR_ACTION );
                result = this._startASR( this.mTransaction, option.language || CLOUDAMAZON_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false );
                break;
            case CLOUDAMAZON_TTS_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDAMAZON_TTS_ACTION );
                result = this._startTTS( this.mTransaction, option.text, option.language || CLOUDAMAZON_DEFAULT_LANGUAGE, option.voice || CLOUDAMAZON_DEFAULT_VOICE );
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
            case CLOUDAMAZON_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
            case CLOUDAMAZON_ASRNLU_ACTION:
            case CLOUDAMAZON_ASR_ACTION:
                result = this._stopASR( this.mTransaction );
                break;
            case CLOUDAMAZON_TTS_ACTION:
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
        if ( !this.amazonNLUFlag ) {
            this.error( '_startNLU', 'keine Nuance NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart( aTransaction.plugin, aTransaction.type );
            const event = [
                {
                    action: {
                        intent: {
                            value: this.intentName,
                            confidence: this.intentConfidence
                        }
                    },
                    literal: aText
                }
            ];
            aTransaction.result = event;
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
        if ( !this.amazonASRFlag ) {
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
        if ( !this.amazonASRFlag ) {
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
        if ( !this.amazonTTSFlag ) {
            this.error( '_startTTS', 'keine Nuance TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart( aTransaction.plugin, aTransaction.type );
            // asynchron TTS-Stop Event senden
            setTimeout( () => this._onStop( aTransaction.plugin, aTransaction.type ), CLOUDAMAZONMOCK_CALLBACK_TIMEOUT );
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
        if ( !this.amazonTTSFlag ) {
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
