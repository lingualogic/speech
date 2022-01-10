/** @packageDocumentation
 * ASR Option Schnittstelle
 *
 * API-Version: 2.0
 * Datum: 31.10.2021
 *
 * Letzte Aenderung: 31.10.2021
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


/** @export
 * ASROption Schnittstelle fuer optionale Konfigurationsparameter von ASR bei der Initialisierung
 */

export interface IASROption {
    /** Name der ASR */
    asrName?: string;
    /** Klasse der ASR */
    asrClass?: string;
    /** Name des CloudPorts bei ASRPorts */
    cloudPortName?: string;
    /** setzt die Sprache fuer die Spracheingabe ( de, en )*/
    language?: string;
    /** Fehlerausgabe ein/ausschalten */
    errorOutputFlag?: boolean;
}
