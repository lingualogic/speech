/** @packageDocumentation
 * Globale Konstanten fuer CloudAudio
 * Letzte Aenderung: 26.10.2021
 * Status: rot
 *
 * @module cloud/port
 * @author SB
 */


// Audio-Codec

export const CLOUD_PCM_CODEC = 'audio/L16;rate=16000';
export const CLOUD_DEFAULT_CODEC = CLOUD_PCM_CODEC;


// Audio-Konstanten

export const CLOUD_AUDIOBUFFER_SIZE = 2048;
export const CLOUD_AUDIOSAMPLE_RATE = 16000;


// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird

export const ASR_BEGINMAXVOLUME_COUNTER = 100;
export const ASR_ENDMAXVOLUME_COUNTER = 20;
export const ASR_TIMEOUTVOLUME_COUNTER = 150;

// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird

export const ASR_MINVOLUME_THRESHOLD = 127.0;
export const ASR_MAXVOLUME_THRESHOLD = 128.0;

