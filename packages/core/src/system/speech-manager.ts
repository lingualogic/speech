/** @packageDocumentation
 * SpeechManager als oberster Manager des gesamten Systems
 * SpeechManager ist die einzige statische Klasse in Speech.
 *
 * Letzte Aenderung: 24.10.2021
 * Status: rot
 *
 * @module core/system
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// builder

import { BuilderManager } from '../builder/builder-manager';
import { IBuilder } from '../builder/builder.interface';
import { Builder } from '../builder/builder';


// component

import { ComponentManager } from '../component/component-manager';


// factory

import { FactoryManager } from '../factory/factory-manager';


// plugin

import { PluginManager } from '../plugin/plugin-manager';


/** @export
 * Statische SpeechManager Klasse
 */

export class SpeechManager {

    // statische Klasse, keine Instanz erzeugbar !

    /* typescript-eslint-disable no-empty-function */
    private constructor() {
        // statische Klasse
    }


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        BuilderManager.setErrorOutputOn();
        ComponentManager.setErrorOutputOn();
        FactoryManager.setErrorOutputOn();
        PluginManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        BuilderManager.setErrorOutputOff();
        ComponentManager.setErrorOutputOff();
        FactoryManager.setErrorOutputOff();
        PluginManager.setErrorOutputOff();
    }


    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        BuilderManager.setErrorOutputFunc( aErrorFunc );
        ComponentManager.setErrorOutputFunc( aErrorFunc );
        FactoryManager.setErrorOutputFunc( aErrorFunc );
        PluginManager.setErrorOutputFunc( aErrorFunc );
    }


    // Manager-Funktionen


    /**
     * Fuegt einen Builder in den BuilderManager ein
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {IBuilder} aBuilder - Instanz des Builders
     *
     * @return {number} errorCode(0,-1)
     */

    static insertBuilder( aBuilderName: string, aBuilder: IBuilder ): number {
        return BuilderManager.insert( aBuilderName, aBuilder );
    }


    /**
     * Rueckgabe eines Builders. Bei Uebergabe der Builderklasse wird
     * der Builder neu erzeugt, wenn er noch nicht vorhanden ist.
     *
     * @static
     * @param {string} aBuilderName - Name des Builders
     * @param {typeof Builder} aBuilderClass - Builder Klasse
     *
     * @return {IBuilder} builder - Rueckgabe der Instanz des Builders oder null
     */

    static getBuilder( aBuilderName: string, aBuilderClass?: typeof Builder): IBuilder {
        return BuilderManager.get( aBuilderName, aBuilderClass );
    }


    /**
     * Rueckgabe eines Builders, wenn er vorhanden ist.
     *
     * @static
     * @param {string} aBuilderName - Name des Builders
     *
     * @return {IBuilder} builder - Rueckgabe der Instanz des Builders oder null
     */

    static findBuilder( aBuilderName: string ): IBuilder {
        return BuilderManager.find( aBuilderName );
    }


    /**
     * Loeschen aller Instanzen des Systems
     *
     * @static
     */

    static clear(): void {
        BuilderManager.clear();
        ComponentManager.clear();
        FactoryManager.clear();
        PluginManager.clear();
    }

}
