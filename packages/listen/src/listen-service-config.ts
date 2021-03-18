/**
 * ListenService Konfiguration, wird in ListenService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       24.10.2020
 *
 * @module listen
 * @author SB
 */


// listen

import { LISTEN_DE_LANGUAGE } from './listen-const';
import { ListenOptionInterface } from './listen-option.interface';


/** @export
 * ListenService Konfiguration, um Listen anzupassen
 */

export const ListenServiceConfig: ListenOptionInterface = {
    /** ein/ausschalten der Listenkomponente */
    activeFlag: true,
    /** setzt die Sprache fuer die Spracheingabe ( 'de', 'en' )*/
    listenLanguage: LISTEN_DE_LANGUAGE,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

