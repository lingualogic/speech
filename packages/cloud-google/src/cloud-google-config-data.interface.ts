/** @packageDocumentation
 * CloudGoogleConfigData-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


/** @export
 * CloudGoogleConfigData Schnittstelle fuer Konfigurationsparameter von CloudGoogle
 */

export interface CloudGoogleConfigDataInterface {
    /** legt den App Key fuer die Verbindung zum Server fest */
    googleAppKey: string;
    /** legt die URL fuer den CloudGoogle Tokenserver fest */
    googleServerUrl: string;
    /** legt die URL fuer den Dialogflow Tokenserver fest */
    dialogflowTokenServerUrl: string;
    /** legt die ProjektID fuer Dialogflow fest */
    dialogflowProjectId: string;
    /** legt die SessionID fuer Dialogflow fest */
    dialogflowSessionId?: string;
    /** legt fest, ob der Dialogflow-Agent aus Draft oder aus EnvironmentName ausgelesen wird */
    dialogflowEnvironmentName?: string;
}

