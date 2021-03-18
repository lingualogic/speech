/** @packageDocumentation
 * CloudRasaPort zur Verbindung des CloudRasa Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von CloudRasa zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// core

import { FactoryManager, Port, PortTransaction } from '@speech/core';


// common

import { FileHtml5Reader } from '@speech/common';


// cloud-rasa

import { CLOUDRASA_API_VERSION } from './cloud-rasa-version';
import {
    CLOUDRASA_TYPE_NAME,
    CLOUDRASA_PORT_NAME,
    CLOUDRASA_NLU_ACTION,
    CLOUDRASA_DEFAULT_LANGUAGE
} from './cloud-rasa-const';
import { CloudRasaConfigDataInterface } from './cloud-rasa-config-data.interface';
import { CloudRasaConfig } from './cloud-rasa-config';
import { CloudRasaNetwork } from './net/cloud-rasa-network';
import { CloudRasaConnect } from './net/cloud-rasa-connect';
import { CloudRasaNLU } from './device/cloud-rasa-nlu';


// Konstanten


// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.

const CLOUDRASA_ACTION_TIMEOUT = 60000;


/**
 * Definiert die CloudRasaPort-Klasse
 */

export class CloudRasaPort extends Port {

    // externes CloudRasa-Objekt

    private mCloudRasaServerFlag = false;
    private mCloudRasaConfig: CloudRasaConfig = null;
    private mCloudRasaNetwork: CloudRasaNetwork = null;
    private mCloudRasaConnect: CloudRasaConnect = null;
    private mCloudRasaNLU: CloudRasaNLU = null;


    // weitere Attribute

