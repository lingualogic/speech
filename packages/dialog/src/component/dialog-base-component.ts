/** @packageDocumentation
 * DialogBase definiert die Basisfunktionalitaet fuer eine Dialog-Komponente.
 * Von dieser Klasse koennen weitere Varianten der Dialog-Komponente abgeleitet werden.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module dialog/component
 * @author SB
 */


// core

import {
    SPEECH_DIALOGJSON_EVENT,
    SPEECH_DIALOGPARSE_EVENT,
    SPEECH_DIALOGSET_EVENT,
    SPEECH_DIALOGSTART_EVENT,
    SPEECH_DIALOGSTOP_EVENT,
    SPEECH_DIALOGSTATESET_EVENT,
    SPEECH_DIALOGACTION_EVENT,
    SPEECH_DIALOGACTIONSTOP_EVENT,
    SPEECH_DIALOGSPEAK_EVENT,
    SPEECH_DIALOGSPEAKSTART_EVENT,
    SPEECH_DIALOGSPEAKSTOP_EVENT,
    SPEECH_ERROR_EVENT,
    OnSpeechErrorFunc,
    EventFunc,
    EventFunctionList,
    ISession
} from '@lingualogic-speech/core';


// base

import { BaseComponent } from '@lingualogic-speech/base';


// file

import { OnFileReaderReadFunc } from '@lingualogic-speech/file';


// json

import { TransformJsonFileFunc, TransformJsonDataFunc } from '../json/json.interface';


// parser

import { ParserSpeechDefFileFunc, ParserSpeechDefDataFunc } from '../parser/parser.interface';


// dialog

import { DIALOG_API_VERSION, DIALOG_VERSION_STRING } from '../dialog-version';
import {
    OnDialogJsonFunc,
    OnDialogParseFunc,
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc,
    DialogWriteFileDataFunc
} from '../dialog-function.type';
import {
    DIALOG_TYPE_NAME,
    DIALOG_PATH_NAME,
    DIALOG_FILE_NAME,
    DIALOG_LOAD_FLAG,
    DIALOG_MAIN_NAME,
    DIALOG_ROOTSTATE_NAME
} from '../dialog-const';
import { IDialogData } from '../dialog-data.interface';
import { IDialogAction } from '../dialog-action.interface';
import { IDialogSpeak } from '../dialog-speak.interface';
import { IDialogStateContext } from '../dialog-state-context.interface';
import { IDialogOption } from '../dialog-option.interface';
import { IDialogComponent } from './dialog-component.interface';
import { DialogContext } from './dialog-context';


/** @export
 * DialogBaseComponent Klasse
 */

export class DialogBaseComponent extends BaseComponent implements IDialogComponent {


    // innere Listen

    private mDialogContext = new DialogContext();

    // Funktionen

    private mTransformJsonFileFunc: TransformJsonFileFunc = null;
    private mTransformJsonDataFunc: TransformJsonDataFunc = null;

    private mParseSpeechDefFileFunc: ParserSpeechDefFileFunc = null;
    private mParseSpeechDefDataFunc: ParserSpeechDefDataFunc = null;
    private mReadFileFunc: OnFileReaderReadFunc = null;

    // Events

    private mDialogJsonEvent = new EventFunctionList( SPEECH_DIALOGJSON_EVENT );
    private mDialogParseEvent = new EventFunctionList( SPEECH_DIALOGPARSE_EVENT );
    private mDialogSetEvent = new EventFunctionList( SPEECH_DIALOGSET_EVENT );
    private mDialogStartEvent = new EventFunctionList( SPEECH_DIALOGSTART_EVENT );
    private mDialogStopEvent = new EventFunctionList( SPEECH_DIALOGSTOP_EVENT );
    private mDialogStateSetEvent = new EventFunctionList( SPEECH_DIALOGSTATESET_EVENT );
    private mDialogActionEvent = new EventFunctionList( SPEECH_DIALOGACTION_EVENT );
    private mDialogActionStopEvent = new EventFunctionList( SPEECH_DIALOGACTIONSTOP_EVENT );
    private mDialogSpeakEvent = new EventFunctionList( SPEECH_DIALOGSPEAK_EVENT );
    private mDialogSpeakStartEvent = new EventFunctionList( SPEECH_DIALOGSPEAKSTART_EVENT );
    private mDialogSpeakStopEvent = new EventFunctionList( SPEECH_DIALOGSPEAKSTOP_EVENT );

