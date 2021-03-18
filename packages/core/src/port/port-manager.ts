/** @packageDocumentation
 * Verwaltet alle Ports des Systems. Ist eine statische Klasse.
 *
 * Letzte Aenderung: 28.09.2020
 * Status: gruen
 *
 * @module core/port
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { ErrorBase } from './../error/error-base';


// port

import { PortList } from './port-list';
import { PortInterface } from './port.interface';
import { Port } from './port';


/**
 * statische Klasse PortManager
 */

export class PortManager {

    /**
     * statische Liste aller Ports im System
     */

    private static mPortList = new PortList();


    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    private static mErrorBase = new ErrorBase( 'PortManager' );


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        PortManager.mPortList.setErrorOutputOn();
        PortManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        PortManager.mPortList.setErrorOutputOff();
        PortManager.mErrorBase.setErrorOutputOff();
    }


    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.mPortList.setErrorOutputFunc( aErrorFunc );
        PortManager.mErrorBase.setErrorOutputFunc( aErrorFunc );
    }


    // Port-Funktionen


    /**
     * Rueckgabe der Anzahl vorhandener Ports
     *
     * @return {number} Anzahl der Ports in der Liste
     */

    static getSize(): number {
        return PortManager.mPortList.getSize();
    }


    /**
     * Rueckgabe aller vorhandenen Port-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */

    static getNameList(): Array<string> {
        return PortManager.mPortList.getNameList();
    }


    /**
     * Gibt einen neuen oder bereits vorhandenen Port zurueck
     *
     * @param {string } aPortName - Name des Ports
     * @param {PortClass} [aPortClass] - Klasse des Ports
     *
     * @return {PortInterface} gibt ein Objekt von Port zurueck oder null
     */

    static get( aPortName: string, aPortClass?: typeof Port ): PortInterface {
        if ( !aPortName ) {
            PortManager.mErrorBase.error( 'get', 'kein Portname uebergeben' );
            return null;
        }
        let port = PortManager.find( aPortName );
        if ( port ) {
            return port;
        }
        // pruefen auf uebegebene Portklasse, wenn Port nicht gefunden wurde
        if ( !aPortClass ) {
            PortManager.mErrorBase.error( 'get', 'keine Portklasse uebergeben' );
            return null;
        }
        // Port wird neu erzeugt
        try {
            // console.log('PortManager.get: Port neu erzeugt');
            port = new aPortClass( aPortName );
            // console.log('PortManager.get: Port neu erzeugt', port, port.getName());
        } catch ( aException ) {
            PortManager.mErrorBase.exception( 'get', aException );
            return null;
        }
        // pruefen auf gleichen Namen
        // console.log('PortManager.get: same name? ', aPortName, port.getName());
        if ( aPortName !== port.getName()) {
            PortManager.mErrorBase.error( 'get', 'Portnamen stimmen nicht ueberein ' + aPortName + ' != ' + port.getName());
            PortManager.remove( port.getName());
            return null;
        }
        return port;
    }


    /**
     * Sucht den Port zum PortNamen und gibt ihn zurueck
     *
     * @param {string} aPortName - Name des Ports
     *
     * @return {PortInterface} gibt ein Objekt von Port zurueck oder null
     */

    static find( aPortName ): PortInterface {
        // console.log('PortManager.find:', aPortName);
        const port = PortManager.mPortList.find( aPortName );
        if ( !port ) {
            return null;
        }
        return port;
    }


    /**
     * ersten Port der Liste zurueckgeben
     *
     * @return {PortInterface} - Port Instanz
     */

    static first(): PortInterface  {
        return PortManager.mPortList.first();
    }


    /**
     * naechsten Port der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {PortInterface} - Port Instanz
     */

    static next(): PortInterface {
        return PortManager.mPortList.next();
    }


    /**
     * Fuegt einen Port in den PortManager ein
     *
     * @param {string} aPortName - Name des Ports
     * @param {PortInterface} aBuilder - Instanz des Ports
     *
     * @return {number} errorCode(0,-1)
     */

    static insert( aPortName: string, aPort: PortInterface ): number {
        // console.log('PortManager.insert:', aPortName );
        return PortManager.mPortList.insert( aPortName, aPort );
    }


    /**
     * Entfernt einen Ports aus dem PortManager
     *
     * @param {string} aPortName - Name des Ports
     *
     * @return {number} errorCode(0,-1)
     */

    static remove( aPortName: string ): number {
        // console.log('PortManager.remove:', aPortName );
        return PortManager.mPortList.remove( aPortName );
    }


    /**
     * Entfernt alle Ports aus dem PortManager. Ports werden vorher mit done() freigegeben.
     *
     * @return {number} errorCode(0,-1)
     */

    static clear(): number {
        // console.log('PortManager.clear' );
        let port = PortManager.mPortList.first();
        while ( port ) {
            try {
                // Ports muessen freigegeben werden, um ihre Ressourcen ebenfalls freizugeben
                port.done();
            } catch ( aException ) {
                PortManager.mErrorBase.exception( 'clear', aException );
            }
            port = PortManager.mPortList.next();
        }
        return PortManager.mPortList.clear();
    }

}
