/** @packageDocumentation
 * JSON Interface
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module dialog/json
 * @author SB
 */


// plugin

import { IPlugin } from '@lingualogic-speech/core';


// store

import { StoreNewDialogFunc, StoreNewDialogStateFunc } from '../store/store.interface';


// Funktionen

export type TransformJsonFileFunc = (aJsonFileName: string) => number;
export type TransformJsonDataFunc = (aJsonData: any) => number;


// Events

export type OnJsonEndFunc = () => number;


/** @export
 * JSON Schnittstelle
 */

export interface IJson extends IPlugin {

    // Event-Funktionen

    onJsonEnd: OnJsonEndFunc;

    // Parser-Funktionen

    transformJsonFile( aJsonFileName: string ): number;
    transformJsonData( aJsonData: any ): number;

    // Bind-Funktionen

    getTransformJsonFileFunc(): TransformJsonFileFunc;
    getTransformJsonDataFunc(): TransformJsonDataFunc;

    setNewDialogFunc( aNewDialogFunc: StoreNewDialogFunc ): number;
    setNewDialogStateFunc( aNewDialogStateFunc: StoreNewDialogStateFunc ): number;
}
