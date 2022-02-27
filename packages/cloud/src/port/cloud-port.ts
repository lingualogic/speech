/** @packageDocumentation
 * CloudPort zur Verbindung desCloud-Service mit dem Framework
 * Stellt Grundfunktionen von Cloud zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// core

import { FactoryManager, Port, PortTransaction } from '@lingualogic-speech/core';


// net

import { FETCH_FACTORY_NAME, FetchFactory } from '@lingualogic-speech/net';


// audio

import { IAudioHtml5Reader, AudioHtml5Reader, AudioContextManager, UserMediaFactory, USERMEDIA_FACTORY_NAME } from '@lingualogic-speech/audio';


// cloud

import { CLOUD_API_VERSION } from './cloud-port-version';
import {
    CLOUD_TYPE_NAME,
    CLOUD_PORT_NAME,
    CLOUD_NLU_ACTION,
    CLOUD_ASRNLU_ACTION,
    CLOUD_ASR_ACTION,
    CLOUD_TTS_ACTION,
    CLOUD_DEFAULT_LANGUAGE,
    CLOUD_DEFAULT_URL,
    CLOUD_NLU2_FLAG
} from './cloud-port-const';
import { 
    CLOUD_ASR_TYPE,
    CLOUD_ASRNLU_TYPE,
    CLOUD_NLU_TYPE,
    CLOUD_TTS_TYPE,
} from './../device/cloud-device-const';
import { CloudNetwork } from './../net/cloud-network';
import { ICloudWebSocket, CloudWebSocket } from './../net/cloud-websocket';
import { ICloudConnect } from './../net/cloud-connect';
import { CloudConnectWebSocket } from './../net/cloud-connect-websocket';
import { ICloudDeviceFactory, CloudDeviceFactory } from './../device/cloud-device-factory';
import { ICloudDevice } from '../device/cloud-device.interface';
import { ICloudDeviceGroup, CloudDeviceGroup } from './../device/cloud-device-group';
import { ICloudDeviceConfigGroup } from './../device/cloud-device-config-group';
import { ICloudToken, CloudToken } from '../token/cloud-token';
import { ICloudPortOption } from './cloud-port-option.interface';
import { ICloudPortConfigData } from './cloud-port-config-data.interface';
import { ICloudPortConfig, CloudPortConfig } from './cloud-port-config';
import { ICloudPort } from './cloud-port.interface';
export { ICloudPort };


// Konstanten


// Zeit die im Unlock-Event auf RESUME gewartet wird

const AUDIO_UNLOCK_TIMEOUT = 2000;

// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.

const CLOUD_ACTION_TIMEOUT = 60000;


/**
 * Definiert die CloudPort-Klasse
 */

export class CloudPort extends Port implements ICloudPort {

    // externe Html5-Komponenten

    private mAudioContext: any = null;
    private mGetUserMedia: any = null;
  
    // Fetch

    private mFetchFactory: FetchFactory = null;

    // externes CloudPort-Objekt

    private mCloudPortServerFlag = false;
    private mCloudPortConfig: ICloudPortConfig = null;
    private mCloudPortNetwork: CloudNetwork = null;
    private mCloudPortWebSocket: ICloudWebSocket = null;
    private mCloudPortConnect: ICloudConnect = null;
    private mCloudToken: ICloudToken = null;
    private mCloudDeviceFactory: ICloudDeviceFactory = null;   // TODO: Device-Factory sollte von aussen ueber den Construkter eingetragen werden
    private mCloudDeviceGroup: ICloudDeviceGroup = null;

    // weitere Attribute

