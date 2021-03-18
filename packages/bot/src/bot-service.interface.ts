/** @packageDocumentation
 * Oeffentliche Bot Schnittstelle, beinhaltet die Dialog Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       18.10.2018
 *
 * Letzte Aenderung: 27.10.2020
 * Status: gelb
 *
 * @module bot
 * @author SB
 */


// Servive

import { ServiceInterface, EventEmitter } from '@speech/service';


// bot

import { BotActionInterface } from './bot-action.interface';


// Global API


/**
 * Bot Schnittstelle
 */

export interface BotServiceInterface extends ServiceInterface {

    // Service-Attribute

    speak: boolean;
    action: boolean;
    path: string;
    file: string;
    dialog: string;
    state: string;
    context: any;


    // Service-Events

    setDialogEvent: EventEmitter<string>;
    importEvent: EventEmitter<any>;
    parseEvent: EventEmitter<any>;
    startEvent: EventEmitter<any>;
    stopEvent: EventEmitter<any>;
    setStateEvent: EventEmitter<string>;
    actionEvent: EventEmitter<BotActionInterface>;
    actionStopEvent: EventEmitter<any>;
    speakEvent: EventEmitter<string>;
    speakStopEvent: EventEmitter<any>;


    // Speak-Funktionen


    /**
     * Prueft, ob die Speak-Komponente eingeschaltet ist. Nur dann wird sie
     * vom Bot auch verwendet.
     *
     * @return {boolean} True, wenn Speak-Komponente von Bot verwendet wird, sonst False
     */

    isSpeak(): boolean;


    /**
     * Schaltet die Speak-Komponente ein, um sie im Bot zu verwenden.
     * Die Sprachausgabe wird dann an Speak weitergereicht.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setSpeakOn(): number;


    /**
     * Schaltet die Speak-Komponente aus, so dass sie von Bot nicht mehr
     * verwendet wird. Die Sprachausgabe wird nicht mehr an Speak weitergereicht.
     */

    setSpeakOff(): number;


    // Action-Funktionen


    /**
     * Prueft, ob die Action-Komponente eingeschaltet ist. Nur dann wird sie
     * vom Bot auch verwendet.
     *
     * @return {boolean} True, wenn Action-Komponente von Bot verwendet wird, sonst False
     */

    isAction(): boolean;


    /**
     * Schaltet die Action-Komponente ein, um sie im Bot zu verwenden.
     * Die Aktionen werden dann an Action weitergereicht.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionOn(): number;


    /**
     * Schaltet die Action-Komponente aus, so dass sie von Bot nicht mehr
     * verwendet wird. Die Aktionen werden nicht mehr an Action weitergereicht.
     */

    setActionOff(): number;


    // Kontext-Funktionen


    /**
     * Loeschen des aktuellen Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearContext(): number;


    /**
     * Eintragen eines Elementes in den Kontext.
     *
     * @param aElementName - Name des Elementes, fuer das der Kontext eingetragen wird
     * @param aContextName - Name des Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addContextElement( aElementName: string, aContextName: string ): number;


    /**
     * Entfernen eines Elementes in den Kontext.
     *
     * @param aElementName - Name des Elementes, fuer das der Kontext entfernt wird
     * @param aContextName - Name des Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeContextElement( aElementName: string, aContextName: string ): number;
}
