/** @packageDocumentation
 * Diese Komponente liest eine Datei in den Browser als String
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module file/reader
 * @author SB
 */


// core

import { FactoryManager, Plugin } from '@lingualogic-speech/core';


// net

import { XMLHTTPREQUEST_TEXT_RESPONSETYPE } from '@lingualogic-speech/net';


// file

import { IFileBaseReader } from '../common/file-base-reader.interface';
import { FileBaseReaderFactory, FILEBASEREADER_FACTORY_NAME } from '../common/file-base-reader-factory';
import { FILEREADER_PLUGIN_NAME } from '../const/file-const';
import { IFileReader, FileReaderReadFunc, OnFileReaderReadFunc } from './file-reader.interface';


/**
 * FileReader Klasse zum Laden einer Datei in HTML5 mit XMLHttpRequest
 */

export class FileReader extends Plugin implements IFileReader {

    // interne Implementierungsklasse zum Einlesen von Dateien aus dem Browser

    private mFileBaseReader: IFileBaseReader = null;


    /**
     * Creates an instance of FileReader.
     *
     * @param {boolean} aRegisterFlag - wenn true, wird das Plugin in den PluginManager eingetragen
     */

    constructor( aRegisterFlag = true ) {
        super( FILEREADER_PLUGIN_NAME, aRegisterFlag );
        const factory = FactoryManager.get( FILEBASEREADER_FACTORY_NAME, FileBaseReaderFactory );
        if ( factory ) {
            this.mFileBaseReader = factory.create();
            if ( this.mFileBaseReader ) {
                // verbinden der Errorfunktion mit dem ErrorEvent
                this.mFileBaseReader.onError = this.onError;
            }
        }
    }


    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return 'FileReader';
    }


    getClass(): string {
        return 'FileReader';
    }


    /**
     * Laufzeitumgebung zurueckgeben.
     * 
     * @returns browser oder node
     */

    getRuntimeType(): string {
        if ( this.mFileBaseReader ) {
            return this.mFileBaseReader.getRuntimeType();
        }
        return 'undefined';
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {any} [aOptions] - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOptions?: any ): number {
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this.error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // FileHBrowserReader initialisieren

        if ( !this.mFileBaseReader || this.mFileBaseReader.init( aOptions ) !== 0 ) {
            return -1;
        }

        return super.init( aOptions );
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        if ( this.mFileBaseReader ) {
            this.mFileBaseReader.done();
        }
        return super.done();
    }


    /**
     * pruefen, ob Initialisierung fertig ist
     * 
     * @returns null oder Promise
     */

     initWait(): Promise<any> {
        if ( this.mFileBaseReader ) {
            return this.mFileBaseReader.initWait();
        }
        // Dummy-Promise erzeugen
        return new Promise<any>((resolve, reject) => resolve( null ));
    }


    // Error-Funktionen


    setErrorOutput( aOutputFlag: boolean): void {
        super.setErrorOutput( aOutputFlag );
        if ( this.mFileBaseReader ) {
            this.mFileBaseReader.setErrorOutput( aOutputFlag );
        }
    }


    // FileReader-Funktionen


    getReadFunc(): FileReaderReadFunc {
        return (aFileUrl: string) => {
            return this.read( aFileUrl );
        };
    }


    /**
     * Einlesen einer Datei
     *
     * @param {string} aFileUrl - Pfad fuer einzulesende Datei
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string ): number {
        // console.log('FileReader.loadDialogFile:', aFileUrl);
        if ( !this.isInit()) {
            this.error( 'read', 'nicht initialisiert' );
            return -1;
        }
        if ( this.mFileBaseReader ) {
            return this.mFileBaseReader.read( aFileUrl, XMLHTTPREQUEST_TEXT_RESPONSETYPE );
        }
        return -1;
    }


    /**
     * Laden einer Datei
     *
     * @public
     * @param {string} aUrl - Pfad fuer einzulesende Datei
     * @return {number} errorCode(0,-1) - Fehlercode
     * @deprecated
     */

    loadDialogFile( aUrl: string ): number {
        return this.read( aUrl );
    }


    /**
     * onRead Callback-Funktion eintragen
     *
     * @param {OnFileReaderReadFunc} aReadFunc - Callback fuer Dateidaten geladen
     */

    set onRead( aReadFunc: OnFileReaderReadFunc ) {
        if ( this.mFileBaseReader ) {
            this.mFileBaseReader.onRead = aReadFunc;
        }
    }


    /**
     * Dialogdaten laden Callback-Funktion eintragen
     *
     * @param {OnFileReaderReadFunc} aReadFunc - Callback fuer Dialogdaten laden
     * @deprecated
     */

    set onLoadDialogFile( aReadFunc: OnFileReaderReadFunc ) {
        if ( this.mFileBaseReader ) {
            this.mFileBaseReader.onRead = aReadFunc;
        }
    }

}