    private mDynamicCredentialsFlag = false;
    private mTransaction: PortTransaction = null;
    private mRunningFlag = false;
    private mDefaultOptions: any = null;
    private mActionTimeoutId = 0;
    private mActionTimeout = CLOUDRASA_ACTION_TIMEOUT;


    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName?: string, aRegisterFlag = true ) {
        super( aPortName || CLOUDRASA_PORT_NAME, aRegisterFlag );
    }


    // Port-Funktionen


    /**
     * pruefen auf Server-Verbindung
     *
     * @return {boolean} true, Port hat Server-Verbindung, false sonst
     */

    isServer() {
        return this.mCloudRasaServerFlag;
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
        return CLOUDRASA_TYPE_NAME;
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'CloudRasaPort';
    }


    getVersion(): string {
        return CLOUDRASA_API_VERSION;
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _checkCredentials( aOption: any ): boolean {
        // console.log('CloudRasaPort._checkCredentials: ', aOption);
        if ( !aOption ) {
            return false;
        }

        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019

        if ( typeof aOption.rasaAppKey !== 'string' ) { return false; }
        if ( !aOption.rasaAppKey ) { return false; }

        // App-Parameter sind vorhanden

        return true;
    }


    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */

    protected _initAllObject( aOption: any ): number {
        // console.log('CloudRasaPort._initAllObject:', aOption);
        // innere Komponenten eintragen

        const fileReader = new FileHtml5Reader();
        fileReader.init();

        /* wird erst fuer ASR benoetigt
        const audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });
        */

        this.mCloudRasaConfig = new CloudRasaConfig( fileReader );
        if ( this.mCloudRasaConfig.init( aOption ) !== 0 ) {
            return -1;
        }

        // Network-Anbindung erzeugen

        this.mCloudRasaNetwork = new CloudRasaNetwork();
        this.mCloudRasaNetwork.onOnline = () => this._onOnline();
        this.mCloudRasaNetwork.onOffline = () => this._onOffline();
        this.mCloudRasaNetwork.onError = (aError: any) => this._onError( aError );
        if ( this.mCloudRasaNetwork.init( aOption ) !== 0 ) {
            return -1;
        }

        this.mCloudRasaConnect = new CloudRasaConnect( this.mCloudRasaConfig );

        // CloudRasa-Komponenten erzeugen

        this.mCloudRasaNLU = new CloudRasaNLU( this.mCloudRasaConfig, this.mCloudRasaConnect );
        this.mCloudRasaNLU.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mCloudRasaNLU.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mCloudRasaNLU.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mCloudRasaNLU.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mCloudRasaNLU.onClose = (aTransaction: PortTransaction) => this._onClose();

        return 0;
    }


    /**
     * initialisert den Port
     *
     * Folgende Parameter muessen uebergeben werden, da sonst der Port nicht initalisiert wird:
     *
     *      rasaAppId     - CloudRasa Credentials fuer APP_ID
     *      rasaAppKey    - CloudRasa Credentials fuer APP_KEY
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
        // console.log('CloudRasaPort.init:', aOption);

        // pruefen auf ErrorOutput-Flag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        if ( this.isInit()) {
            this.error( 'init', 'Port ist bereits initialisiert');
            return 0;
        }

        // pruefen auf dynamische Credentials

        if ( aOption && typeof aOption.rasaDynamicCredentialsFlag === 'boolean' && aOption.rasaDynamicCredentialsFlag ) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        } else {
            // pruefen auf CloudRasa App-Credientials Uebergabe

            if ( !this._checkCredentials( aOption )) {
                this.error( 'init', 'kein AppKey als Parameter uebergeben' );
                return -1;
            }
        }

        // pruefen auf Server-Flag

        if ( aOption && typeof aOption.rasaServerFlag === 'boolean' && aOption.rasaServerFlag ) {
            this.mCloudRasaServerFlag = true;
        }

        // innere Objekte erzeugen

        if ( this._initAllObject( aOption ) !== 0 ) {
            return -1;
        }

        // Initialisierung von Port

        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // Debug-Ausgabe fuer CloudRasa-Komponenten

        if ( this.isErrorOutput()) {
            if ( this.mCloudRasaNLU ) {
                console.log('CloudRasaPort: NLU ist vorhanden');
            } else {
                console.log('CloudRasaPort: NLU ist nicht vorhanden');
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

        // externes CloudRasa-Objekt

        if ( this.mCloudRasaConnect ) {
            this.mCloudRasaConnect.disconnect();
            this.mCloudRasaConnect = null;
        }
        if ( this.mCloudRasaNetwork ) {
            this.mCloudRasaNetwork.done();
            this.mCloudRasaNetwork = null;
        }
        if ( this.mCloudRasaConfig ) {
            this.mCloudRasaConfig.done();
            this.mCloudRasaConfig = null;
        }
        this.mCloudRasaNLU = null;
        this.mCloudRasaServerFlag = false;

        // weitere Attribute

        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = CLOUDRASA_ACTION_TIMEOUT;
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
        if ( this.mCloudRasaConfig ) { this.mCloudRasaConfig.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudRasaNetwork) { this.mCloudRasaNetwork.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudRasaConnect ) { this.mCloudRasaConnect.setErrorOutput( aErrorOutputFlag ); }
        if ( this.mCloudRasaNLU ) { this.mCloudRasaNLU.setErrorOutput( aErrorOutputFlag ); }
    }



    // Timeout-Funktionen


    /**
     * Aktion wird abgebrochen
     */

    protected _breakAction(): void {
        // console.log('CloudRasaPort._beakAction');
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
        // console.log('CloudRasaPort._setActionTimeout');
        if ( this.mActionTimeoutId === 0 && this.mActionTimeout > 0 ) {
            this.mActionTimeoutId = window.setTimeout(() => this._breakAction(), this.mActionTimeout );
        }
    }


    /**
     * Timeout fuer Aktion loeschen
     */

    protected _clearActionTimeout(): void {
        // console.log('CloudRasaPort._clearActionTimeout');
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
        // console.log('CloudRasaPort._onOnline');
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
        // console.log('CloudRasaPort._onOffline');
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
        // console.log('CloudRasaPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        // Hier wird die Verbindung zu onMessage der WebSocket geloescht
        if ( this.mCloudRasaConnect ) {
            this.mCloudRasaConnect.disconnect();
        }
        return super._onStop( aDest, aType );
    }


    // Port-Funktionen


    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {CloudRasaConfigDataInterface} aConfigData - Konfigurationsdaten { rasaAppKey: '', rasaAppId: '', rasaNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: CloudRasaConfigDataInterface ): number {
        // console.log('CloudRasaPort.setConfig: dynamicFlag = ', this.mDynamicCredentialsFlag);
        if ( this.mDynamicCredentialsFlag ) {
            // Uebertragen der neuen Credentials
            try {
                if ( typeof aConfigData.rasaServerUrl === 'string' && aConfigData.rasaServerUrl ) {
                    this.mCloudRasaConfig.serverUrl = aConfigData.rasaServerUrl;
                }
                /****
                if ( typeof aConfigData.rasaAppId === 'string' && aConfigData.rasaAppId ) {
                    this.mCloudRasaConfig.appId = aConfigData.rasaAppId;
                }
                ****/
                if ( typeof aConfigData.rasaAppKey === 'string' && aConfigData.rasaAppKey ) {
                    this.mCloudRasaConfig.appKey = aConfigData.rasaAppKey;
                }
                /****
                if ( typeof aConfigData.rasaNluTag === 'string' && aConfigData.rasaNluTag ) {
                    this.mCloudRasaConfig.nluTag = aConfigData.rasaNluTag;
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
            rasaServerUrl: this.mCloudRasaConfig.serverUrl,
            // rasaAppId: this.mCloudRasaConfig.appId,
            rasaAppKey: this.mCloudRasaConfig.appKey,
            // rasaNluTag: this.mCloudRasaConfig.nluTag
        };
        return configData;
    }


    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */

    isOnline(): boolean {
        if ( this.mCloudRasaNetwork ) {
            return this.mCloudRasaNetwork.isOnline();
        }
        return false;
    }


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean {
        if ( this.mCloudRasaConnect ) {
            // console.log('CloudRasaPort.isOpen:', this.mCloudRasaConnect.isConnect());
            return this.mCloudRasaConnect.isConnect();
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
        // pruefen, ob Netzwerk vorhanden ist
        if ( !this.isOnline()) {
            // console.log('MicrosoftPort._checkOpen: kein Netz vorhanden');
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
     * Port oeffnen und mit Server verbinden
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    open( aOption?: any ): number {
        // console.log('CloudRasaPort.open');
        if ( !this.mCloudRasaConnect ) {
            this.error('open', 'kein CloudRasaConnect vorhanden');
            return -1;
        }
        if ( this.isOpen()) {
            return 0;
        }
        const result = this.mCloudRasaConnect.connect();
        if ( result === 0 ) {
            this._onOpen();
        }
        return result;
    }


    /**
     * Port schliessen und Server-Verbindung trennen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    close(): number {
        if ( !this.isOpen()) {
            return 0;
        }
        // console.log('CloudRasaPort.close');
        if ( this.mCloudRasaConnect ) {
            this._onClose();
            return this.mCloudRasaConnect.disconnect();
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
     * Pruefen, welche CloudRasa-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        let result = false;
        switch ( aAction ) {
            case CLOUDRASA_NLU_ACTION:
                result = this.mCloudRasaNLU ? true : false;
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
        // console.log('CloudRasaPort.stop:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if ( this.isRunning()) {
            this.error( 'start', 'Aktion laeuft bereits' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudRasaConfig.isCredentials()) {
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
                case CLOUDRASA_NLU_ACTION:
                    this.mTransaction = new PortTransaction( aPluginName, CLOUDRASA_NLU_ACTION );
                    result = this._startNLU( this.mTransaction, option.text, option.language || CLOUDRASA_DEFAULT_LANGUAGE );
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
        // console.log('CloudRasaPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if ( !this.isRunning()) {
            // console.log('CloudRasaPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if ( !this.isOpen()) {
            this.error( 'stop', 'Port ist nicht geoeffnet' );
            return -1;
        }
        // pruefen auf Credentials
        if ( !this.mCloudRasaConfig.isCredentials()) {
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
        // console.log('CloudRasaPort.stop: Action = ', aAction);
        switch ( aAction ) {
            case CLOUDRASA_NLU_ACTION:
                result = this._stopNLU( this.mTransaction );
                break;
            default:
                this.error( 'stop', 'Keine gueltige Aktion uebergeben ' + aAction );
                result = -1;
                break;
        }
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

    protected _startNLU( aTransaction: PortTransaction, aText: string, aLanguage: string ): number {
        if ( !aText ) {
            this.error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !aLanguage ) {
            this.error( '_startNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mCloudRasaNLU ) {
            this.error( '_startNLU', 'keine CloudRasa NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage
            };
            return this.mCloudRasaNLU.start( aTransaction, option );
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
        if ( !this.mCloudRasaNLU ) {
            this.error( '_stopNLU', 'keine CloudRasa NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mCloudRasaNLU.stop( aTransaction );
        } catch ( aException ) {
            this.exception( '_stopNLU', aException );
            return -1;
        }
        return -1;
    }

}
