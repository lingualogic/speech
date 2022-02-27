/** @packageDocumentation
 * ICloudDeviceGroup als Manager fuer ICloudDevices.
 *
 * Letzte Aenderung: 16.02.2022
 * Status: gruen
 *
 * @module core/device
 * @author SB
 */


// core

import { ErrorBase, PortTransaction } from '@lingualogic-speech/core';


// cloud

import { CLOUD_DEVICECREATE_FLAG } from './cloud-device-const';
import { ICloudConnect } from './../net/cloud-connect.interface';
import { ICloudDeviceConfigGroup } from './cloud-device-config-group.interface';
import { ICloudDevice } from './cloud-device.interface';
import { ICloudDeviceFactory } from './cloud-device-factory.interface';
import { CloudDeviceList } from './cloud-device-list';
import { CloudDevice } from './cloud-device';
import { ICloudDeviceGroup } from './cloud-device-group.interface';
export { ICloudDeviceGroup };


/**
 * Definiert die Basisklasse aller ICloudDeviceGroup
 */

export class CloudDeviceGroup extends ErrorBase implements ICloudDeviceGroup {


    // Device-Factory zur Erzeugung aller Devices

    protected mDeviceFactory: ICloudDeviceFactory = null;
    protected mInitFlag = false;


    // DeviceGroup-Konfigurationen

    protected mDeviceConfigGroup: ICloudDeviceConfigGroup = null;


    // Liste aller eingefuegten ICloudDevices

    protected mDeviceList: CloudDeviceList = null;


    // aktuell ausgewaehltes Device

    protected mCurrentDevice: ICloudDevice = null;


    // definiert, ob alle Devices in Config erzeugt werden

    protected mDeviceCreateFlag = CLOUD_DEVICECREATE_FLAG;


    // Event-Funktionen

    onStart: (aTransaction: PortTransaction) => void = null;
    onStop: (aTransaction: PortTransaction) => void = null;
    onStartAudio: (aTransaction: PortTransaction) => void = null;
    onStopAudio: (aTransaction: PortTransaction) => void = null;
    onResult: (aTransaction: PortTransaction) => void = null;
    onError: (aTransaction: PortTransaction) => void = null;
    onClose: (aTransaction: PortTransaction) => void = null;


    /**
     * Erzeugt eine Instanz von ICloudDeviceGroup
     *
     * @param aDeviceFactory - Device-Fabrik zum Erzeugen der Devices
     * @param aConfig - Konfiguration aller Devices
     */

    constructor( aDeviceGroupName: string, aDeviceFactory: ICloudDeviceFactory, aConfig: ICloudDeviceConfigGroup, aConnect: ICloudConnect ) {
        super( aDeviceGroupName || 'CloudDeviceGroup' );
        this.mDeviceFactory = aDeviceFactory;
        this.mDeviceConfigGroup = aConfig;
        this.mDeviceList = new CloudDeviceList();
        this.mDeviceCreateFlag = aConfig.deviceCreateFlag;
        this.setErrorOutput( aConfig.errorOutputFlag );
        // TODO: muss anders geloest werden
        // this.mDeviceList.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    // CloudDeviceGroup-Funktionen


    getClassName(): string {
        return 'CloudDeviceGroup';
    }


    getType(): string {
        return 'Group';
    }

    
    getName(): string {
        return 'CloudDeviceGroup';
    }



   /**
     * Hier werden die Optionen des Devices gesetzt
     * 
     * @param aOption - Option-Datenobjekt 
     * @returns Fehlercode 0 oder -1
     */

    protected _setOption( aOption: any ): number {
        if ( !aOption ) {
            return 0;
        }
        // DeviceCreateFlag definiert, ob die Devices in der DeviceOptionList alle direkt erzeugt werden
        if ( typeof aOption.deviceCreateFlag === 'boolean' ) {
            this.mDeviceCreateFlag = aOption.deviceCreateFlag;
        }
        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }
        return 0;
    }


