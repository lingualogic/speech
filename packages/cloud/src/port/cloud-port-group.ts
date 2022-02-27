/** @packageDocumentation
 * ICloudPortGroup als Manager fuer ICloudPorts.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// core

import { PortList, IPortFactory, IPort, ErrorBase, IEventData } from '@lingualogic-speech/core';


// cloud

import { CLOUD_PORT_NAME, CLOUD_PORTCREATE_FLAG } from './cloud-port-const';
import { ICloudPortOption } from './cloud-port-option.interface';
import { ICloudPortConfigGroup } from './cloud-port-config-group.interface';
import { ICloudPortGroup } from './cloud-port-group.interface';
export { ICloudPortGroup };


/**
 * Definiert die Basisklasse aller ICloudPortGroup
 */

export class CloudPortGroup extends ErrorBase implements ICloudPortGroup {


    // Port-Factory zur Erzeugung aller Ports

    protected mPortFactory: IPortFactory = null;


    // PortGroup-Konfigurationen

    protected mPortConfigGroup: ICloudPortConfigGroup = null;


    // Liste aller eingefuegten ICloudPorts

    protected mPortList: PortList = null;


    // definiert, ob alle Ports in Config erzeugt werden

    protected mPortCreateFlag = CLOUD_PORTCREATE_FLAG;

    protected mInitFlag = false;


    // aktuell ausgewaehltes Port

    protected mCurrentPort: IPort = null;



    /**
     * Erzeugt eine Instanz von ICloudPortGroup
     *
     * @param aPortFactory - Port-Fabrik zum Erzeugen der Ports
     * @param aConfig - Konfiguration aller Ports
     */

    constructor( aPortFactory: IPortFactory, aConfig: ICloudPortConfigGroup ) {
        super( 'CloudPortGroup' );
        this.mPortFactory = aPortFactory;
        this.mPortConfigGroup = aConfig;
        this.mPortList = new PortList();
        this.mPortCreateFlag = aConfig.portCreateFlag;
        // TODO: muss anders geloest werden
        // this.mPortList.setErrorOutputFunc( this._getErrorOutputFunc());
    }


    // CloudPortGroup-Funktionen


    getClassName(): string {
        return 'CloudPortGroup';
    }


   /**
     * Hier werden die Optionen des Ports gesetzt
     * 
     * @param aOption - Option-Datenobjekt 
     * @returns Fehlercode 0 oder -1
     */

    protected _setOption( aOption: any ): number {
        if ( !aOption ) {
            return 0;
        }
        // PortCreateFlag definiert, ob die Ports in der PortOptionList alle direkt erzeugt werden
        if ( typeof aOption.portCreateFlag === 'boolean' ) {
            this.mPortCreateFlag = aOption.portCreateFlag;
        }
        if ( typeof aOption.errorOutputFlag === 'boolean' ) {
            this.setErrorOutput( aOption.errorOutputFlag );
        }
        return 0;
    }


    /**
     * Initalisiert die ICloudPortGroup
     *
     * @param {any} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */

    async init( aOption?: any ) {

        if ( this.mInitFlag ) {
            return 0;
        }

        if ( this._setOption( aOption ) !== 0 ) {
            return -1;
        }

        // Initialisierung aller eingetragenen Ports, wenn portCreateFlag gesetzt ist

        if ( this.mPortCreateFlag ) {
            if ( this._createAllPort( aOption ) !== 0 ) {
                // console.log('CloudPortGroup.init: createAllPort -1');
                return -1;
            }
        }

        // starten aller Ports, die in der PortListe eingetragen worden sind

        if ( await this.startAllPort( aOption ) !== 0 ) {
            // console.log('CloudPortGroup.init: startAllPort = -1');
            return -1;
        }

        this.mInitFlag = true;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * Gibt die ICloudPortGroup frei
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.mInitFlag = false;
        this.mCurrentPort = null;
        this.stopAllPort();
        this.removeAllPort();
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
        if ( this.mPortFactory ) this.mPortFactory.setErrorOutput( aErrorOutputFlag );
        if ( this.mPortConfigGroup ) this.mPortConfigGroup.setErrorOutput( aErrorOutputFlag );
        if ( this.mPortList ) {
            this.mPortList.setErrorOutput( aErrorOutputFlag );
            // ist abhaengig von PortList
            this._setErrorOutputAllPort( aErrorOutputFlag );
        }
    }


    // Port-Funktionen


    /**
     * hier werden alle Ports zu den Konfigurationen erzeugt.
     * 
     * @param aOption - optionale Parameter
     * 
     * @returns Fehlercode 0 oder -1
     */

