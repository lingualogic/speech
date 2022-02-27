/** @packageDocumentation
 * Cloud Konfiguration Verwaltung fuer alle Cloud-Ports (oberste Konfigurationsebene)
 *
 * Diese Konfiguration dient der Verwaltung aller Konfigurationen aller Ports und Devices
 * Fuer jeden Cloud-Port wird ein Konfigurationsobjekt zurueckgegeben. 
 * Die Gesamtkonfiguration wird vom CloudManager verwaltet.
 * 
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// file

import { IFileBaseReader } from '@lingualogic-speech/file';


// cloud

import { CLOUD_CONFIG_PATH, CLOUD_CONFIG_FILE, CLOUD_CONFIG_LOAD } from './cloud-const';
import { ICloudOption } from './cloud-option.interface';
import { ICloudConfig } from './cloud-config.interface';
export { ICloudConfig };


export class CloudConfig extends ErrorBase implements ICloudConfig {


    private mInitFlag = false;


    // Configdatei-Daten

    private mConfigPath: string = CLOUD_CONFIG_PATH;
    private mConfigFile: string = CLOUD_CONFIG_FILE;
    private mConfigLoadFlag: boolean = CLOUD_CONFIG_LOAD;


    // FileReader

    private mFileReader: IFileBaseReader = null;


    // Event-Funktionen

    private mOnInitFunc: (aResult: number) => void = null;
    private mOnResultFunc: (aResult: any) => void = null;
    private mOnErrorFunc: (aError: number) => void = null;


    /**
     * Creates an instance of AmazonConfig.
     */

    constructor( aFileReader: IFileBaseReader ) {
        super( 'CloudConfig' );
        this.mFileReader = aFileReader;
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));
    }


    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: ICloudOption ): void {
        if ( !aOption ) {
            return;
        }

        // Parameter eintragen

        if ( typeof aOption.configPath === 'string' ) {
            this.mConfigPath = aOption.configPath;
        }
        if ( typeof aOption.configFile === 'string' ) {
            this.mConfigFile = aOption.configFile;
        }
        if ( typeof aOption.configLoadFlag === 'boolean' ) {
            this.mConfigLoadFlag = aOption.configLoadFlag;
        }
        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }
    }


    /**
     * Initialisierung
     *
     * @param aOptions - optionale Parameter
     * @return errorCode (0,-1) - Fehlercode
     */

    init( aOption?: ICloudOption ): number {
        // console.log('GoogleConfig.init: start', aOption);

        // Konfigurationsdaten uebertragen

        if ( aOption ) {
            this._setOption( aOption );
        }

        // FileReader pruefen

        if ( !this.mFileReader ) {
            this.error( 'init', 'kein FileReader vorhanden' );
            this._onInit( -1 );
            return -1;
        }

        // Readfunktion in FileReader eintragen

        this.mFileReader.onRead = (aFileData: string) => this._readConfigData( aFileData );
        this.mFileReader.onError = (aErrorText: string) => this._readError( aErrorText );

        // Config-Datei einlesen

        if ( this.mConfigLoadFlag ) {
            if ( this.read() !== 0 ) {
                return -1;
            }
        }

        this.mInitFlag = true;

        // Event zum Beenden senden

        if ( !this.mConfigLoadFlag ) {
            this._onInit( 0 );
        }

        // console.log('GoogleConfig.init: end');
        return 0;
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mInitFlag = false;
        this.mConfigPath = CLOUD_CONFIG_PATH;
        this.mConfigFile = CLOUD_CONFIG_FILE;
        this.mConfigLoadFlag = CLOUD_CONFIG_LOAD;

        // FileReader

        this.mFileReader = null;

        // Initialisierung fertig

        this.mOnInitFunc = null;
        this.mOnResultFunc = null;
        this.mOnErrorFunc = null;
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
        // console.log('CloudConfig._onInit: start', aResult);
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
     * Sendet Event fuer Ergebnisdaten
     *
     * @param aResult - Ergebnisdaten aus der Datei
     */

     protected _onResult( aResult: any ): void {
        // console.log('CloudConfig._onResult: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if ( typeof this.mOnResultFunc === 'function' ) {
            // console.log('AmazonConfig._onInit: call', aResult);
            this.mOnResultFunc( aResult );
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
        // console.log('CloudConfig._onError:', aError);
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
     * Ergebnis-Event eintragen
     */

     set onResult( aOnResultFunc: (aResult: any) => void ) {
        // console.log('AmazonConfig.set onInit:', aOnInitFunc);
        this.mOnResultFunc = aOnResultFunc;
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
            this._onInit( -1 );
            return -1;
        }
        try {
            // String in Json-Objekt umwandeln
            const configData = JSON.parse( aFileData );
            this._onResult( configData );
            this._onInit( 0 );
            return 0;
        } catch ( aException ) {
            this.exception( '_readConfigData', aException );
            this._onInit( -1 );
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


    set configPath( aPath: string ) {
        this.mConfigPath = aPath;
    }

    get configPath() {
        return this.mConfigPath;
    }

    set configFile( aFileName: string ) {
        this.mConfigFile = aFileName;
    }

    get configFile() {
        return this.mConfigFile;
    }

    set configLoadFlag( aLoadFlag: boolean ) {
        this.mConfigLoadFlag = aLoadFlag;
    }

    get configLoadFlag() {
        return this.mConfigLoadFlag;
    }

    set errorOutputFlag( aErrorOutputFlag: boolean ) {
        this.setErrorOutput( aErrorOutputFlag );
    }

    get errorOutputFlag() {
        return this.isErrorOutput();
    }

}
