/** @packageDocumentation
 * Dieses Programm transformiert externe JSON-Daten in
 * Dialog Datenobjekte im Dialog-Store.
 *
 * Letzte Aenderung: 27.10.2020
 * Status: rot
 *
 * @module dialog/json
 * @author SB
 */


// core

import { Plugin } from '@speech/core';

// dialog

import {
    DIALOG_ACTION_COMMAND,
    DIALOG_SPEAK_COMMAND,
    DIALOG_WAIT_COMMAND,
    DIALOG_GROUP_NODE,
    DIALOG_ACTION_NODE,
    DIALOG_SPEAK_NODE,
    DIALOG_WAIT_NODE
} from '../dialog-const';
import { DialogDataInterface, DialogCommandInterface } from '../dialog-data.interface';

import { DialogNodeInterface } from '../store/dialog-node.interface';
import { DialogStateInterface } from '../store/dialog-state.interface';
import { DialogObjectInterface } from '../store/dialog-object.interface';
import { StoreNewDialogFunc, StoreNewDialogStateFunc } from '../store/store.interface';

// json

import { JSON_PLUGIN_NAME } from './json-const';
import { JsonInterface, OnJsonEndFunc, TransformJsonFileFunc, TransformJsonDataFunc } from './json.interface';
import { JsonStore } from './json-store';


/**
 * Json Klasse
 */

export class JsonPlugin extends Plugin implements JsonInterface {


    private mJsonStore: JsonStore = null;
    private mDialogObject: DialogObjectInterface = null;
    private mStateObject: DialogStateInterface = null;
    private mStateIdCount = 0;
    private mNodeIdCount = 0;
    private mFirstNodeId = 0;
    private mEndFlag = false;
    private mGroupId = 0;
    private mGroupProperty = '';


    // Event-Funktionen

    private mOnJsonEndFunc: OnJsonEndFunc = null;

    // Funktionen

    private mNewDialogFunc: StoreNewDialogFunc = null;
    private mNewDialogStateFunc: StoreNewDialogStateFunc = null;


    /**
     * Creates an instance of DialogJson
     */

