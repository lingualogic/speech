/** @packageDocumentation
 * Listen API fuer Listen-Cordova Komponente (Wrapper)
 *
 * Letzte Aenderung: 23.01.2021
 * Status: rot
 *
 * @module listen
 * @author SB
 */


// global 

import {
    SPEECH_LISTENAUDIOSTART_EVENT,
    SPEECH_LISTENAUDIOSTOP_EVENT,
    SPEECH_LISTENSPEECHSTART_EVENT,
    SPEECH_LISTENSPEECHSTOP_EVENT,
    SPEECH_LISTENRESULT_EVENT,
    SPEECH_LISTENINTERIMRESULT_EVENT,
    SPEECH_LISTENNOMATCH_EVENT,
    EventFunctionList, 
    EventFunc
} from '@speech/core';


// base

import { BaseMobile } from '@speech/base';


// listen

import { OnListenResultFunc, OnListenNoMatchFunc, OnListenStartFunc, OnListenStopFunc } from './listen-function.type';
import { ListenOptionInterface } from './listen-option.interface';
import { ListenInterface } from './listen.interface';


/** @export
 * Listen Klasse als API-Wrapper fuer die ListenComponent
 */

export class ListenMobile extends BaseMobile implements ListenInterface {

    // Events

    private mListenAudioStartEvent = new EventFunctionList( SPEECH_LISTENAUDIOSTART_EVENT );
    private mListenAudioStopEvent = new EventFunctionList( SPEECH_LISTENAUDIOSTOP_EVENT );
    private mListenSpeechStartEvent = new EventFunctionList( SPEECH_LISTENSPEECHSTART_EVENT );
    private mListenSpeechStopEvent = new EventFunctionList( SPEECH_LISTENSPEECHSTOP_EVENT );
    private mListenResultEvent = new EventFunctionList( SPEECH_LISTENRESULT_EVENT );
    private mListenInterimResultEvent = new EventFunctionList( SPEECH_LISTENINTERIMRESULT_EVENT );
    private mListenNoMatchEvent = new EventFunctionList( SPEECH_LISTENNOMATCH_EVENT );


    // innere Attribute

    private mASR = '';
    private mASRList = new Array<string>(0);
    private mLanguage = '';
    private mLanguageList = new Array<string>(0);

    private mInitEventFlag = false;
    // TODO: Magic Number in Konstante umwandeln
    private mInitEventCount = 4;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Listen
     */

    constructor( aOption?: ListenOptionInterface ) {
        super( 'Listen', aOption );
    }


    private _initEvent() {
        if ( this.mInitEventFlag ) {
            this.mInitEventCount--;
            if ( this.mInitEventCount === 0 ) {
                this.mInitEventFlag = false;
                this._onInit();
            }
        }
    }


    /**
     * Initialisierung von Base
     *
     * @private
     * @param {ListenOptionInterface} aOption - optionale Parameter zur Konfiguration
     *
     * @return {number} errorCode(0,-1)
     */

    protected _init( aOption?: ListenOptionInterface ): number {
        console.log('Listen.init:', aOption);

        // pruefen auf Fehlerausgabe

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutputFlag( aOption.errorOutputFlag );
        }

        // pruefen auf cordova

        if ( !(window as any).cordova ) {
            console.log('Listen: kein Cordova vorhanden');
            return -1;
        }

        // pruefen auf ListenkPlugin von Cordova

        if ( !(window as any).ListenPlugin ) {
            console.log('Listen: kein ListenPlugin von Cordova vorhanden');
            return -1;
        } 

        console.log('ListenPlugin-Objekt:', (window as any).ListenPlugin);
        this.mPlugin = (window as any).ListenPlugin;

        // Listen-Komponente initialisieren

        // alle Events eintragen

        this.mPlugin.onInit = ( aResult: any ) => {
            // console.log('===> Event Listen.onInit ', aResult);
            if ( aResult == 0 ) {
                this.mInitEventFlag = true;
                this.mPlugin.getASRList();
                this.mPlugin.getASR();
                this.mPlugin.getLanguageList();
                this.mPlugin.getLanguage();
                // TODO: darf erst aufgerufen werden, wenn alle Daten-Events empfangen wurden
                // this._onInit();
            } else {
                this._onError( new Error('faild init'));
            }
        }

