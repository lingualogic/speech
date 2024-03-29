/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der Html5 UserMeda-Klasse und -Instanz
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module audio/common
 * @author SB
 */


// core

import { Factory } from '@lingualogic-speech/core';


// Konstanten

export const USERMEDIA_FACTORY_NAME = 'UserMediaFactory';
export const USERMEDIA_TYPE_NAME = 'UserMedia';


/**
 * Die UserMediaFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-UserMedia
 */

export class UserMediaFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || USERMEDIA_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return USERMEDIA_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return USERMEDIA_FACTORY_NAME;
    }


    /**
     * Erzeugt ein neues Objekt
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aObjectClass?: string, aRegisterFlag = true ): any {
        // console.log( 'UserMediaFactory.create: navigator.mediaDevices = ', navigator.mediaDevices);
        try {
            // pruefen auf MediaDevice
            if ( navigator.mediaDevices === undefined ) {
                // console.log( 'UserMediaFactory.create: no mediaDevices' );
                (navigator as any).mediaDevices = {};
            }

            // pruefen auf nicht vorhandenes getUserMedia
            if ( navigator.mediaDevices.getUserMedia === undefined ) {
                // console.log( 'UserMediaFactory.create: no getUserMedia' );
                // deprecated Funktion holen
                const getUserMedia = (navigator as any).getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia || (navigator as any).msGetUserMedia || null;
                if ( getUserMedia ) {
                    // console.log( 'UserMediaFactory.create: alte getUserMedia gefunden' );
                    // alte getUserMedia-Funktion
                    navigator.mediaDevices.getUserMedia = (constraints: any) => {
                        return new Promise((resolve: any, reject: any) => {
                            getUserMedia.call( navigator, constraints, resolve, reject );
                        });
                    };
                } else {
                    // es gibt keine getUserMedia-Funktion
                    // console.log( 'UserMediaFactory.create: getUserMedia = null' );
                    return null;
                }
            }
            // gekapselte getUserMedia-Funktion zurueckgeben
            return (aConstraints: any) => navigator.mediaDevices.getUserMedia(aConstraints);
        } catch (aException) {
            this.exception( 'create', aException );
            return null;
        }
    }


    /**
     * Version mit deprecated getUserMedia-Funktionen, muss spaeter durch die neuere navigator.deviceMedia.getUserMedia() Funktion ersetzt werden !
     *
     * @param aObjectName - reserviert
     * @param aRegisterFlag - reserviert
     */

    // TODO: funktioniert nicht mit Safari
    /*
    create( aObjectName?: string, aRegisterFlag = true ): any {
        try {
            // Deprecated Version von getUserMedia zurueckgeben !
            navigator.getUserMedia = (navigator as any).getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia || (navigator as any).msGetUserMedia || null;
            return (navigator as any).getUserMedia;
        } catch (aException) {
            this.exception( 'create', aException );
            return null;
        }
    }
    */

}
