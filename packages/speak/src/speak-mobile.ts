/** @packageDocumentation
 * Speak API fuer Speak-Cordova Komponente (Wrapper)
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module speak
 * @author SB
 */


// base

import { BaseMobile } from '@speech/base';



// speak

import { OnSpeakAudioUnlockFunc } from './speak-function.type';
import { ISpeakOption } from './speak-option.interface';
import { ISpeak } from './speak.interface';


/** @export
 * Speak Klasse als API-Wrapper fuer die Speak-Android API
 */

export class SpeakMobile extends BaseMobile implements ISpeak {

    // innere Attribute

    mTTS = '';
    mTTSList = new Array<string>(0);
    mLanguage = '';
    mLanguageList = new Array<string>(0);
    mVoice = '';
    mVoiceList = new Array<string>(0);
    mSpeakText = '';
    mRunningFlag = false;

    mInitEventFlag = false;
    // TODO: Magic Number in Konstante umwandeln
    mInitEventCount = 6;

 
    /**
     * Konstruktor fuer ereignisbasierte Initialisierung von Speak
     */

    constructor( aOption?: ISpeakOption ) {
        super( 'SpeakMobile', aOption );
    }


    _initEvent() {
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
     * @param {ISpeakOption} aOption - optionale Parameter zur Konfiguration
     *
     * @return {number} errorCode(0,-1)
     */

    _init( aOption?: ISpeakOption ): number {
        console.log('Speak.init:', aOption);

        // pruefen auf Fehlerausgabe

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }

        // pruefen auf cordova

        if ( !(window as any).cordova ) {
            console.log('Speak: kein Cordova vorhanden');
            return -1;
        }

        // pruefen auf SpeakPlugin von Cordova

        if ( !(window as any).SpeakPlugin ) {
            console.log('Speak: kein SpeakPlugin von Cordova vorhanden');
            return -1;
        } 

        console.log('SpeakPlugin-Objekt:', (window as any).SpeakPlugin);
        this.mPlugin = (window as any).SpeakPlugin;

        // Speak-Komponente initialisieren

        // alle Events eintragen

        this.mPlugin.onInit = ( aResult: any ) => {
            console.log('===> Event Speak.onInit ', aResult);
            if ( aResult == 0 ) {
                this.mInitEventFlag = true;
                this.mPlugin.getTTSList();
                this.mPlugin.getTTS();
                this.mPlugin.getLanguageList();
                this.mPlugin.getLanguage();
                this.mPlugin.getVoiceList();
                this.mPlugin.getVoice();
                // TODO: darf erst aufgerufen werden, wenn alle Daten-Events empfangen wurden
                // this._onInit();
            } else {
                this._onError( new Error('faild init'));
            }
        }

        this.mPlugin.onStart = ( aResult: any ) => {
            console.log('===> Event Speak.onStart ', aResult);
            this.mRunningFlag = true;
            this._onStart();
        }

        this.mPlugin.onStop = () => {
            console.log('===> Event Speak.onStop');
            this.mRunningFlag = false;
            this._onStop();
        }

        this.mPlugin.onTTSChanged = ( aResult: any ) => {
            console.log('===> Event Speak.onTTSChanged ', aResult);
            this.mTTS = aResult;
            this._initEvent();
        }

        this.mPlugin.onTTSList = ( aResult: any ) => {
            console.log('===> Event Speak.onTTSList ', aResult);
            this.mTTSList = aResult;
            this._initEvent();
        }

        this.mPlugin.onLanguageChanged = ( aResult: any ) => {
            console.log('===> Event Speak.onLanguageChanged ', aResult);
            this.mLanguage = aResult;
            this._initEvent();
        }

        this.mPlugin.onLanguageList = ( aResult: any ) => {
            console.log('===> Event Speak.onLanguageList ', aResult);
            this.mLanguageList = aResult;
            this._initEvent();
        }

        this.mPlugin.onVoiceChanged = ( aResult: any ) => {
            console.log('===> Event Speak.onVoiceChanged ', aResult);
            this.mVoice = aResult;
            this._initEvent();
        }

        this.mPlugin.onVoiceList = ( aResult: any ) => {
            console.log('===> Event Speak.onVoiceList ', aResult);
            this.mVoiceList = aResult;
            this._initEvent();
        }

        this.mPlugin.onError = ( aError: any ) => {
            console.log('===> Event Speak.onError ', aError);
            this.mRunningFlag = false;
            this._onError( aError );
        }


        console.log('SpeakPlugin:', this.mPlugin);
        this.mPlugin.init();

        // console.log('Speak-Komponente initialisiert ');
        return 0;
    }


