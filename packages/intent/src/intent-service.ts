/** @packageDocumentation
 * IntentService fuer die Integration von Listen in Angular
 *
 * API-Version: 1.3
 * Datum:       24.10.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module intent
 * @author SB
 */


// service

import { ServiceManager, Service, EventEmitter } from '@speech/service';


// intent

import { INTENT_COMPONENT_NAME, INTENT_SERVICE_NAME, INTENT_ASYNC_EVENT } from './intent-const';
import { INTENT_API_VERSION } from './intent-version';
import { IntentServiceConfig } from './intent-service-config';
import { IntentDataInterface } from './intent-data.interface';
import { IntentOptionInterface } from './intent-option.interface';
import { IntentFactory } from './intent-factory';
import { IntentInterface } from './intent.interface';
import { IntentServiceInterface } from './intent-service.interface';


/**
 * IntentService Klasse
 *
 * @export
 * @class IntentService
 */

export class IntentService extends Service implements IntentServiceInterface {

    /** definiert die Konfiguration des Service */

    private static intentServiceConfig = IntentServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Intent-Komponente

    private mIntent: IntentInterface = null;

    // Service-Events

    private mListenResultEvent = new EventEmitter<any>( INTENT_ASYNC_EVENT );
    private mIntentResultEvent = new EventEmitter<IntentDataInterface>( INTENT_ASYNC_EVENT );


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den Service, False sonst
     */

    static isConstructorInit(): boolean {
        return IntentService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        IntentService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        IntentService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den Service, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des Service aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des Service
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return ServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): IntentOptionInterface {
        return IntentService.intentServiceConfig;
    }


    /**
     * Konstruktor fuer Initialisierung des Intent-Service
     */

