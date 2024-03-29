/** @packageDocumentation
 * Interne SpeakComponent Schnittstelle fuer alle Speak-Komponenten. Wird von der globalen Speak Schnittstelle abgeleitet
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// base

import { IBaseComponent } from '@lingualogic-speech/base';


// speak

import { ISpeak } from '../speak.interface';
import { OnAudioUnlockFunc } from '../speak-function.type';


/** @export
 * SpeakComponent Schnittstelle fuer alle Speak-Komponenten
 */

export interface ISpeakComponent extends IBaseComponent, ISpeak {

    // Speak-Events

    onAudioUnlock: OnAudioUnlockFunc;

}
