/** @packageDocumentation
 * Oeffentliche Action Schnittstelle, um Aktionen in der App ausfuehren zu lassen.
 *
 * API-Version: 1.2
 * Datum:       18.10.2020
 *
 * Letzte Aenderung: 27.10.2020
 * Status: rot
 *
 * @module action
 * @author SB
 */


// service

import { ServiceInterface } from '@speech/service';


// action

import {
    ActionStartFunc,
    ActionStopFunc
} from './action-function.type';


// Global API


/**
 * Action Schnittstelle
 */

export interface ActionServiceInterface extends ServiceInterface {


    // Attribute

    action: string;
    type: string;
    element: string;


    // Aktions-Funktionen


    /**
     * Aktionsnamen eintragen
     *
     * @param {string} aActionName - Name der aktuell auszufuehrenden Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionName( aActionName: string ): number;


    /**
     * Aktionsname zurueckgeben
     *
     * @return {string} Rueckgabe des aktuell eingestellten Aktionsnamens
     */

    getActionName(): string;


    /**
     * Elementtyp eintragen
     *
     * @param {string} aElementType - Name des Elementyps
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setElementType( aElementType: string ): number;


    /**
     * Elementtyp zurueckgeben
     *
     * @return {string} Rueckgabe des aktuell eingestellten Elementtyps
     */

    getElementType(): string;


    /**
     * Elementname eintragen
     *
     * @param {string} aElementName - Name des Elemens
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setElementName( aElementName: string ): number;


    /**
     * Elementname zurueckgeben
     *
     * @return {string} Rueckgabe des aktuell eingestellten Elementnamens
     */

    getElementName(): string;


    // Aktionsfunktion-Funktionen


    /**
     * Hinzufuegen einer Aktionsfunktion mit Start- und Stop Callbacks, um eine Aktion unter diesem
     * Namen auszufuehren.
     *
     * @param {string} aFunctionName - Name der Aktionsfunktion
     * @param {ActionStartFunc} aStartActionFunc - Callback-Funktion fuer Start der Aktion
     * @param {ActionStopFunc} aStopActionFunc - Callback-Funktion fuer Stopp der Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addFunction( aFunctionName: string, aStartActionFunc: ActionStartFunc, aStopActionFunc: ActionStopFunc ): number;


    /**
     * Entfernen einer Aktionsfunktion.
     *
     * @param {string} aFunctionName - Name der Aktionsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeFunction( aFunctionName: string ): number;


    // Aktionelement-Funktionen


    /**
     * Hinzufuegen eines Aktionselements mit Start- und Stop-Callbacks, um eine Aktion fuer dieses Element
     * auszufuehren.
     *
     * @param {string} aElementName - Name des Aktionselementes
     * @param {ActionStartFunc} aStartActionFunc - Callback-Funktion fuer Start der Aktion zum Element
     * @param {ActionStopFunc} aStopActionFunc - Callback-Funktion fuer Stopp der Aktion zum Element
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addElement( aElementName: string, aStartActionFunc: ActionStartFunc, aStopActionFunc: ActionStopFunc ): number;


    /**
     * Entfernen eines Aktionselementes.
     *
     * @param {string} aElementName - Name des Aktionselementes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeElement( aElementName: string ): number;

}
