/** @packageDocumentation
 * IntentService Konfiguration, wird in IntentService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.1
 * Datum:       24.10.2020
 *
 * @module intent
 * @author SB
 */


// intent

import { INTENT_DE_LANGUAGE } from './intent-const';
import { IntentOptionInterface } from './intent-option.interface';


/** @export
 * IntentService Konfiguration, um Intent anzupassen
 */

export const IntentServiceConfig: IntentOptionInterface = {
    /** ein/ausschalten der Intentkomponente */
    activeFlag: true,
    /** setzt die Sprache fuer die Sprachanalyse ( 'de', 'en' )*/
    intentLanguage: INTENT_DE_LANGUAGE,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