    constructor( aPluginName = '', aRegisterFlag = true ) {
        super( aPluginName || JSON_PLUGIN_NAME, aRegisterFlag );
        this._setErrorClassName( 'JsonPlugin' );
        this.mJsonStore = new JsonStore();
        this.mJsonStore.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Initialisierung des JSON-Transformers
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {
        return super.init( aOption );
    }


    /**
     * Freigabe des JSON-Transformers
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.mDialogObject = null;
        this.mStateObject = null;
        this.mStateIdCount = 0;
        this.mNodeIdCount = 0;
        this.mFirstNodeId = 0;
        this.mEndFlag = false;
        this.mGroupId = 0;
        this.mGroupProperty = '';
        // Event-Funktionen
        this.mOnJsonEndFunc = null;
        // Funktionen
        this.mNewDialogFunc = null;
        this.mNewDialogStateFunc = null;
        return super.done();
    }


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        this.mJsonStore.setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    protected _onJsonEnd(): number {
        // console.log('JsonPlugin._onJsonEnd');
        if ( typeof this.mOnJsonEndFunc === 'function' ) {
            try {
                // console.log('JsonPlugin._onJsonEnd: funktion ausfuehren');
                return this.mOnJsonEndFunc();
            } catch ( aException ) {
                this.exception( '_onJsonEnd', aException );
                return -1;
            }
        }
        return 0;
    }


    set onJsonEnd( aOnJsonEndFunc: OnJsonEndFunc ) {
        this.mOnJsonEndFunc = aOnJsonEndFunc;
    }


    // Store-Funktionen


    /**
     * Neuen Dialog aus dem Store zurueckgeben
     *
     * @private
     * @param aDialogName - Name des zurueckzugebenden Dialogs
     *
     * @return {DialogObjectInterface} Rueckgabe des Dialogdatenobjektes
     */

    protected _newDialog( aDialogName: string ): DialogObjectInterface {
        if (typeof this.mNewDialogFunc === 'function' ) {
            return this.mNewDialogFunc( aDialogName );
        }
        return null;
    }


    /**
     * Neuen DialogZustand aus dem Store zurueckgeben
     *
     * @private
     * @param aDialogName - Name des zurueckzugebenden Dialogs
     * @param aStateName - Name des zurueckzugebenden Dialogzustands
     * @param aStateId - Name der zurueckzugebenden Dialogzustandsnummer
     *
     * @return {DialogStateInterface} Rueckgabe des Dialogzustandsdatenobjektes
     */

    protected _newDialogState( aDialogName: string, aStateName: string, aStateId: number ): DialogStateInterface {
        if (typeof this.mNewDialogStateFunc === 'function' ) {
            return this.mNewDialogStateFunc( aDialogName, aStateName, aStateId );
        }
        return null;
    }


    // Transformer-Funktionen


    /**
     * Parser fuer speech.def Datei. Liest die Def-Daten ein und uebertraegt sie
     * in den DialogStore.
     *
     * @param {string} aDefFileName - Name der einzulesenden Def-Datei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    transformJsonFile( aJsonFileName: string ): number {
        // console.log('transformJsonFile:', aJsonFileName);
        if ( !aJsonFileName ) {
            this.error( 'transformJsonFile', 'kein Dateiname uebergeben' );
            return -1;
        }
        try {
            // TODO: fs muss durch eine eigene kompatible Bibliothek zum Laden von Dateien ersetzt werden
            // const speechDef = String(fs.readFileSync(aDefFileName));
            // return this.parseSpeechDefData(speechDef);
            this.error( 'transformJsonFile', 'nicht implementiert' );
            return 0;
        } catch ( aException ) {
            this.exception( 'transformJsonFile', aException );
            return -1;
        }
    }


    /**
     * Transformer fuer JSON-Daten.
     *
     * @param {Object} aJsonData - JSON-Daten Objekt
     *
     * @return {number} errorCode (0,-1) -Fehlercode
     */

    transformJsonData( aJsonData: DialogDataInterface[] ): number {
        // console.log('transformJsonData: start', aJsonData);

        // alle Daten loeschen

        this.mDialogObject = null;
        this.mStateObject = null;
        this.mStateIdCount = 0;
        this.mNodeIdCount = 0;
        this.mFirstNodeId = 0;
        this.mEndFlag = false;
        this.mGroupId = 0;
        this.mGroupProperty = '';

        // pruefen auf uebergebene Daten

        if ( !aJsonData ) {
            this.error( 'transformJsonData', 'keine Json-Daten uebergeben' );
            return -1;
        }

        try {
            // Dialogdaten in json-store eintragen

            if ( this.mJsonStore.setDialogList( aJsonData ) !== 0 ) {
                this.error( 'transformJsonData', 'Json Daten nicht in Dialoglist eingetragen' );
                return -1;
            }

            // alle Dialoge auslesen

            const dialogList = this.mJsonStore.dialogList;
            for ( const dialog of dialogList ) {
                // console.log('JsonPlugin.transformJsonData:', dialog.name );
                if ( this._transformDialog( dialog.name ) !== 0 ) {
                    return -1;
                }
            }
            // Json Import-Ende Ereignis erzeugen
            return this._onJsonEnd();
        } catch ( aException ) {
            this.exception( 'transformJsonData', aException );
            return -1;
        }
    }


    /**
     * Eintragen des Dialogs
     *
     * @param aDialogName - Name des Dialogs
     */

    protected _transformDialog( aDialogName: string ): number {
        try {
            if ( this.mJsonStore.setCurrentDialog( aDialogName ) !== 0 ) {
                this.error( '_transformDialog', 'kein Dialog vorhanden' );
                return -1;
            }
            // Dialog eintragen
            this.mDialogObject = this._newDialog( aDialogName );
            if ( !this.mDialogObject ) {
                this.error( '_transformDialog', 'kein Dialog erzeugt' );
                return -1;
            }

            // console.log('parse DIALOG: ', aDialogName, this.mDialogObject);

            // Schleife fuer alle States

            this.mEndFlag = false;
            const stateList = this.mJsonStore.stateList;
            for ( const state of stateList ) {
                // console.log('JsonPlugin.transformDialog:', state.name );
                if ( this._transformState( aDialogName, state.name ) !== 0 ) {
                    return -1;
                }
            }
            return 0;
        } catch ( aException ) {
            this.exception( '_transformDialog', aException );
            return -1;
        }
    }


    /**
     * Eintragen des States in den Dialog-Store
     */

    protected _transformState( aDialogName: string, aStateName: string ): number {
        try {
            if ( this.mJsonStore.setCurrentState( aStateName ) !== 0 ) {
                this.error( '_transformState', 'kein State vorhanden' );
                return -1;
            }
            // State eintragen
            this.mStateIdCount++;
            const stateId = this.mStateIdCount;
            this.mFirstNodeId = 0;
            this.mStateObject = this._newDialogState( aDialogName, aStateName, stateId);
            if ( !this.mStateObject ) {
                this.error( '_transformState', 'kein State erzeugt' );
                return -1;
            }

            // console.log('parse STATE:', stateId, aStateName, aDialogName);

            // Schleife fuer alle Intents
            this.mEndFlag = false;
            const intentNameList = this.mJsonStore.stateIntentList;
            let intentCount = 0;
            for ( const intentName of intentNameList ) {
                // console.log('JsonPlugin.transformState:', intentName );
                intentCount++;
                if ( intentCount === intentNameList.length ) {
                    this.mEndFlag = true;
                }
                if ( this._transformIntent( stateId, intentName ) !== 0 ) {
                    return -1;
                }
            }
            return 0;
        } catch ( aException ) {
            this.exception( '_transformState', aException );
            return -1;
        }
    }


    /**
     * Eintragen des Intents in den State
     */

    protected _transformIntent( aStateId: number, aIntentName: string ): number {
        try {
            if ( this.mJsonStore.setCurrentIntent( aIntentName ) !== 0 ) {
                this.error( '_transformIntent', 'kein Intent vorhanden' );
                return -1;
            }

            // TODO: Einbau der Gruppenerzeugung, wenn Optional oder Scrollable vorhanden sind

            const intent = this.mJsonStore.intent;
            if ( !intent ) {
                this.error( '_transformIntent', 'kein Intent erzeugt' );
                return -1;
            }

            // pruefen auf Optional-Gruppe

            // console.log('JsonPlugin._transformIntent: intent = ', intent);
            if ( intent.optional ) {
                this.mNodeIdCount++;
                const id = this.mNodeIdCount;
                if ( this.mFirstNodeId === 0 ) {
                    this.mFirstNodeId = id;
                }
                this.mGroupProperty = 'optional';
                const nextId = id + 1;
                this.mGroupId = id;
                const nodeObject = this.mStateObject.newDialogNode( DIALOG_GROUP_NODE, id, 0, nextId );
                nodeObject.setProperty( this.mGroupProperty );
                // console.log('parse GROUP:', id, aStateId, nextId, this.mGroupProperty);
            }

            // pruefen auf Scrollable-Gruppe

            if ( intent.scrollable ) {
                this.mNodeIdCount++;
                const id = this.mNodeIdCount;
                if ( this.mFirstNodeId === 0 ) {
                    this.mFirstNodeId = id;
                }
                this.mGroupProperty = 'scrollable';
                const nextId = id + 1;
                this.mGroupId = id;
                const nodeObject = this.mStateObject.newDialogNode( DIALOG_GROUP_NODE, id, 0, nextId );
                nodeObject.setProperty( this.mGroupProperty );
                // console.log('parse GROUP:', id, aStateId, nextId, this.mGroupProperty);
            }

            // Schleife fuer alle Kommandos des Intents

            const commandList = this.mJsonStore.commandList;
            const commandListCount = commandList.length;
            let endFlag = false;
            let count = 0;
            for ( const command of commandList ) {
                // console.log('JsonPlugin.transformIntent:', count, command.name );
                count++;
                // letzten Knoten feststellen
                if ( count >= commandListCount && this.mEndFlag ) {
                    endFlag = true;
                }
                if ( this._transformCommand( aStateId, command, endFlag ) !== 0 ) {
                    return -1;
                }
            }

            // pruefen auf Optional-Gruppe

            if ( intent.optional ) {
                this.mGroupId = 0;
                this.mGroupProperty = '';
            }

            // pruefen auf Scrollable-Gruppe

            if ( intent.scrollable ) {
                this.mGroupId = 0;
                this.mGroupProperty = '';
            }

            return 0;
        } catch ( aException ) {
            this.exception( '_transformIntent', aException );
            return -1;
        }
    }


    /**
     * Eintragen des Kommandos in den State
     */

    protected _transformCommand( aStateId: number, aCommand: DialogCommandInterface, aEndFlag: boolean ): number {
        try {
            this.mNodeIdCount++;
            const id = this.mNodeIdCount;
            if ( this.mFirstNodeId === 0 ) {
                this.mFirstNodeId = id;
            }
            let nextId = id + 1;
            if ( aEndFlag ) {
                nextId = 0;
            }
            // Aktion eintragen
            if ( aCommand.name === DIALOG_ACTION_COMMAND ) {
                const name = aCommand.action;
                const objectType = aCommand.type;
                const objectName = aCommand.element;
                const nodeObject = this.mStateObject.newDialogNode( DIALOG_ACTION_NODE, id, this.mGroupId, nextId );
                nodeObject.setName( name );
                nodeObject.setObjectType( objectType );
                nodeObject.setObjectName( objectName );
                nodeObject.setProperty( this.mGroupProperty );
                // console.log('parse ACTION:', id, aStateId, this.mGroupId, nextId, name, objectType, objectName);
            } else if ( aCommand.name === DIALOG_SPEAK_COMMAND ) {
                // Speak eintragen
                const text = this.mJsonStore.findText( aCommand.textId );
                const timeout = this.mJsonStore.findTextTime( aCommand.textId );
                const nodeObject = this.mStateObject.newDialogNode( DIALOG_SPEAK_NODE, id, this.mGroupId, nextId );
                nodeObject.setTimeout( timeout * 1000 );
                // Textname eintragen fuer Audio-Datei
                nodeObject.setName( aCommand.textId );
                nodeObject.setText( text );
                nodeObject.setProperty( this.mGroupProperty );
                // console.log('parse SPEAK:', id, aStateId, this.mGroupId, nextId, text, timeout);
            } else if ( aCommand.name === DIALOG_WAIT_COMMAND ) {
                // Wait eintragen
                const timeout = aCommand.time;
                const nodeObject = this.mStateObject.newDialogNode( DIALOG_WAIT_NODE, id, this.mGroupId, nextId );
                nodeObject.setTimeout( timeout * 1000 );
                nodeObject.setProperty( this.mGroupProperty );
                // console.log('parse WAIT:', id, aStateId, this.mGroupId, nextId, timeout);
            } else {
                // falscher Wert
                this.error( '_transformCommand', 'falsches Kommando' );
                return -1;
            }
            return 0;
        } catch ( aException ) {
            this.exception( '_transformCommand', aException );
            return -1;
        }
    }


    // Bind-Funktionen


    getTransformJsonFileFunc(): TransformJsonFileFunc {
        return (aFileName: string) => {
            return this.transformJsonFile( aFileName );
        };
    }


    getTransformJsonDataFunc(): TransformJsonDataFunc {
        return (aDialogData: DialogDataInterface[]) => {
            return this.transformJsonData( aDialogData );
        };
    }


    setNewDialogFunc( aNewDialogFunc: StoreNewDialogFunc ): number {
        this.mNewDialogFunc = aNewDialogFunc;
        return 0;
    }


    setNewDialogStateFunc( aNewDialogStateFunc: StoreNewDialogStateFunc ): number {
        this.mNewDialogStateFunc = aNewDialogStateFunc;
        return 0;
    }

}
