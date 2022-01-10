/** @packageDocumentation
 * Base Komponente als abstrakte Basiskomponente aller Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module base/component
 * @author SB
 */


// core

import {
    SPEECH_INIT_EVENT,
    SPEECH_START_EVENT,
    SPEECH_STOP_EVENT,
    SPEECH_ERROR_EVENT,
    OnSpeechInitFunc,
    OnSpeechErrorFunc,
    EventFunctionList,
    EventFunc,
    Component,
    ISession
} from '@speech/core';


// base

import { BASE_VERSION_STRING, BASE_API_VERSION } from '../base-version';
import { BASE_TYPE_NAME, BASE_COMPONENT_NAME } from '../base-const';
import { BaseStartFunc, BaseStopFunc, OnBaseStartFunc, OnBaseStopFunc } from '../base-function.type';
import { IBaseOption } from '../base-option.interface';
import { IBaseComponent } from './base-component.interface';


/** @export
 * BaseComponent Klasse
 */

export class BaseComponent extends Component implements IBaseComponent {


    // Events

    private mStartEvent = new EventFunctionList( SPEECH_START_EVENT, BASE_COMPONENT_NAME );
    private mStopEvent = new EventFunctionList( SPEECH_STOP_EVENT, BASE_COMPONENT_NAME );


    // interne Attribute

    private mRunningFlag = false;


    /**
     * Base Objekt erzeugen
     *
     * @param {string} aComponentName - Name der Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aComponentName, aRegisterFlag = true ) {
        super( aComponentName, aRegisterFlag );
        this.mStartEvent.setComponentName( aComponentName );
        this.mStopEvent.setComponentName( aComponentName );
        this.mStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    getType(): string {
        return BASE_TYPE_NAME;
    }

    getClass(): string {
        return 'BaseComponent';
    }

    getVersion(): string {
        return BASE_VERSION_STRING;
    }

    getApiVersion(): string {
        return BASE_API_VERSION;
    }

    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der lokalen Optionen
     *
     * @protected
     * @param {IBaseOption} aOption - optionale Parameter
     */

    protected _setOption( aOption: IBaseOption ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    protected _initAllPlugin( aOption?: IBaseOption ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    /**
     * Initialisierung von Base
     *
     * @param {Object} aOption - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: IBaseOption ): number {
        // console.log('BaseComponent.init:', aOption);

        // pruefen auf bereits initialisiert

        if ( this.isInit()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('BaseComponent.init: bereits initialisiert');
            }
            return 0;
        }

        // alle inneren Komponenten starten

        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // alle inneren Plugins holen

        if ( this._initAllPlugin( aOption ) !== 0 ) {
            this._clearInit();
            return -1;
        }

        // Eintragen der optionalen Parameter zur Konfiguration der Komponente

        this._setOption( aOption );

        // Initialisierung erfolgreich

        return 0;
    }


    /**
     * Loeschen der inneren Plugins
     *
     * @protected
     */

    protected _doneAllPlugin(): void {
        // muss von erbenden Klassen ueberschrieben werden
    }


    /**
     * Loeschen der inneren Events
     *
     * @protected
     */

    protected _doneAllEvent(): void {
        // muss von erbenden Klassen ueberschrieben werden
    }


    /**
     * Loeschen der inneren Attribute
     *
     * @protected
     */

    protected _doneAllAttribute(): void {
        // muss von erbenden Klassen ueberschrieben werden
    }


    /**
     * Freigabe der BaseComponent
     *
     * @return {number} errorcode (0,-1)
     */

    done(): number {
        // console.log('BaseComponent.done');

        if ( this.isRunning()) {
            this.stop();
        }

        // alle Events loeschen

        this._doneAllEvent();
        this.mStartEvent.clear();
        this.mStopEvent.clear();

        // alle inneren Komponenten freigeben

        this._doneAllPlugin();

        // alle inneren Attribute loeschen

        this._doneAllAttribute();
        return super.done();
    }


    /**
     * Defaultwerte setzen
     *
     * @protected
     */

    protected _resetAllDefault(): void {
        // muss von erbenden Klassen ueberschrieben werden
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

        // laufende Aufgabe abbrechen

        if ( this.isRunning()) {
            this.stop();
        }

        // Default-Einstellungen

        this.setActiveOn();
        this._resetAllDefault();

        // Optionen setzen

        this._setOption( aOption );
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
        this.mStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mStopEvent.setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer start()
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onStart(): number {
        // console.log('BaseComponent._onActionStart');
        return this.mStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer stop()
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onStop(): number {
        // console.log('BaseComponent._onStop');
        return this.mStopEvent.dispatch();
    }


    /**
     * Rueckgabe der Start-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onStart() {
        return () => this._onStart();
    }


    /**
     * Rueckgabe der Stop-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onStop() {
        return () => this._onStop();
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
        // console.log('BaseComponent.addEventListener:', aPluginName, aEventName, aEventFunc);
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_START_EVENT:
                result = this.mStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_STOP_EVENT:
                result = this.mStopEvent.addListener( aPluginName, aEventFunc );
                break;

            default:
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
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_START_EVENT:
                result = this.mStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_STOP_EVENT:
                result = this.mStopEvent.removeListener( aPluginName );
                break;

            default:
                result = super.removeEventListener( aPluginName, aEventName );
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


    // Binding-Funktionen


    getStartFunc(): BaseStartFunc {
        return () => this.start();
    }


    getStopFunc(): BaseStopFunc {
        return () => this.stop();
    }


    // Komponenten-Funktionen


    /**
     * Pruefen auf beschaeftigte Komponente
     *
     * @return {boolean} Rueckgabe True, wenn Komponente laeuft
     */

    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        return this.mRunningFlag;
    }


    /**
     * Ausfuehren der Komponente.
     *
     * @param [aSession] - optionaler Parameter fuer die Session-Daten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aSession?: ISession ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    /**
     * Stoppen er Komponente
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return 0;
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * Kommandos:       'say', { sayText: 'zurueckzugebender Text fuer ListenResult' }
     *
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse { result: 0 }
     */

    test( aTestCommand: string, aTestData?: any ): any {
        return { result: -1, errorText: 'kein Test implementiert' };
    }

}
