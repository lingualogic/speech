/** @packageDocumentation
 * Definiert die Network fuer CloudRasa
 *
 * Letzte Aenderung: 11.07.2020
 * Status: rot
 *
 * @module cloud-rasa
 * @author SB
 */


// common

import { NetHtml5Connect } from '@speech/common';


export class CloudRasaNetwork extends NetHtml5Connect {


    constructor() {
        super( 'CloudRasaNetwork' );
    }


}
