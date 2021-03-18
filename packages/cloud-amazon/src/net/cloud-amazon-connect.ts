/** @packageDocumentation
 * Definiert die Verbindung zum CloudAmazon-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// cloud-amazon

import { CloudAmazonConfig } from '../cloud-amazon-config';


/**
 * Dient zur Verbindungsaufnahme mit AWS Credentials.
 */

export class CloudAmazonConnect extends ErrorBase {


    // innere Komponenten

    private mConfig: CloudAmazonConfig = null;

    // Verbindung vorhanden

    private mConnectFlag = false;


    /**
     * Erzeugt eine Instanz von NuanceConnect
     *
     * @param aConfig - CloudAmazon Config Objekt
     */

    constructor( aConfig: CloudAmazonConfig ) {
        super( 'CloudAmazonConnect' );
        this.mConfig = aConfig;
    }


    // Verbindungs-Funktionen

    isConnect(): boolean {
        return this.mConnectFlag;
    }


    /**
     * Verbindungsaufbau mit CloudAmazon-Service.
     */

    connect(): number {
        // Initialize the CloudAmazon Cognito credentials provider
        // console.log('CloudAmazonConnect: Credentials eintragen in AWS');
        if ( this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        try {
            // pruefen auf Credentials
            // console.log('CloudAmazonConnect: Region = ', this.mConfig.region);
            // console.log('CloudAmazonConnect: IdentityPoolId = ', this.mConfig.identityPoolId);
            if ( this.mConfig.region ) {
                (window as any).AWS.config.region = this.mConfig.region;
            }
            if ( this.mConfig.identityPoolId ) {
                (window as any).AWS.config.credentials = new (window as any).AWS.CognitoIdentityCredentials({ IdentityPoolId: this.mConfig.identityPoolId });
                if ( !(window as any).AWS.config.credentials ) {
                    this.error( 'connect', 'keine CloudAmazon-Credentials erzeugt' );
                    return -1;
                }
            }
            this.mConnectFlag = true;
            return 0;
        } catch ( aException ) {
            this.exception( 'connect', aException );
            return -1;
        }
    }


    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */

    disconnect(): number {
        this.mConnectFlag = false;
        try {
            (window as any).AWS.config.region = '';
            (window as any).AWS.config.credentials = null;
        } catch ( aException ) {
            this.exception( 'disconnect', aException );
            return -1;
        }
        return 0;
    }

}
