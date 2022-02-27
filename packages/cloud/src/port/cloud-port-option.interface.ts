/** @packageDocumentation
 * CloudPortOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       27.10.2021
 *
 * Letzte Aenderung: 27.10.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// cloud

import { ICloudDeviceGroupOption } from './../device/cloud-device-group-option.interface';


/** @export
 * CloudPortOption Schnittstelle fuer optionale Konfigurationsparameter von CloudPort bei der Initialisierung
 */

export interface ICloudPortOption extends ICloudDeviceGroupOption {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier Mock angegeben, wird der Mock geladen */
    portName: string;
    /** legt die Portklasse fest */
    portClass: string;
    /** legt fest, ob Verbindung zum Server aufgebaut wird */
    serverFlag?: boolean;
    /** legt die URL fuer die Verbindung zum Server fest */
    serverUrl?: string;
    /** legt die URL fuer die Verbindung zum Dialogflow-TokenServer fest */
    tokenServerUrl?: string;
    /** legt die Projekt-ID von Dialogflow fest */
    projectId?: string;
    /** legt die Session-ID von Dialogflow fest */
    sessionId?: string;
    /** legt den Enviromment-Namen des Dialogflow-Agenten fest */
    environmentName?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    dynamicCredentialsFlag?: boolean;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    appId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    appKey?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    userId?: string;
}

