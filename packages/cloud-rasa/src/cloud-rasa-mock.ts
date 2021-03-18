/** @packageDocumentation
 * CloudRasaMock zum Testen des CloudRasa Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// port

import { Port, PortTransaction } from '@speech/core';


// cloud-rasa

import {
    CLOUDRASA_TYPE_NAME,
    CLOUDRASA_MOCK_NAME,
    CLOUDRASA_NLU_ACTION,
    CLOUDRASA_DEFAULT_LANGUAGE
} from './cloud-rasa-const';
import { CloudRasaConfigDataInterface } from './cloud-rasa-config-data.interface';


// Konstanten


// Asynchrones senden von Events nach 100 millisekunden

const RASAMOCK_CALLBACK_TIMEOUT = 100;


/**
 * Definiert die CloudRasaMock-Klasse
 */

export class CloudRasaMock extends Port {

    rasaNLUFlag = true;

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

    rasaAppId = '';
    rasaAppKey = '';
    rasaNluTag = '';
    rasaServerUrl = '';


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDRASA_MOCK_NAME, aRegisterFlag );
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
        return CLOUDRASA_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudRasaMock';
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    _checkCredentials( aOption: any ): boolean {
        if ( !aOption ) {
            return false;
        }

        if ( typeof aOption.rasaAppKey === 'string' ) {
            this.rasaAppKey = aOption.rasaAppKey;
        }

        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019

        if ( typeof aOption.rasaAppKey !== 'string' ) { return false; }
        if ( !aOption.rasaAppKey ) { return false; }

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

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.rasaDynamicCredentialsFlag === 'boolean' && aOption.rasaDynamicCredentialsFlag ) {
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

        this.rasaNLUFlag = true;

        if ( this.isErrorOutput()) {
            if ( this.rasaNLUFlag ) {
                console.log('CloudRasaMock: NLU ist vorhanden');
            } else {
                console.log('CloudRasaMock: NLU ist nicht vorhanden');
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

        this.rasaNLUFlag = false;

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
     * @param {CloudRasaConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudRasaConfigDataInterface ): number {
        // console.log('CloudRasaMock.setConfig: dynamicFlag = ', this.mDynamicCredentialsFlag);
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                if ( typeof aConfigData.rasaServerUrl === 'string' && aConfigData.rasaServerUrl ) {
                    this.rasaServerUrl = aConfigData.rasaServerUrl;
                }
                /****
                if ( typeof aConfigData.rasaAppId === 'string' && aConfigData.rasaAppId ) {
                    this.mCloudRasaConfig.appId = aConfigData.rasaAppId;
                }
                ****/
                if ( typeof aConfigData.rasaAppKey === 'string' && aConfigData.rasaAppKey ) {
                    this.rasaAppKey = aConfigData.rasaAppKey;
                }
                /****
                if ( typeof aConfigData.rasaNluTag === 'string' ) {
                    this.rasaNluTag = aConfigData.rasaNluTag;
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
     * @return {CloudRasaConfigDataInterface} aktuelle Portkonfigurationsdaten
     */

    getConfig(): CloudRasaConfigDataInterface {
        const configData: CloudRasaConfigDataInterface = {
            // rasaAppId: this.rasaAppId,
            rasaAppKey: this.rasaAppKey,
            rasaServerUrl: this.rasaServerUrl,
            // rasaNluTag: this.rasaNluTag
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
        if ( this.rasaAppKey ) {
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
            case CLOUDRASA_NLU_ACTION:
                result = this.rasaNLUFlag;
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
            case CLOUDRASA_NLU_ACTION:
                this.mTransaction = new PortTransaction( aPluginName, CLOUDRASA_NLU_ACTION );
                result = this._startNLU( this.mTransaction, option.text, option.language || CLOUDRASA_DEFAULT_LANGUAGE );
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
            case CLOUDRASA_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
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


    // NLU-Funktionen


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
        if ( !this.rasaNLUFlag ) {
            this.error( '_startNLU', 'keine Nuance NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart( aTransaction.plugin, aTransaction.type );
            const event = {
                intent: {
                    name: this.intentName,
                    confidence: this.intentConfidence
                },
                text: aText
            };
            aTransaction.result = event;
            console.log('CloudRasaMock._startNLU: _onResult wird aufgerufen');
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

}
