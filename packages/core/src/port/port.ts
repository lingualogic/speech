/** @packageDocumentation
 * Port Basiskomponente, von der alle Ports abgeleitet sind.
 * Ports sind Verbindungskomponenten zu externen Cloud-Diensten.
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// global

import { SPEECH_API_VERSION } from '../const/speech-version';
import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { ErrorBase } from '../error/error-base';


// event

import { EventFunc } from './../event/event-function.type';
import { EventFunctionList } from './../event/event-function-list';
import { IEventData } from './../event/event-data.interface';


// port

import {
    PORT_INIT_EVENT,
    PORT_OPEN_EVENT,
    PORT_CLOSE_EVENT,
    PORT_START_EVENT,
    PORT_STOP_EVENT,
    PORT_STARTAUDIO_EVENT,
    PORT_STOPAUDIO_EVENT,
    PORT_RESULT_EVENT,
    PORT_ERROR_EVENT
} from './port-event-const';
import {
    IPort,
    PortEventFunc
} from './port.interface';
import { PortManager } from './port-manager';


/**
 * Definiert die Basisklasse aller Ports
 */

export class Port extends ErrorBase implements IPort {

    protected mPortName = '';
    protected mPluginName = '';

    // Events

    private mInitEvent = new EventFunctionList( PORT_INIT_EVENT );
    private mOpenEvent = new EventFunctionList( PORT_OPEN_EVENT );
    private mCloseEvent = new EventFunctionList( PORT_CLOSE_EVENT );
    private mStartEvent = new EventFunctionList( PORT_START_EVENT );
    private mStopEvent = new EventFunctionList( PORT_STOP_EVENT );
    private mStartAudioEvent = new EventFunctionList( PORT_STARTAUDIO_EVENT );
    private mStopAudioEvent = new EventFunctionList( PORT_STOPAUDIO_EVENT );
    private mResultEvent = new EventFunctionList( PORT_RESULT_EVENT );
    private mErrorEvent = new EventFunctionList( PORT_ERROR_EVENT );

    // interne Attribute

