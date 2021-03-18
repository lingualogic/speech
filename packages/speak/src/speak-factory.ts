/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Speak API Instanz
 *
 * API-Version: 1.0
 * Datum:   03.09.2018
 *
 * Letzte Aenderung: 23.01.2021
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// core

import { SystemManager } from '@speech/core';


// speak

import { SPEAK_TYPE_NAME, SPEAK_COMPONENT_NAME, SPEAK_MOCK_NAME } from './speak-const';
import { SpeakComponentBuilder } from './component/speak-component-builder';
import { SpeakOptionInterface } from './speak-option.interface';
import { SpeakInterface } from './speak.interface';
import { SpeakMobile } from './speak-mobile';
import { Speak } from './speak';


// Global API


/** @export
 * Statische Klasse zur Erzeugung eines Speak.
 */

export class SpeakFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Speak
     * zurueckgeben, einschließlich eines Speak-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Speak
     * @param {SpeakOptionInterface} aOption - optionale Parameter
     *
     * @return {SpeakInterface} Speak Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: SpeakOptionInterface ): SpeakInterface {
        // console.log('SpeakFactory.create:', aName, aOption );
        const name = aName || SPEAK_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( name === SPEAK_MOCK_NAME ) {
            // TODO: Einbau des Speak-Mocks
            // return new SpeakMock();
        }

        // pruefen auf Cordova-Plugin

        try {
            // pruefen auf cordova

            if ( (window as any).cordova ) {
                // pruefen auf SpeakPlugin von Cordova

                if ( (window as any).SpeakPlugin ) {
                    console.log('SpeakFactory: mobiles Plugin:', (window as any).SpeakPlugin);
                    return new SpeakMobile( aOption );
                }
            }
        } catch ( aException ) {
            console.log('===> EXCEPTION SpeakFactory.create: mobile Exception', aException.message);
        }

        try {
            // pruefen auf vorhandenen Builder
            if ( !SystemManager.findBuilder( SPEAK_TYPE_NAME )) {
                // Default-Builder fuer Action eintragen
                if ( SystemManager.insertBuilder( SPEAK_TYPE_NAME, new SpeakComponentBuilder( '', false )) !== 0 ) {
                    console.log('SpeakFactory.create: kein Builder eingetragen');
                    return null;
                }
            }
            return new Speak( aOption );
        } catch ( aException ) {
            console.log('===> EXCEPTION SpeakFactory.create: web Exception', aException.message);
            return null;
        }
    }

}