    // Event-Funktionen


    addAudioUnlockEvent( aPluginName: string, aEventFunc: OnSpeakAudioUnlockFunc ): number {
        // return this.mmmPlugin.addAudioUnlockEvent( aPluginName, aEventFunc );
        return 0;
    }


    removeAudioUnlockEvent( aPluginName: string ): number {
        // return this.mmmPlugin.removeAudioUnlockEvent( aPluginName );
        return 0;
    }


    // Audio-Funktionen


    unlockAudio(): number {
        // return this.mmmPlugin.unlockAudio();
        return 0;
    }


    isUnlockAudio(): boolean {
        // return this.mmmPlugin.isUnlockAudio();
        return false;
    }


    isAudio(): boolean {
        // return this.mmmPlugin.isAudio();
        return false;
    }


    setAudioOn(): number {
        // return this.mmmPlugin.setAudioOn();
        return 0;
    }


    setAudioOff(): number {
        // return this.mmmPlugin.setAudioOff();
        return 0;
    }


    /**
     * Eintragen des AudioFormats, das in Speak verwendet wird
     *
     * @param {string} aAudioFormat - 'wav' oder 'mp3'
     */

    setAudioFormat( aAudioFormat: string ): number {
        // return this.mmmPlugin.setAudioFormat( aAudioFormat );
        return 0;
    }


    /**
     * Rueckgabe des globalen AudioFormats, das in SpeechAudio verwendet wird
     *
     * @return {string} audioFormat - 'wav' oder 'mp3' oder ''
     */

    getAudioFormat(): string {
        // return this.mmmPlugin.getAudioFormat();
        return '';
    }


    /**
     * Rueckgabe des globalen AudioContext, der in SpeechAudio verwendet wird
     *
     * @return {AudioContext} audioContext - globale Instanz des AudioContext
     * @memberof SpeechService
     */

    getAudioContext(): AudioContext {
        // return this.mmmPlugin.getAudioContext();
        return null;
    }


    setAudioFilePath( aFilePath: string ): number {
        // return this.mmmPlugin.setAudioFilePath( aFilePath );
        return 0;
    }


    getAudioFilePath(): string {
        // return this.mmmPlugin.getAudioFilePath();
        return '';
    }


    setAudioFileName( aFileName: string ): number {
        // return this.mmmPlugin.setAudioFileName( aFileName );
        return 0;
    }


    getAudioFileName(): string {
        // return this.mmmPlugin.getAudioFileName();
        return '';
    }


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     * 
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean {
        if ( this.mTTS ) {
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
        if ( !this.mPlugin ) {
            console.log('Error Speak.setTTS: kein Speak-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.setTTS( aTTSName );
        return 0;
    }


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string {
        return this.mTTS;
    }


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string> {
        return this.mTTSList;
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
            console.log('Error Speak.setLanguage: kein Speak-Plugin vorhanden');
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

    // Voice-Funktionen


    /**
     * Aendern der Stimme
     *
     * @param {string} aVoice - Name der Stimme
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string ): number {
        if ( !this.mPlugin ) {
            console.log('Error Speak.setVoice: kein Speak-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.setVoice( aVoice );
        return 0;
    }


    /**
     * aktuell eingestellte Stimme zurueckgeben
     *
     * @returns {string} Name der Stimme
     */

    getVoice(): string {
        return this.mVoice;
    }


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        return this.mVoiceList;
    }


    // Speak-Funktionen


    setText( aText: string ): number {
        this.mSpeakText = aText;
        return 0;
    }

    getText(): string {
        return this.mSpeakText;
    }


    isRunning(): boolean {
        return this.mRunningFlag;
    }

    start(): number {
        // console.log('SpeakPlugin-Objekt:', this.mPlugin);
        if ( !this.mPlugin ) {
            console.log('Error Speak.start: kein Speak-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.start( this.mSpeakText );
        return 0;
    }

    stop(): number {
        if ( !this.mPlugin ) {
            console.log('Error Speak.stop: kein Speak-Plugin vorhanden');
            return -1;
        }
        this.mPlugin.stop();
        return 0;
    }

}
