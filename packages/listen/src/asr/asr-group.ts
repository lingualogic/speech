/** @packageDocumentation
 * ASRGroup definiert die Verwaltungsklasse aller ASR.
 * Hier werden die vorhandenen ASR verwaltet und es kann
 * zwischen ihnen gewechselt werden.
 *
 * Installierte ASR:
 *
 *      ASRHtml5     - Default Web-ASR
 *      ASRGoogle    - Google-Service ASR (nur mit Speech-Server)
 *      ASRMicrosoft - Google-Service ASR (nur mit Speech-Server)
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// core

import { OnSpeechInitFunc, OnSpeechErrorFunc, PluginGroup, PluginList } from '@lingualogic-speech/core';


// asr

import {
    ASR_TYPE_NAME,
    ASR_GROUP_NAME,
    ASR_HTML5_NAME,
    ASR_GOOGLE_NAME,
    ASR_MICROSOFT_NAME
} from './asr-const';
import {
    IASR,
    ASRStartListenFunc,
    ASRStopListenFunc,
    OnASRListenStartFunc,
    OnASRListenStopFunc,
    OnASRListenResultFunc,
    OnASRListenNoMatchFunc
} from './asr.interface';
import { IASROption } from './asr-option.interface';
import { ASRFactory } from './asr-factory';


/**
 * Diese Klasse ist die Verwaltungsklasse fuer alle implementierten ASR
 */

export class ASRGroup extends PluginGroup implements IASR {


    /**
     * ASR-Fabrik zur Erzeugung der einzelnen ASR
     * @type {ASRFactory}
     */

    private mASRFactory: ASRFactory = null;


    // alle inneren ASR

    private mASRList = new PluginList();
    private mASRHtml5: IASR = null;
    private mASRGoogle: IASR = null;
    private mASRMicrosoft: IASR = null;


    // aktuell genutzte ASR

    private mCurrentASR: IASR = null;


    // Event-Funktionen


    /**
     * Callback-Funktion fuer Connect-Event
     * @private
     */

    // private mOnConnectFunc: OnASRConnectFunc = null;


    /**
     * Callback-Funktion fuer Disconnect-Event
     * @private
     */
 
    // private mOnDisconnectFunc: OnASRDisconnectFunc = null;
 

    // Event-Funktionen
 
    private mOnListenStartFunc: OnASRListenStartFunc = null;
    private mOnListenStopFunc: OnASRListenStopFunc = null;
    private mOnListenResultFunc: OnASRListenResultFunc = null;
    private mOnListenInterimResultFunc: OnASRListenResultFunc = null;
    private mOnListenNoMatchFunc: OnASRListenNoMatchFunc = null;
    private mOnListenRecognitionStartFunc: OnASRListenStartFunc = null;
    private mOnListenRecognitionStopFunc: OnASRListenStopFunc = null;
    private mOnListenAudioStartFunc: OnASRListenStartFunc = null;
    private mOnListenAudioStopFunc: OnASRListenStopFunc = null;
    private mOnListenSoundStartFunc: OnASRListenStartFunc = null;
    private mOnListenSoundStopFunc: OnASRListenStopFunc = null;
    private mOnListenSpeechStartFunc: OnASRListenStartFunc = null;
    private mOnListenSpeechStopFunc: OnASRListenStopFunc = null;


    /**
     * ASRPlugin erzeugen
     *
     * @param {string} aASRName - Name der ASR-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aASRFactory: ASRFactory, aASRName?: string, aRegisterFlag = true ) {
        super( aASRName || ASR_GROUP_NAME, aRegisterFlag );
        this.mASRFactory = aASRFactory;
        // eintragen der inneren ASR-Plugins
        this._insertAllASR();
    }


    /**
     * Typ zurueckgeben
     *
     * @param {string} Name des Typs des Plugins
     */

    getType(): string {
        return ASR_TYPE_NAME;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRGroup';
    }


    // Uebergabe-Funktionen


    /**
     * CloudPort Name eintragen
     * 
     * @param aCloudPortName 
     */

    setCloudPortName( aCloudPortName: string ): void {
        // muss von erbenden Klassen ueberschrieben werden
    }

    
    getCloudPortName(): string {
        return '';
    }


    // Plugin-Funktionen


    /**
     * Einfuegen aller verfeugbaren ASR-Plugins
     */

