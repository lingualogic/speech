/** @packageDocumentation
 * CloudRasaConfigData-Schnittstelle
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
 * CloudRasaConfigData Schnittstelle fuer Konfigurationsparameter von CloudRasa
 */

export interface CloudRasaConfigDataInterface {
    /** legt den App Key fuer die Verbindung zum Server fest */
    rasaAppKey: string;
    /** legt die URL fuer die Verbindung zum Server fest */
    rasaServerUrl?: string;
}

