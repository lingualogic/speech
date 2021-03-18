/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Action API Instanz.
 *
 * API-Version: 1.0
 * Datum:   29.08.2018
 *
 * Letzte Aenderung: 26.10.2018
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// core

import { SystemManager } from '@speech/core';


// action

import { ACTION_TYPE_NAME, ACTION_PLUGIN_NAME, ACTION_MOCK_NAME } from './action-const';
import { ActionComponentBuilder } from './component/action-component-builder';
import { ActionOptionInterface } from './action-option.interface';
import { ActionInterface } from './action.interface';
import { Action } from './action';


// Global API


/** @export
 * Statische Klasse zur Erzeugung von Action.
 */

export class ActionFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Action
     * zurueckgeben, einschließlich eines Action-Mocks.
     *
     * @param {string} aName - Name der zu erzeugenden Action
     * @param {ActionOptionInterface} aOption - optionale Parameter
     *
     * @return {ActionInterface} Action Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: ActionOptionInterface ): ActionInterface {
        const name = aName || ACTION_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( name === ACTION_MOCK_NAME ) {
            // TODO: Einbau des Action-Mocks
            // return new ActionMock();
        }

        try {
            // pruefen auf vorhandenen Builder
            if ( !SystemManager.findBuilder( ACTION_TYPE_NAME )) {
                // Default-Builder fuer Action eintragen
                if ( SystemManager.insertBuilder( ACTION_TYPE_NAME, new ActionComponentBuilder( '', false )) !== 0 ) {
                    console.log('ActionFactory.create: kein Builder eingetragen');
                    return null;
                }
            }
            // console.log('ActionFactory.create:', aName, aOption);
            return new Action( aOption );
        } catch ( aException ) {
            console.log('ActionFactory.create: Exception', aException);
            return null;
        }
    }

}