    // interne Attribute

    private mDialogLoadFlag = DIALOG_LOAD_FLAG;
    private mDialogFilePath = DIALOG_PATH_NAME; // lokaler Pfad zur Dialog-Def-Datei
    private mDialogFileName = DIALOG_FILE_NAME;
    private mActivDialogFlag = false;


    /**
     * DialogBase Objekt erzeugen
     *
     * @param {string} aComponentName - Name der aktuellen Komponente
     * @param {boolean} aRegisterFlag - bestimmt, ob Komponente in PluginManager eingetragen wird
     */

    constructor( aComponentName: string, aRegisterFlag = true ) {
        super( aComponentName, aRegisterFlag );
        // eintragen der Fehlerfunktion
        this.mDialogContext.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogJsonEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogParseEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSetEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogStateSetEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogActionEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogActionStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSpeakEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSpeakStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSpeakStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        // eintragen des Komponentennamens
        this.mDialogJsonEvent.setComponentName( aComponentName );
        this.mDialogParseEvent.setComponentName( aComponentName );
        this.mDialogSetEvent.setComponentName( aComponentName );
        this.mDialogStartEvent.setComponentName( aComponentName );
        this.mDialogStopEvent.setComponentName( aComponentName );
        this.mDialogStateSetEvent.setComponentName( aComponentName );
        this.mDialogActionEvent.setComponentName( aComponentName );
        this.mDialogActionStopEvent.setComponentName( aComponentName );
        this.mDialogSpeakEvent.setComponentName( aComponentName );
        this.mDialogSpeakStartEvent.setComponentName( aComponentName );
        this.mDialogSpeakStopEvent.setComponentName( aComponentName );
    }


    getType(): string {
        return DIALOG_TYPE_NAME;
    }


    getClass(): string {
        return 'DialogBaseComponent';
    }


    getVersion(): string {
        return DIALOG_VERSION_STRING;
    }


