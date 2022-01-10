/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der FileBaseReader-Klasse und -Instanz fuer Browser und NodeJS
 *
 * Letzte Aenderung: 12.07.2021
 * Status: rot
 *
 * @module file/common
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// file

import { IFileBaseReader } from './file-base-reader.interface';
import { FileBrowserReader } from './file-browser-reader';
import { FileNodeReader } from './file-node-reader';


// Konstanten

export const FILEBASEREADER_FACTORY_NAME = 'FileBaseReaderFactory';
export const FILEBASEREADER_TYPE_NAME = 'FileBaseReader';


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;


/**
 * Die WebSocketFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebSocket
 */

export class FileBaseReaderFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || FILEBASEREADER_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return FILEBASEREADER_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return FILEBASEREADER_FACTORY_NAME;
    }


    /**
     * Import der richtigen FileBaseReader-Klasse fuer Browser oder NodeJS
     */

     private _newFileReader(): IFileBaseReader {
        // console.log('FileBaseReaderFactory._newFileReader: start');

        let fileReader = null;
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            // NodeJS-Version des FileBaseReaders laden
            try {
                fileReader = new FileNodeReader();
            } catch ( aException ) {
                console.log('FileBaseReaderFactory._newFileReader: FileNodeReader nicht erzeugt', aException);
            }
        } else if ( typeof window !== 'undefined' ) {
            // Browser-Version der WebSocket laden
            try {
                fileReader = new FileBrowserReader();
            } catch ( aException ) {
                console.log('FileBaseReaderFactory._newFileReader: FileBrowserReader nicht erzeugt', aException);
            }
        } else {
            console.log('WebSocketFactory._newFileReader: kein FileReader erzeugt');
        }
        // console.log('FileBaseReaderFactory._newFileReader: end', fileReader);
        return fileReader;
    }


    /**
     * Erzeugt ein neues Objekt (synchron)
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aObjectClass?: string, aRegisterFlag = true ): IFileBaseReader {
        // pruefen auf geladene WebSocket-Klasse
        return this._newFileReader();
    }

}
