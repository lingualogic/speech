/** @packageDocumentation
 * Event-Funktionstypen
 *
 * Letzte Aenderung: 02.07.2021
 * Status: rot
 *
 * @module core/message
 * @author SB
 */


import { IMessage } from './message.interface';


// Funktionen

export type SendMessageFunc = ( aMessage: IMessage ) => number;
export type HandleMessageFunc = ( aMessage: IMessage ) => boolean;

