/** @packageDocumentation
 * CloudRasa-Manager zur Verwaltung beliebig vieler CloudRasaPorts
 *
 * Hier wird die Manager-Schnittstelle von CloudRasa definiert, um einen CloudRasaPort zu
 * initialisieren und als Port zu oeffnen. Jeder Rasa-Port muss einen eigenen Namen haben.
 *
 * API-Version: 1.0
 * Datum:       28.09.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// core

import { SpeechErrorFunc, PortManager, PortList } from '@speech/core';


// cloud-rasa

import { CloudRasaConfigDataInterface } from './cloud-rasa-config-data.interface';
import { CloudRasaOptionInterface } from './cloud-rasa-option.interface';
import { CloudRasaPort } from './cloud-rasa-port';
import { CloudRasaMock } from './cloud-rasa-mock';


/**
 * statische CloudRasa-Klasse zur Erzeugung des CloudRasaPorts
 */

export class CloudRasaManager {


    private static mInitFlag = false;
    private static mErrorOutputFlag = false;
    private static mPortList = new PortList();

    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudRasaManager.mErrorOutputFlag = true;
        CloudRasaManager.mPortList.setErrorOutputOn();
        PortManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        CloudRasaManager.mErrorOutputFlag = false;
        CloudRasaManager.mPortList.setErrorOutputOff();
        PortManager.setErrorOutputOff();
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        CloudRasaManager.mPortList.setErrorOutputFunc( aErrorFunc );
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /**
     * Initialisiert einen CloudRasaPort.
     *
     * @static
     * @param aPortName - eindeutiger Name des Rasa-Ports als Instanzname
     * @param aPortOption - Optionen fuer den Port
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudRasaPort( aPortName: string, aPortOption: CloudRasaOptionInterface ): number {
        console.log('CloudRasaManager._initCloudRasaPort:', aPortName, aPortOption);
        const port = PortManager.get( aPortName, CloudRasaPort );
        if ( !port ) {
            return -1;
        }
        if ( port.init( aPortOption ) !== 0 ) {
            PortManager.remove( aPortName );
            return -1;
        }
        CloudRasaManager.mPortList.insert( aPortName, port );
        return 0;
    }


    /**
     * Initialisiert den CloudRasaMock.
     *
     * @static
     * @param aPortName - eindeutiger Name des Rasa-Ports als Instanzname
     * @param aPortOption - Optionen fuer den Port
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudRasaMock( aPortName: string, aPortOption: CloudRasaOptionInterface ): number {
        console.log('CloudRasaManager._initCloudRasaMock:', aPortName, aPortOption);
        const port = PortManager.get( aPortName, CloudRasaMock );
        if ( !port ) {
            console.log('CloudRasaManager._initCloudRasaMock: Error CloudRasaMock wurde nicht erzeugt');
            return -1;
        }
        if ( port.init( aPortOption ) !== 0 ) {
            console.log('CloudRasaManager._initCloudRasaMock: Error CloudRasaMock wurde nicht initialisiert');
            PortManager.remove( aPortName );
            return -1;
        }
        CloudRasaManager.mPortList.insert( aPortName, port );
        return 0;
    }


    /**
     * Einen Port initialisieren
     *
     * @param aPortOption - Optionen fuer die Initialisierung eines Port
     */

    static initPort( aPortOption: CloudRasaOptionInterface ): number {
        // pruefen auf MockFlag

        let mockFlag = false;
        if ( aPortOption && typeof aPortOption.rasaMockFlag === 'boolean' ) {
            mockFlag = aPortOption.rasaMockFlag;
        }

        // Default-Portnamen eintragen fuer Port oder Mock

        let portName = 'CloudRasaPort';
        if ( mockFlag ) {
            portName = 'CloudRasaPortMock';
        }

        // hier wird der zu erzeugende Portname eingetragen, wenn vorhanden

        if ( aPortOption && typeof aPortOption.rasaPortName === 'string' ) {
            portName = aPortOption.rasaPortName;
        }

        // hier wird der CloudRasa-Port initialisiert

        // console.log('CloudRasaManager.init: PortName = ', portName);
        if ( !mockFlag ) {
            if ( CloudRasaManager._initCloudRasaPort( portName, aPortOption ) !== 0 ) {
                return -1;
            }
        } else {
            if ( CloudRasaManager._initCloudRasaMock( portName, aPortOption ) !== 0 ) {
                return -1;
            }
        }
        return 0;
    }


