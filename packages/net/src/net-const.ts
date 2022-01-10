/** @packageDocumentation
 * Globale Konstanten fuer Net
 *
 * Letzte Aenderung: 03.05.2019
 * Status: gelb
 *
 * @module net
 * @author SB
 */


// Konstanten

export const NET_FACTORY_NAME = 'NetFactory';
export const NET_WEBWORKER_NAME = 'NetWebWorker';
export const NET_WEBSOCKET_NAME = 'NetWebSocket';
export const NET_MOCK_NAME = 'NetMock';
export const NET_WEBSOCKET_TYPE = 'WebSocket';
export const NET_WEBWORKER_TYPE = 'WebWorker';
export const NET_DEFAULT_TYPE = NET_WEBSOCKET_TYPE;

// Default Net-Komponente

export const NET_PLUGIN_NAME = NET_WEBSOCKET_NAME;


// WebSocket-Konstanten

/** @constant {string} NET_WEBSOCKET_URL - Adresse einer Websocket */
export const NET_WEBSOCKET_URL = 'ws://localhost:7050';

/** @constant {number} NET_CONNECT_INTERVAL - Zeitintervall fuer Verbindung erneut aufbauen */
export const NET_CONNECT_INTERVAL = 5000;
