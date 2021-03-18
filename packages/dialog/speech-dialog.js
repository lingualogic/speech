/**
 * Speech-Dialog Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core'), require('@speech/file'), require('@speech/base'), require('@speech/service')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/file', '@speech/base', '@speech/service' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechDialog = {}, t.speechCore, t.speechFile, t.speechBase, t.speechService);
}(this, function(t, i, s, e, n) {
    'use strict';
    var o = i.SPEECH_VERSION_NUMBER, r = i.SPEECH_VERSION_BUILD, a = i.SPEECH_VERSION_TYPE, u = i.SPEECH_VERSION_DATE, l = o + '.' + r + ' vom ' + u + ' (' + a + ')', p = l, c = 'Dialog', m = 'DialogComponentFactory', g = 'DialogComponent', h = 'DialogProxy', D = 'DialogService', f = 'assets/', S = 'speech.def', E = 'main', d = 'root', O = 'group', I = 'action', C = 'speak', A = 'wait', y = 'ACTION', v = 'SPEAK', N = 'WAIT', _ = function(t, e) {
        return (_ = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        })(t, e);
    };
    function F(t, e) {
        function n() {
            this.constructor = t;
        }
        _(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
        new n());
    }
    function P(t, a, s, u) {
        return new (s = s || Promise)(function(n, e) {
            function o(t) {
                try {
                    r(u.next(t));
                } catch (t) {
                    e(t);
                }
            }
            function i(t) {
                try {
                    r(u.throw(t));
                } catch (t) {
                    e(t);
                }
            }
            function r(t) {
                var e;
                t.done ? n(t.value) : ((e = t.value) instanceof s ? e : new s(function(t) {
                    t(e);
                })).then(o, i);
            }
            r((u = u.apply(t, a || [])).next());
        });
    }
    function b(n, o) {
        var i, r, a, s = {
            label: 0,
            sent: function() {
                if (1 & a[0]) throw a[1];
                return a[1];
            },
            trys: [],
            ops: []
        }, t = {
            next: e(0),
            throw: e(1),
            return: e(2)
        };
        return "function" == typeof Symbol && (t[Symbol.iterator] = function() {
            return this;
        }), t;
        function e(e) {
            return function(t) {
                return function(e) {
                    if (i) throw new TypeError("Generator is already executing.");
                    for (;s; ) try {
                        if (i = 1, r && (a = 2 & e[0] ? r.return : e[0] ? r.throw || ((a = r.return) && a.call(r), 
                        0) : r.next) && !(a = a.call(r, e[1])).done) return a;
                        switch (r = 0, (e = a ? [ 2 & e[0], a.value ] : e)[0]) {
                          case 0:
                          case 1:
                            a = e;
                            break;

                          case 4:
                            return s.label++, {
                                value: e[1],
                                done: !1
                            };

                          case 5:
                            s.label++, r = e[1], e = [ 0 ];
                            continue;

                          case 7:
                            e = s.ops.pop(), s.trys.pop();
                            continue;

                          default:
                            if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === e[0] || 2 === e[0])) {
                                s = 0;
                                continue;
                            }
                            if (3 === e[0] && (!a || e[1] > a[0] && e[1] < a[3])) {
                                s.label = e[1];
                                break;
                            }
                            if (6 === e[0] && s.label < a[1]) {
                                s.label = a[1], a = e;
                                break;
                            }
                            if (a && s.label < a[2]) {
                                s.label = a[2], s.ops.push(e);
                                break;
                            }
                            a[2] && s.ops.pop(), s.trys.pop();
                            continue;
                        }
                        e = o.call(n, s);
                    } catch (t) {
                        e = [ 6, t ], r = 0;
                    } finally {
                        i = a = 0;
                    }
                    if (5 & e[0]) throw e[1];
                    return {
                        value: e[0] ? e[1] : void 0,
                        done: !0
                    };
                }([ e, t ]);
            };
        }
    }
    var L = 'StoreFactory', k = 'StorePlugin', T = (x.prototype.getNodeType = function() {
        return this.mNodeType;
    }, x.prototype.getStateId = function() {
        return this.mStateId;
    }, x.prototype.getParentId = function() {
        return this.mParentId;
    }, x.prototype.getNodeId = function() {
        return this.mNodeId;
    }, x.prototype.getNextId = function() {
        return this.mNextId;
    }, x.prototype.setName = function(t) {
        this.mName = t;
    }, x.prototype.getName = function() {
        return this.mName;
    }, x.prototype.setObjectType = function(t) {
        this.mObjectType = t;
    }, x.prototype.getObjectType = function() {
        return this.mObjectType;
    }, x.prototype.setObjectName = function(t) {
        this.mObjectName = t;
    }, x.prototype.getObjectName = function() {
        return this.mObjectName;
    }, x.prototype.setText = function(t) {
        this.mText = t;
    }, x.prototype.getText = function() {
        return this.mText;
    }, x.prototype.setTimeout = function(t) {
        this.mTimeout = t;
    }, x.prototype.getTimeout = function() {
        return this.mTimeout;
    }, x.prototype.setProperty = function(t) {
        this.mProperty = t;
    }, x.prototype.getProperty = function() {
        return this.mProperty;
    }, x);
    function x(t, e, n, o, i) {
        this.mNodeType = '', this.mStateId = 0, this.mParentId = 0, this.mNodeId = 0, this.mNextId = 0, 
        this.mName = '', this.mObjectType = '', this.mObjectName = '', this.mText = '', 
        this.mTimeout = 0, this.mProperty = '', this.mNodeType = t, this.mStateId = n, this.mParentId = o, 
        this.mNodeId = e, this.mNextId = i;
    }
    var G = (w.prototype.getDialogName = function() {
        return this.mDialogName;
    }, w.prototype.getName = function() {
        return this.mStateName;
    }, w.prototype.getId = function() {
        return this.mStateId;
    }, w.prototype.newDialogNode = function(t, e, n, o) {
        o = new T(t, e, this.mStateId, n, o);
        return this.mNodeList.set(o.getNodeId(), o), o;
    }, w.prototype.getDialogNode = function(t) {
        return this.mNodeList.get(t);
    }, w.prototype.getFirstDialogNodeId = function() {
        this.mNodeKeys = this.mNodeList.keys();
        var t = this.mNodeKeys.next();
        return t.value || -1;
    }, w.prototype.getNextDialogNodeId = function() {
        if (null === this.mNodeKeys) return this.getFirstDialogNodeId();
        var t = this.mNodeKeys.next();
        return !t.value || t.done ? -1 : t.value;
    }, w);
    function w(t, e, n) {
        this.mDialogName = '', this.mStateName = '', this.mStateId = 0, this.mNodeList = new Map(), 
        this.mNodeKeys = null, this.mDialogName = t, this.mStateName = e, this.mStateId = n;
    }
    var R = (J.prototype.getName = function() {
        return this.mDialogName;
    }, J.prototype.newDialogState = function(t, e) {
        e = new G(this.mDialogName, t, e);
        return this.mDialogStateList.set(t, e), e;
    }, J.prototype.getDialogState = function(t) {
        return this.mDialogStateList.get(t);
    }, J);
    function J(t) {
        this.mDialogName = '', this.mDialogStateList = new Map(), this.mDialogName = t;
    }
    var j, K = (F(V, j = i.Plugin), V.prototype.init = function(t) {
        return j.prototype.init.call(this, t);
    }, V.prototype.done = function() {
        return this.mDialogList.clear(), j.prototype.done.call(this);
    }, V.prototype.clear = function() {
        this.mDialogList.clear();
    }, V.prototype.newDialog = function(t) {
        var e = new R(t);
        return this.mDialogList.set(t, e), e;
    }, V.prototype.newDialogState = function(t, e, n) {
        var o = this.getDialog(t);
        return o ? o.newDialogState(e, n) : (this.error('newDialogState', 'kein dialog vorhanden ' + t), 
        null);
    }, V.prototype.getDialog = function(t) {
        return this.mDialogList.get(t);
    }, V.prototype.getDialogState = function(t, e) {
        var n = this.getDialog(t);
        return n ? n.getDialogState(e) : (this.error('getDialogState', 'kein dialog vorhanden ' + t), 
        null);
    }, V.prototype.getNewDialogFunc = function() {
        var e = this;
        return function(t) {
            return e.newDialog(t);
        };
    }, V.prototype.getNewDialogStateFunc = function() {
        var o = this;
        return function(t, e, n) {
            return o.newDialogState(t, e, n);
        };
    }, V.prototype.getGetDialogStateFunc = function() {
        var n = this;
        return function(t, e) {
            return n.getDialogState(t, e);
        };
    }, V);
    function V(t, e) {
        e = j.call(this, (t = void 0 === t ? '' : t) || k, e = void 0 === e ? !0 : e) || this;
        return e.mDialogList = new Map(), e._setErrorClassName('StorePlugin'), e;
    }
    var H, M = (F(B, H = i.PluginFactory), B.prototype.getName = function() {
        return L;
    }, B.prototype._newPlugin = function(t, e, n) {
        return new K(t, n);
    }, B.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = t || k, e = (e = void 0 === e ? '' : e) || k;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, B);
    function B() {
        return H.call(this, 'StoreFactory') || this;
    }
    var W, U = 'JsonFactory', Y = 'JsonPlugin', z = (F(q, W = i.ErrorBase), q.prototype.clear = function() {
        this.mDialogList = null, this.mDialog = null, this.mDialogName = '', this.mStateList = null, 
        this.mState = null, this.mStateName = '', this.mIntentList = null, this.mIntent = null, 
        this.mIntentName = '', this.mCommandList = null, this.mTextList = null, this.mText = null, 
        this.mTextName = '';
    }, q.prototype.setDialogList = function(t) {
        return t && 0 !== t.length ? (this.clear(), this.mDialogList = t, 0) : (this.error('setDialogList', 'keine Dialogliste uebergeben'), 
        -1);
    }, q.prototype.setCurrentDialog = function(t) {
        if (!t) return this.error('setCurrentDialog', 'kein Dialogname uebergeben'), -1;
        if (!this.mDialogList) return this.error('setCurrentDialog', 'keine Dialogliste vorhanden'), 
        -1;
        for (var e = 0, n = this.mDialogList; e < n.length; e++) {
            var o = n[e];
            if (t === o.name) return this.mDialog = o, this.mDialogName = o.name, this.mStateList = o.stateList, 
            this.mState = null, this.mStateName = '', this.mIntentList = o.intentList, this.mIntent = null, 
            this.mIntentName = '', this.mCommandList = null, this.mTextList = o.textList, this.mText = null, 
            this.mTextName = '', 0;
        }
        return this.mDialog = null, this.mDialogName = '', this.mStateList = null, this.mState = null, 
        this.mStateName = '', this.mIntentList = null, this.mIntent = null, this.mIntentName = '', 
        this.mCommandList = null, this.mTextList = null, this.mText = null, this.mTextName = '', 
        this.error('setCurrentDialog', 'kein Dialog zum Dialognamen ' + t + ' gefunden'), 
        -1;
    }, Object.defineProperty(q.prototype, "dialogList", {
        get: function() {
            return this.mDialogList;
        },
        set: function(t) {
            this.mDialogList = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "dialog", {
        get: function() {
            return this.mDialog;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "dialogName", {
        get: function() {
            return this.mDialogName;
        },
        enumerable: !1,
        configurable: !0
    }), q.prototype.newState = function(t) {
        return this.mDialog && this.mStateList ? this.checkState(t) ? (this.error('newState', 'kein State Name uebergeben'), 
        -1) : (this.mStateList.push({
            name: t,
            intentList: []
        }), 0) : (this.error('newState', 'kein Dialog vorhanden'), -1);
    }, q.prototype.deleteState = function(o) {
        if (!this.mDialog || !this.mStateList) return this.error('deleteState', 'kein Dialog vorhanden'), 
        -1;
        if (!this.checkState(o)) return this.error('deleteState', 'kein State vorhanden'), 
        -1;
        var t = this.mStateList.filter(function(t, e, n) {
            return t.name !== o;
        });
        return this.mStateList = t, this.mDialog.stateList = t, 0;
    }, q.prototype.checkState = function(t) {
        if (t && this.mStateList) for (var e = 0, n = this.mStateList; e < n.length; e++) if (t === n[e].name) return !0;
        return !1;
    }, q.prototype.setCurrentState = function(t) {
        for (var e = 0, n = this.mStateList; e < n.length; e++) {
            var o = n[e];
            if (t === o.name) return this.mState = o, this.mStateName = o.name, this.mIntent = null, 
            this.mIntentName = '', 0;
        }
        return this.mState = null, this.mStateName = '', this.mIntent = null, this.mIntentName = '', 
        this.error('setCurrentState', 'kein State vorhanden'), -1;
    }, Object.defineProperty(q.prototype, "stateList", {
        get: function() {
            return this.mStateList;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "state", {
        get: function() {
            return this.mState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "stateName", {
        get: function() {
            return this.mStateName;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "stateIntentList", {
        get: function() {
            return this.mState ? this.mState.intentList : null;
        },
        enumerable: !1,
        configurable: !0
    }), q.prototype.newStateIntent = function(t) {
        return t ? this.mState ? (this.mState.intentList.push(t), 0) : (this.error('newStateIntent', 'kein State vorhanden'), 
        -1) : (this.error('newStateIntent', 'kein Intent Name uebergeben'), -1);
    }, q.prototype.deleteStateIntent = function(o) {
        if (!this.mState) return this.error('deleteStateIntent', 'kein State vorhanden'), 
        -1;
        if (!this.checkStateIntent(o)) return this.error('deleteStateIntent', 'kein Intent vorhanden'), 
        -1;
        var t = this.mState.intentList.filter(function(t, e, n) {
            return t !== o;
        });
        return this.mState.intentList = t, 0;
    }, q.prototype.checkStateIntent = function(t) {
        if (t && this.mState) for (var e = 0, n = this.mState.intentList; e < n.length; e++) if (t === n[e]) return !0;
        return !1;
    }, q.prototype.setCurrentIntent = function(t) {
        if (this.mIntentList) for (var e = 0, n = this.mIntentList; e < n.length; e++) {
            var o = n[e];
            if (t === o.name) return this.mIntent = o, this.mIntentName = o.name, this.mCommandList = o.commandList, 
            0;
        }
        return this.mIntent = null, this.mIntentName = '', this.mCommandList = null, this.error('setCurrentIntent', 'kein Intent vorhanden'), 
        -1;
    }, Object.defineProperty(q.prototype, "intentList", {
        get: function() {
            return this.mIntentList;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "intent", {
        get: function() {
            return this.mIntent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "intentName", {
        get: function() {
            return this.mIntentName;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "commandList", {
        get: function() {
            return this.mCommandList;
        },
        enumerable: !1,
        configurable: !0
    }), q.prototype.newCommand = function(t) {
        return t ? this.mIntent ? (this.mIntent.commandList.push({
            name: t
        }), this.mCommandList = this.mIntent.commandList, 0) : (this.error('newCommand', 'kein Intent vorhanden'), 
        -1) : (this.error('newCommand', 'kein Kommandoname uebergeben'), -1);
    }, q.prototype.deleteCommand = function(o) {
        if (!this.mIntent) return this.error('deleteCommand', 'kein Intent vorhanden'), 
        -1;
        var t = this.mIntent.commandList.filter(function(t, e, n) {
            return e !== o;
        });
        return this.mIntent.commandList = t, this.mCommandList = this.mIntent.commandList, 
        0;
    }, Object.defineProperty(q.prototype, "commandNameList", {
        get: function() {
            return this.mCommandNameList;
        },
        enumerable: !1,
        configurable: !0
    }), q.prototype.setCurrentText = function(t) {
        if (this.mTextList) for (var e = 0, n = this.mTextList; e < n.length; e++) {
            var o = n[e];
            if (t === o.name) return this.mText = o, this.mTextName = o.name, 0;
        }
        return this.mText = null, this.mTextName = '', this.error('setCurrentText', 'kein Text gefunden'), 
        -1;
    }, Object.defineProperty(q.prototype, "textList", {
        get: function() {
            return this.mTextList;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "text", {
        get: function() {
            return this.mText;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(q.prototype, "textName", {
        get: function() {
            return this.mTextName;
        },
        enumerable: !1,
        configurable: !0
    }), q.prototype.newText = function(t) {
        return t ? this.mTextList ? (this.mTextList.push({
            name: t,
            text: '',
            time: 0
        }), 0) : (this.error('newText', 'keine Textliste vorhanden'), -1) : (this.error('newText', 'kein Text Name uebergeben'), 
        -1);
    }, q.prototype.deleteText = function(o) {
        if (!this.mTextList) return this.error('deleteText', 'keine Textliste vorhanden'), 
        -1;
        var t = this.mTextList.filter(function(t, e, n) {
            return t.name !== o;
        });
        return this.mDialog.textList = t, this.mTextList = t, 0;
    }, q.prototype.findText = function(t) {
        if (t && this.mTextList) for (var e = 0, n = this.mTextList; e < n.length; e++) {
            var o = n[e];
            if (t === o.name) return o.text;
        }
        return '';
    }, q.prototype.findTextTime = function(t) {
        if (t && this.mTextList) for (var e = 0, n = this.mTextList; e < n.length; e++) {
            var o = n[e];
            if (t === o.name) return o.time;
        }
        return 0;
    }, q.prototype.setText = function(t, e, n) {
        if (!t || !e || !this.mTextList) return this.error('setText', 'keine Textdaten uebergeben'), 
        -1;
        for (var o = 0, i = this.mTextList; o < i.length; o++) {
            var r = i[o];
            t === r.name && (r.text = e, r.time = n);
        }
        return 0;
    }, q);
    function q() {
        var t = W.call(this, 'JsonStore') || this;
        return t.mDialogList = null, t.mDialog = null, t.mDialogName = '', t.mStateList = null, 
        t.mState = null, t.mStateName = '', t.mIntentList = null, t.mIntent = null, t.mIntentName = '', 
        t.mCommandList = null, t.mTextList = null, t.mText = null, t.mTextName = '', t.mCommandNameList = [ y, v, N ], 
        t;
    }
    var X, Q = (F(Z, X = i.Plugin), Z.prototype.init = function(t) {
        return X.prototype.init.call(this, t);
    }, Z.prototype.done = function() {
        return this.mDialogObject = null, this.mStateObject = null, this.mStateIdCount = 0, 
        this.mNodeIdCount = 0, this.mFirstNodeId = 0, this.mEndFlag = !1, this.mGroupId = 0, 
        this.mGroupProperty = '', this.mOnJsonEndFunc = null, this.mNewDialogFunc = null, 
        this.mNewDialogStateFunc = null, X.prototype.done.call(this);
    }, Z.prototype.setErrorOutput = function(t) {
        X.prototype.setErrorOutput.call(this, t), this.mJsonStore.setErrorOutput(t);
    }, Z.prototype._onJsonEnd = function() {
        if ('function' == typeof this.mOnJsonEndFunc) try {
            return this.mOnJsonEndFunc();
        } catch (t) {
            return this.exception('_onJsonEnd', t), -1;
        }
        return 0;
    }, Object.defineProperty(Z.prototype, "onJsonEnd", {
        set: function(t) {
            this.mOnJsonEndFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Z.prototype._newDialog = function(t) {
        return 'function' == typeof this.mNewDialogFunc ? this.mNewDialogFunc(t) : null;
    }, Z.prototype._newDialogState = function(t, e, n) {
        return 'function' == typeof this.mNewDialogStateFunc ? this.mNewDialogStateFunc(t, e, n) : null;
    }, Z.prototype.transformJsonFile = function(t) {
        if (!t) return this.error('transformJsonFile', 'kein Dateiname uebergeben'), -1;
        try {
            return this.error('transformJsonFile', 'nicht implementiert'), 0;
        } catch (t) {
            return this.exception('transformJsonFile', t), -1;
        }
    }, Z.prototype.transformJsonData = function(t) {
        if (this.mDialogObject = null, this.mStateObject = null, this.mStateIdCount = 0, 
        this.mNodeIdCount = 0, this.mFirstNodeId = 0, this.mEndFlag = !1, this.mGroupId = 0, 
        this.mGroupProperty = '', !t) return this.error('transformJsonData', 'keine Json-Daten uebergeben'), 
        -1;
        try {
            if (0 !== this.mJsonStore.setDialogList(t)) return this.error('transformJsonData', 'Json Daten nicht in Dialoglist eingetragen'), 
            -1;
            for (var e = this.mJsonStore.dialogList, n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                if (0 !== this._transformDialog(i.name)) return -1;
            }
            return this._onJsonEnd();
        } catch (t) {
            return this.exception('transformJsonData', t), -1;
        }
    }, Z.prototype._transformDialog = function(t) {
        try {
            if (0 !== this.mJsonStore.setCurrentDialog(t)) return this.error('_transformDialog', 'kein Dialog vorhanden'), 
            -1;
            if (this.mDialogObject = this._newDialog(t), !this.mDialogObject) return this.error('_transformDialog', 'kein Dialog erzeugt'), 
            -1;
            this.mEndFlag = !1;
            for (var e = this.mJsonStore.stateList, n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                if (0 !== this._transformState(t, i.name)) return -1;
            }
            return 0;
        } catch (t) {
            return this.exception('_transformDialog', t), -1;
        }
    }, Z.prototype._transformState = function(t, e) {
        try {
            if (0 !== this.mJsonStore.setCurrentState(e)) return this.error('_transformState', 'kein State vorhanden'), 
            -1;
            this.mStateIdCount++;
            var n = this.mStateIdCount;
            if (this.mFirstNodeId = 0, this.mStateObject = this._newDialogState(t, e, n), !this.mStateObject) return this.error('_transformState', 'kein State erzeugt'), 
            -1;
            this.mEndFlag = !1;
            for (var o = this.mJsonStore.stateIntentList, i = 0, r = 0, a = o; r < a.length; r++) {
                var s = a[r];
                if (++i === o.length && (this.mEndFlag = !0), 0 !== this._transformIntent(n, s)) return -1;
            }
            return 0;
        } catch (t) {
            return this.exception('_transformState', t), -1;
        }
    }, Z.prototype._transformIntent = function(t, e) {
        try {
            if (0 !== this.mJsonStore.setCurrentIntent(e)) return this.error('_transformIntent', 'kein Intent vorhanden'), 
            -1;
            var n, o, i = this.mJsonStore.intent;
            if (!i) return this.error('_transformIntent', 'kein Intent erzeugt'), -1;
            i.optional && (this.mNodeIdCount++, n = this.mNodeIdCount, 0 === this.mFirstNodeId && (this.mFirstNodeId = n), 
            this.mGroupProperty = 'optional', o = n + 1, this.mGroupId = n, this.mStateObject.newDialogNode(O, n, 0, o).setProperty(this.mGroupProperty)), 
            i.scrollable && (this.mNodeIdCount++, n = this.mNodeIdCount, 0 === this.mFirstNodeId && (this.mFirstNodeId = n), 
            this.mGroupProperty = 'scrollable', o = n + 1, this.mGroupId = n, this.mStateObject.newDialogNode(O, n, 0, o).setProperty(this.mGroupProperty));
            for (var r = this.mJsonStore.commandList, a = r.length, s = !1, u = 0, l = 0, p = r; l < p.length; l++) {
                var c = p[l];
                if (a <= ++u && this.mEndFlag && (s = !0), 0 !== this._transformCommand(t, c, s)) return -1;
            }
            return i.optional && (this.mGroupId = 0, this.mGroupProperty = ''), i.scrollable && (this.mGroupId = 0, 
            this.mGroupProperty = ''), 0;
        } catch (t) {
            return this.exception('_transformIntent', t), -1;
        }
    }, Z.prototype._transformCommand = function(t, e, n) {
        try {
            this.mNodeIdCount++;
            var o = this.mNodeIdCount;
            0 === this.mFirstNodeId && (this.mFirstNodeId = o);
            var i = n ? 0 : o + 1;
            if (e.name === y) {
                var r = e.action, a = e.type, s = e.element;
                (p = this.mStateObject.newDialogNode(I, o, this.mGroupId, i)).setName(r), p.setObjectType(a), 
                p.setObjectName(s), p.setProperty(this.mGroupProperty);
            } else if (e.name === v) {
                var u = this.mJsonStore.findText(e.textId), l = this.mJsonStore.findTextTime(e.textId);
                (p = this.mStateObject.newDialogNode(C, o, this.mGroupId, i)).setTimeout(1e3 * l), 
                p.setName(e.textId), p.setText(u), p.setProperty(this.mGroupProperty);
            } else {
                if (e.name !== N) return this.error('_transformCommand', 'falsches Kommando'), -1;
                var p, l = e.time;
                (p = this.mStateObject.newDialogNode(A, o, this.mGroupId, i)).setTimeout(1e3 * l), 
                p.setProperty(this.mGroupProperty);
            }
            return 0;
        } catch (t) {
            return this.exception('_transformCommand', t), -1;
        }
    }, Z.prototype.getTransformJsonFileFunc = function() {
        var e = this;
        return function(t) {
            return e.transformJsonFile(t);
        };
    }, Z.prototype.getTransformJsonDataFunc = function() {
        var e = this;
        return function(t) {
            return e.transformJsonData(t);
        };
    }, Z.prototype.setNewDialogFunc = function(t) {
        return this.mNewDialogFunc = t, 0;
    }, Z.prototype.setNewDialogStateFunc = function(t) {
        return this.mNewDialogStateFunc = t, 0;
    }, Z);
    function Z(t, e) {
        e = X.call(this, (t = void 0 === t ? '' : t) || Y, e = void 0 === e ? !0 : e) || this;
        return e.mJsonStore = null, e.mDialogObject = null, e.mStateObject = null, e.mStateIdCount = 0, 
        e.mNodeIdCount = 0, e.mFirstNodeId = 0, e.mEndFlag = !1, e.mGroupId = 0, e.mGroupProperty = '', 
        e.mOnJsonEndFunc = null, e.mNewDialogFunc = null, e.mNewDialogStateFunc = null, 
        e._setErrorClassName('JsonPlugin'), e.mJsonStore = new z(), e.mJsonStore.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e;
    }
    var $, tt = (F(et, $ = i.PluginFactory), et.prototype.getName = function() {
        return U;
    }, et.prototype._newPlugin = function(t, e, n) {
        return new Q(t, n);
    }, et.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = t || Y, e = (e = void 0 === e ? '' : e) || Y;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, et);
    function et() {
        return $.call(this, 'JsonFactory') || this;
    }
    var nt, ot = 'ParserFactory', it = 'ParserPlugin', rt = (F(at, nt = i.Plugin), at.prototype.init = function(t) {
        return nt.prototype.init.call(this, t);
    }, at.prototype.done = function() {
        return this.mOnParserEndFunc = null, this.mNewDialogFunc = null, this.mNewDialogStateFunc = null, 
        nt.prototype.done.call(this);
    }, at.prototype._onParserEnd = function() {
        if ('function' == typeof this.mOnParserEndFunc) try {
            return this.mOnParserEndFunc();
        } catch (t) {
            return this.exception('_onParserEnd', t), -1;
        }
        return 0;
    }, Object.defineProperty(at.prototype, "onParserEnd", {
        set: function(t) {
            this.mOnParserEndFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), at.prototype._newDialog = function(t) {
        return 'function' == typeof this.mNewDialogFunc ? this.mNewDialogFunc(t) : null;
    }, at.prototype._newDialogState = function(t, e, n) {
        return 'function' == typeof this.mNewDialogStateFunc ? this.mNewDialogStateFunc(t, e, n) : null;
    }, at.prototype.parseSpeechDefFile = function(t) {
        if (!t) return this.error('parseSpeechDefFile', 'kein Dateiname uebergeben'), -1;
        try {
            return this.error('parseSpeechDefFile', 'nicht implementiert'), 0;
        } catch (t) {
            return this.exception('parseSpeechDefFile', t), -1;
        }
    }, at.prototype.parseSpeechDefData = function(t) {
        if (!t) return this.error('parseSpeechDefData', 'keine Def-Daten uebergeben'), -1;
        var e, n, o, i, r = t.split('\n'), a = '', s = null, u = null, l = 0, p = 0, c = 0, m = [], g = '', h = '', D = 0, f = 0, S = '', E = '', d = 0, y = 0, v = 0, N = '', _ = !1;
        try {
            for (var F = 0; F < r.length; ++F) if (g = r[F].trim(), h = '', F < r.length - 1 && (h = r[F + 1].trim()), 
            g && 0 !== (y = g.indexOf('#'))) {
                switch (-1 === (y = g.indexOf(' ')) && (y = g.length), e = g.substr(0, y), 'GROUPEND' === h && (_ = !0, 
                h = '', F < r.length - 2 && (h = r[F + 2].trim())), m = (g = g.substr(y + 1, g.length)).split(','), 
                e) {
                  case 'DIALOG':
                    a = m[0].trim(), this._newDialog(a);
                    break;

                  case 'STATE':
                    n = ++l, S = m[0].trim(), c = 0, s = this._newDialogState(a, S, n);
                    break;

                  case 'GROUP':
                    D = ++p, 0 === c && (c = D), N = m[0].trim(), f = D + 1, h || (f = 0), v = D, (u = s.newDialogNode(O, D, 0, f)).setProperty(N);
                    break;

                  case 'GROUPEND':
                    break;

                  case 'ACTION':
                    D = ++p, 0 === c && (c = D), S = m[0].trim(), o = m[1].trim(), i = m[2].trim(), 
                    f = D + 1, h || (f = 0), (u = s.newDialogNode(I, D, v, f)).setName(S), u.setObjectType(o), 
                    u.setObjectName(i), u.setProperty(N);
                    break;

                  case 'SPEAK':
                    D = ++p, 0 === c && (c = D);
                    for (var d = 1e3 * parseInt(m[0].trim(), 10), E = m[1].trim(), P = 2; P < m.length; P++) E += ',' + m[P].trim();
                    f = D + 1, h || (f = 0), (u = s.newDialogNode(C, D, v, f)).setTimeout(d), u.setName(D.toString()), 
                    u.setText(E), u.setProperty(N);
                    break;

                  case 'WAIT':
                    D = ++p, 0 === c && (c = D), d = 1e3 * parseInt(m[0].trim(), 10), f = D + 1, h || (f = 0), 
                    (u = s.newDialogNode(A, D, v, f)).setTimeout(d), u.setProperty(N);
                    break;

                  case '':
                    break;

                  default:
                    return this.error('parseSpeechDefData', 'ParserFehler'), -1;
                }
                _ && (v = 0, N = '', _ = !1);
            }
            return this._onParserEnd();
        } catch (t) {
            return this.exception('parseSpeechDefData', t), -1;
        }
    }, at.prototype.getParseSpeechDefFileFunc = function() {
        var e = this;
        return function(t) {
            return e.parseSpeechDefFile(t);
        };
    }, at.prototype.getParseSpeechDefDataFunc = function() {
        var e = this;
        return function(t) {
            return e.parseSpeechDefData(t);
        };
    }, at.prototype.setNewDialogFunc = function(t) {
        return this.mNewDialogFunc = t, 0;
    }, at.prototype.setNewDialogStateFunc = function(t) {
        return this.mNewDialogStateFunc = t, 0;
    }, at);
    function at(t, e) {
        e = nt.call(this, (t = void 0 === t ? '' : t) || it, e = void 0 === e ? !0 : e) || this;
        return e.mOnParserEndFunc = null, e.mNewDialogFunc = null, e.mNewDialogStateFunc = null, 
        e._setErrorClassName('ParserPlugin'), e;
    }
    var st, ut = (F(lt, st = i.PluginFactory), lt.prototype.getName = function() {
        return ot;
    }, lt.prototype._newPlugin = function(t, e, n) {
        return new rt(t, n);
    }, lt.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = t || it, e = (e = void 0 === e ? '' : e) || it;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, lt);
    function lt() {
        return st.call(this, 'ParserFactory') || this;
    }
    var pt, ct = 'InterpreterFactory', mt = 'InterpreterPlugin';
    function gt(t) {
        return pt.call(this, t) || this;
    }
    F(gt, pt = Promise), gt.prototype.cancel = function() {
        this.cancelMethod && this.cancelMethod();
    };
    var ht, Dt = (F(ft, ht = i.Plugin), ft.prototype.init = function(t) {
        return ht.prototype.init.call(this, t);
    }, ft.prototype.done = function() {
        return this.mDialogName = E, this.mStateName = d, this.mStateContext = null, this.mNodePromise = null, 
        this.mDialogRunFlag = !1, this.mSpeakRunFlag = !1, this.mGroupId = 0, this.mGroupProperty = '', 
        this.mGroupActionFlag = !1, this.mNoWaitNodeFlag = !1, this.mGetDialogStateFunc = null, 
        this.mDialogSetFunc = null, this.mDialogStartFunc = null, this.mDialogStopFunc = null, 
        this.mDialogStateSetFunc = null, this.mDialogActionFunc = null, this.mDialogSpeakFunc = null, 
        this.mDialogSpeakStartFunc = null, this.mDialogSpeakStopFunc = null, ht.prototype.done.call(this);
    }, ft.prototype._onDialogSet = function(t) {
        if ('function' == typeof this.mDialogSetFunc) try {
            return this.mDialogSetFunc(t);
        } catch (t) {
            return this.exception('_onDialogSet', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogStart = function() {
        if ('function' == typeof this.mDialogStartFunc) try {
            return this.mDialogStartFunc(0);
        } catch (t) {
            return this.exception('_onDialogStart', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogStop = function() {
        if ('function' == typeof this.mDialogStopFunc) try {
            return this.mDialogStopFunc();
        } catch (t) {
            return this.exception('_onDialogStop', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogStateSet = function(t) {
        if ('function' == typeof this.mDialogStateSetFunc) try {
            return this.mDialogStateSetFunc(t);
        } catch (t) {
            return this.exception('_onDialogStateSet', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogAction = function(t) {
        if ('function' == typeof this.mDialogActionFunc) try {
            var e = {
                event: i.SPEECH_DIALOGACTION_EVENT,
                state: this.mStateName,
                action: t.getName(),
                type: t.getObjectType(),
                id: t.getObjectName()
            };
            return this.mDialogActionFunc(e);
        } catch (t) {
            return this.exception('_onDialogAction', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogSpeak = function(t) {
        if ('function' == typeof this.mDialogSpeakFunc) try {
            var e = {
                event: i.SPEECH_DIALOGSPEAK_EVENT,
                state: this.mStateName,
                id: t.getName() || t.getNodeId().toString(),
                text: t.getText(),
                timeout: t.getTimeout()
            };
            return this.mDialogSpeakFunc(e);
        } catch (t) {
            return this.exception('_onDialogSpeak', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogSpeakStart = function() {
        if ('function' == typeof this.mDialogSpeakStartFunc) try {
            return this.mDialogSpeakStartFunc();
        } catch (t) {
            return this.exception('_onDialogSpeakStart', t), -1;
        }
        return 0;
    }, ft.prototype._onDialogSpeakStop = function() {
        if ('function' == typeof this.mDialogSpeakStopFunc) try {
            return this.mDialogSpeakStopFunc();
        } catch (t) {
            return this.exception('_onDialogSpeakStop', t), -1;
        }
        return 0;
    }, Object.defineProperty(ft.prototype, "onDialogSet", {
        set: function(t) {
            this.mDialogSetFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogStart", {
        set: function(t) {
            this.mDialogStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogStop", {
        set: function(t) {
            this.mDialogStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogStateSet", {
        set: function(t) {
            this.mDialogStateSetFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogAction", {
        set: function(t) {
            this.mDialogActionFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogSpeak", {
        set: function(t) {
            this.mDialogSpeakFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogSpeakStart", {
        set: function(t) {
            this.mDialogSpeakStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ft.prototype, "onDialogSpeakStop", {
        set: function(t) {
            this.mDialogSpeakStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), ft.prototype._getDialogState = function(t, e) {
        return 'function' == typeof this.mGetDialogStateFunc ? this.mGetDialogStateFunc(t, e) : null;
    }, ft.prototype.setDialog = function(t) {
        return t ? t === this.mDialogName ? 0 : (this.stopDialog(), this.mDialogName = t, 
        this._onDialogSet(t)) : (this.error('setDialog', 'kein Dialogname uebergeben'), 
        -1);
    }, ft.prototype.getDialog = function() {
        return this.mDialogName;
    }, ft.prototype.startDialog = function() {
        try {
            if (this.isDialogRunning()) return this.error('startDialog', 'Dialog laeuft bereits'), 
            -1;
            var t = this._getDialogState(this.mDialogName, this.mStateName);
            return t ? (this._runState(t), 0) : (this.error('startDialog', 'kein DialogState vorhanden'), 
            -1);
        } catch (t) {
            return this.exception('startDialog', t), -1;
        }
    }, ft.prototype.stopDialog = function() {
        try {
            return this._clearGroup(), this._clearNodePromise(), this._clearSpeakRunFlag(), 
            this._clearDialogRunFlag(), 0;
        } catch (t) {
            return this.exception('stopDialog', t), -1;
        }
    }, ft.prototype.isDialogRunning = function() {
        return this.mDialogRunFlag;
    }, ft.prototype.setState = function(t, e) {
        return t ? t === this.mStateName ? 0 : (this.stopDialog(), this.mStateName = t, 
        this.mStateContext = e, this._onDialogStateSet(t)) : (this.error('setState', 'kein StateName uebergeben'), 
        -1);
    }, ft.prototype.getState = function() {
        return this.mStateName;
    }, ft.prototype.setStateContext = function(t) {
        return this.isDialogRunning() ? -1 : (this.mStateContext = t, 0);
    }, ft.prototype._setDialogRunFlag = function() {
        var t = this.mDialogRunFlag;
        return this.mDialogRunFlag = !0, t ? 0 : this._onDialogStart();
    }, ft.prototype._clearDialogRunFlag = function() {
        var t = this.mDialogRunFlag;
        return this.mDialogRunFlag = !1, t ? this._onDialogStop() : 0;
    }, ft.prototype.isSpeakRunning = function() {
        return this.mSpeakRunFlag;
    }, ft.prototype._setSpeakRunFlag = function() {
        var t = this.mSpeakRunFlag;
        return this.mSpeakRunFlag = !0, t ? 0 : this._onDialogSpeakStart();
    }, ft.prototype._clearSpeakRunFlag = function() {
        var t = this.mSpeakRunFlag;
        return this.mSpeakRunFlag = !1, t ? this._onDialogSpeakStop() : 0;
    }, ft.prototype._getWaitNode = function() {
        return new T(A, 0, 0, 0, 0);
    }, ft.prototype._setNodePromise = function(t) {
        this.mNodePromise = t;
    }, ft.prototype._clearNodePromise = function() {
        this.mNodePromise && this.mNodePromise.cancel && (this.mNodePromise.cancel(), this.mNodePromise = null);
    }, ft.prototype.skipNextSpeakNode = function() {
        if (!this.isDialogRunning()) return 0;
        if (!this.isSpeakRunning()) return 0;
        if (!this.mNodePromise) return this.error('skipNextSpeakNode', 'keine Knoten-Promise vorhanden'), 
        -1;
        try {
            return this.mNodePromise.cancel(), this.mSpeakRunFlag = !1, 0;
        } catch (t) {
            return this.exception('skipNextSpeakNode', t), -1;
        }
    }, ft.prototype._runState = function(r) {
        return P(this, void 0, void 0, function() {
            var e, n, o, i;
            return b(this, function(t) {
                switch (t.label) {
                  case 0:
                    if (!(i = r.getFirstDialogNodeId())) return this.error('runState', 'kein Knoten vorhanden'), 
                    [ 2 ];
                    this._setDialogRunFlag(), e = r.getDialogNode(i), o = n = 0, this.mNoWaitNodeFlag = !1, 
                    t.label = 1;

                  case 1:
                    if (!e || !this.mDialogRunFlag) return [ 3, 6 ];
                    t.label = 2;

                  case 2:
                    return t.trys.push([ 2, 4, , 5 ]), [ 4, this._runAsyncNode(e, o) ];

                  case 3:
                    return t.sent(), [ 3, 5 ];

                  case 4:
                    return i = t.sent(), this.exception('_runState', i), [ 3, 5 ];

                  case 5:
                    if (n = e.getNextId(), o = e.getTimeout(), n) this.mNoWaitNodeFlag && (o = 0), (e = r.getDialogNode(n)) || this.error('_runState', 'kein Knoten zur Knoten-ID vorhanden'); else {
                        if (!(0 < o && !1 === this.mNoWaitNodeFlag)) return [ 3, 6 ];
                        e = this._getWaitNode();
                    }
                    return [ 3, 1 ];

                  case 6:
                    return this._clearSpeakRunFlag(), this._clearDialogRunFlag(), [ 2 ];
                }
            });
        });
    }, ft.prototype._runAsyncNode = function(o, i) {
        var r = this, a = null, t = new Promise(function(t, e) {
            if (!r.isDialogRunning()) return r._clearNodePromise(), void t();
            var n = setTimeout(function() {
                try {
                    r._runNode(o), r._clearNodePromise(), t();
                } catch (t) {
                    r.exception('_runAsyncNode', t), r._clearNodePromise(), e(t);
                }
            }, i);
            a = function() {
                clearTimeout(n), t();
            };
        });
        return t.cancel = function() {
            a();
        }, this._setNodePromise(t), t;
    }, ft.prototype._runNode = function(t) {
        if (this.isDialogRunning()) switch (this._clearSpeakRunFlag(), t.getNodeType()) {
          case O:
            this._runGroup(t);
            break;

          case I:
            this._runAction(t);
            break;

          case C:
            this._runSpeak(t);
            break;

          case A:
            this._runWait(t);
            break;

          default:
            this.error('_runNode', 'kein gueltiger Knoten ' + t.getNodeId());
        }
    }, ft.prototype._runGroup = function(t) {
        this.mGroupId = t.getNodeId(), this.mGroupProperty = t.getProperty(), this.mGroupActionFlag = !1, 
        this.mNoWaitNodeFlag = !1;
    }, ft.prototype._clearGroup = function() {
        this.mGroupId = 0, this.mGroupProperty = '', this.mGroupActionFlag = !1, this.mNoWaitNodeFlag = !1;
    }, ft.prototype._isGroupProperty = function(t, e) {
        if (!this.mStateContext) return !1;
        var n = this.mStateContext.property;
        if (!n) return !1;
        t = n[t];
        if (!t) return !1;
        for (var o = 0, i = t; o < i.length; o++) if (i[o] === e) return !0;
        return !1;
    }, ft.prototype._checkRunNode = function(t) {
        return 0 === this.mGroupId || (t.getParentId() === this.mGroupId ? 0 < this.mGroupProperty.length && this.mGroupProperty === t.getProperty() && this._isGroupProperty(t.getProperty(), t.getObjectName()) : (0 === t.getParentId() && this._clearGroup(), 
        !0));
    }, ft.prototype._runAction = function(t) {
        this._checkRunNode(t) && (this._onDialogAction(t), this.mGroupActionFlag = !0);
    }, ft.prototype._runSpeak = function(t) {
        if (this.isSpeakRunning()) this.error('_runSpeak', 'Speak laeuft bereits'); else {
            if (0 !== this.mGroupId && t.getParentId() === this.mGroupId) {
                if (!1 === this.mGroupActionFlag) return void (this.mNoWaitNodeFlag = !0);
            } else this._clearGroup();
            this._onDialogSpeak(t), this._setSpeakRunFlag();
        }
    }, ft.prototype._runWait = function(t) {}, ft.prototype.setGetDialogStateFunc = function(t) {
        return this.mGetDialogStateFunc = t, 0;
    }, ft);
    function ft(t, e) {
        e = ht.call(this, (t = void 0 === t ? '' : t) || mt, e = void 0 === e ? !0 : e) || this;
        return e.mDialogName = E, e.mStateName = d, e.mStateContext = null, e.mNodePromise = null, 
        e.mDialogRunFlag = !1, e.mSpeakRunFlag = !1, e.mGroupId = 0, e.mGroupProperty = '', 
        e.mGroupActionFlag = !1, e.mNoWaitNodeFlag = !1, e.mGetDialogStateFunc = null, e.mDialogSetFunc = null, 
        e.mDialogStartFunc = null, e.mDialogStopFunc = null, e.mDialogStateSetFunc = null, 
        e.mDialogActionFunc = null, e.mDialogSpeakFunc = null, e.mDialogSpeakStartFunc = null, 
        e.mDialogSpeakStopFunc = null, e._setErrorClassName('InterpreterPlugin'), e;
    }
    var St, Et = (F(dt, St = i.PluginFactory), dt.prototype.getName = function() {
        return ct;
    }, dt.prototype._newPlugin = function(t, e, n) {
        return new Dt(t, n);
    }, dt.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = t || mt, e = (e = void 0 === e ? '' : e) || mt;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, dt);
    function dt() {
        return St.call(this, 'InterpreterFactory') || this;
    }
    var yt, vt = (F(Nt, yt = i.ErrorBase), Nt.prototype.clear = function() {
        this.mContext = {
            property: {}
        };
    }, Nt.prototype.getContext = function() {
        return this.mContext;
    }, Nt.prototype.insert = function(t, e) {
        if (!t) return this.error('insert', 'kein Komponentenname'), -1;
        if (!e) return this.error('insert', 'kein Kontextname'), -1;
        var n = this.mContext.property;
        n[e] || (n[e] = []);
        try {
            for (var o = 0, i = n[e]; o < i.length; o++) if (i[o] === t) return 0;
            return n[e].push(t), 0;
        } catch (t) {
            return this.exception('insert', t), -1;
        }
    }, Nt.prototype.remove = function(t, e) {
        if (!t) return this.error('remove', 'kein Komponentenname'), -1;
        if (!e) return this.error('remove', 'kein Kontextname'), -1;
        var n = this.mContext.property;
        if (!n[e]) return 0;
        try {
            for (var o = [], i = 0, r = n[e]; i < r.length; i++) {
                var a = r[i];
                a && a !== t && o.push(a);
            }
            return 0 < o.length ? n[e] = o : delete n[e], 0;
        } catch (t) {
            return this.exception('remove', t), -1;
        }
    }, Nt);
    function Nt() {
        var t = yt.call(this, 'DialogContext') || this;
        return t.mContext = {
            property: {}
        }, t;
    }
    var _t, Ft = (F(Pt, _t = e.BaseComponent), Pt.prototype.getType = function() {
        return c;
    }, Pt.prototype.getClass = function() {
        return 'DialogBase';
    }, Pt.prototype.getVersion = function() {
        return l;
    }, Pt.prototype.getApiVersion = function() {
        return p;
    }, Pt.prototype.getServerVersion = function() {
        return '';
    }, Pt.prototype._setOption = function(t) {
        return t ? ('string' == typeof t.dialogName && this.setDialog(t.dialogName), 'string' == typeof t.dialogRootState && this.setDialogState(t.dialogRootState), 
        'boolean' == typeof t.dialogLoadFlag && (!0 === t.dialogLoadFlag ? this.mDialogLoadFlag = !0 : this.mDialogLoadFlag = !1), 
        'string' == typeof t.dialogFilePath && this.setDialogFilePath(t.dialogFilePath), 
        'string' == typeof t.dialogFileName && this.setDialogFileName(t.dialogFileName), 
        _t.prototype._setOption.call(this, t)) : -1;
    }, Pt.prototype._initLoadDialogFile = function() {
        return this.mDialogLoadFlag && 0 !== this.loadDialogFile() ? (this.error('init', 'Dialogdatei nicht geladen'), 
        this._clearInit(), -1) : 0;
    }, Pt.prototype.init = function(t) {
        return 0 !== _t.prototype.init.call(this, t) ? -1 : 0 !== this.connect() ? (this._clearInit(), 
        -1) : this._initLoadDialogFile();
    }, Pt.prototype._doneAllEvent = function() {
        this.mDialogParseEvent.clear(), this.mDialogSetEvent.clear(), this.mDialogStartEvent.clear(), 
        this.mDialogStopEvent.clear(), this.mDialogStateSetEvent.clear(), this.mDialogActionEvent.clear(), 
        this.mDialogActionStopEvent.clear(), this.mDialogSpeakEvent.clear(), this.mDialogSpeakStartEvent.clear(), 
        this.mDialogSpeakStopEvent.clear();
    }, Pt.prototype._doneAllAttribute = function() {
        this.mDialogContext.clear(), this.mReadFileFunc = null, this.mDialogFilePath = f, 
        this.mDialogFileName = S, this.mDialogLoadFlag = !1, this.mActivDialogFlag = !1;
    }, Pt.prototype.reset = function(t) {
        return this.isInit() ? (this.stop(), this.setActiveOn(), this.clearDialog(), this.mDialogContext.clear(), 
        this.setDialog(E), this.setDialogState(d), this.mDialogFilePath = f, this.mDialogFileName = S, 
        this.mDialogLoadFlag = !1, this.mActivDialogFlag = !1, this._setOption(t), this.mDialogLoadFlag && 0 !== this.loadDialogFile() ? (this.error('reset', 'Dialogdatei nicht geladen'), 
        -1) : 0) : (this.error('reset', 'Komponente nicht initialisiert'), -1);
    }, Pt.prototype.setErrorOutput = function(t) {
        _t.prototype.setErrorOutput.call(this, t), this.mDialogJsonEvent.setErrorOutput(t), 
        this.mDialogParseEvent.setErrorOutput(t), this.mDialogSetEvent.setErrorOutput(t), 
        this.mDialogStartEvent.setErrorOutput(t), this.mDialogStopEvent.setErrorOutput(t), 
        this.mDialogStateSetEvent.setErrorOutput(t), this.mDialogActionEvent.setErrorOutput(t), 
        this.mDialogActionStopEvent.setErrorOutput(t), this.mDialogSpeakEvent.setErrorOutput(t), 
        this.mDialogSpeakStartEvent.setErrorOutput(t), this.mDialogSpeakStopEvent.setErrorOutput(t), 
        this.mDialogContext.setErrorOutput(t);
    }, Pt.prototype.connect = function() {
        return 0;
    }, Pt.prototype.isConnect = function() {
        return !1;
    }, Pt.prototype.getNetType = function() {
        return '';
    }, Pt.prototype._onDialogJson = function() {
        return this.mDialogJsonEvent.dispatch();
    }, Pt.prototype._onDialogParse = function() {
        return this.mDialogParseEvent.dispatch();
    }, Pt.prototype._onDialogSet = function(t) {
        return this.mDialogSetEvent.dispatch(t);
    }, Pt.prototype._onDialogStart = function() {
        return this.mActivDialogFlag = !0, this.mDialogStartEvent.dispatch();
    }, Pt.prototype._onDialogStop = function() {
        return this._stop(), this.mDialogStopEvent.dispatch();
    }, Pt.prototype._onDialogStateSet = function(t) {
        return this.mDialogStateSetEvent.dispatch(t);
    }, Pt.prototype._onDialogAction = function(t) {
        return this.mDialogActionEvent.dispatch(t);
    }, Pt.prototype._onDialogActionStop = function() {
        return this.mDialogActionStopEvent.dispatch();
    }, Pt.prototype._onDialogSpeak = function(t) {
        return this.mDialogSpeakEvent.dispatch(t);
    }, Pt.prototype._onDialogSpeakStart = function() {
        return this.mDialogSpeakStartEvent.dispatch();
    }, Pt.prototype._onDialogSpeakStop = function() {
        return this._onDialogActionStop(), this.mDialogSpeakStopEvent.dispatch();
    }, Object.defineProperty(Pt.prototype, "onNetOpen", {
        get: function() {
            return function() {
                return 0;
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogJson", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogJson();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogParse", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogParse();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogSet", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onDialogSet(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogStateSet", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onDialogStateSet(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogAction", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onDialogAction(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogActionStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogActionStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogSpeak", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onDialogSpeak(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogSpeakStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogSpeakStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Pt.prototype, "onDialogSpeakStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onDialogSpeakStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Pt.prototype.addEventListener = function(t, e, n) {
        var o = 0;
        switch (e) {
          case i.SPEECH_DIALOGJSON_EVENT:
            o = this.mDialogJsonEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGPARSE_EVENT:
            o = this.mDialogParseEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSET_EVENT:
            o = this.mDialogSetEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSTART_EVENT:
            o = this.mDialogStartEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSTOP_EVENT:
            o = this.mDialogStopEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSTATESET_EVENT:
            o = this.mDialogStateSetEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGACTION_EVENT:
            o = this.mDialogActionEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGACTIONSTOP_EVENT:
            o = this.mDialogActionStopEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSPEAK_EVENT:
            o = this.mDialogSpeakEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSPEAKSTART_EVENT:
            o = this.mDialogSpeakStartEvent.addListener(t, n);
            break;

          case i.SPEECH_DIALOGSPEAKSTOP_EVENT:
            o = this.mDialogSpeakStopEvent.addListener(t, n);
            break;

          default:
            o = _t.prototype.addEventListener.call(this, t, e, n);
        }
        return o;
    }, Pt.prototype.removeEventListener = function(t, e) {
        var n = 0;
        switch (e) {
          case i.SPEECH_DIALOGJSON_EVENT:
            n = this.mDialogJsonEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGPARSE_EVENT:
            n = this.mDialogParseEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSET_EVENT:
            n = this.mDialogSetEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSTART_EVENT:
            n = this.mDialogStartEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSTOP_EVENT:
            n = this.mDialogStopEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSTATESET_EVENT:
            n = this.mDialogStateSetEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGACTION_EVENT:
            n = this.mDialogActionEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGACTIONSTOP_EVENT:
            n = this.mDialogActionStopEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSPEAK_EVENT:
            n = this.mDialogSpeakEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSPEAKSTART_EVENT:
            n = this.mDialogSpeakStartEvent.removeListener(t);
            break;

          case i.SPEECH_DIALOGSPEAKSTOP_EVENT:
            n = this.mDialogSpeakStopEvent.removeListener(t);
            break;

          default:
            n = _t.prototype.removeEventListener.call(this, t, e);
        }
        return n;
    }, Pt.prototype.addDialogJsonEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGJSON_EVENT, e);
    }, Pt.prototype.addDialogParseEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGPARSE_EVENT, e);
    }, Pt.prototype.addDialogSetEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSET_EVENT, e);
    }, Pt.prototype.addDialogStartEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSTART_EVENT, e);
    }, Pt.prototype.addDialogStopEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSTOP_EVENT, e);
    }, Pt.prototype.addDialogStateSetEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSTATESET_EVENT, e);
    }, Pt.prototype.addDialogActionEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGACTION_EVENT, e);
    }, Pt.prototype.addDialogActionStopEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGACTIONSTOP_EVENT, e);
    }, Pt.prototype.addDialogSpeakEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSPEAK_EVENT, e);
    }, Pt.prototype.addDialogSpeakStartEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSPEAKSTART_EVENT, e);
    }, Pt.prototype.addDialogSpeakStopEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_DIALOGSPEAKSTOP_EVENT, e);
    }, Pt.prototype.addErrorEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_ERROR_EVENT, e);
    }, Pt.prototype.removeDialogJsonEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGJSON_EVENT);
    }, Pt.prototype.removeDialogParseEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGPARSE_EVENT);
    }, Pt.prototype.removeDialogSetEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSET_EVENT);
    }, Pt.prototype.removeDialogStartEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSTART_EVENT);
    }, Pt.prototype.removeDialogStopEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSTOP_EVENT);
    }, Pt.prototype.removeDialogStateSetEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSTATESET_EVENT);
    }, Pt.prototype.removeDialogActionEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGACTION_EVENT);
    }, Pt.prototype.removeDialogActionStopEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGACTIONSTOP_EVENT);
    }, Pt.prototype.removeDialogSpeakEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSPEAK_EVENT);
    }, Pt.prototype.removeDialogSpeakStartEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSPEAKSTART_EVENT);
    }, Pt.prototype.removeDialogSpeakStopEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_DIALOGSPEAKSTOP_EVENT);
    }, Pt.prototype.removeErrorEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_ERROR_EVENT);
    }, Pt.prototype.removeAllEvent = function(t) {
        var e = _t.prototype.removeAllEvent.call(this, t);
        return 0 !== this.removeDialogJsonEvent(t) && (e = -1), 0 !== this.removeDialogParseEvent(t) && (e = -1), 
        0 !== this.removeDialogSetEvent(t) && (e = -1), 0 !== this.removeDialogStartEvent(t) && (e = -1), 
        0 !== this.removeDialogStopEvent(t) && (e = -1), 0 !== this.removeDialogStateSetEvent(t) && (e = -1), 
        0 !== this.removeDialogActionEvent(t) && (e = -1), 0 !== this.removeDialogActionStopEvent(t) && (e = -1), 
        0 !== this.removeDialogSpeakEvent(t) && (e = -1), 0 !== this.removeDialogSpeakStartEvent(t) && (e = -1), 
        0 !== this.removeDialogSpeakStopEvent(t) && (e = -1), e = 0 !== this.removeErrorEvent(t) ? -1 : e;
    }, Pt.prototype.setReadFileFunc = function(t) {
        return this.mReadFileFunc = t, 0;
    }, Pt.prototype.getWriteFileDataFunc = function() {
        var e = this;
        return function(t) {
            return e.writeDialogData(t);
        };
    }, Pt.prototype.setTransformJsonFileFunc = function(t) {
        return this.mTransformJsonFileFunc = t, 0;
    }, Pt.prototype.setTransformJsonDataFunc = function(t) {
        return this.mTransformJsonDataFunc = t, 0;
    }, Pt.prototype.setParseSpeechDefFileFunc = function(t) {
        return this.mParseSpeechDefFileFunc = t, 0;
    }, Pt.prototype.setParseSpeechDefDataFunc = function(t) {
        return this.mParseSpeechDefDataFunc = t, 0;
    }, Pt.prototype._stop = function() {
        this.mActivDialogFlag = !1, this._onDialogActionStop();
    }, Pt.prototype.transformJsonFile = function(t) {
        return this.isActive() ? 'function' == typeof this.mTransformJsonFileFunc ? this.mTransformJsonFileFunc(t) : -1 : (this.error('transformJsonFile', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.transformJsonData = function(t) {
        if (!this.isActive()) return this.error('transformJsonData', 'Komponente ist nicht aktiviert'), 
        -1;
        try {
            return 'function' != typeof this.mTransformJsonDataFunc ? (this.error('transformJsonData', 'keine JsonData funktion'), 
            -1) : this.mTransformJsonDataFunc(t);
        } catch (t) {
            return this.exception('transformJsonData', t), -1;
        }
    }, Pt.prototype.parseSpeechDefFile = function(t) {
        return this.isActive() ? 'function' == typeof this.mParseSpeechDefFileFunc ? this.mParseSpeechDefFileFunc(t) : -1 : (this.error('parseSpeechDefFile', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.parseSpeechDefData = function(t) {
        if (!this.isActive()) return this.error('parseSpeechDefData', 'Komponente ist nicht aktiviert'), 
        -1;
        try {
            return 'function' != typeof this.mParseSpeechDefDataFunc ? (this.error('parseSpeechDefData', 'keine ParseDefData funktion'), 
            -1) : this.mParseSpeechDefDataFunc(t);
        } catch (t) {
            return this.exception('parseSpeechDefData', t), -1;
        }
    }, Pt.prototype.setDialogFilePath = function(t) {
        return this.isActive() ? (this.mDialogFilePath = t, 0) : (this.error('setDialogFilePath', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.getDialogFilePath = function() {
        return this.mDialogFilePath;
    }, Pt.prototype.setDialogFileName = function(t) {
        return this.isActive() ? (this.mDialogFileName = t, 0) : (this.error('setDialogFileName', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.getDialogFileName = function() {
        return this.mDialogFileName;
    }, Pt.prototype.loadDialogFile = function(t) {
        if (!this.isActive()) return this.error('loadDialogFile', 'Komponente ist nicht aktiviert'), 
        -1;
        var e = this.mDialogFilePath + this.mDialogFileName;
        return t && (e = this.mDialogFilePath + t), 'function' != typeof this.mReadFileFunc ? (this.error('loadDialogFile', 'keine ReadFileFunc vorhanden'), 
        -1) : this.mReadFileFunc(e);
    }, Pt.prototype.writeDialogData = function(t) {
        return this.isActive() ? this.parseSpeechDefData(t) : (this.error('writeDialogData', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.isRunning = function() {
        return this.mActivDialogFlag;
    }, Pt.prototype.toggleDialog = function() {
        return this.isActive() ? this.isRunning() ? this.stop() : this.start() : (this.error('toggleDialog', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.clearDialog = function() {
        return 0;
    }, Pt.prototype.setDialog = function(t) {
        return 0;
    }, Pt.prototype.getDialog = function() {
        return '';
    }, Pt.prototype.start = function(t) {
        return this.mActivDialogFlag = !0, 0;
    }, Pt.prototype.stop = function() {
        return this._stop(), 0;
    }, Pt.prototype.setDialogState = function(t, e) {
        return 0;
    }, Pt.prototype.getDialogState = function() {
        return '';
    }, Pt.prototype.setDialogStateContext = function(t) {
        return 0;
    }, Pt.prototype.skipNextSpeak = function() {
        return 0;
    }, Pt.prototype.clearContext = function() {
        return this.isActive() ? (this.mDialogContext.clear(), 0) : (this.error('clearContext', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype._getContext = function() {
        return this.mDialogContext.getContext();
    }, Pt.prototype.addContextElement = function(t, e) {
        return this.isActive() ? 0 !== this.mDialogContext.insert(t, e) ? -1 : this.setDialogStateContext(this.mDialogContext.getContext()) : (this.error('addContextElement', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt.prototype.removeContextElement = function(t, e) {
        return this.isActive() ? 0 !== this.mDialogContext.remove(t, e) ? -1 : this.setDialogStateContext(this.mDialogContext.getContext()) : (this.error('removeContextElement', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Pt);
    function Pt(t, e) {
        e = _t.call(this, t, e = void 0 === e ? !0 : e) || this;
        return e.mDialogContext = new vt(), e.mTransformJsonFileFunc = null, e.mTransformJsonDataFunc = null, 
        e.mParseSpeechDefFileFunc = null, e.mParseSpeechDefDataFunc = null, e.mReadFileFunc = null, 
        e.mDialogJsonEvent = new i.EventFunctionList(i.SPEECH_DIALOGJSON_EVENT), e.mDialogParseEvent = new i.EventFunctionList(i.SPEECH_DIALOGPARSE_EVENT), 
        e.mDialogSetEvent = new i.EventFunctionList(i.SPEECH_DIALOGSET_EVENT), e.mDialogStartEvent = new i.EventFunctionList(i.SPEECH_DIALOGSTART_EVENT), 
        e.mDialogStopEvent = new i.EventFunctionList(i.SPEECH_DIALOGSTOP_EVENT), e.mDialogStateSetEvent = new i.EventFunctionList(i.SPEECH_DIALOGSTATESET_EVENT), 
        e.mDialogActionEvent = new i.EventFunctionList(i.SPEECH_DIALOGACTION_EVENT), e.mDialogActionStopEvent = new i.EventFunctionList(i.SPEECH_DIALOGACTIONSTOP_EVENT), 
        e.mDialogSpeakEvent = new i.EventFunctionList(i.SPEECH_DIALOGSPEAK_EVENT), e.mDialogSpeakStartEvent = new i.EventFunctionList(i.SPEECH_DIALOGSPEAKSTART_EVENT), 
        e.mDialogSpeakStopEvent = new i.EventFunctionList(i.SPEECH_DIALOGSPEAKSTOP_EVENT), 
        e.mDialogLoadFlag = !1, e.mDialogFilePath = f, e.mDialogFileName = S, e.mActivDialogFlag = !1, 
        e.mDialogContext.setErrorOutputFunc(e._getErrorOutputFunc()), e.mDialogJsonEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mDialogParseEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mDialogSetEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mDialogStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mDialogStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mDialogStateSetEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mDialogActionEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mDialogActionStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mDialogSpeakEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mDialogSpeakStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mDialogSpeakStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mDialogJsonEvent.setComponentName(t), e.mDialogParseEvent.setComponentName(t), 
        e.mDialogSetEvent.setComponentName(t), e.mDialogStartEvent.setComponentName(t), 
        e.mDialogStopEvent.setComponentName(t), e.mDialogStateSetEvent.setComponentName(t), 
        e.mDialogActionEvent.setComponentName(t), e.mDialogActionStopEvent.setComponentName(t), 
        e.mDialogSpeakEvent.setComponentName(t), e.mDialogSpeakStartEvent.setComponentName(t), 
        e.mDialogSpeakStopEvent.setComponentName(t), e;
    }
    var Ot, It = (F(Ct, Ot = Ft), Ct.prototype.init = function(t) {
        return this.isInit() ? (this.isErrorOutput() && console.log('DialogComponent.init: bereits initialisiert'), 
        0) : (this.mStore = this.findPlugin(k), this.mStore ? (this.mInterpreter = this.findPlugin(mt), 
        this.mInterpreter ? Ot.prototype.init.call(this, t) : -1) : -1);
    }, Ct.prototype.done = function() {
        return this.mInterpreter && (this.stop(), this.mInterpreter = null), Ot.prototype.done.call(this);
    }, Ct.prototype.clearDialog = function() {
        if (!this.isActive()) return this.error('clearDialog', 'Komponente ist nicht aktiviert'), 
        -1;
        try {
            return this.mStore.clear(), 0;
        } catch (t) {
            return this.exception('clearDialog', t), -1;
        }
    }, Ct.prototype.setDialog = function(t) {
        if (!this.isActive()) return this.error('setDialog', 'Komponente ist nicht aktiviert'), 
        -1;
        try {
            return this.mInterpreter.setDialog(t);
        } catch (t) {
            return this.exception('setDialog', t), -1;
        }
    }, Ct.prototype.getDialog = function() {
        try {
            return this.mInterpreter.getDialog();
        } catch (t) {
            return this.exception('getDialog', t), '';
        }
    }, Ct.prototype.isRunning = function() {
        return !!this.mInterpreter && this.mInterpreter.isDialogRunning();
    }, Ct.prototype.start = function(t) {
        return this.isActive() ? this.mInterpreter ? (Ot.prototype.start.call(this, t), 
        this.mInterpreter.startDialog()) : -1 : (this.error('start', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Ct.prototype.stop = function() {
        return this.isActive() ? this.mInterpreter ? (Ot.prototype.stop.call(this), this.mInterpreter.stopDialog()) : -1 : (this.error('stop', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Ct.prototype.setDialogState = function(t, e) {
        if (!this.isActive()) return this.error('setDialogState', 'Komponente ist nicht aktiviert'), 
        -1;
        try {
            return e = e || this._getContext(), this.mInterpreter.setState(t, e);
        } catch (t) {
            return this.exception('setDialogState', t), -1;
        }
    }, Ct.prototype.getDialogState = function() {
        try {
            return this.mInterpreter.getState();
        } catch (t) {
            return this.exception('getDialogState', t), '';
        }
    }, Ct.prototype.setDialogStateContext = function(t) {
        if (!this.isActive()) return this.error('setDialogStateContext', 'Komponente ist nicht aktiviert'), 
        -1;
        try {
            return this.mInterpreter.setStateContext(t);
        } catch (t) {
            return this.exception('setDialogStateContext', t), -1;
        }
    }, Ct.prototype.skipNextSpeak = function() {
        return this.isActive() ? this.mInterpreter ? 0 : -1 : (this.error('skipNextSpeak', 'Komponente ist nicht aktiviert'), 
        -1);
    }, Ct);
    function Ct(t, e) {
        e = Ot.call(this, (t = void 0 === t ? '' : t) || g, e = void 0 === e ? !0 : e) || this;
        return e.mStore = null, e.mInterpreter = null, e._setErrorClassName('DialogComponent'), 
        e;
    }
    var At, bt = (F(Lt, At = i.PluginFactory), Lt.prototype.getName = function() {
        return m;
    }, Lt.prototype.getType = function() {
        return c;
    }, Lt.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        try {
            return new It(t, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, Lt);
    function Lt() {
        return At.call(this, 'DialogComponentFactory') || this;
    }
    var kt, Tt = (F(xt, kt = i.Builder), xt.prototype.getClass = function() {
        return 'DialogComponentBuilder';
    }, xt.prototype.getType = function() {
        return c;
    }, xt.prototype.build = function(t) {
        var e = this._getComponentName(t) || g;
        if (e = this._findComponent(e)) return e;
        try {
            var e = this._buildComponent(t), n = this._getPlugin(s.FILEREADER_PLUGIN_NAME, s.FILEREADER_PLUGIN_NAME, s.FILEREADER_FACTORY_NAME, s.FileReaderFactory), o = this._getPlugin(k, k, L, M), i = this._getPlugin(Y, Y, U, tt), r = this._getPlugin(it, it, ot, ut), a = this._getPlugin(mt, mt, ct, Et);
            return 0 !== this._binder(e, n, o, i, r, a) ? (this.error('build', 'Komponenten nicht verbunden'), 
            null) : e;
        } catch (t) {
            return this.exception('build', t), null;
        }
    }, xt.prototype._buildComponent = function(t) {
        var e = this._getComponentName(t) || g, t = this._getComponentClass(t) || g;
        return this._getPlugin(e, t, m, bt);
    }, xt.prototype._binder = function(t, e, n, o, i, r) {
        return t ? e ? n ? o ? i ? r ? 0 !== t.insertPlugin(e.getName(), e) || 0 !== t.insertPlugin(n.getName(), n) || 0 !== t.insertPlugin(o.getName(), o) || 0 !== t.insertPlugin(i.getName(), i) || 0 !== t.insertPlugin(r.getName(), r) || 0 !== t.setReadFileFunc(e.getReadFunc()) ? -1 : (e.onRead = t.getWriteFileDataFunc(), 
        e.onError = t.onError, o.setNewDialogFunc(n.getNewDialogFunc()), o.setNewDialogStateFunc(n.getNewDialogStateFunc()), 
        i.setNewDialogFunc(n.getNewDialogFunc()), i.setNewDialogStateFunc(n.getNewDialogStateFunc()), 
        r.setGetDialogStateFunc(n.getGetDialogStateFunc()), r.onError = t.onError, t.setTransformJsonFileFunc(o.getTransformJsonFileFunc()), 
        t.setTransformJsonDataFunc(o.getTransformJsonDataFunc()), o.onJsonEnd = t.onDialogJson, 
        o.onError = t.onError, t.setParseSpeechDefFileFunc(i.getParseSpeechDefFileFunc()), 
        t.setParseSpeechDefDataFunc(i.getParseSpeechDefDataFunc()), i.onParserEnd = t.onDialogParse, 
        i.onError = t.onError, r.onDialogSet = t.onDialogSet, r.onDialogStart = t.onDialogStart, 
        r.onDialogStop = t.onDialogStop, r.onDialogStateSet = t.onDialogStateSet, r.onDialogAction = t.onDialogAction, 
        r.onDialogSpeak = t.onDialogSpeak, r.onDialogSpeakStart = t.onDialogSpeakStart, 
        r.onDialogSpeakStop = t.onDialogSpeakStop, r.onError = t.onError, 0) : (this.error('_binder', 'Interpreter nicht vorhanden'), 
        -1) : (this.error('_binder', 'Parser nicht vorhanden'), -1) : (this.error('_binder', 'Json nicht vorhanden'), 
        -1) : (this.error('_binder', 'Store nicht vorhanden'), -1) : (this.error('_binder', 'FileReader nicht vorhanden'), 
        -1) : (this.error('_binder', 'Dialog nicht vorhanden'), -1);
    }, xt);
    function xt(t, e) {
        return kt.call(this, t || c, e = void 0 === e ? !0 : e) || this;
    }
    var Gt, wt = (F(Rt, Gt = e.Base), Rt.prototype._getBuilderName = function() {
        return c;
    }, Rt.prototype.addDialogJsonEvent = function(t, e) {
        return this.mDialogComponent.addDialogJsonEvent(t, e);
    }, Rt.prototype.addDialogParseEvent = function(t, e) {
        return this.mDialogComponent.addDialogParseEvent(t, e);
    }, Rt.prototype.addDialogSetEvent = function(t, e) {
        return this.mDialogComponent.addDialogSetEvent(t, e);
    }, Rt.prototype.addDialogStartEvent = function(t, e) {
        return this.mDialogComponent.addDialogStartEvent(t, e);
    }, Rt.prototype.addDialogStopEvent = function(t, e) {
        return this.mDialogComponent.addDialogStopEvent(t, e);
    }, Rt.prototype.addDialogStateSetEvent = function(t, e) {
        return this.mDialogComponent.addDialogStateSetEvent(t, e);
    }, Rt.prototype.addDialogActionEvent = function(t, e) {
        return this.mDialogComponent.addDialogActionEvent(t, e);
    }, Rt.prototype.addDialogActionStopEvent = function(t, e) {
        return this.mDialogComponent.addDialogActionStopEvent(t, e);
    }, Rt.prototype.addDialogSpeakEvent = function(t, e) {
        return this.mDialogComponent.addDialogSpeakEvent(t, e);
    }, Rt.prototype.addDialogSpeakStartEvent = function(t, e) {
        return this.mDialogComponent.addDialogSpeakStartEvent(t, e);
    }, Rt.prototype.addDialogSpeakStopEvent = function(t, e) {
        return this.mDialogComponent.addDialogSpeakStopEvent(t, e);
    }, Rt.prototype.addErrorEvent = function(t, e) {
        return this.mDialogComponent.addErrorEvent(t, e);
    }, Rt.prototype.removeDialogJsonEvent = function(t) {
        return this.mDialogComponent.removeDialogJsonEvent(t);
    }, Rt.prototype.removeDialogParseEvent = function(t) {
        return this.mDialogComponent.removeDialogParseEvent(t);
    }, Rt.prototype.removeDialogSetEvent = function(t) {
        return this.mDialogComponent.removeDialogSetEvent(t);
    }, Rt.prototype.removeDialogStartEvent = function(t) {
        return this.mDialogComponent.removeDialogStartEvent(t);
    }, Rt.prototype.removeDialogStopEvent = function(t) {
        return this.mDialogComponent.removeDialogStopEvent(t);
    }, Rt.prototype.removeDialogStateSetEvent = function(t) {
        return this.mDialogComponent.removeDialogStateSetEvent(t);
    }, Rt.prototype.removeDialogActionEvent = function(t) {
        return this.mDialogComponent.removeDialogActionEvent(t);
    }, Rt.prototype.removeDialogActionStopEvent = function(t) {
        return this.mDialogComponent.removeDialogActionStopEvent(t);
    }, Rt.prototype.removeDialogSpeakEvent = function(t) {
        return this.mDialogComponent.removeDialogSpeakEvent(t);
    }, Rt.prototype.removeDialogSpeakStartEvent = function(t) {
        return this.mDialogComponent.removeDialogSpeakStartEvent(t);
    }, Rt.prototype.removeDialogSpeakStopEvent = function(t) {
        return this.mDialogComponent.removeDialogSpeakStopEvent(t);
    }, Rt.prototype.removeErrorEvent = function(t) {
        return this.mDialogComponent.removeErrorEvent(t);
    }, Rt.prototype.removeAllEvent = function(t) {
        return this.mDialogComponent.removeAllEvent(t);
    }, Rt.prototype.transformJsonFile = function(t) {
        return this.mDialogComponent.transformJsonFile(t);
    }, Rt.prototype.transformJsonData = function(t) {
        return this.mDialogComponent.transformJsonData(t);
    }, Rt.prototype.import = function(t) {
        return this.transformJsonData(t);
    }, Rt.prototype.parseSpeechDefFile = function(t) {
        return this.mDialogComponent.parseSpeechDefFile(t);
    }, Rt.prototype.parseSpeechDefData = function(t) {
        return this.mDialogComponent.parseSpeechDefData(t);
    }, Rt.prototype.clearDialog = function() {
        return this.mDialogComponent.clearDialog();
    }, Rt.prototype.setDialog = function(t) {
        return this.mDialogComponent.setDialog(t);
    }, Rt.prototype.getDialog = function() {
        return this.mDialogComponent.getDialog();
    }, Rt.prototype.toggleDialog = function() {
        return this.mDialogComponent.toggleDialog();
    }, Rt.prototype.toggle = function() {
        return this.toggleDialog();
    }, Rt.prototype.setDialogFilePath = function(t) {
        return this.mDialogComponent.setDialogFilePath(t);
    }, Rt.prototype.getDialogFilePath = function() {
        return this.mDialogComponent.getDialogFilePath();
    }, Rt.prototype.setPath = function(t) {
        return this.setDialogFilePath(t);
    }, Rt.prototype.getPath = function() {
        return this.getDialogFilePath();
    }, Rt.prototype.setDialogFileName = function(t) {
        return this.mDialogComponent.setDialogFileName(t);
    }, Rt.prototype.getDialogFileName = function() {
        return this.mDialogComponent.getDialogFileName();
    }, Rt.prototype.setFile = function(t) {
        return this.setDialogFileName(t);
    }, Rt.prototype.getFile = function() {
        return this.getDialogFileName();
    }, Rt.prototype.loadDialogFile = function(t) {
        return this.mDialogComponent.loadDialogFile(t);
    }, Rt.prototype.writeDialogData = function(t) {
        return this.mDialogComponent.writeDialogData(t);
    }, Rt.prototype.parse = function(t) {
        return this.writeDialogData(t);
    }, Rt.prototype.parseFile = function(t) {
        return this.loadDialogFile(t);
    }, Rt.prototype.skipNextSpeak = function() {
        return this.mDialogComponent.skipNextSpeak();
    }, Rt.prototype.setDialogState = function(t, e) {
        return this.mDialogComponent.setDialogState(t, e);
    }, Rt.prototype.getDialogState = function() {
        return this.mDialogComponent.getDialogState();
    }, Rt.prototype.setState = function(t) {
        return this.setDialogState(t);
    }, Rt.prototype.getState = function() {
        return this.getDialogState();
    }, Rt.prototype.setDialogStateContext = function(t) {
        return this.mDialogComponent.setDialogStateContext(t);
    }, Rt.prototype.setStateContext = function(t) {
        return this.setDialogStateContext(t);
    }, Rt.prototype.clearContext = function() {
        return this.mDialogComponent.clearContext();
    }, Rt.prototype.addContextElement = function(t, e) {
        return this.mDialogComponent.addContextElement(t, e);
    }, Rt.prototype.removeContextElement = function(t, e) {
        return this.mDialogComponent.removeContextElement(t, e);
    }, Rt);
    function Rt(t) {
        t = Gt.call(this, t) || this;
        return t.mDialogComponent = t.mComponent, t;
    }
    var Jt = (jt.create = function(t, e) {
        try {
            return i.SystemManager.findBuilder(c) || 0 === i.SystemManager.insertBuilder(c, new Tt('', !1)) ? new wt(e) : (console.log('DialogFactory.create: kein Builder eingetragen'), 
            null);
        } catch (t) {
            return console.log('DialogFactory.create: Exception', t), null;
        }
    }, jt);
    function jt() {}
    var Kt, Ft = {
        activeFlag: !0,
        dialogName: 'main',
        dialogRootState: 'home',
        dialogLoadFlag: !0,
        dialogFilePath: 'assets/',
        dialogFileName: 'speech.def',
        errorOutputFlag: !1
    }, Vt = !1, e = (F(Ht, Kt = n.Service), Ht.isConstructorInit = function() {
        return Ht.constructorInitFlag;
    }, Ht.setConstructorInitOn = function() {
        Ht.constructorInitFlag = !0;
    }, Ht.setConstructorInitOff = function() {
        Ht.constructorInitFlag = !1;
    }, Ht.getConfig = function() {
        return Ht.dialogServiceConfig;
    }, Ht.prototype._setOption = function(t) {
        return 0 !== Kt.prototype._setOption.call(this, t) ? -1 : ('string' == typeof t.dialogName && (this.dialog = t.dialogName), 
        'string' == typeof t.dialogRootState && (this.state = t.dialogRootState), 'string' == typeof t.dialogFilePath && (this.path = t.dialogFilePath), 
        'string' == typeof t.dialogFileName && (this.file = t.dialogFileName), 0);
    }, Ht.prototype._createComponent = function(t, e) {
        return this.mDialog = Jt.create(t, e), this.mDialog;
    }, Ht.prototype.init = function(t) {
        return Kt.prototype.init.call(this, t);
    }, Ht.prototype.reset = function(t) {
        return Kt.prototype.reset.call(this, t);
    }, Ht.prototype._addAllEvent = function(t) {
        var e = this;
        return 0 !== Kt.prototype._addAllEvent.call(this, t) ? -1 : (this.mDialog.addDialogSetEvent(t, function(t) {
            return e.mDialogSetEvent.emit(t), 0;
        }), this.mDialog.addDialogJsonEvent(t, function() {
            return e.mDialogImportEvent.emit(), 0;
        }), this.mDialog.addDialogParseEvent(t, function() {
            return e.mDialogParseEvent.emit(), 0;
        }), this.mDialog.addDialogStartEvent(t, function() {
            return e.mDialogStartEvent.emit(), 0;
        }), this.mDialog.addDialogStopEvent(t, function() {
            return e.mDialogStopEvent.emit(), 0;
        }), this.mDialog.addDialogStateSetEvent(t, function(t) {
            return e.mDialogStateSetEvent.emit(t), 0;
        }), this.mDialog.addDialogActionEvent(t, function(t) {
            t = {
                event: '',
                state: t.state,
                action: t.action,
                type: t.type,
                id: t.id
            };
            return e.mDialogActionEvent.emit(t), 0;
        }), this.mDialog.addDialogActionStopEvent(t, function() {
            return e.mDialogActionStopEvent.emit(), 0;
        }), this.mDialog.addDialogSpeakEvent(t, function(t) {
            t = {
                event: t.event,
                state: t.state,
                id: t.id,
                text: t.text,
                timeout: t.timeout
            };
            return e.mDialogSpeakEvent.emit(t), 0;
        }), this.mDialog.addDialogSpeakStopEvent(t, function() {
            return e.mDialogSpeakStopEvent.emit(), 0;
        }), 0);
    }, Object.defineProperty(Ht.prototype, "setDialogEvent", {
        get: function() {
            return this.mDialogSetEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "importEvent", {
        get: function() {
            return this.mDialogImportEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "parseEvent", {
        get: function() {
            return this.mDialogParseEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "startEvent", {
        get: function() {
            return this.mDialogStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "stopEvent", {
        get: function() {
            return this.mDialogStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "setStateEvent", {
        get: function() {
            return this.mDialogStateSetEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "actionEvent", {
        get: function() {
            return this.mDialogActionEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "actionStopEvent", {
        get: function() {
            return this.mDialogActionStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "speakEvent", {
        get: function() {
            return this.mDialogSpeakEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Ht.prototype, "speakStopEvent", {
        get: function() {
            return this.mDialogSpeakStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Ht.prototype.setPath = function(t) {
        return this.mDialog ? this.mDialog.setDialogFilePath(t) : (this._error('setPath', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.getPath = function() {
        return this.mDialog ? this.mDialog.getDialogFilePath() : (this._error('getPath', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Ht.prototype, "path", {
        get: function() {
            return this.getPath();
        },
        set: function(t) {
            this.setPath(t);
        },
        enumerable: !1,
        configurable: !0
    }), Ht.prototype.setFile = function(t) {
        return this.mDialog ? this.mDialog.setDialogFileName(t) : (this._error('setFile', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.getFile = function() {
        return this.mDialog ? this.mDialog.getDialogFileName() : (this._error('getFile', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Ht.prototype, "file", {
        get: function() {
            return this.getFile();
        },
        set: function(t) {
            this.setFile(t);
        },
        enumerable: !1,
        configurable: !0
    }), Ht.prototype.clearDialog = function() {
        return this.mDialog ? this.mDialog.clearDialog() : (this._error('clearDialog', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.setDialog = function(t) {
        return this.mDialog ? this.mDialog.setDialog(t) : (this._error('setDialog', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.getDialog = function() {
        return this.mDialog ? this.mDialog.getDialog() : (this._error('getDialog', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Ht.prototype, "dialog", {
        get: function() {
            return this.getDialog();
        },
        set: function(t) {
            this.setDialog(t);
        },
        enumerable: !1,
        configurable: !0
    }), Ht.prototype.import = function(t) {
        return this.mDialog ? this.mDialog.transformJsonData(t) : (this._error('parse', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.parse = function(t) {
        return this.mDialog ? this.mDialog.writeDialogData(t) : (this._error('parse', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.parseFile = function(t) {
        return this.mDialog ? this.mDialog.loadDialogFile(t) : (this._error('parseFile', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.toggle = function() {
        return this.mDialog ? this.mDialog.toggleDialog() : (this._error('toggle', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.setState = function(t) {
        return this.mDialog ? this.mDialog.setDialogState(t) : (this._error('setState', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.getState = function() {
        return this.mDialog ? this.mDialog.getDialogState() : (this._error('getState', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Ht.prototype, "state", {
        get: function() {
            return this.getState();
        },
        set: function(t) {
            this.setState(t);
        },
        enumerable: !1,
        configurable: !0
    }), Ht.prototype.setStateContext = function(t) {
        return this.mDialog ? this.mDialog.setDialogStateContext(t) : (this._error('setStateContext', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Object.defineProperty(Ht.prototype, "context", {
        set: function(t) {
            this.setStateContext(t);
        },
        enumerable: !1,
        configurable: !0
    }), Ht.prototype.clearContext = function() {
        return this.mDialog ? this.mDialog.clearContext() : (this._error('clearContext', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.addContextElement = function(t, e) {
        return this.mDialog ? this.mDialog.addContextElement(t, e) : (this._error('addContextElement', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.prototype.removeContextElement = function(t, e) {
        return this.mDialog ? this.mDialog.removeContextElement(t, e) : (this._error('removeContextElement', 'keine Dialog-Komponente vorhanden'), 
        -1);
    }, Ht.dialogServiceConfig = Ft, Ht.constructorInitFlag = !0, Ht);
    function Ht() {
        var t = Kt.call(this, g, D, p) || this;
        if (t.mDialog = null, t.mDialogSetEvent = new n.EventEmitter(Vt), t.mDialogImportEvent = new n.EventEmitter(Vt), 
        t.mDialogParseEvent = new n.EventEmitter(Vt), t.mDialogStartEvent = new n.EventEmitter(Vt), 
        t.mDialogStopEvent = new n.EventEmitter(Vt), t.mDialogStateSetEvent = new n.EventEmitter(Vt), 
        t.mDialogActionEvent = new n.EventEmitter(Vt), t.mDialogActionStopEvent = new n.EventEmitter(Vt), 
        t.mDialogSpeakEvent = new n.EventEmitter(Vt), t.mDialogSpeakStopEvent = new n.EventEmitter(Vt), 
        Ht.isConstructorInit() && 0 !== t.init(Ht.getConfig())) throw new Error('Dialog nicht initialisiert');
        return 0 !== n.ServiceManager.insert(t) && console.log('DialogService: wurde nicht in ServiceManager eingetragen'), 
        t;
    }
    t.DIALOG_ACTION_COMMAND = y, t.DIALOG_ACTION_NODE = I, t.DIALOG_API_VERSION = p, 
    t.DIALOG_ASYNC_EVENT = !1, t.DIALOG_BUILDER_NAME = 'DialogBuilder', t.DIALOG_COMPONENTBUILDER_NAME = 'DialogComponentBuilder', 
    t.DIALOG_COMPONENTFACTORY_NAME = m, t.DIALOG_COMPONENT_NAME = g, t.DIALOG_DIALOGFILE_NAME = "speech.def", 
    t.DIALOG_FACTORY_NAME = 'DialogFactory', t.DIALOG_FILE_NAME = S, t.DIALOG_GROUP_NODE = O, 
    t.DIALOG_LOAD_FLAG = !1, t.DIALOG_MAIN_NAME = E, t.DIALOG_MOCK_NAME = 'DialogMock', 
    t.DIALOG_PATH_NAME = f, t.DIALOG_PLUGIN_NAME = "DialogProxy", t.DIALOG_PROXYBUILDER_NAME = 'DialogProxyBuilder', 
    t.DIALOG_PROXYFACTORY_NAME = 'DialogProxyFactory', t.DIALOG_PROXY_NAME = h, t.DIALOG_ROOTSTATE_NAME = d, 
    t.DIALOG_SERVERBUILDER_NAME = 'DialogServerBuilder', t.DIALOG_SERVICEMOCK_NAME = 'DialogServiceMock', 
    t.DIALOG_SERVICE_NAME = D, t.DIALOG_SPEAK_COMMAND = v, t.DIALOG_SPEAK_NODE = C, 
    t.DIALOG_TYPE_NAME = c, t.DIALOG_VERSION_BUILD = r, t.DIALOG_VERSION_DATE = u, t.DIALOG_VERSION_NUMBER = o, 
    t.DIALOG_VERSION_STRING = l, t.DIALOG_VERSION_TYPE = a, t.DIALOG_WAIT_COMMAND = N, 
    t.DIALOG_WAIT_NODE = A, t.Dialog = wt, t.DialogComponent = It, t.DialogComponentBuilder = Tt, 
    t.DialogComponentFactory = bt, t.DialogFactory = Jt, t.DialogService = e, t.DialogServiceConfig = Ft, 
    Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
