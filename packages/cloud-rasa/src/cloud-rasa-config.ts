/** @packageDocumentation
 * CloudRasa Konstanten Verwaltung
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// common

import { FileHtml5ReaderInterface } from '@speech/common';


// cloud-rasa

import { CLOUDRASA_CONFIG_PATH, CLOUDRASA_CONFIG_FILE, CLOUDRASA_CONFIG_LOAD, CLOUDRASA_DEFAULT_URL } from './cloud-rasa-const';
import { CloudRasaOptionInterface } from './cloud-rasa-option.interface';


export class CloudRasaConfig extends ErrorBase {

    private mInitFlag = false;

    // Configdatei-Daten

    private mConfigPath: string = CLOUDRASA_CONFIG_PATH;
    private mConfigFile: string = CLOUDRASA_CONFIG_FILE;
    private mConfigLoadFlag: boolean = CLOUDRASA_CONFIG_LOAD;

    // Nuance-Konfigurationsdaten

    private mConfigServerUrl = CLOUDRASA_DEFAULT_URL;

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
        super( 'CloudRasaConfig' );
        this.mFileReader = aFileReader;
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: CloudRasaOptionInterface ): void {
        if ( !aOption ) {
            return;
        }

        // Parameter eintragen

        if ( typeof aOption.rasaConfigPath === 'string' ) {
            this.mConfigPath = aOption.rasaConfigPath;
        }
        if ( typeof aOption.rasaConfigFile === 'string' ) {
            this.mConfigFile = aOption.rasaConfigFile;
        }
        if ( typeof aOption.rasaConfigLoadFlag === 'boolean' ) {
            this.mConfigLoadFlag = aOption.rasaConfigLoadFlag;
        }
        if ( typeof aOption.rasaServerUrl === 'string' ) {
            this.mConfigServerUrl = aOption.rasaServerUrl;
        }
        if ( typeof aOption.rasaAppId === 'string' ) {
            this.mConfigAppId = aOption.rasaAppId;
        }
        if ( typeof aOption.rasaAppKey === 'string' ) {
            this.mConfigAppKey = aOption.rasaAppKey;
        }
        if ( typeof aOption.rasaUserId === 'string' ) {
            this.mConfigUserId = aOption.rasaUserId;
        }
        if ( typeof aOption.rasaNluTag === 'string' ) {
            this.mConfigNluTag = aOption.rasaNluTag;
        }
        if ( typeof aOption.rasaNluTag === 'string' ) {
            this.mConfigNluTag = aOption.rasaNluTag;
        }
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {CloudRasaOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: CloudRasaOptionInterface ): number {
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
        this.mConfigPath = CLOUDRASA_CONFIG_PATH;
        this.mConfigFile = CLOUDRASA_CONFIG_FILE;
        this.mConfigLoadFlag = CLOUDRASA_CONFIG_LOAD;

        // Nuance-Konfigurationsdaten

        this.mConfigServerUrl = CLOUDRASA_DEFAULT_URL;
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
        if ( this.mConfigAppKey ) {
            return true;
        }
        return false;
    }
}
