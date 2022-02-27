/** @packageDocumentation
 * Base API Wrapper fuer alle Komponenten.
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module base
 * @author SB
 */


// core

import { OnSpeechInitFunc, OnSpeechErrorFunc, ISession, IBuilderConfig, BuilderManager } from '@lingualogic-speech/core';


// base

import { OnBaseStartFunc, OnBaseStopFunc } from './base-function.type';
import { IBaseOption } from './base-option.interface';
import { IBaseComponent } from './component/base-component.interface';
import { IBase } from './base.interface';


/** @export
 * Base Klasse als API-Wrapper fuer alle Komponenten
 */

export class Base implements IBase {

    // interne Komponente

    protected mComponent: IBaseComponent = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung von Action
     */

    constructor( aOption?: IBaseOption ) {
        if ( this._init( aOption ) !== 0 ) {
            throw new Error('Komponente nicht initialisiert');
        }
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    protected _getBuilderName(): string {
        return '';
    }


    /**
     * Rueckgabe des aus den Optionen extrahierten Komponentennamens
     *
     * @param aOption - Optionen der Komponente
     */

    protected _getComponentName( aOption: IBaseOption ): string {
        if ( aOption && aOption.componentName === 'string' ) {
            return aOption.componentName;
        }
        // muss von erbenden Klassen ueberschrieben werden
        return '';
    }


    /**
     * Rueckgabe des aus den Optionen extrahierten Sericesnamens
     *
     * @param aOption - Optionen der Komponente
     */

    protected _getComponentClass( aOption: IBaseOption ): string {
        if ( aOption && aOption.componentClass === 'string' ) {
            return aOption.componentClass;
        }
        return '';
    }


    /**
     * Rueckgabe der Builder-Konfiguration fuer die Komponente
     *
     * @param aOption - Optionale Parameter
     */

    protected _getBuilderConfig( aOption: IBaseOption ): IBuilderConfig {
        const builderConfig: IBuilderConfig = {
            componentName: this._getComponentName( aOption ),
            componentClass: this._getComponentClass( aOption )
        };
        return builderConfig;
    }


    /**
     * Initialisierung von Base
     *
     * @private
     * @param {IBaseOption} aOption - optionale Parameter zur Konfiguration
     *
     * @return {number} errorCode(0,-1)
     */

    protected _init( aOption?: IBaseOption ): number {
        // console.log('Base.init:', aOption);

        // pruefen auf Fehlerausgabe
        // TODO: Hier sollte eine Konstante zur Festlegung des ErrorOutputFlags eingesetzt werden

        let errorOutputFlag = false;
        if ( aOption && typeof aOption.errorOutputFlag === 'boolean' ) {
            errorOutputFlag = aOption.errorOutputFlag;
        }

        // pruefen auf Builder

        let builderName = this._getBuilderName();  // holen des Default-Buildernamens
        if ( aOption && typeof aOption.builderName === 'string' ) {
            builderName = aOption.builderName;
        }

        // Auswahl eines Builders

        try {
            // pruefen auf erzeugten Builder

            // console.log('Base._init: builderName = ', builderName);
            const builder = BuilderManager.get( builderName );
            // console.log('Base._init: builder = ', builder.getType());
            if ( !builder ) {
                if ( errorOutputFlag ) {
                    console.log('Base._init: Kein Builder vorhanden');
                }
                return -1;
            }

            // erzeugen der Komponente

            this.mComponent = builder.build( this._getBuilderConfig( aOption )) as IBaseComponent;
            if ( !this.mComponent ) {
                if ( errorOutputFlag ) {
                    console.log('Base._init: keine Komponente erzeugt');
                }
                return -1;
            }

            // Komponente initialisieren

            if ( !this.mComponent.isInit()) {
                // console.log('Base._init: Komponente initialisieren', aOption);
                if ( this.mComponent.init( aOption ) !== 0 ) {
                    if ( errorOutputFlag ) {
                        console.log('Base._init: Komponente nicht initialisiert');
                    }
                    return -1;
                }
                if ( this.mComponent.isErrorOutput()) {
                    console.log( this.getType() + 'Version: ', this.getVersion());
                    console.log( this.getType() + '-API Version: ', this.getVersion());
                }
            }
            return 0;
        } catch ( aException ) {
            if ( errorOutputFlag ) {
                console.log('Base._init: Exception ', aException.message);
            }
            return -1;
        }
    }


    reset( aOption?: any ): number {
        return this.mComponent.reset( aOption );
    }


    getType(): string {
        return this.mComponent.getType();
    }


    getName(): string {
        return this.mComponent.getName();
    }


    getVersion(): string {
        return this.mComponent.getVersion();
    }

    getApiVersion(): string {
        return this.mComponent.getApiVersion();
    }

    getServerVersion(): string {
        return '';
    }


    isActive(): boolean {
        return this.mComponent.isActive();
    }


    setActiveOn(): number {
        return this.mComponent.setActiveOn();
    }


    setActiveOff(): number {
        return this.mComponent.setActiveOff();
    }


    isErrorOutput(): boolean {
        return this.mComponent.isErrorOutput();
    }


    setErrorOutputOn(): void {
        this.mComponent.setErrorOutputOn();
    }


    setErrorOutputOff(): void {
        this.mComponent.setErrorOutputOff();
    }


    // Event-Funktionen


    addInitEvent( aPluginName: string, aEventFunc: OnSpeechInitFunc ): number {
        return this.mComponent.addInitEvent( aPluginName, aEventFunc );
    }

    addStartEvent( aPluginName: string, aEventFunc: OnBaseStartFunc ): number {
        return this.mComponent.addStartEvent( aPluginName, aEventFunc );
    }

    addStopEvent( aPluginName: string, aEventFunc: OnBaseStopFunc ): number {
        return this.mComponent.addStopEvent( aPluginName, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        return this.mComponent.addErrorEvent( aPluginName, aEventFunc );
    }


    removeInitEvent( aPluginName: string ): number {
        return this.mComponent.removeInitEvent( aPluginName );
    }

    removeStartEvent( aPluginName: string ): number {
        return this.mComponent.removeStartEvent( aPluginName );
    }

    removeStopEvent( aPluginName: string ): number {
        return this.mComponent.removeStopEvent( aPluginName );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.mComponent.removeErrorEvent( aPluginName );
    }

    removeAllEvent( aPluginName: string ): number {
        return this.mComponent.removeAllEvent( aPluginName );
    }


    // Base-Funktionen


    isRunning(): boolean {
        return this.mComponent.isRunning();
    }

    start( aSession?: ISession ): number {
        return this.mComponent.start( aSession );
    }

    stop(): number {
        return this.mComponent.stop();
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aTestCommand: string, aTestData?: any ): any {
        return this.mComponent.test( aTestCommand, aTestData );
    }

}
