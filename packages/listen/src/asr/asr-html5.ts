/** @packageDocumentation
 * Diese Komponente dient der Spracherkennung mit Hilfe von SpeechRecognition aus HTML5
 * Funktioniert zur Zeit nur in Chrome. Ist Speech-Recognition nicht vorhanden, wird
 * die Komponente in Active Off versetzt.
 *
 * Letzte Aenderung: 15.02.2022
 * Status: gelb
 *
 * @module listen/asr
 * @author SB
 *
 * Kommentare:
 *
 *      - unter Cordova/Android funktioniert onstart nicht so, wie erwartet, onstart wird erst erzeugt, wenn mit sprechen begonnen wird.
 *        Dadurch wird der breakTimeout ausgeloest, welcher hier eigentlich nicht ausgeloest werden sollte, da eine ASR vorhanden ist.
 *        Ich habe jetzt als Workaround die breakTimeout Zeit auf 5 sekunden erhoeht, auch wenn das in Opera dann zu einer Verzoegerung
 *        der Fehlermeldung auf felhenden ASR-Dienst fuehrt.
 *        Der Fehler liegt wahrscheinlich an dem SpeechRecognition-Plugin, welches ich noch korrigieren muss.
 */


// core

import { FactoryManager } from '@lingualogic-speech/core';


// listen

import { SPEECHRECOGNITION_FACTORY_NAME, SpeechRecognitionFactory } from './../common/speechrecognition-factory';


// asr

import { ASR_HTML5_NAME, ASR_COMMAND_MODE, ASR_DICTATE_MODE } from './asr-const';
import { ASRPlugin} from './asr-plugin';


// Konstanten

const ASR_BREAK_TIMEOUT = 5000;     // warten auf Recognition-Start


// TODO: Eine Grammatik ist im Moment noch nicht implementiert

// Grammatik-Werte

