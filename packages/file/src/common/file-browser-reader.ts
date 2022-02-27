/** @packageDocumentation
 * FileBrowserReader ohne Abhaengigkeiten zu anderen Komponenten
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module file/common
 * @author SB
 */


// core

import { FactoryManager } from '@lingualogic-speech/core';


// net

import { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME, XMLHTTPREQUEST_TEXT_RESPONSETYPE } from '@lingualogic-speech/net';


// common

import { FileBaseReader } from './file-base-reader';


/**
 * FileBrowserReader zum Einlesen von Dateien im Browser
 */

export class FileBrowserReader extends FileBaseReader {


    /**
     * XMLHttpRequest-Klasse fuer das einlesen der Datei
     * @member {Object} mXMLHttpRequestClass
     * @private
     */

    private mXMLHttpRequestClass: any = null;


    /**
     * Request fuer das einlesen der Datei
     * @member {Object} mRequest
     * @private
     */

    private mRequest: any = null;


    /**
     * Creates an instance of FileBrowserReader.
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'FileBrowserReader' );
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {*} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    protected _initReaderSource(): number {
        // pruefen auf vorhandenen XMLHttpRequest in HTML5

        if ( !this._detectXMLHttpRequest()) {
            return -1;
        }
        return 0;
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mXMLHttpRequestClass = null;
        this.mRequest = null;
        return super.done();
    }


    getRuntimeType(): string {
        return 'browser';
    }


    /**
     * Feststellen, ob HTML5 XMLHttpRequest API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn XMLHttpRequest existiert, false sonst
     */

    protected _detectXMLHttpRequest(): boolean {
        // console.log('NuanceConfigReader._detectXMLHttpRequest:', window.XMLHttpRequest);

        // Initialisierung der XMLHttpRequestFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen
        const xmlHttpRequestFactory = FactoryManager.get( XMLHTTPREQUEST_FACTORY_NAME, XMLHttpRequestFactory ) as XMLHttpRequestFactory;
        if ( !xmlHttpRequestFactory ) {
            this.error( '_detectXMLHttpRequest', 'keine File-Fabrik vorhanden' );
            return false;
        }

        this.mXMLHttpRequestClass = xmlHttpRequestFactory.create();
        if ( this.mXMLHttpRequestClass === null ) {
            this.error( '_detectXMLHttpRequest', 'kein XMLHttpRequest vorhanden' );
            return false;
        }

        return true;
    }


    // Event-Funktionen


    protected _onLoad( aData: any, aStatus: number ): number {
        // console.log('FileBrowserReader._onLoad:', aData, aStatus);
        if ( this.mOnReadFunc ) {
            try {
                // console.log('FileReader._onLoad:', aData, aStatus);
                if ( aStatus === 404 ) {
                    this.error( '_onLoad', 'Error 404' );
                } else {
                    this.mOnReadFunc( aData );
                }
            } catch (aException) {
                this.exception( '_onLoad', aException );
                return -1;
            }
        }
        return 0;
    }


    protected _onLoadEnd( aStatus: number ): number {
        // console.log('FileBrowserReader._onLoadEnd:', aStatus);
        if ( aStatus === 404 ) {
            this.error( '_onLoadEnd', 'Error 404' );
            return -1;
        }
        return 0;
    }


    protected _onLoadError( aErrorEvent: any ): void {
        // TODO: muss in Fehlerbehandlung uebertragen werden
        // console.log('FileBrowserReader._onLoadError:', aErrorEvent);
        // TODO: muss noch ausgebaut werden
        this.error( '_onLoadError', aErrorEvent );
    }


    protected _onLoadAbort( aEvent: any ): void {
        // TODO: muss in Fehlerbehandlung uebertragen werden
        // console.log('FileBrowserReader._onLoadAbort:', aEvent);
        this.error( '_onLoadAbort', aEvent );
    }


    /**
     * XMLHttpRequest zum einlesen einer Datei ausfuehren
     *
     * @private
     * @param {string} aUrl - Adresse des zu ladenden Files
     * @param {string} aResponseType - optionale Angabe des XMLHttpRequest-ResponseTyps(text,arraybuffer)
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _loadFile( aUrl: string, aResponseType: string ): number {
        if ( !this.mXMLHttpRequestClass ) {
            this.error( '_loadFile', 'kein XMLHttpRequest vorhanden' );
            return -1;
        }
        if ( !aUrl ) {
            this.error( '_loadFile', 'keine URL uebergeben' );
            return -1;
        }
        try {
            this.mRequest = new this.mXMLHttpRequestClass();
            this.mRequest.open('GET', aUrl, true);
            this.mRequest.responseType = aResponseType;
            // console.log('FileBrowserReader._requestFile:', this.mRequest);
            const request = this.mRequest;
            this.mRequest.onload = () => this._onLoad( request.response, request.status );
            this.mRequest.onloadend = () => this._onLoadEnd( request.status );
            this.mRequest.onerror = ( aErrorEvent: any ) => this._onLoadError( aErrorEvent );
            this.mRequest.onabord = ( aEvent: any ) => this._onLoadAbort( aEvent );
            this.mRequest.send();
            return 0;
        } catch (aException) {
            this.exception( '_loadFile', aException );
            return -1;
        }
    }


    /**
     * Einlesen einer Datei
     *
     * @param {string} aFileUrl - optionale URL fuer fuer einzulesende Datei
     * @param {string} aResponseType - optionale Angabe des XMLHttpRequest-ResponseTyps(text,arraybuffer)
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string, aResponseType = XMLHTTPREQUEST_TEXT_RESPONSETYPE ): number {
        // console.log('FileBrowserReader.read:', aFileUrl, aResponseType);
        return this._loadFile( aFileUrl, aResponseType );
    }

}
