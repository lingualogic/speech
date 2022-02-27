/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines FileReader Plugins
 *
 * Version: 2.0
 * Datum:   09.02.2022
 *
 * @module file/reader
 * @author SB
 */


// core

import { PluginFactory } from '@lingualogic-speech/core';


// file

import { FILEREADER_FACTORY_NAME, FILEREADER_PLUGIN_NAME, FILEREADER_MOCK_NAME } from '../const/file-const';
import { IFileReader } from './file-reader.interface';
import { FileReader } from './file-reader';


// Global API

export class FileReaderFactory extends PluginFactory {

    /**
     * Erzeugt die Factory
     */

    constructor() {
        super( 'FileReaderFactory' );
    }

    getName(): string {
        return FILEREADER_FACTORY_NAME;
    }

    protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): IFileReader {
        return new FileReader( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des FileReader
     * zurueckgeben, einschließlich eines FileReader-Mocks.
     *
     * @param {string} aReaderName - Name der zu erzeugenden FileReader-Komponente
     * @param {boolean} aRegisterFlag - wenn gesetztm, wird das Plugin in den PluginManager eingetragen
     *
     * @return {IFileReader} fileReader wird zurueckgegeben
     */

    create( aReaderName?: string, aPluginClass = '', aRegisterFlag = true ): IFileReader {
        const readerName = aReaderName || FILEREADER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( readerName === FILEREADER_MOCK_NAME ) {
            // TODO: Einbau des FileReader-Mocks
            // return new FileReaderMock();
        }

        // FileReader erzeugen

        try {
            return this._newPlugin( readerName, aPluginClass, aRegisterFlag );
        } catch ( aException ) {
            this.exception( 'create', aException );
            return null;
        }
    }

}