    /**
     * Initialisiert alle Ports
     *
     * @static
     * @param aPortOptionList - Port Optionenliste fuer alle zu erzeugenden Ports
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static init( aPortOptionList: CloudRasaOptionInterface[] ): number {
        // console.log('CloudRasaManager.init:', aOption);
        if ( CloudRasaManager.mInitFlag ) {
            return 0;
        }

        // pruefen auf Optionenliste

        if ( !aPortOptionList || aPortOptionList.length === 0 ) {
            if ( CloudRasaManager.mErrorOutputFlag ) {
                console.log( 'CloudRasaManager.init: Keine CloudRasa-Parameter uebergeben' );
            }
            return -1;
        }

        // Schleife fuer alle Port-Optionen

        let result = 0;
        for ( const portOption of aPortOptionList ) {
            if ( CloudRasaManager.initPort( portOption ) !== 0 ) {
                result = -1;
            }
        }

        CloudRasaManager.mInitFlag = true;
        console.log('CloudRasaManager.init: end', result);
        return result;
    }


    static isInit(): boolean {
        return CloudRasaManager.mInitFlag;
    }


    /**
     * Freigabe des CloudRasaPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static done(): number {
        const portNameList = CloudRasaManager.mPortList.getNameList();
        let port = null;
        let result = 0;
        for ( const portName of portNameList ) {
            port = PortManager.find( portName );
            if ( port ) {
                PortManager.remove( portName );
                if ( port.done() !== 0 ) {
                    result = -1;
                }
            }
        }
        CloudRasaManager.mPortList.clear();
        CloudRasaManager.mInitFlag = false;
        return result;
    }


    // Port-Funktionen


    private static _onOpenEvent( aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any ): number {
        if ( typeof aOpenEventCallback === 'function' ) {
            try {
                // console.log('CloudRasaManager._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback( aError, aPortName, aPortResult );
                return 0;
            } catch ( aException ) {
                if ( CloudRasaManager.mErrorOutputFlag ) {
                    console.log( 'CloudRasaManager._onOpenEvent: Exception', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Oeffnet den CloudRasaPort
     *
     * @param aPortName - eindeutiger Name des Rasa-Ports als Instanzname
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _openPort( aPortName: string, aOpenEventCallback: any ): number {
        // console.log('CloudRasaManager._openPort: start ', aPortName);
        const port = PortManager.find( aPortName );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            if ( CloudRasaManager.mErrorOutputFlag ) {
                console.log('CloudRasaManager._openPort: kein Port vorhanden');
            }
            CloudRasaManager._onOpenEvent( new Error( 'CloudRasaManager._openPort: Kein Port vorhanden'), aPortName, -1, aOpenEventCallback );
            return -1;
        }

        // Events verarbeiten

        port.addOpenEvent( aPortName, (aEvent: any) => {
            port.removeErrorEvent( aPortName );
            port.removeOpenEvent( aPortName );
            // console.log('CloudRasaManager._openCloudRasaPort: openEvent');
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudRasaManager._onOpenEvent( null, aPortName, aEvent.result, aOpenEventCallback );
            }
            return aEvent.result;
        });

        port.addErrorEvent( aPortName, (aError: any) => {
            port.removeOpenEvent( aPortName );
            port.removeErrorEvent( aPortName );
            // console.log('CloudRasaManager._openCloudRasaPort: errorEvent', aError.message);
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudRasaManager._onOpenEvent( aError, aPortName, -1, aOpenEventCallback );
            }
            return 0;
        });

        // Port oeffnen

        return port.open();
    }


    /**
     * Oeffnet den CloudRasaPort
     *
     * @static
     * @param aPortName - eindeutiger Name des Rasa-Ports als Instanzname
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static open( aPortName: string, aOpenEventCallback?: any ): number {
        console.log('CloudRasaManager.open:', aPortName);
        if ( !CloudRasaManager.mInitFlag ) {
            if ( CloudRasaManager.mErrorOutputFlag ) {
                console.log( 'CloudRasaManager.open: Init wurde nicht aufgerufen' );
            }
            CloudRasaManager._onOpenEvent( new Error( 'CloudRasaManager.open: Init wurde nicht aufgerufen' ), aPortName, -1, aOpenEventCallback );
            return -1;
        }

        // hier wird der Port geoeffnet

        const result = CloudRasaManager._openPort( aPortName, aOpenEventCallback );

        console.log('CloudRasaManager.open: end', result);
        return result;
    }


    /**
     * Traegt geaenderte Credentials ein.
     *
     * @static
     * @param aPortName - eindeutiger Name des Rasa-Ports als Instanzname
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static setConfig( aPortName: string, aConfigData: CloudRasaConfigDataInterface ): number {
        const port = CloudRasaManager.mPortList.find( aPortName );
        if ( port ) {
            return port.setConfig( aConfigData );
        }
        return -1;
    }


    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @param aPortName - eindeutiger Name des Rasa-Ports als Instanzname
     * @return {CloudRasaConfigDataInterface} Konfigurationsdaten zurueckgeben
     */

    static getConfig( aPortName: string ): CloudRasaConfigDataInterface {
        const port = CloudRasaManager.mPortList.find( aPortName );
        if ( port ) {
            return port.getConfig();
        }
        return { rasaAppKey: '' };
    }

}
