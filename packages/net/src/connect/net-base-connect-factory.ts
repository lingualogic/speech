/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der NetConnect-Klasse und -Instanz fuer Browser oder NodeJS
 *
 * Letzte Aenderung: 07.07.2021
 * Status: rot
 *
 * @module net/connect
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// net

import { INetBaseConnect } from './net-base-connect.interface';
import { NetBrowserConnect } from './net-browser-connect';
import { NetNodeConnect } from './net-node-connect';


// Konstanten

export const NETCONNECT_FACTORY_NAME = 'NetConnectFactory';
export const NETCONNECT_TYPE_NAME = 'NetConnect';


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;


/**
 * Die NetConnectFactory Klasse kapselt die Pruefung und Erzeugung einer NetConnect-Instanz
 */

export class NetBaseConnectFactory extends Factory {

    // es wird nur eine Instanz eines Connect-Objektes erzeugt

    private mBaseConnect: INetBaseConnect = null;

    // public fuer Abfrage auf RuntimeType fuer NodeJS oder Browser

    runtimeType = 'undefined';


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || NETCONNECT_FACTORY_NAME, aRegisterFlag );
        this._initConnect();
    }


    /**
     * dynamischer Import der richtigen NetConnect-Klasse fuer Browser oder NodeJS
     * Erzeugen der einzigen Instanz des Connect-Objektes
     */

    private _initConnect() {
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            // NodeJS Connect-Objekt erzeugen
            try {
                this.mBaseConnect = new NetNodeConnect();
                this.runtimeType = 'node';
                // console.log('NetConnectFactory._initConnect: NodeJS Connect erzeugt');
            } catch ( aException ) {
                console.log('NetManager._initConnect: NetNodeConnect wurde nicht geladen ', aException);
            }
        } else if ( typeof window !== 'undefined' ) {
            // Browser Connect-Objekt erzeugen
            try {
                this.mBaseConnect = new NetBrowserConnect();
                this.runtimeType = 'browser';
                // console.log('NetConnectFactory._initConnect: Browser Connect erzeugt');
            } catch ( aException ) {
                console.log('NetManager._initConnect: NetBrowserConnect wurde nicht geladen ', aException);
            }
        } else {
            console.log('NetManager._initConnect: kein NetConnect geladen');
        }
        // Connect initialsieren
        if ( this.mBaseConnect ) {
            this.mBaseConnect.init();
        }
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return NETCONNECT_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return NETCONNECT_FACTORY_NAME;
    }


    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aObjectClass?: string, aRegisterFlag = true ): INetBaseConnect {
        // einzige Instanz des Connect-Objektes zurueckgeben
        return this.mBaseConnect;
    }

}
