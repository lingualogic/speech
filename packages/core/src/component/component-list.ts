/** @packageDocumentation
 * Component-Liste zur Speicherung von Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/component
 * @author SB
 */


// error

import { ErrorBase } from './../error/error-base';


// component

import { IComponent } from './component.interface';


/**
 * Klasse ComponentList zur Speicherung von Komponenten
 *
 * @export
 * @class ComponentList
 */

export class ComponentList extends ErrorBase {

    private mComponentList = new Map<string, IComponent>();
    private mComponentIterator: IterableIterator<IComponent>;


    /**
     * Instanz erzeugen
     */

    constructor() {
        super( 'ComponentList' );
        this.mComponentIterator = this.mComponentList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Komponenten
     *
     * @return {number} size - Anzahl der Komponenten in der Liste
     */

    getSize(): number {
        return this.mComponentList.size;
    }


    /**
     * Rueckgabe aller vorhandenen Komponenten-Namen
     *
     * @return {Array<string>} Rueckgabe aller Komponenten-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mComponentList.keys());
    }


    /**
     * Rueckgabe aller vorhandenen Komponenten-Namen eines Komponententyps
     *
     * @param aComponentType - Typ der Komponente
     *
     * @return {string[]} Rueckgabe aller Komponenten-Namen zu einem Komponententyp als Liste
     */

    getNameTypeList( aComponentType: string ): string[] {
        const nameList = [];
        let component = this.first();
        while ( component ) {
            if ( component.getType() === aComponentType ) {
                nameList.push( component.getName());
            }
            component = this.next();
        }
        return nameList;
    }


    /**
     * Rueckgabe aller vorhandenen Komponententypen
     *
     * @return {string[]} Rueckgabe aller Komponententypen-Namen als Liste
     */

    getTypeList(): string[] {
        const typeList = [];
        let component = this.first();
        let index = -1;
        while ( component ) {
            index = typeList.findIndex( typeName => typeName === component.getType());
            if ( index === -1 ) {
                typeList.push( component.getName());
            }
            component = this.next();
        }
        return typeList;
    }


    /**
     * Eintragen einer Komponente
     *
     * @param {string} aComponentName - Name der Komponente
     * @param {IComponent} aComponent - Plugin Instanz
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aComponentName: string, aComponent: IComponent ): number {
        try {
            if ( !aComponentName ) {
                this.error( 'insert', 'kein Komponentenname uebergeben' );
                return -1;
            }
            if ( !aComponent ) {
                this.error( 'insert', 'keine Komponente uebergeben ' + aComponentName );
                return -1;
            }
            if ( this.mComponentList.has( aComponentName )) {
                this.error( 'insert', 'Komponente existiert bereits ' + aComponentName );
                return -1;
            }
            this.mComponentList.set( aComponentName, aComponent );
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben einer Komponente
     *
     * @param {string} aComponentName - Name der Komponente
     *
     * @returns {IComponent} - Instanz oder null
     */

    find( aComponentName: string ): IComponent {
        try {
            return this.mComponentList.get( aComponentName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erste Komponente der Liste zurueckgeben
     *
     * @return {IComponent} - Instanz oder null
     */

    first(): IComponent {
        try {
            this.mComponentIterator = this.mComponentList.values();
            return this.mComponentIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechste Komponente der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {IComponent} - Instanz oder null
     */

    next(): IComponent {
        try {
            return this.mComponentIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eine Komponente aus der Liste
     *
     * @param {string} aComponentName - Name der Komponente
     *
     * @return {number} errorCode(0,-1)
     */

    remove( aComponentName: string ): number {
        try {
            this.mComponentList.delete( aComponentName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller Komponenten aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mComponentList.clear();
            return 0;
        } catch ( aException ) {
            this.exception( 'clear', aException );
            return -1;
        }
    }

}
