/** @packageDocumentation
 * Die NetNodeConnect-Komponente dient zum testen einer Internet-Verbindung (online/offline)
 *
 * Letzte Aenderung: 05.07.2021
 * Status: rot
 *
 * @module net/connect
 * @author SB
 */


// net

import { NetBaseConnect } from './net-base-connect';


type ConnectConfig = {
    timeout?: number;
    retries?: number;
    domain?: string; 
};


// Konstanten

const NODEJS_NET_MODUL = 'net'; 


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS

declare let process: any;


/**
 * Die Net Klasse kapselt eine Internet
 */

export class NetNodeConnect extends NetBaseConnect {


    mConnectFlag = false;


    /**
     * Konstruktor fuer NodeJS-Connect
     */

     constructor() {
        super( 'NetNodeConnect' );
    }


    getRuntimeType(): string {
        return 'node';
    }


    /**
     * Initialisieurng fuer Verbindungspruefung
     * 
     * @returns 0 oder -1
     */

    protected _initConnect(): number {
        // Ereignisse online/offline mit Funktionen verbinden
        try {
            // asynchroner Aufruf der Verbindungspruefung
            this.checkConnect();
            return 0;
        } catch ( aException ) {
            this.exception( 'init', aException );
        }
        return -1;
    }


    /**
     * Pruefen auf vorhandene Internet-Verbindung
     * 
     * @param aConfig 
     */

    async checkConnect( aConfig: ConnectConfig = {}): Promise<any> {

        // console.log('NetNodeConnect.checkConnect: process.versions.node = ', process.versions.node);
        if ( typeof process === 'undefined' || !process.versions || !process.versions.node ) {
            return new Error('keine NodeJS Laufzeitumgebung');
        }

        // net-modul dynamisch laden

        let net = null;
        try {
            // TODO: muss Variable sein, um dynamischen Import ohne Pruefung zu machen
            const fileName = NODEJS_NET_MODUL;
            net = await import( fileName );
        } catch ( aException ) {
            console.log('NetNodeConnect.checkConnect: Exception ', aException);
            return new Error('NodeJS Net-Modul nicht geladen');
        }

        // Konfiguration zuordnen
        
        const { timeout = 5000, retries = 5, domain = 'https://apple.com' } = aConfig;
        
        // URL zerlegen
        
        const urlInfo = new URL( domain );
        if ( urlInfo.port === null ) {
            if ( urlInfo.protocol === 'ftp:' ) {
                urlInfo.port = '21';
            } else if ( urlInfo.protocol === 'http:' ) {
                urlInfo.port = '80';
            } else if ( urlInfo.protocol === 'https:' ) {
                urlInfo.port = '443';
            }
        }

        const defaultPort = Number.parseInt( urlInfo.port || '80' );
        const hostName = urlInfo.hostname || urlInfo.pathname;

        // Schleife fuer Anzahl der Versuche 

        // console.log('NetNodeConnect.checkConnect: host = ', hostName, defaultPort);
        for (let i = 0; i < retries; i++) {
            const connectPromise = new Promise<any>((resolve, reject) => {
                const timeoutId = setTimeout(() => reject( new Error('Timeout')), timeout );
                const client = new net.Socket();
                // console.log('NetNodeConnect.checkConnect: socket = ', client);
                client.connect({ port: defaultPort, host: hostName }, () => {
                    // console.log('NetNodeConnect.checkConnect: connect');
                    clearTimeout( timeoutId );
                    client.destroy();
                    this.mConnectFlag = true;
                    this._onOnline();
                    resolve(true);
                });

                client.on('data', (data) => {
                });

                client.on('error', (err) => {
                    console.log('NetNodeConnect.checkConnect: error', err);
                    clearTimeout( timeoutId );
                    client.destroy();
                    this.mConnectFlag = false;
                    this._onOffline();
                    reject(err);
                });

                client.on('close', () => {
                });
            });
            try {
                await connectPromise;
            } catch ( aException ) {
                if ( i === ( retries - 1 )) {
                    throw aException;
                }
            }
        }
    }


    /**
     * pruefen auf Online im Browser
     * 
     * @returns true, wenn Online, sonst false
     */

     isOnline(): boolean {
        return this.mConnectFlag;
    }

}