    constructor() {
        super( INTENT_COMPONENT_NAME, INTENT_SERVICE_NAME, INTENT_API_VERSION );
        // console.log('IntentService.constructor: initFlag = ', IntentService.isConstructorInit(), IntentService.getConfig());
        if ( IntentService.isConstructorInit()) {
            if ( this.init( IntentService.getConfig()) !== 0 ) {
                throw new Error( 'Intent nicht initialisiert' );
            }
        }
        if ( ServiceManager.insert( this ) !== 0 ) {
            console.log('IntentService: wurde nicht in ServiceManager eingetragen');
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @private
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: IntentOptionInterface ): number {
        // console.log('IntentService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // Sprache uebertragen
        if ( typeof aOption.intentLanguage === 'string' ) {
            // console.log('IntentService._setOption:', aOption.intentLanguage);
            this.language = aOption.intentLanguage;
        }
        return 0;
    }


    /**
     * Hier wird die Komponente erzeugt.
     *
     * @protected
     * @param aComponentName - Name der zu erzeugenden Komponente
     * @param aOption - optionale Parameter fuer die Initialisierung der Komponente
     *
     * @return {*} Rueckgabe der Listen-Instanz
     */

    protected _createComponent( aComponentName: string, aOption: IntentOptionInterface ): any {
        // console.log('IntentService._createComponent:', aComponentName, aOption);
        this.mIntent = IntentFactory.create( aComponentName, aOption );
        // console.log('IntentService._createComponent:', typeof this.mIntent);
        return this.mIntent;
    }


    /**
     * Initialisierung des Service
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} errorCode(0,-1)
     */

    init( aOption?: IntentOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: IntentOptionInterface ): number {
        return super.reset( aOption );
    }


    // Event-Funktionen


    /**
     * Anbindung der Events
     *
     * @protected
     * @param {string} aServiceName - Name  des Services
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _addAllEvent( aServiceName: string ): number {
        if ( super._addAllEvent( aServiceName ) !== 0 ) {
            return -1;
        }

        this.mIntent.addListenResultEvent( aServiceName, (aResult: string) => {
            // console.log('IntentService.ListenResultEvent:', aResult);
            this.mListenResultEvent.emit( aResult );
            return 0;
        });

        this.mIntent.addIntentResultEvent( aServiceName, (aIntentData: IntentDataInterface) => {
            // console.log('IntentService.IntentResultEvent:', aIntentData);
            this.mIntentResultEvent.emit( aIntentData );
            return 0;
        });

        return 0;
    }


    /**
     * Ereignis fuer Listen-Rueckgabe
     *
     * @readonly
     * @return {EventEmitter} listenResultEvent
     */

    get listenResultEvent() {
        return this.mListenResultEvent;
    }


    /**
     * Ereignis fuer Intent-Rueckgabe
     *
     * @readonly
     * @return {EventEmitter} intentResultEvent
     */

    get resultEvent() {
        return this.mIntentResultEvent;
    }


    // NLU-Funktionen


    /**
     * pruefen auf NLU
     */

    isNLU(): boolean {
        if ( !this.mIntent ) {
            return false;
        }
        return this.mIntent.isNLU();
    }

    /**
     * NLU fuer die Sprachanalyse einfuegen
     *
     * @param {string} aNLUName - Name der einzufuegenden NLU
     * @param {string} aNLUType - Typ der einzufuegenden NLU
     * @param {any} aNLUOption - Optionen fuer die einzufuegende NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    insertNLU( aNLUName: string, aNLUType: string, aNLUOption: any ): number {
        if ( !this.mIntent ) {
            this._error('insertNLU', 'keine Intent-Komponente vorhanden');
            return -1;
        }
        return this.mIntent.insertNLU( aNLUName, aNLUType, aNLUOption );
    }

    /**
     * NLU entfernen
     *
     * @param {string} aNLUName - Name der einzufuegenden NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeNLU( aNLUName: string ): number {
        if ( !this.mIntent ) {
            this._error('removeNLU', 'keine Intent-Komponente vorhanden');
            return -1;
        }
        return this.mIntent.removeNLU( aNLUName );
    }

    /**
     * NLU fuer die Sprachanalyse einstellen
     *
     * @param {string} aNLUName - einzustellende NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setNLU( aNLUName: string ): number {
        if ( !this.mIntent ) {
            this._error('setNLU', 'keine Intent-Komponente vorhanden');
            return -1;
        }
        return this.mIntent.setNLU( aNLUName );
    }


    /**
     * Rueckgabe der eingestellten NLU
     *
     * @return {string} eingestellte NLU
     */

    getNLU(): string {
        if ( !this.mIntent ) {
            this._error('getNLU', 'keine Intent-Komponente vorhanden');
            return '';
        }
        return this.mIntent.getNLU();
    }


    /**
     * Eigenschaft NLU eintragen fuer die Sprachanalyse.
     *
     * @param {string} aNLUName - Name der NLU
     */

    set nlu( aNLUName: string ) {
        this.setNLU( aNLUName );
    }


    /**
     * Eigenschaft NLU zurueckgeben.
     *
     * @return {string} Name der NLU
     */

    get nlu(): string {
        return this.getNLU();
    }


    /**
     * Liste aller verfuegbaren NLUs zurueckgeben
     *
     * @return {Array<string>} Liste der vorhandenen NLUs zurueckgeben oder leere Liste
     */

    getNLUList(): Array<string> {
        if ( !this.mIntent ) {
            this._error('getNLUList', 'keine Intent-Komponente vorhanden');
            return [];
        }
        return this.mIntent.getNLUList();
    }


    /**
     * Eigenschaft alle verfuegbaren NLU zurueckgeben
     *
     * @return {Array<string>} Liste aller NLU zurueckgeben
     */


    get nlus(): Array<string> {
        return this.getNLUList();
    }


    // Language-Funktionen


    /**
     * Sprache fuer die Spracheingabe einstellen
     *
     * @param {string} aLanguage - einzustellende Sprache als Kurzname ('de' oder 'en')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        if ( !this.mIntent ) {
            this._error('setLanguage', 'keine Intent-Komponente vorhanden');
            return -1;
        }
        return this.mIntent.setLanguage( aLanguage );
    }


    /**
     * Rueckgabe der eingestellten Sprache
     *
     * @return {string} eingestellte Sprache als Kurzstring ('de' oder 'en')
     */

    getLanguage(): string {
        if ( !this.mIntent ) {
            this._error('getLanguage', 'keine Intent-Komponente vorhanden');
            return '';
        }
        return this.mIntent.getLanguage();
    }


    /**
     * Eigenschaft Language eintragen fuer die Sprachausgabe.
     *
     * @param {string} aLanguageName - Name der Sprache in Kurzform (de, en)
     */

    set language( aLanguageName: string ) {
        this.setLanguage( aLanguageName );
    }


    /**
     * Eigenschaft Language zurueckgeben.
     *
     * @return {string} aLanguageName - Name der Sprache in Kurzform (de, en)
     */

    get language(): string {
        return this.getLanguage();
    }


    /**
     * Liste aller verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en) oder leere Liste
     */

    getLanguageList(): Array<string> {
        if ( !this.mIntent ) {
            this._error('getLanguageList', 'keine Intent-Komponente vorhanden');
            return [];
        }
        return this.mIntent.getLanguageList();
    }


    /**
     * Eigenschaft alle verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en)
     */


    get languages(): Array<string> {
        return this.getLanguageList();
    }


    /**
     * Eintragen des zu analysierenden Textes
     *
     * @param {string} aText - Text fuer die Sprachanalyse
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setText( aText: string ): number {
        if ( !this.mIntent ) {
            this._error('setText', 'keine Intent-Komponente vorhanden');
            return -1;
        }
        return this.mIntent.setText( aText );
    }


    /**
     * Rueckgabe des aktuell eingestellten Analysetextes
     *
     * @return {string} Text
     */

    getText(): string {
        if ( !this.mIntent ) {
            this._error('getText', 'keine Intent-Komponente vorhanden');
            return '';
        }
        return this.mIntent.getText();
    }


    /**
     * Eigenschaft Text eintragen fuer die Sprachanalyse.
     *
     * @param {string} aText - Text fuer die Sprachanalyse
     */

    set text( aText: string ) {
        this.setText( aText );
    }


    /**
     * Eigenschaft Text zurueckgeben.
     *
     * @return {string} aText - Text fuer die Sprachanalyse
     */

    get text(): string {
        return this.getText();
    }

}
