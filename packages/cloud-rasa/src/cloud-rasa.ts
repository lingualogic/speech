/** @packageDocumentation
 * CloudRasa-Manager zur Verwaltung des CloudRasaPort
 *
 * Hier wird die Manager-Schnittstelle von CloudRasa definiert, um CloudRasa zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// core

import { SpeechErrorFunc, PortManager } from '@speech/core';


// cloud-rasa

import { CLOUDRASA_TYPE_NAME } from './cloud-rasa-const';
import { CloudRasaConfigDataInterface } from './cloud-rasa-config-data.interface';
import { CloudRasaOptionInterface } from './cloud-rasa-option.interface';
import { CloudRasaPort } from './cloud-rasa-port';
import { CloudRasaMock } from './cloud-rasa-mock';


/**
 * statische CloudRasa-Klasse zur Erzeugung des CloudRasaPorts
 */

export class CloudRasa {


    private static mInitFlag = false;
    private static mErrorOutputFlag = false;
    private static mCurrentPort = null;


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudRasa.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        CloudRasa.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /**
     * Initialisiert den CloudRasaPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudRasaPort( aCloudRasaOption: CloudRasaOptionInterface ): number {
        // console.log('CloudRasa._initCloudRasaPort:', aCloudRasaOption);
        const port = PortManager.get( CLOUDRASA_TYPE_NAME, CloudRasaPort );
        if ( !port ) {
            return -1;
        }
        if ( port.init( aCloudRasaOption ) !== 0 ) {
            PortManager.remove( CLOUDRASA_TYPE_NAME );
            return -1;
        }
        CloudRasa.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudRasaMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudRasaMock( aCloudRasaOption: CloudRasaOptionInterface ): number {
        // console.log('CloudRasa._initCloudRasaMock:', aCloudRasaOption);
        const port = PortManager.get( CLOUDRASA_TYPE_NAME, CloudRasaMock );
        if ( !port ) {
            console.log('CloudRasa._initCloudRasaMock: Error CloudRasaMock wurde nicht erzeugt');
            return -1;
        }
        if ( port.init( aCloudRasaOption ) !== 0 ) {
            console.log('CloudRasa._initCloudRasaMock: Error CloudRasaMock wurde nicht initialisiert');
            PortManager.remove( CLOUDRASA_TYPE_NAME );
            return -1;
        }
        CloudRasa.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudRasaPorts
     *
     * @static
     * @param {CloudRasaOptionInterface} aOption - CloudRasa-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static init( aOption: CloudRasaOptionInterface ): number {
        // console.log('CloudRasa.init:', aOption);
        if ( CloudRasa.mInitFlag ) {
            return 0;
        }

        // pruefen auf Optionen

        if ( !aOption ) {
            if ( CloudRasa.mErrorOutputFlag ) {
                console.log( 'CloudRasa.init: Keine CloudRasa-Parameter uebergeben' );
            }
            return -1;
        }

        // pruefen auf ErrorOutputFlag

        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            if ( aOption.errorOutputFlag ) {
                CloudRasa.setErrorOutputOn();
            } else {
                CloudRasa.setErrorOutputOff();
            }
        }

        // hier wird der zu erzeugende Portname selectiert

        let portName = 'CloudRasaPort';
        if ( aOption && typeof aOption.rasaPortName === 'string' ) {
            if ( aOption.rasaPortName === 'CloudRasaMock' ) {
                portName = 'CloudRasaMock';
            }
        }

        // hier wird der CloudRasa-Port initialisiert

        // console.log('CloudRasa.init: PortName = ', portName);
        if ( portName === 'CloudRasaPort' ) {
            if ( CloudRasa._initCloudRasaPort( aOption ) !== 0 ) {
                return -1;
            }
        } else if ( portName === 'CloudRasaMock' ) {
            if ( CloudRasa._initCloudRasaMock( aOption ) !== 0 ) {
                return -1;
            }
        } else {
            if ( CloudRasa.mErrorOutputFlag ) {
                console.log( 'CloudRasa.init: Kein CloudRasa PortName vorhanden' );
            }
            return -1;
        }

        // console.log('CloudRasa.init: end', result);
        CloudRasa.mInitFlag = true;
        return 0;
    }


    static isInit(): boolean {
        return CloudRasa.mInitFlag;
    }


    /**
     * Freigabe des CloudRasaPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static done(): number {
        let port = PortManager.find( CLOUDRASA_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudRasa.mCurrentPort;
        }
        let result = 0;
        if ( port ) {
            result = port.done();
            PortManager.remove( CLOUDRASA_TYPE_NAME );
        }
        CloudRasa.mCurrentPort = null;
        CloudRasa.mInitFlag = false;
        return result;
    }


    // Port-Funktionen


    private static _onOpenEvent( aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any ): number {
        if ( typeof aOpenEventCallback === 'function' ) {
            try {
                // console.log('CloudRasa._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback( aError, aPortName, aPortResult );
                return 0;
            } catch ( aException ) {
                if ( CloudRasa.mErrorOutputFlag ) {
                    console.log( 'CloudRasa._onOpenEvent: Exception', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Oeffnet den CloudRasaPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _openCloudRasaPort( aOpenEventCallback: any ): number {
        // console.log('CloudRasa._openCloudRasaPort: start');
        let port = PortManager.find( CLOUDRASA_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudRasa.mCurrentPort;
        }
        if ( !port ) {
            if ( CloudRasa.mErrorOutputFlag ) {
                console.log('CloudRasa._openCloudRasaPort: kein Port vorhanden');
            }
            CloudRasa._onOpenEvent( new Error( 'CloudRasa._openCloudRasaPort: Kein Port vorhanden'), CLOUDRASA_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // Events verarbeiten

        port.addOpenEvent( CLOUDRASA_TYPE_NAME, (aEvent: any) => {
            port.removeErrorEvent( CLOUDRASA_TYPE_NAME );
            port.removeOpenEvent( CLOUDRASA_TYPE_NAME );
            // console.log('CloudRasa._openCloudRasaPort: openEvent');
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudRasa._onOpenEvent( null, CLOUDRASA_TYPE_NAME, aEvent.result, aOpenEventCallback );
            }
            return aEvent.result;
        });

        port.addErrorEvent( CLOUDRASA_TYPE_NAME, (aError: any) => {
            port.removeOpenEvent( CLOUDRASA_TYPE_NAME );
            port.removeErrorEvent( CLOUDRASA_TYPE_NAME );
            // console.log('CloudRasa._openCloudRasaPort: errorEvent', aError.message);
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudRasa._onOpenEvent( aError, CLOUDRASA_TYPE_NAME, -1, aOpenEventCallback );
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
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static open( aOpenEventCallback?: any ): number {
        if ( !CloudRasa.mInitFlag ) {
            if ( CloudRasa.mErrorOutputFlag ) {
                console.log( 'CloudRasa.open: Init wurde nicht aufgerufen' );
            }
            CloudRasa._onOpenEvent( new Error( 'CloudRasa.open: Init wurde nicht aufgerufen' ), CLOUDRASA_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // hier wird der Nuance-Port geoeffnet

        const result = CloudRasa._openCloudRasaPort( aOpenEventCallback );

        // console.log('CloudRasa.open: end', result);
        return result;
    }


    /**
     * Traegt geaenderte Credentials ein.
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: CloudRasaConfigDataInterface ): number {
        // console.log('CloudRasa.setConfig: currentPort = ', CloudRasa.mCurrentPort);
        if ( CloudRasa.mCurrentPort ) {
            return CloudRasa.mCurrentPort.setConfig( aConfigData );
        }
        return -1;
    }


    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {CloudRasaConfigDataInterface} Konfigurationsdaten zurueckgeben
     */

    static getConfig(): CloudRasaConfigDataInterface {
        if ( CloudRasa.mCurrentPort ) {
            return CloudRasa.mCurrentPort.getConfig();
        }
        return { rasaAppKey: '' };
    }

}
