/** @packageDocumentation
 * BaseComponent Schnittstelle
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module base/component
 * @author SB
 */


// core

import { IComponent } from '@lingualogic-speech/core';


// base

import { BaseStartFunc, BaseStopFunc, OnBaseStartFunc, OnBaseStopFunc } from '../base-function.type';
import { IBase } from '../base.interface';


/** @export
 * BaseComponent Schnittstelle
 *
 * @extends {IComponent, IBase}
 */

export interface IBaseComponent extends IComponent, IBase {


    // Event-Funktionen


    /** Startereignis, wenn start() aufgerufen wurde */
    onStart: OnBaseStartFunc;
    /** Stopereignis, wenn stop() aufgerufen wurde */
    onStop: OnBaseStopFunc;


    // Bind-Functionen


    /**
     * Dient zum Verbinden der Start Funktion mit einer anderen Komponente, die diese Funktion aufruft
     *
     * @returns {BaseStartFunc} Rueckgabe der StartAction Funktion
     */

    getStartFunc(): BaseStartFunc;


    /**
     * Dient zum Verbinden der Stop Funktion mit einer anderen Komponente, die diese Funktion aufruft
     *
     * @returns {BaseStopFunc} Rueckgabe der StartAction Funktion
     */

    getStopFunc(): BaseStopFunc;

}
