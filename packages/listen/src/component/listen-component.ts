/** @packageDocumentation
 * ListenComponent zur Verwaltung von ASR-Plugins. Sie erbt von der BaseComponent.
 *
 * Letzte Aenderung: 16.02.2022
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// core

import {
    SPEECH_LISTENRESULT_EVENT,
    SPEECH_LISTENINTERIMRESULT_EVENT,
    SPEECH_LISTENNOMATCH_EVENT,
    SPEECH_LISTENRECOGNITIONSTART_EVENT,
    SPEECH_LISTENRECOGNITIONSTOP_EVENT,
    SPEECH_LISTENAUDIOSTART_EVENT,
    SPEECH_LISTENAUDIOSTOP_EVENT,
    SPEECH_LISTENSOUNDSTART_EVENT,
    SPEECH_LISTENSOUNDSTOP_EVENT,
    SPEECH_LISTENSPEECHSTART_EVENT,
    SPEECH_LISTENSPEECHSTOP_EVENT,
    EventFunctionList,
    EventFunc
} from '@lingualogic-speech/core';


// base

import { BaseComponent } from '@lingualogic-speech/base';


// asr

import { ASR_DEFAULT_NAME } from './../asr/asr-const';
import {
    IASR,
    OnASRListenStartFunc,
    OnASRListenStopFunc,
    OnASRListenResultFunc,
    OnASRListenNoMatchFunc,
} from '../asr/asr.interface';


// listen

import { LISTEN_API_VERSION, LISTEN_VERSION_STRING } from '../listen-version';
import { LISTEN_TYPE_NAME, LISTEN_COMPONENT_NAME, LISTEN_DEFAULT_LANGUAGE, LISTEN_UNDEFINE_LANGUAGE, LISTEN_UNDEFINE_MODE } from '../listen-const';
import { OnListenResultFunc, OnListenNoMatchFunc, OnListenStartFunc, OnListenStopFunc } from '../listen-function.type';
import { IListenOption } from '../listen-option.interface';
import {
    IListenComponent,
} from './listen-component.interface';


/**
 * ListenComponent Klasse
 */

export class ListenComponent extends BaseComponent implements IListenComponent {


    // innere Plugins

    private mASRPlugin: IASR = null;

    // TODO: AudioRecorder muss noch eingebaut werden
    // mAudioRecorder: AudioRecorderInterface = null;

    // Events

    private mListenResultEvent = new EventFunctionList( SPEECH_LISTENRESULT_EVENT, LISTEN_COMPONENT_NAME );
    private mListenInterimResultEvent = new EventFunctionList( SPEECH_LISTENINTERIMRESULT_EVENT, LISTEN_COMPONENT_NAME );
    private mListenNoMatchEvent = new EventFunctionList( SPEECH_LISTENNOMATCH_EVENT, LISTEN_COMPONENT_NAME );
    private mListenRecognitionStartEvent = new EventFunctionList( SPEECH_LISTENRECOGNITIONSTART_EVENT, LISTEN_COMPONENT_NAME );
    private mListenRecognitionStopEvent = new EventFunctionList( SPEECH_LISTENRECOGNITIONSTOP_EVENT, LISTEN_COMPONENT_NAME );
    private mListenAudioStartEvent = new EventFunctionList( SPEECH_LISTENAUDIOSTART_EVENT, LISTEN_COMPONENT_NAME );
    private mListenAudioStopEvent = new EventFunctionList( SPEECH_LISTENAUDIOSTOP_EVENT, LISTEN_COMPONENT_NAME );
    private mListenSoundStartEvent = new EventFunctionList( SPEECH_LISTENSOUNDSTART_EVENT, LISTEN_COMPONENT_NAME );
    private mListenSoundStopEvent = new EventFunctionList( SPEECH_LISTENSOUNDSTOP_EVENT, LISTEN_COMPONENT_NAME );
    private mListenSpeechStartEvent = new EventFunctionList( SPEECH_LISTENSPEECHSTART_EVENT, LISTEN_COMPONENT_NAME );
    private mListenSpeechStopEvent = new EventFunctionList( SPEECH_LISTENSPEECHSTOP_EVENT, LISTEN_COMPONENT_NAME );

