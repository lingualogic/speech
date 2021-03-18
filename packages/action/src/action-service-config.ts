/**
 * ActionService Konfiguration, wird in ActionService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       13.07.2020
 *
 * @module action
 * @author SB
 */


// action

import { ActionOptionInterface } from './action-option.interface';


/** @export
 * ActionService Konfiguration, um Action anzupassen
 */

export const ActionServiceConfig: ActionOptionInterface = {
    /** ein/ausschalten der Aktionskomponente */
    activeFlag: true,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

