/** @packageDocumentation
 * GoogleModul zur Initialisierung von Google mit den Credentials
 *
 * API-Version: 1.1
 * Datum:       13.03.2020
 *
 * Letzte Aenderung: 19.10.2020
 * Status: rot
 *
 * @module cloud-google
 * @author SB
 */


// cloud-google

import { CloudGoogle } from './cloud-google';
import { GoogleModuleConfigInterface } from './google-module-config.interface';
import { GoogleModuleOptionInterface } from './google-module-option.interface';


/**
 * Klasse GoogleModul zur Initialisierung des Google Cloud-Services
 */

export class GoogleModule {


    // statische Klasse

    private constructor() {}


    /**
     * Hier wird Google initialsiert
     *
     * @param {GoogleModuleOptionInterface} aGoogleOption - Parameter fuer Google
     * @param {(boolean)=>void} aCallback - Rueckgabefunktion fuer Google-Flag
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlermeldungen
     */

    static init( aGoogleOption: GoogleModuleOptionInterface, aCallback?: (aGoogleFlag: boolean) => void, aErrorOutputFlag = false ): void {
        // Fehlerausgabe einstellen
        if ( aErrorOutputFlag ) {
            CloudGoogle.setErrorOutputOn();
        } else {
            CloudGoogle.setErrorOutputOff();
        }
        // pruefen auf Mock einschalten
        if ( aGoogleOption && aGoogleOption.googleMockFlag ) {
            aGoogleOption['googlePortName'] = 'CloudGoogleMock';
        }
        // starten von Google
        let googleFlag = false;
        if ( CloudGoogle.init( aGoogleOption ) === 0 ) {
            CloudGoogle.open((aError: any, aPortName: string, aPortResult: number) => {
                if ( aError === null && aPortResult === 0 ) {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Google ist vorhanden');
                    }
                    googleFlag = true;
                } else {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Google ist nicht geoeffnet');
                    }
                }
                aCallback( googleFlag );
            });
        } else {
            if ( aErrorOutputFlag ) {
                console.log('===> Google ist nicht initialisiert');
            }
            aCallback( googleFlag );
        }
    }


    /**
     * Freigabe des Google-Moduls
     */

    static done() {
        CloudGoogle.done();
    }


    /**
     * Eintragen neuer Google-Credentials, wenn Google mit danamischen Credetials initialsiert wurde
     *
     * @param aConfigData - neue Credentials fuer Google eintragen
     *
     * @return Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: GoogleModuleConfigInterface ): number {
        // console.log('GoogleModule.setConfig:', aConfigData);
        return CloudGoogle.setConfig( aConfigData );
    }


    /**
     * Rueckgabe der eingetragenen Google-Credentials, wenn Google mit dynamischen Credetials initialsiert wurde
     *
     * @return aConfigData - neue Credentials fuer Google eintragen
     */

    static getConfig(): GoogleModuleConfigInterface {
        return CloudGoogle.getConfig();
    }

}