const colors = ['rot', 'blau', 'grün', 'gelb', 'schwarz', 'weiss', 'braun'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';


/**
 * Diese Klasse kapselt die HTML5-Spracheingabe
 */

export class ASRHtml5 extends ASRPlugin {

    /**
     * Fabrik zur Erzeugung der Spracheingabeobjekte
     * @member {SpeechRecognitionFactory} mRecognitionFactory
     * @private
     */

    private mRecognitionFactory: SpeechRecognitionFactory = null;


    /**
     * SpeechRecognition-Klasse
     * @member {SpeechRecognition} mRecognitionClass
     * @private
     */

    private mRecognitionClass: any = null;


    /**
     * SpeechGrammarList-Klasse (optional)
     * @member {SpeechGrammarList} mGrammarListClass
     * @private
     */

    private mGrammarListClass: any = null;


    // Recognition-Attribute


    /**
     * Spracherkennung Grammatikliste
     * @member {SpeechGrammarList} mGrammarList
     * @private
     */

    private mGrammarList: any = null;


    /**
     * Spracherkennung HTML5
     * @member {SpeechRecognition} mRecognition
     * @private
     */

    private mRecognition: any = null;


    /**
     * Timeout fuer fehlende Spracherkennung
     */

    private mBreakTimeout = 0;


    /**
     * ASRHtml5 Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_HTML5_NAME, aRegisterFlag );
        // console.log('ASRHtml5:', aSpeechRecognitionFactory, aPluginName, aRegisterFlag);
        // TODO: muss eventuell nach init verschoben werden
        this.mRecognitionFactory = FactoryManager.get( SPEECHRECOGNITION_FACTORY_NAME, SpeechRecognitionFactory ) as SpeechRecognitionFactory;
        this.mRecognitionFactory.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRHtml5';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // Timeout loeschen
        this._clearBreakTimeout();
        // pruefen auf laufende Spracheingabe
        if ( this.isListenRunning() && this.mRecognition ) {
            try {
                // Spracheingabe abbrechen
                this.mRecognition.abort();
            } catch ( aException ) {
                this.exception( 'done', aException );
            }
        }
        this.mRecognitionClass = null;
        this.mGrammarListClass = null;
        this.mGrammarList = null;
        this.mRecognition = null;
        return super.done();
    }


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        if ( this.mRecognitionFactory ) {
            this.mRecognitionFactory.setErrorOutput( aErrorOutputFlag );
        }
        super.setErrorOutput( aErrorOutputFlag );
    }


    // Timeout-Funktionen


    protected _breakRecognition(): void {
        // console.log('ASRhtml5._beakRecognition: Start Timeout');
        this.mBreakTimeout = 0;
        this.error( '_breakRecognition', 'Kein SpeechRecognition-Service vorhanden' );
        this.abortListen();
    }


    protected _setBreakTimeout(): void {
        this.mBreakTimeout = window.setTimeout(() => this._breakRecognition(), ASR_BREAK_TIMEOUT );
        // console.log('ASRHtml5._setBreakTimeout:', this.mBreakTimeout);
    }


    protected _clearBreakTimeout(): void {
        // console.log('ASRHtml5._clearBreakTimeout:', this.mBreakTimeout);
        if ( this.mBreakTimeout > 0 ) {
            clearTimeout( this.mBreakTimeout );
            this.mBreakTimeout = 0;
        }
    }

    // Mode-Funktionen


    /**
     * pruefen auf vorhandenen Eingabemode
     *
     * @param {string} aMode - Command oder Dictate
     *
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isMode( aMode: string ): boolean {
        if ( aMode === ASR_DICTATE_MODE ) {
            return true;
        }
        return super.isMode( aMode );
    }


    /**
     * Rueckgabe aller vorhandenen Eingabemodi fuer die Spracherkennung
     *
     * @return {Array<string>} Liste der Eingabemodi
     */

    getModeList(): Array<string> {
        return [ ASR_COMMAND_MODE, ASR_DICTATE_MODE ];
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob HTML5 SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
     */

    protected _detectRecognition(): boolean {
        // pruefen auf Fabrik

        if ( !this.mRecognitionFactory ) {
            this.error( '_detectRecognition', 'keine Recognition-Fabrik vorhanden' );
            return false;
        }

        // auslesen der SpeechRecognition-Klassen, wenn vorhanden

        try {
            this.mRecognitionClass = this.mRecognitionFactory.getSpeechRecognitionClass();
            // this.mGrammarListClass = this.mRecognitionFactory.getSpeechGrammarListClass();
        } catch (aException) {
            this.exception( '_detectRecognition', aException );
            return false;
        }

        // pruefen auf vorhandene Spracherkennung in HTML5

        if ( this.mRecognitionClass === null ) {
            this.error( '_detectRecognition', 'Kein HTML5 SpeechRecognition API vorhanden' );
            return false;
        }

        /****
        if ( this.mGrammarListClass === null ) {
            this.error( '_detectRecognition', 'Kein HTML5 SpeechGrammarList API vorhanden' );
            return false;
        }
        ****/

        return true;
    }


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _initRecognition( aOption?: any ): number {
        // Grammatik eintragen

        // TODO: Grammatik ist noch nicht eingebaut
        /****
        try {
            this.mGrammarList = new this.mGrammarListClass();
            this.mGrammarList.addFromString( grammar, 1 );
        } catch ( aException ) {
            // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
            //       die Komponente aber auf Active Off gesetzt
            this.setActiveOff();
            this.exception( 'init', aException );
            return -1;
        }
        ****/

        // Recognition eintragen

        try {
            this.mRecognition = new this.mRecognitionClass();
            // Hier erfolgen die Einstellungen fuer die Recognition
            this.mRecognition.lang = this._getASRLanguage();
            this.mRecognition.continuous = false;             // kein kontinuierliches sprechen
            this.mRecognition.interimResults = false;         // keine Zwischenergebnisse
            this.mRecognition.maxAlternatives = 1;            // nur eine Alternative zurueckgeben
            // TODO: Eine Grammatik ist im Moment nicht implementiert
            // this.mRecognition.grammar = this.mGrammarList;

            // Recognition-Ereignisfunktionen eintragen

            this.mRecognition.onstart = () => {
                console.log('ASRHtml5.onstart');
                this._clearBreakTimeout();
                this._onRecognitionStart();
            };
            this.mRecognition.onend = () => {
                console.log('ASRHtml5.onend');
                this._onRecognitionEnd();
            }
            this.mRecognition.onaudiostart = () => this._onRecognitionAudioStart();
            this.mRecognition.onaudioend = () => this._onRecognitionAudioEnd();
            this.mRecognition.onsoundstart = () => {
                console.log('ASRHtml5.onsoundstart');
                this._onRecognitionSoundStart();
            }
            this.mRecognition.msoundend = () => {
                console.log('ASRHtml5.onsoundstop');
                this._onRecognitionSoundEnd();
            }
            this.mRecognition.onspeechstart = () => {
                console.log('ASRHtml5.onspeechstart');
                this._clearBreakTimeout();
                this._onRecognitionSpeechStart();
            };
            this.mRecognition.onspeechend = () => {
                console.log('ASRHtml5.onspeechstop');
                this._onRecognitionSpeechEnd();
            }
            this.mRecognition.onresult = (aEvent: any) => {
                console.log('ASRHtml5.onresult:', aEvent);
                this._onRecognitionResult( aEvent );
            };
            this.mRecognition.onnomatch = (aEvent: any) => {
                console.log('ASRHtml5.onnomatch');
                this._onRecognitionNoMatch( aEvent );
            }
            this.mRecognition.onerror = (aEvent: any) => {
                console.log('ASRHtml5.onerror:', aEvent);
                this._clearBreakTimeout();
                this._onRecognitionError( aEvent );
            };
            return 0;
        } catch ( aException ) {
            this.exception( '_initRecognition', aException );
            return -1;
        }
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    protected _isRecognition(): boolean {
        if ( this.mRecognition ) {
            return true;
        }
        return false;
    }


    /**
     * prueft, ob die Recognition laeuft
     */

    protected _isRecognitionRunning(): boolean {
        if ( this.mRecognition ) {
            return true;
        }
        return false;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    protected _getRecognitionResult( aEvent: any ): any {
        // console.log('ARSHtml5._getRecognitionResult:', aEvent.results);

        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt

        if ( !aEvent.results ) {
            return '';
        }

        // letzten Text holen

        // TODO: fuer Zwischenergebnisse muss der Code komplett ueberarbeitet werden
        //       das Cordova-Plugin Speech-Recognition muss ebenfalls angepasst werden
        /*
        try {
            const pos = aEvent.results.length - 1;
            let resultText = aEvent.results[ pos ][ 0 ].transcript;

            // Schleife fuer alle nicht finalen Texte

            let text = '';
            for ( const result of aEvent.results ) {
                if ( !result.isFinal ) {
                    text += result[ 0 ].transcript;
                }
            }
            if ( text ) {
                resultText = text;
            }

            // TODO: alte Version mit einem Ergebnis im Command-Mode
            // return aEvent.results[0][0].transcript;

            console.log('ASRHtml5._getRecognitionResult:', resultText);
            return resultText;
        } catch ( aException ) {
            this.exception( '_getRecognitionResult', aException );
            return '';
        }
        */

        // Work-Around Code
        try {
            const resultText = aEvent.results[ 0 ][ 0 ].transcript;

            // TODO: alte Version mit einem Ergebnis im Command-Mode
            // return aEvent.results[0][0].transcript;

            // console.log('ASRHtml5._getRecognitionResult:', resultText);
            return resultText;
        } catch ( aException ) {
            console.log('ASRHtml5._getRecognitionResult: Exception', aException);
            this.exception( '_getRecognitionResult', aException );
            return '';
        }

    }


    /**
     * prueft, ob es sich um das finale Result handelt
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     *
     * @return {boolean} Rueckgabe von True, wenn Result final ist, False ansonsten
     */

    protected _isRecognitionFinalResult( aEvent: any ): boolean {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // muss von erbenden Klassen ueberschrieben werden
        if ( !aEvent.results ) {
            return true;
        }

        /* TODO: muss fuer Dictat ueberarbeitet werden
        try {
            const pos = aEvent.results.length - 1;
            // wenn isFinal nicht exisitert wird finales Result angenommen
            console.log('ASRHtml5._isRecognitionFinalResult:', pos, aEvent.results[ pos ].isFinal);
            if ( typeof aEvent.results[ pos ].isFinal !== 'boolean' ) {
                return true;
            }
            return aEvent.results[ pos ].isFinal;
        } catch ( aException ) {
            this.exception( '_getRecognitionFinalResult', aException );
            return false;
        }
        */

        // TODO: es wird angenommen, dass das Ergebnis immer final ist

        return true;
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    protected _startRecognition(): number {
        // console.log('ASRHtml5._startRecognition');
        if ( this.mRecognition ) {
            this._setBreakTimeout();
            this.mRecognition.lang = this._getASRLanguage();
            // pruefen auf Diktiermodus, dann kontinuierliches Sprechen und Zwischenergebnisse erlauben
            if ( this.isDictateMode()) {
                // console.log('ASRHtml._startRecognition: Dictate Mode');
                this.mRecognition.continuous = true;
                this.mRecognition.interimResults = true;
            } else {
                // console.log('ASRHtml._startRecognition: Command Mode');
                this.mRecognition.continuous = false;
                this.mRecognition.interimResults = false;
            }
            this.mRecognition.abort();
            this.mRecognition.start();
            return 0;
        }
        return -1;
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _stopRecognition(): number {
        // console.log('ASRHtml5._stopRecognition');
        if ( this.mRecognition ) {
            this._clearBreakTimeout();
            this.mRecognition.stop();
            return 0;
        }
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    protected _abortRecognition(): number {
        if ( this.mRecognition ) {
            this._clearBreakTimeout();
            this.mRecognition.abort();
            return 0;
        }
        return -1;
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
        let sayText = '';
        let result = -1;
        let errorText = '';
        switch ( aTestCommand ) {
            /*
             * say-Kommando dient zum Ausfuehren von say() auf dem Corti-Mock, um SpeechRecognition zu simulieren
             */
            case 'say':
                // Text fuer Test auslesen
                if ( aTestData && aTestData.sayText ) {
                    sayText = aTestData.sayText;
                }
                // Kommando nur im Corti-Mock ausfuehren
                if ( this.mRecognition && typeof this.mRecognition.say === 'function' ) {
                    // console.log('ASRHtml5.test: say = ', sayText);
                    this.mRecognition.say( sayText );
                    result = 0;
                } else {
                    errorText = 'Kein Corti-Mock von SpeechRecognition vorhanden';
                }
                break;

            default:
                errorText = 'kein gueltiges Testkommando uebergeben';
                break;
        }
        return { result, errorText };
    }

}
