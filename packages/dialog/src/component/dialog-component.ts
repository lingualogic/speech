/** @packageDocumentation
 * DialogComponent definiert einen DialogManager fuer Aktionen und Sprachausgaben
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// core

import { ISession } from '@lingualogic-speech/core';


// store

import { STORE_PLUGIN_NAME } from '../store/store-const';
import { IStore } from '../store/store.interface';


// interpreter

import { INTERPRETER_PLUGIN_NAME } from '../interpreter/interpreter-const';
import { IInterpreter } from '../interpreter/interpreter.interface';


// dialog

import { DIALOG_COMPONENT_NAME } from '../dialog-const';
import { IDialogStateContext } from '../dialog-state-context.interface';
import { IDialogOption } from '../dialog-option.interface';
import { DialogBaseComponent } from './dialog-base-component';


/** @export
 * DialogComponent Klasse als Basis eines DialogManagers fuer Aktionen und Sprachausgaben
 */

export class DialogComponent extends DialogBaseComponent {

    // innere Plugins

    private mStore: IStore = null;
    private mInterpreter: IInterpreter = null;


    /**
     * Creates an instance of Dialog.
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aComponentName = '', aRegisterFlag = true ) {
        super( aComponentName || DIALOG_COMPONENT_NAME, aRegisterFlag );
        this._setErrorClassName( 'DialogComponent' );
    }


    // Komponenten-Funktionen


    /**
     * Initialisierung der DialogComponent
     *
     * @param {IDialogOption} aOptions - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: IDialogOption ): number {
        // console.log('DialogComponent.init:', aOptions);
        // pruefen auf bereits initialisiert

        if ( this.isInit()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('DialogComponent.init: bereits initialisiert');
            }
            return 0;
        }

        // interne Plugins auslesen

        this.mStore = this.findPlugin( STORE_PLUGIN_NAME ) as IStore;
        if ( !this.mStore ) {
            return -1;
        }

        this.mInterpreter = this.findPlugin( INTERPRETER_PLUGIN_NAME ) as IInterpreter;
        if ( !this.mInterpreter ) {
            return -1;
        }

        // Initialisierung

        return super.init( aOption );
    }


    /**
     * Freigabe der DialogComponent
     *
     * @return {number} errorcode (0,-1)
     */

    done(): number {
        if ( this.mInterpreter ) {
            this.stop();
            this.mInterpreter = null;
        }
        return super.done();
    }


    // Dialog-Funktionen


    /**
     * Loeschen eines Dialogs
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearDialog(): number {
        if ( !this.isActive()) {
            this.error('clearDialog', 'Komponente ist nicht aktiviert');
            return -1;
        }
        try {
            this.mStore.clear();
            return 0;
        } catch ( aException ) {
            this.exception( 'clearDialog', aException );
            return -1;
        }
    }


    /**
     * Setzen eines Dialognamens
     *
     * @param {string} aDialogName - Name eines Dialogs
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialog( aDialogName: string ): number {
        if ( !this.isActive()) {
            this.error('setDialog', 'Komponente ist nicht aktiviert');
            return -1;
        }
        try {
            return this.mInterpreter.setDialog( aDialogName );
        } catch ( aException ) {
            this.exception( 'setDialog', aException );
            return -1;
        }
    }


    /**
     * Rueckgabe des aktuellen Dialognamens
     *
     * @return {string} Rueckgabe des aktuell eingestellten Dialogs
     */

    getDialog(): string {
        try {
            return this.mInterpreter.getDialog();
        } catch ( aException ) {
            this.exception( 'getDialog', aException );
            return '';
        }
    }


    /**
     * Gibt True zurueck, wenn ein Dialog gerade ausgefuehrt wird.
     *
     * @return {boolean} Rueckgabe, ob der Dialog gerade laeuft
     */

    isRunning(): boolean {
        if ( !this.mInterpreter ) {
            return false;
        }
        return this.mInterpreter.isDialogRunning();
    }


    /**
     * Dialog ausgeben
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    start( aSession?: ISession ): number {
        if ( !this.isActive()) {
            this.error('start', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( !this.mInterpreter ) {
            return -1;
        }
        super.start( aSession );
        return this.mInterpreter.startDialog();
    }


    /**
     * Dialog beenden
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    stop(): number {
        if ( !this.isActive()) {
            this.error('stop', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( !this.mInterpreter ) {
            return -1;
        }
        super.stop();
        return this.mInterpreter.stopDialog();
    }


    /**
     * Dialog-Zustand setzen
     *
     * @param {string} aState - Dialog-Zustandsname
     * @param {IDialogStateContext} aContext - Dialog-Zustandskontextobjekt
     *
     * @return {number} errorCode(0,-1) -Fehlercode
     */

    setDialogState( aState: string, aContext?: IDialogStateContext ): number {
        if ( !this.isActive()) {
            this.error('setDialogState', 'Komponente ist nicht aktiviert');
            return -1;
        }
        try {
            // Kontext uebergeben, wenn nicht vorhanden, um Loeschen des Kontextes zu vermeiden
            if ( !aContext ) {
                aContext = this._getContext();
            }
            return this.mInterpreter.setState( aState, aContext );
        } catch ( aException ) {
            this.exception( 'setDialogState', aException );
            return -1;
        }
    }


    getDialogState(): string {
        try {
            return this.mInterpreter.getState();
        } catch ( aException ) {
            this.exception( 'getDialogState', aException );
            return '';
        }
    }


    /**
     * pruefen, ob es den Zustand ueberhaupt gibt
     * 
     * @param aState - Name des zu pruefenden Zustands
     * @returns True - Zustand existiert
     */
    
    isExistDialogState( aState: string ): boolean {
        try {
            if ( this.mStore.getDialogState( this.mInterpreter.getDialog(), aState )) {
                return true;
            }
        } catch ( aException ) {
            this.exception( 'isExistDialogState', aException );
            return false;
        }
        return false;
    }


    /**
     * Dialog-Zustandskontext setzen
     *
     * @param {IDialogStateContext} aContext - Dialog-Zustandskontextobjekt
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    setDialogStateContext( aContext: IDialogStateContext ): number {
        if ( !this.isActive()) {
            this.error('setDialogStateContext', 'Komponente ist nicht aktiviert');
            return -1;
        }
        try {
            // console.log('DialogCompoment.setDialogStateContext:', aContext);
            return this.mInterpreter.setStateContext( aContext );
        } catch (aException) {
            this.exception( 'setDialogStateContext', aException );
            return -1;
        }
    }


    /**
     * Ueberspringen des naechsten Speak-Knotens, wenn er laeuft, wird er sofort abgebrochen
     * und mit dem folgenden Knoten weitergemacht.
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    skipNextSpeak() {
        if ( !this.isActive()) {
            this.error('skipNextSpeak', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( !this.mInterpreter ) {
            return -1;
        }
        // TODO: Bugfix this function
        // return this.mInterpreter.skipNextSpeakNode();
        return 0;
    }

}
