/** @packageDocumentation
 * DialogNode speichert einen Knoten eines Dialog-Zustands
 *
 * Letzte Aenderung: 29.06.2021
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// dialog

import { IDialogNode } from './dialog-node.interface';


/**
 * DialogNode Klasse
 */

export class DialogNode implements IDialogNode {

    private mNodeType = '';
    private mStateId = 0;
    private mParentId = 0;
    private mNodeId = 0;
    private mNextId = 0;
    private mName = '';
    private mObjectType = '';
    private mObjectName = '';
    private mText = '';
    private mTimeout = 0;
    private mProperty = '';

    /**
     * Creates an instance of DialogNode.
     *
     * @param {string} aNodeType
     * @param {number} aNodeId
     * @param {number} aStateId
     * @param {number} aParentId
     * @param {number} aNextId
     */

    constructor( aNodeType: string, aNodeId: number, aStateId: number, aParentId: number, aNextId: number ) {
        // debug('constructor: type=' + aNodeType + ' nodeId=' + aNodeId + ' stateId=' + aStateId + ' parentId=' + aParentId + ' nextId=' + aNextId );
        this.mNodeType = aNodeType;
        this.mStateId = aStateId;
        this.mParentId = aParentId;
        this.mNodeId = aNodeId;
        this.mNextId = aNextId;
    }

    getNodeType(): string {
        return this.mNodeType;
    }

    getStateId(): number {
        return this.mStateId;
    }

    getParentId(): number {
        return this.mParentId;
    }

    getNodeId(): number {
        return this.mNodeId;
    }

    getNextId(): number {
        return this.mNextId;
    }

    setName( aName: string ): void {
        this.mName = aName;
    }

    getName(): string {
        return this.mName;
    }

    setObjectType( aObjectType: string ): void {
        this.mObjectType = aObjectType;
    }

    getObjectType(): string {
        return this.mObjectType;
    }

    setObjectName( aObjectName: string ): void {
        this.mObjectName = aObjectName;
    }

    getObjectName(): string {
        return this.mObjectName;
    }

    setText( aText: string ): void {
        this.mText = aText;
    }

    getText(): string {
        return this.mText;
    }

    setTimeout( aTimeout: number ): void {
        this.mTimeout = aTimeout;
    }

    getTimeout(): number {
        return this.mTimeout;
    }

    setProperty( aProperty: string ): void {
        this.mProperty = aProperty;
    }

    getProperty(): string {
        return this.mProperty;
    }

}
