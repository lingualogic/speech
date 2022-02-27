/** @packageDocumentation
 * DialogObjekt als Hauptobjekt eines Dialogs
 *
 * Letzte Aenderung: 29.06.2021
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// dialog

import { IDialogState } from './dialog-state.interface';
import { DialogState } from './dialog-state';
import { IDialogObject } from './dialog-object.interface';


/**
 * DialogObject Klasse
 */

export class DialogObject implements IDialogObject {

    private mDialogName = '';
    private mDialogStateList = new Map<string, IDialogState>();


    /**
     * Creates an instance of DialogObject.
     *
     * @param {string} aDialogName
     */

    constructor( aDialogName: string ) {
        // debug('constructor:', aDialogName);
        this.mDialogName = aDialogName;
    }


    getName(): string {
        return this.mDialogName;
    }

    /**
     * Neues Dialog Zustandsobjekt erzeugen im Dialogobjekt
     *
     * @param {string} aStateName - Zustandsname
     * @param {number} aStateId   - Zustandsnummer
     *
     * @return {IDialogState} dialogState - Zustandsobjekt
     */

    newDialogState( aStateName: string, aStateId: number ): IDialogState {
        // console.log('DialogObject.newDialogState:', aStateName, aStateId);
        const dialogState = new DialogState( this.mDialogName, aStateName, aStateId );
        this.mDialogStateList.set( aStateName, dialogState );
        return dialogState;
    }


    /**
     * Rueckgabe des Dialogzustandsobjekte
     *
     * @param {string} aStateName - Zustandsname
     *
     * @return {IDialogState} dialogState - Zustandsobjekt
     */

    getDialogState( aStateName: string ): IDialogState {
        // console.log('DialogObject.getDialogState:', aStateName);
        return this.mDialogStateList.get( aStateName );
    }

}
