/** @packageDocumentation
 * Die NetBrowserConnect-Komponente dient zum testen einer Internet-Verbindung (online/offline)
 *
 * Letzte Aenderung: 07.07.2021
 * Status: rot
 *
 * @module net/connect
 * @author SB
 */


// net

import { NetBaseConnect } from './net-base-connect';


// TODO: Workaround fuer undefinierte globale Variablen von Browser

declare let window: any;


/**
 * Die Net Klasse kapselt eine Internet
 */

export class NetBrowserConnect extends NetBaseConnect {


    /**
     * Konstruktor fuer Browser-Connect
     */

    constructor() {
        super( 'NetBrowserConnect' );
    }


    getRuntimeType(): string {
        return 'browser';
    }


    /**
     * Initialisieurng fuer Verbindungspruefung
     * 
     * @returns 0 oder -1
     */

    protected _initConnect(): number {
        // Ereignisse online/offline mit Funktionen verbinden
        try {
            // pruefen auf Browser Laufzeitumgebung
            if ( typeof window !== 'undefined' ) {
                window.ononline = () => this._onOnline();
                window.onoffline = () => this._onOffline();
                return 0;
            } else {
                console.log('NetBrowserConnect._initConnect: keine Browser Laufzeitumgebung');
            }
        } catch ( aException ) {
            this.exception( 'init', aException );
        }
        return -1;
    }


    /**
     * Freigabe
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        window.ononline = null;
        window.onoffline = null;
        return super.done();
    }


    /**
     * pruefen auf Online im Browser
     * 
     * @returns true, wenn Online, sonst false
     */

    isOnline(): boolean {
        if ( navigator ) {
            return navigator.onLine;
        }
        return false;
    }

}
