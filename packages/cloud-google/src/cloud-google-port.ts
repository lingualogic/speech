/** @packageDocumentation
 * CloudGooglePort zur Verbindung des CloudGoogle Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von CloudGoogle zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { FactoryManager, Port, PortTransaction } from '@speech/core';


// common

import { FileHtml5Reader, AudioHtml5Reader, AudioContextManager, UserMediaFactory, USERMEDIA_FACTORY_NAME } from '@speech/common';


// cloud-google

import { CLOUDGOOGLE_API_VERSION } from './cloud-google-version';
import {
    CLOUDGOOGLE_TYPE_NAME,
    CLOUDGOOGLE_PORT_NAME,
    CLOUDGOOGLE_NLU_ACTION,
    CLOUDGOOGLE_ASRNLU_ACTION,
    CLOUDGOOGLE_ASR_ACTION,
    CLOUDGOOGLE_TTS_ACTION,
    CLOUDGOOGLE_DEFAULT_LANGUAGE,
    CLOUDGOOGLE_DEFAULT_VOICE,
    CLOUDGOOGLE_DEFAULT_URL,
    CLOUDGOOGLE_NLU2_FLAG
} from './cloud-google-const';
import { CloudGoogleConfigDataInterface } from './cloud-google-config-data.interface';
import { CloudGoogleConfig } from './cloud-google-config';
import { CloudGoogleNetwork } from './net/cloud-google-network';
import { CloudGoogleWebSocket } from './net/cloud-google-websocket';
import { CloudGoogleConnect } from './net/cloud-google-connect';
import { CloudGoogleNLU } from './device/cloud-google-nlu';
import { CloudGoogleNLU2 } from './device/cloud-google-nlu2';
// **** import { CloudGoogleASR } from './device/cloud-google-asr';
import { CloudGoogleASR2 } from './device/cloud-google-asr2';
// **** import { CloudGoogleTTS } from './device/cloud-google-tts';
import { CloudGoogleTTS2 } from './device/cloud-google-tts2';


// Konstanten


// Zeit die im Unlock-Event auf RESUME gewartet wird

const AUDIO_UNLOCK_TIMEOUT = 2000;

// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.

const CLOUDGOOGLE_ACTION_TIMEOUT = 60000;


/**
 * Definiert die CloudGooglePort-Klasse
 */

export class CloudGooglePort extends Port {

    // externe Html5-Komponenten

    private mAudioContext: any = null;
    private mGetUserMedia: any = null;


    // externes CloudGoogle-Objekt

    private mCloudGoogleServerFlag = false;
    private mCloudGoogleConfig: CloudGoogleConfig = null;
    private mCloudGoogleNetwork: CloudGoogleNetwork = null;
    private mCloudGoogleWebSocket: CloudGoogleWebSocket = null;
    private mCloudGoogleConnect: CloudGoogleConnect = null;
    private mCloudGoogleTTS: CloudGoogleTTS2 = null;
    private mCloudGoogleASR: CloudGoogleASR2 = null;
    private mCloudGoogleNLU: CloudGoogleNLU = null;
    private mCloudGoogleNLU2: CloudGoogleNLU2 = null;
    private mCloudGoogleNLU2Flag = CLOUDGOOGLE_NLU2_FLAG;

    // weitere Attribute

