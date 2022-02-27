/** @packageDocumentation
 * Store Plugin fuer den Dialogspeicher und die Dialogdatenobjekte.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// core

import { Plugin } from '@lingualogic-speech/core';


// store

import { STORE_PLUGIN_NAME } from './store-const';
import { IDialogState } from './dialog-state.interface';
import { IDialogObject } from './dialog-object.interface';
import { DialogObject } from './dialog-object';
import { IStore, StoreNewDialogFunc, StoreNewDialogStateFunc, StoreGetDialogStateFunc } from './store.interface';


/** @export
 * StorePlugin Klasse
 */

export class StorePlugin extends Plugin implements IStore {

    /** Liste aller Dialoge */
    private mDialogList = new Map<string, IDialogObject>();


    /**
     * Creates an instance of DialogStore.
     *
     * @param {boolean} aRegisterFlag - True, wenn in PluginManager zu registrieren
     */

    constructor( aPluginName = '', aRegisterFlag = true ) {
        super( aPluginName || STORE_PLUGIN_NAME, aRegisterFlag );
        this._setErrorClassName( 'StorePlugin' );
    }


    /**
     * Initialisierung des Store
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {
        return super.init( aOption );
    }


    /**
     * Freigabe des Store
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.mDialogList.clear();
        return super.done();
    }


    /**
     * Loeschen des Store
     */

    clear(): void {
        this.mDialogList.clear();
    }


    /**
     * neuen Dialog erzeugen
     *
     * @param {string} aDialogName - Name des Dialogs
     *
     * @return {IDialogObject} dialogObject - Dialogobjekt
     */

    newDialog( aDialogName: string ): IDialogObject {
        const dialogObject = new DialogObject( aDialogName );
        this.mDialogList.set( aDialogName, dialogObject );
        return dialogObject;
    }


    /**
     * neuen Dialogzustand erzeugen
     *
     * @param {string} aDialogName - Name des Dialogs
     * @param {string} aStateName  - Name des Zustands
     * @param {number} aStateId    - Nummer des Zustands
     *
     * @return {IDialogState} dialogState - Dialogzustandsobjekt
     */

    newDialogState( aDialogName: string, aStateName: string, aStateId: number ): IDialogState {
        const dialogObject = this.getDialog( aDialogName );
        if ( !dialogObject ) {
            this.error( 'newDialogState', 'kein dialog vorhanden ' + aDialogName );
            return null;
        }
        return dialogObject.newDialogState( aStateName, aStateId );
    }


    /**
     * Rueckgabe des Dialogobjektes
     *
     * @param {string} aDialogName - Name des Dialogs
     *
     * @return {IDialogObject} dialogObject - Dialogobjekt
     */

    getDialog( aDialogName: string ): IDialogObject {
        return this.mDialogList.get( aDialogName );
    }


    /**
     * Rueckgabe des Dialogzustandsobjektes
     *
     * @param {string} aDialogName - Name des Dialogs
     * @param {string} aStateName - Name des Dialogzustands
     *
     * @return {IDialogState} dialogState - Dialogzustandsobjekt
     */

    getDialogState( aDialogName: string, aStateName: string ): IDialogState {
        const dialogObject = this.getDialog( aDialogName );
        if ( !dialogObject ) {
            this.error( 'getDialogState', 'kein dialog vorhanden ' + aDialogName );
            return null;
        }
        return dialogObject.getDialogState( aStateName );
    }


    // Bind-Funktionen


    getNewDialogFunc(): StoreNewDialogFunc {
        return (aDialogName: string) => {
            return this.newDialog( aDialogName );
        };
    }


    getNewDialogStateFunc(): StoreNewDialogStateFunc {
        return (aDialogName: string, aStateName: string, aStateId: number) => {
            return this.newDialogState( aDialogName, aStateName, aStateId );
        };
    }


    getGetDialogStateFunc(): StoreGetDialogStateFunc {
        return (aDialogName: string, aStateName: string) => {
            return this.getDialogState( aDialogName, aStateName );
        };
    }

}
