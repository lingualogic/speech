/** @packageDocumentation
 * Definiert die Verbindung zum CloudRasa-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// cloud-rasa

import { CloudRasaConfig } from '../cloud-rasa-config';


/**
 * Dient zur Verbindungsaufnahme mit Cloud Credentials.
 */

export class CloudRasaConnect extends ErrorBase {


    // innere Komponenten

    private mConfig: CloudRasaConfig = null;


    // Verbindung vorhanden

    private mConnectFlag = false;


    /**
     * Erzeugt eine Instanz von Connect
     *
     * @param aConfig - CloudRasa Config Objekt
     */

    constructor( aConfig: CloudRasaConfig ) {
        super( 'CloudRasaConnect' );
        this.mConfig = aConfig;
    }


    // Verbindungs-Funktionen

    isConnect(): boolean {
        return this.mConnectFlag;
    }


    /**
     * Verbindungsaufbau mit CloudRasa-Service.
     */

    connect(): number {
        // Initialize the CloudRasa Cognito credentials provider
        // console.log('CloudRasaConnect: onMessage einbinden');
        if ( this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        // pruefen auf Credentials
        this.mConnectFlag = true;
        return 0;
    }


    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */

    disconnect(): number {
        this.mConnectFlag = false;
        return 0;
    }

}
