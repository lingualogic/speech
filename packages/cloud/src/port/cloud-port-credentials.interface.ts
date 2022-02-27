/** @packageDocumentation
 * PortCredentials
 * 
 * Hier werden alle Credentials fuer einen Port eingetragen.
 * Die Credentials werden getrennt von der Konfiguration uebergeben.
 *
 * API-Version: 2.0
 * Datum:       29.11.2021
 *
 * Letzte Aenderung: 29.11.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


export interface ICloudPortCredentials {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier Mock angegeben, wird der Mock geladen */
    portName: string;
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
    /** legt die App-ID fuer die Verbindung zum Server fest */
    appId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    appKey?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    userId?: string;
}

