/**
 * Speech-Net Bundle
 *
 * Version: 0.6.1
 * Build:   0002
 * TYPE:    alpha
 * Datum:   08.01.2022
 *
 * Autor:   LinguaLogic Team
 * Lizenz:  MIT
 *
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

!function(e,t){'object'==typeof exports&&'undefined'!=typeof module?t(exports,require('@speech/core')):'function'==typeof define&&define.amd?define(['exports','@speech/core'],t):t((e='undefined'!=typeof globalThis?globalThis:e||self).speechNet={},e.speechCore)}(this,(function(e,t){'use strict';
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function n(e,t,n,r){return new(n||(n=Promise))((function(s,o){function i(e){try{a(r.next(e))}catch(e){o(e)}}function c(e){try{a(r.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}a((r=r.apply(e,t||[])).next())}))}const r='FetchFactory',s='Fetch';class o extends t.Factory{constructor(e,t=!0){super(e||r,t),this.mFetchFunc=null,this.fetchInitPromise=null,this.runtimeType='undefined',this.fetchInitPromise=this._initFetch(),this.fetchInitPromise.then((()=>{this.fetchInitPromise=null}))}_initFetch(){return n(this,void 0,void 0,(function*(){if('undefined'!=typeof process&&process.versions&&process.versions.node)try{const e="node-fetch",t=yield import(e);console.log('FetchFactory._initFetch: fetch = ',t),t&&t.default?this.mFetchFunc=t.default:this.mFetchFunc=t,this.runtimeType='node'}catch(e){console.log('FetchFactory._initFetch: node-fetch Package wurde nicht geladen ',e)}else if('undefined'!=typeof window)try{void 0!==window.fetch&&(this.mFetchFunc=window.fetch),this.mFetchFunc&&(this.runtimeType='browser')}catch(e){console.log('FetchFactory._initFetch: fetch-Funktion wurde nicht geladen ',e)}else console.log('FetchFactory._initFetch: kein fetch-Funktion geladen')}))}isMock(){return!1}getType(){return s}getName(){return r}create(e,t,n=!0){if(this.fetchInitPromise)throw new Error('FetchFactory.create: Laden der fetch-Funktion nicht abgeschlossen');return this.mFetchFunc}createAsync(e,t,r=!0){return n(this,void 0,void 0,(function*(){if(this.fetchInitPromise){try{yield this.fetchInitPromise}catch(e){console.log('FetchFactory.createAsync: Exception ',e)}this.fetchInitPromise=null}return this.create(e,t,r)}))}}const i='WebSocketFactory',c='WebSocket';class a extends t.Factory{constructor(e,t=!0){super(e||i,t),this.mWebSocketClass=null,this.webSocketClassPromise=null,this.runtimeType='undefined',this.webSocketClassPromise=this._initWebSocket(),this.webSocketClassPromise.then((()=>{this.webSocketClassPromise=null}))}_initWebSocket(){return n(this,void 0,void 0,(function*(){if('undefined'!=typeof process&&process.versions&&process.versions.node)try{const e="ws",t=yield import(e);t&&t.default?this.mWebSocketClass=t.default:this.mWebSocketClass=t,this.runtimeType='node'}catch(e){console.log('WebSocketFactory._initWebSocket: WS-Package wurde nicht geladen ',e)}else if('undefined'!=typeof window)try{'undefined'!=typeof WebSocket?this.mWebSocketClass=WebSocket:void 0!==window.MozWebSocket?this.mWebSocketClass=window.MozWebSocket:'undefined'!=typeof window&&(this.mWebSocketClass=window.WebSocket||window.MozWebSocket),this.mWebSocketClass&&(this.runtimeType='browser')}catch(e){console.log('WebSocketFactory._initWebSocket: WebSocket-Klasse wurde nicht geladen ',e)}else console.log('WebSocketFactory._initWebSocket: kein WebSocket-Klasse geladen')}))}isMock(){return!1}getType(){return c}getName(){return i}create(e,t,n=!0){if(this.webSocketClassPromise)throw new Error('WebSocketFactory.create: Laden der WebSocket-Klasse nicht abgeschlossen');return this.mWebSocketClass}createAsync(e,t,r=!0){return n(this,void 0,void 0,(function*(){if(this.webSocketClassPromise){try{yield this.webSocketClassPromise}catch(e){console.log('WebSocketFactory.createAsync: Exception ',e)}this.webSocketClassPromise=null}return this.create(e,t,r)}))}}const u='XMLHttpRequestFactory',h='XMLHttpRequest';class l extends t.Factory{constructor(e,t=!0){super(e||u,t)}isMock(){return!1}getType(){return h}getName(){return u}create(e,t,n=!0){try{return XMLHttpRequest||null}catch(e){return this.exception('create',e),null}}getXMLHttpRequestClass(){return this.create()}}class m extends t.ErrorBase{constructor(e){super(e||'NetBaseWebSocket'),this.mRuntimeType='undefined',this.mWebSocketClass=null,this.mWebSocketUrl='',this.mWebSocket=null,this.mWebSocketOpenFlag=!1,this.mConnectInfiniteFlag=!1,this.mConnectIntervalId=0,this.mConnectIntervalTimeout=5e3,this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null,this.mOnErrorFunc=null,this.setErrorOutputFunc((e=>this._onError(new Error(e)))),'undefined'!=typeof process&&process.versions&&process.versions.node?this.mRuntimeType='node':'undefined'!=typeof window&&(this.mRuntimeType='browser')}static initFactory(){return n(this,void 0,void 0,(function*(){if(t.FactoryManager.find(i))return!0;const e=t.FactoryManager.get(i,a);return e?!!(yield e.createAsync())||(console.log('NetBaseWebSocket.initFactory: keine WebSocket-Klasse vorhanden'),!1):(console.log('NetBaseWebSocket.initFactory: keine WebSocket-Fabrik vorhanden'),!1)}))}init(e){return this._detectWebSocket()?(e&&e.connectInfiniteFlag&&(this.mConnectInfiniteFlag=!0,this.isErrorOutput()&&console.log('NetBaseWebSocket.init: ConnectInfinite eingeschaltet')),0):-1}done(){return this.mWebSocket&&(this.mWebSocket.onopen=null,this.mWebSocket.onclose=null,this.mWebSocket.onmessage=null,this.mWebSocket.onerror=null,this.close(),this.mWebSocket=null),this.mWebSocketOpenFlag=!1,this.mWebSocketClass=null,this.mWebSocketUrl='',this.mConnectInfiniteFlag=!1,this.mConnectIntervalId=0,this.mConnectIntervalTimeout=5e3,this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null,this.mOnErrorFunc=null,0}isInit(){return!!this.mWebSocketClass}getRuntimeType(){return this.mRuntimeType}_detectWebSocket(){const e=t.FactoryManager.get(i,a);if(!e)return this.error('_detectWebSocket','keine WebSocket-Fabrik vorhanden'),!1;try{if(this.mWebSocketClass=e.create(),null===this.mWebSocketClass)return this.error('_detectWebSocket','keine WebSocketClass vorhanden'),!1}catch(e){return this.exception('_detectWebSocket',e),!1}return!0}open(e){return this.isOpen()?(this.error('open','bereits geoeffnet'),-1):this._connect(e)}close(){if(this.mWebSocketOpenFlag=!1,this.mWebSocket){this._clearInfiniteConnect();try{this.mWebSocket.close(1e3,'Closing normally')}catch(e){return this.exception('close',e),this.mWebSocket=null,-1}}return 0}isOpen(){return this.mWebSocketOpenFlag}isConnect(){return!(!this.mWebSocket||1!==this.mWebSocket.readyState)}getState(){if(!this.mWebSocket)return'NULL';let e='';switch(this.mWebSocket.readyState){case 0:e='CONNECTING';break;case 1:e='OPEN';break;case 2:e='CLOSING';break;case 3:e='CLOSED';break;default:e='UNKNOW'}return e}sendMessage(e){if(!this.isOpen())return this.error('sendMessage','WebSocket ist nicht geoeffnet'),-1;if(!this.mWebSocket)return this.error('sendMessage','keine WebSocket vorhanden'),-1;try{return this.mWebSocket.send(JSON.stringify(e)),0}catch(e){return this.exception('sendMessage',e),-1}}sendStream(e){if(!this.isOpen())return this.error('sendStream','WebSocket ist nicht geoeffnet'),-1;if(!this.mWebSocket)return this.error('sendStream','keine WebSocket vorhanden'),-1;try{return this.mWebSocket.send(e),0}catch(e){return this.exception('sendStream',e),-1}}get webSocket(){return this.mWebSocket}set webSocketUrl(e){this.mWebSocketUrl=e}get webSocketUrl(){return this.mWebSocketUrl}set onOpen(e){this.mOnOpenFunc=e}set onClose(e){this.mOnCloseFunc=e}set onMessage(e){this.mOnMessageFunc=e}set onError(e){this.mOnErrorFunc=e}_onOpen(){if('function'==typeof this.mOnOpenFunc)try{return this.mOnOpenFunc(this.mWebSocketUrl)}catch(e){return this.exception('_onOpen',e),-1}return 0}_onClose(){if('function'==typeof this.mOnCloseFunc)try{return this.mOnCloseFunc()}catch(e){return this.exception('_onClose',e),-1}return 0}_onMessage(e){if('function'==typeof this.mOnMessageFunc)try{return this.mOnMessageFunc(e)}catch(e){return this.exception('_onMessage',e),-1}return 0}_onError(e){if('function'==typeof this.mOnErrorFunc)try{let t=e;return'error'===e.type&&this.mWebSocket&&3===this.mWebSocket.readyState&&(t=new Error('Verbindung wurde nicht aufgebaut')),this.mOnErrorFunc(t)}catch(e){return this.isErrorOutput()&&console.log('===> EXCEPTION NetBaseWebSocket._onError: ',e.message),-1}return 0}_webSocketOpen(e){return this.mWebSocketOpenFlag=!0,this._clearInfiniteConnect(),0!==this._onOpen()?-1:0}_webSocketClose(e){return this.mWebSocketOpenFlag=!1,this.mWebSocket=null,this._setInfiniteConnect(),this._onClose()}_webSocketMessage(e){try{return this._onMessage(e)}catch(e){return this.exception('_webSocketMessage',e),-1}}_webSocketError(e){return this._onError(new Error('WebSocket wurde nicht verbunden'))}_connect(e){if(this.isOpen())return 0;if(this.mWebSocket)return this.error('_connect','webSocket noch nicht geschlossen'),-1;if(!this.mWebSocketClass)return this.error('_connect','keine WebSocketClass vorhanden'),-1;if(e&&(this.mWebSocketUrl=e),!this.mWebSocketUrl)return this.error('_connect','keine WebSocketUrl vorhanden'),-1;try{return this.mWebSocket=new this.mWebSocketClass(this.mWebSocketUrl),this.mWebSocket?(this.mWebSocket.binaryType='arraybuffer',this.mWebSocket.onopen=e=>this._webSocketOpen(e),this.mWebSocket.onclose=e=>this._webSocketClose(e),this.mWebSocket.onmessage=e=>this._webSocketMessage(e),this.mWebSocket.onerror=e=>this._webSocketError(e),0):(this.error('_connect','keine WebSocket erzeugt'),-1)}catch(e){return this.exception('_connect',e),this.mWebSocket=null,-1}}_setInfiniteConnect(){this.mConnectInfiniteFlag&&0===this.mConnectIntervalId&&(this.mConnectIntervalId=setInterval((()=>{this._connect(this.mWebSocketUrl)}),this.mConnectIntervalTimeout))}_clearInfiniteConnect(){0!==this.mConnectIntervalId&&(clearInterval(this.mConnectIntervalId),this.mConnectIntervalId=0)}}const k='NetFactory',W='NetWebWorker',d='NetWebSocket',b='WebSocket',f=d,p='ws://localhost:7050',g='onlineNet',E='offlineNet',S='errorNet',F='NetBaseWebSocketFactory';class O extends t.Factory{constructor(e,t=!0){super(e||F,t)}isMock(){return!1}getType(){return"NetBaseWebSocket"}getName(){return F}create(e,t,n=!0){try{return new m(e)}catch(e){return null}}}class y{static init(){return n(this,void 0,void 0,(function*(){return y.mInitFlag?0:(y.mBaseWebSocketFactory=y._initBaseWebSocket(),y.mBaseWebSocketFactory&&(yield m.initFactory())?(y.mInitFlag=!0,0):-1)}))}static isInit(){return y.mInitFlag}static clear(){y._doneBaseWebSocket(),y.mInitFlag=!1}static _initBaseWebSocket(){return t.FactoryManager.get(F,O)}static _doneBaseWebSocket(){y.mBaseWebSocketMap.forEach((e=>{e.done()})),y.mBaseWebSocketMap.clear(),y.mBaseWebSocketFactory=null}static _addBaseWebSocket(e){if(!e)return null;if(y.mBaseWebSocketFactory){const t=y.mBaseWebSocketFactory.create(e);if(t){if(0===t.init())return y.mBaseWebSocketMap.set(e,t),t;console.log('NetBaseManager.addBaseWebSocket: Socket nicht initalisiert'),t.done()}else console.log('NetBaseManager.addBaseWebSocket: Socket nicht erzeugt')}return console.log('NetBaseManager.addBaseWebSocket: keine Factory vorhanden'),null}static removeBaseWebSocket(e){const t=y.mBaseWebSocketMap.get(e);t&&(t.done(),y.mBaseWebSocketMap.delete(e))}static findBaseWebSocket(e){if(e){const t=y.mBaseWebSocketMap.get(e);if(t)return t}return null}static getBaseWebSocket(e){const t=y.findBaseWebSocket(e);return t||y._addBaseWebSocket(e)}}y.mInitFlag=!1,y.mBaseWebSocketFactory=null,y.mBaseWebSocketMap=new Map;class _ extends t.Plugin{constructor(e,t=!0){super(e,t),this.mHandleMessageList=new Map,this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null}getType(){return'NetPlugin'}getClass(){return'NetPlugin'}init(e){return this.mOnMessageFunc=this.getHandleMessageFunc(),super.init(e)}done(){return this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null,super.done()}_onOpen(){if('function'==typeof this.mOnOpenFunc)try{return this.mOnOpenFunc()}catch(e){return this.exception('_onOpen',e),-1}return 0}_onClose(){if('function'==typeof this.mOnCloseFunc)try{return this.mOnCloseFunc()}catch(e){return this.exception('_onClose',e),-1}return 0}_onMessage(e){if('function'==typeof this.mOnMessageFunc)try{return this.mOnMessageFunc(e)}catch(e){return this.exception('_onMessage',e),-1}return 0}open(){return-1}close(){return 0}isOpen(){return!1}getState(){return''}sendMessage(e){return 0}getSendMessageFunc(){return e=>this.sendMessage(e)}handleMessage(e){return this.mHandleMessageList.forEach((t=>{if(t(e))return 0})),-1}getHandleMessageFunc(){return e=>this.handleMessage(e)}setHandleMessageFunc(e,t){return this.mHandleMessageList.set(e,t),0}set onOpen(e){this.mOnOpenFunc=e}get onOpen(){return()=>this._onOpen()}set onClose(e){this.mOnCloseFunc=e}get onClose(){return()=>this._onClose()}set onMessage(e){this.mOnMessageFunc=e}get onMessage(){return e=>this._onMessage(e)}}class C extends _{constructor(e,t=!1){super(e||d,t),this.mBaseWebSocket=null,this.mBaseWebSocket=y.getBaseWebSocket(e||d),this.mBaseWebSocket.onError=this.onError,this.mBaseWebSocket.onOpen=this.onOpen,this.mBaseWebSocket.onClose=this.onClose,this.mBaseWebSocket.onMessage=e=>this._onWebSocketMessage(e)}getClass(){return'NetWebSocket'}getType(){return b}init(e){return this.isInit()?(this.error('init','init doppelt aufgerufen'),-1):0!==this.mBaseWebSocket.init(e)?-1:super.init(e)}done(){try{return this.close(),this.mBaseWebSocket.done(),super.done()}catch(e){return this.exception('done',e),-1}}setErrorOutput(e){super.setErrorOutput(e),this.mBaseWebSocket.setErrorOutput(e)}_onWebSocketMessage(e){if('function'==typeof this.mOnMessageFunc)try{return this.mOnMessageFunc(JSON.parse(e.data))}catch(e){return this.exception('_onWebSocketMessage',e),-1}return 0}open(e){if(!this.isInit())return this.error('open','nicht initialisiert'),-1;if(this.mBaseWebSocket.isOpen())return this.error('.open','bereits geoeffnet'),-1;let t=p;return e&&(t=e),0!==this.mBaseWebSocket.open(t)?(this.error('open','keine Verbindung moeglich'),-1):0}close(){return this.mBaseWebSocket.close()}isOpen(){return this.mBaseWebSocket.isOpen()}getState(){return this.mBaseWebSocket.getState()}sendMessage(e){return this.isOpen()?this.mBaseWebSocket.sendMessage(e):-1}}const N='WebWorkerFactory';class v extends t.Factory{constructor(e,t=!0){super(e||N,t)}isMock(){return!1}getType(){return"WebWorker"}getName(){return N}create(e,t,n=!0){try{return window.Worker||null}catch(e){return this.exception('create',e),null}}getWebWorkerClass(){return this.create()}createWebWorker(e){const t=this.getWebWorkerClass();if(!t)return null;try{return new t(e)}catch(e){return this.exception('createWebWorker',e),null}}}class w extends _{constructor(e=!0){super(W,e),this.mWebWorkerFactory=null,this.mWebWorkerClass=null,this.mWebWorker=null,this.mWebWorkerPath=''}getClass(){return'NetWebWorker'}init(e){return this.isInit()?(this.error('init','init doppelt aufgerufen'),-1):(this.mWebWorkerFactory=t.FactoryManager.get(N,v),this._detectWebWorker()?(e&&e.webWorkerPath&&(this.mWebWorkerPath=e.webWorkerPath),super.init(e)):-1)}done(){return this.mWebWorkerClass=null,this.mWebWorker=null,this.mWebWorkerPath='',this.close(),super.done()}_detectWebWorker(){if(!this.mWebWorkerFactory)return this.error('_detectWebWorker','keine WebWorker-Fabrik vorhanden'),!1;try{this.mWebWorkerClass=this.mWebWorkerFactory.getWebWorkerClass()}catch(e){return this.exception('_detectWebWorker',e),!1}return null!==this.mWebWorkerClass||(this.error('_detectWebWorker','Unable to use the WebWorker API'),!1)}getType(){return t.SPEECH_WEBWORKER_TYPE}_webWorkerOpen(e){const n={type:t.MESSAGE_COMPONENT_TYPE,source:this.getName(),dest:'',action:'start'};return this._onMessage(n),0!==this._onOpen()?-1:0}_webWorkerClose(e){return this._onClose()}_webWorkerMessage(e){try{this._onMessage(e.data)}catch(e){return this.exception('_webWorkerMessage',e),-1}return 0}_webWorkerError(e){return this._onError(e)}open(e){if(!this.isInit())return this.error('open','nicht initialisiert'),-1;if(this.isOpen())return this.error('open','bereits geoeffnet'),-1;try{if(!this.mWebWorkerClass)return this.error('open','keine WebWorkerClass vorhanden'),-1;const e=this.mWebWorkerPath+t.SPEECH_WEBWORKER_PATH+t.SPEECH_WEBWORKER_FILE;return this.mWebWorker=new this.mWebWorkerClass(e),this.mWebWorker?(this.mWebWorker.onmessage=e=>{this._webWorkerMessage(e)},this.mWebWorker.onerror=e=>{e.preventDefault(),console.log('NetWebWorker.open: Error',e),this.mWebWorker=null,this._webWorkerError(new Error('WebWorker nicht initialisiert'))},this._webWorkerOpen('')):(this.error('open','kein WebWorker erzeugt'),-1)}catch(e){return this.exception('open',e),-1}}close(){if(this.mWebWorker){const e=this.mWebWorker;this.mWebWorker=null;try{return this._webWorkerClose(''),e.terminate(),0}catch(e){return this.exception('close',e),-1}}return 0}isOpen(){return!!this.mWebWorker}getState(){return this.mWebWorker?'OPEN':'NULL'}sendMessage(e){if(this.mWebWorker)try{return this.mWebWorker.postMessage(e),0}catch(e){this.exception('sendMessage',e)}return-1}}class M extends t.PluginFactory{constructor(){super('NetFactory'),this._setErrorClassName('NetFactory')}getName(){return k}_newPlugin(e,t,n){if(e!==W&&(e===d||t===d)){return new C(e,n)}return e===W||t===W?new w(n):null}create(e,t="",n=!0){const r=e||f,s=t||f;try{return this._newPlugin(r,s,n)}catch(e){return this.exception('create',e),null}}}class T{static init(){return n(this,void 0,void 0,(function*(){return T.mInitFlag?0:0!==(yield y.init())?-1:(T.mNetFactory=T._initNet(),T.mNetFactory?(T.mInitFlag=!0,0):-1)}))}static isInit(){return T.mInitFlag}static clear(){y.clear(),T._doneWebSocket(),T.mInitFlag=!1}static _initNet(){return t.FactoryManager.get(k,M)}static _doneWebSocket(){T.mWebSocketMap.forEach((e=>{e.done()})),T.mWebSocketMap.clear(),T.mNetFactory=null}static _addWebSocket(e){if(!e)return null;if(T.mNetFactory){const t=T.mNetFactory.create(e,d,!1);if(t){if(0===t.init())return T.mWebSocketMap.set(e,t),t;console.log('NetManager.addWebSocket: socket nicht initalisiert'),t.done()}}return null}static removeWebSocket(e){const t=T.findWebSocket(e);t&&(t.done(),T.mWebSocketMap.delete(e))}static findWebSocket(e){if(e){const t=T.mWebSocketMap.get(e);if(t)return t}return null}static getWebSocket(e){const t=T.findWebSocket(e);return t||T._addWebSocket(e)}}T.mInitFlag=!1,T.mNetFactory=null,T.mWebSocketMap=new Map;const B='NetConnect';class I extends t.ErrorBase{constructor(e){super(e||B),this.mInitFlag=!1,this.mOnlineEvent=new t.EventFunctionList(g,B),this.mOfflineEvent=new t.EventFunctionList(E,B),this.mErrorEvent=new t.EventFunctionList(S,B),this.mOnlineEvent.setComponentName(e||B),this.mOfflineEvent.setComponentName(e||B),this.mErrorEvent.setComponentName(e||B)}_initConnect(){return 0}init(e){return 0!==this._initConnect()?-1:(this.mInitFlag=!0,0)}isInit(){return this.mInitFlag}getRuntimeType(){return'undefined'}done(){return this.mOnlineEvent.clear(),this.mOfflineEvent.clear(),this.mErrorEvent.clear(),this.mInitFlag=!1,0}setErrorOutput(e){super.setErrorOutput(e),this.mOnlineEvent.setErrorOutput(e),this.mOfflineEvent.setErrorOutput(e),this.mErrorEvent.setErrorOutput(e)}_onOnline(){return this.mOnlineEvent.dispatch()}_onOffline(){return this.mOfflineEvent.dispatch()}_onError(){return this.mErrorEvent.dispatch()}get onOnline(){return()=>this._onOnline()}get onOffline(){return()=>this._onOffline()}get onError(){return()=>this._onError()}addEventListener(e,t,n){let r=0;switch(t){case g:r=this.mOnlineEvent.addListener(e,n);break;case E:r=this.mOfflineEvent.addListener(e,n);break;case S:r=this.mErrorEvent.addListener(e,n);break;default:this.error('addEventListener','kein gueltiger Event'),r=-1}return r}removeEventListener(e,t){let n=0;switch(t){case g:n=this.mOnlineEvent.removeListener(e);break;case E:n=this.mOfflineEvent.removeListener(e);break;case S:n=this.mErrorEvent.removeListener(e);break;default:this.error('removeEventListener','kein gueltiger Event'),n=-1}return n}addOnlineEvent(e,t){return this.addEventListener(e,g,t)}addOfflineEvent(e,t){return this.addEventListener(e,E,t)}addErrorEvent(e,t){return this.addEventListener(e,S,t)}removeOnlineEvent(e){return this.removeEventListener(e,g)}removeOfflineEvent(e){return this.removeEventListener(e,E)}removeErrorEvent(e){return this.removeEventListener(e,S)}removeAllEvent(e){return e?(this.removeOnlineEvent(e),this.removeOfflineEvent(e),this.removeErrorEvent(e),0):(this.error('removeAllEvent','kein Pluginname uebergeben'),-1)}checkConnect(){return new Promise(((e,t)=>{e(this.isOnline())}))}isOnline(){return!0}}class P extends I{constructor(){super('NetBrowserConnect')}getRuntimeType(){return'browser'}_initConnect(){try{if('undefined'!=typeof window)return window.ononline=()=>this._onOnline(),window.onoffline=()=>this._onOffline(),0;console.log('NetBrowserConnect._initConnect: keine Browser Laufzeitumgebung')}catch(e){this.exception('init',e)}return-1}done(){return window.ononline=null,window.onoffline=null,super.done()}isOnline(){return!!navigator&&navigator.onLine}}class x extends I{constructor(){super('NetNodeConnect'),this.mConnectFlag=!1}getRuntimeType(){return'node'}_initConnect(){try{return this.checkConnect(),0}catch(e){this.exception('init',e)}return-1}checkConnect(e={}){return n(this,void 0,void 0,(function*(){if('undefined'==typeof process||!process.versions||!process.versions.node)return new Error('keine NodeJS Laufzeitumgebung');let t=null;try{const e="net";t=yield import(e)}catch(e){return console.log('NetNodeConnect.checkConnect: Exception ',e),new Error('NodeJS Net-Modul nicht geladen')}const{timeout:n=5e3,retries:r=5,domain:s="https://apple.com"}=e,o=new URL(s);null===o.port&&('ftp:'===o.protocol?o.port='21':'http:'===o.protocol?o.port='80':'https:'===o.protocol&&(o.port='443'));const i=Number.parseInt(o.port||'80'),c=o.hostname||o.pathname;for(let e=0;e<r;e++){const s=new Promise(((e,r)=>{const s=setTimeout((()=>r(new Error('Timeout'))),n),o=new t.Socket;o.connect({port:i,host:c},(()=>{clearTimeout(s),o.destroy(),this.mConnectFlag=!0,this._onOnline(),e(!0)})),o.on('data',(e=>{})),o.on('error',(e=>{console.log('NetNodeConnect.checkConnect: error',e),clearTimeout(s),o.destroy(),this.mConnectFlag=!1,this._onOffline(),r(e)})),o.on('close',(()=>{}))}));try{yield s}catch(t){if(e===r-1)throw t}}}))}isOnline(){return this.mConnectFlag}}const L='NetConnectFactory';class R extends t.Factory{constructor(e,t=!0){super(e||L,t),this.mBaseConnect=null,this.runtimeType='undefined',this._initConnect()}_initConnect(){if('undefined'!=typeof process&&process.versions&&process.versions.node)try{this.mBaseConnect=new x,this.runtimeType='node'}catch(e){console.log('NetManager._initConnect: NetNodeConnect wurde nicht geladen ',e)}else if('undefined'!=typeof window)try{this.mBaseConnect=new P,this.runtimeType='browser'}catch(e){console.log('NetManager._initConnect: NetBrowserConnect wurde nicht geladen ',e)}else console.log('NetManager._initConnect: kein NetConnect geladen');this.mBaseConnect&&this.mBaseConnect.init()}isMock(){return!1}getType(){return"NetConnect"}getName(){return L}create(e,t,n=!0){return this.mBaseConnect}}class A extends t.ErrorBase{constructor(e){super(e||'NetConnect'),this.mInitFlag=!1,this.mOnOnlineFunc=null,this.mOnOfflineFunc=null,this.mOnErrorFunc=null,this.mBaseConnectFactory=null,this.mBaseConnect=null,this.setErrorOutputFunc((e=>this._onError(new Error(e)))),this.mBaseConnectFactory=t.FactoryManager.get(L,R)}init(e){try{if(!this.mBaseConnectFactory)return-1;if(this.mBaseConnect=this.mBaseConnectFactory.create(),!this.mBaseConnect)return-1;this.mBaseConnect.addOnlineEvent(this._getErrorClassName(),(()=>this._onOnline())),this.mBaseConnect.addOfflineEvent(this._getErrorClassName(),(()=>this._onOffline())),this.mBaseConnect.addErrorEvent(this._getErrorClassName(),(e=>this._onError(e)))}catch(e){return this.exception('init',e),-1}return this.mInitFlag=!0,0}isInit(){return this.mInitFlag}done(){return this.mBaseConnect&&this.mBaseConnect.removeAllEvent(this._getErrorClassName()),this.mBaseConnect=null,this.mOnOnlineFunc=null,this.mOnOfflineFunc=null,this.mOnErrorFunc=null,this.mInitFlag=!1,0}isOnline(){return!!this.mBaseConnect&&this.mBaseConnect.isOnline()}set onOnline(e){this.mOnOnlineFunc=e}set onOffline(e){this.mOnOfflineFunc=e}set onError(e){this.mOnErrorFunc=e}_onOnline(){if('function'==typeof this.mOnOnlineFunc)try{return this.mOnOnlineFunc()}catch(e){return this.exception('_onOnline',e),-1}return 0}_onOffline(){if('function'==typeof this.mOnOfflineFunc)try{return this.mOnOfflineFunc()}catch(e){return this.exception('_onOffline',e),-1}return 0}_onError(e){if('function'==typeof this.mOnErrorFunc)try{return this.mOnErrorFunc(e)}catch(e){return this.isErrorOutput()&&console.log('===> EXCEPTION NetConnect._onError: ',e.message),-1}return 0}}e.FETCH_FACTORY_NAME=r,e.FETCH_TYPE_NAME=s,e.FetchFactory=o,e.NET_CLOSE_EVENT='closeNet',e.NET_CONNECT_INTERVAL=5e3,e.NET_DEFAULT_TYPE="WebSocket",e.NET_ERROR_EVENT=S,e.NET_FACTORY_NAME=k,e.NET_MOCK_NAME='NetMock',e.NET_OFFLINE_EVENT=E,e.NET_ONLINE_EVENT=g,e.NET_OPEN_EVENT='openNet',e.NET_PLUGIN_NAME=f,e.NET_WEBSOCKET_NAME=d,e.NET_WEBSOCKET_TYPE=b,e.NET_WEBSOCKET_URL=p,e.NET_WEBWORKER_NAME=W,e.NET_WEBWORKER_TYPE='WebWorker',e.NetBaseWebSocket=m,e.NetConnect=A,e.NetFactory=M,e.NetManager=T,e.NetPlugin=_,e.NetWebSocket=C,e.WEBSOCKET_FACTORY_NAME=i,e.WEBSOCKET_TYPE_NAME=c,e.WebSocketFactory=a,e.XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE='arraybuffer',e.XMLHTTPREQUEST_FACTORY_NAME=u,e.XMLHTTPREQUEST_TEXT_RESPONSETYPE='text',e.XMLHTTPREQUEST_TYPE_NAME=h,e.XMLHttpRequestFactory=l,Object.defineProperty(e,'__esModule',{value:!0})}));