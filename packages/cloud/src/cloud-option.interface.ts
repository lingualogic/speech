/** @packageDocumentation
 * CloudOption Schnittstelle fuer CloudManager
 * 
 * Hier werden alle Cloud-Port Konfigurationen abgelegt.
 *
 * API-Version: 2.0
 * Datum:       29.11.2021
 *
 * Letzte Aenderung: 29.11.2021
 * Status: gruen
 *
 * @module cloud
 * @author SB
 */


import { ICloudPortCredentials } from './port/cloud-port-credentials.interface';


export interface ICloudOption {
    // Optionen fuer die Cloud 
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    configPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    configFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    configLoadFlag?: boolean;
    /** Credentials der Ports */
    portCredentialsList?: ICloudPortCredentials[];
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

