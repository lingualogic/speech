/** @packageDocumentation
 * BotOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       06.09.2018
 *
 * Letzte Aenderung: 21.06.2020
 * Status: gruen
 *
 * @module bot
 * @author SB
 */


// dialog

import { DialogOptionInterface } from '@speech/dialog';


/** @export
 * BotOption Schnittstelle fuer optionale Konfigurationsparameter von Bot bei der Initialisierung
 */

export interface BotOptionInterface extends DialogOptionInterface {
    /** ein/ausschalten der Sprachausgabe */
    speakFlag?: boolean;
    /** ein/ausschalten der Aktionsverarbeitung */
    actionFlag?: boolean;
    /** Verzeichnis, in dem die Audiodateien liegen */
    audioFilePath?: string;
    /** Audioformat MP3 oder WAV */
    audioFormat?: string;
    /** globaler Audiokontext wird von HTML5 definiert, und der App uebergeben */
    audioContext?: AudioContext;
    /** True, wenn Audiodateien abgespielt werden sollen */
    audioFlag?: boolean;
    /** einzustellender Startdialog */
    dialogName?: string;
    /** Startdialogzustand, wenn ein Dialog gestartet wird */
    dialogRootState?: string;
    /** legt fest, ob ein Dialog direkt geladen wird */
    dialogLoadFlag?: boolean;
    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien */
    dialogFilePath?: string;
    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei */
    dialogFileName?: string;
}

