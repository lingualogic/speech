/** @packageDocumentation
 * Listen Option Schnittstelle
 *
 * API-Version: 2.0
 * Datum: 13.10.2021
 *
 * Letzte Aenderung: 13.10.2021
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// base

import { IBaseOption } from '@speech/base';


// asr

import { IASROption } from './asr/asr-option.interface';


/** @export
 * ListenOption Schnittstelle fuer optionale Konfigurationsparameter von Listen bei der Initialisierung
 */

export interface IListenOption extends IBaseOption {
    /** Liste aller ASRs */
    asrList?: IASROption[];
    /** Einstellen der Default-ASR */
    asrDefault?: string;
    /** setzt die Sprache fuer die Spracheingabe ( de, en )*/
    listenLanguage?: string;
}


/**
 * @deprecated Ersetzen mit IListenOption, wird in Version 0.7 entfernt
 */

/* typescript-eslint-disable no-empty-interface */
export interface ListenServiceOptionInterface extends IListenOption {}
