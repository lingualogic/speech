/** @packageDocumentation
 * AgentService
 *
 * API-Version: 1.0
 *
 * Letzte Aenderung: 29.10.2020
 * Status: rot
 *
 * @module agent
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// common

import { SpeechBrowser } from '@speech/common';


// speak

import { SpeakService } from '@speech/speak';


// listen

import { ListenService, LISTEN_COMMAND_MODE, LISTEN_HTML5_ASR } from '@speech/listen';


// intent

import { IntentService } from '@speech/intent';


// google

import { GoogleService } from '@speech/cloud-google';


// rasa

import { RasaService } from '@speech/cloud-rasa';


// service

import {
  SERVICE_AGENT_NAME,
  SERVICE_GOOGLE_NAME,
  SERVICE_SPEAK_NAME,
  SERVICE_LISTEN_NAME,
  SERVICE_INTENT_NAME,
  ServiceLock,
  ServiceManager,
  EventEmitter
} from '@speech/service';


// action

import { ActionClickInterface } from './mock/action-click.interface';
import { ActionRouteInterface } from './mock/action-route.interface';


// agent

import {
  AGENT_SERVICE_ON,
  AGENT_ERROROUTPUT_FLAG,
  AGENT_ONLYDICTATE_FLAG,
  AGENT_STOP_TIMEOUT,
  AGENT_DEFAULT_LANGUAGE,
  AGENT_ROUTE_MODE,
  AGENT_NAVIGATE_MODE,
  AGENT_ROUTE_FLAG,
  AGENT_NAVIGATE_FLAG
} from './agent-const';
import { AGENT_VERSION_STRING } from './agent-version';
import { AgentLogger } from './agent-logger';
import { AgentContextInterface } from './agent-context.interface';
import { AgentServiceInterface } from './agent-service.interface';


// TODO: experimentell Query-Server Aufruf

import { queryZoe } from './agent-query';


// Mapping for Intent Name to Confirm Question

import { AGENT_INTENTCONFIRM_MAP } from './maps/agent-intent-confirm-map';
import { AGENT_ENTITYCONFIRM_MAP } from './maps/agent-entity-confirm-map';


/**
 * Agent-Service
 *
 * @export
 * @class AgentService
 */

export class AgentService extends ErrorBase implements AgentServiceInterface {

  private mLog = AgentLogger.extend('services');

  /**
   * The delegate Speech-Angular Servives
   */

  private mGoogleService: GoogleService = null;
  private mRasaService: RasaService = null;
  private mSpeakService: SpeakService;
  private mListenService: ListenService = null;
  private mIntentService: IntentService = null;

  /**
   * the Events for lock, listen and intent
   */

  private mLockEvent = null;
  private mUnlockEvent = null;

  private mSpeakStartEvent = null;
  private mSpeakStopEvent = null;
  private mSpeakErrorEvent = null;

  private mListenStartEvent = null;
  private mListenStopEvent = null;
  private mListenStartAudioEvent = null;
  private mListenStopAudioEvent = null;
  private mListenResultEvent = null;
  private mListenNoMatchEvent = null;
  private mListenErrorEvent = null;

  private mIntentStartEvent = null;
  private mIntentStopEvent = null;
  private mIntentResultEvent = null;
  private mIntentErrorEvent = null;

  /**
   * The user stop Event, break Agent from User
   */

  private mUserStopEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant
   */

  private mStartEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant.
   */

  private mStopEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant speech output
   */

  private mStartSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant speech output
   */

  private mStopSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The speak Event for assistant speech output
   */

  private mSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant speech input
   */

  private mStartListenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant speech input
   */

  private mStopListenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for Microphon.
   */

  private mStartMicrophoneEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for Microphon.
   */

  private mStopMicrophoneEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The result Event for listen.
   */

  private mResultEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The result Event for listen.
   */

  private mNoMatchEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant speech intention
   */

  private mStartIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant speech intention
   */

  private mStopIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The result Event for Intent.
   */

  private mIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The Answer Event for Intent.
   */

  private mAnswerEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The context Event for Intent.
   */

  private mContextEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The error Event
   */

  private mErrorEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The hide Event for listen.
   */

  private mHideEvent: EventEmitter<any> = new EventEmitter();

  /**
   * is Listen Running
   */

  private mRunningFlag = false;

  /**
   * is Microphon
   */

  private mMicrophoneFlag = false;

  /**
   * is Speak output
   */

  private mSpeakFlag = false;

  /**
   * Mode ist Route or Navigate
   *
   * Route:     Dialogflow-Agent for URL-Route
   * Navigate:  Dialogflow-Agent for Button-Navigation
   */

  private mAgentMode = AGENT_ROUTE_MODE;

  /**
   * Agent Welcome Text
   */

  private mWelcomeText = '';
  private mSpeakListenFlag = false;
  private mSpeakIntentFlag = false;
  private mIntentStopFlag = false;

  /**
   * Agent Context
   */

  private mAgentContext: AgentContextInterface = null;

  /**
   * set lock service name
   */

  private mLockServiceName = '';
  private mLastLockServiceName = '';
  private mUnlockFlag = false;

  /**
   * Constructor for injected Router and ActivatedRoute
   */

