/** @packageDocumentation
 * CloudManager aller Cloud-Ports. Hier werden alle Ports eingetragen,
 * die in den Komponenten verwendet werden duerfen. Muss vor allen Komponenten ausgefuehrt
 * einmal zur Initialisierung des Cloud-Ports ausgefuehrt werden !
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud
 * @author SB
 */


// core

import { SpeechErrorFunc, FactoryManager, PortManager, IPort, IPortFactory } from '@lingualogic-speech/core';


// net

import { NetManager } from '@lingualogic-speech/net';


// file

import { IFileBaseReader, FileBaseReaderFactory, FILEBASEREADER_FACTORY_NAME } from '@lingualogic-speech/file';


// cloud

import { ICloudOption } from './cloud-option.interface';
import { ICloudConfig, CloudConfig } from './cloud-config';
import { CloudPortConfigGroup } from './port/cloud-port-config-group';
import { ICloudPortCredentials } from './port/cloud-port-credentials.interface';
import { ICloudPort } from './port/cloud-port.interface';
import { ICloudPortGroup, CloudPortGroup } from './port/cloud-port-group';


/**
 * statische CloudManager Klasse zur Erzeugung aller CloudPorts des
 * Speech-Frameworks.
 *
 * @export
 * @class CloudManager
 */

export class CloudManager {


    // statische Attribute 

    private static mInitFlag = false;
    private static mErrorOutputFlag = false;
    private static mFileReader: IFileBaseReader = null;
    private static mCloudConfig: ICloudConfig = null;
    private static mPortGroup: ICloudPortGroup = null;

    // statische Klasse, keine Instanz erzeugbar !

