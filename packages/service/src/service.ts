/** @packageDocumentation
 * Service als abstrakte Basisklasse aller Services zur Anbindung an UI-Frameworks
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module service
 * @author SB
 */


// base

import { IBase, IBaseOption } from '@lingualogic-speech/base';


// service

import { EventEmitter } from './event-emitter';

import { SERVICE_API_VERSION, SERVICE_VERSION_STRING } from './service-version';
import { SERVICE_ASYNC_EVENT, SERVICE_ERROR_OUTPUT } from './service-const';
import { IService } from './service.interface';


/** @export
 * Service als abstrakte Klasse fuer alle Services.
 */

export class Service implements IService {

    // innere Komponente

    private mComponent: IBase = null;
    protected mComponentName = '';

    // Service Attribute

    protected mServiceName = 'Service';
    protected mServiceVersion = SERVICE_VERSION_STRING;
    protected mServiceApiVersion = SERVICE_API_VERSION;

    // Service-Events

    protected mInitEvent = new EventEmitter<any>( SERVICE_ASYNC_EVENT );
    protected mStartEvent = new EventEmitter<any>( SERVICE_ASYNC_EVENT );
    protected mStopEvent = new EventEmitter<any>( SERVICE_ASYNC_EVENT );
    protected mErrorEvent = new EventEmitter<any>( SERVICE_ASYNC_EVENT );

    /**
     * Fehlerausgabe fuer Konsole festlegen
     */

    protected mErrorOutputFlag = SERVICE_ERROR_OUTPUT;


    /**
     * Konstruktor
     */

    constructor( aComponentName: string, aServiceName: string, aServiceVersion: string ) {
        // console.log('Service.constructor');
        this.mComponentName = aComponentName;
        this.mServiceName = aServiceName;
        this.mServiceVersion = aServiceVersion;
    }


    getComponentName(): string {
        return this.mComponentName;
    }

    getName(): string {
        return this.mServiceName;
    }

    getVersion(): string {
        return this.mServiceVersion;
    }

    getApiVersion(): string {
        return this.mServiceApiVersion;
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @param aOption - optionale Parameter
     *
     * @return Fehlercode 0 oder -1
     */

    protected _setOption( aOption: IBaseOption ): number {
        // console.log('Service._setOption:', aOption);
        if ( !aOption ) {
            return -1;
        }
        // ActiveFlag uebertragen
        if ( typeof aOption.activeFlag === 'boolean' ) {
            this.active = aOption.activeFlag;
        }
        // Fehlerausgabeflag uebergeben
        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            this.errorOutput = aOption.errorOutputFlag;
        }
        return 0;
    }


    /**
     * Hier wird die Komponente erzeugt.
     *
     * @param aComponentName - Name der zu erzeugenden Komponente
     * @param aOption - optionale Parameter fuer die Initialisierung der Komponente
     *
     * @return {*} Rueckgabe der Komponenteninstanz
     */

    protected _createComponent( aComponentName: string, aOption: IBaseOption ): any {
        // muss von erbenden Klassen ueberschrieben werden
        return null;
    }


    /**
     * Initialisierung des Service
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     * @return  Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {
        // console.log('Service.init:', aOption, this.mComponent !== null);
        // pruefen auf bereits initialisiert
        if ( this.mComponent ) {
            this._setOption( aOption );
            return 0;
        }
        // Komponente erzeugen
        this.mComponent = this._createComponent( this.getComponentName(), aOption ) as IBase;
        if ( !this.mComponent ) {
            this._error('init', 'Komponente nicht erzeugt');
            return -1;
        }
        // Optionen eintragen
        this._setOption( aOption );
        if ( this.mErrorOutputFlag ) {
            console.log( this.getName() + ' Version:', this.getVersion());
        }
        return this._addAllEvent( this.getName());
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return Fehlercode 0 oder -1
     */

    reset( aOption?: any ): number {
        if ( !this.mComponent ) {
            this._error('reset', 'keine Komponente vorhanden');
            return -1;
        }
        // Optionen uebertragen (ActionService->Action)
        const result = this.mComponent.reset( aOption );
        this._setOption( aOption );
        return result;
    }


    /**
     * pruefen auf initialisierten Service
     *
     * @return {boolean} Rueckgabe, ob Service initialisiert ist
     */

    isInit(): boolean {
        if ( this.mComponent ) {
            return true;
        }
        return false;
    }


    /**
     * pruefen auf aktive Komponente
     *
     * @return {boolean} aktivFlag
     */

    isActive(): boolean {
        if ( this.mComponent ) {
            return this.mComponent.isActive();
        }
        return false;
    }


    /**
     * Komponente aktivieren
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        if ( this.mComponent ) {
            return this.mComponent.setActiveOn();
        }
        return -1;
    }


    /**
     * Komponente daaktivieren
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOff(): number {
        if ( this.mComponent ) {
            return this.mComponent.setActiveOff();
        }
        return -1;
    }


    /**
     * Eigenschaft aktive Komponente setzen
     *
     * @param {boolean} aActiveFlag - True, wenn aktive, False sonst
     */

    set active( aActiveFlag: boolean ) {
        if ( aActiveFlag ) {
            this.setActiveOn();
        } else {
            this.setActiveOff();
        }
    }


    /**
     * Eigenschaft aktive Komponente zurueckgeben
     *
     * @readonly
     * @return {boolean} aActiveFlag - True, wenn aktive, False sonst
     */

    get active() {
        return this.isActive();
    }


    // Fehler-Funktionen


