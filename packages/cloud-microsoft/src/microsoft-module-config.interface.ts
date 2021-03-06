/** @packageDocumentation
 * MicrosoftModuleConfig-Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       28.08.2019
 *
 * Letzte Aenderung: 28.08.2019
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


/** @export
 * MicrosoftConfigData Schnittstelle fuer Konfigurationsparameter von Microsoft
 */

export interface MicrosoftModuleConfigInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey: string;
    /** legt den Endpunkt fuer Luis (NLU) fuer die Verbindung zum Server fest */
    microsoftLuisEndpoint: string;
}
