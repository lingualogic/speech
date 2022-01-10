/** @packageDocumentation
 * FileReader Schnittstelle
 *
 * Version: 2.0
 * Datum:   28.06.2021
 *
 * @module file/reader
 * @author SB
 */


// core

import { IPlugin } from '@speech/core';


// Funktionen

export type FileReaderReadFunc = (aFileUrl: string) => number;

// Events

export type OnFileReaderReadFunc = (aFileData: string) => number;


export interface IFileReader extends IPlugin {

    // Lese-Funktion

    onRead: OnFileReaderReadFunc;
    // @deprecated
    onLoadDialogFile: OnFileReaderReadFunc;


    /**
     * pruefen, ob die Initialisierung abgeschlossen ist
     * 
     * @return null oder Promise
     */

    initWait(): Promise<any>;

    
    /**
     * Laufzeit-Typ abfragen: node oder browser
     */

    getRuntimeType(): string;


    getReadFunc(): FileReaderReadFunc;
    read(aFileUrl: string): number;


    // @deprecated
    loadDialogFile( aUrl: string ): number;
}
