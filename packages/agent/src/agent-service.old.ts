/** @packageDocumentation
 * AgentService akls Verbindung aus Listen, Intent und Speak
 *
 * API-Version: 1.0
 *
 * Last Change: 28.10.2020
 * Quality Status: red
 *
 * @module agent
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// commmon

import { SpeechBrowser } from '@speech/common';


// intent

import { IntentService } from '@speech/intent';


// listen

import { ListenService, LISTEN_COMMAND_MODE, LISTEN_HTML5_ASR } from '@speech/listen';


// speak

import { SpeakService } from '@speech/speak';


// google

import { GoogleService } from '@speech/cloud-google';


// service

import {
  SERVICE_AGENT_NAME,
  SERVICE_GOOGLE_NAME,
  SERVICE_SPEAK_NAME,
  SERVICE_LISTEN_NAME,
  SERVICE_INTENT_NAME,
  EventEmitter,
  ServiceLock,
  ServiceManager,
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


  private _log = AgentLogger.extend('agent');


  /**
   * The delegate Speech-Angular Servives
   */

  private _googleService: GoogleService = null;
  private _speakService: SpeakService;
  private _listenService: ListenService = null;
  private _intentService: IntentService = null;

  /**
   * the Events for lock, listen and intent
   */

  private _lockEvent = null;
  private _unlockEvent = null;

  private _speakStartEvent = null;
  private _speakStopEvent = null;
  private _speakErrorEvent = null;

  private _listenStartEvent = null;
  private _listenStopEvent = null;
  private _listenStartAudioEvent = null;
  private _listenStopAudioEvent = null;
  private _listenResultEvent = null;
  private _listenNoMatchEvent = null;
  private _listenErrorEvent = null;

  private _intentStartEvent = null;
  private _intentStopEvent = null;
  private _intentResultEvent = null;
  private _intentErrorEvent = null;

  /**
   * The user stop Event, break Agent from User
   */

  private _userStopEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant
   */

  private _startEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant.
   */

  private _stopEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant speech output
   */

  private _startSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant speech output
   */

  private _stopSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The speak Event for assistant speech output
   */

  private _speakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant speech input
   */

  private _startListenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant speech input
   */

  private _stopListenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for Microphon.
   */

  private _startMicrophoneEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for Microphon.
   */

  private _stopMicrophoneEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The result Event for listen.
   */

  private _resultEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The result Event for listen.
   */

  private _noMatchEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The start Event for assistant speech intention
   */

  private _startIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The stop Event for assistant speech intention
   */

  private _stopIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The result Event for Intent.
   */

  private _intentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The context Event for Intent.
   */

  private _contextEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The error Event
   */

  private _errorEvent: EventEmitter<any> = new EventEmitter();

  /**
   * The hide Event for listen.
   */

  private _hideEvent: EventEmitter<any> = new EventEmitter();

  /**
   * is Listen Running
   */

  private _runningFlag = false;

  /**
   * is Microphon
   */

  private _microphoneFlag = false;

  /**
   * is Speak output
   */

  private _speakFlag = false;

  /**
   * Mode ist Route or Navigate
   *
   * Route:     Dialogflow-Agent for URL-Route
   * Navigate:  Dialogflow-Agent for Button-Navigation
   */

  private _agentMode = AGENT_ROUTE_MODE;

  /**
   * Agent Welcome Text
   */

  private _welcomeText = '';
  private _speakListenFlag = false;
  private _speakIntentFlag = false;
  private _intentStopFlag = false;

  /**
   * Agent Context
   */

  private _agentContext: AgentContextInterface = null;

  /**
   * set lock service name
   */

  private _lockServiceName = '';
  private _lastLockServiceName = '';
  private _unlockFlag = false;


  /**
   * Constructor for injected Router and ActivatedRoute
   *
   * @param actionClickService - externer Service fuer Ausfuehrung von Clicks
   * @param actionRouteService - externer Service fuer Ausfuehrung von Routing
   */

  constructor( private serviceLock: ServiceLock, private actionClickService: ActionClickInterface, private actionRouteService: ActionRouteInterface ) {
    super( 'AgentService' );

    // console.log('AssistantService.constructor');


    // Check, if no assistant Service
    if ( !AGENT_SERVICE_ON ) {
        // no assistant service available
        this._log('Agent not available');
        return;
    }

    this.setErrorOutput( AGENT_ERROROUTPUT_FLAG );

    // Version output

    // console.log('Agent Version: ', this.getVersion());
    this._log(`Agent Version: ${this.getVersion()}`);


    // lokale Komponenten

    this.serviceLock = new ServiceLock();


    // create all speech-angular services

    this._initGoogleService();
    this._initSpeakService();
    this._initListenService();
    this._initIntentService();


    // create all events

    this._initAllLockEvent();
    this._initAllSpeakEvent();
    this._initAllListenEvent();
    this._initAllIntentEvent();


    // Browser testen

    this._log(`Browser: ${this.getBrowserName()}`);
    if ( this.getBrowserName() !== 'Chrome' ) {
      this._log('running not on Chrome, listen is not available');
      this._listenService.setActiveOff();
    }


    // check, if listen active

    if ( AGENT_ONLYDICTATE_FLAG && !this._listenService.isActive()) {
      this._log('Agent is deactivated');
      this._intentService.setActiveOff();
    }


    // set Default-Language

    if ( this._intentService.isActive()) {
      this.setLanguage( AGENT_DEFAULT_LANGUAGE );
      this._log(`Language: ${this.getLanguage()}`);
    }

    this._listenService.setASR( LISTEN_HTML5_ASR );
    this._listenService.setTimeout( AGENT_STOP_TIMEOUT );
    this._log(`listen active: ${this._listenService.isActive()}`);
    this._log(`intent active: ${this._intentService.isActive()}`);
  }


  // init functions


  /**
   * create GoogleService from Speech-Angular
   *
   * @private
   */

  _initGoogleService(): number {
    try {
      this._googleService = ServiceManager.get( SERVICE_GOOGLE_NAME, GoogleService, {});
      if ( !this._googleService ) {
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
   * create SpeakService from Speech-Angular
   */

  _initSpeakService(): number {
    try {
      const speakOption = {
        // errorOutputFlag: true,
      };
      this._speakService = ServiceManager.get( SERVICE_SPEAK_NAME, SpeakService, speakOption );
      if ( !this._speakService ) {
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
        // errorOutputFlag: true
      };
      this._listenService = ServiceManager.get( SERVICE_LISTEN_NAME, ListenService, listenOption );
      if ( !this._listenService ) {
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
      this._intentService = ServiceManager.get( SERVICE_INTENT_NAME, IntentService, intentOption );
      if ( !this._intentService ) {
        this.error( 'initIntentService', 'no IntentService' );
        return -1;
      }
      return 0;
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

      this._lockEvent = this.serviceLock.lockEvent.subscribe((aServiceName: string) => {
        // console.log('AssistantService.lockEvent:', this._lockServiceName, aServiceName);
        this._lockServiceName = aServiceName;
        this._lastLockServiceName = '';
      });

      // Unlock-Event

      this._unlockEvent = this.serviceLock.unlockEvent.subscribe((aServiceName: string) => {
        if ( !this._unlockFlag ) {
          this._unlockFlag = true;
          // console.log('AssistantService.unlockEvent:', aServiceName);
          this._lastLockServiceName = this._lockServiceName;
          if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
            this.stop( false );
          }
          this._unlockFlag = false;
        }
        this._lockServiceName = '';
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

      this._speakStartEvent = this._speakService.startEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.speakStartEvent:', this._lockServiceName);
          this._log(`Speak Start`);
          this._startSpeakEvent.emit();
        }
      });

      // Stop-Event

      this._speakStopEvent = this._speakService.stopEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME || this._lastLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.speakStopEvent:', this._lockServiceName);
          this._log(`Speak Stop`);
          this._stopSpeakEvent.emit();
          // pruefen, ob Listen gestartet werden soll
          if ( this._speakListenFlag ) {
            this._speakListenFlag = false;
            this.listen();
          }
          if ( this._speakIntentFlag ) {
            this._speakIntentFlag = false;
            this.stop( false );
          }
        }
      });

      // Error-Event

      this._speakErrorEvent = this._speakService.errorEvent.subscribe((aError: any) => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.speakErrorEvent:', aError.message);
          // tslint:disable-next-line: prefer-template
          if ( aError.message !== 'TTSHtml5._breakSynthesis: Kein SpeechSynthesis-Service vorhanden' ) {
            this.error( '_initAllSpeakEvent.speakErrorEvent', this._lockServiceName + ' ' + aError.message );
            this._speakService.stop();
            this._stopSpeakEvent.emit();
            // TODO: insert error handling for user
            this._log(`Speak Error: ${aError.message}`);
            this.stop( false );
            this._errorEvent.emit( aError );
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

      this._listenStartEvent = this._listenService.startEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.listenStartEvent:', this._lockServiceName);
          this._log(`Listen Start`);
          this._startListenEvent.emit();
        }
      });

      // Stop-Event

      this._listenStopEvent = this._listenService.stopEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME || this._lastLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.listenStopEvent:', this._lockServiceName);
          this._log(`Listen Stop`);
          this._stopListenEvent.emit();
        }
      });

      // Start-Event for Microphon

      this._listenStartAudioEvent = this._listenService.audioStartEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.listenStartAudioEvent:', this._lockServiceName);
          this._microphoneFlag = true;
          if ( this.isNavigateMode()) {
            this.actionClickService.showButtonHints();
          }
          this._log(`Microphon on`);
          this._startMicrophoneEvent.emit();
        }
      });

      // Stop-Event for Microphon

      this._listenStopAudioEvent = this._listenService.audioStopEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME || this._lastLockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.listenStopAudioEvent:', this._lockServiceName);
          this._microphoneFlag = false;
          if ( this.isNavigateMode()) {
            this.actionClickService.hideButtonHints();
          }
          this._log(`Microphon off`);
          this._stopMicrophoneEvent.emit();
        }
      });

      // Result-Event from Speech-Angular

      this._listenResultEvent = this._listenService.resultEvent.subscribe((aResult: any) => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.listenResultEvent:', this._lockServiceName, aResult);
          this._log(`Listen Result: ${aResult}`);
          this._resultEvent.emit( aResult );
          this.intent( aResult );
        }
      });

      // Result-Event from Speech-Angular

      this._listenNoMatchEvent = this._listenService.noMatchEvent.subscribe(() => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.listenNoMatchEvent:', this._lockServiceName, AGENT_NOMATCH_TEXT);
          this._log(`Listen NoMatch`);
          this._noMatchEvent.emit();
        }
      });

      // Error-Event from Speech-Angular

      this._listenErrorEvent = this._listenService.errorEvent.subscribe((aError: any) => {
        if ( this._lockServiceName === SERVICE_AGENT_NAME ) {
          // console.log('AssistantService.error:', aError);
          // tslint:disable-next-line: prefer-template
          this._listenService.stop();
          this._microphoneFlag = false;
          // tslint:disable-next-line: prefer-template
          this.error( '_initAllListenEvent.listenErrorEvent', this._lockServiceName + ' ' + aError.message );
          this._stopListenEvent.emit();
          // this._hideEvent.emit();
          // TODO: insert error handling for user
          this._log(`Listen Error: ${aError.message}`);
          this.stop( false );
          this._errorEvent.emit( aError );
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
    if ( !this._intentService ) {
      return -1;
    }
    // console.log('AssistantService._initAllIntentEvent: start');
    try {
      // Start-Event from Speech-Angular

      this._intentStartEvent = this._intentService.startEvent.subscribe(() => {
        // console.log('AssistantService.intentStartEvent');
        this._log(`Intent Start`);
        this._startIntentEvent.emit();
        // only emit start microphone, if not dictate started
        if ( !this._listenService.isActive()) {
          if ( this.isNavigateMode()) {
            this.actionClickService.showButtonHints();
          }
          this._log(`Microphon on`);
          this._microphoneFlag = true;
          this._startMicrophoneEvent.emit();
        }
      });

      // Stop-Event from Speech-Angular

      this._intentStopEvent = this._intentService.stopEvent.subscribe(() => {
        // console.log('AssistantService.intentStopEvent:', this._intentStopFlag);
        this._log(`Intent Stop`);
        if ( this.isNavigateMode()) {
            this.actionClickService.hideButtonHints();
        }
        if ( !this._listenService.isActive() && this._microphoneFlag ) {
          this._log(`Microphon off`);
          this._microphoneFlag = false;
          this._stopMicrophoneEvent.emit();
        }
        this._stopIntentEvent.emit();
        if ( this._intentStopFlag ) {
            this._intentStopFlag = false;
            this.stop( false );
        }
      });

      // Result-Event from Speech-Angular

      this._intentResultEvent = this._intentService.resultEvent.subscribe((aResult: any) => {
        // console.log('AssistantService.intentResultEvent', aResult);
        this._log(`Intent Result: ${aResult}`);
        // console.log('AssistantService.intentResultEvent:', this._intentStopFlag);
        // only emit stop, if not dictate started
        if ( !this._listenService.isActive() && this._microphoneFlag ) {
          this._log(`Microphon off`);
          this._microphoneFlag = false;
          this._stopMicrophoneEvent.emit();
        }
        // check for valid intent
        if ( !aResult.intent ) {
          this.noMatchEvent.emit();
        } else {
          this._intentEvent.emit( aResult );
        }
        if ( aResult.speech ) {
          this._speakEvent.emit( aResult.speech );
          if ( this.isSpeak()) {
            this._speakIntentFlag = true;
            this.speak( aResult.speech );
          } else {
            this._intentStopFlag = true;
            this.speakTimeout( aResult.speech );
          }
        } else {
          this._intentStopFlag = true;
        }
        this._intentStopFlag = false;
        /* TODO: explicit call from ssistant-app
        if ( this._executeIntent( aResult ) !== 0 ) {
          this._intentStopFlag = false;
        }
        */
        // TODO: ist not jet here
        // this._stopEvent.emit();
      });

      // Error-Event from Speech-Angular

      this._intentErrorEvent = this._intentService.errorEvent.subscribe((aError: any) => {
        // console.log('AssistantService.intentErrorEvent:', aError);
        this._microphoneFlag = false;
        this._intentService.stop();
        this.error('_initAllIntentEvent.intentErrorEvent', aError.message);
        this._stopIntentEvent.emit();
        // TODO: insert error handling for user
        this._log(`Intent Error: ${aError.message}`);
        this.stop( false );
        this._errorEvent.emit( aError );
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

  getBrowserName() {
    return SpeechBrowser.getBrowserName();
  }

  // Event-Functions

  /**
   * Speech init event for valid listen service
   *
   * @return {EventEmitter} initEvent
   */

  get initEvent() {
    if (this._intentService) {
      return this._intentService.initEvent;
    }
    return null;
  }

  /**
   * Start event
   */

  get startEvent() {
    return this._startEvent;
  }

  /**
   * Stop event
   */

  get stopEvent() {
    return this._stopEvent;
  }

  /**
   * Stop event from User
   */

  get userStopEvent() {
    return this._userStopEvent;
  }

  /**
   * Start Speak event
   */

  get startSpeakEvent() {
    return this._startSpeakEvent;
  }

  /**
   * Stop Speak event
   */

  get stopSpeakEvent() {
    return this._stopSpeakEvent;
  }

  /**
   * Speak event
   */

  get speakEvent() {
    return this._speakEvent;
  }

  /**
   * Start Listen event
   */

  get startListenEvent() {
    return this._startListenEvent;
  }

  /**
   * Stop Listen event
   */

  get stopListenEvent() {
    return this._stopListenEvent;
  }

  /**
   * Microphon start event
   */

  get startMicrophoneEvent() {
    return this._startMicrophoneEvent;
  }

  /**
   * Microphon stop event
   */

  get stopMicrophoneEvent() {
    return this._stopMicrophoneEvent;
  }

  /**
   * Result event
   */

  get resultEvent() {
    return this._resultEvent;
  }

  /**
   * NoMatch event
   */

  get noMatchEvent() {
    return this._noMatchEvent;
  }

  /**
   * Start Intent event
   */

  get startIntentEvent() {
    return this._startIntentEvent;
  }

  /**
   * Stop Intent event
   */

  get stopIntentEvent() {
    return this._stopIntentEvent;
  }

  /**
   * Intent event
   */

  get intentEvent() {
    return this._intentEvent;
  }

  /**
   * Context event
   */

  get contextEvent() {
    return this._contextEvent;
  }

  /**
   * Error event
   */

  get errorEvent() {
    return this._errorEvent;
  }

  /**
   * Hide Button Event
   */

  get hideEvent() {
    return this._hideEvent;
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
    return this._agentMode;
  }

  isRouteModeAllow(): boolean {
    return AGENT_ROUTE_FLAG;
  }

  isRouteMode(): boolean {
    if ( this._agentMode === AGENT_ROUTE_MODE ) {
      return true;
    }
    return false;
  }

  setRouteMode(): number {
    if ( !this.isRouteModeAllow()) {
      return -1;
    }
    /* TODO: not used jet
    if ( this._googleService ) {
      if ( this._googleService.setCredentials( GOOGLE_APP_KEY, GOOGLE_SERVER_URL, DIALOGFLOW_TOKENSERVER_URL, DIALOGFLOW_PROJECT_ID ) === 0 ) {
        this._agentMode = AGENT_ROUTE_MODE;
        return 0;
      }
    }
    return -1;
    */
    this._agentMode = AGENT_ROUTE_MODE;
    return 0;
  }

  isNavigateModeAllow(): boolean {
    return AGENT_NAVIGATE_FLAG;
  }

  isNavigateMode(): boolean {
    if ( this._agentMode === AGENT_NAVIGATE_MODE ) {
      return true;
    }
    return false;
  }

  setNavigateMode(): number {
    if ( !this.isNavigateModeAllow()) {
      return -1;
    }
    /* TODO: not used jet
    if ( this._googleService ) {
      if ( this._googleService.setCredentials( GOOGLE_APP_KEY, GOOGLE_SERVER_URL, DIALOGFLOW2_TOKENSERVER_URL, DIALOGFLOW2_PROJECT_ID ) === 0 ) {
        this._agentMode = AGENT_NAVIGATE_MODE;
        return 0;
      }
    }
    return -1;
    */
    this._agentMode = AGENT_NAVIGATE_MODE;
    return 0;
  }

  // context functions

  /**
   * get Context from Agent
   */

  getContext(): AgentContextInterface {
    return this._agentContext;
  }

  setContext( aIntentName: string, aIntentSpeech: string, aEntityName: string, aEntityValue: string ): void {
    this._agentContext = { intentName: aIntentName, intentSpeech: aIntentSpeech, entityName: aEntityName, entityValue: aEntityValue, intentResult: 0 };
  }

  setContextResult( aResult: number ): void {
    if ( this._agentContext ) {
      this._agentContext.intentResult = aResult;
    }
  }

  clearContext(): void {
    this._agentContext = null;
  }

  sendContextEvent(): void {
    if ( this._agentContext ) {
      this._contextEvent.emit( this._agentContext );
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
    // console.log('AssistantService._getEntity:', aIntent, aEntityName);
    try {
      if ( aIntent.intent && aEntityName ) {
        this._log(`_getEntity: intentName = ${aIntent.intent}  entityName = ${aEntityName}`);
        const conceptList = aIntent.conceptList;
        // console.log('AssistantService._getEntity: conceptList = ', conceptList, conceptList.length);
        if ( conceptList && conceptList.length > 0 ) {
          // seek entity name
          for ( const concept of conceptList ) {
            // console.log('AssistantService._getEntity: concept = ', concept);
            if ( concept.concept === aEntityName ) {
              // console.log('AssistantService._getEntity: entityValue = ', concept.value);
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
      // console.log('AssistantService._executeButtonEntity: buttonName = ', aButtonName);
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
    // console.log('AssistantService._executeIntent: intent = ', aIntent);
    if ( aIntent && aIntent.intent ) {
      this._log(`_executeIntent: intentName = ${aIntent.intent}`);
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
    return ( this._lockServiceName && this._lockServiceName !== SERVICE_AGENT_NAME ) ? true : false;
  }

  /**
   * check self Lock
   */

  isLock(): boolean {
    return ( this._lockServiceName === SERVICE_AGENT_NAME ) ? true : false;
  }

  /**
   * set Welcome-Text for Agent
   *
   * @param aText - Welcome Text for text to speech by start the Agent
   */

  setWelcomeText( aText: string ): void {
      this._welcomeText = aText;
  }

  /**
   * start assistant
   */

  start(): number {
      // console.log('AssistantService.start: isExternLock = ', this.isExternLock(), this._lockServiceName);
      if ( this.isActive() && !this.isLock() && !this.isRunning()) {
          this._runningFlag = true;
          this.serviceLock.forceLock( SERVICE_AGENT_NAME );
          this._startEvent.emit();
          if ( this.isNavigateMode()) {
            this.actionClickService.showButtonHints();
          }
          if ( this._welcomeText ) {
              this.speak( this._welcomeText, true );
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
      // console.log('AssistantService.stop: isExternLock = ', this.isExternLock(), this._lockServiceName);
      if ( this.isLock() && this.isRunning()) {
          if ( this.isNavigateMode()) {
              this.actionClickService.hideButtonHints();
          }
          if ( this._listenService ) {
              this._listenService.stop();
          }
          if ( aUserFlag && this._speakService ) {
              this._speakService.stop();
          }
          let result = -1;
          if ( this._intentService ) {
              // user has stopped listen
              // console.log('AssistantService.stop: user has stopped');
              result = this._intentService.stop();
          }
          if ( aUserFlag ) {
              this._userStopEvent.emit();
          }
          this._stopEvent.emit();
          this.serviceLock.unlock( SERVICE_AGENT_NAME );
          this._runningFlag = false;
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
    if ( this._intentService ) {
      return this._intentService.isInit();
    }
    return false;
  }

  /**
   * Check, if intent service active
   *
   * @return {boolean}
   */

  isActive(): boolean {
    if ( this._intentService ) {
      return this._intentService.isActive();
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
    return this._runningFlag;
  }

  /**
   * Check, if microphon on
   *
   * @return {boolean}
   */

  isMicrophone(): boolean {
    return this._microphoneFlag;
  }

  // Language-Functions

  /**
   * set language Code (de, en)
   *
   * @param aLanguageCode
   */

  setLanguage( aLanguageCode: string): number {
    // console.log('AssistantService.setLanguage: ', languageCode);
    if ( this._speakService && this._listenService && this._intentService ) {
      if ( this._speakService.setLanguage( aLanguageCode ) !== 0 ) {
        return -1;
      }
      if ( this._listenService.setLanguage( aLanguageCode ) === 0 ) {
        return this._intentService.setLanguage( aLanguageCode );
      }
    }
    return -1;
  }

  /**
   * get current language code (de,en)
   */

  getLanguage(): string {
    if ( this._intentService ) {
      return this._intentService.getLanguage();
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

  action( aIntent: any ) {
      // console.log('AssistantService.action: isLock = ', this.isLock());
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
      // console.log('AssistantService.intent: isLock = ', this.isLock());
      if ( this.isLock()) {
          if ( this._speakService ) {
              this._speakService.stop();
          }
          if ( this._listenService ) {
              this._listenService.stop();
          }
          // Intent mit Text aufrufen
          if ( this._intentService ) {
              // console.log('AssistantService.listenResultEvent: start Intent mit Text = ', aResult);
              this._intentService.text = aText;
              return this._intentService.start();
          }
      }
      return -1;
  }

  // listen functions

  /**
   * start listen for speech to text
   */

  listen(): number {
    // console.log('AssistantService.listen: isLock = ', this.isLock());
    if ( this.isLock()) {
        if ( this._speakService ) {
            this._speakService.stop();
        }
        // console.log('AssistantService.listen: navigateMode = ', this.isNavigateMode());
        if ( this._listenService && this._listenService.isActive()) {
            this._listenService.setMode( LISTEN_COMMAND_MODE );
            // console.log('AssistantService.Listen: start listen');
            return this._listenService.start();
        }
        // check, if assistant run without dictate
        if ( !this.isOnlyDictate()) {
            if ( this._intentService && this._intentService.isActive()) {
                // console.log('AssistantService.listen: start intent ohne Text');
                return this._intentService.start();
            }
        }
    }
    return -1;
  }

  stopListen(): number {
    if ( this._listenService ) {
      if ( this._listenService.isActive()) {
        return this._listenService.stop();
      } else {
        if ( this._intentService ) {
          return this._intentService.stop();
        }
      }
    }
    return -1;
  }

  // speak functions

  isSpeak(): boolean {
    return this._speakFlag;
  }

  setSpeakOff(): void {
    this._speakFlag = false;
  }

  setSpeakOn(): void {
    this._speakFlag = true;
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
      // console.log('AssistantService.speak:', aText, aListenFlag );
      // if ( this.isLock() && this.isSpeak()) {
      if ( this.isLock()) {
          if ( this._listenService ) {
              this._listenService.stop();
          }
          if ( this._speakService && this._speakService.isTTS()) {
              // console.log('AssistantService.speak: ', aText, aListenFlag);
              this._speakService.stop();
              this._speakService.audio = false;
              this._speakService.text = aText;
              this._speakListenFlag = aListenFlag;
              result = this._speakService.start();
          }
      }
      return result;
  }

  stopSpeak(): number {
    if ( this._speakService && this._speakService.isTTS()) {
      // console.log('AssistantService.stopSpeak');
      return this._speakService.stop();
    }
    return -1;
  }

  /**
   * Simulation of spoken Text from Agent
   *
   * @param aText - simulate spoken Text
   */

  speakTimeout( aText: string ): number {
    // console.log( 'AssistantService.speakTimeout: start');
    /* TODO: not use jet
    this._startSpeakEvent.emit();
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
    // console.log( 'AssistantService.speakTimeout:', length, timeout);
    const timeoutId = setTimeout( () => this._stopSpeakEvent.emit(), timeout);
    return 0;
    */
    const timeout = 0;
    // console.log( 'AssistantService.speakTimeout:', length, timeout);
    const timeoutId = setTimeout( () => this._stopSpeakEvent.emit(), timeout);
    return 0;
  }

}
