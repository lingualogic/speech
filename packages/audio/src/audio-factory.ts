/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Audio API Instanz.
 *
 * Version: 2.0
 * Datum:   28.06.2021
 *
 * @module audio
 * @author SB
 */


// audio

import { AUDIO_PLUGIN_NAME, AUDIO_MOCK_NAME } from './audio-const';
import { IAudio } from './audio.interface';
import { Audio } from './audio';


// Global API


/** @export
 * Statische Klasse zur Erzeugung eines Audio.
 */

export class AudioFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    /* typescript-eslint-disable no-empty-function */
    private constructor() {
        // statische Klasse
    }


    /**
     * Kann verschiedene Versionen von Bot
     * zurueckgeben, einschließlich eines Bot-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Bots
     * @param aOption - optionale Parameter
     *
     * @return {IAudio} Bot Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: any ): IAudio {
        const name = aName || AUDIO_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( name === AUDIO_MOCK_NAME ) {
            // TODO: Einbau des Audio-Mocks
            // return new AudioMock();
        }

        try {
            return new Audio( aOption );
        } catch ( aException ) {
            console.log('AudioFactory.create: Exception', aException);
            return null;
        }
    }

}
