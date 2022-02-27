/** @packageDocumentation
 * DialogService Konfiguration, wird in DialogService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 2.0
 * Datum:       09.02.2022
 *
 * @module dialog
 * @author SB
 */


// bot

import { IDialogOption } from './dialog-option.interface';


/** @export
 * DialogService Konfiguration, um Dialog anzupassen
 */

export const DialogServiceConfig: IDialogOption = {
    /** ein/ausschalten des Bot */
    activeFlag: true,
    /** einzustellender Startdialog */
    dialogName: 'main',
    /** Startdialogzustand, wenn ein Dialog gestartet wird */
    dialogRootState: 'home',
    /** legt fest, ob ein Dialog direkt geladen wird */
    dialogLoadFlag: true,
    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien */
    dialogFilePath: 'assets/',
    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei */
    dialogFileName: 'speech.def',
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

