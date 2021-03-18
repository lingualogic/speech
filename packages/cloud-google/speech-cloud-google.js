/**
 * Speech-Cloud-Google Bundle
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

!function(t, o) {
    'object' == typeof exports && 'undefined' != typeof module ? o(exports, require('@speech/core'), require('@speech/common')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common' ], o) : o((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechCloudGoogle = {}, t.speechCore, t.speechCommon);
}(this, function(t, u, r) {
    'use strict';
    var o = '0.2.1', e = '0009', n = 'ALPHA', i = '26.10.2020', s = o + '.' + e + ' vom ' + i + ' (' + n + ')', l = s, a = 'CloudGoogle', c = 'CloudGooglePort', g = 'CloudGoogleMock', h = 'ws://localhost:7050', d = h, p = 'NLU', f = 'ASR', m = 'ASRNLU', C = 'TTS', T = 'assets/', S = 'cloud-google.json', _ = 'de-DE', A = _, y = 'de-DE', G = 'de-DE', E = 'Petra-ML', O = E, v = O, k = 'audio/L16;rate=16000', U = function(t, o) {
        return (U = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, o) {
            t.__proto__ = o;
        } || function(t, o) {
            for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);
        })(t, o);
    };
    function R(t, o) {
        function e() {
            this.constructor = t;
        }
        U(t, o), t.prototype = null === o ? Object.create(o) : (e.prototype = o.prototype, 
        new e());
    }
    function L(t, s, u, l) {
        return new (u = u || Promise)(function(e, o) {
            function n(t) {
                try {
                    i(l.next(t));
                } catch (t) {
                    o(t);
                }
            }
            function r(t) {
                try {
                    i(l.throw(t));
                } catch (t) {
                    o(t);
                }
            }
            function i(t) {
                var o;
                t.done ? e(t.value) : ((o = t.value) instanceof u ? o : new u(function(t) {
                    t(o);
                })).then(n, r);
            }
            i((l = l.apply(t, s || [])).next());
        });
    }
    function w(e, n) {
        var r, i, s, u = {
            label: 0,
            sent: function() {
                if (1 & s[0]) throw s[1];
                return s[1];
            },
            trys: [],
            ops: []
        }, t = {
            next: o(0),
            throw: o(1),
            return: o(2)
        };
        return "function" == typeof Symbol && (t[Symbol.iterator] = function() {
            return this;
        }), t;
        function o(o) {
            return function(t) {
                return function(o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (;u; ) try {
                        if (r = 1, i && (s = 2 & o[0] ? i.return : o[0] ? i.throw || ((s = i.return) && s.call(i), 
                        0) : i.next) && !(s = s.call(i, o[1])).done) return s;
                        switch (i = 0, (o = s ? [ 2 & o[0], s.value ] : o)[0]) {
                          case 0:
                          case 1:
                            s = o;
                            break;

                          case 4:
                            return u.label++, {
                                value: o[1],
                                done: !1
                            };

                          case 5:
                            u.label++, i = o[1], o = [ 0 ];
                            continue;

                          case 7:
                            o = u.ops.pop(), u.trys.pop();
                            continue;

                          default:
                            if (!(s = 0 < (s = u.trys).length && s[s.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                u = 0;
                                continue;
                            }
                            if (3 === o[0] && (!s || o[1] > s[0] && o[1] < s[3])) {
                                u.label = o[1];
                                break;
                            }
                            if (6 === o[0] && u.label < s[1]) {
                                u.label = s[1], s = o;
                                break;
                            }
                            if (s && u.label < s[2]) {
                                u.label = s[2], u.ops.push(o);
                                break;
                            }
                            s[2] && u.ops.pop(), u.trys.pop();
                            continue;
                        }
                        o = n.call(e, u);
                    } catch (t) {
                        o = [ 6, t ], i = 0;
                    } finally {
                        r = s = 0;
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    };
                }([ o, t ]);
            };
        }
    }
    var N, b = (R(I, N = u.ErrorBase), I.prototype._setOption = function(t) {
        t && ('string' == typeof t.googleConfigPath && (this.mConfigPath = t.googleConfigPath), 
        'string' == typeof t.googleConfigFile && (this.mConfigFile = t.googleConfigFile), 
        'boolean' == typeof t.googleConfigLoadFlag && (this.mConfigLoadFlag = t.googleConfigLoadFlag), 
        'string' == typeof t.googleServerUrl && (this.mConfigServerUrl = t.googleServerUrl), 
        'string' == typeof t.dialogflowTokenServerUrl && (this.mConfigDialogflowTokenServerUrl = t.dialogflowTokenServerUrl), 
        'string' == typeof t.dialogflowProjectId && (this.mConfigDialogflowProjectId = t.dialogflowProjectId), 
        'string' == typeof t.dialogflowSessionId && (this.mConfigDialogflowSessionId = t.dialogflowSessionId), 
        'string' == typeof t.dialogflowEnvironmentName && (this.mConfigDialogflowEnvironmentName = t.dialogflowEnvironmentName), 
        'string' == typeof t.googleAppId && (this.mConfigAppId = t.googleAppId), 'string' == typeof t.googleAppKey && (this.mConfigAppKey = t.googleAppKey), 
        'string' == typeof t.googleUserId && (this.mConfigUserId = t.googleUserId), 'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag), 
        'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag), 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag));
    }, I.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, I.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = T, this.mConfigFile = S, this.mConfigLoadFlag = !1, 
        this.mConfigServerUrl = d, this.mConfigDialogflowTokenServerUrl = '', this.mConfigDialogflowProjectId = '', 
        this.mConfigDialogflowSessionId = '', this.mConfigDialogflowEnvironmentName = '', 
        this.mConfigAppId = '', this.mConfigAppKey = '', this.mConfigUserId = '', this.mConfigNluTag = '', 
        this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, I.prototype.isInit = function() {
        return this.mInitFlag;
    }, I.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, I.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION AmazonConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(I.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), I.prototype._readConfigData = function(t) {
        if (!t) return this.error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var o = JSON.parse(t);
            return o.URL && (this.serverUrl = o.URL), o.APP_ID && (this.appId = o.APP_ID), o.APP_KEY && (this.appKey = o.APP_KEY), 
            o.USER_ID && (this.userId = o.USER_ID), o.NLU_TAG && (this.nluTag = o.NLU_TAG), 
            this._onInit(0), 0;
        } catch (t) {
            return this.exception('_readConfigData', t), -1;
        }
    }, I.prototype._readError = function(t) {
        this.error('_readError', t), this._onInit(-1);
    }, I.prototype.read = function() {
        if (!this.mFileReader) return this.error('read', 'kein FileReader vorhanden'), this._onInit(-1), 
        -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(I.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "dialogflowTokenServerUrl", {
        get: function() {
            return this.mConfigDialogflowTokenServerUrl;
        },
        set: function(t) {
            this.mConfigDialogflowTokenServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "dialogflowProjectId", {
        get: function() {
            return this.mConfigDialogflowProjectId;
        },
        set: function(t) {
            this.mConfigDialogflowProjectId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "dialogflowSessionId", {
        get: function() {
            return this.mConfigDialogflowSessionId;
        },
        set: function(t) {
            this.mConfigDialogflowSessionId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "dialogflowEnvironmentName", {
        get: function() {
            return this.mConfigDialogflowEnvironmentName;
        },
        set: function(t) {
            this.mConfigDialogflowEnvironmentName = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "appId", {
        get: function() {
            return this.mConfigAppId;
        },
        set: function(t) {
            this.mConfigAppId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "appKey", {
        get: function() {
            return this.mConfigAppKey;
        },
        set: function(t) {
            this.mConfigAppKey = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(I.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !1,
        configurable: !0
    }), I.prototype.isCredentials = function() {
        return !!(this.mConfigAppKey || this.mConfigDialogflowTokenServerUrl && this.mConfigDialogflowProjectId);
    }, I);
    function I(t) {
        var o = N.call(this, 'CloudGoogleConfig') || this;
        return o.mInitFlag = !1, o.mConfigPath = T, o.mConfigFile = S, o.mConfigLoadFlag = !1, 
        o.mConfigServerUrl = d, o.mConfigDialogflowTokenServerUrl = '', o.mConfigDialogflowProjectId = '', 
        o.mConfigDialogflowSessionId = '', o.mConfigDialogflowEnvironmentName = '', o.mConfigAppId = '', 
        o.mConfigAppKey = '', o.mConfigUserId = '', o.mConfigNluTag = '', o.mFileReader = null, 
        o.mOnInitFunc = null, o.mOnErrorFunc = null, o.mFileReader = t, o.setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), o;
    }
    var D, F = (R(P, D = u.ErrorBase), P.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, P.prototype.connect = function(e) {
        var n = this;
        if (this.isConnect()) return 0;
        if (!this.mWebSocket) return this.mConnectFlag = !0, 0;
        try {
            return this.mWebSocket.onMessage = function(t) {
                if ('string' == typeof t.data) {
                    console.log('CloudGoogleConnect.onMessage: String-Nachricht');
                    try {
                        var o = JSON.parse(t.data);
                        e.onmessage ? e.onmessage(o) : n.error('connect.onMessage', 'keine Message-Funktion vorhanden');
                    } catch (t) {
                        return n.exception('connect.onMessage', t), -1;
                    }
                } else 'object' == typeof t.data && (console.log('CloudGoogleConnect.onMessage: Objekt-Daten'), 
                e.ondata ? e.ondata(t.data) : n.error('connect.onMessage', 'keine Daten-Funktion vorhanden'));
                return 0;
            }, this.mConnectFlag = !0, 0;
        } catch (t) {
            return this.exception('connect', t), -1;
        }
    }, P.prototype.disconnect = function() {
        return this.mConnectFlag = !1, this.mWebSocket && (this.mWebSocket.onMessage = null), 
        0;
    }, P.prototype.sendJSON = function(t) {
        return this.mWebSocket ? this.mWebSocket.sendMessage(t) : -1;
    }, Object.defineProperty(P.prototype, "webSocket", {
        get: function() {
            return this.mWebSocket ? this.mWebSocket.webSocket : null;
        },
        enumerable: !1,
        configurable: !0
    }), P);
    function P(t, o) {
        var e = D.call(this, 'CloudGoogleConnect') || this;
        return e.mConfig = null, e.mWebSocket = null, e.mConnectFlag = !1, e.mConfig = t, 
        e.mWebSocket = o, e;
    }
    var M, x = (R(j, M = r.NetHtml5Connect), j);
    function j() {
        return M.call(this, 'CloudGoogleNetwork') || this;
    }
    var K, W, V, B = (R(H, K = r.NetHtml5WebSocket), H.prototype.connect = function(t) {
        return t ? 0 !== this._connect(t) ? (this.error('open', 'keine Verbindung moeglich'), 
        -1) : 0 : (this.error('connect', 'keine URL vorhanden'), -1);
    }, H.prototype.disconnect = function() {
        this.onMessage = null, this.close();
    }, H.prototype.sendJSON = function(t) {
        this.sendMessage(t);
    }, H);
    function H() {
        return K.call(this, 'CloudGoogleWebSocket') || this;
    }
    ot = W = W || {}, (V = q = ot.AVAILABLE_LANGUAGES || (ot.AVAILABLE_LANGUAGES = {}))[V.EN = "en"] = "EN", 
    V[V.DE = "de"] = "DE", V[V.ES = "es"] = "ES", V[V.PT_BR = "pt-BR"] = "PT_BR", V[V.ZH_HK = "zh-HK"] = "ZH_HK", 
    V[V.ZH_CN = "zh-CN"] = "ZH_CN", V[V.ZH_TW = "zh-TW"] = "ZH_TW", V[V.NL = "nl"] = "NL", 
    V[V.FR = "fr"] = "FR", V[V.IT = "it"] = "IT", V[V.JA = "ja"] = "JA", V[V.KO = "ko"] = "KO", 
    V[V.PT = "pt"] = "PT", V[V.RU = "ru"] = "RU", V[V.UK = "uk"] = "UK", ot.VERSION = "2.0.0-beta.20", 
    ot.DEFAULT_BASE_URL = "https://api.api.ai/v1/", ot.DEFAULT_API_VERSION = "20150910", 
    ot.DEFAULT_CLIENT_LANG = q.EN, ot.DEFAULT_TTS_HOST = "https://api.api.ai/api/tts";
    var z, q = (R(J, z = Error), J);
    function J(t) {
        var o = z.call(this, t) || this;
        return o.message = t, o.stack = new Error().stack, o;
    }
    var X, Y = (R(Z, X = q), Z);
    function Z(t) {
        t = X.call(this, t) || this;
        return t.name = "ApiAiClientConfigurationError", t;
    }
    var Q, $ = (R(tt, Q = q), tt);
    function tt(t, o) {
        void 0 === o && (o = null);
        var e = Q.call(this, t) || this;
        return e.message = t, e.code = o, e.name = "ApiAiRequestError", e;
    }
    var ot = (et.ajax = function(u, l, a, c, g) {
        return void 0 === a && (a = null), void 0 === c && (c = null), void 0 === g && (g = {}), 
        new Promise(function(t, o) {
            var e = et.createXMLHTTPObject(), n = l, r = null;
            if (a && u === et.Method.GET) {
                n += "?";
                var i = 0;
                for (s in a) a.hasOwnProperty(s) && (i++ && (n += "&"), n += encodeURIComponent(s) + "=" + encodeURIComponent(a[s]));
            } else a && ((c = c || {})["Content-Type"] = "application/json; charset=utf-8", 
            r = JSON.stringify(a));
            for (s in g) s in e && (e[s] = g[s]);
            if (e.open(et.Method[u], n, !0), c) for (var s in console.log('Dialogflow.XhrRequest: Headers', c), 
            c) c.hasOwnProperty(s) && e.setRequestHeader(s, c[s]);
            r ? e.send(r) : e.send(), e.onload = function() {
                200 <= e.status && e.status < 300 ? t(e) : (console.log('Dialogflow.XhrRequest: onLoad->reject ', e), 
                o(e));
            }, e.onerror = function() {
                console.log('Dialogflow.XhrRequest: onError ', e), o(e);
            };
        });
    }, et.get = function(t, o, e, n) {
        return et.ajax(et.Method.GET, t, o = void 0 === o ? null : o, e = void 0 === e ? null : e, n = void 0 === n ? {} : n);
    }, et.post = function(t, o, e, n) {
        return et.ajax(et.Method.POST, t, o = void 0 === o ? null : o, e = void 0 === e ? null : e, n = void 0 === n ? {} : n);
    }, et.put = function(t, o, e, n) {
        return et.ajax(et.Method.PUT, t, o = void 0 === o ? null : o, e = void 0 === e ? null : e, n = void 0 === n ? {} : n);
    }, et.delete = function(t, o, e, n) {
        return et.ajax(et.Method.DELETE, t, o = void 0 === o ? null : o, e = void 0 === e ? null : e, n = void 0 === n ? {} : n);
    }, et.createXMLHTTPObject = function() {
        for (var t = null, o = 0, e = et.XMLHttpFactories; o < e.length; o++) {
            var n = e[o];
            try {
                t = n();
            } catch (t) {
                continue;
            }
            break;
        }
        return t;
    }, et.XMLHttpFactories = [ function() {
        return new XMLHttpRequest();
    }, function() {
        return new window.ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
        return new window.ActiveXObject("Msxml3.XMLHTTP");
    }, function() {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } ], et);
    function et() {}
    (q = (q = ot = ot || {}).Method || (q.Method = {}))[q.GET = "GET"] = "GET", q[q.POST = "POST"] = "POST", 
    q[q.PUT = "PUT"] = "PUT", q[q.DELETE = "DELETE"] = "DELETE";
    var nt = ot, q = (rt.handleSuccess = function(t) {
        return Promise.resolve(JSON.parse(t.responseText));
    }, rt.handleError = function(o) {
        var e = new $(null);
        try {
            var t = JSON.parse(o.responseText), e = t.status && t.status.errorDetails ? new $(t.status.errorDetails, t.status.code) : new $(o.statusText, o.status);
        } catch (t) {
            e = new $(o.statusText, o.status);
        }
        return Promise.reject(e);
    }, rt.prototype.perform = function(t) {
        t = (t = void 0 === t ? null : t) || this.options;
        return nt.ajax(this.requestMethod, this.uri, t, this.headers).then(rt.handleSuccess.bind(this)).catch(rt.handleError.bind(this));
    }, rt);
    function rt(t, o) {
        this.apiAiClient = t, this.options = o, this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion(), 
        this.requestMethod = nt.Method.POST, this.headers = {
            Authorization: "Bearer " + this.apiAiClient.getAccessToken()
        }, this.options.lang = this.apiAiClient.getApiLang(), this.options.sessionId = this.apiAiClient.getSessionId();
    }
    var it, st = (R(ut, it = q), ut);
    function ut() {
        return null !== it && it.apply(this, arguments) || this;
    }
    var lt, at = (R(ct, lt = q), ct);
    function ct() {
        return null !== lt && lt.apply(this, arguments) || this;
    }
    ot = {}, (q = ot.ERROR || (ot.ERROR = {}))[q.ERR_NETWORK = 0] = "ERR_NETWORK", q[q.ERR_AUDIO = 1] = "ERR_AUDIO", 
    q[q.ERR_SERVER = 2] = "ERR_SERVER", q[q.ERR_CLIENT = 3] = "ERR_CLIENT", (ot = ot.EVENT || (ot.EVENT = {}))[ot.MSG_WAITING_MICROPHONE = 0] = "MSG_WAITING_MICROPHONE", 
    ot[ot.MSG_MEDIA_STREAM_CREATED = 1] = "MSG_MEDIA_STREAM_CREATED", ot[ot.MSG_INIT_RECORDER = 2] = "MSG_INIT_RECORDER", 
    ot[ot.MSG_RECORDING = 3] = "MSG_RECORDING", ot[ot.MSG_SEND = 4] = "MSG_SEND", ot[ot.MSG_SEND_EMPTY = 5] = "MSG_SEND_EMPTY", 
    ot[ot.MSG_SEND_EOS_OR_JSON = 6] = "MSG_SEND_EOS_OR_JSON", ot[ot.MSG_WEB_SOCKET = 7] = "MSG_WEB_SOCKET", 
    ot[ot.MSG_WEB_SOCKET_OPEN = 8] = "MSG_WEB_SOCKET_OPEN", ot[ot.MSG_WEB_SOCKET_CLOSE = 9] = "MSG_WEB_SOCKET_CLOSE", 
    ot[ot.MSG_STOP = 10] = "MSG_STOP", ot[ot.MSG_CONFIG_CHANGED = 11] = "MSG_CONFIG_CHANGED";
    var gt = (ht.prototype.textRequest = function(t, o) {
        if (void 0 === o && (o = {}), !t) throw new Y("Query should not be empty");
        return o.query = t, new at(this, o).perform();
    }, ht.prototype.eventRequest = function(t, o, e) {
        if (void 0 === o && (o = {}), void 0 === e && (e = {}), !t) throw new Y("Event name can not be empty");
        return e.event = {
            name: t,
            data: o
        }, new st(this, e).perform();
    }, ht.prototype.getAccessToken = function() {
        return this.accessToken;
    }, ht.prototype.getApiVersion = function() {
        return this.apiVersion || W.DEFAULT_API_VERSION;
    }, ht.prototype.getApiLang = function() {
        return this.apiLang || W.DEFAULT_CLIENT_LANG;
    }, ht.prototype.getApiBaseUrl = function() {
        return this.apiBaseUrl || W.DEFAULT_BASE_URL;
    }, ht.prototype.setSessionId = function(t) {
        this.sessionId = t;
    }, ht.prototype.getSessionId = function() {
        return this.sessionId;
    }, ht.prototype.guid = function() {
        function t() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
    }, ht);
    function ht(t) {
        if (!t || !t.accessToken) throw new Y("Access token is required for new ApiAi.Client instance");
        this.accessToken = t.accessToken, this.apiLang = t.lang || W.DEFAULT_CLIENT_LANG, 
        this.apiVersion = t.version || W.DEFAULT_API_VERSION, this.apiBaseUrl = t.baseUrl || W.DEFAULT_BASE_URL, 
        this.sessionId = t.sessionId || this.guid();
    }
    var dt, ot = (R(pt, dt = u.ErrorBase), pt.prototype.isInit = function() {
        return this.mInitFlag;
    }, pt.prototype.clearToken = function() {}, pt.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, pt.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, pt.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, pt.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, pt.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, pt.prototype._start = function(t) {
        return -1;
    }, pt.prototype._stop = function() {
        return -1;
    }, pt.prototype.start = function(t, o) {
        if (!t) return this.error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this.error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return 0 !== this._start(o) ? (this.mTransaction = null, -1) : 0;
        } catch (t) {
            return this.exception('start', t), -1;
        }
    }, pt.prototype.stop = function(t) {
        if (!t) return this.error('stop', 'keine Transaktion uebergeben'), -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion gestartet'), 
        -1;
        if (this.mTransaction.transactionId !== t.transactionId) return this.error('stop', 'Transaktions-ID stimmt nicht ueberein'), 
        -1;
        try {
            return this._stop(), 0;
        } catch (t) {
            return this.exception('stop', t), -1;
        }
    }, pt.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, pt.prototype.getTransaction = function() {
        return this.mTransaction;
    }, pt.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, pt);
    function pt(t, o, e) {
        t = dt.call(this, t || 'CloudGoogleDevice') || this;
        return t.mInitFlag = !1, t.mConfig = null, t.mConnect = null, t.mTransaction = null, 
        t.onStart = null, t.onStop = null, t.onResult = null, t.onError = null, t.onClose = null, 
        t.mConfig = o, t.mConnect = e, t.mInitFlag = !0, t.setErrorOutput(o.isErrorOutput()), 
        t;
    }
    var ft, mt = (R(Ct, ft = ot), Ct.prototype._start = function(t) {
        var o = this;
        try {
            return this.mConfig.appKey ? (this.mDialogflowClient = new gt({
                accessToken: this.mConfig.appKey
            }), this.mDialogflowClient.textRequest(t.text).then(function(t) {
                try {
                    o._onResult(t.result);
                } catch (t) {
                    o._onError(new Error('NLU-Exception: ' + t.message));
                }
                o._onStop();
            }, function(t) {
                console.log('CloudGoogleNlu._start: Promise-Error ', t), o._onError(new Error('NLU-Error: ' + t.message));
            }), 0) : (this.error('_start', 'kein AppKey vorhanden'), -1);
        } catch (t) {
            return this.exception('_start', t), -1;
        }
    }, Ct.prototype._stop = function() {
        return 0;
    }, Ct);
    function Ct(t, o) {
        return ft.call(this, 'CloudGoogleNLU', t, o) || this;
    }
    var Tt, St = 'https://dialogflow.googleapis.com/v2/projects', _t = (R(At, Tt = ot), 
    At.prototype.clearToken = function() {
        this.mAccessToken = '', this.mAccessTokenDate = new Date(), this.mAccessTokenDuration = 0;
    }, At.prototype.getDiffTime = function(t, o) {
        return o.getTime() - t.getTime();
    }, At.prototype.getAccessTokenFromServer = function() {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return t.trys.push([ 0, 3, , 4 ]), [ 4, fetch(this.mConfig.dialogflowTokenServerUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }) ];

                  case 1:
                    return [ 4, t.sent().json() ];

                  case 2:
                    return o = t.sent(), this.mAccessTokenDate = new Date(), this.mAccessToken = o.token || '', 
                    this.mAccessTokenDuration = o.time || 0, [ 3, 4 ];

                  case 3:
                    return o = t.sent(), this.mInitFlag = !1, this.exception('getAccessTokenFromServer', o), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, At.prototype.getAccessToken = function() {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return o = new Date(), Math.round(this.getDiffTime(this.mAccessTokenDate, o) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            });
        });
    }, At.prototype.getDetectIntentText = function(r, i) {
        return L(this, void 0, void 0, function() {
            var o, e, n;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return t.trys.push([ 0, 4, , 5 ]), (o = this.mConfig.dialogflowSessionId) || (o = Math.floor(Math.random() * Math.floor(9999999999)).toString(), 
                    this.mConfig.dialogflowSessionId = o), e = St + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/" + o + ":detectIntent", 
                    this.mConfig.dialogflowEnvironmentName && (e = St + "/" + this.mConfig.dialogflowProjectId + "/agent/environments/" + this.mConfig.dialogflowEnvironmentName + "/users/-/sessions/" + o + ":detectIntent"), 
                    [ 4, this.getAccessToken() ];

                  case 1:
                    return n = t.sent(), [ 4, fetch(e, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + n,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            queryInput: {
                                text: {
                                    text: r,
                                    languageCode: i
                                }
                            }
                        })
                    }) ];

                  case 2:
                    return [ 4, t.sent().json() ];

                  case 3:
                    return [ 2, t.sent() ];

                  case 4:
                    return n = t.sent(), this.exception('getDetectIntentText', n), [ 2, new Promise(function(t, o) {
                        o(new Error('Exception in getDetectIntentText'));
                    }) ];

                  case 5:
                    return [ 2 ];
                }
            });
        });
    }, At.prototype.getDetectIntentAudio = function(r, t) {
        return L(this, void 0, void 0, function() {
            var o, e, n;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return t.trys.push([ 0, 4, , 5 ]), (o = this.mConfig.dialogflowSessionId) || (o = Math.floor(Math.random() * Math.floor(9999999999)).toString(), 
                    this.mConfig.dialogflowSessionId = o), e = St + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/" + o + ":detectIntent", 
                    this.mConfig.dialogflowEnvironmentName && (e = St + "/" + this.mConfig.dialogflowProjectId + "/agent/environments/" + this.mConfig.dialogflowEnvironmentName + "/users/-/sessions/" + o + ":detectIntent"), 
                    [ 4, this.getAccessToken() ];

                  case 1:
                    return n = t.sent(), [ 4, fetch(e, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + n,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            queryInput: {
                                audioConfig: {
                                    audioEncoding: 'AUDIO_ENCODING_LINEAR_16',
                                    languageCode: 'de',
                                    sampleRateHertz: 16e3
                                }
                            },
                            inputAudio: r
                        })
                    }) ];

                  case 2:
                    return [ 4, t.sent().json() ];

                  case 3:
                    return [ 2, t.sent() ];

                  case 4:
                    return n = t.sent(), this.exception('getDetectIntentAudio', n), [ 2, new Promise(function(t, o) {
                        o(new Error('Exception in getDetectIntentAudio'));
                    }) ];

                  case 5:
                    return [ 2 ];
                }
            });
        });
    }, At.prototype._responseIntent = function(t, o) {
        var e = -1;
        try {
            this._onResult(o), this.mSpeakFlag && !this.mStopFlag && (o.outputAudioConfig && 'OUTPUT_AUDIO_ENCODING_MP3' === o.outputAudioConfig.audioEncoding ? e = this._startTTS(t, o.outputAudio) : this._onError(new Error('NLU-Error: no MP3-Format')));
        } catch (t) {
            this._onError(new Error('NLU-Exception: ' + t.message));
        }
        0 !== e && this._onStop();
    }, At.prototype._start = function(o) {
        var e = this;
        this.mStopFlag = !1;
        try {
            return this.mConfig.dialogflowTokenServerUrl ? this.mConfig.dialogflowProjectId ? o.text ? (this.getDetectIntentText(o.text, o.language).then(function(t) {
                e._responseIntent(o, t);
            }, function(t) {
                e._onError(new Error('NLU-Error: ' + t.message)), e._onStop();
            }), 0) : this._startASR(o) : (this.error('_start', 'keine ProjektID vorhanden'), 
            -1) : (this.error('_start', 'kein Tokenserver vorhanden'), -1);
        } catch (t) {
            return this.exception('_start', t), -1;
        }
    }, At.prototype._stop = function() {
        return this.mStopFlag = !0, this._stopASR({}), this._stopTTS(), this._onStop(), 
        0;
    }, At.prototype.encodeBase64 = function(t) {
        if (window.btoa) {
            for (var o = '', e = new Uint8Array(t), n = e.byteLength, r = 0; r < n; r++) o += String.fromCharCode(e[r]);
            return window.btoa(o);
        }
        return '';
    }, At.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var o = t.length, e = 0, n = 0; n < o; n++) e += t[n] * t[n];
            var r = Math.sqrt(e / o);
            (r < 127 || 128 < r) && (this.mVolumeCounter = 0, this.mMaxVolumeCounter = 20);
        } catch (t) {
            this.exception('isVolume', t);
        }
        return this.mVolumeCounter !== this.mMaxVolumeCounter && 150 !== this.mTimeoutCounter;
    }, At.prototype._detectMicrophone = function() {
        return new Promise(function(e) {
            navigator.mediaDevices && navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function(t) {
                var o = !1;
                t.forEach(function(t) {
                    'audioinput' === t.kind && (o = !0);
                }), e(o);
            }).catch(function(t) {
                e(!0);
            }) : e(!0);
        });
    }, At.prototype._startASRAudio = function(t) {}, At.prototype._startASRRecording = function(o) {
        var e = this;
        this.mMaxVolumeCounter = 100, this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
        try {
            if (this.mAudioRecorder = new r.AudioRecorder(null, this.mAudioContext, function(t) {
                e.isVolume(t) || e._stopASR(o);
            }), o.userMediaStream) this.mAudioRecorder.start(o.userMediaStream, k); else {
                if (!o.audioData) return this.error('_startASRRecording', 'keine Audiodaten vorhanden'), 
                void this._stop();
                this.mAudioRecorder.startAudio(o.audioData, k);
            }
            this.mRecordingFlag = !0;
        } catch (t) {
            this.exception('_startASRRecording', t), this._stopASR(o);
        }
    }, At.prototype._startASR = function(o) {
        var e = this;
        if (this.mRecordingFlag) return this.error('_startASR', 'ASR laeuft bereits'), -1;
        if (o && o.audioURL) {
            var t = {
                audioURL: o.audioURL,
                language: o.language
            };
            try {
                this._startASRAudio(t);
            } catch (t) {
                return this.exception('_startASR', t), -1;
            }
        } else {
            if (!this.mGetUserMedia) return this._onError(new Error('ASR-Error: kein UserMedia erzeugt')), 
            this.error('_startASR', 'kein getUserMedia vorhanden'), -1;
            try {
                return this._detectMicrophone().then(function(t) {
                    t ? e.mGetUserMedia({
                        audio: !0,
                        video: !1
                    }).then(function(t) {
                        e.mUserMediaStream = t;
                        t = {
                            userMediaStream: e.mUserMediaStream,
                            language: o.language
                        };
                        e._startASRRecording(t);
                    }, function(t) {
                        e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e.error('_startASR', 'keine UserMedia erzeugt: ' + t.message), 
                        e._onStop();
                    }) : (e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e.error('_startASR', 'kein Microphone vorhanden'), 
                    e._onStop());
                }), 0;
            } catch (t) {
                return this.exception('_startASR', t), -1;
            }
        }
        return this.error('_startASR', 'ASR ist nicht implementiert'), -1;
    }, At.prototype._stopASR = function(o) {
        var e = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop(function(t) {
                e.mStopFlag || e.getDetectIntentAudio(e.encodeBase64(t), '').then(function(t) {
                    e._responseIntent(o, t);
                }, function(t) {
                    e._onError(new Error('NLU-Error: ' + t.message)), e._onStop();
                });
            }), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this.exception('_stop', t), -1;
        }
    }, At.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var o = window.atob(t), e = o.length, n = new Uint8Array(e), r = 0; r < e; r++) n[r] = o.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, At.prototype._startTTS = function(t, o) {
        var e = this;
        try {
            if (!o) return -1;
            this.mAudioPlayer = new r.AudioPlayer(this.mAudioContext), this.mAudioPlayer.start();
            var n = {
                onaudiostart: function() {},
                onaudioend: function() {
                    e._stop();
                }
            };
            return this.mAudioPlayer.decodeAudio(n, this.decodeBase64(o)), 0;
        } catch (t) {
            return this._onError(new Error('NLU2-Exception: ' + t.message)), -1;
        }
    }, At.prototype._stopTTS = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stopAudio(), this._onStop()), 0;
    }, At);
    function At(t, o, e, n) {
        o = Tt.call(this, 'CloudGoogleNLU2', t, o) || this;
        return o.mAccessToken = '', o.mAccessTokenDate = new Date(), o.mAccessTokenDuration = 0, 
        o.mOptions = {}, o.mAudioContext = null, o.mAudioPlayer = null, o.mGetUserMedia = null, 
        o.mAudioRecorder = null, o.mUserMediaStream = null, o.mRecordingFlag = !1, o.mStopFlag = !1, 
        o.mSpeakFlag = !1, o.mVolumeCounter = 0, o.mMaxVolumeCounter = 100, o.mTimeoutCounter = 0, 
        o.mMicrophoneFlag = !1, o.mAudioContext = e, o.mGetUserMedia = n, o.getAccessTokenFromServer(), 
        o;
    }
    var yt, Gt = (R(Et, yt = ot), Et.prototype.clearToken = function() {
        this.mAccessToken = '', this.mAccessTokenDate = new Date(), this.mAccessTokenDuration = 0;
    }, Et.prototype.getDiffTime = function(t, o) {
        return o.getTime() - t.getTime();
    }, Et.prototype.getAccessTokenFromServer = function() {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return t.trys.push([ 0, 3, , 4 ]), [ 4, fetch(this.mConfig.serverUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }) ];

                  case 1:
                    return [ 4, t.sent().json() ];

                  case 2:
                    return o = t.sent(), this.mAccessTokenDate = new Date(), this.mAccessToken = o.token || '', 
                    this.mAccessTokenDuration = o.time || 0, [ 3, 4 ];

                  case 3:
                    return o = t.sent(), this.mInitFlag = !1, this.exception('getAccessTokenFromServer', o), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, Et.prototype.getAccessToken = function() {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return o = new Date(), Math.round(this.getDiffTime(this.mAccessTokenDate, o) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            });
        });
    }, Et.prototype.getSpeechToText = function(t, o, n) {
        return L(this, void 0, void 0, function() {
            var o, e;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return t.trys.push([ 0, 4, , 5 ]), [ 4, this.getAccessToken() ];

                  case 1:
                    return o = t.sent(), [ 4, fetch("https://speech.googleapis.com/v1/speech:recognize", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + o,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            config: {
                                encoding: 'LINEAR16',
                                languageCode: 'de-DE',
                                sampleRateHertz: 16e3
                            },
                            audio: {
                                content: n
                            }
                        })
                    }) ];

                  case 2:
                    return [ 4, t.sent().json() ];

                  case 3:
                    return (e = t.sent()) && this._onOptionMessage(e), this._onStop(), [ 2, e ];

                  case 4:
                    return e = t.sent(), this.exception('getSpeechToText', e), this._onStop(), [ 3, 5 ];

                  case 5:
                    return [ 2 ];
                }
            });
        });
    }, Et.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var o = window.atob(t), e = o.length, n = new Uint8Array(e), r = 0; r < e; r++) n[r] = o.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, Et.prototype.encodeBase64 = function(t) {
        if (window.btoa) {
            for (var o = '', e = new Uint8Array(t), n = e.byteLength, r = 0; r < n; r++) o += String.fromCharCode(e[r]);
            return window.btoa(o);
        }
        return '';
    }, Et.prototype._onSpeechResult = function(t) {
        t && 0 < t.length && (t[0].transcript, t[0].confidence, this._onResult(t));
    }, Et.prototype._onSpeechEnd = function() {}, Et.prototype._onOptionMessage = function(t) {
        t.results && 0 < t.results.length && this._onSpeechResult(t.results[0].alternatives);
    }, Et.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var o = t.length, e = 0, n = 0; n < o; n++) e += t[n] * t[n];
            var r = Math.sqrt(e / o);
            (r < 127 || 128 < r) && (this.mVolumeCounter = 0);
        } catch (t) {
            this.exception('isVolume', t);
        }
        return 30 !== this.mVolumeCounter && 200 !== this.mTimeoutCounter;
    }, Et.prototype._onEndedFunc = function(t) {
        this.getSpeechToText('de-DE', 'LINEAR16', this.encodeBase64(t));
    }, Et.prototype._startAudio = function(t) {}, Et.prototype._startASR = function(t) {
        var o = this;
        this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
        try {
            if (this.mAudioRecorder = new r.AudioRecorder(null, this.mAudioContext, function(t) {
                o.isVolume(t) || o._stop();
            }), t.userMediaStream) this.mAudioRecorder.start(t.userMediaStream, k); else {
                if (!t.audioData) return this.error('_startASR', 'keine Audiodaten vorhanden'), 
                void this._stop();
                this.mAudioRecorder.startAudio(t.audioData, k);
            }
            this.mRecordingFlag = !0;
        } catch (t) {
            this.exception('_startASR', t), this._stop();
        }
    }, Et.prototype._start = function(o) {
        var e = this;
        if (this.mRecordingFlag) return this.error('_start', 'ASR laeuft bereits'), -1;
        if (o && o.audioURL) {
            var t = {
                audioURL: o.audioURL,
                language: o.language
            };
            try {
                this._startAudio(t);
            } catch (t) {
                this.exception('_start', t);
            }
        } else {
            if (!this.mGetUserMedia) return this.error('_start', 'kein getUserMedia vorhanden'), 
            -1;
            try {
                return this.mGetUserMedia({
                    audio: !0,
                    video: !1
                }).then(function(t) {
                    e.mUserMediaStream = t;
                    t = {
                        userMediaStream: e.mUserMediaStream,
                        language: o.language
                    };
                    e._startASR(t);
                }, function(t) {
                    e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e.error('_start', 'keine UserMedia erzeugt: ' + t.message), 
                    e._onStop();
                }), 0;
            } catch (t) {
                return this.exception('_start', t), -1;
            }
        }
        return this.error('_start', 'ASR ist nicht implementiert'), -1;
    }, Et.prototype._stop = function() {
        var o = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop(function(t) {
                o._onEndedFunc(t);
            }), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this.exception('_stop', t), -1;
        }
    }, Et);
    function Et(t, o, e, n, r) {
        o = yt.call(this, 'CloudGoogleASR2', t, o) || this;
        return o.mAccessToken = '', o.mAccessTokenDate = new Date(), o.mAccessTokenDuration = 0, 
        o.mAudioContext = null, o.mGetUserMedia = null, o.mAudioReader = null, o.mAudioRecorder = null, 
        o.mUserMediaStream = null, o.mRecordingFlag = !1, o.mVolumeCounter = 0, o.mTimeoutCounter = 0, 
        o.mAudioContext = e, o.mGetUserMedia = n, o.mAudioReader = r, o.getAccessTokenFromServer(), 
        o;
    }
    var Ot, vt = (R(kt, Ot = ot), kt.prototype.clearToken = function() {
        this.mAccessToken = '', this.mAccessTokenDate = new Date(), this.mAccessTokenDuration = 0;
    }, kt.prototype.getDiffTime = function(t, o) {
        return o.getTime() - t.getTime();
    }, kt.prototype.getAccessTokenFromServer = function() {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return t.trys.push([ 0, 3, , 4 ]), [ 4, fetch(this.mConfig.serverUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }) ];

                  case 1:
                    return [ 4, t.sent().json() ];

                  case 2:
                    return o = t.sent(), this.mAccessTokenDate = new Date(), this.mAccessToken = o.token || '', 
                    this.mAccessTokenDuration = o.time || 0, [ 3, 4 ];

                  case 3:
                    return o = t.sent(), this.mInitFlag = !1, this.exception('getAccessTokenFromServer', o), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, kt.prototype.getAccessToken = function() {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return o = new Date(), Math.round(this.getDiffTime(this.mAccessTokenDate, o) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            });
        });
    }, kt.prototype.getTextToSpeech = function(e, n, r, i) {
        return L(this, void 0, void 0, function() {
            var o;
            return w(this, function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4, this.getAccessToken() ];

                  case 1:
                    return o = t.sent(), [ 4, fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + o,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            input: {
                                text: e
                            },
                            voice: {
                                languageCode: n,
                                name: r
                            },
                            audioConfig: {
                                audioEncoding: i
                            }
                        })
                    }) ];

                  case 2:
                    return [ 4, t.sent().json() ];

                  case 3:
                    return [ 2, t.sent() ];
                }
            });
        });
    }, kt.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var o = window.atob(t), e = o.length, n = new Uint8Array(e), r = 0; r < e; r++) n[r] = o.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, kt.prototype._start = function(t) {
        var n = this;
        try {
            return this.mConfig.serverUrl ? (this.getTextToSpeech(t.text, t.language, t.voice, 'MP3').then(function(t) {
                try {
                    n.mAudioPlayer = new r.AudioPlayer(n.mAudioContext), n.mAudioPlayer.start();
                    var o = {
                        onaudiostart: function() {},
                        onaudioend: function() {
                            n._stop();
                        }
                    }, e = t.audioContent;
                    n.mAudioPlayer.decodeAudio(o, n.decodeBase64(e)), n._onResult(t);
                } catch (t) {
                    n._onError(new Error('TTS2-Exception: ' + t.message));
                }
            }, function(t) {
                n._onError(new Error('TTS2-Error: ' + t.message)), n._onStop();
            }), 0) : (this.error('_start', 'kein Tokenserver vorhanden'), -1);
        } catch (t) {
            return this.exception('_start', t), -1;
        }
    }, kt.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stopAudio(), this._onStop()), 0;
    }, kt);
    function kt(t, o, e) {
        o = Ot.call(this, 'CloudGoogleTTS2', t, o) || this;
        return o.mAccessToken = '', o.mAccessTokenDate = new Date(), o.mAccessTokenDuration = 0, 
        o.mAudioContext = null, o.mAudioPlayer = null, o.mAudioContext = e, o.getAccessTokenFromServer(), 
        o;
    }
    var Ut, Rt = (R(Lt, Ut = u.Port), Lt.prototype.isServer = function() {
        return this.mCloudGoogleServerFlag;
    }, Lt.prototype.isMock = function() {
        return !1;
    }, Lt.prototype.getType = function() {
        return a;
    }, Lt.prototype.getClass = function() {
        return 'CloudGooglePort';
    }, Lt.prototype.getVersion = function() {
        return l;
    }, Lt.prototype._checkCredentials = function(t) {
        if (!t) return !1;
        var o = !0;
        if ('string' != typeof t.dialogflowTokenServerUrl && (o = !1), t.dialogflowTokenServerUrl || (o = !1), 
        'string' != typeof t.dialogflowProjectId && (o = !1), !(o = !t.dialogflowProjectId ? !1 : o)) {
            if ('string' != typeof t.googleAppKey) return !1;
            if (!t.googleAppKey) return !1;
        }
        return this.mCloudGoogleNLU2Flag = o, !0;
    }, Lt.prototype._initAllObject = function(t) {
        var o = this, e = new r.FileHtml5Reader();
        e.init();
        var n = new r.AudioHtml5Reader();
        if (n.init({
            audioContext: this.mAudioContext
        }), this.mCloudGoogleConfig = new b(e), 0 !== this.mCloudGoogleConfig.init(t)) return -1;
        if (this.mCloudGoogleConfig.isErrorOutput() !== this.isErrorOutput() && this.mCloudGoogleConfig.setErrorOutput(this.isErrorOutput()), 
        this.mCloudGoogleNetwork = new x(), this.mCloudGoogleNetwork.onOnline = function() {
            return o._onOnline();
        }, this.mCloudGoogleNetwork.onOffline = function() {
            return o._onOffline();
        }, this.mCloudGoogleNetwork.onError = function(t) {
            return o._onError(t);
        }, 0 !== this.mCloudGoogleNetwork.init(t)) return -1;
        if (this.isServer() && (this.mCloudGoogleWebSocket = new B(), this.mCloudGoogleWebSocket.onOpen = function(t) {
            return o._onOpen();
        }, this.mCloudGoogleWebSocket.onClose = function() {
            return o._onClose();
        }, this.mCloudGoogleWebSocket.onError = function(t) {
            return o._onError(t);
        }, 0 !== this.mCloudGoogleWebSocket.init(t))) return -1;
        if (this.mCloudGoogleConnect = new F(this.mCloudGoogleConfig, this.mCloudGoogleWebSocket), 
        this.mCloudGoogleNLU = new mt(this.mCloudGoogleConfig, this.mCloudGoogleConnect), 
        this.mCloudGoogleNLU.onStart = function(t) {
            return o._onStart(t.plugin, t.type);
        }, this.mCloudGoogleNLU.onStop = function(t) {
            return o._onStop(t.plugin, t.type);
        }, this.mCloudGoogleNLU.onResult = function(t) {
            return o._onResult(t.result, t.plugin, t.type);
        }, this.mCloudGoogleNLU.onError = function(t) {
            return o._onError(t.error, t.plugin, t.type);
        }, this.mCloudGoogleNLU.onClose = function(t) {
            return o._onClose();
        }, this.mCloudGoogleNLU2 = new _t(this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext, this.mGetUserMedia), 
        this.mCloudGoogleNLU2.onStart = function(t) {
            return o._onStart(t.plugin, t.type);
        }, this.mCloudGoogleNLU2.onStop = function(t) {
            return o._onStop(t.plugin, t.type);
        }, this.mCloudGoogleNLU2.onResult = function(t) {
            return o._onResult(t.result, t.plugin, t.type);
        }, this.mCloudGoogleNLU2.onError = function(t) {
            return o._onError(t.error, t.plugin, t.type);
        }, this.mCloudGoogleNLU2.onClose = function(t) {
            return o._onClose();
        }, this.mAudioContext) {
            this.mCloudGoogleTTS = new vt(this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext), 
            this.mCloudGoogleTTS.onStart = function(t) {
                return o._onStart(t.plugin, t.type);
            }, this.mCloudGoogleTTS.onStop = function(t) {
                return o._onStop(t.plugin, t.type);
            }, this.mCloudGoogleTTS.onResult = function(t) {
                return o._onResult(t.result, t.plugin, t.type);
            }, this.mCloudGoogleTTS.onError = function(t) {
                return o._onError(t.error, t.plugin, t.type);
            }, this.mCloudGoogleTTS.onClose = function(t) {
                return o._onClose();
            };
            try {
                this.mGetUserMedia && (this.mCloudGoogleASR = new Gt(this.mCloudGoogleConfig, this.mCloudGoogleConnect, this.mAudioContext, this.mGetUserMedia, n), 
                this.mCloudGoogleASR.onStart = function(t) {
                    return o._onStart(t.plugin, t.type);
                }, this.mCloudGoogleASR.onStop = function(t) {
                    return o._onStop(t.plugin, t.type);
                }, this.mCloudGoogleASR.onResult = function(t) {
                    return o._onResult(t.result, t.plugin, t.type);
                }, this.mCloudGoogleASR.onError = function(t) {
                    return o._onError(t.error, t.plugin, t.type);
                }, this.mCloudGoogleASR.onClose = function(t) {
                    return o._onClose();
                });
            } catch (t) {
                this.exception('_initAllObject', t);
            }
        }
        return 0;
    }, Lt.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.isInit()) return this.error('init', 'Port ist bereits initialisiert'), 0;
        if (t && 'boolean' == typeof t.googleDynamicCredentialsFlag && t.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(t)) return this.error('init', 'kein AppKey als Parameter uebergeben'), 
        -1;
        t && 'boolean' == typeof t.googleServerFlag && t.googleServerFlag && (this.mCloudGoogleServerFlag = !0), 
        this.mAudioContext = r.AudioContextManager.getAudioContext();
        var o = u.FactoryManager.get(r.USERMEDIA_FACTORY_NAME, r.UserMediaFactory);
        return o && (this.mGetUserMedia = o.create()), 0 !== this._initAllObject(t) || 0 !== Ut.prototype.init.call(this, t) ? -1 : (this.isErrorOutput() && (this.mCloudGoogleNLU ? console.log('CloudGooglePort: NLU ist vorhanden') : console.log('CloudGooglePort: NLU ist nicht vorhanden'), 
        this.mCloudGoogleNLU2 ? console.log('CloudGooglePort: NLU2 ist vorhanden') : console.log('CloudGooglePort: NLU2 ist nicht vorhanden'), 
        this.mCloudGoogleTTS ? console.log('CloudGooglePort: TTS ist vorhanden') : console.log('CloudGooglePort: TTS ist nicht vorhanden'), 
        this.mCloudGoogleASR ? console.log('CloudGooglePort: ASR ist vorhanden') : console.log('CloudGooglePort: ASR ist nicht vorhanden')), 
        0);
    }, Lt.prototype.done = function() {
        return Ut.prototype.done.call(this), this._clearActionTimeout(), this.mAudioContext, 
        this.mAudioContext = null, this.mGetUserMedia = null, this.mCloudGoogleConnect && (this.mCloudGoogleConnect.disconnect(), 
        this.mCloudGoogleConnect = null), this.mCloudGoogleWebSocket && (this.mCloudGoogleWebSocket.done(), 
        this.mCloudGoogleWebSocket = null), this.mCloudGoogleNetwork && (this.mCloudGoogleNetwork.done(), 
        this.mCloudGoogleNetwork = null), this.mCloudGoogleConfig && (this.mCloudGoogleConfig.done(), 
        this.mCloudGoogleConfig = null), this.mCloudGoogleTTS = null, this.mCloudGoogleASR = null, 
        this.mCloudGoogleNLU = null, this.mCloudGoogleNLU2 = null, this.mCloudGoogleServerFlag = !1, 
        this.mDynamicCredentialsFlag = !1, this.mTransaction = null, this.mRunningFlag = !1, 
        this.mDefaultOptions = null, this.mActionTimeoutId = 0, this.mActionTimeout = 6e4, 
        0;
    }, Lt.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, Ut.prototype.reset.call(this, t);
    }, Lt.prototype.setErrorOutput = function(t) {
        Ut.prototype.setErrorOutput.call(this, t), this.mCloudGoogleConfig && this.mCloudGoogleConfig.setErrorOutput(t), 
        this.mCloudGoogleNetwork && this.mCloudGoogleNetwork.setErrorOutput(t), this.mCloudGoogleWebSocket && this.mCloudGoogleWebSocket.setErrorOutput(t), 
        this.mCloudGoogleConnect && this.mCloudGoogleConnect.setErrorOutput(t), this.mCloudGoogleTTS && this.mCloudGoogleTTS.setErrorOutput(t), 
        this.mCloudGoogleASR && this.mCloudGoogleASR.setErrorOutput(t), this.mCloudGoogleNLU && this.mCloudGoogleNLU.setErrorOutput(t), 
        this.mCloudGoogleNLU2 && this.mCloudGoogleNLU2.setErrorOutput(t);
    }, Lt.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this.error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, Lt.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && 0 < this.mActionTimeout && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, Lt.prototype._clearActionTimeout = function() {
        0 < this.mActionTimeoutId && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, Lt.prototype._onOnline = function() {
        return 0;
    }, Lt.prototype._onOffline = function() {
        return this.close(), 0;
    }, Lt.prototype._onStop = function(t, o) {
        this._clearActionTimeout(), this.mCloudGoogleConnect && this.mCloudGoogleConnect.disconnect();
        o = Ut.prototype._onStop.call(this, t, o);
        return this.mTransaction = null, this.mRunningFlag = !1, o;
    }, Lt.prototype._unlockAudio = function(o) {
        var e;
        this.mAudioContext ? 'running' !== this.mAudioContext.state ? 'suspended' === this.mAudioContext.state || 'interrupted' === this.mAudioContext.state ? (e = setTimeout(function() {
            return o(!1);
        }, 2e3), this.mAudioContext.resume().then(function() {
            clearTimeout(e), o(!0);
        }, function(t) {
            console.log('CloudGooglePort._unlockAudio:', t), clearTimeout(e), o(!1);
        })) : o(!1) : o(!0) : o(!1);
    }, Lt.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.googleAppKey && t.googleAppKey && this.mCloudGoogleConfig.appKey !== t.googleAppKey && (this.mCloudGoogleConfig.appKey = t.googleAppKey, 
            this.mCloudGoogleASR && this.mCloudGoogleASR.clearToken(), this.mCloudGoogleTTS && this.mCloudGoogleTTS.clearToken()), 
            'string' == typeof t.googleServerUrl && t.googleServerUrl && this.mCloudGoogleConfig.serverUrl !== t.googleServerUrl && (this.mCloudGoogleConfig.serverUrl = t.googleServerUrl, 
            this.mCloudGoogleASR && this.mCloudGoogleASR.clearToken(), this.mCloudGoogleTTS && this.mCloudGoogleTTS.clearToken()), 
            'string' == typeof t.dialogflowTokenServerUrl && t.dialogflowTokenServerUrl && this.mCloudGoogleConfig.dialogflowTokenServerUrl !== t.dialogflowTokenServerUrl && (this.mCloudGoogleConfig.dialogflowTokenServerUrl = t.dialogflowTokenServerUrl, 
            this.mCloudGoogleNLU2 && this.mCloudGoogleNLU2.clearToken()), 'string' == typeof t.dialogflowProjectId && t.dialogflowProjectId && this.mCloudGoogleConfig.dialogflowProjectId !== t.dialogflowProjectId && (this.mCloudGoogleConfig.dialogflowProjectId = t.dialogflowProjectId, 
            this.mCloudGoogleNLU2 && this.mCloudGoogleNLU2.clearToken()), 'string' == typeof t.dialogflowSessionId && t.dialogflowSessionId && this.mCloudGoogleConfig.dialogflowSessionId !== t.dialogflowSessionId && (this.mCloudGoogleConfig.dialogflowSessionId = t.dialogflowSessionId), 
            'string' == typeof t.dialogflowEnvironmentName && t.dialogflowEnvironmentName && this.mCloudGoogleConfig.dialogflowEnvironmentName !== t.dialogflowEnvironmentName && (this.mCloudGoogleConfig.dialogflowEnvironmentName = t.dialogflowEnvironmentName), 
            0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, Lt.prototype.getConfig = function() {
        return {
            googleAppKey: this.mCloudGoogleConfig.appKey,
            googleServerUrl: this.mCloudGoogleConfig.serverUrl,
            dialogflowTokenServerUrl: this.mCloudGoogleConfig.dialogflowTokenServerUrl,
            dialogflowProjectId: this.mCloudGoogleConfig.dialogflowProjectId,
            dialogflowSessionId: this.mCloudGoogleConfig.dialogflowSessionId,
            dialogflowEnvironmentName: this.mCloudGoogleConfig.dialogflowEnvironmentName
        };
    }, Lt.prototype.isOnline = function() {
        return !!this.mCloudGoogleNetwork && this.mCloudGoogleNetwork.isOnline();
    }, Lt.prototype.isOpen = function() {
        return !this.isServer() || this._isConnect();
    }, Lt.prototype._checkOpen = function(o) {
        var e = this;
        return this.isServer() ? this.isOnline() ? this.isOpen() ? o(!0) : 'CLOSING' === this.mCloudGoogleWebSocket.getState() ? (this.error('_checkOpen', 'Websocket wird geschlossen'), 
        o(!1), -1) : this.mCloudGoogleWebSocket ? (this.mCloudGoogleWebSocket.onOpen = function(t) {
            return e.mCloudGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mCloudGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mCloudGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, o(!0);
        }, this.mCloudGoogleWebSocket.onClose = function() {
            return e.mCloudGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mCloudGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mCloudGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, o(!1), 0;
        }, this.mCloudGoogleWebSocket.onError = function(t) {
            return e.mCloudGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mCloudGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mCloudGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, o(!1), 0;
        }, this.open()) : (this.error('_checkOpen', 'Websocket ist nicht vorhanden'), o(!1), 
        -1) : (this.error('_checkOpen', 'kein Netz vorhanden'), o(!1), -1) : o(!0);
    }, Lt.prototype.open = function(t) {
        return this.isServer() ? this._connect(t) : (this._onOpen(), 0);
    }, Lt.prototype.close = function() {
        return this.isServer() ? this._disconnect() : (this._onClose(), 0);
    }, Lt.prototype._isConnect = function() {
        return !!this.mCloudGoogleWebSocket && this.mCloudGoogleWebSocket.isConnect();
    }, Lt.prototype._connect = function(t) {
        if (this._isConnect()) return 0;
        if (!this.mCloudGoogleWebSocket) return this.error('_connect', 'kein CloudGoogleWebSocket vorhanden'), 
        -1;
        try {
            return this.mCloudGoogleWebSocket.connect(this.mCloudGoogleConfig.serverUrl || d), 
            0;
        } catch (t) {
            return this.exception('_connect', t), -1;
        }
    }, Lt.prototype._disconnect = function() {
        if (!this._isConnect()) return 0;
        if (!this.mCloudGoogleWebSocket) return this.error('_disconnect', 'kein CloudGoogleWebSocket vorhanden'), 
        -1;
        try {
            return this.mCloudGoogleWebSocket.disconnect(), 0;
        } catch (t) {
            return this.exception('_disconnect', t), -1;
        }
    }, Lt.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, Lt.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, Lt.prototype.isRunning = function(t, o) {
        if (!t && !o) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!o) return this.mRunningFlag;
            if (o === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, Lt.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case p:
            o = !!(this.mCloudGoogleNLU && this.mCloudGoogleNLU2 && this.mCloudGoogleNLU2.isInit());
            break;

          case m:
            o = !(!this.mCloudGoogleNLU2 || !this.mCloudGoogleNLU2.isInit());
            break;

          case f:
            o = !(!this.mCloudGoogleASR || !this.mCloudGoogleASR.isInit());
            break;

          case C:
            o = !(!this.mCloudGoogleTTS || !this.mCloudGoogleTTS.isInit());
        }
        return o;
    }, Lt.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, Lt.prototype.start = function(n, r, i) {
        var s = this;
        return this.isRunning() ? (this.error('start', 'Aktion laeuft bereits'), -1) : this.mCloudGoogleConfig.isCredentials() ? this.mTransaction ? (this.error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(t) {
            if (!t) return -1;
            s._setActionTimeout();
            var o = i || {};
            s.mPluginName = n, s.mRunningFlag = !0;
            var e = 0;
            switch (r) {
              case p:
                s.mTransaction = new u.PortTransaction(n, p), e = s._startNLU(s.mTransaction, o.text, o.language || A);
                break;

              case m:
                s.mTransaction = new u.PortTransaction(n, m), e = s._startASRNLU(s.mTransaction, o.language || A);
                break;

              case f:
                s.mTransaction = new u.PortTransaction(n, f), e = s._startASR(s.mTransaction, o.language || A, o.audioURL || '', !1, o.useProgressive || !1);
                break;

              case C:
                s.mTransaction = new u.PortTransaction(n, C), e = s._startTTS(s.mTransaction, o.text, o.language || A, o.voice || v);
                break;

              default:
                s._clearActionTimeout(), s.error('start', 'Keine gueltige Aktion uebergeben ' + r), 
                e = -1;
            }
            return 0 !== e && (s._clearActionTimeout(), s.mTransaction = null, s.mRunningFlag = !1), 
            e;
        }) : (this.error('start', 'Port hat keine Credentials'), -1);
    }, Lt.prototype.stop = function(t, o, e) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this.error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mCloudGoogleConfig.isCredentials()) return this.error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this.error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (o) {
            if (o !== this.mTransaction.type) return this.error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + o + ' != ' + this.mTransaction.type), 
            -1;
        } else o = this.mTransaction.type;
        var n = 0;
        switch (o) {
          case p:
          case m:
            n = this._stopNLU(this.mTransaction);
            break;

          case f:
            n = this._stopASR(this.mTransaction);
            break;

          case C:
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this.error('stop', 'Keine gueltige Aktion uebergeben ' + o), n = -1;
        }
        return n;
    }, Lt.prototype._initRecognition = function(t) {
        var o = this;
        return this.mDefaultOptions = {
            onopen: function() {},
            onclose: function() {
                o._onClose();
            },
            onerror: function(t) {
                o._onError(t);
            }
        }, 0;
    }, Lt.prototype._startNLU = function(t, o, e) {
        if (!o) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!e) return this.error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mCloudGoogleNLU || !this.mCloudGoogleNLU2) return this.error('_startNLU', 'keine CloudGoogle NLU-Anbindung vorhanden'), 
        -1;
        try {
            var n = {
                text: o,
                language: e
            };
            return this.mCloudGoogleNLU2Flag ? this.mCloudGoogleNLU2.start(t, n) : this.mCloudGoogleNLU.start(t, n);
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
        return -1;
    }, Lt.prototype._startASRNLU = function(t, o) {
        if (!o) return this.error('_startASRNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mCloudGoogleNLU || !this.mCloudGoogleNLU2) return this.error('_startASRNLU', 'keine CloudGoogle NLU-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                text: '',
                language: o
            };
            return this.mCloudGoogleNLU2Flag ? this.mCloudGoogleNLU2.start(t, e) : -1;
        } catch (t) {
            return this.exception('_startASRNLU', t), -1;
        }
    }, Lt.prototype._stopNLU = function(t) {
        if (!this.mCloudGoogleNLU || !this.mCloudGoogleNLU2) return this.error('_stopNLU', 'keine CloudGoogle NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudGoogleNLU2Flag ? this.mCloudGoogleNLU2.stop(t) : this.mCloudGoogleNLU.stop(t);
        } catch (t) {
            return this.exception('_stopNLU', t), -1;
        }
        return -1;
    }, Lt.prototype._startASR = function(t, o, e, n, r) {
        if (void 0 === n && (n = !1), void 0 === r && (r = !1), !o) return this.error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mCloudGoogleASR) return this.error('_startASR', 'keine CloudGoogle ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: o,
                nlu: n,
                progressive: r
            };
            return e && (i.audioURL = e), this.mCloudGoogleASR.start(t, i);
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, Lt.prototype._stopASR = function(t) {
        if (!this.mCloudGoogleASR) return this.error('_stopASR', 'keine CloudGoogle ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudGoogleASR.stop(t);
        } catch (t) {
            return this.exception('_stopASR', t), -1;
        }
    }, Lt.prototype._startTTS = function(o, t, e, n) {
        var r = this;
        if (!t) return this.error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mCloudGoogleTTS) return this.error('_startTTS', 'keine CloudGoogle TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: t,
                language: e,
                voice: n
            };
            return this._unlockAudio(function(t) {
                t ? r.mCloudGoogleTTS.start(o, i) : (r.error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                r._onStop(o.plugin, o.type));
            }), 0;
        } catch (t) {
            return this.exception('_startTTS', t), -1;
        }
    }, Lt.prototype._stopTTS = function(t) {
        if (!this.mCloudGoogleTTS) return this.error('_stopTTS', 'keine CloudGoogle TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudGoogleTTS.stop(t);
        } catch (t) {
            return this.exception('_stopTTS', t), -1;
        }
    }, Lt);
    function Lt(t, o) {
        o = Ut.call(this, t || c, o = void 0 === o ? !0 : o) || this;
        return o.mAudioContext = null, o.mGetUserMedia = null, o.mCloudGoogleServerFlag = !1, 
        o.mCloudGoogleConfig = null, o.mCloudGoogleNetwork = null, o.mCloudGoogleWebSocket = null, 
        o.mCloudGoogleConnect = null, o.mCloudGoogleTTS = null, o.mCloudGoogleASR = null, 
        o.mCloudGoogleNLU = null, o.mCloudGoogleNLU2 = null, o.mCloudGoogleNLU2Flag = !0, 
        o.mDynamicCredentialsFlag = !1, o.mTransaction = null, o.mRunningFlag = !1, o.mDefaultOptions = null, 
        o.mActionTimeoutId = 0, o.mActionTimeout = 6e4, o;
    }
    var wt, Nt = (R(bt, wt = u.Port), bt.prototype.isMock = function() {
        return !0;
    }, bt.prototype.getType = function() {
        return a;
    }, bt.prototype.getClass = function() {
        return 'CloudGoogleMock';
    }, bt.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.googleAppKey && (this.googleAppKey = t.googleAppKey), 
        'string' == typeof t.googleAppKey && !!t.googleAppKey);
    }, bt.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.mInitFlag) return this.error('init', 'Init bereits aufgerufen'), 0;
        if (t && 'boolean' == typeof t.errorOutputFlag && t.errorOutputFlag ? this.setErrorOutputOn() : this.setErrorOutputOff(), 
        t && 'boolean' == typeof t.googleDynamicCredentialsFlag && t.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(t); else if (!this._checkCredentials(t)) return (this.isErrorOutput() || t && t.errorOutputFlag) && this.error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.webSocketFlag ? (this.audioContextFlag || (this.error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.googleNLUFlag = !0, this.audioContextFlag && (this.googleASRFlag = !0, 
        this.getUserMediaFlag && (this.googleTTSFlag = !0)), this.isErrorOutput() && (this.googleNLUFlag ? console.log('CloudGoogleMock: NLU ist vorhanden') : console.log('CloudGoogleMock: NLU ist nicht vorhanden'), 
        this.googleTTSFlag ? console.log('CloudGoogleMock: TTS ist vorhanden') : console.log('CloudGoogleMock: TTS ist nicht vorhanden'), 
        this.googleASRFlag ? console.log('CloudGoogleMock: ASR ist vorhanden') : console.log('CloudGoogleMock: ASR ist nicht vorhanden')), 
        this._onInit(0), wt.prototype.init.call(this, t)) : (this.error('init', 'keine WebSocket vorhanden'), 
        this._onInit(-1), -1);
    }, bt.prototype.done = function(t) {
        return wt.prototype.done.call(this), this.webSocketFlag = !0, this.audioContextFlag = !0, 
        this.getUserMediaFlag = !0, this.googleNLUFlag = !1, this.googleASRFlag = !1, this.googleTTSFlag = !1, 
        this.disconnectFlag = !0, this.defaultOptions = null, this.codec = '', this.mTransaction = null, 
        this.mRunningFlag = !1, 0;
    }, bt.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, wt.prototype.reset.call(this, t);
    }, bt.prototype._onStop = function(t, o) {
        return this.mTransaction = null, this.mRunningFlag = !1, wt.prototype._onStop.call(this, t, o);
    }, bt.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.googleAppKey = t.googleAppKey, this.googleServerUrl = t.googleServerUrl, 
            this.dialogflowTokenServerUrl = t.dialogflowTokenServerUrl, this.dialogflowProjectId = t.dialogflowProjectId, 
            this.dialogflowSessionId = t.dialogflowSessionId, this.dialogflowEnvironmentName = t.dialogflowEnvironmentName, 
            0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, bt.prototype.getConfig = function() {
        return {
            googleAppKey: this.googleAppKey,
            googleServerUrl: this.googleServerUrl,
            dialogflowTokenServerUrl: this.dialogflowTokenServerUrl,
            dialogflowProjectId: this.dialogflowProjectId,
            dialogflowSessionId: this.dialogflowSessionId,
            dialogflowEnvironmentName: this.dialogflowEnvironmentName
        };
    }, bt.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, bt.prototype.open = function(t) {
        return this.disconnectFlag && (this.disconnectFlag = !1, this._onOpen()), 0;
    }, bt.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, bt.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, bt.prototype._isCredentials = function() {
        return !!this.googleAppKey;
    }, bt.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case p:
            o = this.googleNLUFlag;
            break;

          case m:
          case f:
            o = this.googleASRFlag;
            break;

          case C:
            o = this.googleTTSFlag;
        }
        return o;
    }, bt.prototype.start = function(t, o, e) {
        if (this.isRunning()) return this.error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this.error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this.error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this.error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var n = e || {};
        this.mRunningFlag = !0;
        var r = 0;
        switch (o) {
          case p:
            this.mTransaction = new u.PortTransaction(t, p), r = this._startNLU(this.mTransaction, n.text, n.language || A);
            break;

          case m:
            this.mTransaction = new u.PortTransaction(t, m), r = this._startASR(this.mTransaction, n.language || A, n.audioURL || '', !0, n.useProgressive || !1);
            break;

          case f:
            this.mTransaction = new u.PortTransaction(t, f), r = this._startASR(this.mTransaction, n.language || A, n.audioURL || '', !1, n.useProgressive || !1);
            break;

          case C:
            this.mTransaction = new u.PortTransaction(t, C), r = this._startTTS(this.mTransaction, n.text, n.language || A, n.voice || v);
            break;

          default:
            this.error('start', 'Keine gueltige Aktion uebergeben ' + o), r = -1;
        }
        return r;
    }, bt.prototype.stop = function(t, o, e) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this.error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this.error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this.error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (o) {
            if (o !== this.mTransaction.type) return this.error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + o + ' != ' + this.mTransaction.type), 
            -1;
        } else o = this.mTransaction.type;
        var n = 0;
        switch (o) {
          case p:
            n = this._stopNLU(this.mTransaction);
            break;

          case m:
          case f:
            n = this._stopASR(this.mTransaction);
            break;

          case C:
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this.error('stop', 'Keine gueltige Aktion uebergeben ' + o), n = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, n;
    }, bt.prototype._startNLU = function(t, o, e) {
        if (!o) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.googleNLUFlag) return this.error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var n = {
                metadata: {
                    intentName: this.intentName
                },
                fulfillment: {
                    speech: this.intentSpeech
                },
                resolvedQuery: o,
                score: this.intentConfidence
            };
            return t.result = n, console.log('CloudGoogleMock._startNLU: _onResult wird aufgerufen'), 
            this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
    }, bt.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, bt.prototype._startASR = function(t, o, e, n, r) {
        if (!this.googleASRFlag) return this.error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = 'Testtext', this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, bt.prototype._stopASR = function(t) {
        if (!this.googleASRFlag) return this.error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_stopASR', t), -1;
        }
    }, bt.prototype._startTTS = function(t, o, e, n) {
        var r = this;
        if (!o) return this.error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.googleTTSFlag) return this.error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return r._onStop(t.plugin, t.type);
            }, 100), 0;
        } catch (t) {
            return this.exception('_startTTS', t), -1;
        }
    }, bt.prototype._stopTTS = function(t) {
        if (!this.googleTTSFlag) return this.error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_stopTTS', t), -1;
        }
    }, bt);
    function bt(t, o) {
        o = wt.call(this, t || g, o = void 0 === o ? !0 : o) || this;
        return o.webSocketFlag = !0, o.audioContextFlag = !0, o.getUserMediaFlag = !0, o.googleNLUFlag = !0, 
        o.googleASRFlag = !0, o.googleTTSFlag = !0, o.disconnectFlag = !0, o.defaultOptions = null, 
        o.codec = '', o.intentName = 'TestIntent', o.intentConfidence = 1, o.intentSpeech = 'TestSpeech', 
        o.mDynamicCredentialsFlag = !1, o.mTransaction = null, o.mRunningFlag = !1, o.googleAppId = '', 
        o.googleAppKey = '', o.googleNluTag = '', o.googleServerUrl = '', o.dialogflowTokenServerUrl = '', 
        o.dialogflowProjectId = '', o.dialogflowSessionId = '', o.dialogflowEnvironmentName = '', 
        o;
    }
    var It = (Dt.setErrorOutputOn = function() {
        Dt.mErrorOutputFlag = !0, u.PortManager.setErrorOutputOn();
    }, Dt.setErrorOutputOff = function() {
        Dt.mErrorOutputFlag = !1, u.PortManager.setErrorOutputOff();
    }, Dt.setErrorOutputFunc = function(t) {
        u.PortManager.setErrorOutputFunc(t);
    }, Dt._initCloudGooglePort = function(t) {
        var o = u.PortManager.get(a, Rt);
        return o ? 0 !== o.init(t) ? (u.PortManager.remove(a), -1) : (Dt.mCurrentPort = o, 
        0) : -1;
    }, Dt._initCloudGoogleMock = function(t) {
        var o = u.PortManager.get(a, Nt);
        return o ? 0 !== o.init(t) ? (console.log('CloudGoogle._initCloudGoogleMock: Error CloudGoogleMock wurde nicht initialisiert'), 
        u.PortManager.remove(a), -1) : (Dt.mCurrentPort = o, 0) : (console.log('CloudGoogle._initCloudGoogleMock: Error CloudGoogleMock wurde nicht erzeugt'), 
        -1);
    }, Dt.init = function(t) {
        if (Dt.mInitFlag) return 0;
        if (!t) return Dt.mErrorOutputFlag && console.log('CloudGoogle.init: Keine CloudGoogle-Parameter uebergeben'), 
        -1;
        'boolean' == typeof t.errorOutputFlag && (t.errorOutputFlag ? Dt.setErrorOutputOn() : Dt.setErrorOutputOff());
        var o = 'CloudGooglePort';
        if ('CloudGooglePort' === (o = t && 'string' == typeof t.googlePortName && 'CloudGoogleMock' === t.googlePortName ? 'CloudGoogleMock' : o)) {
            if (0 !== Dt._initCloudGooglePort(t)) return -1;
        } else {
            if ('CloudGoogleMock' !== o) return Dt.mErrorOutputFlag && console.log('CloudGoogle.init: Kein CloudGoogle PortName vorhanden'), 
            -1;
            if (0 !== Dt._initCloudGoogleMock(t)) return -1;
        }
        return Dt.mInitFlag = !0, 0;
    }, Dt.isInit = function() {
        return Dt.mInitFlag;
    }, Dt.done = function() {
        var t = u.PortManager.find(a), o = 0;
        return (t = t || Dt.mCurrentPort) && (o = t.done(), u.PortManager.remove(a)), Dt.mCurrentPort = null, 
        Dt.mInitFlag = !1, o;
    }, Dt._onOpenEvent = function(t, o, e, n) {
        if ('function' == typeof n) try {
            return n(t, o, e), 0;
        } catch (t) {
            return Dt.mErrorOutputFlag && console.log('CloudGoogle._onOpenEvent: Exception', t.message), 
            -1;
        }
        return 0;
    }, Dt._openCloudGooglePort = function(o) {
        var e = u.PortManager.find(a);
        return (e = e || Dt.mCurrentPort) ? (e.addOpenEvent(a, function(t) {
            return e.removeErrorEvent(a), e.removeOpenEvent(a), 'function' == typeof o && Dt._onOpenEvent(null, a, t.result, o), 
            t.result;
        }), e.addErrorEvent(a, function(t) {
            return e.removeOpenEvent(a), e.removeErrorEvent(a), 'function' == typeof o && Dt._onOpenEvent(t, a, -1, o), 
            0;
        }), e.open()) : (Dt.mErrorOutputFlag && console.log('CloudGoogle._openCloudGooglePort: kein Port vorhanden'), 
        Dt._onOpenEvent(new Error('CloudGoogle._openCloudGooglePort: Kein Port vorhanden'), a, -1, o), 
        -1);
    }, Dt.open = function(t) {
        return Dt.mInitFlag ? Dt._openCloudGooglePort(t) : (Dt.mErrorOutputFlag && console.log('CloudGoogle.open: Init wurde nicht aufgerufen'), 
        Dt._onOpenEvent(new Error('CloudGoogle.open: Init wurde nicht aufgerufen'), a, -1, t), 
        -1);
    }, Dt.setConfig = function(t) {
        return Dt.mCurrentPort ? Dt.mCurrentPort.setConfig(t) : -1;
    }, Dt.getConfig = function() {
        return Dt.mCurrentPort ? Dt.mCurrentPort.getConfig() : {
            googleAppKey: '',
            googleServerUrl: '',
            dialogflowTokenServerUrl: '',
            dialogflowProjectId: '',
            dialogflowSessionId: '',
            dialogflowEnvironmentName: ''
        };
    }, Dt.mInitFlag = !1, Dt.mErrorOutputFlag = !1, Dt.mCurrentPort = null, Dt);
    function Dt() {}
    var Ft = (Pt.init = function(t, n, r) {
        (r = void 0 === r ? !1 : r) ? It.setErrorOutputOn() : It.setErrorOutputOff(), t && t.googleMockFlag && (t.googlePortName = 'CloudGoogleMock');
        var i = !1;
        0 === It.init(t) ? It.open(function(t, o, e) {
            null === t && 0 === e ? (r && console.log('===> Google ist vorhanden'), i = !0) : r && console.log('===> Google ist nicht geoeffnet'), 
            n(i);
        }) : (r && console.log('===> Google ist nicht initialisiert'), n(i));
    }, Pt.done = function() {
        It.done();
    }, Pt.setConfig = function(t) {
        return It.setConfig(t);
    }, Pt.getConfig = function() {
        return It.getConfig();
    }, Pt);
    function Pt() {}
    Mt.prototype.init = function(t) {
        return 0;
    }, Mt.prototype.getName = function() {
        return 'GoogleService';
    }, Mt.prototype.setCredentials = function(t, o, e, n, r, i) {
        return Ft.setConfig({
            googleAppKey: t,
            googleServerUrl: o,
            dialogflowTokenServerUrl: e,
            dialogflowProjectId: n,
            dialogflowSessionId: i = void 0 === i ? '' : i,
            dialogflowEnvironmentName: r = void 0 === r ? '' : r
        });
    }, ot = Mt;
    function Mt() {}
    t.CLOUDGOOGLE_API_VERSION = l, t.CLOUDGOOGLE_ASRNLU_ACTION = m, t.CLOUDGOOGLE_ASR_ACTION = f, 
    t.CLOUDGOOGLE_ASR_LANGUAGE = "de-DE", t.CLOUDGOOGLE_ASR_LANGUAGE1 = y, t.CLOUDGOOGLE_ASR_LANGUAGE2 = 'en-US', 
    t.CLOUDGOOGLE_AUDIOBUFFER_SIZE = 2048, t.CLOUDGOOGLE_AUDIOSAMPLE_RATE = 16e3, t.CLOUDGOOGLE_AUDIOTTS_ID = 789, 
    t.CLOUDGOOGLE_CONFIG_FILE = S, t.CLOUDGOOGLE_CONFIG_LOAD = !1, t.CLOUDGOOGLE_CONFIG_PATH = T, 
    t.CLOUDGOOGLE_DEFAULT_CODEC = "audio/L16;rate=16000", t.CLOUDGOOGLE_DEFAULT_LANGUAGE = A, 
    t.CLOUDGOOGLE_DEFAULT_NAME = "CloudGooglePort", t.CLOUDGOOGLE_DEFAULT_URL = d, t.CLOUDGOOGLE_DEFAULT_VOICE = v, 
    t.CLOUDGOOGLE_DE_LANGUAGE = _, t.CLOUDGOOGLE_EN_LANGUAGE = 'en-US', t.CLOUDGOOGLE_FACTORY_NAME = 'CloudGoogleFactory', 
    t.CLOUDGOOGLE_MOCK_NAME = g, t.CLOUDGOOGLE_NLU2_FLAG = !0, t.CLOUDGOOGLE_NLU_ACTION = p, 
    t.CLOUDGOOGLE_NOACTION_TIMEOUT = 0, t.CLOUDGOOGLE_PCM_CODEC = k, t.CLOUDGOOGLE_PORT_NAME = c, 
    t.CLOUDGOOGLE_SERVER_URL = h, t.CLOUDGOOGLE_SERVER_VERSION = "0.2.1.0009 vom 26.10.2020 (ALPHA)", 
    t.CLOUDGOOGLE_TTS_ACTION = C, t.CLOUDGOOGLE_TTS_LANGUAGE = "de-DE", t.CLOUDGOOGLE_TTS_LANGUAGE1 = G, 
    t.CLOUDGOOGLE_TTS_LANGUAGE2 = 'en-US', t.CLOUDGOOGLE_TTS_VOICE = O, t.CLOUDGOOGLE_TTS_VOICE1 = 'Yannick', 
    t.CLOUDGOOGLE_TTS_VOICE2 = 'Markus', t.CLOUDGOOGLE_TTS_VOICE3 = 'Anna-ML', t.CLOUDGOOGLE_TTS_VOICE4 = E, 
    t.CLOUDGOOGLE_TYPE_NAME = a, t.CLOUDGOOGLE_VERSION_BUILD = e, t.CLOUDGOOGLE_VERSION_DATE = i, 
    t.CLOUDGOOGLE_VERSION_NUMBER = o, t.CLOUDGOOGLE_VERSION_STRING = s, t.CLOUDGOOGLE_VERSION_TYPE = n, 
    t.CLOUDGOOGLE_WORKER_VERSION = "0.2.1.0009 vom 26.10.2020 (ALPHA)", t.CloudGoogle = It, 
    t.CloudGoogleConfig = b, t.CloudGoogleConnect = F, t.GoogleModule = Ft, t.GoogleService = ot, 
    Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