  constructor(
    private serviceLock: ServiceLock,
    private actionClickService: ActionClickInterface,
    private actionRouteService: ActionRouteInterface
  ) {
    super( 'AgentService' );

    // console.log('AgentService.constructor');

    // Check, if no assistant Service
    if ( !AGENT_SERVICE_ON ) {
        // no assistant service available
        this.mLog('Agent not available');
        return;
    }

    this.setErrorOutput( AGENT_ERROROUTPUT_FLAG );

    // Version output

    // console.log('Agent Version: ', this.getVersion());
    this.mLog(`Agent Version: ${this.getVersion()}`);

    // create all speech-angular services

    this._initGoogleService();
    this._initRasaService();
    this._initSpeakService();
    this._initListenService();
    this._initIntentService();

    // create all events

    this._initAllLockEvent();
    this._initAllSpeakEvent();
    this._initAllListenEvent();
    this._initAllIntentEvent();

    // pruefen auf Cordova

    if ( !(window as any).cordova ) {
      // Browser testen
      this.mLog(`Browser: ${this.getBrowserName()}`);
      if ( this.getBrowserName() !== 'Chrome' ) {
        this.mLog('running not on Chrome, listen is not available');
        this.mListenService.setActiveOff();
      }
    }

    // check, if listen active

    if ( AGENT_ONLYDICTATE_FLAG && !this.mListenService.isActive()) {
      this.mLog('Agent is deactivated');
      this.mIntentService.setActiveOff();
    }

    // set Default-Language

    if ( this.mIntentService.isActive()) {
      this.setLanguage( AGENT_DEFAULT_LANGUAGE );
      this.mLog(`Language: ${this.getLanguage()}`);
    }

    // TODO: ASR muss als Konfiguration gesetzt werden
    console.log('Plattform: ', (window as any).cordova);
    if ( !(window as any).cordova || (window as any).cordova.platformId !== 'android') {
      this.mListenService.setASR( LISTEN_HTML5_ASR );
    }
    this.mListenService.setTimeout( AGENT_STOP_TIMEOUT );

    this.mLog(`listen active: ${this.mListenService.isActive()}`);
    this.mLog(`intent active: ${this.mIntentService.isActive()}`);
  }

  // init functions

  /**
   * create GoogleService from Speech-Angular
   *
   * @private
   */

  _initGoogleService(): number {
    try {
      // TODO: Problem mit Namensgleichheit bei SERVICE_GOOGLE_NAME
      // this.mGoogleService = SpeechServiceManager.get( SERVICE_GOOGLE_NAME, GoogleService );
      this.mGoogleService = ServiceManager.get( 'GoogleService', GoogleService );
      if ( !this.mGoogleService ) {
        this.error( 'initGoogleService', 'no GoogleService' );
        return -1;
      }
      return 0;
    } catch ( aException ) {
      this.exception( 'initGoogleService', aException.message );
      return -1;
    }
  }

  /**
   * create RasaService from Speech-Angular
   *
   * @private
   */

  _initRasaService(): number {
    try {
      // TODO: Problem mit Namensgleichheit bei SPEECH_RASA_SERVICE
      // this.mRasaService = SpeechServiceManager.get( SPEECH_RASA_SERVICE, RasaService );
      this.mRasaService = ServiceManager.get( 'RasaService', RasaService );
      if ( !this.mRasaService ) {
        this.error( 'initRasaService', 'no RasaService' );
        return -1;
      }
      return 0;
    } catch ( aException ) {
      this.exception( 'initRasaService', aException.message );
      return -1;
    }
  }

  /**
   * create SpeakService from Speech-Angular
   */

  _initSpeakService(): number {
    try {
      const speakOption = {
        errorOutputFlag: true,
      };
      // TODO: Problem mit Namensgleichheit bei SERVICE_SPEAK_NAME
      // this.mSpeakService = SpeechServiceManager.get( SERVICE_SPEAK_NAME, SpeakService, speakOption );
      this.mSpeakService = ServiceManager.get( 'SpeakService', SpeakService );
      if ( !this.mSpeakService ) {
        this.error( '_initSpeakService', 'no SpeakService' );
        return -1;
      }
      return 0;
    } catch ( exception ) {
      this.exception('_initSpeakService', exception.message);
      return -1;
    }
  }

  /**
   * create ListenService from Speech-Angular
   *
   * @private
   */

  _initListenService(): number {
    try {
      const listenOption = {
        errorOutputFlag: true
      };
      // TODO: Problem mit Namensgleichheit bei SERVICE_LISTEN_NAME
      // this.mListenService = SpeechServiceManager.get( SERVICE_LISTEN_NAME, ListenService, listenOption );
      this.mListenService = ServiceManager.get( 'ListenService', ListenService, listenOption );
      if ( !this.mListenService ) {
        this.error( 'initListenService', 'no ListenService' );
        return -1;
      }
      return 0;
    } catch ( aException ) {
      this.exception( 'initListenService', aException.message );
      return -1;
    }
  }

  /**
   * create IntentService from Speech-Angular
   *
   * @private
   */

