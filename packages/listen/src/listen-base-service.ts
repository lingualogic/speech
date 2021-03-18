/**
 * ListenBaseService fuer die Integration von Listen in alle UI-Frameworks
 *
 * API-Version: 1.4
 * Datum:       19.01.2021
 *
 * Letzte Aenderung: 19.01.2021
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// service

import { ServiceManager, Service, EventEmitter } from '@speech/service';


// listen

import { LISTEN_COMPONENT_NAME, LISTEN_SERVICE_NAME } from './listen-const';
import { LISTEN_API_VERSION } from './listen-version';
import { ListenInterface } from './listen.interface';
import { ListenOptionInterface } from './listen-option.interface';
import { ListenServiceConfig } from './listen-service-config';
import { ListenServiceInterface } from './listen-service.interface';


// Konstanten


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

const LISTEN_ASYNC_EVENT = false;


/**
 * ListenBaseService Klasse
 *
 * @export
 * @class ListenBaseService
 */

export class ListenBaseService extends Service implements ListenServiceInterface {

    /** definiert die Konfiguration des Service */

    private static listenServiceConfig = ListenServiceConfig;

    /** legt fest, ob die Initialisierung im Konstruktor bereits erfolgt */

    private static constructorInitFlag = true;

    // Listen-Komponente

    protected mListen: ListenInterface = null;

    // Service-Events

