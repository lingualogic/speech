/** @packageDocumentation
 * Cloud Geraete Basisklasse API
 *
 * Letzte Aenderung: 16.02.2022
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// core

import { IErrorBase, PortTransaction } from '@lingualogic-speech/core';


// Funktionstypen

export type OnCloudDeviceFunc = (aTransaction: PortTransaction) => void;


/**
 * Basisklasse akller Cloud-Geraete
 */

export interface ICloudDevice extends IErrorBase {

    // Event-Funktionen

    onStart: OnCloudDeviceFunc;
    onStop: OnCloudDeviceFunc;
    onStartAudio: OnCloudDeviceFunc;
    onStopAudio: OnCloudDeviceFunc;
    onResult: OnCloudDeviceFunc;
    onError: OnCloudDeviceFunc;
    onClose: OnCloudDeviceFunc;


    // Device-Funktionen


    init( aOption?: any ): number;
    done(): number;

    isInit(): boolean;

    getClassName(): string;

    getType(): string;

    getName(): string;


    // Token-Funktionen

    
    clearToken(): number;

    getToken(): string;


    // Event-Funktionen


    /**
     * 
     * @param aBuffer 
     * @returns 
     */

    encodeBase64( aBuffer: ArrayBuffer ): string;


    /**
     * Dekodieren der String-Base64 Codierung
     *
     * @param aBase64Text
     */

    decodeBase64( aBase64Text: string ): ArrayBuffer;


    // Geraete-Funktionen


    /**
     * Geraeteaktion starten
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aTransaction: PortTransaction, aOption?: any ): number;


    /**
     * Geraeteaktion beenden
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop( aTransaction: PortTransaction ): number;


    /**
     * pruefen auf vorhandene Transaktion
     */

    isTransaction(): boolean;


    /**
     * Transaktion zurueckgeben
     */

    getTransaction(): PortTransaction;


    /**
     * Transaktion loeschen
     */

    clearTransaction(): void;

}