    /**
     * pruefen auf Konsolen-Ausgabe von Fehlermeldungen
     */

    isErrorOutput(): boolean {
        if ( this.mComponent ) {
            return this.mComponent.isErrorOutput();
        }
        return this.mErrorOutputFlag;
    }


    /**
     * Einschalten der Konsolen-Fehlerausgabe
     */

    setErrorOutputOn(): void {
        this.mErrorOutputFlag = true;
        if ( this.mComponent ) {
            this.mComponent.setErrorOutputOn();
        }
    }


    /**
     * Ausschalten der Konsolen-Fehlerausgabe
     */

    setErrorOutputOff(): void {
        this.mErrorOutputFlag = false;
        if ( this.mComponent ) {
            this.mComponent.setErrorOutputOff();
        }
    }


    /**
     * Eigenschaft fuer Fehlerausgabe auf der Konsole setzen
     *
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe erfolgen soll, False sonst
     */

    set errorOutput( aErrorOutputFlag: boolean ) {
        if ( aErrorOutputFlag ) {
            this.setErrorOutputOn();
        } else {
            this.setErrorOutputOff();
        }
    }


    /**
     * Eigenschaft fuer Konsolenausgabe zurueckgeben
     *
     * @readonly
     * @return {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe erfolgen soll, False sonst
     */

    get errorOutput() {
        return this.isErrorOutput();
    }


    /**
     * Ausgabe eines Fehlers
     *
     * @param {string} aFuncName - Name der Funktion, wo der Fehler auftrat
     * @param {string} aErrorText - Fehlertext
     */

    protected _error( aFuncName: string, aErrorText: string ): void {
        if ( this.mErrorOutputFlag ) {
            console.log('===> ERROR ' + this.getName() + '.' + aFuncName + ':', aErrorText);
        }
        this.mErrorEvent.emit(new Error( this.getName() + '.' + aFuncName + ': ' + aErrorText ));
    }


    /**
     * Ausgabe einer Exception
     *
     * @param {string} aFuncName - Name der Funktion, in der die Exception auftrat
     * @param {Exception} aException - Exception-Objekt
     */

    protected _exception( aFuncName: string, aException: any ): void {
        if ( this.mErrorOutputFlag ) {
            console.log('===> EXCEPTION ' + this.getName() + '.' + aFuncName + ':', aException.message);
        }
        this.mErrorEvent.emit(new Error( 'EXCEPTION ' + this.getName() + '.' + aFuncName + ': ' + aException.message ));
    }


    // Event-Funktionen


    /**
     * Anbindung der Events
     *
     * @param {string} aServiceName - Name des Services
     *
     * @return {number} errorCode(0,-1)
     */

    protected _addAllEvent( aServiceName: string ): number {
        if ( !this.mComponent ) {
            this._error('_addAllEvent', 'keine Komponente vorhanden');
            return -1;
        }

        // alle alten Events loeschen

        this.mComponent.removeAllEvent( aServiceName );

        // neue Events eintragen

        this.mComponent.addInitEvent( aServiceName, () => {
            this.mInitEvent.emit();
            return 0;
        });

        this.mComponent.addStartEvent( aServiceName, () => {
            this.mStartEvent.emit();
            return 0;
        });

        this.mComponent.addStopEvent( aServiceName, () => {
            this.mStopEvent.emit();
            return 0;
        });

        this.mComponent.addErrorEvent( aServiceName, ( aError: any) => {
            this.mErrorEvent.emit( aError );
            return 0;
        });
        return 0;
    }


    // Rueckgabe der globalen Events


    /**
     * Ereignis fuer Init
     *
     * @readonly
     * @return initEvent
     */

    get initEvent() {
        return this.mInitEvent;
    }


    /**
     * Ereignis fuer Aktion gestartet
     *
     * @readonly
     * @return actionStartEvent
     */

    get startEvent() {
        return this.mStartEvent;
    }


    /**
     * Ereignis fuer Aktion gestoppt
     *
     * @readonly
     * @return actionStopEvent
     */

    get stopEvent() {
        return this.mStopEvent;
    }


    /**
     * Ereignis fuer Fehler aufgetreten
     *
     * @readonly
     * @return errorEvent
     */

    get errorEvent() {
        return this.mErrorEvent;
    }


    // Service-Funktionen


    /**
     * pruefen auf laufende Aktion
     *
     * @return {boolean} runningFlag
     */

    isRunning(): boolean {
        if ( !this.mComponent ) {
            return false;
        }
        return this.mComponent.isRunning();
    }


    /**
     * Aktion starten. Vorher muessen die Aktionsdaten eingetragen sein.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start(): number {
        if ( !this.mComponent ) {
            this._error( 'start', 'keine Komponente vorhanden' );
            return -1;
        }
        return this.mComponent.start();
    }


    /**
     * Aktion stoppen.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop(): number {
        if ( !this.mComponent ) {
            this._error( 'stop', 'keine Komponente vorhanden' );
            return -1;
        }
        return this.mComponent.stop();
    }


    // Test-Funktionen


    /**
     * Testfunktionen aufrufen
     * @param aTestCommand - Name des Testbefehls
     * @param aTestData - optionale Daten fuer den Test
     *
     * @return {*} Rueckgabe der Testergebnisse { result: 0 }
     */

    test( aTestCommand: string, aTestData?: any): any {
        if ( !this.mComponent ) {
            this._error( 'test', 'keine Komponente vorhanden' );
            return { result: -1 };
        }
        return this.mComponent.test( aTestCommand, aTestData );
    }

}
