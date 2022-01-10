/** @packageDocumentation
 * Factory zur Erzeugung von Objekten
 *
 * Letzte Aenderung: 05.07.2021
 * Status: gruen
 *
 * @module core/factory
 * @author SB
 */


// error

import { ErrorBase } from '../error/error-base';


// factory

import { FactoryManager } from './factory-manager';
import { IFactory } from './factory.interface';


/**
 * Implementiert die Factory
 *
 * @export
 * @class Factory
 * @implements {IFactory}
 */

export class Factory extends ErrorBase implements IFactory {


    protected mFactoryName = 'Factory';


    /**
     * Creates an instance of Factory.
     *
     * @param {string} aFactoryName - Name der Factory
     */

    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || 'Factory' );
        this.mFactoryName = aFactoryName || 'Factory';
        if ( aRegisterFlag ) {
            if ( FactoryManager.insert( this.getName(), this ) !== 0 ) {
                throw new Error('Factory ' + this.getName() + ' existiert bereits im FactoryManager');
            }
        }
    }

    isMock(): boolean {
        return false;
    }


    getType(): string {
        return 'any';
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return this.mFactoryName;
    }


    /**
     * Erzeugt ein neues Objket (synchron)
     *
     * @param [aObjectName] - Instanzen-Name des Objektes
     * @param [aObjectClass] - Klassen-Name des Objektes
     * @param [aRegisterFlag] - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName = '', aObjectClass = '', aRegisterFlag = true ): any {
        return null;
    }


    /**
     * Erzeugt ein neues Objket (asynchron)
     *
     * @param [aObjectName] - Instanzen-Name des Objektes
     * @param [aObjectClass] - Klassen-Name des Objektes
     * @param [aRegisterFlag] - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    async createAsync( aObjectName = '', aObjectClass = '', aRegisterFlag = true ): Promise<any> {
        return null;
    }

}