    private mInitFlag = false;
    private mOpenFlag = false;
    private mRunFlag = false;

    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param aPortName - Instanz-Name des Ports
     * @param aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPortName: string, aRegisterFlag = true ) {
        super( 'Port' );
        this._setErrorClassName( this.getClass());
        this.mPortName = aPortName;
        // console.log('Port.constructor:', aPortName, aRegisterFlag);
        if ( aRegisterFlag && PortManager.insert( aPortName, this ) !== 0 ) {
            throw new Error('Port ' + this.getName() + ' ist bereits im PortManager vorhanden');
        }
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.setErrorOutputFunc( this._getErrorOutputFunc());
        // verbinden der Events mit dem Port
        this.mInitEvent.setComponentName( aPortName );
        this.mOpenEvent.setComponentName( aPortName );
        this.mCloseEvent.setComponentName( aPortName );
        this.mStartEvent.setComponentName( aPortName );
        this.mStopEvent.setComponentName( aPortName );
        this.mStartAudioEvent.setComponentName( aPortName );
        this.mStopAudioEvent.setComponentName( aPortName );
        this.mResultEvent.setComponentName( aPortName );
        this.mErrorEvent.setComponentName( aPortName );
        // verbinden der Event-Fehlerfunktionen mit dem Port
        this.mInitEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mOpenEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mCloseEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mStartEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mStopEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mStartAudioEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mStopAudioEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mResultEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mErrorEvent.setErrorOutputFunc(this._getErrorOutputFunc());
    }


    // Port-Funktionen


    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */

    isMock(): boolean {
        return false;
    }


    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return 'Port';
    }


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string {
        return 'Port';
    }


    /**
     * Rueckgabe des Port-Namens
     *
     * @return {string} Port-Namens, wie er vom PortManager verwendet wird
     */

    getName(): string {
        return this.mPortName;
    }


    getVersion(): string {
        return SPEECH_API_VERSION;
    }


    /**
     * initialisert den Port
     *
     * erlaubte optionale Parameter:
     *
     *      errorOutputFlag - legt fest, ob die Fehlerausgabe auf der Konsole erfolgt
     *
     *
     * @param {any} aOption - optionale Parameter fuer die Konfiguration des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('Port.init: start', aOption);
        if ( this.mInitFlag ) {
            this.error( 'init', 'Port ist bereits initialisiert' );
            return -1;
        }
        if ( aOption ) {
            // traegt das errorOutputFlag ein
            if ( typeof aOption.errorOutputFlag === 'boolean' ) {
                // console.log('Port.init: errorOutputFlag =', aOption.errorOutputFlag, this.getName());
                this.setErrorOutput( aOption.errorOutputFlag );
            }
        }
        this.mInitFlag = true;
        // console.log('Port.init: end');
        return 0;
    }


    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done(): number {
        // console.log('Port.done:', this.getName());
        this.stop( this.mPluginName );
        this.close();
        this.mPluginName = '';
        this.mInitFlag = false;
        this.mOpenFlag = false;
        this.mRunFlag = false;
        this.mInitEvent.clear();
        this.mOpenEvent.clear();
        this.mCloseEvent.clear();
        this.mStartEvent.clear();
        this.mStopEvent.clear();
        this.mStartAudioEvent.clear();
        this.mStopAudioEvent.clear();
        this.mResultEvent.clear();
        this.mErrorEvent.clear();
        super.setErrorOutputDefault();
        return 0;
    }


    /**
     * setzt den Port wieder auf Defaultwerte und uebergebene optionale Parameter.
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    reset( aOption?: any ): number {
        // TODO: Hier muss noch die Reset-Funktionalitaet eingebaut werden
        return 0;
    }


    /**
     * pruefen auf initialisertes Port
     *
     * @return {boolean} true, Port ist initialisiert, false sonst
     */

    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * pruefen auf Server-Verbindung
     *
     * @return {boolean} true, Port hat Server-Verbindung, false sonst
     */

    isServer(): boolean {
        return false;
    }


    /**
     * internes loeschen des Init-Flags, falls Init abgebrochen werden muss
     *
     * @protected
     */

    protected _clearInit(): void {
        this.mInitFlag = false;
    }


    // Fehler-Funktionen


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


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        this.mInitEvent.setErrorOutput( aErrorOutputFlag );
        this.mOpenEvent.setErrorOutput( aErrorOutputFlag );
        this.mCloseEvent.setErrorOutput( aErrorOutputFlag );
        this.mStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mStartAudioEvent.setErrorOutput( aErrorOutputFlag );
        this.mStopAudioEvent.setErrorOutput( aErrorOutputFlag );
        this.mResultEvent.setErrorOutput( aErrorOutputFlag );
        this.mErrorEvent.setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Init aufrufen
     *
     * @private
     * @param {number} aResult - Fehlercode 0 oder -1 von init()
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onInit( aResult: number ): number {
        // console.log('Port._onInit:', aResult);
        const eventData: IEventData = {
            event: PORT_INIT_EVENT,
            type: '',
            source: this.getName(),
            dest: '',
            result: aResult,
            data: null
        };
        return this.mInitEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer Open aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onOpen(): number {
        // console.log('Port._onOpen');
        const eventData: IEventData = {
            event: PORT_OPEN_EVENT,
            type: '',
            source: this.getName(),
            dest: '',
            result: 0,
            data: null
        };
        return this.mOpenEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer Close aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onClose(): number {
        // console.log('Port._onClose:');
        const eventData: IEventData = {
            event: PORT_CLOSE_EVENT,
            type: '',
            source: this.getName(),
            dest: '',
            result: 0,
            data: null
        };
        return this.mCloseEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer Start aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onStart( aDest = '', aType = '' ): number {
        // console.log('Port._onStart:', aType);
        const eventData: IEventData = {
            event: PORT_START_EVENT,
            type: aType,
            source: this.getName(),
            dest: aDest,
            result: 0,
            data: null
        };
        if ( aDest ) {
            return this.mStartEvent.dispatchListener( aDest, eventData );
        }
        return this.mStartEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer Stop aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onStop( aDest = '', aType = '' ): number {
        // console.log('Port._onStop:', aDest, aType);
        const eventData: IEventData = {
            event: PORT_STOP_EVENT,
            type: aType,
            source: this.getName(),
            dest: aDest,
            result: 0,
            data: null
        };
        if ( aDest ) {
            return this.mStopEvent.dispatchListener( aDest, eventData );
        }
        return this.mStopEvent.dispatch( eventData );
    }



    /**
     * Ereignisfunktion fuer StartAudio aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */

     protected _onStartAudio( aDest = '', aType = '' ): number {
        // console.log('Port._onStartAudio:', aDest, aType);
        const eventData: IEventData = {
            event: PORT_STARTAUDIO_EVENT,
            type: aType,
            source: this.getName(),
            dest: aDest,
            result: 0,
            data: null
        };
        if ( aDest ) {
            return this.mStartAudioEvent.dispatchListener( aDest, eventData );
        }
        return this.mStartAudioEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer StopAudio aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onStopAudio( aDest = '', aType = '' ): number {
        // console.log('Port._onStopAudio:', aDest, aType);
        const eventData: IEventData = {
            event: PORT_STOPAUDIO_EVENT,
            type: aType,
            source: this.getName(),
            dest: aDest,
            result: 0,
            data: null
        };
        if ( aDest ) {
            return this.mStopAudioEvent.dispatchListener( aDest, eventData );
        }
        return this.mStopAudioEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer Result aufrufen
     *
     * @private
     * @param {*} aResult - Ergebnisdaten
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ des Ergebnisses
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onResult( aResultData: any, aDest = '', aType = '' ): number {
        // console.log('Port._onResult:', aType);
        const eventData: IEventData = {
            event: PORT_RESULT_EVENT,
            type: aType,
            source: this.getName(),
            dest: aDest,
            result: 0,
            data: aResultData
        };
        if ( aDest ) {
            return this.mResultEvent.dispatchListener( aDest, eventData );
        }
        return this.mResultEvent.dispatch( eventData );
    }


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ des Fehlers
     *
     * @return {number} errorCode(0,-1)
     */

    protected _onError( aError: any, aDest = '', aType = '' ): number {
        // console.log('Port._onError:', aType);
        if ( aDest ) {
            return this.mErrorEvent.dispatchListener( aDest, aError );
        }
        return this.mErrorEvent.dispatch( aError );
        // TODO: Fehlerbehandlung sollte erst mal kompatibel zu allen anderen sein
        /**** wird erst spaeter eingebaut
        // Fehlerevent erzeugen
        const eventData: IEventData = {
            event: PORT_ERROR_EVENT,
            type: aType,
            source: this.getName(),
            dest: '',
            result: 0,
            data: aError
        };
        return this.mErrorEvent.dispatch( eventData );
        ****/
    }


    addInitEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mInitEvent.addListener( aPluginName, aEventFunc );
    }


    addOpenEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mOpenEvent.addListener( aPluginName, aEventFunc );
    }


    addCloseEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mCloseEvent.addListener( aPluginName, aEventFunc );
    }


    addStartEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mStartEvent.addListener( aPluginName, aEventFunc );
    }


    addStopEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mStopEvent.addListener( aPluginName, aEventFunc );
    }


    addStartAudioEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mStartAudioEvent.addListener( aPluginName, aEventFunc );
    }


    addStopAudioEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mStopAudioEvent.addListener( aPluginName, aEventFunc );
    }


    addResultEvent( aPluginName: string, aEventFunc: PortEventFunc ): number {
        return this.mResultEvent.addListener( aPluginName, aEventFunc );
    }


    addErrorEvent( aPluginName: string, aEventFunc: EventFunc ): number {
        return this.mErrorEvent.addListener( aPluginName, aEventFunc );
    }


    removeInitEvent( aPluginName: string ): number {
        return this.mInitEvent.removeListener( aPluginName );
    }


    removeOpenEvent( aPluginName: string ): number {
        return this.mOpenEvent.removeListener( aPluginName );
    }


    removeCloseEvent( aPluginName: string ): number {
        return this.mCloseEvent.removeListener( aPluginName );
    }


    removeStartEvent( aPluginName: string ): number {
        return this.mStartEvent.removeListener( aPluginName );
    }


    removeStopEvent( aPluginName: string ): number {
        return this.mStopEvent.removeListener( aPluginName );
    }


    removeStartAudioEvent( aPluginName: string ): number {
        return this.mStartAudioEvent.removeListener( aPluginName );
    }


    removeStopAudioEvent( aPluginName: string ): number {
        return this.mStopAudioEvent.removeListener( aPluginName );
    }


    removeResultEvent( aPluginName: string ): number {
        return this.mResultEvent.removeListener( aPluginName );
    }


    removeErrorEvent( aPluginName: string ): number {
        return this.mErrorEvent.removeListener( aPluginName );
    }

    removeAllEvent( aPluginName: string ): number {
        this.removeInitEvent( aPluginName );
        this.removeOpenEvent( aPluginName );
        this.removeCloseEvent( aPluginName );
        this.removeStartEvent( aPluginName );
        this.removeStopEvent( aPluginName );
        this.removeStartAudioEvent( aPluginName );
        this.removeStopAudioEvent( aPluginName );
        this.removeResultEvent( aPluginName );
        this.removeErrorEvent( aPluginName );
        return 0;
    }


    // Port-Funktionen


    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {any} aConfigData - Konfigurationsdaten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: any ): number {
        return 0;
    }


    /**
     * Rueckgabe der aktuellen Port-Konfiguration
     *
     * @return {any} aktuelle Portkonfigurationsdaten
     */

    getConfig(): any {
        return {};
    }


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean {
        return this.mOpenFlag;
    }


    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */

    open( aOption?: any ): number {
        return 0;
    }


    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    close(): number {
        return 0;
    }


    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */

    getPluginName(): string {
        return this.mPluginName;
    }


    /**
     * Rueckgabe des Aktionsnames, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} ActionName oder leerer String
     */

    getActionName(): string {
        return '';
    }


    /**
     * Pruefen, ob Port eine Aufgabe ausfuehrt, zu einem bestimmten Plugin
     * und zu einer bestimmten Aufgabe.
     *
     * @param {string} aPluginName - optionaler Pluginname
     * @param {string} aAction - optionaler Aktionsname
     *
     * @return {boolean} True, wenn Port beschaeftigt ist, False sonst
     */

    isRunning( aPluginName?: string, aAction?: string ): boolean {
        return this.mRunFlag;
    }


    /**
     * Pruefen, ob eine Aktion im Port ausgefuehrt werden kann oder nicht.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @returns {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return false;
    }


    /**
     * Dient zum Setzen eines Timeouts, um Aktionen abzubrechen.
     * Bei Timeout 0 wird kein Timeout gesetzt.
     *
     * @param aTimeout - Zeit in Millisekunden bis die Aktion abgebrochen wird
     */

    setActionTimeout( aTimeout: number ): void {
        // kann von erbenden Klassen ueberschrieben werden
    }


    /**
     * Portaktion starten
     *
     * @param {string} aPluginName - Name des Aufrufers der Transaktion
     * @param {string} aAction - optional auszufuehrende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aPluginName: string, aAction?: string, aOption?: any ): number {
        return 0;
    }


    /**
     * Portaktion beenden
     *
     * @param {string} aPluginName - Name des Aufrufers der Transaktion
     * @param {string} aAction - optional zu beendende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop( aPluginName: string, aAction?: string, aOption?: any ): number {
        return 0;
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * @param {string} aPluginName - Name des Aufrufers der Transaktion
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aPluginName: string, aTestCommand: string, aTestData?: any ): any {
        return { result: 0 };
    }

}
