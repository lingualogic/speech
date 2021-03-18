/**
 * RasaModul zur Initialisierung von Rasa mit den Credentials
 *
 * API-Version: 1.0
 * Datum:       11.07.2019
 *
 * Letzte Aenderung: 19.10.2019
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// cloud-rasa

import { CloudRasa } from './cloud-rasa';
import { RasaModuleConfigInterface } from './rasa-module-config.interface';
import { RasaModuleOptionInterface } from './rasa-module-option.interface';


/**
 * Klasse RasaModul zur Initialisierung des Rasa Cloud-Services
 */

export class RasaModule {


    // statische Klasse

    private constructor() {}


    /**
     * Hier wird Rasa initialsiert
     *
     * @param {RasaModuleOptionInterface} aRasaOption - Parameter fuer Rasa
     * @param {(boolean)=>void} aCallback - Rueckgabefunktion fuer Rasa-Flag
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlermeldungen
     */

    static init( aRasaOption: RasaModuleOptionInterface, aCallback?: (aRasaFlag: boolean) => void, aErrorOutputFlag = false ): void {
        // Fehlerausgabe einstellen
        if ( aErrorOutputFlag ) {
            CloudRasa.setErrorOutputOn();
        } else {
            CloudRasa.setErrorOutputOff();
        }
        // pruefen auf Mock einschalten
        if ( aRasaOption && aRasaOption.rasaMockFlag ) {
            aRasaOption['rasaPortName'] = 'CloudRasaMock';
        }
        // starten von Rasa
        let rasaFlag = false;
        if ( CloudRasa.init( aRasaOption ) === 0 ) {
            CloudRasa.open((aError: any, aPortName: string, aPortResult: number) => {
                if ( aError === null && aPortResult === 0 ) {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Rasa ist vorhanden');
                    }
                    rasaFlag = true;
                } else {
                    if ( aErrorOutputFlag ) {
                        console.log('===> Rasa ist nicht geoeffnet');
                    }
                }
                aCallback( rasaFlag );
            });
        } else {
            if ( aErrorOutputFlag ) {
                console.log('===> Rasa ist nicht initialisiert');
            }
            aCallback( rasaFlag );
        }
    }


    /**
     * Freigabe des Rasa-Moduls
     */

    static done() {
        CloudRasa.done();
    }


    /**
     * Eintragen neuer Rasa-Credentials, wenn Rasa mit danamischen Credetials initialsiert wurde
     *
     * @param aConfigData - neue Credentials fuer Rasa eintragen
     *
     * @return Fehlercode 0 oder -1
     */

    static setConfig( aConfigData: RasaModuleConfigInterface ): number {
        return CloudRasa.setConfig( aConfigData );
    }


    /**
     * Rueckgabe der eingetragenen Rasa-Credentials, wenn Rasa mit dynamischen Credetials initialsiert wurde
     *
     * @return aConfigData - neue Credentials fuer Rasa eintragen
     */

    static getConfig(): RasaModuleConfigInterface {
        return CloudRasa.getConfig();
    }

}