    protected _insertAllASR(): void {
        // pruefen auf ASR-Fabrik
        if ( !this.mASRFactory ) {
            this.error( '_insertAllASR', 'keine ASR-Fabrik vorhanden' );
            return;
        }
        // eintragen der verfuegbaren ASR-Plugins
        this.insertPlugin( ASR_HTML5_NAME, this.mASRFactory.create( ASR_HTML5_NAME, ASR_HTML5_NAME, false ));
        this.insertPlugin( ASR_GOOGLE_NAME, this.mASRFactory.create( ASR_GOOGLE_NAME, ASR_GOOGLE_NAME, false ));
        this.insertPlugin( ASR_MICROSOFT_NAME, this.mASRFactory.create( ASR_MICROSOFT_NAME, ASR_MICROSOFT_NAME, false ));
    }


    /**
     * Initialisierung des HTML5-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    protected _initASRHtml5( aOption: any ): void {
        this.mASRHtml5 = this.findPlugin( ASR_HTML5_NAME ) as IASR;
        if ( this.mASRHtml5 ) {
            this.mASRHtml5.init( aOption );
            if ( this.mASRHtml5.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRHtml5: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_HTML5_NAME );
            this.mASRHtml5.done();
            this.mASRHtml5 = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRHtml5: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des GOOGLE-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    protected _initASRGoogle( aOption: any ): void {
        this.mASRGoogle = this.findPlugin( ASR_GOOGLE_NAME ) as IASR;
        if ( this.mASRGoogle ) {
            this.mASRGoogle.init( aOption );
            if ( this.mASRGoogle.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRGoogle: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_GOOGLE_NAME );
            this.mASRGoogle.done();
            this.mASRGoogle = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRGoogle: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des Microsoft-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    protected _initASRMicrosoft( aOption: any ): void {
        this.mASRMicrosoft = this.findPlugin( ASR_MICROSOFT_NAME ) as IASR;
        if ( this.mASRMicrosoft ) {
            this.mASRMicrosoft.init( aOption );
            if ( this.mASRMicrosoft.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRMicrosoft: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_MICROSOFT_NAME );
            this.mASRMicrosoft.done();
            this.mASRMicrosoft = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRMicrosoft: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung von ASRPlugin
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('ASRGroup.init:', aOption);
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this.error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // Eintragen der inneren ASR

        if ( !this.mASRFactory ) {
            this.error( 'init', 'keine ASR-Fabrik vorhanden' );
            return -1;
        }

        // pruefen auf Fehleroutput

        const option = aOption || {};
        if ( !this.isErrorOutput()) {
            option.errorOutputFlag = false;
        }

        // ASR eintragen in Reihenfolge ihrer Nutzung

        this._initASRHtml5( option );   // Default-ASR
        this._initASRGoogle( option );
        this._initASRMicrosoft( option );

        // console.log('ASRGroup.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // erste ASR einstellen als Default-ASR

        this.mCurrentASR = this.firstPlugin() as IASR;
        if ( !this.mCurrentASR ) {
            // keine ASR verfuegbar !
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.init: keine ASR verfuegbar');
            }
            // TODO: Problem an dieser Stelle, wenn ASR-Plugins dynamisch hinzugefuegt werden
            //       dann sollte Active wieder auf ON gesetzt werden. Problem wird in insertASR
            //       geloest.
            this.setActiveOff();
        }

        // ASR-Option einstellen

        if ( aOption && aOption.tts ) {
            this.setASR( aOption.tts );
        }

        return 0;
    }


    /**
     * Freigabe von ASR
     */

