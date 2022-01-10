/** @packageDocumentation
 * ListenService fuer die Integration von Listen in alle UI-Frameworks
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 21.12.2021
 * Status: gelb
 *
 * @module listen
 * @author SB
 */



// listen

import { ListenFactory } from './listen-factory';
import { IListenOption } from './listen-option.interface';
import { ListenBaseService } from './listen-base-service';


/**
 * ListenService Klasse
 *
 * @export
 * @class ListenService
 */

export class ListenService extends ListenBaseService {


    /**
     * Konstruktor fuer Initialisierung des Listen-Service
     */

    constructor() {
        super();
    }


    // Service-Funktionen


    /**
     * Hier wird die Komponente erzeugt.
     *
     * @protected
     * @param aComponentName - Name der zu erzeugenden Komponente
     * @param aOption - optionale Parameter fuer die Initialisierung der Komponente
     *
     * @return {*} Rueckgabe der Listen-Instanz
     */

    protected _createComponent( aComponentName: string, aOption: IListenOption ): any {
        // console.log('ListenService._createComponent:', aComponentName, aOption);
        this.mListen = ListenFactory.create( aComponentName, aOption );
        // console.log('ListenService._createComponent:', typeof this.mListen);
        return this.mListen;
    }

}
