/** @packageDocumentation
 * Mock AssistantService for Unit-Tests
 *
 * API-Version: 1.0
 *
 * Letzte Aenderung: 28.10.2020
 * Status: red
 *
 * @module agent
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// service

import { EventEmitter } from '@speech/service';


// agent

import {
    AGENT_DEFAULT_LANGUAGE,
    AGENT_ROUTE_MODE,
    AGENT_NAVIGATE_MODE,
    AGENT_ROUTE_FLAG,
    AGENT_NAVIGATE_FLAG
} from './agent-const';
import { AGENT_VERSION_STRING } from './agent-version';
import { AgentServiceInterface } from './agent-service.interface';


// Mock Class for AssistantService

export class AgentServiceMock extends ErrorBase implements AgentServiceInterface {

  initResult = 0;

  language = AGENT_DEFAULT_LANGUAGE;
  assistantMode = AGENT_ROUTE_MODE;

  initFlag = true;
  activeFlag = false;
  runningFlag = false;
  microphoneFlag = false;
  speakFlag = true;

  /**
   * init event emitter
   */
  initEvent: EventEmitter<any> = new EventEmitter();

  /**
   * start event emitter
   */
  startEvent: EventEmitter<any> = new EventEmitter();

  /**
   * stop event emitter
   */
  stopEvent: EventEmitter<any> = new EventEmitter();

  /**
   * user stop event emitter
   */
  userStopEvent: EventEmitter<any> = new EventEmitter();

  /**
   * start event emitter
   */
  startSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * stop event emitter
   */

  stopSpeakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * speak event emitter
   */

  speakEvent: EventEmitter<any> = new EventEmitter();

  /**
   * start event emitter
   */
  startListenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * stop event emitter
   */
  stopListenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * start event emitter
   */
  startMicrophoneEvent: EventEmitter<any> = new EventEmitter();

  /**
   * stop event emitter
   */
  stopMicrophoneEvent: EventEmitter<any> = new EventEmitter();

  /**
   * result event emitter
   */
  resultEvent: EventEmitter<any> = new EventEmitter();

  /**
   * result event emitter
   */
  noMatchEvent: EventEmitter<any> = new EventEmitter();

  /**
   * start event emitter
   */
  startIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * stop event emitter
   */
  stopIntentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * intent event emitter
   */
  intentEvent: EventEmitter<any> = new EventEmitter();

  /**
   * context event emitter
   */
  contextEvent: EventEmitter<any> = new EventEmitter();

  /**
   * result event emitter
   */
  errorEvent: EventEmitter<any> = new EventEmitter();

  /**
   * hide event emitter
   */
  hideEvent: EventEmitter<any> = new EventEmitter();

  welcomeText = '';

  constructor() {
    super( 'AssistantMockService' );
  }

  // Service API

  getVersion(): string {
    return AGENT_VERSION_STRING;
  }

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
    return this.assistantMode;
  }

  isRouteModeAllow(): boolean {
    return AGENT_ROUTE_FLAG;
  }

  isRouteMode(): boolean {
    if ( this.assistantMode === AGENT_ROUTE_MODE ) {
      return true;
    }
    return false;
  }

  setRouteMode(): number {
    this.assistantMode = AGENT_ROUTE_MODE;
    return 0;
  }

  isNavigateModeAllow(): boolean {
    return AGENT_NAVIGATE_FLAG;
  }

  isNavigateMode(): boolean {
    if ( this.assistantMode === AGENT_NAVIGATE_MODE ) {
      return true;
    }
    return false;
  }

  setNavigateMode(): number {
    this.assistantMode = AGENT_NAVIGATE_MODE;
    return 0;
  }

  setWelcomeText( aText: string ): void {
    this.welcomeText = aText;
  }

  findConfirmQuestion( aIntent: any): string {
    return '';
  }

  start(): void {
    this.activeFlag = true;
  }

  stop( aUserFlag = true ): void {
    this.activeFlag = false;
  }

  isInit(): boolean { return this.initFlag; }

  isActive(): boolean { return this.activeFlag; }

  isRunning(): boolean { return this.runningFlag; }

  isMicrophone(): boolean { return this.microphoneFlag; }

  setLanguage( aLanguageCode: string ): number {
    this.language = aLanguageCode;
    return 0;
  }

  getLanguage(): string {
    return this.language;
  }

  action( aIntent: any ): number {
    return 0;
  }

  intent( aText: string): number {
    return 0;
  }

  listen(): number {
    return 0;
  }

  stopListen(): number {
    return 0;
  }

  isSpeak(): boolean {
    return this.speakFlag;
  }

  setSpeakOff(): void {
    this.speakFlag = false;
  }

  setSpeakOn(): void {
    this.speakFlag = true;
  }

  speak( aText: string, aListenFlag = false ): number {
    return 0;
  }

  stopSpeak(): number {
    return 0;
  }

}
