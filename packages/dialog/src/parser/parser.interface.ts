/** @packageDocumentation
 * Parser Interface
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/parser
 * @author SB
 */


// plugin

import { IPlugin } from '@lingualogic-speech/core';


// store

import { StoreNewDialogFunc, StoreNewDialogStateFunc } from '../store/store.interface';


// Funktionen

export type ParserSpeechDefFileFunc = (aDefFileName: string) => number;
export type ParserSpeechDefDataFunc = (aDefData: string) => number;


// Events

export type OnParserEndFunc = () => number;


/** @export
 * Parser Schnittstelle
 */

export interface IParser extends IPlugin {

    // Event-Funktionen

    onParserEnd: OnParserEndFunc;

    // Parser-Funktionen

    parseSpeechDefFile( aDefFileName: string ): number;
    parseSpeechDefData( aDefData: string ): number;

    // Bind-Funktionen

    getParseSpeechDefFileFunc(): ParserSpeechDefFileFunc;
    getParseSpeechDefDataFunc(): ParserSpeechDefDataFunc;

    setNewDialogFunc( aNewDialogFunc: StoreNewDialogFunc ): number;
    setNewDialogStateFunc( aNewDialogStateFunc: StoreNewDialogStateFunc ): number;
}