  _initIntentService(): number {
    try {
      const intentOption = {
        // errorOutputFlag: true
      };
      // TODO: Problem mit Namensgleichheit bei SERVICE_INTENT_NAME
      // this.mIntentService = SpeechServiceManager.get( SERVICE_INTENT_NAME, IntentService, intentOption );
      this.mIntentService = ServiceManager.get( 'IntentService', IntentService, intentOption );
      if ( !this.mIntentService ) {
        this.error( 'initIntentService', 'no IntentService' );
        return -1;
      }
      /* TODO: weitere NLU eintragen, wenn CloudRasaManager in RasaModule in Service eingebaut ist.
      const rasa1Option = {
        rasaPortName: 'NLURasa1',
        rasaDynamicCredentialsFlag: true,
        rasaAppKey: RASA1_APP_KEY,
        rasaServerUrl: RASA1_SERVER_URL,
        errorOutputFlag: true
      };
      this.mIntentService.insertNLU( 'NLURasa1', 'NLURasa', rasa1Option );
      */
      // TODO: Umschalten der NLU muss als API in den Assistenten eingebaut werden
      // Umschalten auf entsprechende NLU
      const nluName = 'NLUGoogle';
      // const nluName = 'NLURasa';
      // console.log( 'AgentService._initIntentService: nlu-Liste = ', this.mIntentService.nlus);
      return this.mIntentService.setNLU( nluName );
    } catch ( aException ) {
      this.exception( 'initIntentService', aException.message );
      return -1;
    }
  }

  /**
   * create all lock events
   */

