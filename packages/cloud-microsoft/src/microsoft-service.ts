/** @packageDocumentation
 * MicrosoftService zur Aenderung der Credentials
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


// microsoft

import { MicrosoftModule } from './microsoft-module';
import { MicrosoftModuleConfigInterface } from './microsoft-module-config.interface';


export class MicrosoftService {


    /**
     * Dummy-Initfunktion fuer Service-Manager
     *
     * @param aOption
     */

    init( aOption: any ): number {
        return 0;
    }


    getName() {
        return 'MicrosoftService';
    }


    /**
     * Uebergabe der Microsoft-Credentials
     *
     * @param aRegion - Microsoft Region
     * @param aSubscriptionKey - Microsoft Credentials
     */

    setCredentials( aRegion: string, aSubscriptionKey: string, aLuisEndpoint = '' ): number {
        const configData: MicrosoftModuleConfigInterface = {
            microsoftRegion: aRegion,
            microsoftSubscriptionKey: aSubscriptionKey,
            microsoftLuisEndpoint: aLuisEndpoint
        };
        // console.log('MicrosoftService.setCredentials:', configData);
        return MicrosoftModule.setConfig( configData );
    }

}
