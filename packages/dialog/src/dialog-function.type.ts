/** @packageDocumentation
 * Funktionstypen fuer Dialog
 *
 * API-Version: 1.0
 * Datum:   07.09.2018
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// dialog

import { IDialogAction } from './dialog-action.interface';
import { IDialogSpeak } from './dialog-speak.interface';


// Global API


// Action-Funktionen

/** Definiert die StartAction Funktion fuer eine Dialogaktion */
export type DialogStartActionFunc = (aActionObject: IDialogAction) => void;
/** Definiert die StopAction Funktion fuer eine Dialogaktion */
export type DialogStopActionFunc = () => void;


// Funktionen

export type DialogWriteFileDataFunc = (aFileData: string) => number;


// Events

export type OnDialogJsonFunc = () => number;
export type OnDialogParseFunc = () => number;
export type OnDialogSetFunc = (aDialogName: string) => number;
export type OnDialogStartFunc = (aResult: number) => number;
export type OnDialogStopFunc = () => number;
export type OnDialogStateSetFunc = (aState: string) => number;
export type OnDialogActionFunc = (aAction: IDialogAction) => number;
export type OnDialogActionStopFunc = () => number;
export type OnDialogSpeakFunc = (aSpeak: IDialogSpeak) => number;
export type OnDialogSpeakStartFunc = () => number;
export type OnDialogSpeakStopFunc = () => number;

