/** @packageDocumentation
 * Store Schnittstelle
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// core

import { IPlugin } from '@lingualogic-speech/core';


// dialog

import { IDialogState } from './dialog-state.interface';
import { IDialogObject } from './dialog-object.interface';


// Funktionen

export type StoreNewDialogFunc = (aDialogName: string) => IDialogObject;
export type StoreNewDialogStateFunc = (aDialogName: string, aStateName: string, aStateId: number) => IDialogState;
export type StoreGetDialogStateFunc = (aDialogName: string, aStateName: string ) => IDialogState;


/** @export
 * Store Schnittstelle
 */

export interface IStore extends IPlugin {

    clear(): void;

    // Dialog-Funktionen

    newDialog( aDialogName: string ): IDialogObject;
    getDialog( aDialogName: string ): IDialogObject;

    // Zustands-Funktionen

    newDialogState( aDialogName: string, aStateName: string, aStateId: number ): IDialogState;
    getDialogState( aDialogName: string, aStateName: string ): IDialogState;

    // Bind-Funktionen

    getNewDialogFunc(): StoreNewDialogFunc;
    getNewDialogStateFunc(): StoreNewDialogStateFunc;
    getGetDialogStateFunc(): StoreGetDialogStateFunc;
}

