/**
 * Base API Wrapper fuer alle Cordova-Komponenten.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module base
 * @author SB
 */


// global

import { 
    SPEECH_API_VERSION,
    SPEECH_INIT_EVENT,
    SPEECH_START_EVENT,
    SPEECH_STOP_EVENT,
    SPEECH_ERROR_EVENT,
    OnSpeechInitFunc,
    OnSpeechErrorFunc,
    SpeechErrorFunc,
    ErrorBase,
    EventFunctionList, 
    EventFunc
} from '@lingualogic-speech/core';


// base

import { OnBaseStartFunc, OnBaseStopFunc } from './base-function.type';
import { IBaseOption } from './base-option.interface';
import { IBase } from './base.interface';


/** @export
 * Base Klasse als API-Wrapper fuer alle Komponenten
 */

export class BaseMobile extends ErrorBase implements IBase {


    // Cordova-Plugin

    protected mPlugin: any = null;


    // Events

    protected mInitEvent = new EventFunctionList( SPEECH_INIT_EVENT );
    protected mErrorEvent = new EventFunctionList( SPEECH_ERROR_EVENT );
    protected mStartEvent = new EventFunctionList( SPEECH_START_EVENT );
    protected mStopEvent = new EventFunctionList( SPEECH_STOP_EVENT );


    // interne Attribute

    protected mActiveFlag = true;
    protected mRunningFlag = false;



    /**
     * Konstruktor fuer ereignisbasierte Initialisierung von Action
     */

    constructor( aComponentName?: string, aOption?: IBaseOption ) {
        super( aComponentName );
        if ( this._init( aOption ) !== 0 ) {
            throw new Error('Komponente nicht initialisiert');
        }
        this.mInitEvent.setComponentName( aComponentName );
        this.mErrorEvent.setComponentName( aComponentName );
        this.mStartEvent.setComponentName( aComponentName );
        this.mStopEvent.setComponentName( aComponentName );
        this.mInitEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mErrorEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    protected _getBuilderName(): string {
        return '';
    }


    /**
     * Initialisierung von Base
     *
     * @private
     * @param {IBaseOption} aOption - optionale Parameter zur Konfiguration
     *
     * @return {number} errorCode(0,-1)
     */

    protected _init( aOption?: IBaseOption ): number {
        // console.log('Base.init:', aOption);

        // pruefen auf Fehlerausgabe

        let errorOutputFlag = true;
        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            errorOutputFlag = aOption.errorOutputFlag;
        }

        return 0;
    }


    reset( aOption?: any ): number {
        // return this.mComponent.reset( aOption );
        return 0;
    }


    getType(): string {
        return 'Base';
    }


    getName(): string {
        return this._getErrorClassName();
    }


    getVersion(): string {
        return SPEECH_API_VERSION;
    }


    getApiVersion(): string {
        return SPEECH_API_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    isActive(): boolean {
        if ( this.mActiveFlag && this.mPlugin ) {
            return true;
        }
        return false;
    }


    setActiveOn(): number {
        this.mActiveFlag = true;
        return 0;
    }


    setActiveOff(): number {
        this.mActiveFlag = false;
        return 0;
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        this.mInitEvent.setErrorOutput( aErrorOutputFlag );
        this.mErrorEvent.setErrorOutput( aErrorOutputFlag );
        this.mStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mStopEvent.setErrorOutput( aErrorOutputFlag );
    }


    /**
     * Rueckgabe der internen Fehlerfunktion fuer innere Klassen
     *
     * @private
     * @return {SpeechErrorFunc} Rueckgabe der Fehlerfunktion fuer ErrorBase
     * @memberof Plugin
     */

    protected _getErrorOutputFunc(): SpeechErrorFunc {
        // Uebersetzt ErrorBase Fehlerfunktion mit Fehlertext in Fehlerevent mit erzeugtem Fehlerobjekt
        return (aErrorText: string) => this._onError( new Error( aErrorText));
    }


    // Event-Funktionen


    /*
     * Kommentar:
     *
     * Generische Eventfunktions-API dient der Verbindung der Kompnenten
     * untereinander ueber Ereignisfunktionen.
     */


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onInit(): number {
        // console.log('Component._onInit:', this.getName());
        return this.mInitEvent.dispatch( this.getName());
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onError( aError: any ): number {
        // console.log('Component._onError:', this.getName(), aError.message);
        return this.mErrorEvent.dispatch( aError );
    }


    /**
     * Ereignisfunktion fuer start()
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onStart(): number {
        // console.log('ActionComponent._onActionStart');
        return this.mStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer stop()
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onStop(): number {
        // console.log('ActionComponent._onActionStop');
        return this.mStopEvent.dispatch();
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
        let result = 0;
        switch ( aEventName ) {

            case SPEECH_INIT_EVENT:
                // console.log('Component.addEventListener: init event');
                result = this.mInitEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_ERROR_EVENT:
                // console.log('Component.addEventListener: error event');
                result = this.mErrorEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_START_EVENT:
                result = this.mStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_STOP_EVENT:
                result = this.mStopEvent.addListener( aPluginName, aEventFunc );
                break;
    
            default:
                // in alle Unterkomponenten den Event eintragen, wenn moeglich
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
        let result = 0;
        switch ( aEventName ) {

            case SPEECH_INIT_EVENT:
                result = this.mInitEvent.removeListener( aPluginName );
                break;

            case SPEECH_ERROR_EVENT:
                result = this.mErrorEvent.removeListener( aPluginName );
                break;

            case SPEECH_START_EVENT:
                result = this.mStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_STOP_EVENT:
                result = this.mStopEvent.removeListener( aPluginName );
                break;
    
            default:
                break;
        }
        return result;
    }

    
    addInitEvent( aPluginName: string, aEventFunc: OnSpeechInitFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_INIT_EVENT, aEventFunc );
    }

    addStartEvent( aPluginName: string, aEventFunc: OnBaseStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_START_EVENT, aEventFunc );
    }

    addStopEvent( aPluginName: string, aEventFunc: OnBaseStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_STOP_EVENT, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_ERROR_EVENT, aEventFunc );
    }


    removeInitEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_INIT_EVENT );
    }

    removeStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_START_EVENT );
    }

    removeStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_STOP_EVENT );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_ERROR_EVENT );
    }

    removeAllEvent( aPluginName: string ): number {
        if ( !aPluginName ) {
            this.error('removeAllEvent', 'kein Pluginname uebergeben');
            return -1;
        }
        this.removeInitEvent( aPluginName );
        this.removeStartEvent( aPluginName );
        this.removeStopEvent( aPluginName );
        this.removeErrorEvent( aPluginName );
        return 0;
    }


    // Base-Funktionen


    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        return this.mRunningFlag;
    }


    start(): number {
        // return this.mComponent.start();
        return 0;
    }


    stop(): number {
        // return this.mComponent.stop();
        return 0;
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aTestCommand: string, aTestData?: any ): any {
        // return this.mComponent.test( aTestCommand, aTestData );
        return {};
    }

}
