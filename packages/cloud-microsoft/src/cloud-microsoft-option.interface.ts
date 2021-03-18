/** @packageDocumentation
 * CloudMicrosoftOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


/** @export
 * CloudMicrosoftOption Schnittstelle fuer optionale Konfigurationsparameter von CloudMicrosoft bei der Initialisierung
 */

export interface CloudMicrosoftOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier CloudMicrosoftMock angegeben, wird der Mock geladen */
    microsoftPortName?: string;
    /** legt die URL fuer die Verbindung zum Server fest */
    microsoftServerUrl?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    microsoftDynamicCredentialsFlag?: boolean;
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion?: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey?: string;
    /** legt den LUIS (NLU) Endpunkt fuer die Verbindung zum Server fest */
    microsoftLuisEndpoint?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    microsoftUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    microsoftNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    microsoftConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    microsoftConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    microsoftConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

