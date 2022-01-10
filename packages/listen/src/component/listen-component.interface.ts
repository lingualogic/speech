/** @packageDocumentation
 * ListenComponent Interface
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// base

import { IBaseComponent } from '@speech/base';


// asr

import { OnASRListenStartFunc, OnASRListenStopFunc, OnASRListenResultFunc, OnASRListenNoMatchFunc } from '../asr/asr.interface';


// listen

import { IListen } from '../listen.interface';


// Funktionen


/** @export
 * ListenComponent Schnittstelle
 */

export interface IListenComponent extends IBaseComponent, IListen {

  // Listen-Events

  onListenResult: OnASRListenResultFunc;
  onListenInterimResult: OnASRListenResultFunc;
  onListenNoMatch: OnASRListenNoMatchFunc;

  onListenRecognitionStart: OnASRListenStartFunc;
  onListenRecognitionStop: OnASRListenStopFunc;

  onListenAudioStart: OnASRListenStartFunc;
  onListenAudioStop: OnASRListenStopFunc;

  onListenSoundStart: OnASRListenStartFunc;
  onListenSoundStop: OnASRListenStopFunc;

  onListenSpeechStart: OnASRListenStartFunc;
  onListenSpeechStop: OnASRListenStopFunc;

}
