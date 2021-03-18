/**
 * Speech-Common Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechCommon = {}, t.speechCore);
}(this, function(t, o) {
    'use strict';
    var n = function(t, e) {
        return (n = Object.setPrototypeOf || {
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
        n(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
        new o());
    }
    var r, i = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ], u = [ 'audio/opus;rate=8000', 'audio/opus;rate=16000' ], c = (e(s, r = o.ErrorBase), 
    s.prototype._findCodec = function(t, e) {
        for (var o = 0; o < e.length; o++) if (t === e[o]) return !0;
        return !1;
    }, s.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, i);
    }, s.prototype.findOpusCodec = function(t) {
        return this._findCodec(t, u);
    }, s.prototype._float32ToInt16 = function(t) {
        return Math.max(-32768, Math.min(32768, t < 0 ? 32768 * t : 32767 * t));
    }, s.prototype._float32ArrayToInt16Array = function(t) {
        for (var e = new Int16Array(t.length), o = 0; o < t.length; ) e[o] = this._float32ToInt16(t[o++]);
        return e;
    }, s.prototype.encodePCM = function(t, e) {
        return this.findPcmCodec(e) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, s.prototype.decodePCM = function(t) {
        try {
            for (var e = new Uint8Array(t), o = e.length, n = new Float32Array(o / 2), r = new Int16Array(1), i = 0, u = 0; u < o; u += 2) r[0] = (e[u + 1] << 8) + e[u], 
            n[i] = r[0] / 32768, i++;
            return n;
        } catch (t) {
            return this.exception('decodePCM', t), [];
        }
    }, s.prototype.decodePCMInt16 = function(t) {
        try {
            for (var e = new Int16Array(t), o = e.length, n = new Float32Array(o), r = 0; r < o; ++r) n[r] = e[r] / 32768;
            return n;
        } catch (t) {
            return console.log('GoogleAudioCodec.decodePCM: Exception', t), this.exception('decodePCM', t), 
            [];
        }
    }, s);
    function s() {
        return r.call(this, 'AudioCodec') || this;
    }
    var a = (h.prototype.initialize = function() {
        if (!(0 < this.fromSampleRate && 0 < this.toSampleRate && 0 < this.channels)) throw new Error('Invalid settings specified for the resampler.');
        this.fromSampleRate === this.toSampleRate ? (this.resampler = this.bypassResampler, 
        this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, 
        this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, 
        this.lastWeight = 0, this.initializeBuffers());
    }, h.prototype.compileInterpolationFunction = function() {
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
    }, h.prototype.bypassResampler = function(t) {
        return this.noReturn ? (this.outputBuffer = t).length : t;
    }, h.prototype.bufferSlice = function(e) {
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
    }, h.prototype.initializeBuffers = function(t) {
        try {
            this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
        } catch (t) {
            this.outputBuffer = [], this.lastOutput = [];
        }
    }, h);
    function h(t, e, o, n, r) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = e, this.channels = o || 0, this.outputBufferSize = n, this.noReturn = !!r, 
        this.initialize();
    }
    var l, d = 16e3, p = (e(f, l = o.ErrorBase), f.prototype._onAudioStart = function() {
        if (this.mOnAudioStartFunc) try {
            this.mOnAudioStartFunc();
        } catch (t) {
            this.exception('_onAudioStart', t);
        }
    }, f.prototype._onAudioStop = function() {
        if (this.mOnAudioStopFunc) try {
            this.mOnAudioStopFunc();
        } catch (t) {
            this.exception('_onAudioStop', t);
        }
    }, Object.defineProperty(f.prototype, "onAudioStart", {
        set: function(t) {
            this.mOnAudioStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(f.prototype, "onAudioStop", {
        set: function(t) {
            this.mOnAudioStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), f.prototype.start = function() {
        this.mOnAudioEndFunc = null, this.mAudioSource = null, this.mAudioArray = [], this.mQueue = [], 
        this.mBeginSpeakFlag = !0, this.mAudioStopFlag = !1;
    }, f.prototype._getAudioBufferFirst = function(t) {
        var e = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (e = new AudioBuffer({
                length: o.length,
                numberOfChannels: 1,
                sampleRate: d
            })).getChannelData(0).set(o);
        } catch (t) {
            e = null, console.log('AudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return e;
    }, f.prototype._getAudioBufferSecond = function(t) {
        var e = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (e = this.mAudioContext.createBuffer(1, o.length, d)).getChannelData(0).set(o);
        } catch (t) {
            e = null, console.log('AudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return e;
    }, f.prototype._getAudioBufferResample = function(t) {
        var e = null;
        try {
            var o = new Float32Array(1.4 * t.length);
            o.set(t), this.mResampler = new a(d, 22500, 1, o.length, void 0);
            var n = this.mResampler.resampler(o);
            (e = this.mAudioContext.createBuffer(1, n.length, 22500)).getChannelData(0).set(n);
        } catch (t) {
            e = null, console.log('AudioPlayer._getAudioBufferResample: Exception', t);
        }
        return e;
    }, f.prototype.playByStreamOld = function(e, t) {
        var o = this;
        try {
            if (!this.mAudioContext) return void console.log('AudioPlayer.playByStream: kein AudioContext vorhanden');
            if (this.mOnAudioEndFunc = e.onaudioend, 0 === t.length || this.mAudioStopFlag) return this.mBeginSpeakFlag = !0, 
            e.onaudioend(), this.mOnAudioEndFunc = null, void (this.mAudioSource = null);
            this.mAudioSource = this.mAudioContext.createBufferSource(), this.mAudioSource.onended = function() {
                return o.playByStreamOld(e, t);
            };
            var n = t.shift(), r = this._getAudioBufferFirst(n);
            if (!(r = (r = r || this._getAudioBufferSecond(n)) || this._getAudioBufferResample(n))) return void this.error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = r, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            e.onaudiostart();
        } catch (t) {
            this.mBeginSpeakFlag = !0, e.onaudioend(), this.mOnAudioEndFunc = null, this.mAudioSource = null, 
            console.log('AudioPlayer.playByStream: Exception', t), this.exception('playByStream', t);
        }
    }, f.prototype.playByStream = function(t) {
        var e = this;
        try {
            if (!this.mAudioContext) return void console.log('AudioPlayer.playByStream: kein AudioContext vorhanden');
            if (0 === t.length || this.mAudioStopFlag) return this.mBeginSpeakFlag = !0, this._onAudioStop(), 
            void (this.mAudioSource = null);
            this.mAudioSource = this.mAudioContext.createBufferSource(), this.mAudioSource.onended = function() {
                return e.stop();
            };
            var o = t.shift(), n = this._getAudioBufferFirst(o);
            if (!(n = (n = n || this._getAudioBufferSecond(o)) || this._getAudioBufferResample(o))) return void this.error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = n, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            this._onAudioStart();
        } catch (t) {
            this.mBeginSpeakFlag = !0, this._onAudioStop(), this.mAudioSource = null, this.exception('playByStream', t);
        }
    }, f.prototype.decodeOld = function(t, e) {
        try {
            var o;
            this.mAudioCodec.findPcmCodec(t.codec) ? (o = this.mAudioCodec.decodePCM(e), this.mAudioArray.push(o), 
            this.mQueue.push(o), this.mBeginSpeakFlag && (this.mBeginSpeakFlag = !1, this.playByStreamOld(t, this.mAudioArray))) : this.mAudioCodec.findOpusCodec(t.codec) || this.error('decode', 'Kein Decoder vorhanden fuer ' + t.codec);
        } catch (t) {
            this.exception('decode', t);
        }
    }, f.prototype.decode = function(t, e) {
        try {
            var o;
            this.mAudioCodec.findPcmCodec(t.codec) ? (o = this.mAudioCodec.decodePCM(e), this.mAudioArray.push(o), 
            this.mQueue.push(o), this.mBeginSpeakFlag && (this.mBeginSpeakFlag = !1, this.playByStream(this.mAudioArray))) : this.error('decode', 'Kein Decoder vorhanden fuer ' + t.codec);
        } catch (t) {
            this.exception('decode', t);
        }
    }, f.prototype.decodeAudio = function(e, t) {
        var o = this;
        if (!this.mAudioContext) return this.error('_decodeAudio', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mAudioContext.decodeAudioData(t, function(t) {
                o.mAudioBuffer = t, o._playStart(e);
            }, function(t) {
                o.error('_decodeAudio', 'DOMException');
            }), 0;
        } catch (t) {
            return this.exception('_decodeAudio', t), -1;
        }
    }, f.prototype._playStart = function(t) {
        if (!this.mAudioBuffer) return this.error('_playStart', 'kein AudioBuffer vorhanden'), 
        -1;
        if (!this.mAudioContext) return this.error('_playStart', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mSource = this.mAudioContext.createBufferSource(), this.mSource.onended = function() {
                t.onaudioend && t.onaudioend();
            }, this.mSource.buffer = this.mAudioBuffer, this.mSource.connect(this.mAudioContext.destination), 
            this.mSource.start ? this.mSource.start(0) : this.mSource.noteOn(0), t.onaudiostart && t.onaudiostart(), 
            0;
        } catch (t) {
            return this.exception('_playStart', t), -1;
        }
    }, f.prototype.stopOld = function() {
        try {
            this.mAudioStopFlag = !0, this.mAudioSource && (this.mAudioSource.stop(0), this.mAudioSource.disconnect(0), 
            'function' == typeof this.mOnAudioEndFunc && this.mOnAudioEndFunc());
        } catch (t) {
            this.exception('stop', t);
        }
        this.mAudioSource = null;
    }, f.prototype.stop = function() {
        try {
            this.mAudioStopFlag = !0, this.mAudioSource && (this.mAudioSource.stop(0), this.mAudioSource.disconnect(0), 
            this._onAudioStop());
        } catch (t) {
            this.exception('stop', t);
        }
        this.mAudioSource = null;
    }, f.prototype.stopAudio = function() {
        if (this.mSource) {
            try {
                this.mSource.stop ? this.mSource.stop(0) : this.mSource.noteOff(0), this.mSource.disconnect(0);
            } catch (t) {
                this.exception('stop', t);
            }
            this.mSource = null, this.mAudioBuffer = null;
        }
    }, f);
    function f(t) {
        var e = l.call(this, 'AudioPlayer') || this;
        return e.mAudioContext = null, e.mAudioCodec = null, e.mResampler = null, e.mOnAudioStartFunc = null, 
        e.mOnAudioStopFunc = null, e.mOnAudioEndFunc = null, e.mAudioSource = null, e.mAudioArray = [], 
        e.mQueue = [], e.mBeginSpeakFlag = !0, e.mAudioStopFlag = !1, e.mAudioBuffer = null, 
        e.mSource = null, e.mAudioContext = t, e.mAudioCodec = new c(), e;
    }
    var m, y = (e(S, m = o.ErrorBase), S.prototype.setServer = function(t) {
        this.mServerFlag = t;
    }, S.prototype._closeMediaStream = function() {
        try {
            if (this.mUserMediaStream && this.mUserMediaStream.getAudioTracks) for (var t = this.mUserMediaStream.getAudioTracks(), e = 0, o = t; e < o.length; e++) {
                var n = o[e];
                n.stop && n.stop();
            }
        } catch (t) {
            this.exception('_closeMediaStream', t);
        }
        this.mUserMediaStream = null;
    }, S.prototype.getAudioData = function(t) {
        for (var e = 0, o = 0, n = t; o < n.length; o++) e += (s = n[o]).length;
        for (var r = new Int16Array(e), i = 0, u = 0, c = t; u < c.length; u++) for (var s = c[u], a = 0; a < s.length; a++) r[i] = s[a], 
        i++;
        return r.buffer;
    }, S.prototype._onEnded = function() {
        var t = this.getAudioData(this.mChannelDataList);
        if ('function' == typeof this.mOnEndedFunc) try {
            this.mOnEndedFunc(t);
        } catch (t) {
            return this.exception('_onEnded', t), -1;
        }
        return 0;
    }, S.prototype._onMicrophoneStart = function() {
        if ('function' == typeof this.mOnMicrophoneStartFunc) try {
            this.mOnMicrophoneStartFunc();
        } catch (t) {
            return this.exception('_onMicrophoneStart', t), -1;
        }
        return 0;
    }, S.prototype._onMicrophoneStop = function() {
        if ('function' == typeof this.mOnMicrophoneStopFunc) try {
            this.mOnMicrophoneStopFunc();
        } catch (t) {
            return this.exception('_onMicrophoneStop', t), -1;
        }
        return 0;
    }, S.prototype._onVolume = function(t) {
        if ('function' == typeof this.mOnVolumeFunc) try {
            this.mOnVolumeFunc(t);
        } catch (t) {
            return this.exception('_onVolume', t), -1;
        }
        return 0;
    }, S.prototype._onAudioProcess = function(t) {
        var e = this;
        try {
            if (!this.mRecordingFlag) return this.mAudioInputNode.disconnect(this.mAnalyseNode), 
            this.mAnalyseNode.disconnect(this.mRecordingNode), this.mRecordingNode.disconnect(this.mAudioContext.destination), 
            this._closeMediaStream(), this._onMicrophoneStop(), this._onEnded(), void (this.mWebSocket && this.mServerFlag && this.mWebSocket.send(JSON.stringify({
                event: 'googleASRAudioStop'
            })));
            var o = t.inputBuffer.getChannelData(0), n = this.mResampler.resampler(o);
            this.mBytesRecorded += n.length;
            var r = new Uint8Array(this.mAnalyseNode.frequencyBinCount);
            this.mAnalyseNode.getByteTimeDomainData(r), this.mAudioCodec.findPcmCodec(this.mCodec) ? this.mAudioCodec.encodePCM(n, this.mCodec).forEach(function(t) {
                e.mWebSocket && e.mWebSocket.send(t.buffer), e.mChannelDataList.push(t);
            }) : this.error('_onAudioProcess', 'Codec nicht implementiert'), this.mServerFlag || this._onVolume(r);
        } catch (t) {
            this.exception('_onAudioProcess', t);
        }
    }, S.prototype.start = function(t, e) {
        var o = this;
        this.mRecordingFlag = !0, this.mUserMediaStream = t, this.mCodec = e, this.mAudioContext.resume().then(function() {
            try {
                o.mWebSocket && o.mServerFlag && o.mWebSocket.send(JSON.stringify({
                    event: 'googleASRAudioStart'
                })), o.mAudioInputNode = o.mAudioContext.createMediaStreamSource(o.mUserMediaStream), 
                o.mAnalyseNode = o.mAudioContext.createAnalyser(), o.mRecordingNode = o.mAudioContext.createScriptProcessor(o.mBufferSize, 1, 2), 
                o.mRecordingNode.onaudioprocess = function(t) {
                    return o._onAudioProcess(t);
                }, o.mAudioInputNode.connect(o.mAnalyseNode), o.mAnalyseNode.connect(o.mRecordingNode), 
                o.mRecordingNode.connect(o.mAudioContext.destination), o._onMicrophoneStart();
            } catch (t) {
                o.exception('start', t);
            }
        }, function(t) {
            t && t.message && o.error('start.resume', t.message);
        });
    }, S.prototype.startAudio = function(t, e) {}, S.prototype.stop = function(t) {
        this.mOnEndedFunc = t, this.mRecordingFlag = !1;
    }, Object.defineProperty(S.prototype, "onMicrophoneStart", {
        set: function(t) {
            this.mOnMicrophoneStartFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(S.prototype, "onMicrophoneStop", {
        set: function(t) {
            this.mOnMicrophoneStopFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), S);
    function S(t, e, o) {
        var n = m.call(this, 'AudioRecorder') || this;
        n.mWebSocket = null, n.mAudioContext = null, n.mAudioCodec = null, n.mResampler = null, 
        n.mServerFlag = !1, n.mBufferSize = 2048, n.mSampleRate = 16e3, n.mCodec = "audio/L16;rate=16000", 
        n.mAudioInputNode = null, n.mAnalyseNode = null, n.mRecordingNode = null, n.mUserMediaStream = null, 
        n.mChannelDataList = [], n.mBytesRecorded = 0, n.mRecordingFlag = !1, n.mOnVolumeFunc = null, 
        n.mOnEndedFunc = null, n.mOnMicrophoneStartFunc = null, n.mOnMicrophoneStopFunc = null, 
        n.mWebSocket = t, n.mAudioContext = e, n.mOnVolumeFunc = o, n.mAudioCodec = new c();
        try {
            n.mResampler = new a(n.mAudioContext.sampleRate, n.mSampleRate, 1, n.mBufferSize, void 0);
        } catch (t) {
            throw n.exception('constructor', t), new Error('AudioRecorder nicht initialisiert');
        }
        return n;
    }
    var A, g = 'text', E = 'arraybuffer', O = 'XMLHttpRequestFactory', C = 'XMLHttpRequest', _ = (e(b, A = o.Factory), 
    b.prototype.isMock = function() {
        return !1;
    }, b.prototype.getType = function() {
        return C;
    }, b.prototype.getName = function() {
        return O;
    }, b.prototype.create = function(t, e, o) {
        try {
            return XMLHttpRequest || null;
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, b.prototype.getXMLHttpRequestClass = function() {
        return this.create();
    }, b);
    function b(t, e) {
        return A.call(this, t || O, e = void 0 === e ? !0 : e) || this;
    }
    var F, R = (e(k, F = o.ErrorBase), k.prototype.init = function(t) {
        return this._detectXMLHttpRequest() ? 0 : -1;
    }, k.prototype.done = function() {
        return this.mXMLHttpRequestClass = null, this.mRequest = null, this.mOnReadFunc = null, 
        0;
    }, k.prototype._detectXMLHttpRequest = function() {
        var t = o.FactoryManager.get(O, _);
        return t ? (this.mXMLHttpRequestClass = t.create(), null !== this.mXMLHttpRequestClass || (this.error('_detectXMLHttpRequest', 'kein XMLHttpRequest vorhanden'), 
        !1)) : (this.error('_detectXMLHttpRequest', 'keine File-Fabrik vorhanden'), !1);
    }, k.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            this.mOnErrorFunc(t);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION Plugin._onError: ', t.message), 
            -1;
        }
        return 0;
    }, k.prototype._onLoad = function(t, e) {
        if (this.mOnReadFunc) try {
            404 === e ? this.error('_onLoad', 'Error 404') : this.mOnReadFunc(t);
        } catch (t) {
            return this.exception('_onLoad', t), -1;
        }
        return 0;
    }, k.prototype._onLoadEnd = function(t) {
        return 404 === t ? (this.error('_onLoadEnd', 'Error 404'), -1) : 0;
    }, k.prototype._onLoadError = function(t) {
        this.error('_onLoadError', t);
    }, k.prototype._onLoadAbort = function(t) {
        this.error('_onLoadAbort', t);
    }, k.prototype._loadFile = function(t, e) {
        var o = this;
        if (!this.mXMLHttpRequestClass) return this.error('_loadFile', 'kein XMLHttpRequest vorhanden'), 
        -1;
        if (!t) return this.error('_loadFile', 'keine URL uebergeben'), -1;
        try {
            this.mRequest = new this.mXMLHttpRequestClass(), this.mRequest.open('GET', t, !0), 
            this.mRequest.responseType = e;
            var n = this.mRequest;
            return this.mRequest.onload = function() {
                return o._onLoad(n.response, n.status);
            }, this.mRequest.onloadend = function() {
                return o._onLoadEnd(n.status);
            }, this.mRequest.onerror = function(t) {
                return o._onLoadError(t);
            }, this.mRequest.onabord = function(t) {
                return o._onLoadAbort(t);
            }, this.mRequest.send(), 0;
        } catch (t) {
            return this.exception('_loadFile', t), -1;
        }
    }, Object.defineProperty(k.prototype, "onRead", {
        set: function(t) {
            this.mOnReadFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(k.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), k.prototype.read = function(t, e) {
        return this._loadFile(t, e = void 0 === e ? g : e);
    }, k);
    function k(t) {
        var e = F.call(this, t || 'FileHtml5Reader') || this;
        return e.mXMLHttpRequestClass = null, e.mRequest = null, e.mOnReadFunc = null, e.mOnErrorFunc = null, 
        e.setErrorOutputFunc(function(t) {
            return e._onError(new Error(t));
        }), e;
    }
    var v, x = 'AudioContextFactory', M = 'AudioContext', w = (e(W, v = o.Factory), 
    W.prototype.isMock = function() {
        return !1;
    }, W.prototype.getType = function() {
        return M;
    }, W.prototype.getName = function() {
        return x;
    }, W.prototype.create = function(t, e, o) {
        this.count++;
        try {
            return window.AudioContext || window.webkitAudioContext || null;
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, W);
    function W(t, e) {
        e = v.call(this, t || x, e = void 0 === e ? !0 : e) || this;
        return e.count = 0, e;
    }
    var N = (P.clear = function() {
        P.mAudioContext = null;
    }, P.setErrorOutputOn = function() {
        P.mErrorBase.setErrorOutputOn();
    }, P.setErrorOutputOff = function() {
        P.mErrorBase.setErrorOutputOff();
    }, P.setErrorOutputFunc = function(t) {
        P.mErrorBase.setErrorOutputFunc(t);
    }, P._createAudioContext = function() {
        try {
            var t = o.FactoryManager.get(x, w);
            if (!t) return P.mErrorBase.error('_createAudioContext', 'keine AudioContext-Fabrik vorhanden'), 
            null;
            var e = t.create();
            return null === e ? (P.mErrorBase.error('_createAudioContext', 'kein AudioContext vorhanden'), 
            null) : new e();
        } catch (t) {
            return P.mErrorBase.exception('_createAudioContext', t), null;
        }
    }, P.setAudioContext = function(t) {
        return t ? P.mAudioContext ? (P.mErrorBase.error('setudioContext', 'AudioContext ist bereits vorhanden'), 
        -1) : (P.mAudioContext = t, 0) : (P.mErrorBase.error('setudioContext', 'Kein AudioContext uebergeben'), 
        -1);
    }, P.getAudioContext = function() {
        return P.mAudioContext || (P.mAudioContext = P._createAudioContext());
    }, P.mErrorBase = new o.ErrorBase('AudioContextManager'), P.mAudioContext = null, 
    P);
    function P() {}
    var T, B = (e(I, T = R), I.prototype._detectAudioContext = function() {
        var t = o.FactoryManager.get(x, w);
        return t ? (this.mAudioContextClass = t.create(), null !== this.mAudioContextClass || (this.error('_detectAudioContext', 'kein AudioContext vorhanden'), 
        !1)) : (this.error('_detectAudioContext', 'keine AudioContext-Fabrik vorhanden'), 
        !1);
    }, I.prototype.init = function(t) {
        var e = this;
        if (0 !== T.prototype.init.call(this, t)) return -1;
        if (t && t.audioFormat && this.setAudioFormat(t.audioFormat), t && t.audioContext) this.mAudioContext = t.audioContext; else {
            if (!this._detectAudioContext()) return -1;
            try {
                if (!this.mAudioContextClass) return -1;
                if (this.mAudioContext = N.getAudioContext(), !this.mAudioContext) return -1;
                this.mAudioContext.onstatechange = function() {
                    e.mAudioContext;
                };
            } catch (t) {
                return this._closeAudioContext(), this.exception('init', t), -1;
            }
        }
        return this.mOnReadFunc = function(t) {
            return e._decodeAudio(t);
        }, 0;
    }, I.prototype.done = function() {
        return this._closeAudioContext(), this.mAudioContextClass = null, this.mAudioFormat = "mp3", 
        this.mOnAudioReadFunc = null, T.prototype.done.call(this);
    }, I.prototype._closeAudioContext = function() {
        this.mAudioContextClass && this.mAudioContext, this.mAudioContext = null;
    }, Object.defineProperty(I.prototype, "onRead", {
        set: function(t) {
            this.mOnAudioReadFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), I.prototype.getAudioContext = function() {
        return this.mAudioContext;
    }, I.prototype.setAudioFormat = function(t) {
        return "mp3" !== t && "wav" !== t ? (this.error('setAudioFormat', 'kein gueltiges Audioformat uebergeben: ' + t), 
        -1) : (this.mAudioFormat = t, 0);
    }, I.prototype.getAudioFormat = function() {
        return this.mAudioFormat;
    }, I.prototype._decodeAudio = function(t) {
        var e = this;
        if (!this.mAudioContext) return this.error('_decodeAudio', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mAudioContext.decodeAudioData(t, function(t) {
                if (e.mOnAudioReadFunc) try {
                    e.mOnAudioReadFunc(t);
                } catch (t) {
                    e.exception('_decodeAudio', t);
                }
            }, function(t) {
                e.error('_decodeAudio', 'DOMException');
            }), 0;
        } catch (t) {
            return this.exception('_decodeAudio', t), -1;
        }
    }, I.prototype.read = function(t, e) {
        return T.prototype.read.call(this, t, e = void 0 === e ? E : e);
    }, I);
    function I(t) {
        t = T.call(this, t || 'AudioHtml5Reader') || this;
        return t.mAudioContextClass = null, t.mAudioContext = null, t.mAudioFormat = "mp3", 
        t.mOnAudioReadFunc = null, t;
    }
    var L, H = (e(D, L = o.ErrorBase), D.prototype.init = function(t) {
        var e = this;
        try {
            window && (window.ononline = function() {
                return e._onOnline();
            }, window.onoffline = function() {
                return e._onOffline();
            });
        } catch (t) {
            return this.exception('init', t), -1;
        }
        return this.mInitFlag = !0, 0;
    }, D.prototype.isInit = function() {
        return this.mInitFlag;
    }, D.prototype.done = function() {
        return window.ononline = null, window.onoffline = null, this.mOnOnlineFunc = null, 
        this.mOnOfflineFunc = null, this.mOnErrorFunc = null, this.mInitFlag = !1, 0;
    }, D.prototype.isOnline = function() {
        return !!navigator && navigator.onLine;
    }, Object.defineProperty(D.prototype, "onOnline", {
        set: function(t) {
            this.mOnOnlineFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(D.prototype, "onOffline", {
        set: function(t) {
            this.mOnOfflineFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(D.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), D.prototype._onOnline = function() {
        if ('function' == typeof this.mOnOnlineFunc) try {
            return this.mOnOnlineFunc();
        } catch (t) {
            return this.exception('_onOnline', t), -1;
        }
        return 0;
    }, D.prototype._onOffline = function() {
        if ('function' == typeof this.mOnOfflineFunc) try {
            return this.mOnOfflineFunc();
        } catch (t) {
            return this.exception('_onOffline', t), -1;
        }
        return 0;
    }, D.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION NetHtml5Connect._onError: ', t.message), 
            -1;
        }
        return 0;
    }, D);
    function D(t) {
        var e = L.call(this, t || 'NetHtml5Connect') || this;
        return e.mInitFlag = !1, e.mOnOnlineFunc = null, e.mOnOfflineFunc = null, e.mOnErrorFunc = null, 
        e.setErrorOutputFunc(function(t) {
            return e._onError(new Error(t));
        }), e;
    }
    var U, X = 'WebSocketFactory', q = 'WebSocket', G = (e(j, U = o.Factory), j.prototype.isMock = function() {
        return !1;
    }, j.prototype.getType = function() {
        return q;
    }, j.prototype.getName = function() {
        return X;
    }, j.prototype.create = function(t, e, o) {
        try {
            return window.WebSocket || null;
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, j);
    function j(t, e) {
        return U.call(this, t || X, e = void 0 === e ? !0 : e) || this;
    }
    var Y, z = (e(K, Y = o.ErrorBase), K.prototype.init = function(t) {
        return this._detectWebSocket() ? (t && t.connectInfiniteFlag && (this.mConnectInfiniteFlag = !0, 
        this.isErrorOutput() && console.log('NetHtml5WebSocket.init: ConnectInfinite eingeschaltet')), 
        0) : -1;
    }, K.prototype.done = function() {
        return this.mWebSocket && (this.mWebSocket.onopen = null, this.mWebSocket.onclose = null, 
        this.mWebSocket.onmessage = null, this.mWebSocket.onerror = null, this.close(), 
        this.mWebSocket = null), this.mWebSocketOpenFlag = !1, this.mWebSocketClass = null, 
        this.mWebSocketUrl = '', this.mConnectInfiniteFlag = !1, this.mConnectIntervalId = 0, 
        this.mConnectIntervalTimeout = 5e3, this.mOnOpenFunc = null, this.mOnCloseFunc = null, 
        this.mOnMessageFunc = null, this.mOnErrorFunc = null, 0;
    }, K.prototype.isInit = function() {
        return !!this.mWebSocketClass;
    }, K.prototype._detectWebSocket = function() {
        var t = o.FactoryManager.get(X, G);
        if (!t) return this.error('_detectWebSocket', 'keine WebSocket-Fabrik vorhanden'), 
        !1;
        try {
            this.mWebSocketClass = t.create();
        } catch (t) {
            return this.exception('_detectWebSocket', t), !1;
        }
        return null !== this.mWebSocketClass || (this.error('_detectWebSocket', 'keine WebSocketClass vorhanden'), 
        !1);
    }, K.prototype.open = function(t) {
        return this.isOpen() ? (this.error('open', 'bereits geoeffnet'), -1) : this._connect(t);
    }, K.prototype.close = function() {
        if (this.mWebSocketOpenFlag = !1, this.mWebSocket) {
            this._clearInfiniteConnect();
            try {
                this.mWebSocket.close(1e3, 'Closing normally');
            } catch (t) {
                return this.exception('close', t), this.mWebSocket = null, -1;
            }
        }
        return 0;
    }, K.prototype.isOpen = function() {
        return this.mWebSocketOpenFlag;
    }, K.prototype.isConnect = function() {
        return !(!this.mWebSocket || 1 !== this.mWebSocket.readyState);
    }, K.prototype.getState = function() {
        if (!this.mWebSocket) return 'NULL';
        var t = '';
        switch (this.mWebSocket.readyState) {
          case 0:
            t = 'CONNECTING';
            break;

          case 1:
            t = 'OPEN';
            break;

          case 2:
            t = 'CLOSING';
            break;

          case 3:
            t = 'CLOSED';
            break;

          default:
            t = 'UNKNOW';
        }
        return t;
    }, K.prototype.sendMessage = function(t) {
        if (!this.isOpen()) return this.error('sendMessage', 'WebSocket ist nicht geoeffnet'), 
        -1;
        if (!this.mWebSocket) return this.error('sendMessage', 'keine WebSocket vorhanden'), 
        -1;
        try {
            return this.mWebSocket.send(JSON.stringify(t)), 0;
        } catch (t) {
            return this.exception('sendMessage', t), -1;
        }
    }, K.prototype.sendStream = function(t) {
        if (!this.isOpen()) return this.error('sendStream', 'WebSocket ist nicht geoeffnet'), 
        -1;
        if (!this.mWebSocket) return this.error('sendStream', 'keine WebSocket vorhanden'), 
        -1;
        try {
            return this.mWebSocket.send(t), 0;
        } catch (t) {
            return this.exception('sendStream', t), -1;
        }
    }, Object.defineProperty(K.prototype, "webSocket", {
        get: function() {
            return this.mWebSocket;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(K.prototype, "webSocketUrl", {
        get: function() {
            return this.mWebSocketUrl;
        },
        set: function(t) {
            this.mWebSocketUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(K.prototype, "onOpen", {
        set: function(t) {
            this.mOnOpenFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(K.prototype, "onClose", {
        set: function(t) {
            this.mOnCloseFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(K.prototype, "onMessage", {
        set: function(t) {
            this.mOnMessageFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(K.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), K.prototype._onOpen = function() {
        if ('function' == typeof this.mOnOpenFunc) try {
            return this.mOnOpenFunc(this.mWebSocketUrl);
        } catch (t) {
            return this.exception('_onOpen', t), -1;
        }
        return 0;
    }, K.prototype._onClose = function() {
        if ('function' == typeof this.mOnCloseFunc) try {
            return this.mOnCloseFunc();
        } catch (t) {
            return this.exception('_onClose', t), -1;
        }
        return 0;
    }, K.prototype._onMessage = function(t) {
        if ('function' == typeof this.mOnMessageFunc) try {
            return this.mOnMessageFunc(t);
        } catch (t) {
            return this.exception('_onMessage', t), -1;
        }
        return 0;
    }, K.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            var e = t;
            return 'error' === t.type && this.mWebSocket && 3 === this.mWebSocket.readyState && (e = new Error('Verbindung wurde nicht aufgebaut')), 
            this.mOnErrorFunc(e);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION Plugin._onError: ', t.message), 
            -1;
        }
        return 0;
    }, K.prototype._webSocketOpen = function(t) {
        return this.mWebSocketOpenFlag = !0, this._clearInfiniteConnect(), 0 !== this._onMessage({
            data: '{ "event": "start" }'
        }) || 0 !== this._onOpen() ? -1 : 0;
    }, K.prototype._webSocketClose = function(t) {
        return this.mWebSocketOpenFlag = !1, this.mWebSocket = null, this._setInfiniteConnect(), 
        this._onClose();
    }, K.prototype._webSocketMessage = function(t) {
        try {
            return this._onMessage(t);
        } catch (t) {
            return this.exception('_webSocketMessage', t), -1;
        }
    }, K.prototype._webSocketError = function(t) {
        return this._onError(new Error('WebSocket wurde nicht verbunden'));
    }, K.prototype._connect = function(t) {
        var e = this;
        if (this.isOpen()) return 0;
        if (this.mWebSocket) return this.error('_connect', 'webSocket noch nicht geschlossen'), 
        -1;
        if (!this.mWebSocketClass) return this.error('_connect', 'keine WebSocketClass vorhanden'), 
        -1;
        if (t && (this.mWebSocketUrl = t), !this.mWebSocketUrl) return this.error('_connect', 'keine WebSocketUrl vorhanden'), 
        -1;
        try {
            return (this.mWebSocket = new this.mWebSocketClass(this.mWebSocketUrl), this.mWebSocket) ? (this.mWebSocket.binaryType = 'arraybuffer', 
            this.mWebSocket.onopen = function(t) {
                return e._webSocketOpen(t);
            }, this.mWebSocket.onclose = function(t) {
                return e._webSocketClose(t);
            }, this.mWebSocket.onmessage = function(t) {
                return e._webSocketMessage(t);
            }, this.mWebSocket.onerror = function(t) {
                return e._webSocketError(t);
            }, 0) : (this.error('_connect', 'keine WebSocket erzeugt'), -1);
        } catch (t) {
            return this.exception('_connect', t), this.mWebSocket = null, -1;
        }
    }, K.prototype._setInfiniteConnect = function() {
        var t = this;
        this.mConnectInfiniteFlag && 0 === this.mConnectIntervalId && (this.mConnectIntervalId = setInterval(function() {
            t._connect(t.mWebSocketUrl);
        }, this.mConnectIntervalTimeout));
    }, K.prototype._clearInfiniteConnect = function() {
        0 !== this.mConnectIntervalId && (clearInterval(this.mConnectIntervalId), this.mConnectIntervalId = 0);
    }, K);
    function K(t) {
        var e = Y.call(this, t || 'NetHtml5WebSocket') || this;
        return e.mWebSocketClass = null, e.mWebSocketUrl = '', e.mWebSocket = null, e.mWebSocketOpenFlag = !1, 
        e.mConnectInfiniteFlag = !1, e.mConnectIntervalId = 0, e.mConnectIntervalTimeout = 5e3, 
        e.mOnOpenFunc = null, e.mOnCloseFunc = null, e.mOnMessageFunc = null, e.mOnErrorFunc = null, 
        e.setErrorOutputFunc(function(t) {
            return e._onError(new Error(t));
        }), e;
    }
    var V, Q = 'SpeechRecognitionFactory', J = 'SpeechRecognition', Z = 'SpeechGrammar', $ = (e(tt, V = o.Factory), 
    tt.prototype.isMock = function() {
        return !1;
    }, tt.prototype.getType = function() {
        return J;
    }, tt.prototype.getName = function() {
        return Q;
    }, tt.prototype.create = function(t, e, o) {
        t = t || J;
        try {
            return t === J ? window.SpeechRecognition || window.webkitSpeechRecognition || null : t === Z && (window.SpeechGrammarList || window.webkitSpeechGrammarList) || null;
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, tt.prototype.getSpeechRecognitionClass = function() {
        return this.create();
    }, tt.prototype.getSpeechGrammarListClass = function() {
        return this.create(Z);
    }, tt);
    function tt(t, e) {
        return V.call(this, t || Q, e = void 0 === e ? !0 : e) || this;
    }
    var et, ot = 'SpeechSynthesisFactory', nt = 'SpeechSynthesis', rt = 'SpeechUtterance', it = (e(ut, et = o.Factory), 
    ut.prototype.isMock = function() {
        return !1;
    }, ut.prototype.getType = function() {
        return nt;
    }, ut.prototype.getName = function() {
        return ot;
    }, ut.prototype.create = function(t, e, o) {
        t = t || nt;
        try {
            return t === nt ? window.speechSynthesis || null : t === rt && (window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance) || null;
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, ut.prototype.getSpeechSynthesis = function() {
        return this.create();
    }, ut.prototype.getSpeechSynthesisUtteranceClass = function() {
        return this.create(rt);
    }, ut);
    function ut(t, e) {
        return et.call(this, t || ot, e = void 0 === e ? !0 : e) || this;
    }
    var ct, st = 'WebWorkerFactory', at = 'WebWorker', ht = (e(lt, ct = o.Factory), 
    lt.prototype.isMock = function() {
        return !1;
    }, lt.prototype.getType = function() {
        return at;
    }, lt.prototype.getName = function() {
        return st;
    }, lt.prototype.create = function(t, e, o) {
        try {
            return window.Worker || null;
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, lt.prototype.getWebWorkerClass = function() {
        return this.create();
    }, lt.prototype.createWebWorker = function(t) {
        var e = this.getWebWorkerClass();
        if (!e) return null;
        try {
            return new e(t);
        } catch (t) {
            return this.exception('createWebWorker', t), null;
        }
    }, lt);
    function lt(t, e) {
        return ct.call(this, t || st, e = void 0 === e ? !0 : e) || this;
    }
    var dt, pt = 'UserMediaFactory', ft = 'UserMedia', mt = (e(yt, dt = o.Factory), 
    yt.prototype.isMock = function() {
        return !1;
    }, yt.prototype.getType = function() {
        return ft;
    }, yt.prototype.getName = function() {
        return pt;
    }, yt.prototype.create = function(t, e, o) {
        try {
            if (void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia) {
                var n = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || null;
                if (!n) return null;
                navigator.mediaDevices.getUserMedia = function(o) {
                    return new Promise(function(t, e) {
                        n.call(navigator, o, t, e);
                    });
                };
            }
            return function(t) {
                return navigator.mediaDevices.getUserMedia(t);
            };
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, yt);
    function yt(t, e) {
        return dt.call(this, t || pt, e = void 0 === e ? !0 : e) || this;
    }
    var St = "DE", At = 'undefine Error', gt = ((Ot = {})[0] = 'kein Fehler', Ot[1] = 'undefinierter Fehler', 
    Ot[2] = 'kein setDialog', Ot[3] = 'kein startDialog', Ot[4] = 'kein stopDialog', 
    Ot[5] = 'kein loadDialogFile', Ot[6] = 'kein writeDialogData', Ot[7] = 'kein setting', 
    Ot[8] = 'kein setState', Ot[9] = 'kein setStateContext', Ot[10] = 'kein skipNextSpeak', 
    Ot[11] = 'Exception aufgetreten', Ot[12] = 'keine gueltige Nachricht', Ot), Et = ((Ct = {})[0] = 'no Error', 
    Ct[1] = At, Ct[2] = 'no setDialog', Ct[3] = 'no startDialog', Ct[4] = 'no stopDialog', 
    Ct[5] = 'no loadDialogFile', Ct[6] = 'no writeDialogData', Ct[7] = 'no setting', 
    Ct[8] = 'no setState', Ct[9] = 'no setStateContext', Ct[10] = 'no skipNextSpeak', 
    Ct[11] = 'throw exception', Ct[12] = 'invalid message', Ct);
    var Ot = Object.freeze({
        __proto__: null,
        SPEECH_ERROR_ENGLISH: "EN",
        SPEECH_ERROR_GERMAN: "DE",
        SPEECH_NO_ERROR: 0,
        SPEECH_UNDEFINE_ERROR: 1,
        SPEECH_NOSETDIALOG_ERROR: 2,
        SPEECH_NOSTARTDIALOG_ERROR: 3,
        SPEECH_NOSTOPDIALOG_ERROR: 4,
        SPEECH_NOLOADDIALOGFILE_ERROR: 5,
        SPEECH_NOWRITEDIALOGDATA_ERROR: 6,
        SPEECH_NOSETTING_ERROR: 7,
        SPEECH_NOSETSTATE_ERROR: 8,
        SPEECH_NOSETSTATECONTEXT_ERROR: 9,
        SPEECH_NOSKIPNEXTSPEAK_ERROR: 10,
        SPEECH_EXCEPTION_ERROR: 11,
        SPEECH_INVALIDMESSAGE_ERROR: 12,
        SPEECH_UNDEFINE_ERRORTEXT: At,
        setErrorLanguage: function(t) {
            return St = "EN" === t ? "EN" : "DE";
        },
        getErrorText: function(t) {
            var e = Math.abs(t);
            return (t = "EN" === St ? Et : gt)[e] || t[1] || At;
        }
    }), Ct = (_t.getBrowserName = function() {
        var t = '', e = navigator.userAgent;
        return 'undefined' != typeof InstallTrigger ? t = 'Firefox' : document.documentMode ? t = 'IE' : window.safari ? t = 'Safari' : window.chrome && e.match(/OPR/) ? t = 'Opera' : window.chrome && e.match(/Edge/) ? t = 'Edge' : window.chrome && e.match(/Edg/) ? t = 'Edge2' : window.chrome && !e.match(/(OPR|Edge|Edg)/) && (t = 'Chrome'), 
        t;
    }, _t);
    function _t() {}
    t.AUDIOCONTEXT_FACTORY_NAME = x, t.AUDIOCONTEXT_TYPE_NAME = M, t.AudioCodec = c, 
    t.AudioContextFactory = w, t.AudioContextManager = N, t.AudioHtml5Reader = B, t.AudioPlayer = p, 
    t.AudioRecorder = y, t.AudioResampler = a, t.FileHtml5Reader = R, t.NET_CONNECTINTERVAL_TIMEOUT = 5e3, 
    t.NetHtml5Connect = H, t.NetHtml5WebSocket = z, t.PCM_L16CodecArray = i, t.SPEECHRECOGNITION_FACTORY_NAME = Q, 
    t.SPEECHRECOGNITION_GRAMMAR_NAME = Z, t.SPEECHRECOGNITION_TYPE_NAME = J, t.SPEECHSYNTHESIS_FACTORY_NAME = ot, 
    t.SPEECHSYNTHESIS_TYPE_NAME = nt, t.SPEECHSYNTHESIS_UTTERANCE_NAME = rt, t.SpeechBrowser = Ct, 
    t.SpeechError = Ot, t.SpeechRecognitionFactory = $, t.SpeechSynthesisFactory = it, 
    t.USERMEDIA_FACTORY_NAME = pt, t.USERMEDIA_TYPE_NAME = ft, t.UserMediaFactory = mt, 
    t.WEBSOCKET_FACTORY_NAME = X, t.WEBSOCKET_TYPE_NAME = q, t.WEBWORKER_FACTORY_NAME = st, 
    t.WEBWORKER_TYPE_NAME = at, t.WebSocketFactory = G, t.WebWorkerFactory = ht, t.XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE = E, 
    t.XMLHTTPREQUEST_FACTORY_NAME = O, t.XMLHTTPREQUEST_TEXT_RESPONSETYPE = g, t.XMLHTTPREQUEST_TYPE_NAME = C, 
    t.XMLHttpRequestFactory = _, Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
