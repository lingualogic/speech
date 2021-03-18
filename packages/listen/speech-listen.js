/**
 * Speech-Listen Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core'), require('@speech/common'), require('@speech/cloud'), require('@speech/base'), require('@speech/service')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common', '@speech/cloud', '@speech/base', '@speech/service' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechListen = {}, t.speechCore, t.speechCommon, t.speechCloud, t.speechBase, t.speechService);
}(this, function(t, o, n, i, e, r) {
    'use strict';
    var s = o.SPEECH_VERSION_NUMBER, u = o.SPEECH_VERSION_BUILD, c = o.SPEECH_VERSION_TYPE, p = o.SPEECH_VERSION_DATE, a = s + '.' + u + ' vom ' + p + ' (' + c + ')', h = '1.6', S = 'Listen', E = 'ListenComponentFactory', L = 'ListenComponent', m = L, g = 'ListenService', l = 'de', R = 'Command', f = function(t, e) {
        return (f = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        })(t, e);
    };
    function d(t, e) {
        function n() {
            this.constructor = t;
        }
        f(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
        new n());
    }
    var v, y = 'ASRFactory', _ = 'ASR', A = 'ASRMock', T = 'ASRHtml5', P = 'ASRNuance', N = 'ASRGoogle', O = 'ASRMicrosoft', b = 'ASRGroup', C = b, I = 'de-DE', F = 'en-US', M = I, H = 'Command', k = 'Dictate', V = H, w = (d(x, v = o.Plugin), 
    x.prototype.getType = function() {
        return _;
    }, x.prototype.getClass = function() {
        return 'ASRPlugin';
    }, x.prototype.init = function(t) {
        return this.isInit() ? (this.error('init', 'init doppelt aufgerufen'), -1) : 0 !== v.prototype.init.call(this, t) ? -1 : ((!this._detectRecognition() || 0 !== this._initRecognition(t)) && this.setActiveOff(), 
        0);
    }, x.prototype.done = function() {
        return this.isListenRunning() && this.abortListen(), this._clearRecognitionTimeout(), 
        this.mListenTimeoutTime = 3e4, this.mListenRunningFlag = !1, this.mListenLanguage = M, 
        this.mListenMode = V, this.mOnListenStartFunc = null, this.mOnListenStopFunc = null, 
        this.mOnListenResultFunc = null, this.mOnListenInterimResultFunc = null, this.mOnListenNoMatchFunc = null, 
        this.mOnListenRecognitionStartFunc = null, this.mOnListenRecognitionStopFunc = null, 
        this.mOnListenAudioStartFunc = null, this.mOnListenAudioStopFunc = null, this.mOnListenSoundStartFunc = null, 
        this.mOnListenSoundStopFunc = null, this.mOnListenSpeechStartFunc = null, this.mOnListenSpeechStopFunc = null, 
        v.prototype.done.call(this);
    }, x.prototype.isActive = function() {
        return !!this._isRecognition() && v.prototype.isActive.call(this);
    }, x.prototype.setActiveOn = function() {
        return this._isRecognition() ? v.prototype.setActiveOn.call(this) : -1;
    }, x.prototype._onListenStart = function() {
        try {
            return 'function' == typeof this.mOnListenStartFunc ? this.mOnListenStartFunc() : 0;
        } catch (t) {
            return this.exception('_onListenStart', t), -1;
        }
    }, x.prototype._onListenStop = function() {
        try {
            return 'function' == typeof this.mOnListenStopFunc ? this.mOnListenStopFunc() : 0;
        } catch (t) {
            return this.exception('_onListenStop', t), -1;
        }
    }, x.prototype._onListenResult = function(t) {
        try {
            return 'function' == typeof this.mOnListenResultFunc ? this.mOnListenResultFunc(t) : 0;
        } catch (t) {
            return this.exception('_onListenResult', t), -1;
        }
    }, x.prototype._onListenInterimResult = function(t) {
        try {
            return 'function' == typeof this.mOnListenInterimResultFunc ? this.mOnListenInterimResultFunc(t) : 0;
        } catch (t) {
            return this.exception('_onListenInterimResult', t), -1;
        }
    }, x.prototype._onListenNoMatch = function() {
        try {
            return 'function' == typeof this.mOnListenNoMatchFunc ? this.mOnListenNoMatchFunc() : 0;
        } catch (t) {
            return this.exception('_onListenNoMatch', t), -1;
        }
    }, x.prototype._onListenRecognitionStart = function() {
        try {
            return 'function' == typeof this.mOnListenRecognitionStartFunc ? this.mOnListenRecognitionStartFunc() : 0;
        } catch (t) {
            return this.exception('_onListenRecognitionStart', t), -1;
        }
    }, x.prototype._onListenRecognitionStop = function() {
        try {
            return 'function' == typeof this.mOnListenRecognitionStopFunc ? this.mOnListenRecognitionStopFunc() : 0;
        } catch (t) {
            return this.exception('_onListenRecognitionStop', t), -1;
        }
    }, x.prototype._onListenAudioStart = function() {
        try {
            return 'function' == typeof this.mOnListenAudioStartFunc ? this.mOnListenAudioStartFunc() : 0;
        } catch (t) {
            return this.exception('_onListenAudioStart', t), -1;
        }
    }, x.prototype._onListenAudioStop = function() {
        try {
            return 'function' == typeof this.mOnListenAudioStopFunc ? this.mOnListenAudioStopFunc() : 0;
        } catch (t) {
            return this.exception('_onListenAudioStop', t), -1;
        }
    }, x.prototype._onListenSoundStart = function() {
        try {
            return 'function' == typeof this.mOnListenSoundStartFunc ? this.mOnListenSoundStartFunc() : 0;
        } catch (t) {
            return this.exception('_onListenSoundStart', t), -1;
        }
    }, x.prototype._onListenSoundStop = function() {
        try {
            return 'function' == typeof this.mOnListenSoundStopFunc ? this.mOnListenSoundStopFunc() : 0;
        } catch (t) {
            return this.exception('_onListenSoundStop', t), -1;
        }
    }, x.prototype._onListenSpeechStart = function() {
        try {
            return 'function' == typeof this.mOnListenSpeechStartFunc ? this.mOnListenSpeechStartFunc() : 0;
        } catch (t) {
            return this.exception('_onListenSpeechStart', t), -1;
        }
    }, x.prototype._onListenSpeechStop = function() {
        try {
            return 'function' == typeof this.mOnListenSpeechStopFunc ? this.mOnListenSpeechStopFunc() : 0;
        } catch (t) {
            return this.exception('_onListenSpeechStop', t), -1;
        }
    }, Object.defineProperty(x.prototype, "onListenStart", {
        set: function(t) {
            this.mOnListenStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenStop", {
        set: function(t) {
            this.mOnListenStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenResult", {
        set: function(t) {
            this.mOnListenResultFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenInterimResult", {
        set: function(t) {
            this.mOnListenInterimResultFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenNoMatch", {
        set: function(t) {
            this.mOnListenNoMatchFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenRecognitionStart", {
        set: function(t) {
            this.mOnListenRecognitionStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenRecognitionStop", {
        set: function(t) {
            this.mOnListenRecognitionStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenAudioStart", {
        set: function(t) {
            this.mOnListenAudioStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenAudioStop", {
        set: function(t) {
            this.mOnListenAudioStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenSoundStart", {
        set: function(t) {
            this.mOnListenSoundStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenSoundStop", {
        set: function(t) {
            this.mOnListenSoundStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenSpeechStart", {
        set: function(t) {
            this.mOnListenSpeechStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "onListenSpeechStop", {
        set: function(t) {
            this.mOnListenSpeechStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype._detectRecognition = function() {
        return !1;
    }, x.prototype._initRecognition = function(t) {
        return -1;
    }, x.prototype._isRecognition = function() {
        return !1;
    }, x.prototype._setRecognitionTimeout = function() {
        var t = this;
        this._clearRecognitionTimeout(), this.mListenTimeoutId = window.setTimeout(function() {
            return t.stopListen();
        }, this.mListenTimeoutTime);
    }, x.prototype._clearRecognitionTimeout = function() {
        this.mListenTimeoutId && (clearTimeout(this.mListenTimeoutId), this.mListenTimeoutId = 0);
    }, x.prototype._onRecognitionStart = function() {
        return this._onListenRecognitionStart();
    }, x.prototype._onRecognitionEnd = function() {
        return this._onListenRecognitionStop(), this._stopListen();
    }, x.prototype._onRecognitionAudioStart = function() {
        return this.isDictateMode() && this._setRecognitionTimeout(), this._onListenAudioStart();
    }, x.prototype._onRecognitionAudioEnd = function() {
        return this._onListenAudioStop();
    }, x.prototype._onRecognitionSoundStart = function() {
        return this._onListenSoundStart();
    }, x.prototype._onRecognitionSoundEnd = function() {
        return this._onListenSoundStop();
    }, x.prototype._onRecognitionSpeechStart = function() {
        return this._clearRecognitionTimeout(), this._onListenSpeechStart();
    }, x.prototype._onRecognitionSpeechEnd = function() {
        return this._onListenSpeechStop();
    }, x.prototype._getRecognitionResult = function(t) {
        return t;
    }, x.prototype._isRecognitionFinalResult = function(t) {
        return !0;
    }, x.prototype._onRecognitionResult = function(t) {
        var e = 0;
        try {
            this.mListenResultFlag = !0, this._isRecognitionFinalResult(t) ? (e = this._onListenResult(this._getRecognitionResult(t)), 
            this.isDictateMode() && this._setRecognitionTimeout()) : (e = this._onListenInterimResult(this._getRecognitionResult(t)), 
            this.isDictateMode() && this._clearRecognitionTimeout());
        } catch (t) {
            this.exception('_onRecognitionResult', t), e = -1;
        }
        return e = this.isCommandMode() && 0 !== this._stopListen() ? -1 : e;
    }, x.prototype._onRecognitionNoMatch = function(t) {
        var e = this._onListenNoMatch();
        return e = this.isCommandMode() && 0 !== this._stopListen() ? -1 : e;
    }, x.prototype._onRecognitionError = function(t) {
        this._clearRecognitionTimeout();
        try {
            var e = t;
            if ('string' == typeof t.error && !t.message) switch (t.error) {
              case 'network':
                e = new Error('ASR-Error: Netzwerk nicht eingeschaltet');
                break;

              case 'no-speech':
                e = new Error('ASR-Error: Keine Sprache aufgenommen');
                break;

              case 'not-allowed':
                e = new Error('ASR-Error: Kein Mikrofon vorhanden');
                break;

              default:
                e = new Error('ASR-Error: ' + t.error);
            }
            var n = this._onError(e);
            return n = 0 !== this._stopListen() ? -1 : n;
        } catch (t) {
            return this.exception('_onRecognitionError', t), -1;
        }
    }, x.prototype._startRecognition = function() {
        return -1;
    }, x.prototype._stopRecognition = function() {
        return -1;
    }, x.prototype._abortRecognition = function() {
        return -1;
    }, x.prototype._isRecognitionRunning = function() {
        return !1;
    }, x.prototype.isASR = function() {
        return !0;
    }, x.prototype.setASR = function(t) {
        return 0;
    }, x.prototype.getASR = function() {
        return this.getName();
    }, x.prototype.getASRList = function() {
        return [ this.getName() ];
    }, x.prototype.setLanguage = function(t) {
        var e = 0;
        switch (t) {
          case 'de':
            this.mListenLanguage = I;
            break;

          case 'en':
            this.mListenLanguage = F;
            break;

          default:
            this.error('setLanguage', 'keine gueltige Sprache uebergeben'), e = -1;
        }
        return e;
    }, x.prototype.getLanguage = function() {
        var t = '';
        switch (this.mListenLanguage) {
          case I:
            t = 'de';
            break;

          case F:
            t = 'en';
            break;

          default:
            t = '';
        }
        return t;
    }, x.prototype.getLanguageList = function() {
        return [ 'de', 'en' ];
    }, x.prototype._getASRLanguage = function() {
        return this.mListenLanguage;
    }, x.prototype.isMode = function(t) {
        return t === H;
    }, x.prototype.isCommandMode = function() {
        return this.mListenMode === H;
    }, x.prototype.isDictateMode = function() {
        return this.mListenMode === k;
    }, x.prototype.setMode = function(t) {
        return this.isMode(t) ? (this.mListenMode = t, 0) : (this.error('setMode', 'kein gueltiger Eingabemodus uebergeben'), 
        -1);
    }, x.prototype.getMode = function() {
        return this.mListenMode;
    }, x.prototype.getModeList = function() {
        return [ H ];
    }, x.prototype.isListenRunning = function() {
        return this.mListenRunningFlag && this._isRecognitionRunning();
    }, x.prototype.setListenTimeout = function(t) {
        this.mListenTimeoutTime = t;
    }, x.prototype.startListen = function() {
        if (this.mListenResultFlag = !1, !this.isActive()) return this.isErrorOutput() && console.log('ASRPlugin.startListen: ASR ist nicht aktiv'), 
        0;
        if (this.isListenRunning()) return this.error('startListen', 'Spracheingabe laeuft bereits'), 
        -1;
        this._setRecognitionTimeout();
        try {
            if (0 !== this._startRecognition()) return -1;
        } catch (t) {
            return this.exception('startListen', t), -1;
        }
        return this.mListenRunningFlag = !0, this._onListenStart();
    }, x.prototype.getStartListenFunc = function() {
        var t = this;
        return function() {
            return t.startListen();
        };
    }, x.prototype._stopListen = function() {
        return this.isListenRunning() && (this.mListenRunningFlag = !1, this._clearRecognitionTimeout(), 
        this.mListenResultFlag || this._onListenNoMatch(), 0 !== this._onListenStop()) ? -1 : 0;
    }, x.prototype.stopListen = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('ASRPlugin.stopListen: ASR ist nicht aktiv'), 
        0;
        if (!this.isListenRunning()) return 0;
        this._clearRecognitionTimeout();
        var e = 0;
        try {
            e = this._stopRecognition();
        } catch (t) {
            this.exception('stopListen', t), e = -1;
        }
        return this.isListenRunning() && (this.mListenRunningFlag = !1, this.mListenResultFlag || this._onListenNoMatch(), 
        0 !== this._onListenStop() && (e = -1)), e;
    }, x.prototype.getStopListenFunc = function() {
        var t = this;
        return function() {
            return t.stopListen();
        };
    }, x.prototype.abortListen = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('ASRPlugin.abortListen: ASR ist nicht aktiv'), 
        0;
        if (!this.isListenRunning()) return 0;
        this._clearRecognitionTimeout();
        var e = 0;
        try {
            e = this._abortRecognition();
        } catch (t) {
            this.exception('abortListen', t), e = -1;
        }
        return this.isListenRunning() && (this.mListenRunningFlag = !1, this.mListenResultFlag || this._onListenNoMatch(), 
        0 !== this._onListenStop() && (e = -1)), e;
    }, x.prototype.getAbortListenFunc = function() {
        var t = this;
        return function() {
            return t.abortListen();
        };
    }, x);
    function x(t, e) {
        e = v.call(this, t || "ASR", e = void 0 === e ? !0 : e) || this;
        return e.mListenRunningFlag = !1, e.mListenLanguage = M, e.mListenMode = V, e.mListenTimeoutId = 0, 
        e.mListenTimeoutTime = 3e4, e.mListenResultFlag = !1, e.mOnListenStartFunc = null, 
        e.mOnListenStopFunc = null, e.mOnListenResultFunc = null, e.mOnListenInterimResultFunc = null, 
        e.mOnListenNoMatchFunc = null, e.mOnListenRecognitionStartFunc = null, e.mOnListenRecognitionStopFunc = null, 
        e.mOnListenAudioStartFunc = null, e.mOnListenAudioStopFunc = null, e.mOnListenSoundStartFunc = null, 
        e.mOnListenSoundStopFunc = null, e.mOnListenSpeechStartFunc = null, e.mOnListenSpeechStopFunc = null, 
        e;
    }
    var U, D = (d(j, U = w), j.prototype.getClass = function() {
        return 'ASRMock';
    }, j.prototype.isMock = function() {
        return !0;
    }, j.prototype.done = function() {
        return this.recognitionFlag = !0, this.recognitionResult = null, this.initRecognitionResult = 0, 
        this.startRecognitionResult = 0, this.stopRecognitionResult = 0, this.abortRecognitionResult = 0, 
        this.startRecognitionExceptionFlag = !1, this.stopRecognitionExceptionFlag = !1, 
        this.abortRecognitionExceptionFlag = !1, this.startRecognitionExceptionText = 'TestException startRecognition', 
        this.stopRecognitionExceptionText = 'TestException stopRecognition', this.abortRecognitionExceptionText = 'TestException abortRecognition', 
        this.onStartFunc = function() {
            return 0;
        }, this.onEndFunc = function() {
            return 0;
        }, this.onRecognitionStartFunc = function() {
            return 0;
        }, this.onRecognitionEndFunc = function() {
            return 0;
        }, this.onAudioStartFunc = function() {
            return 0;
        }, this.onAudioEndFunc = function() {
            return 0;
        }, this.onSoundStartFunc = function() {
            return 0;
        }, this.onSoundEndFunc = function() {
            return 0;
        }, this.onSpeechStartFunc = function() {
            return 0;
        }, this.onSpeechEndFunc = function() {
            return 0;
        }, this.onResultFunc = function() {
            return '';
        }, this.onInterimResultFunc = function() {
            return '';
        }, this.onNoMatchFunc = function() {
            return 0;
        }, this.onErrorFunc = function() {
            return 0;
        }, U.prototype.done.call(this);
    }, j.prototype._detectRecognition = function() {
        return this.recognitionFlag;
    }, j.prototype._initRecognition = function(t) {
        return this.initRecognitionResult;
    }, j.prototype._isRecognition = function() {
        return this.recognitionFlag;
    }, j.prototype._getRecognitionResult = function(t) {
        return this.recognitionResult;
    }, j.prototype._startRecognition = function() {
        if (this.startRecognitionExceptionFlag) throw new Error(this.startRecognitionExceptionText);
        return this.onStartFunc(), this.onRecognitionStartFunc(), this.onAudioStartFunc(), 
        this.onSpeechStartFunc(), this.onInterimResultFunc(), this.onResultFunc(), this.onNoMatchFunc(), 
        this.onSpeechEndFunc(), this.onAudioEndFunc(), this.onRecognitionEndFunc(), this.onErrorFunc(), 
        this.onEndFunc(), this.startRecognitionResult;
    }, j.prototype._stopRecognition = function() {
        if (this.stopRecognitionExceptionFlag) throw new Error(this.stopRecognitionExceptionText);
        return this.onSpeechEndFunc(), this.onAudioEndFunc(), this.onRecognitionEndFunc(), 
        this.onErrorFunc(), this.onEndFunc(), this.stopRecognitionResult;
    }, j.prototype._abortRecognition = function() {
        if (this.abortRecognitionExceptionFlag) throw new Error(this.abortRecognitionExceptionText);
        return this.onEndFunc(), this.onErrorFunc(), this.abortRecognitionResult;
    }, j);
    function j(t, e) {
        e = U.call(this, t || A, e = void 0 === e ? !0 : e) || this;
        return e.recognitionFlag = !0, e.recognitionResult = '', e.initRecognitionResult = 0, 
        e.startRecognitionResult = 0, e.startRecognitionExceptionFlag = !1, e.startRecognitionExceptionText = 'TestException startRecognition', 
        e.stopRecognitionResult = 0, e.stopRecognitionExceptionFlag = !1, e.stopRecognitionExceptionText = 'TestException stopRecognition', 
        e.abortRecognitionResult = 0, e.abortRecognitionExceptionFlag = !1, e.abortRecognitionExceptionText = 'TestException abortRecognition', 
        e.onStartFunc = function() {
            return 0;
        }, e.onEndFunc = function() {
            return 0;
        }, e.onRecognitionStartFunc = function() {
            return 0;
        }, e.onRecognitionEndFunc = function() {
            return 0;
        }, e.onAudioStartFunc = function() {
            return 0;
        }, e.onAudioEndFunc = function() {
            return 0;
        }, e.onSoundStartFunc = function() {
            return 0;
        }, e.onSoundEndFunc = function() {
            return 0;
        }, e.onSpeechStartFunc = function() {
            return 0;
        }, e.onSpeechEndFunc = function() {
            return 0;
        }, e.onResultFunc = function() {
            return '';
        }, e.onInterimResultFunc = function() {
            return '';
        }, e.onNoMatchFunc = function() {
            return 0;
        }, e.onErrorFunc = function() {
            return 0;
        }, e;
    }
    var G, B = (d(K, G = w), K.prototype.getClass = function() {
        return 'ASRHtml5';
    }, K.prototype.done = function() {
        if (this._clearBreakTimeout(), this.isListenRunning() && this.mRecognition) try {
            this.mRecognition.abort();
        } catch (t) {
            this.exception('done', t);
        }
        return this.mRecognitionClass = null, this.mGrammarListClass = null, this.mGrammarList = null, 
        this.mRecognition = null, G.prototype.done.call(this);
    }, K.prototype.setErrorOutput = function(t) {
        this.mRecognitionFactory && this.mRecognitionFactory.setErrorOutput(t), G.prototype.setErrorOutput.call(this, t);
    }, K.prototype._breakRecognition = function() {
        this.mBreakTimeout = 0, this.error('_breakRecognition', 'Kein SpeechRecognition-Service vorhanden'), 
        this.abortListen();
    }, K.prototype._setBreakTimeout = function() {
        var t = this;
        this.mBreakTimeout = window.setTimeout(function() {
            return t._breakRecognition();
        }, 5e3);
    }, K.prototype._clearBreakTimeout = function() {
        0 < this.mBreakTimeout && (clearTimeout(this.mBreakTimeout), this.mBreakTimeout = 0);
    }, K.prototype.isMode = function(t) {
        return t === k || G.prototype.isMode.call(this, t);
    }, K.prototype.getModeList = function() {
        return [ H, k ];
    }, K.prototype._detectRecognition = function() {
        if (!this.mRecognitionFactory) return this.error('_detectRecognition', 'keine Recognition-Fabrik vorhanden'), 
        !1;
        try {
            this.mRecognitionClass = this.mRecognitionFactory.getSpeechRecognitionClass();
        } catch (t) {
            return this.exception('_detectRecognition', t), !1;
        }
        return null !== this.mRecognitionClass || (this.error('_detectRecognition', 'Kein HTML5 SpeechRecognition API vorhanden'), 
        !1);
    }, K.prototype._initRecognition = function(t) {
        var e = this;
        try {
            return this.mRecognition = new this.mRecognitionClass(), this.mRecognition.lang = this._getASRLanguage(), 
            this.mRecognition.continuous = !1, this.mRecognition.interimResults = !1, this.mRecognition.maxAlternatives = 1, 
            this.mRecognition.onstart = function() {
                e._clearBreakTimeout(), e._onRecognitionStart();
            }, this.mRecognition.onend = function() {
                return e._onRecognitionEnd();
            }, this.mRecognition.onaudiostart = function() {
                return e._onRecognitionAudioStart();
            }, this.mRecognition.onaudioend = function() {
                return e._onRecognitionAudioEnd();
            }, this.mRecognition.onsoundstart = function() {
                return e._onRecognitionSoundStart();
            }, this.mRecognition.msoundend = function() {
                return e._onRecognitionSoundEnd();
            }, this.mRecognition.onspeechstart = function() {
                e._clearBreakTimeout(), e._onRecognitionSpeechStart();
            }, this.mRecognition.onspeechend = function() {
                return e._onRecognitionSpeechEnd();
            }, this.mRecognition.onresult = function(t) {
                return e._onRecognitionResult(t);
            }, this.mRecognition.onnomatch = function(t) {
                return e._onRecognitionNoMatch(t);
            }, this.mRecognition.onerror = function(t) {
                e._clearBreakTimeout(), e._onRecognitionError(t);
            }, 0;
        } catch (t) {
            return this.exception('_initRecognition', t), -1;
        }
    }, K.prototype._isRecognition = function() {
        return !!this.mRecognition;
    }, K.prototype._isRecognitionRunning = function() {
        return !!this.mRecognition;
    }, K.prototype._getRecognitionResult = function(t) {
        if (!t.results) return '';
        for (var e = t.results.length - 1, e = t.results[e][0].transcript, n = '', i = 0, o = t.results; i < o.length; i++) {
            var r = o[i];
            r.isFinal || (n += r[0].transcript);
        }
        return e = n ? n : e;
    }, K.prototype._isRecognitionFinalResult = function(t) {
        if (!t.results) return !0;
        var e = t.results.length - 1;
        return 'boolean' != typeof t.results[e].isFinal || t.results[e].isFinal;
    }, K.prototype._startRecognition = function() {
        return this.mRecognition ? (this._setBreakTimeout(), this.mRecognition.lang = this._getASRLanguage(), 
        this.isDictateMode() ? (this.mRecognition.continuous = !0, this.mRecognition.interimResults = !0) : (this.mRecognition.continuous = !1, 
        this.mRecognition.interimResults = !1), this.mRecognition.abort(), this.mRecognition.start(), 
        0) : -1;
    }, K.prototype._stopRecognition = function() {
        return this.mRecognition ? (this._clearBreakTimeout(), this.mRecognition.stop(), 
        0) : -1;
    }, K.prototype._abortRecognition = function() {
        return this.mRecognition ? (this._clearBreakTimeout(), this.mRecognition.abort(), 
        0) : -1;
    }, K.prototype.test = function(t, e) {
        var n = '', i = -1, o = '';
        return 'say' === t ? (e && e.sayText && (n = e.sayText), this.mRecognition && 'function' == typeof this.mRecognition.say ? (this.mRecognition.say(n), 
        i = 0) : o = 'Kein Corti-Mock von SpeechRecognition vorhanden') : o = 'kein gueltiges Testkommando uebergeben', 
        {
            result: i,
            errorText: o
        };
    }, K);
    function K(t, e) {
        e = G.call(this, t || T, e = void 0 === e ? !0 : e) || this;
        return e.mRecognitionFactory = null, e.mRecognitionClass = null, e.mGrammarListClass = null, 
        e.mGrammarList = null, e.mRecognition = null, e.mBreakTimeout = 0, e.mRecognitionFactory = o.FactoryManager.get(n.SPEECHRECOGNITION_FACTORY_NAME, n.SpeechRecognitionFactory), 
        e.mRecognitionFactory.setErrorOutputFunc(e._getErrorOutputFunc()), e;
    }
    var Y, w = (d(q, Y = w), q.prototype.getClass = function() {
        return 'ASRPort';
    }, q.prototype.done = function() {
        return this.mPort && (this.mPort.removeAllEvent(this.mPortName), this.mPort = null), 
        Y.prototype.done.call(this);
    }, q.prototype.setErrorOutput = function(t) {
        Y.prototype.setErrorOutput.call(this, t), this.mPort && (t ? this.mPort.setErrorOutputOn() : this.mPort.setErrorOutputOff());
    }, q.prototype._detectRecognition = function() {
        return this.mPort = i.CloudManager.findPort(this.mCloudPortName), !!this.mPort || (this.error('_detectRecognition', 'kein Port vorhanden'), 
        !1);
    }, q.prototype._initRecognition = function(t) {
        var e = this;
        return this.mPort ? this.mPort.isInit() ? this.mPort.isOpen() ? (this.mPort.addStartEvent(this.mPortName, function(t) {
            return e._onRecognitionStart(), 0;
        }), this.mPort.addStopEvent(this.mPortName, function(t) {
            return e._onRecognitionEnd(), 0;
        }), this.mPort.addResultEvent(this.mPortName, function(t) {
            return e._onRecognitionResult(t.data), 0;
        }), this.mPort.addErrorEvent(this.mPortName, function(t) {
            return e._checkErrorMessage(t.message), e._onRecognitionError(t), 0;
        }), 0) : (this.error('_initRecognition', 'Port ist nicht geoeffnet'), -1) : (this.error('_initRecognition', 'Port ist nicht initialisiert'), 
        -1) : (this.error('_initRecognition', 'kein Port vorhanden'), -1);
    }, q.prototype._checkErrorMessage = function(t) {}, q.prototype._isRecognition = function() {
        return !!this.mPort && this.mPort.isAction(i.CLOUD_ASR_ACTION);
    }, q.prototype._getRecognitionResult = function(t) {
        return t[0].transcript;
    }, q.prototype._startRecognition = function() {
        return this.mPort ? this.mPort.start(this.mPortName, i.CLOUD_ASR_ACTION, {
            language: this._getASRLanguage()
        }) : -1;
    }, q.prototype._stopRecognition = function() {
        return this.mPort ? this.mPort.stop(this.mPortName, i.CLOUD_ASR_ACTION) : -1;
    }, q.prototype._abortRecognition = function() {
        return this.mPort ? this._stopRecognition() : -1;
    }, q.prototype._isRecognitionRunning = function() {
        return !!this.mPort && this.mPort.isRunning(this.mPortName, i.CLOUD_ASR_ACTION);
    }, q);
    function q(t, e, n) {
        n = Y.call(this, e || "ASRPort", n = void 0 === n ? !0 : n) || this;
        return n.mPort = null, n.mPortName = '', n.mCloudPortName = '', n.mPortName = e, 
        n.mCloudPortName = t, n;
    }
    var z, X = (d(J, z = w), J.prototype.getClass = function() {
        return 'ASRNuance';
    }, J.prototype.setLanguage = function(t) {
        var e = 0;
        switch (t) {
          case 'de':
            this.mListenLanguage = 'deu-DEU';
            break;

          case 'en':
            this.mListenLanguage = 'eng-USA';
            break;

          default:
            this.error('setLanguage', 'keine gueltige Sprache uebergeben'), e = -1;
        }
        return e;
    }, J.prototype.getLanguage = function() {
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
    }, J.prototype._getRecognitionResult = function(t) {
        return t[0];
    }, J);
    function J(t, e) {
        e = z.call(this, i.CLOUD_NUANCE_PORT, t || P, e = void 0 === e ? !0 : e) || this;
        return e.mListenLanguage = 'deu-DEU', e;
    }
    var Q, W = (d(Z, Q = w), Z.prototype.getClass = function() {
        return 'ASRGoogle';
    }, Z.prototype._checkErrorMessage = function(t) {
        'GoogleASR2.getAccessTokenFromServer: Failed to fetch' === t && this.setActiveOff();
    }, Z.prototype._getRecognitionResult = function(t) {
        return t[0].transcript;
    }, Z);
    function Z(t, e) {
        return Q.call(this, i.CLOUD_GOOGLE_PORT, t || N, e = void 0 === e ? !0 : e) || this;
    }
    var $, tt = (d(et, $ = w), et.prototype.getClass = function() {
        return 'ASRMicrosoft';
    }, et.prototype._getRecognitionResult = function(t) {
        return t.text;
    }, et);
    function et(t, e) {
        return $.call(this, i.CLOUD_MICROSOFT_PORT, t || O, e = void 0 === e ? !0 : e) || this;
    }
    var nt, it = (d(ot, nt = o.PluginGroup), ot.prototype.getType = function() {
        return _;
    }, ot.prototype.getClass = function() {
        return 'ASRGroup';
    }, ot.prototype._insertAllASR = function() {
        this.mASRFactory ? (this.insertPlugin(T, this.mASRFactory.create(T, T, !1)), this.insertPlugin(P, this.mASRFactory.create(P, P, !1)), 
        this.insertPlugin(N, this.mASRFactory.create(N, N, !1)), this.insertPlugin(O, this.mASRFactory.create(O, O, !1))) : this.error('_insertAllASR', 'keine ASR-Fabrik vorhanden');
    }, ot.prototype._initASRHtml5 = function(t) {
        if (this.mASRHtml5 = this.findPlugin(T), this.mASRHtml5) {
            if (this.mASRHtml5.init(t), this.mASRHtml5.isActive()) return void (this.isErrorOutput() && console.log('ASRGroup._initASRHtml5: ASR eingefuegt'));
            this.removePlugin(T), this.mASRHtml5.done(), this.mASRHtml5 = null;
        }
        this.isErrorOutput() && console.log('ASRGroup._initASRHtml5: ASR nicht eingefuegt');
    }, ot.prototype._initASRNuance = function(t) {
        if (this.mASRNuance = this.findPlugin(P), this.mASRNuance) {
            if (this.mASRNuance.init(t), this.mASRNuance.isActive()) return void (this.isErrorOutput() && console.log('ASRGroup._initASRNuance: ASR eingefuegt'));
            this.removePlugin(P), this.mASRNuance.done(), this.mASRNuance = null;
        }
        this.isErrorOutput() && console.log('ASRGroup._initASRNuance: ASR nicht eingefuegt');
    }, ot.prototype._initASRGoogle = function(t) {
        if (this.mASRGoogle = this.findPlugin(N), this.mASRGoogle) {
            if (this.mASRGoogle.init(t), this.mASRGoogle.isActive()) return void (this.isErrorOutput() && console.log('ASRGroup._initASRGoogle: ASR eingefuegt'));
            this.removePlugin(N), this.mASRGoogle.done(), this.mASRGoogle = null;
        }
        this.isErrorOutput() && console.log('ASRGroup._initASRGoogle: ASR nicht eingefuegt');
    }, ot.prototype._initASRMicrosoft = function(t) {
        if (this.mASRMicrosoft = this.findPlugin(O), this.mASRMicrosoft) {
            if (this.mASRMicrosoft.init(t), this.mASRMicrosoft.isActive()) return void (this.isErrorOutput() && console.log('ASRGroup._initASRMicrosoft: ASR eingefuegt'));
            this.removePlugin(O), this.mASRMicrosoft.done(), this.mASRMicrosoft = null;
        }
        this.isErrorOutput() && console.log('ASRGroup._initASRMicrosoft: ASR nicht eingefuegt');
    }, ot.prototype.init = function(t) {
        if (this.isInit()) return this.error('init', 'init doppelt aufgerufen'), -1;
        if (!this.mASRFactory) return this.error('init', 'keine ASR-Fabrik vorhanden'), 
        -1;
        var e = t || {};
        return this.isErrorOutput() || (e.errorOutputFlag = !1), this._initASRHtml5(e), 
        this._initASRNuance(e), this._initASRGoogle(e), this._initASRMicrosoft(e), 0 !== nt.prototype.init.call(this, t) ? -1 : (this.mCurrentASR = this.firstPlugin(), 
        this.mCurrentASR || (this.isErrorOutput() && console.log('ASRGroup.init: keine ASR verfuegbar'), 
        this.setActiveOff()), t && t.tts && this.setASR(t.tts), 0);
    }, ot.prototype.done = function() {
        return this.mASRHtml5 = null, this.mASRNuance = null, this.mASRGoogle = null, this.mASRMicrosoft = null, 
        this.mCurrentASR = null, nt.prototype.done.call(this);
    }, ot.prototype.isActive = function() {
        return !!this.mCurrentASR && (!!this.mCurrentASR.isActive() && nt.prototype.isActive.call(this));
    }, ot.prototype.setActiveOn = function() {
        return this.mCurrentASR && this.mCurrentASR.isActive() ? nt.prototype.setActiveOn.call(this) : -1;
    }, Object.defineProperty(ot.prototype, "onInit", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onInit = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenStart", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenStart = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenStop", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenStop = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenResult", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenResult = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenInterimResult", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenInterimResult = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenNoMatch", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenNoMatch = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenRecognitionStart", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenRecognitionStart = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenRecognitionStop", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenRecognitionStop = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenAudioStart", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenAudioStart = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenAudioStop", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenAudioStop = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenSoundStart", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenSoundStart = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenSoundStop", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenSoundStop = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenSpeechStart", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenSpeechStart = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onListenSpeechStop", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onListenSpeechStop = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(ot.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
            for (var e = this.firstPlugin(); e; ) e.onError = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), ot.prototype.isASR = function() {
        return !!this.mCurrentASR;
    }, ot.prototype.setASR = function(t) {
        var e = null;
        switch (t) {
          case T:
            e = this.mASRHtml5;
            break;

          case P:
            e = this.mASRNuance;
            break;

          case N:
            e = this.mASRGoogle;
            break;

          case O:
            e = this.mASRMicrosoft;
        }
        return e ? (this.mCurrentASR = e, 0) : (this.error('setASR', 'Keine ASR vorhanden'), 
        -1);
    }, ot.prototype.getASR = function() {
        return this.mCurrentASR ? this.mCurrentASR.getName() : '';
    }, ot.prototype.getASRList = function() {
        return this.getPluginNameList();
    }, ot.prototype.setLanguage = function(t) {
        var e = 0, n = this.firstPlugin();
        if (!n) return this.error('setLanguage', 'Keine ASR vorhanden'), -1;
        for (;n; ) 0 !== n.setLanguage(t) && (e = -1), n = this.nextPlugin();
        return e;
    }, ot.prototype.getLanguage = function() {
        return this.mCurrentASR ? this.mCurrentASR.getLanguage() : '';
    }, ot.prototype.getLanguageList = function() {
        return this.mCurrentASR ? this.mCurrentASR.getLanguageList() : [];
    }, ot.prototype.isMode = function(t) {
        return !!this.mCurrentASR && this.mCurrentASR.isMode(t);
    }, ot.prototype.isCommandMode = function() {
        return !!this.mCurrentASR && this.mCurrentASR.isCommandMode();
    }, ot.prototype.isDictateMode = function() {
        return !!this.mCurrentASR && this.mCurrentASR.isDictateMode();
    }, ot.prototype.setMode = function(t) {
        if (!t) return this.error('setMode', 'Kein Eingabemodus uebergeben'), -1;
        var e = 0, n = this.firstPlugin();
        if (!n) return this.error('setMode', 'Keine ASR vorhanden'), -1;
        for (;n; ) n.isMode(t) && 0 !== n.setMode(t) && (e = -1), n = this.nextPlugin();
        return e;
    }, ot.prototype.getMode = function() {
        return this.mCurrentASR ? this.mCurrentASR.getMode() : '';
    }, ot.prototype.getModeList = function() {
        return this.mCurrentASR ? this.mCurrentASR.getModeList() : [];
    }, ot.prototype.isListenRunning = function() {
        return !!this.mCurrentASR && this.mCurrentASR.isListenRunning();
    }, ot.prototype.setListenTimeout = function(t) {
        this.mCurrentASR && this.mCurrentASR.setListenTimeout(t);
    }, ot.prototype.startListen = function() {
        return this.mCurrentASR ? this.isActive() ? this.mCurrentASR.startListen() : (this.isErrorOutput() && console.log('ASRGroup.startListen: ASR ist nicht aktiv'), 
        0) : (this.error('startListen', 'keine ASR vorhanden'), -1);
    }, ot.prototype.getStartListenFunc = function() {
        var t = this;
        return function() {
            return t.startListen();
        };
    }, ot.prototype.stopListen = function() {
        return this.isActive() ? this.mCurrentASR.stopListen() : (this.isErrorOutput() && console.log('ASRGroup.stopListen: ASR ist nicht aktiv'), 
        0);
    }, ot.prototype.getStopListenFunc = function() {
        var t = this;
        return function() {
            return t.stopListen();
        };
    }, ot.prototype.abortListen = function() {
        return this.isActive() ? this.mCurrentASR.abortListen() : (this.isErrorOutput() && console.log('ASRGroup.abortListen: ASR ist nicht aktiv'), 
        0);
    }, ot.prototype.getAbortListenFunc = function() {
        var t = this;
        return function() {
            return t.abortListen();
        };
    }, ot.prototype.test = function(t, e) {
        return this.isActive() ? this.mCurrentASR.test(t, e) : (this.isErrorOutput() && console.log('ASRGroup.abortListen: ASR ist nicht aktiv'), 
        0);
    }, ot);
    function ot(t, e, n) {
        n = nt.call(this, e || b, n = void 0 === n ? !0 : n) || this;
        return n.mASRFactory = null, n.mASRHtml5 = null, n.mASRNuance = null, n.mASRGoogle = null, 
        n.mASRMicrosoft = null, n.mCurrentASR = null, n.mASRFactory = t, n._insertAllASR(), 
        n;
    }
    var rt, st = (d(ut, rt = o.PluginFactory), ut.prototype.getType = function() {
        return _;
    }, ut.prototype.getName = function() {
        return y;
    }, ut.prototype._newPlugin = function(t, e, n) {
        var i = null;
        switch (e) {
          case b:
            i = new it(this, t, n);
            break;

          case "ASR":
          case T:
            i = new B(t, n);
            break;

          case P:
            i = new X(t, n);
            break;

          case N:
            i = new W(t, n);
            break;

          case O:
            i = new tt(t, n);
            break;

          case A:
            i = new D(A, n);
            break;

          default:
            this.error('_newPlugin', 'keine ASR vorhanden');
        }
        return i;
    }, ut.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = (t = void 0 === t ? '' : t) || C, e = (e = void 0 === e ? '' : e) || C;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, ut);
    function ut() {
        return rt.call(this, 'ASRFactory') || this;
    }
    var ct, pt = (d(at, ct = e.BaseComponent), at.prototype.getType = function() {
        return S;
    }, at.prototype.getClass = function() {
        return 'ListenComponent';
    }, at.prototype.getVersion = function() {
        return a;
    }, at.prototype.getApiVersion = function() {
        return h;
    }, at.prototype.getServerVersion = function() {
        return '';
    }, at.prototype._setOption = function(t) {
        return t ? (t.listenLanguage && this.setLanguage(t.listenLanguage), ct.prototype._setOption.call(this, t)) : -1;
    }, at.prototype._initAllPlugin = function() {
        return this.mASRPlugin = this.findPlugin(C), this.mASRPlugin && (this.mASRActiveFlag = this.mASRPlugin.isActive()), 
        0;
    }, at.prototype.init = function(t) {
        return ct.prototype.init.call(this, t);
    }, at.prototype._doneAllPlugin = function() {
        this.mASRPlugin = null;
    }, at.prototype._doneAllEvent = function() {
        this.mListenResultEvent.clear(), this.mListenInterimResultEvent.clear(), this.mListenNoMatchEvent.clear(), 
        this.mListenRecognitionStartEvent.clear(), this.mListenRecognitionStopEvent.clear(), 
        this.mListenAudioStartEvent.clear(), this.mListenAudioStopEvent.clear(), this.mListenSoundStartEvent.clear(), 
        this.mListenSoundStopEvent.clear(), this.mListenSpeechStartEvent.clear(), this.mListenSpeechStopEvent.clear();
    }, at.prototype._doneAllAttribute = function() {
        this.mASRActiveFlag = !1, this.mASRFeatureFlag = !1;
    }, at.prototype._resetAllDefault = function() {
        this.setLanguage("de");
    }, at.prototype.reset = function(t) {
        return ct.prototype.reset.call(this, t);
    }, at.prototype.isActive = function() {
        return !!this.mASRActiveFlag && ct.prototype.isActive.call(this);
    }, at.prototype.setActiveOn = function() {
        return this.mASRActiveFlag ? ct.prototype.setActiveOn.call(this) : -1;
    }, at.prototype.setFeatureList = function(t) {
        return t.features ? (t.features.ASR && 'boolean' == typeof t.features.ASR && (this.mASRFeatureFlag = t.features.ASR), 
        0) : (this.error('setFeatureList', 'keine FeatureInfos uebergeben'), -1);
    }, at.prototype.setErrorOutput = function(t) {
        ct.prototype.setErrorOutput.call(this, t), this.mListenResultEvent.setErrorOutput(t), 
        this.mListenInterimResultEvent.setErrorOutput(t), this.mListenNoMatchEvent.setErrorOutput(t), 
        this.mListenRecognitionStartEvent.setErrorOutput(t), this.mListenRecognitionStopEvent.setErrorOutput(t), 
        this.mListenAudioStartEvent.setErrorOutput(t), this.mListenAudioStopEvent.setErrorOutput(t), 
        this.mListenSoundStartEvent.setErrorOutput(t), this.mListenSoundStopEvent.setErrorOutput(t), 
        this.mListenSpeechStartEvent.setErrorOutput(t), this.mListenSpeechStopEvent.setErrorOutput(t);
    }, at.prototype._onListenResult = function(t, e) {
        return this.mListenResultEvent.dispatch(t);
    }, at.prototype._onListenInterimResult = function(t) {
        return this.mListenInterimResultEvent.dispatch(t);
    }, at.prototype._onListenNoMatch = function() {
        return this.mListenNoMatchEvent.dispatch();
    }, at.prototype._onListenRecognitionStart = function() {
        return this.mListenRecognitionStartEvent.dispatch();
    }, at.prototype._onListenRecognitionStop = function() {
        return this.mListenRecognitionStopEvent.dispatch();
    }, at.prototype._onListenAudioStart = function() {
        return this.mListenAudioStartEvent.dispatch();
    }, at.prototype._onListenAudioStop = function() {
        return this.mListenAudioStopEvent.dispatch();
    }, at.prototype._onListenSoundStart = function() {
        return this.mListenSoundStartEvent.dispatch();
    }, at.prototype._onListenSoundStop = function() {
        return this.mListenSoundStopEvent.dispatch();
    }, at.prototype._onListenSpeechStart = function() {
        return this.mListenSpeechStartEvent.dispatch();
    }, at.prototype._onListenSpeechStop = function() {
        return this.mListenSpeechStopEvent.dispatch();
    }, Object.defineProperty(at.prototype, "onListenResult", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onListenResult(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenInterimResult", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onListenInterimResult(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenNoMatch", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenNoMatch();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenRecognitionStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenRecognitionStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenRecognitionStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenRecognitionStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenAudioStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenAudioStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenAudioStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenAudioStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenSoundStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenSoundStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenSoundStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenSoundStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenSpeechStart", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenSpeechStart();
            };
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(at.prototype, "onListenSpeechStop", {
        get: function() {
            var t = this;
            return function() {
                return t._onListenSpeechStop();
            };
        },
        enumerable: !1,
        configurable: !0
    }), at.prototype.addEventListener = function(t, e, n) {
        var i = 0;
        switch (e) {
          case o.SPEECH_LISTENRESULT_EVENT:
            i = this.mListenResultEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENINTERIMRESULT_EVENT:
            i = this.mListenInterimResultEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENNOMATCH_EVENT:
            i = this.mListenNoMatchEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENRECOGNITIONSTART_EVENT:
            i = this.mListenRecognitionStartEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENRECOGNITIONSTOP_EVENT:
            i = this.mListenRecognitionStopEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENAUDIOSTART_EVENT:
            i = this.mListenAudioStartEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENAUDIOSTOP_EVENT:
            i = this.mListenAudioStopEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENSOUNDSTART_EVENT:
            i = this.mListenSoundStartEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENSOUNDSTOP_EVENT:
            i = this.mListenSoundStopEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENSPEECHSTART_EVENT:
            i = this.mListenSpeechStartEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENSPEECHSTOP_EVENT:
            i = this.mListenSpeechStopEvent.addListener(t, n);
            break;

          default:
            i = ct.prototype.addEventListener.call(this, t, e, n);
        }
        return i;
    }, at.prototype.removeEventListener = function(t, e) {
        var n = 0;
        switch (e) {
          case o.SPEECH_LISTENRESULT_EVENT:
            n = this.mListenResultEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENINTERIMRESULT_EVENT:
            n = this.mListenInterimResultEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENNOMATCH_EVENT:
            n = this.mListenNoMatchEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENRECOGNITIONSTART_EVENT:
            n = this.mListenRecognitionStartEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENRECOGNITIONSTOP_EVENT:
            n = this.mListenRecognitionStopEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENAUDIOSTART_EVENT:
            n = this.mListenAudioStartEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENAUDIOSTOP_EVENT:
            n = this.mListenAudioStopEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENSOUNDSTART_EVENT:
            n = this.mListenSoundStartEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENSOUNDSTOP_EVENT:
            n = this.mListenSoundStopEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENSPEECHSTART_EVENT:
            n = this.mListenSpeechStartEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENSPEECHSTOP_EVENT:
            n = this.mListenSpeechStopEvent.removeListener(t);
            break;

          default:
            n = ct.prototype.removeEventListener.call(this, t, e);
        }
        return n;
    }, at.prototype.addListenResultEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENRESULT_EVENT, e);
    }, at.prototype.addListenInterimResultEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENINTERIMRESULT_EVENT, e);
    }, at.prototype.addListenNoMatchEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENNOMATCH_EVENT, e);
    }, at.prototype.addListenRecognitionStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENRECOGNITIONSTART_EVENT, e);
    }, at.prototype.addListenRecognitionStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENRECOGNITIONSTOP_EVENT, e);
    }, at.prototype.addListenAudioStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENAUDIOSTART_EVENT, e);
    }, at.prototype.addListenAudioStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENAUDIOSTOP_EVENT, e);
    }, at.prototype.addListenSoundStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENSOUNDSTART_EVENT, e);
    }, at.prototype.addListenSoundStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENSOUNDSTOP_EVENT, e);
    }, at.prototype.addListenSpeechStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENSPEECHSTART_EVENT, e);
    }, at.prototype.addListenSpeechStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENSPEECHSTOP_EVENT, e);
    }, at.prototype.removeListenResultEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENRESULT_EVENT);
    }, at.prototype.removeListenInterimResultEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENINTERIMRESULT_EVENT);
    }, at.prototype.removeListenNoMatchEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENNOMATCH_EVENT);
    }, at.prototype.removeListenRecognitionStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENRECOGNITIONSTART_EVENT);
    }, at.prototype.removeListenRecognitionStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENRECOGNITIONSTOP_EVENT);
    }, at.prototype.removeListenAudioStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENAUDIOSTART_EVENT);
    }, at.prototype.removeListenAudioStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENAUDIOSTOP_EVENT);
    }, at.prototype.removeListenSoundStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENSOUNDSTART_EVENT);
    }, at.prototype.removeListenSoundStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENSOUNDSTOP_EVENT);
    }, at.prototype.removeListenSpeechStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENSPEECHSTART_EVENT);
    }, at.prototype.removeListenSpeechStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENSPEECHSTOP_EVENT);
    }, at.prototype.removeAllEvent = function(t) {
        var e = ct.prototype.removeAllEvent.call(this, t);
        return 0 !== this.removeListenResultEvent(t) && (e = -1), 0 !== this.removeListenInterimResultEvent(t) && (e = -1), 
        0 !== this.removeListenNoMatchEvent(t) && (e = -1), 0 !== this.removeListenRecognitionStartEvent(t) && (e = -1), 
        0 !== this.removeListenRecognitionStopEvent(t) && (e = -1), 0 !== this.removeListenAudioStartEvent(t) && (e = -1), 
        0 !== this.removeListenAudioStopEvent(t) && (e = -1), 0 !== this.removeListenSoundStartEvent(t) && (e = -1), 
        0 !== this.removeListenSoundStopEvent(t) && (e = -1), 0 !== this.removeListenSpeechStartEvent(t) && (e = -1), 
        e = 0 !== this.removeListenSpeechStopEvent(t) ? -1 : e;
    }, at.prototype.isASR = function() {
        return !(!this.mASRPlugin || !this.mASRPlugin.isASR());
    }, at.prototype.setASR = function(t) {
        return this.mASRPlugin ? this.mASRPlugin.setASR(t) : -1;
    }, at.prototype.getASR = function() {
        return this.mASRPlugin ? this.mASRPlugin.getASR() : '';
    }, at.prototype.getASRList = function() {
        return this.mASRPlugin ? this.mASRPlugin.getASRList() : [];
    }, at.prototype.setTimeout = function(t) {
        return this.mASRPlugin ? (this.mASRPlugin.setListenTimeout(t), 0) : -1;
    }, at.prototype.setLanguage = function(t) {
        return this.mASRPlugin ? this.mASRPlugin.setLanguage(t) : -1;
    }, at.prototype.getLanguage = function() {
        return this.mASRPlugin ? this.mASRPlugin.getLanguage() : "";
    }, at.prototype.getLanguageList = function() {
        return this.mASRPlugin ? this.mASRPlugin.getLanguageList() : [];
    }, at.prototype.isMode = function(t) {
        return !!this.mASRPlugin && this.mASRPlugin.isMode(t);
    }, at.prototype.isCommandMode = function() {
        return !!this.mASRPlugin && this.mASRPlugin.isCommandMode();
    }, at.prototype.isDictateMode = function() {
        return !!this.mASRPlugin && this.mASRPlugin.isDictateMode();
    }, at.prototype.setMode = function(t) {
        return this.mASRPlugin ? this.mASRPlugin.setMode(t) : -1;
    }, at.prototype.getMode = function() {
        return this.mASRPlugin ? this.mASRPlugin.getMode() : "";
    }, at.prototype.getModeList = function() {
        return this.mASRPlugin ? this.mASRPlugin.getModeList() : [];
    }, at.prototype.isRunning = function() {
        return !!this.isActive() && (!!this.mASRPlugin && this.mASRPlugin.isListenRunning());
    }, at.prototype.start = function() {
        return this.isASR() ? this.isActive() ? this.mASRPlugin.startListen() : 0 : (this.error('start', 'keine ASR vorhanden'), 
        -1);
    }, at.prototype.stop = function() {
        return this.isActive() ? this.mASRPlugin ? this.mASRPlugin.stopListen() : (this.error('stop', 'kein ASR vorhanden'), 
        -1) : 0;
    }, at.prototype.abort = function() {
        return this.isActive() ? this.mASRPlugin ? this.mASRPlugin.abortListen() : (this.error('abort', 'kein ASR vorhanden'), 
        -1) : 0;
    }, at.prototype.test = function(t, e) {
        var n = '';
        if ('say' === t) {
            if (this.mASRPlugin) return this.mASRPlugin.test(t, e);
            n = 'kein ASRPlugin vorhanden';
        } else n = 'kein gueltiges Testkommando uebergeben';
        return {
            result: -1,
            errorText: n
        };
    }, at);
    function at(t, e) {
        e = ct.call(this, (t = void 0 === t ? '' : t) || L, e = void 0 === e ? !0 : e) || this;
        return e.mASRPlugin = null, e.mListenResultEvent = new o.EventFunctionList(o.SPEECH_LISTENRESULT_EVENT, L), 
        e.mListenInterimResultEvent = new o.EventFunctionList(o.SPEECH_LISTENINTERIMRESULT_EVENT, L), 
        e.mListenNoMatchEvent = new o.EventFunctionList(o.SPEECH_LISTENNOMATCH_EVENT, L), 
        e.mListenRecognitionStartEvent = new o.EventFunctionList(o.SPEECH_LISTENRECOGNITIONSTART_EVENT, L), 
        e.mListenRecognitionStopEvent = new o.EventFunctionList(o.SPEECH_LISTENRECOGNITIONSTOP_EVENT, L), 
        e.mListenAudioStartEvent = new o.EventFunctionList(o.SPEECH_LISTENAUDIOSTART_EVENT, L), 
        e.mListenAudioStopEvent = new o.EventFunctionList(o.SPEECH_LISTENAUDIOSTOP_EVENT, L), 
        e.mListenSoundStartEvent = new o.EventFunctionList(o.SPEECH_LISTENSOUNDSTART_EVENT, L), 
        e.mListenSoundStopEvent = new o.EventFunctionList(o.SPEECH_LISTENSOUNDSTOP_EVENT, L), 
        e.mListenSpeechStartEvent = new o.EventFunctionList(o.SPEECH_LISTENSPEECHSTART_EVENT, L), 
        e.mListenSpeechStopEvent = new o.EventFunctionList(o.SPEECH_LISTENSPEECHSTOP_EVENT, L), 
        e.mASRActiveFlag = !1, e.mASRFeatureFlag = !1, e.mListenResultEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mListenInterimResultEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mListenNoMatchEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mListenRecognitionStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mListenRecognitionStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mListenAudioStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mListenAudioStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mListenSoundStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mListenSoundStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e.mListenSpeechStartEvent.setErrorOutputFunc(e._getErrorOutputFunc()), e.mListenSpeechStopEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e;
    }
    var ht, St = (d(Et, ht = o.PluginFactory), Et.prototype.getName = function() {
        return E;
    }, Et.prototype.getType = function() {
        return S;
    }, Et.prototype._newPlugin = function(t, e, n) {
        return new pt(t, n);
    }, Et.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = (t = void 0 === t ? '' : t) || L, e = (e = void 0 === e ? '' : e) || L;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, Et);
    function Et() {
        return ht.call(this, 'ListenComponentFactory') || this;
    }
    var Lt, mt = (d(gt, Lt = o.Builder), gt.prototype.getType = function() {
        return S;
    }, gt.prototype.getClass = function() {
        return 'ListenComponentBuilder';
    }, gt.prototype.build = function(t) {
        var e = this._getComponentName(t) || L;
        if (e = this._findComponent(e)) return e;
        try {
            var e = this._buildComponent(t), n = this._getPlugin(C, C, y, st);
            return 0 !== this._binder(e, n) ? (this.error('build', 'Komponenten nicht verbunden'), 
            null) : e;
        } catch (t) {
            return this.exception('build', t), null;
        }
    }, gt.prototype._buildComponent = function(t) {
        var e = this._getComponentName(t) || L, t = this._getComponentClass(t) || L;
        return this._getPlugin(e, t, E, St);
    }, gt.prototype._binder = function(t, e) {
        return t ? e ? 0 !== t.insertPlugin(e.getName(), e) ? (this.error('_binder', 'ASR-Plugin wurde nicht eingefuegt'), 
        -1) : (e.onInit = t.onInit, e.onListenStart = t.onStart, e.onListenStop = t.onStop, 
        e.onListenRecognitionStart = t.onListenRecognitionStart, e.onListenRecognitionStop = t.onListenRecognitionStop, 
        e.onListenAudioStart = t.onListenAudioStart, e.onListenAudioStop = t.onListenAudioStop, 
        e.onListenSoundStart = t.onListenSoundStart, e.onListenSoundStop = t.onListenSoundStop, 
        e.onListenSpeechStart = t.onListenSpeechStart, e.onListenSpeechStop = t.onListenSpeechStop, 
        e.onListenResult = t.onListenResult, e.onListenInterimResult = t.onListenInterimResult, 
        e.onListenNoMatch = t.onListenNoMatch, e.onError = t.onError, 0) : (this.error('_binder', 'Kein ASR-Plugin vorhanden'), 
        -1) : (this.error('_binder', 'Keine Listen-Komponente vorhanden'), -1);
    }, gt);
    function gt(t, e) {
        return Lt.call(this, t || S, e = void 0 === e ? !0 : e) || this;
    }
    var lt, Rt = (d(ft, lt = e.BaseMobile), ft.prototype._initEvent = function() {
        this.mInitEventFlag && (this.mInitEventCount--, 0 === this.mInitEventCount && (this.mInitEventFlag = !1, 
        this._onInit()));
    }, ft.prototype._init = function(t) {
        var e = this;
        return console.log('Listen.init:', t), t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutputFlag(t.errorOutputFlag), 
        window.cordova ? window.ListenPlugin ? (console.log('ListenPlugin-Objekt:', window.ListenPlugin), 
        this.mPlugin = window.ListenPlugin, this.mPlugin.onInit = function(t) {
            0 == t ? (e.mInitEventFlag = !0, e.mPlugin.getASRList(), e.mPlugin.getASR(), e.mPlugin.getLanguageList(), 
            e.mPlugin.getLanguage()) : e._onError(new Error('faild init'));
        }, this.mPlugin.onStart = function(t) {
            e.mRunningFlag = !0, e._onStart();
        }, this.mPlugin.onStop = function() {
            e.mRunningFlag = !1, e._onStop();
        }, this.mPlugin.onAudioStart = function() {
            e._onListenAudioStart();
        }, this.mPlugin.onAudioStop = function() {
            e._onListenAudioStop();
        }, this.mPlugin.onSpeechStart = function() {
            e._onListenSpeechStart();
        }, this.mPlugin.onSpeechStop = function() {
            e._onListenSpeechStop();
        }, this.mPlugin.onResult = function(t) {
            e._onListenResult(t);
        }, this.mPlugin.onInterimResult = function(t) {
            e._onListenInterimResult(t);
        }, this.mPlugin.onNoMatch = function() {
            e._onListenNoMatch();
        }, this.mPlugin.onASRChanged = function(t) {
            e.mASR = t, e._initEvent();
        }, this.mPlugin.onASRList = function(t) {
            e.mASRList = t, e._initEvent();
        }, this.mPlugin.onLanguageChanged = function(t) {
            e.mLanguage = t, e._initEvent();
        }, this.mPlugin.onLanguageList = function(t) {
            e.mLanguageList = t, e._initEvent();
        }, this.mPlugin.onError = function(t) {
            console.log('===> Event Listen.onError ', t), e.mRunningFlag = !1, e._onError(t);
        }, console.log('ListenPlugin:', this.mPlugin), this.mPlugin.init(), 0) : (console.log('Listen: kein ListenPlugin von Cordova vorhanden'), 
        -1) : (console.log('Listen: kein Cordova vorhanden'), -1);
    }, ft.prototype._onListenAudioStart = function() {
        return this.mListenAudioStartEvent.dispatch();
    }, ft.prototype._onListenAudioStop = function() {
        return this.mListenAudioStopEvent.dispatch();
    }, ft.prototype._onListenSpeechStart = function() {
        return this.mListenSpeechStartEvent.dispatch();
    }, ft.prototype._onListenSpeechStop = function() {
        return this.mListenSpeechStopEvent.dispatch();
    }, ft.prototype._onListenResult = function(t) {
        return this.mListenResultEvent.dispatch(t);
    }, ft.prototype._onListenInterimResult = function(t) {
        return this.mListenInterimResultEvent.dispatch(t);
    }, ft.prototype._onListenNoMatch = function() {
        return this.mListenNoMatchEvent.dispatch();
    }, ft.prototype.addEventListener = function(t, e, n) {
        var i = 0;
        switch (e) {
          case o.SPEECH_LISTENAUDIOSTART_EVENT:
            i = this.mListenAudioStartEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENAUDIOSTOP_EVENT:
            i = this.mListenAudioStopEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENSPEECHSTART_EVENT:
            i = this.mListenSpeechStartEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENSPEECHSTOP_EVENT:
            i = this.mListenSpeechStopEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENRESULT_EVENT:
          case o.SPEECH_LISTENINTERIMRESULT_EVENT:
            i = this.mListenResultEvent.addListener(t, n);
            break;

          case o.SPEECH_LISTENNOMATCH_EVENT:
            i = this.mListenNoMatchEvent.addListener(t, n);
            break;

          default:
            i = lt.prototype.addEventListener.call(this, t, e, n);
        }
        return i;
    }, ft.prototype.removeEventListener = function(t, e) {
        var n = 0;
        switch (e) {
          case o.SPEECH_LISTENAUDIOSTART_EVENT:
            n = this.mListenAudioStartEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENAUDIOSTOP_EVENT:
            n = this.mListenAudioStopEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENSPEECHSTART_EVENT:
            n = this.mListenSpeechStartEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENSPEECHSTOP_EVENT:
            n = this.mListenSpeechStopEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENRESULT_EVENT:
          case o.SPEECH_LISTENINTERIMRESULT_EVENT:
            n = this.mListenResultEvent.removeListener(t);
            break;

          case o.SPEECH_LISTENNOMATCH_EVENT:
            n = this.mListenNoMatchEvent.removeListener(t);
            break;

          default:
            n = lt.prototype.removeEventListener.call(this, t, e);
        }
        return n;
    }, ft.prototype.addListenResultEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENRESULT_EVENT, e);
    }, ft.prototype.addListenInterimResultEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENINTERIMRESULT_EVENT, e);
    }, ft.prototype.addListenNoMatchEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENNOMATCH_EVENT, e);
    }, ft.prototype.addListenRecognitionStartEvent = function(t, e) {
        return -1;
    }, ft.prototype.addListenRecognitionStopEvent = function(t, e) {
        return -1;
    }, ft.prototype.addListenAudioStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENAUDIOSTART_EVENT, e);
    }, ft.prototype.addListenAudioStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENAUDIOSTOP_EVENT, e);
    }, ft.prototype.addListenSoundStartEvent = function(t, e) {
        return -1;
    }, ft.prototype.addListenSoundStopEvent = function(t, e) {
        return -1;
    }, ft.prototype.addListenSpeechStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENSPEECHSTART_EVENT, e);
    }, ft.prototype.addListenSpeechStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_LISTENSPEECHSTART_EVENT, e);
    }, ft.prototype.removeListenResultEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENRESULT_EVENT);
    }, ft.prototype.removeListenInterimResultEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENINTERIMRESULT_EVENT);
    }, ft.prototype.removeListenNoMatchEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENNOMATCH_EVENT);
    }, ft.prototype.removeListenRecognitionStartEvent = function(t) {
        return -1;
    }, ft.prototype.removeListenRecognitionStopEvent = function(t) {
        return -1;
    }, ft.prototype.removeListenAudioStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENAUDIOSTART_EVENT);
    }, ft.prototype.removeListenAudioStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENAUDIOSTOP_EVENT);
    }, ft.prototype.removeListenSoundStartEvent = function(t) {
        return -1;
    }, ft.prototype.removeListenSoundStopEvent = function(t) {
        return -1;
    }, ft.prototype.removeListenSpeechStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENSPEECHSTART_EVENT);
    }, ft.prototype.removeListenSpeechStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_LISTENSPEECHSTOP_EVENT);
    }, ft.prototype.isASR = function() {
        return !!this.mASR;
    }, ft.prototype.setASR = function(t) {
        return this.mPlugin ? (this.mPlugin.setASR(t), 0) : (console.log('Error Listen.setASR: kein Listen-Plugin vorhanden'), 
        -1);
    }, ft.prototype.getASR = function() {
        return this.mASR;
    }, ft.prototype.getASRList = function() {
        return this.mASRList;
    }, ft.prototype.setLanguage = function(t) {
        return this.mPlugin ? (this.mPlugin.setLanguage(t), 0) : (console.log('Error Listen.setLanguage: kein Listen-Plugin vorhanden'), 
        -1);
    }, ft.prototype.getLanguage = function() {
        return this.mLanguage;
    }, ft.prototype.getLanguageList = function() {
        return this.mLanguageList;
    }, ft.prototype.setTimeout = function(t) {
        return 0;
    }, ft.prototype.isMode = function(t) {
        return !1;
    }, ft.prototype.isCommandMode = function() {
        return !1;
    }, ft.prototype.isDictateMode = function() {
        return !1;
    }, ft.prototype.setMode = function(t) {
        return 0;
    }, ft.prototype.getMode = function() {
        return "";
    }, ft.prototype.getModeList = function() {
        return [];
    }, ft.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, ft.prototype.start = function() {
        return this.mPlugin ? (this.mPlugin.start(), 0) : (console.log('Error Listen.start: kein Listen-Plugin vorhanden'), 
        -1);
    }, ft.prototype.stop = function() {
        return this.mPlugin ? (this.mPlugin.stop(), 0) : (console.log('Error Listen.stop: kein Listen-Plugin vorhanden'), 
        -1);
    }, ft.prototype.abort = function() {
        return this.stop();
    }, ft);
    function ft(t) {
        t = lt.call(this, 'Listen', t) || this;
        return t.mListenAudioStartEvent = new o.EventFunctionList(o.SPEECH_LISTENAUDIOSTART_EVENT), 
        t.mListenAudioStopEvent = new o.EventFunctionList(o.SPEECH_LISTENAUDIOSTOP_EVENT), 
        t.mListenSpeechStartEvent = new o.EventFunctionList(o.SPEECH_LISTENSPEECHSTART_EVENT), 
        t.mListenSpeechStopEvent = new o.EventFunctionList(o.SPEECH_LISTENSPEECHSTOP_EVENT), 
        t.mListenResultEvent = new o.EventFunctionList(o.SPEECH_LISTENRESULT_EVENT), t.mListenInterimResultEvent = new o.EventFunctionList(o.SPEECH_LISTENINTERIMRESULT_EVENT), 
        t.mListenNoMatchEvent = new o.EventFunctionList(o.SPEECH_LISTENNOMATCH_EVENT), t.mASR = '', 
        t.mASRList = new Array(0), t.mLanguage = '', t.mLanguageList = new Array(0), t.mInitEventFlag = !1, 
        t.mInitEventCount = 4, t;
    }
    var dt, vt = (d(yt, dt = e.Base), yt.prototype._getBuilderName = function() {
        return S;
    }, yt.prototype.addListenResultEvent = function(t, e) {
        return this.mListenComponent.addListenResultEvent(t, e);
    }, yt.prototype.addListenInterimResultEvent = function(t, e) {
        return this.mListenComponent.addListenInterimResultEvent(t, e);
    }, yt.prototype.addListenNoMatchEvent = function(t, e) {
        return this.mListenComponent.addListenNoMatchEvent(t, e);
    }, yt.prototype.addListenRecognitionStartEvent = function(t, e) {
        return this.mListenComponent.addListenRecognitionStartEvent(t, e);
    }, yt.prototype.addListenRecognitionStopEvent = function(t, e) {
        return this.mListenComponent.addListenRecognitionStopEvent(t, e);
    }, yt.prototype.addListenAudioStartEvent = function(t, e) {
        return this.mListenComponent.addListenAudioStartEvent(t, e);
    }, yt.prototype.addListenAudioStopEvent = function(t, e) {
        return this.mListenComponent.addListenAudioStopEvent(t, e);
    }, yt.prototype.addListenSoundStartEvent = function(t, e) {
        return this.mListenComponent.addListenSoundStartEvent(t, e);
    }, yt.prototype.addListenSoundStopEvent = function(t, e) {
        return this.mListenComponent.addListenSoundStopEvent(t, e);
    }, yt.prototype.addListenSpeechStartEvent = function(t, e) {
        return this.mListenComponent.addListenSpeechStartEvent(t, e);
    }, yt.prototype.addListenSpeechStopEvent = function(t, e) {
        return this.mListenComponent.addListenSpeechStopEvent(t, e);
    }, yt.prototype.removeListenResultEvent = function(t) {
        return this.mListenComponent.removeListenResultEvent(t);
    }, yt.prototype.removeListenInterimResultEvent = function(t) {
        return this.mListenComponent.removeListenInterimResultEvent(t);
    }, yt.prototype.removeListenNoMatchEvent = function(t) {
        return this.mListenComponent.removeListenNoMatchEvent(t);
    }, yt.prototype.removeListenRecognitionStartEvent = function(t) {
        return this.mListenComponent.removeListenRecognitionStartEvent(t);
    }, yt.prototype.removeListenRecognitionStopEvent = function(t) {
        return this.mListenComponent.removeListenRecognitionStopEvent(t);
    }, yt.prototype.removeListenAudioStartEvent = function(t) {
        return this.mListenComponent.removeListenAudioStartEvent(t);
    }, yt.prototype.removeListenAudioStopEvent = function(t) {
        return this.mListenComponent.removeListenAudioStopEvent(t);
    }, yt.prototype.removeListenSoundStartEvent = function(t) {
        return this.mListenComponent.removeListenSoundStartEvent(t);
    }, yt.prototype.removeListenSoundStopEvent = function(t) {
        return this.mListenComponent.removeListenSoundStopEvent(t);
    }, yt.prototype.removeListenSpeechStartEvent = function(t) {
        return this.mListenComponent.removeListenSpeechStartEvent(t);
    }, yt.prototype.removeListenSpeechStopEvent = function(t) {
        return this.mListenComponent.removeListenSpeechStopEvent(t);
    }, yt.prototype.isASR = function() {
        return this.mListenComponent.isASR();
    }, yt.prototype.setASR = function(t) {
        return this.mListenComponent.setASR(t);
    }, yt.prototype.getASR = function() {
        return this.mListenComponent.getASR();
    }, yt.prototype.getASRList = function() {
        return this.mListenComponent.getASRList();
    }, yt.prototype.setTimeout = function(t) {
        return this.mListenComponent.setTimeout(t);
    }, yt.prototype.setLanguage = function(t) {
        return this.mListenComponent.setLanguage(t);
    }, yt.prototype.getLanguage = function() {
        return this.mListenComponent.getLanguage();
    }, yt.prototype.getLanguageList = function() {
        return this.mListenComponent.getLanguageList();
    }, yt.prototype.isMode = function(t) {
        return this.mListenComponent.isMode(t);
    }, yt.prototype.isCommandMode = function() {
        return this.mListenComponent.isCommandMode();
    }, yt.prototype.isDictateMode = function() {
        return this.mListenComponent.isDictateMode();
    }, yt.prototype.setMode = function(t) {
        return this.mListenComponent.setMode(t);
    }, yt.prototype.getMode = function() {
        return this.mListenComponent.getMode();
    }, yt.prototype.getModeList = function() {
        return this.mListenComponent.getModeList();
    }, yt.prototype.abort = function() {
        return this.mListenComponent.abort();
    }, yt);
    function yt(t) {
        t = dt.call(this, t) || this;
        return t.mListenComponent = t.mComponent, t;
    }
    var _t = (At.create = function(t, e) {
        try {
            if (window.cordova && window.ListenPlugin) return console.log('ListenFactory: mobiles Plugin:', window.ListenPlugin), 
            new Rt(e);
        } catch (t) {
            console.log('===> EXCEPTION ListenFactory.create: mobile Exception', t.message);
        }
        try {
            return o.SystemManager.findBuilder(S) || 0 === o.SystemManager.insertBuilder(S, new mt('', !1)) ? new vt(e) : (console.log('ListenFactory.create: kein Builder eingetragen'), 
            null);
        } catch (t) {
            return console.log('ListenFactory.create: web Exception', t), null;
        }
    }, At);
    function At() {}
    var Tt, w = {
        activeFlag: !0,
        listenLanguage: l,
        errorOutputFlag: !1
    }, Pt = !1, e = (d(Nt, Tt = r.Service), Nt.isConstructorInit = function() {
        return Nt.constructorInitFlag;
    }, Nt.setConstructorInitOn = function() {
        Nt.constructorInitFlag = !0;
    }, Nt.setConstructorInitOff = function() {
        Nt.constructorInitFlag = !1;
    }, Nt.getConfig = function() {
        return Nt.listenServiceConfig;
    }, Nt.prototype._setOption = function(t) {
        return 0 !== Tt.prototype._setOption.call(this, t) ? -1 : ('string' == typeof t.listenLanguage && (this.language = t.listenLanguage), 
        0);
    }, Nt.prototype._createComponent = function(t, e) {
        return null;
    }, Nt.prototype.init = function(t) {
        return Tt.prototype.init.call(this, t);
    }, Nt.prototype.reset = function(t) {
        return Tt.prototype.reset.call(this, t);
    }, Nt.prototype._addAllEvent = function(t) {
        var e = this;
        return 0 !== Tt.prototype._addAllEvent.call(this, t) ? -1 : (this.mListen.addListenResultEvent(t, function(t) {
            return e.mListenResultEvent.emit(t), 0;
        }), this.mListen.addListenInterimResultEvent(t, function(t) {
            return e.mListenInterimResultEvent.emit(t), 0;
        }), this.mListen.addListenNoMatchEvent(t, function() {
            return e.mListenNoMatchEvent.emit(), 0;
        }), this.mListen.addListenRecognitionStartEvent(t, function() {
            return e.mListenRecognitionStartEvent.emit(), 0;
        }), this.mListen.addListenRecognitionStopEvent(t, function() {
            return e.mListenRecognitionStopEvent.emit(), 0;
        }), this.mListen.addListenAudioStartEvent(t, function() {
            return e.mListenAudioStartEvent.emit(), 0;
        }), this.mListen.addListenAudioStopEvent(t, function() {
            return e.mListenAudioStopEvent.emit(), 0;
        }), this.mListen.addListenSoundStartEvent(t, function() {
            return e.mListenSoundStartEvent.emit(), 0;
        }), this.mListen.addListenSoundStopEvent(t, function() {
            return e.mListenSoundStopEvent.emit(), 0;
        }), this.mListen.addListenSpeechStartEvent(t, function() {
            return e.mListenSpeechStartEvent.emit(), 0;
        }), this.mListen.addListenSpeechStopEvent(t, function() {
            return e.mListenSpeechStopEvent.emit(), 0;
        }), 0);
    }, Object.defineProperty(Nt.prototype, "resultEvent", {
        get: function() {
            return this.mListenResultEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "interimResultEvent", {
        get: function() {
            return this.mListenInterimResultEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "noMatchEvent", {
        get: function() {
            return this.mListenNoMatchEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "recognitionStartEvent", {
        get: function() {
            return this.mListenRecognitionStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "recognitionStopEvent", {
        get: function() {
            return this.mListenRecognitionStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "audioStartEvent", {
        get: function() {
            return this.mListenAudioStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "audioStopEvent", {
        get: function() {
            return this.mListenAudioStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "soundStartEvent", {
        get: function() {
            return this.mListenSoundStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "soundStopEvent", {
        get: function() {
            return this.mListenSoundStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "speechStartEvent", {
        get: function() {
            return this.mListenSpeechStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(Nt.prototype, "speechStopEvent", {
        get: function() {
            return this.mListenSpeechStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.isASR = function() {
        return !!this.mListen && this.mListen.isASR();
    }, Nt.prototype.setASR = function(t) {
        return this.mListen ? this.mListen.setASR(t) : (this._error('setASR', 'keine Listen-Komponente vorhanden'), 
        -1);
    }, Nt.prototype.getASR = function() {
        return this.mListen ? this.mListen.getASR() : (this._error('getASR', 'keine Listen-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Nt.prototype, "asr", {
        get: function() {
            return this.getASR();
        },
        set: function(t) {
            this.setASR(t);
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.getASRList = function() {
        return this.mListen ? this.mListen.getASRList() : (this._error('getASRList', 'keine Listen-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(Nt.prototype, "asrs", {
        get: function() {
            return this.getASRList();
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.setTimeout = function(t) {
        return this.mListen ? this.mListen.setTimeout(t) : (this._error('setTimeout', 'keine Listen-Komponente vorhanden'), 
        -1);
    }, Nt.prototype.setLanguage = function(t) {
        return this.mListen ? this.mListen.setLanguage(t) : (this._error('setLanguage', 'keine Listen-Komponente vorhanden'), 
        -1);
    }, Nt.prototype.getLanguage = function() {
        return this.mListen ? this.mListen.getLanguage() : (this._error('getLanguage', 'keine Listen-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Nt.prototype, "language", {
        get: function() {
            return this.getLanguage();
        },
        set: function(t) {
            this.setLanguage(t);
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.getLanguageList = function() {
        return this.mListen ? this.mListen.getLanguageList() : (this._error('getLanguageList', 'keine Listen-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(Nt.prototype, "languages", {
        get: function() {
            return this.getLanguageList();
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.isMode = function(t) {
        return this.mListen ? this.mListen.isMode(t) : (this._error('isMode', 'keine Listen-Komponente vorhanden'), 
        !1);
    }, Nt.prototype.isCommandMode = function() {
        return this.mListen ? this.mListen.isCommandMode() : (this._error('isMode', 'keine Listen-Komponente vorhanden'), 
        !1);
    }, Nt.prototype.isDictateMode = function() {
        return this.mListen ? this.mListen.isDictateMode() : (this._error('isMode', 'keine Listen-Komponente vorhanden'), 
        !1);
    }, Nt.prototype.setMode = function(t) {
        return this.mListen ? this.mListen.setMode(t) : (this._error('setMode', 'keine Listen-Komponente vorhanden'), 
        -1);
    }, Nt.prototype.getMode = function() {
        return this.mListen ? this.mListen.getMode() : (this._error('getMode', 'keine Listen-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Nt.prototype, "mode", {
        get: function() {
            return this.getMode();
        },
        set: function(t) {
            this.setMode(t);
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.getModeList = function() {
        return this.mListen ? this.mListen.getModeList() : (this._error('getModeList', 'keine Listen-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(Nt.prototype, "modes", {
        get: function() {
            return this.getModeList();
        },
        enumerable: !1,
        configurable: !0
    }), Nt.prototype.abort = function() {
        return this.mListen ? this.mListen.abort() : (this._error('abort', 'keine Listen-Komponente vorhanden'), 
        -1);
    }, Nt.listenServiceConfig = w, Nt.constructorInitFlag = !0, Nt);
    function Nt() {
        var t = Tt.call(this, L, g, h) || this;
        if (t.mListen = null, t.mListenResultEvent = new r.EventEmitter(Pt), t.mListenInterimResultEvent = new r.EventEmitter(Pt), 
        t.mListenNoMatchEvent = new r.EventEmitter(Pt), t.mListenRecognitionStartEvent = new r.EventEmitter(Pt), 
        t.mListenRecognitionStopEvent = new r.EventEmitter(Pt), t.mListenAudioStartEvent = new r.EventEmitter(Pt), 
        t.mListenAudioStopEvent = new r.EventEmitter(Pt), t.mListenSoundStartEvent = new r.EventEmitter(Pt), 
        t.mListenSoundStopEvent = new r.EventEmitter(Pt), t.mListenSpeechStartEvent = new r.EventEmitter(Pt), 
        t.mListenSpeechStopEvent = new r.EventEmitter(Pt), Nt.isConstructorInit() && 0 !== t.init(Nt.getConfig())) throw new Error('Listen nicht initialisiert');
        return 0 !== r.ServiceManager.insert(t) && console.log('ListenBaseService: wurde nicht in ServiceManager eingetragen'), 
        t;
    }
    var Ot, e = (d(bt, Ot = e), bt.prototype._createComponent = function(t, e) {
        return this.mListen = _t.create(t, e), this.mListen;
    }, bt);
    function bt() {
        return Ot.call(this) || this;
    }
    t.LISTEN_API_VERSION = h, t.LISTEN_ASYNC_EVENT = !1, t.LISTEN_BUILDER_NAME = 'ListenBuilder', 
    t.LISTEN_COMMAND_MODE = R, t.LISTEN_COMPONENTBUILDER_NAME = 'ListenComponentBuilder', 
    t.LISTEN_COMPONENTFACTORY_NAME = E, t.LISTEN_COMPONENT_NAME = L, t.LISTEN_DEFAULT_LANGUAGE = "de", 
    t.LISTEN_DEFAULT_MODE = "Command", t.LISTEN_DE_LANGUAGE = l, t.LISTEN_DICTATE_MODE = 'Dictate', 
    t.LISTEN_EN_LANGUAGE = 'en', t.LISTEN_FACTORY_NAME = 'ListenFactory', t.LISTEN_GOOGLE_ASR = 'ASRGoogle', 
    t.LISTEN_HTML5_ASR = 'ASRHtml5', t.LISTEN_MICROSOFT_ASR = 'ASRMicrosoft', t.LISTEN_MOCK_NAME = 'ListenMock', 
    t.LISTEN_NUANCE_ASR = 'ASRNuance', t.LISTEN_PLUGIN_NAME = m, t.LISTEN_SERVICEMOCK_NAME = 'ListenServiceMock', 
    t.LISTEN_SERVICE_NAME = g, t.LISTEN_TYPE_NAME = S, t.LISTEN_UNDEFINE_LANGUAGE = "", 
    t.LISTEN_UNDEFINE_MODE = "", t.LISTEN_VERSION_BUILD = u, t.LISTEN_VERSION_DATE = p, 
    t.LISTEN_VERSION_NUMBER = s, t.LISTEN_VERSION_STRING = a, t.LISTEN_VERSION_TYPE = c, 
    t.Listen = vt, t.ListenComponent = pt, t.ListenComponentBuilder = mt, t.ListenComponentFactory = St, 
    t.ListenFactory = _t, t.ListenMobile = Rt, t.ListenService = e, t.ListenServiceConfig = w, 
    Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
