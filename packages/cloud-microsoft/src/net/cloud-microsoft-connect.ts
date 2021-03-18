/** @packageDocumentation
 * Definiert die Verbindung zum CloudMicrosoft-Service
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// cloud-microsoft

import { CloudMicrosoftConfig } from '../cloud-microsoft-config';


/**
 * Dient zur Verbindungsaufnahme mit AWS Credentials.
 */

export class CloudMicrosoftConnect extends ErrorBase {


    // innere Komponenten

    private mConfig: CloudMicrosoftConfig = null;

    // Verbindung vorhanden

    private mConnectFlag = false;

    // Credentials-Objekt fuer CloudMicrosoft-SDK

    private mSpeechConfig = null;


    /**
     * Erzeugt eine Instanz von NuanceConnect
     *
     * @param aConfig - CloudMicrosoft Config Objekt
     */

    constructor( aConfig: CloudMicrosoftConfig ) {
        super( 'CloudMicrosoftConnect' );
        this.mConfig = aConfig;
    }


    /**
     * Rueckgabe der CloudMicrosoft SpeechConfig
     */

    get speechConfig() {
        return this.mSpeechConfig;
    }


    // Verbindungs-Funktionen

    isConnect(): boolean {
        return this.mConnectFlag;
    }


    /**
     * Verbindungsaufbau mit CloudMicrosoft-Service.
     */

    connect(): number {
        // Initialize the CloudMicrosoft Cognito credentials provider
        // console.log('CloudMicrosoftConnect: Credentials eintragen in AWS');
        if ( this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        try {
            // pruefen auf Miccorsoft SpeechSDK
            if ( !(window as any).SpeechSDK ) {
                this.error( 'connect', 'kein CloudMicrosoft SpeechSDK vorhanden' );
                return -1;
            }
            // pruefen auf Credentials
            // console.log('CloudMicrosoftConnect: Region = ', this.mConfig.region);
            // console.log('CloudMicrosoftConnect: SubscriptionKey = ', this.mConfig.subscriptioinKey);
            if ( this.mConfig.region && this.mConfig.subscriptionKey ) {
                this.mSpeechConfig = (window as any).SpeechSDK.SpeechConfig.fromSubscription( this.mConfig.subscriptionKey, this.mConfig.region );
                if ( !this.mSpeechConfig ) {
                    this.error( 'connect', 'keine CloudMicrosoft-Credentials erzeugt' );
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
        this.mSpeechConfig = null;
        return 0;
    }

}
