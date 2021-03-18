/** @packageDocumentation
 * Intent Option Schnittstelle
 *
 * API-Version: 1.1
 * Datum: 15.10.2020
 *
 * Letzte Aenderung: 24.10.2020
 * Status: gelb
 *
 * @module intent
 * @author SB
 */


// base

import { BaseOptionInterface } from '@speech/base';


/** @export
 * IntentOption Schnittstelle fuer optionale Konfigurationsparameter von Intent bei der Initialisierung
 */

export interface IntentOptionInterface extends BaseOptionInterface {
    /** setzt die Sprache fuer die Sprachanalyse ( de, en )*/
    intentLanguage?: string;
}
