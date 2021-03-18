/**
 * Speech-Cloud-Microsoft Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? o(exports, require('@speech/core'), require('@speech/common')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common' ], o) : o((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechCloudMicrosoft = {}, t.speechCore, t.speechCommon);
}(this, function(t, u, i) {
    'use strict';
    var o = '0.2.1', n = '0005', r = 'ALPHA', e = '26.10.2020', s = o + '.' + n + ' vom ' + e + ' (' + r + ')', c = s, a = 'CloudMicrosoft', f = 'CloudMicrosoftPort', l = 'CloudMicrosoftMock', h = 'NLU', p = 'ASR', m = 'ASRNLU', g = 'TTS', d = 'assets/', C = 'microsoft.json', T = 'de-DE', S = T, y = 'deu-DEU', _ = 'de-DE', M = 'de-DE-Hedda', O = M, R = O, A = 'audio/L16;rate=16000', E = 'raw-16khz-16bit-mono-pcm', F = function(t, o) {
        return (F = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, o) {
            t.__proto__ = o;
        } || function(t, o) {
            for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
        })(t, o);
    };
    function b(t, o) {
        function n() {
            this.constructor = t;
        }
        F(t, o), t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, 
        new n());
    }
    var L, U = (b(v, L = u.ErrorBase), v.prototype._setOption = function(t) {
        t && ('string' == typeof t.microsoftConfigPath && (this.mConfigPath = t.microsoftConfigPath), 
        'string' == typeof t.microsoftConfigFile && (this.mConfigFile = t.microsoftConfigFile), 
        'boolean' == typeof t.microsoftConfigLoadFlag && (this.mConfigLoadFlag = t.microsoftConfigLoadFlag), 
        'string' == typeof t.microsoftServerUrl && (this.mConfigServerUrl = t.microsoftServerUrl), 
        'string' == typeof t.microsoftRegion && (this.mConfigRegion = t.microsoftRegion), 
        'string' == typeof t.microsoftSubscriptionKey && (this.mConfigSubscriptionKey = t.microsoftSubscriptionKey), 
        'string' == typeof t.microsoftLuisEndpoint && (this.mConfigLuisEndpoint = t.microsoftLuisEndpoint), 
        'string' == typeof t.microsoftUserId && (this.mConfigUserId = t.microsoftUserId), 
        'string' == typeof t.microsoftNluTag && (this.mConfigNluTag = t.microsoftNluTag));
    }, v.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, v.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = d, this.mConfigFile = C, this.mConfigLoadFlag = !1, 
        this.mConfigServerUrl = "", this.mConfigRegion = '', this.mConfigSubscriptionKey = '', 
        this.mConfigLuisEndpoint = '', this.mConfigUserId = '', this.mConfigNluTag = '', 
        this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, v.prototype.isInit = function() {
        return this.mInitFlag;
    }, v.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, v.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION CloudMicrosoftConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(v.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), v.prototype._readConfigData = function(t) {
        if (!t) return this.error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var o = JSON.parse(t);
            return o.URL && (this.serverUrl = o.URL), o.REGION && (this.region = o.REGION), 
            o.SUBSCRIPTION_KEY && (this.subscriptionKey = o.SUBSCRIPTION_KEY), o.LUIS_ENDPOINT && (this.luisEndpoint = o.LUIS_ENDPOINT), 
            o.USER_ID && (this.userId = o.USER_ID), o.NLU_TAG && (this.nluTag = o.NLU_TAG), 
            this._onInit(0), 0;
        } catch (t) {
            return this.exception('_readConfigData', t), -1;
        }
    }, v.prototype._readError = function(t) {
        this.error('_readError', t), this._onInit(-1);
    }, v.prototype.read = function() {
        if (!this.mFileReader) return this.error('read', 'kein FileReader vorhanden'), this._onInit(-1), 
        -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(v.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "region", {
        get: function() {
            return this.mConfigRegion;
        },
        set: function(t) {
            this.mConfigRegion = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "subscriptionKey", {
        get: function() {
            return this.mConfigSubscriptionKey;
        },
        set: function(t) {
            this.mConfigSubscriptionKey = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "luisEndpoint", {
        get: function() {
            return this.mConfigLuisEndpoint;
        },
        set: function(t) {
            this.mConfigLuisEndpoint = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(v.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !1,
        configurable: !0
    }), v.prototype.isCredentials = function() {
        return !(!this.mConfigSubscriptionKey || !this.mConfigRegion);
    }, v);
    function v(t) {
        var o = L.call(this, 'CloudMicrosoftConfig') || this;
        return o.mInitFlag = !1, o.mConfigPath = d, o.mConfigFile = C, o.mConfigLoadFlag = !1, 
        o.mConfigServerUrl = "", o.mConfigRegion = '', o.mConfigSubscriptionKey = '', o.mConfigLuisEndpoint = '', 
        o.mConfigUserId = '', o.mConfigNluTag = '', o.mFileReader = null, o.mOnInitFunc = null, 
        o.mOnErrorFunc = null, o.mFileReader = t, o.setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), o;
    }
    var k, N = (b(I, k = u.ErrorBase), Object.defineProperty(I.prototype, "speechConfig", {
        get: function() {
            return this.mSpeechConfig;
        },
        enumerable: !1,
        configurable: !0
    }), I.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, I.prototype.connect = function() {
        if (this.isConnect()) return 0;
        try {
            return window.SpeechSDK ? this.mConfig.region && this.mConfig.subscriptionKey && (this.mSpeechConfig = window.SpeechSDK.SpeechConfig.fromSubscription(this.mConfig.subscriptionKey, this.mConfig.region), 
            !this.mSpeechConfig) ? (this.error('connect', 'keine CloudMicrosoft-Credentials erzeugt'), 
            -1) : (this.mConnectFlag = !0, 0) : (this.error('connect', 'kein CloudMicrosoft SpeechSDK vorhanden'), 
            -1);
        } catch (t) {
            return this.exception('connect', t), -1;
        }
    }, I.prototype.disconnect = function() {
        return this.mConnectFlag = !1, this.mSpeechConfig = null, 0;
    }, I);
    function I(t) {
        var o = k.call(this, 'CloudMicrosoftConnect') || this;
        return o.mConfig = null, o.mConnectFlag = !1, o.mSpeechConfig = null, o.mConfig = t, 
        o;
    }
    var P, D = (b(x, P = i.NetHtml5Connect), x);
    function x() {
        return P.call(this, 'CloudMicrosoftNetwork') || this;
    }
    var w, K = (b(G, w = u.ErrorBase), G.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, G.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, G.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, G.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, G.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, G.prototype._start = function(t) {}, G.prototype._stop = function() {}, G.prototype.start = function(t, o) {
        if (!t) return this.error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this.error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return this._start(o), 0;
        } catch (t) {
            return this.exception('start', t), -1;
        }
    }, G.prototype.stop = function(t) {
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
    }, G.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, G.prototype.getTransaction = function() {
        return this.mTransaction;
    }, G.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, G);
    function G(t, o, n) {
        t = w.call(this, t || 'CloudMicrosoftDevice') || this;
        return t.mConfig = null, t.mConnect = null, t.mTransaction = null, t.onStart = null, 
        t.onStop = null, t.onResult = null, t.onError = null, t.onClose = null, t.mConfig = o, 
        t.mConnect = n, t;
    }
    var j, H = (b(V, j = K), V.prototype._start = function(t) {
        var o = this;
        try {
            var n = this.mConfig.luisEndpoint;
            if (!n) return this._onError(new Error('NLU-Error: kein Luis-Endpunkt vorhanden')), 
            void this._onStop();
            var r = new XMLHttpRequest(), i = n + t.text;
            r.responseType = 'json', r.onload = function(t) {
                try {
                    o._onResult(r.response);
                } catch (t) {
                    o._onError(new Error('NLU-Exception: ' + t.message));
                }
                o._onStop();
            }, r.onerror = function(t) {
                console.log('CloudMicrosoftNLU._start: onerror ', t);
            }, r.onabort = function(t) {
                console.log('CloudMicrosoftNLU._start: onabort ', t);
            }, r.open('GET', i), r.send();
        } catch (t) {
            this.exception('_start', t);
        }
    }, V.prototype._stop = function() {}, V);
    function V(t, o) {
        return j.call(this, 'CloudMicrosoftNLU', t, o) || this;
    }
    var z, B = (b(q, z = K), q.prototype._startAudio = function(t) {}, q.prototype._startASR = function(t) {
        var o = this;
        try {
            if (!window.SpeechSDK) return this.error('_startASR', 'kein CloudMicrosoft SpeechSDK vorhanden'), 
            -1;
            var n = this.mConnect.speechConfig;
            if (!n) return this.error('_startASR', 'kein CloudMicrosoft SpeechConfig vorhanden'), 
            -1;
            n.speechRecognitionLanguage = 'de-DE', t.language && (n.speechRecognitionLanguage = t.language);
            var r = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            return this.mRecordingFlag = !0, this.mRecognizer = new window.SpeechSDK.SpeechRecognizer(n, r), 
            this.mRecognizer.recognizeOnceAsync(function(t) {
                t.privErrorDetails || (o._onResult(t), o._stop());
            }, function(t) {
                o._onError(new Error('ASR-Error: ' + t)), o._stop();
            }), 0;
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, q.prototype._start = function(t) {
        if (this.mRecordingFlag) return this.error('_start', 'ASR laeuft bereits'), -1;
        t = {
            language: t.language
        };
        return this._startASR(t);
    }, q.prototype._stop = function() {
        this.mRecordingFlag = !1;
        try {
            return this.mRecognizer && (this.mRecognizer.close(), this.mRecognizer = null, this._onStop()), 
            0;
        } catch (t) {
            return -1;
        }
    }, q);
    function q(t, o, n, r, i) {
        o = z.call(this, 'CloudMicrosoftASR', t, o) || this;
        return o.mAudioContext = null, o.mGetUserMedia = null, o.mAudioReader = null, o.mAudioRecorder = null, 
        o.mUserMediaStream = null, o.mRequestId = 0, o.mVolumeCounter = 0, o.mTimeoutCounter = 0, 
        o.mRecordingFlag = !1, o.mRecognizer = null, o.mAudioContext = n, o.mGetUserMedia = r, 
        o.mAudioReader = i, o;
    }
    var Y, X = (b(W, Y = K), W.prototype._getAccessToken = function(i, e) {
        var s = this;
        return new Promise(function(t, o) {
            try {
                var n = 'https://' + i + ".api.cognitive.microsoft.com/sts/v1.0/issueToken", r = new XMLHttpRequest();
                s.mAccessToken = '', r.open('POST', n), r.setRequestHeader('Ocp-Apim-Subscription-Key', e), 
                r.onload = function() {
                    try {
                        s.mAccessToken = r.responseText, t(s.mAccessToken);
                    } catch (t) {
                        s.exception('getAccessToken', t), o();
                    }
                }, r.onerror = function(t) {
                    s.error('getAccessToken', t.message), o();
                }, r.send('');
            } catch (t) {
                s.exception('_getAccessToken', t), o();
            }
        });
    }, W.prototype._getSSMLBody = function(t, o, n) {
        return t ? o ? n ? "<?xml version=\"1.0\"?><speak version=\"1.0\" xml:lang=\"" + o + "\"><voice xml:lang=\"" + o + "\" name=\"" + n + "\">" + t + "</voice></speak>" : (this.error('getSSMLBody', 'keine Stimme uebergeben'), 
        '') : (this.error('getSSMLBody', 'keine Sprache uebergeben'), '') : (this.error('getSSMLBody', 'kein Text uebergeben'), 
        '');
    }, W.prototype._sendToTTS = function(t, o, n, r) {
        var i = this;
        try {
            var e = 'https://' + o + ".tts.speech.microsoft.com/cognitiveservices/v1", s = new XMLHttpRequest();
            return s.open('POST', e), s.setRequestHeader('Authorization', 'Bearer ' + n), s.setRequestHeader('cache-control', 'no-cache'), 
            s.setRequestHeader('X-CloudMicrosoft-OutputFormat', E), s.setRequestHeader('Content-Type', 'application/ssml+xml'), 
            s.responseType = 'arraybuffer', s.onload = function() {
                i.mAudioPlayer.decode(t, s.response);
            }, s.onerror = function(t) {
                i.error('_sentToTTS', t.message);
            }, s.send(r), 0;
        } catch (t) {
            return this.exception('_sendToTTS', t), -1;
        }
    }, W.prototype._start = function(t) {
        var o = this;
        if (!t || !t.text || 'string' != typeof t.text) return this.error('_start', 'kein Text uebergeben'), 
        -1;
        try {
            if (this.mAudioPlayer = new i.AudioPlayer(this.mAudioContext), !this.mAudioPlayer) return this.error('_start', 'AudioPlayer wurde nicht erzeugt'), 
            -1;
            this.mAudioPlayer.onAudioStart = function() {
                o._onStart();
            }, this.mAudioPlayer.onAudioStop = function() {
                o._onStop();
            };
            var n = this._getSSMLBody(t.text, t.language, t.voice);
            if (!n) return -1;
            var r = {
                codec: A
            };
            return this._getAccessToken(this.mConfig.region, this.mConfig.subscriptionKey).then(function(t) {
                o._sendToTTS(r, o.mConfig.region, t, n);
            }).catch(function() {}), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this.exception('_start', t), -1;
        }
    }, W.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, W);
    function W(t, o, n) {
        o = Y.call(this, 'CloudMicrosoftTTS', t, o) || this;
        return o.mAudioContext = null, o.mAudioPlayer = null, o.mAccessToken = '', o.mAudioContext = n, 
        o;
    }
    var J, Z = (b(Q, J = u.Port), Q.prototype.isMock = function() {
        return !1;
    }, Q.prototype.getType = function() {
        return a;
    }, Q.prototype.getClass = function() {
        return 'CloudMicrosoftPort';
    }, Q.prototype.getVersion = function() {
        return c;
    }, Q.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.microsoftRegion && (!!t.microsoftRegion && ('string' == typeof t.microsoftSubscriptionKey && !!t.microsoftSubscriptionKey)));
    }, Q.prototype._initAllObject = function(t) {
        var o = this, n = new i.FileHtml5Reader();
        n.init();
        var r = new i.AudioHtml5Reader();
        if (r.init({
            audioContext: this.mAudioContext
        }), this.mCloudMicrosoftConfig = new U(n), 0 !== this.mCloudMicrosoftConfig.init(t)) return -1;
        if (this.mCloudMicrosoftNetwork = new D(), this.mCloudMicrosoftNetwork.onOnline = function() {
            return o._onOnline();
        }, this.mCloudMicrosoftNetwork.onOffline = function() {
            return o._onOffline();
        }, this.mCloudMicrosoftNetwork.onError = function(t) {
            return o._onError(t);
        }, 0 !== this.mCloudMicrosoftNetwork.init(t)) return -1;
        if (this.mCloudMicrosoftConnect = new N(this.mCloudMicrosoftConfig), this.mCloudMicrosoftConnect.setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), this.mCloudMicrosoftNLU = new H(this.mCloudMicrosoftConfig, this.mCloudMicrosoftConnect), 
        this.mCloudMicrosoftNLU.onStart = function(t) {
            return o._onStart(t.plugin, t.type);
        }, this.mCloudMicrosoftNLU.onStop = function(t) {
            return o._onStop(t.plugin, t.type);
        }, this.mCloudMicrosoftNLU.onResult = function(t) {
            return o._onResult(t.result, t.plugin, t.type);
        }, this.mCloudMicrosoftNLU.onError = function(t) {
            return o._onError(t.error, t.plugin, t.type);
        }, this.mCloudMicrosoftNLU.onClose = function(t) {
            return o._onClose();
        }, this.mAudioContext) {
            this.mCloudMicrosoftTTS = new X(this.mCloudMicrosoftConfig, this.mCloudMicrosoftConnect, this.mAudioContext), 
            this.mCloudMicrosoftTTS.onStart = function(t) {
                return o._onStart(t.plugin, t.type);
            }, this.mCloudMicrosoftTTS.onStop = function(t) {
                return o._onStop(t.plugin, t.type);
            }, this.mCloudMicrosoftTTS.onResult = function(t) {
                return o._onResult(t.result, t.plugin, t.type);
            }, this.mCloudMicrosoftTTS.onError = function(t) {
                return o._onError(t.error, t.plugin, t.type);
            }, this.mCloudMicrosoftTTS.onClose = function(t) {
                return o._onClose();
            };
            try {
                this.mGetUserMedia && (this.mCloudMicrosoftASR = new B(this.mCloudMicrosoftConfig, this.mCloudMicrosoftConnect, this.mAudioContext, this.mGetUserMedia, r), 
                this.mCloudMicrosoftASR.onStart = function(t) {
                    return o._onStart(t.plugin, t.type);
                }, this.mCloudMicrosoftASR.onStop = function(t) {
                    return o._onStop(t.plugin, t.type);
                }, this.mCloudMicrosoftASR.onResult = function(t) {
                    return o._onResult(t.result, t.plugin, t.type);
                }, this.mCloudMicrosoftASR.onError = function(t) {
                    return o._onError(t.error, t.plugin, t.type);
                }, this.mCloudMicrosoftASR.onClose = function(t) {
                    return o._onClose();
                });
            } catch (t) {
                this.exception('_initAllObject', t);
            }
        }
        return 0;
    }, Q.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.isInit()) return this.error('init', 'Port ist bereits initialisiert'), 0;
        if (!window.SpeechSDK) return this.error('init', 'CloudMicrosoft SpeechSDK ist nicht vorhanden'), 
        -1;
        if (t && 'boolean' == typeof t.microsoftDynamicCredentialsFlag && t.microsoftDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(t)) return this.error('init', 'keine Region und/oder SubscriptionKey als Parameter uebergeben'), 
        -1;
        this.mAudioContext = i.AudioContextManager.getAudioContext();
        var o = u.FactoryManager.get(i.USERMEDIA_FACTORY_NAME, i.UserMediaFactory);
        return o && (this.mGetUserMedia = o.create()), 0 !== this._initAllObject(t) || 0 !== J.prototype.init.call(this, t) ? -1 : (this.isErrorOutput() && (this.mCloudMicrosoftNLU ? console.log('CloudMicrosoftPort: NLU ist vorhanden') : console.log('CloudMicrosoftPort: NLU ist nicht vorhanden'), 
        this.mCloudMicrosoftTTS ? console.log('CloudMicrosoftPort: TTS ist vorhanden') : console.log('CloudMicrosoftPort: TTS ist nicht vorhanden'), 
        this.mCloudMicrosoftASR ? console.log('CloudMicrosoftPort: ASR ist vorhanden') : console.log('CloudMicrosoftPort: ASR ist nicht vorhanden')), 
        0);
    }, Q.prototype.done = function() {
        return J.prototype.done.call(this), this._clearActionTimeout(), this.mCloudMicrosoftNetwork && (this.mCloudMicrosoftNetwork.done(), 
        this.mCloudMicrosoftNetwork = null), this.mCloudMicrosoftConnect && (this.mCloudMicrosoftConnect.disconnect(), 
        this.mCloudMicrosoftConnect = null), this.mCloudMicrosoftConfig && (this.mCloudMicrosoftConfig.done(), 
        this.mCloudMicrosoftConfig = null), this.mCloudMicrosoftTTS = null, this.mCloudMicrosoftASR = null, 
        this.mCloudMicrosoftNLU = null, this.mAudioContext && (this.mAudioContext = null), 
        this.mGetUserMedia = null, this.mDynamicCredentialsFlag = !1, this.mTransaction = null, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = 6e4, 0;
    }, Q.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, J.prototype.reset.call(this, t);
    }, Q.prototype.setErrorOutput = function(t) {
        J.prototype.setErrorOutput.call(this, t), this.mCloudMicrosoftConfig && this.mCloudMicrosoftConfig.setErrorOutput(t), 
        this.mCloudMicrosoftNetwork && this.mCloudMicrosoftNetwork.setErrorOutput(t), this.mCloudMicrosoftConnect && this.mCloudMicrosoftConnect.setErrorOutput(t), 
        this.mCloudMicrosoftTTS && this.mCloudMicrosoftTTS.setErrorOutput(t), this.mCloudMicrosoftASR && this.mCloudMicrosoftASR.setErrorOutput(t), 
        this.mCloudMicrosoftNLU && this.mCloudMicrosoftNLU.setErrorOutput(t);
    }, Q.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this.error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, Q.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && 0 < this.mActionTimeout && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, Q.prototype._clearActionTimeout = function() {
        0 < this.mActionTimeoutId && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, Q.prototype._onOnline = function() {
        return 0;
    }, Q.prototype._onOffline = function() {
        return 0;
    }, Q.prototype._onStop = function(t, o) {
        this._clearActionTimeout();
        o = J.prototype._onStop.call(this, t, o);
        return this.mTransaction = null, this.mRunningFlag = !1, o;
    }, Q.prototype._unlockAudio = function(o) {
        var n;
        this.mAudioContext ? 'running' !== this.mAudioContext.state ? 'suspended' === this.mAudioContext.state ? (n = setTimeout(function() {
            return o(!1);
        }, 2e3), this.mAudioContext.resume().then(function() {
            clearTimeout(n), o(!0);
        }, function(t) {
            console.log('CloudMicrosoftPort._unlockAudio:', t), clearTimeout(n), o(!1);
        })) : o(!1) : o(!0) : o(!1);
    }, Q.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.microsoftRegion && t.microsoftRegion && (this.mCloudMicrosoftConfig.region = t.microsoftRegion), 
            'string' == typeof t.microsoftSubscriptionKey && t.microsoftSubscriptionKey && (this.mCloudMicrosoftConfig.subscriptionKey = t.microsoftSubscriptionKey, 
            console.log('CloudMicrosoftPort.setConfig: neue Credentials eintragen ', t.microsoftSubscriptionKey), 
            this.mCloudMicrosoftConnect.disconnect(), this.mCloudMicrosoftConnect.connect()), 
            'string' == typeof t.microsoftLuisEndpoint && t.microsoftLuisEndpoint && (this.mCloudMicrosoftConfig.luisEndpoint = t.microsoftLuisEndpoint), 
            0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, Q.prototype.getConfig = function() {
        return {
            microsoftRegion: this.mCloudMicrosoftConfig.region,
            microsoftSubscriptionKey: this.mCloudMicrosoftConfig.subscriptionKey,
            microsoftLuisEndpoint: this.mCloudMicrosoftConfig.luisEndpoint
        };
    }, Q.prototype.isOnline = function() {
        return !!this.mCloudMicrosoftNetwork && this.mCloudMicrosoftNetwork.isOnline();
    }, Q.prototype.isOpen = function() {
        return !!this.mCloudMicrosoftConnect && this.mCloudMicrosoftConnect.isConnect();
    }, Q.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this.error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var o = this.open();
        return t(0 === o), o;
    }, Q.prototype.open = function(t) {
        if (!this.mCloudMicrosoftConnect) return this.error('open', 'kein CloudMicrosoftConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var o = this.mCloudMicrosoftConnect.connect();
        return 0 === o && this._onOpen(), o;
    }, Q.prototype.close = function() {
        return this.isOpen() && this.mCloudMicrosoftConnect ? (this._onClose(), this.mCloudMicrosoftConnect.disconnect()) : 0;
    }, Q.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, Q.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, Q.prototype.isRunning = function(t, o) {
        if (!t && !o) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!o) return this.mRunningFlag;
            if (o === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, Q.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case h:
            o = !!this.mCloudMicrosoftNLU;
            break;

          case p:
            o = !!this.mCloudMicrosoftASR;
            break;

          case g:
            o = !!this.mCloudMicrosoftTTS;
        }
        return o;
    }, Q.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, Q.prototype.start = function(r, i, e) {
        var s = this;
        return this.isRunning() ? (this.error('start', 'Aktion laeuft bereits'), -1) : this.mCloudMicrosoftConfig.isCredentials() ? this.mTransaction ? (this.error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(t) {
            if (!t) return -1;
            s._setActionTimeout();
            var o = e || {};
            s.mPluginName = r, s.mRunningFlag = !0;
            var n = 0;
            switch (i) {
              case h:
                s.mTransaction = new u.PortTransaction(r, h), n = s._startNLU(s.mTransaction, o.text, o.language || S);
                break;

              case m:
                s.mTransaction = new u.PortTransaction(r, m), n = s._startASR(s.mTransaction, o.language || S, o.audioURL || '', !0, o.useProgressive || !1);
                break;

              case p:
                s.mTransaction = new u.PortTransaction(r, p), n = s._startASR(s.mTransaction, o.language || S, o.audioURL || '', !1, o.useProgressive || !1);
                break;

              case g:
                s.mTransaction = new u.PortTransaction(r, g), n = s._startTTS(s.mTransaction, o.text, o.language || S, o.voice || R);
                break;

              default:
                s._clearActionTimeout(), s.error('start', 'Keine gueltige Aktion uebergeben ' + i), 
                n = -1;
            }
            return n;
        }) : (this.error('start', 'Port hat keine Credentials'), -1);
    }, Q.prototype.stop = function(t, o, n) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this.error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mCloudMicrosoftConfig.isCredentials()) return this.error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this.error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (o) {
            if (o !== this.mTransaction.type) return this.error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + o + ' != ' + this.mTransaction.type), 
            -1;
        } else o = this.mTransaction.type;
        var r = 0;
        switch (o) {
          case h:
            r = this._stopNLU(this.mTransaction);
            break;

          case p:
            r = this._stopASR(this.mTransaction);
            break;

          case g:
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this.error('stop', 'Keine gueltige Aktion uebergeben ' + o), r = -1;
        }
        return this.mRunningFlag = !1, r;
    }, Q.prototype._initRecognition = function(t) {
        var o = this;
        return this.mDefaultOptions = {
            onopen: function() {
                console.log('Websocket Opened');
            },
            onclose: function() {
                console.log('Websocket Closed'), o._onClose();
            },
            onerror: function(t) {
                console.error(t), o._onError(t);
            }
        }, 0;
    }, Q.prototype._startNLU = function(t, o, n) {
        if (!o) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!n) return this.error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mCloudMicrosoftNLU) return this.error('_startNLU', 'keine CloudMicrosoft NLU-Anbindung vorhanden'), 
        -1;
        try {
            var r = {
                text: o,
                language: n
            };
            return this.mCloudMicrosoftNLU.start(t, r);
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
    }, Q.prototype._stopNLU = function(t) {
        if (!this.mCloudMicrosoftNLU) return this.error('_stopNLU', 'keine CloudMicrosoft NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudMicrosoftNLU.stop(t);
        } catch (t) {
            return this.exception('_stopNLU', t), -1;
        }
    }, Q.prototype._startASR = function(t, o, n, r, i) {
        if (void 0 === r && (r = !1), void 0 === i && (i = !1), !o) return this.error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mCloudMicrosoftASR) return this.error('_startASR', 'keine CloudMicrosoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                language: o,
                nlu: r,
                progressive: i
            };
            return n && (e.audioURL = n), this.mCloudMicrosoftASR.start(t, e);
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, Q.prototype._stopASR = function(t) {
        if (!this.mCloudMicrosoftASR) return this.error('_stopASR', 'keine CloudMicrosoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudMicrosoftASR.stop(t);
        } catch (t) {
            return this.exception('_stopASR', t), -1;
        }
    }, Q.prototype._startTTS = function(o, t, n, r) {
        var i = this;
        if (!t) return this.error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mCloudMicrosoftTTS) return this.error('_startTTS', 'keine CloudMicrosoft TTS-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                text: t,
                language: n,
                voice: r
            };
            return this._unlockAudio(function(t) {
                t ? i.mCloudMicrosoftTTS.start(o, e) : (i.error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                i._onStop(o.plugin, o.type));
            }), 0;
        } catch (t) {
            return this.exception('_startTTS', t), -1;
        }
    }, Q.prototype._stopTTS = function(t) {
        if (!this.mCloudMicrosoftTTS) return this.error('_stopTTS', 'keine CloudMicrosoft TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudMicrosoftTTS.stop(t);
        } catch (t) {
            return this.exception('_stopTTS', t), -1;
        }
    }, Q);
    function Q(t, o) {
        o = J.call(this, t || f, o = void 0 === o ? !0 : o) || this;
        return o.mAudioContext = null, o.mGetUserMedia = null, o.mCloudMicrosoftConfig = null, 
        o.mCloudMicrosoftNetwork = null, o.mCloudMicrosoftConnect = null, o.mCloudMicrosoftTTS = null, 
        o.mCloudMicrosoftASR = null, o.mCloudMicrosoftNLU = null, o.mDynamicCredentialsFlag = !1, 
        o.mTransaction = null, o.mRunningFlag = !1, o.mDefaultOptions = null, o.mActionTimeoutId = 0, 
        o.mActionTimeout = 6e4, o;
    }
    var $, tt = (b(ot, $ = u.Port), ot.prototype.isMock = function() {
        return !0;
    }, ot.prototype.getType = function() {
        return a;
    }, ot.prototype.getClass = function() {
        return 'CloudMicrosoftMock';
    }, ot.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.microsoftRegion && (this.microsoftRegion = t.microsoftRegion), 
        'string' == typeof t.microsoftSubscriptionKey && (this.microsoftSubscriptionKey = t.microsoftSubscriptionKey), 
        'string' == typeof t.microsoftLuisEndpoint && (this.microsoftLuisEndpoint = t.microsoftLuisEndpoint), 
        'string' == typeof t.microsoftNluTag && (this.microsoftNluTag = t.microsoftNluTag), 
        'string' == typeof t.microsoftRegion && (!!t.microsoftRegion && ('string' == typeof t.microsoftSubscriptionKey && !!t.microsoftSubscriptionKey)));
    }, ot.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.mInitFlag) return this.error('init', 'Init bereits aufgerufen'), 0;
        if (t && 'boolean' == typeof t.microsoftDynamicCredentialsFlag && t.microsoftDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(t); else if (!this._checkCredentials(t)) return (this.isErrorOutput() || t && t.errorOutputFlag) && this.error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.audioContextFlag || (this.error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.microsoftNLUFlag = !0, this.audioContextFlag && (this.microsoftASRFlag = !0, 
        this.getUserMediaFlag && (this.microsoftTTSFlag = !0)), this.isErrorOutput() && (this.microsoftNLUFlag ? console.log('CloudMicrosoftMock: NLU ist vorhanden') : console.log('CloudMicrosoftMock: NLU ist nicht vorhanden'), 
        this.microsoftTTSFlag ? console.log('CloudMicrosoftMock: TTS ist vorhanden') : console.log('CloudMicrosoftMock: TTS ist nicht vorhanden'), 
        this.microsoftASRFlag ? console.log('CloudMicrosoftMock: ASR ist vorhanden') : console.log('CloudMicrosoftMock: ASR ist nicht vorhanden')), 
        this._onInit(0), $.prototype.init.call(this, t);
    }, ot.prototype.done = function(t) {
        return $.prototype.done.call(this), this.audioContextFlag = !0, this.getUserMediaFlag = !0, 
        this.microsoftNLUFlag = !1, this.microsoftASRFlag = !1, this.microsoftTTSFlag = !1, 
        this.disconnectFlag = !0, this.defaultOptions = null, this.codec = '', this.mTransaction = null, 
        this.mRunningFlag = !1, 0;
    }, ot.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, $.prototype.reset.call(this, t);
    }, ot.prototype._onStop = function(t, o) {
        return this.mTransaction = null, this.mRunningFlag = !1, $.prototype._onStop.call(this, t, o);
    }, ot.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.microsoftRegion = t.microsoftRegion, this.microsoftSubscriptionKey = t.microsoftSubscriptionKey, 
            this.microsoftLuisEndpoint = t.microsoftLuisEndpoint, 0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, ot.prototype.getConfig = function() {
        return {
            microsoftRegion: this.microsoftRegion,
            microsoftSubscriptionKey: this.microsoftSubscriptionKey,
            microsoftLuisEndpoint: this.microsoftLuisEndpoint
        };
    }, ot.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, ot.prototype.open = function(t) {
        return this.disconnectFlag && (this.disconnectFlag = !1, this._onOpen()), 0;
    }, ot.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, ot.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, ot.prototype._isCredentials = function() {
        return !(!this.microsoftRegion || !this.microsoftSubscriptionKey);
    }, ot.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case h:
            o = this.microsoftNLUFlag;
            break;

          case p:
            o = this.microsoftASRFlag;
            break;

          case g:
            o = this.microsoftTTSFlag;
        }
        return o;
    }, ot.prototype.start = function(t, o, n) {
        if (this.isRunning()) return this.error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this.error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this.error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this.error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var r = n || {};
        this.mRunningFlag = !0;
        var i = 0;
        switch (o) {
          case h:
            this.mTransaction = new u.PortTransaction(t, h), i = this._startNLU(this.mTransaction, r.text, r.language || S);
            break;

          case m:
            this.mTransaction = new u.PortTransaction(t, m), i = this._startASR(this.mTransaction, r.language || S, r.audioURL || '', !0, r.useProgressive || !1);
            break;

          case p:
            this.mTransaction = new u.PortTransaction(t, p), i = this._startASR(this.mTransaction, r.language || S, r.audioURL || '', !1, r.useProgressive || !1);
            break;

          case g:
            this.mTransaction = new u.PortTransaction(t, g), i = this._startTTS(this.mTransaction, r.text, r.language || S, r.voice || R);
            break;

          default:
            this.error('start', 'Keine gueltige Aktion uebergeben ' + o), i = -1;
        }
        return i;
    }, ot.prototype.stop = function(t, o, n) {
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
        var r = 0;
        switch (o) {
          case h:
            r = this._stopNLU(this.mTransaction);
            break;

          case m:
          case p:
            r = this._stopASR(this.mTransaction);
            break;

          case g:
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this.error('stop', 'Keine gueltige Aktion uebergeben ' + o), r = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, r;
    }, ot.prototype._startNLU = function(t, o, n) {
        if (!o) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.microsoftNLUFlag) return this.error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var r = {
                topScoringIntent: {
                    intent: this.intentName,
                    score: this.intentConfidence
                },
                query: o
            };
            return t.result = r, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
    }, ot.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, ot.prototype._startASR = function(t, o, n, r, i) {
        if (!this.microsoftASRFlag) return this.error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = 'Testtext', this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, ot.prototype._stopASR = function(t) {
        if (!this.microsoftASRFlag) return this.error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_stopASR', t), -1;
        }
    }, ot.prototype._startTTS = function(t, o, n, r) {
        var i = this;
        if (!o) return this.error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.microsoftTTSFlag) return this.error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return i._onStop(t.plugin, t.type);
            }, 100), 0;
        } catch (t) {
            return this.exception('_startTTS', t), -1;
        }
    }, ot.prototype._stopTTS = function(t) {
        if (!this.microsoftTTSFlag) return this.error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_stopTTS', t), -1;
        }
    }, ot);
    function ot(t, o) {
        o = $.call(this, t || l, o = void 0 === o ? !0 : o) || this;
        return o.audioContextFlag = !0, o.getUserMediaFlag = !0, o.microsoftNLUFlag = !0, 
        o.microsoftASRFlag = !0, o.microsoftTTSFlag = !0, o.disconnectFlag = !0, o.defaultOptions = null, 
        o.codec = '', o.intentName = 'TestIntent', o.intentConfidence = 1, o.mDynamicCredentialsFlag = !1, 
        o.mTransaction = null, o.mRunningFlag = !1, o.microsoftRegion = '', o.microsoftSubscriptionKey = '', 
        o.microsoftLuisEndpoint = '', o.microsoftNluTag = '', o;
    }
    var nt = (rt.setErrorOutputOn = function() {
        rt.mErrorOutputFlag = !0, u.PortManager.setErrorOutputOn();
    }, rt.setErrorOutputOff = function() {
        rt.mErrorOutputFlag = !1, u.PortManager.setErrorOutputOff();
    }, rt.setErrorOutputFunc = function(t) {
        u.PortManager.setErrorOutputFunc(t);
    }, rt._initCloudMicrosoftPort = function(t) {
        var o = u.PortManager.get(a, Z);
        return o ? 0 !== o.init(t) ? (u.PortManager.remove(a), -1) : (rt.mCurrentPort = o, 
        0) : -1;
    }, rt._initCloudMicrosoftMock = function(t) {
        var o = u.PortManager.get(a, tt);
        return o ? 0 !== o.init(t) ? (console.log('CloudMicrosoft._initCloudMicrosoftMock: Error CloudMicrosoftMock wurde nicht initialisiert'), 
        u.PortManager.remove(a), -1) : (rt.mCurrentPort = o, 0) : (console.log('CloudMicrosoft._initCloudMicrosoftMock: Error CloudMicrosoftMock wurde nicht erzeugt'), 
        -1);
    }, rt.init = function(t) {
        if (rt.mInitFlag) return 0;
        if (!t) return rt.mErrorOutputFlag && console.log('CloudMicrosoft.init: Keine CloudMicrosoft-Parameter uebergeben'), 
        -1;
        'boolean' == typeof t.errorOutputFlag && (t.errorOutputFlag ? rt.setErrorOutputOn() : rt.setErrorOutputOff());
        var o = 'CloudMicrosoftPort';
        if ('CloudMicrosoftPort' === (o = t && 'string' == typeof t.microsoftPortName && 'CloudMicrosoftMock' === t.microsoftPortName ? 'CloudMicrosoftMock' : o)) {
            if (0 !== rt._initCloudMicrosoftPort(t)) return -1;
        } else {
            if ('CloudMicrosoftMock' !== o) return rt.mErrorOutputFlag && console.log('CloudMicrosoft.init: Kein CloudMicrosoft PortName vorhanden'), 
            -1;
            if (0 !== rt._initCloudMicrosoftMock(t)) return -1;
        }
        return rt.mInitFlag = !0, 0;
    }, rt.isInit = function() {
        return rt.mInitFlag;
    }, rt.done = function() {
        var t = u.PortManager.find(a), o = 0;
        return (t = t || rt.mCurrentPort) && (o = t.done(), u.PortManager.remove(a)), rt.mCurrentPort = null, 
        rt.mInitFlag = !1, o;
    }, rt._onOpenEvent = function(t, o, n, r) {
        if ('function' == typeof r) try {
            return r(t, o, n), 0;
        } catch (t) {
            return rt.mErrorOutputFlag && console.log('CloudMicrosoft._onOpenEvent: Exception', t.message), 
            -1;
        }
        return 0;
    }, rt._openCloudMicrosoftPort = function(o) {
        var n = u.PortManager.find(a);
        return (n = n || rt.mCurrentPort) ? (n.addOpenEvent(a, function(t) {
            return n.removeErrorEvent(a), n.removeOpenEvent(a), 'function' == typeof o && rt._onOpenEvent(null, a, t.result, o), 
            t.result;
        }), n.addErrorEvent(a, function(t) {
            return n.removeOpenEvent(a), n.removeErrorEvent(a), 'function' == typeof o && rt._onOpenEvent(t, a, -1, o), 
            0;
        }), n.open()) : (rt.mErrorOutputFlag && console.log('CloudMicrosoft._openCloudMicrosoftPort: kein Port vorhanden'), 
        rt._onOpenEvent(new Error('CloudMicrosoft._openCloudMicrosoftPort: Kein Port vorhanden'), a, -1, o), 
        -1);
    }, rt.open = function(t) {
        return rt.mInitFlag ? rt._openCloudMicrosoftPort(t) : (rt.mErrorOutputFlag && console.log('CloudMicrosoft.open: Init wurde nicht aufgerufen'), 
        rt._onOpenEvent(new Error('CloudMicrosoft.open: Init wurde nicht aufgerufen'), a, -1, t), 
        -1);
    }, rt.setConfig = function(t) {
        return rt.mCurrentPort ? rt.mCurrentPort.setConfig(t) : -1;
    }, rt.getConfig = function() {
        return rt.mCurrentPort ? rt.mCurrentPort.getConfig() : {
            microsoftRegion: '',
            microsoftSubscriptionKey: '',
            microsoftLuisEndpoint: ''
        };
    }, rt.mInitFlag = !1, rt.mErrorOutputFlag = !1, rt.mCurrentPort = null, rt);
    function rt() {}
    var it = (et.init = function(t, r, i) {
        (i = void 0 === i ? !1 : i) ? nt.setErrorOutputOn() : nt.setErrorOutputOff(), t && t.microsoftMockFlag && (t.microsoftPortName = 'CloudMicrosoftMock');
        var e = !1;
        0 === nt.init(t) ? nt.open(function(t, o, n) {
            null === t && 0 === n ? (i && console.log('===> Microsoft ist vorhanden'), e = !0) : i && console.log('===> Microsoft ist nicht geoeffnet'), 
            r(e);
        }) : (i && console.log('===> Microsoft ist nicht initialisiert'), r(e));
    }, et.done = function() {
        nt.done();
    }, et.setConfig = function(t) {
        return nt.setConfig(t);
    }, et.getConfig = function() {
        return nt.getConfig();
    }, et);
    function et() {}
    st.prototype.init = function(t) {
        return 0;
    }, st.prototype.getName = function() {
        return 'MicrosoftService';
    }, st.prototype.setCredentials = function(t, o, n) {
        return it.setConfig({
            microsoftRegion: t,
            microsoftSubscriptionKey: o,
            microsoftLuisEndpoint: n = void 0 === n ? '' : n
        });
    }, K = st;
    function st() {}
    t.CLOUDMICROSOFT_API_VERSION = c, t.CLOUDMICROSOFT_ASRNLU_ACTION = m, t.CLOUDMICROSOFT_ASR_ACTION = p, 
    t.CLOUDMICROSOFT_ASR_LANGUAGE = "deu-DEU", t.CLOUDMICROSOFT_ASR_LANGUAGE1 = y, t.CLOUDMICROSOFT_ASR_LANGUAGE2 = 'eng-USA', 
    t.CLOUDMICROSOFT_AUDIOBUFFER_SIZE = 2048, t.CLOUDMICROSOFT_AUDIOSAMPLE_RATE = 16e3, 
    t.CLOUDMICROSOFT_AUDIOTTS_ID = 789, t.CLOUDMICROSOFT_AUDIO_FORMAT = E, t.CLOUDMICROSOFT_CONFIG_FILE = C, 
    t.CLOUDMICROSOFT_CONFIG_LOAD = !1, t.CLOUDMICROSOFT_CONFIG_PATH = d, t.CLOUDMICROSOFT_DEFAULT_CODEC = "audio/L16;rate=16000", 
    t.CLOUDMICROSOFT_DEFAULT_LANGUAGE = S, t.CLOUDMICROSOFT_DEFAULT_NAME = "CloudMicrosoftPort", 
    t.CLOUDMICROSOFT_DEFAULT_URL = "", t.CLOUDMICROSOFT_DEFAULT_VOICE = R, t.CLOUDMICROSOFT_DE_LANGUAGE = T, 
    t.CLOUDMICROSOFT_EN_LANGUAGE = 'en-US', t.CLOUDMICROSOFT_FACTORY_NAME = 'CloudMicrosoftFactory', 
    t.CLOUDMICROSOFT_MOCK_NAME = l, t.CLOUDMICROSOFT_NLU_ACTION = h, t.CLOUDMICROSOFT_PCM_CODEC = A, 
    t.CLOUDMICROSOFT_PORT_NAME = f, t.CLOUDMICROSOFT_SERVER_URL = "", t.CLOUDMICROSOFT_SERVER_VERSION = "0.2.1.0005 vom 26.10.2020 (ALPHA)", 
    t.CLOUDMICROSOFT_TTS_ACTION = g, t.CLOUDMICROSOFT_TTS_LANGUAGE = "de-DE", t.CLOUDMICROSOFT_TTS_LANGUAGE1 = _, 
    t.CLOUDMICROSOFT_TTS_LANGUAGE2 = 'en-US', t.CLOUDMICROSOFT_TTS_VOICE = O, t.CLOUDMICROSOFT_TTS_VOICE1 = M, 
    t.CLOUDMICROSOFT_TTS_VOICE2 = 'de-DE-HeddaRUS', t.CLOUDMICROSOFT_TTS_VOICE3 = 'de-DE-Stefan-Apollo', 
    t.CLOUDMICROSOFT_TYPE_NAME = a, t.CLOUDMICROSOFT_VERSION_BUILD = n, t.CLOUDMICROSOFT_VERSION_DATE = e, 
    t.CLOUDMICROSOFT_VERSION_NUMBER = o, t.CLOUDMICROSOFT_VERSION_STRING = s, t.CLOUDMICROSOFT_VERSION_TYPE = r, 
    t.CLOUDMICROSOFT_WORKER_VERSION = "0.2.1.0005 vom 26.10.2020 (ALPHA)", t.CloudMicrosoft = nt, 
    t.CloudMicrosoftConfig = U, t.CloudMicrosoftConnect = N, t.MicrosoftModule = it, 
    t.MicrosoftService = K, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
