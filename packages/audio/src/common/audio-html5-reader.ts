/** @packageDocumentation
 * Diese Komponente laed eine Audiodatei und stellt die Audiodaten zur Verfuegung
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module audio/common
 * @author SB
 */


// core

import { FactoryManager } from '@lingualogic-speech/core';


// net

import { XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE } from '@lingualogic-speech/net';


// file

import { FileBrowserReader, OnFileBaseReaderReadFunc } from '@lingualogic-speech/file';


// audio

import { IAudioHtml5Reader, AUDIO_DEFAULT_FORMAT, AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT } from './audio-html5-reader.interface';
import { AudioContextManager } from './audiocontext-manager';
import { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME } from './audiocontext-factory';


/**
 * Die AudioHtml5Reader Klasse erlaubt das Einlesen von Audiodateien
 */

export class AudioHtml5Reader extends FileBrowserReader implements IAudioHtml5Reader {

    /**
     * AudioContext-Klasse aus HTML5-WebAPI
     * @member {Object} mAudioContextClass
     * @private
     */

    private mAudioContextClass: typeof AudioContext = null;

    /**
     * AudioContext fuer die Verwaltung aller Audiodaten
     * @member {Object} mAudioContext
     * @private
     */

    private mAudioContext: AudioContext = null;

    /**
     * AudioFormat MP3 oder WAV
     * @member {Object} mAudioFormat ('mp3', 'wav')
     * @private
     */

    private mAudioFormat = AUDIO_DEFAULT_FORMAT;

    /**
     * Callback-Funktion fuer AudioRead-Event
     * @member {callback} mOnAudioReadFunc
     * @private
     */

    private mOnAudioReadFunc: (aAudioData: any) => void = null;


    /**
     * Audio Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'AudioHtml5Reader' );
    }


    // Reader-Funktionen


    /**
     * Feststellen, ob HTML5 AudioContext WebAPI vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn AudioContext existiert, false sonst
     */

    protected _detectAudioContext(): boolean {
        // pruefen auf Fabrik

        const audioContextFactory = FactoryManager.get( AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory );
        if ( !audioContextFactory ) {
            this.error( '_detectAudioContext', 'keine AudioContext-Fabrik vorhanden' );
            return false;
        }

        // Audiokontext auslesen

        this.mAudioContextClass = audioContextFactory.create();
        if ( this.mAudioContextClass === null ) {
            this.error( '_detectAudioContext', 'kein AudioContext vorhanden' );
            return false;
        }

        return true;
    }


    /**
     * Initialisierung von AudioHtml5Reader. Wird der globale AudioContext uebergeben,
     * wird kein interner AudioContext erzeugt.
     *
     * @param {any} [aOption] - optionale parameter { audioContext: AudioContext, audioFormat: string }
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // pruefen auf Audio-Format

        if ( aOption && aOption.audioFormat ) {
            // hier wird das AudioFormat von aussen eingetragen
            this.setAudioFormat( aOption.audioFormat );
        }

        // pruefen auf globalen AudioContext in den Optionen

        if ( aOption && aOption.audioContext ) {
            // hier wird der globale AudioContext von aussen eingefuegt,
            // es wird kein eigerner AudioContext erzeugt.
            this.mAudioContext = aOption.audioContext;
        } else {
            // pruefen auf vorhandenen AudioContext in HTML5

            if ( !this._detectAudioContext()) {
                return -1;
            }

            // AudioContext dauerhaft erzeugen

            try {
                if ( !this.mAudioContextClass ) {
                    return -1;
                }
                // TODO: Einbau des AudioContextManagers
                // this.mAudioContext = new this.mAudioContextClass();
                this.mAudioContext = AudioContextManager.getAudioContext();
                if ( !this.mAudioContext ) {
                    return -1;
                }
                this.mAudioContext.onstatechange = () => {
                    if ( this.mAudioContext ) {
                        // console.log('AudioPlayer.init: onstatechange', this.mAudioContext.state);
                    }
                };
            } catch ( aException ) {
                this._closeAudioContext();
                this.exception( 'init', aException );
                return -1;
            }
        }

        // Weiterleitung der onReadFunc Funktion auf _decodeAudio

        this.mOnReadFunc = (aData: any) => this._decodeAudio( aData );
        return 0;
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // Freigabe des AudioContext
        this._closeAudioContext();
        this.mAudioContextClass = null;
        this.mAudioFormat = AUDIO_DEFAULT_FORMAT;
        this.mOnAudioReadFunc = null;
        return super.done();
    }


    /**
     * Freigabe des Audio-Kontextes
     *
     * @private
     */

