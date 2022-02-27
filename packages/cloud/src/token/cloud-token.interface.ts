/** @packageDocumentation
 * CloudToken Basisklasse fuer Token-Server API
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module cloud/token
 * @author SB
 */


// core

import { IErrorBase } from '@lingualogic-speech/core';


/**
 * Basisklasse fuer CloudToken zum holen eines Token vom TOkenServer
 */

export interface ICloudToken extends IErrorBase {


    setTokenServerUrl( aTokenServerUrl: string ): void;
    
    getTokenServerUrl(): string;


    getFetchFunc(): any;


    // Token-Funktionen


    clearToken(): number;


    /**
     * Token wird direkt vom Tokenserver geholt
     */

    getAccessTokenFromServer(): Promise<any>;


    /**
     * Token wird zurueckgegeben
     */

    getAccessToken(): Promise<string>;

}