    getApiVersion(): string {
        return DIALOG_API_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der optionalen Parameter fuer die Startkonfiguration des Service
     *
     * @protected
     * @param {IDialogOption} aOption - optionale Parameter fuer Dialogkonfiguration
     */

    protected _setOption( aOption: IDialogOption ): number {
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
        // Dialog-Name eintragen
        if ( typeof aOption.dialogName === 'string' ) {
            // console.log('DialogBase._setOption: dialogName', aOptions.dialogName);
            this.setDialog( aOption.dialogName );
        }
        // Dialog-Startzustand eintragen
        if ( typeof aOption.dialogRootState === 'string' ) {
            // console.log('DialogBase._setOption: dialogRootState', aOptions.dialogRootState);
            this.setDialogState( aOption.dialogRootState );
        }
        // Dialogladeflag eintragen
        if ( typeof aOption.dialogLoadFlag === 'boolean' ) {
            // console.log('DialogBase._setOption: dialogLoadFlag =', aOption.dialogLoadFlag);
            if ( aOption.dialogLoadFlag === true ) {
                this.mDialogLoadFlag = true;
            } else {
                this.mDialogLoadFlag = false;
            }
        }
        // Dialog-Dateipfad eintragen
        if ( typeof aOption.dialogFilePath === 'string' ) {
            // console.log('DialogBase._setOption: dialogFilePath =', aOptions.dialogFilePath);
            this.setDialogFilePath( aOption.dialogFilePath );
        }
        // Dialog-Dateiname eintragen
        if ( typeof aOption.dialogFileName === 'string' ) {
            // console.log('DialogBase._setOption: dialogFileName =', aOptions.dialogFileName);
            this.setDialogFileName( aOption.dialogFileName );
        }
        return super._setOption( aOption );
    }


    /**
     * Dialogdatei lokal laden
     */

    protected _initLoadDialogFile(): number {
        // console.log('DialogBase._initLoadDialogFile: Dialogdatei wird geladen ', this.mDialogLoadFlag);
        if ( this.mDialogLoadFlag && this.loadDialogFile() !== 0 ) {
            this.error( 'init', 'Dialogdatei nicht geladen' );
            this._clearInit();
            return -1;
        }
        return 0;
    }


    /**
     * Initialisierung des Speech-Systems
     *
     * @param {IDialogOption} aOption - optionale Parameter {}
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: IDialogOption ): number {
        // console.log('DialogProxy.init:', aOptions);

        // Initialisierung erfolgreich

        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // Verbindung mit Netz aufbauen

        if ( this.connect() !== 0 ) {
            this._clearInit();
            return -1;
        }

        // optional Dialogdatei laden

        return this._initLoadDialogFile();
    }


    /**
     * Loeschen der inneren Events
     */

    protected _doneAllEvent(): void {
        // Events

        this.mDialogParseEvent.clear();
        this.mDialogSetEvent.clear();
        this.mDialogStartEvent.clear();
        this.mDialogStopEvent.clear();
        this.mDialogStateSetEvent.clear();
        this.mDialogActionEvent.clear();
        this.mDialogActionStopEvent.clear();
        this.mDialogSpeakEvent.clear();
        this.mDialogSpeakStartEvent.clear();
        this.mDialogSpeakStopEvent.clear();
    }


    /**
     * Loeschen der inneren Attribute
     *
     * @protected
     */

    protected _doneAllAttribute(): void {
        // interne Attribute

        this.mDialogContext.clear();
        this.mReadFileFunc = null;

        this.mDialogFilePath = DIALOG_PATH_NAME; // lokaler Pfad zur Dialog-Def-Datei
        this.mDialogFileName = DIALOG_FILE_NAME; // Dialog-Def-Datei
        this.mDialogLoadFlag = DIALOG_LOAD_FLAG;
        this.mActivDialogFlag = false;
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {any} aOption - optionale Parameter
     */

    reset( aOption?: any ): number {

        if ( !this.isInit()) {
            this.error( 'reset', 'Komponente nicht initialisiert' );
            return -1;
        }

        // Default-Einstellungen

        this.stop();
        this.setActiveOn();
        this.clearDialog();
        this.mDialogContext.clear();
        this.setDialog( DIALOG_MAIN_NAME );
        this.setDialogState( DIALOG_ROOTSTATE_NAME );

        // interne Attribute

        this.mDialogFilePath = DIALOG_PATH_NAME; // lokaler Pfad zur Dialog-Def-Datei
        this.mDialogFileName = DIALOG_FILE_NAME; // Dialog-Def-Datei
        this.mDialogLoadFlag = DIALOG_LOAD_FLAG;
        this.mActivDialogFlag = false;

        // optionale Parameter eintragen

        this._setOption( aOption );

        // console.log('DialogComponent.init: Dialogdatei wird geladen');
        if ( this.mDialogLoadFlag && this.loadDialogFile() !== 0 ) {
            this.error( 'reset', 'Dialogdatei nicht geladen' );
            return -1;
        }
        return 0;
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
        this.mDialogJsonEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogParseEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogSetEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogStateSetEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogActionEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogActionStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogSpeakEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogSpeakStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogSpeakStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mDialogContext.setErrorOutput( aErrorOutputFlag );
    }


    // Netz-Funktionen


    /**
     * Bot mit Server verbinden
     *
     * @returns {number} errorCode(0,-1)
     */

    connect(): number {
        return 0;
    }


    /**
     * Pruefen, ob Bot erfolgreich mit dem Server verbunden ist
     *
     * @return {boolean} true, erfolgreich verbunden, false sonst.
     */

    isConnect(): boolean {
        return false;
    }


    /**
     * Rueckgabe des Typs des Speech-APIs
     *
     * @return {string} type des Speech-APIS (web, cordova)
     */

    getNetType(): string {
        return '';
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Dialog json
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogJson(): number {
        // console.log('DialogComponent._onDialogJson');
        return this.mDialogJsonEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog geparst
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogParse(): number {
        // console.log('DialogComponent._onDialogParse');
        return this.mDialogParseEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog eingetragen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogSet( aDialogName: string ): number {
        // console.log('DialogComponent._onDialogSet:', aDialogName);
        return this.mDialogSetEvent.dispatch( aDialogName );
    }


    /**
     * Ereignisfunktion fuer Dialog gestartet
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogStart(): number {
        // console.log('DialogBase._onDialogStart');
        this.mActivDialogFlag = true;
        return this.mDialogStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogStop(): number {
        // console.log('DialogBase._onDialogStop');
        this._stop();
        return this.mDialogStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog Zustand gesetzt
     *
     * @private
     * @param {string} aStateName - Name des Dialogzustands
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogStateSet( aStateName: string ): number {
        // console.log('DialogComponent._onDialogStop');
        return this.mDialogStateSetEvent.dispatch( aStateName );
    }


    /**
     * Ereignisfunktion fuer Dialog Aktion ausfuehren
     *
     * @private
     * @param {IDialogAction} aSAction - Datentransferobjekt fuer die Aktion
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogAction( aAction: IDialogAction ): number {
        // console.log('DialogComponent._onDialogAction:', aAction);
        return this.mDialogActionEvent.dispatch( aAction );
    }


    /**
     * Ereignisfunktion fuer Dialog Aktion beenden
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogActionStop(): number {
        // console.log('DialogComponent._onDialogActionStop');
        return this.mDialogActionStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe ausfuehren
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogSpeak( aSpeak: IDialogSpeak ): number {
        // console.log('DialogComponent._onDialogSpeak:', aSpeak);
        return this.mDialogSpeakEvent.dispatch( aSpeak );
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestartet
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogSpeakStart(): number {
        // console.log('DialogComponent._onDialogSpeakStart');
        return this.mDialogSpeakStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onDialogSpeakStop(): number {
        // console.log('DialogComponent._onSpeakStop');
        this._onDialogActionStop();
        return this.mDialogSpeakStopEvent.dispatch();
    }


    /**
     * Rueckgabe der NetOpen-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onNetOpen() {
        return () => 0;
    }


    /**
     * Rueckgabe der DialogJson-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogJson() {
        return () => this._onDialogJson();
    }


    /**
     * Rueckgabe der DialogParse-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogParse() {
        return () => this._onDialogParse();
    }


    /**
     * Rueckgabe der DialogSet-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSet() {
        return (aDialogName: string) => this._onDialogSet( aDialogName );
    }


    /**
     * Rueckgabe der DialogStart-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogStart() {
        return () => this._onDialogStart();
    }


    /**
     * Rueckgabe der DialogStop-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogStop() {
        return () => this._onDialogStop();
    }


    /**
     * Rueckgabe der DialogStateSet-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogStateSet() {
        return (aStateName: string) => this._onDialogStateSet( aStateName );
    }


    /**
     * Rueckgabe der DialogAction-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogAction() {
        return (aAction: IDialogAction) => this._onDialogAction( aAction );
    }


    /**
     * Rueckgabe der DialogAction-Ereignisfunktion, um ein Ereignis extern zu stoppen
     *
     * @readonly
     */

    get onDialogActionStop() {
        return () => this._onDialogActionStop();
    }


    /**
     * Rueckgabe der DialogSpeak-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSpeak() {
        return (aSpeak: IDialogSpeak) => this._onDialogSpeak( aSpeak );
    }


    /**
     * Rueckgabe der DialogSpeakStart-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSpeakStart() {
        return () => this._onDialogSpeakStart();
    }


    /**
     * Rueckgabe der DialogSpeakStop-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSpeakStop() {
        return () => this._onDialogSpeakStop();
    }


    /**
     * EventFunktion eintragen
     *
     * @param {string} aPluginName - Name des Listeners
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorcode(0,-1)
     */

    addEventListener( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number {
        // console.log('DialogProxy.addEventListener:', aPluginName, aEventName, aEventFunc);
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_DIALOGJSON_EVENT:
                result = this.mDialogJsonEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGPARSE_EVENT:
                result = this.mDialogParseEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSET_EVENT:
                result = this.mDialogSetEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSTART_EVENT:
                result = this.mDialogStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSTOP_EVENT:
                result = this.mDialogStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSTATESET_EVENT:
                result = this.mDialogStateSetEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGACTION_EVENT:
                result = this.mDialogActionEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGACTIONSTOP_EVENT:
                result = this.mDialogActionStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSPEAK_EVENT:
                result = this.mDialogSpeakEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSPEAKSTART_EVENT:
                result = this.mDialogSpeakStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSPEAKSTOP_EVENT:
                result = this.mDialogSpeakStopEvent.addListener( aPluginName, aEventFunc );
                break;

            default:
                // console.log('Dialog.addEventListener: Event ' + aEventName + ' ist nicht vorhanden');
                result = super.addEventListener( aPluginName, aEventName, aEventFunc );
                break;
        }
        return result;
    }


    /**
     * EventFunktion entfernen
     *
     * @param {string} aPluginName - Name des Listeners (Pluginname)
     * @param {string} aEventName - Name des Events
     */

    removeEventListener( aPluginName: string, aEventName: string ): number {
        // console.log('DialogProxy.removeEventListener:', aPluginName, aEventName);
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_DIALOGJSON_EVENT:
                result = this.mDialogJsonEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGPARSE_EVENT:
                result = this.mDialogParseEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSET_EVENT:
                result = this.mDialogSetEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSTART_EVENT:
                result = this.mDialogStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSTOP_EVENT:
                result = this.mDialogStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSTATESET_EVENT:
                result = this.mDialogStateSetEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGACTION_EVENT:
                result = this.mDialogActionEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGACTIONSTOP_EVENT:
                result = this.mDialogActionStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSPEAK_EVENT:
                result = this.mDialogSpeakEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSPEAKSTART_EVENT:
                result = this.mDialogSpeakStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSPEAKSTOP_EVENT:
                result = this.mDialogSpeakStopEvent.removeListener( aPluginName );
                break;

            default:
                // console.log('Dialog.removeEventListener: Event ' + aEventName + ' ist nicht vorhanden');
                result = super.removeEventListener( aPluginName, aEventName );
                break;
        }
        return result;
    }


    // add-Funktionen


    addDialogJsonEvent( aPluginName: string, aEventFunc: OnDialogJsonFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGJSON_EVENT, aEventFunc );
    }

    addDialogParseEvent( aPluginName: string, aEventFunc: OnDialogParseFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGPARSE_EVENT, aEventFunc );
    }

    addDialogSetEvent( aPluginName: string, aEventFunc: OnDialogSetFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSET_EVENT, aEventFunc );
    }

    addDialogStartEvent( aPluginName: string, aEventFunc: OnDialogStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSTART_EVENT, aEventFunc );
    }

