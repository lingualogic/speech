/** @packageDocumentation
 * Interne SpeakComponent Schnittstelle fuer alle Speak-Komponenten. Wird von der globalen Speak Schnittstelle abgeleitet
 *
 * Letzte Aenderung: 24.10.2020
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '@speech/base';


// speak

import { SpeakInterface } from '../speak.interface';
import { OnAudioUnlockFunc } from '../speak-function.type';


/** @export
 * SpeakComponent Schnittstelle fuer alle Speak-Komponenten
 */

export interface SpeakComponentInterface extends BaseComponentInterface, SpeakInterface {

    // Speak-Events

    onAudioUnlock: OnAudioUnlockFunc;

}
