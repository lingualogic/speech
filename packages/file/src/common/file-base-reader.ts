/** @packageDocumentation
 * FileBaseReader ohne Abhaengigkeiten zu anderen Komponenten
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module file/common
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// common

import { IFileBaseReader, OnFileBaseReaderReadFunc, OnFileBaseErrorFunc,  } from './file-base-reader.interface';


/**
 * FileBaseReader zum Einlesen von Dateien im Base
 */

export class FileBaseReader extends ErrorBase implements IFileBaseReader {


    mInitWaitPromise: Promise<any> = null;


    /**
     * Callback-Funktion fuer Read-Event
     * @member {callback} mOnReadFunc
     * @private
     */

    protected mOnReadFunc: OnFileBaseReaderReadFunc = null;


    /**
     * Callback-Funktion fuer Error-Event
     * @member {callback} mOnErrorFunc
     * @private
     */

    private mOnErrorFunc: OnFileBaseErrorFunc = null;


    /**
     * Creates an instance of FileBaseReader.
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'FileBaseReader' );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));
    }


    /**
     * initialiserung der File-Reader Quelle
     * 
     * @returns 0 oder -1
     */

    protected _initReaderSource(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {*} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // pruefen auf vorhandenen Lese-Quelle

        if ( this._initReaderSource() !== 0 ) {
            return -1;
        }
        return 0;
    }


    /**
     * pruefen, ob Initialisierung fertig ist
     * 
     * @returns null oder Promise
     */

    initWait(): Promise<any> {
        if ( this.mInitWaitPromise ) {
            return this.mInitWaitPromise;
        }
        // Dummy-Promise erzeugen
        return new Promise<any>((resolve, reject) => resolve( null ));
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mOnReadFunc = null;
        this.mOnErrorFunc = null;
        return 0;
    }


    getRuntimeType(): string {
        return 'undefined';
    }


    // Event-Funktionen


    protected _onRead( aData: any ): number {
        // console.log('FileBaseReader._onLoad:', aData);
        if ( this.mOnReadFunc ) {
            try {
                this.mOnReadFunc( aData );
            } catch (aException) {
                this.exception( '_onRead', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */

    protected _onError( aError: any ): number {
        // console.log('FileBaseReader._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('FileBaseReader._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc( aError );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this.exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION Plugin._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * onRead Callback-Funktion eintragen
     *
     * @param {*} aReadFunc - Callback fuer Dateidaten geladen
     */

    set onRead( aReadFunc: OnFileBaseReaderReadFunc ) {
        this.mOnReadFunc = aReadFunc;
    }


    /**
     * onError Callback-Funktion eintragen
     *
     * @param {*} aErrorFunc - Callback fuer Dateidaten geladen
     */

    set onError( aErrorFunc: OnFileBaseErrorFunc ) {
        this.mOnErrorFunc = aErrorFunc;
    }


    /**
     * Einlesen einer Datei
     *
     * @param {string} aFileUrl - optionale URL fuer fuer einzulesende Datei
     * @param {string} aResponseType - optionale Angabe des XMLHttpRequest-ResponseTyps(text,arraybuffer)
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string, aResponseType = '' ): number {
        // console.log('FileBaseReader.read:', aFileUrl, aResponseType);
        return 0;
    }

}
