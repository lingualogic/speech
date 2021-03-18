/** @packageDocumentation
 * ActionOption Schnittstelle
 *
 * API-Version: 1.2
 * Datum:       18.10.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// base

import { BaseOptionInterface } from '@speech/base';


/** @export
 * ActionOption Schnittstelle fuer optionale Konfigurationsparameter von Action bei der Initialisierung
 */

export interface ActionOptionInterface extends BaseOptionInterface {
    // wegen Typescript-Compilerfehler
    dummy?: string;
}

