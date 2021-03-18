/** @packageDocumentation
 * Manager zur Verwaltung des CloudMicrosoftPort
 *
 * Hier wird die Manager-Schnittstelle von CloudMicrosoft definiert, um CloudMicrosoft zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       11.07.2020
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// core

import { SpeechErrorFunc, PortManager } from '@speech/core';


// cloud-microsoft

import { CLOUDMICROSOFT_TYPE_NAME } from './cloud-microsoft-const';
import { CloudMicrosoftConfigDataInterface } from './cloud-microsoft-config-data.interface';
import { CloudMicrosoftOptionInterface } from './cloud-microsoft-option.interface';
import { CloudMicrosoftPort } from './cloud-microsoft-port';
import { CloudMicrosoftMock } from './cloud-microsoft-mock';


/**
 * statische CloudMicrosoft-Klasse zur Erzeugung des CloudMicrosoftPorts
 */

export class CloudMicrosoft {


    private static mInitFlag = false;
    private static mErrorOutputFlag = false;
    private static mCurrentPort = null;


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudMicrosoft.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        CloudMicrosoft.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /**
     * Initialisiert den CloudMicrosoftPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudMicrosoftPort( aCloudMicrosoftOption: CloudMicrosoftOptionInterface ): number {
        // console.log('CloudMicrosoft._initCloudMicrosoftPort:', aCloudMicrosoftOption);
        const port = PortManager.get( CLOUDMICROSOFT_TYPE_NAME, CloudMicrosoftPort );
        if ( !port ) {
            return -1;
        }
        if ( port.init( aCloudMicrosoftOption ) !== 0 ) {
            PortManager.remove( CLOUDMICROSOFT_TYPE_NAME );
            return -1;
        }
        CloudMicrosoft.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudMicrosoftMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    private static _initCloudMicrosoftMock( aCloudMicrosoftOption: CloudMicrosoftOptionInterface ): number {
        // console.log('CloudMicrosoft._initCloudMicrosoftMock:', aCloudMicrosoftOption);
        const port = PortManager.get( CLOUDMICROSOFT_TYPE_NAME, CloudMicrosoftMock );
        if ( !port ) {
            console.log('CloudMicrosoft._initCloudMicrosoftMock: Error CloudMicrosoftMock wurde nicht erzeugt');
            return -1;
        }
        if ( port.init( aCloudMicrosoftOption ) !== 0 ) {
            console.log('CloudMicrosoft._initCloudMicrosoftMock: Error CloudMicrosoftMock wurde nicht initialisiert');
            PortManager.remove( CLOUDMICROSOFT_TYPE_NAME );
            return -1;
        }
        CloudMicrosoft.mCurrentPort = port;
        return 0;
    }


    /**
     * Initialisiert den CloudMicrosoftPorts
     *
     * @static
     * @param {CloudMicrosoftOptionInterface} aOption - CloudMicrosoft-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static init( aOption: CloudMicrosoftOptionInterface ): number {
        // console.log('CloudMicrosoft.init:', aOption);
        if ( CloudMicrosoft.mInitFlag ) {
            return 0;
        }

        // pruefen auf Optionen

        if ( !aOption ) {
            if ( CloudMicrosoft.mErrorOutputFlag ) {
                console.log( 'CloudMicrosoft.init: Keine CloudMicrosoft-Parameter uebergeben' );
            }
            return -1;
        }

        // pruefen auf ErrorOutputFlag

        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            if ( aOption.errorOutputFlag ) {
                CloudMicrosoft.setErrorOutputOn();
            } else {
                CloudMicrosoft.setErrorOutputOff();
            }
        }

        // hier wird der zu erzeugende Portname selectiert

        let portName = 'CloudMicrosoftPort';
        if ( aOption && typeof aOption.microsoftPortName === 'string' ) {
            if ( aOption.microsoftPortName === 'CloudMicrosoftMock' ) {
                portName = 'CloudMicrosoftMock';
            }
        }

        // hier wird der CloudMicrosoft-Port initialisiert

        // console.log('CloudMicrosoft.init: PortName = ', portName);
        if ( portName === 'CloudMicrosoftPort' ) {
            if ( CloudMicrosoft._initCloudMicrosoftPort( aOption ) !== 0 ) {
                return -1;
            }
        } else if ( portName === 'CloudMicrosoftMock' ) {
            if ( CloudMicrosoft._initCloudMicrosoftMock( aOption ) !== 0 ) {
                return -1;
            }
        } else {
            if ( CloudMicrosoft.mErrorOutputFlag ) {
                console.log( 'CloudMicrosoft.init: Kein CloudMicrosoft PortName vorhanden' );
            }
            return -1;
        }

        // console.log('CloudMicrosoft.init: end', result);
        CloudMicrosoft.mInitFlag = true;
        return 0;
    }


    static isInit(): boolean {
        return CloudMicrosoft.mInitFlag;
    }


    /**
     * Freigabe des CloudMicrosoftPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static done(): number {
        let port = PortManager.find( CLOUDMICROSOFT_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudMicrosoft.mCurrentPort;
        }
        let result = 0;
        if ( port ) {
            result = port.done();
            PortManager.remove( CLOUDMICROSOFT_TYPE_NAME );
        }
        CloudMicrosoft.mCurrentPort = null;
        CloudMicrosoft.mInitFlag = false;
        return result;
    }


    // Port-Funktionen


    private static _onOpenEvent( aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any ): number {
        if ( typeof aOpenEventCallback === 'function' ) {
            try {
                // console.log('CloudMicrosoft._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback( aError, aPortName, aPortResult );
                return 0;
            } catch ( aException ) {
                if ( CloudMicrosoft.mErrorOutputFlag ) {
                    console.log( 'CloudMicrosoft._onOpenEvent: Exception', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Oeffnet den CloudMicrosoftPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    private static _openCloudMicrosoftPort( aOpenEventCallback: any ): number {
        // console.log('CloudMicrosoft._openCloudMicrosoftPort: start');
        let port = PortManager.find( CLOUDMICROSOFT_TYPE_NAME );
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if ( !port ) {
            port = CloudMicrosoft.mCurrentPort;
        }
        if ( !port ) {
            if ( CloudMicrosoft.mErrorOutputFlag ) {
                console.log('CloudMicrosoft._openCloudMicrosoftPort: kein Port vorhanden');
            }
            CloudMicrosoft._onOpenEvent( new Error( 'CloudMicrosoft._openCloudMicrosoftPort: Kein Port vorhanden'), CLOUDMICROSOFT_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // Events verarbeiten

        port.addOpenEvent( CLOUDMICROSOFT_TYPE_NAME, (aEvent: any) => {
            port.removeErrorEvent( CLOUDMICROSOFT_TYPE_NAME );
            port.removeOpenEvent( CLOUDMICROSOFT_TYPE_NAME );
            // console.log('CloudMicrosoft._openCloudMicrosoftPort: openEvent');
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudMicrosoft._onOpenEvent( null, CLOUDMICROSOFT_TYPE_NAME, aEvent.result, aOpenEventCallback );
            }
            return aEvent.result;
        });

        port.addErrorEvent( CLOUDMICROSOFT_TYPE_NAME, (aError: any) => {
            port.removeOpenEvent( CLOUDMICROSOFT_TYPE_NAME );
            port.removeErrorEvent( CLOUDMICROSOFT_TYPE_NAME );
            // console.log('CloudMicrosoft._openCloudMicrosoftPort: errorEvent', aError.message);
            if ( typeof aOpenEventCallback === 'function' ) {
                CloudMicrosoft._onOpenEvent( aError, CLOUDMICROSOFT_TYPE_NAME, -1, aOpenEventCallback );
            }
            return 0;
        });

        // Port oeffnen

        return port.open();
    }


    /**
     * Oeffnet den CloudMicrosoftPort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static open( aOpenEventCallback?: any ): number {
        if ( !CloudMicrosoft.mInitFlag ) {
            if ( CloudMicrosoft.mErrorOutputFlag ) {
                console.log( 'CloudMicrosoft.open: Init wurde nicht aufgerufen' );
            }
            CloudMicrosoft._onOpenEvent( new Error( 'CloudMicrosoft.open: Init wurde nicht aufgerufen' ), CLOUDMICROSOFT_TYPE_NAME, -1, aOpenEventCallback );
            return -1;
        }

        // hier wird der Nuance-Port geoeffnet

        const result = CloudMicrosoft._openCloudMicrosoftPort( aOpenEventCallback );

        // console.log('CloudMicrosoft.open: end', result);
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

    static setConfig( aConfigData: CloudMicrosoftConfigDataInterface ): number {
        if ( CloudMicrosoft.mCurrentPort ) {
            return CloudMicrosoft.mCurrentPort.setConfig( aConfigData );
        }
        return -1;
    }


    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {CloudMicrosoftConfigDataInterface} Konfigurationsdaten zurueckgeben
     */

    static getConfig(): CloudMicrosoftConfigDataInterface {
        if ( CloudMicrosoft.mCurrentPort ) {
            return CloudMicrosoft.mCurrentPort.getConfig();
        }
        return { microsoftRegion: '', microsoftSubscriptionKey: '', microsoftLuisEndpoint: '' };
    }

}
