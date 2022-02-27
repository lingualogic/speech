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


export interface IDialogObject {

    getName(): string;

    newDialogState( aStateName: string, aStateId: number ): IDialogState;
    getDialogState( aStateName: string): IDialogState;

}
