/** @packageDocumentation
 * Grundlegende Fehlerbehandlung API
 *
 * Letzte Aenderung: 02.07.2021
 * Status: gruen
 *
 * @module core/error
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


/** @export
 * Basisklasse fuer die Fehlerbehandlung in allen anderen Klassen
 */

export interface IErrorBase {


    // Fehler-Funktionen


    /**
     * setzen des Fehlerausgabeflags
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - Fehlerausgabeflag
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void;


    /**
     * setzt die Fehlerausgabewieder auf Defaultwert SPEECH_ERROR_OUTPUT
     */

    setErrorOutputDefault(): void;


    /**
     * Eintragen einer Fehlerfunktion fuer den Fehler, wenn error
     * oder exception aufgerufen wurden. Es wird ein Fehlertext uebergeben.
     *
     * @param {SpeechErrorFunc} aErrorFunc - Funktion fuer die Fehlerbehandlung
     */

    setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void;


    /**
     * Fehlerausgabe in Abhaengigkeit vom eingestellten ErrorOutput Flag
     *
     * @param {string} aFuncName - Name der Funktion, in der der Fehler auftrat
     * @param {string} aErrorText - Fehlertext fuer Ausgabe
     */

    error( aFuncName: string, aErrorText: string ): void;


    /**
     * Exceptionausgabe, ist nicht in IPlugin vorhanden,
     * da es nur intern verwendet wird. Versendet einen ErrorEvent
     *
     * @param {string} aFuncName - Name der Funktion, in der der Fehler auftrat
     * @param {Exception} aException - Exceptionobjekt
     */

    exception( aFuncName: string, aException: any ): void;


    // oeffentliche Fehlerfunktionen


    /**
     * Pruefen auf Fehlerausgabe ueber die Konsole
     *
     * @returns {boolean}
     */

    isErrorOutput(): boolean;

    
    /**
     * Einschalten der Fehlerausgabe ueber die Konsole
     */

    setErrorOutputOn(): void;


    /**
     * Ausschalten der Fehlerausgabe ueber die Konsole
     */

    setErrorOutputOff(): void;

}
