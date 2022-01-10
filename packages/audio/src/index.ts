/** @packageDocumentation
 * Globale Export-Datei fuer Audio
 *
 * Version: 2.0
 * Datum:   13.10.2021
 *
 * Definiert das gesamte Audio-API:
 *
 * @module audio
 * @author SB
 */

// TODO: nur solange hier, wie es von externen Komponenten verwendet wird
//       wird spaeter wieder entfernt, wenn nur noch intern von Net verwendet
// Common API

export { IAudioHtml5Reader } from './common/audio-html5-reader.interface';
export { AudioHtml5Reader } from './common/audio-html5-reader';
export { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME, AUDIOCONTEXT_TYPE_NAME } from './common/audiocontext-factory';
export { AudioContextManager } from './common/audiocontext-manager';
export { UserMediaFactory, USERMEDIA_FACTORY_NAME, USERMEDIA_TYPE_NAME } from './common/usermedia-factory';


// TODO: nur solange hier, wie es von externen Komponenten verwendet wird
//       wird spaeter wieder entfernt, wenn nur noch intern von Net verwendet
// Base API

export { AudioBrowserPlayer } from './base/audio-browser-player';
export { AudioBrowserRecorder } from './base/audio-browser-recorder';
export { AudioCodec, PCM_L16CodecArray } from './base/audio-codec';
export { AudioResampler } from './base/audio-resampler';


// Global API

export { IAudioPlayer } from './player/audio-player.interface';
export { AudioPlayerFactory } from './player/audio-player-factory';
// TODO: Problemmit AudioPlayer aus Common/Audio: muss geloest werden
// export { AudioPlayer } from './player/audio-player';

export { AUDIO_PLUGIN_NAME, AUDIOPLAYER_MOCK_NAME, AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIO_DEFAULT_FORMAT, AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT } from './audio-const';
export { IAudio } from './audio.interface';
export { AudioFactory } from './audio-factory';
