/** @packageDocumentation
 * Cloud-Nachrichten Interface
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module cloud
 * @author SB
 */


export type CloudSendMessageFunc = ( aMessage: ICloudMessage ) => number;


export interface ICloudMessage {
    sender: string;
    receiver: string;
    event: string;
}

