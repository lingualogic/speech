/**
 * BotService Konfiguration, wird in BotService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 1.0
 * Datum:       13.07.2020
 *
 * @module bot
 * @author SB
 */


// bot

import { BotOptionInterface } from './bot-option.interface';


/** @export
 * BotService Konfiguration, um Bot anzupassen
 */

export const BotServiceConfig: BotOptionInterface = {
    /** ein/ausschalten des Bot */
    activeFlag: true,
    /** ein/ausschalten der Sprachausgabe */
    speakFlag: true,
    /** ein/ausschalten der Aktionsverarbeitung */
    actionFlag: true,
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

