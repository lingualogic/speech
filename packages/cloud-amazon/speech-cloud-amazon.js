/**
 * Speech-Cloud-Amazon Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? n(exports, require('@speech/core'), require('@speech/common')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common' ], n) : n((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechCloudAmazon = {}, t.speechCore, t.speechCommon);
}(this, function(t, s, r) {
    'use strict';
    var n = '0.2.1', o = '0004', e = 'ALPHA', i = '26.10.2020', a = n + '.' + o + ' vom ' + i + ' (' + e + ')', u = a, l = 'CloudAmazon', m = 'CloudAmazonPort', c = 'CloudAmazonMock', h = 'NLU', p = 'ASR', d = 'ASRNLU', g = 'TTS', A = 'assets/', f = 'cloud-amazon.json', C = 'de-DE', T = C, y = 'deu-DEU', _ = 'de-DE', O = 'Vicki', z = O, S = z, R = 'audio/L16;rate=16000', I = function(t, n) {
        return (I = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, n) {
            t.__proto__ = n;
        } || function(t, n) {
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        })(t, n);
    };
    function N(t, n) {
        function o() {
            this.constructor = t;
        }
        I(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, 
        new o());
    }
    var P, E = (N(F, P = s.ErrorBase), F.prototype._setOption = function(t) {
        t && ('string' == typeof t.amazonConfigPath && (this.mConfigPath = t.amazonConfigPath), 
        'string' == typeof t.amazonConfigFile && (this.mConfigFile = t.amazonConfigFile), 
        'boolean' == typeof t.amazonConfigLoadFlag && (this.mConfigLoadFlag = t.amazonConfigLoadFlag), 
        'string' == typeof t.amazonServerUrl && (this.mConfigServerUrl = t.amazonServerUrl), 
        'string' == typeof t.amazonRegion && (this.mConfigRegion = t.amazonRegion), 'string' == typeof t.amazonIdentityPoolId && (this.mConfigIdentityPoolId = t.amazonIdentityPoolId), 
        'string' == typeof t.amazonUserId && (this.mConfigUserId = t.amazonUserId), 'string' == typeof t.amazonNluTag && (this.mConfigNluTag = t.amazonNluTag));
    }, F.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, F.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = A, this.mConfigFile = f, this.mConfigLoadFlag = !1, 
        this.mConfigServerUrl = "", this.mConfigRegion = '', this.mConfigIdentityPoolId = '', 
        this.mConfigUserId = '', this.mConfigNluTag = '', this.mFileReader = null, this.mOnInitFunc = null, 
        0;
    }, F.prototype.isInit = function() {
        return this.mInitFlag;
    }, F.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, F.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION CloudAmazonConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(F.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(F.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), F.prototype._readConfigData = function(t) {
        if (!t) return this.error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var n = JSON.parse(t);
            return n.URL && (this.serverUrl = n.URL), n.REGION && (this.region = n.REGION), 
            n.IDENTITY_POOL_ID && (this.identityPoolId = n.IDENTITY_POOL_ID), n.USER_ID && (this.userId = n.USER_ID), 
            n.NLU_TAG && (this.nluTag = n.NLU_TAG), this._onInit(0), 0;
        } catch (t) {
            return this.exception('_readConfigData', t), -1;
        }
    }, F.prototype._readError = function(t) {
        this.error('_readError', t), this._onInit(-1);
    }, F.prototype.read = function() {
        if (!this.mFileReader) return this.error('read', 'kein FileReader vorhanden'), this._onInit(-1), 
        -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(F.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(F.prototype, "region", {
        get: function() {
            return this.mConfigRegion;
        },
        set: function(t) {
            this.mConfigRegion = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(F.prototype, "identityPoolId", {
        get: function() {
            return this.mConfigIdentityPoolId;
        },
        set: function(t) {
            this.mConfigIdentityPoolId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(F.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(F.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !1,
        configurable: !0
    }), F.prototype.isCredentials = function() {
        return !(!this.mConfigIdentityPoolId || !this.mConfigRegion);
    }, F);
    function F(t) {
        var n = P.call(this, 'CloudAmazonConfig') || this;
        return n.mInitFlag = !1, n.mConfigPath = A, n.mConfigFile = f, n.mConfigLoadFlag = !1, 
        n.mConfigServerUrl = "", n.mConfigRegion = '', n.mConfigIdentityPoolId = '', n.mConfigUserId = '', 
        n.mConfigNluTag = '', n.mFileReader = null, n.mOnInitFunc = null, n.mOnErrorFunc = null, 
        n.mFileReader = t, n.setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), n;
    }
    var U, v = (N(k, U = s.ErrorBase), k.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, k.prototype.connect = function() {
        if (this.isConnect()) return 0;
        try {
            return (this.mConfig.region && (window.AWS.config.region = this.mConfig.region), 
            this.mConfig.identityPoolId && (window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
                IdentityPoolId: this.mConfig.identityPoolId
            }), !window.AWS.config.credentials)) ? (this.error('connect', 'keine CloudAmazon-Credentials erzeugt'), 
            -1) : (this.mConnectFlag = !0, 0);
        } catch (t) {
            return this.exception('connect', t), -1;
        }
    }, k.prototype.disconnect = function() {
        this.mConnectFlag = !1;
        try {
            window.AWS.config.region = '', window.AWS.config.credentials = null;
        } catch (t) {
            return this.exception('disconnect', t), -1;
        }
        return 0;
    }, k);
    function k(t) {
        var n = U.call(this, 'CloudAmazonConnect') || this;
        return n.mConfig = null, n.mConnectFlag = !1, n.mConfig = t, n;
    }
    var L, b = (N(M, L = r.NetHtml5Connect), M);
    function M() {
        return L.call(this, 'CloudAmazonNetwork') || this;
    }
    var D, w = (N(x, D = s.ErrorBase), x.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, x.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, x.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, x.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, x.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, x.prototype._start = function(t) {}, x.prototype._stop = function() {}, x.prototype.start = function(t, n) {
        if (!t) return this.error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this.error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return this._start(n), 0;
        } catch (t) {
            return this.exception('start', t), -1;
        }
    }, x.prototype.stop = function(t) {
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
    }, x.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, x.prototype.getTransaction = function() {
        return this.mTransaction;
    }, x.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, x);
    function x(t, n, o) {
        t = D.call(this, t || 'CloudAmazonDevice') || this;
        return t.mConfig = null, t.mConnect = null, t.mTransaction = null, t.onStart = null, 
        t.onStop = null, t.onResult = null, t.onError = null, t.onClose = null, t.mConfig = n, 
        t.mConnect = o, t;
    }
    var Z, G = (N(V, Z = w), V.prototype._startAudio = function(t) {}, V.prototype._startASR = function(t) {}, 
    V.prototype._start = function(t) {
        return this.error('_start', 'ASR ist nicht implementiert'), -1;
    }, V.prototype._stop = function() {
        return this.error('_stop', 'ASR ist nicht implementiert'), -1;
    }, V);
    function V(t, n, o, e, r) {
        n = Z.call(this, 'CloudAmazonASR', t, n) || this;
        return n.mAudioContext = null, n.mGetUserMedia = null, n.mAudioReader = null, n.mAudioRecorder = null, 
        n.mUserMediaStream = null, n.mRequestId = 0, n.mVolumeCounter = 0, n.mTimeoutCounter = 0, 
        n.mRecordingFlag = !1, n.mAudioContext = o, n.mGetUserMedia = e, n.mAudioReader = r, 
        n;
    }
    var j, K = (N(W, j = w), W.prototype._start = function(t) {
        var o = this;
        if (!t || !t.text || 'string' != typeof t.text) return this.error('_start', 'kein Text uebergeben'), 
        -1;
        try {
            if (this.mAudioPlayer = new r.AudioPlayer(this.mAudioContext), !this.mAudioPlayer) return this.error('_start', 'AudioPlayer wurde nicht erzeugt'), 
            -1;
            this.mAudioPlayer.onAudioStart = function() {
                o._onStart();
            }, this.mAudioPlayer.onAudioStop = function() {
                o._onStop();
            };
            var n = new window.AWS.Polly({
                apiVersion: '2016-06-10'
            }), e = {
                LanguageCode: t.language || 'de-DE',
                OutputFormat: "pcm",
                SampleRate: "16000",
                Text: t.text || '',
                TextType: 'text',
                VoiceId: t.voice || 'Vicki'
            };
            return n.synthesizeSpeech(e, function(t, n) {
                t ? (o._onError(t), o._onStop()) : n && o.mAudioPlayer.decode({
                    codec: R
                }, n.AudioStream);
            }), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this.exception('_start', t), -1;
        }
    }, W.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, W);
    function W(t, n, o) {
        n = j.call(this, 'CloudAmazonTTS', t, n) || this;
        return n.mAudioContext = null, n.mAudioPlayer = null, n.mAudioContext = o, n;
    }
    var H, B = (N(Y, H = s.Port), Y.prototype.isMock = function() {
        return !1;
    }, Y.prototype.getType = function() {
        return l;
    }, Y.prototype.getClass = function() {
        return 'CloudAmazonPort';
    }, Y.prototype.getVersion = function() {
        return u;
    }, Y.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.amazonRegion && (!!t.amazonRegion && ('string' == typeof t.amazonIdentityPoolId && !!t.amazonIdentityPoolId)));
    }, Y.prototype._initAllObject = function(t) {
        var n = this, o = new r.FileHtml5Reader();
        o.init();
        var e = new r.AudioHtml5Reader();
        if (e.init({
            audioContext: this.mAudioContext
        }), this.mCloudAmazonConfig = new E(o), 0 !== this.mCloudAmazonConfig.init(t)) return -1;
        if (this.mCloudAmazonNetwork = new b(), this.mCloudAmazonNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mCloudAmazonNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mCloudAmazonNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mCloudAmazonNetwork.init(t)) return -1;
        if (this.mCloudAmazonConnect = new v(this.mCloudAmazonConfig), this.mCloudAmazonConnect.setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), this.mAudioContext) {
            this.mCloudAmazonTTS = new K(this.mCloudAmazonConfig, this.mCloudAmazonConnect, this.mAudioContext), 
            this.mCloudAmazonTTS.onStart = function(t) {
                return n._onStart(t.plugin, t.type);
            }, this.mCloudAmazonTTS.onStop = function(t) {
                return n._onStop(t.plugin, t.type);
            }, this.mCloudAmazonTTS.onResult = function(t) {
                return n._onResult(t.result, t.plugin, t.type);
            }, this.mCloudAmazonTTS.onError = function(t) {
                return n._onError(t.error, t.plugin, t.type);
            }, this.mCloudAmazonTTS.onClose = function(t) {
                return n._onClose();
            };
            try {
                this.mGetUserMedia && (this.mCloudAmazonASR = new G(this.mCloudAmazonConfig, this.mCloudAmazonConnect, this.mAudioContext, this.mGetUserMedia, e), 
                this.mCloudAmazonASR.onStart = function(t) {
                    return n._onStart(t.plugin, t.type);
                }, this.mCloudAmazonASR.onStop = function(t) {
                    return n._onStop(t.plugin, t.type);
                }, this.mCloudAmazonASR.onResult = function(t) {
                    return n._onResult(t.result, t.plugin, t.type);
                }, this.mCloudAmazonASR.onError = function(t) {
                    return n._onError(t.error, t.plugin, t.type);
                }, this.mCloudAmazonASR.onClose = function(t) {
                    return n._onClose();
                });
            } catch (t) {
                this.exception('_initAllObject', t);
            }
        }
        return 0;
    }, Y.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.isInit()) return this.error('init', 'Port ist bereits initialisiert'), 0;
        if (!window.AWS) return this.error('init', 'AWS-SDK ist nicht vorhanden'), -1;
        if (t && 'boolean' == typeof t.amazonDynamicCredentialsFlag && t.amazonDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(t)) return this.error('init', 'keine Region und/oder IdentityPoolId als Parameter uebergeben'), 
        -1;
        this.mAudioContext = r.AudioContextManager.getAudioContext();
        var n = s.FactoryManager.get(r.USERMEDIA_FACTORY_NAME, r.UserMediaFactory);
        return n && (this.mGetUserMedia = n.create()), 0 !== this._initAllObject(t) || 0 !== H.prototype.init.call(this, t) ? -1 : (this.isErrorOutput() && (this.mCloudAmazonTTS ? console.log('CloudAmazonPort: TTS ist vorhanden') : console.log('CloudAmazonPort: TTS ist nicht vorhanden'), 
        this.mCloudAmazonASR ? console.log('CloudAmazonPort: ASR ist vorhanden') : console.log('CloudAmazonPort: ASR ist nicht vorhanden')), 
        0);
    }, Y.prototype.done = function() {
        return H.prototype.done.call(this), this._clearActionTimeout(), this.mCloudAmazonNetwork && (this.mCloudAmazonNetwork.done(), 
        this.mCloudAmazonNetwork = null), this.mCloudAmazonConnect && (this.mCloudAmazonConnect.disconnect(), 
        this.mCloudAmazonConnect = null), this.mCloudAmazonConfig && (this.mCloudAmazonConfig.done(), 
        this.mCloudAmazonConfig = null), this.mCloudAmazonTTS = null, this.mCloudAmazonASR = null, 
        this.mAudioContext && (this.mAudioContext = null), this.mGetUserMedia = null, this.mDynamicCredentialsFlag = !1, 
        this.mTransaction = null, this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = 6e4, 0;
    }, Y.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, H.prototype.reset.call(this, t);
    }, Y.prototype.setErrorOutput = function(t) {
        H.prototype.setErrorOutput.call(this, t), this.mCloudAmazonConfig && this.mCloudAmazonConfig.setErrorOutput(t), 
        this.mCloudAmazonNetwork && this.mCloudAmazonNetwork.setErrorOutput(t), this.mCloudAmazonConnect && this.mCloudAmazonConnect.setErrorOutput(t), 
        this.mCloudAmazonTTS && this.mCloudAmazonTTS.setErrorOutput(t), this.mCloudAmazonASR && this.mCloudAmazonASR.setErrorOutput(t);
    }, Y.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this.error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, Y.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && 0 < this.mActionTimeout && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, Y.prototype._clearActionTimeout = function() {
        0 < this.mActionTimeoutId && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, Y.prototype._onOnline = function() {
        return 0;
    }, Y.prototype._onOffline = function() {
        return 0;
    }, Y.prototype._onStop = function(t, n) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        H.prototype._onStop.call(this, t, n);
    }, Y.prototype._unlockAudio = function(n) {
        var o;
        this.mAudioContext ? 'running' !== this.mAudioContext.state ? 'suspended' === this.mAudioContext.state ? (o = setTimeout(function() {
            return n(!1);
        }, 2e3), this.mAudioContext.resume().then(function() {
            clearTimeout(o), n(!0);
        }, function(t) {
            console.log('CloudAmazonPort._unlockAudio:', t), clearTimeout(o), n(!1);
        })) : n(!1) : n(!0) : n(!1);
    }, Y.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.amazonRegion && t.amazonRegion && (this.mCloudAmazonConfig.region = t.amazonRegion), 
            'string' == typeof t.amazonIdentityPoolId && t.amazonIdentityPoolId && (this.mCloudAmazonConfig.identityPoolId = t.amazonIdentityPoolId, 
            console.log('CloudAmazonPort.setConfig: neue Credentials eintragen ', t.amazonIdentityPoolId), 
            this.mCloudAmazonConnect.disconnect(), this.mCloudAmazonConnect.connect()), 0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, Y.prototype.getConfig = function() {
        return {
            amazonRegion: this.mCloudAmazonConfig.region,
            amazonIdentityPoolId: this.mCloudAmazonConfig.identityPoolId
        };
    }, Y.prototype.isOnline = function() {
        return !!this.mCloudAmazonNetwork && this.mCloudAmazonNetwork.isOnline();
    }, Y.prototype.isOpen = function() {
        return !!this.mCloudAmazonConnect && this.mCloudAmazonConnect.isConnect();
    }, Y.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this.error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var n = this.open();
        return t(0 === n), n;
    }, Y.prototype.open = function(t) {
        if (!this.mCloudAmazonConnect) return this.error('open', 'kein CloudAmazonConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var n = this.mCloudAmazonConnect.connect();
        return 0 === n && this._onOpen(), n;
    }, Y.prototype.close = function() {
        return this.isOpen() && this.mCloudAmazonConnect ? (this._onClose(), this.mCloudAmazonConnect.disconnect()) : 0;
    }, Y.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, Y.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, Y.prototype.isRunning = function(t, n) {
        if (!t && !n) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!n) return this.mRunningFlag;
            if (n === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, Y.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case p:
            n = !!this.mCloudAmazonASR;
            break;

          case g:
            n = !!this.mCloudAmazonTTS;
        }
        return n;
    }, Y.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, Y.prototype.start = function(e, r, i) {
        var a = this;
        return this.isRunning() ? (this.error('start', 'Aktion laeuft bereits'), -1) : this.mCloudAmazonConfig.isCredentials() ? this.mTransaction ? (this.error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(t) {
            if (!t) return -1;
            a._setActionTimeout();
            var n = i || {};
            a.mPluginName = e, a.mRunningFlag = !0;
            var o = 0;
            switch (r) {
              case h:
                a.mTransaction = new s.PortTransaction(e, h), o = a._startNLU(a.mTransaction, n.text, n.language || T);
                break;

              case d:
                a.mTransaction = new s.PortTransaction(e, d), o = a._startASR(a.mTransaction, n.language || T, n.audioURL || '', !0, n.useProgressive || !1);
                break;

              case p:
                a.mTransaction = new s.PortTransaction(e, p), o = a._startASR(a.mTransaction, n.language || T, n.audioURL || '', !1, n.useProgressive || !1);
                break;

              case g:
                a.mTransaction = new s.PortTransaction(e, g), o = a._startTTS(a.mTransaction, n.text, n.language || T, n.voice || S);
                break;

              default:
                a._clearActionTimeout(), a.error('start', 'Keine gueltige Aktion uebergeben ' + r), 
                o = -1;
            }
            return o;
        }) : (this.error('start', 'Port hat keine Credentials'), -1);
    }, Y.prototype.stop = function(t, n, o) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this.error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mCloudAmazonConfig.isCredentials()) return this.error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this.error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this.error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this.error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        var e = 0;
        switch (n) {
          case h:
            e = this._stopNLU(this.mTransaction);
            break;

          case p:
            e = this._stopASR(this.mTransaction);
            break;

          case g:
            e = this._stopTTS(this.mTransaction);
            break;

          default:
            this.error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mRunningFlag = !1, e;
    }, Y.prototype._initRecognition = function(t) {
        var n = this;
        return this.mDefaultOptions = {
            onopen: function() {
                console.log('Websocket Opened');
            },
            onclose: function() {
                console.log('Websocket Closed'), n._onClose();
            },
            onerror: function(t) {
                console.error(t), n._onError(t);
            }
        }, 0;
    }, Y.prototype._startNLU = function(t, n, o) {
        return this.error('_startNLU', 'nicht implementiert'), -1;
    }, Y.prototype._stopNLU = function(t) {
        return this.error('_stopNLU', 'nicht implementiert'), -1;
    }, Y.prototype._startASR = function(t, n, o, e, r) {
        if (void 0 === e && (e = !1), void 0 === r && (r = !1), !n) return this.error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mCloudAmazonASR) return this.error('_startASR', 'keine CloudAmazon ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: n,
                nlu: e,
                progressive: r
            };
            return o && (i.audioURL = o), this.mCloudAmazonASR.start(t, i);
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, Y.prototype._stopASR = function(t) {
        if (!this.mCloudAmazonASR) return this.error('_stopASR', 'keine CloudAmazon ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudAmazonASR.stop(t);
        } catch (t) {
            return this.exception('_stopASR', t), -1;
        }
    }, Y.prototype._startTTS = function(n, t, o, e) {
        var r = this;
        if (!t) return this.error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mCloudAmazonTTS) return this.error('_startTTS', 'keine CloudAmazon TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: t,
                language: o,
                voice: e
            };
            return this._unlockAudio(function(t) {
                t ? r.mCloudAmazonTTS.start(n, i) : (r.error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                r._onStop(n.plugin, n.type));
            }), 0;
        } catch (t) {
            return this.exception('_startTTS', t), -1;
        }
    }, Y.prototype._stopTTS = function(t) {
        if (!this.mCloudAmazonTTS) return this.error('_stopTTS', 'keine CloudAmazon TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mCloudAmazonTTS.stop(t);
        } catch (t) {
            return this.exception('_stopTTS', t), -1;
        }
    }, Y);
    function Y(t, n) {
        n = H.call(this, t || m, n = void 0 === n ? !0 : n) || this;
        return n.mAudioContext = null, n.mGetUserMedia = null, n.mCloudAmazonConfig = null, 
        n.mCloudAmazonNetwork = null, n.mCloudAmazonConnect = null, n.mCloudAmazonTTS = null, 
        n.mCloudAmazonASR = null, n.mDynamicCredentialsFlag = !1, n.mTransaction = null, 
        n.mRunningFlag = !1, n.mDefaultOptions = null, n.mActionTimeoutId = 0, n.mActionTimeout = 6e4, 
        n;
    }
    var q, J = (N(X, q = s.Port), X.prototype.isMock = function() {
        return !0;
    }, X.prototype.getType = function() {
        return l;
    }, X.prototype.getClass = function() {
        return 'CloudAmazonMock';
    }, X.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.amazonRegion && (this.amazonRegion = t.amazonRegion), 
        'string' == typeof t.amazonIdentityPoolId && (this.amazonIdentityPoolId = t.amazonIdentityPoolId), 
        'string' == typeof t.amazonNluTag && (this.amazonNluTag = t.amazonNluTag), 'string' == typeof t.amazonRegion && (!!t.amazonRegion && ('string' == typeof t.amazonIdentityPoolId && !!t.amazonIdentityPoolId)));
    }, X.prototype.init = function(t) {
        if (t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutput(t.errorOutputFlag), 
        this.mInitFlag) return this.error('init', 'Init bereits aufgerufen'), 0;
        if (t && 'boolean' == typeof t.amazonDynamicCredentialsFlag && t.amazonDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(t); else if (!this._checkCredentials(t)) return (this.isErrorOutput() || t && t.errorOutputFlag) && this.error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.audioContextFlag || (this.error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.amazonNLUFlag = !0, this.audioContextFlag && (this.amazonASRFlag = !0, 
        this.getUserMediaFlag && (this.amazonTTSFlag = !0)), this.isErrorOutput() && (this.amazonNLUFlag ? console.log('CloudAmazonMock: NLU ist vorhanden') : console.log('CloudAmazonMock: NLU ist nicht vorhanden'), 
        this.amazonTTSFlag ? console.log('CloudAmazonMock: TTS ist vorhanden') : console.log('CloudAmazonMock: TTS ist nicht vorhanden'), 
        this.amazonASRFlag ? console.log('CloudAmazonMock: ASR ist vorhanden') : console.log('CloudAmazonMock: ASR ist nicht vorhanden')), 
        this._onInit(0), q.prototype.init.call(this, t);
    }, X.prototype.done = function(t) {
        return q.prototype.done.call(this), this.audioContextFlag = !0, this.getUserMediaFlag = !0, 
        this.amazonNLUFlag = !1, this.amazonASRFlag = !1, this.amazonTTSFlag = !1, this.disconnectFlag = !0, 
        this.defaultOptions = null, this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 
        0;
    }, X.prototype.reset = function(t) {
        return this.mTransaction = null, this.mRunningFlag = !1, q.prototype.reset.call(this, t);
    }, X.prototype._onStop = function(t, n) {
        return this.mTransaction = null, this.mRunningFlag = !1, q.prototype._onStop.call(this, t, n);
    }, X.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this.error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.amazonRegion = t.amazonRegion, this.amazonIdentityPoolId = t.amazonIdentityPoolId, 
            0;
        } catch (t) {
            return this.exception('setConfig', t), -1;
        }
    }, X.prototype.getConfig = function() {
        return {
            amazonRegion: this.amazonRegion,
            amazonIdentityPoolId: this.amazonIdentityPoolId
        };
    }, X.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, X.prototype.open = function(t) {
        return this.disconnectFlag && (this.disconnectFlag = !1, this._onOpen()), 0;
    }, X.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, X.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, X.prototype._isCredentials = function() {
        return !(!this.amazonRegion || !this.amazonIdentityPoolId);
    }, X.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case h:
            n = this.amazonNLUFlag;
            break;

          case p:
            n = this.amazonASRFlag;
            break;

          case g:
            n = this.amazonTTSFlag;
        }
        return n;
    }, X.prototype.start = function(t, n, o) {
        if (this.isRunning()) return this.error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this.error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this.error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this.error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var e = o || {};
        this.mRunningFlag = !0;
        var r = 0;
        switch (n) {
          case h:
            this.mTransaction = new s.PortTransaction(t, h), r = this._startNLU(this.mTransaction, e.text, e.language || T);
            break;

          case d:
            this.mTransaction = new s.PortTransaction(t, d), r = this._startASR(this.mTransaction, e.language || T, e.audioURL || '', !0, e.useProgressive || !1);
            break;

          case p:
            this.mTransaction = new s.PortTransaction(t, p), r = this._startASR(this.mTransaction, e.language || T, e.audioURL || '', !1, e.useProgressive || !1);
            break;

          case g:
            this.mTransaction = new s.PortTransaction(t, g), r = this._startTTS(this.mTransaction, e.text, e.language || T, e.voice || S);
            break;

          default:
            this.error('start', 'Keine gueltige Aktion uebergeben ' + n), r = -1;
        }
        return r;
    }, X.prototype.stop = function(t, n, o) {
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
        var e = 0;
        switch (n) {
          case h:
            e = this._stopNLU(this.mTransaction);
            break;

          case d:
          case p:
            e = this._stopASR(this.mTransaction);
            break;

          case g:
            e = this._stopTTS(this.mTransaction);
            break;

          default:
            this.error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, e;
    }, X.prototype._startNLU = function(t, n, o) {
        if (!n) return this.error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.amazonNLUFlag) return this.error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var e = [ {
                action: {
                    intent: {
                        value: this.intentName,
                        confidence: this.intentConfidence
                    }
                },
                literal: n
            } ];
            return t.result = e, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this.exception('_startNLU', t), -1;
        }
    }, X.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, X.prototype._startASR = function(t, n, o, e, r) {
        if (!this.amazonASRFlag) return this.error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = 'Testtext', this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_startASR', t), -1;
        }
    }, X.prototype._stopASR = function(t) {
        if (!this.amazonASRFlag) return this.error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_stopASR', t), -1;
        }
    }, X.prototype._startTTS = function(t, n, o, e) {
        var r = this;
        if (!n) return this.error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.amazonTTSFlag) return this.error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return r._onStop(t.plugin, t.type);
            }, 100), 0;
        } catch (t) {
            return this.exception('_startTTS', t), -1;
        }
    }, X.prototype._stopTTS = function(t) {
        if (!this.amazonTTSFlag) return this.error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this.exception('_stopTTS', t), -1;
        }
    }, X);
    function X(t, n) {
        n = q.call(this, t || c, n = void 0 === n ? !0 : n) || this;
        return n.audioContextFlag = !0, n.getUserMediaFlag = !0, n.amazonNLUFlag = !0, n.amazonASRFlag = !0, 
        n.amazonTTSFlag = !0, n.disconnectFlag = !0, n.defaultOptions = null, n.codec = '', 
        n.intentName = 'TestIntent', n.intentConfidence = 1, n.mDynamicCredentialsFlag = !1, 
        n.mTransaction = null, n.mRunningFlag = !1, n.amazonRegion = '', n.amazonIdentityPoolId = '', 
        n.amazonNluTag = '', n;
    }
    var Q = ($.setErrorOutputOn = function() {
        $.mErrorOutputFlag = !0, s.PortManager.setErrorOutputOn();
    }, $.setErrorOutputOff = function() {
        $.mErrorOutputFlag = !1, s.PortManager.setErrorOutputOff();
    }, $.setErrorOutputFunc = function(t) {
        s.PortManager.setErrorOutputFunc(t);
    }, $._initCloudAmazonPort = function(t) {
        var n = s.PortManager.get(l, B);
        return n ? 0 !== n.init(t) ? (s.PortManager.remove(l), -1) : ($.mCurrentPort = n, 
        0) : -1;
    }, $._initCloudAmazonMock = function(t) {
        var n = s.PortManager.get(l, J);
        return n ? 0 !== n.init(t) ? (console.log('CloudAmazon._initCloudAmazonMock: Error CloudAmazonMock wurde nicht initialisiert'), 
        s.PortManager.remove(l), -1) : ($.mCurrentPort = n, 0) : (console.log('CloudAmazon._initCloudAmazonMock: Error CloudAmazonMock wurde nicht erzeugt'), 
        -1);
    }, $.init = function(t) {
        if ($.mInitFlag) return 0;
        if (!t) return $.mErrorOutputFlag && console.log('CloudAmazon.init: Keine CloudAmazon-Parameter uebergeben'), 
        -1;
        'boolean' == typeof t.errorOutputFlag && (t.errorOutputFlag ? $.setErrorOutputOn() : $.setErrorOutputOff());
        var n = 'CloudAmazonPort';
        if ('CloudAmazonPort' === (n = t && 'string' == typeof t.amazonPortName && 'CloudAmazonMock' === t.amazonPortName ? 'CloudAmazonMock' : n)) {
            if (0 !== $._initCloudAmazonPort(t)) return -1;
        } else {
            if ('CloudAmazonMock' !== n) return $.mErrorOutputFlag && console.log('CloudAmazon.init: Kein CloudAmazon PortName vorhanden'), 
            -1;
            if (0 !== $._initCloudAmazonMock(t)) return -1;
        }
        return $.mInitFlag = !0, 0;
    }, $.isInit = function() {
        return $.mInitFlag;
    }, $.done = function() {
        var t = s.PortManager.find(l), n = 0;
        return (t = t || $.mCurrentPort) && (n = t.done(), s.PortManager.remove(l)), $.mCurrentPort = null, 
        $.mInitFlag = !1, n;
    }, $._onOpenEvent = function(t, n, o, e) {
        if ('function' == typeof e) try {
            return e(t, n, o), 0;
        } catch (t) {
            return $.mErrorOutputFlag && console.log('CloudAmazon._onOpenEvent: Exception', t.message), 
            -1;
        }
        return 0;
    }, $._openCloudAmazonPort = function(n) {
        var o = s.PortManager.find(l);
        return (o = o || $.mCurrentPort) ? (o.addOpenEvent(l, function(t) {
            return o.removeErrorEvent(l), o.removeOpenEvent(l), 'function' == typeof n && $._onOpenEvent(null, l, t.result, n), 
            t.result;
        }), o.addErrorEvent(l, function(t) {
            return o.removeOpenEvent(l), o.removeErrorEvent(l), 'function' == typeof n && $._onOpenEvent(t, l, -1, n), 
            0;
        }), o.open()) : ($.mErrorOutputFlag && console.log('CloudAmazon._openCloudAmazonPort: kein Port vorhanden'), 
        $._onOpenEvent(new Error('CloudAmazon._openCloudAmazonPort: Kein Port vorhanden'), l, -1, n), 
        -1);
    }, $.open = function(t) {
        return $.mInitFlag ? $._openCloudAmazonPort(t) : ($.mErrorOutputFlag && console.log('CloudAmazon.open: Init wurde nicht aufgerufen'), 
        $._onOpenEvent(new Error('CloudAmazon.open: Init wurde nicht aufgerufen'), l, -1, t), 
        -1);
    }, $.setConfig = function(t) {
        return $.mCurrentPort ? $.mCurrentPort.setConfig(t) : -1;
    }, $.getConfig = function() {
        return $.mCurrentPort ? $.mCurrentPort.getConfig() : {
            amazonRegion: '',
            amazonIdentityPoolId: ''
        };
    }, $.mInitFlag = !1, $.mErrorOutputFlag = !1, $.mCurrentPort = null, $);
    function $() {}
    var tt = (nt.init = function(t, e, r) {
        (r = void 0 === r ? !1 : r) ? Q.setErrorOutputOn() : Q.setErrorOutputOff(), t && t.amazonMockFlag && (t.amazonPortName = 'CloudAmazonMock');
        var i = !1;
        0 === Q.init(t) ? Q.open(function(t, n, o) {
            null === t && 0 === o ? (r && console.log('===> Amazon ist vorhanden'), i = !0) : r && console.log('===> Amazon ist nicht geoeffnet'), 
            e(i);
        }) : (r && console.log('===> Amazon ist nicht initialisiert'), e(i));
    }, nt.done = function() {
        Q.done();
    }, nt.setConfig = function(t) {
        return Q.setConfig(t);
    }, nt.getConfig = function() {
        return Q.getConfig();
    }, nt);
    function nt() {}
    ot.prototype.init = function(t) {
        return 0;
    }, ot.prototype.getName = function() {
        return 'AmazonService';
    }, ot.prototype.setCredentials = function(t, n) {
        return tt.setConfig({
            amazonRegion: t,
            amazonIdentityPoolId: n
        });
    }, w = ot;
    function ot() {}
    t.AmazonModule = tt, t.AmazonService = w, t.CLOUDAMAZON_API_VERSION = u, t.CLOUDAMAZON_ASRNLU_ACTION = d, 
    t.CLOUDAMAZON_ASR_ACTION = p, t.CLOUDAMAZON_ASR_LANGUAGE = "deu-DEU", t.CLOUDAMAZON_ASR_LANGUAGE1 = y, 
    t.CLOUDAMAZON_ASR_LANGUAGE2 = 'eng-USA', t.CLOUDAMAZON_AUDIOBUFFER_SIZE = 2048, 
    t.CLOUDAMAZON_AUDIOSAMPLE_RATE = 16e3, t.CLOUDAMAZON_AUDIOTTS_ID = 789, t.CLOUDAMAZON_AUDIO_FORMAT = "pcm", 
    t.CLOUDAMAZON_CONFIG_FILE = f, t.CLOUDAMAZON_CONFIG_LOAD = !1, t.CLOUDAMAZON_CONFIG_PATH = A, 
    t.CLOUDAMAZON_DEFAULT_CODEC = "audio/L16;rate=16000", t.CLOUDAMAZON_DEFAULT_LANGUAGE = T, 
    t.CLOUDAMAZON_DEFAULT_NAME = "CloudAmazonPort", t.CLOUDAMAZON_DEFAULT_URL = "", 
    t.CLOUDAMAZON_DEFAULT_VOICE = S, t.CLOUDAMAZON_DE_LANGUAGE = C, t.CLOUDAMAZON_EN_LANGUAGE = 'en-US', 
    t.CLOUDAMAZON_FACTORY_NAME = 'CloudAmazonFactory', t.CLOUDAMAZON_MOCK_NAME = c, 
    t.CLOUDAMAZON_NLU_ACTION = h, t.CLOUDAMAZON_NOACTION_TIMEOUT = 0, t.CLOUDAMAZON_PCM_CODEC = R, 
    t.CLOUDAMAZON_PORT_NAME = m, t.CLOUDAMAZON_SERVER_URL = "", t.CLOUDAMAZON_SERVER_VERSION = "0.2.1.0004 vom 26.10.2020 (ALPHA)", 
    t.CLOUDAMAZON_TTS_ACTION = g, t.CLOUDAMAZON_TTS_LANGUAGE = "de-DE", t.CLOUDAMAZON_TTS_LANGUAGE1 = _, 
    t.CLOUDAMAZON_TTS_LANGUAGE2 = 'en-US', t.CLOUDAMAZON_TTS_VOICE = z, t.CLOUDAMAZON_TTS_VOICE1 = O, 
    t.CLOUDAMAZON_TTS_VOICE2 = 'Markus', t.CLOUDAMAZON_TTS_VOICE3 = 'Anna-ML', t.CLOUDAMAZON_TTS_VOICE4 = 'Petra-ML', 
    t.CLOUDAMAZON_TYPE_NAME = l, t.CLOUDAMAZON_VERSION_BUILD = o, t.CLOUDAMAZON_VERSION_DATE = i, 
    t.CLOUDAMAZON_VERSION_NUMBER = n, t.CLOUDAMAZON_VERSION_STRING = a, t.CLOUDAMAZON_VERSION_TYPE = e, 
    t.CLOUDAMAZON_WORKER_VERSION = "0.2.1.0004 vom 26.10.2020 (ALPHA)", t.CloudAmazon = Q, 
    t.CloudAmazonConfig = E, t.CloudAmazonConnect = v, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
