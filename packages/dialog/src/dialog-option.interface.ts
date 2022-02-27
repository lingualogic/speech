/** @packageDocumentation
 * DialogOption Schnittstelle
 *
 * API-Version: 2.0
 * Datum:       13.10.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// base

import { IBaseOption } from '@lingualogic-speech/base';


/** @export
 * DialogOption Schnittstelle fuer optionale Konfigurationsparameter von Dialog bei der Initialisierung
 */

export interface IDialogOption extends IBaseOption {
    /** Startdialogname, wenn ein Dialog gestartet wird, z.B: 'main' */
    dialogName?: string;
    /** Startdialogzustand, wenn ein Dialog gestartet wird, z.B: 'root' */
    dialogRootState?: string;
    /** legt fest, ob ein Dialog direkt bei der Initialisierung geladen wird */
    dialogLoadFlag?: boolean;
    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien, muss mit '/' abgeschlossen werden, z.B.: 'assets/' */
    dialogFilePath?: string;
    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei, z.B: 'speech.def' */
    dialogFileName?: string;
}


/**
 * @deprecated Ersetzen mit IDialogOption, wird in Version 0.7 entfernt
 */

 export interface DialogServiceOptionInterface extends IDialogOption {}
