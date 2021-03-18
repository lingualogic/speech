/**
 * Speech-Base Bundle
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

!function(t, e) {
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechBase = {}, t.speechCore);
}(this, function(t, o) {
    'use strict';
    var e = o.SPEECH_VERSION_NUMBER, n = o.SPEECH_VERSION_BUILD, r = o.SPEECH_VERSION_TYPE, i = e + '.' + n + ' vom ' + o.SPEECH_VERSION_DATE + ' (' + r + ')', p = 'Base', u = 'BaseComponent', s = function(t, e) {
        return (s = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        })(t, e);
    };
    function E(t, e) {
        function n() {
            this.constructor = t;
        }
        s(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
        new n());
    }
    var c, e = (E(m, c = o.Component), m.prototype.getType = function() {
        return p;
    }, m.prototype.getClass = function() {
        return 'BaseComponent';
    }, m.prototype.getVersion = function() {
        return i;
    }, m.prototype.getApiVersion = function() {
        return "1.1";
    }, m.prototype.getServerVersion = function() {
        return '';
    }, m.prototype._setOption = function(t) {
        return 0;
    }, m.prototype._initAllPlugin = function(t) {
        return 0;
    }, m.prototype.init = function(t) {
        return this.isInit() ? (this.isErrorOutput() && console.log('BaseComponent.init: bereits initialisiert'), 
        0) : 0 !== c.prototype.init.call(this, t) ? -1 : 0 !== this._initAllPlugin(t) ? (this._clearInit(), 
        -1) : (this._setOption(t), 0);
    }, m.prototype._doneAllPlugin = function() {}, m.prototype._doneAllEvent = function() {}, 
    m.prototype._doneAllAttribute = function() {}, m.prototype.done = function() {
        return this.isRunning() && this.stop(), this._doneAllEvent(), this.mStartEvent.clear(), 
        this.mStopEvent.clear(), this._doneAllPlugin(), this._doneAllAttribute(), c.prototype.done.call(this);
    }, m.prototype._resetAllDefault = function() {}, m.prototype.reset = function(t) {
        return this.isInit() ? (this.isRunning() && this.stop(), this.setActiveOn(), this._resetAllDefault(), 
        this._setOption(t), 0) : (this.error('reset', 'Komponente nicht initialisiert'), 
        -1);
    }, m.prototype.setErrorOutput = function(t) {
        c.prototype.setErrorOutput.call(this, t), this.mStartEvent.setErrorOutput(t), this.mStopEvent.setErrorOutput(t);
    }, m.prototype._onStart = function() {
        return this.mStartEvent.dispatch();
    }, m.prototype._onStop = function() {
        return this.mStopEvent.dispatch();
    }, Object.defineProperty(m.prototype, "onStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(m.prototype, "onStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), m.prototype.addEventListener = function(t, e, n) {
        var r = 0;
        switch (e) {
          case o.SPEECH_START_EVENT:
            r = this.mStartEvent.addListener(t, n);
            break;

          case o.SPEECH_STOP_EVENT:
            r = this.mStopEvent.addListener(t, n);
            break;

          default:
            r = c.prototype.addEventListener.call(this, t, e, n);
        }
        return r;
    }, m.prototype.removeEventListener = function(t, e) {
        var n = 0;
        switch (e) {
          case o.SPEECH_START_EVENT:
            n = this.mStartEvent.removeListener(t);
            break;

          case o.SPEECH_STOP_EVENT:
            n = this.mStopEvent.removeListener(t);
            break;

          default:
            n = c.prototype.removeEventListener.call(this, t, e);
        }
        return n;
    }, m.prototype.addInitEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_INIT_EVENT, e);
    }, m.prototype.addStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_START_EVENT, e);
    }, m.prototype.addStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_STOP_EVENT, e);
    }, m.prototype.addErrorEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_ERROR_EVENT, e);
    }, m.prototype.removeInitEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_INIT_EVENT);
    }, m.prototype.removeStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_START_EVENT);
    }, m.prototype.removeStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_STOP_EVENT);
    }, m.prototype.removeErrorEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_ERROR_EVENT);
    }, m.prototype.removeAllEvent = function(t) {
        return t ? (this.removeInitEvent(t), this.removeStartEvent(t), this.removeStopEvent(t), 
        this.removeErrorEvent(t), 0) : (this.error('removeAllEvent', 'kein Pluginname uebergeben'), 
        -1);
    }, m.prototype.getStartFunc = function() {
        var t = this;
        return function() {
            return t.start();
        };
    }, m.prototype.getStopFunc = function() {
        var t = this;
        return function() {
            return t.stop();
        };
    }, m.prototype.isRunning = function() {
        return !!this.isActive() && this.mRunningFlag;
    }, m.prototype.start = function(t) {
        return 0;
    }, m.prototype.stop = function() {
        return 0;
    }, m.prototype.test = function(t, e) {
        return {
            result: -1,
            errorText: 'kein Test implementiert'
        };
    }, m);
    function m(t, e) {
        e = c.call(this, t, e = void 0 === e ? !0 : e) || this;
        return e.mStartEvent = new o.EventFunctionList(o.SPEECH_START_EVENT, u), e.mStopEvent = new o.EventFunctionList(o.SPEECH_STOP_EVENT, u), 
        e.mRunningFlag = !1, e.mStartEvent.setComponentName(t), e.mStopEvent.setComponentName(t), 
        e.mStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e;
    }
    var a, n = (E(v, a = o.ErrorBase), v.prototype._getBuilderName = function() {
        return '';
    }, v.prototype._init = function(t) {
        return t && 'boolean' == typeof t.errorOutputFlag && t.errorOutputFlag, 0;
    }, v.prototype.reset = function(t) {
        return 0;
    }, v.prototype.getType = function() {
        return 'Base';
    }, v.prototype.getName = function() {
        return this._getErrorClassName();
    }, v.prototype.getVersion = function() {
        return o.SPEECH_API_VERSION;
    }, v.prototype.getApiVersion = function() {
        return o.SPEECH_API_VERSION;
    }, v.prototype.getServerVersion = function() {
        return '';
    }, v.prototype.isActive = function() {
        return !(!this.mActiveFlag || !this.mPlugin);
    }, v.prototype.setActiveOn = function() {
        return this.mActiveFlag = !0, 0;
    }, v.prototype.setActiveOff = function() {
        return this.mActiveFlag = !1, 0;
    }, v.prototype.setErrorOutput = function(t) {
        a.prototype.setErrorOutput.call(this, t), this.mInitEvent.setErrorOutput(t), this.mErrorEvent.setErrorOutput(t), 
        this.mStartEvent.setErrorOutput(t), this.mStopEvent.setErrorOutput(t);
    }, v.prototype._getErrorOutputFunc = function() {
        var e = this;
        return function(t) {
            return e._onError(new Error(t));
        };
    }, v.prototype._onInit = function() {
        return this.mInitEvent.dispatch(this.getName());
    }, v.prototype._onError = function(t) {
        return this.mErrorEvent.dispatch(t);
    }, v.prototype._onStart = function() {
        return this.mStartEvent.dispatch();
    }, v.prototype._onStop = function() {
        return this.mStopEvent.dispatch();
    }, v.prototype.addEventListener = function(t, e, n) {
        var r = 0;
        switch (e) {
          case o.SPEECH_INIT_EVENT:
            r = this.mInitEvent.addListener(t, n);
            break;

          case o.SPEECH_ERROR_EVENT:
            r = this.mErrorEvent.addListener(t, n);
            break;

          case o.SPEECH_START_EVENT:
            r = this.mStartEvent.addListener(t, n);
            break;

          case o.SPEECH_STOP_EVENT:
            r = this.mStopEvent.addListener(t, n);
        }
        return r;
    }, v.prototype.removeEventListener = function(t, e) {
        var n = 0;
        switch (e) {
          case o.SPEECH_INIT_EVENT:
            n = this.mInitEvent.removeListener(t);
            break;

          case o.SPEECH_ERROR_EVENT:
            n = this.mErrorEvent.removeListener(t);
            break;

          case o.SPEECH_START_EVENT:
            n = this.mStartEvent.removeListener(t);
            break;

          case o.SPEECH_STOP_EVENT:
            n = this.mStopEvent.removeListener(t);
        }
        return n;
    }, v.prototype.addInitEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_INIT_EVENT, e);
    }, v.prototype.addStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_START_EVENT, e);
    }, v.prototype.addStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_STOP_EVENT, e);
    }, v.prototype.addErrorEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_ERROR_EVENT, e);
    }, v.prototype.removeInitEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_INIT_EVENT);
    }, v.prototype.removeStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_START_EVENT);
    }, v.prototype.removeStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_STOP_EVENT);
    }, v.prototype.removeErrorEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_ERROR_EVENT);
    }, v.prototype.removeAllEvent = function(t) {
        return t ? (this.removeInitEvent(t), this.removeStartEvent(t), this.removeStopEvent(t), 
        this.removeErrorEvent(t), 0) : (this.error('removeAllEvent', 'kein Pluginname uebergeben'), 
        -1);
    }, v.prototype.isRunning = function() {
        return !!this.isActive() && this.mRunningFlag;
    }, v.prototype.start = function() {
        return 0;
    }, v.prototype.stop = function() {
        return 0;
    }, v.prototype.test = function(t, e) {
        return {};
    }, v);
    function v(t, e) {
        var n = a.call(this, t) || this;
        if (n.mPlugin = null, n.mInitEvent = new o.EventFunctionList(o.SPEECH_INIT_EVENT), 
        n.mErrorEvent = new o.EventFunctionList(o.SPEECH_ERROR_EVENT), n.mStartEvent = new o.EventFunctionList(o.SPEECH_START_EVENT), 
        n.mStopEvent = new o.EventFunctionList(o.SPEECH_STOP_EVENT), n.mActiveFlag = !0, 
        n.mRunningFlag = !1, 0 !== n._init(e)) throw new Error('Komponente nicht initialisiert');
        return n.mInitEvent.setComponentName(t), n.mErrorEvent.setComponentName(t), n.mStartEvent.setComponentName(t), 
        n.mStopEvent.setComponentName(t), n.mInitEvent.setErrorOutputFunc(n._getErrorOutputFunc()), 
        n.mErrorEvent.setErrorOutputFunc(n._getErrorOutputFunc()), n.mStartEvent.setErrorOutputFunc(n._getErrorOutputFunc()), 
        n.mStopEvent.setErrorOutputFunc(n._getErrorOutputFunc()), n;
    }
    h.prototype._getBuilderName = function() {
        return '';
    }, h.prototype._getComponentName = function(t) {
        return t && 'string' === t.componentName ? t.componentName : '';
    }, h.prototype._getComponentClass = function(t) {
        return t && 'string' === t.componentClass ? t.componentClass : '';
    }, h.prototype._getBuilderConfig = function(t) {
        return {
            componentName: this._getComponentName(t),
            componentClass: this._getComponentClass(t)
        };
    }, h.prototype._init = function(t) {
        var e = !1;
        t && 'boolean' == typeof t.errorOutputFlag && (e = t.errorOutputFlag);
        var n = this._getBuilderName();
        t && 'string' == typeof t.builderName && (n = t.builderName);
        try {
            var r = o.BuilderManager.get(n);
            if (!r) return e && console.log('Base._init: Kein Builder vorhanden'), -1;
            if (this.mComponent = r.build(this._getBuilderConfig(t)), !this.mComponent) return e && console.log('Base._init: keine Komponente erzeugt'), 
            -1;
            if (!this.mComponent.isInit()) {
                if (0 !== this.mComponent.init(t)) return e && console.log('Base._init: Komponente nicht initialisiert'), 
                -1;
                this.mComponent.isErrorOutput() && (console.log(this.getType() + 'Version: ', this.getVersion()), 
                console.log(this.getType() + '-API Version: ', this.getVersion()));
            }
            return 0;
        } catch (t) {
            return e && console.log('Base._init: Exception ', t.message), -1;
        }
    }, h.prototype.reset = function(t) {
        return this.mComponent.reset(t);
    }, h.prototype.getType = function() {
        return this.mComponent.getType();
    }, h.prototype.getName = function() {
        return this.mComponent.getName();
    }, h.prototype.getVersion = function() {
        return this.mComponent.getVersion();
    }, h.prototype.getApiVersion = function() {
        return this.mComponent.getApiVersion();
    }, h.prototype.getServerVersion = function() {
        return '';
    }, h.prototype.isActive = function() {
        return this.mComponent.isActive();
    }, h.prototype.setActiveOn = function() {
        return this.mComponent.setActiveOn();
    }, h.prototype.setActiveOff = function() {
        return this.mComponent.setActiveOff();
    }, h.prototype.isErrorOutput = function() {
        return this.mComponent.isErrorOutput();
    }, h.prototype.setErrorOutputOn = function() {
        this.mComponent.setErrorOutputOn();
    }, h.prototype.setErrorOutputOff = function() {
        this.mComponent.setErrorOutputOff();
    }, h.prototype.addInitEvent = function(t, e) {
        return this.mComponent.addInitEvent(t, e);
    }, h.prototype.addStartEvent = function(t, e) {
        return this.mComponent.addStartEvent(t, e);
    }, h.prototype.addStopEvent = function(t, e) {
        return this.mComponent.addStopEvent(t, e);
    }, h.prototype.addErrorEvent = function(t, e) {
        return this.mComponent.addErrorEvent(t, e);
    }, h.prototype.removeInitEvent = function(t) {
        return this.mComponent.removeInitEvent(t);
    }, h.prototype.removeStartEvent = function(t) {
        return this.mComponent.removeStartEvent(t);
    }, h.prototype.removeStopEvent = function(t) {
        return this.mComponent.removeStopEvent(t);
    }, h.prototype.removeErrorEvent = function(t) {
        return this.mComponent.removeErrorEvent(t);
    }, h.prototype.removeAllEvent = function(t) {
        return this.mComponent.removeAllEvent(t);
    }, h.prototype.isRunning = function() {
        return this.mComponent.isRunning();
    }, h.prototype.start = function(t) {
        return this.mComponent.start(t);
    }, h.prototype.stop = function() {
        return this.mComponent.stop();
    }, h.prototype.test = function(t, e) {
        return this.mComponent.test(t, e);
    }, r = h;
    function h(t) {
        if (this.mComponent = null, 0 !== this._init(t)) throw new Error('Komponente nicht initialisiert');
    }
    t.BASE_API_VERSION = "1.1", t.BASE_COMPONENT_NAME = u, t.BASE_TYPE_NAME = p, t.BASE_VERSION_STRING = i, 
    t.Base = r, t.BaseComponent = e, t.BaseMobile = n, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
