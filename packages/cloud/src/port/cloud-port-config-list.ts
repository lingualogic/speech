/** @packageDocumentation
 * CloudPortConfig-Liste zur Speicherung von Port-Konfigurationen
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gruen
 *
 * @module cloud/port
 * @author SB
 */


// error

import { ErrorBase } from '@lingualogic-speech/core';


// cloud

import { ICloudPortConfig } from './cloud-port-config.interface';


/**
 * Klasse PortList zur Speicherung von Ports
 *
 * @export
 * @class CloudPortConfigList
 */

export class CloudPortConfigList extends ErrorBase {


    private mConfigList = new Map<string, ICloudPortConfig>();
    private mConfigIterator: IterableIterator<ICloudPortConfig>;


    /**
     * Creates an instance of ConfigList.
     */

    constructor() {
        super( 'CloudPortConfigList' );
        this.mConfigIterator = this.mConfigList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Ports
     *
     * @return {number} size - Anzahl der Ports in der Liste
     */

    getSize(): number {
        return this.mConfigList.size;
    }


    /**
     * Rueckgabe aller vorhandenen Port-Namen
     *
     * @return {Array<string>} Rueckgabe aller Port-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mConfigList.keys());
    }


    /**
     * Eintragen eines Ports
     *
     * @param {string} aPortName - Name des Ports
     * @param {ICloudPortConfig} aPortConfig - Port Konfiguration
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aPortName: string, aPortConfig: ICloudPortConfig ): number {
        try {
            if ( !aPortName ) {
                this.error( 'insert', 'kein Portname uebergeben' );
                return -1;
            }
            if ( !aPortConfig ) {
                this.error( 'insert', 'kein PortConfig uebergeben' );
                return -1;
            }
            if ( this.mConfigList.has( aPortName )) {
                this.error( 'insert', 'PortConfig existiert bereits ' + aPortName );
                return -1;
            }
            this.mConfigList.set( aPortName, aPortConfig );
            return 0;
        } catch ( aException ) {
            this.exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben einer PortConfig
     *
     * @param {string} aPortName - Name des Ports
     * @returns {ICloudPortConfig} - Port Konfiguration oder null
     */

    find( aPortName: string ): ICloudPortConfig {
        try {
            return this.mConfigList.get( aPortName );
        } catch ( aException ) {
            this.exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erste PortConfig der Liste zurueckgeben
     *
     * @return {ICloudPortConfig} - Port Konfiguration oder null
     */

    first(): ICloudPortConfig {
        try {
            this.mConfigIterator = this.mConfigList.values();
            return this.mConfigIterator.next().value;
        } catch ( aException ) {
            this.exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechstes PortConfig der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {ICloudPort} - Port Instanz oder null
     */

    next(): ICloudPortConfig {
        try {
            return this.mConfigIterator.next().value;
        } catch ( aException ) {
            this.exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen einer PortConfig aus der Liste
     *
     * @param {string} aPortName - Name des Ports
     * @return {number} errorCode(0,-1)
     */

    remove( aPortName: string ): number {
        try {
            this.mConfigList.delete( aPortName );
            return 0;
        } catch ( aException ) {
            this.exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller PortConfigs aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mConfigList.clear();
            return 0;
        } catch ( aException ) {
            this.exception( 'clear', aException );
            return -1;
        }
    }

}
