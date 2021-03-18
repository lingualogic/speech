/** @packageDocumentation
 * CloudAmazonConfigData-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 11.07.2019
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


/** @export
 * CloudAmazonConfigData Schnittstelle fuer Konfigurationsparameter von CloudAmazon
 */

export interface CloudAmazonConfigDataInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    amazonRegion: string;
    /** legt die IdentityPoolId fuer die Verbindung zum Server fest */
    amazonIdentityPoolId: string;
}

