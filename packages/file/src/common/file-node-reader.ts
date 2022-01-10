/** @packageDocumentation
 * FileNodeReader ohne Abhaengigkeiten zu anderen Komponenten
 *
 * Letzte Aenderung: 12.07.2021
 * Status: rot
 *
 * @module file/common
 * @author SB
 */


// common

import { FileBaseReader } from './file-base-reader';


// Konstanten

const NODEJS_FILE_MODUL = 'fs'; 


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS

declare let process: any;


/**
 * FileNodeReader zum Einlesen von Dateien im Node
 */

export class FileNodeReader extends FileBaseReader {


    private mFileLib: any = null;


    /**
     * Creates an instance of FileNodeReader.
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'FileNodeReader' );
        // NodeJS fs-Bibliothek asynchron laden
        this.mInitWaitPromise = this._loadFileLib();
        this.mInitWaitPromise
            .then(() => {
                this.mInitWaitPromise = null;
            })
            .catch((aError: any) => {
                this.mInitWaitPromise = null;
            });
    }


    /**
     * Pruefen auf vorhandene Internet-Verbindung
     * 
     * @param aConfig 
     */

    protected async _loadFileLib(): Promise<any> {

        // console.log('FileNodeReader.loadFileLib: process.versions.node = ', process.versions.node);
        if ( typeof process === 'undefined' || !process.versions || !process.versions.node ) {
            return new Error('FileNodeReader._loadFileLib: keine NodeJS Laufzeitumgebung');
        }

        // net-modul dynamisch laden

        this.mFileLib = null;
        try {
            // TODO: muss Variable sein, um dynamischen Import ohne Pruefung zu machen
            const fileName = NODEJS_FILE_MODUL;
            this.mFileLib = await import( fileName );
        } catch ( aException ) {
            console.log('FileNodeReader._loadFileLib: Exception ', aException);
            return new Error('NodeJS File-Bibliothek nicht geladen');
        }

    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mFileLib = null;
        return super.done();
    }


    getRuntimeType(): string {
        return 'node';
    }


    /**
     * Asynchrone Read-Funktion, um Promise fuer FileLib zu pruefen
     *
     * @param aFileUrl 
     * @param aResponseType 
     */

    private async _read( aFileUrl: string, aResponseType: string ) {
        // console.log('FileNodeReader._read:', aFileUrl, aResponseType);

        // warten auf geladene FileLib

        try {
            await this.initWait();
        } catch ( aException ) {
            this.exception( '_read', aException);
        }

        // pruefen auf vorhandene NodeJS File-Bibliothek

        if ( this.mFileLib ) {
            this.mFileLib.readFile( aFileUrl, (aError: any, aData: any) => {
                if (aError) {
                    this._onError( aError );
                    return;
                }
                // pruefen auf Response-Typ, es wird ein String zurueckgegeben
                let data = null;
                if( aResponseType === 'text') {
                    data = aData.toString();
                }
                this._onRead( data );
            });
            return 0;
        } else {
            this.error( 'read', 'keine NodeJS File-Bibliothek vorhanden' );
        }
        return -1;
    }


    /**
     * Einlesen einer Datei
     *
     * @param {string} aFileUrl - optionale URL fuer fuer einzulesende Datei
     * @param {string} aResponseType - reserviert
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string, aResponseType = 'text' ): number {
        // console.log('FileNodeReader.read:', aFileUrl, aResponseType);

        if ( !this.mInitWaitPromise && !this.mFileLib ) {
            this._onError( new Error( 'FileNodeReader.read: keine NodeJS Laufzeitumgebung' ));
            return -1;
        }
        
        this._read( aFileUrl, aResponseType );
        return 0;
    }

}
