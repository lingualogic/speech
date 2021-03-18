/** @packageDocumentation
 * CloudRasaOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


/** @export
 * CloudRasaOption Schnittstelle fuer optionale Konfigurationsparameter von CloudRasa bei der Initialisierung
 */

export interface CloudRasaOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll */
    rasaPortName?: string;
    /** legt fest, ob anstelle des echten Ports ein Mock-Port eingefuegt wird */
    rasaMockFlag?: boolean;
    /** legt fest, ob Verbindung zum Server aufgebaut wird */
    rasaServerFlag?: boolean;
    /** legt die URL fuer die Verbindung zum Server fest */
    rasaServerUrl?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    rasaDynamicCredentialsFlag?: boolean;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    rasaAppId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    rasaAppKey?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    rasaUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    rasaNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    rasaConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    rasaConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    rasaConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