    addDialogStopEvent( aPluginName: string, aEventFunc: OnDialogStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSTOP_EVENT, aEventFunc );
    }

    addDialogStateSetEvent( aPluginName: string, aEventFunc: OnDialogStateSetFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSTATESET_EVENT, aEventFunc );
    }

    addDialogActionEvent( aPluginName: string, aEventFunc: OnDialogActionFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGACTION_EVENT, aEventFunc );
    }

    addDialogActionStopEvent( aPluginName: string, aEventFunc: OnDialogActionStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGACTIONSTOP_EVENT, aEventFunc );
    }

    addDialogSpeakEvent( aPluginName: string, aEventFunc: OnDialogSpeakFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSPEAK_EVENT, aEventFunc );
    }

    addDialogSpeakStartEvent( aPluginName: string, aEventFunc: OnDialogSpeakStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSPEAKSTART_EVENT, aEventFunc );
    }

    addDialogSpeakStopEvent( aPluginName: string, aEventFunc: OnDialogSpeakStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSPEAKSTOP_EVENT, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_ERROR_EVENT, aEventFunc );
    }


    // remove-Funktionen


    removeDialogJsonEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGJSON_EVENT );
    }

    removeDialogParseEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGPARSE_EVENT );
    }

    removeDialogSetEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSET_EVENT );
    }

    removeDialogStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTART_EVENT );
    }

    removeDialogStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTOP_EVENT );
    }

    removeDialogStateSetEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTATESET_EVENT );
    }

    removeDialogActionEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGACTION_EVENT );
    }

    removeDialogActionStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGACTIONSTOP_EVENT );
    }

    removeDialogSpeakEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSPEAK_EVENT );
    }

    removeDialogSpeakStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSPEAKSTART_EVENT );
    }

    removeDialogSpeakStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSPEAKSTOP_EVENT );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_ERROR_EVENT );
    }

    removeAllEvent( aPluginName: string ): number {
        // console.log('DialogBase.removeAllEvent: start', aPluginName);
        let result = super.removeAllEvent( aPluginName );
        if ( this.removeDialogJsonEvent( aPluginName ) !== 0 )       { result = -1; }
        if ( this.removeDialogParseEvent( aPluginName ) !== 0 )      { result = -1; }
        if ( this.removeDialogSetEvent( aPluginName ) !== 0 )        { result = -1; }
        if ( this.removeDialogStartEvent( aPluginName ) !== 0 )      { result = -1; }
        if ( this.removeDialogStopEvent( aPluginName ) !== 0 )       { result = -1; }
        if ( this.removeDialogStateSetEvent( aPluginName ) !== 0 )   { result = -1; }
        if ( this.removeDialogActionEvent( aPluginName ) !== 0 )     { result = -1; }
        if ( this.removeDialogActionStopEvent( aPluginName ) !== 0 ) { result = -1; }
        if ( this.removeDialogSpeakEvent( aPluginName ) !== 0 )      { result = -1; }
        if ( this.removeDialogSpeakStartEvent( aPluginName ) !== 0 ) { result = -1; }
        if ( this.removeDialogSpeakStopEvent( aPluginName ) !== 0 )  { result = -1; }
        if ( this.removeErrorEvent( aPluginName ) !== 0 )            { result = -1; }
        // console.log('DialogBase.removeAllEvent: ende', aPluginName);
        return result;
    }


    // Binding-Funktionen


    setReadFileFunc( aReadFileFunc: OnFileReaderReadFunc ): number {
        this.mReadFileFunc = aReadFileFunc;
        return 0;
    }


    getWriteFileDataFunc(): DialogWriteFileDataFunc {
        return ( aFileData: string ) => this.writeDialogData( aFileData );
    }


    setTransformJsonFileFunc( aTransformJsonFileFunc: TransformJsonFileFunc ): number {
        this.mTransformJsonFileFunc = aTransformJsonFileFunc;
        return 0;
    }


    setTransformJsonDataFunc( aTransformJsonDataFunc: TransformJsonDataFunc ): number {
        this.mTransformJsonDataFunc = aTransformJsonDataFunc;
        return 0;
    }


    setParseSpeechDefFileFunc( aParseSpeechDefFileFunc: ParserSpeechDefFileFunc ): number {
        this.mParseSpeechDefFileFunc = aParseSpeechDefFileFunc;
        return 0;
    }


    setParseSpeechDefDataFunc( aParseSpeechDefDataFunc: ParserSpeechDefDataFunc ): number {
        this.mParseSpeechDefDataFunc = aParseSpeechDefDataFunc;
        return 0;
    }


    // Dialog-Funktionen


    protected _stop(): void {
        this.mActivDialogFlag = false;
        this._onDialogActionStop();
    }


    /**
     * Transformieren der Json-Datei
     *
     * @param {string} aJsonFileName - Name der Json-Datei, die eingelesen werden soll
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    transformJsonFile( aJsonFileName: string ): number {
        if ( !this.isActive()) {
            this.error('transformJsonFile', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( typeof this.mTransformJsonFileFunc === 'function' ) {
            return this.mTransformJsonFileFunc( aJsonFileName );
        }
        return -1;
    }


    /**
     * Transform der uebergebenen Json-Daten
     *
     * @param {string} aJsonData - Json-Daten
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    transformJsonData( aJsonData: IDialogData[]): number {
        if ( !this.isActive()) {
            this.error('transformJsonData', 'Komponente ist nicht aktiviert');
            return -1;
        }
        try {
            if ( typeof this.mTransformJsonDataFunc !== 'function' ) {
                this.error( 'transformJsonData', 'keine JsonData funktion' );
                return -1;
            }
            return this.mTransformJsonDataFunc( aJsonData );
        } catch ( aException ) {
            this.exception( 'transformJsonData', aException);
            return -1;
        }
    }


    /**
     * Parsen der uebergebenen Def-Datei
     *
     * @param {string} aDefFileName - Name der Def-Datei, die eingelesen werden soll
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    parseSpeechDefFile( aDefFileName: string ): number {
        if ( !this.isActive()) {
            this.error('parseSpeechDefFile', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( typeof this.mParseSpeechDefFileFunc === 'function' ) {
            return this.mParseSpeechDefFileFunc( aDefFileName );
        }
        return -1;
    }


    /**
     * Parsen der uebergebenen Def-Daten
     *
     * @param {string} aDefData - Text der Def-Daten
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    parseSpeechDefData( aDefData: string ): number {
        if ( !this.isActive()) {
            this.error('parseSpeechDefData', 'Komponente ist nicht aktiviert');
            return -1;
        }
        try {
            if ( typeof this.mParseSpeechDefDataFunc !== 'function' ) {
                this.error( 'parseSpeechDefData', 'keine ParseDefData funktion' );
                return -1;
            }
            // console.log('DialogBaseComponent.parseSpeechDefData: Aufruf der Parser-Funktion');
            return this.mParseSpeechDefDataFunc( aDefData );
        } catch ( aException ) {
            this.exception( 'parseSpeechDefData', aException);
            return -1;
        }
    }


    /**
     * lokalen Dialogpfad eintragen
     *
     * @param {string} aDialogFilePath
     */

    setDialogFilePath( aDialogFilePath: string ): number {
        if ( !this.isActive()) {
            this.error('setDialogFilePath', 'Komponente ist nicht aktiviert');
            return -1;
        }
        this.mDialogFilePath = aDialogFilePath;
        return 0;
    }


    /**
     * lokalen Dialogpfad zurueckgeben
     *
     * @return {string} dialogPath
     */

    getDialogFilePath(): string {
        return this.mDialogFilePath;
    }


    /**
     * Eintragen des Dialog-Dateinamens ohne Pfadangabe
     *
     * @param {string} aDialogFileName - einzulesende Dialogdatei
     *
     * @return {number} errorCode(0,-1)
     */

    setDialogFileName( aDialogFileName: string ): number {
        if ( !this.isActive()) {
            this.error('setDialogFileName', 'Komponente ist nicht aktiviert');
            return -1;
        }
        this.mDialogFileName = aDialogFileName;
        return 0;
    }


    /**
     * Rueckgabe des Dialog-Dateinamens
     *
     * @return {string} dialogFileName
     */

    getDialogFileName(): string {
        return this.mDialogFileName;
    }


    /**
     * Def-Datei laden und die Def-Daten an den SpeechServer uebertragen
     *
     * @param {string} [aDialogFileName] - Name der zu ladenden Speech-Datei (default Speech.def)
     *
     * @return {number} errorcode (0,-1)
     */

    loadDialogFile( aDialogFileName?: string ): number {
        // console.log('DialogBase.loadDialogFile:', aDialogFileName);
        if ( !this.isActive()) {
            this.error('loadDialogFile', 'Komponente ist nicht aktiviert');
            return -1;
        }
        let fileName = this.mDialogFilePath + this.mDialogFileName;
        if ( aDialogFileName ) {
            fileName = this.mDialogFilePath + aDialogFileName;
        }
        if ( typeof this.mReadFileFunc !== 'function' ) {
            this.error( 'loadDialogFile', 'keine ReadFileFunc vorhanden' );
            return -1;
        }
        // console.log('DialoBase.loadDialogFile:', fileName);
        return this.mReadFileFunc( fileName );
    }


    /**
     * Def-Daten uebertragen
     *
     * @param {string} aDialogData - Inhalt der Dialogdatei eintragen
     *
     * @return {number} errorcode (0,-1)
     */

    writeDialogData( aDialogData: string ): number {
        // console.log('DialogBase.writeDialogData: ', aDialogData);
        if ( !this.isActive()) {
            this.error('writeDialogData', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.parseSpeechDefData( aDialogData );
    }


    /**
     * Pruefen auf aktiven Dialog
     *
     * @return {boolean} True, wenn Dialog laeuft, sonst False
     */

    isRunning(): boolean {
        return this.mActivDialogFlag;
    }


    /**
     * Dialog umschalten zwischen start und stop
     */

    toggleDialog(): number {
        if ( !this.isActive()) {
            this.error('toggleDialog', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( this.isRunning()) {
            return this.stop();
        } else {
            return this.start();
        }
    }


    clearDialog(): number {
        return 0;
    }


    setDialog( aDialogName: string ): number {
        return 0;
    }


    getDialog(): string {
        return '';
    }


    /**
     * Dialog starten
     *
     * @return {number} errorcode (0,-1)
     */

    start( aSession?: ISession ): number {
        this.mActivDialogFlag = true;
        return 0;
    }


    /**
     * Dialog stoppen
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        this._stop();
        return 0;
    }


    /**
     * Zustand setzen
     *
     * @param {string} aState - aktueller Zustand der App
     * @param {Object} aContext - aktueller Kontext zum Zustand
     *
     * @return {number} errorcode (0,-1)
     */

    setDialogState( aState: string, aContext?: IDialogStateContext ): number {
        return 0;
    }


    getDialogState(): string {
        return '';
    }


    /**
     * pruefen, ob es den Zustand ueberhaupt gibt
     * 
     * @param aState - Name des zu pruefenden Zustands
     * @returns True - Zustand existiert
     */

    isExistDialogState( aState: string ): boolean {
        return false;
    }


    /**
     * Zustandskontext setzen
     *
     * @param {Object} aContext
     *
     * @return {number} errorcode (0,-1)
     */

    setDialogStateContext( aContext: IDialogStateContext ): number {
        return 0;
    }


    /**
     * Sofortiger Abbruch und ueberspringen des Speak-Kommandos. Es wird die
     * nach dem Speak folgende Aktion ausgefuehrt.
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    // TODO: ist bisher noch nicht freigeschaltet, da es zu Fehlverhalten kommen kann, wenn mehrere Actions oder mehrere Speaks aufeinanderfolgen!

    skipNextSpeak(): number {
        return 0;
    }


    // Kontext-Funktionen


    /**
     * Kontext loeschen
     */

    clearContext(): number {
        if ( !this.isActive()) {
            this.error('clearContext', 'Komponente ist nicht aktiviert');
            return -1;
        }
        // console.log('DialogBase.clearContext:', this.mDialogContext);
        this.mDialogContext.clear();
        return 0;
    }


    /**
     * Rueckgabe des Kontexts
     *
     * @private
     * @return {IDialogStateContext}
     */

    protected _getContext(): IDialogStateContext {
        return this.mDialogContext.getContext();
    }


    /**
     * Eintragen eines Elementes in den Kontext
     *
     * @param {string} aElementName - Name des Elements
     * @param {string} aContextName - Name des Kontextes
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    addContextElement( aElementName: string, aContextName: string ): number {
        if ( !this.isActive()) {
            this.error('addContextElement', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( this.mDialogContext.insert( aElementName, aContextName ) !== 0 ) {
            return -1;
        }
        return this.setDialogStateContext( this.mDialogContext.getContext());
    }


    /**
     * Entfernen eines Elementes aus den Kontext
     *
     * @param {string} aElementName - Name des Elements
     * @param {string} aContextName - Name des Kontextes
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    removeContextElement( aElementName: string, aContextName: string ): number {
        if ( !this.isActive()) {
            this.error('removeContextElement', 'Komponente ist nicht aktiviert');
            return -1;
        }
        if ( this.mDialogContext.remove( aElementName, aContextName ) !== 0 ) {
            return -1;
        }
        return this.setDialogStateContext( this.mDialogContext.getContext());
    }

}
