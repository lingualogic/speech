/** @packageDocumentation
 * Speak Komponente, dient zur Sprachausgabe von Texten oder Audiodateien
 * ueber ein TTS-Plugin oder ein AudioPlayer-Plugin.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// core

import { SPEECH_SPEAKAUDIOUNLOCK_EVENT, EventFunctionList, EventFunc } from '@lingualogic-speech/core';


// base

import { BaseComponent } from '@lingualogic-speech/base';


// audio

import { AUDIOPLAYER_PLUGIN_NAME, AUDIO_DEFAULT_FORMAT, IAudioPlayer } from '@lingualogic-speech/audio';


// tts

import { TTS_DEFAULT_NAME } from '../tts/tts-const';
import { ITTS } from '../tts/tts.interface';


// speak

import { SPEAK_API_VERSION, SPEAK_VERSION_STRING } from '../speak-version';
import {
    SPEAK_TYPE_NAME,
    SPEAK_COMPONENT_NAME,
    SPEAK_AUDIOFILE_PATH,
    SPEAK_AUDIO_FLAG,
    SPEAK_DEFAULT_LANGUAGE,
    SPEAK_UNDEFINE_LANGUAGE,
    SPEAK_UNDEFINE_VOICE
} from '../speak-const';
import { OnSpeakAudioUnlockFunc, OnAudioUnlockFunc } from '../speak-function.type';
import { SPEAK_AUDIO_STOPSELECTOR, SPEAK_TTS_STOPSELECTOR } from './speak-component-const';
import { ISpeakOption } from '../speak-option.interface';
import { ISpeakComponent } from './speak-component.interface';


/**
 * Speak Klasse
 */

export class SpeakComponent extends BaseComponent implements ISpeakComponent {


    // innere Plugins

    private mTTSPlugin: ITTS = null;
    private mAudioPlayer: IAudioPlayer = null;

    // Events

    private mAudioUnlockEvent = new EventFunctionList( SPEECH_SPEAKAUDIOUNLOCK_EVENT, SPEAK_COMPONENT_NAME );

    // Attribute der Komponente

    private mTTSActiveFlag = false;
    private mAudioPlayerActiveFlag = false;

    // Features des Servers

    private mTTSFeatureFlag = false;
    private mAudioFeatureFlag = false;

    // interne Attribute

    private mAudioFilePath = SPEAK_AUDIOFILE_PATH;     // lokaler Pfad zu den Audio-Dateien
    private mAudioFileName = '';                       // abzuspielender Dateiname
    private mAudioFlag = SPEAK_AUDIO_FLAG;             // bestimmt, ob Text ueber Audio ausgegeben wird

    private mSpeakText = '';                           // umzuwandelnder Text in Sprachausgabe
    private mSpeakStopSelector = '';


    /**
     * Speak Objekt erzeugen
     *
     */

