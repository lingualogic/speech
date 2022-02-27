/** @packageDocumentation
 * PortGroup Schnittstelle
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// core

import { IPort, IErrorBase } from '@lingualogic-speech/core';


/**
 * Definiert die Schnittstelle fuer eine PortGroup
 */

export interface ICloudPortGroup extends IErrorBase {


    getClassName(): string;

    init( aOption?: any ): Promise<number>;
    isInit(): boolean;
    done(): number


    // Port-Funktionen

    insertPort( aPortName: string ): number;
    removePort( aPortName: string ): number;
    removeAllPort(): number;

    findPort( aPortName: string ): IPort;
    firstPort(): IPort;
    nextPort(): IPort;

    getPortNameList(): Array<string>

    isCurrentPort(): boolean;
    setCurrentPort( aPortName: string ): number;
    getCurrentPort(): IPort;
    getCurrentPortName(): string;
    getCurrentPortClass(): string;
    
    isPort( aPortName: string): boolean;
    getPortSize(): number;

    startPort( aPortName: string, aOption?: any ): Promise<number>;
    stopPort( aPortName: string ): number;

    startAllPort( aOption?: any ): Promise<number>;
    stopAllPort(): number;
    
}