    protected _createAllPort( aOption: any ): number {
        // Schleife fuer alle vorhandenen Port-Konfigurationen
        try {
            let portConfig = this.mPortConfigGroup.firstPortConfig();
            // console.log('CloudPortGroup._createAllPort: portConfig = ', portConfig );
            let result = 0;
            while ( portConfig ) {
                if ( this.insertPort( portConfig.portName ) !== 0 ) {
                    this.error( '_createAllPort', 'Port wiurde nicht eingefuegt. name = ' + portConfig.portName + '  class = ' + portConfig.portClass );
                    result = -1;
                }
                portConfig = this.mPortConfigGroup.nextPortConfig();
            }
            return result;
        } catch ( aException ) {
            this.exception( '_createAllPort', aException );
            return -1;
        }
    }


    /**
     * Einfuegen eines Ports in die Komponente
     *
     * @param {string} aPortType - Typ des Ports
     * @param {string} aPortName - Name des Ports
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    insertPort( aPortName: string ): number {
        // console.log('CloudPortGroup.insertPort:', aPortName);
        if ( !aPortName ) {
            this.error( 'insertPort', 'kein Port-Name uebergeben' );
            return -1;
        }
        // pruefen auf vorhandenes Port
        let port = this.mPortList.find( aPortName );
        if ( port ) {
            // Port ist bereits eingetragen, kein Fehler
            return 0;
        }
        // neues Port erzeugen
        const config = this.mPortConfigGroup.findPortConfig( aPortName );
        if ( !config ) {
            this.error( 'insertPort', 'Keine Konfiguration zum Port vorhanden ' + aPortName );
            return -1;
        }
        port = this.mPortFactory.create( aPortName, config.portClass );
        // console.log('cloudPortGroup.insertPort: portName = ', aPortName, '  portClass = ', config.portClass, '  port = ', port);
        if ( !port ) {
            this.error( 'insertPort', 'Kein Port erzeugt' );
            return -1;
        }
        // Eintragen des Ports unter seinem Namen
        return this.mPortList.insert( aPortName, port );
    }


    /**
     * Entfernt das Port aus der PortGruppe
     *
     * @param {string} aPortName - Name des Ports
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    removePort( aPortName: string ): number {
        return this.mPortList.remove( aPortName );
    }


    /**
     * Entfernt alle Ports aus der Komponente
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    removeAllPort(): number {
        return this.mPortList.clear();
    }


    /**
     * Rueckgabe eines Ports oder null, wenn das Port nicht gefunden wurde
     *
     * @param {string} aPortName - Type des Ports
     *
     * @return {ICloudPort} - Rueckgabe des Ports oder null
     */

    findPort( aPortName: string ): IPort {
        const port = this.mPortList.find( aPortName );
        if ( !port ) {
            return null;
        }
        return port;
    }


    firstPort(): IPort {
        return this.mPortList.first();
    }


    nextPort(): IPort {
        return this.mPortList.next();
    }


    /**
     * Rueckgabe aller Port-Namen
     *
     * @return {Array<string>} Liste aller Port-Namen
     */

    getPortNameList(): Array<string> {
        return this.mPortList.getNameList();
    }


    /**
     * Aktuelles Ports pruefen
     *
     * @return {boolean} True, aktuelles Port vorhanden, False sonst
     */

    isCurrentPort(): boolean {
        return this.mCurrentPort ? true : false;
    }


    /**
     * Existierendes Port zum ausgewaehlten Port machen.
     *
     * @param {string} aPortName - Name des Ports, welches zum aktuellen Port werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setCurrentPort( aPortName: string ): number {
        const currentPort = this.findPort( aPortName );
        if ( !currentPort ) {
            this.error( 'setCurrentPort', 'Kein Port vorhanden' );
            return -1;
        }
        this.mCurrentPort = currentPort;
        return 0;
    }


    /**
     * Aktuelles Port zurueckgeben
     *
     * @return Rueckgabe des aktuellen Ports oder null
     */

    getCurrentPort(): IPort {
        return this.mCurrentPort;
    }


    /**
     * Rueckgabe des aktuellen Port-Namens
     *
     * @return {string} Name des Ports oder ''
     */

    getCurrentPortName(): string {
        if ( !this.mCurrentPort ) {
            return '';
        }
        return this.mCurrentPort.getName();
    }


    /**
     * Rueckgabe der aktuellen Port-Klasse
     *
     * @return {string} Klasse des Ports oder ''
     */

     getCurrentPortClass(): string {
        if ( !this.mCurrentPort ) {
            return '';
        }
        return this.mCurrentPort.getClass();
    }


    /**
     * pruefen, ob Port bereits eingefuegt wurde
     *
     * @param {string} aPortName - Name des Ports
     *
     * @return {boolean} portFlag - true, Port ist vorhanden
     */

    isPort( aPortName: string): boolean {
        return this.mPortList.find( aPortName ) ? true : false;
    }


    /**
     * Anzahl der enthaltenen Ports zurueckgeben
     *
     * @return {number} size
     */

    getPortSize(): number {
        return this.mPortList.getSize();
    }


