/** @packageDocumentation
 * RasaService zur Aenderung der Credentials
 *
 * API-Version: 1.1
 * Datum:       22.07.2019
 *
 * Letzte Aenderung: 19.10.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// rasa

import { RasaModule } from './rasa-module';
import { RasaModuleConfigInterface } from './rasa-module-config.interface';


export class RasaService {


    /**
     * Dummy-Initfunktion fuer Service-Manager
     *
     * @param aOption
     */

    init( aOption: any ): number {
        return 0;
    }


    getName() {
        return 'RasaService';
    }


    /**
     * Uebergabe der Rasa-Credentials
     *
     * @param aAppKey - Rasa AppKey
     * @param aServerUrl - vollstaendige URL des Rasa-Servers (z.B: 'http://localhost:5005')
     */

    setCredentials( aAppKey: string, aServerUrl = ''  ): number {
        const configData: RasaModuleConfigInterface = {
            rasaServerUrl: aServerUrl,
            rasaAppKey: aAppKey
        };
        // console.log('RasaService.setCredentials:', configData);
        return RasaModule.setConfig( configData );
    }

}
