/** @packageDocumentation
 * CloudToken Basisklasse fuer eigene Token-Server
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/token
 * @author SB
 */


// core

import { ErrorBase } from '@lingualogic-speech/core';


// net

import { FetchFactory } from '@lingualogic-speech/net';


// cloud

import { ICloudToken } from './cloud-token.interface';
export { ICloudToken};


/**
 * Basisklasse fuer CloudToken zum holen eines Token vom TOkenServer
 */

export class CloudToken extends ErrorBase implements ICloudToken {

    // TOken-Server URL

    private mTokenServerUrl = '';
    private mTokenServerKey = '';


    // Access-Token

    private mAccessToken = '';
    private mAccessTokenDate = new Date();
    private mAccessTokenDuration = 0;


    // Fetch

    private mFetchFactory: FetchFactory = null;
    protected mFetchFunc: any = null;


    // Promise, dient zum Testen

    accessPromise: Promise<any> = null;


    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aTokenServerUrl: string, aTokenServerKey: string, aFetchFactory: FetchFactory ) {
        super( 'CloudToken' );
        this.mTokenServerUrl = aTokenServerUrl;
        this.mTokenServerKey = aTokenServerKey;
        this.mFetchFactory = aFetchFactory;
        // Prefetch des Tokens, dient dem Starten des Tokenservers in der Cloud
        this.accessPromise = this.getAccessTokenFromServer();
        // console.log('CloudToken: gestartet');
    }


    setTokenServerUrl( aTokenServerUrl: string ): void {
        this.mTokenServerUrl = aTokenServerUrl;
    }


    getTokenServerUrl(): string {
        return this.mTokenServerUrl;
    }


    getFetchFunc(): any {
        return this.mFetchFunc;
    }


    // Token-Funktionen


    clearToken(): number {
        this.mAccessToken = '';
        this.mAccessTokenDate = new Date();
        this.mAccessTokenDuration = 0;
        return 0;
    }


    /**
     * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
     */

    private _getDiffTime( date1, date2 ): number {
        return date2.getTime() - date1.getTime();
    }


    /**
     * Token wird direkt vom Tokenserver geholt
     */

    async getAccessTokenFromServer(): Promise<any> {
        // console.log('CloudToken.getAccessTokenFromServer: start');
        let fetchFunc = null;
        // holen der Fetch-Funktion (Browser/NodeJS)
        try {
            fetchFunc = await this.mFetchFactory.createAsync();
            if ( !fetchFunc || typeof fetchFunc !== 'function' ) {
                this.error('getAccessTokenFromServer', 'keine fetch-Funktion vorhanden');
                console.log('CloudToken.getAccessTokenFromServer: error end');
                return '';
            }
            this.mFetchFunc = fetchFunc;
        } catch ( aException ) {
            this.exception('getAccessTokenFromServer', aException);
            console.log('CloudToken.getAccessTokenFromServer: exception end');
            return '';
        }
        // Fetch-Funktion ausfuehren
        try {
            // console.log('CloudToken: APIKEY = ', this.mTokenServerKey);

            // Umcodierugn fuer URI
            // const tokenURI = encodeURIComponent( this.mTokenServerKey );
            // console.log('CloudToken.getAccessTokenFromServer: url = ', this.mTokenServerUrl + '?apiKey=' + tokenURI);
            // const response = await fetchFunc( this.mTokenServerUrl + '?apiKey=' + tokenURI, {
            const response = await fetchFunc( this.mTokenServerUrl, {
                method: 'GET',
                mode: 'cors',
                // withCredentials: true,
                // credentials: 'include',
                headers: new Headers({
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Credentials': 'true',
                    // 'Authorization': 'JWT ' + this.mTokenServerKey,
                    // 'X-Auth-Token': this.mTokenServerKey,
                    // 'Authorization': 'Bearer ' + this.mTokenServerKey,
                    // 'X-API-KEY': this.mTokenServerKey,
                    // 'Authorization': 'Basic ' + this.mTokenServerKey,
                    'Content-Type': 'application/json'
                })
            });
            const responseJSON = await response.json();
            // console.log('AccessToken: ', responseJSON);
            this.mAccessTokenDate = new Date();
            this.mAccessToken = responseJSON.token || '';
            this.mAccessTokenDuration = responseJSON.time || 0;
            // console.log( 'CloudToken.getAccessTokenFromServer: ', this.mAccessToken, this.mAccessTokenDuration );
            return this.mAccessToken;
        } catch ( aException ) {
            this.exception('getAccessTokenFromServer', aException);
            console.log('CloudToken.getAccessTokenFromServer: Exception ', aException);
            return '';
        }
    }


    /**
     * Token wird zurueckgegeben
     */

    async getAccessToken(): Promise<string> {
        // Token nur vom Tokenserver holen, wenn die Gueltigkeitsdauer abgelaufen ist
        const currentDate = new Date();
        const diffTime = Math.round( this._getDiffTime( this.mAccessTokenDate, currentDate ) / 1000 );
        // console.log('CloudToken.getAccessToken:  diffTime = ', diffTime, '  tokenDuration = ', this.mAccessTokenDuration);
        // pruefen auf Erstaufruf im Konstruktor
        if ( this.accessPromise ) {
            const token = await this.accessPromise;
            this.accessPromise = null;
            if ( token ) {
                // console.log('CloudToken.getAccessToken: accessPromise');
                return token;
            }
        }
        if ( !this.mAccessToken || diffTime >= this.mAccessTokenDuration ) {
            return await this.getAccessTokenFromServer();
        }
        return this.mAccessToken;
    }

}
