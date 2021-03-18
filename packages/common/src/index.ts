/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Common
 *
 * Version: 1.0
 * Datum:   28.10.2020
 *
 * Definiert das gesamte Speech-Common-API:
 *
 * @module common
 * @author SB
 */


// Global API


// audio

export { AudioCodec, PCM_L16CodecArray } from './audio/audio-codec';
export { AudioPlayer } from './audio/audio-player';
export { AudioRecorder } from './audio/audio-recorder';
export { AudioResampler } from './audio/audio-resampler';


// html5

export { FileHtml5ReaderInterface, XMLHTTPREQUEST_TEXT_RESPONSETYPE, XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE } from './html5/file-html5-reader.interface';
export { FileHtml5Reader } from './html5/file-html5-reader';
export { AudioHtml5ReaderInterface } from './html5/audio-html5-reader.interface';
export { AudioHtml5Reader } from './html5/audio-html5-reader';
export { NetHtml5Connect } from './html5/net-html5-connect';
export { NetHtml5WebSocket, NET_CONNECTINTERVAL_TIMEOUT } from './html5/net-html5-websocket';

export { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME, AUDIOCONTEXT_TYPE_NAME } from './html5/audiocontext-factory';
export { SpeechRecognitionFactory, SPEECHRECOGNITION_FACTORY_NAME, SPEECHRECOGNITION_TYPE_NAME, SPEECHRECOGNITION_GRAMMAR_NAME } from './html5/speechrecognition-factory';
export { SpeechSynthesisFactory, SPEECHSYNTHESIS_FACTORY_NAME, SPEECHSYNTHESIS_TYPE_NAME, SPEECHSYNTHESIS_UTTERANCE_NAME } from './html5/speechsynthesis-factory';
export { WebSocketFactory, WEBSOCKET_FACTORY_NAME, WEBSOCKET_TYPE_NAME } from './html5/websocket-factory';
export { WebWorkerFactory, WEBWORKER_FACTORY_NAME, WEBWORKER_TYPE_NAME } from './html5/webworker-factory';
export { UserMediaFactory, USERMEDIA_FACTORY_NAME, USERMEDIA_TYPE_NAME } from './html5/usermedia-factory';
export { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME, XMLHTTPREQUEST_TYPE_NAME } from './html5/xmlhttprequest-factory';

export { AudioContextManager } from './html5/audiocontext-manager';


// SpeechError

export * as SpeechError from './speech-error';
export { SpeechBrowser } from './speech-browser';