    /**
     * Initalisiert die ICloudDeviceGroup
     *
     * @param {any} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {

        if ( this.isInit()) {
            return 0;
        }

        if ( this._setOption( aOption ) !== 0 ) {
            return -1;
        }

        // Initialisierung aller eingetragenen Devices, wenn deviceCreateFlag gesetzt ist

        if ( this.mDeviceCreateFlag ) {
            if ( this._createAllDevice( aOption ) !== 0 ) {
                this.mInitFlag = false;
                return -1;
            }
        }

        // starten aller Devices, die in der DeviceListe eingetragen worden sind

        if ( this.startAllDevice( aOption ) !== 0 ) {
            this.mInitFlag = false;
            return -1;
        }

        this.mInitFlag = true;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * Gibt die ICloudDeviceGroup frei
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.mInitFlag = false;
        this.mCurrentDevice = null;
        this.stopAllDevice();
        this.removeAllDevice();
        return 0;
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        if ( this.mDeviceFactory ) this.mDeviceFactory.setErrorOutput( aErrorOutputFlag );
        if ( this.mDeviceConfigGroup ) this.mDeviceConfigGroup.setErrorOutput( aErrorOutputFlag );
        if ( this.mDeviceList ) {
            this.mDeviceList.setErrorOutput( aErrorOutputFlag );
            // ist abhaengig von DeviceList
            this._setErrorOutputAllDevice( aErrorOutputFlag );
        }
    }


    // Token-Funktionen


    /**
     * loeschen des Tokens, bei Devices mit Tokenserver
     */

     clearToken(): number {
        // Schleife fuer alle vorhandenen Devices
        try {
            let device = this.firstDevice();
            let result = 0;
            while ( device ) {
                if ( device.clearToken() !== 0 ) {
                    result = -1;
                }
                device = this.nextDevice();
            }
            return result;
        } catch ( aException ) {
            this.exception( 'clearToken', aException );
            return -1;
        }
    }


    /**
     * Rueckgabe eines Tokens, wenn es in einem Device vorhanden ist.
     * 
     * @param aDeviceType - Typname des Devices (ASR, NLU, TTS)
     * @returns Tokenstring
     */
    
    getToken( aDeviceType: string ): string {
        const device = this.findDevice( aDeviceType );
        if ( !device ) {
            return '';
        }
        return device.getToken();
    }


    // Device-Funktionen


    /**
     * hier werden alle Devices zu den Konfigurationen erzeugt.
     * 
     * @param aOption - optionale Parameter
     * 
     * @returns Fehlercode 0 oder -1
     */

    protected _createAllDevice( aOption: any ): number {
        // Schleife fuer alle vorhandenen Device-Konfigurationen
        try {
            let deviceConfig = this.mDeviceConfigGroup.firstDeviceConfig();
            // console.log('CloudDeviceGroup._createAllDevice: deviceConfig = ', deviceConfig );
            let result = 0;
            while ( deviceConfig ) {
                if ( this.insertDevice( deviceConfig.deviceType, deviceConfig.deviceName ) !== 0 ) {
                    this.error( '_createAllDevice', 'Device wiurde nicht eingefuegt. type = ' + deviceConfig.deviceType + '  name = ' + deviceConfig.deviceName );
                    result = -1;
                }
                deviceConfig = this.mDeviceConfigGroup.nextDeviceConfig();
            }
            return result;
        } catch ( aException ) {
            this.exception( '_createAllDevice', aException );
            return -1;
        }
    }


