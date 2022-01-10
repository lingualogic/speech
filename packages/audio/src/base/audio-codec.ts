/** @packageDocumentation
 * AudioCodec fuer Encode/Decode PCM
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 03.11.2021
 * Status: rot
 *
 * @module audio/base
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// Konstanten

export const PCM_L16CodecArray = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ];
export const OpusCodecArray = [ 'audio/opus;rate=8000', 'audio/opus;rate=16000' ];


/**
 * Klasse AudioCodec zur Codierung/Decodierung von Audiodaten
 */

export class AudioCodec extends ErrorBase {


    constructor() {
        super( 'AudioCodec' );
    }


    // Codec-Funktionen


    /**
     * Codec pruefen
     *
     * @private
     * @param {string} aCodec - zu pruefender Codec
     * @param {string[]} aCodecArray - Codec-Array
     */

    protected _findCodec( aCodec: string, aCodecArray: string[]): boolean {
        for ( let i = 0; i < aCodecArray.length; i++ ) {
            if ( aCodec === aCodecArray[ i ]) {
                return true;
            }
        }
        return false;
    }


    /**
     * Pruefen auf PCM-Codec
     *
     * @param {string} aCodec - zu pruefender codec
     */

    findPcmCodec( aCodec: string ): boolean {
        return this._findCodec( aCodec, PCM_L16CodecArray );
    }


    /**
     * Pruefen auf Opus-Codec
     *
     * @param {string} aCodec - zu pruefender codec
     */

    findOpusCodec( aCodec: string ): boolean {
        return this._findCodec( aCodec, OpusCodecArray );
    }


    // Encode-Funktionen


    /**
     * Umwandlung von Float32 nach Int16
     *
     * @private
     * @param {*} aFloat32 - umzuwandelnder Wert
     *
     * @return {*} Rueckgabe des passenden Int-Wertes
     */

    protected _float32ToInt16( aFloat32: any ): any {
        const int16 = aFloat32 < 0 ? aFloat32 * 32768 : aFloat32 * 32767;
        return Math.max( -32768, Math.min( 32768, int16 ));
    }


    /**
     * Umwandlung des Float32Arrays nach Int16Array
     *
     * @private
     * @param {*} aFloat32Array - umzuwandelndes Float32-Array
     *
     * @return {*} Rueckgabe des Int16-Arrays
     */

    _float32ArrayToInt16Array( aFloat32Array: any ): any {
        const arrayBuffer = new ArrayBuffer( aFloat32Array.length * 2 );
        // const int16Array = new Int16Array( aFloat32Array.length );
        const int16Array = new Int16Array( arrayBuffer );
        let i = 0;
        while ( i < aFloat32Array.length ) {
            int16Array[ i ] = this._float32ToInt16( aFloat32Array[ i++ ]);
        }
        // return int16Array;
        return arrayBuffer;
    }


    /* TODO: alte Version ohne ArrayBuffer
    protected _float32ArrayToInt16Array( aFloat32Array: any ): any {
        const int16Array = new Int16Array( aFloat32Array.length );
        let i = 0;
        while ( i < aFloat32Array.length ) {
            int16Array[ i ] = this._float32ToInt16( aFloat32Array[ i++ ]);
        }
        return int16Array;
    }
    */


    _int16ArrayToUint8Array( aArrayBuffer: any ): any {
        // return new Uint8Array( arrayBuffer );
        /*
        let uint8Array = new Uint8Array( aInt16Array.byteLength );
        for ( let i = 0; i < aInt16Array.byteLength; i += 2 ) {
            uint8Array[ i ] = aInt16Array[ i ] >> 8;
            uint8Array[ i + 1 ] = aInt16Array[ i ] && 0x00FF;
        }
        */
        const bytes = new Uint8Array( aArrayBuffer );
        const len = bytes.byteLength;
        let binary = '';
        for ( let i = 0; i < len; i++ ) {
           binary += String.fromCharCode( bytes[ i ]);
        }
        return binary;
    }


    /**
     * Umwandlung von FloatArray nach Int16Array
     *
     * @private
     * @param {*} aFrame - umzuwandelnde Daten
     * @param {string} aCodec - Codec fuer Umwandlung
     */

    encodePCM( aFrame: any, aCodec: string ): any {
        if ( this.findPcmCodec( aCodec )) {
            return [ this._int16ArrayToUint8Array( this._float32ArrayToInt16Array( aFrame ))];
        }
        return [ aFrame ];
    }

    /* TODO: alte Version ohne ArrayBuffer
    encodePCM( aFrame: any, aCodec: string ): any {
        if ( this.findPcmCodec( aCodec )) {
            return [ this._float32ArrayToInt16Array( aFrame )];
        }
        return [ aFrame ];
    }
    */


