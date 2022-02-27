/** @packageDocumentation
 * AudioHtml5Reader Schnittstelle
 *
 * API-Version: 2.0
 * Datum:       12.07.2021
 *
 * Letzte Aenderung: 09.02.2022
 * Status: rot
 *
 * @module audio/common
 * @author SB
 */


// file

import { IFileBaseReader } from '@lingualogic-speech/file';


// Audioformat-Konstanten


/** MP3-Format, Dateiendung .mp3 */
export const AUDIO_MP3_FORMAT = 'mp3';
/** WAV-Format, Dateiendung .wav */
export const AUDIO_WAV_FORMAT = 'wav';

export const AUDIO_DEFAULT_FORMAT = AUDIO_MP3_FORMAT;


export interface IAudioHtml5Reader extends IFileBaseReader {

    // Audio-Funktionen

    getAudioContext(): AudioContext;

    setAudioFormat( aAudioFormat: string ): number;
    getAudioFormat(): string;

}
