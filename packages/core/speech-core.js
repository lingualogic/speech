/**
 * Speech-Core Bundle
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

!function(t,e){'object'==typeof exports&&'undefined'!=typeof module?e(exports):'function'==typeof define&&define.amd?define(['exports'],e):e((t='undefined'!=typeof globalThis?globalThis:t||self).speechCore={})}(this,(function(t){'use strict';const e=!1,r='Hanna';class n{constructor(t){this.mErrorClassName='ErrorBase',this.mErrorOutputFlag=e,this.mErrorOutputFunc=null,this.mErrorClassName=t}_setErrorClassName(t){this.mErrorClassName=t}_getErrorClassName(){return this.mErrorClassName}setErrorOutput(t){this.mErrorOutputFlag=t}setErrorOutputDefault(){this.setErrorOutput(e)}setErrorOutputFunc(t){this.mErrorOutputFunc=t}error(t,e){if(this.mErrorOutputFlag&&console.log('===> ERROR ',this.mErrorClassName+'.'+t+':',e),'function'==typeof this.mErrorOutputFunc)try{this.mErrorOutputFunc(this.mErrorClassName+'.'+t+': '+e)}catch(t){console.log('ErrorBase.error: Exception ',t.message)}}exception(t,e){if(this.mErrorOutputFlag&&console.log('===> EXCEPTION ',this.mErrorClassName+'.'+t+':',e.message),'function'==typeof this.mErrorOutputFunc)try{this.mErrorOutputFunc('EXCEPTION '+this.mErrorClassName+'.'+t+': '+e.message)}catch(t){console.log('ErrorBase.exception: Exception ',t.message)}}isErrorOutput(){return this.mErrorOutputFlag}setErrorOutputOn(){this.setErrorOutput(!0)}setErrorOutputOff(){this.setErrorOutput(!1)}}class i{constructor(){}static setErrorOutputOn(){i.mBuilderList.setErrorOutputOn(),i.mErrorBase.setErrorOutputOn()}static setErrorOutputOff(){i.mBuilderList.setErrorOutputOff(),i.mErrorBase.setErrorOutputOff()}static setErrorOutputFunc(t){i.mBuilderList.setErrorOutputFunc(t),i.mErrorBase.setErrorOutputFunc(t)}static getSize(){return i.mBuilderList.getSize()}static get(t,e){if(!t)return i.mErrorBase.error('get','kein Buildername uebergeben'),null;let r=i.find(t);if(r)return r;if(!e)return i.mErrorBase.error('get','keine Builderklasse uebergeben'),null;try{r=new e(t)}catch(t){return i.mErrorBase.exception('get',t),null}return t!==r.getName()?(i.mErrorBase.error('get','Buildernamen stimmen nicht ueberein '+t+' != '+r.getName()),i.remove(r.getName()),null):r}static find(t){const e=i.mBuilderList.find(t);return e||null}static insert(t,e){return i.mBuilderList.insert(t,e)}static remove(t){return i.mBuilderList.remove(t)}static clear(){return i.mBuilderList.clear()}}i.mBuilderList=new class extends n{constructor(){super('BuilderList'),this.mBuilderList=new Map,this.mBuilderIterator=this.mBuilderList.values()}getSize(){return this.mBuilderList.size}insert(t,e){try{return t?e?this.mBuilderList.has(t)?(this.error('insert','Builder existiert bereits'),-1):(this.mBuilderList.set(t,e),0):(this.error('insert','kein Builder uebergeben'),-1):(this.error('insert','kein Buildername uebergeben'),-1)}catch(t){return this.exception('insert',t),-1}}find(t){try{return this.mBuilderList.get(t)}catch(t){return void this.exception('find',t)}}first(){try{return this.mBuilderIterator=this.mBuilderList.values(),this.mBuilderIterator.next().value}catch(t){return void this.exception('first',t)}}next(){try{return this.mBuilderIterator.next().value}catch(t){return void this.exception('next',t)}}remove(t){try{return this.mBuilderList.delete(t),0}catch(t){return this.exception('remove',t),-1}}clear(){try{return this.mBuilderList.clear(),0}catch(t){return this.exception('clear',t),-1}}},i.mErrorBase=new n('BuilderManager');class s{constructor(){}static setErrorOutputOn(){s.mFactoryList.setErrorOutputOn(),s.mErrorBase.setErrorOutputOn()}static setErrorOutputOff(){s.mFactoryList.setErrorOutputOff(),s.mErrorBase.setErrorOutputOff()}static setErrorOutputFunc(t){s.mFactoryList.setErrorOutputFunc(t),s.mErrorBase.setErrorOutputFunc(t)}static getSize(){return s.mFactoryList.getSize()}static get(t,e){if(!t)return this.mErrorBase.error('get','kein FactoryName uebergeben'),null;let r=s.find(t);if(r)return r;if(!e)return this.mErrorBase.error('get','keine Factoryklasse uebergeben'),null;try{r=new e}catch(t){return this.mErrorBase.exception('get',t),null}return t!==r.getName()?(this.mErrorBase.error('get','FactoryName stimmen nicht ueberein '+t+' != '+r.getName()),s.remove(r.getName()),null):r}static find(t){const e=s.mFactoryList.find(t);return e||null}static insert(t,e){return s.mFactoryList.insert(t,e)}static remove(t){return s.mFactoryList.remove(t)}static clear(){return s.mFactoryList.clear()}}s.mFactoryList=new class extends n{constructor(){super('FactoryList'),this.mFactoryList=new Map,this.mFactoryIterator=null,this.mFactoryIterator=this.mFactoryList.values()}getSize(){return this.mFactoryList.size}insert(t,e){try{return t?e?this.mFactoryList.has(t)?(this.error('insert','Factory existiert bereits'),-1):(this.mFactoryList.set(t,e),0):(this.error('insert','keine Factory uebergeben'),-1):(this.error('insert','kein Factoryname uebergeben'),-1)}catch(t){return this.exception('insert',t),-1}}find(t){try{return this.mFactoryList.get(t)}catch(t){return void this.exception('find',t)}}first(){try{return this.mFactoryIterator=this.mFactoryList.values(),this.mFactoryIterator.next().value}catch(t){return void this.exception('first',t)}}next(){try{return this.mFactoryIterator.next().value}catch(t){return void this.exception('next',t)}}remove(t){try{return this.mFactoryList.delete(t),0}catch(t){return this.exception('remove',t),-1}}clear(){try{return this.mFactoryList.clear(),0}catch(t){return this.exception('clear',t),-1}}},s.mErrorBase=new n('FactoryManager');class o extends n{constructor(){super('PluginList'),this.mPluginList=new Map,this.mPluginIterator=this.mPluginList.values()}getSize(){return this.mPluginList.size}getNameList(){return Array.from(this.mPluginList.keys())}insert(t,e){try{return t?e?this.mPluginList.has(t)?(this.error('insert','Plugin existiert bereits '+t),-1):(this.mPluginList.set(t,e),0):(this.error('insert','kein Plugin uebergeben'),-1):(this.error('insert','kein Pluginname uebergeben'),-1)}catch(t){return this.exception('insert',t),-1}}find(t){try{return this.mPluginList.get(t)}catch(t){return void this.exception('find',t)}}first(){try{return this.mPluginIterator=this.mPluginList.values(),this.mPluginIterator.next().value}catch(t){return void this.exception('first',t)}}next(){try{return this.mPluginIterator.next().value}catch(t){return void this.exception('next',t)}}remove(t){try{return this.mPluginList.delete(t),0}catch(t){return this.exception('remove',t),-1}}clear(){try{return this.mPluginList.clear(),0}catch(t){return this.exception('clear',t),-1}}}class u{constructor(){}static setErrorOutputOn(){u.mPluginList.setErrorOutputOn(),u.mErrorBase.setErrorOutputOn()}static setErrorOutputOff(){u.mPluginList.setErrorOutputOff(),u.mErrorBase.setErrorOutputOff()}static setErrorOutputFunc(t){u.mPluginList.setErrorOutputFunc(t),u.mErrorBase.setErrorOutputFunc(t)}static getSize(){return u.mPluginList.getSize()}static getNameList(){return u.mPluginList.getNameList()}static get(t,e,r){if(!t)return u.mErrorBase.error('get','kein PluginName uebergeben'),null;const n=u.find(t);return n||(r?r.create(t,e):(u.mErrorBase.error('get','keine PluginFactoryClass uebergeben'),null))}static find(t){const e=u.mPluginList.find(t);return e||null}static insert(t,e){return u.mPluginList.insert(t,e)}static remove(t){return u.mPluginList.remove(t)}static clear(){let t=u.mPluginList.first();for(;t;){try{t.done()}catch(t){u.mErrorBase.exception('clear',t)}t=u.mPluginList.next()}return u.mPluginList.clear()}}u.mPluginList=new o,u.mErrorBase=new n('PluginManager');const E='EN',a='DE';let c=a;const m='undefine Error',l={0:'kein Fehler',1:'undefinierter Fehler',2:'kein setDialog',3:'kein startDialog',4:'kein stopDialog',5:'kein loadDialogFile',6:'kein writeDialogData',7:'kein setting',8:'kein setState',9:'kein setStateContext',10:'kein skipNextSpeak',11:'Exception aufgetreten',12:'keine gueltige Nachricht'},h={0:'no Error',1:m,2:'no setDialog',3:'no startDialog',4:'no stopDialog',5:'no loadDialogFile',6:'no writeDialogData',7:'no setting',8:'no setState',9:'no setStateContext',10:'no skipNextSpeak',11:'throw exception',12:'invalid message'};var p=Object.freeze({__proto__:null,SPEECH_ERROR_ENGLISH:E,SPEECH_ERROR_GERMAN:a,SPEECH_NO_ERROR:0,SPEECH_UNDEFINE_ERROR:1,SPEECH_NOSETDIALOG_ERROR:2,SPEECH_NOSTARTDIALOG_ERROR:3,SPEECH_NOSTOPDIALOG_ERROR:4,SPEECH_NOLOADDIALOGFILE_ERROR:5,SPEECH_NOWRITEDIALOGDATA_ERROR:6,SPEECH_NOSETTING_ERROR:7,SPEECH_NOSETSTATE_ERROR:8,SPEECH_NOSETSTATECONTEXT_ERROR:9,SPEECH_NOSKIPNEXTSPEAK_ERROR:10,SPEECH_EXCEPTION_ERROR:11,SPEECH_INVALIDMESSAGE_ERROR:12,SPEECH_UNDEFINE_ERRORTEXT:m,setErrorLanguage:function(t){return c=t===E?E:a,c},getErrorText:function(t){const e=Math.abs(t);let r=l;return c===E&&(r=h),r[e]||r[1]||m}});const g='ComponentMessage';class O{constructor(){}static setErrorOutputOn(){O.mComponentList.setErrorOutputOn(),O.mErrorBase.setErrorOutputOn()}static setErrorOutputOff(){O.mComponentList.setErrorOutputOff(),O.mErrorBase.setErrorOutputOff()}static setErrorOutputFunc(t){O.mComponentList.setErrorOutputFunc(t),O.mErrorBase.setErrorOutputFunc(t)}static getSize(){return O.mComponentList.getSize()}static getNameList(){return O.mComponentList.getNameList()}static getNameTypeList(t){return O.mComponentList.getNameTypeList(t)}static getTypeList(){return O.mComponentList.getTypeList()}static find(t){const e=O.mComponentList.find(t);return e||null}static insert(t,e){return O.mComponentList.insert(t,e)}static remove(t){return O.mComponentList.remove(t)}static clear(){let t=O.mComponentList.first();for(;t;){try{t.done()}catch(t){O.mErrorBase.exception('clear',t)}t=O.mComponentList.next()}return O.mComponentList.clear()}static sendMessage(t){if(t&&t.type===g)if(t.dest){const e=O.find(t.dest);if(e)return e.handleMessage(t),0;O.mErrorBase.error('sendMessage','Komponente nicht gefunden '+t.dest)}else O.mErrorBase.error('sendMessage','Komponentenname nicht uebergeben');else O.mErrorBase.error('sendMessage','keine Komponenten-Nachricht');return-1}static getSendMessageFunc(){return t=>O.sendMessage(t)}}O.mComponentList=new class extends n{constructor(){super('ComponentList'),this.mComponentList=new Map,this.mComponentIterator=this.mComponentList.values()}getSize(){return this.mComponentList.size}getNameList(){return Array.from(this.mComponentList.keys())}getNameTypeList(t){const e=[];let r=this.first();for(;r;)r.getType()===t&&e.push(r.getName()),r=this.next();return e}getTypeList(){const t=[];let e=this.first(),r=-1;for(;e;)r=t.findIndex((t=>t===e.getType())),-1===r&&t.push(e.getName()),e=this.next();return t}insert(t,e){try{return t?e?this.mComponentList.has(t)?(this.error('insert','Komponente existiert bereits '+t),-1):(this.mComponentList.set(t,e),0):(this.error('insert','keine Komponente uebergeben '+t),-1):(this.error('insert','kein Komponentenname uebergeben'),-1)}catch(t){return this.exception('insert',t),-1}}find(t){try{return this.mComponentList.get(t)}catch(t){return void this.exception('find',t)}}first(){try{return this.mComponentIterator=this.mComponentList.values(),this.mComponentIterator.next().value}catch(t){return void this.exception('first',t)}}next(){try{return this.mComponentIterator.next().value}catch(t){return void this.exception('next',t)}}remove(t){try{return this.mComponentList.delete(t),0}catch(t){return this.exception('remove',t),-1}}clear(){try{return this.mComponentList.clear(),0}catch(t){return this.exception('clear',t),-1}}},O.mErrorBase=new n('ComponentManager');const P='0.6.1',S='0002',_='alpha',N='08.01.2022',d="0.6.1.0002 vom 08.01.2022 (alpha)",T=d,C='init',L='error';class f extends n{constructor(t,e,r=!1){super('EventFunctionList'),this.mEventName='Event',this.mComponentName='Component',this.mAsyncFlag=!1,this.mFunctionList=new Map,this.mEventName=t,this.mComponentName=e,this.mAsyncFlag=r}setComponentName(t){this.mComponentName=t}getComponentName(){return this.mComponentName}getName(){return this.mEventName}getSize(){return this.mFunctionList.size}addListener(t,e){return t?'function'!=typeof e?(this.error('addListener','keine Eventfunktion uebergeben '+t+','+this.getComponentName()+','+this.getName()),-1):this.mFunctionList.has(t)?(this.error('addListener','Eventfunktion bereits vorhanden '+t+','+this.getComponentName()+','+this.getName()),-1):(this.mFunctionList.set(t,e),0):(this.error('addListener','kein Listenername uebergeben '+this.getComponentName()+','+this.getName()),-1)}removeListener(t){return t?(this.mFunctionList.delete(t),0):(this.error('removeListener',"kein Listenername uebergeben,"+this.getComponentName()+','+this.getName()),-1)}dispatch(t){let e=0;return this.mFunctionList.forEach((r=>{if(this.mAsyncFlag)setTimeout((function(){try{r(t)}catch(t){console.log('EventFunction.dispatch: Exception',t)}}),0);else try{0!==r(t)&&(e=-1)}catch(t){this.exception('dispatch',t),e=-1}})),e}dispatchListener(t,e){if(!t)return this.error('dispatchListener','kein Listenername uebergeben '+this.getComponentName()+','+this.getName()),-1;let r=0;const n=this.mFunctionList.get(t);if(n)if(this.mAsyncFlag)setTimeout((function(){try{n(e)}catch(t){console.log('EventFunction.dispatchListener: Exception',t)}}),0);else try{r=n(e)}catch(t){this.exception('dispatchListener',t),r=-1}return r}clear(){this.mFunctionList.clear()}}class v extends n{constructor(t,e=!0){if(super('Plugin'),this.mPluginName='',this.mOnInitFunc=null,this.mOnErrorFunc=null,this.mInitFlag=!1,this.mActiveFlag=!1,this._setErrorClassName(this.getClass()),this.mPluginName=t,e&&0!==u.insert(t,this))throw new Error('Plugin '+this.getName()+' ist bereits im PluginManager vorhanden');this.setErrorOutputFunc(this._getErrorOutputFunc())}isMock(){return!1}getType(){return'Plugin'}getClass(){return'Plugin'}getName(){return this.mPluginName}_setOption(t){return 0}init(t){return this.mActiveFlag=!0,t&&('boolean'==typeof t.activeFlag&&(this.mActiveFlag=t.activeFlag),'boolean'==typeof t.errorOutputFlag&&this.setErrorOutput(t.errorOutputFlag),0!==this._setOption(t))?-1:(this.mInitFlag=!0,0)}done(){return this.mInitFlag=!1,this.mActiveFlag=!1,this.mOnInitFunc=null,this.mOnErrorFunc=null,super.setErrorOutputDefault(),0}reset(t){return this.mActiveFlag=this.isInit(),0}isInit(){return this.mInitFlag}_clearInit(){this.mInitFlag=!1,this.mActiveFlag=!1}setFeatureList(t){return 0}isActive(){return this.mActiveFlag}setActiveOn(){return this.mActiveFlag=!0,0}setActiveOff(){return this.mActiveFlag=!1,0}_getErrorOutputFunc(){return t=>this._onError(new Error(t))}_onInit(){if('function'==typeof this.mOnInitFunc)try{return this.mOnInitFunc(this.getName())}catch(t){return this.exception('Plugin._onInit',t),-1}return 0}_onError(t){if('function'==typeof this.mOnErrorFunc)try{return this.mOnErrorFunc(t)}catch(t){return this.isErrorOutput()&&console.log('===> EXCEPTION Plugin._onError: ',t.message),-1}return 0}set onInit(t){this.mOnInitFunc=t}get onInit(){return()=>this._onInit()}set onError(t){this.mOnErrorFunc=t}get onError(){return t=>this._onError(t)}test(t,e){return{result:0}}}class F extends v{constructor(t,e=!0){super(t,e),this.mPluginList=new o,this.mCurrentPlugin=null,this.mPluginList.setErrorOutputFunc(this._getErrorOutputFunc())}getType(){return'PluginGroup'}getClass(){return'PluginGroup'}init(t){return 0!==super.init(t)?-1:0!==this.startAllPlugin(t)?(this._clearInit(),-1):0}done(){return this.mCurrentPlugin=null,this.stopAllPlugin(),super.done()}setFeatureList(t){if('object'!=typeof t)return this.error('setFeatureList','keine gueltige Feature Liste'),-1;if((t=>{for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0})(t))return 0;try{let e=super.setFeatureList(t),r=this.mPluginList.first();for(;r;)0!==r.setFeatureList(t)&&(e=-1),r=this.mPluginList.next();return e}catch(t){return this.exception('setFeatureList',t),-1}}setErrorOutput(t){super.setErrorOutput(t),this.mPluginList.setErrorOutput(t),this._setErrorOutputAllPlugin(t)}insertPlugin(t,e){return this.mPluginList.insert(t,e)}removePlugin(t){return this.mPluginList.remove(t)}removeAllPlugin(){return this.mPluginList.clear()}findPlugin(t,e){const r=this.mPluginList.find(t);return r||null}firstPlugin(){return this.mPluginList.first()}nextPlugin(){return this.mPluginList.next()}getPluginNameList(){return this.mPluginList.getNameList()}isCurrentPlugin(){return!!this.mCurrentPlugin}setCurrentPlugin(t){const e=this.findPlugin(t);return e?(this.mCurrentPlugin=e,0):(this.error('setCurrentPlugin','Kein Plugin vorhanden'),0)}getCurrentPlugin(){return this.mCurrentPlugin}getCurrentPluginName(){return this.mCurrentPlugin?this.mCurrentPlugin.getName():''}isPlugin(t){return!!this.mPluginList.find(t)}getPluginSize(){return this.mPluginList.getSize()}startPlugin(t,e){const r=this.mPluginList.find(t);return r?r.isInit()?0:r.init(e):(this.error('startPlugin','Plugin nicht vorhanden'),-1)}stopPlugin(t){const e=this.mPluginList.find(t);return e?e.done():(this.error('stopPlugin','Plugin nicht vorhanden'),-1)}startAllPlugin(t){try{let e=0,r=this.mPluginList.first();for(;r;)r.isInit()||0===r.init(t)||(e=-1),r=this.mPluginList.next();return e}catch(t){return this.exception('startAllPlugin',t),-1}}stopAllPlugin(){try{let t=0,e=this.mPluginList.first();for(;e;)0!==e.done()&&(t=-1),e=this.mPluginList.next();return t}catch(t){return this.exception('stopAllPlugin',t),-1}}_setErrorOutputAllPlugin(t){try{let e=this.mPluginList.first();for(;e;)t?e.setErrorOutputOn():e.setErrorOutputOff(),e=this.mPluginList.next();return 0}catch(t){return this.exception('_setErrorOutputAllPlugin',t),-1}}}class I extends F{constructor(t,e=!0){super(t,e),this.mSendMessageFunc=null,this.mInitEvent=new f(C),this.mErrorEvent=new f(L),e&&O.insert(t,this),this.mInitEvent.setComponentName(t),this.mErrorEvent.setComponentName(t),this.mInitEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mErrorEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.setSendMessageFunc(O.getSendMessageFunc())}getType(){return'Component'}getClass(){return'Component'}getVersion(){return T}init(t){return 0!==super.init(t)?-1:0}done(){return this.mInitEvent.clear(),this.mErrorEvent.clear(),super.done()}setErrorOutput(t){super.setErrorOutput(t),this.mInitEvent.setErrorOutput(t),this.mErrorEvent.setErrorOutput(t)}connect(){return 0}isConnect(){return!0}getNetType(){return'undefined'}_addEventListenerAllPlugin(t,e,r){try{let n=-1,i=this.mPluginList.first();for(;i;){if(i instanceof I){const s=i;s&&0===s.addEventListener(t,e,r)&&(n=0)}i=this.mPluginList.next()}return n}catch(t){return this.exception('addEventListenerAllPlugin',t),-1}}_removeEventListenerAllPlugin(t,e){try{let r=-1,n=this.mPluginList.first();for(;n;){if(n instanceof I){const i=n;i&&0===i.removeEventListener(t,e)&&(r=0)}n=this.mPluginList.next()}return r}catch(t){return this.exception('removeEventListenerAllPlugin',t),-1}}setSendMessageFunc(t){return this.mSendMessageFunc=t,0}sendMessage(t){return'function'!=typeof this.mSendMessageFunc?-1:this.mSendMessageFunc(t)}handleMessage(t){try{let e=0,r=!0;switch(t.action){case C:e=this.mInitEvent.dispatch(t);break;case L:e=this.mErrorEvent.dispatch(t);break;default:this.error('handleMessage','ungueltige Nachricht: '+t.action),e=-1,r=!1}return r}catch(t){return this.exception('handleMessage',t),!1}}getHandleMessageFunc(){return t=>this.handleMessage(t)}_onInit(){return this.mInitEvent.dispatch(this.getName())}get onInit(){return()=>this._onInit()}_onError(t){return this.mErrorEvent.dispatch(t)}get onError(){return t=>this._onError(t)}addEventListener(t,e,r){let n=0;switch(e){case C:n=this.mInitEvent.addListener(t,r);break;case L:this._addEventListenerAllPlugin(t,e,r),n=this.mErrorEvent.addListener(t,r);break;default:n=this._addEventListenerAllPlugin(t,e,r)}return n}removeEventListener(t,e){let r=0;switch(e){case C:r=this.mInitEvent.removeListener(t);break;case L:this._removeEventListenerAllPlugin(t,e),r=this.mErrorEvent.removeListener(t);break;default:r=this._removeEventListenerAllPlugin(t,e)}return r}}
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
    ***************************************************************************** */
