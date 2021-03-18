/**
 * Speech-Service Bundle
 *
 * Version: 0.6.0
 * Build:   0001
 * TYPE:    alpha
 * Datum:   18.03.2021
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

!function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? t(exports, require('@speech/core')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core' ], t) : t((e = 'undefined' != typeof globalThis ? globalThis : e || self).speechService = {}, e.speechCore);
}(this, function(e, t) {
    'use strict';
    var o = (n.prototype.unsubscribe = function() {
        this.mEventEmitter && this.mEventEmitter.unsubscribe(this.mIndex), this.mEventEmitter = null, 
        this.mIndex = -1;
    }, n);
    function n(e, t) {
        this.mEventEmitter = e, this.mIndex = t;
    }
    var i = (r.prototype._callEventFunction = function(e, t) {
        if ('function' != typeof e) return console.log('EventEmitter._callEventFunction: Keine Event-Funktion uebergeben'), 
        -1;
        try {
            return e(t), 0;
        } catch (e) {
            return console.log('EventEmitter._callEventFunction: Exception ', e.message), -1;
        }
    }, r.prototype.emit = function(t) {
        for (var n = this, o = this, e = 0, i = this.mFunctionList; e < i.length; e++) !function(e) {
            e && (o.mAsyncFlag ? setTimeout(function() {
                return n._callEventFunction(e, t);
            }, 0) : o._callEventFunction(e, t));
        }(i[e]);
    }, r.prototype.subscribe = function(e) {
        if (e && 'function' == typeof e) {
            for (var t = -1, n = 0; n < this.mFunctionList.length; n++) if (null === this.mFunctionList[n]) {
                this.mFunctionList[t = n] = e;
                break;
            }
            return -1 === t && (t = this.mFunctionList.push(e) - 1), new o(this, t);
        }
        return null;
    }, r.prototype.unsubscribe = function(e) {
        -1 < e && e < this.mFunctionList.length && (e + 1 === this.mFunctionList.length ? this.mFunctionList.pop() : this.mFunctionList[e] = null);
    }, r.prototype.clear = function() {
        this.mFunctionList = [];
    }, r);
    function r(e) {
        void 0 === e && (e = !1), this.mAsyncFlag = !1, this.mFunctionList = [], this.mAsyncFlag = e;
    }
    var c = 'ActionService', s = 'BotService', a = 'IntentService', u = 'ListenService', p = 'SpeakService', m = t.SPEECH_VERSION_NUMBER, l = t.SPEECH_VERSION_BUILD, E = t.SPEECH_VERSION_TYPE, g = m + '.' + l + ' vom ' + t.SPEECH_VERSION_DATE + ' (' + E + ')', l = (Object.defineProperty(v.prototype, "lockEvent", {
        get: function() {
            return this.mLockEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "unlockEvent", {
        get: function() {
            return this.mUnlockEvent;
        },
        enumerable: !1,
        configurable: !0
    }), v.prototype.isLock = function() {
        return !!this.mLockServiceName;
    }, v.prototype.getLockServiceName = function() {
        return this.mLockServiceName;
    }, v.prototype.lock = function(e) {
        return !this.mLockServiceName && (this.mLockServiceName = e, this.mLockEvent.emit(e), 
        !0);
    }, v.prototype.unlock = function(e) {
        return this.mLockServiceName === e && (this.mLockServiceName = '', this.mUnlockEvent.emit(e), 
        !0);
    }, v.prototype.forceLock = function(e) {
        this.mLockServiceName && this.forceUnlock(), this.lock(e);
    }, v.prototype.forceUnlock = function() {
        var e;
        this.mLockServiceName && (e = this.mLockServiceName, this.mLockServiceName = '', 
        this.unlockEvent.emit(e));
    }, v);
    function v() {
        this.mLockServiceName = '', this.mLockEvent = new i(), this.mUnlockEvent = new i();
    }
    h.prototype.getSize = function() {
        return this.mServiceList.size;
    }, h.prototype.insert = function(e, t) {
        try {
            return e ? t ? this.mServiceList.has(e) ? (console.log('ServiceList.insert: Service existiert bereits ' + e), 
            -1) : (this.mServiceList.set(e, t), 0) : (console.log('ServiceList.insert: kein Service uebergeben'), 
            -1) : (console.log('ServiceList.insert: kein Servicename uebergeben'), -1);
        } catch (e) {
            return console.log('ServiceList.insert: Exception ', e), -1;
        }
    }, h.prototype.find = function(e) {
        try {
            return this.mServiceList.get(e);
        } catch (e) {
            return void console.log('ServiceList.find: Exception ', e);
        }
    }, h.prototype.first = function() {
        try {
            return this.mServiceIterator = this.mServiceList.values(), this.mServiceIterator.next().value;
        } catch (e) {
            return void console.log('ServiceList.first: Exception ', e);
        }
    }, h.prototype.next = function() {
        try {
            return this.mServiceIterator.next().value;
        } catch (e) {
            return void console.log('ServiceList.next: Exception ', e);
        }
    }, h.prototype.getNameList = function() {
        return Array.from(this.mServiceList.keys());
    }, h.prototype.remove = function(e) {
        try {
            return this.mServiceList.delete(e), 0;
        } catch (e) {
            return console.log('ServiceList.remove: Exception ', e), -1;
        }
    }, h.prototype.clear = function() {
        try {
            return this.mServiceList.clear(), 0;
        } catch (e) {
            return console.log('ServiceList.clear: Exception ', e), -1;
        }
    }, t = h;
    function h() {
        this.mServiceList = new Map(), this.mServiceIterator = this.mServiceList.values();
    }
    f.clear = function() {
        return f.mServiceList.clear();
    }, f._setSpeakConfig = function(e, t) {
        try {
            var n = t.getConfig();
            return 'boolean' == typeof e.activeFlag && (n.activeFlag = e.activeFlag), 'string' == typeof e.speakLanguage && (n.speakLanguage = e.speakLanguage), 
            'string' == typeof e.audioFormat && (n.audioFormat = e.audioFormat), 'string' == typeof e.audioFilePath && (n.audioFilePath = e.audioFilePath), 
            'boolean' == typeof e.audioFlag && (n.audioFlag = e.audioFlag), 'boolean' == typeof e.errorOutputFlag && (n.errorOutputFlag = e.errorOutputFlag), 
            0;
        } catch (e) {
            return -1;
        }
    }, f._setListenConfig = function(e, t) {
        try {
            var n = t.getConfig();
            return 'boolean' == typeof e.activeFlag && (n.activeFlag = e.activeFlag), 'string' == typeof e.listenLanguage && (n.listenLanguage = e.listenLanguage), 
            'boolean' == typeof e.errorOutputFlag && (n.errorOutputFlag = e.errorOutputFlag), 
            0;
        } catch (e) {
            return -1;
        }
    }, f._setIntentConfig = function(e, t) {
        try {
            var n = t.getConfig();
            return 'boolean' == typeof e.activeFlag && (n.activeFlag = e.activeFlag), 'string' == typeof e.intentLanguage && (n.intentLanguage = e.intentLanguage), 
            'boolean' == typeof e.errorOutputFlag && (n.errorOutputFlag = e.errorOutputFlag), 
            0;
        } catch (e) {
            return -1;
        }
    }, f._setActionConfig = function(e, t) {
        try {
            var n = t.getConfig();
            return 'boolean' == typeof e.activeFlag && (n.activeFlag = e.activeFlag), 'boolean' == typeof e.errorOutputFlag && (n.errorOutputFlag = e.errorOutputFlag), 
            0;
        } catch (e) {
            return -1;
        }
    }, f._setBotConfig = function(e, t) {
        try {
            var n = t.getConfig();
            return 'boolean' == typeof e.activeFlag && (n.activeFlag = e.activeFlag), 'boolean' == typeof e.speakFlag && (n.speakFlag = e.speakFlag), 
            'boolean' == typeof e.actionFlag && (n.actionFlag = e.actionFlag), 'string' == typeof e.dialogName && (n.dialogName = e.dialogName), 
            'string' == typeof e.dialogRootState && (n.dialogRootState = e.dialogRootState), 
            'boolean' == typeof e.dialogLoadFlag && (n.dialogLoadFlag = e.dialogLoadFlag), 'string' == typeof e.dialogFilePath && (n.dialogFilePath = e.dialogFilePath), 
            'string' == typeof e.dialogFileName && (n.dialogFileName = e.dialogFileName), 'boolean' == typeof e.errorOutputFlag && (n.errorOutputFlag = e.errorOutputFlag), 
            0;
        } catch (e) {
            return -1;
        }
    }, f._setConfig = function(e, t, n) {
        try {
            switch (e) {
              case p:
                f._setSpeakConfig(t, n);
                break;

              case u:
                f._setListenConfig(t, n);
                break;

              case a:
                f._setIntentConfig(t, n);
                break;

              case c:
                f._setActionConfig(t, n);
                break;

              case s:
                f._setBotConfig(t, n);
            }
        } catch (e) {
            console.log('ServiceManager._add: Exception ', e);
        }
    }, f.get = function(e, t, n) {
        if (void 0 === n && (n = {}), !e) return console.log('ServiceManager.get: kein Servicename uebergeben'), 
        null;
        var o = f.mServiceList.find(e);
        if (o) return o;
        if (!t) return console.log('ServiceManager.get: keine Serviceklasse uebergeben'), 
        null;
        try {
            f._setConfig(e, n, t), o = new t();
        } catch (e) {
            return console.log('ServiceManager.get: Exception ', e), null;
        }
        return e !== o.getName() ? (console.log('ServiceManager.get: Servicenamen stimmen nicht ueberein ' + e + ' != ' + o.getName()), 
        null) : o;
    }, f.find = function(e) {
        return e ? f.mServiceList.find(e) : (console.log('ServiceManager.get: kein Servicename uebergeben'), 
        null);
    }, f.insert = function(e) {
        return e ? f.mServiceList.find(e.getName()) ? -1 : f.mServiceList.insert(e.getName(), e) : (console.log('ServiceManager.insert: kein Service uebergeben'), 
        -1);
    }, f.mServiceList = new t(), E = f;
    function f() {}
    S.prototype.getComponentName = function() {
        return this.mComponentName;
    }, S.prototype.getName = function() {
        return this.mServiceName;
    }, S.prototype.getVersion = function() {
        return this.mServiceVersion;
    }, S.prototype.getApiVersion = function() {
        return this.mServiceApiVersion;
    }, S.prototype._setOption = function(e) {
        return e ? ('boolean' == typeof e.activeFlag && (this.active = e.activeFlag), 'boolean' == typeof e.errorOutputFlag && (this.errorOutput = e.errorOutputFlag), 
        0) : -1;
    }, S.prototype._createComponent = function(e, t) {
        return null;
    }, S.prototype.init = function(e) {
        return this.mComponent ? (this._setOption(e), 0) : (this.mComponent = this._createComponent(this.getComponentName(), e), 
        this.mComponent ? (this._setOption(e), this.mErrorOutputFlag && console.log(this.getName() + ' Version:', this.getVersion()), 
        this._addAllEvent(this.getName())) : (this._error('init', 'Komponente nicht erzeugt'), 
        -1));
    }, S.prototype.reset = function(e) {
        if (!this.mComponent) return this._error('reset', 'keine Komponente vorhanden'), 
        -1;
        var t = this.mComponent.reset(e);
        return this._setOption(e), t;
    }, S.prototype.isInit = function() {
        return !!this.mComponent;
    }, S.prototype.isActive = function() {
        return !!this.mComponent && this.mComponent.isActive();
    }, S.prototype.setActiveOn = function() {
        return this.mComponent ? this.mComponent.setActiveOn() : -1;
    }, S.prototype.setActiveOff = function() {
        return this.mComponent ? this.mComponent.setActiveOff() : -1;
    }, Object.defineProperty(S.prototype, "active", {
        get: function() {
            return this.isActive();
        },
        set: function(e) {
            e ? this.setActiveOn() : this.setActiveOff();
        },
        enumerable: !1,
        configurable: !0
    }), S.prototype.isErrorOutput = function() {
        return this.mComponent ? this.mComponent.isErrorOutput() : this.mErrorOutputFlag;
    }, S.prototype.setErrorOutputOn = function() {
        this.mErrorOutputFlag = !0, this.mComponent && this.mComponent.setErrorOutputOn();
    }, S.prototype.setErrorOutputOff = function() {
        this.mErrorOutputFlag = !1, this.mComponent && this.mComponent.setErrorOutputOff();
    }, Object.defineProperty(S.prototype, "errorOutput", {
        get: function() {
            return this.isErrorOutput();
        },
        set: function(e) {
            e ? this.setErrorOutputOn() : this.setErrorOutputOff();
        },
        enumerable: !1,
        configurable: !0
    }), S.prototype._error = function(e, t) {
        this.mErrorOutputFlag && console.log('===> ERROR ' + this.getName() + '.' + e + ':', t), 
        this.mErrorEvent.emit(new Error(this.getName() + '.' + e + ': ' + t));
    }, S.prototype._exception = function(e, t) {
        this.mErrorOutputFlag && console.log('===> EXCEPTION ' + this.getName() + '.' + e + ':', t.message), 
        this.mErrorEvent.emit(new Error('EXCEPTION ' + this.getName() + '.' + e + ': ' + t.message));
    }, S.prototype._addAllEvent = function(e) {
        var t = this;
        return this.mComponent ? (this.mComponent.removeAllEvent(e), this.mComponent.addInitEvent(e, function() {
            return t.mInitEvent.emit(), 0;
        }), this.mComponent.addStartEvent(e, function() {
            return t.mStartEvent.emit(), 0;
        }), this.mComponent.addStopEvent(e, function() {
            return t.mStopEvent.emit(), 0;
        }), this.mComponent.addErrorEvent(e, function(e) {
            return t.mErrorEvent.emit(e), 0;
        }), 0) : (this._error('_addAllEvent', 'keine Komponente vorhanden'), -1);
    }, Object.defineProperty(S.prototype, "initEvent", {
        get: function() {
            return this.mInitEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(S.prototype, "startEvent", {
        get: function() {
            return this.mStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(S.prototype, "stopEvent", {
        get: function() {
            return this.mStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(S.prototype, "errorEvent", {
        get: function() {
            return this.mErrorEvent;
        },
        enumerable: !1,
        configurable: !0
    }), S.prototype.isRunning = function() {
        return !!this.mComponent && this.mComponent.isRunning();
    }, S.prototype.start = function() {
        return this.mComponent ? this.mComponent.start() : (this._error('start', 'keine Komponente vorhanden'), 
        -1);
    }, S.prototype.stop = function() {
        return this.mComponent ? this.mComponent.stop() : (this._error('stop', 'keine Komponente vorhanden'), 
        -1);
    }, S.prototype.test = function(e, t) {
        return this.mComponent ? this.mComponent.test(e, t) : (this._error('test', 'keine Komponente vorhanden'), 
        {
            result: -1
        });
    }, t = S;
    function S(e, t, n) {
        this.mComponent = null, this.mComponentName = '', this.mServiceName = 'Service', 
        this.mServiceVersion = g, this.mServiceApiVersion = "1.0", this.mInitEvent = new i(!1), 
        this.mStartEvent = new i(!1), this.mStopEvent = new i(!1), this.mErrorEvent = new i(!1), 
        this.mErrorOutputFlag = !1, this.mComponentName = e, this.mServiceName = t, this.mServiceVersion = n;
    }
    e.EventEmitter = i, e.SERVICE_ACTION_NAME = c, e.SERVICE_AGENT_NAME = 'AgentService', 
    e.SERVICE_AMAZON_NAME = 'AmazonService', e.SERVICE_API_VERSION = "1.0", e.SERVICE_ASYNC_EVENT = !1, 
    e.SERVICE_BOT_NAME = s, e.SERVICE_COMPONENT_NAME = 'ServiceComponent', e.SERVICE_DIALOG_NAME = 'DialogService', 
    e.SERVICE_ERROR_OUTPUT = !1, e.SERVICE_GOOGLE_NAME = 'GoogleService', e.SERVICE_INTENT_NAME = a, 
    e.SERVICE_LISTEN_NAME = u, e.SERVICE_MICROSOFT_NAME = 'MicrosoftService', e.SERVICE_RASA_NAME = 'RasaService', 
    e.SERVICE_SERVICEMOCK_NAME = 'ServiceMock', e.SERVICE_SERVICE_NAME = 'Service', 
    e.SERVICE_SPEAK_NAME = p, e.SERVICE_TYPE_NAME = 'Service', e.SERVICE_VERSION_STRING = g, 
    e.SPEECH_ACTION_SERVICE = 'ActionService', e.SPEECH_AGENT_SERVICE = 'AgentService', 
    e.SPEECH_AMAZON_SERVICE = 'AmazonService', e.SPEECH_BOT_SERVICE = 'BotService', 
    e.SPEECH_DIALOG_SERVICE = 'DialogService', e.SPEECH_GOOGLE_SERVICE = 'GoogleService', 
    e.SPEECH_INTENT_SERVICE = 'IntentService', e.SPEECH_LISTEN_SERVICE = 'ListenService', 
    e.SPEECH_MICROSOFT_SERVICE = 'MicrosoftService', e.SPEECH_RASA_SERVICE = 'RasaService', 
    e.SPEECH_SPEAK_SERVICE = 'SpeakService', e.Service = t, e.ServiceLock = l, e.ServiceManager = E, 
    Object.defineProperty(e, '__esModule', {
        value: !0
    });
});
