/** @packageDocumentation
 * CloudGoogle Konstanten Verwaltung
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// common

import { FileHtml5ReaderInterface } from '@speech/common';


// cloud-google

import { CLOUDGOOGLE_CONFIG_PATH, CLOUDGOOGLE_CONFIG_FILE, CLOUDGOOGLE_CONFIG_LOAD, CLOUDGOOGLE_DEFAULT_URL } from './cloud-google-const';
import { CloudGoogleOptionInterface } from './cloud-google-option.interface';


export class CloudGoogleConfig extends ErrorBase {

    private mInitFlag = false;

    // Configdatei-Daten

    private mConfigPath: string = CLOUDGOOGLE_CONFIG_PATH;
    private mConfigFile: string = CLOUDGOOGLE_CONFIG_FILE;
    private mConfigLoadFlag: boolean = CLOUDGOOGLE_CONFIG_LOAD;

    // Nuance-Konfigurationsdaten

    private mConfigServerUrl = CLOUDGOOGLE_DEFAULT_URL;
    private mConfigDialogflowTokenServerUrl = '';
    private mConfigDialogflowProjectId = '';
    private mConfigDialogflowSessionId = '';
    private mConfigDialogflowEnvironmentName = '';

    private mConfigAppId = '';
    private mConfigAppKey = '';
    private mConfigUserId = '';
    private mConfigNluTag = '';

    // FileReader

    private mFileReader: FileHtml5ReaderInterface = null;


    // Initialisierung fertig

    private mOnInitFunc: (aResult: number) => void = null;
    private mOnErrorFunc: (aError: number) => void = null;


    /**
     * Creates an instance of AmazonConfig.
     */

    constructor( aFileReader: FileHtml5ReaderInterface ) {
        super( 'CloudGoogleConfig' );
        this.mFileReader = aFileReader;
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: CloudGoogleOptionInterface ): void {
        if ( !aOption ) {
            return;
        }

        // Parameter eintragen

        if ( typeof aOption.googleConfigPath === 'string' ) {
            this.mConfigPath = aOption.googleConfigPath;
        }
        if ( typeof aOption.googleConfigFile === 'string' ) {
            this.mConfigFile = aOption.googleConfigFile;
        }
        if ( typeof aOption.googleConfigLoadFlag === 'boolean' ) {
            this.mConfigLoadFlag = aOption.googleConfigLoadFlag;
        }
        if ( typeof aOption.googleServerUrl === 'string' ) {
            this.mConfigServerUrl = aOption.googleServerUrl;
        }
        if ( typeof aOption.dialogflowTokenServerUrl === 'string' ) {
            this.mConfigDialogflowTokenServerUrl = aOption.dialogflowTokenServerUrl;
        }
        if ( typeof aOption.dialogflowProjectId === 'string' ) {
            this.mConfigDialogflowProjectId = aOption.dialogflowProjectId;
        }
        if ( typeof aOption.dialogflowSessionId === 'string' ) {
            this.mConfigDialogflowSessionId = aOption.dialogflowSessionId;
        }
        if ( typeof aOption.dialogflowEnvironmentName === 'string' ) {
            this.mConfigDialogflowEnvironmentName = aOption.dialogflowEnvironmentName;
        }
        if ( typeof aOption.googleAppId === 'string' ) {
            this.mConfigAppId = aOption.googleAppId;
        }
        if ( typeof aOption.googleAppKey === 'string' ) {
            this.mConfigAppKey = aOption.googleAppKey;
        }
        if ( typeof aOption.googleUserId === 'string' ) {
            this.mConfigUserId = aOption.googleUserId;
        }
        if ( typeof aOption.googleNluTag === 'string' ) {
            this.mConfigNluTag = aOption.googleNluTag;
        }
        if ( typeof aOption.googleNluTag === 'string' ) {
            this.mConfigNluTag = aOption.googleNluTag;
        }
        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {CloudGoogleOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: CloudGoogleOptionInterface ): number {
        // console.log('AmazonConfig.init:', aOption);

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
        this.mConfigPath = CLOUDGOOGLE_CONFIG_PATH;
        this.mConfigFile = CLOUDGOOGLE_CONFIG_FILE;
        this.mConfigLoadFlag = CLOUDGOOGLE_CONFIG_LOAD;

        // Nuance-Konfigurationsdaten

        this.mConfigServerUrl = CLOUDGOOGLE_DEFAULT_URL;
        this.mConfigDialogflowTokenServerUrl = '';
        this.mConfigDialogflowProjectId = '';
        this.mConfigDialogflowSessionId = '';
        this.mConfigDialogflowEnvironmentName = '';
        this.mConfigAppId = '';
        this.mConfigAppKey = '';
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
        // console.log('AmazonConfig._onInit: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if ( aResult === 0 ) {
            this.mInitFlag = true;
        }
        if ( typeof this.mOnInitFunc === 'function' ) {
            // console.log('AmazonConfig._onInit: call', aResult);
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
        // console.log('AmazonConfig._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('AmazonConfig._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc( aError );
                return 0;
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION AmazonConfig._onError: ', aException.message );
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
        // console.log('AmazonConfig.set onInit:', aOnInitFunc);
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
     * Einlesen der Config-Daten aus nuance.json (APP_ID, APP_KEY, NLU_TAG)
     *
     * @param aFileData - ConfigDaten als JSON-String
     */

    protected _readConfigData( aFileData: string ): number {
        // console.log('AmazonConfig._readConfigData:', aFileData);
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
            if ( configData.APP_ID ) {
                this.appId = configData.APP_ID;
            }
            if ( configData.APP_KEY ) {
                this.appKey = configData.APP_KEY;
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
        // console.log('AmazonConfig.setServerUrl:', aUrl);
        this.mConfigServerUrl = aUrl;
    }

    get serverUrl() {
        // console.log('AmazonConfig.getServerUrl:', this.mConfigServerUrl);
        return this.mConfigServerUrl;
    }

    set dialogflowTokenServerUrl( aUrl: string ) {
        // console.log('CloudGoogleConfig.setDialogflowTokenServerUrl:', aUrl);
        this.mConfigDialogflowTokenServerUrl = aUrl;
    }

    get dialogflowTokenServerUrl() {
        // console.log('CloudGoogleConfig.getDialogflowTokenServerUrl:', this.mConfigDiaogflowTokenServerUrl);
        return this.mConfigDialogflowTokenServerUrl;
    }

    set dialogflowProjectId( aProjectId: string ) {
        // console.log('CloudGoogleConfig.setDialogflowProjectId:', aProjectId);
        this.mConfigDialogflowProjectId = aProjectId;
    }

    get dialogflowProjectId() {
        // console.log('CloudGoogleConfig.getDialogflowProjectId:', this.mConfigDiaogflowProjectId);
        return this.mConfigDialogflowProjectId;
    }

    set dialogflowSessionId( aSessionId: string ) {
        // console.log('CloudGoogleConfig.setDialogflowSessionId:', aSessionId);
        this.mConfigDialogflowSessionId = aSessionId;
    }

    get dialogflowSessionId() {
        // console.log('CloudGoogleConfig.getDialogflowSessionId:', this.mConfigDiaogflowSessionId);
        return this.mConfigDialogflowSessionId;
    }

    set dialogflowEnvironmentName( aEnvironmentName: string ) {
        // console.log('CloudGoogleConfig.setDialogflowEnvironmentName:', aEnvironmentName);
        this.mConfigDialogflowEnvironmentName = aEnvironmentName;
    }

    get dialogflowEnvironmentName() {
        // console.log('CloudGoogleConfig.getDialogflowEnvironmentName:', this.mConfigDiaogflowEnvironmentName);
        return this.mConfigDialogflowEnvironmentName;
    }

    set appId( aAppId: string ) {
        this.mConfigAppId = aAppId;
    }

    get appId() {
        return this.mConfigAppId;
    }

    set appKey( aAppKey: string ) {
        this.mConfigAppKey = aAppKey;
    }

    get appKey() {
        return this.mConfigAppKey;
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
        if ( this.mConfigAppKey || ( this.mConfigDialogflowTokenServerUrl && this.mConfigDialogflowProjectId )) {
            return true;
        }
        return false;
    }
}
