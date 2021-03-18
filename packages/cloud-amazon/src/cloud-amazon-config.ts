/** @packageDocumentation
 * CloudAmazon Konstanten Verwaltung
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// common

import { FileHtml5ReaderInterface } from '@speech/common';


// cloud-amazon

import { CLOUDAMAZON_CONFIG_PATH, CLOUDAMAZON_CONFIG_FILE, CLOUDAMAZON_CONFIG_LOAD, CLOUDAMAZON_DEFAULT_URL } from './cloud-amazon-const';
import { CloudAmazonOptionInterface } from './cloud-amazon-option.interface';


export class CloudAmazonConfig extends ErrorBase {

    private mInitFlag = false;

    // Configdatei-Daten

    private mConfigPath: string = CLOUDAMAZON_CONFIG_PATH;
    private mConfigFile: string = CLOUDAMAZON_CONFIG_FILE;
    private mConfigLoadFlag: boolean = CLOUDAMAZON_CONFIG_LOAD;

    // Nuance-Konfigurationsdaten

    private mConfigServerUrl = CLOUDAMAZON_DEFAULT_URL;

    private mConfigRegion = '';
    private mConfigIdentityPoolId = '';
    private mConfigUserId = '';
    private mConfigNluTag = '';

    // FileReader

    private mFileReader: FileHtml5ReaderInterface = null;


    // Initialisierung fertig

    private mOnInitFunc: (aResult: number) => void = null;
    private mOnErrorFunc: (aError: number) => void = null;


    /**
     * Creates an instance of CloudAmazonConfig.
     */

    constructor( aFileReader: FileHtml5ReaderInterface ) {
        super( 'CloudAmazonConfig' );
        this.mFileReader = aFileReader;
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: CloudAmazonOptionInterface ): void {
        if ( !aOption ) {
            return;
        }

        // Parameter eintragen

        if ( typeof aOption.amazonConfigPath === 'string' ) {
            this.mConfigPath = aOption.amazonConfigPath;
        }
        if ( typeof aOption.amazonConfigFile === 'string' ) {
            this.mConfigFile = aOption.amazonConfigFile;
        }
        if ( typeof aOption.amazonConfigLoadFlag === 'boolean' ) {
            this.mConfigLoadFlag = aOption.amazonConfigLoadFlag;
        }
        if ( typeof aOption.amazonServerUrl === 'string' ) {
            this.mConfigServerUrl = aOption.amazonServerUrl;
        }
        if ( typeof aOption.amazonRegion === 'string' ) {
            this.mConfigRegion = aOption.amazonRegion;
        }
        if ( typeof aOption.amazonIdentityPoolId === 'string' ) {
            this.mConfigIdentityPoolId = aOption.amazonIdentityPoolId;
        }
        if ( typeof aOption.amazonUserId === 'string' ) {
            this.mConfigUserId = aOption.amazonUserId;
        }
        if ( typeof aOption.amazonNluTag === 'string' ) {
            this.mConfigNluTag = aOption.amazonNluTag;
        }
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {CloudAmazonOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: CloudAmazonOptionInterface ): number {
        // console.log('CloudAmazonConfig.init:', aOption);

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
        this.mConfigPath = CLOUDAMAZON_CONFIG_PATH;
        this.mConfigFile = CLOUDAMAZON_CONFIG_FILE;
        this.mConfigLoadFlag = CLOUDAMAZON_CONFIG_LOAD;

        // Nuance-Konfigurationsdaten

        this.mConfigServerUrl = CLOUDAMAZON_DEFAULT_URL;
        this.mConfigRegion = '';
        this.mConfigIdentityPoolId = '';
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
        // console.log('CloudAmazonConfig._onInit: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if ( aResult === 0 ) {
            this.mInitFlag = true;
        }
        if ( typeof this.mOnInitFunc === 'function' ) {
            // console.log('CloudAmazonConfig._onInit: call', aResult);
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
        // console.log('CloudAmazonConfig._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('CloudAmazonConfig._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc( aError );
                return 0;
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION CloudAmazonConfig._onError: ', aException.message );
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
        // console.log('CloudAmazonConfig.set onInit:', aOnInitFunc);
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
        // console.log('CloudAmazonConfig._readConfigData:', aFileData);
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
            if ( configData.IDENTITY_POOL_ID ) {
                this.identityPoolId = configData.IDENTITY_POOL_ID;
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
        // console.log('CloudAmazonConfig.setServerUrl:', aUrl);
        this.mConfigServerUrl = aUrl;
    }

    get serverUrl() {
        // console.log('CloudAmazonConfig.getServerUrl:', this.mConfigServerUrl);
        return this.mConfigServerUrl;
    }

    set region( aRegion: string ) {
        this.mConfigRegion = aRegion;
    }

    get region() {
        return this.mConfigRegion;
    }

    set identityPoolId( aIdentityPoolId: string ) {
        this.mConfigIdentityPoolId = aIdentityPoolId;
    }

    get identityPoolId() {
        return this.mConfigIdentityPoolId;
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
        if ( this.mConfigIdentityPoolId && this.mConfigRegion ) {
            return true;
        }
        return false;
    }
}