    // Attribute der Komponente

    private mASRActiveFlag = false;

    // Features des Servers

    private mASRFeatureFlag = false;


    /**
     * Listen Objekt erzeugen
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aComponentName = '', aRegisterFlag = true ) {
        super( aComponentName || LISTEN_COMPONENT_NAME, aRegisterFlag );
        this.mListenResultEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenInterimResultEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenNoMatchEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenRecognitionStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenRecognitionStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenAudioStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenAudioStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenSoundStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenSoundStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenSpeechStartEvent.setErrorOutputFunc( this._getErrorOutputFunc());
        this.mListenSpeechStopEvent.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    getType(): string {
        return LISTEN_TYPE_NAME;
    }


    getClass(): string {
        return 'ListenComponent';
    }


    getVersion(): string {
        return LISTEN_VERSION_STRING;
    }


    getApiVersion(): string {
        return LISTEN_API_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der lokalen Optionen
     *
     * @protected
     * @param {IListenOption} aOption - optionale Parameter
     */

    protected _setOption( aOption: IListenOption ): number {
        // console.log('ListenComponent._setOption:', aOption);
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
        // TODO: Audiooptionen muessen noch eingebaut werden
        /****
        // Audio-Pfad eintragen
        if (typeof aOption.audioFilePath === 'string') {
            // console.log('SpeakComponent._setOption: AudioPath = ', aOption.audioFilePath);
            this.mAudioFilePath = aOption.audioFilePath;
        }
        // Audioflag eintragen
        if (typeof aOption.audioFlag === 'boolean') {
            if (aOption.audioFlag === true) {
                // console.log('SpeakService Audio: ein');
                this.mAudioFlag = true;
            } else {
                // console.log('SpeakService Audio: aus');
                this.mAudioFlag = false;
            }
        }
        ****/
        // Sprache eintragen
        if ( aOption.listenLanguage ) {
            // console.log('ListenComponent._setOption: language = ', aOption.listenLanguage);
            this.setLanguage( aOption.listenLanguage );
        }
        return super._setOption( aOption );
    }


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    protected _initAllPlugin( aOption?: IListenOption ): number {
        // interne Plugins auslesen

        // TODO: AudioRecorder muss noch eingebaut werden
        // this.mAudioRecorder = this.findPlugin( AUDIORECORDER_PLUGIN_NAME ) as AudioRecorderInterface;

        // TODO: Hier muss die PluginGroup eingefuegt werden
        this.mASRPlugin = this.findPlugin( ASR_DEFAULT_NAME ) as IASR;

        // ASR-Plugins dynamisch eintragen

        if ( aOption && aOption.asrList ) {
            // Schleife fuer alle ASRs in der Listen-ASEListe
            // console.log('ListenComponent._initAllPlugin:', aOption.asrList);
            for ( const asrOption of aOption.asrList ) {
                if ( asrOption.asrName && asrOption.asrClass ) {
                    if ( this.mASRPlugin.insertASR( asrOption.asrName, asrOption.asrClass, asrOption) !== 0 ) {
                        this.error( '_initAllPlugin', 'ASR wurd nicht eingetragen ' + asrOption.asrName );
                    }
                }
            }
        }

        // pruefen, ob ASR aktiv ist

        if ( this.mASRPlugin ) {
            // console.log('ListenComponent.init: ASRActiveFlag = ', this.mASRPlugin.isActive());
            this.mASRActiveFlag = this.mASRPlugin.isActive();
        }

        return 0;
    }


    /**
     * Initialisierung der Listen-Komponente
     *
     * @param {IListenOption} aOption - optionale Parameter { listenLanguage }
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: IListenOption ): number {
        if (super.init( aOption ) !== 0 ) {
            return -1;
        }

        // Default-ASR einstellen

        if ( aOption && typeof aOption.asrDefault === 'string' ) {
            this.setASR( aOption.asrDefault );
        }

        return 0;
    }


    /**
     * Loeschen der inneren Plugins
     */

    protected _doneAllPlugin(): void {
        // interne Komponenten

        this.mASRPlugin = null;
        // this.mAudioRecorder = null;
    }


    /**
     * Loeschen der inneren Events
     */

