/** @packageDocumentation
 * CloudManager aller Cloud-Ports. Hier werden alle Ports eingetragen,
 * die in den Komponenten verwendet werden duerfen. Muss vor allen Komponenten ausgefuehrt
 * einmal zur Initialisierung des Cloud-Ports ausgefuehrt werden !
 *
 * Letzte Aenderung: 21.06.2020
 * Status: gruen
 *
 * @module cloud
 * @author SB
 */


// core

import { SpeechErrorFunc, PortManager, PortInterface } from '@speech/core';


// cloud

import { CloudOptionInterface } from './cloud-option.interface';


/**
 * statische CloudManager Klasse zur Erzeugung aller CloudPorts des
 * Speech-Frameworks.
 *
 * @export
 * @class CloudPort-Builder
 */

export class CloudManager {


    private static mInitFlag = false;
    private static mErrorOutputFlag = false;


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudManager.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        CloudManager.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /*
     * Initialisiert alle Ports
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static init( aOption: CloudOptionInterface ): number {
        // console.log('CloudManager.init:', aOption);
        if ( CloudManager.mInitFlag ) {
            return 0;
        }

        // pruefen auf ErrorOutputFlag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            if ( aOption.errorOutputFlag ) {
                CloudManager.setErrorOutputOn();
            } else {
                CloudManager.setErrorOutputOff();
            }
        }

        // console.log('CloudManager.init: end', result);
        CloudManager.mInitFlag = true;
        return 0;
    }


    static isInit(): boolean {
        return CloudManager.mInitFlag;
    }


    /**
     * Freigabe des Systems
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static done(): number {
        PortManager.clear();
        CloudManager.mInitFlag = false;
        return 0;
    }


    // neue Manager Funktionen


    /**
     * Port zum Portnamen zurueckgeben, wenn Port vorhanden ist.
     *
     * @param aPortName - Name des Ports
     */

    static findPort( aPortName: string ): PortInterface {
        return PortManager.find( aPortName );
    }


    /**
     * Portliste mit allen Ports eines Typs zurueckgeben.
     *
     * @param aPortType - Typ der Ports
     */

    static findPortTypeList( aPortType: string ): PortInterface[] {
        const portList: PortInterface[] = [];
        let port = PortManager.first();
        while ( port ) {
            if ( port.getType() === aPortType ) {
                portList.push( port );
            }
            port = PortManager.next();
        }
        return portList;
    }


    /**
     * Portliste mit allen Ports eines Typs zurueckgeben.
     *
     * @param aPortClass - Klasse der Ports
     */

    static findPortClassList( aPortClass: string ): PortInterface[] {
        const portList: PortInterface[] = [];
        let port = PortManager.first();
        while ( port ) {
            if ( port.getClass() === aPortClass ) {
                portList.push( port );
            }
            port = PortManager.next();
        }
        return portList;
    }

}
