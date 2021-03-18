/** @packageDocumentation
 * CloudAmazon zur Verwaltung des CloudAmazonPort
 *
 * Hier wird die Manager-Schnittstelle von CloudAmazon definiert, um CloudAmazon zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// core

import { SpeechErrorFunc, PortManager } from '@speech/core';


// cloud-amazon

import { CLOUDAMAZON_TYPE_NAME } from './cloud-amazon-const';
import { CloudAmazonConfigDataInterface } from './cloud-amazon-config-data.interface';
import { CloudAmazonOptionInterface } from './cloud-amazon-option.interface';
import { CloudAmazonPort } from './cloud-amazon-port';
import { CloudAmazonMock } from './cloud-amazon-mock';


/**
 * statische CloudAmazon-Klasse zur Erzeugung des CloudAmazonPorts
 */

export class CloudAmazon {


    private static mInitFlag = false;
    private static mErrorOutputFlag = false;
    private static mCurrentPort = null;


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudAmazon.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        CloudAmazon.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /**
     * Initialisiert den CloudAmazonPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudAmazonPort( aCloudAmazonOption: CloudAmazonOptionInterface ): number {
        // console.log('CloudAmazon._initCloudAmazonPort:', aCloudAmazonOption);
        const port = PortManager.get( CLOUDAMAZON_TYPE_NAME, CloudAmazonPort );
        if ( !port ) {
            return -1;
        }
        if ( port.init( aCloudAmazonOption ) !== 0 ) {
            PortManager.remove( CLOUDAMAZON_TYPE_NAME );
            return -1;
        }
        CloudAmazon.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudAmazonMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudAmazonMock( aCloudAmazonOption: CloudAmazonOptionInterface ): number {
        // console.log('CloudAmazon._initCloudAmazonMock:', aCloudAmazonOption);
        const port = PortManager.get( CLOUDAMAZON_TYPE_NAME, CloudAmazonMock );
        if ( !port ) {
            console.log('CloudAmazon._initCloudAmazonMock: Error CloudAmazonMock wurde nicht erzeugt');
            return -1;
        }
        if ( port.init( aCloudAmazonOption ) !== 0 ) {
            console.log('CloudAmazon._initCloudAmazonMock: Error CloudAmazonMock wurde nicht initialisiert');
            PortManager.remove( CLOUDAMAZON_TYPE_NAME );
            return -1;
        }
        CloudAmazon.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudAmazonPorts
     *
     * @static
     * @param {CloudAmazonOptionInterface} aOption - CloudAmazon-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static init( aOption: CloudAmazonOptionInterface ): number {
        // console.log('CloudAmazon.init:', aOption);
        if ( CloudAmazon.mInitFlag ) {
            return 0;
        }

        // pruefen auf Optionen

        if ( !aOption ) {
            if ( CloudAmazon.mErrorOutputFlag ) {
                console.log( 'CloudAmazon.init: Keine CloudAmazon-Parameter uebergeben' );
            }
            return -1;
        }

        // pruefen auf ErrorOutputFlag

        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            if ( aOption.errorOutputFlag ) {
                CloudAmazon.setErrorOutputOn();
            } else {
                CloudAmazon.setErrorOutputOff();
            }
        }

        // hier wird der zu erzeugende Portname selectiert

        let portName = 'CloudAmazonPort';
        if ( aOption && typeof aOption.amazonPortName === 'string' ) {
            if ( aOption.amazonPortName === 'CloudAmazonMock' ) {
                portName = 'CloudAmazonMock';
            }
        }

        // hier wird der CloudAmazon-Port initialisiert

        // console.log('CloudAmazon.init: PortName = ', portName);
        if ( portName === 'CloudAmazonPort' ) {
            if ( CloudAmazon._initCloudAmazonPort( aOption ) !== 0 ) {
                return -1;
            }
        } else if ( portName === 'CloudAmazonMock' ) {
            if ( CloudAmazon._initCloudAmazonMock( aOption ) !== 0 ) {
                return -1;
            }
        } else {
            if ( CloudAmazon.mErrorOutputFlag ) {
                console.log( 'CloudAmazon.init: Kein CloudAmazon PortName vorhanden' );
            }
            return -1;
        }

        // console.log('CloudAmazon.init: end', result);
        CloudAmazon.mInitFlag = true;
        return 0;
    }


    static isInit(): boolean {
        return CloudAmazon.mInitFlag;
    }


    /**
     * Freigabe des CloudAmazonPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static done(): number {
        let port = PortManager.find( CLOUDAMAZON_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudAmazon.mCurrentPort;
        }
        let result = 0;
        if ( port ) {
            result = port.done();
            PortManager.remove( CLOUDAMAZON_TYPE_NAME );
        }
        CloudAmazon.mCurrentPort = null;
        CloudAmazon.mInitFlag = false;
        return result;
    }


    // Port-Funktionen


    private static _onOpenEvent( aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any ): number {
        if ( typeof aOpenEventCallback === 'function' ) {
            try {
                // console.log('CloudAmazon._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback( aError, aPortName, aPortResult );
                return 0;
            } catch ( aException ) {
                if ( CloudAmazon.mErrorOutputFlag ) {
                    console.log( 'CloudAmazon._onOpenEvent: Exception', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Oeffnet den CloudAmazonPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _openCloudAmazonPort( aOpenEventCallback: any ): number {
        // console.log('CloudAmazon._openCloudAmazonPort: start');
        let port = PortManager.find( CLOUDAMAZON_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudAmazon.mCurrentPort;
        }
        if ( !port ) {
            if ( CloudAmazon.mErrorOutputFlag ) {
                console.log('CloudAmazon._openCloudAmazonPort: kein Port vorhanden');
            }
            CloudAmazon._onOpenEvent( new Error( 'CloudAmazon._openCloudAmazonPort: Kein Port vorhanden'), CLOUDAMAZON_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // Events verarbeiten

        port.addOpenEvent( CLOUDAMAZON_TYPE_NAME, (aEvent: any) => {
            port.removeErrorEvent( CLOUDAMAZON_TYPE_NAME );
            port.removeOpenEvent( CLOUDAMAZON_TYPE_NAME );
            // console.log('CloudAmazon._openCloudAmazonPort: openEvent');
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudAmazon._onOpenEvent( null, CLOUDAMAZON_TYPE_NAME, aEvent.result, aOpenEventCallback );
            }
            return aEvent.result;
        });

        port.addErrorEvent( CLOUDAMAZON_TYPE_NAME, (aError: any) => {
            port.removeOpenEvent( CLOUDAMAZON_TYPE_NAME );
            port.removeErrorEvent( CLOUDAMAZON_TYPE_NAME );
            // console.log('CloudAmazon._openCloudAmazonPort: errorEvent', aError.message);
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudAmazon._onOpenEvent( aError, CLOUDAMAZON_TYPE_NAME, -1, aOpenEventCallback );
            }
            return 0;
        });

        // Port oeffnen

        return port.open();
    }


    /**
     * Oeffnet den CloudAmazonPort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static open( aOpenEventCallback?: any ): number {
        if ( !CloudAmazon.mInitFlag ) {
            if ( CloudAmazon.mErrorOutputFlag ) {
                console.log( 'CloudAmazon.open: Init wurde nicht aufgerufen' );
            }
            CloudAmazon._onOpenEvent( new Error( 'CloudAmazon.open: Init wurde nicht aufgerufen' ), CLOUDAMAZON_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // hier wird der Nuance-Port geoeffnet

        const result = CloudAmazon._openCloudAmazonPort( aOpenEventCallback );

        // console.log('CloudAmazon.open: end', result);
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

    static setConfig( aConfigData: CloudAmazonConfigDataInterface ): number {
        if ( CloudAmazon.mCurrentPort ) {
            return CloudAmazon.mCurrentPort.setConfig( aConfigData );
        }
        return -1;
    }


    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {CloudAmazonConfigDataInterface} Konfigurationsdaten zurueckgeben
     */

    static getConfig(): CloudAmazonConfigDataInterface {
        if ( CloudAmazon.mCurrentPort ) {
            return CloudAmazon.mCurrentPort.getConfig();
        }
        return { amazonRegion: '', amazonIdentityPoolId: '' };
    }

}
