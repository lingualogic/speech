/** @packageDocumentation
 * Globale Export-Datei fuer File
 *
 * Version: 2.0
 * Datum:   12.07.2021
 *
 * Definiert das gesamte File-API:
 *
 * @module file
 * @author SB
 */


// TODO: nur solange hier, wie es von externen Komponenten verwendet wird
//       wird spaeter wieder entfernt, wenn nur noch intern von Net verwendet
// Common API

export { IFileBaseReader, OnFileBaseReaderReadFunc, OnFileBaseErrorFunc } from './common/file-base-reader.interface';
export { FileBrowserReader } from './common/file-browser-reader';
export { FileNodeReader } from './common/file-node-reader';
export { FileBaseReaderFactory, FILEBASEREADER_FACTORY_NAME } from './common/file-base-reader-factory';


// Global API

export * from './const/file-const';
export { FileReaderFactory } from './reader/file-reader-factory';
export { IFileReader, FileReaderReadFunc, OnFileReaderReadFunc } from './reader/file-reader.interface';
export { FileReader } from './reader/file-reader';