    /**
     * startet ein registriertes Port asynchron
     *
     * @param {string} aPortName - Name des Ports
     * @param {any} [aOption] - Optionale Parameter fuer das Port
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

     protected async _startPort( aPort: IPort, aOption: ICloudPortOption ) {
        // console.log('Component._startPort:', aPort.getName(), aOption);
        // warten auf den Init-Event
        return new Promise<number>((resolve, reject) => {
            aPort.addInitEvent( CLOUD_PORT_NAME, (aEventData: IEventData) => {
                aPort.removeInitEvent( CLOUD_PORT_NAME );
                // console.log('CloudPortGroup.startPort: event = ', aEventData);
                resolve( aEventData.result );
                return 0;
            });
            if ( aPort.init( aOption ) !== 0 ) {
                // console.log('CloudPortGroup.startPort: Port init -1');
                this.error( '_startPort', 'Port wurde nicht initialisiert' );
                aPort.removeInitEvent( CLOUD_PORT_NAME );
                resolve( -1 );
            }
        });
    }


    /**
     * startet ein registriertes Port asynchron
     *
     * @param {string} aPortName - Name des Ports
     * @param {any} [aOption] - Optionale Parameter fuer das Port
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    async startPort( aPortName: string, aOption?: ICloudPortOption ) {
        // console.log('Component.startPort:', aPortName, aOption);
        const port = this.mPortList.find( aPortName );
        if ( !port ) {
            this.error( 'startPort', 'Port nicht vorhanden' );
            return -1;
        }
        if ( port.isInit()) {
            return 0;
        }
        let option = aOption;
        if ( !aOption ) {
            const config = this.mPortConfigGroup.findPortConfig( aPortName );
            if ( !config ) {
                console.log('CloudPortGroup.startPort: Keine Konfiguration vorhanden ', aPortName);
                return -1;
            }
            option = config.getOption() as ICloudPortOption;
        }

        // warten auf den Init-Event

        return this._startPort( port, option );
    }


    /**
     * stoppt ein registriertes Port
     *
     * @param {string} aPortName - Name des Ports
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    stopPort( aPortName: string ): number {
        // console.log('CloudPortGroup.stopPort:', aPortName);
        const port = this.mPortList.find( aPortName );
        if ( !port ) {
            this.error( 'stopPort', 'Port nicht vorhanden' );
            return -1;
        }
        return port.done();
    }


    /**
     * Startet alle registrierten Ports
     *
     * @param {any} [aOption] - optionale Parameter fuer alle Ports
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof ICloudPortManager
     */

    async startAllPort( aOption?: any ) {
        // console.log('Component.startAllPort:', this.getName(), aOption);
        try {
            let result = 0;
            let config = null;
            let port = this.mPortList.first();
            const portPromiseList = [];
            while ( port ) {
                // console.log('CloudPortGroup.startAllPort:', port.getName(), port);
                if ( !port.isInit()) {
                    // neues Port erzeugen
                    config = this.mPortConfigGroup.findPortConfig( port.getName());
                    // console.log('CloudPortGroup.startAllPort: config = ', config);
                    if ( config ) {
                        portPromiseList.push( this._startPort( port, config.getOption()));
                    } else {
                        // console.log('CloudPortGroup.startAllPort ' + port.getName() + ' Konfiguration wurde nicht gefunden');
                        this.error( 'startAllPort', 'Keine Konfiguration zum Port vorhanden ' + port.getName());
                        result = -1;
                    }
                }
                port = this.mPortList.next();
            }
            const portResultList = await Promise.all( portPromiseList );
            for ( const portResult of portResultList ) {
                if ( portResult !== 0 ) {
                    result = -1;
                    break;
                }
            }
            // console.log('CloudPortGroup.startAllPort: resultList = ', result, portResultList);
            return result;
        } catch ( aException ) {
            // console.log('CloudPortGroup.startAllPort: Exception ', aException);
            this.exception( 'startAllPort', aException );
            return -1;
        }
    }


    /**
     * stoppt alle registrierten Ports
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    stopAllPort(): number {
        // console.log('CloudPortGroup.stopAllPort');
        try {
            let result = 0;
            let port = this.mPortList.first();
            while ( port ) {
                if ( port.done() !== 0 ) {
                    result = -1;
                }
                port = this.mPortList.next();
            }
            return result;
        } catch ( aException ) {
            this.exception( 'stopAllPort', aException );
            return -1;
        }
    }


    /**
     * setzt Errorausgabe ein/aus fuer alle Ports
     *
     * @private
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlern
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    protected _setErrorOutputAllPort( aErrorOutputFlag: boolean ): number {
        // console.log('CloudPortGroup.setErrorOutputAllPort:', this.getName(), aErrorOutputFlag);
        try {
            let port = this.mPortList.first();
            // console.log('CloudPortGroup._setErrorOutputAllPort: first port = ', port);
            while ( port ) {
                if ( aErrorOutputFlag ) {
                    port.setErrorOutputOn();
                } else {
                    port.setErrorOutputOff();
                }
                port = this.mPortList.next();
            }
            return 0;
        } catch ( aException ) {
            this.exception( '_setErrorOutputAllPort', aException );
            return -1;
        }
    }

}