    done(): number {
        this.mASRHtml5 = null;
        this.mASRGoogle = null;
        this.mASRMicrosoft = null;
        this.mCurrentASR = null;
        // this.mOnConnectFunc = null;
        // this.mOnDisconnectFunc = null;
        this.mOnListenStartFunc = null;
        this.mOnListenStopFunc = null;
        this.mOnListenResultFunc = null;
        this.mOnListenInterimResultFunc = null;
        this.mOnListenNoMatchFunc = null;
        this.mOnListenRecognitionStartFunc = null;
        this.mOnListenRecognitionStopFunc = null;
        this.mOnListenAudioStartFunc = null;
        this.mOnListenAudioStopFunc = null;
        this.mOnListenSoundStartFunc = null;
        this.mOnListenSoundStopFunc = null;
        this.mOnListenSpeechStartFunc = null;
        this.mOnListenSpeechStopFunc = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn eine ASR
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene ASR
        if ( !this.mCurrentASR ) {
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.isActive: keine ASR eingestellt');
            }
            return false;
        }
        if ( !this.mCurrentASR.isActive()) {
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.isActive: ASR ist nicht aktiv ', this.mCurrentASR.getName());
            }
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
        // pruefen auf vorhandene ASR
        if ( !this.mCurrentASR ) {
            return -1;
        }
        if ( !this.mCurrentASR.isActive()) {
            return -1;
        }
        return super.setActiveOn();
    }


    // Event-Funktionen


    /**
     * Init-Ereignis Funktion eintragen
     *
     * @param {OnSpeechInitFunc} aOnInitFunc - Callback-Funktion fuer Initereignis
     */

    set onInit( aOnInitFunc: OnSpeechInitFunc ) {
        // console.log('ASRGroup.onInit:', aOnInitFunc );
        this.mOnInitFunc = aOnInitFunc;
        let asr = this.firstPlugin() as IASR;
        // console.log('ASRGroup.onInit: asr = ', asr);
        while ( asr ) {
            // console.log('ASRGroup.onInit:', asr.getName());
            asr.onInit = aOnInitFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenStartFunc - Callback-Funktion fuer Startereignis
     */

    set onListenStart( aOnListenStartFunc: OnASRListenStartFunc ) {
        this.mOnListenStartFunc = aOnListenStartFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenStart = aOnListenStartFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenStopFunc - Callback-Funktion fuer Stopereignis
     */

    set onListenStop( aOnListenStopFunc: OnASRListenStopFunc ) {
        this.mOnListenStopFunc = aOnListenStopFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenStop = aOnListenStopFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Spracheingabe Ergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnASRListenResultFunc} aOnListenResultFunc - Callback fuer Result Ergebnis
     */

    set onListenResult( aOnListenResultFunc: OnASRListenResultFunc ) {
        this.mOnListenResultFunc = aOnListenResultFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            // console.log('ASRGroup._onListenResult: asr = ', asr.getName());
            asr.onListenResult = aOnListenResultFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Spracheingabe Zwischenergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnASRListenResultFunc} aOnListenInterimResultFunc - Callback fuer Result Ergebnis
     */

    set onListenInterimResult( aOnListenInterimResultFunc: OnASRListenResultFunc ) {
        this.mOnListenInterimResultFunc = aOnListenInterimResultFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenInterimResult = aOnListenInterimResultFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenStartFunc - Callback-Funktion fuer Startereignis
     */

    set onListenNoMatch( aOnListenNoMatchFunc: OnASRListenNoMatchFunc ) {
        this.mOnListenNoMatchFunc = aOnListenNoMatchFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenNoMatch = aOnListenNoMatchFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Recognition Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenRecognitionStartFunc - Callback-Funktion fuer Recognition Startereignis
     */

    set onListenRecognitionStart( aOnListenRecognitionStartFunc: OnASRListenStartFunc ) {
        this.mOnListenRecognitionStartFunc = aOnListenRecognitionStartFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenRecognitionStart = aOnListenRecognitionStartFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Recognition Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenRecognitionStopFunc - Callback-Funktion fuer Recognition Stopereignis
     */

    set onListenRecognitionStop( aOnListenRecognitionStopFunc: OnASRListenStopFunc ) {
        this.mOnListenRecognitionStopFunc = aOnListenRecognitionStopFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenRecognitionStop = aOnListenRecognitionStopFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Audio Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenAudioStartFunc - Callback-Funktion fuer Audio Startereignis
     */

    set onListenAudioStart( aOnListenAudioStartFunc: OnASRListenStartFunc ) {
        // console.log('ASRGroup.onListenAudioStart:', aOnListenAudioStartFunc);
        this.mOnListenAudioStartFunc = aOnListenAudioStartFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenAudioStart = aOnListenAudioStartFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Audio Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenAudioStopFunc - Callback-Funktion fuer Audio Stopereignis
     */

    set onListenAudioStop( aOnListenAudioStopFunc: OnASRListenStopFunc ) {
        // console.log('ASRGroup.onListenAudioStop:', aOnListenAudioStopFunc);
        this.mOnListenAudioStopFunc = aOnListenAudioStopFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenAudioStop = aOnListenAudioStopFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Sound Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenSoundStartFunc - Callback-Funktion fuer Sound Startereignis
     */

    set onListenSoundStart( aOnListenSoundStartFunc: OnASRListenStartFunc ) {
        this.mOnListenSoundStartFunc = aOnListenSoundStartFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenSoundStart = aOnListenSoundStartFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Sound Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenSoundStopFunc - Callback-Funktion fuer Sound Stopereignis
     */

    set onListenSoundStop( aOnListenSoundStopFunc: OnASRListenStopFunc ) {
        this.mOnListenSoundStopFunc = aOnListenSoundStopFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenSoundStop = aOnListenSoundStopFunc;
            asr = this.nextPlugin() as IASR;
        }
    }

    /**
     * Speech Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenSpeechStartFunc - Callback-Funktion fuer Speech Startereignis
     */

    set onListenSpeechStart( aOnListenSpeechStartFunc: OnASRListenStartFunc ) {
        this.mOnListenSpeechStartFunc = aOnListenSpeechStartFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenSpeechStart = aOnListenSpeechStartFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Speech Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenSpeechStopFunc - Callback-Funktion fuer Speech Stopereignis
     */

    set onListenSpeechStop( aOnListenSpeechStopFunc: OnASRListenStopFunc ) {
        this.mOnListenSpeechStopFunc = aOnListenSpeechStopFunc;
        let asr = this.firstPlugin() as IASR;
        while ( asr ) {
            asr.onListenSpeechStop = aOnListenSpeechStopFunc;
            asr = this.nextPlugin() as IASR;
        }
    }


    /**
     * Fehler-Ereignis Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnSpeechErrorFunc - Callback-Funktion fuer Fehler-Ereignis
     */

    set onError( aOnErrorFunc: OnSpeechErrorFunc ) {
        // console.log('ASRGroup.onError: start', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
        // Schleife fuer alle Plugins
        let asr = this.firstPlugin() as IASR;
        // console.log('ASRGroup.onError: first asr = ', asr);
        while ( asr ) {
            asr.onError = aOnErrorFunc;
            asr = this.nextPlugin() as IASR;
            // console.log('ASRGroup.onError: next asr = ', asr);
        }
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     *
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        if ( this.mCurrentASR ) {
            return true;
        }
        return false;
    }


    /**
     * Einfuegen einer ASR
     *
     * @param aASRName - individueller ASR-Name
     * @param aASRClass - Klassenname der ASR
     * @param aOption - optionale Parameter zur Initialisierung der ASR
     */

     insertASR( aASRName: string, aASRClass: string, aOption: IASROption ): number {
        // pruefen auf vorhandenes Plugin
        if ( this.findPlugin( aASRName )) {
            return 0;
        }
        // Plugin eintragen
        // TODO: Untersuchen, warum ich hier RegisterFlag = false gemacht habe
        if ( this.insertPlugin( aASRName, this.mASRFactory.create( aASRName, aASRClass, false )) !== 0 ) {
            return -1;
        }
        // Plugin initialisieren
        const asrPlugin = this.findPlugin( aASRName ) as IASR;
        // console.log('ASRGroup.insertASR: asr = ', asrPlugin);
        if ( asrPlugin ) {
            asrPlugin.init( aOption );
            if ( asrPlugin.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup.insertASR: ASR eingefuegt ', aASRName, aASRClass);
                }
                // console.log('ASRGroup._insertASR: resultFunc = ', this.mOnListenResultFunc);
                // console.log('ASRGroup._insertASR: listenAudioStartFunc = ', this.mOnListenAudioStartFunc);
                // console.log('ASRGroup._insertASR: listenAudioStopFunc = ', this.mOnListenAudioStopFunc);
                // Funktionen verbinden
                asrPlugin.onInit = this.mOnInitFunc;
                asrPlugin.onListenStart = this.mOnListenStartFunc;
                asrPlugin.onListenStop = this.mOnListenStopFunc;
                asrPlugin.onListenRecognitionStart = this.mOnListenRecognitionStartFunc;
                asrPlugin.onListenRecognitionStop = this.mOnListenRecognitionStopFunc;
                asrPlugin.onListenAudioStart = this.mOnListenAudioStartFunc;
                asrPlugin.onListenAudioStop = this.mOnListenAudioStopFunc;
                asrPlugin.onListenSoundStart = this.mOnListenSoundStartFunc;
                asrPlugin.onListenSoundStop = this.mOnListenSoundStopFunc;
                asrPlugin.onListenSpeechStart = this.mOnListenSpeechStartFunc;
                asrPlugin.onListenSpeechStop = this.mOnListenSpeechStopFunc;
                asrPlugin.onListenResult = this.mOnListenResultFunc;
                asrPlugin.onListenInterimResult = this.mOnListenInterimResultFunc;
                asrPlugin.onListenNoMatch = this.mOnListenNoMatchFunc;
                asrPlugin.onError = this.mOnErrorFunc;
                // ASR eintragen
                let result = this.mASRList.insert( aASRName, asrPlugin );
                // falls es sich um die erste ASR handelt, die dynamisch eingefuegt wird,
                // muss geprueft werden ob Active auf OFF gesetzt war und keine CurrentASR
                // gesetzt ist
                if ( this.getASR() === '' ) {
                    // console.log('ASRGroup.insertASR: getASR = ""');
                    if ( this.setASR( aASRName ) === 0 ) {
                        result = this.setActiveOn();
                        // console.log('ASRGroup.insertASR: setActiveOn ', result);
                    }
                }
                return result;
            }
            this.removePlugin( aASRName );
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup.insertASR: ASR nicht eingefuegt ', aASRName, aASRClass);
        }
        return -1;
    }


    /**
     * Einfuegen einer ASR
     *
     * @param aASRName - individueller ASR-Name
     */

    removeASR( aASRName: string ): number {
        // Plugin initialisieren
        const asrPlugin = this.mASRList.find( aASRName );
        if ( asrPlugin ) {
            this.mASRList.remove( aASRName );
            return this.removePlugin( aASRName );
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup.removeASR: ASR nicht vorhanden');
        }
        return -1;
    }


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        // console.log( 'ASRGroup.setASR:', aASRName );
        let asr = null;
        switch ( aASRName ) {

            case ASR_HTML5_NAME:
                // console.log( 'ASRGroup.setASR: HTML5', this.mASRHtml5);
                asr = this.mASRHtml5;
                break;

            case ASR_GOOGLE_NAME:
                // console.log( 'ASRGroup.setASR: Google', this.mASRGoogle);
                asr = this.mASRGoogle;
                break;

            case ASR_MICROSOFT_NAME:
                // console.log( 'ASRGroup.setASR: Microsoft', this.mASRMicrosoft);
                asr = this.mASRMicrosoft;
                break;

            default:
                // individuelle ASRs suchen
                asr = this.mASRList.find( aASRName );
                break;
        }

        // pruefen auf gefundene ASR

        if ( !asr ) {
            this.error( 'setASR', 'Keine ASR vorhanden' );
            return -1;
        }

        // neue ASR eintragen

        this.mCurrentASR = asr;
        return 0;
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        if ( !this.mCurrentASR ) {
            return '';
        }
        return this.mCurrentASR.getName();
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
        return this.getPluginNameList();
    }


    // Language-Funktionen


    /**
     * Traegt eine neue Sprache ein
     *
     * @param {string} aLanguage - de oder en
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        // console.log('ASRGroup.setLanguage', this.getASR(), this.getASRList());
        let result = 0;
        let asr = this.firstPlugin() as IASR;
        // pruefen, ob eine ASR vorhanden ist
        if ( !asr ) {
            this.error( 'setLanguage', 'Keine ASR vorhanden' );
            return -1;
        }
        while ( asr ) {
            // console.log('ASRGroup.setLanguage: ', asr.getASR(), aLanguage);
            if ( asr.setLanguage( aLanguage ) !== 0 ) {
                result = -1;
            }
            asr = this.nextPlugin() as IASR;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        // console.log('ASRGroup.getLanguage:', this.mCurrentASR );
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getLanguage();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getLanguageList();
        }
        return [];
    }


    // Modus-Funktionen


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    isMode( aMode: string ): boolean {
        // console.log('ASRGroup.isMode:', this.mCurrentASR, aMode );
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isMode( aMode );
        }
        return false;
    }


    /**
     * pruefen, ob der Eingabemode Command eingestellt ist
     * Dann kurzen Text nicht laenger als 30 Sekunden von der Spracherkennung zu verarbeiten
     *
     * @return {boolean} True, wenn Eingabemode Command eingestellt ist
     */

    isCommandMode(): boolean {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isCommandMode();
        }
        return false;
    }


    /**
     * pruefen, ob der Eingabemode Dictate eingestellt ist
     * Dann kontinuierlich Text von der Spracherkennung zu verarbeiten
     *
     * @return {boolean} True, wenn Eingabemode Dictate eingestellt ist
     */

    isDictateMode(): boolean {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isDictateMode();
        }
        return false;
    }


    /**
     * Traegt eine neue Eingabemodus fuer die Spracherkennung ein
     *
     * @param {string} aMode - Command oder Dictate
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number {
        // console.log('ASRGroup.setMode:', aMode );
        if ( !aMode ) {
            this.error( 'setMode', 'Kein Eingabemodus uebergeben' );
            return -1;
        }
        let result = 0;
        let asr = this.firstPlugin() as IASR;
        // pruefen, ob eine ASR vorhanden ist
        if ( !asr ) {
            this.error( 'setMode', 'Keine ASR vorhanden' );
            return -1;
        }
        while ( asr ) {
            // console.log('ASRGroup.setMode: ', asr.getASR(), aMode, asr.isMode( aMode ));
            if ( asr.isMode( aMode )) {
                // console.log('ASRGroup.setMode: ', asr.getASR(), aMode);
                if ( asr.setMode( aMode ) !== 0 ) {
                    result = -1;
                }
            }
            asr = this.nextPlugin() as IASR;
        }
        return result;
    }


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    getMode(): string {
        // console.log('ASRGroup.getMode:', this.mCurrentASR );
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getMode();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Eingabemodi fuer die Spracherkennung
     *
     * @return {Array<string>} Liste der Eingabemodi
     */

    getModeList(): Array<string> {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getModeList();
        }
        return [];
    }


    // Listen-Funktionen


    /**
     * Prueft, ob die Spracheingabe gerade laeuft
     *
     * @return {boolean} True, wenn Spracheingabe laeuft, False sonst
     */

    isListenRunning() {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isListenRunning();
        }
        return false;
    }


    /**
     * Timout in Millisekunden setzen. Der Timeout begrenzt die Zeit,
     * die auf Listen gewartet wird, wenn listen nicht starten kann.
     *
     * @param {number} aTimeout
     */

    setListenTimeout( aTimeout: number ): void {
        if ( this.mCurrentASR ) {
            this.mCurrentASR.setListenTimeout( aTimeout );
        }
    }


    /**
     * Spracherkennung starten
     *
     * @return {number} errorcode(0,-1)
     */

    startListen(): number {
        // console.log('ASRGroup.startListen:', this.getASR(), this.getASRList());
        // pruefen auf vorhandene ASR
        if ( !this.mCurrentASR ) {
            this.error( 'startListen', 'keine ASR vorhanden' );
            return -1;
        }
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.startListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.startListen();
    }


    /**
     * Rueckgabe der Start-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {ASRStartListenFunc} Instanz der Start-Funktion
     */

    getStartListenFunc(): ASRStartListenFunc {
        return () => this.startListen();
    }


    /**
     * Spracherkennung beenden
     *
     * @return {number} errorcode(0,-1)
     */

    stopListen(): number {
        // console.log('ASRGroup.stopListen: start');
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            // console.log('ASRGroup.stopListen: no Active');
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.stopListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        if ( !this.mCurrentASR ) {
            console.log('ASRGroup.stopListen: no currentASR');
            return -1;
        }
        return this.mCurrentASR.stopListen();
    }


    /**
     * Rueckgabe der Stop-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {ASRStopListenFunc} Instanz der Stop-Funktion
     */

    getStopListenFunc(): ASRStopListenFunc {
        return () => this.stopListen();
    }


    /**
     * Spracheingabe beenden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    abortListen(): number {
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.abortListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.abortListen();
    }


    /**
     * Rueckgabe der Abort-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {ASRStopListenFunc} Instanz der Abort-Funktion
     */

    getAbortListenFunc(): ASRStopListenFunc {
        return () => this.abortListen();
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
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.abortListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.test( aTestCommand, aTestData );
    }


}
