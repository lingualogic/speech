/** @packageDocumentation
 * CloudDeviceGroupOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       10.11.2021
 *
 * Letzte Aenderung: 10.11.2021
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { ICloudDeviceOption } from './cloud-device-option.interface';


export interface ICloudDeviceGroupOption {
    /** Liste aller Device-Options */
    deviceOptionList: ICloudDeviceOption[];
    /** definiert, ob die Devices direkt erzeugt werden */
    deviceCreateFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

