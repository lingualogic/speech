/** @packageDocumentation
 * Globale Export-Datei fuer Net
 *
 * Version: 2.0
 * Datum:   24.10.2021
 *
 * Definiert das gesamte Net-API:
 *
 * @module net
 * @author SB
 */


// TODO: nur solange hier, wie es von externen Komponenten verwendet wird
//       wird spaeter wieder entfernt, wenn nur noch intern von Net verwendet
// Common API 

export { FetchFactory, FETCH_FACTORY_NAME, FETCH_TYPE_NAME } from './common/fetch-factory';
export { WebSocketFactory, WEBSOCKET_FACTORY_NAME, WEBSOCKET_TYPE_NAME } from './common/websocket-factory';
// TODO: Probleme mit declare Worker
// export { WebWorkerFactory, WEBWORKER_FACTORY_NAME, WEBWORKER_TYPE_NAME } from './common/webworker-factory';
export { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME, XMLHTTPREQUEST_TYPE_NAME, XMLHTTPREQUEST_TEXT_RESPONSETYPE, XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE } from './common/xmlhttprequest-factory';


// WebSocket API

export { INetBaseWebSocket } from './websocket/net-base-websocket.interface';
export { NetBaseWebSocket } from './websocket/net-base-websocket';


// Global API


export * from './net-const';
export * from './net-event-const';
export * from './net-function.type';
export { NetManager } from './net-manager';
export { NetFactory } from './net-factory';
export { NetConnect } from './net-connect';
export { INet } from './net.interface';
export { NetPlugin } from './net-plugin';
export { NetWebSocket } from './net-websocket';
// TODO: Probleme mit declare Worker
// export { NetWebWorker } from './net-webworker';