    private mDynamicCredentialsFlag = false;
    private mTransaction: PortTransaction = null;
    private mRunningFlag = false;
    private mActionTimeoutId: any;
    private mActionTimeout = CLOUD_ACTION_TIMEOUT;
    private mDefaultOptions = null;

    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUD_PORT_NAME, aRegisterFlag );
    }


    // Port-Funktionen


    /**
     * pruefen auf Server-Verbindung
     *
     * @return {boolean} true, Port hat Server-Verbindung, false sonst
     */

    isServer() {
        return this.mCloudPortServerFlag;
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
        return CLOUD_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudPort';
    }


    getVersion(): string {
        return CLOUD_API_VERSION;
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _checkCredentials( aOption: ICloudPortOption ): boolean {
        // console.log('CloudPort._checkCredentials: ', aOption);
        if ( !aOption ) {
            return false;
        }

        // App-Parameter sind vorhanden

        return true;
    }


    /**
     * DeviceFactory erzeugen
     * 
     * @param aDeviceConfigGroup - Konfiguration der DeviceGroup
     * @param aConnect           - Verbindung zum Ckoud-Server
     * @param aFetchFactory      - Fetch-Factory
     * @param aAudioContext      - Audio-Kontext
     * @param aGetUserMedia      - GetUserMedia
     * @param aAudioReader       - Audio Reader
     * 
     * @returns DeviceFactory
     */

    protected _newCloudDeviceFactory( aDeviceFactoryName: string, aDeviceConfigGroup: ICloudDeviceConfigGroup, aConnect: ICloudConnect, aFetchFactory: FetchFactory, aAudioContext: any, aGetUserMedia: any, aAudioReader: IAudioHtml5Reader ): ICloudDeviceFactory {
        return new CloudDeviceFactory( aDeviceFactoryName, aDeviceConfigGroup, aConnect, aFetchFactory, aAudioContext, aGetUserMedia, aAudioReader );
    }

    protected _newCloudDeviceGroup( aDeviceFactory: ICloudDeviceFactory, aDeviceConfigGroup: ICloudDeviceConfigGroup, aConnect: ICloudConnect ): ICloudDeviceGroup {
        return new CloudDeviceGroup( '', aDeviceFactory, aDeviceConfigGroup, aConnect );
    }

    /**
     * Neue Port-Konfiguration erzeugen
     * 
     * @param aOption - Optionen fuer die Konfiguration des Ports
     * @returns CloudPortConfig
     */

    protected _newCloudPortConfig( aOption: ICloudPortOption ): ICloudPortConfig {
        return new CloudPortConfig( aOption );
    }


    /**
     * Cloud-Websocket erzeugen
     * @returns CloudWebSocket
     */

    protected _newCloudWebSocket( aPortConfig: ICloudPortConfig ): ICloudWebSocket {
        return new CloudWebSocket( '', aPortConfig );
    }


    /**
     * Cloud-Verbinddung erzeugen
     * 
     * @param aPortConfig  - Konfiguration des Ports
     * @param aPortWebSocket - WebSocket fuer den Port
     * @returns Connect
     */

    protected _newCloudConnect( aPortConfig: ICloudPortConfig, aPortWebSocket: ICloudWebSocket ): ICloudConnect {
        return new CloudConnectWebSocket( '', aPortConfig, aPortWebSocket );
    }


    /**
     * Neues Token aus Tokenserver holen
     * 
     * @param aPortConfig - Konfiguration des Ports
     * @param aPortWebSocket  - WebSocket des Ports
     */

    protected async _newCloudToken( aPortConfig: ICloudPortConfig, aPortWebSocket: ICloudWebSocket, aFetchFactory: FetchFactory ) {
        // console.log('CloudPort._newCloudToken');
        this.mCloudToken = new CloudToken( aPortConfig.tokenServerUrl, aPortConfig.appKey, aFetchFactory );
        const token = await this.mCloudToken.getAccessToken();
        aPortWebSocket.setToken( token );
        this._onInit( 0 );
    }


    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */

    protected _initAllObject( aOption: ICloudPortOption ): number {
        // console.log('CloudPort._initAllObject:', aOption);

        // Fetch-Factory fuer fetch-Funktion erzeugen
        
        this.mFetchFactory = FactoryManager.get( FETCH_FACTORY_NAME, FetchFactory ) as FetchFactory;
        if ( !this.mFetchFactory ) {
            console.log('CloudPort._initAllObject: FetchFactory nicht erzeugt');
            return -1;
        }

        // Network-Anbindung erzeugen

        this.mCloudPortNetwork = new CloudNetwork();
        this.mCloudPortNetwork.onOnline = () => this._onOnline();
        this.mCloudPortNetwork.onOffline = () => this._onOffline();
        this.mCloudPortNetwork.onError = (aError: any) => this._onError( aError );
        if ( this.mCloudPortNetwork.init( aOption ) !== 0 ) {
            console.log('CloudPort._initAllObject: Netzwerk nicht initialsiert');
            return -1;
        }

        // PortConfig erzeugen

        this.mCloudPortConfig = this._newCloudPortConfig( aOption );
        if ( !this.mCloudPortConfig ) {
            console.log('CloudPort._initAllObject: Konfiguration nicht erzeugt');
            return -1;
        }

        if ( this.mCloudPortConfig.isErrorOutput() !== this.isErrorOutput()) {
            this.mCloudPortConfig.setErrorOutput( this.isErrorOutput());
        }

        // pruefen auf vorhandenen Server

        if ( this.isServer()) {
            // WebSocket-Anbindung erzeugen und WebSocket API pruefen

            this.mCloudPortWebSocket = this._newCloudWebSocket( this.mCloudPortConfig );
            // console.log('CloudPort._initAllOpbject: WebSocket = ', this.mCloudPortWebSocket);
            if ( !this.mCloudPortWebSocket ) {
                console.log('CloudPort._initAllObject: WebSocket nicht erzeugt');
                return -1;
            }
            this.mCloudPortWebSocket.onOpen = (aUrl: string) => this._onOpen();
            this.mCloudPortWebSocket.onClose = () => this._onClose();
            this.mCloudPortWebSocket.onError = (aError: any) => this._onError( aError );
            if ( this.mCloudPortWebSocket.init( aOption ) !== 0 ) {
                console.log('CloudPort._initAllObject: WebSocket nicht initialsiert');
                return -1;
            }
        }

        // Verbindung erzeugen

        this.mCloudPortConnect = this._newCloudConnect( this.mCloudPortConfig, this.mCloudPortWebSocket );
        if ( !this.mCloudPortConnect ) {
            console.log('CloudPort._initAllObject: Connect nicht erzeugt');
            return -1;
        }

        // TODO: wenn Disconnect gesendet wird, wird der Port gestoppt !
        /* ist erst mal in Cloud-Device eingebaut
        this.mCloudPortConnect.onDisconnect = () => {
            console.log('CloudPort._initAllObject: onDisconnect -> onStop');
            this._onStop( this.mTransaction.plugin, this.mTransaction.type );
        };
        */

        // pruefen auf Token-Server

        if ( this.mCloudPortConfig.tokenServerUrl ) {
            // asynchrone Funktion zur Erzeugung eines aktuellen Tokens
            this._newCloudToken( this.mCloudPortConfig, this.mCloudPortWebSocket, this.mFetchFactory );
        }

        // AudioReader erzeuten

        const audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });

        // CloudDevices erzeugen

        this.mCloudDeviceFactory = this._newCloudDeviceFactory( this.getName() + 'DeviceFactory', this.mCloudPortConfig, this.mCloudPortConnect, this.mFetchFactory, this.mAudioContext, this.mGetUserMedia, audioReader );
        this.mCloudDeviceGroup = this._newCloudDeviceGroup( this.mCloudDeviceFactory, this.mCloudPortConfig, this.mCloudPortConnect ) as ICloudDeviceGroup;
        if ( !this.mCloudDeviceGroup ) {
            console.log('CloudPort._initAllObject: DeviceGroup nicht erzeugt');
            return -1;
        }

        // Eintragen der Events in die DeviceGroup

        this.mCloudDeviceGroup.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mCloudDeviceGroup.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mCloudDeviceGroup.onStartAudio = (aTransaction: PortTransaction) => this._onStartAudio( aTransaction.plugin, aTransaction.type );
        this.mCloudDeviceGroup.onStopAudio = (aTransaction: PortTransaction) => this._onStopAudio( aTransaction.plugin, aTransaction.type );
        this.mCloudDeviceGroup.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mCloudDeviceGroup.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mCloudDeviceGroup.onClose = (aTransaction: PortTransaction) => this._onClose();

        // Initialisierung aller Devices der DeviceGroup

        return this.mCloudDeviceGroup.init( aOption );
    }


    /**
     * initialisert den Port
     *
     * Folgende Parameter muessen uebergeben werden, da sonst der Port nicht initalisiert wird:
     *
     *      googleAppId     - CloudPort Credentials fuer APP_ID
     *      googleAppKey    - CloudPort Credentials fuer APP_KEY
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

    init( aOption: ICloudPortOption ): number {
        // console.log('CloudPort.init:', this.getName(), aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( this.isInit()) {
            this.error( 'init', 'Port ist bereits initialisiert');
            return 0;
        }

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.dynamicCredentialsFlag === 'boolean' && aOption.dynamicCredentialsFlag ) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        } else {
            // pruefen auf CloudPort App-Credientials Uebergabe

            if ( !this._checkCredentials( aOption )) {
                this.error( 'init', 'kein AppKey als Parameter uebergeben' );
                return -1;
            }
        }

        // pruefen auf Server-Flag

        if ( aOption && typeof aOption.serverFlag === 'boolean' && aOption.serverFlag ) {
            this.mCloudPortServerFlag = true;
        }

        // TODO: muss nach Audio verschoben werden
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

        // TODO: muss nach Audio verschoben werden
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

        // wenn kein Tokenserver eingebunden wird, kann hier onInit gesendet werden
        
        if ( !this.mCloudPortConfig.tokenServerUrl ) {
            this._onInit( 0 );
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

        // externes CloudPort-Objekt

        if ( this.mCloudPortConnect ) {
            this.mCloudPortConnect.disconnect();
            this.mCloudPortConnect = null;
        }
        if ( this.mCloudPortWebSocket ) {
            this.mCloudPortWebSocket.done();
            this.mCloudPortWebSocket = null;
        }
        if ( this.mCloudPortNetwork ) {
            this.mCloudPortNetwork.done();
            this.mCloudPortNetwork = null;
        }
        if ( this.mCloudDeviceGroup ) {
            this.mCloudDeviceGroup.done()
            this.mCloudDeviceGroup = null;
        }

        this.mCloudDeviceFactory = null;
        this.mCloudPortConfig = null;

        // weitere Attribute

        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = CLOUD_ACTION_TIMEOUT;
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

    reset( aOption?: ICloudPortOption ): number {
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
        if ( this.mCloudPortConfig ) { this.mCloudPortConfig.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudPortNetwork) { this.mCloudPortNetwork.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudPortWebSocket) { this.mCloudPortWebSocket.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudPortConnect ) { this.mCloudPortConnect.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudDeviceFactory ) { this.mCloudDeviceFactory.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudDeviceGroup ) { this.mCloudDeviceGroup.setErrorOutput( aErrorOutputFlag ); }
    }



    // Timeout-Funktionen


    /**
     * Aktion wird abgebrochen
     */

    protected _breakAction(): void {
        // console.log('CloudPort._beakAction');
        this.mActionTimeoutId = undefined;
        if ( this.mTransaction ) {
            this.error( '_breakAction', 'Timeout fuer Action erreicht' );
            this._onStop( this.mTransaction.plugin, this.mTransaction.type );
        }
    }


    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */

    protected _setActionTimeout(): void {
        // console.log('CloudPort._setActionTimeout');
        if ( !this.mActionTimeoutId && this.mActionTimeout > 0 ) {
            this.mActionTimeoutId = setTimeout(() => this._breakAction(), this.mActionTimeout );
        }
    }


    /**
     * Timeout fuer Aktion loeschen
     */

    protected _clearActionTimeout(): void {
        // console.log('CloudPort._clearActionTimeout');
        if ( this.mActionTimeoutId ) {
            clearTimeout( this.mActionTimeoutId );
            this.mActionTimeoutId = undefined;
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
        // console.log('CloudPort._onOnline');
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
        // console.log('CloudPort._onOffline');
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
        // console.log('CloudPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // Hier wird die Verbindung zu onMessage der WebSocket geloescht
        if ( this.mCloudPortConnect ) {
            this.mCloudPortConnect.disconnect();
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
        // console.log('CloudPort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'running' ) {
                aCallbackFunc( true );
                return;
            }
            // TODO: interrupted nur fuer iOS-Safari eingebaut
            if ( this.mAudioContext.state === 'suspended' || this.mAudioContext.state === 'interrupted' ) {
                // console.log('CloudPort._unlockAudio: start', this.mAudioContext.state);
                const timeoutId = setTimeout( () => aCallbackFunc( false ), AUDIO_UNLOCK_TIMEOUT );
                this.mAudioContext.resume().then(() => {
                    // console.log('CloudPort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout( timeoutId );
                    aCallbackFunc( true );
                }, (aError: any) => {
                    console.log('CloudPort._unlockAudio:', aError);
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


    // CloudPort-Funktionen (sind nicht im Port-Interface enthalten)


    /**
     * Rueckgabe eines Tokens, wenn es in einem Device vorhanden ist.
     * 
     * @param aDeviceType - Typname des Devices (ASR, NLU, TTS)
     * @returns Tokenstring
     */


    getToken( aDeviceType: string ): string {
        // console.log('CloudPort.getToken: start');
        if ( !this.mCloudPortWebSocket ) {
            console.log('CloudPort.getToken: keine Port-Websocket vorhanden');
            return '';
        }
        // TODO: direkte Rueckgabe des Websocket-Tokens, solange es nur eine WebSocket-Instanz fuer den Port gibt
        return this.mCloudPortWebSocket.getToken();
    }


    // Port-Funktionen


    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {ICloudPortConfigData} aConfigData - Konfigurationsdaten { googleAppKey: '', googleAppId: '', googleNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: ICloudPortConfigData ): number {
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                /****
                if ( typeof aConfigData.googleAppId === 'string' && aConfigData.googleAppId ) {
                    this.mCloudPortConfig.appId = aConfigData.googleAppId;
                }
                ****/
                if ( typeof aConfigData.appKey === 'string' && aConfigData.appKey ) {
                    if ( this.mCloudPortConfig.appKey !== aConfigData.appKey ) {
                        this.mCloudPortConfig.appKey = aConfigData.appKey;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudDeviceGroup ) this.mCloudDeviceGroup.clearToken();
                    }
                }
                if ( typeof aConfigData.serverUrl === 'string' && aConfigData.serverUrl ) {
                    if ( this.mCloudPortConfig.serverUrl !== aConfigData.serverUrl ) {
                        this.mCloudPortConfig.serverUrl = aConfigData.serverUrl;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudDeviceGroup ) this.mCloudDeviceGroup.clearToken();
                    }
                }
                if ( typeof aConfigData.tokenServerUrl === 'string' && aConfigData.tokenServerUrl ) {
                    if ( this.mCloudPortConfig.tokenServerUrl !== aConfigData.tokenServerUrl ) {
                        this.mCloudPortConfig.tokenServerUrl = aConfigData.tokenServerUrl;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudDeviceGroup ) this.mCloudDeviceGroup.clearToken();
                    }
                }
                if ( typeof aConfigData.projectId === 'string' && aConfigData.projectId ) {
                    if ( this.mCloudPortConfig.projectId !== aConfigData.projectId ) {
                        this.mCloudPortConfig.projectId = aConfigData.projectId;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        if ( this.mCloudDeviceGroup ) this.mCloudDeviceGroup.clearToken();
                    }
                }
                if ( typeof aConfigData.sessionId === 'string' && aConfigData.sessionId ) {
                    if ( this.mCloudPortConfig.sessionId !== aConfigData.sessionId ) {
                        this.mCloudPortConfig.sessionId = aConfigData.sessionId;
                    }
                }
                if ( typeof aConfigData.environmentName === 'string' && aConfigData.environmentName ) {
                    if ( this.mCloudPortConfig.environmentName !== aConfigData.environmentName ) {
                        this.mCloudPortConfig.environmentName = aConfigData.environmentName;
                    }
                }
                /****
                if ( typeof aConfigData.googleNluTag === 'string' && aConfigData.googleNluTag ) {
                    this.mCloudPortConfig.nluTag = aConfigData.googleNluTag;
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
     * @return {ICloudPortConfigData} aktuelle Portkonfigurationsdaten
     */

    getConfig(): ICloudPortConfigData {
        const configData: ICloudPortConfigData = {
            // googleAppId: this.mCloudPortConfig.appId,
            appKey: this.mCloudPortConfig.appKey,
            serverUrl: this.mCloudPortConfig.serverUrl,
            tokenServerUrl: this.mCloudPortConfig.tokenServerUrl,
            projectId: this.mCloudPortConfig.projectId,
            sessionId: this.mCloudPortConfig.sessionId,
            environmentName: this.mCloudPortConfig.environmentName
            // googleNluTag: this.mCloudPortConfig.nluTag
        };
        return configData;
    }


    /**
     * Dient der Ueberpruefung auf vorhandene Credentials
     * @returns True, wenn Credentials vorhanden sind, false sonst
     */

    isCredentials(): boolean {
        // kann von erbenden Klassen uerbschrieben werden
        return true;
    }


    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */

    isOnline(): boolean {
        if ( this.mCloudPortNetwork ) {
            return this.mCloudPortNetwork.isOnline();
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
        // console.log('CloudPort.checkOpen:', this.isErrorOutput());
        // pruefen auf Server
        if ( !this.isServer()) {
            // console.log('CloudPort._checkOpen: kein Server vorhanden');
            return aOpenCallbackFunc( true );
        }
        // pruefen, ob Netzwerk vorhanden ist
        if ( !this.isOnline()) {
            // console.log('CloudPort._checkOpen: kein Netz vorhanden');
            this.error( '_checkOpen', 'kein Netz vorhanden' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // pruefen ob WebSocket geoeffnet ist
        if ( this.isOpen()) {
            // console.log('CloudPort._checkOpen: WebSocket ist geoeffnet');
            return aOpenCallbackFunc( true );
        }
        // pruefen auf Closing
        if ( this.mCloudPortWebSocket.getState() === 'CLOSING' ) {
            // console.log('CloudPort._checkOpen: WebSocket wird geschlossen');
            this.error( '_checkOpen', 'Websocket wird geschlossen' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // WebSocket pruefen
        if ( !this.mCloudPortWebSocket ) {
            // console.log('CloudPort._checkOpen: WebSocket nicht vorhanden');
            this.error( '_checkOpen', 'Websocket ist nicht vorhanden' );
            aOpenCallbackFunc( false );
            return -1;
        }
        // WebSocket oeffnen
        this.mCloudPortWebSocket.onOpen = (aUrl: string) => {
            // console.log('CloudPort._checkOpen: onOpen Event');
            // alte Funktion wieder eintragen
            this.mCloudPortWebSocket.onOpen = (aUrl2: string) => this._onOpen();
            this.mCloudPortWebSocket.onClose = () => this._onClose();
            this.mCloudPortWebSocket.onError = (aError: any) => this._onError( aError );
            return aOpenCallbackFunc( true );
        };
        // WebSocket schliessen
        this.mCloudPortWebSocket.onClose = () => {
            // console.log('CloudPort._checkOpen: onClose Event');
            // alte Funktion wieder eintragen
            this.mCloudPortWebSocket.onOpen = (aUrl: string) => this._onOpen();
            this.mCloudPortWebSocket.onClose = () => this._onClose();
            this.mCloudPortWebSocket.onError = (aError: any) => this._onError( aError );
            aOpenCallbackFunc( false );
            return 0;
        };
        // WebSocket Fehler behandeln
        this.mCloudPortWebSocket.onError = (aError: any) => {
            // console.log('CloudPort._checkOpen: onError Event:', aError);
            // alte Funktion wieder eintragen
            this.mCloudPortWebSocket.onOpen = (aUrl: string) => this._onOpen();
            this.mCloudPortWebSocket.onClose = () => this._onClose();
            this.mCloudPortWebSocket.onError = (aError2: any) => this._onError( aError2 );
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

    // TODO: Problem mit asynchroner Oeffnung der WebSocket, daher liefert _isConnect noch false zurueck !

    protected _isConnect(): boolean {
        // pruefen auf WebSocket
        // TODO: zu Testzwecken gibt isConnect true zurueck
        if ( this.mCloudPortWebSocket ) {
            // console.log('CloudPort._isConnect:', this.mCloudPortWebSocket.isConnect(), this.mCloudPortWebSocket.getState());
            return this.mCloudPortWebSocket.isConnect();
        }
        return false;
    }


    /**
     * WebSocket-Verbindung herstellen
     *
     * @returns {number}
     * @memberof CloudPort
     */

    protected _connect( aOption: any ): number {
        // console.log('CloudPort._connect');
        if ( this._isConnect()) {
            // Kein Fehler, Verbindung ist bereits vorhanden
            return 0;
        }
        if ( !this.mCloudPortWebSocket ) {
            this.error('_connect', 'kein CloudPortWebSocket vorhanden');
            return -1;
        }
        try {
            this.mCloudPortWebSocket.connect( this.mCloudPortConfig.serverUrl || CLOUD_DEFAULT_URL );
            return 0;
        } catch ( aException ) {
            this.exception('_connect', aException);
            return -1;
        }
    }


    protected _disconnect(): number {
        // console.log('CloudPort._disconnect');
        if ( !this._isConnect()) {
            return 0;
        }
        if ( !this.mCloudPortWebSocket ) {
            this.error('_disconnect', 'kein CloudPortWebSocket vorhanden');
            return -1;
        }
        try {
            // console.log('CloudPort._disconnect: WebSocket Verbindung getrennt');
            this.mCloudPortWebSocket.disconnect();
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
     * Pruefen, welche CloudPort-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        let result = false;
        let device: ICloudDevice = null;
        if ( !this.mCloudDeviceGroup ) {
            return false;
        }
        switch ( aAction ) {
            case CLOUD_NLU_ACTION:
                device = this.mCloudDeviceGroup.findDevice( CLOUD_NLU_TYPE );
                if ( device && device.isInit()) {
                    result = true;
                }
                break;
            case CLOUD_ASRNLU_ACTION:
                device = this.mCloudDeviceGroup.findDevice( CLOUD_ASRNLU_TYPE );
                if ( device && device.isInit()) {
                    result = true;
                }
                break;
            case CLOUD_ASR_ACTION:
                device = this.mCloudDeviceGroup.findDevice( CLOUD_ASR_TYPE );
                if ( device && device.isInit()) {
                    result = true;
                }
                break;
            case CLOUD_TTS_ACTION:
                device = this.mCloudDeviceGroup.findDevice( CLOUD_TTS_TYPE );
                if ( device && device.isInit()) {
                    result = true;
                }
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
        // console.log('CloudPort.start:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if ( this.isRunning()) {
            this.error( 'start', 'Aktion laeuft bereits' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.isCredentials()) {
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
                case CLOUD_NLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUD_NLU_ACTION );
                    result = this._startNLU( this.mTransaction, option.text, option.language || CLOUD_DEFAULT_LANGUAGE );
                    break;
                case CLOUD_ASRNLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUD_ASRNLU_ACTION );
                    result = this._startASRNLU( this.mTransaction, option.language || CLOUD_DEFAULT_LANGUAGE );
                    break;
                case CLOUD_ASR_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUD_ASR_ACTION );
                    result = this._startASR( this.mTransaction, option.language || CLOUD_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false );
                    break;
                case CLOUD_TTS_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUD_TTS_ACTION );
                    result = this._startTTS( this.mTransaction, option.text, option.language || CLOUD_DEFAULT_LANGUAGE, option.voice || '' );
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
                // console.log('CloudPort.start: result = -1');
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
        // console.log('CloudPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if ( !this.isRunning()) {
            // console.log('CloudPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'stop', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.isCredentials()) {
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
        // console.log('CloudPort.stop: Action = ', aAction);
        switch ( aAction ) {
            case CLOUD_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
            case CLOUD_ASRNLU_ACTION:
                result = this._stopASRNLU( this.mTransaction );
                break;
            case CLOUD_ASR_ACTION:
                result = this._stopASR( this.mTransaction );
                break;
            case CLOUD_TTS_ACTION:
                result = this._stopTTS( this.mTransaction );
                break;
            default:
                this.error( 'stop', 'Keine gueltige Aktion uebergeben ' + aAction );
                result = -1;
                break;
        }
        // TODO: das RunningFlag kann hier nicht geloescht werden, da die Verarbeitung asynchron verlaeuft und es erst in _onStop geloescht werden darf
        // console.log('CloudPort.stop: RunningFlag=', this.mRunningFlag);
        // this.mRunningFlag = false;
        return result;
    }


    // CloudPort-Funktionen


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
        // console.log('CloudPort._startNLU: start google2Flag = ', this.mCloudPortNLU2Flag);
        if ( !aText ) {
            this.error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !aLanguage ) {
            this.error( '_startNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_NLU_TYPE );
        if ( !device ) {
            this.error( '_startNLU', 'keine CloudPort NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage
            };
            return device.start( aTransaction, option );
        } catch ( aException ) {
            this.exception( '_startNLU', aException );
            return -1;
        }
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

        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_NLU_TYPE );
        if ( !device ) {
            this.error( '_stopNLU', 'keine CloudPort NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            return device.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopNLU', aException );
            return -1;
        }
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
        // console.log('CloudPort._startASRNLU: start google2Flag = ', this.mCloudPortNLU2Flag);
        if ( !aLanguage ) {
            this.error( '_startASRNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_ASRNLU_TYPE );
        if ( !device ) {
            this.error( '_startASRNLU', 'keine CloudPort NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: '',
                language: aLanguage
            };
            return device.start( aTransaction, option );
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

    protected _stopASRNLU( aTransaction: PortTransaction ): number {

        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_ASRNLU_TYPE );
        if ( !device ) {
            this.error( '_stopASRNLU', 'keine CloudPort NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            return device.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopASRNLU', aException );
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
        // console.log('CloudPort._startASR');
        if ( !aLanguage ) {
            this.error( '_startASR', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_ASR_TYPE );
        if ( !device ) {
            this.error( '_startASR', 'keine CloudPort ASR-Anbindung vorhanden' );
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
            return device.start( aTransaction, option );
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
        // console.log('CloudPort._stopASR: start');
        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_ASR_TYPE );
        // console.log('CloudPort._stopASR: device = ', device.getName());
        if ( !device ) {
            this.error( '_stopASR', 'keine CloudPort ASR-Anbindung vorhanden' );
            return -1;
        }
        try {
            return device.stop( aTransaction );
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
        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_TTS_TYPE );
        if ( !device ) {
            this.error( '_startTTS', 'keine CloudPort TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage,
                voice: aVoice
            };
            // TODO: Provisorische Version von AudioContext.resume(), muss in Audio-Komponente untergebracht werden!
            // pruefen auf AutoContext Zustand suspended
            // console.log('CloudPort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    device.start( aTransaction, option );
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
        // console.log('CloudPort._stopTTS', aTransaction);
        if ( !this.mCloudDeviceGroup ) {
            return -1;
        }
        const device = this.mCloudDeviceGroup.findDevice( CLOUD_TTS_TYPE );
        if ( !device ) {
            this.error( '_stopTTS', 'keine CloudPort TTS-Anbindung vorhanden' );
            return -1;
        }
        try {
            return device.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopTTS', aException );
            return -1;
        }
    }

}
