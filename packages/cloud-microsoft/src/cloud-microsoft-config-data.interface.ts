/** @packageDocumentation
 * CloudMicrosoftConfigData-Schnittstelle
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
 * CloudMicrosoftConfigData Schnittstelle fuer Konfigurationsparameter von CloudMicrosoft
 */

export interface CloudMicrosoftConfigDataInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey: string;
    /** legt den Endpunkt fuer Luis (NLU) fuer die Verbindung zum Server fest */
    microsoftLuisEndpoint: string;
}

