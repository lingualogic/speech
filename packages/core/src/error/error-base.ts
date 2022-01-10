/** @packageDocumentation
 * Grundlegende Fehlerbehandlung
 *
 * Letzte Aenderung: 02.06.2021
 * Status: gruen
 *
 * @module core/error
 * @author SB
 */


// global

import { SPEECH_ERROR_OUTPUT } from '../const/speech-api-const';
import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { IErrorBase } from './error-base.interface';
export { IErrorBase };


/** @export
 * Basisklasse fuer die Fehlerbehandlung in allen anderen Klassen
 */

export class ErrorBase implements IErrorBase {

    /**
     * statischer Klassenname fuer die Ausgabe des Fehlers
     */

    private mErrorClassName = 'ErrorBase';


    /**
     * Fehlerausgabeflag zur Bestimmung, ob ein Fehler auf der Konsole
     * ausgegeben wird.
     * Der Defaultwert ist in SPEECH_ERROR_OUTPUT festgelegt.
     */

    private mErrorOutputFlag = SPEECH_ERROR_OUTPUT;


    /**
     * Rueckgabe des Fehlertextes, wenn error oder exception aufgerufen wurde
     *
     * errorCallbackFunc( aErrorText: string )
     */

    mErrorOutputFunc: SpeechErrorFunc = null;


    /**
     * Erzeugt eine Instanz von ErrorBase
     *
     * @param aClassName - statischer Klassenname fuer die Fehlerbehandlung
     */

    constructor( aClassName: string ) {
        this.mErrorClassName = aClassName;
    }


    // Fehler-Funktionen


    /**
     * setzen eines statischen Klassennamens fuer die Fehlerausgabe
     *
     * @protected
     * @param {string} aClassName - Name der Klasse
     */


    protected _setErrorClassName( aClassName: string ): void {
        this.mErrorClassName = aClassName;
    }


    /**
     * Rueckgage des eingetragenen statischen Klassennamens
     *
     * @protected
     * @return {string} statischer Klassenname fuer die Fehlerausgabe
     */

    protected _getErrorClassName(): string {
        return this.mErrorClassName;
    }


    /**
     * setzen des Fehlerausgabeflags
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - Fehlerausgabeflag
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        this.mErrorOutputFlag = aErrorOutputFlag;
    }


    /**
     * setzt die Fehlerausgabewieder auf Defaultwert SPEECH_ERROR_OUTPUT
     */

    setErrorOutputDefault(): void {
        this.setErrorOutput( SPEECH_ERROR_OUTPUT );
    }


    /**
     * Eintragen einer Fehlerfunktion fuer den Fehler, wenn error
     * oder exception aufgerufen wurden. Es wird ein Fehlertext uebergeben.
     *
     * @param {SpeechErrorFunc} aErrorFunc - Funktion fuer die Fehlerbehandlung
     */

    setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        this.mErrorOutputFunc = aErrorFunc;
    }


    /**
     * Fehlerausgabe in Abhaengigkeit vom eingestellten ErrorOutput Flag
     *
     * @param {string} aFuncName - Name der Funktion, in der der Fehler auftrat
     * @param {string} aErrorText - Fehlertext fuer Ausgabe
     */

    error( aFuncName: string, aErrorText: string ): void {
        // pruefen auf Konsolenausgabe
        if ( this.mErrorOutputFlag ) {
            console.log('===> ERROR ', this.mErrorClassName + '.' + aFuncName + ':', aErrorText);
        }
        // rueckgabe des Fehlertextes, wenn error aufgerufen wurde
        if ( typeof this.mErrorOutputFunc === 'function' ) {
            try {
                this.mErrorOutputFunc( this.mErrorClassName + '.' + aFuncName + ': ' + aErrorText );
            } catch ( aException ) {
                console.log('ErrorBase.error: Exception ', aException.message);
            }
        }
    }


    /**
     * Exceptionausgabe, ist nicht in IPlugin vorhanden,
     * da es nur intern verwendet wird. Versendet einen ErrorEvent
     *
     * @param {string} aFuncName - Name der Funktion, in der der Fehler auftrat
     * @param {Exception} aException - Exceptionobjekt
     */

    exception( aFuncName: string, aException: any ): void {
        if ( this.mErrorOutputFlag ) {
            console.log('===> EXCEPTION ', this.mErrorClassName + '.' + aFuncName + ':', aException.message);
        }
        // rueckgabe des Fehlertextes, wenn exception aufgerufen wurde
        if ( typeof this.mErrorOutputFunc === 'function' ) {
            try {
                this.mErrorOutputFunc( 'EXCEPTION ' + this.mErrorClassName + '.' + aFuncName + ': ' + aException.message );
            } catch ( aFailException ) {
                console.log('ErrorBase.exception: Exception ', aFailException.message);
            }
        }
    }


    // oeffentliche Fehlerfunktionen


    /**
     * Pruefen auf Fehlerausgabe ueber die Konsole
     *
     * @returns {boolean}
     */

    isErrorOutput(): boolean {
        return this.mErrorOutputFlag;
    }

    
    /**
     * Einschalten der Fehlerausgabe ueber die Konsole
     */

    setErrorOutputOn(): void {
        this.setErrorOutput( true );
    }


    /**
     * Ausschalten der Fehlerausgabe ueber die Konsole
     */

    setErrorOutputOff(): void {
        this.setErrorOutput( false );
    }

}
