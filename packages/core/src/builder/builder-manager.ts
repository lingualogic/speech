/** @packageDocumentation
 * Verwaltet alle Builder des Systems. Ist eine statische Klasse.
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { ErrorBase } from './../error/error-base';


// builder

import { BuilderList } from './builder-list';
import { IBuilder } from './builder.interface';
import { Builder } from './builder';


/**
 * statische Klasse BuildManager
 */

export class BuilderManager {

    /**
     * statische Liste aller Builder im System
     */

    private static mBuilderList = new BuilderList();


    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    private static mErrorBase = new ErrorBase( 'BuilderManager' );


    // statische Klasse, keine Instanz erzeugbar !

    /* typescript-eslint-disable no-empty-function */
    private constructor() {
        // statische Klasse
    }


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        BuilderManager.mBuilderList.setErrorOutputOn();
        BuilderManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        BuilderManager.mBuilderList.setErrorOutputOff();
        BuilderManager.mErrorBase.setErrorOutputOff();
    }


    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        BuilderManager.mBuilderList.setErrorOutputFunc( aErrorFunc );
        BuilderManager.mErrorBase.setErrorOutputFunc( aErrorFunc );
    }


    // Builder-Funktionen


    /**
     * Rueckgabe der Anzahl vorhandener Builder
     *
     * @return {number} size - Anzahl der Builder in der Liste
     */

    static getSize(): number {
        return BuilderManager.mBuilderList.getSize();
    }


    /**
     * Gibt einen neuen oder bereits vorhandenen Builder zurueck
     *
     * @param {string } aBuilderName - Name des Builders
     * @param {BuilderClass} [aBuilderClass] - Klasse des Builders
     *
     * @return {IBuilder} builder - gibt ein Objekt von Builder zurueck oder null
     */

    static get( aBuilderName: string, aBuilderClass?: typeof Builder ): IBuilder {
        if ( !aBuilderName ) {
            BuilderManager.mErrorBase.error( 'get', 'kein Buildername uebergeben' );
            return null;
        }
        let builder = BuilderManager.find( aBuilderName );
        if ( builder ) {
            return builder;
        }
        if ( !aBuilderClass ) {
            BuilderManager.mErrorBase.error( 'get', 'keine Builderklasse uebergeben' );
            return null;
        }
        try {
            // console.log('BuilderManager.get: Builder neu erzeugt');
            builder = new aBuilderClass( aBuilderName );
            // console.log('BuilderManager.get: Builder neu erzeugt', builder, builder.getName());
        } catch ( aException ) {
            BuilderManager.mErrorBase.exception( 'get', aException );
            return null;
        }
        // pruefen auf gleichen Namen
        // console.log('BuilderManager.get: same name? ', aBuilderName, builder.getName());
        if ( aBuilderName !== builder.getName()) {
            BuilderManager.mErrorBase.error( 'get', 'Buildernamen stimmen nicht ueberein ' + aBuilderName + ' != ' + builder.getName());
            BuilderManager.remove( builder.getName());
            return null;
        }
        return builder;
    }


    /**
     * Sucht den Builder zum BuilderNamen und gibt ihn zurueck
     *
     * @param {string} aBuilderName - Name des Builders
     *
     * @return {IBuilder} builder - gibt ein Objekt von Builder zurueck oder null
     */

    static find( aBuilderName ): IBuilder {
        const builder = BuilderManager.mBuilderList.find( aBuilderName );
        if ( !builder ) {
            return null;
        }
        return builder;
    }


    /**
     * Fuegt einen Builder in den BuilderManager ein
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {IBuilder} aBuilder - Instanz des Builders
     *
     * @return {number} errorCode(0,-1)
     */

    static insert( aBuilderName: string, aBuilder: IBuilder ): number {
        return BuilderManager.mBuilderList.insert( aBuilderName, aBuilder);
    }


    /**
     * Entfernt einen Builder aus dem BuilderManager
     *
     * @param {string} aBuilderName - Name des Builders
     *
     * @return {number} errorCode(0,-1)
     */

    static remove( aBuilderName: string ): number {
        return BuilderManager.mBuilderList.remove( aBuilderName );
    }


    /**
     * Entfernt alle Builder aus dem BuilderManager
     *
     * @return {number} errorCode(0,-1)
     */

    static clear(): number {
        return BuilderManager.mBuilderList.clear();
    }

}
