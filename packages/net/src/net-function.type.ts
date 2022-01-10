/** @packageDocumentation
 * Hier sind die Funktionsprototypen von Net definiert
 *
 * Letzte Aenderung: 02.07.2021
 * Status: rot
 *
 * @module net
 * @author SB
 */


// allgemeine Funktionsprototypen

export type OnNetErrorFunc = (aError: any) => number;


// Funktionstypen NetConnect

export type OnNetOnlineFunc = () => number;
export type OnNetOfflineFunc = () => number;


// Funktionsprototpyen fuer WebSocket

export type OnNetOpenFunc = (aUrl?: string) => number;
export type OnNetCloseFunc = () => number;
export type OnNetMessageFunc = (aMessage: any) => number;