  _initAllLockEvent(): number {
    // console.log('ActionService._initAllDictateEvent: start');
    try {
      // Lock-Event

      this.mLockEvent = this.serviceLock.lockEvent.subscribe((aServiceName: string) => {
        // console.log('AgentService.lockEvent:', this.mLockServiceName, aServiceName);
        this.mLockServiceName = aServiceName;
        this.mLastLockServiceName = '';
      });

      // Unlock-Event

      this.mUnlockEvent = this.serviceLock.unlockEvent.subscribe((aServiceName: string) => {
        if ( !this.mUnlockFlag ) {
          this.mUnlockFlag = true;
          // console.log('AgentService.unlockEvent:', aServiceName);
          this.mLastLockServiceName = this.mLockServiceName;
          if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
            this.stop( false );
          }
          this.mUnlockFlag = false;
        }
        this.mLockServiceName = '';
      });

      return 0;
    } catch ( aException ) {
      this.exception( '_initAllLockEvent', aException.message );
      return -1;
    }
  }

  /**
   * create all listen events
   */

  _initAllSpeakEvent(): number {
    // console.log('ActionService._initAllSpeakEvent: start');
    try {
      // Start-Event

      this.mSpeakStartEvent = this.mSpeakService.startEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.speakStartEvent:', this.mLockServiceName);
          this.mLog(`Speak Start`);
          this.mStartSpeakEvent.emit();
        }
      });

      // Stop-Event

      this.mSpeakStopEvent = this.mSpeakService.stopEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME || this.mLastLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.speakStopEvent:', this.mLockServiceName);
          this.mLog(`Speak Stop`);
          this.mStopSpeakEvent.emit();
          // pruefen, ob Listen gestartet werden soll
          if ( this.mSpeakListenFlag ) {
            this.mSpeakListenFlag = false;
            this.listen();
          }
          /* TODO: Assistent sollte nicht mehr ausgeschaltet werden
          if ( this.mSpeakIntentFlag ) {
            this.mSpeakIntentFlag = false;
            this.stop( false );
          }
          */
        }
      });

      // Error-Event

      this.mSpeakErrorEvent = this.mSpeakService.errorEvent.subscribe((aError: any) => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.speakErrorEvent:', aError.message);
          // tslint:disable-next-line: prefer-template
          if ( aError.message !== 'TTSHtml5._breakSynthesis: Kein SpeechSynthesis-Service vorhanden' ) {
            this.error( '_initAllSpeakEvent.speakErrorEvent', this.mLockServiceName + ' ' + aError.message );
            this.mSpeakService.stop();
            this.mStopSpeakEvent.emit();
            // TODO: insert error handling for user
            this.mLog(`Speak Error: ${aError.message}`);
            // TODO: Assistent sollte nicht mehr gestoppt werden
            // this.stop( false );
            this.mErrorEvent.emit( aError );
          }
        }
      });
      return 0;
    } catch ( aException ) {
      this.exception( '_initAllListenEvent', aException.message );
      return -1;
    }
  }

  /**
   * create all listen events
   */

  _initAllListenEvent(): number {
    // console.log('ActionService._initAllListenEvent: start');
    try {
      // Start-Event

      this.mListenStartEvent = this.mListenService.startEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.listenStartEvent:', this.mLockServiceName);
          this.mLog(`Listen Start`);
          this.mStartListenEvent.emit();
        }
      });

      // Stop-Event

      this.mListenStopEvent = this.mListenService.stopEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME || this.mLastLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.listenStopEvent:', this.mLockServiceName);
          this.mLog(`Listen Stop`);
          this.mStopListenEvent.emit();
        }
      });

      // Start-Event for Microphon

      this.mListenStartAudioEvent = this.mListenService.audioStartEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.listenStartAudioEvent:', this.mLockServiceName);
          this.mMicrophoneFlag = true;
          if ( this.isNavigateMode()) {
            this.actionClickService.showButtonHints();
          }
          this.mLog(`Microphon on`);
          this.mStartMicrophoneEvent.emit();
        }
      });

      // Stop-Event for Microphon

      this.mListenStopAudioEvent = this.mListenService.audioStopEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME || this.mLastLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.listenStopAudioEvent:', this.mLockServiceName);
          this.mMicrophoneFlag = false;
          if ( this.isNavigateMode()) {
            this.actionClickService.hideButtonHints();
          }
          this.mLog(`Microphon off`);
          this.mStopMicrophoneEvent.emit();
        }
      });

      // Result-Event from Speech-Angular

      this.mListenResultEvent = this.mListenService.resultEvent.subscribe((aResult: any) => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.listenResultEvent:', this.mLockServiceName, aResult);
          this.mLog(`Listen Result: ${aResult}`);
          this.mResultEvent.emit( aResult );
          this.intent( aResult );
        }
      });

      // Result-Event from Speech-Angular

      this.mListenNoMatchEvent = this.mListenService.noMatchEvent.subscribe(() => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.listenNoMatchEvent:', this.mLockServiceName, AGENT_NOMATCH_TEXT);
          this.mLog(`Listen NoMatch`);
          this.mNoMatchEvent.emit();
        }
      });

      // Error-Event from Speech-Angular

      this.mListenErrorEvent = this.mListenService.errorEvent.subscribe((aError: any) => {
        if ( this.mLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AgentService.error:', aError);
          // tslint:disable-next-line: prefer-template
          this.mListenService.stop();
          this.mMicrophoneFlag = false;
          // tslint:disable-next-line: prefer-template
          this.error( '_initAllListenEvent.listenErrorEvent', this.mLockServiceName + ' ' + aError.message );
          this.mStopListenEvent.emit();
          // this.mHideEvent.emit();
          // TODO: insert error handling for user
          this.mLog(`Listen Error: ${aError.message}`);
          // TODO: Assistent sollte nicht mehr gestoppt werden
          // this.stop( false );
          this.mErrorEvent.emit( aError );
        }
      });
      return 0;
    } catch ( aException ) {
      this.exception( '_initAllListenEvent', aException.message );
      return -1;
    }
  }

  /**
   * create all intent events
   */

  _initAllIntentEvent(): number {
    if ( !this.mIntentService ) {
      return -1;
    }
    // console.log('AgentService._initAllIntentEvent: start');
    try {
      // Start-Event from Speech-Angular

      this.mIntentStartEvent = this.mIntentService.startEvent.subscribe(() => {
        // console.log('AgentService.intentStartEvent');
        this.mLog(`Intent Start`);
        this.mStartIntentEvent.emit();
        // only emit start microphone, if not dictate started
        if ( !this.mListenService.isActive()) {
          if ( this.isNavigateMode()) {
            this.actionClickService.showButtonHints();
          }
          this.mLog(`Microphon on`);
          this.mMicrophoneFlag = true;
          this.mStartMicrophoneEvent.emit();
        }
      });

      // Stop-Event from Speech-Angular

      this.mIntentStopEvent = this.mIntentService.stopEvent.subscribe(() => {
        // console.log('AgentService.intentStopEvent:', this.mIntentStopFlag);
        this.mLog(`Intent Stop`);
        if ( this.isNavigateMode()) {
            this.actionClickService.hideButtonHints();
        }
        if ( !this.mListenService.isActive() && this.mMicrophoneFlag ) {
          this.mLog(`Microphon off`);
          this.mMicrophoneFlag = false;
          this.mStopMicrophoneEvent.emit();
        }
        this.mStopIntentEvent.emit();
        /* TODO: Assistent sollte nicht mehr gestoppt werden
        if ( this.mIntentStopFlag ) {
            this.mIntentStopFlag = false;
            this.stop( false );
        }
        */
      });

      // Result-Event from Speech-Angular

      this.mIntentResultEvent = this.mIntentService.resultEvent.subscribe((aResult: any) => {
        // console.log('AgentService.intentResultEvent', aResult);
        this.mLog(`Intent Result: ${aResult}`);
        // console.log('AgentService.intentResultEvent:', this.mIntentStopFlag);
        // only emit stop, if not dictate started
        if ( !this.mListenService.isActive() && this.mMicrophoneFlag ) {
          this.mLog(`Microphon off`);
          this.mMicrophoneFlag = false;
          this.mStopMicrophoneEvent.emit();
        }
        // check for valid intent
        if ( !aResult.intent ) {
          this.noMatchEvent.emit();
        } else {
          this.mIntentEvent.emit( aResult );
        }
        if ( aResult.speech ) {
          this.mSpeakEvent.emit( aResult.speech );
          if ( this.isSpeak()) {
            this.mSpeakIntentFlag = true;
            this.speak( aResult.speech );
          } else {
            this.mIntentStopFlag = true;
            this.speakTimeout( aResult.speech );
          }
        } else {
          this.mIntentStopFlag = true;
        }
        this.mIntentStopFlag = false;
        /* TODO: explicit call from ssistant-app
        if ( this._executeIntent( aResult ) !== 0 ) {
          this.mIntentStopFlag = false;
        }
        */
        // TODO: ist not jet here
        // this.mStopEvent.emit();
      });

      // Error-Event from Speech-Angular

      this.mIntentErrorEvent = this.mIntentService.errorEvent.subscribe((aError: any) => {
        // console.log('AgentService.intentErrorEvent:', aError);
        this.mMicrophoneFlag = false;
        this.mIntentService.stop();
        this.error('_initAllIntentEvent.intentErrorEvent', aError.message);
        this.mStopIntentEvent.emit();
        // TODO: insert error handling for user
        this.mLog(`Intent Error: ${aError.message}`);
        // TODO: Assistent sollte nicht mehr gestoppt werden
        // this.stop( false );
        this.mErrorEvent.emit( aError );
      });
      return 0;
    } catch ( aException ) {
      this.exception( '_initAllIntentListenEvent', aException.message );
      return -1;
    }
  }

  /**
   * get current Version of Service
   */

  getVersion(): string {
    return AGENT_VERSION_STRING;
  }

  getBrowserName(): string {
    return SpeechBrowser.getBrowserName();
  }

  // Event-Functions

  /**
   * Speech init event for valid listen service
   *
   * @return {EventEmitter} initEvent
   */

  get initEvent(): EventEmitter<any> {
    if (this.mIntentService) {
      // TODO: EventType funktioniert nicht
      // return this.mIntentService.initEvent;
    }
    return null;
  }

  /**
   * Start event
   */

  get startEvent(): EventEmitter<any> {
    return this.mStartEvent;
  }

  /**
   * Stop event
   */

  get stopEvent(): EventEmitter<any> {
    return this.mStopEvent;
  }

  /**
   * Stop event from User
   */

  get userStopEvent(): EventEmitter<any> {
    return this.mUserStopEvent;
  }

  /**
   * Start Speak event
   */

  get startSpeakEvent(): EventEmitter<any> {
    return this.mStartSpeakEvent;
  }

  /**
   * Stop Speak event
   */

  get stopSpeakEvent(): EventEmitter<any> {
    return this.mStopSpeakEvent;
  }

  /**
   * Speak event
   */

  get speakEvent(): EventEmitter<any> {
    return this.mSpeakEvent;
  }

  /**
   * Start Listen event
   */

  get startListenEvent(): EventEmitter<any> {
    return this.mStartListenEvent;
  }

  /**
   * Stop Listen event
   */

  get stopListenEvent(): EventEmitter<any> {
    return this.mStopListenEvent;
  }

  /**
   * Microphon start event
   */

  get startMicrophoneEvent(): EventEmitter<any> {
    return this.mStartMicrophoneEvent;
  }

  /**
   * Microphon stop event
   */

  get stopMicrophoneEvent(): EventEmitter<any> {
    return this.mStopMicrophoneEvent;
  }

  /**
   * Result event
   */

  get resultEvent(): EventEmitter<any> {
    return this.mResultEvent;
  }

  /**
   * NoMatch event
   */

  get noMatchEvent(): EventEmitter<any> {
    return this.mNoMatchEvent;
  }

  /**
   * Start Intent event
   */

  get startIntentEvent(): EventEmitter<any> {
    return this.mStartIntentEvent;
  }

  /**
   * Stop Intent event
   */

  get stopIntentEvent(): EventEmitter<any> {
    return this.mStopIntentEvent;
  }

  /**
   * Intent event
   */

  get intentEvent(): EventEmitter<any> {
    return this.mIntentEvent;
  }

  /**
   * Answer event
   */

  get answerEvent(): EventEmitter<any> {
    return this.mAnswerEvent;
  }

  /**
   * Context event
   */

  get contextEvent(): EventEmitter<any> {
    return this.mContextEvent;
  }

  /**
   * Error event
   */

  get errorEvent(): EventEmitter<any> {
    return this.mErrorEvent;
  }

  /**
   * Hide Button Event
   */

  get hideEvent(): EventEmitter<any> {
    return this.mHideEvent;
  }

  // service functions

  isModeAllow( aMode: string ): boolean {
    if ( aMode === AGENT_ROUTE_MODE ) {
      return this.isRouteModeAllow();
    }
    if ( aMode === AGENT_NAVIGATE_MODE ) {
      return this.isNavigateModeAllow();
    }
    return false;
  }

  getMode(): string {
    return this.mAgentMode;
  }

  isRouteModeAllow(): boolean {
    return AGENT_ROUTE_FLAG;
  }

  isRouteMode(): boolean {
    if ( this.mAgentMode === AGENT_ROUTE_MODE ) {
      return true;
    }
    return false;
  }

  setRouteMode(): number {
    if ( !this.isRouteModeAllow()) {
      return -1;
    }
    /* TODO: not used jet
    if ( this.mGoogleService ) {
      if ( this.mGoogleService.setCredentials( GOOGLE_APP_KEY, GOOGLE_SERVER_URL, DIALOGFLOW_TOKENSERVER_URL, DIALOGFLOW_PROJECT_ID ) === 0 ) {
        this.mAgentMode = AGENT_ROUTE_MODE;
        return 0;
      }
    }
    return -1;
    */
    this.mAgentMode = AGENT_ROUTE_MODE;
    return 0;
  }

  isNavigateModeAllow(): boolean {
    return AGENT_NAVIGATE_FLAG;
  }

  isNavigateMode(): boolean {
    if ( this.mAgentMode === AGENT_NAVIGATE_MODE ) {
      return true;
    }
    return false;
  }

  setNavigateMode(): number {
    if ( !this.isNavigateModeAllow()) {
      return -1;
    }
    /* TODO: not used jet
    if ( this.mGoogleService ) {
      if ( this.mGoogleService.setCredentials( GOOGLE_APP_KEY, GOOGLE_SERVER_URL, DIALOGFLOW2_TOKENSERVER_URL, DIALOGFLOW2_PROJECT_ID ) === 0 ) {
        this.mAgentMode = AGENT_NAVIGATE_MODE;
        return 0;
      }
    }
    return -1;
    */
    this.mAgentMode = AGENT_NAVIGATE_MODE;
    return 0;
  }

  // context functions

  /**
   * get Context from Agent
   */

  getContext(): AgentContextInterface {
    return this.mAgentContext;
  }

  setContext( aIntentName: string, aIntentSpeech: string, aEntityName: string, aEntityValue: string ): void {
    this.mAgentContext = { intentName: aIntentName, intentSpeech: aIntentSpeech, entityName: aEntityName, entityValue: aEntityValue, intentResult: 0 };
  }

  setContextResult( aResult: number ): void {
    if ( this.mAgentContext ) {
      this.mAgentContext.intentResult = aResult;
    }
  }

  clearContext(): void {
    this.mAgentContext = null;
  }

  sendContextEvent(): void {
    if ( this.mAgentContext ) {
      this.mContextEvent.emit( this.mAgentContext );
    }
  }

  // execute functions

  /**
   * get Entity value
   *
   * @param aIntent - Intent object
   * @param aEntityName - Entity name
   *
   * @return entity value
   */

  _getEntity( aIntent: any, aEntityName: string ): string {
    // console.log('AgentService._getEntity:', aIntent, aEntityName);
    try {
      if ( aIntent.intent && aEntityName ) {
        this.mLog(`_getEntity: intentName = ${aIntent.intent}  entityName = ${aEntityName}`);
        const conceptList = aIntent.conceptList;
        // console.log('AgentService._getEntity: conceptList = ', conceptList, conceptList.length);
        if ( conceptList && conceptList.length > 0 ) {
          // seek entity name
          for ( const concept of conceptList ) {
            // console.log('AgentService._getEntity: concept = ', concept);
            if ( concept.concept === aEntityName ) {
              // console.log('AgentService._getEntity: entityValue = ', concept.value);
              return concept.value;
            }
          }
        }
      }
      return '';
    } catch ( aException ) {
      this.exception( '_getEntity', aException.message );
      return '';
    }
  }

  /**
   * execute with button Entity
   *
   * @param aButtonName - Button Entity Value
   *
   * @return 0 or -1
   */

  _executeButtonEntity( aButtonName: string ): number {
    try {
      // check, if button exist, else run entity-route
      // console.log('AgentService._executeButtonEntity: buttonName = ', aButtonName);
      if ( aButtonName ) {
        const buttonName = aButtonName.toLowerCase();
        if ( this.actionClickService.start( aButtonName ) !== 0 ) {
          if ( this.actionRouteService.executeRouteEntity( aButtonName ) !== 0 ) {
            // TODO: Prompt for Errorhandling
            return -1;
          }
        }
        return 0;
      }
      return -1;
    } catch ( aException ) {
      this.exception( '_executeButtonEntity', aException.message );
      return -1;
    }
  }

  /**
   * Execute the Intent
   *
   * @param aIntent - Daten zum Intent
   */

  _executeIntent( aIntent: any ): number {
    // console.log('AgentService._executeIntent: intent = ', aIntent);
    if ( aIntent && aIntent.intent ) {
      this.mLog(`_executeIntent: intentName = ${aIntent.intent}`);
      let result = -1;
      // filter newspaper group intent
      let buttonName = '';
      if ( aIntent.intent === 'NewspaperGroupIntent') {
        // tslint:disable-next-line: prefer-template
        buttonName = this._getEntity( aIntent, 'newspaper' ) + ' Zeitung';
      } else {
        buttonName = this._getEntity( aIntent, 'button' );
      }
      this.setContext( aIntent.intent, aIntent.speech, 'button', buttonName);
      // console.log('AssistentService._executeIntent: button = ', buttonName);
      // check for button entity
      if ( buttonName && this._executeButtonEntity( buttonName ) === 0 ) {
        this.sendContextEvent();
        return 0;
      }
      result = this.actionRouteService.executeRouteIntent( aIntent );
      if ( result !== 0 ) {
        switch ( aIntent.intent ) {
          case 'DefaultWelcomeIntent':
            result = -1;
            break;

          case 'DefaultFallbackIntent':
            result = -1;
            break;

          case 'HelpUseIntent':
            result = -1;
            break;

          case 'HelpIntent':
            result = -1;
            break;

          default:
            result = -1;
            break;
        }
      }
      this.setContextResult( result );
      this.sendContextEvent();
      return result;
    }
    return -1;
  }

  /**
   * get Confirm Question
   *
   * @param aIntent - intent Object
   */

  findConfirmQuestion( aIntent: any ): string {
    let confirmQuestion = '';
    if ( aIntent && aIntent.intent ) {
      confirmQuestion = AGENT_INTENTCONFIRM_MAP[ aIntent.intent ];
      if ( !confirmQuestion ) {
        let buttonName = '';
        if ( aIntent.intent === 'NewspaperGroupIntent') {
          // tslint:disable-next-line: prefer-template
          buttonName = this._getEntity( aIntent, 'newspaper' ) + ' Zeitung';
        } else {
          buttonName = this._getEntity( aIntent, 'button' );
        }
        confirmQuestion = AGENT_ENTITYCONFIRM_MAP[ buttonName.toLowerCase()];
      }
    }
    return confirmQuestion;
  }

  /**
   * check extern Lock from help or dictate
   */

  isExternLock(): boolean {
    return ( this.mLockServiceName && this.mLockServiceName !== SERVICE_AGENT_NAME ) ? true : false;
  }

  /**
   * check self Lock
   */

  isLock(): boolean {
    return ( this.mLockServiceName === SERVICE_AGENT_NAME ) ? true : false;
  }

  /**
   * set Welcome-Text for Agent
   *
   * @param aText - Welcome Text for text to speech by start the Agent
   */

  setWelcomeText( aText: string ): void {
      this.mWelcomeText = aText;
  }

  /**
   * start assistant
   */

  start(): number {
      // console.log('AgentService.start: isExternLock = ', this.isExternLock(), this.mLockServiceName);
      if ( this.isActive() && !this.isLock() && !this.isRunning()) {
          this.mRunningFlag = true;
          this.serviceLock.forceLock( SERVICE_AGENT_NAME );
          this.mStartEvent.emit();
          if ( this.isNavigateMode()) {
            this.actionClickService.showButtonHints();
          }
          if ( this.mWelcomeText ) {
              this.speak( this.mWelcomeText, true );
          }
          return 0;
      }
      return -1;
  }

  /**
   * Stop assistant
   *
   * @return {number} errorcode(0,-1)
   */

  stop( aUserFlag = true ): number {
      // console.log('AgentService.stop: isExternLock = ', this.isExternLock(), this.mLockServiceName);
      if ( this.isLock() && this.isRunning()) {
          if ( this.isNavigateMode()) {
              this.actionClickService.hideButtonHints();
          }
          if ( this.mListenService ) {
              this.mListenService.stop();
          }
          if ( aUserFlag && this.mSpeakService ) {
              this.mSpeakService.stop();
          }
          let result = -1;
          if ( this.mIntentService ) {
              // user has stopped listen
              // console.log('AgentService.stop: user has stopped');
              result = this.mIntentService.stop();
          }
          if ( aUserFlag ) {
              this.mUserStopEvent.emit();
          }
          this.mStopEvent.emit();
          this.serviceLock.unlock( SERVICE_AGENT_NAME );
          this.mRunningFlag = false;
          return result;
      }
      return -1;
  }

  /**
   * Check, if intent service initalized
   *
   * @return {boolean}
   */

  isInit(): boolean {
    if ( this.mIntentService ) {
      return this.mIntentService.isInit();
    }
    return false;
  }

  /**
   * Check, if intent service active
   *
   * @return {boolean}
   */

  isActive(): boolean {
    if ( this.mIntentService ) {
      return this.mIntentService.isActive();
    }
    return false;
  }

  /**
   * Check, if Intent only run with Dictate
   */

  isOnlyDictate(): boolean {
    return AGENT_ONLYDICTATE_FLAG;
  }

  /**
   * Check, if assistant running
   *
   * @return {boolean}
   */

  isRunning(): boolean {
    return this.mRunningFlag;
  }

  /**
   * Check, if microphon on
   *
   * @return {boolean}
   */

  isMicrophone(): boolean {
    return this.mMicrophoneFlag;
  }

  // Language-Functions

  /**
   * set language Code (de, en)
   *
   * @param aLanguageCode
   */

  setLanguage( aLanguageCode: string): number {
    // console.log('AgentService.setLanguage: ', languageCode);
    if ( this.mSpeakService && this.mListenService && this.mIntentService ) {
      if ( this.mSpeakService.setLanguage( aLanguageCode ) !== 0 ) {
        return -1;
      }
      if ( this.mListenService.setLanguage( aLanguageCode ) === 0 ) {
        return this.mIntentService.setLanguage( aLanguageCode );
      }
    }
    return -1;
  }

  /**
   * get current language code (de,en)
   */

  getLanguage(): string {
    if ( this.mIntentService ) {
      return this.mIntentService.getLanguage();
    }
    // Default-Language
    return AGENT_DEFAULT_LANGUAGE;
  }

  // action function

  /**
   * run Intent as Action
   *
   * @param aIntent - Intent Object for Action
   */

  action( aIntent: any ): number {
      // console.log('AgentService.action: isLock = ', this.isLock());
      if ( this.isLock()) {
          return this._executeIntent( aIntent );
      }
      return -1;
  }

  // intent function

  /**
   * start Intent analysis
   *
   * @param aText - Text for Intent analysis
   */

  intent( aText: string ): number {
      console.log('AgentService.intent: isLock = ', this.isLock(), '  text = ', aText);
      if ( this.isLock()) {
          if ( this.mSpeakService ) {
              this.mSpeakService.stop();
          }
          if ( this.mListenService ) {
              this.mListenService.stop();
          }
          // Intent mit Text aufrufen
          if ( this.mIntentService ) {
              // console.log('AgentService.intent: start Intent mit Text = ', aResult);
              this.mIntentService.text = aText;
              this.query( aText );
              return this.mIntentService.start();
          }
      }
      return -1;
  }

  // Query von Wissensserver

  /**
   * start Intent analysis
   *
   * @param aText - Text for Intent analysis
   */

  query( aText: string ): number {
    console.log('AgentService.query: isLock = ', this.isLock(), '  text = ', aText);
    if ( this.isLock()) {
        if ( this.mSpeakService ) {
            this.mSpeakService.stop();
        }
        if ( this.mListenService ) {
            this.mListenService.stop();
        }
        // Query mit Text aufrufen
        if ( queryZoe ) {
            // console.log('AgentService.query: start Intent mit Text = ', aResult);
            queryZoe( aText, (aError: any, aAnswer: string) => {
              if ( aError ) {
                console.log('AgentService.Query: error = ', aError);
              } else {
                console.log('AgentService.Query: answer = ', aAnswer);
                this.mAnswerEvent.emit( aAnswer );
                if ( this.mSpeakFlag ) {
                  this.speak( aAnswer );
                }
              }
            });
            return 0;
        }
    }
    return -1;
  }

  // listen functions

  /**
   * start listen for speech to text
   */

  listen(): number {
    console.log('AgentService.listen: isLock = ', this.isLock());
    if ( this.isLock()) {
        if ( this.mSpeakService ) {
            this.mSpeakService.stop();
        }
        console.log('AgentService.listen: active = ', this.mListenService.isActive());
        if ( this.mListenService && this.mListenService.isActive()) {
            this.mListenService.setMode( LISTEN_COMMAND_MODE );
            console.log('AgentService.Listen: start listen');
            return this.mListenService.start();
        }
        // check, if assistant run without dictate
        if ( !this.isOnlyDictate()) {
            if ( this.mIntentService && this.mIntentService.isActive()) {
                // console.log('AgentService.listen: start intent ohne Text');
                return this.mIntentService.start();
            }
        }
    }
    return -1;
  }

  stopListen(): number {
    if ( this.mListenService ) {
      if ( this.mListenService.isActive()) {
        return this.mListenService.stop();
      } else {
        if ( this.mIntentService ) {
          return this.mIntentService.stop();
        }
      }
    }
    return -1;
  }

  // speak functions

  isSpeak(): boolean {
    return this.mSpeakFlag;
  }

  setSpeakOff(): void {
    this.mSpeakFlag = false;
  }

  setSpeakOn(): void {
    this.mSpeakFlag = true;
  }

  /**
   * output text to speech
   *
   * @param aText - text to speech output
   *
   * @return 0 or -1
   */

  speak( aText: string, aListenFlag = false ): number {
      let result = -1;
      // console.log('AgentService.speak:', aText, aListenFlag );
      // if ( this.isLock() && this.isSpeak()) {
      if ( this.isLock()) {
          if ( this.mListenService ) {
              this.mListenService.stop();
          }
          if ( this.mSpeakService && this.mSpeakService.isTTS()) {
              // console.log('AgentService.speak: ', aText, aListenFlag);
              this.mSpeakService.stop();
              this.mSpeakService.audio = false;
              this.mSpeakService.text = aText;
              this.mSpeakListenFlag = aListenFlag;
              result = this.mSpeakService.start();
          }
      }
      return result;
  }

  stopSpeak(): number {
    if ( this.mSpeakService && this.mSpeakService.isTTS()) {
      // console.log('AgentService.stopSpeak');
      return this.mSpeakService.stop();
    }
    return -1;
  }

  /**
   * Simulation of spoken Text from Agent
   *
   * @param aText - simulate spoken Text
   */

  speakTimeout( aText: string ): number {
    // console.log( 'AgentService.speakTimeout: start');
    /* TODO: not use jet
    this.mStartSpeakEvent.emit();
    const length = aText.length;
    let div = 10;
    if ( length > 100 ) {
      div = 12;
    }
    if ( length > 200 ) {
      div = 14;
    }
    if ( length > 300 ) {
      div = 16;
    }
    const timeout = Math.floor( aText.length / div) * 1000;
    // console.log( 'AgentService.speakTimeout:', length, timeout);
    const timeoutId = setTimeout( () => this.mStopSpeakEvent.emit(), timeout);
    return 0;
    */
    const timeout = 0;
    // console.log( 'AgentService.speakTimeout:', length, timeout);
    const timeoutId = setTimeout( () => this.mStopSpeakEvent.emit(), timeout);
    return 0;
  }

}
