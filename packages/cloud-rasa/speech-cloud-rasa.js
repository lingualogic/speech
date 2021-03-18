/**
 * Speech-Cloud-Rasa Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? n(exports, require('@speech/core'), require('@speech/common')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common' ], n) : n((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechCloudRasa = {}, t.speechCore, t.speechCommon);
}(this, function(t, i, e) {
    'use strict';
    var n = '0.2.1', r = '0005', o = 'ALPHA', a = '26.10.2020', s = n + '.' + r + ' vom ' + a + ' (' + o + ')', u = s, l = 'CloudRasa', p = 'CloudRasaPort', c = 'CloudRasaMock', h = 'http://localhost:5005', f = h, g = 'NLU', m = 'assets/', d = 'cloud-rasa.json', C = 'de-DE', R = C, y = function(t, n) {
        return (y = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, n) {
            t.__proto__ = n;
        } || function(t, n) {
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        })(t, n);
    };
    function _(t, n) {
        function r() {
            this.constructor = t;
        }
        y(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
        new r());
    }
    var O, A = (_(E, O = i.ErrorBase), E.prototype._setOption = function(t) {
        t && ('string' == typeof t.rasaConfigPath && (this.mConfigPath = t.rasaConfigPath), 
        'string' == typeof t.rasaConfigFile && (this.mConfigFile = t.rasaConfigFile), 'boolean' == typeof t.rasaConfigLoadFlag && (this.mConfigLoadFlag = t.rasaConfigLoadFlag), 
        'string' == typeof t.rasaServerUrl && (this.mConfigServerUrl = t.rasaServerUrl), 
        'string' == typeof t.rasaAppId && (this.mConfigAppId = t.rasaAppId), 'string' == typeof t.rasaAppKey && (this.mConfigAppKey = t.rasaAppKey), 
        'string' == typeof t.rasaUserId && (this.mConfigUserId = t.rasaUserId), 'string' == typeof t.rasaNluTag && (this.mConfigNluTag = t.rasaNluTag), 
        'string' == typeof t.rasaNluTag && (this.mConfigNluTag = t.rasaNluTag));
    }, E.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, E.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = m, this.mConfigFile = d, this.mConfigLoadFlag = !1, 
        this.mConfigServerUrl = f, this.mConfigAppId = '', this.mConfigAppKey = '', this.mConfigUserId = '', 
        this.mConfigNluTag = '', this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, E.prototype.isInit = function() {
        return this.mInitFlag;
    }, E.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, E.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION AmazonConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(E.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(E.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), E.prototype._readConfigData = function(t) {
        if (!t) return this.error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var n = JSON.parse(t);
            return n.URL && (this.serverUrl = n.URL), n.APP_ID && (this.appId = n.APP_ID), n.APP_KEY && (this.appKey = n.APP_KEY), 
            n.USER_ID && (this.userId = n.USER_ID), n.NLU_TAG && (this.nluTag = n.NLU_TAG), 
            this._onInit(0), 0;
        } catch (t) {
            return this.exception('_readConfigData', t), -1;
        }
    }, E.prototype._readError = function(t) {
        this.error('_readError', t), this._onInit(-1);
    }, E.prototype.read = function() {
        if (!this.mFileReader) return this.error('read', 'kein FileReader vorhanden'), this._onInit(-1), 
        -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(E.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(E.prototype, "appId", {
        get: function() {
            return this.mConfigAppId;
        },
        set: function(t) {
            this.mConfigAppId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(E.prototype, "appKey", {
        get: function() {
            return this.mConfigAppKey;
        },
        set: function(t) {
            this.mConfigAppKey = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(E.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(E.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !1,
        configurable: !0
    }), E.prototype.isCredentials = function() {
        return !!this.mConfigAppKey;
    }, E);
    function E(t) {
        var n = O.call(this, 'CloudRasaConfig') || this;
        return n.mInitFlag = !1, n.mConfigPath = m, n.mConfigFile = d, n.mConfigLoadFlag = !1, 
        n.mConfigServerUrl = f, n.mConfigAppId = '', n.mConfigAppKey = '', n.mConfigUserId = '', 
        n.mConfigNluTag = '', n.mFileReader = null, n.mOnInitFunc = null, n.mOnErrorFunc = null, 
        n.mFileReader = t, n.setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), n;
    }
    var T, v = (_(F, T = i.ErrorBase), F.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, F.prototype.connect = function() {
        return this.isConnect() || (this.mConnectFlag = !0), 0;
    }, F.prototype.disconnect = function() {
        return this.mConnectFlag = !1, 0;
    }, F);
    function F(t) {
        var n = T.call(this, 'CloudRasaConnect') || this;
        return n.mConfig = null, n.mConnectFlag = !1, n.mConfig = t, n;
    }
    var N, U = (_(P, N = e.NetHtml5Connect), P);
    function P() {
        return N.call(this, 'CloudRasaNetwork') || this;
    }
    var L, k = (_(S, L = i.ErrorBase), S.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, S.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, S.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, S.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, S.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, S.prototype._start = function(t) {}, S.prototype._stop = function() {}, S.prototype.start = function(t, n) {
        if (!t) return this.error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this.error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return this._start(n), 0;
        } catch (t) {
            return this.exception('start', t), -1;
        }
    }, S.prototype.stop = function(t) {
        if (!t) return this.error('stop', 'keine Transaktion uebergeben'), -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion gestartet'), 
        -1;
        if (this.mTransaction.transactionId !== t.transactionId) return this.error('stop', 'Transaktions-ID stimmt nicht ueberein'), 
        -1;
        try {
            return this._stop(), this._onStop(), 0;
        } catch (t) {
            return this.exception('stop', t), -1;
        }
    }, S.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, S.prototype.getTransaction = function() {
        return this.mTransaction;
    }, S.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, S);
    function S(t, n, r) {
        t = L.call(this, t || 'CloudRasaDevice') || this;
        return t.mConfig = null, t.mConnect = null, t.mTransaction = null, t.onStart = null, 
        t.onStop = null, t.onResult = null, t.onError = null, t.onClose = null, t.mConfig = n, 
        t.mConnect = r, t;
    }
    var I, b = (_(M, I = k), M.prototype._sendToNLU = function(t) {
        var n = this;
        console.log('_sendToNLU:', t);
        try {
            var r = this.mConfig.serverUrl + '/model/parse?token=' + this.mConfig.appKey;
            console.log('_sendToNLU.url:', r);
            var e = new XMLHttpRequest();
            e.open('POST', r), e.setRequestHeader('Accept', '*/*'), e.setRequestHeader('cache-control', 'no-cache'), 
            e.setRequestHeader('Content-Type', 'text/plain'), e.onload = function() {
                console.log('Response:', e.response);
                try {
                    n._onResult(JSON.parse(e.response));
                } catch (t) {
                    n.exception('_sendToNLU', t);
                }
                n._onStop();
            }, e.onerror = function(t) {
                console.log('_sendToNLU.error:', e), n.error('_sendToNLU', 'Fehler aufgetreten'), 
                n._onStop();
            };
            var o = "{ \"text\": \"" + t + "\" }";
            return e.send(o), 0;
        } catch (t) {
            return this.exception('_sendToNLU', t), -1;
        }
    }, M.prototype._start = function(t) {
        console.log('CloudRasaNLU._startNLU:', t);
        try {
            if (!this.mConfig.appKey) return void this.error('_start', 'kein AppKey vorhanden');
            this._sendToNLU(t.text);
        } catch (t) {
            this.exception('_start', t);
        }
    }, M.prototype._stop = function() {
        console.log('CloudRasaNLU._stop');
    }, M);
    function M(t, n) {
        return I.call(this, 'CloudRasaNLU', t, n) || this;
    }
    var K, D = (_(w, K = i.Port), w.prototype.isServer = function() {
        return this.mCloudRasaServerFlag;
    }, w.prototype.isMock = function() {
        return !1;
    }, w.prototype.getType = function() {
        return l;
    }, w.prototype.getClass = function() {
        return 'CloudRasaPort';
    }, w.prototype.getVersion = function() {
        return u;
    }, w.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.rasaAppKey && !!t.rasaAppKey);
    }, w.prototype._initAllObject = function(t) {
        var n = this, r = new e.FileHtml5Reader();
        return r.init(), this.mCloudRasaConfig = new A(r), 0 !== this.mCloudRasaConfig.init(t) ? -1 : (this.mCloudRasaNetwork = new U(), 
        this.mCloudRasaNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mCloudRasaNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mCloudRasaNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mCloudRasaNetwork.init(t) ? -1 : (this.mCloudRasaConnect = new v(this.mCloudRasaConfig), 
        this.mCloudRasaNLU = new b(this.mCloudRasaConfig, this.mCloudRasaConnect), this.mCloudRasaNLU.onStart = function(t) {
            return n._onStart(t.plugin, t.type);
        }, this.mCloudRasaNLU.onStop = function(t) {
            return n._onStop(t.plugin, t.type);
        }, this.mCloudRasaNLU.onResult = function(t) {
            return n._onResult(t.result, t.plugin, t.type);
        }, this.mCloudRasaNLU.onError = function(t) {
            return n._onError(t.error, t.plugin, t.type);
        }, this.mCloudRasaNLU.onClose = function(t) {
            return n._onClose();
        }, 0));
    }, w.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.isInit()) return this.error('init', 'Port ist bereits initialisiert'), 0;
        if (t && 'boolean' == typeof t.rasaDynamicCredentialsFlag && t.rasaDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(t)) return this.error('init', 'kein AppKey als Parameter uebergeben'), 
        -1;
        return t && 'boolean' == typeof t.rasaServerFlag && t.rasaServerFlag && (this.mCloudRasaServerFlag = !0), 
        0 !== this._initAllObject(t) || 0 !== K.prototype.init.call(this, t) ? -1 : (this.isErrorOutput() && (this.mCloudRasaNLU ? console.log('CloudRasaPort: NLU ist vorhanden') : console.log('CloudRasaPort: NLU ist nicht vorhanden')), 
        0);
    }, w.prototype.done = function() {
        return K.prototype.done.call(this), this._clearActionTimeout(), this.mCloudRasaConnect && (this.mCloudRasaConnect.disconnect(), 
        this.mCloudRasaConnect = null), this.mCloudRasaNetwork && (this.mCloudRasaNetwork.done(), 
        this.mCloudRasaNetwork = null), this.mCloudRasaConfig && (this.mCloudRasaConfig.done(), 
        this.mCloudRasaConfig = null), this.mCloudRasaNLU = null, this.mCloudRasaServerFlag = !1, 
        this.mDynamicCredentialsFlag = !1, this.mTransaction = null, this.mRunningFlag = !1, 
        this.mDefaultOptions = null, this.mActionTimeoutId = 0, this.mActionTimeout = 6e4, 
        0;
    }, w.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, K.prototype.reset.call(this, t);
    }, w.prototype.setErrorOutput = function(t) {
        K.prototype.setErrorOutput.call(this, t), this.mCloudRasaConfig && this.mCloudRasaConfig.setErrorOutput(t), 
        this.mCloudRasaNetwork && this.mCloudRasaNetwork.setErrorOutput(t), this.mCloudRasaConnect && this.mCloudRasaConnect.setErrorOutput(t), 
        this.mCloudRasaNLU && this.mCloudRasaNLU.setErrorOutput(t);
    }, w.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this.error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, w.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && 0 < this.mActionTimeout && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, w.prototype._clearActionTimeout = function() {
        0 < this.mActionTimeoutId && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, w.prototype._onOnline = function() {
        return 0;
    }, w.prototype._onOffline = function() {
        return this.close(), 0;
    }, w.prototype._onStop = function(t, n) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        this.mCloudRasaConnect && this.mCloudRasaConnect.disconnect(), K.prototype._onStop.call(this, t, n);
    }, w.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.rasaServerUrl && t.rasaServerUrl && (this.mCloudRasaConfig.serverUrl = t.rasaServerUrl), 
            'string' == typeof t.rasaAppKey && t.rasaAppKey && (this.mCloudRasaConfig.appKey = t.rasaAppKey), 
            0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, w.prototype.getConfig = function() {
        return {
            rasaServerUrl: this.mCloudRasaConfig.serverUrl,
            rasaAppKey: this.mCloudRasaConfig.appKey
        };
    }, w.prototype.isOnline = function() {
        return !!this.mCloudRasaNetwork && this.mCloudRasaNetwork.isOnline();
    }, w.prototype.isOpen = function() {
        return !!this.mCloudRasaConnect && this.mCloudRasaConnect.isConnect();
    }, w.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this.error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var n = this.open();
        return t(0 === n), n;
    }, w.prototype.open = function(t) {
        if (!this.mCloudRasaConnect) return this.error('open', 'kein CloudRasaConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var n = this.mCloudRasaConnect.connect();
        return 0 === n && this._onOpen(), n;
    }, w.prototype.close = function() {
        return this.isOpen() && this.mCloudRasaConnect ? (this._onClose(), this.mCloudRasaConnect.disconnect()) : 0;
    }, w.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, w.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, w.prototype.isRunning = function(t, n) {
        if (!t && !n) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!n) return this.mRunningFlag;
            if (n === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, w.prototype.isAction = function(t) {
        var n = !1;
        return n = t === g ? !!this.mCloudRasaNLU : n;
    }, w.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, w.prototype.start = function(n, r, e) {
        var o = this;
        return this.isRunning() ? (this.error('start', 'Aktion laeuft bereits'), -1) : this.mCloudRasaConfig.isCredentials() ? this.mTransaction ? (this.error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(t) {
            if (!t) return -1;
            o._setActionTimeout();
            t = e || {};
            o.mPluginName = n, o.mRunningFlag = !0;
            return r === g ? (o.mTransaction = new i.PortTransaction(n, g), o._startNLU(o.mTransaction, t.text, t.language || R)) : (o._clearActionTimeout(), 
            o.error('start', 'Keine gueltige Aktion uebergeben ' + r), -1);
        }) : (this.error('start', 'Port hat keine Credentials'), -1);
    }, w.prototype.stop = function(t, n, r) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this.error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mCloudRasaConfig.isCredentials()) return this.error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this.error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this.error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        t = 0, t = n === g ? this._stopNLU(this.mTransaction) : (this.error('stop', 'Keine gueltige Aktion uebergeben ' + n), 
        -1);
        return this.mRunningFlag = !1, t;
    }, w.prototype._startNLU = function(t, n, r) {
        if (!n) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!r) return this.error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mCloudRasaNLU) return this.error('_startNLU', 'keine CloudRasa NLU-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                text: n,
                language: r
            };
            return this.mCloudRasaNLU.start(t, e);
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
        return -1;
    }, w.prototype._stopNLU = function(t) {
        if (!this.mCloudRasaNLU) return this.error('_stopNLU', 'keine CloudRasa NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudRasaNLU.stop(t);
        } catch (t) {
            return this.exception('_stopNLU', t), -1;
        }
        return -1;
    }, w);
    function w(t, n) {
        n = K.call(this, t || p, n = void 0 === n ? !0 : n) || this;
        return n.mCloudRasaServerFlag = !1, n.mCloudRasaConfig = null, n.mCloudRasaNetwork = null, 
        n.mCloudRasaConnect = null, n.mCloudRasaNLU = null, n.mDynamicCredentialsFlag = !1, 
        n.mTransaction = null, n.mRunningFlag = !1, n.mDefaultOptions = null, n.mActionTimeoutId = 0, 
        n.mActionTimeout = 6e4, n;
    }
    var x, j = (_(G, x = i.Port), G.prototype.isMock = function() {
        return !0;
    }, G.prototype.getType = function() {
        return l;
    }, G.prototype.getClass = function() {
        return 'CloudRasaMock';
    }, G.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.rasaAppKey && (this.rasaAppKey = t.rasaAppKey), 
        'string' == typeof t.rasaAppKey && !!t.rasaAppKey);
    }, G.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.mInitFlag) return this.error('init', 'Init bereits aufgerufen'), 0;
        if (t && 'boolean' == typeof t.rasaDynamicCredentialsFlag && t.rasaDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(t); else if (!this._checkCredentials(t)) return (this.isErrorOutput() || t && t.errorOutputFlag) && this.error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.rasaNLUFlag = !0, this.isErrorOutput() && (this.rasaNLUFlag ? console.log('CloudRasaMock: NLU ist vorhanden') : console.log('CloudRasaMock: NLU ist nicht vorhanden')), 
        this._onInit(0), x.prototype.init.call(this, t);
    }, G.prototype.done = function(t) {
        return x.prototype.done.call(this), this.rasaNLUFlag = !1, this.disconnectFlag = !0, 
        this.defaultOptions = null, this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 
        0;
    }, G.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, x.prototype.reset.call(this, t);
    }, G.prototype._onStop = function(t, n) {
        return this.mTransaction = null, this.mRunningFlag = !1, x.prototype._onStop.call(this, t, n);
    }, G.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.rasaServerUrl && t.rasaServerUrl && (this.rasaServerUrl = t.rasaServerUrl), 
            'string' == typeof t.rasaAppKey && t.rasaAppKey && (this.rasaAppKey = t.rasaAppKey), 
            0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, G.prototype.getConfig = function() {
        return {
            rasaAppKey: this.rasaAppKey,
            rasaServerUrl: this.rasaServerUrl
        };
    }, G.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, G.prototype.open = function(t) {
        return this.disconnectFlag && (this.disconnectFlag = !1, this._onOpen()), 0;
    }, G.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, G.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, G.prototype._isCredentials = function() {
        return !!this.rasaAppKey;
    }, G.prototype.isAction = function(t) {
        var n = !1;
        return n = t === g ? this.rasaNLUFlag : n;
    }, G.prototype.start = function(t, n, r) {
        if (this.isRunning()) return this.error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this.error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this.error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this.error('start', 'andere Transaktion laeuft noch'), 
        -1;
        r = r || {};
        this.mRunningFlag = !0;
        return n === g ? (this.mTransaction = new i.PortTransaction(t, g), this._startNLU(this.mTransaction, r.text, r.language || R)) : (this.error('start', 'Keine gueltige Aktion uebergeben ' + n), 
        -1);
    }, G.prototype.stop = function(t, n, r) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this.error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this.error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this.error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this.error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        t = 0, t = n === g ? this._stopNLU(this.mTransaction) : (this.error('stop', 'Keine gueltige Aktion uebergeben ' + n), 
        -1);
        return this.mTransaction = null, this.mRunningFlag = !1, t;
    }, G.prototype._startNLU = function(t, n, r) {
        if (!n) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.rasaNLUFlag) return this.error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var e = {
                intent: {
                    name: this.intentName,
                    confidence: this.intentConfidence
                },
                text: n
            };
            return t.result = e, console.log('CloudRasaMock._startNLU: _onResult wird aufgerufen'), 
            this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
    }, G.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, G);
    function G(t, n) {
        n = x.call(this, t || c, n = void 0 === n ? !0 : n) || this;
        return n.rasaNLUFlag = !0, n.disconnectFlag = !0, n.defaultOptions = null, n.codec = '', 
        n.intentName = 'TestIntent', n.intentConfidence = 1, n.intentSpeech = 'TestSpeech', 
        n.mDynamicCredentialsFlag = !1, n.mTransaction = null, n.mRunningFlag = !1, n.rasaAppId = '', 
        n.rasaAppKey = '', n.rasaNluTag = '', n.rasaServerUrl = '', n;
    }
    var V = (H.setErrorOutputOn = function() {
        H.mErrorOutputFlag = !0, i.PortManager.setErrorOutputOn();
    }, H.setErrorOutputOff = function() {
        H.mErrorOutputFlag = !1, i.PortManager.setErrorOutputOff();
    }, H.setErrorOutputFunc = function(t) {
        i.PortManager.setErrorOutputFunc(t);
    }, H._initCloudRasaPort = function(t) {
        var n = i.PortManager.get(l, D);
        return n ? 0 !== n.init(t) ? (i.PortManager.remove(l), -1) : (H.mCurrentPort = n, 
        0) : -1;
    }, H._initCloudRasaMock = function(t) {
        var n = i.PortManager.get(l, j);
        return n ? 0 !== n.init(t) ? (console.log('CloudRasa._initCloudRasaMock: Error CloudRasaMock wurde nicht initialisiert'), 
        i.PortManager.remove(l), -1) : (H.mCurrentPort = n, 0) : (console.log('CloudRasa._initCloudRasaMock: Error CloudRasaMock wurde nicht erzeugt'), 
        -1);
    }, H.init = function(t) {
        if (H.mInitFlag) return 0;
        if (!t) return H.mErrorOutputFlag && console.log('CloudRasa.init: Keine CloudRasa-Parameter uebergeben'), 
        -1;
        'boolean' == typeof t.errorOutputFlag && (t.errorOutputFlag ? H.setErrorOutputOn() : H.setErrorOutputOff());
        var n = 'CloudRasaPort';
        if ('CloudRasaPort' === (n = t && 'string' == typeof t.rasaPortName && 'CloudRasaMock' === t.rasaPortName ? 'CloudRasaMock' : n)) {
            if (0 !== H._initCloudRasaPort(t)) return -1;
        } else {
            if ('CloudRasaMock' !== n) return H.mErrorOutputFlag && console.log('CloudRasa.init: Kein CloudRasa PortName vorhanden'), 
            -1;
            if (0 !== H._initCloudRasaMock(t)) return -1;
        }
        return H.mInitFlag = !0, 0;
    }, H.isInit = function() {
        return H.mInitFlag;
    }, H.done = function() {
        var t = i.PortManager.find(l), n = 0;
        return (t = t || H.mCurrentPort) && (n = t.done(), i.PortManager.remove(l)), H.mCurrentPort = null, 
        H.mInitFlag = !1, n;
    }, H._onOpenEvent = function(t, n, r, e) {
        if ('function' == typeof e) try {
            return e(t, n, r), 0;
        } catch (t) {
            return H.mErrorOutputFlag && console.log('CloudRasa._onOpenEvent: Exception', t.message), 
            -1;
        }
        return 0;
    }, H._openCloudRasaPort = function(n) {
        var r = i.PortManager.find(l);
        return (r = r || H.mCurrentPort) ? (r.addOpenEvent(l, function(t) {
            return r.removeErrorEvent(l), r.removeOpenEvent(l), 'function' == typeof n && H._onOpenEvent(null, l, t.result, n), 
            t.result;
        }), r.addErrorEvent(l, function(t) {
            return r.removeOpenEvent(l), r.removeErrorEvent(l), 'function' == typeof n && H._onOpenEvent(t, l, -1, n), 
            0;
        }), r.open()) : (H.mErrorOutputFlag && console.log('CloudRasa._openCloudRasaPort: kein Port vorhanden'), 
        H._onOpenEvent(new Error('CloudRasa._openCloudRasaPort: Kein Port vorhanden'), l, -1, n), 
        -1);
    }, H.open = function(t) {
        return H.mInitFlag ? H._openCloudRasaPort(t) : (H.mErrorOutputFlag && console.log('CloudRasa.open: Init wurde nicht aufgerufen'), 
        H._onOpenEvent(new Error('CloudRasa.open: Init wurde nicht aufgerufen'), l, -1, t), 
        -1);
    }, H.setConfig = function(t) {
        return H.mCurrentPort ? H.mCurrentPort.setConfig(t) : -1;
    }, H.getConfig = function() {
        return H.mCurrentPort ? H.mCurrentPort.getConfig() : {
            rasaAppKey: ''
        };
    }, H.mInitFlag = !1, H.mErrorOutputFlag = !1, H.mCurrentPort = null, H);
    function H() {}
    var q = (B.setErrorOutputOn = function() {
        B.mErrorOutputFlag = !0, B.mPortList.setErrorOutputOn(), i.PortManager.setErrorOutputOn();
    }, B.setErrorOutputOff = function() {
        B.mErrorOutputFlag = !1, B.mPortList.setErrorOutputOff(), i.PortManager.setErrorOutputOff();
    }, B.setErrorOutputFunc = function(t) {
        B.mPortList.setErrorOutputFunc(t), i.PortManager.setErrorOutputFunc(t);
    }, B._initCloudRasaPort = function(t, n) {
        console.log('CloudRasaManager._initCloudRasaPort:', t, n);
        var r = i.PortManager.get(t, D);
        return r ? 0 !== r.init(n) ? (i.PortManager.remove(t), -1) : (B.mPortList.insert(t, r), 
        0) : -1;
    }, B._initCloudRasaMock = function(t, n) {
        console.log('CloudRasaManager._initCloudRasaMock:', t, n);
        var r = i.PortManager.get(t, j);
        return r ? 0 !== r.init(n) ? (console.log('CloudRasaManager._initCloudRasaMock: Error CloudRasaMock wurde nicht initialisiert'), 
        i.PortManager.remove(t), -1) : (B.mPortList.insert(t, r), 0) : (console.log('CloudRasaManager._initCloudRasaMock: Error CloudRasaMock wurde nicht erzeugt'), 
        -1);
    }, B.initPort = function(t) {
        var n = !1, r = (n = t && 'boolean' == typeof t.rasaMockFlag ? t.rasaMockFlag : n) ? 'CloudRasaPortMock' : 'CloudRasaPort';
        if (t && 'string' == typeof t.rasaPortName && (r = t.rasaPortName), n) {
            if (0 !== B._initCloudRasaMock(r, t)) return -1;
        } else if (0 !== B._initCloudRasaPort(r, t)) return -1;
        return 0;
    }, B.init = function(t) {
        if (B.mInitFlag) return 0;
        if (!t || 0 === t.length) return B.mErrorOutputFlag && console.log('CloudRasaManager.init: Keine CloudRasa-Parameter uebergeben'), 
        -1;
        for (var n = 0, r = 0, e = t; r < e.length; r++) {
            var o = e[r];
            0 !== B.initPort(o) && (n = -1);
        }
        return B.mInitFlag = !0, console.log('CloudRasaManager.init: end', n), n;
    }, B.isInit = function() {
        return B.mInitFlag;
    }, B.done = function() {
        for (var t = null, n = 0, r = 0, e = B.mPortList.getNameList(); r < e.length; r++) {
            var o = e[r];
            (t = i.PortManager.find(o)) && (i.PortManager.remove(o), 0 !== t.done() && (n = -1));
        }
        return B.mPortList.clear(), B.mInitFlag = !1, n;
    }, B._onOpenEvent = function(t, n, r, e) {
        if ('function' == typeof e) try {
            return e(t, n, r), 0;
        } catch (t) {
            return B.mErrorOutputFlag && console.log('CloudRasaManager._onOpenEvent: Exception', t.message), 
            -1;
        }
        return 0;
    }, B._openPort = function(n, r) {
        var e = i.PortManager.find(n);
        return e ? (e.addOpenEvent(n, function(t) {
            return e.removeErrorEvent(n), e.removeOpenEvent(n), 'function' == typeof r && B._onOpenEvent(null, n, t.result, r), 
            t.result;
        }), e.addErrorEvent(n, function(t) {
            return e.removeOpenEvent(n), e.removeErrorEvent(n), 'function' == typeof r && B._onOpenEvent(t, n, -1, r), 
            0;
        }), e.open()) : (B.mErrorOutputFlag && console.log('CloudRasaManager._openPort: kein Port vorhanden'), 
        B._onOpenEvent(new Error('CloudRasaManager._openPort: Kein Port vorhanden'), n, -1, r), 
        -1);
    }, B.open = function(t, n) {
        if (console.log('CloudRasaManager.open:', t), !B.mInitFlag) return B.mErrorOutputFlag && console.log('CloudRasaManager.open: Init wurde nicht aufgerufen'), 
        B._onOpenEvent(new Error('CloudRasaManager.open: Init wurde nicht aufgerufen'), t, -1, n), 
        -1;
        n = B._openPort(t, n);
        return console.log('CloudRasaManager.open: end', n), n;
    }, B.setConfig = function(t, n) {
        t = B.mPortList.find(t);
        return t ? t.setConfig(n) : -1;
    }, B.getConfig = function(t) {
        t = B.mPortList.find(t);
        return t ? t.getConfig() : {
            rasaAppKey: ''
        };
    }, B.mInitFlag = !1, B.mErrorOutputFlag = !1, B.mPortList = new i.PortList(), B);
    function B() {}
    var Y = (z.init = function(t, e, o) {
        (o = void 0 === o ? !1 : o) ? V.setErrorOutputOn() : V.setErrorOutputOff(), t && t.rasaMockFlag && (t.rasaPortName = 'CloudRasaMock');
        var i = !1;
        0 === V.init(t) ? V.open(function(t, n, r) {
            null === t && 0 === r ? (o && console.log('===> Rasa ist vorhanden'), i = !0) : o && console.log('===> Rasa ist nicht geoeffnet'), 
            e(i);
        }) : (o && console.log('===> Rasa ist nicht initialisiert'), e(i));
    }, z.done = function() {
        V.done();
    }, z.setConfig = function(t) {
        return V.setConfig(t);
    }, z.getConfig = function() {
        return V.getConfig();
    }, z);
    function z() {}
    J.prototype.init = function(t) {
        return 0;
    }, J.prototype.getName = function() {
        return 'RasaService';
    }, J.prototype.setCredentials = function(t, n) {
        return Y.setConfig({
            rasaServerUrl: n = void 0 === n ? '' : n,
            rasaAppKey: t
        });
    }, k = J;
    function J() {}
    t.CLOUDRASA_API_VERSION = u, t.CLOUDRASA_CONFIG_FILE = d, t.CLOUDRASA_CONFIG_LOAD = !1, 
    t.CLOUDRASA_CONFIG_PATH = m, t.CLOUDRASA_DEFAULT_LANGUAGE = R, t.CLOUDRASA_DEFAULT_NAME = "CloudRasaPort", 
    t.CLOUDRASA_DEFAULT_URL = f, t.CLOUDRASA_DE_LANGUAGE = C, t.CLOUDRASA_EN_LANGUAGE = 'en-US', 
    t.CLOUDRASA_FACTORY_NAME = 'CloudRasaFactory', t.CLOUDRASA_MOCK_NAME = c, t.CLOUDRASA_NLU_ACTION = g, 
    t.CLOUDRASA_PORT_NAME = p, t.CLOUDRASA_SERVER_URL = h, t.CLOUDRASA_SERVER_VERSION = "0.2.1.0005 vom 26.10.2020 (ALPHA)", 
    t.CLOUDRASA_TYPE_NAME = l, t.CLOUDRASA_VERSION_BUILD = r, t.CLOUDRASA_VERSION_DATE = a, 
    t.CLOUDRASA_VERSION_NUMBER = n, t.CLOUDRASA_VERSION_STRING = s, t.CLOUDRASA_VERSION_TYPE = o, 
    t.CLOUDRASA_WORKER_VERSION = "0.2.1.0005 vom 26.10.2020 (ALPHA)", t.CloudRasa = V, 
    t.CloudRasaConfig = A, t.CloudRasaConnect = v, t.CloudRasaManager = q, t.RasaModule = Y, 
    t.RasaService = k, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
