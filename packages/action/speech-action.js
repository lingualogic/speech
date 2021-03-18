/**
 * Speech-Action Bundle
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

!function(t, n) {
    'object' == typeof exports && 'undefined' != typeof module ? n(exports, require('@speech/core'), require('@speech/base'), require('@speech/service')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/base', '@speech/service' ], n) : n((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechAction = {}, t.speechCore, t.speechBase, t.speechService);
}(this, function(t, e, n, o) {
    'use strict';
    var i = e.SPEECH_VERSION_NUMBER, r = e.SPEECH_VERSION_BUILD, c = e.SPEECH_VERSION_TYPE, u = i + '.' + r + ' vom ' + e.SPEECH_VERSION_DATE + ' (' + c + ')', s = '1.2', p = 'Action', m = 'ActionComponentFactory', a = 'ActionComponent', h = 'ActionService', A = function(t, n) {
        return (A = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, n) {
            t.__proto__ = n;
        } || function(t, n) {
            for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
        })(t, n);
    };
    function l(t, n) {
        function e() {
            this.constructor = t;
        }
        A(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, 
        new e());
    }
    var f, y = 'ActionFunctionFactory', g = 'ActionFunction', E = (l(d, f = e.ErrorBase), 
    d.prototype.clear = function() {
        this.mActionStartFuncList.clear(), this.mActionStopFuncList.clear(), this.mStopActionFunc = function() {
            return 0;
        };
    }, d.prototype.insert = function(t, n, e) {
        if (!t) return this.error('insert', 'kein Action-Funktionsname uebergeben'), -1;
        if (this.mActionStartFuncList.get(t)) return this.error('insert', 'Actionsfunktion bereits eingetragen'), 
        -1;
        if ('function' != typeof n) return this.error('insert', 'keine StartAction-Funktion uebergeben'), 
        -1;
        try {
            return this.mActionStartFuncList.set(t, n), 'function' == typeof e ? this.mActionStopFuncList.set(t, e) : this.mActionStopFuncList.set(t, function() {
                return 0;
            }), 0;
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, d.prototype.remove = function(t) {
        if (!t) return this.error('remove', 'kein Action-Funktionsname uebergeben'), -1;
        try {
            return this.mActionStartFuncList.delete(t), this.mActionStopFuncList.delete(t), 
            0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, d.prototype.startAction = function(t) {
        if (!t.action) return this.error('startAction', 'kein Action Name'), -1;
        this.mStopActionFunc = function() {
            return 0;
        };
        try {
            var n = this.mActionStartFuncList.get(t.action);
            return 'function' != typeof n ? 0 : (this.mStopActionFunc = this.mActionStopFuncList.get(t.action), 
            n(t), 0);
        } catch (t) {
            return this.exception('startAction', t), -1;
        }
    }, d.prototype.stopAction = function() {
        var t = this.mStopActionFunc;
        this.mStopActionFunc = function() {
            return 0;
        };
        try {
            return 'function' != typeof t ? 0 : (t(), 0);
        } catch (t) {
            return this.exception('stopAction:', t), -1;
        }
    }, d);
    function d() {
        var t = f.call(this, 'ActionFunctionList') || this;
        return t.mActionStartFuncList = new Map(), t.mActionStopFuncList = new Map(), t.mStopActionFunc = function() {
            return 0;
        }, t;
    }
    var v, F = (l(N, v = e.Plugin), N.prototype.init = function(t) {
        return v.prototype.init.call(this, t);
    }, N.prototype.done = function() {
        return this.mActionFunctionList.clear(), v.prototype.done.call(this);
    }, N.prototype.setErrorOutput = function(t) {
        v.prototype.setErrorOutput.call(this, t), this.mActionFunctionList.setErrorOutput(t);
    }, N.prototype.getStartActionFunc = function() {
        var n = this;
        return function(t) {
            return n.startAction(t);
        };
    }, N.prototype.getStopActionFunc = function() {
        var t = this;
        return function() {
            return t.stopAction();
        };
    }, N.prototype.startAction = function(t) {
        return this.mActionFunctionList.startAction(t);
    }, N.prototype.stopAction = function() {
        return this.mActionFunctionList.stopAction();
    }, N.prototype.insert = function(t, n, e) {
        return this.mActionFunctionList.insert(t, n, e);
    }, N.prototype.remove = function(t) {
        return this.mActionFunctionList.remove(t);
    }, N.prototype.clear = function() {
        return this.mActionFunctionList.clear(), 0;
    }, N);
    function N(t, n) {
        n = v.call(this, (t = void 0 === t ? '' : t) || g, n = void 0 === n ? !0 : n) || this;
        return n.mActionFunctionList = new E(), n._setErrorClassName('ActionFunction'), 
        n.mActionFunctionList.setErrorOutputFunc(n._getErrorOutputFunc()), n;
    }
    var _, S = (l(C, _ = e.PluginFactory), C.prototype.getName = function() {
        return y;
    }, C.prototype._newPlugin = function(t, n, e) {
        return new F(t, e);
    }, C.prototype.create = function(t, n, e) {
        void 0 === e && (e = !0);
        t = t || g, n = (n = void 0 === n ? '' : n) || g;
        try {
            return this._newPlugin(t, n, e);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, C);
    function C() {
        return _.call(this, 'ActionFunctionFactory') || this;
    }
    var T, b = 'ActionElementFactory', L = 'ActionElement', O = (l(P, T = e.ErrorBase), 
    P.prototype.clear = function() {
        this.mActionFuncList.clear(), this.mActionStopFuncList.clear();
    }, P.prototype.insert = function(t, n, e) {
        if (!t) return this.error('insert', 'kein Elementname uebergeben'), -1;
        if (this.mActionFuncList.get(t)) return this.error('insert', 'Element bereits eingetragen'), 
        -1;
        if ('function' != typeof n) return this.error('insert', 'keine ActionStart-Funktion uebergeben'), 
        -1;
        if ('function' != typeof e) return this.error('insert', 'keine ActionStop-Funktion uebergeben'), 
        -1;
        try {
            var o = [ n, e ];
            return this.mActionFuncList.set(t, o), 0;
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, P.prototype.remove = function(t) {
        if (!t) return this.error('remove', 'kein Action-Elementname uebergeben'), -1;
        try {
            return this.mActionFuncList.delete(t), 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, P.prototype.getStartAction = function(t) {
        try {
            var n = this.mActionFuncList.get(t);
            if (n) return n[0];
        } catch (t) {
            this.exception('getStartAction', t);
        }
        return this.error('getStartAction', 'keine Funktion vorhanden'), function(t) {
            return 0;
        };
    }, P.prototype.getStopAction = function(t) {
        try {
            var n = this.mActionFuncList.get(t);
            if (n) return n[1];
        } catch (t) {
            this.exception('getStopAction', t);
        }
        return this.error('getStopAction', 'keine Funktion vorhanden'), function() {
            return 0;
        };
    }, P.prototype.getActionTuple = function(t) {
        try {
            return this.mActionFuncList.get(t);
        } catch (t) {
            return this.exception('getActionTupel', t), null;
        }
    }, P.prototype.startAction = function(t) {
        try {
            var n = t.id || '';
            if (!n) return this.error('startAction', 'kein Elementname vorhanden'), -1;
            var e = this.getActionTuple(n);
            if (!e) return 0;
            var o = e[0];
            if ('function' != typeof o) return this.error('startAction', 'keine StartAction-Funktion vorhanden'), 
            -1;
            var i = e[1];
            return 'function' != typeof i ? (this.error('startAction', 'keine StopAction-Funktion vorhanden'), 
            -1) : (this.mActionStopFuncList.set(n, i), o(t), 0);
        } catch (t) {
            return this.exception('startAction', t), -1;
        }
    }, P.prototype.stopAction = function() {
        try {
            return this.mActionStopFuncList.forEach(function(t) {
                'function' == typeof t && t();
            }), this.mActionStopFuncList.clear(), 0;
        } catch (t) {
            return this.exception('stopAction', t), -1;
        }
    }, P);
    function P() {
        var t = T.call(this, 'ActionElementList') || this;
        return t.mActionFuncList = new Map(), t.mActionStopFuncList = new Map(), t;
    }
    var k, I = (l(w, k = e.Plugin), w.prototype.init = function(t) {
        return k.prototype.init.call(this, t);
    }, w.prototype.done = function() {
        return this.mActionElementList.clear(), k.prototype.done.call(this);
    }, w.prototype.setErrorOutput = function(t) {
        k.prototype.setErrorOutput.call(this, t), this.mActionElementList.setErrorOutput(t);
    }, w.prototype.getStartActionFunc = function() {
        var n = this;
        return function(t) {
            return n.startAction(t);
        };
    }, w.prototype.getStopActionFunc = function() {
        var t = this;
        return function() {
            return t.stopAction();
        };
    }, w.prototype.startAction = function(t) {
        return this.mActionElementList.startAction(t);
    }, w.prototype.stopAction = function() {
        return this.mActionElementList.stopAction();
    }, w.prototype.insert = function(t, n, e) {
        return this.mActionElementList.insert(t, n, e);
    }, w.prototype.remove = function(t) {
        return this.mActionElementList.remove(t);
    }, w.prototype.clear = function() {
        return this.mActionElementList.clear(), 0;
    }, w);
    function w(t, n) {
        n = k.call(this, (t = void 0 === t ? '' : t) || L, n = void 0 === n ? !0 : n) || this;
        return n.mActionElementList = new O(), n._setErrorClassName('ActionElement'), n.mActionElementList.setErrorOutputFunc(n._getErrorOutputFunc()), 
        n;
    }
    var M, x = (l(R, M = e.PluginFactory), R.prototype.getName = function() {
        return b;
    }, R.prototype._newPlugin = function(t, n, e) {
        return new I(t, e);
    }, R.prototype.create = function(t, n, e) {
        void 0 === e && (e = !0);
        t = t || L, n = (n = void 0 === n ? '' : n) || L;
        try {
            return this._newPlugin(t, n, e);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, R);
    function R() {
        return M.call(this, 'ActionElementFactory') || this;
    }
    var B, K = (l(V, B = n.BaseComponent), V.prototype.getType = function() {
        return p;
    }, V.prototype.getClass = function() {
        return 'ActionComponent';
    }, V.prototype.getVersion = function() {
        return u;
    }, V.prototype.getApiVersion = function() {
        return s;
    }, V.prototype.getServerVersion = function() {
        return '';
    }, V.prototype._initAllPlugin = function() {
        return this.mActionFunction = this.findPlugin(g), this.mActionElement = this.findPlugin(L), 
        0;
    }, V.prototype.init = function(t) {
        return B.prototype.init.call(this, t);
    }, V.prototype._doneAllPlugin = function() {
        this.mActionFunction = null, this.mActionElement = null;
    }, V.prototype._doneAllAttribute = function() {
        this.mActionName = '', this.mActionElementType = '', this.mActionElementName = '', 
        this.mActionTimeout = 1e4;
    }, V.prototype._resetAllDefault = function() {
        this.mActionName = '', this.mActionElementType = '', this.mActionElementName = '', 
        this.mActionTimeout = 1e4;
    }, V.prototype.reset = function(t) {
        return B.prototype.reset.call(this, t);
    }, V.prototype.getActionFunc = function() {
        var n = this;
        return function(t) {
            return n.startAction(t);
        };
    }, V.prototype.setActionName = function(t) {
        return this.mActionName = t, 0;
    }, V.prototype.getActionName = function() {
        return this.mActionName;
    }, V.prototype.setElementType = function(t) {
        return this.mActionElementType = t, 0;
    }, V.prototype.getElementType = function() {
        return this.mActionElementType;
    }, V.prototype.setElementName = function(t) {
        return this.mActionElementName = t, 0;
    }, V.prototype.getElementName = function() {
        return this.mActionElementName;
    }, V.prototype.isRunning = function() {
        return !!this.isActive() && this.mActionRunningFlag;
    }, V.prototype.startAction = function(t) {
        var n = this;
        if (!this.isActive()) return 0;
        if (this.isRunning()) return this.error('startAction', 'Aktion laeuft bereits'), 
        -1;
        this.mActionRunningFlag = !0;
        var e = 0;
        return this.mActionFunction && 0 !== this.mActionFunction.startAction(t) && (e = -1), 
        this.mActionElement && 0 !== this.mActionElement.startAction(t) && (e = -1), this.mActionTimeoutId = window.setTimeout(function() {
            return n.stop();
        }, this.mActionTimeout), this._onStart(), e;
    }, V.prototype.start = function() {
        if (!this.mActionName) return this.error('startAction', 'kein Aktionsname vorhanden'), 
        -1;
        if (!this.mActionElementName) return this.error('startAction', 'kein Elementname vorhanden'), 
        -1;
        var t = {
            action: this.mActionName,
            type: this.mActionElementType,
            id: this.mActionElementName
        };
        return this.startAction(t);
    }, V.prototype.stop = function() {
        if (!this.isActive()) return 0;
        if (this.mActionTimeoutId && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0), 
        !this.isRunning()) return 0;
        var t = 0;
        return this.mActionFunction && 0 !== this.mActionFunction.stopAction() && (t = -1), 
        this.mActionElement && 0 !== this.mActionElement.stopAction() && (t = -1), this.mActionRunningFlag = !1, 
        this._onStop(), t;
    }, V.prototype.addFunction = function(t, n, e) {
        return this.mActionFunction ? this.mActionFunction.insert(t, n, e) : (this.error('addFunction', 'kein ActionFunction-Plugin vorhanden'), 
        -1);
    }, V.prototype.removeFunction = function(t) {
        return this.mActionFunction ? this.mActionFunction.remove(t) : (this.error('removeFunction', 'kein ActionFunction-Plugin vorhanden'), 
        -1);
    }, V.prototype.addElement = function(t, n, e) {
        return this.mActionElement ? this.mActionElement.insert(t, n, e) : (this.error('addElement', 'kein ActionElement-Plugin vorhanden'), 
        -1);
    }, V.prototype.removeElement = function(t) {
        return this.mActionElement ? this.mActionElement.remove(t) : (this.error('removeElement', 'kein ActionElement-Plugin vorhanden'), 
        -1);
    }, V);
    function V(t, n) {
        n = B.call(this, (t = void 0 === t ? '' : t) || a, n = void 0 === n ? !0 : n) || this;
        return n.mActionFunction = null, n.mActionElement = null, n.mActionRunningFlag = !1, 
        n.mActionName = '', n.mActionElementType = '', n.mActionElementName = '', n.mActionTimeout = 1e4, 
        n.mActionTimeoutId = 0, n;
    }
    var j, D = (l(H, j = e.PluginFactory), H.prototype.getName = function() {
        return m;
    }, H.prototype.getType = function() {
        return p;
    }, H.prototype._newPlugin = function(t, n, e) {
        return new K(t, e);
    }, H.prototype.create = function(t, n, e) {
        void 0 === e && (e = !0);
        t = t || a, n = (n = void 0 === n ? '' : n) || a;
        try {
            return this._newPlugin(t, n, e);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, H);
    function H() {
        return j.call(this, 'ActionComponentFactory') || this;
    }
    var q, U = (l(Y, q = e.Builder), Y.prototype.getClass = function() {
        return 'ActionComponentBuilder';
    }, Y.prototype.getType = function() {
        return p;
    }, Y.prototype.build = function(t) {
        var n = this._getComponentName(t) || a;
        if (n = this._findComponent(n)) return n;
        try {
            var n = this._buildComponent(t), e = this._getPlugin(g, g, y, S), o = this._getPlugin(L, L, b, x);
            return 0 !== this._binder(n, e, o) ? (this.error('build', 'Komponenten nicht verbunden'), 
            null) : n;
        } catch (t) {
            return this.exception('build', t), null;
        }
    }, Y.prototype._buildComponent = function(t) {
        var n = this._getComponentName(t) || a, t = this._getComponentClass(t) || a;
        return this._getPlugin(n, t, m, D);
    }, Y.prototype._binder = function(t, n, e) {
        return t ? n ? e ? 0 !== t.insertPlugin(n.getName(), n) ? (this.error('_binder', 'ActionFunction-Plugin wurde nicht eingefuegt'), 
        -1) : 0 !== t.insertPlugin(e.getName(), e) ? (this.error('_binder', 'ActionElement-Plugin wurde nicht eingefuegt'), 
        -1) : (n.onError = t.onError, e.onError = t.onError, 0) : (this.error('_binder', 'Kein ActionElement-Plugin vorhanden'), 
        -1) : (this.error('_binder', 'Kein ActionFunction-Plugin vorhanden'), -1) : (this.error('_binder', 'Keine Action-Komponente vorhanden'), 
        -1);
    }, Y);
    function Y(t, n) {
        return q.call(this, t || p, n = void 0 === n ? !0 : n) || this;
    }
    var G, z = (l(J, G = n.Base), J.prototype._getBuilderName = function() {
        return p;
    }, J.prototype.setActionName = function(t) {
        return this.mActionComponent.setActionName(t);
    }, J.prototype.getActionName = function() {
        return this.mActionComponent.getActionName();
    }, J.prototype.setElementType = function(t) {
        return this.mActionComponent.setElementType(t);
    }, J.prototype.getElementType = function() {
        return this.mActionComponent.getElementType();
    }, J.prototype.setElementName = function(t) {
        return this.mActionComponent.setElementName(t);
    }, J.prototype.getElementName = function() {
        return this.mActionComponent.getElementName();
    }, J.prototype.addFunction = function(t, n, e) {
        return this.mActionComponent.addFunction(t, n, e);
    }, J.prototype.removeFunction = function(t) {
        return this.mActionComponent.removeFunction(t);
    }, J.prototype.addElement = function(t, n, e) {
        return this.mActionComponent.addElement(t, n, e);
    }, J.prototype.removeElement = function(t) {
        return this.mActionComponent.removeElement(t);
    }, J);
    function J(t) {
        t = G.call(this, t) || this;
        return t.mActionComponent = t.mComponent, t;
    }
    var Q = (W.create = function(t, n) {
        try {
            return e.SystemManager.findBuilder(p) || 0 === e.SystemManager.insertBuilder(p, new U('', !1)) ? new z(n) : (console.log('ActionFactory.create: kein Builder eingetragen'), 
            null);
        } catch (t) {
            return console.log('ActionFactory.create: Exception', t), null;
        }
    }, W);
    function W() {}
    var X, c = {
        activeFlag: !0,
        errorOutputFlag: !1
    }, n = (l(Z, X = o.Service), Z.isConstructorInit = function() {
        return Z.constructorInitFlag;
    }, Z.setConstructorInitOn = function() {
        Z.constructorInitFlag = !0;
    }, Z.setConstructorInitOff = function() {
        Z.constructorInitFlag = !1;
    }, Z.getConfig = function() {
        return Z.actionServiceConfig;
    }, Z.prototype._setOption = function(t) {
        if (0 !== X.prototype._setOption.call(this, t)) return -1;
    }, Z.prototype._createComponent = function(t, n) {
        return this.mAction = Q.create(t, n), this.mAction;
    }, Z.prototype.init = function(t) {
        return X.prototype.init.call(this, t);
    }, Z.prototype.reset = function(t) {
        return X.prototype.reset.call(this, t);
    }, Z.prototype.setActionName = function(t) {
        return this.mAction ? this.mAction.setActionName(t) : (this._error('setActionName', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.prototype.getActionName = function() {
        return this.mAction ? this.mAction.getActionName() : (this._error('getActionName', 'keine Action-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Z.prototype, "action", {
        get: function() {
            return this.getActionName();
        },
        set: function(t) {
            this.setActionName(t);
        },
        enumerable: !1,
        configurable: !0
    }), Z.prototype.setElementType = function(t) {
        return this.mAction ? this.mAction.setElementType(t) : (this._error('setElementType', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.prototype.getElementType = function() {
        return this.mAction ? this.mAction.getElementType() : (this._error('getElementType', 'keine Action-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Z.prototype, "type", {
        get: function() {
            return this.getElementType();
        },
        set: function(t) {
            this.setElementType(t);
        },
        enumerable: !1,
        configurable: !0
    }), Z.prototype.setElementName = function(t) {
        return this.mAction ? this.mAction.setElementName(t) : (this._error('setElementName', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.prototype.getElementName = function() {
        return this.mAction ? this.mAction.getElementName() : (this._error('getElementName', 'keine Action-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Z.prototype, "element", {
        get: function() {
            return this.getElementName();
        },
        set: function(t) {
            this.setElementName(t);
        },
        enumerable: !1,
        configurable: !0
    }), Z.prototype.addFunction = function(t, n, e) {
        return this.mAction ? this.mAction.addFunction(t, n, e) : (this._error('addFunction', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.prototype.removeFunction = function(t) {
        return this.mAction ? this.mAction.removeFunction(t) : (this._error('removeFunction', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.prototype.addElement = function(t, n, e) {
        return this.mAction ? this.mAction.addElement(t, n, e) : (this._error('addElement', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.prototype.removeElement = function(t) {
        return this.mAction ? this.mAction.removeElement(t) : (this._error('removeElement', 'keine Action-Komponente vorhanden'), 
        -1);
    }, Z.actionServiceConfig = c, Z.constructorInitFlag = !0, Z);
    function Z() {
        var t = X.call(this, a, h, s) || this;
        if (t.mAction = null, Z.isConstructorInit() && 0 !== t.init(Z.getConfig())) throw new Error('Action nicht initialisiert');
        return 0 !== o.ServiceManager.insert(t) && console.log('ActionService: wurde nicht in ServiceManager eingetragen'), 
        t;
    }
    t.ACTION_API_VERSION = s, t.ACTION_COMPONENTBUILDER_NAME = 'ActionComponentBuilder', 
    t.ACTION_COMPONENTFACTORY_NAME = m, t.ACTION_COMPONENT_NAME = a, t.ACTION_MOCK_NAME = 'ActionMock', 
    t.ACTION_SERVICE_NAME = h, t.ACTION_TYPE_NAME = p, t.ACTION_VERSION_STRING = u, 
    t.Action = z, t.ActionComponent = K, t.ActionComponentBuilder = U, t.ActionComponentFactory = D, 
    t.ActionFactory = Q, t.ActionService = n, t.ActionServiceConfig = c, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
