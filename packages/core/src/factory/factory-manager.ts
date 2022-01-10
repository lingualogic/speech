/** @packageDocumentation
 * Verwaltet alle Factories des Systems. Ist eine statische Klasse.
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/factory
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { ErrorBase } from '../error/error-base';


// factory

import { FactoryList } from './factory-list';
import { IFactory } from './factory.interface';
import { Factory } from './factory';


/**
 * statische Klasse FactoryManager
 */

export class FactoryManager {

    /**
     * statische Liste aller Builder im System
     */

    private static mFactoryList = new FactoryList();


    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    private static mErrorBase = new ErrorBase( 'FactoryManager' );


    // statische Klasse, keine Instanz erzeugbar !

    /* typescript-eslint-disable no-empty-function */
    private constructor() {
        // statische Klasse
    }


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        FactoryManager.mFactoryList.setErrorOutputOn();
        FactoryManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        FactoryManager.mFactoryList.setErrorOutputOff();
        FactoryManager.mErrorBase.setErrorOutputOff();
    }

    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        FactoryManager.mFactoryList.setErrorOutputFunc( aErrorFunc );
        FactoryManager.mErrorBase.setErrorOutputFunc( aErrorFunc );
    }


    // Factory-Funktionen


    /**
     * Rueckgabe der Anzahl vorhandener Factories
     *
     * @return {number} size - Anzahl der Factories in der Liste
     */

    static getSize(): number {
        return FactoryManager.mFactoryList.getSize();
    }


    /**
     * Gibt eine neue oder bereits vorhandene Factory zurueck
     *
     * @param {string} aFactoryName - Name der Factory
     * @param {FactoryClass} [aFactoryClass] - Klasse der Factory
     *
     * @return {IFactory} factory - gibt ein Objekt von Factory zurueck oder null
     */

    static get( aFactoryName: string, aFactoryClass?: typeof Factory ): IFactory {
        if ( !aFactoryName ) {
            this.mErrorBase.error( 'get', 'kein FactoryName uebergeben' );
            return null;
        }
        let factory = FactoryManager.find( aFactoryName );
        if ( factory ) {
            // console.log('FactoryManager.get: gefundene Factory wird zurueckgegeben', aFactoryName, factory);
            return factory;
        }
        if ( !aFactoryClass ) {
            this.mErrorBase.error( 'get', 'keine Factoryklasse uebergeben' );
            return null;
        }
        // console.log('FactoryManager.get: FactoryClass=', aFactoryClass);
        try {
            // console.log('FactoryManager.get: Factory neu erzeugt', aFactoryClass);
            factory = new aFactoryClass();
            // console.log('FactoryManager.get: Factory neu erzeugt', factory.getName(), factory);
        } catch ( aException ) {
            this.mErrorBase.exception( 'get', aException );
            return null;
        }
        // pruefen auf gleichen Namen
        // console.log('FactoryManager.get: same name? ', aFactoryName, factory.getName());
        if ( aFactoryName !== factory.getName()) {
            this.mErrorBase.error('get', 'FactoryName stimmen nicht ueberein ' + aFactoryName + ' != ' + factory.getName());
            FactoryManager.remove( factory.getName());
            return null;
        }
        return factory;
    }


    /**
     * Zurueckgeben einer Factory
     *
     * @param {string} aFactoryName - Name der Factory
     * @returns {IFactory} - Factory Instanz
     */

    static find( aFactoryName: string ): IFactory {
        const factory = FactoryManager.mFactoryList.find( aFactoryName );
        if ( !factory ) {
            return null;
        }
        return factory;
    }


    /**
     * Eintragen einer Factory
     *
     * @param {string} aFactoryName - Name der Factory
     * @param {IFactory} aFactory - Factory Instanz
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static insert( aFactoryName: string, aFactory: IFactory ): number {
        // console.log('FactoryManager.insert:', aFactoryName, aFactory);
        return FactoryManager.mFactoryList.insert( aFactoryName, aFactory );
    }


    /**
     * Entfernen einer Factory aus der Liste
     *
     * @param {string} aFactoryName - Name der Factory
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static remove( aFactoryName: string ): number {
        return FactoryManager.mFactoryList.remove( aFactoryName );
    }


    /**
     * Loeschen aller Factories
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static clear(): number {
        return FactoryManager.mFactoryList.clear();
    }

}
