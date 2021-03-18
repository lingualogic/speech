/**
 * Speech-Core Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechCore = {});
}(this, function(t) {
    'use strict';
    var e = 'Hanna', r = (n.prototype._setErrorClassName = function(t) {
        this.mErrorClassName = t;
    }, n.prototype._getErrorClassName = function() {
        return this.mErrorClassName;
    }, n.prototype.setErrorOutput = function(t) {
        this.mErrorOutputFlag = t;
    }, n.prototype.setErrorOutputDefault = function() {
        this.setErrorOutput(!1);
    }, n.prototype.setErrorOutputFunc = function(t) {
        this.mErrorOutputFunc = t;
    }, n.prototype.error = function(t, e) {
        if (this.mErrorOutputFlag && console.log('===> ERROR ', this.mErrorClassName + '.' + t + ':', e), 
        'function' == typeof this.mErrorOutputFunc) try {
            this.mErrorOutputFunc(this.mErrorClassName + '.' + t + ': ' + e);
        } catch (t) {
            console.log('ErrorBase.error: Exception ', t.message);
        }
    }, n.prototype.exception = function(t, e) {
        if (this.mErrorOutputFlag && console.log('===> EXCEPTION ', this.mErrorClassName + '.' + t + ':', e.message), 
        'function' == typeof this.mErrorOutputFunc) try {
            this.mErrorOutputFunc('EXCEPTION ' + this.mErrorClassName + '.' + t + ': ' + e.message);
        } catch (t) {
            console.log('ErrorBase.exception: Exception ', t.message);
        }
    }, n.prototype.isErrorOutput = function() {
        return this.mErrorOutputFlag;
    }, n.prototype.setErrorOutputFlag = function(t) {
        this.mErrorOutputFlag = t;
    }, n.prototype.setErrorOutputOn = function() {
        this.setErrorOutput(!0);
    }, n.prototype.setErrorOutputOff = function() {
        this.setErrorOutput(!1);
    }, n);
    function n(t) {
        this.mErrorClassName = 'ErrorBase', this.mErrorOutputFlag = !1, this.mErrorOutputFunc = null, 
        this.mErrorClassName = t;
    }
    var o = function(t, e) {
        return (o = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        })(t, e);
    };
    function i(t, e) {
        function r() {
            this.constructor = t;
        }
        o(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, 
        new r());
    }
    var u, s = (i(E, u = r), E.prototype.getSize = function() {
        return this.mBuilderList.size;
    }, E.prototype.insert = function(t, e) {
        try {
            return t ? e ? this.mBuilderList.has(t) ? (this.error('insert', 'Builder existiert bereits'), 
            -1) : (this.mBuilderList.set(t, e), 0) : (this.error('insert', 'kein Builder uebergeben'), 
            -1) : (this.error('insert', 'kein Buildername uebergeben'), -1);
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, E.prototype.find = function(t) {
        try {
            return this.mBuilderList.get(t);
        } catch (t) {
            return void this.exception('find', t);
        }
    }, E.prototype.first = function() {
        try {
            return this.mBuilderIterator = this.mBuilderList.values(), this.mBuilderIterator.next().value;
        } catch (t) {
            return void this.exception('first', t);
        }
    }, E.prototype.next = function() {
        try {
            return this.mBuilderIterator.next().value;
        } catch (t) {
            return void this.exception('next', t);
        }
    }, E.prototype.remove = function(t) {
        try {
            return this.mBuilderList.delete(t), 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, E.prototype.clear = function() {
        try {
            return this.mBuilderList.clear(), 0;
        } catch (t) {
            return this.exception('clear', t), -1;
        }
    }, E);
    function E() {
        var t = u.call(this, 'BuilderList') || this;
        return t.mBuilderList = new Map(), t.mBuilderIterator = t.mBuilderList.values(), 
        t;
    }
    var p = (a.setErrorOutputOn = function() {
        a.mBuilderList.setErrorOutputOn(), a.mErrorBase.setErrorOutputOn();
    }, a.setErrorOutputOff = function() {
        a.mBuilderList.setErrorOutputOff(), a.mErrorBase.setErrorOutputOff();
    }, a.setErrorOutputFunc = function(t) {
        a.mBuilderList.setErrorOutputFunc(t), a.mErrorBase.setErrorOutputFunc(t);
    }, a.getSize = function() {
        return a.mBuilderList.getSize();
    }, a.get = function(t, e) {
        if (!t) return a.mErrorBase.error('get', 'kein Buildername uebergeben'), null;
        var r = a.find(t);
        if (r) return r;
        if (!e) return a.mErrorBase.error('get', 'keine Builderklasse uebergeben'), null;
        try {
            r = new e(t);
        } catch (t) {
            return a.mErrorBase.exception('get', t), null;
        }
        return t !== r.getName() ? (a.mErrorBase.error('get', 'Buildernamen stimmen nicht ueberein ' + t + ' != ' + r.getName()), 
        a.remove(r.getName()), null) : r;
    }, a.find = function(t) {
        t = a.mBuilderList.find(t);
        return t || null;
    }, a.insert = function(t, e) {
        return a.mBuilderList.insert(t, e);
    }, a.remove = function(t) {
        return a.mBuilderList.remove(t);
    }, a.clear = function() {
        return a.mBuilderList.clear();
    }, a.mBuilderList = new s(), a.mErrorBase = new r('BuilderManager'), a);
    function a() {}
    var c, m = (i(l, c = r), l.prototype.getSize = function() {
        return this.mFactoryList.size;
    }, l.prototype.insert = function(t, e) {
        try {
            return t ? e ? this.mFactoryList.has(t) ? (this.error('insert', 'Factory existiert bereits'), 
            -1) : (this.mFactoryList.set(t, e), 0) : (this.error('insert', 'keine Factory uebergeben'), 
            -1) : (this.error('insert', 'kein Factoryname uebergeben'), -1);
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, l.prototype.find = function(t) {
        try {
            return this.mFactoryList.get(t);
        } catch (t) {
            return void this.exception('find', t);
        }
    }, l.prototype.first = function() {
        try {
            return this.mFactoryIterator = this.mFactoryList.values(), this.mFactoryIterator.next().value;
        } catch (t) {
            return void this.exception('first', t);
        }
    }, l.prototype.next = function() {
        try {
            return this.mFactoryIterator.next().value;
        } catch (t) {
            return void this.exception('next', t);
        }
    }, l.prototype.remove = function(t) {
        try {
            return this.mFactoryList.delete(t), 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, l.prototype.clear = function() {
        try {
            return this.mFactoryList.clear(), 0;
        } catch (t) {
            return this.exception('clear', t), -1;
        }
    }, l);
    function l() {
        var t = c.call(this, 'FactoryList') || this;
        return t.mFactoryList = new Map(), t.mFactoryIterator = null, t.mFactoryIterator = t.mFactoryList.values(), 
        t;
    }
    var f = (h.setErrorOutputOn = function() {
        h.mFactoryList.setErrorOutputOn(), h.mErrorBase.setErrorOutputOn();
    }, h.setErrorOutputOff = function() {
        h.mFactoryList.setErrorOutputOff(), h.mErrorBase.setErrorOutputOff();
    }, h.setErrorOutputFunc = function(t) {
        h.mFactoryList.setErrorOutputFunc(t), h.mErrorBase.setErrorOutputFunc(t);
    }, h.getSize = function() {
        return h.mFactoryList.getSize();
    }, h.get = function(t, e) {
        if (!t) return this.mErrorBase.error('get', 'kein FactoryName uebergeben'), null;
        var r = h.find(t);
        if (r) return r;
        if (!e) return this.mErrorBase.error('get', 'keine Factoryklasse uebergeben'), null;
        try {
            r = new e();
        } catch (t) {
            return this.mErrorBase.exception('get', t), null;
        }
        return t !== r.getName() ? (this.mErrorBase.error('get', 'FactoryName stimmen nicht ueberein ' + t + ' != ' + r.getName()), 
        h.remove(r.getName()), null) : r;
    }, h.find = function(t) {
        t = h.mFactoryList.find(t);
        return t || null;
    }, h.insert = function(t, e) {
        return h.mFactoryList.insert(t, e);
    }, h.remove = function(t) {
        return h.mFactoryList.remove(t);
    }, h.clear = function() {
        return h.mFactoryList.clear();
    }, h.mFactoryList = new m(), h.mErrorBase = new r('FactoryManager'), h);
    function h() {}
    var g, y = (i(P, g = r), P.prototype.getSize = function() {
        return this.mPluginList.size;
    }, P.prototype.getNameList = function() {
        return Array.from(this.mPluginList.keys());
    }, P.prototype.insert = function(t, e) {
        try {
            return t ? e ? this.mPluginList.has(t) ? (this.error('insert', 'Plugin existiert bereits ' + t), 
            -1) : (this.mPluginList.set(t, e), 0) : (this.error('insert', 'kein Plugin uebergeben'), 
            -1) : (this.error('insert', 'kein Pluginname uebergeben'), -1);
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, P.prototype.find = function(t) {
        try {
            return this.mPluginList.get(t);
        } catch (t) {
            return void this.exception('find', t);
        }
    }, P.prototype.first = function() {
        try {
            return this.mPluginIterator = this.mPluginList.values(), this.mPluginIterator.next().value;
        } catch (t) {
            return void this.exception('first', t);
        }
    }, P.prototype.next = function() {
        try {
            return this.mPluginIterator.next().value;
        } catch (t) {
            return void this.exception('next', t);
        }
    }, P.prototype.remove = function(t) {
        try {
            return this.mPluginList.delete(t), 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, P.prototype.clear = function() {
        try {
            return this.mPluginList.clear(), 0;
        } catch (t) {
            return this.exception('clear', t), -1;
        }
    }, P);
    function P() {
        var t = g.call(this, 'PluginList') || this;
        return t.mPluginList = new Map(), t.mPluginIterator = t.mPluginList.values(), t;
    }
    var v = (S.setErrorOutputOn = function() {
        S.mPluginList.setErrorOutputOn(), S.mErrorBase.setErrorOutputOn();
    }, S.setErrorOutputOff = function() {
        S.mPluginList.setErrorOutputOff(), S.mErrorBase.setErrorOutputOff();
    }, S.setErrorOutputFunc = function(t) {
        S.mPluginList.setErrorOutputFunc(t), S.mErrorBase.setErrorOutputFunc(t);
    }, S.getSize = function() {
        return S.mPluginList.getSize();
    }, S.getNameList = function() {
        return S.mPluginList.getNameList();
    }, S.get = function(t, e, r) {
        if (!t) return S.mErrorBase.error('get', 'kein PluginName uebergeben'), null;
        var n = S.find(t);
        return n || (r ? r.create(t, e) : (S.mErrorBase.error('get', 'keine PluginFactoryClass uebergeben'), 
        null));
    }, S.find = function(t) {
        t = S.mPluginList.find(t);
        return t || null;
    }, S.insert = function(t, e) {
        return S.mPluginList.insert(t, e);
    }, S.remove = function(t) {
        return S.mPluginList.remove(t);
    }, S.clear = function() {
        for (var t = S.mPluginList.first(); t; ) {
            try {
                t.done();
            } catch (t) {
                S.mErrorBase.exception('clear', t);
            }
            t = S.mPluginList.next();
        }
        return S.mPluginList.clear();
    }, S.mPluginList = new y(), S.mErrorBase = new r('PluginManager'), S);
    function S() {}
    var O, d = (i(_, O = r), _.prototype.getType = function() {
        return '';
    }, _.prototype.getClass = function() {
        return 'Builder';
    }, _.prototype.getName = function() {
        return this.mBuilderName;
    }, _.prototype.build = function(t) {
        return null;
    }, _.prototype._getComponentName = function(t) {
        return t && 'string' == typeof t.componentName ? t.componentName : '';
    }, _.prototype._getComponentClass = function(t) {
        return t && 'string' == typeof t.componentClass ? t.componentClass : '';
    }, _.prototype._getRegisterFlag = function(t) {
        return !(!t || !t.componentRegisterFlag) && t.componentRegisterFlag;
    }, _.prototype._getBuilder = function(t, e) {
        return p.get(t, e);
    }, _.prototype._getFactory = function(t, e) {
        return f.get(t, e);
    }, _.prototype._findComponent = function(t) {
        return t ? v.find(t) : null;
    }, _.prototype._getComponent = function(t, e, r) {
        if (e) {
            var n = this._getBuilder(e, r);
            if (n) return n.build(t);
        }
        n = this._getComponentName(t), t = this._getComponentClass(t);
        return v.get(n, t);
    }, _.prototype._getPlugin = function(t, e, r, n) {
        if (r && n) {
            n = this._getFactory(r, n);
            if (n) return v.get(t, e, n);
        }
        return v.get(t, e);
    }, _.prototype._findPlugin = function(t) {
        return v.find(t);
    }, _);
    function _(t, e) {
        void 0 === e && (e = !0);
        var r = O.call(this, 'Builder') || this;
        if (r.mBuilderName = 'Builder', r._setErrorClassName(r.getClass()), e && 0 !== p.insert(t || r.getName(), r)) throw new Error('Builder ' + r.getName() + ' existiert bereits im BuilderManager');
        return t && (r.mBuilderName = t), r;
    }
    var N, L = 'ComponentMessage', C = (i(T, N = r), T.prototype.getSize = function() {
        return this.mComponentList.size;
    }, T.prototype.getNameList = function() {
        return Array.from(this.mComponentList.keys());
    }, T.prototype.getNameTypeList = function(t) {
        for (var e = [], r = this.first(); r; ) r.getType() === t && e.push(r.getName()), 
        r = this.next();
        return e;
    }, T.prototype.getTypeList = function() {
        for (var t = [], e = this.first(); e; ) -1 === t.findIndex(function(t) {
            return t === e.getType();
        }) && t.push(e.getName()), e = this.next();
        return t;
    }, T.prototype.insert = function(t, e) {
        try {
            return t ? e ? this.mComponentList.has(t) ? (this.error('insert', 'Komponente existiert bereits ' + t), 
            -1) : (this.mComponentList.set(t, e), 0) : (this.error('insert', 'keine Komponente uebergeben ' + t), 
            -1) : (this.error('insert', 'kein Komponentenname uebergeben'), -1);
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, T.prototype.find = function(t) {
        try {
            return this.mComponentList.get(t);
        } catch (t) {
            return void this.exception('find', t);
        }
    }, T.prototype.first = function() {
        try {
            return this.mComponentIterator = this.mComponentList.values(), this.mComponentIterator.next().value;
        } catch (t) {
            return void this.exception('first', t);
        }
    }, T.prototype.next = function() {
        try {
            return this.mComponentIterator.next().value;
        } catch (t) {
            return void this.exception('next', t);
        }
    }, T.prototype.remove = function(t) {
        try {
            return this.mComponentList.delete(t), 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, T.prototype.clear = function() {
        try {
            return this.mComponentList.clear(), 0;
        } catch (t) {
            return this.exception('clear', t), -1;
        }
    }, T);
    function T() {
        var t = N.call(this, 'ComponentList') || this;
        return t.mComponentList = new Map(), t.mComponentIterator = t.mComponentList.values(), 
        t;
    }
    var F = (I.setErrorOutputOn = function() {
        I.mComponentList.setErrorOutputOn(), I.mErrorBase.setErrorOutputOn();
    }, I.setErrorOutputOff = function() {
        I.mComponentList.setErrorOutputOff(), I.mErrorBase.setErrorOutputOff();
    }, I.setErrorOutputFunc = function(t) {
        I.mComponentList.setErrorOutputFunc(t), I.mErrorBase.setErrorOutputFunc(t);
    }, I.getSize = function() {
        return I.mComponentList.getSize();
    }, I.getNameList = function() {
        return I.mComponentList.getNameList();
    }, I.getNameTypeList = function(t) {
        return I.mComponentList.getNameTypeList(t);
    }, I.getTypeList = function() {
        return I.mComponentList.getTypeList();
    }, I.find = function(t) {
        t = I.mComponentList.find(t);
        return t || null;
    }, I.insert = function(t, e) {
        return I.mComponentList.insert(t, e);
    }, I.remove = function(t) {
        return I.mComponentList.remove(t);
    }, I.clear = function() {
        for (var t = I.mComponentList.first(); t; ) {
            try {
                t.done();
            } catch (t) {
                I.mErrorBase.exception('clear', t);
            }
            t = I.mComponentList.next();
        }
        return I.mComponentList.clear();
    }, I.sendMessage = function(t) {
        if (t && t.type === L) if (t.dest) {
            var e = I.find(t.dest);
            if (e) return e.handleMessage(t), 0;
            I.mErrorBase.error('sendMessage', 'Komponente nicht gefunden ' + t.dest);
        } else I.mErrorBase.error('sendMessage', 'Komponentenname nicht uebergeben'); else I.mErrorBase.error('sendMessage', 'keine Komponenten-Nachricht');
        return -1;
    }, I.getSendMessageFunc = function() {
        return function(t) {
            return I.sendMessage(t);
        };
    }, I.mComponentList = new C(), I.mErrorBase = new r('ComponentManager'), I);
    function I() {}
    var A, R = '0.6.0', H = '0001', x = 'alpha', B = '18.01.2021', b = R + '.' + H + ' vom ' + B + ' (' + x + ')', V = b, M = 'init', k = 'error', w = (i(D, A = r), 
    D.prototype.setComponentName = function(t) {
        this.mComponentName = t;
    }, D.prototype.getComponentName = function() {
        return this.mComponentName;
    }, D.prototype.getName = function() {
        return this.mEventName;
    }, D.prototype.getSize = function() {
        return this.mFunctionList.size;
    }, D.prototype.addListener = function(t, e) {
        return t ? 'function' != typeof e ? (this.error('addListener', 'keine Eventfunktion uebergeben ' + t + ',' + this.getComponentName() + ',' + this.getName()), 
        -1) : this.mFunctionList.has(t) ? (this.error('addListener', 'Eventfunktion bereits vorhanden ' + t + ',' + this.getComponentName() + ',' + this.getName()), 
        -1) : (this.mFunctionList.set(t, e), 0) : (this.error('addListener', 'kein Listenername uebergeben ' + this.getComponentName() + ',' + this.getName()), 
        -1);
    }, D.prototype.removeListener = function(t) {
        return t ? (this.mFunctionList.delete(t), 0) : (this.error('removeListener', "kein Listenername uebergeben," + this.getComponentName() + ',' + this.getName()), 
        -1);
    }, D.prototype.dispatch = function(e) {
        var r = this, n = 0;
        return this.mFunctionList.forEach(function(t) {
            if (r.mAsyncFlag) setTimeout(function() {
                try {
                    t(e);
                } catch (t) {
                    console.log('EventFunction.dispatch: Exception', t);
                }
            }, 0); else try {
                0 !== t(e) && (n = -1);
            } catch (t) {
                r.exception('dispatch', t), n = -1;
            }
        }), n;
    }, D.prototype.dispatchListener = function(t, e) {
        if (!t) return this.error('dispatchListener', 'kein Listenername uebergeben ' + this.getComponentName() + ',' + this.getName()), 
        -1;
        var r = 0, n = this.mFunctionList.get(t);
        if (n) if (this.mAsyncFlag) setTimeout(function() {
            try {
                n(e);
            } catch (t) {
                console.log('EventFunction.dispatchListener: Exception', t);
            }
        }, 0); else try {
            r = n(e);
        } catch (t) {
            this.exception('dispatchListener', t), r = -1;
        }
        return r;
    }, D.prototype.clear = function() {
        this.mFunctionList.clear();
    }, D);
    function D(t, e, r) {
        void 0 === r && (r = !1);
        var n = A.call(this, 'EventFunctionList') || this;
        return n.mEventName = 'Event', n.mComponentName = 'Component', n.mAsyncFlag = !1, 
        n.mFunctionList = new Map(), n.mEventName = t, n.mComponentName = e, n.mAsyncFlag = r, 
        n;
    }
    var G, K = (i(U, G = r), U.prototype.isMock = function() {
        return !1;
    }, U.prototype.getType = function() {
        return 'Plugin';
    }, U.prototype.getClass = function() {
        return 'Plugin';
    }, U.prototype.getName = function() {
        return this.mPluginName;
    }, U.prototype.init = function(t) {
        return this.mActiveFlag = !0, t && ('boolean' == typeof t.activeFlag && (this.mActiveFlag = t.activeFlag), 
        'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag)), 
        this.mInitFlag = !0, 0;
    }, U.prototype.done = function() {
        return this.mInitFlag = !1, this.mActiveFlag = !1, this.mOnInitFunc = null, this.mOnErrorFunc = null, 
        G.prototype.setErrorOutputDefault.call(this), 0;
    }, U.prototype.reset = function(t) {
        return this.mActiveFlag = this.isInit(), 0;
    }, U.prototype.isInit = function() {
        return this.mInitFlag;
    }, U.prototype._clearInit = function() {
        this.mInitFlag = !1, this.mActiveFlag = !1;
    }, U.prototype.setFeatureList = function(t) {
        return 0;
    }, U.prototype.isActive = function() {
        return this.mActiveFlag;
    }, U.prototype.setActiveOn = function() {
        return this.mActiveFlag = !0, 0;
    }, U.prototype.setActiveOff = function() {
        return this.mActiveFlag = !1, 0;
    }, U.prototype._getErrorOutputFunc = function() {
        var e = this;
        return function(t) {
            return e._onError(new Error(t));
        };
    }, U.prototype._onInit = function() {
        if ('function' == typeof this.mOnInitFunc) try {
            return this.mOnInitFunc(this.getName());
        } catch (t) {
            return this.exception('Plugin._onInit', t), -1;
        }
        return 0;
    }, U.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION Plugin._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(U.prototype, "onInit", {
        get: function() {
            var t = this;
            return function() {
                return t._onInit();
            };
        },
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(U.prototype, "onError", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onError(t);
            };
        },
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), U.prototype.test = function(t, e) {
        return {
            result: 0
        };
    }, U);
    function U(t, e) {
        void 0 === e && (e = !0);
        var r = G.call(this, 'Plugin') || this;
        if (r.mPluginName = '', r.mOnInitFunc = null, r.mOnErrorFunc = null, r.mInitFlag = !1, 
        r.mActiveFlag = !1, r._setErrorClassName(r.getClass()), r.mPluginName = t, e && 0 !== v.insert(t, r)) throw new Error('Plugin ' + r.getName() + ' ist bereits im PluginManager vorhanden');
        return r.setErrorOutputFunc(r._getErrorOutputFunc()), r;
    }
    var z, W = (i(j, z = K), j.prototype.getType = function() {
        return 'PluginGroup';
    }, j.prototype.getClass = function() {
        return 'PluginGroup';
    }, j.prototype.init = function(t) {
        return 0 !== z.prototype.init.call(this, t) ? -1 : 0 !== this.startAllPlugin(t) ? (this._clearInit(), 
        -1) : 0;
    }, j.prototype.done = function() {
        return this.mCurrentPlugin = null, this.stopAllPlugin(), z.prototype.done.call(this);
    }, j.prototype.setFeatureList = function(t) {
        if ('object' != typeof t) return this.error('setFeatureList', 'keine gueltige Feature Liste'), 
        -1;
        if (function(t) {
            for (var e in t) if (t.hasOwnProperty(e)) return !1;
            return !0;
        }(t)) return 0;
        try {
            for (var e = z.prototype.setFeatureList.call(this, t), r = this.mPluginList.first(); r; ) 0 !== r.setFeatureList(t) && (e = -1), 
            r = this.mPluginList.next();
            return e;
        } catch (t) {
            return this.exception('setFeatureList', t), -1;
        }
    }, j.prototype.setErrorOutput = function(t) {
        z.prototype.setErrorOutput.call(this, t), this.mPluginList.setErrorOutput(t), this._setErrorOutputAllPlugin(t);
    }, j.prototype.insertPlugin = function(t, e) {
        return this.mPluginList.insert(t, e);
    }, j.prototype.removePlugin = function(t) {
        return this.mPluginList.remove(t);
    }, j.prototype.removeAllPlugin = function() {
        return this.mPluginList.clear();
    }, j.prototype.findPlugin = function(t, e) {
        t = this.mPluginList.find(t);
        return t || null;
    }, j.prototype.firstPlugin = function() {
        return this.mPluginList.first();
    }, j.prototype.nextPlugin = function() {
        return this.mPluginList.next();
    }, j.prototype.getPluginNameList = function() {
        return this.mPluginList.getNameList();
    }, j.prototype.isCurrentPlugin = function() {
        return !!this.mCurrentPlugin;
    }, j.prototype.setCurrentPlugin = function(t) {
        t = this.findPlugin(t);
        return t ? this.mCurrentPlugin = t : this.error('setCurrentPlugin', 'Kein Plugin vorhanden'), 
        0;
    }, j.prototype.getCurrentPlugin = function() {
        return this.mCurrentPlugin;
    }, j.prototype.getCurrentPluginName = function() {
        return this.mCurrentPlugin ? this.mCurrentPlugin.getName() : '';
    }, j.prototype.isPlugin = function(t) {
        return !!this.mPluginList.find(t);
    }, j.prototype.getPluginSize = function() {
        return this.mPluginList.getSize();
    }, j.prototype.startPlugin = function(t, e) {
        t = this.mPluginList.find(t);
        return t ? t.isInit() ? 0 : t.init(e) : (this.error('startPlugin', 'Plugin nicht vorhanden'), 
        -1);
    }, j.prototype.stopPlugin = function(t) {
        t = this.mPluginList.find(t);
        return t ? t.done() : (this.error('stopPlugin', 'Plugin nicht vorhanden'), -1);
    }, j.prototype.startAllPlugin = function(t) {
        try {
            for (var e = 0, r = this.mPluginList.first(); r; ) r.isInit() || 0 === r.init(t) || (e = -1), 
            r = this.mPluginList.next();
            return e;
        } catch (t) {
            return this.exception('startAllPlugin', t), -1;
        }
    }, j.prototype.stopAllPlugin = function() {
        try {
            for (var t = 0, e = this.mPluginList.first(); e; ) 0 !== e.done() && (t = -1), e = this.mPluginList.next();
            return t;
        } catch (t) {
            return this.exception('stopAllPlugin', t), -1;
        }
    }, j.prototype._setErrorOutputAllPlugin = function(t) {
        try {
            for (var e = this.mPluginList.first(); e; ) t ? e.setErrorOutputOn() : e.setErrorOutputOff(), 
            e = this.mPluginList.next();
            return 0;
        } catch (t) {
            return this.exception('_setErrorOutputAllPlugin', t), -1;
        }
    }, j);
    function j(t, e) {
        e = z.call(this, t, e = void 0 === e ? !0 : e) || this;
        return e.mPluginList = new y(), e.mCurrentPlugin = null, e.mPluginList.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e;
    }
    var X, Y = (i(J, X = W), J.prototype.getType = function() {
        return 'Component';
    }, J.prototype.getClass = function() {
        return 'Component';
    }, J.prototype.getVersion = function() {
        return V;
    }, J.prototype.init = function(t) {
        return 0 !== X.prototype.init.call(this, t) ? -1 : 0;
    }, J.prototype.done = function() {
        return this.mInitEvent.clear(), this.mErrorEvent.clear(), X.prototype.done.call(this);
    }, J.prototype.setErrorOutput = function(t) {
        X.prototype.setErrorOutput.call(this, t), this.mInitEvent.setErrorOutput(t), this.mErrorEvent.setErrorOutput(t);
    }, J.prototype.connect = function() {
        return 0;
    }, J.prototype.isConnect = function() {
        return !0;
    }, J.prototype.getNetType = function() {
        return 'undefined';
    }, J.prototype._addEventListenerAllPlugin = function(t, e, r) {
        try {
            for (var n = -1, o = this.mPluginList.first(); o; ) o instanceof J && o && 0 === o.addEventListener(t, e, r) && (n = 0), 
            o = this.mPluginList.next();
            return n;
        } catch (t) {
            return this.exception('addEventListenerAllPlugin', t), -1;
        }
    }, J.prototype._removeEventListenerAllPlugin = function(t, e) {
        try {
            for (var r = -1, n = this.mPluginList.first(); n; ) n instanceof J && n && 0 === n.removeEventListener(t, e) && (r = 0), 
            n = this.mPluginList.next();
            return r;
        } catch (t) {
            return this.exception('removeEventListenerAllPlugin', t), -1;
        }
    }, J.prototype.setSendMessageFunc = function(t) {
        return this.mSendMessageFunc = t, 0;
    }, J.prototype.sendMessage = function(t) {
        return 'function' != typeof this.mSendMessageFunc ? -1 : this.mSendMessageFunc(t);
    }, J.prototype.handleMessage = function(t) {
        try {
            var e = !0;
            switch (t.action) {
              case M:
                this.mInitEvent.dispatch(t);
                break;

              case k:
                this.mErrorEvent.dispatch(t);
                break;

              default:
                this.error('handleMessage', 'ungueltige Nachricht: ' + t.action), e = !-1;
            }
            return e;
        } catch (t) {
            return this.exception('handleMessage', t), !1;
        }
    }, J.prototype.getHandleMessageFunc = function() {
        var e = this;
        return function(t) {
            return e.handleMessage(t);
        };
    }, J.prototype._onInit = function() {
        return this.mInitEvent.dispatch(this.getName());
    }, Object.defineProperty(J.prototype, "onInit", {
        get: function() {
            var t = this;
            return function() {
                return t._onInit();
            };
        },
        enumerable: !1,
        configurable: !0
    }), J.prototype._onError = function(t) {
        return this.mErrorEvent.dispatch(t);
    }, Object.defineProperty(J.prototype, "onError", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onError(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), J.prototype.addEventListener = function(t, e, r) {
        var n = 0;
        switch (e) {
          case M:
            n = this.mInitEvent.addListener(t, r);
            break;

          case k:
            this._addEventListenerAllPlugin(t, e, r), n = this.mErrorEvent.addListener(t, r);
            break;

          default:
            n = this._addEventListenerAllPlugin(t, e, r);
        }
        return n;
    }, J.prototype.removeEventListener = function(t, e) {
        var r = 0;
        switch (e) {
          case M:
            r = this.mInitEvent.removeListener(t);
            break;

          case k:
            this._removeEventListenerAllPlugin(t, e), r = this.mErrorEvent.removeListener(t);
            break;

          default:
            r = this._removeEventListenerAllPlugin(t, e);
        }
        return r;
    }, J);
    function J(t, e) {
        var r = X.call(this, t, e = void 0 === e ? !0 : e) || this;
        return r.mSendMessageFunc = null, r.mInitEvent = new w(M), r.mErrorEvent = new w(k), 
        e && F.insert(t, r), r.mInitEvent.setComponentName(t), r.mErrorEvent.setComponentName(t), 
        r.mInitEvent.setErrorOutputFunc(r._getErrorOutputFunc()), r.mErrorEvent.setErrorOutputFunc(r._getErrorOutputFunc()), 
        r.setSendMessageFunc(F.getSendMessageFunc()), r;
    }
    var q, Q = (i(Z, q = r), Z.prototype.isMock = function() {
        return !1;
    }, Z.prototype.getType = function() {
        return 'any';
    }, Z.prototype.getName = function() {
        return 'Factory';
    }, Z.prototype.create = function(t, e, r) {
        return null;
    }, Z);
    function Z(t, e) {
        void 0 === e && (e = !0);
        t = q.call(this, t || 'Factory') || this;
        if (e && 0 !== f.insert(t.getName(), t)) throw new Error('Factory ' + t.getName() + ' existiert bereits im FactoryManager');
        return t;
    }
    var $, tt = (i(et, $ = Q), et.prototype.getType = function() {
        return 'Plugin';
    }, et.prototype.getName = function() {
        return 'PluginFactory';
    }, et.prototype._newPlugin = function(t, e, r) {
        return new K(t, r);
    }, et.prototype.create = function(t, e, r) {
        void 0 === r && (r = !0);
        t = (t = void 0 === t ? '' : t) || 'Plugin', e = (e = void 0 === e ? '' : e) || 'Plugin';
        try {
            return this._newPlugin(t, e, r);
        } catch (t) {
            return this.exception('PluginFactory.create', t), null;
        }
    }, et);
    function et(t) {
        return $.call(this, t || 'PluginFactory') || this;
    }
    var rt, nt = 'portInit', ot = 'portOpen', it = 'portClose', ut = 'portStart', st = 'portStop', Et = 'portResult', pt = 'portError', at = (i(ct, rt = r), 
    ct.prototype.getSize = function() {
        return this.mPortList.size;
    }, ct.prototype.getNameList = function() {
        return Array.from(this.mPortList.keys());
    }, ct.prototype.insert = function(t, e) {
        try {
            return t ? e ? this.mPortList.has(t) ? (this.error('insert', 'Port existiert bereits: ' + t), 
            -1) : (this.mPortList.set(t, e), 0) : (this.error('insert', 'kein Port uebergeben'), 
            -1) : (this.error('insert', 'kein Portname uebergeben'), -1);
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, ct.prototype.find = function(t) {
        try {
            return this.mPortList.get(t);
        } catch (t) {
            return void this.exception('find', t);
        }
    }, ct.prototype.first = function() {
        try {
            return this.mPortIterator = this.mPortList.values(), this.mPortIterator.next().value;
        } catch (t) {
            return void this.exception('first', t);
        }
    }, ct.prototype.next = function() {
        try {
            return this.mPortIterator.next().value;
        } catch (t) {
            return void this.exception('next', t);
        }
    }, ct.prototype.remove = function(t) {
        try {
            return this.mPortList.delete(t), 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, ct.prototype.clear = function() {
        try {
            return this.mPortList.clear(), 0;
        } catch (t) {
            return this.exception('clear', t), -1;
        }
    }, ct);
    function ct() {
        var t = rt.call(this, 'PortList') || this;
        return t.mPortList = new Map(), t.mPortIterator = t.mPortList.values(), t;
    }
    var mt = (lt.setErrorOutputOn = function() {
        lt.mPortList.setErrorOutputOn(), lt.mErrorBase.setErrorOutputOn();
    }, lt.setErrorOutputOff = function() {
        lt.mPortList.setErrorOutputOff(), lt.mErrorBase.setErrorOutputOff();
    }, lt.setErrorOutputFunc = function(t) {
        lt.mPortList.setErrorOutputFunc(t), lt.mErrorBase.setErrorOutputFunc(t);
    }, lt.getSize = function() {
        return lt.mPortList.getSize();
    }, lt.getNameList = function() {
        return lt.mPortList.getNameList();
    }, lt.get = function(t, e) {
        if (!t) return lt.mErrorBase.error('get', 'kein Portname uebergeben'), null;
        var r = lt.find(t);
        if (r) return r;
        if (!e) return lt.mErrorBase.error('get', 'keine Portklasse uebergeben'), null;
        try {
            r = new e(t);
        } catch (t) {
            return lt.mErrorBase.exception('get', t), null;
        }
        return t !== r.getName() ? (lt.mErrorBase.error('get', 'Portnamen stimmen nicht ueberein ' + t + ' != ' + r.getName()), 
        lt.remove(r.getName()), null) : r;
    }, lt.find = function(t) {
        t = lt.mPortList.find(t);
        return t || null;
    }, lt.first = function() {
        return lt.mPortList.first();
    }, lt.next = function() {
        return lt.mPortList.next();
    }, lt.insert = function(t, e) {
        return lt.mPortList.insert(t, e);
    }, lt.remove = function(t) {
        return lt.mPortList.remove(t);
    }, lt.clear = function() {
        for (var t = lt.mPortList.first(); t; ) {
            try {
                t.done();
            } catch (t) {
                lt.mErrorBase.exception('clear', t);
            }
            t = lt.mPortList.next();
        }
        return lt.mPortList.clear();
    }, lt.mPortList = new at(), lt.mErrorBase = new r('PortManager'), lt);
    function lt() {}
    var ft, ht = (i(gt, ft = r), gt.prototype.isMock = function() {
        return !1;
    }, gt.prototype.getType = function() {
        return 'Port';
    }, gt.prototype.getClass = function() {
        return 'Port';
    }, gt.prototype.getName = function() {
        return this.mPortName;
    }, gt.prototype.getVersion = function() {
        return V;
    }, gt.prototype.init = function(t) {
        return this.mInitFlag ? (this.error('init', 'Port ist bereits initialisiert'), -1) : (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.mInitFlag = !0, 0);
    }, gt.prototype.done = function() {
        return this.stop(this.mPluginName), this.close(), this.mPluginName = '', this.mInitFlag = !1, 
        this.mOpenFlag = !1, this.mRunFlag = !1, this.mInitEvent.clear(), this.mOpenEvent.clear(), 
        this.mCloseEvent.clear(), this.mStartEvent.clear(), this.mStopEvent.clear(), this.mResultEvent.clear(), 
        this.mErrorEvent.clear(), ft.prototype.setErrorOutputDefault.call(this), 0;
    }, gt.prototype.reset = function(t) {
        return 0;
    }, gt.prototype.isInit = function() {
        return this.mInitFlag;
    }, gt.prototype.isServer = function() {
        return !1;
    }, gt.prototype._clearInit = function() {
        this.mInitFlag = !1;
    }, gt.prototype._getErrorOutputFunc = function() {
        var e = this;
        return function(t) {
            return e._onError(new Error(t));
        };
    }, gt.prototype.setErrorOutput = function(t) {
        ft.prototype.setErrorOutput.call(this, t), this.mInitEvent.setErrorOutput(t), this.mOpenEvent.setErrorOutput(t), 
        this.mCloseEvent.setErrorOutput(t), this.mStartEvent.setErrorOutput(t), this.mStopEvent.setErrorOutput(t), 
        this.mResultEvent.setErrorOutput(t), this.mErrorEvent.setErrorOutput(t);
    }, gt.prototype._onInit = function(t) {
        t = {
            event: nt,
            type: '',
            source: this.getName(),
            dest: '',
            result: t,
            data: null
        };
        return this.mInitEvent.dispatch(t);
    }, gt.prototype._onOpen = function() {
        var t = {
            event: ot,
            type: '',
            source: this.getName(),
            dest: '',
            result: 0,
            data: null
        };
        return this.mOpenEvent.dispatch(t);
    }, gt.prototype._onClose = function() {
        var t = {
            event: it,
            type: '',
            source: this.getName(),
            dest: '',
            result: 0,
            data: null
        };
        return this.mCloseEvent.dispatch(t);
    }, gt.prototype._onStart = function(t, e) {
        void 0 === t && (t = '');
        e = {
            event: ut,
            type: e = void 0 === e ? '' : e,
            source: this.getName(),
            dest: t,
            result: 0,
            data: null
        };
        return t ? this.mStartEvent.dispatchListener(t, e) : this.mStartEvent.dispatch(e);
    }, gt.prototype._onStop = function(t, e) {
        void 0 === t && (t = '');
        e = {
            event: st,
            type: e = void 0 === e ? '' : e,
            source: this.getName(),
            dest: t,
            result: 0,
            data: null
        };
        return t ? this.mStopEvent.dispatchListener(t, e) : this.mStopEvent.dispatch(e);
    }, gt.prototype._onResult = function(t, e, r) {
        void 0 === e && (e = '');
        t = {
            event: Et,
            type: r = void 0 === r ? '' : r,
            source: this.getName(),
            dest: e,
            result: 0,
            data: t
        };
        return e ? this.mResultEvent.dispatchListener(e, t) : this.mResultEvent.dispatch(t);
    }, gt.prototype._onError = function(t, e, r) {
        return (e = void 0 === e ? '' : e) ? this.mErrorEvent.dispatchListener(e, t) : this.mErrorEvent.dispatch(t);
    }, gt.prototype.addInitEvent = function(t, e) {
        return this.mInitEvent.addListener(t, e);
    }, gt.prototype.addOpenEvent = function(t, e) {
        return this.mOpenEvent.addListener(t, e);
    }, gt.prototype.addCloseEvent = function(t, e) {
        return this.mCloseEvent.addListener(t, e);
    }, gt.prototype.addStartEvent = function(t, e) {
        return this.mStartEvent.addListener(t, e);
    }, gt.prototype.addStopEvent = function(t, e) {
        return this.mStopEvent.addListener(t, e);
    }, gt.prototype.addResultEvent = function(t, e) {
        return this.mResultEvent.addListener(t, e);
    }, gt.prototype.addErrorEvent = function(t, e) {
        return this.mErrorEvent.addListener(t, e);
    }, gt.prototype.removeInitEvent = function(t) {
        return this.mInitEvent.removeListener(t);
    }, gt.prototype.removeOpenEvent = function(t) {
        return this.mOpenEvent.removeListener(t);
    }, gt.prototype.removeCloseEvent = function(t) {
        return this.mCloseEvent.removeListener(t);
    }, gt.prototype.removeStartEvent = function(t) {
        return this.mStartEvent.removeListener(t);
    }, gt.prototype.removeStopEvent = function(t) {
        return this.mStopEvent.removeListener(t);
    }, gt.prototype.removeResultEvent = function(t) {
        return this.mResultEvent.removeListener(t);
    }, gt.prototype.removeErrorEvent = function(t) {
        return this.mErrorEvent.removeListener(t);
    }, gt.prototype.removeAllEvent = function(t) {
        return this.removeInitEvent(t), this.removeOpenEvent(t), this.removeCloseEvent(t), 
        this.removeStartEvent(t), this.removeStopEvent(t), this.removeResultEvent(t), this.removeErrorEvent(t), 
        0;
    }, gt.prototype.setConfig = function(t) {
        return 0;
    }, gt.prototype.getConfig = function() {
        return {};
    }, gt.prototype.isOpen = function() {
        return this.mOpenFlag;
    }, gt.prototype.open = function(t) {
        return 0;
    }, gt.prototype.close = function() {
        return 0;
    }, gt.prototype.getPluginName = function() {
        return this.mPluginName;
    }, gt.prototype.getActionName = function() {
        return '';
    }, gt.prototype.isRunning = function(t, e) {
        return this.mRunFlag;
    }, gt.prototype.isAction = function(t) {
        return !1;
    }, gt.prototype.setActionTimeout = function(t) {}, gt.prototype.start = function(t, e, r) {
        return 0;
    }, gt.prototype.stop = function(t, e, r) {
        return 0;
    }, gt.prototype.test = function(t, e, r) {
        return {
            result: 0
        };
    }, gt);
    function gt(t, e) {
        void 0 === e && (e = !0);
        var r = ft.call(this, 'Port') || this;
        if (r.mPortName = '', r.mPluginName = '', r.mInitEvent = new w(nt), r.mOpenEvent = new w(ot), 
        r.mCloseEvent = new w(it), r.mStartEvent = new w(ut), r.mStopEvent = new w(st), 
        r.mResultEvent = new w(Et), r.mErrorEvent = new w(pt), r.mInitFlag = !1, r.mOpenFlag = !1, 
        r.mRunFlag = !1, r._setErrorClassName(r.getClass()), r.mPortName = t, e && 0 !== mt.insert(t, r)) throw new Error('Port ' + r.getName() + ' ist bereits im PortManager vorhanden');
        return r.setErrorOutputFunc(r._getErrorOutputFunc()), r.mInitEvent.setComponentName(t), 
        r.mOpenEvent.setComponentName(t), r.mCloseEvent.setComponentName(t), r.mStartEvent.setComponentName(t), 
        r.mStopEvent.setComponentName(t), r.mResultEvent.setComponentName(t), r.mErrorEvent.setComponentName(t), 
        r.mInitEvent.setErrorOutputFunc(r._getErrorOutputFunc()), r.mOpenEvent.setErrorOutputFunc(r._getErrorOutputFunc()), 
        r.mCloseEvent.setErrorOutputFunc(r._getErrorOutputFunc()), r.mStartEvent.setErrorOutputFunc(r._getErrorOutputFunc()), 
        r.mStopEvent.setErrorOutputFunc(r._getErrorOutputFunc()), r.mResultEvent.setErrorOutputFunc(r._getErrorOutputFunc()), 
        r.mErrorEvent.setErrorOutputFunc(r._getErrorOutputFunc()), r;
    }
    var yt, s = (i(Pt, yt = Q), Pt.prototype.getType = function() {
        return 'Port';
    }, Pt.prototype.getName = function() {
        return 'PortFactory';
    }, Pt.prototype._newPort = function(t, e, r) {
        return new ht(t, r);
    }, Pt.prototype.create = function(t, e, r) {
        void 0 === r && (r = !0);
        t = (t = void 0 === t ? '' : t) || 'Port', e = (e = void 0 === e ? '' : e) || 'Port';
        try {
            return this._newPort(t, e, r);
        } catch (t) {
            return this.exception('PortFactory.create', t), null;
        }
    }, Pt);
    function Pt(t) {
        return yt.call(this, t || 'PortFactory') || this;
    }
    vt.mTransactionCounter = 0, m = vt;
    function vt(t, e) {
        void 0 === t && (t = ''), void 0 === e && (e = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = t, this.type = e, 
        vt.mTransactionCounter += 1, this.transactionId = vt.mTransactionCounter;
    }
    St.setErrorOutputOn = function() {
        p.setErrorOutputOn(), F.setErrorOutputOn(), f.setErrorOutputOn(), v.setErrorOutputOn();
    }, St.setErrorOutputOff = function() {
        p.setErrorOutputOff(), F.setErrorOutputOff(), f.setErrorOutputOff(), v.setErrorOutputOff();
    }, St.setErrorOutputFunc = function(t) {
        p.setErrorOutputFunc(t), F.setErrorOutputFunc(t), f.setErrorOutputFunc(t), v.setErrorOutputFunc(t);
    }, St.insertBuilder = function(t, e) {
        return p.insert(t, e);
    }, St.getBuilder = function(t, e) {
        return p.get(t, e);
    }, St.findBuilder = function(t) {
        return p.find(t);
    }, St.clear = function() {
        p.clear(), F.clear(), f.clear(), v.clear();
    }, C = St;
    function St() {}
    t.Builder = d, t.BuilderManager = p, t.Component = Y, t.ComponentManager = F, t.ErrorBase = r, 
    t.EventFunctionList = w, t.Factory = Q, t.FactoryManager = f, t.MESSAGE_COMPONENT_TYPE = L, 
    t.PORT_CLOSE_EVENT = it, t.PORT_ERROR_EVENT = pt, t.PORT_INIT_EVENT = nt, t.PORT_OPEN_EVENT = ot, 
    t.PORT_RESULT_EVENT = Et, t.PORT_START_EVENT = ut, t.PORT_STOP_EVENT = st, t.Plugin = K, 
    t.PluginFactory = tt, t.PluginGroup = W, t.PluginList = y, t.PluginManager = v, 
    t.Port = ht, t.PortFactory = s, t.PortList = at, t.PortManager = mt, t.PortTransaction = m, 
    t.SPEECH_ACTIONSTART_EVENT = 'actionStart', t.SPEECH_ACTIONSTOP_EVENT = 'actionStop', 
    t.SPEECH_ACTION_EVENT = 'action', t.SPEECH_AGENTRESULT_EVENT = 'agentResult', t.SPEECH_AGENTSTART_EVENT = 'agentStart', 
    t.SPEECH_AGENTSTOP_EVENT = 'agentStop', t.SPEECH_APIMOCK_NAME = 'SpeechApiMock', 
    t.SPEECH_API_NAME = 'SpeechApi', t.SPEECH_API_VERSION = V, t.SPEECH_AUDIO_FLAG = !0, 
    t.SPEECH_AUDIO_PATH = '', t.SPEECH_CORDOVA_TYPE = 'cordova', t.SPEECH_DEFAULT_EXT = "mp3", 
    t.SPEECH_DIALOGACTIONSTOP_EVENT = 'dialogActionStop', t.SPEECH_DIALOGACTION_EVENT = 'dialogAction', 
    t.SPEECH_DIALOGJSON_EVENT = 'dialogJson', t.SPEECH_DIALOGPARSE_EVENT = 'dialogParse', 
    t.SPEECH_DIALOGSET_EVENT = 'dialogSet', t.SPEECH_DIALOGSPEAKSTART_EVENT = 'dialogSpeakStart', 
    t.SPEECH_DIALOGSPEAKSTOP_EVENT = 'dialogSpeakStop', t.SPEECH_DIALOGSPEAK_EVENT = 'dialogSpeak', 
    t.SPEECH_DIALOGSTART_EVENT = 'dialogStart', t.SPEECH_DIALOGSTATESET_EVENT = 'dialogStateSet', 
    t.SPEECH_DIALOGSTOP_EVENT = 'dialogStop', t.SPEECH_ERROR_EVENT = k, t.SPEECH_ERROR_OUTPUT = !1, 
    t.SPEECH_EVENT_EVENT = 'event', t.SPEECH_FEATUREINFO_EVENT = 'featureInfo', t.SPEECH_FEATUREINFO_MESSAGE = 'featureInfo', 
    t.SPEECH_FILE_NAME = 'speech.def', t.SPEECH_INFERENCEACTIONSTOP_EVENT = 'inferenceActionStop', 
    t.SPEECH_INFERENCEACTION_EVENT = 'inferenceAction', t.SPEECH_INFERENCEPARSE_EVENT = 'inferenceParse', 
    t.SPEECH_INFERENCESET_EVENT = 'inferenceSet', t.SPEECH_INFERENCESPEAKSTART_EVENT = 'inferenceSpeakStart', 
    t.SPEECH_INFERENCESPEAKSTOP_EVENT = 'inferenceSpeakStop', t.SPEECH_INFERENCESPEAK_EVENT = 'inferenceSpeak', 
    t.SPEECH_INFERENCESTART_EVENT = 'inferenceStart', t.SPEECH_INFERENCESTATESET_EVENT = 'inferenceStateSet', 
    t.SPEECH_INFERENCESTOP_EVENT = 'inferenceStop', t.SPEECH_INIT_EVENT = M, t.SPEECH_INTENTRESULT_EVENT = 'intentResult', 
    t.SPEECH_INTENTSTART_EVENT = 'intentStart', t.SPEECH_INTENTSTOP_EVENT = 'intentStop', 
    t.SPEECH_LISTENAUDIOSTART_EVENT = 'listenAudioStart', t.SPEECH_LISTENAUDIOSTOP_EVENT = 'listenAudioStop', 
    t.SPEECH_LISTENINTENT_EVENT = 'listenIntent', t.SPEECH_LISTENINTERIMRESULT_EVENT = 'listenInterimResult', 
    t.SPEECH_LISTENNOMATCH_EVENT = 'listenNoMatch', t.SPEECH_LISTENRECOGNITIONSTART_EVENT = 'listenRecognitionStart', 
    t.SPEECH_LISTENRECOGNITIONSTOP_EVENT = 'listenRecognitionStop', t.SPEECH_LISTENRESULT_EVENT = 'listenResult', 
    t.SPEECH_LISTENSOUNDSTART_EVENT = 'listenSoundStart', t.SPEECH_LISTENSOUNDSTOP_EVENT = 'listenSoundStop', 
    t.SPEECH_LISTENSPEECHSTART_EVENT = 'listenSpeechStart', t.SPEECH_LISTENSPEECHSTOP_EVENT = 'listenSpeechStop', 
    t.SPEECH_LISTENSTART_EVENT = 'listenStart', t.SPEECH_LISTENSTOP_EVENT = 'listenStop', 
    t.SPEECH_LOADDIALOGFILE_MESSAGE = 'loadDialogFile', t.SPEECH_MP3_EXT = "mp3", t.SPEECH_PATH_NAME = 'speech/', 
    t.SPEECH_PROMPTRESULT_EVENT = 'promptResult', t.SPEECH_PROMPTSTART_EVENT = 'promptStart', 
    t.SPEECH_PROMPTSTOP_EVENT = 'promptStop', t.SPEECH_RESET_MESSAGE = 'reset', t.SPEECH_SERVER_VERSION = "0.6.0.0001 vom 18.01.2021 (alpha)", 
    t.SPEECH_SETDIALOG_MESSAGE = 'setDialog', t.SPEECH_SETSTATECONTEXT_MESSAGE = 'setStateContext', 
    t.SPEECH_SETSTATE_MESSAGE = 'setState', t.SPEECH_SETTING_MESSAGE = 'setting', t.SPEECH_SKIPNEXTSPEAK_MESSAGE = 'skipNextSpeak', 
    t.SPEECH_SPEAKAUDIOUNLOCK_EVENT = 'speakAudioUnlock', t.SPEECH_SPEAKSTART_EVENT = 'speakStart', 
    t.SPEECH_SPEAKSTOP_EVENT = 'speakStop', t.SPEECH_SPEAK_EVENT = 'speak', t.SPEECH_STARTDIALOG_MESSAGE = 'startDialog', 
    t.SPEECH_START_EVENT = 'start', t.SPEECH_STOPDIALOG_MESSAGE = 'stopDialog', t.SPEECH_STOP_EVENT = 'stop', 
    t.SPEECH_VERSION_BUILD = H, t.SPEECH_VERSION_DATE = B, t.SPEECH_VERSION_NUMBER = R, 
    t.SPEECH_VERSION_STRING = b, t.SPEECH_VERSION_TYPE = x, t.SPEECH_WAKEWORDDETECT_EVENT = 'wakewordDetect', 
    t.SPEECH_WAKEWORDSTART_EVENT = 'wakewordStart', t.SPEECH_WAKEWORDSTOP_EVENT = 'wakewordStop', 
    t.SPEECH_WAV_EXT = 'wav', t.SPEECH_WEBSOCKET_TYPE = 'WebSocket', t.SPEECH_WEBWORKER_FILE = 'speechworker.js', 
    t.SPEECH_WEBWORKER_PATH = '', t.SPEECH_WEBWORKER_TYPE = 'WebWorker', t.SPEECH_WEB_TYPE = 'web', 
    t.SPEECH_WORKER_VERSION = "0.6.0.0001 vom 18.01.2021 (alpha)", t.SPEECH_WRITEDIALOGDATA_MESSAGE = 'writeData', 
    t.SystemManager = C, t.VOICE_ANNA_NAME = 'ANNA', t.VOICE_DEFAULT_NAME = "Hanna", 
    t.VOICE_HANNA_NAME = e, t.VOICE_MARKUS_NAME = 'MARKUS', t.VOICE_PETRA_NAME = 'PETRA', 
    t.VOICE_YANNICK_NAME = 'YANNICK', Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
