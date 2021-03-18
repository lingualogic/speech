/** @packageDocumentation
 * CloudGoogle-Manager zur Verwaltung des CloudGooglePort
 *
 * Hier wird die Manager-Schnittstelle von CloudGoogle definiert, um CloudGoogle zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// core

import { SpeechErrorFunc, PortManager } from '@speech/core';


// cloud-google

import { CLOUDGOOGLE_TYPE_NAME } from './cloud-google-const';
import { CloudGoogleConfigDataInterface } from './cloud-google-config-data.interface';
import { CloudGoogleOptionInterface } from './cloud-google-option.interface';
import { CloudGooglePort } from './cloud-google-port';
import { CloudGoogleMock } from './cloud-google-mock';


/**
 * statische CloudGoogle-Klasse zur Erzeugung des CloudGooglePorts
 */

export class CloudGoogle {


    private static mInitFlag = false;
    private static mErrorOutputFlag = false;
    private static mCurrentPort = null;


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudGoogle.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        CloudGoogle.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /**
     * Initialisiert den CloudGooglePort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudGooglePort( aCloudGoogleOption: CloudGoogleOptionInterface ): number {
        // console.log('CloudGoogle._initCloudGooglePort:', aCloudGoogleOption);
        const port = PortManager.get( CLOUDGOOGLE_TYPE_NAME, CloudGooglePort );
        if ( !port ) {
            return -1;
        }
        if ( port.init( aCloudGoogleOption ) !== 0 ) {
            PortManager.remove( CLOUDGOOGLE_TYPE_NAME );
            return -1;
        }
        CloudGoogle.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudGoogleMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudGoogleMock( aCloudGoogleOption: CloudGoogleOptionInterface ): number {
        // console.log('CloudGoogle._initCloudGoogleMock:', aCloudGoogleOption);
        const port = PortManager.get( CLOUDGOOGLE_TYPE_NAME, CloudGoogleMock );
        if ( !port ) {
            console.log('CloudGoogle._initCloudGoogleMock: Error CloudGoogleMock wurde nicht erzeugt');
            return -1;
        }
        if ( port.init( aCloudGoogleOption ) !== 0 ) {
            console.log('CloudGoogle._initCloudGoogleMock: Error CloudGoogleMock wurde nicht initialisiert');
            PortManager.remove( CLOUDGOOGLE_TYPE_NAME );
            return -1;
        }
        CloudGoogle.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudGooglePorts
     *
     * @static
     * @param {CloudGoogleOptionInterface} aOption - CloudGoogle-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static init( aOption: CloudGoogleOptionInterface ): number {
        // console.log('CloudGoogle.init:', aOption);
        if ( CloudGoogle.mInitFlag ) {
            return 0;
        }

        // pruefen auf Optionen

        if ( !aOption ) {
            if ( CloudGoogle.mErrorOutputFlag ) {
                console.log( 'CloudGoogle.init: Keine CloudGoogle-Parameter uebergeben' );
            }
            return -1;
        }

        // pruefen auf ErrorOutputFlag

        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            if ( aOption.errorOutputFlag ) {
                CloudGoogle.setErrorOutputOn();
            } else {
                CloudGoogle.setErrorOutputOff();
            }
        }

        // hier wird der zu erzeugende Portname selectiert

        let portName = 'CloudGooglePort';
        if ( aOption && typeof aOption.googlePortName === 'string' ) {
            if ( aOption.googlePortName === 'CloudGoogleMock' ) {
                portName = 'CloudGoogleMock';
            }
        }

        // hier wird der CloudGoogle-Port initialisiert

        // console.log('CloudGoogle.init: PortName = ', portName);
        if ( portName === 'CloudGooglePort' ) {
            if ( CloudGoogle._initCloudGooglePort( aOption ) !== 0 ) {
                return -1;
            }
        } else if ( portName === 'CloudGoogleMock' ) {
            if ( CloudGoogle._initCloudGoogleMock( aOption ) !== 0 ) {
                return -1;
            }
        } else {
            if ( CloudGoogle.mErrorOutputFlag ) {
                console.log( 'CloudGoogle.init: Kein CloudGoogle PortName vorhanden' );
            }
            return -1;
        }

        // console.log('CloudGoogle.init: end', result);
        CloudGoogle.mInitFlag = true;
        return 0;
    }


    static isInit(): boolean {
        return CloudGoogle.mInitFlag;
    }


    /**
     * Freigabe des CloudGooglePorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static done(): number {
        let port = PortManager.find( CLOUDGOOGLE_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudGoogle.mCurrentPort;
        }
        let result = 0;
        if ( port ) {
            result = port.done();
            PortManager.remove( CLOUDGOOGLE_TYPE_NAME );
        }
        CloudGoogle.mCurrentPort = null;
        CloudGoogle.mInitFlag = false;
        return result;
    }


    // Port-Funktionen


    private static _onOpenEvent( aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any ): number {
        if ( typeof aOpenEventCallback === 'function' ) {
            try {
                // console.log('CloudGoogle._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback( aError, aPortName, aPortResult );
                return 0;
            } catch ( aException ) {
                if ( CloudGoogle.mErrorOutputFlag ) {
                    console.log( 'CloudGoogle._onOpenEvent: Exception', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Oeffnet den CloudGooglePort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _openCloudGooglePort( aOpenEventCallback: any ): number {
        // console.log('CloudGoogle._openCloudGooglePort: start');
        let port = PortManager.find( CLOUDGOOGLE_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudGoogle.mCurrentPort;
        }
        if ( !port ) {
            if ( CloudGoogle.mErrorOutputFlag ) {
                console.log('CloudGoogle._openCloudGooglePort: kein Port vorhanden');
            }
            CloudGoogle._onOpenEvent( new Error( 'CloudGoogle._openCloudGooglePort: Kein Port vorhanden'), CLOUDGOOGLE_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // Events verarbeiten

        port.addOpenEvent( CLOUDGOOGLE_TYPE_NAME, (aEvent: any) => {
            port.removeErrorEvent( CLOUDGOOGLE_TYPE_NAME );
            port.removeOpenEvent( CLOUDGOOGLE_TYPE_NAME );
            // console.log('CloudGoogle._openCloudGooglePort: openEvent');
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudGoogle._onOpenEvent( null, CLOUDGOOGLE_TYPE_NAME, aEvent.result, aOpenEventCallback );
            }
            return aEvent.result;
        });

        port.addErrorEvent( CLOUDGOOGLE_TYPE_NAME, (aError: any) => {
            port.removeOpenEvent( CLOUDGOOGLE_TYPE_NAME );
            port.removeErrorEvent( CLOUDGOOGLE_TYPE_NAME );
            // console.log('CloudGoogle._openCloudGooglePort: errorEvent', aError.message);
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudGoogle._onOpenEvent( aError, CLOUDGOOGLE_TYPE_NAME, -1, aOpenEventCallback );
            }
            return 0;
        });

        // Port oeffnen

        return port.open();
    }


    /**
     * Oeffnet den CloudGooglePort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static open( aOpenEventCallback?: any ): number {
        if ( !CloudGoogle.mInitFlag ) {
            if ( CloudGoogle.mErrorOutputFlag ) {
                console.log( 'CloudGoogle.open: Init wurde nicht aufgerufen' );
            }
            CloudGoogle._onOpenEvent( new Error( 'CloudGoogle.open: Init wurde nicht aufgerufen' ), CLOUDGOOGLE_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // hier wird der Nuance-Port geoeffnet

        const result = CloudGoogle._openCloudGooglePort( aOpenEventCallback );

        // console.log('CloudGoogle.open: end', result);
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

    static setConfig( aConfigData: CloudGoogleConfigDataInterface ): number {
        if ( CloudGoogle.mCurrentPort ) {
            return CloudGoogle.mCurrentPort.setConfig( aConfigData );
        }
        return -1;
    }


    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {CloudGoogleConfigDataInterface} Konfigurationsdaten zurueckgeben
     */

    static getConfig(): CloudGoogleConfigDataInterface {
        if ( CloudGoogle.mCurrentPort ) {
            return CloudGoogle.mCurrentPort.getConfig();
        }
        return { googleAppKey: '', googleServerUrl: '', dialogflowTokenServerUrl: '', dialogflowProjectId: '', dialogflowSessionId: '', dialogflowEnvironmentName: '' };
    }

}
