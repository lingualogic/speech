/** @packageDocumentation
 * CloudPortConfigData-Schnittstelle
 *
 * API-Version: 2.0
 * Datum:       24.10.2021
 *
 * Letzte Aenderung: 24.10.2021
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


/** @export
 * CloudPortConfigData Schnittstelle fuer Konfigurationsparameter von Cloud
 */

export interface ICloudPortConfigData {
    /** legt den App Key fuer die Verbindung zum Server fest */
    appKey: string;
    /** legt die URL fuer den CloudGoogle Tokenserver fest */
    serverUrl: string;
    /** legt die URL fuer den Dialogflow Tokenserver fest */
    tokenServerUrl: string;
    /** legt die ProjektID fuer Dialogflow fest */
    projectId: string;
    /** legt die SessionID fuer Dialogflow fest */
    sessionId?: string;
    /** legt fest, ob der Dialogflow-Agent aus Draft oder aus EnvironmentName ausgelesen wird */
    environmentName?: string;
}

