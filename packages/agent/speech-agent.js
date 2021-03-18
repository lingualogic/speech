/**
 * Speech-Agent Bundle
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

!function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? t(exports, require('@speech/core'), require('@speech/service'), require('@speech/common'), require('@speech/speak'), require('@speech/listen'), require('@speech/intent'), require('@speech/cloud-google'), require('@speech/cloud-rasa')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/service', '@speech/common', '@speech/speak', '@speech/listen', '@speech/intent', '@speech/cloud-google', '@speech/cloud-rasa' ], t) : t((e = 'undefined' != typeof globalThis ? globalThis : e || self).speechAgent = {}, e.speechCore, e.speechService, e.speechCommon, e.speechSpeak, e.speechListen, e.speechIntent, e.speechCloudGoogle, e.speechCloudRasa);
}(this, function(e, t, o, n, i, r, s, c, a) {
    'use strict';
    var u = function(e, t) {
        return (u = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        })(e, t);
    };
    function p(e, t) {
        function n() {
            this.constructor = e;
        }
        u(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, 
        new n());
    }
    var l, m = 'de', v = 'route', S = 'navigate', E = t.SPEECH_VERSION_NUMBER, h = t.SPEECH_VERSION_BUILD, g = t.SPEECH_VERSION_TYPE, f = E + '.' + h + ' vom ' + t.SPEECH_VERSION_DATE + ' (' + g + ')', g = (p(d, l = t.ErrorBase), 
    d.prototype.getVersion = function() {
        return f;
    }, d.prototype.isModeAllow = function(e) {
        return e === v ? this.isRouteModeAllow() : e === S && this.isNavigateModeAllow();
    }, d.prototype.getMode = function() {
        return this.assistantMode;
    }, d.prototype.isRouteModeAllow = function() {
        return !0;
    }, d.prototype.isRouteMode = function() {
        return this.assistantMode === v;
    }, d.prototype.setRouteMode = function() {
        return this.assistantMode = v, 0;
    }, d.prototype.isNavigateModeAllow = function() {
        return !1;
    }, d.prototype.isNavigateMode = function() {
        return this.assistantMode === S;
    }, d.prototype.setNavigateMode = function() {
        return this.assistantMode = S, 0;
    }, d.prototype.setWelcomeText = function(e) {
        this.welcomeText = e;
    }, d.prototype.findConfirmQuestion = function(e) {
        return '';
    }, d.prototype.start = function() {
        this.activeFlag = !0;
    }, d.prototype.stop = function(e) {
        this.activeFlag = !1;
    }, d.prototype.isInit = function() {
        return this.initFlag;
    }, d.prototype.isActive = function() {
        return this.activeFlag;
    }, d.prototype.isRunning = function() {
        return this.runningFlag;
    }, d.prototype.isMicrophone = function() {
        return this.microphoneFlag;
    }, d.prototype.setLanguage = function(e) {
        return this.language = e, 0;
    }, d.prototype.getLanguage = function() {
        return this.language;
    }, d.prototype.action = function(e) {
        return 0;
    }, d.prototype.intent = function(e) {
        return 0;
    }, d.prototype.listen = function() {
        return 0;
    }, d.prototype.stopListen = function() {
        return 0;
    }, d.prototype.isSpeak = function() {
        return this.speakFlag;
    }, d.prototype.setSpeakOff = function() {
        this.speakFlag = !1;
    }, d.prototype.setSpeakOn = function() {
        this.speakFlag = !0;
    }, d.prototype.speak = function(e, t) {
        return 0;
    }, d.prototype.stopSpeak = function() {
        return 0;
    }, d);
    function d() {
        var e = l.call(this, 'AssistantMockService') || this;
        return e.initResult = 0, e.language = m, e.assistantMode = v, e.initFlag = !0, e.activeFlag = !1, 
        e.runningFlag = !1, e.microphoneFlag = !1, e.speakFlag = !0, e.initEvent = new o.EventEmitter(), 
        e.startEvent = new o.EventEmitter(), e.stopEvent = new o.EventEmitter(), e.userStopEvent = new o.EventEmitter(), 
        e.startSpeakEvent = new o.EventEmitter(), e.stopSpeakEvent = new o.EventEmitter(), 
        e.speakEvent = new o.EventEmitter(), e.startListenEvent = new o.EventEmitter(), 
        e.stopListenEvent = new o.EventEmitter(), e.startMicrophoneEvent = new o.EventEmitter(), 
        e.stopMicrophoneEvent = new o.EventEmitter(), e.resultEvent = new o.EventEmitter(), 
        e.noMatchEvent = new o.EventEmitter(), e.startIntentEvent = new o.EventEmitter(), 
        e.stopIntentEvent = new o.EventEmitter(), e.intentEvent = new o.EventEmitter(), 
        e.contextEvent = new o.EventEmitter(), e.errorEvent = new o.EventEmitter(), e.hideEvent = new o.EventEmitter(), 
        e.welcomeText = '', e;
    }
    var k = function(e) {
        return function(e) {};
    };
    function L(e, t) {
        var n = '', i = "http://192.168.178.62:2000/answer", e = 'question=' + encodeURIComponent(e), o = new XMLHttpRequest();
        console.log('AgentQuery: URL = ', i + '?' + e), o.open('GET', i + '?' + e, !0), 
        o.responseType = 'json', o.onload = function() {
            console.log('AssistantZoeProvider.queryZoe: onload request.response = ', o.response), 
            o.response.sentence && (n = 'string' == typeof o.response.sentence ? o.response.sentence : o.response.sentence[0]), 
            console.log('AgentQuery.queryZoe: answer = ', n), t(null, n);
        }, o.onerror = function() {
            console.log('AssistantZoeProvider.queryZoe: onerror'), t('Error: AgentQuery:', n);
        }, o.send();
    }
    var y, A = {
        CommunicationCategoryIntent: 'Wollen sie die Kategorie Kommunikation öffnen?',
        EmailAppIntent: 'Wollen Sie die E-Mail Anwendung öffnen?',
        EmailNewIntent: 'Wollen Sie die E-Mail Anwendung öffnen?',
        ContactAppIntent: 'Wollen Sie die Kontakte Anwendung öffnen?',
        ContactNewIntent: 'Wollen Sie die Kontakte Anwendung öffnen?',
        EntertainmentCategoryIntent: 'Wollen Sie die Kategorie Unterhaltung öffnen?',
        HealthCategoryIntent: 'Wollen Sie die Kategorie Gesundheit öffnen?',
        BerlinNewspaperAppIntent: 'Wollen sie die Berliner Zeitung Anwendung öffnen?',
        ClassicRadioAppIntent: 'Wollen Sie die Klassik Radio Anwendung öffnen?',
        GamesCategoryIntent: 'Wollen Sie die Spiele Anwendung öffnen?',
        PodcastAppIntent: 'Wollen Sie die Podcast Anwendung öffnen?',
        YoutubeAppIntent: 'Wollen Sie die Youtube Anwendung öffnen?',
        YoutubeNewsIntent: 'Wollen Sie Youtube Nachrichten öffnen?',
        YoutubeCultureIntent: 'Wollen Sie Youtube Kultur öffnen?',
        YoutubeCinemaIntent: 'Wollen Sie Youtube Kino öffnen?',
        YoutubeCookingIntent: 'Wollen Sie Youtube Kochen und Backen öffnen?',
        YoutubeTagesschauIntent: 'Wollen Sie Youtube Tagesschau öffnen?',
        YoutubeHeuteIntent: 'Wollen Sie Youtube Heute-Sendung öffnen?',
        SearchCategoryIntent: 'Wollen Sie im Internet suchen?',
        BookmarkCategoryIntent: 'Wollen Sie die Kategorie Nützliches öffnen?',
        PharmacyAppIntent: 'Wollen Sie die Apotheken Anwendung öffnen?',
        PharmacyLocationIntent: "Wollen Sie die Apotheken Anwendung öffnen?",
        PharmacyMagazineIntent: "Wollen Sie die Apotheken Anwendung öffnen?",
        PharmacyMedicationIntent: "Wollen Sie die Apotheken Anwendung öffnen?",
        BookmarkAppIntent: 'Wollen sie die Hilfreiches im Netz Anwendung öffnen?',
        DictionaryAppIntent: 'Wollen Sie die Internetlexikon Anwendung öffnen?',
        OnlineBankingCategoryIntent: 'Wollen Sie die Online-Banking Anwendung öffnen?',
        SettingCategoryIntent: 'Wollen Sie die Mein-Nepos Kategorie öffnen?',
        ShoppingCategoryIntent: 'Wollen sie die Einkaufen Anwendung öffnen?',
        SueddeutscheNewspaperAppIntent: 'Wollen Sie die Süddeutsche Zeitung Anwendung öffnen?',
        VideocallAppIntent: 'Wollen sie die Videocall Anwendung öffnen?',
        WikipediaAppIntent: 'Wollen sie die Wikipedia Anwendung öffnen?',
        ArdMediaAppIntent: 'Wollen sie die ARD Mediathek öffnen?',
        ZdfMediaAppIntent: 'Wollen sie die ZDF Mediathek öffnen?',
        BrainTrainerAppIntent: 'Wollen sie den Gedächtnistrainer öffnen?',
        CoronaInfoAppIntent: 'Wollen sie die Corona Infos öffnen?',
        EventsAppIntent: 'Wollen sie die Veranstaltungen öffnen?',
        RecipesAppIntent: 'Wollen sie die Rezepte öffnen?'
    }, I = {
        unterhaltung: 'Wollen Sie die Kategorie Unterhaltung öffnen?',
        'nützliches': 'Wollen Sie die Kategorie Nützliches öffnen?',
        kommunikation: 'Wollen Sie die Kategorie Kommunikation öffnen?',
        kundendienst: 'Wollen Sie die Kategorie Mein Nepos öffnen?',
        einkaufen: 'Wollen Sie die Einkaufen Anwendung öffnen?',
        'online-banking': 'Wollen Sie die Online-Banking Anwendung öffnen?',
        'online banking': 'Wollen Sie die Online-Banking Anwendung öffnen?',
        'e-mail': 'Wollen Sie die E-Mail Anwendung öffnen?',
        kontakte: 'Wollen Sie die Kontakte Anwendung öffnen?',
        'berliner zeitung': 'Wollen Sie die Berliner Zeitung Anwendung öffnen?',
        wikipedia: 'Wollen Sie die Wikipedia Anwendung öffnen?',
        'süddeutsche zeitung': 'Wollen Sie die Süddeutsche Zeitung Anwendung öffnen?',
        'nepos post': 'Wollen Sie die Nepos Post Anwendung öffnen?',
        'klassik radio': 'Wollen Sie die Klassik Radio Anwendung öffnen?',
        spiele: 'Wollen Sie die Spiele Anwendung öffnen?',
        podcast: 'Wollen Sie die Podcast Anwendung öffnen?',
        youtube: 'Wollen Sie die Youtube Anwendung öffnen?',
        'gut versorgt in': 'Wollen Sie die Gut versorgt in... Anwendung öffnen?',
        gametable: 'Wollen Sie die Spiele Anwendung öffnen?',
        'hilfreiches im netz': 'Wollen Sie die Hilfreiches im Netz Anwendung öffnen?',
        'hilfe und kontakt': 'Wollen Sie die Hilfe und Kontakt Anwendung öffnen?',
        internetlexikon: 'Wollen Sie die Internetlexikon Anwendung öffnen?',
        onlineshop: 'Wollen Sie die Einkaufen Anwendung öffnen?',
        internetsuche: 'Wollen Sie die Internetsuche öffnen?'
    }, t = (p(w, y = t.ErrorBase), w.prototype._initGoogleService = function() {
        try {
            return this.mGoogleService = o.ServiceManager.get('GoogleService', c.GoogleService), 
            this.mGoogleService ? 0 : (this.error('initGoogleService', 'no GoogleService'), 
            -1);
        } catch (e) {
            return this.exception('initGoogleService', e.message), -1;
        }
    }, w.prototype._initRasaService = function() {
        try {
            return this.mRasaService = o.ServiceManager.get('RasaService', a.RasaService), this.mRasaService ? 0 : (this.error('initRasaService', 'no RasaService'), 
            -1);
        } catch (e) {
            return this.exception('initRasaService', e.message), -1;
        }
    }, w.prototype._initSpeakService = function() {
        try {
            return this.mSpeakService = o.ServiceManager.get('SpeakService', i.SpeakService), 
            this.mSpeakService ? 0 : (this.error('_initSpeakService', 'no SpeakService'), -1);
        } catch (e) {
            return this.exception('_initSpeakService', e.message), -1;
        }
    }, w.prototype._initListenService = function() {
        try {
            return this.mListenService = o.ServiceManager.get('ListenService', r.ListenService, {
                errorOutputFlag: !0
            }), this.mListenService ? 0 : (this.error('initListenService', 'no ListenService'), 
            -1);
        } catch (e) {
            return this.exception('initListenService', e.message), -1;
        }
    }, w.prototype._initIntentService = function() {
        try {
            if (this.mIntentService = o.ServiceManager.get('IntentService', s.IntentService, {}), 
            !this.mIntentService) return this.error('initIntentService', 'no IntentService'), 
            -1;
            return this.mIntentService.setNLU('NLUGoogle');
        } catch (e) {
            return this.exception('initIntentService', e.message), -1;
        }
    }, w.prototype._initAllLockEvent = function() {
        var t = this;
        try {
            return this.mLockEvent = this.serviceLock.lockEvent.subscribe(function(e) {
                t.mLockServiceName = e, t.mLastLockServiceName = '';
            }), this.mUnlockEvent = this.serviceLock.unlockEvent.subscribe(function(e) {
                t.mUnlockFlag || (t.mUnlockFlag = !0, t.mLastLockServiceName = t.mLockServiceName, 
                t.mLockServiceName === o.SERVICE_AGENT_NAME && t.stop(!1), t.mUnlockFlag = !1), 
                t.mLockServiceName = '';
            }), 0;
        } catch (e) {
            return this.exception('_initAllLockEvent', e.message), -1;
        }
    }, w.prototype._initAllSpeakEvent = function() {
        var t = this;
        try {
            return this.mSpeakStartEvent = this.mSpeakService.startEvent.subscribe(function() {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && (t.mLog("Speak Start"), t.mStartSpeakEvent.emit());
            }), this.mSpeakStopEvent = this.mSpeakService.stopEvent.subscribe(function() {
                t.mLockServiceName !== o.SERVICE_AGENT_NAME && t.mLastLockServiceName !== o.SERVICE_AGENT_NAME || (t.mLog("Speak Stop"), 
                t.mStopSpeakEvent.emit(), t.mSpeakListenFlag && (t.mSpeakListenFlag = !1, t.listen()));
            }), this.mSpeakErrorEvent = this.mSpeakService.errorEvent.subscribe(function(e) {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && 'TTSHtml5._breakSynthesis: Kein SpeechSynthesis-Service vorhanden' !== e.message && (t.error('_initAllSpeakEvent.speakErrorEvent', t.mLockServiceName + ' ' + e.message), 
                t.mSpeakService.stop(), t.mStopSpeakEvent.emit(), t.mLog("Speak Error: " + e.message), 
                t.mErrorEvent.emit(e));
            }), 0;
        } catch (e) {
            return this.exception('_initAllListenEvent', e.message), -1;
        }
    }, w.prototype._initAllListenEvent = function() {
        var t = this;
        try {
            return this.mListenStartEvent = this.mListenService.startEvent.subscribe(function() {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && (t.mLog("Listen Start"), t.mStartListenEvent.emit());
            }), this.mListenStopEvent = this.mListenService.stopEvent.subscribe(function() {
                t.mLockServiceName !== o.SERVICE_AGENT_NAME && t.mLastLockServiceName !== o.SERVICE_AGENT_NAME || (t.mLog("Listen Stop"), 
                t.mStopListenEvent.emit());
            }), this.mListenStartAudioEvent = this.mListenService.audioStartEvent.subscribe(function() {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && (t.mMicrophoneFlag = !0, t.isNavigateMode() && t.actionClickService.showButtonHints(), 
                t.mLog("Microphon on"), t.mStartMicrophoneEvent.emit());
            }), this.mListenStopAudioEvent = this.mListenService.audioStopEvent.subscribe(function() {
                t.mLockServiceName !== o.SERVICE_AGENT_NAME && t.mLastLockServiceName !== o.SERVICE_AGENT_NAME || (t.mMicrophoneFlag = !1, 
                t.isNavigateMode() && t.actionClickService.hideButtonHints(), t.mLog("Microphon off"), 
                t.mStopMicrophoneEvent.emit());
            }), this.mListenResultEvent = this.mListenService.resultEvent.subscribe(function(e) {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && (t.mLog("Listen Result: " + e), t.mResultEvent.emit(e), 
                t.intent(e));
            }), this.mListenNoMatchEvent = this.mListenService.noMatchEvent.subscribe(function() {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && (t.mLog("Listen NoMatch"), t.mNoMatchEvent.emit());
            }), this.mListenErrorEvent = this.mListenService.errorEvent.subscribe(function(e) {
                t.mLockServiceName === o.SERVICE_AGENT_NAME && (t.mListenService.stop(), t.mMicrophoneFlag = !1, 
                t.error('_initAllListenEvent.listenErrorEvent', t.mLockServiceName + ' ' + e.message), 
                t.mStopListenEvent.emit(), t.mLog("Listen Error: " + e.message), t.mErrorEvent.emit(e));
            }), 0;
        } catch (e) {
            return this.exception('_initAllListenEvent', e.message), -1;
        }
    }, w.prototype._initAllIntentEvent = function() {
        var t = this;
        if (!this.mIntentService) return -1;
        try {
            return this.mIntentStartEvent = this.mIntentService.startEvent.subscribe(function() {
                t.mLog("Intent Start"), t.mStartIntentEvent.emit(), t.mListenService.isActive() || (t.isNavigateMode() && t.actionClickService.showButtonHints(), 
                t.mLog("Microphon on"), t.mMicrophoneFlag = !0, t.mStartMicrophoneEvent.emit());
            }), this.mIntentStopEvent = this.mIntentService.stopEvent.subscribe(function() {
                t.mLog("Intent Stop"), t.isNavigateMode() && t.actionClickService.hideButtonHints(), 
                !t.mListenService.isActive() && t.mMicrophoneFlag && (t.mLog("Microphon off"), t.mMicrophoneFlag = !1, 
                t.mStopMicrophoneEvent.emit()), t.mStopIntentEvent.emit();
            }), this.mIntentResultEvent = this.mIntentService.resultEvent.subscribe(function(e) {
                t.mLog("Intent Result: " + e), !t.mListenService.isActive() && t.mMicrophoneFlag && (t.mLog("Microphon off"), 
                t.mMicrophoneFlag = !1, t.mStopMicrophoneEvent.emit()), e.intent ? t.mIntentEvent.emit(e) : t.noMatchEvent.emit(), 
                e.speech ? (t.mSpeakEvent.emit(e.speech), t.isSpeak() ? (t.mSpeakIntentFlag = !0, 
                t.speak(e.speech)) : (t.mIntentStopFlag = !0, t.speakTimeout(e.speech))) : t.mIntentStopFlag = !0, 
                t.mIntentStopFlag = !1;
            }), this.mIntentErrorEvent = this.mIntentService.errorEvent.subscribe(function(e) {
                t.mMicrophoneFlag = !1, t.mIntentService.stop(), t.error('_initAllIntentEvent.intentErrorEvent', e.message), 
                t.mStopIntentEvent.emit(), t.mLog("Intent Error: " + e.message), t.mErrorEvent.emit(e);
            }), 0;
        } catch (e) {
            return this.exception('_initAllIntentListenEvent', e.message), -1;
        }
    }, w.prototype.getVersion = function() {
        return f;
    }, w.prototype.getBrowserName = function() {
        return n.SpeechBrowser.getBrowserName();
    }, Object.defineProperty(w.prototype, "initEvent", {
        get: function() {
            return this.mIntentService, null;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "startEvent", {
        get: function() {
            return this.mStartEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "stopEvent", {
        get: function() {
            return this.mStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "userStopEvent", {
        get: function() {
            return this.mUserStopEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "startSpeakEvent", {
        get: function() {
            return this.mStartSpeakEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "stopSpeakEvent", {
        get: function() {
            return this.mStopSpeakEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "speakEvent", {
        get: function() {
            return this.mSpeakEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "startListenEvent", {
        get: function() {
            return this.mStartListenEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "stopListenEvent", {
        get: function() {
            return this.mStopListenEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "startMicrophoneEvent", {
        get: function() {
            return this.mStartMicrophoneEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "stopMicrophoneEvent", {
        get: function() {
            return this.mStopMicrophoneEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "resultEvent", {
        get: function() {
            return this.mResultEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "noMatchEvent", {
        get: function() {
            return this.mNoMatchEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "startIntentEvent", {
        get: function() {
            return this.mStartIntentEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "stopIntentEvent", {
        get: function() {
            return this.mStopIntentEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "intentEvent", {
        get: function() {
            return this.mIntentEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "answerEvent", {
        get: function() {
            return this.mAnswerEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "contextEvent", {
        get: function() {
            return this.mContextEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "errorEvent", {
        get: function() {
            return this.mErrorEvent;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(w.prototype, "hideEvent", {
        get: function() {
            return this.mHideEvent;
        },
        enumerable: !1,
        configurable: !0
    }), w.prototype.isModeAllow = function(e) {
        return e === v ? this.isRouteModeAllow() : e === S && this.isNavigateModeAllow();
    }, w.prototype.getMode = function() {
        return this.mAgentMode;
    }, w.prototype.isRouteModeAllow = function() {
        return !0;
    }, w.prototype.isRouteMode = function() {
        return this.mAgentMode === v;
    }, w.prototype.setRouteMode = function() {
        return this.isRouteModeAllow() ? (this.mAgentMode = v, 0) : -1;
    }, w.prototype.isNavigateModeAllow = function() {
        return !1;
    }, w.prototype.isNavigateMode = function() {
        return this.mAgentMode === S;
    }, w.prototype.setNavigateMode = function() {
        return this.isNavigateModeAllow() ? (this.mAgentMode = S, 0) : -1;
    }, w.prototype.getContext = function() {
        return this.mAgentContext;
    }, w.prototype.setContext = function(e, t, n, i) {
        this.mAgentContext = {
            intentName: e,
            intentSpeech: t,
            entityName: n,
            entityValue: i,
            intentResult: 0
        };
    }, w.prototype.setContextResult = function(e) {
        this.mAgentContext && (this.mAgentContext.intentResult = e);
    }, w.prototype.clearContext = function() {
        this.mAgentContext = null;
    }, w.prototype.sendContextEvent = function() {
        this.mAgentContext && this.mContextEvent.emit(this.mAgentContext);
    }, w.prototype._getEntity = function(e, t) {
        try {
            if (e.intent && t) {
                this.mLog("_getEntity: intentName = " + e.intent + "  entityName = " + t);
                var n = e.conceptList;
                if (n && 0 < n.length) for (var i = 0, o = n; i < o.length; i++) {
                    var r = o[i];
                    if (r.concept === t) return r.value;
                }
            }
            return '';
        } catch (e) {
            return this.exception('_getEntity', e.message), '';
        }
    }, w.prototype._executeButtonEntity = function(e) {
        try {
            if (e) {
                e.toLowerCase();
                return 0 !== this.actionClickService.start(e) && 0 !== this.actionRouteService.executeRouteEntity(e) ? -1 : 0;
            }
            return -1;
        } catch (e) {
            return this.exception('_executeButtonEntity', e.message), -1;
        }
    }, w.prototype._executeIntent = function(e) {
        if (e && e.intent) {
            this.mLog("_executeIntent: intentName = " + e.intent);
            var t = -1, n = '', n = 'NewspaperGroupIntent' === e.intent ? this._getEntity(e, 'newspaper') + ' Zeitung' : this._getEntity(e, 'button');
            if (this.setContext(e.intent, e.speech, 'button', n), n && 0 === this._executeButtonEntity(n)) return this.sendContextEvent(), 
            0;
            if (0 !== (t = this.actionRouteService.executeRouteIntent(e))) switch (e.intent) {
              case 'DefaultWelcomeIntent':
              case 'DefaultFallbackIntent':
              case 'HelpUseIntent':
              case 'HelpIntent':
              default:
                t = -1;
            }
            return this.setContextResult(t), this.sendContextEvent(), t;
        }
        return -1;
    }, w.prototype.findConfirmQuestion = function(e) {
        var t, n = '';
        return e && e.intent && ((n = A[e.intent]) || (t = '', t = 'NewspaperGroupIntent' === e.intent ? this._getEntity(e, 'newspaper') + ' Zeitung' : this._getEntity(e, 'button'), 
        n = I[t.toLowerCase()])), n;
    }, w.prototype.isExternLock = function() {
        return !(!this.mLockServiceName || this.mLockServiceName === o.SERVICE_AGENT_NAME);
    }, w.prototype.isLock = function() {
        return this.mLockServiceName === o.SERVICE_AGENT_NAME;
    }, w.prototype.setWelcomeText = function(e) {
        this.mWelcomeText = e;
    }, w.prototype.start = function() {
        return !this.isActive() || this.isLock() || this.isRunning() ? -1 : (this.mRunningFlag = !0, 
        this.serviceLock.forceLock(o.SERVICE_AGENT_NAME), this.mStartEvent.emit(), this.isNavigateMode() && this.actionClickService.showButtonHints(), 
        this.mWelcomeText && this.speak(this.mWelcomeText, !0), 0);
    }, w.prototype.stop = function(e) {
        if (void 0 === e && (e = !0), this.isLock() && this.isRunning()) {
            this.isNavigateMode() && this.actionClickService.hideButtonHints(), this.mListenService && this.mListenService.stop(), 
            e && this.mSpeakService && this.mSpeakService.stop();
            var t = -1;
            return this.mIntentService && (t = this.mIntentService.stop()), e && this.mUserStopEvent.emit(), 
            this.mStopEvent.emit(), this.serviceLock.unlock(o.SERVICE_AGENT_NAME), this.mRunningFlag = !1, 
            t;
        }
        return -1;
    }, w.prototype.isInit = function() {
        return !!this.mIntentService && this.mIntentService.isInit();
    }, w.prototype.isActive = function() {
        return !!this.mIntentService && this.mIntentService.isActive();
    }, w.prototype.isOnlyDictate = function() {
        return !1;
    }, w.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, w.prototype.isMicrophone = function() {
        return this.mMicrophoneFlag;
    }, w.prototype.setLanguage = function(e) {
        if (this.mSpeakService && this.mListenService && this.mIntentService) {
            if (0 !== this.mSpeakService.setLanguage(e)) return -1;
            if (0 === this.mListenService.setLanguage(e)) return this.mIntentService.setLanguage(e);
        }
        return -1;
    }, w.prototype.getLanguage = function() {
        return this.mIntentService ? this.mIntentService.getLanguage() : m;
    }, w.prototype.action = function(e) {
        return this.isLock() ? this._executeIntent(e) : -1;
    }, w.prototype.intent = function(e) {
        return console.log('AgentService.intent: isLock = ', this.isLock(), '  text = ', e), 
        this.isLock() && (this.mSpeakService && this.mSpeakService.stop(), this.mListenService && this.mListenService.stop(), 
        this.mIntentService) ? (this.mIntentService.text = e, this.query(e), this.mIntentService.start()) : -1;
    }, w.prototype.query = function(e) {
        var n = this;
        return console.log('AgentService.query: isLock = ', this.isLock(), '  text = ', e), 
        this.isLock() ? (this.mSpeakService && this.mSpeakService.stop(), this.mListenService && this.mListenService.stop(), 
        L(e, function(e, t) {
            e ? console.log('AgentService.Query: error = ', e) : (console.log('AgentService.Query: answer = ', t), 
            n.mAnswerEvent.emit(t), n.mSpeakFlag && n.speak(t));
        }), 0) : -1;
    }, w.prototype.listen = function() {
        if (console.log('AgentService.listen: isLock = ', this.isLock()), this.isLock()) {
            if (this.mSpeakService && this.mSpeakService.stop(), console.log('AgentService.listen: active = ', this.mListenService.isActive()), 
            this.mListenService && this.mListenService.isActive()) return this.mListenService.setMode(r.LISTEN_COMMAND_MODE), 
            console.log('AgentService.Listen: start listen'), this.mListenService.start();
            if (!this.isOnlyDictate() && this.mIntentService && this.mIntentService.isActive()) return this.mIntentService.start();
        }
        return -1;
    }, w.prototype.stopListen = function() {
        if (this.mListenService) {
            if (this.mListenService.isActive()) return this.mListenService.stop();
            if (this.mIntentService) return this.mIntentService.stop();
        }
        return -1;
    }, w.prototype.isSpeak = function() {
        return this.mSpeakFlag;
    }, w.prototype.setSpeakOff = function() {
        this.mSpeakFlag = !1;
    }, w.prototype.setSpeakOn = function() {
        this.mSpeakFlag = !0;
    }, w.prototype.speak = function(e, t) {
        void 0 === t && (t = !1);
        var n = -1;
        return this.isLock() && (this.mListenService && this.mListenService.stop(), this.mSpeakService && this.mSpeakService.isTTS() && (this.mSpeakService.stop(), 
        this.mSpeakService.audio = !1, this.mSpeakService.text = e, this.mSpeakListenFlag = t, 
        n = this.mSpeakService.start())), n;
    }, w.prototype.stopSpeak = function() {
        return this.mSpeakService && this.mSpeakService.isTTS() ? this.mSpeakService.stop() : -1;
    }, w.prototype.speakTimeout = function(e) {
        var t = this;
        return setTimeout(function() {
            return t.mStopSpeakEvent.emit();
        }, 0), 0;
    }, w);
    function w(e, t, n) {
        var i = y.call(this, 'AgentService') || this;
        return i.serviceLock = e, i.actionClickService = t, i.actionRouteService = n, i.mLog = k('services'), 
        i.mGoogleService = null, i.mRasaService = null, i.mListenService = null, i.mIntentService = null, 
        i.mLockEvent = null, i.mUnlockEvent = null, i.mSpeakStartEvent = null, i.mSpeakStopEvent = null, 
        i.mSpeakErrorEvent = null, i.mListenStartEvent = null, i.mListenStopEvent = null, 
        i.mListenStartAudioEvent = null, i.mListenStopAudioEvent = null, i.mListenResultEvent = null, 
        i.mListenNoMatchEvent = null, i.mListenErrorEvent = null, i.mIntentStartEvent = null, 
        i.mIntentStopEvent = null, i.mIntentResultEvent = null, i.mIntentErrorEvent = null, 
        i.mUserStopEvent = new o.EventEmitter(), i.mStartEvent = new o.EventEmitter(), i.mStopEvent = new o.EventEmitter(), 
        i.mStartSpeakEvent = new o.EventEmitter(), i.mStopSpeakEvent = new o.EventEmitter(), 
        i.mSpeakEvent = new o.EventEmitter(), i.mStartListenEvent = new o.EventEmitter(), 
        i.mStopListenEvent = new o.EventEmitter(), i.mStartMicrophoneEvent = new o.EventEmitter(), 
        i.mStopMicrophoneEvent = new o.EventEmitter(), i.mResultEvent = new o.EventEmitter(), 
        i.mNoMatchEvent = new o.EventEmitter(), i.mStartIntentEvent = new o.EventEmitter(), 
        i.mStopIntentEvent = new o.EventEmitter(), i.mIntentEvent = new o.EventEmitter(), 
        i.mAnswerEvent = new o.EventEmitter(), i.mContextEvent = new o.EventEmitter(), i.mErrorEvent = new o.EventEmitter(), 
        i.mHideEvent = new o.EventEmitter(), i.mRunningFlag = !1, i.mMicrophoneFlag = !1, 
        i.mSpeakFlag = !1, i.mAgentMode = v, i.mWelcomeText = '', i.mSpeakListenFlag = !1, 
        i.mSpeakIntentFlag = !1, i.mIntentStopFlag = !1, i.mAgentContext = null, i.mLockServiceName = '', 
        i.mLastLockServiceName = '', i.mUnlockFlag = !1, i.setErrorOutput(!1), i.mLog("Agent Version: " + i.getVersion()), 
        i._initGoogleService(), i._initRasaService(), i._initSpeakService(), i._initListenService(), 
        i._initIntentService(), i._initAllLockEvent(), i._initAllSpeakEvent(), i._initAllListenEvent(), 
        i._initAllIntentEvent(), window.cordova || (i.mLog("Browser: " + i.getBrowserName()), 
        'Chrome' !== i.getBrowserName() && (i.mLog('running not on Chrome, listen is not available'), 
        i.mListenService.setActiveOff())), i.mIntentService.isActive() && (i.setLanguage(m), 
        i.mLog("Language: " + i.getLanguage())), console.log('Plattform: ', window.cordova), 
        window.cordova && 'android' === window.cordova.platformId || i.mListenService.setASR(r.LISTEN_HTML5_ASR), 
        i.mListenService.setTimeout(5e3), i.mLog("listen active: " + i.mListenService.isActive()), 
        i.mLog("intent active: " + i.mIntentService.isActive()), i;
    }
    e.AgentService = t, e.AgentServiceMock = g, Object.defineProperty(e, '__esModule', {
        value: !0
    });
});