    constructor( aComponentName = '', aRegisterFlag = true ) {
        super( aComponentName || SPEAK_COMPONENT_NAME, aRegisterFlag );
        this.mAudioUnlockEvent.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Rueckgabe des Komponententyps
     *
     * @returns {string}
     */

    getType(): string {
        return SPEAK_TYPE_NAME;
    }


    getClass(): string {
        return 'SpeakComponent';
    }


    getVersion(): string {
        return SPEAK_VERSION_STRING;
    }


    getApiVersion(): string {
        return SPEAK_API_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der lokalen Optionen
     *
     * @protected
     * @param {ISpeakOption} aOption - optionale Parameter
     */

    protected _setOption( aOption: ISpeakOption ): number {
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
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
        // Sprache eintragen
        if ( aOption.speakLanguage ) {
            this.setLanguage( aOption.speakLanguage );
        }
        return super._setOption( aOption );
    }


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    protected _initAllPlugin(): number {
        // console.log('SpeakComponent._initAllPlugin');

        // interne Plugins auslesen

        this.mTTSPlugin = this.findPlugin( TTS_DEFAULT_NAME ) as ITTS;
        this.mAudioPlayer = this.findPlugin( AUDIOPLAYER_PLUGIN_NAME ) as IAudioPlayer;

        // pruefen, ob TTS aktiv ist

        if ( this.mTTSPlugin ) {
            // console.log('SpeakComponent.init: TTSActiveFlag = ', this.mTTSPlugin.isActive());
            this.mTTSActiveFlag = this.mTTSPlugin.isActive();
        }

        // pruefen, ob AudioPlayer aktiv ist

        if ( this.mAudioPlayer ) {
            // console.log('SpeakComponent.init: AudioPlayerActiveFlag = ', this.mAudioPlayer.isActive());
            this.mAudioPlayerActiveFlag = this.mAudioPlayer.isActive();
            // pruefen, ob AudioPlayer aktiv ist
            if ( !this.mAudioPlayerActiveFlag ) {
                // AudioFlag dauerhaft abschalten
                this.mAudioFlag = false;
            }
        }
        return 0;
    }


    /**
     * Initialisierung der Speak-Komponente
     *
     * @param {Object} aOptions - optionale Parameter { audioContext: AudioContext,
     *                                                  audioFormat: string,
     *                                                  audioFlag: boolean,
     *                                                  externAudioFlag: boolean}
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: ISpeakOption ): number {
        // console.log('SpeakComponent.init:', aOption);
        return super.init( aOption );
    }


    /**
     * Loeschen der inneren Plugins
     */

    protected _doneAllPlugin(): void {
        // interne Komponenten

        this.mTTSPlugin = null;
        this.mAudioPlayer = null;
    }


    /**
     * Loeschen der inneren Events
     */

    protected _doneAllEvent(): void {
        this.mAudioUnlockEvent.clear();
    }


    /**
     * Loeschen der inneren Attribute
     */

    protected _doneAllAttribute(): void {
        // Attribute

        this.mTTSActiveFlag = false;
        this.mAudioPlayerActiveFlag = false;

        // Features des Servers

        this.mTTSFeatureFlag = false;
        this.mAudioFeatureFlag = false;

        // interne Attribute

        this.mAudioFilePath = SPEAK_AUDIOFILE_PATH;     // lokaler Pfad zu den Audio-Dateien
        this.mAudioFileName = '';                       // abzuspielender Dateiname
        this.mAudioFlag = SPEAK_AUDIO_FLAG;             // bestimmt, ob Text ueber Audio ausgegeben wird

        this.mSpeakText = '';                           // umzuwandelnder Text in Sprachausgabe
        this.mSpeakStopSelector = '';
    }


    /**
     * Defaultwerte setzen
     */

    protected _resetAllDefault(): void {
        // Default-Einstellungen

        this.setAudioFormat( AUDIO_DEFAULT_FORMAT );
        this.setLanguage( SPEAK_DEFAULT_LANGUAGE );

        // interne Attribute

        this.mSpeakStopSelector = '';
        this.mAudioFilePath = SPEAK_AUDIOFILE_PATH;
        this.mAudioFileName = '';
        this.mAudioFlag = SPEAK_AUDIO_FLAG;
        this.mSpeakText = '';
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {ISpeakOption} aOption - optionale Parameter
     */

    reset( aOption?: ISpeakOption ): number {
        return super.reset( aOption );
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn ASR
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene TTS und AudioPlayer

        if ( !this.mTTSActiveFlag && !this.mAudioPlayerActiveFlag ) {
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
        // pruefen auf vorhandene TTS und AudioPlayer

        if ( !this.mTTSActiveFlag && !this.mAudioPlayerActiveFlag ) {
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
        // Eintragen des TTS-Features
        if (aFeatureInfo.features.TTS && typeof(aFeatureInfo.features.TTS) === 'boolean') {
            this.mTTSFeatureFlag = aFeatureInfo.features.TTS;
        }
        // Eintragen des Audio-Features
        if (aFeatureInfo.features.AUDIO && typeof(aFeatureInfo.features.AUDIO) === 'boolean') {
            this.mAudioFeatureFlag = aFeatureInfo.features.AUDIO;
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
        this.mAudioUnlockEvent.setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Audio-Unlock
     *
     * @private
     * @param {string} aState - aktueller AudioContext.state
     * @return {number}
     */

    protected _onAudioUnlock( aState: string ): number {
        // console.log('SpeakComponent._onAudioUnlock:', aState);
        let unlockFlag = false;
        if ( aState === 'running' ) {
            unlockFlag = true;
        }
        return this.mAudioUnlockEvent.dispatch( unlockFlag );
    }


    get onAudioUnlock(): OnAudioUnlockFunc {
        return (aState: string) => this._onAudioUnlock( aState );
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
            case SPEECH_SPEAKAUDIOUNLOCK_EVENT:
                result = this.mAudioUnlockEvent.addListener( aPluginName, aEventFunc );
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
            case SPEECH_SPEAKAUDIOUNLOCK_EVENT:
                result = this.mAudioUnlockEvent.removeListener( aPluginName );
                break;

            default:
                result = super.removeEventListener( aPluginName, aEventName );
                break;
        }
        return result;
    }


    addAudioUnlockEvent( aPluginName: string, aEventFunc: OnSpeakAudioUnlockFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_SPEAKAUDIOUNLOCK_EVENT, aEventFunc );
    }

    removeAudioUnlockEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_SPEAKAUDIOUNLOCK_EVENT );
    }

    removeAllEvent( aPluginName ): number {
        let result = super.removeAllEvent( aPluginName );
        if ( this.removeAudioUnlockEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        return result;
    }


    // Audio-Funktionen


    /**
     * AudioContext entsperren
     *
     * @deprecated
     */

    unlockAudio(): number {
        if ( !this.mAudioPlayer ) {
            return -1;
        }
        // TODO: wird nicht mehr benoetigt, da in AudioPlayer automatisch auf Unlock geprueft wird
        // eventuell besteht das Problem einer Race-Condition!
        this.mAudioPlayer.unlockAudio();
        return 0;
    }


    /**
     * pruefen, ob AudioContext entsperrt ist
     */

    isUnlockAudio(): boolean {
        if ( !this.mAudioPlayer ) {
            return false;
        }
        return this.mAudioPlayer.isUnlockAudio();
    }


    /**
     * Abfrage auf eingeschaltete Audioausgabe
     */

    isAudio(): boolean {
        if ( this.mAudioPlayerActiveFlag ) {
            return this.mAudioFlag;
        }
        return false;
    }


    /**
     * Audioausgabe einschalten
     */

    setAudioOn(): number {
        if ( this.mAudioPlayerActiveFlag ) {
            this.mAudioFlag = true;
            return 0;
        }
        return -1;
    }


    /**
     * Audioausgabe ausschalten
     */

    setAudioOff(): number {
        this.mAudioFlag = false;
        return 0;
    }


    /**
     * Rueckgabe des globalen Audiokontext der App.
     *
     * @return {AudioContext} Gibt den globalen HTML5-Audiokontext zurueck
     */

    getAudioContext(): AudioContext {
        if ( !this.mAudioPlayer ) {
            return null;
        }
        return this.mAudioPlayer.getAudioContext();
    }


    /**
     * Eintragen des Audioformats.
     *
     * @param {string} aAudioFormat - Eintragen eines Formatnamens
     */

    setAudioFormat( aAudioFormat: string ): number {
        if ( !this.mAudioPlayer ) {
            return -1;
        }
        return this.mAudioPlayer.setAudioFormat( aAudioFormat );
    }


    /**
     * Rueckgabe des aktuell eingestellten Audioformats.
     *
     * @return {string} gibt MP3 oder WAV zurueck
     */

    getAudioFormat(): string {
        if ( !this.mAudioPlayer ) {
            return '';
        }
        return this.mAudioPlayer.getAudioFormat();
    }


    /**
     * lokalen Audiodateipfad eintragen
     *
     * @param {string} aAudioFilePath
     */

    setAudioFilePath( aAudioFilePath: string ): number {
        this.mAudioFilePath = aAudioFilePath;
        return 0;
    }


    /**
     * lokalen Audiodateipfad zurueckgeben
     *
     * @return {string} audioFilePath
     */

    getAudioFilePath(): string {
        return this.mAudioFilePath;
    }


    /**
     * Audiodateinamen eintragen
     *
     * @param {string} aAudioFileName - Name der aktuell abzuspielenden Audiodatei
     */

    setAudioFileName( aAudioFileName: string ): number {
        this.mAudioFileName = aAudioFileName;
        return 0;
    }


    /**
     * Audiodateiname zurueckgeben
     *
     * @return {string} audioFileName
     */

    getAudioFileName(): string {
        return this.mAudioFileName;
    }


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     *
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean {
        if ( this.mTTSPlugin && this.mTTSPlugin.isTTS()) {
            return true;
        }
        return false;
    }


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number {
        if ( !this.mTTSPlugin ) {
            return -1;
        }
        return this.mTTSPlugin.setTTS( aTTSName );
    }


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string {
        if ( !this.mTTSPlugin ) {
            return '';
        }
        return this.mTTSPlugin.getTTS();
    }


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string> {
        if ( !this.mTTSPlugin ) {
            return [];
        }
        return this.mTTSPlugin.getTTSList();
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
        if ( !this.mTTSPlugin ) {
            return -1;
        }
        return this.mTTSPlugin.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @return {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        if ( !this.mTTSPlugin ) {
            return SPEAK_UNDEFINE_LANGUAGE;
        }
        return this.mTTSPlugin.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( !this.mTTSPlugin ) {
            return [];
        }
        return this.mTTSPlugin.getLanguageList();
    }


    // Voice-Funktionen


    /**
     * Aendern der Stimme
     *
     * @param {string} aVoice - Name der Stimme
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string ): number {
        if ( !this.mTTSPlugin ) {
            return -1;
        }
        return this.mTTSPlugin.setVoice( aVoice );
    }


    /**
     * aktuell eingestellte Stimme zurueckgeben
     *
     * @return {string} Name der Stimme
     */

    getVoice(): string {
        if ( !this.mTTSPlugin ) {
            return SPEAK_UNDEFINE_VOICE;
        }
        return this.mTTSPlugin.getVoice();
    }


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        if ( !this.mTTSPlugin ) {
            return [];
        }
        return this.mTTSPlugin.getVoiceList();
    }


    // Speak-Funktionen


    /**
     * Eintragen des aktuell zu sprechenden Textes
     *
     * @param aText - Text fuer die Sprachausgabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setText( aText: string ): number {
        this.mSpeakText = aText;
        return 0;
    }


    /**
     * Rueckgabe des aktuell zu sprechenden Textes
     *
     * @return {string} speakText
     */

    getText(): string {
        return this.mSpeakText;
    }


    /**
     * pruefen, ob Sprachausgabe gerade laeuft
     *
     * @return {boolean} True, Sprachausgabe aktiv, False sonst
     */

    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        // pruefen auf Audio oder TTS
        if ( this.mAudioFlag ) {
            if ( this.mAudioPlayer ) {
                return this.mAudioPlayer.isPlay() || this.mAudioPlayer.isLoad();
            }
            return false;
        }
        if ( this.mTTSPlugin ) {
            return this.mTTSPlugin.isSpeakRunning();
        }
        return false;
    }


    /**
     * Sprachausgabe
     *
     * @return {number} errorcode (0,-1)
     */

    // TODO: Problem des unterschiedlichen Verhaltens wenn Lock oder Unlock Audio muss untersucht werden

    start(): number {
        // console.log('SpeakComponent.start: TTS = ', this.getTTS(), ' Sprache = ', this.getLanguage(), ' Stimme = ', this.getVoice());

        // pruefen auf externe Audiokomponente
        if ( !this.isActive()) {
            if ( this.isErrorOutput()) {
                console.log('SpeakComponent.start: Komponente ist nicht aktiv');
            }
            return 0;
        }
        // pruefen auf bereits gestarteten Speak
        if ( this.isRunning()) {
            this.error( 'start', 'Sprachausgabe laeuft bereits' );
            return -1;
        }
        // pruefen auf Audio oder TTS
        if ( this.mAudioFlag ) {
            // TODO: unlockAudio kann entfernt werden, AudioPlayer entsperrt sich automatisch!
            // Entsperren von Audio
            // this.unlockAudio();
            return this._startSpeakAudio();
        }
        // fehlende TTS wird zuerst abgefrage, um Fehler zu erzeugen
        if ( !this.isTTS()) {
            this.error( 'start', 'keine TTS vorhanden' );
            return -1;
        }

        // console.log('SpeakComponent.start: _startSpeakTTS');
        return this._startSpeakTTS();
    }


    /**
     * Ausgabe einer Audio-Datei zur Audio-ID
     *
     * @return {number} errorcode (0,-1)
     */

    protected _startSpeakAudio(): number {
        // console.log('SpeakComponent._startSpeakAudio');
        this.mSpeakStopSelector = '';
        // pruefen auf Server-Konponente
        if ( this.mAudioFeatureFlag ) {
            // Audio wird vom Server abgespielt
            return 0;
        }
        if ( !this.mAudioPlayer ) {
            this.error( '_startSpeakAudio', 'kein AudioPlayer vorhanden' );
            return -1;
        }
        if ( !this.mAudioFileName ) {
            this.error( '_startSpeakAudio', 'kein Audiodateiname fuer die Sprachausgabe vorhanden' );
            return -1;
        }
        // Audio wird lokal im Client abgespielt
        this.mSpeakStopSelector = SPEAK_AUDIO_STOPSELECTOR;
        // TODO: hier muss die Audiodateinamenserzeugung eingebaut werden, dass darf nicht in AudioPlayer stattfinden
        // console.log('SpeakComponents._startSpeakAudio: mAudioFilePath = ', this.mAudioFilePath);
        return this.mAudioPlayer.play( this.mAudioFilePath, this.mAudioFileName );
        // return this.mAudioPlayer.playFile( this.mAudioFilePath + this.mAudioFileName );
    }


    /**
     * Ausgabe des Textes ueber die Sprachsynthese
     *
     * @return {number} errorcode (0,-1)
     */

    protected _startSpeakTTS(): number {
        // console.log('SpeakComponent._startSpeakTTS');
        this.mSpeakStopSelector = '';
        // pruefen auf Server-Konponente
        if ( this.mTTSFeatureFlag ) {
            // TTS wird vom Server abgespielt
            return 0;
        }
        if ( !this.mTTSPlugin ) {
            this.error( '_startSpeakTTS', 'kein TTSPlugin vorhanden' );
            return -1;
        }

        /* TODO: wird nicht mehr benoetigt, da leerer Text jetzt eine Pruefsynthese aufruft
        if ( !this.mSpeakText ) {
            this.error( '_startSpeakTTS', 'kein Text fuer die Sprachausgabe vorhanden' );
            return -1;
        }
        */

        // Text wird im Client ausgegeben
        this.mSpeakStopSelector = SPEAK_TTS_STOPSELECTOR;
        return this.mTTSPlugin.startSpeak( this.mSpeakText );
    }


    /**
     * Sprachausgabe stoppen
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        // console.log('SpeakComponent.stop:', this.mSpeakStopSelector);
        // pruefen auf laufende Sprachausgabe
        if ( !this.isRunning()) {
            this.mSpeakStopSelector = '';
            return 0;
        }
        // TODO: sollte eigentlich 0 zurueckgeben, da stop immer aufgerufen werden darf,
        //       auch wenn kein start vorher aufgerufen worden ist
        if ( !this.mSpeakStopSelector ) {
            this.error( 'stop', 'kein StopSelector vorhanden' );
            return -1;
        }
        if ( this.mSpeakStopSelector === SPEAK_AUDIO_STOPSELECTOR ) {
            this.mSpeakStopSelector = '';
            if ( this.mAudioPlayer ) {
                return this.mAudioPlayer.stop();
            } else {
                this.error( 'stop', 'kein AudioPlayer vorhanden' );
                return -1;
            }
        } else if ( this.mSpeakStopSelector === SPEAK_TTS_STOPSELECTOR ) {
            this.mSpeakStopSelector = '';
            if ( this.mTTSPlugin ) {
                return this.mTTSPlugin.stopSpeak();
            } else {
                this.error( 'stop', 'kein TTSPlugin vorhanden' );
                return -1;
            }
        }
        this.error( 'stop', 'kein gueltiger StopSelector vorhanden' );
        return -1;
    }

}
