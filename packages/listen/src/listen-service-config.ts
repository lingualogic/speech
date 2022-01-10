/** @packageDocumentation
 * ListenService Konfiguration, wird in ListenService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * @module listen
 * @author SB
 */


// listen

import { LISTEN_DE_LANGUAGE, LISTEN_HTML5_ASR } from './listen-const';
import { IListenOption } from './listen-option.interface';


/** @export
 * ListenService Konfiguration, um Listen anzupassen
 */

export const ListenServiceConfig: IListenOption = {
    /** ein/ausschalten der Listenkomponente */
    activeFlag: true,
    /** Liste aller ASRs */
    asrList: [],
    /** Einstellen der Default-ASR */
    asrDefault: LISTEN_HTML5_ASR,
    /** setzt die Sprache fuer die Spracheingabe ( 'de', 'en' )*/
    listenLanguage: LISTEN_DE_LANGUAGE,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

