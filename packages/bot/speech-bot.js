/**
 * Speech-Bot Bundle
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
    'object' == typeof exports && 'undefined' != typeof module ? e(exports, require('@speech/core'), require('@speech/audio'), require('@speech/speak'), require('@speech/listen'), require('@speech/action'), require('@speech/dialog'), require('@speech/base'), require('@speech/service')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/audio', '@speech/speak', '@speech/listen', '@speech/action', '@speech/dialog', '@speech/base', '@speech/service' ], e) : e((t = 'undefined' != typeof globalThis ? globalThis : t || self).speechBot = {}, t.speechCore, t.speechAudio, t.speechSpeak, t.speechListen, t.speechAction, t.speechDialog, t.speechBase, t.speechService);
}(this, function(t, o, p, s, l, u, c, e, n) {
    'use strict';
    var i = o.SPEECH_VERSION_NUMBER, r = o.SPEECH_VERSION_BUILD, a = o.SPEECH_VERSION_TYPE, m = i + '.' + r + ' vom ' + o.SPEECH_VERSION_DATE + ' (' + a + ')', h = '1.0', g = 'BotComponentFactory', E = 'Bot', f = 'BotComponent', v = 'BotService', D = function(t, e) {
        return (D = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        })(t, e);
    };
    function d(t, e) {
        function o() {
            this.constructor = t;
        }
        D(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
        new o());
    }
    var S, y = (d(A, S = e.BaseComponent), A.prototype.getType = function() {
        return E;
    }, A.prototype.getClass = function() {
        return 'BotComponent';
    }, A.prototype.getVersion = function() {
        return m;
    }, A.prototype.getApiVersion = function() {
        return h;
    }, A.prototype.getServerVersion = function() {
        return this.mDialog ? this.mDialog.getServerVersion() : '';
    }, A.prototype._initAllPlugin = function() {
        return this.mAudioPlayer = this.findPlugin(p.AUDIOPLAYER_PLUGIN_NAME), this.mSpeak = this.findPlugin(s.SPEAK_COMPONENT_NAME), 
        this.mListen = this.findPlugin(l.LISTEN_COMPONENT_NAME), this.mAction = this.findPlugin(u.ACTION_COMPONENT_NAME), 
        this.mDialog = this.findPlugin(c.DIALOG_COMPONENT_NAME), this.mDialog ? 0 : (this.error('_initAllPlugin', 'keine Dialog-Komponente vorhanden'), 
        this._clearInit(), -1);
    }, A.prototype.init = function(t) {
        return S.prototype.init.call(this, t);
    }, A.prototype._doneAllPlugin = function() {
        this.mAudioPlayer = null, this.mSpeak = null, this.mListen = null, this.mAction = null, 
        this.mDialog = null;
    }, A.prototype._doneAllAttribute = function() {
        this.mSpeakEnableFlag = !0, this.mListenEnableFlag = !0, this.mActionEnableFlag = !0;
    }, A.prototype._resetAllDefault = function() {
        this.mSpeakEnableFlag = !0, this.mListenEnableFlag = !0, this.mActionEnableFlag = !0;
    }, A.prototype.reset = function(t) {
        return 0 !== S.prototype.reset.call(this, t) ? -1 : this.mDialog ? this.mDialog.reset(t) : 0;
    }, A.prototype.isActive = function() {
        return !!this.mDialog && S.prototype.isActive.call(this);
    }, A.prototype.setActiveOn = function() {
        return this.mDialog ? S.prototype.setActiveOn.call(this) : -1;
    }, A.prototype.connect = function() {
        return 0;
    }, A.prototype.isConnect = function() {
        return !1;
    }, A.prototype.getNetType = function() {
        return 'undefined';
    }, A.prototype.addDialogSetEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSET_EVENT, e);
    }, A.prototype.addDialogJsonEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGJSON_EVENT, e);
    }, A.prototype.addDialogParseEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGPARSE_EVENT, e);
    }, A.prototype.addDialogStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSTART_EVENT, e);
    }, A.prototype.addDialogStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSTOP_EVENT, e);
    }, A.prototype.addDialogStateSetEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSTATESET_EVENT, e);
    }, A.prototype.addDialogActionEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGACTION_EVENT, e);
    }, A.prototype.addDialogActionStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGACTIONSTOP_EVENT, e);
    }, A.prototype.addDialogSpeakEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSPEAK_EVENT, e);
    }, A.prototype.addDialogSpeakStartEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSPEAKSTART_EVENT, e);
    }, A.prototype.addDialogSpeakStopEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_DIALOGSPEAKSTOP_EVENT, e);
    }, A.prototype.addErrorEvent = function(t, e) {
        return this.addEventListener(t, o.SPEECH_ERROR_EVENT, e);
    }, A.prototype.removeDialogSetEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSET_EVENT);
    }, A.prototype.removeDialogJsonEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGJSON_EVENT);
    }, A.prototype.removeDialogParseEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGPARSE_EVENT);
    }, A.prototype.removeDialogStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSTART_EVENT);
    }, A.prototype.removeDialogStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSTOP_EVENT);
    }, A.prototype.removeDialogStateSetEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSTATESET_EVENT);
    }, A.prototype.removeDialogActionEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGACTION_EVENT);
    }, A.prototype.removeDialogActionStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGACTIONSTOP_EVENT);
    }, A.prototype.removeDialogSpeakEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSPEAK_EVENT);
    }, A.prototype.removeDialogSpeakStartEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSPEAKSTART_EVENT);
    }, A.prototype.removeDialogSpeakStopEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_DIALOGSPEAKSTOP_EVENT);
    }, A.prototype.removeErrorEvent = function(t) {
        return this.removeEventListener(t, o.SPEECH_ERROR_EVENT);
    }, A.prototype.removeAllEvent = function(t) {
        var e = S.prototype.removeAllEvent.call(this, t);
        return this.mDialog && 0 !== this.mDialog.removeAllEvent(t) && (e = -1), this.removeErrorEvent(t), 
        e;
    }, A.prototype._dialogSpeak = function(t) {
        return this.isActive() && this.isSpeak() ? (this.mSpeak.setText(t.text), this.mSpeak.setAudioFileName(t.id), 
        this.mSpeak.start()) : 0;
    }, A.prototype._dialogSpeakStop = function() {
        return this.isActive() && this.isSpeak() ? this.mSpeak.stop() : 0;
    }, A.prototype.getDialogSpeakFunc = function() {
        var e = this;
        return function(t) {
            return e._dialogSpeak(t);
        };
    }, A.prototype.getDialogSpeakStopFunc = function() {
        var t = this;
        return function() {
            return t._dialogSpeakStop();
        };
    }, A.prototype._dialogAction = function(t) {
        if (this.isActive() && this.isAction()) {
            t = {
                action: t.action,
                type: t.type,
                id: t.id
            };
            return this.mAction.startAction(t);
        }
        return 0;
    }, A.prototype._dialogActionStop = function() {
        return this.isActive() && this.isAction() ? this.mAction.stop() : 0;
    }, A.prototype.getDialogActionFunc = function() {
        var e = this;
        return function(t) {
            return e._dialogAction(t);
        };
    }, A.prototype.getDialogActionStopFunc = function() {
        var t = this;
        return function() {
            return t._dialogActionStop();
        };
    }, A.prototype.isSpeak = function() {
        return !(!this.mSpeakEnableFlag || !this.mSpeak) && this.mSpeak.isActive();
    }, A.prototype.setSpeakOn = function() {
        return this.mSpeak ? (this.mSpeakEnableFlag = !0, 0) : -1;
    }, A.prototype.setSpeakOff = function() {
        return this.mSpeak ? (this.mSpeakEnableFlag = !1, 0) : -1;
    }, A.prototype.getSpeak = function() {
        return this.mSpeak;
    }, A.prototype.isListen = function() {
        return !(!this.mListenEnableFlag || !this.mListen) && this.mListen.isActive();
    }, A.prototype.setListenOn = function() {
        return this.mListen ? (this.mListenEnableFlag = !0, 0) : -1;
    }, A.prototype.setListenOff = function() {
        return this.mListen ? (this.mListenEnableFlag = !1, 0) : -1;
    }, A.prototype.getListen = function() {
        return this.mListen;
    }, A.prototype.isAction = function() {
        return !(!this.mActionEnableFlag || !this.mAction) && this.mAction.isActive();
    }, A.prototype.setActionOn = function() {
        return this.mAction ? (this.mActionEnableFlag = !0, 0) : -1;
    }, A.prototype.setActionOff = function() {
        return this.mAction ? (this.mActionEnableFlag = !1, 0) : -1;
    }, A.prototype.getAction = function() {
        return this.mAction;
    }, A.prototype.transformJsonFile = function(t) {
        return this.isActive() ? this.mDialog.transformJsonFile(t) : (this.error('transformJsonFile', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.transformJsonData = function(t) {
        return this.isActive() ? this.mDialog.transformJsonData(t) : (this.error('transformJsonData', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.parseSpeechDefFile = function(t) {
        return this.isActive() ? this.mDialog.parseSpeechDefFile(t) : (this.error('parseSpeechDefFile', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.parseSpeechDefData = function(t) {
        return this.isActive() ? this.mDialog.parseSpeechDefData(t) : (this.error('parseSpeechDefData', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.setDialogFilePath = function(t) {
        return this.isActive() ? this.mDialog.setDialogFilePath(t) : (this.error('setDialogFilePath', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.getDialogFilePath = function() {
        return this.mDialog ? this.mDialog.getDialogFilePath() : (this.error('getDialogFilePath', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, A.prototype.setDialogFileName = function(t) {
        return this.isActive() ? this.mDialog.setDialogFileName(t) : (this.error('setDialogFileName', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.getDialogFileName = function() {
        return this.mDialog ? this.mDialog.getDialogFileName() : (this.error('getDialogFileName', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, A.prototype.loadDialogFile = function(t) {
        return this.isActive() ? this.mDialog.loadDialogFile(t) : (this.error('loadDialogFile', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.writeDialogData = function(t) {
        return this.isActive() ? this.mDialog.writeDialogData(t) : (this.error('writeDialogData', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.clearDialog = function() {
        return this.isActive() ? this.mDialog.clearDialog() : (this.error('clearDialog', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.setDialog = function(t) {
        return this.isActive() ? this.mDialog.setDialog(t) : (this.error('setDialog', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.getDialog = function() {
        return this.mDialog ? this.mDialog.getDialog() : (this.error('getDialog', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, A.prototype.isRunning = function() {
        return !!this.mDialog && this.mDialog.isRunning();
    }, A.prototype.toggleDialog = function() {
        return this.isActive() ? this.mDialog.toggleDialog() : (this.error('toggleDialog', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.start = function() {
        return this.isActive() ? this.mDialog.start() : (this.error('start', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.stop = function() {
        return this.isActive() ? this.mDialog.stop() : (this.error('stop', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.setDialogState = function(t, e) {
        return this.isActive() ? this.mDialog.setDialogState(t, e) : (this.error('setDialogState', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.getDialogState = function() {
        return this.mDialog ? this.mDialog.getDialogState() : (this.error('getDialogState', 'keine Dialog-Komponente vorhanden'), 
        '');
    }, A.prototype.setDialogStateContext = function(t) {
        return this.isActive() ? this.mDialog.setDialogStateContext(t) : (this.error('setDialogStateContext', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.skipNextSpeak = function() {
        return this.isActive() ? 0 : (this.error('skipNextSpeak', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.clearContext = function() {
        return this.isActive() ? this.mDialog.clearContext() : (this.error('clearContext', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.addContextElement = function(t, e) {
        return this.isActive() ? this.mDialog.addContextElement(t, e) : (this.error('addContextElement', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A.prototype.removeContextElement = function(t, e) {
        return this.isActive() ? this.mDialog.removeContextElement(t, e) : (this.error('removeContextElement', 'Komponente ist nicht aktiviert'), 
        -1);
    }, A);
    function A(t, e) {
        e = S.call(this, (t = void 0 === t ? '' : t) || f, e = void 0 === e ? !0 : e) || this;
        return e.mAudioPlayer = null, e.mSpeak = null, e.mListen = null, e.mAction = null, 
        e.mDialog = null, e.mSpeakEnableFlag = !0, e.mListenEnableFlag = !0, e.mActionEnableFlag = !0, 
        e;
    }
    var B, C = (d(_, B = o.PluginFactory), _.prototype.getType = function() {
        return E;
    }, _.prototype.getName = function() {
        return g;
    }, _.prototype._newPlugin = function(t, e, o) {
        return new y(t, o);
    }, _.prototype.create = function(t, e, o) {
        void 0 === o && (o = !0);
        t = t || f, e = (e = void 0 === e ? '' : e) || f;
        try {
            return this._newPlugin(t, e, o);
        } catch (t) {
            return this.exception('create', t), null;
        }
    }, _);
    function _() {
        return B.call(this, 'BotComponentFactory') || this;
    }
    var k, O = (d(P, k = o.Builder), P.prototype.getClass = function() {
        return 'BotComponentBuilder';
    }, P.prototype.getType = function() {
        return E;
    }, P.prototype.build = function(t) {
        var e = this._getComponentName(t) || f;
        if (e = this._findComponent(e)) return e;
        try {
            var e = this._buildComponent(t), o = this._getComponent({
                componentName: c.DIALOG_COMPONENT_NAME
            }, c.DIALOG_TYPE_NAME, c.DialogComponentBuilder), n = this._getComponent({
                componentName: u.ACTION_COMPONENT_NAME
            }, u.ACTION_TYPE_NAME, u.ActionComponentBuilder), i = this._getComponent({
                componentName: l.LISTEN_COMPONENT_NAME
            }, l.LISTEN_TYPE_NAME, l.ListenComponentBuilder), r = this._getComponent({
                componentName: s.SPEAK_COMPONENT_NAME
            }, s.SPEAK_TYPE_NAME, s.SpeakComponentBuilder), a = this._getPlugin(p.AUDIOPLAYER_PLUGIN_NAME, p.AUDIOPLAYER_PLUGIN_NAME, p.AUDIOPLAYER_FACTORY_NAME, p.AudioPlayerFactory);
            return 0 !== this._binder(e, o, n, i, r, a) ? (this.error('build', 'Komponenten nicht verbunden'), 
            null) : e;
        } catch (t) {
            return this.exception('build', t), null;
        }
    }, P.prototype._buildComponent = function(t) {
        var e = this._getComponentName(t) || f, t = this._getComponentClass(t) || f;
        return this._getPlugin(e, t, g, C);
    }, P.prototype._binder = function(t, e, o, n, i, r) {
        return t ? e ? o ? n ? i ? r ? 0 !== t.insertPlugin(r.getName(), r) ? (this.error('_binder', 'AudioPlayer-Plugin wurde nicht eingefuegt'), 
        -1) : 0 !== t.insertPlugin(i.getName(), i) ? (this.error('_binder', 'Speak-Komponente wurde nicht eingefuegt'), 
        -1) : 0 !== t.insertPlugin(n.getName(), n) ? (this.error('_binder', 'Listen-Komponente wurde nicht eingefuegt'), 
        -1) : 0 !== t.insertPlugin(o.getName(), o) ? (this.error('_binder', 'Action-Komponente wurde nicht eingefuegt'), 
        -1) : 0 !== t.insertPlugin(e.getName(), e) ? (this.error('_binder', 'Dialog-Komponente wurde nicht eingefuegt'), 
        -1) : 0 !== e.addDialogActionEvent(f, t.getDialogActionFunc()) || 0 !== e.addDialogActionStopEvent(f, t.getDialogActionStopFunc()) || 0 !== e.addDialogSpeakEvent(f, t.getDialogSpeakFunc()) || 0 !== e.addDialogSpeakStopEvent(f, t.getDialogSpeakStopFunc()) ? -1 : 0 : (this.error('_binder', 'Kein AudioPlayer-Plugin vorhanden'), 
        -1) : (this.error('_binder', 'Keine Speak-Komponente vorhanden'), -1) : (this.error('_binder', 'Keine Listen-Komponente vorhanden'), 
        -1) : (this.error('_binder', 'Keine Action-Komponente vorhanden'), -1) : (this.error('_binder', 'Keine Dialog-Komponente vorhanden'), 
        -1) : (this.error('_binder', 'Keine Bot-Komponente vorhanden'), -1);
    }, P);
    function P(t, e) {
        return k.call(this, t || E, e = void 0 === e ? !0 : e) || this;
    }
    var N, F = (d(b, N = e.Base), b.prototype._getBuilderName = function() {
        return E;
    }, b.prototype.addDialogSetEvent = function(t, e) {
        return this.mBotComponent.addDialogSetEvent(t, e);
    }, b.prototype.addDialogJsonEvent = function(t, e) {
        return this.mBotComponent.addDialogJsonEvent(t, e);
    }, b.prototype.addDialogParseEvent = function(t, e) {
        return this.mBotComponent.addDialogParseEvent(t, e);
    }, b.prototype.addDialogStartEvent = function(t, e) {
        return this.mBotComponent.addDialogStartEvent(t, e);
    }, b.prototype.addDialogStopEvent = function(t, e) {
        return this.mBotComponent.addDialogStopEvent(t, e);
    }, b.prototype.addDialogStateSetEvent = function(t, e) {
        return this.mBotComponent.addDialogStateSetEvent(t, e);
    }, b.prototype.addDialogActionEvent = function(t, e) {
        return this.mBotComponent.addDialogActionEvent(t, e);
    }, b.prototype.addDialogActionStopEvent = function(t, e) {
        return this.mBotComponent.addDialogActionStopEvent(t, e);
    }, b.prototype.addDialogSpeakEvent = function(t, e) {
        return this.mBotComponent.addDialogSpeakEvent(t, e);
    }, b.prototype.addDialogSpeakStartEvent = function(t, e) {
        return this.mBotComponent.addDialogSpeakStartEvent(t, e);
    }, b.prototype.addDialogSpeakStopEvent = function(t, e) {
        return this.mBotComponent.addDialogSpeakStopEvent(t, e);
    }, b.prototype.addErrorEvent = function(t, e) {
        return this.mBotComponent.addErrorEvent(t, e);
    }, b.prototype.removeDialogSetEvent = function(t) {
        return this.mBotComponent.removeDialogSetEvent(t);
    }, b.prototype.removeDialogJsonEvent = function(t) {
        return this.mBotComponent.removeDialogJsonEvent(t);
    }, b.prototype.removeDialogParseEvent = function(t) {
        return this.mBotComponent.removeDialogParseEvent(t);
    }, b.prototype.removeDialogStartEvent = function(t) {
        return this.mBotComponent.removeDialogStartEvent(t);
    }, b.prototype.removeDialogStopEvent = function(t) {
        return this.mBotComponent.removeDialogStopEvent(t);
    }, b.prototype.removeDialogStateSetEvent = function(t) {
        return this.mBotComponent.removeDialogStateSetEvent(t);
    }, b.prototype.removeDialogActionEvent = function(t) {
        return this.mBotComponent.removeDialogActionEvent(t);
    }, b.prototype.removeDialogActionStopEvent = function(t) {
        return this.mBotComponent.removeDialogActionStopEvent(t);
    }, b.prototype.removeDialogSpeakEvent = function(t) {
        return this.mBotComponent.removeDialogSpeakEvent(t);
    }, b.prototype.removeDialogSpeakStartEvent = function(t) {
        return this.mBotComponent.removeDialogSpeakStartEvent(t);
    }, b.prototype.removeDialogSpeakStopEvent = function(t) {
        return this.mBotComponent.removeDialogSpeakStopEvent(t);
    }, b.prototype.removeErrorEvent = function(t) {
        return this.mBotComponent.removeErrorEvent(t);
    }, b.prototype.removeAllEvent = function(t) {
        return this.mBotComponent.removeAllEvent(t);
    }, b.prototype.isSpeak = function() {
        return this.mBotComponent.isSpeak();
    }, b.prototype.setSpeakOn = function() {
        return this.mBotComponent.setSpeakOn();
    }, b.prototype.setSpeakOff = function() {
        return this.mBotComponent.setSpeakOff();
    }, b.prototype.getSpeak = function() {
        return this.mBotComponent.getSpeak();
    }, b.prototype.isListen = function() {
        return this.mBotComponent.isListen();
    }, b.prototype.setListenOn = function() {
        return this.mBotComponent.setListenOn();
    }, b.prototype.setListenOff = function() {
        return this.mBotComponent.setListenOff();
    }, b.prototype.getListen = function() {
        return this.mBotComponent.getListen();
    }, b.prototype.isAction = function() {
        return this.mBotComponent.isAction();
    }, b.prototype.setActionOn = function() {
        return this.mBotComponent.setActionOn();
    }, b.prototype.setActionOff = function() {
        return this.mBotComponent.setActionOff();
    }, b.prototype.getAction = function() {
        return this.mBotComponent.getAction();
    }, b.prototype.transformJsonFile = function(t) {
        return this.mBotComponent.transformJsonFile(t);
    }, b.prototype.transformJsonData = function(t) {
        return this.mBotComponent.transformJsonData(t);
    }, b.prototype.import = function(t) {
        return this.transformJsonData(t);
    }, b.prototype.parseSpeechDefFile = function(t) {
        return this.mBotComponent.parseSpeechDefFile(t);
    }, b.prototype.parseSpeechDefData = function(t) {
        return this.mBotComponent.parseSpeechDefData(t);
    }, b.prototype.clearDialog = function() {
        return this.mBotComponent.clearDialog();
    }, b.prototype.setDialog = function(t) {
        return this.mBotComponent.setDialog(t);
    }, b.prototype.getDialog = function() {
        return this.mBotComponent.getDialog();
    }, b.prototype.toggleDialog = function() {
        return this.mBotComponent.toggleDialog();
    }, b.prototype.toggle = function() {
        return this.toggleDialog();
    }, b.prototype.setDialogFilePath = function(t) {
        return this.mBotComponent.setDialogFilePath(t);
    }, b.prototype.getDialogFilePath = function() {
        return this.mBotComponent.getDialogFilePath();
    }, b.prototype.setDialogFileName = function(t) {
        return this.mBotComponent.setDialogFileName(t);
    }, b.prototype.getDialogFileName = function() {
        return this.mBotComponent.getDialogFileName();
    }, b.prototype.loadDialogFile = function(t) {
        return this.mBotComponent.loadDialogFile(t);
    }, b.prototype.parseFile = function(t) {
        return this.loadDialogFile(t);
    }, b.prototype.writeDialogData = function(t) {
        return this.mBotComponent.writeDialogData(t);
    }, b.prototype.parse = function(t) {
        return this.writeDialogData(t);
    }, b.prototype.skipNextSpeak = function() {
        return this.mBotComponent.skipNextSpeak();
    }, b.prototype.setDialogState = function(t, e) {
        return this.mBotComponent.setDialogState(t, e);
    }, b.prototype.getDialogState = function() {
        return this.mBotComponent.getDialogState();
    }, b.prototype.setState = function(t) {
        return this.setDialogState(t);
    }, b.prototype.getState = function() {
        return this.getDialogState();
    }, b.prototype.setDialogStateContext = function(t) {
        return this.mBotComponent.setDialogStateContext(t);
    }, b.prototype.setStateContext = function(t) {
        return this.setDialogStateContext(t);
    }, b.prototype.clearContext = function() {
        return this.mBotComponent.clearContext();
    }, b.prototype.addContextElement = function(t, e) {
        return this.mBotComponent.addContextElement(t, e);
    }, b.prototype.removeContextElement = function(t, e) {
        return this.mBotComponent.removeContextElement(t, e);
    }, b);
    function b(t) {
        t = N.call(this, t) || this;
        return t.mBotComponent = t.mComponent, t;
    }
    var L = (T.create = function(t, e) {
        try {
            return o.SystemManager.findBuilder(E) || 0 === o.SystemManager.insertBuilder(E, new O('', !1)) ? new F(e) : (console.log('BotFactory.create: kein Builder eingetragen'), 
            null);
        } catch (t) {
            return console.log('BotFactory.create: Exception', t.message), null;
        }
    }, T);
    function T() {}
    var K, a = {
        activeFlag: !0,
        speakFlag: !0,
        actionFlag: !0,
        dialogName: 'main',
        dialogRootState: 'home',
        dialogLoadFlag: !0,
        dialogFilePath: 'assets/',
        dialogFileName: 'speech.def',
        errorOutputFlag: !1
    }, I = !1, e = (d(x, K = n.Service), x.isConstructorInit = function() {
        return x.constructorInitFlag;
    }, x.setConstructorInitOn = function() {
        x.constructorInitFlag = !0;
    }, x.setConstructorInitOff = function() {
        x.constructorInitFlag = !1;
    }, x.getConfig = function() {
        return x.botServiceConfig;
    }, x.prototype._setOption = function(t) {
        return 0 !== K.prototype._setOption.call(this, t) ? -1 : ('boolean' == typeof t.speakFlag && (this.speak = t.speakFlag), 
        'boolean' == typeof t.actionFlag && (this.action = t.actionFlag), 'string' == typeof t.dialogName && (this.dialog = t.dialogName), 
        'string' == typeof t.dialogRootState && (this.state = t.dialogRootState), 'string' == typeof t.dialogFilePath && (this.path = t.dialogFilePath), 
        'string' == typeof t.dialogFileName && (this.file = t.dialogFileName), 0);
    }, x.prototype._createComponent = function(t, e) {
        return this.mBot = L.create(t, e), this.mBot;
    }, x.prototype.init = function(t) {
        return K.prototype.init.call(this, t);
    }, x.prototype.reset = function(t) {
        return K.prototype.reset.call(this, t);
    }, x.prototype._addAllEvent = function(t) {
        var e = this;
        return 0 !== K.prototype._addAllEvent.call(this, t) ? -1 : (this.mBot.addDialogSetEvent(t, function(t) {
            return e.mDialogSetEvent.emit(t), 0;
        }), this.mBot.addDialogJsonEvent(t, function() {
            return e.mDialogImportEvent.emit(), 0;
        }), this.mBot.addDialogParseEvent(t, function() {
            return e.mDialogParseEvent.emit(), 0;
        }), this.mBot.addDialogStartEvent(t, function() {
            return e.mDialogStartEvent.emit(), 0;
        }), this.mBot.addDialogStopEvent(t, function() {
            return e.mDialogStopEvent.emit(), 0;
        }), this.mBot.addDialogStateSetEvent(t, function(t) {
            return e.mDialogStateSetEvent.emit(t), 0;
        }), this.mBot.addDialogActionEvent(t, function(t) {
            t = {
                state: t.state,
                action: t.action,
                type: t.type,
                id: t.id
            };
            return e.mDialogActionEvent.emit(t), 0;
        }), this.mBot.addDialogActionStopEvent(t, function() {
            return e.mDialogActionStopEvent.emit(), 0;
        }), this.mBot.addDialogSpeakEvent(t, function(t) {
            t = t.text || '';
            return e.mDialogSpeakEvent.emit(t), 0;
        }), this.mBot.addDialogSpeakStopEvent(t, function() {
            return e.mDialogSpeakStopEvent.emit(), 0;
        }), 0);
    }, Object.defineProperty(x.prototype, "setDialogEvent", {
        get: function() {
            return this.mDialogSetEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "importEvent", {
        get: function() {
            return this.mDialogImportEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "parseEvent", {
        get: function() {
            return this.mDialogParseEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "startEvent", {
        get: function() {
            return this.mDialogStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "stopEvent", {
        get: function() {
            return this.mDialogStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "setStateEvent", {
        get: function() {
            return this.mDialogStateSetEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "actionEvent", {
        get: function() {
            return this.mDialogActionEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "actionStopEvent", {
        get: function() {
            return this.mDialogActionStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "speakEvent", {
        get: function() {
            return this.mDialogSpeakEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(x.prototype, "speakStopEvent", {
        get: function() {
            return this.mDialogSpeakStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.isSpeak = function() {
        return this.mBot ? this.mBot.isSpeak() : (this._error('isSpeak', 'keine Bot-Komponente vorhanden'), 
        !1);
    }, x.prototype.setSpeakOn = function() {
        return this.mBot ? this.mBot.setSpeakOn() : (this._error('setSpeakOn', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.setSpeakOff = function() {
        return this.mBot ? this.mBot.setSpeakOff() : (this._error('setSpeakOff', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, Object.defineProperty(x.prototype, "speak", {
        get: function() {
            return this.isSpeak();
        },
        set: function(t) {
            t ? this.setSpeakOn() : this.setSpeakOff();
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.isAction = function() {
        return this.mBot ? this.mBot.isAction() : (this._error('isAction', 'keine Bot-Komponente vorhanden'), 
        !1);
    }, x.prototype.setActionOn = function() {
        return this.mBot ? this.mBot.setActionOn() : (this._error('setActionOn', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.setActionOff = function() {
        return this.mBot ? this.mBot.setActionOff() : (this._error('setActionOff', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, Object.defineProperty(x.prototype, "action", {
        get: function() {
            return this.isAction();
        },
        set: function(t) {
            t ? this.setActionOn() : this.setActionOff();
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.setDialogFilePath = function(t) {
        return this.mBot ? this.mBot.setDialogFilePath(t) : (this._error('setDialogFilePath', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.getDialogFilePath = function() {
        return this.mBot ? this.mBot.getDialogFilePath() : (this._error('getDialogFilePath', 'keine Bot-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(x.prototype, "path", {
        get: function() {
            return this.getDialogFilePath();
        },
        set: function(t) {
            this.setDialogFilePath(t);
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.setDialogFileName = function(t) {
        return this.mBot ? this.mBot.setDialogFileName(t) : (this._error('setDialogFileName', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.getDialogFileName = function() {
        return this.mBot ? this.mBot.getDialogFileName() : (this._error('getDialogFileName', 'keine Bot-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(x.prototype, "file", {
        get: function() {
            return this.getDialogFileName();
        },
        set: function(t) {
            this.setDialogFileName(t);
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.clearDialog = function() {
        return this.mBot ? this.mBot.clearDialog() : (this._error('clearDialog', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.setDialog = function(t) {
        return this.mBot ? this.mBot.setDialog(t) : (this._error('setDialog', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.getDialog = function() {
        return this.mBot ? this.mBot.getDialog() : (this._error('getDialog', 'keine Bot-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(x.prototype, "dialog", {
        get: function() {
            return this.getDialog();
        },
        set: function(t) {
            this.setDialog(t);
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.import = function(t) {
        return this.mBot ? this.mBot.transformJsonData(t) : (this._error('import', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.parse = function(t) {
        return this.mBot ? this.mBot.writeDialogData(t) : (this._error('parse', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.parseFile = function(t) {
        return this.mBot ? this.mBot.loadDialogFile(t) : (this._error('parseFile', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.toggle = function() {
        return this.mBot ? this.mBot.toggleDialog() : (this._error('toggle', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.setState = function(t) {
        return this.mBot ? this.mBot.setDialogState(t) : (this._error('setState', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.getState = function() {
        return this.mBot ? this.mBot.getDialogState() : (this._error('getState', 'keine Bot-Komponente vorhanden'), 
        '');
    }, Object.defineProperty(x.prototype, "state", {
        get: function() {
            return this.getState();
        },
        set: function(t) {
            this.setState(t);
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.setStateContext = function(t) {
        return this.mBot ? this.mBot.setDialogStateContext(t) : (this._error('setStateContext', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, Object.defineProperty(x.prototype, "context", {
        set: function(t) {
            this.setStateContext(t);
        },
        enumerable: !1,
        configurable: !0
    }), x.prototype.clearContext = function() {
        return this.mBot ? this.mBot.clearContext() : (this._error('clearContext', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.addContextElement = function(t, e) {
        return this.mBot ? this.mBot.addContextElement(t, e) : (this._error('addContextElement', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.prototype.removeContextElement = function(t, e) {
        return this.mBot ? this.mBot.removeContextElement(t, e) : (this._error('removeContextElement', 'keine Bot-Komponente vorhanden'), 
        -1);
    }, x.botServiceConfig = a, x.constructorInitFlag = !0, x);
    function x() {
        var t = K.call(this, f, v, h) || this;
        if (t.mBot = null, t.mDialogSetEvent = new n.EventEmitter(I), t.mDialogImportEvent = new n.EventEmitter(I), 
        t.mDialogParseEvent = new n.EventEmitter(I), t.mDialogStartEvent = new n.EventEmitter(I), 
        t.mDialogStopEvent = new n.EventEmitter(I), t.mDialogStateSetEvent = new n.EventEmitter(I), 
        t.mDialogActionEvent = new n.EventEmitter(I), t.mDialogActionStopEvent = new n.EventEmitter(I), 
        t.mDialogSpeakEvent = new n.EventEmitter(I), t.mDialogSpeakStopEvent = new n.EventEmitter(I), 
        x.isConstructorInit() && 0 !== t.init(x.getConfig())) throw new Error('Bot nicht initialisiert');
        return 0 !== n.ServiceManager.insert(t) && console.log('BotService: wurde nicht in ServiceManager eingetragen'), 
        t;
    }
    t.BOT_API_VERSION = h, t.BOT_COMPONENTBUILDER_NAME = 'BotComponentBuilder', t.BOT_COMPONENTFACTORY_NAME = g, 
    t.BOT_COMPONENT_NAME = f, t.BOT_MOCK_NAME = 'BotMock', t.BOT_SERVICE_NAME = v, t.BOT_TYPE_NAME = E, 
    t.BOT_VERSION_STRING = m, t.Bot = F, t.BotComponent = y, t.BotComponentBuilder = O, 
    t.BotComponentFactory = C, t.BotFactory = L, t.BotService = e, t.BotServiceConfig = a, 
    Object.defineProperty(t, '__esModule', {
        value: !0
    });
});
