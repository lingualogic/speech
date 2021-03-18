/** @packageDocumentation
 * CloudAmazonPort zur Verbindung des CloudAmazon Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von CloudAmazon zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// core

import { FactoryManager, Port, PortTransaction } from '@speech/core';


// common

import { FileHtml5Reader, AudioHtml5Reader, AudioContextManager, UserMediaFactory, USERMEDIA_FACTORY_NAME } from '@speech/common';


// cloud-amazon

import { CLOUDAMAZON_API_VERSION } from './cloud-amazon-version';
import {
    CLOUDAMAZON_TYPE_NAME,
    CLOUDAMAZON_PORT_NAME,
    CLOUDAMAZON_NLU_ACTION,
    CLOUDAMAZON_ASRNLU_ACTION,
    CLOUDAMAZON_ASR_ACTION,
    CLOUDAMAZON_TTS_ACTION,
    CLOUDAMAZON_DEFAULT_LANGUAGE,
    CLOUDAMAZON_DEFAULT_VOICE
} from './cloud-amazon-const';
import { CloudAmazonConfigDataInterface } from './cloud-amazon-config-data.interface';
import { CloudAmazonConfig } from './cloud-amazon-config';
import { CloudAmazonNetwork } from './net/cloud-amazon-network';
import { CloudAmazonConnect } from './net/cloud-amazon-connect';
// **** import { CloudAmazonNLU } from './device/cloud-amazon-nlu';
import { CloudAmazonASR } from './device/cloud-amazon-asr';
import { CloudAmazonTTS } from './device/cloud-amazon-tts';


// Konstanten


// Zeit die im Unlock-Event auf RESUME gewartet wird

const AUDIO_UNLOCK_TIMEOUT = 2000;

// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.

const CLOUDAMAZON_ACTION_TIMEOUT = 60000;


/**
 * Definiert die CloudAmazonPort-Klasse
 */

export class CloudAmazonPort extends Port {

    // externe Html5-Komponenten

    private mAudioContext: any = null;
    private mGetUserMedia: any = null;


    // externes CloudAmazon-Objekt

    private mCloudAmazonConfig: CloudAmazonConfig = null;
    private mCloudAmazonNetwork: CloudAmazonNetwork = null;
    private mCloudAmazonConnect: CloudAmazonConnect = null;
    private mCloudAmazonTTS: CloudAmazonTTS = null;
    private mCloudAmazonASR: CloudAmazonASR = null;
    // private mCloudAmazonNLU: CloudAmazonNLU = null;


    // weitere Attribute

