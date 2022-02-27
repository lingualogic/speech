/** @packageDocumentation
 * NLU Anbindung an den Cloud-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 28.10.2021
 * Status: rot
 *
 * @module cloud/device
 * @author SB
 */


// cloud

import { CLOUD_NLU_TYPE } from './cloud-device-const';
import { ICloudDeviceConfig } from './cloud-device-config.interface';
import { ICloudConnect } from '../net/cloud-connect.interface';
import { CloudDevice } from './cloud-device';


export class CloudDeviceNLU extends CloudDevice {


    /**
     * Erzeugt eine Instanz von NLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */

    constructor( aConfig: ICloudDeviceConfig, aConnect: ICloudConnect ) {
        super( aConfig, aConnect );
    }


    getClassName(): string {
        return 'CloudDeviceNLU';
    }

    
    getType(): string {
        return CLOUD_NLU_TYPE;
    }


    // NLU-Funktionen


    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */

    protected _start( aOptions: any ): number {
       return 0;
    }


    protected _stop(): number {
        return 0;
    }

}