    /* typescript-eslint-disable no-empty-function */
    private constructor() {
        // statische Klasse
    }


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        CloudManager.mErrorOutputFlag = true;
        PortManager.setErrorOutput( true );
    }


    static setErrorOutputOff(): void {
        CloudManager.mErrorOutputFlag = false;
        PortManager.setErrorOutput( false );
    }


    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        PortManager.setErrorOutputFunc( aErrorFunc );
    }


    /**
     * Hier werden alle Werte aus den ausgelesenen Result mit den uebergebenen Options ueberschrieben
     * 
     * @param aOptionList - uebergebene Option-Liste fuer alle Ports
     * @param aCredentialsList - uebergebne Credentials-Liste aller Ports
     * 
     * @result ueberschriebene optionList 
     */

    private static _optionListMerge( aOptionList: any, aCredentialsList: ICloudPortCredentials[] ): any {
        try {
            if ( !aOptionList || aOptionList.length === 0 ) {
                return aOptionList;
            }
            if ( !aCredentialsList || aCredentialsList.length === 0 ) {
                return aOptionList;
            }
            // Schleife fuer alle Port-Optionen
            let portName;
            for ( const portOption of aOptionList ) {
                portName = portOption.portName;
                for ( const portCredentials of aCredentialsList ) {
                    if ( portCredentials.portName === portName ) {
                        if ( portCredentials.appId ) {
                            portOption.appId = portCredentials.appId;
                        }
                        if ( portCredentials.appKey ) {
                            portOption.appKey = portCredentials.appKey;
                        }
                        if (  portCredentials.environmentName ) {
                            portOption.environmentName = portCredentials.environmentName;
                        }
                        if ( portCredentials.projectId ) {
                            portOption.projectId = portCredentials.projectId;
                        }
                        if ( portCredentials.sessionId ) {
                            portOption.sessionId = portCredentials.sessionId;
                        }
                        if ( portCredentials.serverUrl ) {
                            portOption.serverUrl = portCredentials.serverUrl;
                        } 
                        if ( portCredentials.tokenServerUrl ) {
                            portOption.tokenServerUrl = portCredentials.tokenServerUrl;
                        }
                        if ( portCredentials.userId ) {
                            portOption.userId = portCredentials.userId;
                        }
                    }
                }
            }
        } catch ( aException ) {
            console.log('CloudManager._optinListMerge: Exceptions', aException);
        }
        return aOptionList;
    }


    /*
     * Initialisiert alle Ports
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static async init( aPortFactory: IPortFactory, aOption?: ICloudOption ): Promise<any> {
        // console.log('CloudManager.init:', aOption);

        if ( CloudManager.mInitFlag ) {
            return 0;
        }

        // pruefen auf PortFactory

        if ( !aPortFactory ) {
            console.log('CloudManager.init: Keine PortFactory uebergeben');
            return -1;
        }

        // pruefen auf ErrorOutputFlag

        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            if ( aOption.errorOutputFlag ) {
                CloudManager.setErrorOutputOn();
            } else {
                CloudManager.setErrorOutputOff();
            }
        }

        // pruefen auf NetManager

        try {
            // console.log('CloudManager.init: start NetManager.init');
            const result = await NetManager.init();
            if ( result !== 0 ) {
                console.log('CloudManager.init: NetManager nicht initialisiert');
                return -1;
            }
            // console.log('CloudManager.init: end NetManager.init');
        } catch ( aException ) {
            console.log('CloudManager.init: Exception NetManager ', aException);
            return -1;
        }

        // FileReader erzeugen

        // console.log('CloudManager.init: start FileReader');
        const fileReaderFactory = FactoryManager.get( FILEBASEREADER_FACTORY_NAME, FileBaseReaderFactory );
        if ( !fileReaderFactory ) {
            console.log('CloudManager.init: keine FileFactory gefunden');
            return -1;
        }
        CloudManager.mFileReader = fileReaderFactory.create();
        if ( !CloudManager.mFileReader ) {
            console.log('CloudManager.init: FileReader nicht erzeugt');
            return -1;
        }
        if ( CloudManager.mFileReader.init() !== 0 ) {
            console.log('CloudManager.init: FileReader nicht initialisiert');
            return -1;
        }
        // console.log('CloudManager.init: end FileReader');

        // CloudConfig erzeugen

        // console.log('CloudManager.init: start CloudConfig');
        CloudManager.mCloudConfig = new CloudConfig( CloudManager.mFileReader );
        const initPromise = new Promise<any>((resolve, reject) => {

            CloudManager.mCloudConfig.onInit = (aResult: number) => {
                // console.log('CloudManager.init: configInitEvent = ', aResult);
                // wenn Config nicht geladen wird, hier abbrechen, da kein onResult erzeugt wird
                if ( aResult !== 0 || !CloudManager.mCloudConfig.configLoadFlag ) {
                    resolve( aResult );
                }
            };

            CloudManager.mCloudConfig.onResult = async (aResult: any) => {
                // console.log('CloudManager.init: start configResultEvent = ', aResult);
                // Mischen von Optionen und Credentials
                if ( aOption && aOption.portCredentialsList ) {
                    aResult.portOptionList = this._optionListMerge( aResult.portOptionList, aOption.portCredentialsList )
                }
                // console.log('CloudManager.init: start configResultEvent = ', aResult);
                // Portgruppe mit Konfiguration erzeugen
                CloudManager.mPortGroup = new CloudPortGroup( aPortFactory, new CloudPortConfigGroup( '', aResult ));
                if ( await CloudManager.mPortGroup.init() !== 0 ) {
                    console.log('CloudManager.init: configResultEvent PortGroup.init = -1');
                    reject( new Error('CloudManager.init: PortGroup nicht initialisiert'));
                }
                // console.log('CloudManager.init: configResultEvent PortGroup.init = 0');
                /* TODO: darf erst mal nicht fuer Fraunhofer-ASR passieren
                // alle Ports werden geoeffnet
                CloudManager.openAllPort().then((aResultList: any) => {
                    console.log('CloudManager.init: onResultEvent = ', aResultList);
                    resolve( 0 );
                });
                */
                resolve( 0 );
            };

            CloudManager.mCloudConfig.onError = (aError: any) => {
                console.log('CloudManager.init: configErrorEvent = ', aError);
                resolve( -1 );
            };

        });

        if ( CloudManager.mCloudConfig.init( aOption ) !== 0 ) {
            console.log('CloudManager.init: CloudConfig nicht initialisert');
            return -1;
        }

        // console.log('CloudManager.init: end CloudConfig');

        try {
            const result = await initPromise;
            if ( result !== 0 ) {
                return -1;
            }
        } catch ( aException ) {
            console.log('CloudManager.init: Exception ', aException);
            return -1;
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
        CloudManager.mInitFlag = false;
        if ( CloudManager.mPortGroup ) {
            CloudManager.mPortGroup.done();
            CloudManager.mPortGroup = null;
        }
        if ( CloudManager.mCloudConfig ) {
            CloudManager.mCloudConfig.done();
            CloudManager.mCloudConfig = null;
        }
        if ( CloudManager.mFileReader ) {
            CloudManager.mFileReader.done();
            CloudManager.mFileReader = null;
        }
        // TODO: wird zum Problem, wenn es mehrere Portarten gibt
        PortManager.clear();
        return 0;
    }


    // neue Manager Funktionen


    /**
     * Port zum Portnamen zurueckgeben, wenn Port vorhanden ist.
     *
     * @param aPortName - Name des Ports
     */

    static findPort( aPortName: string ): ICloudPort {
        return PortManager.find( aPortName ) as ICloudPort;
    }


    /**
     * Portliste mit allen Ports eines Typs zurueckgeben.
     *
     * @param aPortType - Typ der Ports
     */

    static findPortTypeList( aPortType: string ): ICloudPort[] {
        const portList: ICloudPort[] = [];
        let port = PortManager.first() as ICloudPort;
        while ( port ) {
            if ( port.getType() === aPortType ) {
                portList.push( port );
            }
            port = PortManager.next() as ICloudPort;
        }
        return portList;
    }


    /**
     * Portliste mit allen Ports eines Typs zurueckgeben.
     *
     * @param aPortClass - Klasse der Ports
     */

    static findPortClassList( aPortClass: string ): ICloudPort[] {
        const portList: ICloudPort[] = [];
        let port = PortManager.first() as ICloudPort;
        while ( port ) {
            if ( port.getClass() === aPortClass ) {
                portList.push( port );
            }
            port = PortManager.next() as ICloudPort;
        }
        return portList;
    }


    // Port-Funktionen


    static async openAllPort() {
        // Liste aller initialisierten Ports holen
        const portNameList = CloudManager.mPortGroup.getPortNameList();
        // pruefen auf vorhandene Ports
        if ( portNameList.length === 0 ) {
            return [];
        }
        // console.log('CloudManager.openAllPort: start ', portNameList);
        // alle Port-Promises erzeugen
        const portPromiseList = [];
        for( const portName of portNameList ) {
            portPromiseList.push( CloudManager.open( portName ));
        }
        // alle PortPromises gleichzeitig abarbeiten
        return Promise.all( portPromiseList );
    }


    /**
     * Oeffnet einen Port
     *
     * @static
     * @param aPortName - Name des zu oeffnenden Ports
     * @param aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static async open( aPortName: string, aOption?: any ) {
        // Port holen
        const port = CloudManager.mPortGroup.findPort( aPortName );
        if ( !port ) {
            return { error: 'kein Port gefunden', portName: aPortName, result: -1 }; 
        }
        // pruefen auf geoeffneten Port
        if ( port.isOpen()) {
            return { error: '', port: aPortName, result: 0 }; 
        }
        // Port oeffnen
        // console.log('CloudManager.open: start ', aPortName);
        return new Promise<any>((resolve, reject) => {
            // Events verarbeiten

            port.addOpenEvent( aPortName, (aEvent: any) => {
                // console.log('CloudManager.open: openEvent ', aEvent);
                port.removeAllEvent( aPortName );
                resolve({ error: '', port: aPortName, result: aEvent.result });
                return 0;
            });

            port.addErrorEvent( aPortName, (aError: any) => {
                // console.log('CloudManager.open: errorEvent ', aError);
                port.removeAllEvent( aPortName );
                resolve({ error: aError.message, port: aPortName, result: -1 });
                return 0;
            });

            // Port oeffnen

            console.log('CloudManager.open: open ', aPortName);
            if ( port.open() !== 0 ) {
                // console.log('CloudManager.open: open -1 ', aPortName);
                port.removeAllEvent( aPortName );
                resolve({ error: 'Port nicht geoeffnet', port: aPortName, result: -1 });
            }
        });
    }


    // Token-Funktionen


    /**
     * Token eins Ports/Devices zurueckgeben
     * 
     * @param aPortName - Name des zu suchenden Ports
     * @param aPortAction/DeviceType - Action/Type des Ports/Devices
     * @returns 
     */

    static getToken( aPortName: string, aPortAction: string ): string {
        const port = CloudManager.findPort( aPortName );
        if ( !port ) {
            console.log('CloudManager.getToken: Port nicht gefunden ', aPortName);
            return '';
        }
        return port.getToken( aPortAction );
    }

}
