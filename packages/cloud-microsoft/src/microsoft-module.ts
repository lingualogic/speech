/**
 * MicrosoftModul zur Initialisierung von Microsoft mit den Credentials
 *
 * API-Version: 1.0
 * Datum:       20.06.2019
 *
 * Letzte Aenderung: 19.10.2020
 * Status: rot
 *
 * @module cloud-microsoft
 * @author SB
 */


// cloud-microsoft

import { CloudMicrosoft } from './cloud-microsoft';


// microsoft

import { MicrosoftModuleConfigInterface } from './microsoft-module-config.interface';
import { MicrosoftModuleOptionInterface } from './microsoft-module-option.interface';


/**
 * Klasse MicrosoftModul zur Initialisierung des Microsoft Cloud-Services
 */

export class MicrosoftModule {


    // statische Klasse

    private constructor() {}


    /**
     * Hier wird Microsoft initialsiert
     *
     * @param {MicrosoftModuleOptionInterface} aMicrosoftOption - Parameter fuer Microsoft
     * @param {(boolean)=>void} aCallback - Rueckgabefunktion fuer Microsoft-Flag
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlermeldungen
     */

    // tslint:disable-next-line: max-line-length
    static init( aMicrosoftOption: MicrosoftModuleOptionInterface, aCallback?: (aMicrosoftFlag: boolean) => void, aErrorOutputFlag = false ): void {
        // Fehlerausgabe einstellen
        if ( aErrorOutputFlag ) {
            CloudMicrosoft.setErrorOutputOn();
        } else {
            CloudMicrosoft.setErrorOutputOff();
        }
        // pruefen auf Mock einschalten
        if ( aMicrosoftOption && aMicrosoftOption.microsoftMockFlag ) {
            aMicrosoftOption['microsoftPortName'] = 'CloudMicrosoftMock';
        }
        // starten von Microsoft
        let microsoftFlag = false;
        if ( CloudMicrosoft.init( aMicrosoftOption ) === 0 ) {
            CloudMicrosoft.open((aError: any, aPortName: string, aPortResult: number) => {
                if ( aError === null && aPortResult === 0 ) {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Microsoft ist vorhanden');
                    }
                    microsoftFlag = true;
                } else {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Microsoft ist nicht geoeffnet');
                    }
                }
                aCallback( microsoftFlag );
            });
        } else {
            if ( aErrorOutputFlag ) {
                console.log('===> Microsoft ist nicht initialisiert');
            }
            aCallback( microsoftFlag );
        }
    }


    /**
     * Freigabe des Microsoft-Moduls
     */

    static done() {
        CloudMicrosoft.done();
    }


    /**
     * Eintragen neuer Microsoft-Credentials, wenn Microsoft mit danamischen Credetials initialsiert wurde
     *
     * @param aConfigData - neue Credentials fuer Microsoft eintragen
     *
     * @return Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: MicrosoftModuleConfigInterface ): number {
        // console.log('MicrosoftModule.setConfig:', aConfigData);
        return CloudMicrosoft.setConfig( aConfigData );
    }


    /**
     * Rueckgabe der eingetragenen Microsoft-Credentials, wenn Microsoft mit dynamischen Credetials initialsiert wurde
     *
     * @return aConfigData - neue Credentials fuer Microsoft eintragen
     */

    static getConfig(): MicrosoftModuleConfigInterface {
        return CloudMicrosoft.getConfig();
    }

}
