/** @packageDocumentation
 * globale Dialog-Daten Interfaces fuer den Json-Transformer
 *
 * API-Version: 2.0
 * Datum:   13.10.2021
 *
 * Letzte Aenderung: 13.10.2021
 * Status: rot
 *
 * @module dialog
 * @author SB
 */


 /**
  * DialogState-Daten beinhaltet den Name des States und eine Liste der zugeordneten Intentnamen
  */

export interface IDialogState {
    // State-Name
    name: string;
    // Liste der Intent-Namen
    intentList: Array<string>;
}


/**
 * DialogCommand-Daten beinhaltet den Namen des Kommandos (ACTION, SPEAK, WAIT) und weitere optionale
 * Parameter.
 *
 * ACTION:  action  - Name der auszufuehrenden Funktion
 *          type    - Name des Elementtyps (ButtonOnly z.B)
 *          element - Name des Elementes
 *
 * SPEAK:   textId  - Name des auszugebenden Textes/Audiofdatei
 *
 * WAIT:    time    - Zeit in Sekunden, die gewartet werden soll
 */

export interface IDialogCommand {
    // Name des Kommandos (ACTION, SPEAK, WAIT)
    name: string;
    // Aktionsname, fuer auszufuehrende Aktion
    action?: string;
    // Elementtypname, um Elementtyp fuer die Aktion festzulegen
    type?: string;
    // Elementname, um Element fuer die Aktion festzulegen
    element?: string;
    // Textname, fuer die Ausgabe eines Textes in SPEAK
    textId?: string;
    // Zeit, fuer Warten in Sekunden bei WAIT
    time?: number;
}


/**
 * DialogIntent beinhaltet den Namen eines Intents, eine Kommandoliste der auszufuehrenden Aktionen des Intents
 * und weitere Flags fuer Optionen und Scrollbar.
 */

export interface IDialogIntent {
    // Name des Intents
    name: string;
    // Liste aller Kommandos, die der Intent ausfuehren soll
    commandList: Array<IDialogCommand>;
    // Optional-Flag, Ausgabe erfolgt nur bei Vorhandensein des Intents
    optional?: boolean;
    // Scroll-Flag, wenn Aktion sich auf scrollbare Elemente bezieht
    scrollable?: boolean;
}


/**
 * DialogText beinhaltet einen Textnamen, einen auszugebenden Text und die Zeit, die der Text fuer die Ausgabe benoetigt.
 */

export interface IDialogText {
    // Name des Textes
    name: string;
    // auszugebender Text
    text: string;
    // Zeit, die der Text fuer die Ausgabe benoetigt
    time: number;
}


/**
 * DialogData beinhaltet alle Daten fuer einen Dialog
 */

export interface IDialogData {
    // Dialogname
    name: string;
    // Liste aller Dialog-States
    stateList: IDialogState[];
    // Liste aller Dialog-Intents
    intentList: IDialogIntent[];
    // Liste aller Dialog-Texte
    textList: IDialogText[];
}


/**
 * @deprecated Ersetzen mit IDialogState, wird in Version 0.7 entfernt
 */

export interface DialogServiceStateInterface extends IDialogState {}


/**
 * @deprecated Ersetzen mit IDialogCommand, wird in Version 0.7 entfernt
 */

export interface DialogServiceCommandInterface extends IDialogCommand {}
 
 
/**
 * @deprecated Ersetzen mit IDialogIntent, wird in Version 0.7 entfernt
 */

export interface DialogServiceIntentInterface extends IDialogIntent {}
 
 
/**
 * @deprecated Ersetzen mit IBotText, wird in Version 0.7 entfernt
 */
 
export interface DialogServiceTextInterface extends IDialogText {}


/**
 * @deprecated Ersetzen mit IDialogData, wird in Version 0.7 entfernt
 */

export interface DialogServiceDataInterface extends IDialogData {}


