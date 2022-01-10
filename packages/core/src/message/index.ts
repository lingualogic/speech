/** @packageDocumentation
 * Globale Export-Datei fuer Message
 *
 * Version: 2.0
 * Datum:   02.07.2021
 *
 * Definiert das gesamte Message-API:
 *
 *      MessageConst     - Message Konstanten
 *      MessageFunc      - Message-Funktionen
 *      IMessage         - Message-Interface fuer alle Message-Objekte
 *
 * @module core/message
 * @author SB
 */


// Global API


export * from './message-const';
export { SendMessageFunc, HandleMessageFunc } from './message-function.type';
export { IMessage } from './message.interface';