    protected _doneAllEvent(): void {
        this.mListenResultEvent.clear();
        this.mListenInterimResultEvent.clear();
        this.mListenNoMatchEvent.clear();
        this.mListenRecognitionStartEvent.clear();
        this.mListenRecognitionStopEvent.clear();
        this.mListenAudioStartEvent.clear();
        this.mListenAudioStopEvent.clear();
        this.mListenSoundStartEvent.clear();
        this.mListenSoundStopEvent.clear();
        this.mListenSpeechStartEvent.clear();
        this.mListenSpeechStopEvent.clear();
    }


    /**
     * Loeschen der inneren Attribute
     */

    protected _doneAllAttribute(): void {
        // Attribute

        this.mASRActiveFlag = false;

        // Features des Servers

        this.mASRFeatureFlag = false;
    }


    /**
     * Defaultwerte setzen
     */

    protected _resetAllDefault(): void {
        this.setLanguage( LISTEN_DEFAULT_LANGUAGE );
        // TODO: Audiodaten muessen noch eingebaut werden
        /****
        this.mAudioFilePath = SPEAK_AUDIOFILE_PATH;
        this.mAudioFileName = '';
        this.mAudioFlag = SPEAK_AUDIO_FLAG;
        ****/
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {IListenOption} aOption - optionale Parameter
     */

    // TODO: muss als Basisfunktion in Plugin aufgenommen werden

    reset( aOption?: IListenOption ): number {
        return super.reset( aOption );
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn ASR
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene ASR

        if ( !this.mASRActiveFlag ) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn ASR vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene Recognition
        if ( !this.mASRActiveFlag ) {
            return -1;
        }
        return super.setActiveOn();
    }


    /**
     * Hier werden die Features des Servers gesetzt
     *
     * @param {Object} aFeatureInfo {TTS: boolean, ASR: boolean, AUDIO: boolean}
     *
     * @return {number} errorcode (0,-1)
     */

    setFeatureList( aFeatureInfo: any ): number {
        // console.log('SpeechApi.setFeatureList:', aFeatureInfo);
        if ( !aFeatureInfo.features ) {
            this.error( 'setFeatureList', 'keine FeatureInfos uebergeben' );
            return -1;
        }
        // Eintragen des ASR-Features
        if ( aFeatureInfo.features.ASR && typeof( aFeatureInfo.features.ASR ) === 'boolean') {
            this.mASRFeatureFlag = aFeatureInfo.features.ASR;
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
        this.mListenResultEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenInterimResultEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenNoMatchEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenRecognitionStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenRecognitionStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenAudioStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenAudioStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenSoundStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenSoundStopEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenSpeechStartEvent.setErrorOutput( aErrorOutputFlag );
        this.mListenSpeechStopEvent.setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer das Ergebnis der Spracherkennung
     *
     * @private
     * @param {string} aText - Spracherkennungsergebnis
     * @return {number}
     */

    protected _onListenResult( aText: string, aFinalFlag?: boolean ): number {
        // console.log('Listen: onListenResult = ', aText, aFinalFlag);
        return this.mListenResultEvent.dispatch( aText );
    }


    /**
     * Ereignisfunktion fuer das Zwischenergebnis der Spracherkennung
     *
     * @private
     * @param {string} aText - Spracherkennungsergebnis
     * @return {number}
     */

    protected _onListenInterimResult( aText: string ): number {
        // console.log('SpeechListen: onListenInterimResult=', aText);
        return this.mListenInterimResultEvent.dispatch( aText );
    }


    /**
     * Ereignisfunktion fuer das kein Ergebnis der Spracherkennung
     *
     * @private
     * @return {number}
     */

    protected _onListenNoMatch(): number {
        // console.log('SpeechListen: onListenNoMatch');
        return this.mListenNoMatchEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Start Recognition
     *
     * @private
     * @return {number}
     */

    protected _onListenRecognitionStart(): number {
        // console.log('SpeechListen: onListenRecognitionStart');
        return this.mListenRecognitionStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Stop Recognition
     *
     * @private
     * @return {number}
     */

    protected _onListenRecognitionStop(): number {
        // console.log('SpeechListen: onListenRecognitionStop');
        return this.mListenRecognitionStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Start Audio
     *
     * @private
     * @return {number}
     */

    protected _onListenAudioStart(): number {
        // console.log('Listen: onListenAudioStart');
        return this.mListenAudioStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Stop Audio
     *
     * @private
     * @return {number}
     */

    protected _onListenAudioStop(): number {
        // console.log('SpeechListen: onListenAudioStop');
        return this.mListenAudioStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Start Sound
     *
     * @private
     * @return {number}
     */

    protected _onListenSoundStart(): number {
        // console.log('SpeechListen: onListenSoundStart');
        return this.mListenSoundStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Stop Sound
     *
     * @private
     * @return {number}
     */

    protected _onListenSoundStop(): number {
        // console.log('SpeechListen: onListenSoundStop');
        return this.mListenSoundStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Start Speech
     *
     * @private
     * @return {number}
     */

    protected _onListenSpeechStart(): number {
        // console.log('SpeechListen: onListenSpeechStart');
        return this.mListenSpeechStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Stop Speech
     *
     * @private
     * @return {number}
     */

    protected _onListenSpeechStop(): number {
        // console.log('SpeechListen: onListenSpeechStop');
        return this.mListenSpeechStopEvent.dispatch();
    }


    get onListenResult(): OnASRListenResultFunc {
        return (aText: string) => this._onListenResult( aText );
    }


    get onListenInterimResult(): OnASRListenResultFunc {
        return (aText: string) => this._onListenInterimResult( aText );
    }


    get onListenNoMatch(): OnASRListenNoMatchFunc {
        return () => this._onListenNoMatch();
    }


    get onListenRecognitionStart(): OnASRListenStartFunc {
        return () => this._onListenRecognitionStart();
    }


    get onListenRecognitionStop(): OnASRListenStopFunc {
        return () => this._onListenRecognitionStop();
    }


    get onListenAudioStart(): OnASRListenStartFunc {
        return () => this._onListenAudioStart();
    }


    get onListenAudioStop(): OnASRListenStopFunc {
        return () => this._onListenAudioStop();
    }


    get onListenSoundStart(): OnASRListenStartFunc {
        return () => this._onListenSoundStart();
    }


    get onListenSoundStop(): OnASRListenStopFunc {
        return () => this._onListenSoundStop();
    }


    get onListenSpeechStart(): OnASRListenStartFunc {
        return () => this._onListenSpeechStart();
    }


    get onListenSpeechStop(): OnASRListenStopFunc {
        return () => this._onListenSpeechStop();
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
            case SPEECH_LISTENRESULT_EVENT:
                result = this.mListenResultEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENINTERIMRESULT_EVENT:
                result = this.mListenInterimResultEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENNOMATCH_EVENT:
                result = this.mListenNoMatchEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENRECOGNITIONSTART_EVENT:
                result = this.mListenRecognitionStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENRECOGNITIONSTOP_EVENT:
                result = this.mListenRecognitionStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENAUDIOSTART_EVENT:
                result = this.mListenAudioStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENAUDIOSTOP_EVENT:
                result = this.mListenAudioStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENSOUNDSTART_EVENT:
                result = this.mListenSoundStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENSOUNDSTOP_EVENT:
                result = this.mListenSoundStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENSPEECHSTART_EVENT:
                result = this.mListenSpeechStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_LISTENSPEECHSTOP_EVENT:
                result = this.mListenSpeechStopEvent.addListener( aPluginName, aEventFunc );
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
            case SPEECH_LISTENRESULT_EVENT:
                result = this.mListenResultEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENINTERIMRESULT_EVENT:
                result = this.mListenInterimResultEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENNOMATCH_EVENT:
                result = this.mListenNoMatchEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENRECOGNITIONSTART_EVENT:
                result = this.mListenRecognitionStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENRECOGNITIONSTOP_EVENT:
                result = this.mListenRecognitionStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENAUDIOSTART_EVENT:
                result = this.mListenAudioStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENAUDIOSTOP_EVENT:
                result = this.mListenAudioStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENSOUNDSTART_EVENT:
                result = this.mListenSoundStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENSOUNDSTOP_EVENT:
                result = this.mListenSoundStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENSPEECHSTART_EVENT:
                result = this.mListenSpeechStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_LISTENSPEECHSTOP_EVENT:
                result = this.mListenSpeechStopEvent.removeListener( aPluginName );
                break;

            default:
                result = super.removeEventListener( aPluginName, aEventName );
                break;
        }
        return result;
    }


    // Add-Events


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
        return this.addEventListener( aPluginName, SPEECH_LISTENRECOGNITIONSTART_EVENT, aEventFunc );
    }


    addListenRecognitionStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENRECOGNITIONSTOP_EVENT, aEventFunc );
    }


    addListenAudioStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENAUDIOSTART_EVENT, aEventFunc );
    }


    addListenAudioStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENAUDIOSTOP_EVENT, aEventFunc );
    }


    addListenSoundStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENSOUNDSTART_EVENT, aEventFunc );
    }


    addListenSoundStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENSOUNDSTOP_EVENT, aEventFunc );
    }


    addListenSpeechStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENSPEECHSTART_EVENT, aEventFunc );
    }


    addListenSpeechStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENSPEECHSTOP_EVENT, aEventFunc );
    }


    // Remove-Events


    removeListenResultEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENRESULT_EVENT );
    }


    removeListenInterimResultEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENINTERIMRESULT_EVENT );
    }


    removeListenNoMatchEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENNOMATCH_EVENT );
    }


    removeListenRecognitionStartEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENRECOGNITIONSTART_EVENT );
    }


    removeListenRecognitionStopEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENRECOGNITIONSTOP_EVENT );
    }


    removeListenAudioStartEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENAUDIOSTART_EVENT );
    }


    removeListenAudioStopEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENAUDIOSTOP_EVENT );
    }


    removeListenSoundStartEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENSOUNDSTART_EVENT );
    }


    removeListenSoundStopEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENSOUNDSTOP_EVENT );
    }


    removeListenSpeechStartEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENSPEECHSTART_EVENT );
    }


    removeListenSpeechStopEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENSPEECHSTOP_EVENT );
    }


    removeAllEvent( aPluginName ): number {
        let result = super.removeAllEvent( aPluginName );
        if ( this.removeListenResultEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenInterimResultEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenNoMatchEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenRecognitionStartEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenRecognitionStopEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenAudioStartEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenAudioStopEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenSoundStartEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenSoundStopEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenSpeechStartEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeListenSpeechStopEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        return result;
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     *
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        if ( this.mASRPlugin && this.mASRPlugin.isASR()) {
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
        // console.log('ListenComponent.setASR:', aASRName);
        if ( !this.mASRPlugin ) {
            return -1;
        }
        return this.mASRPlugin.setASR( aASRName );
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        if ( !this.mASRPlugin ) {
            return '';
        }
        return this.mASRPlugin.getASR();
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
        if ( !this.mASRPlugin ) {
            return [];
        }
        return this.mASRPlugin.getASRList();
    }


    // Timeout-Funktionen


    /**
     * Timeout eintragen
     *
     * @param {number} aTimeout - Timeout in Millisekunden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTimeout( aTimeout: number ): number {
        if ( !this.mASRPlugin ) {
            return -1;
        }
        // console.log('ListenComponent.setTimeout:', aTimeout);
        this.mASRPlugin.setListenTimeout( aTimeout );
        return 0;
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
        if ( !this.mASRPlugin ) {
            return -1;
        }
        // console.log('ListenComponent.setLanguage:', aLanguage);
        return this.mASRPlugin.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @return {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        if ( !this.mASRPlugin ) {
            return LISTEN_UNDEFINE_LANGUAGE;
        }
        return this.mASRPlugin.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( !this.mASRPlugin ) {
            return [];
        }
        return this.mASRPlugin.getLanguageList();
    }


    // Modus-Funktionen


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    isMode( aMode: string ): boolean {
        if ( !this.mASRPlugin ) {
            return false;
        }
        return this.mASRPlugin.isMode( aMode );
    }


    /**
     * pruefen, ob der Eingabemode Command eingestellt ist
     * Dann kurzen Text nicht laenger als 30 Sekunden von der Spracherkennung zu verarbeiten
     *
     * @return {boolean} True, wenn Eingabemode Command eingestellt ist
     */

    isCommandMode(): boolean {
        if ( !this.mASRPlugin ) {
            return false;
        }
        return this.mASRPlugin.isCommandMode();
    }


    /**
     * pruefen, ob der Eingabemode Dictate eingestellt ist
     * Dann kontinuierlich Text von der Spracherkennung zu verarbeiten
     *
     * @return {boolean} True, wenn Eingabemode Dictate eingestellt ist
     */

    isDictateMode(): boolean {
        if ( !this.mASRPlugin ) {
            return false;
        }
        return this.mASRPlugin.isDictateMode();
    }


    /**
     * Traegt einen neue Eingabemodus fuer die Spracherkennung ein
     *
     * @param {string} aMode - Command oder Dictate
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number {
        if ( !this.mASRPlugin ) {
            return -1;
        }
        // console.log('ListenComponent.setMode:', aMode);
        return this.mASRPlugin.setMode( aMode );
    }


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    getMode(): string {
        if ( !this.mASRPlugin ) {
            return LISTEN_UNDEFINE_MODE;
        }
        return this.mASRPlugin.getMode();
    }


    /**
     * Rueckgabe aller vorhandenen Eingabemodi fuer die Spracherkennung
     *
     * @return {Array<string>} Liste der Eingabemodi
     */

    getModeList(): Array<string> {
        if ( !this.mASRPlugin ) {
            return [];
        }
        return this.mASRPlugin.getModeList();
    }


    // Listen-Funktionen


    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        if ( !this.mASRPlugin ) {
            return false;
        }
        return this.mASRPlugin.isListenRunning();
    }


    /**
     * Spracheingabe starten, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    start(): number {
        // console.log('ListenComponent.start: ASR = ', this.getASR());

        // fehlende ASR wird zuerst abgefrage, um Fehler zu erzeugen

        if ( !this.isASR()) {
            // console.log('ListenComponent.start: keine ASR vorhanden');
            this.error( 'start', 'keine ASR vorhanden' );
            return -1;
        }

        if ( !this.isActive()) {
            // console.log('ListenComponent.start: Komponente ist nicht aktiv');
            if ( this.isErrorOutput()) {
                console.log('ListenComponent.start: Komponente ist nicht aktiv');
            }
            return 0;
        }

        // interne ASR verwenden
        // console.log('ListenComponent.start: ASRPlugin.startListen');
        return this.mASRPlugin.startListen();
    }


    /**
     * Spracheingabe stoppen, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        // console.log('ListenComponent.stop: start');

        if ( !this.isActive()) {
            if ( this.isErrorOutput()) {
                console.log('ListenComponent.stop: no Active');
            }
            return 0;
        }
        if ( !this.mASRPlugin ) {
            // console.log('ListenComponent.stop: no ASRPlugin');
            this.error( 'stop', 'kein ASR vorhanden' );
            return -1;
        }
        // interne ASR verwenden
        return this.mASRPlugin.stopListen();
    }


    /**
     * Spracheingabe abbrechen ohne Ergebnis, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    abort(): number {
        // console.log('ListenComponent.abort');

        if ( !this.isActive()) {
            return 0;
        }
        if ( !this.mASRPlugin ) {
            this.error( 'abort', 'kein ASR vorhanden' );
            return -1;
        }
        // interne ASR verwenden
        return this.mASRPlugin.abortListen();
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
        const result = -1;
        let errorText = '';
        switch ( aTestCommand ) {
            /*
             * say-Kommando dient zum Ausfuehren von say() auf dem Corti-Mock, um SpeechRecognition zu simulieren
             */
            case 'say':
                // Kommando in ASR ausfuehren
                if ( this.mASRPlugin ) {
                    return this.mASRPlugin.test( aTestCommand, aTestData );
                } else {
                    errorText = 'kein ASRPlugin vorhanden';
                }
                break;

            default:
                errorText = 'kein gueltiges Testkommando uebergeben';
                break;
        }
        return { result, errorText };
    }

}
