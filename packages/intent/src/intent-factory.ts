/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Intent API Instanz
 *
 * API-Version: 1.0
 * Datum: 28.11.2018
 *
 * Letzte Aenderung: 20.09.2020
 * Status: rot
 *
 * @module intent
 * @author SB
 */


// core

import { SystemManager } from '@speech/core';


// intent

import { INTENT_TYPE_NAME, INTENT_COMPONENT_NAME, INTENT_MOCK_NAME } from './intent-const';
import { IntentComponentBuilder } from './component/intent-component-builder';
import { IntentOptionInterface } from './intent-option.interface';
import { IntentInterface } from './intent.interface';
import { Intent } from './intent';


// Global API


/** @export
 * Statische Klasse zur Erzeugung einer IntentComponent Instanz.
 */

export class IntentFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Intent
     * zurueckgeben, einschließlich eines Intent-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Intent
     * @param {IntentOptionInterface} aOption - optionale Parameter
     *
     * @return {IntentInterface} Intent Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: IntentOptionInterface ): IntentInterface {
        const name = aName || INTENT_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( name === INTENT_MOCK_NAME ) {
            // TODO: Einbau des Intent-Mocks
            // return new IntentMock();
        }

        try {
            // pruefen auf vorhandenen Builder
            if ( !SystemManager.findBuilder( INTENT_TYPE_NAME )) {
                // Default-Builder fuer Action eintragen
                if ( SystemManager.insertBuilder( INTENT_TYPE_NAME, new IntentComponentBuilder( '', false )) !== 0 ) {
                    console.log('IntentFactory.create: kein Builder eingetragen');
                    return null;
                }
            }
            return new Intent( aOption );
        } catch ( aException ) {
            console.log('IntentFactory.create: Exception', aException);
            return null;
        }
    }

}