    /**
     * Einfuegen eines Devices in die Komponente
     *
     * @param {string} aDeviceType - Typ des Devices
     * @param {string} aDeviceName - Name des Devices
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    insertDevice( aDeviceType: string, aDeviceName: string ): number {
        // console.log('CloudDeviceGroup.insertDevice:', aDeviceType, aDeviceName);
        if ( !aDeviceType || !aDeviceName ) {
            this.error( 'insertDevice', 'kein Typ oder Name uebergeben' );
            return -1;
        }
        // pruefen auf vorhandenes Device
        let device = this.mDeviceList.find( aDeviceType );
        if ( device ) {
            if( device.getName() === aDeviceName ) {
                // Device ist bereits eingetragen, kein Fehler
                return 0;
            }
            // anderes Device ist unter diesem Typ eingetragen
            this.error( 'insertDevice', 'Ein Device ist unter diesem Typ bereits eingetragen');
            return -1;
        }
        // neues Device erzeugen
        const config = this.mDeviceConfigGroup.findDeviceConfig( aDeviceName );
        if ( !config ) {
            this.error( 'insertDevice', 'Keine Konfiguration zum Device vorhanden ' + aDeviceName );
            return -1;
        }
        device = this.mDeviceFactory.create( aDeviceName, config.deviceClass );
        if ( !device ) {
            this.error( 'insertDevice', 'Kein Device erzeugt' );
            return -1;
        }
        if ( device.getType() !== aDeviceType ) {
            this.error( 'insertDevice', 'Device mit falschen Typ erzeugt' );
            return -1;
        }
        // Eintragen der Events
        device.onStart = this.onStart;
        device.onStop = this.onStop;
        device.onStartAudio = this.onStartAudio;
        device.onStopAudio = this.onStopAudio;
        device.onResult = this.onResult;
        device.onError = this.onError;
        device.onClose = this.onClose;
        // Eintragen des Devices unter dem DeviceTyp
        return this.mDeviceList.insert( aDeviceType, device );
    }


    /**
     * Entfernt das Device aus der DeviceGruppe
     *
     * @param {string} aDeviceType - Type des Devices
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    removeDevice( aDeviceType: string ): number {
        return this.mDeviceList.remove( aDeviceType );
    }


    /**
     * Entfernt alle Devices aus der Komponente
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    removeAllDevice(): number {
        return this.mDeviceList.clear();
    }


    /**
     * Rueckgabe eines Devices oder null, wenn das Device nicht gefunden wurde
     *
     * @param {string} aDeviceType - Type des Devices
     *
     * @return {ICloudDevice} - Rueckgabe des Devices oder null
     */

    findDevice( aDeviceType: string ): ICloudDevice {
        const device = this.mDeviceList.find( aDeviceType );
        if ( !device ) {
            return null;
        }
        return device;
    }


    firstDevice(): ICloudDevice {
        return this.mDeviceList.first();
    }


    nextDevice(): ICloudDevice {
        return this.mDeviceList.next();
    }


    /**
     * Rueckgabe aller Device-Namen
     *
     * @return {Array<string>} Liste aller Device-Namen
     */

    getDeviceTypeList(): Array<string> {
        return this.mDeviceList.getNameList();
    }


    /**
     * Aktuelles Devices pruefen
     *
     * @return {boolean} True, aktuelles Device vorhanden, False sonst
     */

    isCurrentDevice(): boolean {
        return this.mCurrentDevice ? true : false;
    }


    /**
     * Existierendes Device zum ausgewaehlten Device machen.
     *
     * @param {string} aDeviceType - Type des Devices, welches zum aktuellen Device werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setCurrentDevice( aDeviceType: string ): number {
        const currentDevice = this.findDevice( aDeviceType );
        if ( !currentDevice ) {
            this.error( 'setCurrentDevice', 'Kein Device vorhanden' );
            return -1;
        }
        this.mCurrentDevice = currentDevice;
        return 0;
    }


    /**
     * Aktuelles Device zurueckgeben
     *
     * @return {ICloudDevice} Rueckgabe des aktuellen Devices oder null
     */

    getCurrentDevice(): ICloudDevice {
        return this.mCurrentDevice;
    }


    /**
     * Rueckgabe des aktuellen Device-Typs
     *
     * @return {string} Type des Devices oder ''
     */

    getCurrentDeviceType(): string {
        if ( !this.mCurrentDevice ) {
            return '';
        }
        return this.mCurrentDevice.getType();
    }


    /**
     * Rueckgabe des aktuellen Device-Namens
     *
     * @return {string} Name des Devices oder ''
     */

     getCurrentDeviceName(): string {
        if ( !this.mCurrentDevice ) {
            return '';
        }
        return this.mCurrentDevice.getName();
    }


    /**
     * pruefen, ob Device bereits eingefuegt wurde
     *
     * @param {string} aDeviceType - Type des Devices
     *
     * @return {boolean} deviceFlag - true, Device ist vorhanden
     */

    isDevice( aDeviceType: string): boolean {
        return this.mDeviceList.find( aDeviceType ) ? true : false;
    }


