/**
 * Speech-Audio Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core'), require('@speech/common')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechAudio = {}, t.speechCore, t.speechCommon);
}(this, function(t, o, u) {
    'use strict';
    var i = function(t, e) {
        return (i = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        })(t, e);
    };
    function e(t, e) {
        function o() {
            this.constructor = t;
        }
        i(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
        new o());
    }
    var n, r = 'AudioPlayerFactory', s = 'AudioPlayer', a = 'mp3', l = 'wav', c = a, h = 16e3, d = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ], p = (e(f, n = o.ErrorBase), 
    f.prototype._findCodec = function(t, e) {
        for (var o = 0; o < e.length; o++) if (t === e[o]) return !0;
        return !1;
    }, f.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, d);
    }, f.prototype._float32ToInt16 = function(t) {
        return Math.max(-32768, Math.min(32768, t < 0 ? 32768 * t : 32767 * t));
    }, f.prototype._float32ArrayToInt16Array = function(t) {
        for (var e = new Int16Array(t.length), o = 0; o < t.length; ) e[o] = this._float32ToInt16(t[o++]);
        return e;
    }, f.prototype.encodePCM = function(t, e) {
        return this.findPcmCodec(e) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, f.prototype.decodePCM = function(t) {
        try {
            for (var e = new Int16Array(t), o = e.length, i = new Float32Array(o), n = 0; n < o; ++n) i[n] = e[n] / 32768;
            return i;
        } catch (t) {
            return this.exception('decodePCM', t), [];
        }
    }, f);
    function f() {
        return n.call(this, 'NavigationAudioCodec') || this;
    }
    var A = (m.prototype.initialize = function() {
        if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error('Invalid settings specified for the resampler.');
        this.fromSampleRate === this.toSampleRate ? (this.resampler = this.bypassResampler, 
        this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, 
        this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, 
        this.lastWeight = 0, this.initializeBuffers());
    }, m.prototype.compileInterpolationFunction = function() {
        for (var t = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);        if ((bufferLength % ' + this.channels + ') == 0) {            if (bufferLength > 0) {                var ratioWeight = this.ratioWeight;                var weight = 0;', e = 0; e < this.channels; ++e) t += 'var output' + e + ' = 0;';
        t += 'var actualPosition = 0;                var amountToNext = 0;                var alreadyProcessedTail = !this.tailExists;                this.tailExists = false;                var outputBuffer = this.outputBuffer;                var outputOffset = 0;                var currentPosition = 0;                do {                    if (alreadyProcessedTail) {                        weight = ratioWeight;';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' = 0;';
        t += '}                    else {                        weight = this.lastWeight;';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' = this.lastOutput[' + e + '];';
        t += 'alreadyProcessedTail = true;                    }                    while (weight > 0 && actualPosition < bufferLength) {                        amountToNext = 1 + actualPosition - currentPosition;                        if (weight >= amountToNext) {';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' += buffer[actualPosition++] * amountToNext;';
        t += 'currentPosition = actualPosition;                            weight -= amountToNext;                        }                        else {';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' += buffer[actualPosition' + (0 < e ? ' + ' + e : '') + '] * weight;';
        t += 'currentPosition += weight;                            weight = 0;                            break;                        }                    }                    if (weight == 0) {';
        for (e = 0; e < this.channels; ++e) t += 'outputBuffer[outputOffset++] = output' + e + ' / ratioWeight;';
        t += '}                    else {                        this.lastWeight = weight;';
        for (e = 0; e < this.channels; ++e) t += 'this.lastOutput[' + e + '] = output' + e + ';';
        t += 'this.tailExists = true;                        break;                    }                } while (actualPosition < bufferLength);                return this.bufferSlice(outputOffset);            }            else {                return (this.noReturn) ? 0 : [];            }        }        else {            throw(new Error("Buffer was of incorrect sample length."));        }', 
        this.interpolate = Function('buffer', t);
    }, m.prototype.bypassResampler = function(t) {
        return this.noReturn ? (this.outputBuffer = t).length : t;
    }, m.prototype.bufferSlice = function(e) {
        if (this.noReturn) return e;
        try {
            return this.outputBuffer.subarray(0, e);
        } catch (t) {
            try {
                return this.outputBuffer.length = e, this.outputBuffer;
            } catch (t) {
                return this.outputBuffer.slice(0, e);
            }
        }
    }, m.prototype.initializeBuffers = function(t) {
        try {
            this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
        } catch (t) {
            this.outputBuffer = [], this.lastOutput = [];
        }
    }, m);
    function m(t, e, o, i, n) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = e, this.channels = o || 0, this.outputBufferSize = i, this.noReturn = !!n, 
        this.initialize();
    }
    var y, g = (e(_, y = o.Plugin), _.prototype.getType = function() {
        return 'AudioPlayer';
    }, _.prototype.getClass = function() {
        return 'AudioPlayer';
    }, _.prototype._detectAudioContext = function() {
        var t = o.FactoryManager.get(u.AUDIOCONTEXT_FACTORY_NAME, u.AudioContextFactory);
        return t ? (this.mAudioContextClass = t.create(), null !== this.mAudioContextClass || (this.error('_detectAudioContext', 'kein AudioContext vorhanden'), 
        !1)) : (this.error('_detectAudioContext', 'keine AudioContext-Fabrik vorhanden'), 
        !1);
    }, _.prototype._detectXMLHttpRequest = function() {
        var t = o.FactoryManager.get(u.XMLHTTPREQUEST_FACTORY_NAME, u.XMLHttpRequestFactory);
        return t ? (this.mXMLHttpRequestClass = t.create(), null !== this.mXMLHttpRequestClass || (this.error('_detectXMLHttpRequest', 'kein XMLHttpRequest vorhanden'), 
        !1)) : (this.error('_detectXMLHttpRequest', 'keine XMLHttpRequest-Fabrik vorhanden'), 
        !1);
    }, _.prototype.init = function(t) {
        var e, o, i, n, r = this;
        if (this.isInit()) return this.error('init', 'init doppelt aufgerufen'), -1;
        if (0 !== y.prototype.init.call(this, t)) return -1;
        if (!this._detectXMLHttpRequest()) return this.setActiveOff(), 0;
        if (t && t.audioFormat && this.setAudioFormat(t.audioFormat), t && t.audioContext) this.mAudioContext = t.audioContext; else {
            if (!this._detectAudioContext()) return this.setActiveOff(), 0;
            try {
                if (!this.mAudioContextClass) return y.prototype._clearInit.call(this), -1;
                if (this.mAudioContext = u.AudioContextManager.getAudioContext(), !this.mAudioContext) return y.prototype._clearInit.call(this), 
                -1;
                this.mAudioContext.onstatechange = function() {
                    r.mAudioContext;
                };
            } catch (t) {
                return this._closeAudioContext(), this.exception('init', t), y.prototype._clearInit.call(this), 
                -1;
            }
        }
        try {
            this.mAudioContext && (e = [ 'touchstart', 'touchend', 'mousedown', 'keydown' ], 
            o = document.body, i = function() {
                'suspended' === r.mAudioContext.state || 'interrupted' === r.mAudioContext.state ? r.mAudioContext.resume().then(n) : n();
            }, n = function() {
                e.forEach(function(t) {
                    return o.removeEventListener(t, i);
                });
            }, e.forEach(function(t) {
                return o.addEventListener(t, i, !1);
            }), this.mAudioContext.onstatechange = function() {
                r._onAudioUnlock();
            });
        } catch (t) {
            this.exception('init', t);
        }
        return 0;
    }, _.prototype.done = function() {
        return this.isInit() && this.stop(), this._closeAudioContext(), this.mAudioContext = null, 
        this.mAudioContextClass = null, this.mAudioFormat = c, this.mXMLHttpRequestClass = null, 
        this.mRequest = null, this.mSource = null, this.mAudioBuffer = null, this.mAudioContext = null, 
        this.mAudioLoadFlag = !1, this.mAudioPlayFlag = !1, this.mAudioCancelFlag = !1, 
        this.mOnAudioStartFunc = null, this.mOnAudioStopFunc = null, this.mOnAudioUnlockFunc = null, 
        y.prototype.done.call(this);
    }, _.prototype.isActive = function() {
        return !!this.mAudioContext && y.prototype.isActive.call(this);
    }, _.prototype.setActiveOn = function() {
        return this.mAudioContext ? y.prototype.setActiveOn.call(this) : -1;
    }, _.prototype._closeAudioContext = function() {
        this.mAudioContext && (this.mAudioContext.onstatechange = void 0), this.mAudioContextClass && (this.mAudioContext, 
        this.mAudioContext = null);
    }, _.prototype._onAudioStart = function() {
        if ('function' == typeof this.mOnAudioStartFunc) try {
            return this.mOnAudioStartFunc();
        } catch (t) {
            return this.exception('_onAudioStart', t), -1;
        }
        return 0;
    }, _.prototype._onAudioStop = function() {
        if ('function' == typeof this.mOnAudioStopFunc) try {
            return this.mOnAudioStopFunc();
        } catch (t) {
            return this.exception('_onAudioStop', t), -1;
        }
        return 0;
    }, _.prototype._onAudioUnlock = function() {
        if ('function' == typeof this.mOnAudioUnlockFunc) try {
            var t = 'undefined';
            return this.mAudioContext && (t = this.mAudioContext.state), this.mOnAudioUnlockFunc(t);
        } catch (t) {
            return this.exception('_onAudioUnlock', t), -1;
        }
        return 0;
    }, Object.defineProperty(_.prototype, "onAudioStart", {
        set: function(t) {
            this.mOnAudioStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(_.prototype, "onAudioStop", {
        set: function(t) {
            this.mOnAudioStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(_.prototype, "onAudioUnlock", {
        set: function(t) {
            this.mOnAudioUnlockFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), _.prototype.getAudioContext = function() {
        return this.mAudioContext;
    }, _.prototype._unlockAudio = function(e) {
        var o;
        this.mAudioContext ? 'running' !== this.mAudioContext.state ? 'suspended' === this.mAudioContext.state || 'interrupted' === this.mAudioContext.state ? (o = setTimeout(function() {
            console.log('AudioPlayer._unlockAudio: timeout'), e(!1);
        }, 2e3), this.mAudioContext.resume().then(function() {
            clearTimeout(o), e(!0);
        }, function(t) {
            console.log('AudioPlayer._unlockAudio:', t), clearTimeout(o), e(!1);
        })) : e(!1) : e(!0) : e(!1);
    }, _.prototype.unlockAudio = function() {
        var e = this;
        this._unlockAudio(function(t) {
            e._onAudioUnlock();
        });
    }, _.prototype.isUnlockAudio = function() {
        return !(!this.mAudioContext || 'running' !== this.mAudioContext.state);
    }, _.prototype.setAudioFormat = function(t) {
        return t !== a && t !== l ? (this.error('setAudioFormat', 'kein gueltiges Audioformat uebergeben: ' + t), 
        -1) : (this.mAudioFormat = t, 0);
    }, _.prototype.getAudioFormat = function() {
        return this.mAudioFormat;
    }, _.prototype.isLoad = function() {
        return this.mAudioLoadFlag;
    }, _.prototype.isPlay = function() {
        return this.mAudioPlayFlag;
    }, _.prototype.isCancel = function() {
        var t = this.mAudioCancelFlag;
        return this.mAudioCancelFlag = !1, t;
    }, _.prototype._cancel = function() {
        this.isLoad() && (this.mAudioCancelFlag = !0);
    }, _.prototype._loadAudioFile = function(t) {
        var e = this;
        if (!this.mXMLHttpRequestClass) return this.error('_loadAudioFile', 'keine XMLHttpRequest Klasse'), 
        -1;
        try {
            this.mAudioLoadFlag = !0, this.mRequest = new this.mXMLHttpRequestClass(), this.mRequest.open('GET', t, !0), 
            this.mRequest.responseType = 'arraybuffer';
            var o = this.mRequest;
            return this.mRequest.onload = function() {
                e._decodeAudio();
            }, this.mRequest.onloadend = function() {
                404 === o.status && e.error('_requestDialogFile', 'Error 404');
            }, this.mRequest.onerror = function(t) {
                e.mAudioLoadFlag = !1, e._onError(t);
            }, this.mRequest.onabord = function(t) {
                console.log('AudioPlayer._loadAudioFile: onabord', t), e.mAudioLoadFlag = !1;
            }, this.mRequest.send(), 0;
        } catch (t) {
            return this.exception('_loadAudioFile', t), this.mAudioLoadFlag = !1, -1;
        }
    }, _.prototype._decodeAudio = function() {
        var e = this;
        if (!this.isInit()) return this.error('_decodeAudio', 'nicht initialisiert'), -1;
        if (this.isCancel()) return this.mAudioLoadFlag = !1, 0;
        if (!this.mAudioContext) return this.error('_decodeAudio', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mAudioContext.decodeAudioData(this.mRequest.response, function(t) {
                e.mAudioBuffer = t, e._playStart();
            }, function(t) {
                e.error('_decodeAudio', 'DOMException'), e.mAudioLoadFlag = !1;
            }), 0;
        } catch (t) {
            return this.exception('_decodeAudio', t), this.mAudioLoadFlag = !1, -1;
        }
    }, _.prototype._playStart = function() {
        var t = this;
        if (!this.mAudioBuffer) return -1;
        if (this.isCancel()) return this.mAudioLoadFlag = !1, 0;
        if (!this.mAudioContext) return this.error('_playStart', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mAudioPlayFlag = !0, this.mAudioLoadFlag = !1, this.mAudioCancelFlag = !1, 
            this.mSource = this.mAudioContext.createBufferSource(), this.mSource.onended = function() {
                t.isPlay() && (t.mAudioPlayFlag = !1, t._onAudioStop());
            }, this.mSource.buffer = this.mAudioBuffer, this.mSource.connect(this.mAudioContext.destination), 
            this.mSource.start ? this.mSource.start(0) : this.mSource.noteOn(0), this._onAudioStart(), 
            0;
        } catch (t) {
            return this.exception('_playStart', t), this.mAudioPlayFlag = !1, -1;
        }
    }, _.prototype.playPcmData = function(o) {
        var i = this;
        if (!this.isActive()) return this.isErrorOutput() && console.log('AudioPlayer.playPcmData: AudioPlayer ist nicht aktiv'), 
        0;
        (this.isLoad() || this.isPlay()) && (this._cancel(), this.stop());
        try {
            return this.mSource = null, this.mAudioBuffer = null, this._unlockAudio(function(t) {
                var e;
                t ? (e = new p().decodePCM(o), [].push(e), (e = (e = (e = i._getAudioBufferFirst(t = e)) || i._getAudioBufferSecond(t)) || i._getAudioBufferResample(t)) ? (i.mAudioBuffer = e, 
                i._playStart()) : i.error('playByStream', 'kein Audiobuffer erzeugt')) : (i.error('play', 'AudioContext ist nicht entsperrt'), 
                i._onAudioStop());
            }), 0;
        } catch (t) {
            return this.exception('play', t), -1;
        }
    }, _.prototype.play = function(t, e) {
        var o = this;
        if (!this.isActive()) return this.isErrorOutput() && console.log('AudioPlayer.play: AudioPlayer ist nicht aktiv'), 
        0;
        (this.isLoad() || this.isPlay()) && (this._cancel(), this.stop());
        try {
            var i = './', n = (i = t ? t : i) + e + '.' + this.mAudioFormat;
            return this.mSource = null, this.mAudioBuffer = null, this._unlockAudio(function(t) {
                t ? o._loadAudioFile(n) : (o.error('play', 'AudioContext ist nicht entsperrt'), 
                o._onAudioStop());
            }), 0;
        } catch (t) {
            return this.exception('play', t), -1;
        }
    }, _.prototype.playFile = function(e) {
        var o = this;
        if (!this.isActive()) return this.isErrorOutput() && console.log('AudioPlayer.playFile: AudioPlayer ist nicht aktiv'), 
        0;
        if ((this.isLoad() || this.isPlay()) && (this._cancel(), this.stop()), !e) return this.error('playFile', 'kein Dateiname uebergeben'), 
        -1;
        try {
            return this.mSource = null, this.mAudioBuffer = null, this._unlockAudio(function(t) {
                t ? o._loadAudioFile(e) : (o.error('playFile', 'AudioContext ist nicht entsperrt'), 
                o._onAudioStop());
            }), 0;
        } catch (t) {
            return this.exception('playFile', t), -1;
        }
    }, _.prototype.getPlayFunc = function() {
        var o = this;
        return function(t, e) {
            return o.play(t, e);
        };
    }, _.prototype.stop = function() {
        if (!this.isActive()) return this.isErrorOutput() && console.log('AudioPlayer.stop: AudioPlayer ist nicht aktiv'), 
        0;
        if (this._cancel(), this.mSource) {
            try {
                this.mAudioPlayFlag = !1, this.mSource.stop ? this.mSource.stop(0) : this.mSource.noteOff(0), 
                this.mSource.disconnect(0);
            } catch (t) {
                this.exception('stop', t);
            }
            this.mSource = null, this.mAudioBuffer = null, this.mAudioCancelFlag = !1, this._onAudioStop();
        }
        return this.mAudioLoadFlag = !1, 0;
    }, _.prototype.getStopFunc = function() {
        var t = this;
        return function() {
            return t.stop();
        };
    }, _.prototype._getAudioBufferFirst = function(t) {
        var e = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (e = new AudioBuffer({
                length: o.length,
                numberOfChannels: 1,
                sampleRate: h
            })).getChannelData(0).set(o);
        } catch (t) {
            e = null, console.log('AudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return e;
    }, _.prototype._getAudioBufferSecond = function(t) {
        var e = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (e = this.mAudioContext.createBuffer(1, o.length, h)).getChannelData(0).set(o);
        } catch (t) {
            e = null, console.log('AudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return e;
    }, _.prototype._getAudioBufferResample = function(t) {
        var e = null;
        try {
            var o = new Float32Array(1.4 * t.length);
            o.set(t);
            var i = new A(h, 22500, 1, o.length, void 0).resampler(o);
            (e = this.mAudioContext.createBuffer(1, i.length, 22500)).getChannelData(0).set(i);
        } catch (t) {
            e = null, console.log('AudioPlayer._getAudioBufferResample: Exception', t);
        }
        return e;
    }, _);
    function _(t, e) {
        e = y.call(this, t || s, e = void 0 === e ? !0 : e) || this;
        return e.mAudioContextClass = null, e.mAudioContext = null, e.mAudioFormat = c, 
        e.mAudioBuffer = null, e.mXMLHttpRequestClass = null, e.mRequest = null, e.mSource = null, 
        e.mAudioLoadFlag = !1, e.mAudioPlayFlag = !1, e.mAudioCancelFlag = !1, e.mOnAudioStartFunc = null, 
        e.mOnAudioStopFunc = null, e.mOnAudioUnlockFunc = null, e;
    }
    var C, P = (e(F, C = o.PluginFactory), F.prototype.isMock = function() {
        return !1;
    }, F.prototype.getName = function() {
        return r;
    }, F.prototype._newPlugin = function(t, e, o) {
        return new g(s, o);
    }, F.prototype.create = function(t, e, o) {
        void 0 === o && (o = !0);
        t = (t = void 0 === t ? '' : t) || s, e = (e = void 0 === e ? '' : e) || s;
        try {
            return this._newPlugin(t, e, o);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, F);
    function F() {
        return C.call(this, 'AudioPlayerFactory') || this;
    }
    var v = o.SPEECH_VERSION_NUMBER, x = o.SPEECH_VERSION_BUILD, S = o.SPEECH_VERSION_TYPE, O = v + '.' + x + ' vom ' + o.SPEECH_VERSION_DATE + ' (' + S + ')', E = (R.prototype._init = function(t) {
        if (this.mAudioPlayer) return 0;
        try {
            var e = o.FactoryManager.get(r, P);
            return this.mAudioPlayer = o.PluginManager.get(s, s, e), this.mAudioPlayer ? this.mAudioPlayer.isInit() || 0 === this.mAudioPlayer.init(t) ? 0 : (console.log('Audio._init: AudioPlayer nicht initialisiert'), 
            -1) : (console.log('Audio._init: kein AudioPlayer erzeugt'), -1);
        } catch (t) {
            return console.log('Audio._init: Exception ', t.message), -1;
        }
    }, R.prototype.getVersion = function() {
        return O;
    }, R.prototype.isErrorOutput = function() {
        return this.mAudioPlayer.isErrorOutput();
    }, R.prototype.setErrorOutputOn = function() {
        this.mAudioPlayer.setErrorOutputOn();
    }, R.prototype.setErrorOutputOff = function() {
        this.mAudioPlayer.setErrorOutputOff();
    }, R.prototype.addInitEvent = function(t, e) {
        return 0;
    }, R.prototype.addPlayerStartEvent = function(t, e) {
        return this.mAudioPlayer.onAudioStart = e, 0;
    }, R.prototype.addPlayerStopEvent = function(t, e) {
        return this.mAudioPlayer.onAudioStop = e, 0;
    }, R.prototype.addUnlockEvent = function(t, e) {
        return this.mAudioPlayer.onAudioUnlock = e, 0;
    }, R.prototype.addErrorEvent = function(t, e) {
        return this.mAudioPlayer.onError = e, 0;
    }, R.prototype.removeInitEvent = function(t) {
        return 0;
    }, R.prototype.removePlayerStartEvent = function(t) {
        return 0;
    }, R.prototype.removePlayerStopEvent = function(t) {
        return 0;
    }, R.prototype.removeUnlockEvent = function(t) {
        return 0;
    }, R.prototype.removeErrorEvent = function(t) {
        return 0;
    }, R.prototype.removeAllEvent = function(t) {
        return 0;
    }, R.prototype.unlockAudio = function() {
        return this.mAudioPlayer.unlockAudio();
    }, R.prototype.isUnlockAudio = function() {
        return this.mAudioPlayer.isUnlockAudio();
    }, R.prototype.getAudioFormatList = function() {
        return [ a, l ];
    }, R.prototype.setAudioFormat = function(t) {
        return this.mAudioPlayer.setAudioFormat(t);
    }, R.prototype.getAudioFormat = function() {
        return this.mAudioPlayer.getAudioFormat();
    }, R.prototype.playFile = function(t) {
        return this.mAudioPlayer.playFile(t);
    }, R.prototype.playData = function(t) {
        return this.mAudioPlayer.playPcmData(atob(t));
    }, R.prototype.stopPlay = function() {
        return this.mAudioPlayer.stop();
    }, R.prototype.stop = function() {
        return this.mAudioPlayer.stop();
    }, R);
    function R(t) {
        if (this.mAudioPlayer = null, 0 !== this._init(t)) throw new Error('Audio nicht initialisiert');
    }
    L.create = function(t, e) {
        try {
            return new E(e);
        } catch (t) {
            return console.log('AudioFactory.create: Exception', t), null;
        }
    }, S = L;
    function L() {}
    t.AUDIOPLAYER_FACTORY_NAME = r, t.AUDIOPLAYER_MOCK_NAME = 'AudioPlayerMock', t.AUDIOPLAYER_PLUGIN_NAME = s, 
    t.AUDIO_DEFAULT_FORMAT = c, t.AUDIO_MP3_FORMAT = a, t.AUDIO_PLUGIN_NAME = 'AudioPlugin', 
    t.AUDIO_WAV_FORMAT = l, t.AudioFactory = S, t.AudioPlayerFactory = P, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
