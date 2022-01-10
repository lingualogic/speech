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

import{Factory as e,ErrorBase as t,FactoryManager as n,Plugin as r,SPEECH_WEBWORKER_TYPE as o,MESSAGE_COMPONENT_TYPE as s,SPEECH_WEBWORKER_PATH as i,SPEECH_WEBWORKER_FILE as c,PluginFactory as a,EventFunctionList as h}from'@speech/core';
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
***************************************************************************** */function u(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function c(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}a((r=r.apply(e,t||[])).next())}))}const l='FetchFactory',m='Fetch';class k extends e{constructor(e,t=!0){super(e||"FetchFactory",t),this.mFetchFunc=null,this.fetchInitPromise=null,this.runtimeType='undefined',this.fetchInitPromise=this._initFetch(),this.fetchInitPromise.then((()=>{this.fetchInitPromise=null}))}_initFetch(){return u(this,void 0,void 0,(function*(){if('undefined'!=typeof process&&process.versions&&process.versions.node)try{const e="node-fetch",t=yield import(e);console.log('FetchFactory._initFetch: fetch = ',t),t&&t.default?this.mFetchFunc=t.default:this.mFetchFunc=t,this.runtimeType='node'}catch(e){console.log('FetchFactory._initFetch: node-fetch Package wurde nicht geladen ',e)}else if('undefined'!=typeof window)try{void 0!==window.fetch&&(this.mFetchFunc=window.fetch),this.mFetchFunc&&(this.runtimeType='browser')}catch(e){console.log('FetchFactory._initFetch: fetch-Funktion wurde nicht geladen ',e)}else console.log('FetchFactory._initFetch: kein fetch-Funktion geladen')}))}isMock(){return!1}getType(){return"Fetch"}getName(){return"FetchFactory"}create(e,t,n=!0){if(this.fetchInitPromise)throw new Error('FetchFactory.create: Laden der fetch-Funktion nicht abgeschlossen');return this.mFetchFunc}createAsync(e,t,n=!0){return u(this,void 0,void 0,(function*(){if(this.fetchInitPromise){try{yield this.fetchInitPromise}catch(e){console.log('FetchFactory.createAsync: Exception ',e)}this.fetchInitPromise=null}return this.create(e,t,n)}))}}const W='WebSocketFactory',b='WebSocket';class d extends e{constructor(e,t=!0){super(e||"WebSocketFactory",t),this.mWebSocketClass=null,this.webSocketClassPromise=null,this.runtimeType='undefined',this.webSocketClassPromise=this._initWebSocket(),this.webSocketClassPromise.then((()=>{this.webSocketClassPromise=null}))}_initWebSocket(){return u(this,void 0,void 0,(function*(){if('undefined'!=typeof process&&process.versions&&process.versions.node)try{const e="ws",t=yield import(e);t&&t.default?this.mWebSocketClass=t.default:this.mWebSocketClass=t,this.runtimeType='node'}catch(e){console.log('WebSocketFactory._initWebSocket: WS-Package wurde nicht geladen ',e)}else if('undefined'!=typeof window)try{'undefined'!=typeof WebSocket?this.mWebSocketClass=WebSocket:void 0!==window.MozWebSocket?this.mWebSocketClass=window.MozWebSocket:'undefined'!=typeof window&&(this.mWebSocketClass=window.WebSocket||window.MozWebSocket),this.mWebSocketClass&&(this.runtimeType='browser')}catch(e){console.log('WebSocketFactory._initWebSocket: WebSocket-Klasse wurde nicht geladen ',e)}else console.log('WebSocketFactory._initWebSocket: kein WebSocket-Klasse geladen')}))}isMock(){return!1}getType(){return"WebSocket"}getName(){return"WebSocketFactory"}create(e,t,n=!0){if(this.webSocketClassPromise)throw new Error('WebSocketFactory.create: Laden der WebSocket-Klasse nicht abgeschlossen');return this.mWebSocketClass}createAsync(e,t,n=!0){return u(this,void 0,void 0,(function*(){if(this.webSocketClassPromise){try{yield this.webSocketClassPromise}catch(e){console.log('WebSocketFactory.createAsync: Exception ',e)}this.webSocketClassPromise=null}return this.create(e,t,n)}))}}const f='XMLHttpRequestFactory',p='XMLHttpRequest',g='text',S='arraybuffer';class F extends e{constructor(e,t=!0){super(e||"XMLHttpRequestFactory",t)}isMock(){return!1}getType(){return"XMLHttpRequest"}getName(){return"XMLHttpRequestFactory"}create(e,t,n=!0){try{return XMLHttpRequest||null}catch(e){return this.exception('create',e),null}}getXMLHttpRequestClass(){return this.create()}}class y extends t{constructor(e){super(e||'NetBaseWebSocket'),this.mRuntimeType='undefined',this.mWebSocketClass=null,this.mWebSocketUrl='',this.mWebSocket=null,this.mWebSocketOpenFlag=!1,this.mConnectInfiniteFlag=!1,this.mConnectIntervalId=0,this.mConnectIntervalTimeout=5e3,this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null,this.mOnErrorFunc=null,this.setErrorOutputFunc((e=>this._onError(new Error(e)))),'undefined'!=typeof process&&process.versions&&process.versions.node?this.mRuntimeType='node':'undefined'!=typeof window&&(this.mRuntimeType='browser')}static initFactory(){return u(this,void 0,void 0,(function*(){if(n.find("WebSocketFactory"))return!0;const e=n.get("WebSocketFactory",d);return e?!!(yield e.createAsync())||(console.log('NetBaseWebSocket.initFactory: keine WebSocket-Klasse vorhanden'),!1):(console.log('NetBaseWebSocket.initFactory: keine WebSocket-Fabrik vorhanden'),!1)}))}init(e){return this._detectWebSocket()?(e&&e.connectInfiniteFlag&&(this.mConnectInfiniteFlag=!0,this.isErrorOutput()&&console.log('NetBaseWebSocket.init: ConnectInfinite eingeschaltet')),0):-1}done(){return this.mWebSocket&&(this.mWebSocket.onopen=null,this.mWebSocket.onclose=null,this.mWebSocket.onmessage=null,this.mWebSocket.onerror=null,this.close(),this.mWebSocket=null),this.mWebSocketOpenFlag=!1,this.mWebSocketClass=null,this.mWebSocketUrl='',this.mConnectInfiniteFlag=!1,this.mConnectIntervalId=0,this.mConnectIntervalTimeout=5e3,this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null,this.mOnErrorFunc=null,0}isInit(){return!!this.mWebSocketClass}getRuntimeType(){return this.mRuntimeType}_detectWebSocket(){const e=n.get("WebSocketFactory",d);if(!e)return this.error('_detectWebSocket','keine WebSocket-Fabrik vorhanden'),!1;try{if(this.mWebSocketClass=e.create(),null===this.mWebSocketClass)return this.error('_detectWebSocket','keine WebSocketClass vorhanden'),!1}catch(e){return this.exception('_detectWebSocket',e),!1}return!0}open(e){return this.isOpen()?(this.error('open','bereits geoeffnet'),-1):this._connect(e)}close(){if(this.mWebSocketOpenFlag=!1,this.mWebSocket){this._clearInfiniteConnect();try{this.mWebSocket.close(1e3,'Closing normally')}catch(e){return this.exception('close',e),this.mWebSocket=null,-1}}return 0}isOpen(){return this.mWebSocketOpenFlag}isConnect(){return!(!this.mWebSocket||1!==this.mWebSocket.readyState)}getState(){if(!this.mWebSocket)return'NULL';let e='';switch(this.mWebSocket.readyState){case 0:e='CONNECTING';break;case 1:e='OPEN';break;case 2:e='CLOSING';break;case 3:e='CLOSED';break;default:e='UNKNOW'}return e}sendMessage(e){if(!this.isOpen())return this.error('sendMessage','WebSocket ist nicht geoeffnet'),-1;if(!this.mWebSocket)return this.error('sendMessage','keine WebSocket vorhanden'),-1;try{return this.mWebSocket.send(JSON.stringify(e)),0}catch(e){return this.exception('sendMessage',e),-1}}sendStream(e){if(!this.isOpen())return this.error('sendStream','WebSocket ist nicht geoeffnet'),-1;if(!this.mWebSocket)return this.error('sendStream','keine WebSocket vorhanden'),-1;try{return this.mWebSocket.send(e),0}catch(e){return this.exception('sendStream',e),-1}}get webSocket(){return this.mWebSocket}set webSocketUrl(e){this.mWebSocketUrl=e}get webSocketUrl(){return this.mWebSocketUrl}set onOpen(e){this.mOnOpenFunc=e}set onClose(e){this.mOnCloseFunc=e}set onMessage(e){this.mOnMessageFunc=e}set onError(e){this.mOnErrorFunc=e}_onOpen(){if('function'==typeof this.mOnOpenFunc)try{return this.mOnOpenFunc(this.mWebSocketUrl)}catch(e){return this.exception('_onOpen',e),-1}return 0}_onClose(){if('function'==typeof this.mOnCloseFunc)try{return this.mOnCloseFunc()}catch(e){return this.exception('_onClose',e),-1}return 0}_onMessage(e){if('function'==typeof this.mOnMessageFunc)try{return this.mOnMessageFunc(e)}catch(e){return this.exception('_onMessage',e),-1}return 0}_onError(e){if('function'==typeof this.mOnErrorFunc)try{let t=e;return'error'===e.type&&this.mWebSocket&&3===this.mWebSocket.readyState&&(t=new Error('Verbindung wurde nicht aufgebaut')),this.mOnErrorFunc(t)}catch(e){return this.isErrorOutput()&&console.log('===> EXCEPTION NetBaseWebSocket._onError: ',e.message),-1}return 0}_webSocketOpen(e){return this.mWebSocketOpenFlag=!0,this._clearInfiniteConnect(),0!==this._onOpen()?-1:0}_webSocketClose(e){return this.mWebSocketOpenFlag=!1,this.mWebSocket=null,this._setInfiniteConnect(),this._onClose()}_webSocketMessage(e){try{return this._onMessage(e)}catch(e){return this.exception('_webSocketMessage',e),-1}}_webSocketError(e){return this._onError(new Error('WebSocket wurde nicht verbunden'))}_connect(e){if(this.isOpen())return 0;if(this.mWebSocket)return this.error('_connect','webSocket noch nicht geschlossen'),-1;if(!this.mWebSocketClass)return this.error('_connect','keine WebSocketClass vorhanden'),-1;if(e&&(this.mWebSocketUrl=e),!this.mWebSocketUrl)return this.error('_connect','keine WebSocketUrl vorhanden'),-1;try{return this.mWebSocket=new this.mWebSocketClass(this.mWebSocketUrl),this.mWebSocket?(this.mWebSocket.binaryType='arraybuffer',this.mWebSocket.onopen=e=>this._webSocketOpen(e),this.mWebSocket.onclose=e=>this._webSocketClose(e),this.mWebSocket.onmessage=e=>this._webSocketMessage(e),this.mWebSocket.onerror=e=>this._webSocketError(e),0):(this.error('_connect','keine WebSocket erzeugt'),-1)}catch(e){return this.exception('_connect',e),this.mWebSocket=null,-1}}_setInfiniteConnect(){this.mConnectInfiniteFlag&&0===this.mConnectIntervalId&&(this.mConnectIntervalId=setInterval((()=>{this._connect(this.mWebSocketUrl)}),this.mConnectIntervalTimeout))}_clearInfiniteConnect(){0!==this.mConnectIntervalId&&(clearInterval(this.mConnectIntervalId),this.mConnectIntervalId=0)}}const O='NetFactory',C='NetWebWorker',E='NetWebSocket',_='NetMock',N='WebSocket',v='WebWorker',w="WebSocket",M="NetWebSocket",B='ws://localhost:7050',I=5e3,x='openNet',L='closeNet',P='onlineNet',T='offlineNet',U='errorNet';class R extends e{constructor(e,t=!0){super(e||"NetBaseWebSocketFactory",t)}isMock(){return!1}getType(){return"NetBaseWebSocket"}getName(){return"NetBaseWebSocketFactory"}create(e,t,n=!0){try{return new y(e)}catch(e){return null}}}class H{static init(){return u(this,void 0,void 0,(function*(){return H.mInitFlag?0:(H.mBaseWebSocketFactory=H._initBaseWebSocket(),H.mBaseWebSocketFactory&&(yield y.initFactory())?(H.mInitFlag=!0,0):-1)}))}static isInit(){return H.mInitFlag}static clear(){H._doneBaseWebSocket(),H.mInitFlag=!1}static _initBaseWebSocket(){return n.get("NetBaseWebSocketFactory",R)}static _doneBaseWebSocket(){H.mBaseWebSocketMap.forEach((e=>{e.done()})),H.mBaseWebSocketMap.clear(),H.mBaseWebSocketFactory=null}static _addBaseWebSocket(e){if(!e)return null;if(H.mBaseWebSocketFactory){const t=H.mBaseWebSocketFactory.create(e);if(t){if(0===t.init())return H.mBaseWebSocketMap.set(e,t),t;console.log('NetBaseManager.addBaseWebSocket: Socket nicht initalisiert'),t.done()}else console.log('NetBaseManager.addBaseWebSocket: Socket nicht erzeugt')}return console.log('NetBaseManager.addBaseWebSocket: keine Factory vorhanden'),null}static removeBaseWebSocket(e){const t=H.mBaseWebSocketMap.get(e);t&&(t.done(),H.mBaseWebSocketMap.delete(e))}static findBaseWebSocket(e){if(e){const t=H.mBaseWebSocketMap.get(e);if(t)return t}return null}static getBaseWebSocket(e){const t=H.findBaseWebSocket(e);return t||H._addBaseWebSocket(e)}}H.mInitFlag=!1,H.mBaseWebSocketFactory=null,H.mBaseWebSocketMap=new Map;class A extends r{constructor(e,t=!0){super(e,t),this.mHandleMessageList=new Map,this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null}getType(){return'NetPlugin'}getClass(){return'NetPlugin'}init(e){return this.mOnMessageFunc=this.getHandleMessageFunc(),super.init(e)}done(){return this.mOnOpenFunc=null,this.mOnCloseFunc=null,this.mOnMessageFunc=null,super.done()}_onOpen(){if('function'==typeof this.mOnOpenFunc)try{return this.mOnOpenFunc()}catch(e){return this.exception('_onOpen',e),-1}return 0}_onClose(){if('function'==typeof this.mOnCloseFunc)try{return this.mOnCloseFunc()}catch(e){return this.exception('_onClose',e),-1}return 0}_onMessage(e){if('function'==typeof this.mOnMessageFunc)try{return this.mOnMessageFunc(e)}catch(e){return this.exception('_onMessage',e),-1}return 0}open(){return-1}close(){return 0}isOpen(){return!1}getState(){return''}sendMessage(e){return 0}getSendMessageFunc(){return e=>this.sendMessage(e)}handleMessage(e){return this.mHandleMessageList.forEach((t=>{if(t(e))return 0})),-1}getHandleMessageFunc(){return e=>this.handleMessage(e)}setHandleMessageFunc(e,t){return this.mHandleMessageList.set(e,t),0}set onOpen(e){this.mOnOpenFunc=e}get onOpen(){return()=>this._onOpen()}set onClose(e){this.mOnCloseFunc=e}get onClose(){return()=>this._onClose()}set onMessage(e){this.mOnMessageFunc=e}get onMessage(){return e=>this._onMessage(e)}}class X extends A{constructor(e,t=!1){super(e||"NetWebSocket",t),this.mBaseWebSocket=null,this.mBaseWebSocket=H.getBaseWebSocket(e||"NetWebSocket"),this.mBaseWebSocket.onError=this.onError,this.mBaseWebSocket.onOpen=this.onOpen,this.mBaseWebSocket.onClose=this.onClose,this.mBaseWebSocket.onMessage=e=>this._onWebSocketMessage(e)}getClass(){return'NetWebSocket'}getType(){return"WebSocket"}init(e){return this.isInit()?(this.error('init','init doppelt aufgerufen'),-1):0!==this.mBaseWebSocket.init(e)?-1:super.init(e)}done(){try{return this.close(),this.mBaseWebSocket.done(),super.done()}catch(e){return this.exception('done',e),-1}}setErrorOutput(e){super.setErrorOutput(e),this.mBaseWebSocket.setErrorOutput(e)}_onWebSocketMessage(e){if('function'==typeof this.mOnMessageFunc)try{return this.mOnMessageFunc(JSON.parse(e.data))}catch(e){return this.exception('_onWebSocketMessage',e),-1}return 0}open(e){if(!this.isInit())return this.error('open','nicht initialisiert'),-1;if(this.mBaseWebSocket.isOpen())return this.error('.open','bereits geoeffnet'),-1;let t="ws://localhost:7050";return e&&(t=e),0!==this.mBaseWebSocket.open(t)?(this.error('open','keine Verbindung moeglich'),-1):0}close(){return this.mBaseWebSocket.close()}isOpen(){return this.mBaseWebSocket.isOpen()}getState(){return this.mBaseWebSocket.getState()}sendMessage(e){return this.isOpen()?this.mBaseWebSocket.sendMessage(e):-1}}class z extends e{constructor(e,t=!0){super(e||"WebWorkerFactory",t)}isMock(){return!1}getType(){return"WebWorker"}getName(){return"WebWorkerFactory"}create(e,t,n=!0){try{return window.Worker||null}catch(e){return this.exception('create',e),null}}getWebWorkerClass(){return this.create()}createWebWorker(e){const t=this.getWebWorkerClass();if(!t)return null;try{return new t(e)}catch(e){return this.exception('createWebWorker',e),null}}}class q extends A{constructor(e=!0){super("NetWebWorker",e),this.mWebWorkerFactory=null,this.mWebWorkerClass=null,this.mWebWorker=null,this.mWebWorkerPath=''}getClass(){return'NetWebWorker'}init(e){return this.isInit()?(this.error('init','init doppelt aufgerufen'),-1):(this.mWebWorkerFactory=n.get("WebWorkerFactory",z),this._detectWebWorker()?(e&&e.webWorkerPath&&(this.mWebWorkerPath=e.webWorkerPath),super.init(e)):-1)}done(){return this.mWebWorkerClass=null,this.mWebWorker=null,this.mWebWorkerPath='',this.close(),super.done()}_detectWebWorker(){if(!this.mWebWorkerFactory)return this.error('_detectWebWorker','keine WebWorker-Fabrik vorhanden'),!1;try{this.mWebWorkerClass=this.mWebWorkerFactory.getWebWorkerClass()}catch(e){return this.exception('_detectWebWorker',e),!1}return null!==this.mWebWorkerClass||(this.error('_detectWebWorker','Unable to use the WebWorker API'),!1)}getType(){return o}_webWorkerOpen(e){const t={type:s,source:this.getName(),dest:'',action:'start'};return this._onMessage(t),0!==this._onOpen()?-1:0}_webWorkerClose(e){return this._onClose()}_webWorkerMessage(e){try{this._onMessage(e.data)}catch(e){return this.exception('_webWorkerMessage',e),-1}return 0}_webWorkerError(e){return this._onError(e)}open(e){if(!this.isInit())return this.error('open','nicht initialisiert'),-1;if(this.isOpen())return this.error('open','bereits geoeffnet'),-1;try{if(!this.mWebWorkerClass)return this.error('open','keine WebWorkerClass vorhanden'),-1;const e=this.mWebWorkerPath+i+c;return this.mWebWorker=new this.mWebWorkerClass(e),this.mWebWorker?(this.mWebWorker.onmessage=e=>{this._webWorkerMessage(e)},this.mWebWorker.onerror=e=>{e.preventDefault(),console.log('NetWebWorker.open: Error',e),this.mWebWorker=null,this._webWorkerError(new Error('WebWorker nicht initialisiert'))},this._webWorkerOpen('')):(this.error('open','kein WebWorker erzeugt'),-1)}catch(e){return this.exception('open',e),-1}}close(){if(this.mWebWorker){const e=this.mWebWorker;this.mWebWorker=null;try{return this._webWorkerClose(''),e.terminate(),0}catch(e){return this.exception('close',e),-1}}return 0}isOpen(){return!!this.mWebWorker}getState(){return this.mWebWorker?'OPEN':'NULL'}sendMessage(e){if(this.mWebWorker)try{return this.mWebWorker.postMessage(e),0}catch(e){this.exception('sendMessage',e)}return-1}}class K extends a{constructor(){super('NetFactory'),this._setErrorClassName('NetFactory')}getName(){return"NetFactory"}_newPlugin(e,t,n){if("NetWebWorker"!==e&&("NetWebSocket"===e||"NetWebSocket"===t)){return new X(e,n)}return"NetWebWorker"===e||"NetWebWorker"===t?new q(n):null}create(e,t="",n=!0){const r=e||"NetWebSocket",o=t||"NetWebSocket";try{return this._newPlugin(r,o,n)}catch(e){return this.exception('create',e),null}}}class J{static init(){return u(this,void 0,void 0,(function*(){return J.mInitFlag?0:0!==(yield H.init())?-1:(J.mNetFactory=J._initNet(),J.mNetFactory?(J.mInitFlag=!0,0):-1)}))}static isInit(){return J.mInitFlag}static clear(){H.clear(),J._doneWebSocket(),J.mInitFlag=!1}static _initNet(){return n.get("NetFactory",K)}static _doneWebSocket(){J.mWebSocketMap.forEach((e=>{e.done()})),J.mWebSocketMap.clear(),J.mNetFactory=null}static _addWebSocket(e){if(!e)return null;if(J.mNetFactory){const t=J.mNetFactory.create(e,"NetWebSocket",!1);if(t){if(0===t.init())return J.mWebSocketMap.set(e,t),t;console.log('NetManager.addWebSocket: socket nicht initalisiert'),t.done()}}return null}static removeWebSocket(e){const t=J.findWebSocket(e);t&&(t.done(),J.mWebSocketMap.delete(e))}static findWebSocket(e){if(e){const t=J.mWebSocketMap.get(e);if(t)return t}return null}static getWebSocket(e){const t=J.findWebSocket(e);return t||J._addWebSocket(e)}}J.mInitFlag=!1,J.mNetFactory=null,J.mWebSocketMap=new Map;class D extends t{constructor(e){super(e||"NetConnect"),this.mInitFlag=!1,this.mOnlineEvent=new h("onlineNet","NetConnect"),this.mOfflineEvent=new h("offlineNet","NetConnect"),this.mErrorEvent=new h("errorNet","NetConnect"),this.mOnlineEvent.setComponentName(e||"NetConnect"),this.mOfflineEvent.setComponentName(e||"NetConnect"),this.mErrorEvent.setComponentName(e||"NetConnect")}_initConnect(){return 0}init(e){return 0!==this._initConnect()?-1:(this.mInitFlag=!0,0)}isInit(){return this.mInitFlag}getRuntimeType(){return'undefined'}done(){return this.mOnlineEvent.clear(),this.mOfflineEvent.clear(),this.mErrorEvent.clear(),this.mInitFlag=!1,0}setErrorOutput(e){super.setErrorOutput(e),this.mOnlineEvent.setErrorOutput(e),this.mOfflineEvent.setErrorOutput(e),this.mErrorEvent.setErrorOutput(e)}_onOnline(){return this.mOnlineEvent.dispatch()}_onOffline(){return this.mOfflineEvent.dispatch()}_onError(){return this.mErrorEvent.dispatch()}get onOnline(){return()=>this._onOnline()}get onOffline(){return()=>this._onOffline()}get onError(){return()=>this._onError()}addEventListener(e,t,n){let r=0;switch(t){case"onlineNet":r=this.mOnlineEvent.addListener(e,n);break;case"offlineNet":r=this.mOfflineEvent.addListener(e,n);break;case"errorNet":r=this.mErrorEvent.addListener(e,n);break;default:this.error('addEventListener','kein gueltiger Event'),r=-1}return r}removeEventListener(e,t){let n=0;switch(t){case"onlineNet":n=this.mOnlineEvent.removeListener(e);break;case"offlineNet":n=this.mOfflineEvent.removeListener(e);break;case"errorNet":n=this.mErrorEvent.removeListener(e);break;default:this.error('removeEventListener','kein gueltiger Event'),n=-1}return n}addOnlineEvent(e,t){return this.addEventListener(e,"onlineNet",t)}addOfflineEvent(e,t){return this.addEventListener(e,"offlineNet",t)}addErrorEvent(e,t){return this.addEventListener(e,"errorNet",t)}removeOnlineEvent(e){return this.removeEventListener(e,"onlineNet")}removeOfflineEvent(e){return this.removeEventListener(e,"offlineNet")}removeErrorEvent(e){return this.removeEventListener(e,"errorNet")}removeAllEvent(e){return e?(this.removeOnlineEvent(e),this.removeOfflineEvent(e),this.removeErrorEvent(e),0):(this.error('removeAllEvent','kein Pluginname uebergeben'),-1)}checkConnect(){return new Promise(((e,t)=>{e(this.isOnline())}))}isOnline(){return!0}}class G extends D{constructor(){super('NetBrowserConnect')}getRuntimeType(){return'browser'}_initConnect(){try{if('undefined'!=typeof window)return window.ononline=()=>this._onOnline(),window.onoffline=()=>this._onOffline(),0;console.log('NetBrowserConnect._initConnect: keine Browser Laufzeitumgebung')}catch(e){this.exception('init',e)}return-1}done(){return window.ononline=null,window.onoffline=null,super.done()}isOnline(){return!!navigator&&navigator.onLine}}class V extends D{constructor(){super('NetNodeConnect'),this.mConnectFlag=!1}getRuntimeType(){return'node'}_initConnect(){try{return this.checkConnect(),0}catch(e){this.exception('init',e)}return-1}checkConnect(e={}){return u(this,void 0,void 0,(function*(){if('undefined'==typeof process||!process.versions||!process.versions.node)return new Error('keine NodeJS Laufzeitumgebung');let t=null;try{const e="net";t=yield import(e)}catch(e){return console.log('NetNodeConnect.checkConnect: Exception ',e),new Error('NodeJS Net-Modul nicht geladen')}const{timeout:n=5e3,retries:r=5,domain:o="https://apple.com"}=e,s=new URL(o);null===s.port&&('ftp:'===s.protocol?s.port='21':'http:'===s.protocol?s.port='80':'https:'===s.protocol&&(s.port='443'));const i=Number.parseInt(s.port||'80'),c=s.hostname||s.pathname;for(let e=0;e<r;e++){const o=new Promise(((e,r)=>{const o=setTimeout((()=>r(new Error('Timeout'))),n),s=new t.Socket;s.connect({port:i,host:c},(()=>{clearTimeout(o),s.destroy(),this.mConnectFlag=!0,this._onOnline(),e(!0)})),s.on('data',(e=>{})),s.on('error',(e=>{console.log('NetNodeConnect.checkConnect: error',e),clearTimeout(o),s.destroy(),this.mConnectFlag=!1,this._onOffline(),r(e)})),s.on('close',(()=>{}))}));try{yield o}catch(t){if(e===r-1)throw t}}}))}isOnline(){return this.mConnectFlag}}class j extends e{constructor(e,t=!0){super(e||"NetConnectFactory",t),this.mBaseConnect=null,this.runtimeType='undefined',this._initConnect()}_initConnect(){if('undefined'!=typeof process&&process.versions&&process.versions.node)try{this.mBaseConnect=new V,this.runtimeType='node'}catch(e){console.log('NetManager._initConnect: NetNodeConnect wurde nicht geladen ',e)}else if('undefined'!=typeof window)try{this.mBaseConnect=new G,this.runtimeType='browser'}catch(e){console.log('NetManager._initConnect: NetBrowserConnect wurde nicht geladen ',e)}else console.log('NetManager._initConnect: kein NetConnect geladen');this.mBaseConnect&&this.mBaseConnect.init()}isMock(){return!1}getType(){return"NetConnect"}getName(){return"NetConnectFactory"}create(e,t,n=!0){return this.mBaseConnect}}class Q extends t{constructor(e){super(e||'NetConnect'),this.mInitFlag=!1,this.mOnOnlineFunc=null,this.mOnOfflineFunc=null,this.mOnErrorFunc=null,this.mBaseConnectFactory=null,this.mBaseConnect=null,this.setErrorOutputFunc((e=>this._onError(new Error(e)))),this.mBaseConnectFactory=n.get("NetConnectFactory",j)}init(e){try{if(!this.mBaseConnectFactory)return-1;if(this.mBaseConnect=this.mBaseConnectFactory.create(),!this.mBaseConnect)return-1;this.mBaseConnect.addOnlineEvent(this._getErrorClassName(),(()=>this._onOnline())),this.mBaseConnect.addOfflineEvent(this._getErrorClassName(),(()=>this._onOffline())),this.mBaseConnect.addErrorEvent(this._getErrorClassName(),(e=>this._onError(e)))}catch(e){return this.exception('init',e),-1}return this.mInitFlag=!0,0}isInit(){return this.mInitFlag}done(){return this.mBaseConnect&&this.mBaseConnect.removeAllEvent(this._getErrorClassName()),this.mBaseConnect=null,this.mOnOnlineFunc=null,this.mOnOfflineFunc=null,this.mOnErrorFunc=null,this.mInitFlag=!1,0}isOnline(){return!!this.mBaseConnect&&this.mBaseConnect.isOnline()}set onOnline(e){this.mOnOnlineFunc=e}set onOffline(e){this.mOnOfflineFunc=e}set onError(e){this.mOnErrorFunc=e}_onOnline(){if('function'==typeof this.mOnOnlineFunc)try{return this.mOnOnlineFunc()}catch(e){return this.exception('_onOnline',e),-1}return 0}_onOffline(){if('function'==typeof this.mOnOfflineFunc)try{return this.mOnOfflineFunc()}catch(e){return this.exception('_onOffline',e),-1}return 0}_onError(e){if('function'==typeof this.mOnErrorFunc)try{return this.mOnErrorFunc(e)}catch(e){return this.isErrorOutput()&&console.log('===> EXCEPTION NetConnect._onError: ',e.message),-1}return 0}}export{l as FETCH_FACTORY_NAME,m as FETCH_TYPE_NAME,k as FetchFactory,L as NET_CLOSE_EVENT,I as NET_CONNECT_INTERVAL,w as NET_DEFAULT_TYPE,U as NET_ERROR_EVENT,O as NET_FACTORY_NAME,_ as NET_MOCK_NAME,T as NET_OFFLINE_EVENT,P as NET_ONLINE_EVENT,x as NET_OPEN_EVENT,M as NET_PLUGIN_NAME,E as NET_WEBSOCKET_NAME,N as NET_WEBSOCKET_TYPE,B as NET_WEBSOCKET_URL,C as NET_WEBWORKER_NAME,v as NET_WEBWORKER_TYPE,y as NetBaseWebSocket,Q as NetConnect,K as NetFactory,J as NetManager,A as NetPlugin,X as NetWebSocket,W as WEBSOCKET_FACTORY_NAME,b as WEBSOCKET_TYPE_NAME,d as WebSocketFactory,S as XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE,f as XMLHTTPREQUEST_FACTORY_NAME,g as XMLHTTPREQUEST_TEXT_RESPONSETYPE,p as XMLHTTPREQUEST_TYPE_NAME,F as XMLHttpRequestFactory};