    /**
     * Anzahl der enthaltenen Devices zurueckgeben
     *
     * @return {number} size
     */

    getDeviceSize(): number {
        return this.mDeviceList.getSize();
    }


    /**
     * startet ein registriertes Device
     *
     * @param {string} aDeviceType - Typ des Devices
     * @param {any} [aOption] - Optionale Parameter fuer das Device
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    startDevice( aDeviceType: string, aOption?: any ): number {
        // console.log('Component.startDevice:', aDeviceType, aOption);
        const device = this.mDeviceList.find( aDeviceType );
        if ( !device ) {
            this.error( 'startDevice', 'Device nicht vorhanden' );
            return -1;
        }
        if ( device.isInit()) {
            return 0;
        }
        return device.init( aOption );
    }


    /**
     * stoppt ein registriertes Device
     *
     * @param {string} aDeviceType - Typ des Devices
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    stopDevice( aDeviceType: string ): number {
        // console.log('CloudDeviceGroup.stopDevice:', aDeviceType);
        const device = this.mDeviceList.find( aDeviceType );
        if ( !device ) {
            this.error( 'stopDevice', 'Device nicht vorhanden' );
            return -1;
        }
        return device.done();
    }


    /**
     * Startet alle registrierten Devices
     *
     * @param {any} [aOption] - optionale Parameter fuer alle Devices
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof ICloudDeviceManager
     */

    startAllDevice( aOption?: any ): number {
        // console.log('Component.startAllDevice:', this.getName(), aOption);
        try {
            let result = 0;
            let config = null;
            let device = this.mDeviceList.first();
            while ( device ) {
                // console.log('CloudDeviceGroup.startAllDevice:', this.getName(), device.getName(), device);
                // neues Device erzeugen
                config = this.mDeviceConfigGroup.findDeviceConfig( device.getName());
                if ( config ) {
                    if ( !device.isInit() && device.init( config.getOption()) !== 0 ) {
                        // console.log('CloudDevice:Group.startAllDevice ' + device.getName() + ' wurde nicht gestartet');
                        this.error( 'startAllDevice', 'Device nicht initialisiert ' + device.getName());
                        result = -1;
                    } else {
                        if ( this.isErrorOutput()) {
                            console.log('CloudDeviceGroup.startAllDevice: ' + device.getName() + ' wurde gestartet');
                        } 
                    }
                } else {
                    // console.log('CloudDeviceGroup.startAllDevice: ' + device.getName() + ' wurde kein Konfiguration gefunden');
                    this.error( 'startAllDevice', 'Keine Konfiguration zum Device vorhanden ' + device.getName());
                    result = -1;
                }
                device = this.mDeviceList.next();
            }
            return result;
        } catch ( aException ) {
            this.exception( 'startAllDevice', aException );
            return -1;
        }
    }


    /**
     * stoppt alle registrierten Devices
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    stopAllDevice(): number {
        // console.log('CloudDeviceGroup.stopAllDevice');
        try {
            let result = 0;
            let device = this.mDeviceList.first();
            while ( device ) {
                if ( device.done() !== 0 ) {
                    result = -1;
                }
                device = this.mDeviceList.next();
            }
            return result;
        } catch ( aException ) {
            this.exception( 'stopAllDevice', aException );
            return -1;
        }
    }


    /**
     * setzt Errorausgabe ein/aus fuer alle Devices
     *
     * @private
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlern
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    protected _setErrorOutputAllDevice( aErrorOutputFlag: boolean ): number {
        // console.log('CloudDeviceGroup.setErrorOutputAllDevice:', this.getName(), aErrorOutputFlag);
        try {
            let device = this.mDeviceList.first();
            // console.log('CloudDeviceGroup._setErrorOutputAllDevice: first device = ', device);
            while ( device ) {
                if ( aErrorOutputFlag ) {
                    device.setErrorOutputOn();
                } else {
                    device.setErrorOutputOff();
                }
                device = this.mDeviceList.next();
            }
            return 0;
        } catch ( aException ) {
            this.exception( '_setErrorOutputAllDevice', aException );
            return -1;
        }
    }

}
