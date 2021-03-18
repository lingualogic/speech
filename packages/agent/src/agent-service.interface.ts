/** @packageDocumentation
 * AssistentService-Interface
 *
 * API-Version: 1.0
 *
 * Letzte Aenderung: 28.10.2020
 * Status: rot
 *
 * @module agent
 * @author SB
 */


// service

import { EventEmitter } from '@speech/service';


export interface AgentServiceInterface {

  /**
   * init event emitter
   */

  initEvent: EventEmitter<any>;

  /**
   * start event emitter
   */

  startEvent: EventEmitter<any>;

  /**
   * stop event emitter
   */

  stopEvent: EventEmitter<any>;

  /**
   * user stop event emitter
   */

  userStopEvent: EventEmitter<any>;

  /**
   * start speak event emitter
   */

  startSpeakEvent: EventEmitter<any>;

  /**
   * stop event emitter
   */

  stopSpeakEvent: EventEmitter<any>;

  /**
   * speak event emitter
   */

  speakEvent: EventEmitter<any>;

  /**
   * start listen event emitter
   */

  startListenEvent: EventEmitter<any>;

  /**
   * stop listen event emitter
   */

  stopListenEvent: EventEmitter<any>;

  /**
   * start microphon event emitter
   */

  startMicrophoneEvent: EventEmitter<any>;

  /**
   * stop microphon event emitter
   */

  stopMicrophoneEvent: EventEmitter<any>;

  /**
   * result event emitter
   */

  resultEvent: EventEmitter<any>;

  /**
   * no match event emitter
   */

  noMatchEvent: EventEmitter<any>;

  /**
   * start intent event emitter
   */

  startIntentEvent: EventEmitter<any>;

  /**
   * stop intent event emitter
   */

  stopIntentEvent: EventEmitter<any>;

  /**
   * intent event emitter
   */

  intentEvent: EventEmitter<any>;

  /**
   * The context Event for Intent.
   */

  contextEvent: EventEmitter<any>;

  /**
   * error event emitter
   */

  errorEvent: EventEmitter<any>;

  /**
   * hide event emitter
   */

  hideEvent: EventEmitter<any>;

  // Service API

  /**
   * get current Version of Service
   */

  getVersion(): string;

  isModeAllow( aMode: string ): boolean;

  getMode(): string;

  isRouteModeAllow(): boolean;

  isRouteMode(): boolean;

  setRouteMode(): number;

  isNavigateModeAllow(): boolean;

  isNavigateMode(): boolean;

  setNavigateMode(): number;

  setWelcomeText( aText: string ): void;

  findConfirmQuestion( aIntent: any): string;

  start(): void;

  stop( aUserFlag?: boolean): void;

  isInit(): boolean;

  isActive(): boolean;

  isRunning(): boolean;

  isMicrophone(): boolean;

  setLanguage( aLanguageCode: string ): number;

  getLanguage(): string;

  action( aIntent: any ): number;

  intent( aText: string ): number;

  listen(): number;

  stopListen(): number;

  isSpeak(): boolean;

  setSpeakOff(): void;

  setSpeakOn(): void;

  speak( aText: string, aListenFlag?: boolean ): number;

  stopSpeak(): number;

}
