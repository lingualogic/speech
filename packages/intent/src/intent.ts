/** @packageDocumentation
 * Intent API Wrapper fuer IntentComponent, einmalige Initialisierung, alle anderen Initialisierungen
 * laufen auf der gleichen IntentComponent.
 * Intent API Wrapper erbt vom Base API Wrapper.
 * SpeechMain muss vorher aufgerufen worden sein, um den IntentBuilder
 * zu erzeugen.
 *
 * Letzte Aenderung: 24.10.2020
 * Status: rot
 *
 * @module intent
 * @author SB
 */


// base

import { Base } from '@speech/base';


// intent

import { INTENT_TYPE_NAME, INTENT_ASYNC_EVENT } from './intent-const';
import { OnListenResultFunc, OnIntentResultFunc } from './intent-function.type';
import { IntentDataInterface } from './intent-data.interface';
import { IntentOptionInterface } from './intent-option.interface';
import { IntentComponentInterface } from './component/intent-component.interface';
import { IntentInterface } from './intent.interface';


/** @export
 * Intent Klasse als API-Wrapper fuer die IntentComponent
 */

export class Intent extends Base implements IntentInterface {


    // IntentComponent

    private mIntentComponent: IntentComponentInterface;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Intent
     */

    constructor( aOption?: IntentOptionInterface ) {
        super( aOption );
        this.mIntentComponent = this.mComponent as IntentComponentInterface;
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    protected _getBuilderName(): string {
        return INTENT_TYPE_NAME;
    }


    // Event-Funktionen


    addListenResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number {
        return this.mIntentComponent.addListenResultEvent( aPluginName, aEventFunc );
    }

    addIntentResultEvent( aPluginName: string, aEventFunc: OnIntentResultFunc ): number {
        return this.mIntentComponent.addIntentResultEvent( aPluginName, aEventFunc );
    }

    removeListenResultEvent( aPluginName: string ): number {
        return this.mIntentComponent.removeListenResultEvent( aPluginName );
    }

    removeIntentResultEvent( aPluginName: string ): number {
        return this.mIntentComponent.removeIntentResultEvent( aPluginName );
    }


    // NLU-Funktionen


    /**
     * pruefen auf vorhandene NLU
     *
     * @return {boolean} True, wenn NLU vorhanden ist, False sonst
     */

    isNLU(): boolean {
        return this.mIntentComponent.isNLU();
    }


    /**
     * Einfuegen einer NLU
     *
     * @param aNLUName - individueller NLU-Name
     * @param aNLUType - Klassenname der NLU
     * @param aOption - optionale Parameter zur Initialisierung der NLU
     */

    insertNLU( aNLUName: string, aNLUType: string, aOption: any ): number {
        return this.mIntentComponent.insertNLU( aNLUName, aNLUType, aOption );
    }


    /**
     * Einfuegen einer NLU
     *
     * @param aNLUName - individueller NLU-Name
     */

    removeNLU( aNLUName: string ): number {
        return this.mIntentComponent.removeNLU( aNLUName );
    }


    /**
     * Setzen der aktuellen NLU ueber ihren Namen
     *
     * @param {string} aNLUName - Name der NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setNLU( aNLUName: string ): number {
        return this.mIntentComponent.setNLU( aNLUName );
    }


    /**
     * Rueckgabe des eingestellten NLU-Namens
     *
     * @returns {string} Name der aktuellen NLU
     */

    getNLU(): string {
        return this.mIntentComponent.getNLU();
    }


    /**
     * Rueckgabe aller vorhandenen NLU-Namen
     *
     * @return {Array<string>} Liste der NLU-Namen
     */

    getNLUList(): Array<string> {
        return this.mIntentComponent.getNLUList();
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
        return this.mIntentComponent.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        return this.mIntentComponent.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        return this.mIntentComponent.getLanguageList();
    }


    // Intent-Funktionen


    setText( aText: string ): number {
        return this.mIntentComponent.setText( aText );
    }

    getText(): string {
        return this.mIntentComponent.getText();
    }


    // Listen-Funktionen


    abort(): number {
        return this.mIntentComponent.abort();
    }

}