    private mListenResultEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenInterimResultEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenNoMatchEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenRecognitionStartEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenRecognitionStopEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenAudioStartEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenAudioStopEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenSoundStartEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenSoundStopEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenSpeechStartEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );
    private mListenSpeechStopEvent = new EventEmitter<any>( LISTEN_ASYNC_EVENT );


    /**
     * pruefen auf ConstructorInitFlag fuer Festlegung, ob der Konstructor init aufruft.
     *
     * @static
     * @return {boolean} ConstructorInitFlag - True, Konstructor initialisiert den Service, False sonst
     */

    static isConstructorInit(): boolean {
        return ListenBaseService.constructorInitFlag;
    }


    /**
     * setzen des ConstructorInitFlag auf true, um init im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOn(): void {
        ListenBaseService.constructorInitFlag = true;
    }


    /**
     * loescht das ConstructorInitFlag, um init nicht im Konstruktor aufzurufen.
     *
     * @static
     */

    static setConstructorInitOff(): void {
        ListenBaseService.constructorInitFlag = false;
    }


    /**
     * Rueckgabe der Konfiguration fuer den Service, um die Konfiguration zu veraendern.
     * Muss vor der Erzeugung des Service aufgerufen werden. Wird nur im Zusammenhang mit
     * dem gesetzten ConstructorInitFlag verwendet, welches die Initialisierung des Service
     * im Konstruktor vornimmt. Bei manuellem Aufruf von Init kann diese Funktion zur
     * Uebergabe der Optionen verwendet werden.
     *
     * @static
     * @return  ListenBaseServiceOptions - dient zur Einstellung der otionalen Parameter
     */

    static getConfig(): ListenOptionInterface {
        return ListenBaseService.listenServiceConfig;
    }



    /**
     * Konstruktor fuer Initialisierung des Listen-Service
     */

    constructor() {
        super( LISTEN_COMPONENT_NAME, LISTEN_SERVICE_NAME, LISTEN_API_VERSION );
        // console.log('ListenBaseService.constructor: initFlag = ', ListenBaseService.isConstructorInit(), ListenBaseService.getConfig());
        if ( ListenBaseService.isConstructorInit()) {
            if ( this.init( ListenBaseService.getConfig()) !== 0 ) {
                throw new Error( 'Listen nicht initialisiert' );
            }
        }
        if ( ServiceManager.insert( this ) !== 0 ) {
            console.log('ListenBaseService: wurde nicht in ServiceManager eingetragen');
        }
    }


    // Service-Funktionen


    /**
     * Optionen eintragen
     *
     * @private
     * @param aOption - optionale Parameter
     */

    protected _setOption( aOption: ListenOptionInterface ): number {
        // console.log('ListenBaseService._setOption:', aOption);
        if ( super._setOption( aOption ) !== 0 ) {
            return -1;
        }
        // Sprache uebertragen
        if ( typeof aOption.listenLanguage === 'string' ) {
            // console.log('ListenBaseService._setOption:', aOption.listenLanguage);
            this.language = aOption.listenLanguage;
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

    protected _createComponent( aComponentName: string, aOption: ListenOptionInterface ): any {
        return null;
    }


    /**
     * Initialisierung des Service
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} errorCode(0,-1)
     */

    init( aOption?: ListenOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Ruecksetzen des Services, alle Werte werden auf ihre Defaultwerte gesetzt
     *
     * @param aOption - optionale Parameter zur Konfiguration des Service
     *
     * @return {number} Fehlercode 0 oder -1
     */

    reset( aOption?: ListenOptionInterface ): number {
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

        this.mListen.addListenResultEvent( aServiceName, (aResult: string) => {
            this.mListenResultEvent.emit(aResult);
            return 0;
        });

        this.mListen.addListenInterimResultEvent( aServiceName, (aResult: string) => {
            this.mListenInterimResultEvent.emit(aResult);
            return 0;
        });

        this.mListen.addListenNoMatchEvent( aServiceName, () => {
            this.mListenNoMatchEvent.emit();
            return 0;
        });

        this.mListen.addListenRecognitionStartEvent( aServiceName, () => {
            this.mListenRecognitionStartEvent.emit();
            return 0;
        });

        this.mListen.addListenRecognitionStopEvent( aServiceName, () => {
            this.mListenRecognitionStopEvent.emit();
            return 0;
        });

        this.mListen.addListenAudioStartEvent( aServiceName, () => {
            this.mListenAudioStartEvent.emit();
            return 0;
        });

        this.mListen.addListenAudioStopEvent( aServiceName, () => {
            this.mListenAudioStopEvent.emit();
            return 0;
        });

        this.mListen.addListenSoundStartEvent( aServiceName, () => {
            this.mListenSoundStartEvent.emit();
            return 0;
        });

        this.mListen.addListenSoundStopEvent( aServiceName, () => {
            this.mListenSoundStopEvent.emit();
            return 0;
        });

        this.mListen.addListenSpeechStartEvent( aServiceName, () => {
            this.mListenSpeechStartEvent.emit();
            return 0;
        });

        this.mListen.addListenSpeechStopEvent( aServiceName, () => {
            this.mListenSpeechStopEvent.emit();
            return 0;
        });

        return 0;
    }


    /**
     * Ereignis fuer Sprachausgabe erkannten Text
     *
     * @readonly
     * @return {EventEmitter} listenResultEvent
     */

    get resultEvent() {
        return this.mListenResultEvent;
    }


    /**
     * Ereignis fuer Sprachausgabe erkannten Text
     *
     * @readonly
     * @return {EventEmitter} listenInterimResultEvent
     */

    get interimResultEvent() {
        return this.mListenInterimResultEvent;
    }


    /**
     * Ereignis fuer Sprachausgabe kein erkannter Text
     *
     * @readonly
     * @return {EventEmitter} listenInterimResultEvent
     */

    get noMatchEvent() {
        return this.mListenNoMatchEvent;
    }


    /**
     * Ereignis fuer Start Recognition
     *
     * @readonly
     * @return {EventEmitter} listenRecognitionStartEvent
     */

    get recognitionStartEvent() {
        return this.mListenRecognitionStartEvent;
    }


    /**
     * Ereignis fuer Stop Recognition
     *
     * @readonly
     * @return {EventEmitter} listenRecognitionStopEvent
     */

    get recognitionStopEvent() {
        return this.mListenRecognitionStopEvent;
    }


    /**
     * Ereignis fuer Start Audio
     *
     * @readonly
     * @return {EventEmitter} listenAudioStartEvent
     */

    get audioStartEvent() {
        return this.mListenAudioStartEvent;
    }


    /**
     * Ereignis fuer Stop Audio
     *
     * @readonly
     * @return {EventEmitter} listenAudioStopEvent
     */

    get audioStopEvent() {
        return this.mListenAudioStopEvent;
    }


    /**
     * Ereignis fuer Start Sound
     *
     * @readonly
     * @return {EventEmitter} listenSoundStartEvent
     */

    get soundStartEvent() {
        return this.mListenSoundStartEvent;
    }


    /**
     * Ereignis fuer Stop Sound
     *
     * @readonly
     * @return {EventEmitter} listenSoundStopEvent
     */

    get soundStopEvent() {
        return this.mListenSoundStopEvent;
    }


    /**
     * Ereignis fuer Start Speech
     *
     * @readonly
     * @return {EventEmitter} listenSpeechStartEvent
     */

    get speechStartEvent() {
        return this.mListenSpeechStartEvent;
    }


    /**
     * Ereignis fuer Stop Speech
     *
     * @readonly
     * @return {EventEmitter} listenSpeechStopEvent
     */

    get speechStopEvent() {
        return this.mListenSpeechStopEvent;
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     */

    isASR(): boolean {
        // console.log('ListenBaseService.setASR:', aASRName);
        if ( !this.mListen ) {
            return false;
        }
        return this.mListen.isASR();
    }


    /**
     * ASR fuer die Spracheingabe einstellen
     *
     * @param {string} aASRName - einzustellende TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        // console.log('ListenBaseService.setASR:', aASRName);
        if ( !this.mListen ) {
            this._error('setASR', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.setASR( aASRName );
    }


    /**
     * Rueckgabe der eingestellten ASR
     *
     * @return {string} eingestellte ASR
     */

    getASR(): string {
        if ( !this.mListen ) {
            this._error('getASR', 'keine Listen-Komponente vorhanden');
            return '';
        }
        return this.mListen.getASR();
    }


    /**
     * Eigenschaft ASR eintragen fuer die Spracheingabe.
     *
     * @param {string} aASRName - Name der ASR
     */

    set asr( aASRName: string ) {
        this.setASR( aASRName );
    }


    /**
     * Eigenschaft ASR zurueckgeben.
     *
     * @return {string} Name der ASR
     */

    get asr(): string {
        return this.getASR();
    }


    /**
     * Liste aller verfuegbaren ASRs zurueckgeben
     *
     * @return {Array<string>} Liste der vorhandenen ASRs zurueckgeben oder leere Liste
     */

    getASRList(): Array<string> {
        if ( !this.mListen ) {
            this._error('getASRList', 'keine Listen-Komponente vorhanden');
            return [];
        }
        return this.mListen.getASRList();
    }


    /**
     * Eigenschaft alle verfuegbaren ASR zurueckgeben
     *
     * @return {Array<string>} Liste aller ASR zurueckgeben
     */


    get asrs(): Array<string> {
        return this.getASRList();
    }


    // Timeout-Funktionen


    /**
     * Timeout fuer die Spracheingabe einstellen
     *
     * @param {number} aTimeout - einzustellender Timeout in Millisekunden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTimeout( aTimeout: number ): number {
        // console.log('ListenBaseService.setTimeout:', aTimeout);
        if ( !this.mListen ) {
            this._error('setTimeout', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.setTimeout( aTimeout );
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
        if ( !this.mListen ) {
            this._error('setLanguage', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.setLanguage( aLanguage );
    }


    /**
     * Rueckgabe der eingestellten Sprache
     *
     * @return {string} eingestellte Sprache als Kurzstring ('de' oder 'en')
     */

    getLanguage(): string {
        if ( !this.mListen ) {
            this._error('getLanguage', 'keine Listen-Komponente vorhanden');
            return '';
        }
        return this.mListen.getLanguage();
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
        if ( !this.mListen ) {
            this._error('getLanguageList', 'keine Listen-Komponente vorhanden');
            return [];
        }
        return this.mListen.getLanguageList();
    }


    /**
     * Eigenschaft alle verfuegbaren Sprachen (de, en) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en)
     */


    get languages(): Array<string> {
        return this.getLanguageList();
    }


    // Mode-Funktionen


    /**
     * Eingabemodus fuer die Spracheingabe pruefen
     *
     * @param {string} aMode - einzustellender Modus ('Command' oder 'Dictate')
     *
     * @return {number} True, wenn uebergebener Mode gueltig ist, sonst False
     */

    isMode( aMode: string ): boolean {
        if ( !this.mListen ) {
            this._error('isMode', 'keine Listen-Komponente vorhanden');
            return false;
        }
        return this.mListen.isMode( aMode );
    }


    /**
     * pruefen ob Eingabemodus Command fuer die Spracheingabe eingestellt ist
     *
     * @return {number} True, wenn Command Modus eingestellt ist, sonst False
     */

    isCommandMode(): boolean {
        if ( !this.mListen ) {
            this._error('isMode', 'keine Listen-Komponente vorhanden');
            return false;
        }
        return this.mListen.isCommandMode();
    }


    /**
     * pruefen ob Eingabemodus Dictate fuer die Spracheingabe eingestellt ist
     *
     * @return {number} True, wenn Dictate Modus eingestellt ist, sonst False
     */

    isDictateMode(): boolean {
        if ( !this.mListen ) {
            this._error('isMode', 'keine Listen-Komponente vorhanden');
            return false;
        }
        return this.mListen.isDictateMode();
    }


    /**
     * Eingabemodus fuer die Spracheingabe einstellen
     *
     * @param {string} aMode - einzustellender Modus ('Command' oder 'Dictate')
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number {
        if ( !this.mListen ) {
            this._error('setMode', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.setMode( aMode );
    }


    /**
     * Rueckgabe des eingestellten Eingabemodus
     *
     * @return {string} eingestellter Modus ('Command' oder 'Dictate')
     */

    getMode(): string {
        if ( !this.mListen ) {
            this._error('getMode', 'keine Listen-Komponente vorhanden');
            return '';
        }
        return this.mListen.getMode();
    }


    /**
     * Eigenschaft Modus eintragen fuer die Spracheingabe.
     *
     * @param {string} aModeName - Name des Eingabemodus (Command, Dictate)
     */

    set mode( aModeName: string ) {
        this.setMode( aModeName );
    }


    /**
     * Eigenschaft Modus zurueckgeben.
     *
     * @return {string} aModeName - Name des Eingabemodus (Command, Dictate)
     */

    get mode(): string {
        return this.getMode();
    }


    /**
     * Liste aller verfuegbaren Eingabemodi (Command, Dictate) zurueckgeben
     *
     * @return {Array<string>} Liste der Eingabemodi zurueckgeben (Command, Dictate) oder leere Liste
     */

    getModeList(): Array<string> {
        if ( !this.mListen ) {
            this._error('getModeList', 'keine Listen-Komponente vorhanden');
            return [];
        }
        return this.mListen.getModeList();
    }


    /**
     * Eigenschaft alle verfuegbaren Modi (Command, Dictate) zurueckgeben
     *
     * @return {Array<string>} Liste Kurzform der Sprache zurueckgeben (de, en)
     */


    get modes(): Array<string> {
        return this.getModeList();
    }


    // Listen-Funktionen


    /**
     * Spracheingabe abbrechen
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    abort(): number {
        if ( !this.mListen ) {
            this._error('abort', 'keine Listen-Komponente vorhanden');
            return -1;
        }
        return this.mListen.abort();
    }

}