function A(t,e,r,n){return new(r||(r=Promise))((function(i,s){function o(t){try{E(n.next(t))}catch(t){s(t)}}function u(t){try{E(n.throw(t))}catch(t){s(t)}}function E(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(o,u)}E((n=n.apply(t,e||[])).next())}))}class R extends n{constructor(t,e=!0){if(super(t||'Factory'),this.mFactoryName='Factory',this.mFactoryName=t||'Factory',e&&0!==s.insert(this.getName(),this))throw new Error('Factory '+this.getName()+' existiert bereits im FactoryManager')}isMock(){return!1}getType(){return'any'}getName(){return this.mFactoryName}create(t="",e="",r=!0){return null}createAsync(t="",e="",r=!0){return A(this,void 0,void 0,(function*(){return null}))}}const y='portInit',x='portOpen',H='portClose',B='portStart',M='portStop',V='portResult',b='portError';class w extends n{constructor(){super('PortList'),this.mPortList=new Map,this.mPortIterator=this.mPortList.values()}getSize(){return this.mPortList.size}getNameList(){return Array.from(this.mPortList.keys())}insert(t,e){try{return t?e?this.mPortList.has(t)?(this.error('insert','Port existiert bereits: '+t),-1):(this.mPortList.set(t,e),0):(this.error('insert','kein Port uebergeben'),-1):(this.error('insert','kein Portname uebergeben'),-1)}catch(t){return this.exception('insert',t),-1}}find(t){try{return this.mPortList.get(t)}catch(t){return void this.exception('find',t)}}first(){try{return this.mPortIterator=this.mPortList.values(),this.mPortIterator.next().value}catch(t){return void this.exception('first',t)}}next(){try{return this.mPortIterator.next().value}catch(t){return void this.exception('next',t)}}remove(t){try{return this.mPortList.delete(t),0}catch(t){return this.exception('remove',t),-1}}clear(){try{return this.mPortList.clear(),0}catch(t){return this.exception('clear',t),-1}}}class k{constructor(){}static setErrorOutput(t){k.mErrorBase.setErrorOutput(t),k.mPortList.setErrorOutput(t)}static setErrorOutputOn(){k.mErrorBase.setErrorOutputOn(),k.mPortList.setErrorOutputOn()}static setErrorOutputOff(){k.mErrorBase.setErrorOutputOff(),k.mPortList.setErrorOutputOff()}static setErrorOutputFunc(t){k.mErrorBase.setErrorOutputFunc(t),k.mPortList.setErrorOutputFunc(t)}static getSize(){return k.mPortList.getSize()}static getNameList(){return k.mPortList.getNameList()}static findTypeList(t){const e=[];let r=k.first();for(;r;)r.getType()===t&&e.push(r),r=k.next();return e}static findClassList(t){const e=[];let r=k.first();for(;r;)r.getClass()===t&&e.push(r),r=k.next();return e}static get(t,e){if(!t)return k.mErrorBase.error('get','kein Portname uebergeben'),null;let r=k.find(t);if(r)return r;if(!e)return k.mErrorBase.error('get','keine Portklasse uebergeben'),null;try{r=new e(t)}catch(t){return k.mErrorBase.exception('get',t),null}return t!==r.getName()?(k.mErrorBase.error('get','Portnamen stimmen nicht ueberein '+t+' != '+r.getName()),k.remove(r.getName()),null):r}static find(t){const e=k.mPortList.find(t);return e||null}static first(){return k.mPortList.first()}static next(){return k.mPortList.next()}static insert(t,e){return k.mPortList.insert(t,e)}static remove(t){return k.mPortList.remove(t)}static clear(){let t=k.mPortList.first();for(;t;){try{t.done()}catch(t){k.mErrorBase.exception('clear',t)}t=k.mPortList.next()}return k.mPortList.clear()}}k.mPortList=new w,k.mErrorBase=new n('PortManager');class D extends n{constructor(t,e=!0){if(super('Port'),this.mPortName='',this.mPluginName='',this.mInitEvent=new f(y),this.mOpenEvent=new f(x),this.mCloseEvent=new f(H),this.mStartEvent=new f(B),this.mStopEvent=new f(M),this.mResultEvent=new f(V),this.mErrorEvent=new f(b),this.mInitFlag=!1,this.mOpenFlag=!1,this.mRunFlag=!1,this._setErrorClassName(this.getClass()),this.mPortName=t,e&&0!==k.insert(t,this))throw new Error('Port '+this.getName()+' ist bereits im PortManager vorhanden');this.setErrorOutputFunc(this._getErrorOutputFunc()),this.mInitEvent.setComponentName(t),this.mOpenEvent.setComponentName(t),this.mCloseEvent.setComponentName(t),this.mStartEvent.setComponentName(t),this.mStopEvent.setComponentName(t),this.mResultEvent.setComponentName(t),this.mErrorEvent.setComponentName(t),this.mInitEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mOpenEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mCloseEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mStartEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mStopEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mResultEvent.setErrorOutputFunc(this._getErrorOutputFunc()),this.mErrorEvent.setErrorOutputFunc(this._getErrorOutputFunc())}isMock(){return!1}getType(){return'Port'}getClass(){return'Port'}getName(){return this.mPortName}getVersion(){return T}init(t){return this.mInitFlag?(this.error('init','Port ist bereits initialisiert'),-1):(t&&'boolean'==typeof t.errorOutputFlag&&this.setErrorOutput(t.errorOutputFlag),this.mInitFlag=!0,0)}done(){return this.stop(this.mPluginName),this.close(),this.mPluginName='',this.mInitFlag=!1,this.mOpenFlag=!1,this.mRunFlag=!1,this.mInitEvent.clear(),this.mOpenEvent.clear(),this.mCloseEvent.clear(),this.mStartEvent.clear(),this.mStopEvent.clear(),this.mResultEvent.clear(),this.mErrorEvent.clear(),super.setErrorOutputDefault(),0}reset(t){return 0}isInit(){return this.mInitFlag}isServer(){return!1}_clearInit(){this.mInitFlag=!1}_getErrorOutputFunc(){return t=>this._onError(new Error(t))}setErrorOutput(t){super.setErrorOutput(t),this.mInitEvent.setErrorOutput(t),this.mOpenEvent.setErrorOutput(t),this.mCloseEvent.setErrorOutput(t),this.mStartEvent.setErrorOutput(t),this.mStopEvent.setErrorOutput(t),this.mResultEvent.setErrorOutput(t),this.mErrorEvent.setErrorOutput(t)}_onInit(t){const e={event:y,type:'',source:this.getName(),dest:'',result:t,data:null};return this.mInitEvent.dispatch(e)}_onOpen(){const t={event:x,type:'',source:this.getName(),dest:'',result:0,data:null};return this.mOpenEvent.dispatch(t)}_onClose(){const t={event:H,type:'',source:this.getName(),dest:'',result:0,data:null};return this.mCloseEvent.dispatch(t)}_onStart(t="",e=""){const r={event:B,type:e,source:this.getName(),dest:t,result:0,data:null};return t?this.mStartEvent.dispatchListener(t,r):this.mStartEvent.dispatch(r)}_onStop(t="",e=""){const r={event:M,type:e,source:this.getName(),dest:t,result:0,data:null};return t?this.mStopEvent.dispatchListener(t,r):this.mStopEvent.dispatch(r)}_onResult(t,e="",r=""){const n={event:V,type:r,source:this.getName(),dest:e,result:0,data:t};return e?this.mResultEvent.dispatchListener(e,n):this.mResultEvent.dispatch(n)}_onError(t,e="",r=""){return e?this.mErrorEvent.dispatchListener(e,t):this.mErrorEvent.dispatch(t)}addInitEvent(t,e){return this.mInitEvent.addListener(t,e)}addOpenEvent(t,e){return this.mOpenEvent.addListener(t,e)}addCloseEvent(t,e){return this.mCloseEvent.addListener(t,e)}addStartEvent(t,e){return this.mStartEvent.addListener(t,e)}addStopEvent(t,e){return this.mStopEvent.addListener(t,e)}addResultEvent(t,e){return this.mResultEvent.addListener(t,e)}addErrorEvent(t,e){return this.mErrorEvent.addListener(t,e)}removeInitEvent(t){return this.mInitEvent.removeListener(t)}removeOpenEvent(t){return this.mOpenEvent.removeListener(t)}removeCloseEvent(t){return this.mCloseEvent.removeListener(t)}removeStartEvent(t){return this.mStartEvent.removeListener(t)}removeStopEvent(t){return this.mStopEvent.removeListener(t)}removeResultEvent(t){return this.mResultEvent.removeListener(t)}removeErrorEvent(t){return this.mErrorEvent.removeListener(t)}removeAllEvent(t){return this.removeInitEvent(t),this.removeOpenEvent(t),this.removeCloseEvent(t),this.removeStartEvent(t),this.removeStopEvent(t),this.removeResultEvent(t),this.removeErrorEvent(t),0}setConfig(t){return 0}getConfig(){return{}}isOpen(){return this.mOpenFlag}open(t){return 0}close(){return 0}getPluginName(){return this.mPluginName}getActionName(){return''}isRunning(t,e){return this.mRunFlag}isAction(t){return!1}setActionTimeout(t){}start(t,e,r){return 0}stop(t,e,r){return 0}test(t,e,r){return{result:0}}}class G{constructor(t="",e=""){this.transactionId=0,this.plugin='',this.type='',this.result=null,this.error=null,this.plugin=t,this.type=e,G.mTransactionCounter+=1,this.transactionId=G.mTransactionCounter}}G.mTransactionCounter=0;t.Builder=class extends n{constructor(t,e=!0){if(super('Builder'),this.mBuilderName='Builder',this._setErrorClassName(this.getClass()),e&&0!==i.insert(t||this.getName(),this))throw new Error('Builder '+this.getName()+' existiert bereits im BuilderManager');t&&(this.mBuilderName=t)}getType(){return''}getClass(){return'Builder'}getName(){return this.mBuilderName}build(t){return null}_getComponentName(t){return t&&'string'==typeof t.componentName?t.componentName:''}_getComponentClass(t){return t&&'string'==typeof t.componentClass?t.componentClass:''}_getRegisterFlag(t){return!(!t||!t.componentRegisterFlag)&&t.componentRegisterFlag}_getBuilder(t,e){return i.get(t,e)}_getFactory(t,e){return s.get(t,e)}_findComponent(t){return t?u.find(t):null}_getComponent(t,e,r){if(e){const n=this._getBuilder(e,r);if(n)return n.build(t)}const n=this._getComponentName(t),i=this._getComponentClass(t);return u.get(n,i)}_getPlugin(t,e,r,n){if(r&&n){const i=this._getFactory(r,n);if(i)return u.get(t,e,i)}return u.get(t,e)}_findPlugin(t){return u.find(t)}},t.BuilderManager=i,t.CLOUD_AMAZON_PORT='CloudAmazon',t.CLOUD_GOOGLE_PORT='CloudGoogle',t.CLOUD_MICROSOFT_PORT='CloudMicrosoft',t.CLOUD_RASA_PORT='CloudRasa',t.Component=I,t.ComponentManager=O,t.ErrorBase=n,t.EventFunctionList=f,t.Factory=R,t.FactoryManager=s,t.MESSAGE_COMPONENT_TYPE=g,t.PORT_ASRNLU_ACTION='ASRNLU',t.PORT_ASR_ACTION='ASR',t.PORT_CLOSE_EVENT=H,t.PORT_ERROR_EVENT=b,t.PORT_INIT_EVENT=y,t.PORT_NLP_ACTION='NLP',t.PORT_NLU_ACTION='NLU',t.PORT_OPEN_EVENT=x,t.PORT_RESULT_EVENT=V,t.PORT_START_EVENT=B,t.PORT_STOP_EVENT=M,t.PORT_TTS_ACTION='TTS',t.Plugin=v,t.PluginFactory=class extends R{constructor(t){super(t||'PluginFactory')}getType(){return'Plugin'}getName(){return'PluginFactory'}_newPlugin(t,e,r){return new v(t,r)}create(t="",e="",r=!0){const n=t||'Plugin',i=e||'Plugin';try{return this._newPlugin(n,i,r)}catch(t){return this.exception('PluginFactory.create',t),null}}},t.PluginGroup=F,t.PluginList=o,t.PluginManager=u,t.Port=D,t.PortFactory=class extends R{constructor(t){super(t||'PortFactory')}getType(){return'Port'}getName(){return'PortFactory'}_newPort(t,e,r){return new D(t,r)}create(t="",e="",r=!0){const n=t||'Port',i=e||'Port';try{return this._newPort(n,i,r)}catch(t){return this.exception('PortFactory.create',t),null}}},t.PortList=w,t.PortManager=k,t.PortTransaction=G,t.SPEECH_ACTIONSTART_EVENT='actionStart',t.SPEECH_ACTIONSTOP_EVENT='actionStop',t.SPEECH_ACTION_EVENT='action',t.SPEECH_AGENTRESULT_EVENT='agentResult',t.SPEECH_AGENTSTART_EVENT='agentStart',t.SPEECH_AGENTSTOP_EVENT='agentStop',t.SPEECH_APIMOCK_NAME='SpeechApiMock',t.SPEECH_API_NAME='SpeechApi',t.SPEECH_API_VERSION=T,t.SPEECH_AUDIO_FLAG=!0,t.SPEECH_AUDIO_PATH='',t.SPEECH_CORDOVA_TYPE='cordova',t.SPEECH_DEFAULT_EXT="mp3",t.SPEECH_DIALOGACTIONSTOP_EVENT='dialogActionStop',t.SPEECH_DIALOGACTION_EVENT='dialogAction',t.SPEECH_DIALOGJSON_EVENT='dialogJson',t.SPEECH_DIALOGPARSE_EVENT='dialogParse',t.SPEECH_DIALOGSET_EVENT='dialogSet',t.SPEECH_DIALOGSPEAKSTART_EVENT='dialogSpeakStart',t.SPEECH_DIALOGSPEAKSTOP_EVENT='dialogSpeakStop',t.SPEECH_DIALOGSPEAK_EVENT='dialogSpeak',t.SPEECH_DIALOGSTART_EVENT='dialogStart',t.SPEECH_DIALOGSTATESET_EVENT='dialogStateSet',t.SPEECH_DIALOGSTOP_EVENT='dialogStop',t.SPEECH_ERROR_EVENT=L,t.SPEECH_ERROR_OUTPUT=e,t.SPEECH_EVENT_EVENT='event',t.SPEECH_FEATUREINFO_EVENT='featureInfo',t.SPEECH_FEATUREINFO_MESSAGE='featureInfo',t.SPEECH_FILE_NAME='speech.def',t.SPEECH_INFERENCEACTIONSTOP_EVENT='inferenceActionStop',t.SPEECH_INFERENCEACTION_EVENT='inferenceAction',t.SPEECH_INFERENCEPARSE_EVENT='inferenceParse',t.SPEECH_INFERENCESET_EVENT='inferenceSet',t.SPEECH_INFERENCESPEAKSTART_EVENT='inferenceSpeakStart',t.SPEECH_INFERENCESPEAKSTOP_EVENT='inferenceSpeakStop',t.SPEECH_INFERENCESPEAK_EVENT='inferenceSpeak',t.SPEECH_INFERENCESTART_EVENT='inferenceStart',t.SPEECH_INFERENCESTATESET_EVENT='inferenceStateSet',t.SPEECH_INFERENCESTOP_EVENT='inferenceStop',t.SPEECH_INIT_EVENT=C,t.SPEECH_INTENTRESULT_EVENT='intentResult',t.SPEECH_INTENTSTART_EVENT='intentStart',t.SPEECH_INTENTSTOP_EVENT='intentStop',t.SPEECH_LISTENAUDIOSTART_EVENT='listenAudioStart',t.SPEECH_LISTENAUDIOSTOP_EVENT='listenAudioStop',t.SPEECH_LISTENINTENT_EVENT='listenIntent',t.SPEECH_LISTENINTERIMRESULT_EVENT='listenInterimResult',t.SPEECH_LISTENNOMATCH_EVENT='listenNoMatch',t.SPEECH_LISTENRECOGNITIONSTART_EVENT='listenRecognitionStart',t.SPEECH_LISTENRECOGNITIONSTOP_EVENT='listenRecognitionStop',t.SPEECH_LISTENRESULT_EVENT='listenResult',t.SPEECH_LISTENSOUNDSTART_EVENT='listenSoundStart',t.SPEECH_LISTENSOUNDSTOP_EVENT='listenSoundStop',t.SPEECH_LISTENSPEECHSTART_EVENT='listenSpeechStart',t.SPEECH_LISTENSPEECHSTOP_EVENT='listenSpeechStop',t.SPEECH_LISTENSTART_EVENT='listenStart',t.SPEECH_LISTENSTOP_EVENT='listenStop',t.SPEECH_LOADDIALOGFILE_MESSAGE='loadDialogFile',t.SPEECH_MP3_EXT="mp3",t.SPEECH_PATH_NAME='speech/',t.SPEECH_PROMPTRESULT_EVENT='promptResult',t.SPEECH_PROMPTSTART_EVENT='promptStart',t.SPEECH_PROMPTSTOP_EVENT='promptStop',t.SPEECH_RESET_MESSAGE='reset',t.SPEECH_SERVER_VERSION="0.6.1.0002 vom 08.01.2022 (alpha)",t.SPEECH_SETDIALOG_MESSAGE='setDialog',t.SPEECH_SETSTATECONTEXT_MESSAGE='setStateContext',t.SPEECH_SETSTATE_MESSAGE='setState',t.SPEECH_SETTING_MESSAGE='setting',t.SPEECH_SKIPNEXTSPEAK_MESSAGE='skipNextSpeak',t.SPEECH_SPEAKAUDIOUNLOCK_EVENT='speakAudioUnlock',t.SPEECH_SPEAKSTART_EVENT='speakStart',t.SPEECH_SPEAKSTOP_EVENT='speakStop',t.SPEECH_SPEAK_EVENT='speak',t.SPEECH_STARTDIALOG_MESSAGE='startDialog',t.SPEECH_START_EVENT='start',t.SPEECH_STOPDIALOG_MESSAGE='stopDialog',t.SPEECH_STOP_EVENT='stop',t.SPEECH_VERSION_BUILD=S,t.SPEECH_VERSION_DATE=N,t.SPEECH_VERSION_NUMBER=P,t.SPEECH_VERSION_STRING=d,t.SPEECH_VERSION_TYPE=_,t.SPEECH_WAKEWORDDETECT_EVENT='wakewordDetect',t.SPEECH_WAKEWORDSTART_EVENT='wakewordStart',t.SPEECH_WAKEWORDSTOP_EVENT='wakewordStop',t.SPEECH_WAV_EXT='wav',t.SPEECH_WEBSOCKET_TYPE='WebSocket',t.SPEECH_WEBWORKER_FILE='speechworker.js',t.SPEECH_WEBWORKER_PATH='',t.SPEECH_WEBWORKER_TYPE='WebWorker',t.SPEECH_WEB_TYPE='web',t.SPEECH_WORKER_VERSION="0.6.1.0002 vom 08.01.2022 (alpha)",t.SPEECH_WRITEDIALOGDATA_MESSAGE='writeData',t.SpeechBrowser=class{static getBrowserName(){let t='';const e=navigator.userAgent;return'undefined'!=typeof InstallTrigger?t='Firefox':document.documentMode?t='IE':window.safari?t='Safari':window.chrome&&e.match(/OPR/)?t='Opera':window.chrome&&e.match(/Edge/)?t='Edge':window.chrome&&e.match(/Edg/)?t='Edge2':window.chrome&&!e.match(/(OPR|Edge|Edg)/)&&(t='Chrome'),t}},t.SpeechError=p,t.SpeechManager=class{constructor(){}static setErrorOutputOn(){i.setErrorOutputOn(),O.setErrorOutputOn(),s.setErrorOutputOn(),u.setErrorOutputOn()}static setErrorOutputOff(){i.setErrorOutputOff(),O.setErrorOutputOff(),s.setErrorOutputOff(),u.setErrorOutputOff()}static setErrorOutputFunc(t){i.setErrorOutputFunc(t),O.setErrorOutputFunc(t),s.setErrorOutputFunc(t),u.setErrorOutputFunc(t)}static insertBuilder(t,e){return i.insert(t,e)}static getBuilder(t,e){return i.get(t,e)}static findBuilder(t){return i.find(t)}static clear(){i.clear(),O.clear(),s.clear(),u.clear()}},t.SystemManager=class{constructor(){}static setErrorOutputOn(){i.setErrorOutputOn(),O.setErrorOutputOn(),s.setErrorOutputOn(),u.setErrorOutputOn()}static setErrorOutputOff(){i.setErrorOutputOff(),O.setErrorOutputOff(),s.setErrorOutputOff(),u.setErrorOutputOff()}static setErrorOutputFunc(t){i.setErrorOutputFunc(t),O.setErrorOutputFunc(t),s.setErrorOutputFunc(t),u.setErrorOutputFunc(t)}static insertBuilder(t,e){return i.insert(t,e)}static getBuilder(t,e){return i.get(t,e)}static findBuilder(t){return i.find(t)}static clear(){i.clear(),O.clear(),s.clear(),u.clear()}},t.VOICE_ANNA_NAME='ANNA',t.VOICE_DEFAULT_NAME="Hanna",t.VOICE_HANNA_NAME=r,t.VOICE_MARKUS_NAME='MARKUS',t.VOICE_PETRA_NAME='PETRA',t.VOICE_YANNICK_NAME='YANNICK',Object.defineProperty(t,'__esModule',{value:!0})}));