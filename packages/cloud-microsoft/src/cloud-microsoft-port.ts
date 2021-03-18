/** @packageDocumentation
 * CloudMicrosoftPort zur Verbindung des CloudMicrosoft Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von CloudMicrosoft zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// core

import { FactoryManager, Port, PortTransaction } from '@speech/core';


// common

import { FileHtml5Reader, AudioHtml5Reader, AudioContextManager, UserMediaFactory, USERMEDIA_FACTORY_NAME } from '@speech/common';


// cloud-microsoft

import { CLOUDMICROSOFT_API_VERSION } from './cloud-microsoft-version';
import {
    CLOUDMICROSOFT_TYPE_NAME,
    CLOUDMICROSOFT_PORT_NAME,
    CLOUDMICROSOFT_NLU_ACTION,
    CLOUDMICROSOFT_ASRNLU_ACTION,
    CLOUDMICROSOFT_ASR_ACTION,
    CLOUDMICROSOFT_TTS_ACTION,
    CLOUDMICROSOFT_DEFAULT_LANGUAGE,
    CLOUDMICROSOFT_DEFAULT_VOICE,
    CLOUDMICROSOFT_DEFAULT_URL
} from './cloud-microsoft-const';
import { CloudMicrosoftConfigDataInterface } from './cloud-microsoft-config-data.interface';
import { CloudMicrosoftConfig } from './cloud-microsoft-config';
import { CloudMicrosoftNetwork } from './net/cloud-microsoft-network';
import { CloudMicrosoftConnect } from './net/cloud-microsoft-connect';
import { CloudMicrosoftNLU } from './device/cloud-microsoft-nlu';
import { CloudMicrosoftASR } from './device/cloud-microsoft-asr';
import { CloudMicrosoftTTS } from './device/cloud-microsoft-tts';


// Konstanten


// Zeit die im Unlock-Event auf RESUME gewartet wird

const AUDIO_UNLOCK_TIMEOUT = 2000;

// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.

const CLOUDMICROSOFT_ACTION_TIMEOUT = 60000;


/**
 * Definiert die CloudMicrosoftPort-Klasse
 */

export class CloudMicrosoftPort extends Port {

    // externe Html5-Komponenten

    private mAudioContext: any = null;
    private mGetUserMedia: any = null;


    // externes CloudMicrosoft-Objekt

    private mCloudMicrosoftConfig: CloudMicrosoftConfig = null;
    private mCloudMicrosoftNetwork: CloudMicrosoftNetwork = null;
    private mCloudMicrosoftConnect: CloudMicrosoftConnect = null;
    private mCloudMicrosoftTTS: CloudMicrosoftTTS = null;
    private mCloudMicrosoftASR: CloudMicrosoftASR = null;
    private mCloudMicrosoftNLU: CloudMicrosoftNLU = null;


    // weitere Attribute