    private mDynamicCredentialsFlag = false;
    private mTransaction: PortTransaction = null;
    private mRunningFlag = false;
    private mDefaultOptions: any = null;
    private mActionTimeoutId = 0;
    private mActionTimeout = CLOUDAMAZON_ACTION_TIMEOUT;


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDAMAZON_PORT_NAME, aRegisterFlag );
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
        return CLOUDAMAZON_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudAmazonPort';
    }


    getVersion(): string {
        return CLOUDAMAZON_API_VERSION;
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

        if ( typeof aOption.amazonRegion !== 'string' ) { return false; }
        if ( !aOption.amazonRegion ) { return false; }
        if ( typeof aOption.amazonIdentityPoolId !== 'string' ) { return false; }
        if ( !aOption.amazonIdentityPoolId ) { return false; }

        // App-Parameter sind vorhanden

        return true;
    }


    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */

    protected _initAllObject( aOption: any ): number {
        // console.log('CloudAmazonPort._initAllObject:', aOption);
        // innere Komponenten eintragen

        const fileReader = new FileHtml5Reader();
        fileReader.init();

        const audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });

        this.mCloudAmazonConfig = new CloudAmazonConfig( fileReader );
        if ( this.mCloudAmazonConfig.init( aOption ) !== 0 ) {
            return -1;
        }

        // Network-Anbindung erzeugen

        this.mCloudAmazonNetwork = new CloudAmazonNetwork();
        this.mCloudAmazonNetwork.onOnline = () => this._onOnline();
        this.mCloudAmazonNetwork.onOffline = () => this._onOffline();
        this.mCloudAmazonNetwork.onError = (aError: any) => this._onError( aError );
        if ( this.mCloudAmazonNetwork.init( aOption ) !== 0 ) {
            return -1;
        }

        this.mCloudAmazonConnect = new CloudAmazonConnect( this.mCloudAmazonConfig );
        this.mCloudAmazonConnect.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));

        // CloudAmazon-Komponenten erzeugen

        /****
        this.mCloudAmazonNLU = new CloudAmazonNLU( this.mCloudAmazonConfig, this.mCloudAmazonConnect );
        this.mCloudAmazonNLU.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mCloudAmazonNLU.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mCloudAmazonNLU.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mCloudAmazonNLU.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mCloudAmazonNLU.onClose = (aTransaction: PortTransaction) => this._onClose();
        ****/

        // pruefen auf Audiokontext, nur dann koennen TTS und ASR verwendet werden

        if ( this.mAudioContext ) {
            // this.mCloudAmazonTTS = new CloudAmazonTTS( this.mCloudAmazonConfig, this.mCloudAmazonConnect, this.mAudioContext );
            this.mCloudAmazonTTS = new CloudAmazonTTS( this.mCloudAmazonConfig, this.mCloudAmazonConnect, this.mAudioContext );
            this.mCloudAmazonTTS.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
            this.mCloudAmazonTTS.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
            this.mCloudAmazonTTS.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
            this.mCloudAmazonTTS.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
            this.mCloudAmazonTTS.onClose = (aTransaction: PortTransaction) => this._onClose();
            try {
                if ( this.mGetUserMedia ) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mCloudAmazonASR = new CloudAmazonASR( this.mCloudAmazonConfig, this.mCloudAmazonConnect, this.mAudioContext, this.mGetUserMedia, audioReader );
                    this.mCloudAmazonASR.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
                    this.mCloudAmazonASR.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
                    this.mCloudAmazonASR.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
                    this.mCloudAmazonASR.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
                    this.mCloudAmazonASR.onClose = (aTransaction: PortTransaction) => this._onClose();
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
     *      amazonAppId     - CloudAmazon Credentials fuer APP_ID
     *      amazonAppKey    - CloudAmazon Credentials fuer APP_KEY
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
        // console.log('CloudAmazonPort.init:', aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( this.isInit()) {
            this.error( 'init', 'Port ist bereits initialisiert');
            return 0;
        }

        // pruefen auf vorhandene AWS-Bibliothek

        if ( !(window as any).AWS ) {
            this.error( 'init', 'AWS-SDK ist nicht vorhanden');
            return -1;
        }

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.amazonDynamicCredentialsFlag === 'boolean' && aOption.amazonDynamicCredentialsFlag ) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        } else {
            // pruefen auf CloudAmazon App-Credientials Uebergabe

            if ( !this._checkCredentials( aOption )) {
                this.error( 'init', 'keine Region und/oder IdentityPoolId als Parameter uebergeben' );
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

        // Debug-Ausgabe fuer CloudAmazon-Komponenten

        if ( this.isErrorOutput()) {
            /****
            if ( this.mCloudAmazonNLU ) {
                console.log('CloudAmazonPort: NLU ist vorhanden');
            } else {
                console.log('CloudAmazonPort: NLU ist nicht vorhanden');
            }
            ****/
            if ( this.mCloudAmazonTTS ) {
                console.log('CloudAmazonPort: TTS ist vorhanden');
            } else {
                console.log('CloudAmazonPort: TTS ist nicht vorhanden');
            }
            if ( this.mCloudAmazonASR ) {
                console.log('CloudAmazonPort: ASR ist vorhanden');
            } else {
                console.log('CloudAmazonPort: ASR ist nicht vorhanden');
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

        // externes CloudAmazon-Objekt

        if ( this.mCloudAmazonNetwork ) {
            this.mCloudAmazonNetwork.done();
            this.mCloudAmazonNetwork = null;
        }
        if ( this.mCloudAmazonConnect ) {
            this.mCloudAmazonConnect.disconnect();
            this.mCloudAmazonConnect = null;
        }
        if ( this.mCloudAmazonConfig ) {
            this.mCloudAmazonConfig.done();
            this.mCloudAmazonConfig = null;
        }
        this.mCloudAmazonTTS = null;
        this.mCloudAmazonASR = null;
        // this.mCloudAmazonNLU = null;

        // Audiokontext schliessen
        if ( this.mAudioContext ) {
            // console.log('CloudAmazonPort.done: Close AudioContext');
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
        this.mActionTimeout = CLOUDAMAZON_ACTION_TIMEOUT;
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
        if ( this.mCloudAmazonConfig ) { this.mCloudAmazonConfig.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudAmazonNetwork) { this.mCloudAmazonNetwork.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudAmazonConnect ) { this.mCloudAmazonConnect.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudAmazonTTS ) { this.mCloudAmazonTTS.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudAmazonASR ) { this.mCloudAmazonASR.setErrorOutput( aErrorOutputFlag ); }
        // if ( this.mCloudAmazonNLU ) { this.mCloudAmazonNLU.setErrorOutput( aErrorOutputFlag ); }
    }



    // Timeout-Funktionen


    /**
     * Aktion wird abgebrochen
     */

    protected _breakAction(): void {
        // console.log('CloudAmazonPort._beakAction');
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
        // console.log('CloudAmazonPort._setActionTimeout');
        if ( this.mActionTimeoutId === 0 && this.mActionTimeout > 0 ) {
            this.mActionTimeoutId = window.setTimeout(() => this._breakAction(), this.mActionTimeout );
        }
    }


    /**
     * Timeout fuer Aktion loeschen
     */

    protected _clearActionTimeout(): void {
        // console.log('CloudAmazonPort._clearActionTimeout');
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
        // console.log('CloudAmazonPort._onOnline');
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
        // console.log('CloudAmazonPort._onOffline');
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
        // console.log('CloudAmazonPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        return super._onStop( aDest, aType );
    }


    // Audio-Funktionen


    /**
     * Versuch, AudioContext zu entsperren
     */

    protected _unlockAudio( aCallbackFunc: (aUnlockFlag: boolean) => void): void {
        // console.log('CloudAmazonPort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'running' ) {
                aCallbackFunc( true );
                return;
            }
            if ( this.mAudioContext.state === 'suspended' ) {
                // console.log('CloudAmazonPort._unlockAudio: start', this.mAudioContext.state);
                const timeoutId = setTimeout( () => aCallbackFunc( false ), AUDIO_UNLOCK_TIMEOUT );
                this.mAudioContext.resume().then(() => {
                    // console.log('CloudAmazonPort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout( timeoutId );
                    aCallbackFunc( true );
                }, (aError: any) => {
                    console.log('CloudAmazonPort._unlockAudio:', aError);
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
     * @param {CloudAmazonConfigDataInterface} aConfigData - Konfigurationsdaten { amazonAppKey: '', amazonAppId: '', amazonNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudAmazonConfigDataInterface ): number {
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                if ( typeof aConfigData.amazonRegion === 'string' && aConfigData.amazonRegion ) {
                    this.mCloudAmazonConfig.region = aConfigData.amazonRegion;
                }
                if ( typeof aConfigData.amazonIdentityPoolId === 'string' && aConfigData.amazonIdentityPoolId ) {
                    this.mCloudAmazonConfig.identityPoolId = aConfigData.amazonIdentityPoolId;
                    console.log('CloudAmazonPort.setConfig: neue Credentials eintragen ', aConfigData.amazonIdentityPoolId);
                    // neue CloudAmazon-Credentials eintragen
                    this.mCloudAmazonConnect.disconnect();
                    this.mCloudAmazonConnect.connect();
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
     * @return {CloudAmazonConfigDataInterface} aktuelle Portkonfigurationsdaten
     */

    getConfig(): CloudAmazonConfigDataInterface {
        const configData: CloudAmazonConfigDataInterface = {
            amazonRegion: this.mCloudAmazonConfig.region,
            amazonIdentityPoolId: this.mCloudAmazonConfig.identityPoolId
        };
        return configData;
    }


    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */

    isOnline(): boolean {
        if ( this.mCloudAmazonNetwork ) {
            return this.mCloudAmazonNetwork.isOnline();
        }
        return false;
    }


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean {
        if ( this.mCloudAmazonConnect ) {
            // console.log('CloudAmazonPort.isOpen:', this.mCloudAmazonConnect.isConnect());
            return this.mCloudAmazonConnect.isConnect();
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
        // console.log('CloudAmazonPort._checkOpen:');
        // pruefen, ob Netzwerk vorhanden ist
        if ( !this.isOnline()) {
            // console.log('CloudAmazonPort._checkOpen: kein Netz vorhanden');
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
        // console.log('CloudAmazonPort.open');
        if ( !this.mCloudAmazonConnect ) {
            this.error('open', 'kein CloudAmazonConnect vorhanden');
            return -1;
        }
        if ( this.isOpen()) {
            return 0;
        }
        const result = this.mCloudAmazonConnect.connect();
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
        // console.log('CloudAmazonPort.close');
        if ( this.mCloudAmazonConnect ) {
            this._onClose();
            return this.mCloudAmazonConnect.disconnect();
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
     * Pruefen, welche CloudAmazon-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        let result = false;
        switch ( aAction ) {
            /****
            case CLOUDAMAZON_NLU_ACTION:
                result = this.mCloudAmazonNLU ? true : false;
                break;
            ****/
            case CLOUDAMAZON_ASR_ACTION:
                result = this.mCloudAmazonASR ? true : false;
                break;
            case CLOUDAMAZON_TTS_ACTION:
                result = this.mCloudAmazonTTS ? true : false;
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
        // console.log('CloudAmazonPort.start:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if ( this.isRunning()) {
            this.error( 'start', 'Aktion laeuft bereits' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudAmazonConfig.isCredentials()) {
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
                // this.error( 'start', 'Port ist nicht geoeffnet' );
                return -1;
            }
            // Aktions-Timeout starten
            this._setActionTimeout();
            const option = aOption || {};
            // Aktion ausfuehren
            this.mPluginName = aPluginName;
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
        // console.log('CloudAmazonPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if ( !this.isRunning()) {
            // console.log('CloudAmazonPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'stop', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudAmazonConfig.isCredentials()) {
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
        // console.log('CloudAmazonPort.stop: Action = ', aAction);
        switch ( aAction ) {
            case CLOUDAMAZON_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
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
        this.mRunningFlag = false;
        return result;
    }


    // CloudAmazon-Funktionen


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initRecognition( aOption?: any ): number {
        // console.log('CloudAmazonPort._initRecognition: start');
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
        // console.log('CloudAmazonPort._initRecognition: end');
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
        // TODO: NLU muss noch implementiert werden
        /****
        if ( !aText ) {
            this.error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !aLanguage ) {
            this.error( '_startNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudAmazonNLU ) {
            this.error( '_startNLU', 'keine CloudAmazon NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage
            };
            return this.mCloudAmazonNLU.start( aTransaction, option );
        } catch ( aException ) {
            this.exception( '_startNLU', aException );
            return -1;
        }
        ****/
        this.error( '_startNLU', 'nicht implementiert' );
        return -1;
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
        // TODO: NLU muss noch implementiert werden
        /****
        if ( !this.mCloudAmazonNLU ) {
            this.error( '_stopNLU', 'keine CloudAmazon NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudAmazonNLU.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopNLU', aException );
            return -1;
        }
        ****/
        this.error( '_stopNLU', 'nicht implementiert' );
        return -1;
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
        // console.log('CloudAmazonPort._startASR');
        if ( !aLanguage ) {
            this.error( '_startASR', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudAmazonASR ) {
            this.error( '_startASR', 'keine CloudAmazon ASR-Anbindung vorhanden' );
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
            return this.mCloudAmazonASR.start( aTransaction, option );
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
        // console.log('CloudAmazonPort._stopASR');
        if ( !this.mCloudAmazonASR ) {
            this.error( '_stopASR', 'keine CloudAmazon ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudAmazonASR.stop( aTransaction );
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
        // console.log('CloudAmazonPort._startTTS:', aTransaction, aText, aLanguage, aVoice);
        if ( !aText ) {
            this.error( '_startTTS', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !this.mCloudAmazonTTS ) {
            this.error( '_startTTS', 'keine CloudAmazon TTS-Anbindung vorhanden' );
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
            // console.log('CloudAmazonPort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    this.mCloudAmazonTTS.start( aTransaction, option );
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
        // console.log('CloudAmazonPort._stopTTS', aTransaction);
        if ( !this.mCloudAmazonTTS ) {
            this.error( '_stopTTS', 'keine CloudAmazon TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudAmazonTTS.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopTTS', aException );
            return -1;
        }
    }

}
