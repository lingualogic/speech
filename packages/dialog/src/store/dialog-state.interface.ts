/** @packageDocumentation
 * DialogState Interface
 *
 * Letzte Aenderung: 29.06.2021
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


 // dialog

import { IDialogNode } from './dialog-node.interface';


export interface IDialogState {

    getName(): string;
    getId(): number;
    getDialogName(): string;

    newDialogNode(aNodeType: string, aNodeId: number, aParentId: number, aNextId: number): IDialogNode;
    getDialogNode( aNodeId: number ): IDialogNode;

    getFirstDialogNodeId(): number;
    getNextDialogNodeId(): number;
}

