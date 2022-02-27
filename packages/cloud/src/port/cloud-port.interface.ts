/** @packageDocumentation
 * CloudPort Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       10.11.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// core

import { IPort } from '@lingualogic-speech/core';


/** @export
 * CloudPort Schnittstelle
 */

export interface ICloudPort extends IPort {


    /**
     * Rueckgabe eines Tokens, wenn es in einem Device vorhanden ist.
     * 
     * @param aDeviceType - Typname des Devices (ASR, NLU, TTS)
     * @returns Tokenstring
     */

    getToken( aDeviceType: string ): string;
    
}