    /* Opus-Codec
    opusEncoderSetup( aRate: any ): void {
        // TODO: Problem mit globalen Worker-Verzeichnis fuer alle Worker
        this.opusEncoder = new AudioEncoder( 'lib/opus_encoder.js' );
        this.opusEncoder.setup({ num_of_channels: 1, params: { application: 2048, frame_duration: 20, sampling_rate: aRate }, sampling_rate: aRate });
    }
    */


    /*
    encodeOpusAndSend( aFrame: any, aWs: any ): void {
        this.opusEncoder.encode({ samples: aFrame, timestamp: 0, transferable: true })
        .then((packets: any) => {
            for ( let i = 0; i < packets.length; ++i ) {
                aWs.send( packets[ i ].data );
            }
        }, rejectLog( 'opusDecoder.encode error' ));
    }
    */


    // Decode-Funktionen


    /**
     * Umwandlung von UInt8-Array nach Int16 nach Float32-Array
     *
     * Poly liefert ein UInt8-Array als PCM, welches umgewandelt werden muss.
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */

    decodePCM( aAudioData: any): any {
        try {
            const buffer = new Uint8Array( aAudioData );
            const bufferLength = buffer.length;
            const outputArray = new Float32Array( bufferLength / 2 );
            // Schleife fuer alle UInt8-Werte
            const valueArray = new Int16Array( 1 );
            let j = 0;
            for (let i = 0; i < bufferLength; i = i + 2) {
                // Umwandlung in Int16
                // tslint:disable-next-line: no-bitwise
                valueArray[ 0 ] = (buffer[i + 1] << 8) + buffer[i];
                // Umwandlung in Float32
                outputArray[j] = valueArray[ 0 ] / 32768;
                j++;
            }
            return outputArray;
        } catch ( aException ) {
            // console.log('MicrosoftAudioCodec.decodePCM: Exception', aException);
            this.exception( 'decodePCM', aException );
            return [];
        }
    }


    /**
     * Umwandlung von Int16-Array nach Float32-Array
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */

    decodePCMInt16( aAudioData: any): any {
        try {
            const pcm16Buffer = new Int16Array( aAudioData );
            const pcm16BufferLength = pcm16Buffer.length;
            const outputArray = new Float32Array( pcm16BufferLength );
            // console.log( 'GoogleAudioCodec.decodePCM: puffer = ', pcm16Buffer);
            // console.log( 'GoogleAudioCodec.decodePCM: laenge = ', pcm16BufferLength);
            let i = 0;
            for (; i < pcm16BufferLength; ++i) {
                outputArray[i] = pcm16Buffer[i] / 32768;
            }
            // console.log('GoogleAudioCodec.decodePCM: Float32 = ', outputArray);
            return outputArray;
        } catch ( aException ) {
            console.log('GoogleAudioCodec.decodePCM: Exception', aException);
            this.exception( 'decodePCM', aException );
            return [];
        }
    }


    /* wird erst spaeter implementiert
    opusDecoderSetup(): void {
        const desiredSampleRate = 16000;
        //if ($("#selectCodec").val() === "audio/opus;rate=8000") {
        //    desiredSampleRate = 8000;
        //}
        // TODO: Problem des globalen Worker-Verzeichnisses muss geloest werden
        const opusEncoderForDecoder = new AudioEncoder( 'lib/opus_encoder.js' );
        this.mOpusDecoder = new AudioDecoder('lib/opus_decoder.js');
        opusEncoderForDecoder.setup({ num_of_channels: 1, params: { application: 2048, frame_duration: 20, sampling_rate: desiredSampleRate }, sampling_rate: desiredSampleRate })
            .then((packets: any) => {
                this.mOpusDecoder.setup({}, packets )
                    .then(() => {
                    }, rejectLog( 'mOpusDecoder.setup error' ));
            }, rejectLog( 'opusEncoder.setup error' ));
    }
    */


    /* wird erst spaeter implementiert
    const audioOpusDecodeArray = [];
    let beginOpusDecodeFlag = true;

    const decodeOpus = (data: any, audioSinkQueue: any) => {
        this.mOpusDecoder.decode({ data: data })
            .then((buf: any) => {
                audioArray.push( buf.samples );
                audioSinkQueue.push( buf.samples );
                if ( this.mBeginSpeakFlag ) {
                    this.mBeginSpeakFlag = false;
                    this.playByStream( aOptions, audioArray );
                }
                if ( audioOpusDecodeArray.length > 0 ) {
                    decodeOpus( audioOpusDecodeArray.shift(), audioSinkQueue );
                } else {
                    beginOpusDecodeFlag = true;
                }
            });
    };
    */

}
