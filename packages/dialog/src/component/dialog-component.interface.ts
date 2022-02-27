/** @packageDocumentation
 * DialogComponent Schnittstelle
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module dialog/component
 * @author SB
 */


// base

import { IBaseComponent } from '@lingualogic-speech/base';


// file

import { OnFileReaderReadFunc } from '@lingualogic-speech/file';


// json

import { TransformJsonFileFunc, TransformJsonDataFunc } from '../json/json.interface';


// parser

import { ParserSpeechDefFileFunc, ParserSpeechDefDataFunc } from '../parser/parser.interface';


// dialog

import {
    OnDialogJsonFunc,
    OnDialogParseFunc,
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc,
    DialogWriteFileDataFunc
} from '../dialog-function.type';
import { IDialog } from '../dialog.interface';


/** @export
 * DialogComponent Schnittstelle
 */

export interface IDialogComponent extends IBaseComponent, IDialog {


    // Event-Funktionen

    onNetOpen: () => number;

    onDialogJson: OnDialogJsonFunc;
    onDialogParse: OnDialogParseFunc;
    onDialogSet: OnDialogSetFunc;
    onDialogStart: OnDialogStartFunc;
    onDialogStop: OnDialogStopFunc;
    onDialogStateSet: OnDialogStateSetFunc;
    onDialogAction: OnDialogActionFunc;
    onDialogActionStop: OnDialogActionStopFunc;
    onDialogSpeak: OnDialogSpeakFunc;
    onDialogSpeakStart: OnDialogSpeakStartFunc;
    onDialogSpeakStop: OnDialogSpeakStopFunc;


    // Binding-Funktionen


    setTransformJsonFileFunc( aTransformJsonFileFunc: TransformJsonFileFunc ): number;
    setTransformJsonDataFunc( aTransformJsonDataFunc: TransformJsonDataFunc ): number;

    setParseSpeechDefFileFunc( aParseSpeechDefFileFunc: ParserSpeechDefFileFunc ): number;
    setParseSpeechDefDataFunc( aParseSpeechDefDataFunc: ParserSpeechDefDataFunc ): number;

    setReadFileFunc( aReadFunc: OnFileReaderReadFunc ): number;
    getWriteFileDataFunc(): DialogWriteFileDataFunc;

}