    private mDynamicCredentialsFlag = false;
    private mTransaction: PortTransaction = null;
    private mRunningFlag = false;
    private mDefaultOptions: any = null;
    private mActionTimeoutId = 0;
    private mActionTimeout = CLOUDGOOGLE_ACTION_TIMEOUT;


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDGOOGLE_PORT_NAME, aRegisterFlag );
    }


    // Port-Funktionen


    /**
     * pruefen auf Server-Verbindung
     *
     * @return {boolean} true, Port hat Server-Verbindung, false sonst
     */

    isServer() {
        return this.mCloudGoogleServerFlag;
    }


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
        return CLOUDGOOGLE_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudGooglePort';
    }


    getVersion(): string {
        return CLOUDGOOGLE_API_VERSION;
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _checkCredentials( aOption: any ): boolean {
        // console.log('CloudGooglePort._checkCredentials: ', aOption);
        if ( !aOption ) {
            return false;
        }

        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019

        let nlu2Flag = true;

        if ( typeof aOption.dialogflowTokenServerUrl !== 'string' ) { nlu2Flag = false; }
        if ( !aOption.dialogflowTokenServerUrl ) { nlu2Flag = false; }

        if ( typeof aOption.dialogflowProjectId !== 'string' ) { nlu2Flag = false; }
        if ( !aOption.dialogflowProjectId ) { nlu2Flag = false; }

        // console.log( 'CloudGooglePort._checkCredentials: NLU2 = ', nlu2Flag);

        if ( !nlu2Flag ) {
            if ( typeof aOption.googleAppKey !== 'string' ) { return false; }
            if ( !aOption.googleAppKey ) { return false; }
        }

        this.mCloudGoogleNLU2Flag = nlu2Flag;

        // App-Parameter sind vorhanden

        return true;
    }


    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */

    protected _initAllObject( aOption: any ): number {
        // console.log('CloudGooglePort._initAllObject:', aOption);
        // innere Komponenten eintragen

        const fileReader = new FileHtml5Reader();
        fileReader.init();

        const audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });

        this.mCloudGoogleConfig = new CloudGoogleConfig( fileReader );
        if ( this.mCloudGoogleConfig.init( aOption ) !== 0 ) {
            return -1;
        }

        if ( this.mCloudGoogleConfig.isErrorOutput() !== this.isErrorOutput()) {
            this.mCloudGoogleConfig.setErrorOutput( this.isErrorOutput());
        }

        // Network-Anbindung erzeugen

        this.mCloudGoogleNetwork = new CloudGoogleNetwork();
        this.mCloudGoogleNetwork.onOnline = () => this._onOnline();
        this.mCloudGoogleNetwork.onOffline = () => this._onOffline();
        this.mCloudGoogleNetwork.onError = (aError: any) => this._onError( aError );
        if ( this.mCloudGoogleNetwork.init( aOption ) !== 0 ) {
            return -1;
        }

        // pruefen auf vorhandenen Server

        if ( this.isServer()) {
            // WebSocket-Anbindung erzeugen und WebSocket API pruefen

            this.mCloudGoogleWebSocket = new CloudGoogleWebSocket();
            this.mCloudGoogleWebSocket.onOpen = (aUrl: string) => this._onOpen();
            this.mCloudGoogleWebSocket.onClose = () => this._onClose();
            this.mCloudGoogleWebSocket.onError = (aError: any) => this._onError( aError );
            if ( this.mCloudGoogleWebSocket.init( aOption ) !== 0 ) {
                return -1;
            }
        }

        this.mCloudGoogleConnect = new CloudGoogleConnect( this.mCloudGoogleConfig, this.mCloudGoogleWebSocket );

        // CloudGoogle-Komponenten erzeugen

        this.mCloudGoogleNLU = new CloudGoogleNLU( this.mCloudGoogleConfig, this.mCloudGoogleConnect );
        this.mCloudGoogleNLU.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU.onClose = (aTransaction: PortTransaction) => this._onClose();

        this.mCloudGoogleNLU2 = new CloudGoogleNLU2( this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext, this.mGetUserMedia );
        this.mCloudGoogleNLU2.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU2.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU2.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU2.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mCloudGoogleNLU2.onClose = (aTransaction: PortTransaction) => this._onClose();

        // pruefen auf Server und Audiokontext, nur dann koennen TTS und ASR verwendet werden

        if ( this.mAudioContext ) {
            // laden der CloudGoogle-TTS2 mit Tokenserver
            // this.mCloudGoogleTTS = new CloudGoogleTTS( this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext );
            this.mCloudGoogleTTS = new CloudGoogleTTS2( this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext );
            this.mCloudGoogleTTS.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
            this.mCloudGoogleTTS.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
            this.mCloudGoogleTTS.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
            this.mCloudGoogleTTS.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
            this.mCloudGoogleTTS.onClose = (aTransaction: PortTransaction) => this._onClose();
            // console.log('CloudGooglePort._initAllObject: googleTTS = ', this.mCloudGoogleTTS);
            try {
                // if ( this.isServer() && this.mGetUserMedia ) {
                if ( this.mGetUserMedia ) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mCloudGoogleASR = new CloudGoogleASR2( this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext, this.mGetUserMedia, audioReader );
                    this.mCloudGoogleASR.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
                    this.mCloudGoogleASR.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
                    this.mCloudGoogleASR.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
                    this.mCloudGoogleASR.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
                    this.mCloudGoogleASR.onClose = (aTransaction: PortTransaction) => this._onClose();
                   // console.log('CloudGooglePort._initAllObject: googleASR = ', this.mCloudGoogleASR);
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
     *      googleAppId     - CloudGoogle Credentials fuer APP_ID
     *      googleAppKey    - CloudGoogle Credentials fuer APP_KEY
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
        // console.log('CloudGooglePort.init:', aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( this.isInit()) {
            this.error( 'init', 'Port ist bereits initialisiert');
            return 0;
        }

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.googleDynamicCredentialsFlag === 'boolean' && aOption.googleDynamicCredentialsFlag ) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        } else {
            // pruefen auf CloudGoogle App-Credientials Uebergabe

            if ( !this._checkCredentials( aOption )) {
                this.error( 'init', 'kein AppKey als Parameter uebergeben' );
                return -1;
            }
        }

        // pruefen auf Server-Flag

        if ( aOption && typeof aOption.googleServerFlag === 'boolean' && aOption.googleServerFlag ) {
            this.mCloudGoogleServerFlag = true;
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

        // Debug-Ausgabe fuer CloudGoogle-Komponenten

        if ( this.isErrorOutput()) {
            if ( this.mCloudGoogleNLU ) {
                console.log('CloudGooglePort: NLU ist vorhanden');
            } else {
                console.log('CloudGooglePort: NLU ist nicht vorhanden');
            }
            if ( this.mCloudGoogleNLU2 ) {
                console.log('CloudGooglePort: NLU2 ist vorhanden');
            } else {
                console.log('CloudGooglePort: NLU2 ist nicht vorhanden');
            }
            if ( this.mCloudGoogleTTS ) {
                console.log('CloudGooglePort: TTS ist vorhanden');
            } else {
                console.log('CloudGooglePort: TTS ist nicht vorhanden');
            }
            if ( this.mCloudGoogleASR ) {
                console.log('CloudGooglePort: ASR ist vorhanden');
            } else {
                console.log('CloudGooglePort: ASR ist nicht vorhanden');
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
        // Audiokontext schliessen
        if ( this.mAudioContext ) {
            // TODO: globalen Audiokontext nicht mehr schliessen
            // this.mAudioContext.close();
        }
        this.mAudioContext = null;
        this.mGetUserMedia = null;

        // externes CloudGoogle-Objekt

        if ( this.mCloudGoogleConnect ) {
            this.mCloudGoogleConnect.disconnect();
            this.mCloudGoogleConnect = null;
        }
        if ( this.mCloudGoogleWebSocket ) {
            this.mCloudGoogleWebSocket.done();
            this.mCloudGoogleWebSocket = null;
        }
        if ( this.mCloudGoogleNetwork ) {
            this.mCloudGoogleNetwork.done();
            this.mCloudGoogleNetwork = null;
        }
        if ( this.mCloudGoogleConfig ) {
            this.mCloudGoogleConfig.done();
            this.mCloudGoogleConfig = null;
        }
        this.mCloudGoogleTTS = null;
        this.mCloudGoogleASR = null;
        this.mCloudGoogleNLU = null;
        this.mCloudGoogleNLU2 = null;
        this.mCloudGoogleServerFlag = false;

        // weitere Attribute

        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = CLOUDGOOGLE_ACTION_TIMEOUT;
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
        if ( this.mCloudGoogleConfig ) { this.mCloudGoogleConfig.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleNetwork) { this.mCloudGoogleNetwork.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleWebSocket) { this.mCloudGoogleWebSocket.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleConnect ) { this.mCloudGoogleConnect.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleTTS ) { this.mCloudGoogleTTS.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleASR ) { this.mCloudGoogleASR.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleNLU ) { this.mCloudGoogleNLU.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudGoogleNLU2 ) { this.mCloudGoogleNLU2.setErrorOutput( aErrorOutputFlag ); }
    }



    // Timeout-Funktionen


    /**
     * Aktion wird abgebrochen
     */

    protected _breakAction(): void {
        // console.log('CloudGooglePort._beakAction');
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
        // console.log('CloudGooglePort._setActionTimeout');
        if ( this.mActionTimeoutId === 0 && this.mActionTimeout > 0 ) {
            this.mActionTimeoutId = window.setTimeout(() => this._breakAction(), this.mActionTimeout );
        }
    }


    /**
     * Timeout fuer Aktion loeschen
     */

    protected _clearActionTimeout(): void {
        // console.log('CloudGooglePort._clearActionTimeout');
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
        // console.log('CloudGooglePort._onOnline');
        // TODO: muss hier nicht geoeffnet werden, collidiert mit sich schliessender WebSocket
        // this.open();
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
        // console.log('CloudGooglePort._onOffline');
        this.close();
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
        // console.log('CloudGooglePort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // Hier wird die Verbindung zu onMessage der WebSocket geloescht
        if ( this.mCloudGoogleConnect ) {
            this.mCloudGoogleConnect.disconnect();
        }
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
        // console.log('CloudGooglePort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'running' ) {
                aCallbackFunc( true );
                return;
            }
            // TODO: interrupted nur fuer iOS-Safari eingebaut
            if ( this.mAudioContext.state === 'suspended' || this.mAudioContext.state === 'interrupted' ) {
                // console.log('CloudGooglePort._unlockAudio: start', this.mAudioContext.state);
                const timeoutId = setTimeout( () => aCallbackFunc( false ), AUDIO_UNLOCK_TIMEOUT );
                this.mAudioContext.resume().then(() => {
                    // console.log('CloudGooglePort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout( timeoutId );
                    aCallbackFunc( true );
                }, (aError: any) => {
                    console.log('CloudGooglePort._unlockAudio:', aError);
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
     * @param {CloudGoogleConfigDataInterface} aConfigData - Konfigurationsdaten { googleAppKey: '', googleAppId: '', googleNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudGoogleConfigDataInterface ): number {
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                /****
                if ( typeof aConfigData.googleAppId === 'string' && aConfigData.googleAppId ) {
                    this.mCloudGoogleConfig.appId = aConfigData.googleAppId;
                }
                ****/
                if ( typeof aConfigData.googleAppKey === 'string' && aConfigData.googleAppKey ) {
                    if ( this.mCloudGoogleConfig.appKey !== aConfigData.googleAppKey ) {
                        this.mCloudGoogleConfig.appKey = aConfigData.googleAppKey;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudGoogleASR ) {
                            this.mCloudGoogleASR.clearToken();
                        }
                        if ( this.mCloudGoogleTTS ) {
                            this.mCloudGoogleTTS.clearToken();
                        }
                    }
                }
                if ( typeof aConfigData.googleServerUrl === 'string' && aConfigData.googleServerUrl ) {
                    if ( this.mCloudGoogleConfig.serverUrl !== aConfigData.googleServerUrl ) {
                        this.mCloudGoogleConfig.serverUrl = aConfigData.googleServerUrl;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudGoogleASR ) {
                            this.mCloudGoogleASR.clearToken();
                        }
                        if ( this.mCloudGoogleTTS ) {
                            this.mCloudGoogleTTS.clearToken();
                        }
                    }
                }
                if ( typeof aConfigData.dialogflowTokenServerUrl === 'string' && aConfigData.dialogflowTokenServerUrl ) {
                    if ( this.mCloudGoogleConfig.dialogflowTokenServerUrl !== aConfigData.dialogflowTokenServerUrl ) {
                        this.mCloudGoogleConfig.dialogflowTokenServerUrl = aConfigData.dialogflowTokenServerUrl;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudGoogleNLU2 ) {
                            this.mCloudGoogleNLU2.clearToken();
                        }
                    }
                }
                if ( typeof aConfigData.dialogflowProjectId === 'string' && aConfigData.dialogflowProjectId ) {
                    if ( this.mCloudGoogleConfig.dialogflowProjectId !== aConfigData.dialogflowProjectId ) {
                        this.mCloudGoogleConfig.dialogflowProjectId = aConfigData.dialogflowProjectId;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudGoogleNLU2 ) {
                            this.mCloudGoogleNLU2.clearToken();
                        }
                    }
                }
                if ( typeof aConfigData.dialogflowSessionId === 'string' && aConfigData.dialogflowSessionId ) {
                    if ( this.mCloudGoogleConfig.dialogflowSessionId !== aConfigData.dialogflowSessionId ) {
                        this.mCloudGoogleConfig.dialogflowSessionId = aConfigData.dialogflowSessionId;
                    }
                }
                if ( typeof aConfigData.dialogflowEnvironmentName === 'string' && aConfigData.dialogflowEnvironmentName ) {
                    if ( this.mCloudGoogleConfig.dialogflowEnvironmentName !== aConfigData.dialogflowEnvironmentName ) {
                        this.mCloudGoogleConfig.dialogflowEnvironmentName = aConfigData.dialogflowEnvironmentName;
                    }
                }
                /****
                if ( typeof aConfigData.googleNluTag === 'string' && aConfigData.googleNluTag ) {
                    this.mCloudGoogleConfig.nluTag = aConfigData.googleNluTag;
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
            // googleAppId: this.mCloudGoogleConfig.appId,
            googleAppKey: this.mCloudGoogleConfig.appKey,
            googleServerUrl: this.mCloudGoogleConfig.serverUrl,
            dialogflowTokenServerUrl: this.mCloudGoogleConfig.dialogflowTokenServerUrl,
            dialogflowProjectId: this.mCloudGoogleConfig.dialogflowProjectId,
            dialogflowSessionId: this.mCloudGoogleConfig.dialogflowSessionId,
            dialogflowEnvironmentName: this.mCloudGoogleConfig.dialogflowEnvironmentName
            // googleNluTag: this.mCloudGoogleConfig.nluTag
        };
        return configData;
    }


    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */

    isOnline(): boolean {
        if ( this.mCloudGoogleNetwork ) {
            return this.mCloudGoogleNetwork.isOnline();
        }
        return false;
    }


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean {
        // pruefen auf Server
        if ( !this.isServer()) {
            return true;
        }
        return this._isConnect();
    }


    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */

    protected _checkOpen( aOpenCallbackFunc: (aOpenFlag: boolean) => number ): number {
        // console.log('CloudGooglePort.checkOpen:', this.isErrorOutput());
        // pruefen auf Server
        if ( !this.isServer()) {
            // console.log('CloudGooglePort._checkOpen: kein Server vorhanden');
            return aOpenCallbackFunc( true );
        }
        // pruefen, ob Netzwerk vorhanden ist
        if ( !this.isOnline()) {
            // console.log('CloudGooglePort._checkOpen: kein Netz vorhanden');
            this.error( '_checkOpen', 'kein Netz vorhanden' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // pruefen ob WebSocket geoeffnet ist
        if ( this.isOpen()) {
            // console.log('CloudGooglePort._checkOpen: WebSocket ist geoeffnet');
            return aOpenCallbackFunc( true );
        }
        // pruefen auf Closing
        if ( this.mCloudGoogleWebSocket.getState() === 'CLOSING' ) {
            // console.log('CloudGooglePort._checkOpen: WebSocket wird geschlossen');
            this.error( '_checkOpen', 'Websocket wird geschlossen' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // WebSocket pruefen
        if ( !this.mCloudGoogleWebSocket ) {
            // console.log('CloudGooglePort._checkOpen: WebSocket nicht vorhanden');
            this.error( '_checkOpen', 'Websocket ist nicht vorhanden' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // WebSocket oeffnen
        this.mCloudGoogleWebSocket.onOpen = (aUrl: string) => {
            // console.log('CloudGooglePort._checkOpen: onOpen Event');
            // alte Funktion wieder eintragen
            this.mCloudGoogleWebSocket.onOpen = (aUrl2: string) => this._onOpen();
            this.mCloudGoogleWebSocket.onClose = () => this._onClose();
            this.mCloudGoogleWebSocket.onError = (aError: any) => this._onError( aError );
            return aOpenCallbackFunc( true );
        };
        // WebSocket schliessen
        this.mCloudGoogleWebSocket.onClose = () => {
            // console.log('CloudGooglePort._checkOpen: onClose Event');
            // alte Funktion wieder eintragen
            this.mCloudGoogleWebSocket.onOpen = (aUrl: string) => this._onOpen();
            this.mCloudGoogleWebSocket.onClose = () => this._onClose();
            this.mCloudGoogleWebSocket.onError = (aError: any) => this._onError( aError );
            aOpenCallbackFunc( false );
            return 0;
        };
        // WebSocket Fehler behandeln
        this.mCloudGoogleWebSocket.onError = (aError: any) => {
            // console.log('CloudGooglePort._checkOpen: onError Event:', aError);
            // alte Funktion wieder eintragen
            this.mCloudGoogleWebSocket.onOpen = (aUrl: string) => this._onOpen();
            this.mCloudGoogleWebSocket.onClose = () => this._onClose();
            this.mCloudGoogleWebSocket.onError = (aError2: any) => this._onError( aError2 );
            aOpenCallbackFunc( false );
            return 0;
        };
        // Websocket oeffnen
        return this.open();
    }


    /**
     * Port oeffnen und mit Server verbinden
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    open( aOption?: any ): number {
        // pruefen auf Server
        if ( !this.isServer()) {
            this._onOpen();
            return 0;
        }
        return this._connect( aOption );
    }


    /**
     * Port schliessen und Server-Verbindung trennen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    close(): number {
        // pruefen auf Server
        if ( !this.isServer()) {
            this._onClose();
            return 0;
        }
        return this._disconnect();
    }


    // Connection zum Server


    protected _isConnect(): boolean {
        // pruefen auf WebSocket
        if ( this.mCloudGoogleWebSocket ) {
            // console.log('CloudGooglePort._isConnect:', this.mCloudGoogleWebSocket.getState());
            return this.mCloudGoogleWebSocket.isConnect();
        }
        return false;
    }


    /**
     * WebSocket-Verbindung herstellen
     *
     * @returns {number}
     * @memberof CloudGooglePort
     */

    protected _connect( aOption: any ): number {
        // console.log('CloudGooglePort._connect');
        if ( this._isConnect()) {
            // Kein Fehler, Verbindung ist bereits vorhanden
            return 0;
        }
        if ( !this.mCloudGoogleWebSocket ) {
            this.error('_connect', 'kein CloudGoogleWebSocket vorhanden');
            return -1;
        }
        try {
            this.mCloudGoogleWebSocket.connect( this.mCloudGoogleConfig.serverUrl || CLOUDGOOGLE_DEFAULT_URL );
            return 0;
        } catch ( aException ) {
            this.exception('_connect', aException);
            return -1;
        }
    }


    protected _disconnect(): number {
        // console.log('CloudGooglePort._disconnect');
        if ( !this._isConnect()) {
            return 0;
        }
        if ( !this.mCloudGoogleWebSocket ) {
            this.error('_disconnect', 'kein CloudGoogleWebSocket vorhanden');
            return -1;
        }
        try {
            // console.log('CloudGooglePort._disconnect: WebSocket Verbindung getrennt');
            this.mCloudGoogleWebSocket.disconnect();
            return 0;
        } catch ( aException ) {
            this.exception('_disconnect', aException);
            return -1;
        }
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
     * Pruefen, welche CloudGoogle-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        let result = false;
        switch ( aAction ) {
            case CLOUDGOOGLE_NLU_ACTION:
                // console.log('CloudGooglePort.isAction: isInit = ', this.mCloudGoogleNLU2.isInit());
                result = this.mCloudGoogleNLU && ( this.mCloudGoogleNLU2 && this.mCloudGoogleNLU2.isInit()) ? true : false;
                break;
            case CLOUDGOOGLE_ASRNLU_ACTION:
                result = ( this.mCloudGoogleNLU2 && this.mCloudGoogleNLU2.isInit()) ? true : false;
                break;
            case CLOUDGOOGLE_ASR_ACTION:
                result = ( this.mCloudGoogleASR && this.mCloudGoogleASR.isInit()) ? true : false;
                break;
            case CLOUDGOOGLE_TTS_ACTION:
                result = ( this.mCloudGoogleTTS && this.mCloudGoogleTTS.isInit()) ? true : false;
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
        // console.log('CloudGooglePort.start:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if ( this.isRunning()) {
            this.error( 'start', 'Aktion laeuft bereits' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudGoogleConfig.isCredentials()) {
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
            this.mRunningFlag = true;
            let result = 0;
            switch ( aAction ) {
                case CLOUDGOOGLE_NLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDGOOGLE_NLU_ACTION );
                    result = this._startNLU( this.mTransaction, option.text, option.language || CLOUDGOOGLE_DEFAULT_LANGUAGE );
                    break;
                case CLOUDGOOGLE_ASRNLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDGOOGLE_ASRNLU_ACTION );
                    result = this._startASRNLU( this.mTransaction, option.language || CLOUDGOOGLE_DEFAULT_LANGUAGE );
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
                    // Aktions-Timeout loeschen, keine Transaktion gestartet
                    this._clearActionTimeout();
                    this.error( 'start', 'Keine gueltige Aktion uebergeben ' + aAction );
                    result = -1;
                    break;
            }
            // pruefen auf Fehler
            if ( result !== 0 ) {
                // console.log('CloudGooglePort.start: result = -1');
                // Aktions-Timeout loeschen, keine Transaktion gestartet
                this._clearActionTimeout();
                this.mTransaction = null;
                this.mRunningFlag = false;
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
        // console.log('CloudGooglePort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if ( !this.isRunning()) {
            // console.log('CloudGooglePort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'stop', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudGoogleConfig.isCredentials()) {
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
        // console.log('CloudGooglePort.stop: Action = ', aAction);
        switch ( aAction ) {
            case CLOUDGOOGLE_NLU_ACTION:
            case CLOUDGOOGLE_ASRNLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
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
        // TODO: das RunningFlag kann hier nicht geloescht werden, da die Verarbeitung asynchron verlaeuft und es erst in _onStop geloescht werden darf
        // console.log('CloudGooglePort.stop: RunningFlag=', this.mRunningFlag);
        // this.mRunningFlag = false;
        return result;
    }


    // CloudGoogle-Funktionen


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initRecognition( aOption?: any ): number {
        // console.log('CloudGooglePort._initRecognition: start');
        this.mDefaultOptions = {
            onopen: () => {
                // console.log( 'Websocket Opened' );
                // this._onRecognitionOpen();
            },

            onclose: () => {
                // console.log( 'Websocket Closed' );
                this._onClose();
            },

            onerror: (error: any) => {
                // console.error(error);
                this._onError( error );
            }
        };
        // console.log('CloudGooglePort._initRecognition: end');
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
        // console.log('CloudGooglePort._startNLU: start google2Flag = ', this.mCloudGoogleNLU2Flag);
        if ( !aText ) {
            this.error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !aLanguage ) {
            this.error( '_startNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudGoogleNLU || !this.mCloudGoogleNLU2 ) {
            this.error( '_startNLU', 'keine CloudGoogle NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage
            };
            if ( this.mCloudGoogleNLU2Flag ) {
                return this.mCloudGoogleNLU2.start( aTransaction, option );
            }
            return this.mCloudGoogleNLU.start( aTransaction, option );
        } catch ( aException ) {
            this.exception( '_startNLU', aException );
            return -1;
        }
        return -1;
    }


    /**
     * Intent zu einem gesprochenen Satz holen
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _startASRNLU( aTransaction: PortTransaction, aLanguage: string ): number {
        // console.log('CloudGooglePort._startASRNLU: start google2Flag = ', this.mCloudGoogleNLU2Flag);
        if ( !aLanguage ) {
            this.error( '_startASRNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudGoogleNLU || !this.mCloudGoogleNLU2 ) {
            this.error( '_startASRNLU', 'keine CloudGoogle NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: '',
                language: aLanguage
            };
            if ( this.mCloudGoogleNLU2Flag ) {
                return this.mCloudGoogleNLU2.start( aTransaction, option );
            }
            return -1;
        } catch ( aException ) {
            this.exception( '_startASRNLU', aException );
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
        if ( !this.mCloudGoogleNLU || !this.mCloudGoogleNLU2 ) {
            this.error( '_stopNLU', 'keine CloudGoogle NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            if ( this.mCloudGoogleNLU2Flag ) {
                return this.mCloudGoogleNLU2.stop( aTransaction );
            }
            return this.mCloudGoogleNLU.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopNLU', aException );
            return -1;
        }
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
        // console.log('CloudGooglePort._startASR');
        if ( !aLanguage ) {
            this.error( '_startASR', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudGoogleASR ) {
            this.error( '_startASR', 'keine CloudGoogle ASR-Anbindung vorhanden' );
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
            return this.mCloudGoogleASR.start( aTransaction, option );
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
        // console.log('CloudGooglePort._stopASR: start');
        if ( !this.mCloudGoogleASR ) {
            this.error( '_stopASR', 'keine CloudGoogle ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudGoogleASR.stop( aTransaction );
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
        if ( !aText ) {
            this.error( '_startTTS', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !this.mCloudGoogleTTS ) {
            this.error( '_startTTS', 'keine CloudGoogle TTS-Anbindung vorhanden' );
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
            // console.log('CloudGooglePort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    this.mCloudGoogleTTS.start( aTransaction, option );
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
        // console.log('CloudGooglePort._stopTTS', aTransaction);
        if ( !this.mCloudGoogleTTS ) {
            this.error( '_stopTTS', 'keine CloudGoogle TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudGoogleTTS.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopTTS', aException );
            return -1;
        }
    }

}
