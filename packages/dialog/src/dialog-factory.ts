/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Dialog API Instanz.
 *
 * API-Version: 2.0
 * Datum:   29.06.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// core

import { SystemManager } from '@lingualogic-speech/core';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENT_NAME, DIALOG_MOCK_NAME } from './dialog-const';
import { DialogComponentBuilder } from './component/dialog-component-builder';
import { IDialogOption } from './dialog-option.interface';
import { IDialog } from './dialog.interface';
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
     * @param {IDialogOption} aOption - optionale Parameter
     *
     * @return {IDialog} Dialog Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: IDialogOption ): IDialog {
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
