/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Listen API Instanz
 *
 * API-Version: 2.0
 * Datum: 28.06.2021
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// core

import { SystemManager } from '@speech/core';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENT_NAME, LISTEN_MOCK_NAME } from './listen-const';
import { ListenComponentBuilder } from './component/listen-component-builder';
import { IListenOption } from './listen-option.interface';
import { IListen } from './listen.interface';
import { ListenMobile } from './listen-mobile';
import { Listen } from './listen';


// Global API


/** @export
 * Statische Klasse zur Erzeugung einer ListenComponent Instanz.
 */

export class ListenFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    /* typescript-eslint-disable no-empty-function */
    private constructor() {
        // statische Klasse
    }


    /**
     * Kann verschiedene Versionen von Listen
     * zurueckgeben, einschließlich eines Listen-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Listen
     * @param {IListenOption} aOption - optionale Parameter
     *
     * @return {IListen} Listen Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: IListenOption ): IListen {
        const name = aName || LISTEN_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( name === LISTEN_MOCK_NAME ) {
            // TODO: Einbau des Listen-Mocks
            // return new ListenMock();
        }

        // pruefen auf Cordova-Plugin

        try {
            // pruefen auf cordova

            if ( (window as any).cordova ) {
                // pruefen auf ListenPlugin von Cordova

                if ( (window as any).ListenPlugin ) {
                    console.log('ListenFactory: mobiles Plugin:', (window as any).ListenPlugin);
                    return new ListenMobile( aOption );
                }
            }
        } catch ( aException ) {
            console.log('===> EXCEPTION ListenFactory.create: mobile Exception', aException.message);
        }

        try {
            // pruefen auf vorhandenen Builder
            if ( !SystemManager.findBuilder( LISTEN_TYPE_NAME )) {
                // Default-Builder fuer Action eintragen
                if ( SystemManager.insertBuilder( LISTEN_TYPE_NAME, new ListenComponentBuilder( '', false )) !== 0 ) {
                    console.log('ListenFactory.create: kein Builder eingetragen');
                    return null;
                }
            }
            return new Listen( aOption );
        } catch ( aException ) {
            console.log('ListenFactory.create: web Exception', aException);
            return null;
        }
    }

}
