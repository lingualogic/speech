/** @packageDocumentation
 * Die NetConnect-Komponente dient zum testen einer Internet-Verbindung (online/offline)
 *
 * Letzte Aenderung: 07.07.2021
 * Status: rot
 *
 * @module net/connect
 * @author SB
 */


// net

import { OnNetOnlineFunc, OnNetOfflineFunc, OnNetErrorFunc } from './../net-function.type';


/**
 * Die Net Klasse kapselt eine Internet
 */

export interface INetBaseConnect {

    // Events

    onOnline: any;
    onOffline: any;
    onError: any;


    /**
     * Initialisierung
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number;

    isInit(): boolean;

    getRuntimeType(): string;


    /**
     * Freigabe
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number;


    //  Event-Funktionen

    addOnlineEvent( aPluginName: string, aEventFunc: OnNetOnlineFunc ): number;
    addOfflineEvent( aPluginName: string, aEventFunc: OnNetOfflineFunc ): number;
    addErrorEvent( aPluginName: string, aEventFunc: OnNetErrorFunc ): number;

    removeOnlineEvent( aPluginName: string ): number;
    removeOfflineEvent( aPluginName: string ): number;
    removeErrorEvent( aPluginName: string ): number;
    removeAllEvent( aPluginName: string ): number;


    // Connect-Funktionen


    /**
     * Neue Ueberpruefung der Internet-Verbindung starten
     * 
     * @param aConfig - optionale Parameter
     */

    checkConnect( aConfig?: any ): Promise<any>;


    /**
     * pruefen auf aktive Internet-Verbindung
     */

    isOnline(): boolean;

}
