/** @packageDocumentation
 * AmazonModul zur Initialisierung von Amazon mit den Credentials
 *
 * API-Version: 1.0
 * Datum:       03.04.2019
 *
 * Letzte Aenderung: 19.10.2020
 * Status: rot
 *
 * @module cloud-amazon
 * @author SB
 */


// cloud-amazon

import { CloudAmazon } from './cloud-amazon';
import { AmazonModuleConfigInterface } from './amazon-module-config.interface';
import { AmazonModuleOptionInterface } from './amazon-module-option.interface';


/**
 * Klasse AmazonModul zur Initialisierung des Amazon Cloud-Services
 */

export class AmazonModule {


    // statische Klasse

    private constructor() {}


    /**
     * Hier wird Amazon initialsiert
     *
     * @param {AmazonModuleOptionInterface} aAmazonOption - Parameter fuer Amazon
     * @param {(boolean)=>void} aCallback - Rueckgabefunktion fuer Amazon-Flag
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlermeldungen
     */

    static init( aAmazonOption: AmazonModuleOptionInterface, aCallback?: (aAmazonFlag: boolean) => void, aErrorOutputFlag = false ): void {
        // Fehlerausgabe einstellen
        if ( aErrorOutputFlag ) {
            CloudAmazon.setErrorOutputOn();
        } else {
            CloudAmazon.setErrorOutputOff();
        }
        // pruefen auf Mock einschalten
        if ( aAmazonOption && aAmazonOption.amazonMockFlag ) {
            aAmazonOption['amazonPortName'] = 'CloudAmazonMock';
        }
        // starten von Amazon
        let amazonFlag = false;
        if ( CloudAmazon.init( aAmazonOption ) === 0 ) {
            CloudAmazon.open((aError: any, aPortName: string, aPortResult: number) => {
                if ( aError === null && aPortResult === 0 ) {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Amazon ist vorhanden');
                    }
                    amazonFlag = true;
                } else {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Amazon ist nicht geoeffnet');
                    }
                }
                aCallback( amazonFlag );
            });
        } else {
            if ( aErrorOutputFlag ) {
                console.log('===> Amazon ist nicht initialisiert');
            }
            aCallback( amazonFlag );
        }
    }


    /**
     * Freigabe des Amazon-Moduls
     */

    static done() {
        CloudAmazon.done();
    }


    /**
     * Eintragen neuer Amazon-Credentials, wenn Amazon mit danamischen Credetials initialsiert wurde
     *
     * @param aConfigData - neue Credentials fuer Amazon eintragen
     *
     * @return Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: AmazonModuleConfigInterface ): number {
        // console.log('AmazonModule.setConfig:', aConfigData);
        return CloudAmazon.setConfig( aConfigData );
    }


    /**
     * Rueckgabe der eingetragenen Amazon-Credentials, wenn Amazon mit dynamischen Credetials initialsiert wurde
     *
     * @return aConfigData - neue Credentials fuer Amazon eintragen
     */

    static getConfig(): AmazonModuleConfigInterface {
        return CloudAmazon.getConfig();
    }

}
