    /** @packageDocumentation
 * Port-Liste zur Speicherung von Port-Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// error

import { ErrorBase } from './../error/error-base';


// port

import { IPort } from './port.interface';


/**
 * Klasse PortList zur Speicherung von Ports
 *
 * @export
 * @class PortList
 */

export class PortList extends ErrorBase {

    /**
     * Map mit allen erzeugten Ports
     */

    private mPortList = new Map<string, IPort>();


    /**
     * Iterator fuer PortList
     */

    private mPortIterator: IterableIterator<IPort>;


    /**
     * Erzeuge eine Instanz von PortList.
     */

    constructor() {
        super( 'PortList' );
        this.mPortIterator = this.mPortList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Ports
     *
     * @return {number} size - Anzahl der Ports in der Liste
     */

    getSize(): number {
        return this.mPortList.size;
    }


    /**
     * Rueckgabe aller vorhandenen Port-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mPortList.keys());
    }


    /*
    getNameList(): string[] {
        try {
            const keyList: string[] = [];
            this.mPortList.forEach( (value: IPort, key: string) => {
                keyList.push( key );
            });
            return keyList;
        } catch ( aException ) {
            this.exception( 'getNameList', aException );
            return [];
        }
    }
    */


    /**
     * Eintragen eines Ports
     *
     * @param {string} aPortName - Name des Ports
     * @param {IPort} aPort - Port Instanz
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aPortName: string, aPort: IPort ): number {
        try {
            if ( !aPortName ) {
                this.error( 'insert', 'kein Portname uebergeben' );
                return -1;
            }
            if ( !aPort ) {
                this.error( 'insert', 'kein Port uebergeben' );
                return -1;
            }
            // console.log( 'PortList.insert: ', aPortName, this.mPortList.size, this.mPortList.has( aPortName ));
            if ( this.mPortList.has( aPortName )) {
                this.error( 'insert', 'Port existiert bereits: ' + aPortName );
                return -1;
            }
            // console.log('PortList.insert: Port wird eingetragen', aPortName, aPort);
            this.mPortList.set( aPortName, aPort );
            // console.log('PortList.insert: Port wurde eingetragen', this.mPortList.get( aPortName ));
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Ports
     *
     * @param {string} aPortName - Name des Ports
     * @returns {IPort} - Port Instanz
     */

    find( aPortName: string ): IPort {
        try {
            // const port = this.mPortList.get( aPortName );
            // console.log('PortList.find:', aPortName, port);
            // return port;
            return this.mPortList.get( aPortName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * ersten Port der Liste zurueckgeben
     *
     * @return {IPort} - Port Instanz
     */

    first(): IPort  {
        try {
            this.mPortIterator = this.mPortList.values();
            return this.mPortIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechsten Port der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {IPort} - Port Instanz
     */

    next(): IPort {
        try {
            return this.mPortIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eines Ports aus der Liste
     *
     * @param {string} aPortName - Name des Ports
     * @return {number} errorCode(0,-1)
     */

    remove( aPortName: string ): number {
        try {
            // console.log('PortList.remove:', aPortName);
            this.mPortList.delete( aPortName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mPortList.clear();
            return 0;
        } catch ( aException ) {
            this.exception('clear', aException );
            return -1;
        }
    }

}
