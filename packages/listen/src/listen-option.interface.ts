/** @packageDocumentation
 * Listen Option Schnittstelle
 *
 * API-Version: 1.2
 * Datum: 15.10.2020
 *
 * Letzte Aenderung: 24.10.2020
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// base

import { BaseOptionInterface } from '@speech/base';


/** @export
 * ListenOption Schnittstelle fuer optionale Konfigurationsparameter von Listen bei der Initialisierung
 */

export interface ListenOptionInterface extends BaseOptionInterface {
    /** setzt die Sprache fuer die Spracheingabe ( de, en )*/
    listenLanguage?: string;
}
