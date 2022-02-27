/** @packageDocumentation
 * CloudPortGroupOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       01.11.2021
 *
 * Letzte Aenderung: 01.11.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// cloud

import { ICloudPortOption } from './cloud-port-option.interface';


export interface ICloudPortGroupOption {
    /** Liste aller Device-Options */
    portOptionList: ICloudPortOption[];
    /** definiert, ob die Ports direkt erzeugt werden */
    portCreateFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

