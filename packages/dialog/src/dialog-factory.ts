/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Dialog API Instanz.
 *
 * API-Version: 1.0
 * Datum:   07.09.2018
 *
 * Letzte Aenderung: 28.10.2020
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// core

import { SystemManager } from '@speech/core';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENT_NAME, DIALOG_MOCK_NAME } from './dialog-const';
import { DialogComponentBuilder } from './component/dialog-component-builder';
import { DialogOptionInterface } from './dialog-option.interface';
import { DialogInterface } from './dialog.interface';
import { Dialog } from './dialog';


// Global API


/** @export
 * Statische Klasse zur Erzeugung eines Dialogs.
 */

export class DialogFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Dialog
     * zurueckgeben, einschließlich eines Dialog-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Dialogs
     * @param {DialogOptionInterface} aOption - optionale Parameter
     *
     * @return {DialogInterface} Dialog Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: DialogOptionInterface ): DialogInterface {
        const name = aName || DIALOG_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( name === DIALOG_MOCK_NAME ) {
            // TODO: Einbau des Dialog-Mocks
            // return new DialogMock();
        }

        try {
            // pruefen auf vorhandenen Builder
            if ( !SystemManager.findBuilder( DIALOG_TYPE_NAME )) {
                // Default-Builder fuer Action eintragen
                if ( SystemManager.insertBuilder( DIALOG_TYPE_NAME, new DialogComponentBuilder( '', false )) !== 0 ) {
                    console.log('DialogFactory.create: kein Builder eingetragen');
                    return null;
                }
            }
            return new Dialog( aOption );
        } catch ( aException ) {
            console.log('DialogFactory.create: Exception', aException);
            return null;
        }
    }

}