    protected _closeAudioContext(): void {
        // Kommentar: nur wenn der AudioContext SpeechAudio gehoert,
        //      darf er auch freigegeben werden. Dies wird durch die Initialsierung
        //      von AudioContext angezeigt.

        // pruefen auf eigenen Audiokontext
        if ( this.mAudioContextClass ) {
            // Audio-Kontext muss freigegeben werden
            if ( this.mAudioContext ) {
                try {
                    // TODO: globalen AudioContext nicht mehr schliessen
                    // this.mAudioContext.close();
                } catch ( aException ) {
                    this.exception( '_closeAudioContext', aException );
                }
            }
        }
        this.mAudioContext = null;
    }


    // Audio-Funktionen


    /**
     * onRead Callback-Funktion auf AudioRead-Funktion eintragen
     *
     * @param {*} aReadFunc - Callback fuer Audiodateien geladen
     */

    set onRead( aReadFunc: OnFileBaseReaderReadFunc ) {
        this.mOnAudioReadFunc = aReadFunc;
    }


    /**
     * Rueckgabe des globalen AudioContext
     *
     * @return {AudioContext} - audioContext - globaler AudioContext
     */

    getAudioContext(): AudioContext {
        return this.mAudioContext;
    }


    /**
     * Eintragen des AudioFormats
     *
     * @param {string} aAudioFormat -audioFormat 'mp3' oder 'wav'
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFormat( aAudioFormat: string ): number {
        if ( aAudioFormat !== AUDIO_MP3_FORMAT && aAudioFormat !== AUDIO_WAV_FORMAT ) {
            this.error('setAudioFormat', 'kein gueltiges Audioformat uebergeben: ' + aAudioFormat);
            return -1;
        }
        this.mAudioFormat = aAudioFormat;
        return 0;
    }


    /**
     * Rueckgabe des eingestellten AudioFormats
     *
     * @return {string} -audioFormat 'mp3' oder 'wav'
     */

    getAudioFormat(): string {
        return this.mAudioFormat;
    }


    /**
     * Dekodieren der Audiodaten
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    protected _decodeAudio( aData: any ): number {
        // console.log('AudioPlayer._decodeAudio');
        if ( !this.mAudioContext ) {
            this.error( '_decodeAudio', 'kein AudioContext vorhanden' );
            return -1;
        }
        try {
            this.mAudioContext.decodeAudioData( aData, (aBuffer: AudioBuffer) => {
                // console.log('FileHtml5Reader._requestFile: onload');
                if ( this.mOnAudioReadFunc ) {
                    try {
                        this.mOnAudioReadFunc( aBuffer );
                    } catch (aException) {
                        this.exception( '_decodeAudio', aException );
                    }
                }
            }, (aError: any) => {
                // TODO: muss in Fehlerbehandlung uebertragen werden
                // console.log('AudioPlayer._decodeAudio:', aError);
                this.error('_decodeAudio', 'DOMException');
            });
            return 0;
        } catch (aException) {
            this.exception( '_decodeAudio', aException );
            return -1;
        }
    }


    /**
     * Einlesen einer Audio-Datei
     *
     * @param {string} aFileUrl - optionale URL fuer fuer einzulesende Datei
     * @param {string} aResponseType - optionale Angabe des XMLHttpRequest-ResponseTyps(text,arraybuffer)
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string, aResponseType = XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE ): number {
        // console.log('FileHtml5Reader.read:', aFileUrl, aResponseType);
        return super.read( aFileUrl, aResponseType );
    }

}
