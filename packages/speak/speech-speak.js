/**
 * Speech-Speak Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core'), require('@speech/audio'), require('@speech/common'), require('@speech/cloud'), require('@speech/base'), require('@speech/service')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/audio', '@speech/common', '@speech/cloud', '@speech/base', '@speech/service' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechSpeak = {}, t.speechCore, t.speechAudio, t.speechCommon, t.speechCloud, t.speechBase, t.speechService);
}(this, function(t, i, o, n, r, e, s) {
    'use strict';
    var u = i.SPEECH_VERSION_NUMBER, a = i.SPEECH_VERSION_BUILD, p = i.SPEECH_VERSION_TYPE, h = i.SPEECH_VERSION_DATE, c = u + '.' + a + ' vom ' + h + ' (' + p + ')', S = '1.4', l = 'SpeakComponentFactory', g = 'Speak', m = 'SpeakComponent', T = 'SpeakService', y = !1, f = 'assets/', d = function(t, e) {
        return (d = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        })(t, e);
    };
    function k(t, e) {
        function n() {
            this.constructor = t;
        }
        d(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
        new n());
    }
    var A, P = 'TTSFactory', _ = 'TTS', v = 'TTSMock', E = 'TTSHtml5', F = 'TTSAmazon', L = 'TTSGoogle', O = 'TTSMicrosoft', C = 'TTSNuance', b = 'TTSGroup', N = b, U = 'de-DE', V = 'en-US', I = U, x = (k(R, A = i.Plugin), 
    R.prototype.getType = function() {
        return _;
    }, R.prototype.getClass = function() {
        return 'TTSPlugin';
    }, R.prototype.init = function(t) {
        return this.isInit() ? (this.error('init', 'init doppelt aufgerufen'), -1) : 0 !== A.prototype.init.call(this, t) ? -1 : this._detectSynthesis() ? 0 !== this._initSynthesis(t) ? (this._clearInit(), 
        -1) : (t && t.language && this.setLanguage(t.language), t && t.voice && this.setVoice(t.voice), 
        0) : (this.setActiveOff(), 0);
    }, R.prototype.done = function() {
        return this.isSpeakRunning() && this.stopSpeak(), this.mSpeakRunningFlag = !1, this.mSpeakLanguage = I, 
        this.mSpeakVoice = '', this.mOnSpeakStartFunc = null, this.mOnSpeakStopFunc = null, 
        A.prototype.done.call(this);
    }, R.prototype.isActive = function() {
        return !!this._isSynthesis() && A.prototype.isActive.call(this);
    }, R.prototype.setActiveOn = function() {
        return this._isSynthesis() ? A.prototype.setActiveOn.call(this) : -1;
    }, R.prototype._onSpeakStart = function() {
        if ('function' == typeof this.mOnSpeakStartFunc) try {
            return this.mOnSpeakStartFunc();
        } catch (t) {
            return this.exception('_onSpeakStart', t), -1;
        }
        return 0;
    }, R.prototype._onSpeakStop = function() {
        if ('function' == typeof this.mOnSpeakStopFunc) try {
            return this.mOnSpeakStopFunc();
        } catch (t) {
            return this.exception('_onSpeakStop', t), -1;
        }
        return 0;
    }, Object.defineProperty(R.prototype, "onSpeakStart", {
        set: function(t) {
            this.mOnSpeakStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(R.prototype, "onSpeakStop", {
        set: function(t) {
            this.mOnSpeakStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), R.prototype._detectSynthesis = function() {
        return !1;
    }, R.prototype._initSynthesis = function(t) {
        return -1;
    }, R.prototype._isSynthesis = function() {
        return !1;
    }, R.prototype._onSynthesisStart = function() {
        return 0;
    }, R.prototype._onSynthesisEnd = function() {
        var t = 0;
        return this.mSpeakRunningFlag && (this.mSpeakRunningFlag = !1, t = this._onSpeakStop()), 
        t;
    }, R.prototype._onSynthesisError = function(t) {
        try {
            var e = this._onError(new Error(t.error));
            return this.isSpeakRunning() && (this.mSpeakRunningFlag = !1, 0 !== this._onSpeakStop() && (e = -1)), 
            e;
        } catch (t) {
            return this.exception('_onSynthesisError', t), -1;
        }
    }, R.prototype._createSynthesis = function(t) {
        return -1;
    }, R.prototype._startSynthesis = function(t) {
        return -1;
    }, R.prototype._stopSynthesis = function() {
        return -1;
    }, R.prototype._probeSynthesis = function() {
        return 0;
    }, R.prototype._isSynthesisRunning = function() {
        return !0;
    }, R.prototype.isTTS = function() {
        return !0;
    }, R.prototype.setTTS = function(t) {
        return 0;
    }, R.prototype.getTTS = function() {
        return this.getName();
    }, R.prototype.getTTSList = function() {
        return [ this.getName() ];
    }, R.prototype.setLanguage = function(t) {
        var e = 0;
        switch (t) {
          case 'de':
            this.mSpeakLanguage = U;
            break;

          case 'en':
            this.mSpeakLanguage = V;
            break;

          default:
            this.error('setLanguage', 'keine gueltige Sprache uebergeben'), e = -1;
        }
        return e;
    }, R.prototype.getLanguage = function() {
        var t = '';
        switch (this.mSpeakLanguage) {
          case U:
            t = 'de';
            break;

          case V:
            t = 'en';
            break;

          default:
            t = '';
        }
        return t;
    }, R.prototype.getLanguageList = function() {
        return [ 'de', 'en' ];
    }, R.prototype._getTTSLanguage = function() {
        return this.mSpeakLanguage;
    }, R.prototype.setVoice = function(t) {
        return this.mSpeakVoice = t, 0;
    }, R.prototype.getVoice = function() {
        return this.mSpeakVoice;
    }, R.prototype.getVoiceList = function() {
        return [];
    }, R.prototype.isSpeakRunning = function() {
        return this.mSpeakRunningFlag && this._isSynthesisRunning();
    }, R.prototype.startSpeak = function(t) {
        if (!this.isActive()) return this.isErrorOutput() && console.log('TTSPlugin.startSpeak: TTS ist nicht aktiv'), 
        0;
        if (this.isSpeakRunning()) return this.error('startSpeak', 'Sprachausgabe laeuft bereits'), 
        -1;
        if (!t) return this._probeSynthesis();
        this.mSpeakRunningFlag = !0;
        try {
            return 0 !== this._createSynthesis(t) ? (this.mSpeakRunningFlag = !1, -1) : 0 !== this._startSynthesis(t) ? (this.mSpeakRunningFlag = !1, 
            -1) : this._onSpeakStart();
        } catch (t) {
            return this.exception('startSpeak', t), this.mSpeakRunningFlag = !1, -1;
        }
    }, R.prototype.getStartSpeakFunc = function() {
        var e = this;
        return function(t) {
            return e.startSpeak(t);
        };
    }, R.prototype.stopSpeak = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('TTSPlugin.stopSpeak: TTS ist nicht aktiv'), 
        0;
        if (!this.isSpeakRunning()) return this.isErrorOutput() && console.log('TTSPlugin.stopSpeak: keine aktive Sprachausgabe'), 
        0;
        var e = 0;
        try {
            e = this._stopSynthesis();
        } catch (t) {
            this.exception('stopSpeak', t), e = -1;
        }
        return this.isSpeakRunning() && (this.mSpeakRunningFlag = !1, 0 !== this._onSpeakStop() && (e = -1)), 
        e;
    }, R.prototype.getStopSpeakFunc = function() {
        var t = this;
        return function() {
            return t.stopSpeak();
        };
    }, R);
    function R(t, e) {
        e = A.call(this, t || "TTS", e = void 0 === e ? !0 : e) || this;
        return e.mSpeakRunningFlag = !1, e.mSpeakLanguage = I, e.mSpeakVoice = '', e.mOnSpeakStartFunc = null, 
        e.mOnSpeakStopFunc = null, e;
    }
    var K, M = (k(w, K = x), w.prototype.getClass = function() {
        return 'TTSMock';
    }, w.prototype.isMock = function() {
        return !0;
    }, w.prototype.done = function() {
        return this.synthesisFlag = !0, this.initSynthesisResult = 0, this.startSynthesisResult = 0, 
        this.stopSynthesisResult = 0, this.startSynthesisExceptionFlag = !1, this.stopSynthesisExceptionFlag = !1, 
        this.startSynthesisExceptionText = 'TestException startSynthesis', this.stopSynthesisExceptionText = 'TestException stopSynthesis', 
        this.onStartFunc = function() {
            return 0;
        }, this.onEndFunc = function() {
            return 0;
        }, this.onErrorFunc = function() {
            return 0;
        }, K.prototype.done.call(this);
    }, w.prototype._detectSynthesis = function() {
        return this.synthesisFlag;
    }, w.prototype._initSynthesis = function(t) {
        return this._onInit(), this.initSynthesisResult;
    }, w.prototype._isSynthesis = function() {
        return this.synthesisFlag;
    }, w.prototype._createSynthesis = function(t) {
        return 0;
    }, w.prototype._startSynthesis = function(t) {
        if (this.startSynthesisExceptionFlag) throw new Error(this.startSynthesisExceptionText);
        return this.onStartFunc(), this.onErrorFunc(), this.onEndFunc(), this.startSynthesisResult;
    }, w.prototype._stopSynthesis = function() {
        if (this.stopSynthesisExceptionFlag) throw new Error(this.stopSynthesisExceptionText);
        return this.onErrorFunc(), this.onEndFunc(), this.stopSynthesisResult;
    }, w);
    function w(t, e) {
        e = K.call(this, t || v, e = void 0 === e ? !0 : e) || this;
        return e.synthesisFlag = !0, e.initSynthesisResult = 0, e.startSynthesisResult = 0, 
        e.startSynthesisExceptionFlag = !1, e.startSynthesisExceptionText = 'TestException startSynthesis', 
        e.stopSynthesisResult = 0, e.stopSynthesisExceptionFlag = !1, e.stopSynthesisExceptionText = 'TestException stopSynthesis', 
        e.onStartFunc = function() {
            return 0;
        }, e.onEndFunc = function() {
            return 0;
        }, e.onErrorFunc = function() {
            return 0;
        }, e;
    }
    var D, G = (k(H, D = x), H.prototype.getClass = function() {
        return 'TTSHtml5';
    }, H.prototype.done = function() {
        if (this._clearBreakTimeout(), this.isSpeakRunning() && this.mSynthesis) try {
            this.mSynthesis.cancel();
        } catch (t) {
            this.exception('done', t);
        }
        return this.mSynthesis = null, this.mUtteranceClass = null, this.mUtterance = null, 
        D.prototype.done.call(this);
    }, H.prototype.setErrorOutput = function(t) {
        this.mSynthesisFactory && this.mSynthesisFactory.setErrorOutput(t), D.prototype.setErrorOutput.call(this, t);
    }, H.prototype._breakSynthesis = function() {
        this.mBreakTimeout = 0, this.error('_breakSynthesis', 'Kein SpeechSynthesis-Service vorhanden'), 
        this.stopSpeak();
    }, H.prototype._setBreakTimeout = function() {
        var t = this;
        this.mBreakTimeout = window.setTimeout(function() {
            return t._breakSynthesis();
        }, 5e3);
    }, H.prototype._clearBreakTimeout = function() {
        0 < this.mBreakTimeout && (clearTimeout(this.mBreakTimeout), this.mBreakTimeout = 0);
    }, H.prototype.getVoiceList = function() {
        if (!this.mSynthesis) return this.error('getVoiceList', 'keine SpeechSynthesis vorhanden'), 
        [];
        var t = this._getTTSLanguage();
        if (!t) return this.error('getVoiceList', 'keine Sprache vorhanden'), [];
        var e = [];
        try {
            var n = this.mSynthesis.getVoices();
            if (!Array.isArray(n)) return this.error('getVoiceList', 'keine Voice-Liste als Array vorhanden'), 
            [];
            for (var i = 0; i < n.length; i++) n[i].lang === t && e.push(n[i].name);
            return e;
        } catch (t) {
            return this.exception('getVoiceList', t), [];
        }
    }, H.prototype._getTTSVoice = function(t) {
        if (void 0 === t && (t = !0), this.mSynthesis) {
            var e = this._getTTSLanguage();
            if (e) {
                var n = this.getVoice();
                try {
                    var i = this.mSynthesis.getVoices();
                    if (!Array.isArray(i)) return void this.error('_getTTSVoice', 'keine Voice-Liste als Array vorhanden');
                    if (n) for (var o = 0; o < i.length; o++) if (i[o].name === n) return i[o];
                    for (var r = void 0, s = void 0, o = 0; o < i.length; o++) if (i[o].lang === e && (r || i[o].localService !== t || (r = i[o]), 
                    i[o].default && (s = i[o], i[o].localService === t))) return s;
                    return r ? r : s;
                } catch (t) {
                    return void this.exception('_getTTSVoice', t);
                }
            } else this.error('_getTTSVoice', 'keine Sprache vorhanden');
        } else this.error('_getTTSVoice', 'keine SpeechSynthesis vorhanden');
    }, H.prototype._detectSynthesis = function() {
        if (!this.mSynthesisFactory) return this.error('_detectSynthesis', 'keine SpeechSynthesis-Fabrik vorhanden'), 
        !1;
        try {
            this.mSynthesis = this.mSynthesisFactory.getSpeechSynthesis(), this.mUtteranceClass = this.mSynthesisFactory.getSpeechSynthesisUtteranceClass();
        } catch (t) {
            return this.exception('_detectSynthesis', t), !1;
        }
        return null === this.mSynthesis ? (this.error('_detectSynthesis', 'Kein HTML5 SpeechSynthesis API vorhanden'), 
        !1) : null !== this.mUtteranceClass || (this.error('_detectSynthesis', 'Kein HTML5 SpeechSynthesisUtterance API vorhanden'), 
        !1);
    }, H.prototype._initSynthesis = function(t) {
        return this._onInit();
    }, H.prototype._createSynthesis = function(t) {
        var e = this;
        try {
            return console.log('TTSHtml5._createSynthesis: UtteranceClass = ', this.mUtteranceClass), 
            this.mUtterance = new this.mUtteranceClass(t), this.mUtterance.lang = this._getTTSLanguage(), 
            this.mUtterance.voice = this._getTTSVoice(), this.mUtterance.onstart = function() {
                e._clearBreakTimeout(), e._onSynthesisStart();
            }, this.mUtterance.onend = function() {
                e._onSynthesisEnd();
            }, this.mUtterance.onerror = function(t) {
                e._clearBreakTimeout(), (!t.type || 'error' !== t.type || t.error && 'canceled' !== t.error && 'interrupted' !== t.error) && e._onSynthesisError(t);
            }, 0;
        } catch (t) {
            return this.exception('_createSynthesis', t), -1;
        }
    }, H.prototype._isSynthesis = function() {
        return !!this.mSynthesis;
    }, H.prototype._startSynthesis = function(t) {
        if (console.log('TTSHtml5._startSynthesis: Synthesis = ', this.mSynthesis, this.mUtterance), 
        this.mSynthesis && this.mUtterance) {
            this._setBreakTimeout();
            try {
                this.mSynthesis.cancel(), console.log('TTSHtml5._startSynthesis: speak'), this.mSynthesis.speak(this.mUtterance);
            } catch (t) {
                console.log('TTSHtml5._startSynthesis: Exception ', t);
            }
            return 0;
        }
        return -1;
    }, H.prototype._stopSynthesis = function() {
        if (console.log('TTSHtml5._stopSynthesis'), this.mSynthesis) {
            this._clearBreakTimeout();
            try {
                this.mSynthesis.cancel();
            } catch (t) {}
            return 0;
        }
        return -1;
    }, H.prototype._probeSynthesis = function() {
        var e = this;
        console.log('TTSHtml5._probeSynthesis: start', this.mUtteranceClass, this.mSynthesis);
        try {
            if (!this.mUtteranceClass) return this.error('_probeSynthesis', 'Kein HTML5 SpeechSynthesisUtterance API vorhanden'), 
            -1;
            var t = new this.mUtteranceClass('');
            if (!t) return this.error('_probeSynthesis', 'Kein Utterance erzeugt'), -1;
            if (t.lang = this._getTTSLanguage(), t.voice = this._getTTSVoice(), t.onstart = function() {
                e._clearBreakTimeout();
            }, t.onend = function() {
                e._clearBreakTimeout();
            }, t.onerror = function(t) {
                console.log('TTSHtml5._probeSynthesis: onerror:', t), e._clearBreakTimeout(), t.error;
            }, this.mSynthesis) {
                this._setBreakTimeout();
                try {
                    this.mSynthesis.cancel(), this.mSynthesis.speak(t);
                } catch (t) {}
            }
            return 0;
        } catch (t) {
            return this.exception('_probeSynthesis', t), -1;
        }
    }, H);
    function H(t, e) {
        e = D.call(this, t || E, e = void 0 === e ? !0 : e) || this;
        return e.mSynthesis = null, e.mUtteranceClass = null, e.mUtterance = null, e.mBreakTimeout = 0, 
        e.mSynthesisFactory = i.FactoryManager.get(n.SPEECHSYNTHESIS_FACTORY_NAME, n.SpeechSynthesisFactory), 
        e.mSynthesisFactory.setErrorOutputFunc(e._getErrorOutputFunc()), e;
    }
    var B, x = (k(j, B = x), j.prototype.getClass = function() {
        return 'TTSPort';
    }, j.prototype.done = function() {
        return this.mPort && (this.mPort.removeAllEvent(this.mPortName), this.mPort = null), 
        B.prototype.done.call(this);
    }, j.prototype.setErrorOutput = function(t) {
        B.prototype.setErrorOutput.call(this, t), this.mPort && (t ? this.mPort.setErrorOutputOn() : this.mPort.setErrorOutputOff());
    }, j.prototype.getVoiceList = function() {
        return 'de' === this.getLanguage() || this.getLanguage(), [];
    }, j.prototype._detectSynthesis = function() {
        return this.mPort = r.CloudManager.findPort(this.mCloudPortName), !!this.mPort || (this.error('_detectSynthesis', 'kein Port vorhanden'), 
        !1);
    }, j.prototype._initSynthesis = function(t) {
        var e = this;
        return this.mPort ? this.mPort.isInit() ? this.mPort.isOpen() ? (this.mPort.addStartEvent(this.mPortName, function(t) {
            return e._onSynthesisStart(), 0;
        }), this.mPort.addStopEvent(this.mPortName, function(t) {
            return e._onSynthesisEnd(), 0;
        }), this.mPort.addErrorEvent(this.mPortName, function(t) {
            return e._checkErrorMessage(t.message), e._onSynthesisError({
                error: t.message
            }), 0;
        }), 0) : (this.error('_initSynthesis', 'Port ist nicht geoeffnet'), -1) : (this.error('_initSynthesis', 'Port ist nicht initialisiert'), 
        -1) : (this.error('_initSynthesis', 'kein Port vorhanden'), -1);
    }, j.prototype._checkErrorMessage = function(t) {}, j.prototype._isSynthesis = function() {
        return !!this.mPort && this.mPort.isAction(r.CLOUD_TTS_ACTION);
    }, j.prototype._createSynthesis = function(t) {
        return 0;
    }, j.prototype._startSynthesis = function(t) {
        return this.mPort ? this.mPort.start(this.mPortName, r.CLOUD_TTS_ACTION, {
            text: t,
            language: this._getTTSLanguage(),
            voice: this.getVoice()
        }) : -1;
    }, j.prototype._stopSynthesis = function() {
        return this.mPort ? this.mPort.stop(this.mPortName, r.CLOUD_TTS_ACTION) : -1;
    }, j.prototype._isSynthesisRunning = function() {
        return !!this.mPort && this.mPort.isRunning(this.mPortName, r.CLOUD_TTS_ACTION);
    }, j);
    function j(t, e, n) {
        n = B.call(this, e || "TTSPort", n = void 0 === n ? !0 : n) || this;
        return n.mPort = null, n.mPortName = '', n.mCloudPortName = '', n.mPortName = e, 
        n.mCloudPortName = t, n;
    }
    var z, Y = (k(W, z = x), W.prototype.getClass = function() {
        return 'TTSAmazon';
    }, W.prototype.getVoiceList = function() {
        return 'de' === this.getLanguage() ? [ 'Marlene', 'Hans', 'Vicki' ] : 'en' === this.getLanguage() ? [ 'Ivy', 'Joey', 'Joanna', 'Justin', 'Kendra', 'Matthew', 'Kimberly', 'Salli' ] : [];
    }, W);
    function W(t, e) {
        return z.call(this, r.CLOUD_AMAZON_PORT, t || F, e = void 0 === e ? !0 : e) || this;
    }
    var q, J = (k(Z, q = x), Z.prototype.getClass = function() {
        return 'TTSGoogle';
    }, Z.prototype._checkErrorMessage = function(t) {
        'GoogleTTS2.getAccessTokenFromServer: Failed to fetch' === t && this.setActiveOff();
    }, Z.prototype.getVoiceList = function() {
        return 'de' === this.getLanguage() ? [ 'de-DE-Standard-A', 'de-DE-Standard-B', 'de-DE-Wavenet-A', 'de-DE-Wavenet-B', 'de-DE-Wavenet-C', 'de-DE-Wavenet-D' ] : 'en' === this.getLanguage() ? [ 'en-US-Standard-B', 'en-US-Standard-C', 'en-US-Standard-D', 'en-US-Standard-E', 'en-US-Wavenet-A', 'en-US-Wavenet-B', 'en-US-Wavenet-C', 'en-US-Wavenet-D' ] : [];
    }, Z);
    function Z(t, e) {
        return q.call(this, r.CLOUD_GOOGLE_PORT, t || L, e = void 0 === e ? !0 : e) || this;
    }
    var X, Q = (k($, X = x), $.prototype.getClass = function() {
        return 'TTSMicrosoft';
    }, $.prototype.getVoiceList = function() {
        return 'de' === this.getLanguage() ? [ 'de-DE-Hedda', 'de-DE-HeddaRUS', 'de-DE-Stefan-Apollo' ] : 'en' === this.getLanguage() ? [ 'en-US-BenjaminRUS', 'en-US-JessaRUS', 'en-US-ZiraRUS' ] : [];
    }, $);
    function $(t, e) {
        return X.call(this, r.CLOUD_MICROSOFT_PORT, t || O, e = void 0 === e ? !0 : e) || this;
    }
    var tt, et = (k(nt, tt = x), nt.prototype.getClass = function() {
        return 'TTSNuance';
    }, nt.prototype.setLanguage = function(t) {
        var e = 0;
        switch (t) {
          case 'de':
            this.mSpeakLanguage = 'deu-DEU';
            break;

          case 'en':
            this.mSpeakLanguage = 'eng-USA';
            break;

          default:
            this.error('setLanguage', 'keine gueltige Sprache uebergeben'), e = -1;
        }
        return e;
    }, nt.prototype.getLanguage = function() {
        var t = '';
        switch (this.mSpeakLanguage) {
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
    }, nt.prototype.getVoiceList = function() {
        return 'de' === this.getLanguage() ? [ 'Anna-ML', 'Petra-ML', 'Markus', 'Yannick' ] : 'en' === this.getLanguage() ? [ 'Allison', 'Ava', 'Samantha', 'Susan', 'Zoe', 'Tom' ] : [];
    }, nt);
    function nt(t, e) {
        e = tt.call(this, r.CLOUD_NUANCE_PORT, t || C, e = void 0 === e ? !0 : e) || this;
        return e.mSpeakLanguage = 'deu-DEU', e;
    }
    var it, ot = (k(rt, it = i.PluginGroup), rt.prototype.getType = function() {
        return _;
    }, rt.prototype.getClass = function() {
        return 'TTSGroup';
    }, rt.prototype._insertAllTTS = function() {
        this.mTTSFactory ? (this.insertPlugin(E, this.mTTSFactory.create(E, E, !1)), this.insertPlugin(C, this.mTTSFactory.create(C, C, !1)), 
        this.insertPlugin(F, this.mTTSFactory.create(F, F, !1)), this.insertPlugin(L, this.mTTSFactory.create(L, L, !1)), 
        this.insertPlugin(O, this.mTTSFactory.create(O, O, !1))) : this.error('_insertAllTTS', 'keine TTS-Fabrik vorhanden');
    }, rt.prototype._initTTSHtml5 = function(t) {
        if (this.mTTSHtml5 = this.findPlugin(E), this.mTTSHtml5) {
            if (this.mTTSHtml5.init(t), this.mTTSHtml5.isActive()) return void (this.isErrorOutput() && console.log('TTSGroup._initTTSHtml5: TTS eingefuegt'));
            this.removePlugin(E), this.mTTSHtml5.done(), this.mTTSHtml5 = null;
        }
        this.isErrorOutput() && console.log('TTSGroup._initTTSHtml5: TTS nicht eingefuegt');
    }, rt.prototype._initTTSAmazon = function(t) {
        if (this.mTTSAmazon = this.findPlugin(F), this.mTTSAmazon) {
            if (this.mTTSAmazon.init(t), this.mTTSAmazon.isActive()) return void (this.isErrorOutput() && console.log('TTSGroup._initTTSAmazon: TTS eingefuegt'));
            this.removePlugin(F), this.mTTSAmazon.done(), this.mTTSAmazon = null;
        }
        this.isErrorOutput() && console.log('TTSGroup._initTTSAmazon: TTS nicht eingefuegt');
    }, rt.prototype._initTTSGoogle = function(t) {
        if (this.mTTSGoogle = this.findPlugin(L), this.mTTSGoogle) {
            if (this.mTTSGoogle.init(t), this.mTTSGoogle.isActive()) return void (this.isErrorOutput() && console.log('TTSGroup._initTTSGoogle: TTS eingefuegt'));
            this.removePlugin(L), this.mTTSGoogle.done(), this.mTTSGoogle = null;
        }
        this.isErrorOutput() && console.log('TTSGroup._initTTSGoogle: TTS nicht eingefuegt');
    }, rt.prototype._initTTSMicrosoft = function(t) {
        if (this.mTTSMicrosoft = this.findPlugin(O), this.mTTSMicrosoft) {
            if (this.mTTSMicrosoft.init(t), this.mTTSMicrosoft.isActive()) return void (this.isErrorOutput() && console.log('TTSMicrosoft._initTTSMicrosoft: TTS eingefuegt'));
            this.removePlugin(O), this.mTTSMicrosoft.done(), this.mTTSMicrosoft = null;
        }
        this.isErrorOutput() && console.log('TTSGroup._initTTSMicrosoft: TTS nicht eingefuegt');
    }, rt.prototype._initTTSNuance = function(t) {
        if (this.mTTSNuance = this.findPlugin(C), this.mTTSNuance) {
            if (this.mTTSNuance.init(t), this.mTTSNuance.isActive()) return void (this.isErrorOutput() && console.log('TTSGroup._initTTSNuance: TTS eingefuegt'));
            this.removePlugin(C), this.mTTSNuance.done(), this.mTTSNuance = null;
        }
        this.isErrorOutput() && console.log('TTSGroup._initTTSNuance: TTS nicht eingefuegt');
    }, rt.prototype.init = function(t) {
        if (this.isInit()) return this.error('init', 'init doppelt aufgerufen'), -1;
        if (!this.mTTSFactory) return this.error('init', 'keine TTS-Fabrik vorhanden'), 
        -1;
        var e = t || {};
        return this.isErrorOutput() || (e.errorOutputFlag = !1), this._initTTSHtml5(e), 
        this._initTTSNuance(e), this._initTTSAmazon(e), this._initTTSGoogle(e), this._initTTSMicrosoft(e), 
        0 !== it.prototype.init.call(this, t) ? -1 : (this.mCurrentTTS = this.firstPlugin(), 
        this.mCurrentTTS || (this.isErrorOutput() && console.log('TTSGroup.init: keine TTS verfuegbar'), 
        this.setActiveOff()), t && t.tts && this.setTTS(t.tts), 0);
    }, rt.prototype.done = function() {
        return this.mTTSHtml5 = null, this.mTTSAmazon = null, this.mTTSGoogle = null, this.mTTSMicrosoft = null, 
        this.mTTSNuance = null, this.mCurrentTTS = null, it.prototype.done.call(this);
    }, rt.prototype.isActive = function() {
        return !!this.mCurrentTTS && (!!this.mCurrentTTS.isActive() && it.prototype.isActive.call(this));
    }, rt.prototype.setActiveOn = function() {
        return this.mCurrentTTS && this.mCurrentTTS.isActive() ? it.prototype.setActiveOn.call(this) : -1;
    }, Object.defineProperty(rt.prototype, "onInit", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onInit = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(rt.prototype, "onSpeakStart", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onSpeakStart = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(rt.prototype, "onSpeakStop", {
        set: function(t) {
            for (var e = this.firstPlugin(); e; ) e.onSpeakStop = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(rt.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
            for (var e = this.firstPlugin(); e; ) e.onError = t, e = this.nextPlugin();
        },
        enumerable: !1,
        configurable: !0
    }), rt.prototype.isTTS = function() {
        return !!this.mCurrentTTS;
    }, rt.prototype.setTTS = function(t) {
        var e = null;
        switch (t) {
          case E:
            e = this.mTTSHtml5;
            break;

          case F:
            e = this.mTTSAmazon;
            break;

          case L:
            e = this.mTTSGoogle;
            break;

          case O:
            e = this.mTTSMicrosoft;
            break;

          case C:
            e = this.mTTSNuance;
        }
        return e ? (this.mCurrentTTS = e, 0) : (this.error('setTTS', 'Keine TTS vorhanden'), 
        -1);
    }, rt.prototype.getTTS = function() {
        return this.mCurrentTTS ? this.mCurrentTTS.getName() : '';
    }, rt.prototype.getTTSList = function() {
        return this.getPluginNameList();
    }, rt.prototype.setLanguage = function(t) {
        var e = 0, n = this.firstPlugin();
        if (!n) return this.error('setLanguage', 'Keine TTS vorhanden'), -1;
        for (;n; ) 0 !== n.setLanguage(t) && (e = -1), n = this.nextPlugin();
        return e;
    }, rt.prototype.getLanguage = function() {
        return this.mCurrentTTS ? this.mCurrentTTS.getLanguage() : '';
    }, rt.prototype.getLanguageList = function() {
        return this.mCurrentTTS ? this.mCurrentTTS.getLanguageList() : [];
    }, rt.prototype.setVoice = function(t) {
        return this.mCurrentTTS ? this.mCurrentTTS.setVoice(t) : -1;
    }, rt.prototype.getVoice = function() {
        return this.mCurrentTTS ? this.mCurrentTTS.getVoice() : '';
    }, rt.prototype.getVoiceList = function() {
        return this.mCurrentTTS ? this.mCurrentTTS.getVoiceList() : [];
    }, rt.prototype.isSpeakRunning = function() {
        return !!this.mCurrentTTS && this.mCurrentTTS.isSpeakRunning();
    }, rt.prototype.startSpeak = function(t) {
        return this.mCurrentTTS ? this.isActive() ? this.mCurrentTTS.startSpeak(t) : (this.isErrorOutput() && console.log('TTSGroup.startSpeak: TTS ist nicht aktiv'), 
        0) : (this.error('startSpeak', 'keine TTS vorhanden'), -1);
    }, rt.prototype.getStartSpeakFunc = function() {
        var e = this;
        return function(t) {
            return e.startSpeak(t);
        };
    }, rt.prototype.stopSpeak = function() {
        return this.isActive() ? this.mCurrentTTS.stopSpeak() : (this.isErrorOutput() && console.log('TTSGroup.stopSpeak: TTS ist nicht aktiv'), 
        0);
    }, rt.prototype.getStopSpeakFunc = function() {
        var t = this;
        return function() {
            return t.stopSpeak();
        };
    }, rt);
    function rt(t, e, n) {
        n = it.call(this, e || b, n = void 0 === n ? !0 : n) || this;
        return n.mTTSFactory = null, n.mTTSHtml5 = null, n.mTTSAmazon = null, n.mTTSGoogle = null, 
        n.mTTSMicrosoft = null, n.mTTSNuance = null, n.mCurrentTTS = null, n.mTTSFactory = t, 
        n._insertAllTTS(), n;
    }
    var st, ut = (k(at, st = i.PluginFactory), at.prototype.getType = function() {
        return _;
    }, at.prototype.getName = function() {
        return P;
    }, at.prototype._newPlugin = function(t, e, n) {
        var i = null;
        switch (e) {
          case b:
            i = new ot(this, t, n);
            break;

          case "TTS":
          case E:
            i = new G(t, n);
            break;

          case F:
            i = new Y(t, n);
            break;

          case L:
            i = new J(t, n);
            break;

          case O:
            i = new Q(t, n);
            break;

          case C:
            i = new et(t, n);
            break;

          case v:
            i = new M(v, n);
            break;

          default:
            this.error('_newPlugin', 'keine TTS vorhanden');
        }
        return i;
    }, at.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = (t = void 0 === t ? '' : t) || N, e = (e = void 0 === e ? '' : e) || N;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, at);
    function at() {
        return st.call(this, 'TTSFactory') || this;
    }
    var pt, ht = (k(ct, pt = e.BaseComponent), ct.prototype.getType = function() {
        return g;
    }, ct.prototype.getClass = function() {
        return 'SpeakComponent';
    }, ct.prototype.getVersion = function() {
        return c;
    }, ct.prototype.getApiVersion = function() {
        return S;
    }, ct.prototype.getServerVersion = function() {
        return '';
    }, ct.prototype._setOption = function(t) {
        return t ? ('string' == typeof t.audioFilePath && (this.mAudioFilePath = t.audioFilePath), 
        'boolean' == typeof t.audioFlag && (!0 === t.audioFlag ? this.mAudioFlag = !0 : this.mAudioFlag = !1), 
        t.speakLanguage && this.setLanguage(t.speakLanguage), pt.prototype._setOption.call(this, t)) : -1;
    }, ct.prototype._initAllPlugin = function() {
        return this.mTTSPlugin = this.findPlugin(N), this.mAudioPlayer = this.findPlugin(o.AUDIOPLAYER_PLUGIN_NAME), 
        this.mTTSPlugin && (this.mTTSActiveFlag = this.mTTSPlugin.isActive()), this.mAudioPlayer && (this.mAudioPlayerActiveFlag = this.mAudioPlayer.isActive(), 
        this.mAudioPlayerActiveFlag || (this.mAudioFlag = !1)), 0;
    }, ct.prototype.init = function(t) {
        return pt.prototype.init.call(this, t);
    }, ct.prototype._doneAllPlugin = function() {
        this.mTTSPlugin = null, this.mAudioPlayer = null;
    }, ct.prototype._doneAllEvent = function() {
        this.mAudioUnlockEvent.clear();
    }, ct.prototype._doneAllAttribute = function() {
        this.mTTSActiveFlag = !1, this.mAudioPlayerActiveFlag = !1, this.mTTSFeatureFlag = !1, 
        this.mAudioFeatureFlag = !1, this.mAudioFilePath = f, this.mAudioFileName = '', 
        this.mAudioFlag = !1, this.mSpeakText = '', this.mSpeakStopSelector = '';
    }, ct.prototype._resetAllDefault = function() {
        this.setAudioFormat(o.AUDIO_DEFAULT_FORMAT), this.setLanguage("de"), this.mSpeakStopSelector = '', 
        this.mAudioFilePath = f, this.mAudioFileName = '', this.mAudioFlag = !1, this.mSpeakText = '';
    }, ct.prototype.reset = function(t) {
        return pt.prototype.reset.call(this, t);
    }, ct.prototype.isActive = function() {
        return !(!this.mTTSActiveFlag && !this.mAudioPlayerActiveFlag) && pt.prototype.isActive.call(this);
    }, ct.prototype.setActiveOn = function() {
        return this.mTTSActiveFlag || this.mAudioPlayerActiveFlag ? pt.prototype.setActiveOn.call(this) : -1;
    }, ct.prototype.setFeatureList = function(t) {
        return t.features ? (t.features.TTS && 'boolean' == typeof t.features.TTS && (this.mTTSFeatureFlag = t.features.TTS), 
        t.features.AUDIO && 'boolean' == typeof t.features.AUDIO && (this.mAudioFeatureFlag = t.features.AUDIO), 
        0) : (this.error('setFeatureList', 'keine FeatureInfos uebergeben'), -1);
    }, ct.prototype.setErrorOutput = function(t) {
        pt.prototype.setErrorOutput.call(this, t), this.mAudioUnlockEvent.setErrorOutput(t);
    }, ct.prototype._onAudioUnlock = function(t) {
        return this.mAudioUnlockEvent.dispatch('running' === t ? !0 : !1);
    }, Object.defineProperty(ct.prototype, "onAudioUnlock", {
        get: function() {
            var e = this;
            return function(t) {
                return e._onAudioUnlock(t);
            };
        },
        enumerable: !1,
        configurable: !0
    }), ct.prototype.addEventListener = function(t, e, n) {
        return e === i.SPEECH_SPEAKAUDIOUNLOCK_EVENT ? this.mAudioUnlockEvent.addListener(t, n) : pt.prototype.addEventListener.call(this, t, e, n);
    }, ct.prototype.removeEventListener = function(t, e) {
        return e === i.SPEECH_SPEAKAUDIOUNLOCK_EVENT ? this.mAudioUnlockEvent.removeListener(t) : pt.prototype.removeEventListener.call(this, t, e);
    }, ct.prototype.addAudioUnlockEvent = function(t, e) {
        return this.addEventListener(t, i.SPEECH_SPEAKAUDIOUNLOCK_EVENT, e);
    }, ct.prototype.removeAudioUnlockEvent = function(t) {
        return this.removeEventListener(t, i.SPEECH_SPEAKAUDIOUNLOCK_EVENT);
    }, ct.prototype.removeAllEvent = function(t) {
        var e = pt.prototype.removeAllEvent.call(this, t);
        return e = 0 !== this.removeAudioUnlockEvent(t) ? -1 : e;
    }, ct.prototype.unlockAudio = function() {
        return this.mAudioPlayer ? (this.mAudioPlayer.unlockAudio(), 0) : -1;
    }, ct.prototype.isUnlockAudio = function() {
        return !!this.mAudioPlayer && this.mAudioPlayer.isUnlockAudio();
    }, ct.prototype.isAudio = function() {
        return !!this.mAudioPlayerActiveFlag && this.mAudioFlag;
    }, ct.prototype.setAudioOn = function() {
        return this.mAudioPlayerActiveFlag ? (this.mAudioFlag = !0, 0) : -1;
    }, ct.prototype.setAudioOff = function() {
        return this.mAudioFlag = !1, 0;
    }, ct.prototype.getAudioContext = function() {
        return this.mAudioPlayer ? this.mAudioPlayer.getAudioContext() : null;
    }, ct.prototype.setAudioFormat = function(t) {
        return this.mAudioPlayer ? this.mAudioPlayer.setAudioFormat(t) : -1;
    }, ct.prototype.getAudioFormat = function() {
        return this.mAudioPlayer ? this.mAudioPlayer.getAudioFormat() : '';
    }, ct.prototype.setAudioFilePath = function(t) {
        return this.mAudioFilePath = t, 0;
    }, ct.prototype.getAudioFilePath = function() {
        return this.mAudioFilePath;
    }, ct.prototype.setAudioFileName = function(t) {
        return this.mAudioFileName = t, 0;
    }, ct.prototype.getAudioFileName = function() {
        return this.mAudioFileName;
    }, ct.prototype.isTTS = function() {
        return !(!this.mTTSPlugin || !this.mTTSPlugin.isTTS());
    }, ct.prototype.setTTS = function(t) {
        return this.mTTSPlugin ? this.mTTSPlugin.setTTS(t) : -1;
    }, ct.prototype.getTTS = function() {
        return this.mTTSPlugin ? this.mTTSPlugin.getTTS() : '';
    }, ct.prototype.getTTSList = function() {
        return this.mTTSPlugin ? this.mTTSPlugin.getTTSList() : [];
    }, ct.prototype.setLanguage = function(t) {
        return this.mTTSPlugin ? this.mTTSPlugin.setLanguage(t) : -1;
    }, ct.prototype.getLanguage = function() {
        return this.mTTSPlugin ? this.mTTSPlugin.getLanguage() : "";
    }, ct.prototype.getLanguageList = function() {
        return this.mTTSPlugin ? this.mTTSPlugin.getLanguageList() : [];
    }, ct.prototype.setVoice = function(t) {
        return this.mTTSPlugin ? this.mTTSPlugin.setVoice(t) : -1;
    }, ct.prototype.getVoice = function() {
        return this.mTTSPlugin ? this.mTTSPlugin.getVoice() : "";
    }, ct.prototype.getVoiceList = function() {
        return this.mTTSPlugin ? this.mTTSPlugin.getVoiceList() : [];
    }, ct.prototype.setText = function(t) {
        return this.mSpeakText = t, 0;
    }, ct.prototype.getText = function() {
        return this.mSpeakText;
    }, ct.prototype.isRunning = function() {
        return !!this.isActive() && (this.mAudioFlag ? !!this.mAudioPlayer && (this.mAudioPlayer.isPlay() || this.mAudioPlayer.isLoad()) : !!this.mTTSPlugin && this.mTTSPlugin.isSpeakRunning());
    }, ct.prototype.start = function() {
        return console.log('SpeakComponent.start: TTS = ', this.getTTS(), ' Sprache = ', this.getLanguage(), ' Stimme = ', this.getVoice()), 
        this.isActive() ? this.isRunning() ? (this.error('start', 'Sprachausgabe laeuft bereits'), 
        -1) : this.mAudioFlag ? (this.unlockAudio(), this._startSpeakAudio()) : this.isTTS() ? this._startSpeakTTS() : (this.error('start', 'keine TTS vorhanden'), 
        -1) : (console.log('SpeakComponent.start: Komponente ist nicht aktiv'), 0);
    }, ct.prototype._startSpeakAudio = function() {
        return this.mSpeakStopSelector = '', this.mAudioFeatureFlag ? 0 : this.mAudioPlayer ? this.mAudioFileName ? (this.mSpeakStopSelector = "audio", 
        this.mAudioPlayer.play(this.mAudioFilePath, this.mAudioFileName)) : (this.error('_startSpeakAudio', 'kein Audiodateiname fuer die Sprachausgabe vorhanden'), 
        -1) : (this.error('_startSpeakAudio', 'kein AudioPlayer vorhanden'), -1);
    }, ct.prototype._startSpeakTTS = function() {
        return console.log('SpeakComponent._startSpeakTTS'), this.mSpeakStopSelector = '', 
        this.mTTSFeatureFlag ? 0 : this.mTTSPlugin ? (this.mSpeakStopSelector = "tts", this.mTTSPlugin.startSpeak(this.mSpeakText)) : (this.error('_startSpeakTTS', 'kein TTSPlugin vorhanden'), 
        -1);
    }, ct.prototype.stop = function() {
        return this.isRunning() ? this.mSpeakStopSelector ? "audio" === this.mSpeakStopSelector ? (this.mSpeakStopSelector = '', 
        this.mAudioPlayer ? this.mAudioPlayer.stop() : (this.error('stop', 'kein AudioPlayer vorhanden'), 
        -1)) : "tts" === this.mSpeakStopSelector ? (this.mSpeakStopSelector = '', this.mTTSPlugin ? this.mTTSPlugin.stopSpeak() : (this.error('stop', 'kein TTSPlugin vorhanden'), 
        -1)) : (this.error('stop', 'kein gueltiger StopSelector vorhanden'), -1) : (this.error('stop', 'kein StopSelector vorhanden'), 
        -1) : (this.mSpeakStopSelector = '', 0);
    }, ct);
    function ct(t, e) {
        e = pt.call(this, (t = void 0 === t ? '' : t) || m, e = void 0 === e ? !0 : e) || this;
        return e.mTTSPlugin = null, e.mAudioPlayer = null, e.mAudioUnlockEvent = new i.EventFunctionList(i.SPEECH_SPEAKAUDIOUNLOCK_EVENT, m), 
        e.mTTSActiveFlag = !1, e.mAudioPlayerActiveFlag = !1, e.mTTSFeatureFlag = !1, e.mAudioFeatureFlag = !1, 
        e.mAudioFilePath = f, e.mAudioFileName = '', e.mAudioFlag = !1, e.mSpeakText = '', 
        e.mSpeakStopSelector = '', e.mAudioUnlockEvent.setErrorOutputFunc(e._getErrorOutputFunc()), 
        e;
    }
    var St, lt = (k(gt, St = i.PluginFactory), gt.prototype.getType = function() {
        return g;
    }, gt.prototype.getName = function() {
        return l;
    }, gt.prototype._newPlugin = function(t, e, n) {
        return new ht(t, n);
    }, gt.prototype.create = function(t, e, n) {
        void 0 === n && (n = !0);
        t = (t = void 0 === t ? '' : t) || m, e = (e = void 0 === e ? '' : e) || m;
        try {
            return this._newPlugin(t, e, n);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, gt);
    function gt() {
        return St.call(this, 'SpeakComponentFactory') || this;
    }
    var mt, Tt = (k(yt, mt = i.Builder), yt.prototype.getType = function() {
        return g;
    }, yt.prototype.getClass = function() {
        return 'SpeakComponentBuilder';
    }, yt.prototype.build = function(t) {
        var e = this._getComponentName(t) || m;
        if (e = this._findComponent(e)) return e;
        try {
            var e = this._buildComponent(t), n = this._getPlugin(N, N, P, ut), i = this._getPlugin(o.AUDIOPLAYER_PLUGIN_NAME, o.AUDIOPLAYER_PLUGIN_NAME, o.AUDIOPLAYER_FACTORY_NAME, o.AudioPlayerFactory);
            return 0 !== this._binder(e, n, i) ? (this.error('build', 'Komponenten nicht verbunden'), 
            null) : e;
        } catch (t) {
            return this.exception('build', t), null;
        }
    }, yt.prototype._buildComponent = function(t) {
        var e = this._getComponentName(t) || m, t = this._getComponentClass(t) || m;
        return this._getPlugin(e, t, l, lt);
    }, yt.prototype._binder = function(t, e, n) {
        return t ? e ? n ? 0 !== t.insertPlugin(e.getName(), e) ? (this.error('_binder', 'TTS-Plugin wurde nicht eingefuegt'), 
        -1) : 0 !== t.insertPlugin(n.getName(), n) ? (this.error('_binder', 'AudioPlayer-Plugin wurde nicht eingefuegt'), 
        -1) : (e.onInit = t.onInit, e.onSpeakStart = t.onStart, e.onSpeakStop = t.onStop, 
        e.onError = t.onError, n.onAudioStart = t.onStart, n.onAudioStop = t.onStop, n.onAudioUnlock = t.onAudioUnlock, 
        n.onError = t.onError, 0) : (this.error('_binder', 'Kein AudioPlayer-Plugin vorhanden'), 
        -1) : (this.error('_binder', 'Kein TTS-Plugin vorhanden'), -1) : (this.error('_binder', 'Keine Speak-Komponente vorhanden'), 
        -1);
    }, yt);
    function yt(t, e) {
        return mt.call(this, t || g, e = void 0 === e ? !0 : e) || this;
    }
    var ft, dt = (k(kt, ft = e.BaseMobile), kt.prototype._initEvent = function() {
        this.mInitEventFlag && (this.mInitEventCount--, 0 === this.mInitEventCount && (this.mInitEventFlag = !1, 
        this._onInit()));
    }, kt.prototype._init = function(t) {
        var e = this;
        return console.log('Speak.init:', t), t && 'boolean' == typeof t.errorOutputFlag && this.setErrorOutputFlag(t.errorOutputFlag), 
        window.cordova ? window.SpeakPlugin ? (console.log('SpeakPlugin-Objekt:', window.SpeakPlugin), 
        this.mPlugin = window.SpeakPlugin, this.mPlugin.onInit = function(t) {
            console.log('===> Event Speak.onInit ', t), 0 == t ? (e.mInitEventFlag = !0, e.mPlugin.getTTSList(), 
            e.mPlugin.getTTS(), e.mPlugin.getLanguageList(), e.mPlugin.getLanguage(), e.mPlugin.getVoiceList(), 
            e.mPlugin.getVoice()) : e._onError(new Error('faild init'));
        }, this.mPlugin.onStart = function(t) {
            console.log('===> Event Speak.onStart ', t), e.mRunningFlag = !0, e._onStart();
        }, this.mPlugin.onStop = function() {
            console.log('===> Event Speak.onStop'), e.mRunningFlag = !1, e._onStop();
        }, this.mPlugin.onTTSChanged = function(t) {
            console.log('===> Event Speak.onTTSChanged ', t), e.mTTS = t, e._initEvent();
        }, this.mPlugin.onTTSList = function(t) {
            console.log('===> Event Speak.onTTSList ', t), e.mTTSList = t, e._initEvent();
        }, this.mPlugin.onLanguageChanged = function(t) {
            console.log('===> Event Speak.onLanguageChanged ', t), e.mLanguage = t, e._initEvent();
        }, this.mPlugin.onLanguageList = function(t) {
            console.log('===> Event Speak.onLanguageList ', t), e.mLanguageList = t, e._initEvent();
        }, this.mPlugin.onVoiceChanged = function(t) {
            console.log('===> Event Speak.onVoiceChanged ', t), e.mVoice = t, e._initEvent();
        }, this.mPlugin.onVoiceList = function(t) {
            console.log('===> Event Speak.onVoiceList ', t), e.mVoiceList = t, e._initEvent();
        }, this.mPlugin.onError = function(t) {
            console.log('===> Event Speak.onError ', t), e.mRunningFlag = !1, e._onError(t);
        }, console.log('SpeakPlugin:', this.mPlugin), this.mPlugin.init(), 0) : (console.log('Speak: kein SpeakPlugin von Cordova vorhanden'), 
        -1) : (console.log('Speak: kein Cordova vorhanden'), -1);
    }, kt.prototype.addAudioUnlockEvent = function(t, e) {
        return 0;
    }, kt.prototype.removeAudioUnlockEvent = function(t) {
        return 0;
    }, kt.prototype.unlockAudio = function() {
        return 0;
    }, kt.prototype.isUnlockAudio = function() {
        return !1;
    }, kt.prototype.isAudio = function() {
        return !1;
    }, kt.prototype.setAudioOn = function() {
        return 0;
    }, kt.prototype.setAudioOff = function() {
        return 0;
    }, kt.prototype.setAudioFormat = function(t) {
        return 0;
    }, kt.prototype.getAudioFormat = function() {
        return '';
    }, kt.prototype.getAudioContext = function() {
        return null;
    }, kt.prototype.setAudioFilePath = function(t) {
        return 0;
    }, kt.prototype.getAudioFilePath = function() {
        return '';
    }, kt.prototype.setAudioFileName = function(t) {
        return 0;
    }, kt.prototype.getAudioFileName = function() {
        return '';
    }, kt.prototype.isTTS = function() {
        return !!this.mTTS;
    }, kt.prototype.setTTS = function(t) {
        return this.mPlugin ? (this.mPlugin.setTTS(t), 0) : (console.log('Error Speak.setTTS: kein Speak-Plugin vorhanden'), 
        -1);
    }, kt.prototype.getTTS = function() {
        return this.mTTS;
    }, kt.prototype.getTTSList = function() {
        return this.mTTSList;
    }, kt.prototype.setLanguage = function(t) {
        return this.mPlugin ? (this.mPlugin.setLanguage(t), 0) : (console.log('Error Speak.setLanguage: kein Speak-Plugin vorhanden'), 
        -1);
    }, kt.prototype.getLanguage = function() {
        return this.mLanguage;
    }, kt.prototype.getLanguageList = function() {
        return this.mLanguageList;
    }, kt.prototype.setVoice = function(t) {
        return this.mPlugin ? (this.mPlugin.setVoice(t), 0) : (console.log('Error Speak.setVoice: kein Speak-Plugin vorhanden'), 
        -1);
    }, kt.prototype.getVoice = function() {
        return this.mVoice;
    }, kt.prototype.getVoiceList = function() {
        return this.mVoiceList;
    }, kt.prototype.setText = function(t) {
        return this.mSpeakText = t, 0;
    }, kt.prototype.getText = function() {
        return this.mSpeakText;
    }, kt.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, kt.prototype.start = function() {
        return this.mPlugin ? (this.mPlugin.start(this.mSpeakText), 0) : (console.log('Error Speak.start: kein Speak-Plugin vorhanden'), 
        -1);
    }, kt.prototype.stop = function() {
        return this.mPlugin ? (this.mPlugin.stop(), 0) : (console.log('Error Speak.stop: kein Speak-Plugin vorhanden'), 
        -1);
    }, kt);
    function kt(t) {
        t = ft.call(this, 'SpeakMobile', t) || this;
        return t.mTTS = '', t.mTTSList = new Array(0), t.mLanguage = '', t.mLanguageList = new Array(0), 
        t.mVoice = '', t.mVoiceList = new Array(0), t.mSpeakText = '', t.mRunningFlag = !1, 
        t.mInitEventFlag = !1, t.mInitEventCount = 6, t;
    }
    var At, Pt = (k(_t, At = e.Base), _t.prototype._getBuilderName = function() {
        return g;
    }, _t.prototype.addAudioUnlockEvent = function(t, e) {
        return this.mSpeakComponent.addAudioUnlockEvent(t, e);
    }, _t.prototype.removeAudioUnlockEvent = function(t) {
        return this.mSpeakComponent.removeAudioUnlockEvent(t);
    }, _t.prototype.unlockAudio = function() {
        return this.mSpeakComponent.unlockAudio();
    }, _t.prototype.isUnlockAudio = function() {
        return this.mSpeakComponent.isUnlockAudio();
    }, _t.prototype.isAudio = function() {
        return this.mSpeakComponent.isAudio();
    }, _t.prototype.setAudioOn = function() {
        return this.mSpeakComponent.setAudioOn();
    }, _t.prototype.setAudioOff = function() {
        return this.mSpeakComponent.setAudioOff();
    }, _t.prototype.setAudioFormat = function(t) {
        return this.mSpeakComponent.setAudioFormat(t);
    }, _t.prototype.getAudioFormat = function() {
        return this.mSpeakComponent.getAudioFormat();
    }, _t.prototype.getAudioContext = function() {
        return this.mSpeakComponent.getAudioContext();
    }, _t.prototype.setAudioFilePath = function(t) {
        return this.mSpeakComponent.setAudioFilePath(t);
    }, _t.prototype.getAudioFilePath = function() {
        return this.mSpeakComponent.getAudioFilePath();
    }, _t.prototype.setAudioFileName = function(t) {
        return this.mSpeakComponent.setAudioFileName(t);
    }, _t.prototype.getAudioFileName = function() {
        return this.mSpeakComponent.getAudioFileName();
    }, _t.prototype.isTTS = function() {
        return this.mSpeakComponent.isTTS();
    }, _t.prototype.setTTS = function(t) {
        return this.mSpeakComponent.setTTS(t);
    }, _t.prototype.getTTS = function() {
        return this.mSpeakComponent.getTTS();
    }, _t.prototype.getTTSList = function() {
        return this.mSpeakComponent.getTTSList();
    }, _t.prototype.setLanguage = function(t) {
        return this.mSpeakComponent.setLanguage(t);
    }, _t.prototype.getLanguage = function() {
        return this.mSpeakComponent.getLanguage();
    }, _t.prototype.getLanguageList = function() {
        return this.mSpeakComponent.getLanguageList();
    }, _t.prototype.setVoice = function(t) {
        return this.mSpeakComponent.setVoice(t);
    }, _t.prototype.getVoice = function() {
        return this.mSpeakComponent.getVoice();
    }, _t.prototype.getVoiceList = function() {
        return this.mSpeakComponent.getVoiceList();
    }, _t.prototype.setText = function(t) {
        return this.mSpeakComponent.setText(t);
    }, _t.prototype.getText = function() {
        return this.mSpeakComponent.getText();
    }, _t);
    function _t(t) {
        t = At.call(this, t) || this;
        return t.mSpeakComponent = t.mComponent, t;
    }
    var vt = (Et.create = function(t, e) {
        try {
            if (window.cordova && window.SpeakPlugin) return console.log('SpeakFactory: mobiles Plugin:', window.SpeakPlugin), 
            new dt(e);
        } catch (t) {
            console.log('===> EXCEPTION SpeakFactory.create: mobile Exception', t.message);
        }
        try {
            return i.SystemManager.findBuilder(g) || 0 === i.SystemManager.insertBuilder(g, new Tt('', !1)) ? new Pt(e) : (console.log('SpeakFactory.create: kein Builder eingetragen'), 
            null);
        } catch (t) {
            return console.log('===> EXCEPTION SpeakFactory.create: web Exception', t.message), 
            null;
        }
    }, Et);
    function Et() {}
    var Ft, x = {
        activeFlag: !0,
        speakLanguage: 'de',
        audioFormat: 'mp3',
        audioFilePath: 'assets/',
        audioFlag: !1,
        errorOutputFlag: !1
    }, e = (k(Lt, Ft = s.Service), Lt.isConstructorInit = function() {
        return Lt.constructorInitFlag;
    }, Lt.setConstructorInitOn = function() {
        Lt.constructorInitFlag = !0;
    }, Lt.setConstructorInitOff = function() {
        Lt.constructorInitFlag = !1;
    }, Lt.getConfig = function() {
        return Lt.speakServiceConfig;
    }, Lt.prototype._setOption = function(t) {
        return 0 !== Ft.prototype._setOption.call(this, t) ? -1 : ('string' == typeof t.speakLanguage && (this.language = t.speakLanguage), 
        'string' == typeof t.audioFormat && (this.format = t.audioFormat), 'string' == typeof t.audioFilePath && (this.path = t.audioFilePath), 
        'boolean' == typeof t.audioFlag && (this.audio = t.audioFlag), 0);
    }, Lt.prototype._createComponent = function(t, e) {
        return this.mSpeak = vt.create(t, e), this.mSpeak;
    }, Lt.prototype.init = function(t) {
        return Ft.prototype.init.call(this, t);
    }, Lt.prototype.reset = function(t) {
        return Ft.prototype.reset.call(this, t);
    }, Lt.prototype._addAllEvent = function(t) {
        var e = this;
        return 0 !== Ft.prototype._addAllEvent.call(this, t) ? -1 : (this.mSpeak.addAudioUnlockEvent(t, function(t) {
            return e.mSpeakAudioUnlockEvent.emit(t), 0;
        }), 0);
    }, Object.defineProperty(Lt.prototype, "audioUnlockEvent", {
        get: function() {
            return this.mSpeakAudioUnlockEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.unlockAudio = function() {
        return this.mSpeak ? this.mSpeak.unlockAudio() : (this._error('unlockAudio', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.isUnlockAudio = function() {
        return this.mSpeak ? this.mSpeak.isUnlockAudio() : (this._error('isUnlockAudio', 'keine Speak-Komponente vorhanden'), 
        !1);
    }, Lt.prototype.isAudio = function() {
        return this.mSpeak ? this.mSpeak.isAudio() : (this._error('isAudio', 'keine Speak-Komponente vorhanden'), 
        !1);
    }, Lt.prototype.setAudioOn = function() {
        return this.mSpeak ? this.mSpeak.setAudioOn() : (this._error('setAudioOn', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.setAudioOff = function() {
        return this.mSpeak ? this.mSpeak.setAudioOff() : (this._error('setAudioOff', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Object.defineProperty(Lt.prototype, "audio", {
        get: function() {
            return this.isAudio();
        },
        set: function(t) {
            t ? this.setAudioOn() : this.setAudioOff();
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.setAudioFormat = function(t) {
        return this.mSpeak ? this.mSpeak.setAudioFormat(t) : (this._error('setAudioFormat', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getAudioFormat = function() {
        return this.mSpeak ? this.mSpeak.getAudioFormat() : (this._error('getAudioFormat', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "format", {
        get: function() {
            return this.getAudioFormat();
        },
        set: function(t) {
            this.setAudioFormat(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.setAudioFilePath = function(t) {
        return this.mSpeak ? this.mSpeak.setAudioFilePath(t) : (this._error('setAudioFilePath', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getAudioFilePath = function() {
        return this.mSpeak ? this.mSpeak.getAudioFilePath() : (this._error('getAudioFilePath', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "path", {
        get: function() {
            return this.getAudioFilePath();
        },
        set: function(t) {
            this.setAudioFilePath(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.setAudioFileName = function(t) {
        return this.mSpeak ? this.mSpeak.setAudioFileName(t) : (this._error('setAudioFileName', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getAudioFileName = function() {
        return this.mSpeak ? this.mSpeak.getAudioFileName() : (this._error('getAudioFileName', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "file", {
        get: function() {
            return this.getAudioFileName();
        },
        set: function(t) {
            this.setAudioFileName(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.isTTS = function() {
        return !!this.mSpeak && this.mSpeak.isTTS();
    }, Lt.prototype.setTTS = function(t) {
        return this.mSpeak ? this.mSpeak.setTTS(t) : (this._error('setTTS', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getTTS = function() {
        return this.mSpeak ? this.mSpeak.getTTS() : (this._error('getTTS', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "tts", {
        get: function() {
            return this.getTTS();
        },
        set: function(t) {
            this.setTTS(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.getTTSList = function() {
        return this.mSpeak ? this.mSpeak.getTTSList() : (this._error('getTTSList', 'keine Speak-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(Lt.prototype, "ttses", {
        get: function() {
            return this.getTTSList();
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.setLanguage = function(t) {
        return this.mSpeak ? this.mSpeak.setLanguage(t) : (this._error('setLanguage', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getLanguage = function() {
        return this.mSpeak ? this.mSpeak.getLanguage() : (this._error('getLanguage', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "language", {
        get: function() {
            return this.getLanguage();
        },
        set: function(t) {
            this.setLanguage(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.getLanguageList = function() {
        return this.mSpeak ? this.mSpeak.getLanguageList() : (this._error('getLanguageList', 'keine Speak-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(Lt.prototype, "languages", {
        get: function() {
            return this.getLanguageList();
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.setVoice = function(t) {
        return this.mSpeak ? this.mSpeak.setVoice(t) : (this._error('setVoice', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getVoice = function() {
        return this.mSpeak ? this.mSpeak.getVoice() : (this._error('getVoice', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "voice", {
        get: function() {
            return this.getVoice();
        },
        set: function(t) {
            this.setVoice(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.getVoiceList = function() {
        return this.mSpeak ? this.mSpeak.getVoiceList() : (this._error('getVoiceList', 'keine Speak-Komponente vorhanden'), 
        []);
    }, Object.defineProperty(Lt.prototype, "voices", {
        get: function() {
            return this.getVoiceList();
        },
        enumerable: !1,
        configurable: !0
    }), Lt.prototype.setText = function(t) {
        return this.mSpeak ? this.mSpeak.setText(t) : (this._error('setText', 'keine Speak-Komponente vorhanden'), 
        -1);
    }, Lt.prototype.getText = function() {
        return this.mSpeak ? this.mSpeak.getText() : (this._error('getText', 'keine Speak-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(Lt.prototype, "text", {
        get: function() {
            return this.getText();
        },
        set: function(t) {
            this.setText(t);
        },
        enumerable: !1,
        configurable: !0
    }), Lt.speakServiceConfig = x, Lt.constructorInitFlag = !0, Lt);
    function Lt() {
        var t = Ft.call(this, m, T, S) || this;
        if (t.mSpeak = null, t.mSpeakAudioUnlockEvent = new s.EventEmitter(y), Lt.isConstructorInit() && 0 !== t.init(Lt.getConfig())) throw new Error('Speak nicht initialisiert');
        return 0 !== s.ServiceManager.insert(t) && console.log('SpeakService: wurde nicht in ServiceManager eingetragen'), 
        t;
    }
    t.SPEAK_AMAZON_TTS = 'TTSAmazon', t.SPEAK_API_VERSION = S, t.SPEAK_ASYNC_EVENT = y, 
    t.SPEAK_AUDIOFILE_PATH = f, t.SPEAK_AUDIO_FLAG = !1, t.SPEAK_COMPONENTBUILDER_NAME = 'SpeakComponentBuilder', 
    t.SPEAK_COMPONENTFACTORY_NAME = l, t.SPEAK_COMPONENT_NAME = m, t.SPEAK_DEFAULT_LANGUAGE = "de", 
    t.SPEAK_DE_LANGUAGE = "de", t.SPEAK_EN_LANGUAGE = 'en', t.SPEAK_GOOGLE_TTS = 'TTSGoogle', 
    t.SPEAK_HTML5_TTS = 'TTSHtml5', t.SPEAK_MICROSOFT_TTS = 'TTSMicrosoft', t.SPEAK_MOCK_NAME = 'SpeakMock', 
    t.SPEAK_MP3_AUDIOFORMAT = 'mp3', t.SPEAK_NUANCE_TTS = 'TTSNuance', t.SPEAK_SERVICEMOCK_NAME = 'SpeakServiceMock', 
    t.SPEAK_SERVICE_NAME = T, t.SPEAK_TYPE_NAME = g, t.SPEAK_UNDEFINE_LANGUAGE = "", 
    t.SPEAK_UNDEFINE_VOICE = "", t.SPEAK_VERSION_BUILD = a, t.SPEAK_VERSION_DATE = h, 
    t.SPEAK_VERSION_NUMBER = u, t.SPEAK_VERSION_STRING = c, t.SPEAK_VERSION_TYPE = p, 
    t.SPEAK_WAV_AUDIOFORMAT = 'wav', t.Speak = Pt, t.SpeakComponent = ht, t.SpeakComponentBuilder = Tt, 
    t.SpeakComponentFactory = lt, t.SpeakFactory = vt, t.SpeakMobile = dt, t.SpeakService = e, 
    t.SpeakServiceConfig = x, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
