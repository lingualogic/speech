/**
 * Speech-Intent Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? n(exports, require('@speech/core'), require('@speech/common'), require('@speech/cloud'), require('@speech/base'), require('@speech/service')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common', '@speech/cloud', '@speech/base', '@speech/service' ], n) : n((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechIntent = {}, t.speechCore, t.speechCommon, t.speechCloud, t.speechBase, t.speechService);
}(this, function(t, o, e, i, n, r) {
    'use strict';
    var s = o.SPEECH_VERSION_NUMBER, u = o.SPEECH_VERSION_BUILD, c = o.SPEECH_VERSION_TYPE, a = o.SPEECH_VERSION_DATE, p = s + '.' + u + ' vom ' + a + ' (' + c + ')', l = '1.2', h = 'Intent', g = 'IntentComponentFactory', L = 'IntentComponent', m = 'IntentService', f = !1, N = 'de', R = function(t, n) {
        return (R = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, n) {
            t.__proto__ = n;
        } || function(t, n) {
            for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
        })(t, n);
    };
    function y(t, n) {
        function e() {
            this.constructor = t;
        }
        R(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, 
        new e());
    }
    var U, _ = 'NLUFactory', E = 'NLU', v = 'NLUMock', d = 'NLUHtml5', I = 'NLUNuance', O = 'NLUGoogle', T = 'NLUMicrosoft', P = 'NLURasa', F = 'NLUGroup', C = F, b = 'de-DE', S = 'en-US', A = b, x = (y(k, U = o.Plugin), 
    k.prototype.getType = function() {
        return E;
    }, k.prototype.getClass = function() {
        return 'NLUPlugin';
    }, k.prototype.init = function(t) {
        return this.isInit() ? (this.error('init', 'init doppelt aufgerufen'), -1) : 0 !== U.prototype.init.call(this, t) ? -1 : ((!this._detectRecognition() || 0 !== this._initRecognition(t)) && this.setActiveOff(), 
        0);
    }, k.prototype.done = function() {
        return this.isListenRunning() && this.stopListen(), this._clearRecognitionTimeout(), 
        this.mListenTimeoutTime = 3e4, this.mListenRunningFlag = !1, this.mListenLanguage = A, 
        this.mOnConnectFunc = null, this.mOnDisconnectFunc = null, this.mOnListenStartFunc = null, 
        this.mOnListenStopFunc = null, this.mOnListenResultFunc = null, this.mOnIntentResultFunc = null, 
        U.prototype.done.call(this);
    }, k.prototype.isActive = function() {
        return !!this._isRecognition() && U.prototype.isActive.call(this);
    }, k.prototype.setActiveOn = function() {
        return this._isRecognition() ? U.prototype.setActiveOn.call(this) : -1;
    }, k.prototype._onConnect = function() {
        try {
            return 'function' == typeof this.mOnConnectFunc ? this.mOnConnectFunc() : 0;
        } catch (t) {
            return this.exception('_onConnect', t), -1;
        }
    }, k.prototype._onDisconnect = function() {
        try {
            return 'function' == typeof this.mOnDisconnectFunc ? this.mOnDisconnectFunc() : 0;
        } catch (t) {
            return this.exception('_onDisconnect', t), -1;
        }
    }, k.prototype._onListenStart = function() {
        try {
            return 'function' == typeof this.mOnListenStartFunc ? this.mOnListenStartFunc() : 0;
        } catch (t) {
            return this.exception('_onListenStart', t), -1;
        }
    }, k.prototype._onListenStop = function() {
        try {
            return 'function' == typeof this.mOnListenStopFunc ? this.mOnListenStopFunc() : 0;
        } catch (t) {
            return this.exception('_onListenStop', t), -1;
        }
    }, k.prototype._onListenResult = function(t) {
        try {
            return 'function' == typeof this.mOnListenResultFunc ? this.mOnListenResultFunc(t) : 0;
        } catch (t) {
            return this.exception('_onListenResult', t), -1;
        }
    }, k.prototype._onIntentResult = function(t) {
        try {
            return 'function' == typeof this.mOnIntentResultFunc ? this.mOnIntentResultFunc(t) : 0;
        } catch (t) {
            return this.exception('_onIntentResult', t), -1;
        }
    }, Object.defineProperty(k.prototype, "onConnect", {
        set: function(t) {
            this.mOnConnectFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(k.prototype, "onDisconnect", {
        set: function(t) {
            this.mOnDisconnectFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(k.prototype, "onListenStart", {
        set: function(t) {
            this.mOnListenStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(k.prototype, "onListenStop", {
        set: function(t) {
            this.mOnListenStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(k.prototype, "onListenResult", {
        set: function(t) {
            this.mOnListenResultFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(k.prototype, "onIntentResult", {
        set: function(t) {
            this.mOnIntentResultFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), k.prototype._detectRecognition = function() {
        return !1;
    }, k.prototype._initRecognition = function(t) {
        return -1;
    }, k.prototype._isRecognition = function() {
        return !1;
    }, k.prototype.isIntent = function() {
        return !1;
    }, k.prototype.isListen = function() {
        return !1;
    }, k.prototype._setRecognitionTimeout = function() {
        var t = this;
        this._clearRecognitionTimeout(), this.mListenTimeoutId = window.setTimeout(function() {
            t.stopListen();
        }, this.mListenTimeoutTime);
    }, k.prototype._clearRecognitionTimeout = function() {
        this.mListenTimeoutId && (clearTimeout(this.mListenTimeoutId), this.mListenTimeoutId = 0);
    }, k.prototype._onRecognitionOpen = function() {
        return this._onConnect();
    }, k.prototype._onRecognitionClose = function() {
        return this._onDisconnect();
    }, k.prototype._onRecognitionStart = function() {
        return 0;
    }, k.prototype._onRecognitionEnd = function() {
        return this._stopListen();
    }, k.prototype._onRecognitionSpeechStart = function() {
        return this._clearRecognitionTimeout(), 0;
    }, k.prototype._onRecognitionSpeechEnd = function() {
        return this._stopListen();
    }, k.prototype._getRecognitionResult = function(t) {
        return t;
    }, k.prototype._onRecognitionResult = function(t) {
        var n = 0;
        try {
            n = this._onListenResult(this._getRecognitionResult(t));
        } catch (t) {
            this.exception('_onRecognitionResult', t), n = -1;
        }
        return n = 0 !== this._stopListen() ? -1 : n;
    }, k.prototype._getRecognitionIntentResult = function(t) {
        return t;
    }, k.prototype._onRecognitionIntentResult = function(t) {
        var n = 0;
        try {
            n = this._onIntentResult(this._getRecognitionIntentResult(t));
        } catch (t) {
            this.exception('_onRecognitionResult', t), n = -1;
        }
        return n = 0 !== this._stopListen() ? -1 : n;
    }, k.prototype._onRecognitionNoMatch = function(t) {
        return this._stopListen();
    }, k.prototype._onRecognitionError = function(t) {
        try {
            var n = t;
            if ('string' == typeof t.error && !t.message) switch (t.error) {
              case 'network':
                n = new Error('NLU-Error: Netzwerk nicht eingeschaltet');
                break;

              case 'no-speech':
                n = new Error('NLU-Error: Keine Sprache aufgenommen');
                break;

              case 'not-allowed':
                n = new Error('NLU-Error: Kein Mikrofon vorhanden');
                break;

              default:
                n = new Error(t.error);
            }
            var e = this._onError(n);
            return e = 0 !== this._stopListen() ? -1 : e;
        } catch (t) {
            return this.exception('_onRecognitionError', t), -1;
        }
    }, k.prototype._startRecognition = function() {
        return -1;
    }, k.prototype._stopRecognition = function() {
        return -1;
    }, k.prototype._abortRecognition = function() {
        return -1;
    }, k.prototype._isRecognitionRunning = function() {
        return !0;
    }, k.prototype.isNLU = function() {
        return !0;
    }, k.prototype.insertNLU = function(t, n, e) {
        return -1;
    }, k.prototype.removeNLU = function(t) {
        return 0;
    }, k.prototype.setNLU = function(t) {
        return 0;
    }, k.prototype.getNLU = function() {
        return this.getName();
    }, k.prototype.getNLUList = function() {
        return [ this.getName() ];
    }, k.prototype.setLanguage = function(t) {
        var n = 0;
        switch (t) {
          case 'de':
            this.mListenLanguage = b;
            break;

          case 'en':
            this.mListenLanguage = S;
            break;

          default:
            this.error('setLanguage', 'keine gueltige Sprache uebergeben'), n = -1;
        }
        return n;
    }, k.prototype.getLanguage = function() {
        var t = '';
        switch (this.mListenLanguage) {
          case b:
            t = 'de';
            break;

          case S:
            t = 'en';
            break;

          default:
            t = '';
        }
        return t;
    }, k.prototype.getLanguageList = function() {
        return [ 'de', 'en' ];
    }, k.prototype._getNLULanguage = function() {
        return this.mListenLanguage;
    }, k.prototype._startRecognitionIntent = function(t) {
        return this.error('_startRecognitionIntent', 'Keine NLU vorhanden'), -1;
    }, k.prototype.startIntent = function(t) {
        if (!this.isActive()) return this.isErrorOutput() && console.log('NLUPlugin.startIntent: NLU ist nicht aktiv'), 
        0;
        if (!this.isIntent()) return this.error('startIntent', 'keine NLU vorhanden'), -1;
        if (!t) return this.error('startIntent', 'kein Text uebergeben'), -1;
        if (this.isListenRunning()) return this.error('startIntent', 'Sprachanalyse laeuft bereits'), 
        -1;
        try {
            if (0 !== this._startRecognitionIntent(t)) return -1;
        } catch (t) {
            return this.exception('startIntent', t), -1;
        }
        return this.mListenRunningFlag = !0, this._onListenStart();
    }, k.prototype.isListenRunning = function() {
        return this.mListenRunningFlag && this._isRecognitionRunning();
    }, k.prototype.setListenTimeout = function(t) {
        this.mListenTimeoutTime = t;
    }, k.prototype.startListen = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('NLUPlugin.startListen: NLU ist nicht aktiv'), 
        0;
        if (!this.isListen()) return this.error('startIntent', 'keine ASRNLU vorhanden'), 
        -1;
        if (this.isListenRunning()) return this.error('startListen', 'Spracheingabe laeuft bereits'), 
        -1;
        this._setRecognitionTimeout();
        try {
            if (0 !== this._startRecognition()) return -1;
        } catch (t) {
            return this.exception('startListen', t), -1;
        }
        return this.mListenRunningFlag = !0, this._onListenStart();
    }, k.prototype.getStartListenFunc = function() {
        var t = this;
        return function() {
            return t.startListen();
        };
    }, k.prototype._stopListen = function() {
        var t = 0;
        return this.isListenRunning() && (this._clearRecognitionTimeout(), this.mListenRunningFlag = !1, 
        0 !== this._onListenStop() && (t = -1)), t;
    }, k.prototype.stopListen = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('NLUPlugin.stopListen: NLU ist nicht aktiv'), 
        0;
        if (!this.isListenRunning()) return 0;
        this._clearRecognitionTimeout();
        var n = 0;
        try {
            n = this._stopRecognition();
        } catch (t) {
            this.exception('stopListen', t), n = -1;
        }
        return this.isListenRunning() && (this.mListenRunningFlag = !1, 0 !== this._onListenStop() && (n = -1)), 
        n;
    }, k.prototype.getStopListenFunc = function() {
        var t = this;
        return function() {
            return t.stopListen();
        };
    }, k.prototype.abortListen = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('NLUPlugin.abortListen: NLU ist nicht aktiv'), 
        0;
        if (!this.isListenRunning()) return 0;
        this._clearRecognitionTimeout();
        var n = 0;
        try {
            n = this._abortRecognition();
        } catch (t) {
            this.exception('abortListen', t), n = -1;
        }
        return this.isListenRunning() && (this.mListenRunningFlag = !1, 0 !== this._onListenStop() && (n = -1)), 
        n;
    }, k);
    function k(t, n) {
        n = U.call(this, t || "NLU", n = void 0 === n ? !0 : n) || this;
        return n.mListenRunningFlag = !1, n.mListenLanguage = A, n.mListenTimeoutId = 0, 
        n.mListenTimeoutTime = 3e4, n.mOnConnectFunc = null, n.mOnDisconnectFunc = null, 
        n.mOnListenStartFunc = null, n.mOnListenStopFunc = null, n.mOnListenResultFunc = null, 
        n.mOnIntentResultFunc = null, n;
    }
    var M, G = (y(w, M = x), w.prototype.getClass = function() {
        return 'NLUMock';
    }, w.prototype.isMock = function() {
        return !0;
    }, w.prototype.done = function() {
        return this.recognitionFlag = !0, this.recognitionResult = null, this.initRecognitionResult = 0, 
        this.startRecognitionResult = 0, this.stopRecognitionResult = 0, this.abortRecognitionResult = 0, 
        this.startRecognitionExceptionFlag = !1, this.stopRecognitionExceptionFlag = !1, 
        this.abortRecognitionExceptionFlag = !1, this.startRecognitionExceptionText = 'TestException startRecognition', 
        this.stopRecognitionExceptionText = 'TestException stopRecognition', this.abortRecognitionExceptionText = 'TestException abortRecognition', 
        this.onStartFunc = function() {
            return 0;
        }, this.onEndFunc = function() {
            return 0;
        }, this.onSpeechStartFunc = function() {
            return 0;
        }, this.onSpeechEndFunc = function() {
            return 0;
        }, this.onResultFunc = function() {
            return '';
        }, this.onNoMatchFunc = function() {
            return 0;
        }, this.onErrorFunc = function() {
            return 0;
        }, M.prototype.done.call(this);
    }, w.prototype._detectRecognition = function() {
        return this.recognitionFlag;
    }, w.prototype._initRecognition = function(t) {
        return this.initRecognitionResult;
    }, w.prototype._isRecognition = function() {
        return this.recognitionFlag;
    }, w.prototype._getRecognitionResult = function(t) {
        return this.recognitionResult;
    }, w.prototype._startRecognition = function() {
        if (this.startRecognitionExceptionFlag) throw new Error(this.startRecognitionExceptionText);
        return this.onStartFunc(), this.onSpeechStartFunc(), this.onResultFunc(), this.onNoMatchFunc(), 
        this.onSpeechEndFunc(), this.onErrorFunc(), this.onEndFunc(), this.startRecognitionResult;
    }, w.prototype._stopRecognition = function() {
        if (this.stopRecognitionExceptionFlag) throw new Error(this.stopRecognitionExceptionText);
        return this.onSpeechEndFunc(), this.onErrorFunc(), this.onEndFunc(), this.stopRecognitionResult;
    }, w.prototype._abortRecognition = function() {
        if (this.abortRecognitionExceptionFlag) throw new Error(this.abortRecognitionExceptionText);
        return this.onEndFunc(), this.onErrorFunc(), this.abortRecognitionResult;
    }, w);
    function w(t, n) {
        n = M.call(this, t || v, n = void 0 === n ? !0 : n) || this;
        return n.recognitionFlag = !0, n.recognitionResult = '', n.initRecognitionResult = 0, 
        n.startRecognitionResult = 0, n.startRecognitionExceptionFlag = !1, n.startRecognitionExceptionText = 'TestException startRecognition', 
        n.stopRecognitionResult = 0, n.stopRecognitionExceptionFlag = !1, n.stopRecognitionExceptionText = 'TestException stopRecognition', 
        n.abortRecognitionResult = 0, n.abortRecognitionExceptionFlag = !1, n.abortRecognitionExceptionText = 'TestException abortRecognition', 
        n.onStartFunc = function() {
            return 0;
        }, n.onEndFunc = function() {
            return 0;
        }, n.onSpeechStartFunc = function() {
            return 0;
        }, n.onSpeechEndFunc = function() {
            return 0;
        }, n.onResultFunc = function() {
            return '';
        }, n.onNoMatchFunc = function() {
            return 0;
        }, n.onErrorFunc = function() {
            return 0;
        }, n;
    }
    var D, H = (y(q, D = x), q.prototype.getClass = function() {
        return 'NLUHtml5';
    }, q.prototype.done = function() {
        if (this.isListenRunning() && this.mRecognition) try {
            this.mRecognition.abort();
        } catch (t) {
            this.exception('done', t);
        }
        return this.mRecognitionClass = null, this.mGrammarListClass = null, this.mGrammarList = null, 
        this.mRecognition = null, D.prototype.done.call(this);
    }, q.prototype.setErrorOutput = function(t) {
        this.mRecognitionFactory && this.mRecognitionFactory.setErrorOutput(t), D.prototype.setErrorOutput.call(this, t);
    }, q.prototype._detectRecognition = function() {
        if (!this.mRecognitionFactory) return this.error('_detectRecognition', 'keine Recognition-Fabrik vorhanden'), 
        !1;
        try {
            this.mRecognitionClass = this.mRecognitionFactory.getSpeechRecognitionClass();
        } catch (t) {
            return this.exception('_detectRecognition', t), !1;
        }
        return null !== this.mRecognitionClass || (this.error('_detectRecognition', 'Kein HTML5 SpeechRecognition API vorhanden'), 
        !1);
    }, q.prototype._initRecognition = function(t) {
        var n = this;
        try {
            this.mRecognition = new this.mRecognitionClass(), this.mRecognition.lang = this._getNLULanguage(), 
            this.mRecognition.continuous = !1, this.mRecognition.interimResults = !1, this.mRecognition.maxAlternatives = 1;
        } catch (t) {
            return this.exception('_initRecognition', t), -1;
        }
        return this.mRecognition.onstart = function() {
            return n._onRecognitionStart();
        }, this.mRecognition.onend = function() {
            return n._onRecognitionEnd();
        }, this.mRecognition.onspeechstart = function() {
            return n._onRecognitionSpeechStart();
        }, this.mRecognition.onspeechend = function() {
            return n._onRecognitionSpeechEnd();
        }, this.mRecognition.onresult = function(t) {
            return n._onRecognitionResult(t);
        }, this.mRecognition.onnomatch = function(t) {
            return n._onRecognitionNoMatch(t);
        }, this.mRecognition.onerror = function(t) {
            return n._onRecognitionError(t);
        }, 0;
    }, q.prototype._isRecognition = function() {
        return !!this.mRecognition;
    }, q.prototype._getRecognitionResult = function(t) {
        return t.results[0][0].transcript;
    }, q.prototype._startRecognition = function() {
        return this.mRecognition ? (this.mRecognition.lang = this._getNLULanguage(), this.mRecognition.abort(), 
        this.mRecognition.start(), 0) : -1;
    }, q.prototype._stopRecognition = function() {
        return this.mRecognition ? (this.mRecognition.stop(), 0) : -1;
    }, q.prototype._abortRecognition = function() {
        return this.mRecognition ? (this.mRecognition.abort(), 0) : -1;
    }, q.prototype.test = function(t, n) {
        var e = '', i = -1, o = '';
        return 'say' === t ? (n && n.sayText && (e = n.sayText), this.mRecognition && 'function' == typeof this.mRecognition.say ? (this.mRecognition.say(e), 
        i = 0) : o = 'Kein Corti-Mock von SpeechRecognition vorhanden') : o = 'kein gueltiges Testkommando uebergeben', 
        {
            result: i,
            errorText: o
        };
    }, q);
    function q(t, n) {
        n = D.call(this, t || d, n = void 0 === n ? !0 : n) || this;
        return n.mRecognitionFactory = null, n.mRecognitionClass = null, n.mGrammarListClass = null, 
        n.mGrammarList = null, n.mRecognition = null, n.mRecognitionFactory = o.FactoryManager.get(e.SPEECHRECOGNITION_FACTORY_NAME, e.SpeechRecognitionFactory), 
        n.mRecognitionFactory.setErrorOutputFunc(n._getErrorOutputFunc()), n;
    }
    var j, x = (y(V, j = x), V.prototype.getClass = function() {
        return 'NLUPort';
    }, V.prototype.done = function() {
        return this.mPort && (this.mPort.removeAllEvent(this.mPortName), this.mPort = null), 
        j.prototype.done.call(this);
    }, V.prototype.setErrorOutput = function(t) {
        j.prototype.setErrorOutput.call(this, t), this.mPort && (t ? this.mPort.setErrorOutputOn() : this.mPort.setErrorOutputOff());
    }, V.prototype._detectRecognition = function() {
        return this.mPort = i.CloudManager.findPort(this.mCloudPortName), !!this.mPort || (this.error('_detectRecognition', 'kein Port vorhanden'), 
        !1);
    }, V.prototype._onInternResult = function(t) {
        return t.type === i.CLOUD_NLU_ACTION ? this._onRecognitionIntentResult(t.data) : t.type === i.CLOUD_ASRNLU_ACTION ? 'string' == typeof t.data[0] ? this._onRecognitionResult(t.data) : this._onRecognitionIntentResult(t.data) : 0;
    }, V.prototype._initRecognition = function(t) {
        var n = this;
        return this.mPort ? this.mPort.isInit() ? this.mPort.isOpen() ? (this.mPort.addStartEvent(this.mPortName, function(t) {
            return n._onRecognitionStart(), 0;
        }), this.mPort.addStopEvent(this.mPortName, function(t) {
            return n._onRecognitionEnd(), 0;
        }), this.mPort.addResultEvent(this.mPortName, function(t) {
            return n._onInternResult(t), 0;
        }), this.mPort.addErrorEvent(this.mPortName, function(t) {
            return n._checkErrorMessage(t.message), n._onRecognitionError(t), 0;
        }), 0) : (this.error('_initRecognition', 'Port ist nicht geoeffnet'), -1) : (this.error('_initRecognition', 'Port ist nicht initialisiert'), 
        -1) : (this.error('_initRecognition', 'kein Port vorhanden'), -1);
    }, V.prototype._checkErrorMessage = function(t) {}, V.prototype._isRecognition = function() {
        return !!this.mPort && this.mPort.isAction(i.CLOUD_NLU_ACTION);
    }, V.prototype.isIntent = function() {
        return !!this.mPort && this.mPort.isAction(i.CLOUD_NLU_ACTION);
    }, V.prototype.isListen = function() {
        return !!this.mPort && this.mPort.isAction(i.CLOUD_ASRNLU_ACTION);
    }, V.prototype._getRecognitionResult = function(t) {
        return t;
    }, V.prototype._getRecognitionIntentResult = function(t) {
        var n = {
            intent: '',
            confidence: 0,
            conceptList: [],
            literal: '',
            speech: '',
            audioFormat: '',
            audio: '',
            error: ''
        };
        try {
            if (t.queryResult) {
                if (t.queryResult.intent && (n.intent = t.queryResult.intent.displayName), n.confidence = t.queryResult.intentDetectionConfidence, 
                n.literal = t.queryResult.queryText, n.speech = t.queryResult.fulfillmentText, t.queryResult.parameters) for (var e in t.queryResult.parameters) t.queryResult.parameters.hasOwnProperty(e) && n.conceptList.push({
                    concept: e,
                    value: t.queryResult.parameters[e],
                    literal: t.queryResult.parameters[e],
                    confidence: 1
                });
                t.outputAudio && (n.audio = t.outputAudio, n.audioFormat = t.outputAudioConfig.audioEncoding);
            } else {
                if (n.intent = t.metadata.intentName, n.confidence = t.score, t.parameters) for (var e in t.parameters) t.parameters.hasOwnProperty(e) && n.conceptList.push({
                    concept: e,
                    value: t.parameters[e],
                    literal: t.parameters[e],
                    confidence: 1
                });
                n.literal = t.resolvedQuery, n.speech = t.fulfillment.speech;
            }
        } catch (t) {
            this.exception('_getRecognitionIntentResult', t), n.error = 'Exception:' + t.message;
        }
        return n;
    }, V.prototype._startRecognition = function() {
        return this.mPort ? this.mPort.start(this.mPortName, i.CLOUD_ASRNLU_ACTION, {
            language: this._getNLULanguage()
        }) : -1;
    }, V.prototype._startRecognitionIntent = function(t) {
        return this.mPort ? this.mPort.start(this.mPortName, i.CLOUD_NLU_ACTION, {
            text: t,
            language: this._getNLULanguage()
        }) : -1;
    }, V.prototype._stopRecognition = function() {
        return this.mPort ? this.mPort.stop(this.mPortName) : -1;
    }, V.prototype._abortRecognition = function() {
        return this._stopRecognition();
    }, V.prototype._isRecognitionRunning = function() {
        return !!this.mPort && this.mPort.isRunning(this.mPortName);
    }, V);
    function V(t, n, e) {
        e = j.call(this, n || "NLUPort", e = void 0 === e ? !0 : e) || this;
        return e.mPort = null, e.mPortName = '', e.mCloudPortName = '', e.mPortName = n, 
        e.mCloudPortName = t, e;
    }
    var K, B = (y(Y, K = x), Y.prototype.getClass = function() {
        return 'NLUNuance';
    }, Y.prototype.setLanguage = function(t) {
        var n = 0;
        switch (t) {
          case 'de':
            this.mListenLanguage = 'deu-DEU';
            break;

          case 'en':
            this.mListenLanguage = 'eng-USA';
            break;

          default:
            this.error('setLanguage', 'keine gueltige Sprache uebergeben'), n = -1;
        }
        return n;
    }, Y.prototype.getLanguage = function() {
        var t = '';
        switch (this.mListenLanguage) {
          case 'deu-DEU':
            t = 'de';
            break;

          case 'eng-USA':
            t = 'en';
            break;

          default:
            t = '';
        }
        return t;
    }, Y.prototype._onInternResult = function(t) {
        return t.type === i.CLOUD_NLU_ACTION ? this._onRecognitionIntentResult(t.data) : t.type === i.CLOUD_ASRNLU_ACTION ? 'string' == typeof t.data[0] ? this._onRecognitionResult(t.data) : this._onRecognitionIntentResult(t.data) : t.type === i.CLOUD_ASR_ACTION ? this._onRecognitionResult(t.data) : 0;
    }, Y.prototype._getRecognitionResult = function(t) {
        return t[0];
    }, Y.prototype._getRecognitionIntentResult = function(t) {
        var n, e = {
            intent: '',
            confidence: 0,
            conceptList: [],
            literal: '',
            error: ''
        };
        try {
            if (e.intent = t[0].action.intent.value, e.confidence = t[0].action.intent.confidence, 
            t[0].concepts) for (n in console.log('NluNuance._getRecognitionIntentResult:', t[0].concepts), 
            t[0]) {
                var i = {
                    concept: n,
                    value: '',
                    literal: '',
                    confidence: 1
                };
                console.log('NluNuance._getRecognitionIntentResult: concept = ', n), i.value = t[0].concepts[n][0].value, 
                i.literal = t[0].concepts[n][0].literal, e.conceptList.push(i);
            }
            e.literal = t[0].literal;
        } catch (t) {
            this.exception('_getRecognitionIntentResult', t), e.error = 'Exception:' + t.message;
        }
        return e;
    }, Y);
    function Y(t, n) {
        n = K.call(this, i.CLOUD_NUANCE_PORT, t || I, n = void 0 === n ? !0 : n) || this;
        return n.mListenLanguage = 'deu-DEU', n;
    }
    var z, Q = (y(J, z = x), J.prototype.getClass = function() {
        return 'NLUGoogle';
    }, J.prototype._onInternResult = function(t) {
        return t.type === i.CLOUD_NLU_ACTION ? this._onRecognitionIntentResult(t.data) : t.type === i.CLOUD_ASRNLU_ACTION ? 'string' == typeof t.data[0] ? this._onRecognitionResult(t.data) : this._onRecognitionIntentResult(t.data) : 0;
    }, J.prototype._checkErrorMessage = function(t) {
        'GoogleNLU2.getAccessTokenFromServer: Failed to fetch' === t && this.setActiveOff();
    }, J.prototype._getRecognitionResult = function(t) {
        return t;
    }, J.prototype._getRecognitionIntentResult = function(t) {
        var n = {
            intent: '',
            confidence: 0,
            conceptList: [],
            literal: '',
            speech: '',
            audioFormat: '',
            audio: '',
            error: ''
        };
        try {
            if (t.queryResult) {
                if (t.queryResult.intent && (n.intent = t.queryResult.intent.displayName), n.confidence = t.queryResult.intentDetectionConfidence, 
                n.literal = t.queryResult.queryText, n.speech = t.queryResult.fulfillmentText, t.queryResult.parameters) for (var e in t.queryResult.parameters) t.queryResult.parameters.hasOwnProperty(e) && n.conceptList.push({
                    concept: e,
                    value: t.queryResult.parameters[e],
                    literal: t.queryResult.parameters[e],
                    confidence: 1
                });
                t.outputAudio && (n.audio = t.outputAudio, n.audioFormat = t.outputAudioConfig.audioEncoding);
            } else {
                if (n.intent = t.metadata.intentName, n.confidence = t.score, t.parameters) for (var e in t.parameters) t.parameters.hasOwnProperty(e) && n.conceptList.push({
                    concept: e,
                    value: t.parameters[e],
                    literal: t.parameters[e],
                    confidence: 1
                });
                n.literal = t.resolvedQuery, n.speech = t.fulfillment.speech;
            }
        } catch (t) {
            this.exception('_getRecognitionIntentResult', t), n.error = 'Exception:' + t.message;
        }
        return n;
    }, J);
    function J(t, n) {
        return z.call(this, i.CLOUD_GOOGLE_PORT, t || O, n = void 0 === n ? !0 : n) || this;
    }
    var W, X = (y(Z, W = x), Z.prototype.getClass = function() {
        return 'NLUMicrosoft';
    }, Z.prototype._onInternResult = function(t) {
        return t.type === i.CLOUD_NLU_ACTION ? this._onRecognitionIntentResult(t.data) : 0;
    }, Z.prototype.isListen = function() {
        return !1;
    }, Z.prototype._getRecognitionResult = function(t) {
        return t;
    }, Z.prototype._getRecognitionIntentResult = function(t) {
        var n = {
            intent: '',
            confidence: 0,
            conceptList: [],
            literal: '',
            speech: '',
            error: ''
        };
        try {
            if (n.intent = t.topScoringIntent.intent, n.confidence = t.topScoringIntent.score, 
            t.entities) for (var e = 0, i = t.entities; e < i.length; e++) {
                var o = i[e], r = {
                    concept: o.type,
                    value: o.entity,
                    literal: o.entity,
                    confidence: o.score
                };
                n.conceptList.push(r);
            }
            n.literal = t.query;
        } catch (t) {
            this.exception('_getRecognitionIntentResult', t), n.error = 'Exception:' + t.message;
        }
        return n;
    }, Z.prototype._startRecognition = function() {
        return -1;
    }, Z);
    function Z(t, n) {
        return W.call(this, i.CLOUD_MICROSOFT_PORT, t || T, n = void 0 === n ? !0 : n) || this;
    }
    var $, tt = (y(nt, $ = x), nt.prototype.getClass = function() {
        return 'NLURasa';
    }, nt.prototype._onInternResult = function(t) {
        return t.type === i.CLOUD_NLU_ACTION ? this._onRecognitionIntentResult(t.data) : 0;
    }, nt.prototype.isListen = function() {
        return !1;
    }, nt.prototype._getRecognitionResult = function(t) {
        return t;
    }, nt.prototype._getRecognitionIntentResult = function(t) {
        console.log('NLURasa._getRecognitionIntentResult:', t);
        var n = {
            intent: '',
            confidence: 0,
            conceptList: [],
            literal: '',
            speech: '',
            error: ''
        };
        try {
            if (n.intent = t.intent.name, n.confidence = t.intent.confidence, t.entities) {
                console.log('NluRasa._getRecognitionIntentResult:', t.entities);
                for (var e = 0, i = t.entities; e < i.length; e++) {
                    var o = i[e], r = {
                        concept: o.entity,
                        value: o.value,
                        literal: o.text,
                        confidence: o.confidence
                    };
                    console.log('NluRasa._getRecognitionIntentResult: concept = ', r), n.conceptList.push(r);
                }
            }
            n.literal = t.text;
        } catch (t) {
            this.exception('_getRecognitionIntentResult', t), n.error = 'Exception:' + t.message;
        }
        return n;
    }, nt.prototype._startRecognition = function() {
        return -1;
    }, nt);
    function nt(t, n) {
        return $.call(this, i.CLOUD_RASA_PORT, t || P, n = void 0 === n ? !0 : n) || this;
    }
    var et, it = (y(ot, et = o.PluginGroup), ot.prototype.getType = function() {
        return E;
    }, ot.prototype.getClass = function() {
        return 'NLUGroup';
    }, ot.prototype._insertAllNLU = function() {
        this.mNLUFactory ? (this.insertPlugin(I, this.mNLUFactory.create(I, I, !1)), this.insertPlugin(O, this.mNLUFactory.create(O, O, !1)), 
        this.insertPlugin(T, this.mNLUFactory.create(T, T, !1)), this.insertPlugin(P, this.mNLUFactory.create(P, P, !1))) : this.error('_insertAllNLU', 'keine NLU-Fabrik vorhanden');
    }, ot.prototype._initNLUHtml5 = function(t) {
        if (this.mNLUHtml5 = this.findPlugin(d), this.mNLUHtml5) {
            if (this.mNLUHtml5.init(t), this.mNLUHtml5.isActive()) return void (this.isErrorOutput() && console.log('NLUGroup._initNLUHtml5: NLU eingefuegt'));
            this.removePlugin(d), this.mNLUHtml5.done(), this.mNLUHtml5 = null;
        }
        this.isErrorOutput() && console.log('NLUGroup._initNLUHtml5: NLU nicht eingefuegt');
    }, ot.prototype._initNLUNuance = function(t) {
        if (this.mNLUNuance = this.findPlugin(I), this.mNLUNuance) {
            if (this.mNLUNuance.init(t), this.mNLUNuance.isActive()) return void (this.isErrorOutput() && console.log('NLUGroup._initNLUNuance: NLU eingefuegt'));
            this.removePlugin(I), this.mNLUNuance.done(), this.mNLUNuance = null;
        }
        this.isErrorOutput() && console.log('NLUGroup._initNLUNuance: NLU nicht eingefuegt');
    }, ot.prototype._initNLUGoogle = function(t) {
        if (this.mNLUGoogle = this.findPlugin(O), this.mNLUGoogle) {
            if (this.mNLUGoogle.init(t), this.mNLUGoogle.isActive()) return void (this.isErrorOutput() && console.log('NLUGroup._initNLUGoogle: NLU eingefuegt'));
            this.removePlugin(O), this.mNLUGoogle.done(), this.mNLUGoogle = null;
        }
        this.isErrorOutput() && console.log('NLUGroup._initNLUGoogle: NLU nicht eingefuegt');
    }, ot.prototype._initNLUMicrosoft = function(t) {
        if (this.mNLUMicrosoft = this.findPlugin(T), this.mNLUMicrosoft) {
            if (this.mNLUMicrosoft.init(t), this.mNLUMicrosoft.isActive()) return void (this.isErrorOutput() && console.log('NLUGroup._initNLUMicrosoft: NLU eingefuegt'));
            this.removePlugin(T), this.mNLUMicrosoft.done(), this.mNLUMicrosoft = null;
        }
        this.isErrorOutput() && console.log('NLUGroup._initNLUMicrosoft: NLU nicht eingefuegt');
    }, ot.prototype._initNLURasa = function(t) {
        if (this.mNLURasa = this.findPlugin(P), this.mNLURasa) {
            if (this.mNLURasa.init(t), this.mNLURasa.isActive()) return void (this.isErrorOutput() && console.log('NLUGroup._initNLURasa: NLU eingefuegt'));
            this.removePlugin(P), this.mNLURasa.done(), this.mNLURasa = null;
        }
        this.isErrorOutput() && console.log('NLUGroup._initNLURasa: NLU nicht eingefuegt');
    }, ot.prototype.init = function(t) {
        if (this.isInit()) return this.error('init', 'init doppelt aufgerufen'), -1;
        if (!this.mNLUFactory) return this.error('init', 'keine NLU-Fabrik vorhanden'), 
        -1;
        var n = t || {};
        return this.isErrorOutput() || (n.errorOutputFlag = !1), this._initNLUNuance(n), 
        this._initNLUGoogle(n), this._initNLUMicrosoft(n), this._initNLURasa(n), 0 !== et.prototype.init.call(this, t) ? -1 : (this.mCurrentNLU = this.firstPlugin(), 
        this.mCurrentNLU || (this.isErrorOutput() && console.log('NLUGroup.init: keine NLU verfuegbar'), 
        this.setActiveOff()), t && t.tts && this.setNLU(t.tts), 0);
    }, ot.prototype.done = function() {
        return this.mNLUList.clear(), this.mCurrentNLU = null, this.mNLUHtml5 = null, this.mNLUNuance = null, 
        this.mNLUGoogle = null, this.mNLUMicrosoft = null, this.mNLURasa = null, this.mOnConnectFunc = null, 
        this.mOnDisconnectFunc = null, this.mOnListenStartFunc = null, this.mOnListenStopFunc = null, 
        this.mOnListenResultFunc = null, this.mOnIntentResultFunc = null, et.prototype.done.call(this);
    }, ot.prototype.isActive = function() {
        return !!this.mCurrentNLU && (!!this.mCurrentNLU.isActive() && et.prototype.isActive.call(this));
    }, ot.prototype.setActiveOn = function() {
        return this.mCurrentNLU && this.mCurrentNLU.isActive() ? et.prototype.setActiveOn.call(this) : -1;
    }, Object.defineProperty(ot.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onInit = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onConnect", {
        set: function(t) {
            this.mOnConnectFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onConnect = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onDisconnect", {
        set: function(t) {
            this.mOnDisconnectFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onDisconnect = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenStart", {
        set: function(t) {
            this.mOnListenStartFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onListenStart = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenStop", {
        set: function(t) {
            this.mOnListenStopFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onListenStop = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenResult", {
        set: function(t) {
            this.mOnListenResultFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onListenResult = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onIntentResult", {
        set: function(t) {
            this.mOnIntentResultFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onIntentResult = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
            for (var n = this.firstPlugin(); n; ) n.onError = t, n = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), ot.prototype.isNLU = function() {
        return !!this.mCurrentNLU;
    }, ot.prototype.insertNLU = function(t, n, e) {
        if (this.findPlugin(t)) return 0;
        if (0 !== this.insertPlugin(t, this.mNLUFactory.create(t, n, !1))) return -1;
        var i = this.findPlugin(t);
        if (i) {
            if (i.init(e), i.isActive()) return this.isErrorOutput() && console.log('NLUGroup.insertNLU: NLU eingefuegt ', t, n), 
            i.onInit = this.mOnInitFunc, i.onListenStart = this.mOnListenStartFunc, i.onListenStop = this.mOnListenStopFunc, 
            i.onListenResult = this.mOnListenResultFunc, i.onIntentResult = this.mOnIntentResultFunc, 
            i.onError = this.mOnErrorFunc, this.mNLUList.insert(t, i);
            this.removePlugin(t);
        }
        return this.isErrorOutput() && console.log('NLUGroup.insertNLU: NLU nicht eingefuegt ', t, n), 
        -1;
    }, ot.prototype.removeNLU = function(t) {
        return this.mNLUList.find(t) ? (this.mNLUList.remove(t), this.removePlugin(t)) : (this.isErrorOutput() && console.log('NLUGroup.removeNLU: NLU nicht vorhanden'), 
        -1);
    }, ot.prototype.setNLU = function(t) {
        var n = null;
        switch (t) {
          case d:
            n = this.mNLUHtml5;
            break;

          case I:
            n = this.mNLUNuance;
            break;

          case O:
            n = this.mNLUGoogle;
            break;

          case T:
            n = this.mNLUMicrosoft;
            break;

          case P:
            n = this.mNLURasa;
            break;

          default:
            n = this.mNLUList.find(t);
        }
        return n ? (this.mCurrentNLU = n, 0) : (this.error('setNLU', 'Keine NLU vorhanden'), 
        -1);
    }, ot.prototype.getNLU = function() {
        return this.mCurrentNLU ? this.mCurrentNLU.getName() : '';
    }, ot.prototype.getNLUList = function() {
        return this.getPluginNameList();
    }, ot.prototype.setLanguage = function(t) {
        var n = 0, e = this.firstPlugin();
        if (!e) return this.error('setLanguage', 'Keine NLU vorhanden'), -1;
        for (;e; ) 0 !== e.setLanguage(t) && (n = -1), e = this.nextPlugin();
        return n;
    }, ot.prototype.getLanguage = function() {
        return this.mCurrentNLU ? this.mCurrentNLU.getLanguage() : '';
    }, ot.prototype.getLanguageList = function() {
        return this.mCurrentNLU ? this.mCurrentNLU.getLanguageList() : [];
    }, ot.prototype.isIntent = function() {
        return !!this.mCurrentNLU && this.mCurrentNLU.isIntent();
    }, ot.prototype.startIntent = function(t) {
        return this.mCurrentNLU ? this.isActive() ? this.mCurrentNLU.startIntent(t) : (this.isErrorOutput() && console.log('NLUGroup.startIntent: NLU ist nicht aktiv'), 
        0) : (this.error('startIntent', 'keine NLU vorhanden'), -1);
    }, ot.prototype.isListen = function() {
        return !!this.mCurrentNLU && this.mCurrentNLU.isListen();
    }, ot.prototype.isListenRunning = function() {
        return !!this.mCurrentNLU && this.mCurrentNLU.isListenRunning();
    }, ot.prototype.setListenTimeout = function(t) {
        this.mCurrentNLU && this.mCurrentNLU.setListenTimeout(t);
    }, ot.prototype.startListen = function() {
        return this.mCurrentNLU ? this.isActive() ? this.mCurrentNLU.startListen() : (this.isErrorOutput() && console.log('NLUGroup.startListen: NLU ist nicht aktiv'), 
        0) : (this.error('startListen', 'keine NLU vorhanden'), -1);
    }, ot.prototype.getStartListenFunc = function() {
        var t = this;
        return function() {
            return t.startListen();
        };
    }, ot.prototype.stopListen = function() {
        return this.isActive() ? this.mCurrentNLU.stopListen() : (this.isErrorOutput() && console.log('NLUGroup.stopListen: NLU ist nicht aktiv'), 
        0);
    }, ot.prototype.getStopListenFunc = function() {
        var t = this;
        return function() {
            return t.stopListen();
        };
    }, ot.prototype.abortListen = function() {
        return this.isActive() ? this.mCurrentNLU.abortListen() : (this.isErrorOutput() && console.log('NLUGroup.abortListen: NLU ist nicht aktiv'), 
        0);
    }, ot.prototype.test = function(t, n) {
        return this.isActive() ? this.mCurrentNLU.test(t, n) : (this.isErrorOutput() && console.log('NLUGroup.abortListen: NLU ist nicht aktiv'), 
        0);
    }, ot);
    function ot(t, n, e) {
        e = et.call(this, n || F, e = void 0 === e ? !0 : e) || this;
        return e.mNLUFactory = null, e.mNLUHtml5 = null, e.mNLUNuance = null, e.mNLUGoogle = null, 
        e.mNLUMicrosoft = null, e.mNLURasa = null, e.mNLUList = new o.PluginList(), e.mCurrentNLU = null, 
        e.mOnConnectFunc = null, e.mOnDisconnectFunc = null, e.mOnListenStartFunc = null, 
        e.mOnListenStopFunc = null, e.mOnListenResultFunc = null, e.mOnIntentResultFunc = null, 
        e.mNLUFactory = t, e._insertAllNLU(), e;
    }
    var rt, st = (y(ut, rt = o.PluginFactory), ut.prototype.getType = function() {
        return E;
    }, ut.prototype.getName = function() {
        return _;
    }, ut.prototype._newPlugin = function(t, n, e) {
        var i = null;
        switch (n) {
          case F:
            i = new it(this, t, e);
            break;

          case "NLU":
          case I:
            i = new B(t, e);
            break;

          case O:
            i = new Q(t, e);
            break;

          case T:
            i = new X(t, e);
            break;

          case P:
            i = new tt(t, e);
            break;

          case d:
            i = new H(t, e);
            break;

          case v:
            i = new G(v, e);
            break;

          default:
            this.error('_newPlugin', 'keine NLU vorhanden');
        }
        return i;
    }, ut.prototype.create = function(t, n, e) {
        void 0 === e && (e = !0);
        t = (t = void 0 === t ? '' : t) || C, n = (n = void 0 === n ? '' : n) || C;
        try {
            return this._newPlugin(t, n, e);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, ut);
    function ut() {
        return rt.call(this, 'NLUFactory') || this;
    }
    var ct, at = (y(pt, ct = n.BaseComponent), pt.prototype.getType = function() {
        return h;
    }, pt.prototype.getClass = function() {
        return 'IntentComponent';
    }, pt.prototype.getVersion = function() {
        return p;
    }, pt.prototype.getApiVersion = function() {
        return l;
    }, pt.prototype.getServerVersion = function() {
        return '';
    }, pt.prototype._setOption = function(t) {
        return t ? (t.intentLanguage && this.setLanguage(t.intentLanguage), ct.prototype._setOption.call(this, t)) : -1;
    }, pt.prototype._initAllPlugin = function() {
        return this.mNLUPlugin = this.findPlugin(C), this.mNLUPlugin && (this.mNLUActiveFlag = this.mNLUPlugin.isActive()), 
        0;
    }, pt.prototype.init = function(t) {
        return ct.prototype.init.call(this, t);
    }, pt.prototype._doneAllPlugin = function() {
        this.mNLUPlugin = null;
    }, pt.prototype._doneAllEvent = function() {
        this.mListenResultEvent.clear(), this.mIntentResultEvent.clear();
    }, pt.prototype._doneAllAttribute = function() {
        this.mASRActiveFlag = !1, this.mNLUActiveFlag = !1, this.mASRFeatureFlag = !1, this.mNLUFeatureFlag = !1;
    }, pt.prototype._resetAllDefault = function() {
        this.setLanguage("de"), this.setText('');
    }, pt.prototype.reset = function(t) {
        return ct.prototype.reset.call(this, t);
    }, pt.prototype.isActive = function() {
        return !!this.mNLUActiveFlag && ct.prototype.isActive.call(this);
    }, pt.prototype.setActiveOn = function() {
        return this.mNLUActiveFlag ? ct.prototype.setActiveOn.call(this) : -1;
    }, pt.prototype.setFeatureList = function(t) {
        return t.features ? (t.features.ASR && 'boolean' == typeof t.features.ASR && (this.mASRFeatureFlag = t.features.ASR), 
        t.features.NLU && 'boolean' == typeof t.features.NLU && (this.mNLUFeatureFlag = t.features.NLU), 
        0) : (this.error('setFeatureList', 'keine FeatureInfos uebergeben'), -1);
    }, pt.prototype.setErrorOutput = function(t) {
        ct.prototype.setErrorOutput.call(this, t), this.mListenResultEvent.setErrorOutput(t), 
        this.mIntentResultEvent.setErrorOutput(t);
    }, pt.prototype._onListenResult = function(t) {
        return this.mListenResultEvent.dispatch(t);
    }, Object.defineProperty(pt.prototype, "onListenResult", {
        get: function() {
            var n = this;
            return function(t) {
                return n._onListenResult(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), pt.prototype._onIntentResult = function(t) {
        return this.mIntentResultEvent.dispatch(t);
    }, Object.defineProperty(pt.prototype, "onIntentResult", {
        get: function() {
            var n = this;
            return function(t) {
                return n._onIntentResult(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), pt.prototype.addEventListener = function(t, n, e) {
        var i = 0;
        switch (n) {
          case o.SPEECH_LISTENRESULT_EVENT:
            i = this.mListenResultEvent.addListener(t, e);
            break;

          case o.SPEECH_INTENTRESULT_EVENT:
            i = this.mIntentResultEvent.addListener(t, e);
            break;

          default:
            i = ct.prototype.addEventListener.call(this, t, n, e);
        }
        return i;
    }, pt.prototype.removeEventListener = function(t, n) {
        var e = 0;
        switch (n) {
          case o.SPEECH_LISTENRESULT_EVENT:
            e = this.mListenResultEvent.removeListener(t);
            break;

          case o.SPEECH_INTENTRESULT_EVENT:
            e = this.mIntentResultEvent.removeListener(t);
            break;

          default:
            e = ct.prototype.removeEventListener.call(this, t, n);
        }
        return e;
    }, pt.prototype.addListenResultEvent = function(t, n) {
        return this.addEventListener(t, o.SPEECH_LISTENRESULT_EVENT, n);
    }, pt.prototype.removeListenResultEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENRESULT_EVENT);
    }, pt.prototype.addIntentResultEvent = function(t, n) {
        return this.addEventListener(t, o.SPEECH_INTENTRESULT_EVENT, n);
    }, pt.prototype.removeIntentResultEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_INTENTRESULT_EVENT);
    }, pt.prototype.removeAllEvent = function(t) {
        var n = ct.prototype.removeAllEvent.call(this, t);
        return 0 !== this.removeListenResultEvent(t) && (n = -1), n = 0 !== this.removeIntentResultEvent(t) ? -1 : n;
    }, pt.prototype.isNLU = function() {
        return !(!this.mNLUPlugin || !this.mNLUPlugin.isNLU());
    }, pt.prototype.insertNLU = function(t, n, e) {
        return this.mNLUPlugin ? this.mNLUPlugin.insertNLU(t, n, e) : -1;
    }, pt.prototype.removeNLU = function(t) {
        return this.mNLUPlugin ? this.mNLUPlugin.removeNLU(t) : -1;
    }, pt.prototype.setNLU = function(t) {
        return this.mNLUPlugin ? this.mNLUPlugin.setNLU(t) : -1;
    }, pt.prototype.getNLU = function() {
        return this.mNLUPlugin ? this.mNLUPlugin.getNLU() : '';
    }, pt.prototype.getNLUList = function() {
        return this.mNLUPlugin ? this.mNLUPlugin.getNLUList() : [];
    }, pt.prototype.setLanguage = function(t) {
        return this.mNLUPlugin ? this.mNLUPlugin.setLanguage(t) : -1;
    }, pt.prototype.getLanguage = function() {
        return this.mNLUPlugin ? this.mNLUPlugin.getLanguage() : "";
    }, pt.prototype.getLanguageList = function() {
        return this.mNLUPlugin ? this.mNLUPlugin.getLanguageList() : [];
    }, pt.prototype.setText = function(t) {
        return this.mIntentText = t, 0;
    }, pt.prototype.getText = function() {
        return this.mIntentText;
    }, pt.prototype.isRunning = function() {
        return !!this.isActive() && (!!this.mNLUPlugin && this.mNLUPlugin.isListenRunning());
    }, pt.prototype.start = function() {
        if (!this.isNLU()) return this.error('start', 'keine NLU vorhanden'), -1;
        if (!this.isActive()) return 0;
        if (this.mNLUFeatureFlag) return 0;
        if (!this.mIntentText) return this.mNLUPlugin.isListen() ? this.mNLUPlugin.startListen() : (this.error('start', 'Keinen Text zur Sprachanalyse uebergeben'), 
        -1);
        var t = this.mNLUPlugin.startIntent(this.mIntentText);
        return this.mIntentText = '', t;
    }, pt.prototype.stop = function() {
        return this.isActive() ? this.mNLUPlugin ? this.mIntentText ? 0 : this.mNLUPlugin.stopListen() : (this.error('stop', 'keine NLU vorhanden'), 
        -1) : 0;
    }, pt.prototype.abort = function() {
        return this.isActive() ? this.mNLUPlugin ? this.mIntentText ? 0 : this.mNLUPlugin.abortListen() : (this.error('abort', 'keine NLU vorhanden'), 
        -1) : 0;
    }, pt.prototype.test = function(t, n) {
        var e = '';
        if ('say' === t) {
            if (this.mNLUPlugin) return this.mNLUPlugin.test(t, n);
            e = 'kein NLUPlugin vorhanden';
        } else e = 'kein gueltiges Testkommando uebergeben';
        return {
            result: -1,
            errorText: e
        };
    }, pt);
    function pt(t, n) {
        n = ct.call(this, (t = void 0 === t ? '' : t) || L, n = void 0 === n ? !0 : n) || this;
        return n.mNLUPlugin = null, n.mListenResultEvent = new o.EventFunctionList(o.SPEECH_LISTENRESULT_EVENT, L), 
        n.mIntentResultEvent = new o.EventFunctionList(o.SPEECH_INTENTRESULT_EVENT, L), 
        n.mASRActiveFlag = !1, n.mNLUActiveFlag = !1, n.mNLUFeatureFlag = !1, n.mASRFeatureFlag = !1, 
        n.mIntentText = '', n.mListenResultEvent.setErrorOutputFunc(n._getErrorOutputFunc()), 
        n.mIntentResultEvent.setErrorOutputFunc(n._getErrorOutputFunc()), n;
    }
    var lt, ht = (y(gt, lt = o.PluginFactory), gt.prototype.getName = function() {
        return g;
    }, gt.prototype.getType = function() {
        return h;
    }, gt.prototype._newPlugin = function(t, n, e) {
        return new at(t, e);
    }, gt.prototype.create = function(t, n, e) {
        void 0 === e && (e = !0);
        t = (t = void 0 === t ? '' : t) || L, n = (n = void 0 === n ? '' : n) || L;
        try {
            return this._newPlugin(t, n, e);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, gt);
    function gt() {
        return lt.call(this, 'IntentComponentFactory') || this;
    }
    var Lt, mt = (y(ft, Lt = o.Builder), ft.prototype.getType = function() {
        return h;
    }, ft.prototype.getClass = function() {
        return 'IntentComponentBuilder';
    }, ft.prototype.build = function(t) {
        var n = this._getComponentName(t) || L;
        if (n = this._findComponent(n)) return n;
        try {
            var n = this._buildComponent(t), e = this._getPlugin(C, C, _, st);
            return 0 !== this._binder(n, e) ? (this.error('build', 'Komponenten nicht verbunden'), 
            null) : n;
        } catch (t) {
            return this.exception('build', t), null;
        }
    }, ft.prototype._buildComponent = function(t) {
        var n = this._getComponentName(t) || L, t = this._getComponentClass(t) || L;
        return this._getPlugin(n, t, g, ht);
    }, ft.prototype._binder = function(t, n) {
        return t ? n ? 0 !== t.insertPlugin(n.getName(), n) ? (this.error('_binder', 'NLU-Plugin wurde nicht eingefuegt'), 
        -1) : (n.onInit = t.onInit, n.onListenStart = t.onStart, n.onListenStop = t.onStop, 
        n.onListenResult = t.onListenResult, n.onIntentResult = t.onIntentResult, n.onError = t.onError, 
        0) : (this.error('_binder', 'Kein NLU-Plugin vorhanden'), -1) : (this.error('_binder', 'Keine Intent-Komponente vorhanden'), 
        -1);
    }, ft);
    function ft(t, n) {
        return Lt.call(this, t || h, n = void 0 === n ? !0 : n) || this;
    }
    var Nt, Rt = (y(yt, Nt = n.Base), yt.prototype._getBuilderName = function() {
        return h;
    }, yt.prototype.addListenResultEvent = function(t, n) {
        return this.mIntentComponent.addListenResultEvent(t, n);
    }, yt.prototype.addIntentResultEvent = function(t, n) {
        return this.mIntentComponent.addIntentResultEvent(t, n);
    }, yt.prototype.removeListenResultEvent = function(t) {
        return this.mIntentComponent.removeListenResultEvent(t);
    }, yt.prototype.removeIntentResultEvent = function(t) {
        return this.mIntentComponent.removeIntentResultEvent(t);
    }, yt.prototype.isNLU = function() {
        return this.mIntentComponent.isNLU();
    }, yt.prototype.insertNLU = function(t, n, e) {
        return this.mIntentComponent.insertNLU(t, n, e);
    }, yt.prototype.removeNLU = function(t) {
        return this.mIntentComponent.removeNLU(t);
    }, yt.prototype.setNLU = function(t) {
        return this.mIntentComponent.setNLU(t);
    }, yt.prototype.getNLU = function() {
        return this.mIntentComponent.getNLU();
    }, yt.prototype.getNLUList = function() {
        return this.mIntentComponent.getNLUList();
    }, yt.prototype.setLanguage = function(t) {
        return this.mIntentComponent.setLanguage(t);
    }, yt.prototype.getLanguage = function() {
        return this.mIntentComponent.getLanguage();
    }, yt.prototype.getLanguageList = function() {
        return this.mIntentComponent.getLanguageList();
    }, yt.prototype.setText = function(t) {
        return this.mIntentComponent.setText(t);
    }, yt.prototype.getText = function() {
        return this.mIntentComponent.getText();
    }, yt.prototype.abort = function() {
        return this.mIntentComponent.abort();
    }, yt);
    function yt(t) {
        t = Nt.call(this, t) || this;
        return t.mIntentComponent = t.mComponent, t;
    }
    var Ut = (_t.create = function(t, n) {
        try {
            return o.SystemManager.findBuilder(h) || 0 === o.SystemManager.insertBuilder(h, new mt('', !1)) ? new Rt(n) : (console.log('IntentFactory.create: kein Builder eingetragen'), 
            null);
        } catch (t) {
            return console.log('IntentFactory.create: Exception', t), null;
        }
    }, _t);
    function _t() {}
    var Et, x = {
        activeFlag: !0,
        intentLanguage: N,
        errorOutputFlag: !1
    }, n = (y(vt, Et = r.Service), vt.isConstructorInit = function() {
        return vt.constructorInitFlag;
    }, vt.setConstructorInitOn = function() {
        vt.constructorInitFlag = !0;
    }, vt.setConstructorInitOff = function() {
        vt.constructorInitFlag = !1;
    }, vt.getConfig = function() {
        return vt.intentServiceConfig;
    }, vt.prototype._setOption = function(t) {
        return 0 !== Et.prototype._setOption.call(this, t) ? -1 : ('string' == typeof t.intentLanguage && (this.language = t.intentLanguage), 
        0);
    }, vt.prototype._createComponent = function(t, n) {
        return this.mIntent = Ut.create(t, n), this.mIntent;
    }, vt.prototype.init = function(t) {
        return Et.prototype.init.call(this, t);
    }, vt.prototype.reset = function(t) {
        return Et.prototype.reset.call(this, t);
    }, vt.prototype._addAllEvent = function(t) {
        var n = this;
        return 0 !== Et.prototype._addAllEvent.call(this, t) ? -1 : (this.mIntent.addListenResultEvent(t, function(t) {
            return n.mListenResultEvent.emit(t), 0;
        }), this.mIntent.addIntentResultEvent(t, function(t) {
            return n.mIntentResultEvent.emit(t), 0;
        }), 0);
    }, Object.defineProperty(vt.prototype, "listenResultEvent", {
        get: function() {
            return this.mListenResultEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(vt.prototype, "resultEvent", {
        get: function() {
            return this.mIntentResultEvent;
        },
        enumerable: !1,
        configurable: !0
    }), vt.prototype.isNLU = function() {
        return !!this.mIntent && this.mIntent.isNLU();
    }, vt.prototype.insertNLU = function(t, n, e) {
        return this.mIntent ? this.mIntent.insertNLU(t, n, e) : (this._error('insertNLU', 'keine Intent-Komponente vorhanden'), 
        -1);
    }, vt.prototype.removeNLU = function(t) {
        return this.mIntent ? this.mIntent.removeNLU(t) : (this._error('removeNLU', 'keine Intent-Komponente vorhanden'), 
        -1);
    }, vt.prototype.setNLU = function(t) {
        return this.mIntent ? this.mIntent.setNLU(t) : (this._error('setNLU', 'keine Intent-Komponente vorhanden'), 
        -1);
    }, vt.prototype.getNLU = function() {
        return this.mIntent ? this.mIntent.getNLU() : (this._error('getNLU', 'keine Intent-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(vt.prototype, "nlu", {
        get: function() {
            return this.getNLU();
        },
        set: function(t) {
            this.setNLU(t);
        },
        enumerable: !1,
        configurable: !0
    }), vt.prototype.getNLUList = function() {
        return this.mIntent ? this.mIntent.getNLUList() : (this._error('getNLUList', 'keine Intent-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(vt.prototype, "nlus", {
        get: function() {
            return this.getNLUList();
        },
        enumerable: !1,
        configurable: !0
    }), vt.prototype.setLanguage = function(t) {
        return this.mIntent ? this.mIntent.setLanguage(t) : (this._error('setLanguage', 'keine Intent-Komponente vorhanden'), 
        -1);
    }, vt.prototype.getLanguage = function() {
        return this.mIntent ? this.mIntent.getLanguage() : (this._error('getLanguage', 'keine Intent-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(vt.prototype, "language", {
        get: function() {
            return this.getLanguage();
        },
        set: function(t) {
            this.setLanguage(t);
        },
        enumerable: !1,
        configurable: !0
    }), vt.prototype.getLanguageList = function() {
        return this.mIntent ? this.mIntent.getLanguageList() : (this._error('getLanguageList', 'keine Intent-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(vt.prototype, "languages", {
        get: function() {
            return this.getLanguageList();
        },
        enumerable: !1,
        configurable: !0
    }), vt.prototype.setText = function(t) {
        return this.mIntent ? this.mIntent.setText(t) : (this._error('setText', 'keine Intent-Komponente vorhanden'), 
        -1);
    }, vt.prototype.getText = function() {
        return this.mIntent ? this.mIntent.getText() : (this._error('getText', 'keine Intent-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(vt.prototype, "text", {
        get: function() {
            return this.getText();
        },
        set: function(t) {
            this.setText(t);
        },
        enumerable: !1,
        configurable: !0
    }), vt.intentServiceConfig = x, vt.constructorInitFlag = !0, vt);
    function vt() {
        var t = Et.call(this, L, m, l) || this;
        if (t.mIntent = null, t.mListenResultEvent = new r.EventEmitter(f), t.mIntentResultEvent = new r.EventEmitter(f), 
        vt.isConstructorInit() && 0 !== t.init(vt.getConfig())) throw new Error('Intent nicht initialisiert');
        return 0 !== r.ServiceManager.insert(t) && console.log('IntentService: wurde nicht in ServiceManager eingetragen'), 
        t;
    }
    t.INTENT_API_VERSION = l, t.INTENT_ASYNC_EVENT = f, t.INTENT_BUILDER_NAME = 'IntentBuilder', 
    t.INTENT_COMPONENTBUILDER_NAME = 'IntentComponentBuilder', t.INTENT_COMPONENTFACTORY_NAME = g, 
    t.INTENT_COMPONENT_NAME = L, t.INTENT_DEFAULT_LANGUAGE = "de", t.INTENT_DE_LANGUAGE = N, 
    t.INTENT_EN_LANGUAGE = 'en', t.INTENT_FACTORY_NAME = 'IntentFactory', t.INTENT_GOOGLE_NLU = 'NLUGoogle', 
    t.INTENT_HTML5_NLU = 'NLUHtml5', t.INTENT_MICROSOFT_NLU = 'NLUMicrosoft', t.INTENT_MOCK_NAME = 'IntentMock', 
    t.INTENT_NUANCE_NLU = 'NLUNuance', t.INTENT_RASA_NLU = 'NLURasa', t.INTENT_SERVICEMOCK_NAME = 'IntentServiceMock', 
    t.INTENT_SERVICE_NAME = m, t.INTENT_TYPE_NAME = h, t.INTENT_UNDEFINE_LANGUAGE = "", 
    t.INTENT_VERSION_BUILD = u, t.INTENT_VERSION_DATE = a, t.INTENT_VERSION_NUMBER = s, 
    t.INTENT_VERSION_STRING = p, t.INTENT_VERSION_TYPE = c, t.Intent = Rt, t.IntentComponent = at, 
    t.IntentComponentBuilder = mt, t.IntentComponentFactory = ht, t.IntentFactory = Ut, 
    t.IntentService = n, t.IntentServiceConfig = x, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
