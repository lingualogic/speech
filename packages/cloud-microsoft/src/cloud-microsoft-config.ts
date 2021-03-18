/** @packageDocumentation
 * CloudMicrosoft Konstanten Verwaltung
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// common

import { FileHtml5ReaderInterface } from '@speech/common';


// cloud-microsoft

import { CLOUDMICROSOFT_CONFIG_PATH, CLOUDMICROSOFT_CONFIG_FILE, CLOUDMICROSOFT_CONFIG_LOAD, CLOUDMICROSOFT_DEFAULT_URL } from './cloud-microsoft-const';
import { CloudMicrosoftOptionInterface } from './cloud-microsoft-option.interface';


export class CloudMicrosoftConfig extends ErrorBase {

    private mInitFlag = false;

    // Configdatei-Daten

    private mConfigPath: string = CLOUDMICROSOFT_CONFIG_PATH;
    private mConfigFile: string = CLOUDMICROSOFT_CONFIG_FILE;
    private mConfigLoadFlag: boolean = CLOUDMICROSOFT_CONFIG_LOAD;

    // Nuance-Konfigurationsdaten

    private mConfigServerUrl = CLOUDMICROSOFT_DEFAULT_URL;

    private mConfigRegion = '';
    private mConfigSubscriptionKey = '';
    private mConfigLuisEndpoint = '';
    private mConfigUserId = '';
    private mConfigNluTag = '';

    // FileReader

    private mFileReader: FileHtml5ReaderInterface = null;


    // Initialisierung fertig

    private mOnInitFunc: (aResult: number) => void = null;
    private mOnErrorFunc: (aError: number) => void = null;


    /**
     * Creates an instance of CloudMicrosoftConfig.
     */

    constructor( aFileReader: FileHtml5ReaderInterface ) {
        super( 'CloudMicrosoftConfig' );
        this.mFileReader = aFileReader;
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: CloudMicrosoftOptionInterface ): void {
        if ( !aOption ) {
            return;
        }

        // Parameter eintragen

        if ( typeof aOption.microsoftConfigPath === 'string' ) {
            this.mConfigPath = aOption.microsoftConfigPath;
        }
        if ( typeof aOption.microsoftConfigFile === 'string' ) {
            this.mConfigFile = aOption.microsoftConfigFile;
        }
        if ( typeof aOption.microsoftConfigLoadFlag === 'boolean' ) {
            this.mConfigLoadFlag = aOption.microsoftConfigLoadFlag;
        }
        if ( typeof aOption.microsoftServerUrl === 'string' ) {
            this.mConfigServerUrl = aOption.microsoftServerUrl;
        }
        if ( typeof aOption.microsoftRegion === 'string' ) {
            this.mConfigRegion = aOption.microsoftRegion;
        }
        if ( typeof aOption.microsoftSubscriptionKey === 'string' ) {
            this.mConfigSubscriptionKey = aOption.microsoftSubscriptionKey;
        }
        if ( typeof aOption.microsoftLuisEndpoint === 'string' ) {
            this.mConfigLuisEndpoint = aOption.microsoftLuisEndpoint;
        }
        if ( typeof aOption.microsoftUserId === 'string' ) {
            this.mConfigUserId = aOption.microsoftUserId;
        }
        if ( typeof aOption.microsoftNluTag === 'string' ) {
            this.mConfigNluTag = aOption.microsoftNluTag;
        }
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {CloudMicrosoftOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: CloudMicrosoftOptionInterface ): number {
        // console.log('CloudMicrosoftConfig.init:', aOption);

        // Konfigurationsdaten fuer Nuance uebertragen

        this._setOption( aOption );

        // TODO: Muss fuer NodeJS-Version angepasst werden, sollte nicht in init eingelesen werden,
        //       sondern als eigenstaendige Funktion aufgerufen werden!
        /**** File-Reader wird nicht im Browser verwendet, sondern spaeter einmal nur in NodeJS
        // FileReader pruefen

        if ( !this.mFileReader ) {
            this._error( 'init', 'kein FileReader vorhanden' );
            this._onInit( -1 );
            return -1;
        }

        // Readfunktion in FileReader eintragen

        this.mFileReader.onRead = (aFileData: string) => this._readConfigData( aFileData );
        this.mFileReader.onError = (aErrorText: string) => this._readError( aErrorText );

        // Config-Datei einlesen

        if ( this.mConfigLoadFlag ) {
            return this.read();
        }
        ****/

        this.mInitFlag = true;
        return 0;
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mInitFlag = false;
        this.mConfigPath = CLOUDMICROSOFT_CONFIG_PATH;
        this.mConfigFile = CLOUDMICROSOFT_CONFIG_FILE;
        this.mConfigLoadFlag = CLOUDMICROSOFT_CONFIG_LOAD;

        // Nuance-Konfigurationsdaten

        this.mConfigServerUrl = CLOUDMICROSOFT_DEFAULT_URL;
        this.mConfigRegion = '';
        this.mConfigSubscriptionKey = '';
        this.mConfigLuisEndpoint = '';
        this.mConfigUserId = '';
        this.mConfigNluTag = '';

        // FileReader

        this.mFileReader = null;

        // Initialisierung fertig

        this.mOnInitFunc = null;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * Sendet Event fuer fertige Initialisierung
     *
     * @param aResult - Fehlercode 0 oder -1
     */

    protected _onInit( aResult: number ): void {
        // console.log('CloudMicrosoftConfig._onInit: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if ( aResult === 0 ) {
            this.mInitFlag = true;
        }
        if ( typeof this.mOnInitFunc === 'function' ) {
            // console.log('CloudMicrosoftConfig._onInit: call', aResult);
            this.mOnInitFunc( aResult );
        }
    }


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */

    protected _onError( aError: any ): number {
        // console.log('CloudMicrosoftConfig._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('CloudMicrosoftConfig._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc( aError );
                return 0;
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION CloudMicrosoftConfig._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Initialisierungs-Event eintragen
     */

    set onInit( aOnInitFunc: (aResult: number) => void ) {
        // console.log('CloudMicrosoftConfig.set onInit:', aOnInitFunc);
        this.mOnInitFunc = aOnInitFunc;
    }


    /**
     * Error-Event Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnErrorFunc
     */

    set onError( aOnErrorFunc: (aError: any) => void ) {
        // console.log('Plugin.onError:', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
    }


    /**
     * Einlesen der Config-Daten aus google.json (REGION, IDENTITY_POOL_ID)
     *
     * @param aFileData - ConfigDaten als JSON-String
     */

    protected _readConfigData( aFileData: string ): number {
        // console.log('CloudMicrosoftConfig._readConfigData:', aFileData);
        if ( !aFileData ) {
            this.error( '_readConfigData', 'keine Daten uebergeben' );
            return -1;
        }
        try {
            // String in Json-Objekt umwandeln
            const configData = JSON.parse( aFileData );
            if ( configData.URL ) {
                this.serverUrl = configData.URL;
            }
            if ( configData.REGION ) {
                this.region = configData.REGION;
            }
            if ( configData.SUBSCRIPTION_KEY ) {
                this.subscriptionKey = configData.SUBSCRIPTION_KEY;
            }
            if ( configData.LUIS_ENDPOINT ) {
                this.luisEndpoint = configData.LUIS_ENDPOINT;
            }
            if ( configData.USER_ID ) {
                this.userId = configData.USER_ID;
            }
            if ( configData.NLU_TAG ) {
                this.nluTag = configData.NLU_TAG;
            }
            this._onInit( 0 );
            return 0;
        } catch ( aException ) {
            this.exception( '_readConfigData', aException );
            return -1;
        }
    }


    /**
     * Rueckgabe eines Fehlers beim Einlesen der Daten
     *
     * @param aErrorText - Fehlerbeschreibung
     */

    protected _readError( aErrorText: string ): void {
        this.error( '_readError', aErrorText );
        this._onInit( -1 );
    }


    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */

    read(): number {
        if ( !this.mFileReader ) {
            this.error( 'read', 'kein FileReader vorhanden' );
            this._onInit( -1 );
            return -1;
        }
        const fileUrl = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read( fileUrl );
    }


    // Konfigurations-Funktionen


    set serverUrl( aUrl: string ) {
        // console.log('CloudMicrosoftConfig.setServerUrl:', aUrl);
        this.mConfigServerUrl = aUrl;
    }

    get serverUrl() {
        // console.log('CloudMicrosoftConfig.getServerUrl:', this.mConfigServerUrl);
        return this.mConfigServerUrl;
    }

    set region( aRegion: string ) {
        this.mConfigRegion = aRegion;
    }

    get region() {
        return this.mConfigRegion;
    }

    set subscriptionKey( aSubscriptionKey: string ) {
        this.mConfigSubscriptionKey = aSubscriptionKey;
    }

    get subscriptionKey() {
        return this.mConfigSubscriptionKey;
    }

    set luisEndpoint( aLuisEndpoint: string ) {
        this.mConfigLuisEndpoint = aLuisEndpoint;
    }

    get luisEndpoint() {
        return this.mConfigLuisEndpoint;
    }

    set userId( aUserId: string ) {
        this.mConfigUserId = aUserId;
    }

    get userId() {
        return this.mConfigUserId;
    }

    set nluTag( aNluTag: string ) {
        this.mConfigNluTag = aNluTag;
    }

    get nluTag() {
        return this.mConfigNluTag;
    }


    // pruefen auf vorhandene Credentials

    isCredentials(): boolean {
        if ( this.mConfigSubscriptionKey && this.mConfigRegion ) {
            return true;
        }
        return false;
    }
}