        this.mPlugin.onStart = ( aResult: any ) => {
            // console.log('===> Event Listen.onStart ', aResult);
            this.mRunningFlag = true;
            this._onStart();
        }

        this.mPlugin.onStop = () => {
            // console.log('===> Event Listen.onStop');
            this.mRunningFlag = false;
            this._onStop();
        }

        this.mPlugin.onAudioStart = () => {
            // console.log('===> Event Listen.onAudioStart');
            this._onListenAudioStart();
        }

        this.mPlugin.onAudioStop = () => {
            // console.log('===> Event Listen.onAudioStop');
            this._onListenAudioStop();
        }

        this.mPlugin.onSpeechStart = () => {
            // console.log('===> Event Listen.onSpeechStart');
            this._onListenSpeechStart();
        }

        this.mPlugin.onSpeechStop = () => {
            // console.log('===> Event Listen.onSpeechStop');
            this._onListenSpeechStop();
        }

        this.mPlugin.onResult = ( aResult: any ) => {
            // console.log('===> Event Listen.onResult ', aResult);
            this._onListenResult( aResult );
        }

        this.mPlugin.onInterimResult = ( aResult: any ) => {
            // console.log('===> Event Listen.onInterimResult ', aResult);
            this._onListenInterimResult( aResult );
        }

        this.mPlugin.onNoMatch = () => {
            // console.log('===> Event Listen.onNoMatch');
            this._onListenNoMatch();
        }

        this.mPlugin.onASRChanged = ( aResult: any ) => {
            // console.log('===> Event Listen.onASRChanged ', aResult);
            this.mASR = aResult;
            this._initEvent();
        }

        this.mPlugin.onASRList = ( aResult: any ) => {
            // console.log('===> Event Listen.onASRList ', aResult);
            this.mASRList = aResult;
            this._initEvent();
        }

        this.mPlugin.onLanguageChanged = ( aResult: any ) => {
            // console.log('===> Event Listen.onLanguageChanged ', aResult);
            this.mLanguage = aResult;
            this._initEvent();
        }

        this.mPlugin.onLanguageList = ( aResult: any ) => {
            // console.log('===> Event Listen.onLanguageList ', aResult);
            this.mLanguageList = aResult;
            this._initEvent();
        }

        this.mPlugin.onError = ( aError: any ) => {
            console.log('===> Event Listen.onError ', aError);
            this.mRunningFlag = false;
            this._onError( aError );
        }

        console.log('ListenPlugin:', this.mPlugin);
        this.mPlugin.init();