    private mDynamicCredentialsFlag = false;
    private mTransaction: PortTransaction = null;
    private mRunningFlag = false;
    private mDefaultOptions: any = null;
    private mActionTimeoutId = 0;
    private mActionTimeout = CLOUDMICROSOFT_ACTION_TIMEOUT;


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDMICROSOFT_PORT_NAME, aRegisterFlag );
    }


    // Port-Funktionen


    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */

    isMock(): boolean {
        return false;
    }


    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return CLOUDMICROSOFT_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudMicrosoftPort';
    }


    getVersion(): string {
        return CLOUDMICROSOFT_API_VERSION;
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _checkCredentials( aOption: any ): boolean {
        if ( !aOption ) {
            return false;
        }

        // App-Parameter pruefen

        if ( typeof aOption.microsoftRegion !== 'string' ) { return false; }
        if ( !aOption.microsoftRegion ) { return false; }
        if ( typeof aOption.microsoftSubscriptionKey !== 'string' ) { return false; }
        if ( !aOption.microsoftSubscriptionKey ) { return false; }

        // App-Parameter sind vorhanden

        return true;
    }


    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */

    protected _initAllObject( aOption: any ): number {
        // console.log('CloudMicrosoftPort._initAllObject:', aOption);
        // innere Komponenten eintragen

        const fileReader = new FileHtml5Reader();
        fileReader.init();

        const audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });

        this.mCloudMicrosoftConfig = new CloudMicrosoftConfig( fileReader );
        if ( this.mCloudMicrosoftConfig.init( aOption ) !== 0 ) {
            return -1;
        }

        // Network-Anbindung erzeugen

        this.mCloudMicrosoftNetwork = new CloudMicrosoftNetwork();
        this.mCloudMicrosoftNetwork.onOnline = () => this._onOnline();
        this.mCloudMicrosoftNetwork.onOffline = () => this._onOffline();
        this.mCloudMicrosoftNetwork.onError = (aError: any) => this._onError( aError );
        if ( this.mCloudMicrosoftNetwork.init( aOption ) !== 0 ) {
            return -1;
        }

        this.mCloudMicrosoftConnect = new CloudMicrosoftConnect( this.mCloudMicrosoftConfig );
        this.mCloudMicrosoftConnect.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));

        // CloudMicrosoft-Komponenten erzeugen

        this.mCloudMicrosoftNLU = new CloudMicrosoftNLU( this.mCloudMicrosoftConfig, this.mCloudMicrosoftConnect );
        this.mCloudMicrosoftNLU.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mCloudMicrosoftNLU.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mCloudMicrosoftNLU.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mCloudMicrosoftNLU.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mCloudMicrosoftNLU.onClose = (aTransaction: PortTransaction) => this._onClose();

        // pruefen auf Audiokontext, nur dann koennen TTS und ASR verwendet werden

        if ( this.mAudioContext ) {
            this.mCloudMicrosoftTTS = new CloudMicrosoftTTS( this.mCloudMicrosoftConfig, this.mCloudMicrosoftConnect, this.mAudioContext );
            this.mCloudMicrosoftTTS.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
            this.mCloudMicrosoftTTS.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
            this.mCloudMicrosoftTTS.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
            this.mCloudMicrosoftTTS.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
            this.mCloudMicrosoftTTS.onClose = (aTransaction: PortTransaction) => this._onClose();
            try {
                if ( this.mGetUserMedia ) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mCloudMicrosoftASR = new CloudMicrosoftASR( this.mCloudMicrosoftConfig, this.mCloudMicrosoftConnect, this.mAudioContext, this.mGetUserMedia, audioReader );
                    this.mCloudMicrosoftASR.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
                    this.mCloudMicrosoftASR.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
                    this.mCloudMicrosoftASR.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
                    this.mCloudMicrosoftASR.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
                    this.mCloudMicrosoftASR.onClose = (aTransaction: PortTransaction) => this._onClose();
                }
            } catch ( aException ) {
                this.exception( '_initAllObject', aException );
            }
        }
        return 0;
    }


    /**
     * initialisert den Port
     *
     * Folgende Parameter muessen uebergeben werden, da sonst der Port nicht initalisiert wird:
     *
     *      microsoftAppId     - CloudMicrosoft Credentials fuer APP_ID
     *      microsoftAppKey    - CloudMicrosoft Credentials fuer APP_KEY
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
        // console.log('CloudMicrosoftPort.init:', aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( this.isInit()) {
            this.error( 'init', 'Port ist bereits initialisiert');
            return 0;
        }

        // pruefen auf vorhandene SppechSDK-Bibliothek

        if ( !(window as any).SpeechSDK ) {
            this.error( 'init', 'CloudMicrosoft SpeechSDK ist nicht vorhanden');
            return -1;
        }

        // pruefen auf dynamische Credentials

        // console.log('CloudMicrosoftPort.init: option = ', aOption);
        if ( aOption && typeof aOption.microsoftDynamicCredentialsFlag === 'boolean' && aOption.microsoftDynamicCredentialsFlag ) {
            // console.log('CloudMicrosoftPort.init: dynamic credentials eingeschaltet');
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        } else {
            // pruefen auf CloudMicrosoft App-Credientials Uebergabe

            if ( !this._checkCredentials( aOption )) {
                this.error( 'init', 'keine Region und/oder SubscriptionKey als Parameter uebergeben' );
                return -1;
            }
        }

        // AudioContext

        this.mAudioContext = AudioContextManager.getAudioContext();

        /* TODO: Umbau auf AudioContextManager
        const audioContextFactory = FactoryManager.get( AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory );
        if ( audioContextFactory ) {
            // TODO: eventuell sollte die AudoContextFactory gleich ein AudioContext-Objekt erzeugen ?
            const audioContextClass = audioContextFactory.create();
            if ( audioContextClass ) {
                this.mAudioContext = new audioContextClass();
            }
        }
        */

        // getUserMedia

        const getUserMediaFactory = FactoryManager.get( USERMEDIA_FACTORY_NAME, UserMediaFactory );
        if ( getUserMediaFactory ) {
            this.mGetUserMedia = getUserMediaFactory.create();
        }

        // innere Objekte erzeugen

        if ( this._initAllObject( aOption ) !== 0 ) {
            return -1;
        }

        // Initialisierung von Port

        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // Debug-Ausgabe fuer CloudMicrosoft-Komponenten

        if ( this.isErrorOutput()) {
            if ( this.mCloudMicrosoftNLU ) {
                console.log('CloudMicrosoftPort: NLU ist vorhanden');
            } else {
                console.log('CloudMicrosoftPort: NLU ist nicht vorhanden');
            }
            if ( this.mCloudMicrosoftTTS ) {
                console.log('CloudMicrosoftPort: TTS ist vorhanden');
            } else {
                console.log('CloudMicrosoftPort: TTS ist nicht vorhanden');
            }
            if ( this.mCloudMicrosoftASR ) {
                console.log('CloudMicrosoftPort: ASR ist vorhanden');
            } else {
                console.log('CloudMicrosoftPort: ASR ist nicht vorhanden');
            }
        }

        return 0;
    }


    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done(): number {
        super.done();
        // Timeout loeschen
        this._clearActionTimeout();

        // externes CloudMicrosoft-Objekt

        if ( this.mCloudMicrosoftNetwork ) {
            this.mCloudMicrosoftNetwork.done();
            this.mCloudMicrosoftNetwork = null;
        }
        if ( this.mCloudMicrosoftConnect ) {
            this.mCloudMicrosoftConnect.disconnect();
            this.mCloudMicrosoftConnect = null;
        }
        if ( this.mCloudMicrosoftConfig ) {
            this.mCloudMicrosoftConfig.done();
            this.mCloudMicrosoftConfig = null;
        }
        this.mCloudMicrosoftTTS = null;
        this.mCloudMicrosoftASR = null;
        this.mCloudMicrosoftNLU = null;

        // Audiokontext schliessen
        if ( this.mAudioContext ) {
            // console.log('CloudMicrosoftPort.done: Close AudioContext');
            // TODO: globalen AudioContext nicht mehr schliessen
            // this.mAudioContext.close();
            this.mAudioContext = null;
        }
        this.mGetUserMedia = null;

        // weitere Attribute

        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = CLOUDMICROSOFT_ACTION_TIMEOUT;
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


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        if ( this.mCloudMicrosoftConfig ) { this.mCloudMicrosoftConfig.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudMicrosoftNetwork) { this.mCloudMicrosoftNetwork.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudMicrosoftConnect ) { this.mCloudMicrosoftConnect.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudMicrosoftTTS ) { this.mCloudMicrosoftTTS.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudMicrosoftASR ) { this.mCloudMicrosoftASR.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudMicrosoftNLU ) { this.mCloudMicrosoftNLU.setErrorOutput( aErrorOutputFlag ); }
    }



    // Timeout-Funktionen


    /**
     * Aktion wird abgebrochen
     */

    protected _breakAction(): void {
        // console.log('CloudMicrosoftPort._beakAction');
        this.mActionTimeoutId = 0;
        if ( this.mTransaction ) {
            this.error( '_breakAction', 'Timeout fuer Action erreicht' );
            this._onStop( this.mTransaction.plugin, this.mTransaction.type );
        }
    }


    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */

    protected _setActionTimeout(): void {
        // console.log('CloudMicrosoftPort._setActionTimeout');
        if ( this.mActionTimeoutId === 0 && this.mActionTimeout > 0 ) {
            this.mActionTimeoutId = window.setTimeout(() => this._breakAction(), this.mActionTimeout );
        }
    }


    /**
     * Timeout fuer Aktion loeschen
     */

    protected _clearActionTimeout(): void {
        // console.log('CloudMicrosoftPort._clearActionTimeout');
        if ( this.mActionTimeoutId > 0 ) {
            clearTimeout( this.mActionTimeoutId );
            this.mActionTimeoutId = 0;
        }
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Online aufrufen
     *
     * @private
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onOnline(): number {
        // console.log('CloudMicrosoftPort._onOnline');
        return 0;
    }


    /**
     * Ereignisfunktion fuer Offline aufrufen
     *
     * @private
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onOffline(): number {
        // console.log('CloudMicrosoftPort._onOffline');
        return 0;
    }


    /**
     * Ereignisfunktion fuer Stop aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onStop( aDest: string, aType: string ): number {
        // console.log('CloudMicrosoftPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // StopEvent versenden
        const result = super._onStop( aDest, aType );
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        return result;
    }


    // Audio-Funktionen


    /**
     * Versuch, AudioContext zu entsperren
     */

    protected _unlockAudio( aCallbackFunc: (aUnlockFlag: boolean) => void): void {
        // console.log('CloudMicrosoftPort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'running' ) {
                aCallbackFunc( true );
                return;
            }
            if ( this.mAudioContext.state === 'suspended' ) {
                // console.log('CloudMicrosoftPort._unlockAudio: start', this.mAudioContext.state);
                const timeoutId = setTimeout( () => aCallbackFunc( false ), AUDIO_UNLOCK_TIMEOUT );
                this.mAudioContext.resume().then(() => {
                    // console.log('CloudMicrosoftPort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout( timeoutId );
                    aCallbackFunc( true );
                }, (aError: any) => {
                    console.log('CloudMicrosoftPort._unlockAudio:', aError);
                    clearTimeout( timeoutId );
                    aCallbackFunc( false );
                });
            } else {
                aCallbackFunc( false );
            }
        } else {
            aCallbackFunc( false );
        }
    }


    // Port-Funktionen


    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {CloudMicrosoftConfigDataInterface} aConfigData - Konfigurationsdaten { microsoftAppKey: '', microsoftAppId: '', microsoftNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudMicrosoftConfigDataInterface ): number {
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                if ( typeof aConfigData.microsoftRegion === 'string' && aConfigData.microsoftRegion ) {
                    this.mCloudMicrosoftConfig.region = aConfigData.microsoftRegion;
                }
                if ( typeof aConfigData.microsoftSubscriptionKey === 'string' && aConfigData.microsoftSubscriptionKey ) {
                    this.mCloudMicrosoftConfig.subscriptionKey = aConfigData.microsoftSubscriptionKey;
                    console.log('CloudMicrosoftPort.setConfig: neue Credentials eintragen ', aConfigData.microsoftSubscriptionKey);
                    // neue CloudMicrosoft-Credentials eintragen
                    this.mCloudMicrosoftConnect.disconnect();
                    this.mCloudMicrosoftConnect.connect();
                }
                if ( typeof aConfigData.microsoftLuisEndpoint === 'string' && aConfigData.microsoftLuisEndpoint ) {
                    this.mCloudMicrosoftConfig.luisEndpoint = aConfigData.microsoftLuisEndpoint;
                }
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
     * @return {CloudMicrosoftConfigDataInterface} aktuelle Portkonfigurationsdaten
     */

    getConfig(): CloudMicrosoftConfigDataInterface {
        const configData: CloudMicrosoftConfigDataInterface = {
            microsoftRegion: this.mCloudMicrosoftConfig.region,
            microsoftSubscriptionKey: this.mCloudMicrosoftConfig.subscriptionKey,
            microsoftLuisEndpoint: this.mCloudMicrosoftConfig.luisEndpoint
        };
        return configData;
    }


    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */

    isOnline(): boolean {
        if ( this.mCloudMicrosoftNetwork ) {
            return this.mCloudMicrosoftNetwork.isOnline();
        }
        return false;
    }


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean {
        if ( this.mCloudMicrosoftConnect ) {
            // console.log('CloudMicrosoftPort.isOpen:', this.mCloudMicrosoftConnect.isConnect());
            return this.mCloudMicrosoftConnect.isConnect();
        }
        return false;
    }


    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */

    protected _checkOpen( aOpenCallbackFunc: (aOpenFlag: boolean) => void ): number {
        // console.log('CloudMicrosoftPort._checkOpen:');
        // pruefen, ob Netzwerk vorhanden ist
        if ( !this.isOnline()) {
            // console.log('CloudMicrosoftPort._checkOpen: kein Netz vorhanden');
            this.error( '_checkOpen', 'kein Netz vorhanden' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // oeffnen des Ports
        const result = this.open();
        if ( result !== 0 ) {
            aOpenCallbackFunc( false );
        } else {
            aOpenCallbackFunc( true );
        }
        return result;
    }


    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    open( aOption?: any ): number {
        // console.log('CloudMicrosoftPort.open');
        if ( !this.mCloudMicrosoftConnect ) {
            this.error('open', 'kein CloudMicrosoftConnect vorhanden');
            return -1;
        }
        if ( this.isOpen()) {
            return 0;
        }
        const result = this.mCloudMicrosoftConnect.connect();
        if ( result === 0 ) {
            this._onOpen();
        }
        return result;
    }


    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    close(): number {
        if ( !this.isOpen()) {
            return 0;
        }
        // console.log('CloudMicrosoftPort.close');
        if ( this.mCloudMicrosoftConnect ) {
            this._onClose();
            return this.mCloudMicrosoftConnect.disconnect();
        }
        return 0;
    }


    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */

    getPluginName(): string {
        if ( this.mTransaction ) {
            return this.mTransaction.plugin;
        }
        return '';
    }


    /**
     * Rueckgabe des Aktionsnames, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} ActionName oder leerer String
     */

    getActionName(): string {
        if ( this.mTransaction ) {
            return this.mTransaction.type;
        }
        return '';
    }


    /**
     * Pruefen, ob Port eine Aufgabe ausfuehrt, zu einem bestimmten Plugin
     * und zu einer bestimmten Aufgabe.
     *
     * @param {string} aPluginName - optionaler Pluginname
     * @param {string} aAction - optionaler Aktionsname
     *
     * @return {boolean} True, wenn Port beschaeftigt ist, False sonst
     */

    isRunning( aPluginName?: string, aAction?: string ): boolean {
        if ( !aPluginName && !aAction ) {
            return this.mRunningFlag;
        }
        if ( aPluginName === this.getPluginName()) {
            if ( !aAction ) {
                return this.mRunningFlag;
            } else if ( aAction === this.getActionName()) {
                return this.mRunningFlag;
            }
        }
        return false;
    }


    /**
     * Pruefen, welche CloudMicrosoft-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        let result = false;
        switch ( aAction ) {
            case CLOUDMICROSOFT_NLU_ACTION:
                result = this.mCloudMicrosoftNLU ? true : false;
                break;
            case CLOUDMICROSOFT_ASR_ACTION:
                result = this.mCloudMicrosoftASR ? true : false;
                break;
            case CLOUDMICROSOFT_TTS_ACTION:
                result = this.mCloudMicrosoftTTS ? true : false;
                break;
            default:
                break;
        }
        return result;
    }


    /**
     * Dient zum Setzen eines Timeouts, um Aktionen abzubrechen.
     * Bei Timeout 0 wird kein Timeout gesetzt.
     *
     * @param aTimeout - Zeit in Millisekunden bis die Aktion abgebrochen wird oder 0 fuer keinen Timeout
     */

    setActionTimeout( aTimeout: number ): void {
        this.mActionTimeout = aTimeout;
    }


    /**
     * Portaktion starten
     *
     * @param (string) aPluginName - Name des Aufrufers
     * @param {string} aAction - optional auszufuehrende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aPluginName: string, aAction?: string, aOption?: any ): number {
        // console.log('CloudMicrosoftPort.start:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if ( this.isRunning()) {
            this.error( 'start', 'Aktion laeuft bereits' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudMicrosoftConfig.isCredentials()) {
            this.error( 'start', 'Port hat keine Credentials' );
            return -1;
        }
        // pruefen auf laufende Transaktion
        if ( this.mTransaction ) {
            this.error( 'start', 'andere Transaktion laeuft noch' );
            return -1;
        }
        // pruefen, ob der Port geoeffnet ist
        return this._checkOpen((aOpenFlag: boolean) => {
            if ( !aOpenFlag ) {
                // TODO: wird nicht benoetigt, da in _checkOpen die Fehler erzeugt werden
                // this._error( 'start', 'Port ist nicht geoeffnet' );
                return -1;
            }
            // Aktions-Timeout starten
            this._setActionTimeout();
            const option = aOption || {};
            // Aktion ausfuehren
            this.mPluginName = aPluginName;
            // console.log('CloudMicrosoftPort.start: RunningFlag=', this.mRunningFlag);
            this.mRunningFlag = true;
            let result = 0;
            switch ( aAction ) {
                case CLOUDMICROSOFT_NLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDMICROSOFT_NLU_ACTION );
                    result = this._startNLU( this.mTransaction, option.text, option.language || CLOUDMICROSOFT_DEFAULT_LANGUAGE );
                    break;
                case CLOUDMICROSOFT_ASRNLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDMICROSOFT_ASRNLU_ACTION );
                    result = this._startASR( this.mTransaction, option.language || CLOUDMICROSOFT_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false );
                    break;
                case CLOUDMICROSOFT_ASR_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDMICROSOFT_ASR_ACTION );
                    result = this._startASR( this.mTransaction, option.language || CLOUDMICROSOFT_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false );
                    break;
                case CLOUDMICROSOFT_TTS_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDMICROSOFT_TTS_ACTION );
                    result = this._startTTS( this.mTransaction, option.text, option.language || CLOUDMICROSOFT_DEFAULT_LANGUAGE, option.voice || CLOUDMICROSOFT_DEFAULT_VOICE );
                    break;
                default:
                    // Aktions-Timeout loeschen, keine Transaktion gestartet
                    this._clearActionTimeout();
                    this.error( 'start', 'Keine gueltige Aktion uebergeben ' + aAction );
                    result = -1;
                    break;
            }
            return result;
        });
    }


    /**
     * Portaktion beenden
     *
     * @param (string) aPluginName - Name des Aufrufers
     * @param {string} aAction - optional zu beendende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop( aPluginName: string, aAction?: string, aOption?: any ): number {
        // console.log('CloudMicrosoftPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if ( !this.isRunning()) {
            // console.log('CloudMicrosoftPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'stop', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudMicrosoftConfig.isCredentials()) {
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
        // console.log('CloudMicrosoftPort.stop: Action = ', aAction);
        switch ( aAction ) {
            case CLOUDMICROSOFT_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
            case CLOUDMICROSOFT_ASR_ACTION:
                result = this._stopASR( this.mTransaction );
                break;
            case CLOUDMICROSOFT_TTS_ACTION:
                result = this._stopTTS( this.mTransaction );
                break;
            default:
                this.error( 'stop', 'Keine gueltige Aktion uebergeben ' + aAction );
                result = -1;
                break;
        }
        // console.log('CloudMicrosoftPort.stop: RunningFlag=', this.mRunningFlag);
        this.mRunningFlag = false;
        return result;
    }


    // CloudMicrosoft-Funktionen


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initRecognition( aOption?: any ): number {
        // console.log('CloudMicrosoftPort._initRecognition: start');
        this.mDefaultOptions = {
            onopen: () => {
                console.log( 'Websocket Opened' );
                // this._onRecognitionOpen();
            },

            onclose: () => {
                console.log( 'Websocket Closed' );
                this._onClose();
            },

            onerror: (error: any) => {
                console.error(error);
                this._onError( error );
            }
        };
        // console.log('CloudMicrosoftPort._initRecognition: end');
        return 0;
    }


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

    protected _startNLU( aTransaction: PortTransaction, aText: string, aLanguage: string ): number {
        if ( !aText ) {
            this.error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !aLanguage ) {
            this.error( '_startNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudMicrosoftNLU ) {
            this.error( '_startNLU', 'keine CloudMicrosoft NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage
            };
            return this.mCloudMicrosoftNLU.start( aTransaction, option );
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

    protected _stopNLU( aTransaction: PortTransaction ): number {
        if ( !this.mCloudMicrosoftNLU ) {
            this.error( '_stopNLU', 'keine CloudMicrosoft NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudMicrosoftNLU.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopNLU', aException );
            return -1;
        }
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

    protected _startASR( aTransaction: PortTransaction, aLanguage: string, aAudioUrl: string, aUseNLUFlag = false, aProgressiveFlag = false ): number {
        // console.log('CloudMicrosoftPort._startASR');
        if ( !aLanguage ) {
            this.error( '_startASR', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudMicrosoftASR ) {
            this.error( '_startASR', 'keine CloudMicrosoft ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                language: aLanguage,
                nlu: aUseNLUFlag,
                progressive: aProgressiveFlag
            };
            // pruefen auf Audiodatei
            if ( aAudioUrl ) {
                option['audioURL'] = aAudioUrl;
            }
            return this.mCloudMicrosoftASR.start( aTransaction, option );
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

    protected _stopASR( aTransaction: PortTransaction ): number {
        // console.log('CloudMicrosoftPort._stopASR');
        if ( !this.mCloudMicrosoftASR ) {
            this.error( '_stopASR', 'keine CloudMicrosoft ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudMicrosoftASR.stop( aTransaction );
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

    protected _startTTS( aTransaction: PortTransaction, aText: string, aLanguage: string, aVoice: string ): number {
        // console.log('CloudMicrosoftPort._startTTS:', aTransaction, aText, aLanguage, aVoice);
        if ( !aText ) {
            this.error( '_startTTS', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !this.mCloudMicrosoftTTS ) {
            this.error( '_startTTS', 'keine CloudMicrosoft TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage,
                voice: aVoice
            };
            // TODO: Provisorische Version von AudioContext.resume(), muss in Audio-Komponmente untergebracht werden!
            // pruefen auf AutoContext Zustand suspended
            // console.log('CloudMicrosoftPort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    this.mCloudMicrosoftTTS.start( aTransaction, option );
                } else {
                    this.error( '_startTTS', 'AudioContext ist nicht entsperrt' );
                    this._onStop( aTransaction.plugin, aTransaction.type );
                }
            });
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

    protected _stopTTS( aTransaction: PortTransaction ): number {
        // console.log('CloudMicrosoftPort._stopTTS', aTransaction);
        if ( !this.mCloudMicrosoftTTS ) {
            this.error( '_stopTTS', 'keine CloudMicrosoft TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudMicrosoftTTS.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopTTS', aException );
            return -1;
        }
    }

}
