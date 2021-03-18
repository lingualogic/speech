/** @packageDocumentation
 * Verwaltet alle angemeldeten Action-Funktionen der App
 *
 * Letzte Aenderung: 26.10.2020
 * Status: gelb
 *
 * @module action/function
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// action

import { ActionStartFunc, ActionStopFunc } from './../action-function.type';
import { ActionDataInterface } from './../action-data.interface';


/** @export
 * ActionFunctionList Klasse zur Verwaltung aller Aktionsfunktionen zu einer Aktion
 */

export class ActionFunctionList extends ErrorBase {

    private mActionStartFuncList = new Map<string, ActionStartFunc>();
    private mActionStopFuncList = new Map<string, ActionStopFunc>();
    private mStopActionFunc: ActionStopFunc = () => 0;


    constructor() {
        super( 'ActionFunctionList' );
    }


    // Action Funktionen


    clear(): void {
        this.mActionStartFuncList.clear();
        this.mActionStopFuncList.clear();
        this.mStopActionFunc = () => 0;
    }


    /**
     * Eintragen der Actions-Funktion
     *
     * @param {string} aActionName
     * @param {function} aActionStartFunc - function(actionObject) startet die Aktion
     * @param {function} aActionStopFunc - function() beendet die Aktion
     *
     * @return errorcode (0,-1)
     */

    insert( aActionName: string, aActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number {
        if ( !aActionName ) {
            this.error( 'insert', 'kein Action-Funktionsname uebergeben' );
            return -1;
        }
        if ( this.mActionStartFuncList.get( aActionName )) {
            this.error( 'insert', 'Actionsfunktion bereits eingetragen' );
            return -1;
        }
        if ( typeof aActionStartFunc !== 'function' ) {
            this.error( 'insert', 'keine StartAction-Funktion uebergeben' );
            return -1;
        }
        try {
            this.mActionStartFuncList.set( aActionName, aActionStartFunc );
            // optional
            if ( typeof aActionStopFunc === 'function' ) {
                this.mActionStopFuncList.set( aActionName, aActionStopFunc );
            } else {
                this.mActionStopFuncList.set( aActionName, () => 0 );
            }
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Entfernen der Aktions-Funktion
     *
     * @param {string} aActionName
     *
     * @return errorcode (0,-1)
     */

    remove( aActionName: string ): number {
        if ( !aActionName ) {
            this.error( 'remove', 'kein Action-Funktionsname uebergeben' );
            return -1;
        }
        try {
            this.mActionStartFuncList.delete( aActionName );
            this.mActionStopFuncList.delete( aActionName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Ausfuehren der Aktions-Startfunktion
     *
     * @param {ActionDataInterface} aAction - Aktions Datentransferobjekt
     *
     * @return errorcode (0,-1)
     */

    startAction( aAction: ActionDataInterface ): number {
        if ( !aAction.action ) {
            this.error( 'startAction', 'kein Action Name' );
            return -1;
        }
        // console.log('DialogActionList.startAction:', aAction);
        this.mStopActionFunc = () => 0;
        try {
            const actionFunction = this.mActionStartFuncList.get( aAction.action );
            // console.log('DialogActionList.startAction:', actionFunction);
            if ( typeof actionFunction !== 'function') {
                // ist eigentlich kein Fehler
                // this._error( 'startAction', 'keine Aktion vorhanden' );
                return 0;
            }
            this.mStopActionFunc = this.mActionStopFuncList.get( aAction.action );
            // Funktion ausfuehren
            actionFunction( aAction );
            return 0;
        } catch ( aException ) {
            this.exception( 'startAction', aException );
            return -1;
        }
    }


    /**
     * Ausfuehren der Aktions-Stopfunktion
     *
     * @param {object} aAction
     *
     * @return errorcode (0,-1)
     */

    // TODO: Problem mit dem Aufruf mehrerer Actions nacheinander,
    //       es gehen die anderen StopFunktionen verloren. Loesung wie
    //       ActionElement notwendig.

    stopAction(): number {
        // console.log('DialogActionList.stopAction:');
        const actionStopFunction = this.mStopActionFunc;
        this.mStopActionFunc = () => 0;
        try {
            if ( typeof actionStopFunction !== 'function' ) {
                return 0;
            }
            // Funktion ausfuehren
            actionStopFunction();
            return 0;
        } catch ( aException ) {
            this.exception( 'stopAction:', aException );
            return -1;
        }
    }

}