        // console.log('Listen-Komponente initialisiert ');
        return 0;
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Audio Start Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenAudioStart(): number {
        return this.mListenAudioStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Audio Stop Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenAudioStop(): number {
        return this.mListenAudioStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Speech Start Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenSpeechStart(): number {
        return this.mListenSpeechStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Speech Stop Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenSpeechStop(): number {
        return this.mListenSpeechStopEvent.dispatch();
    }

    
    /**
     * Ereignisfunktion fuer Sprachausgabe Ergebnis
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenResult( aResult: any ): number {
        return this.mListenResultEvent.dispatch( aResult );
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe Zwischenergebnisse
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenInterimResult( aResult: any ): number {
        return this.mListenInterimResultEvent.dispatch( aResult );
    }


    /**
     * Ereignisfunktion fuer No Match Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    private _onListenNoMatch(): number {
        return this.mListenNoMatchEvent.dispatch();
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

            case SPEECH_LISTENAUDIOSTART_EVENT:
                // console.log('Component.addEventListener: audio start event');
                result = this.mListenAudioStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENAUDIOSTOP_EVENT:
                // console.log('Component.addEventListener: audio stop event');
                result = this.mListenAudioStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENSPEECHSTART_EVENT:
                // console.log('Component.addEventListener: speech start event');
                result = this.mListenSpeechStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENSPEECHSTOP_EVENT:
                // console.log('Component.addEventListener: speech stop event');
                result = this.mListenSpeechStopEvent.addListener( aPluginName, aEventFunc );
                break;
                    
            case SPEECH_LISTENRESULT_EVENT:
                // console.log('Component.addEventListener: result event');
                result = this.mListenResultEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENINTERIMRESULT_EVENT:
                // console.log('Component.addEventListener: interim result event');
                result = this.mListenResultEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENNOMATCH_EVENT:
                // console.log('Component.addEventListener: no match event');
                result = this.mListenNoMatchEvent.addListener( aPluginName, aEventFunc );
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

            case SPEECH_LISTENAUDIOSTART_EVENT:
                result = this.mListenAudioStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENAUDIOSTOP_EVENT:
                result = this.mListenAudioStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENSPEECHSTART_EVENT:
                result = this.mListenSpeechStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENSPEECHSTOP_EVENT:
                result = this.mListenSpeechStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENRESULT_EVENT:
                result = this.mListenResultEvent.removeListener( aPluginName );
                break;
    
            case SPEECH_LISTENINTERIMRESULT_EVENT:
                result = this.mListenResultEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENNOMATCH_EVENT:
                result = this.mListenNoMatchEvent.removeListener( aPluginName );
                break;
    
            default:
                result = super.removeEventListener( aPluginName, aEventName );
                break;
        }
        return result;
    }


    addListenResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENRESULT_EVENT, aEventFunc );
    }

    addListenInterimResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENINTERIMRESULT_EVENT, aEventFunc );
    }

    addListenNoMatchEvent( aPluginName: string, aEventFunc: OnListenNoMatchFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENNOMATCH_EVENT, aEventFunc );
    }

    addListenRecognitionStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return -1;
    }

    addListenRecognitionStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return -1;
    }

    addListenAudioStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENAUDIOSTART_EVENT, aEventFunc );
    }

    addListenAudioStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENAUDIOSTOP_EVENT, aEventFunc );
    }

    addListenSoundStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return -1;
    }

    addListenSoundStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return -1;
    }

    addListenSpeechStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENSPEECHSTART_EVENT, aEventFunc );
    }

    addListenSpeechStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENSPEECHSTART_EVENT, aEventFunc );
    }


    removeListenResultEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENRESULT_EVENT );
    }

    removeListenInterimResultEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENINTERIMRESULT_EVENT );
    }

    removeListenNoMatchEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENNOMATCH_EVENT );
    }

    removeListenRecognitionStartEvent( aPluginName: string ): number {
        return -1;
    }

    removeListenRecognitionStopEvent( aPluginName: string ): number {
        return -1;
    }

    removeListenAudioStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENAUDIOSTART_EVENT );
    }

    removeListenAudioStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENAUDIOSTOP_EVENT );
    }

    removeListenSoundStartEvent( aPluginName: string ): number {
        return -1;
    }

    removeListenSoundStopEvent( aPluginName: string ): number {
        return -1;
    }

    removeListenSpeechStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENSPEECHSTART_EVENT );
    }

    removeListenSpeechStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENSPEECHSTOP_EVENT );
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        if ( this.mASR ) {
            return true;
        }
        return false;
    }


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        if ( !this.mPlugin ) {
            console.log('Error Listen.setASR: kein Listen-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.setASR( aASRName );
        return 0;
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        return this.mASR;
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
        return this.mASRList;
    }


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {string} aLanguage - Kurzbezeichnung der Sprache (de, en)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        if ( !this.mPlugin ) {
            console.log('Error Listen.setLanguage: kein Listen-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.setLanguage( aLanguage );
        return 0;
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        return this.mLanguage;
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        return this.mLanguageList;
    }


    setTimeout(aTimeout: number): number {
        return 0;
    }


    isMode(aMode: string): boolean {
        return false;
    }


    isCommandMode(): boolean {
        return false;
    }


    isDictateMode(): boolean {
        return false;
    }


    setMode(aMode: string): number {
        return 0;
    }


    getMode(): string {
        return "";
    }


    getModeList(): string[] {
        return [];
    }


    // Listen-Funktionen


    isRunning(): boolean {
        return this.mRunningFlag;
    }


    start(): number {
        // console.log('ListenPlugin-Objekt:', this.mPlugin);
        if ( !this.mPlugin ) {
            console.log('Error Listen.start: kein Listen-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.start();
        return 0;
    }


    stop(): number {
        if ( !this.mPlugin ) {
            console.log('Error Listen.stop: kein Listen-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.stop();
        return 0;
    }


    abort(): number {
        return this.stop();
    }

}
