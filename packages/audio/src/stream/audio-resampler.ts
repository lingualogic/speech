/** @packageDocumentation
 * externe Resampler-Klasse
 *
 * Letzte Aenderung: 24.03.2020
 * Status: rot
 *
 * @module audio/stream
 * @author SB
 */

// JavaScript Audio Resampler (c) 2011 - Grant Galitz
// https://github.com/taisel/XAudioJS/blob/master/resampler.js

export class AudioResampler {

    fromSampleRate = 0;
    toSampleRate = 0;
    channels = 0;
    outputBufferSize = 0;
    noReturn = false;
    resampler: any = null;
    ratioWeight = 0;
    interpolate: any = null;
    tailExists: any;
    lastWeight = 0;
    outputBuffer: any = null;
    lastOutput: any = null;


    constructor( fromSampleRate: any, toSampleRate: any, channels: any, outputBufferSize: any, noReturn: any ) {
        this.fromSampleRate = fromSampleRate;
        this.toSampleRate = toSampleRate;
        this.channels = channels || 0;
        this.outputBufferSize = outputBufferSize;
        this.noReturn = !!noReturn;
        this.initialize();
    }

    initialize(): void {
        // console.log('Resampler.initialize:', this.fromSampleRate, this.toSampleRate, this.channels);
        // Perform some checks:
        if ( this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0 ) {
            if ( this.fromSampleRate === this.toSampleRate ) {
                // Setup a resampler bypass:
                this.resampler = this.bypassResampler;      // Resampler just returns what was passed through.
                this.ratioWeight = 1;
            } else {
                // Setup the interpolation resampler:
                this.compileInterpolationFunction();
                this.resampler = this.interpolate;          // Resampler is a custom quality interpolation algorithm.
                this.ratioWeight = this.fromSampleRate / this.toSampleRate;
                this.tailExists = false;
                this.lastWeight = 0;
                this.initializeBuffers();
            }
        } else {
            throw(new Error('Invalid settings specified for the resampler.'));
        }
    }

    compileInterpolationFunction(): void {
        let toCompile = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);\
        if ((bufferLength % ' + this.channels + ') == 0) {\
            if (bufferLength > 0) {\
                var ratioWeight = this.ratioWeight;\
                var weight = 0;';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'var output' + channel + ' = 0;';
        }
        toCompile += 'var actualPosition = 0;\
                var amountToNext = 0;\
                var alreadyProcessedTail = !this.tailExists;\
                this.tailExists = false;\
                var outputBuffer = this.outputBuffer;\
                var outputOffset = 0;\
                var currentPosition = 0;\
                do {\
                    if (alreadyProcessedTail) {\
                        weight = ratioWeight;';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' = 0;';
        }
        toCompile += '}\
                    else {\
                        weight = this.lastWeight;';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' = this.lastOutput[' + channel + '];';
        }
        toCompile += 'alreadyProcessedTail = true;\
                    }\
                    while (weight > 0 && actualPosition < bufferLength) {\
                        amountToNext = 1 + actualPosition - currentPosition;\
                        if (weight >= amountToNext) {';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' += buffer[actualPosition++] * amountToNext;';
        }
        toCompile += 'currentPosition = actualPosition;\
                            weight -= amountToNext;\
                        }\
                        else {';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' += buffer[actualPosition' + ((channel > 0) ? (' + ' + channel) : '') + '] * weight;';
        }
        toCompile += 'currentPosition += weight;\
                            weight = 0;\
                            break;\
                        }\
                    }\
                    if (weight == 0) {';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'outputBuffer[outputOffset++] = output' + channel + ' / ratioWeight;';
        }
        toCompile += '}\
                    else {\
                        this.lastWeight = weight;';
        for (let channel = 0; channel < this.channels; ++channel) {
            toCompile += 'this.lastOutput[' + channel + '] = output' + channel + ';';
        }
        toCompile += 'this.tailExists = true;\
                        break;\
                    }\
                } while (actualPosition < bufferLength);\
                return this.bufferSlice(outputOffset);\
            }\
            else {\
                return (this.noReturn) ? 0 : [];\
            }\
        }\
        else {\
            throw(new Error("Buffer was of incorrect sample length."));\
        }';
        this.interpolate = Function('buffer', toCompile);
    }

    bypassResampler(buffer: any): any {
        if (this.noReturn) {
            // Set the buffer passed as our own, as we don't need to resample it:
            this.outputBuffer = buffer;
            return buffer.length;
        } else {
            // Just return the buffer passsed:
            return buffer;
        }
    }

    bufferSlice(sliceAmount: any): any {
        if (this.noReturn) {
            // If we're going to access the properties directly from this object:
            return sliceAmount;
        } else {
            // Typed array and normal array buffer section referencing:
            try {
                return this.outputBuffer.subarray(0, sliceAmount);
            } catch (error) {
                try {
                    // Regular array pass:
                    this.outputBuffer.length = sliceAmount;
                    return this.outputBuffer;
                } catch (error) {
                    // Nightly Firefox 4 used to have the subarray function named as slice:
                    return this.outputBuffer.slice(0, sliceAmount);
                }
            }
        }
    }

    initializeBuffers(generateTailCache?: any) {
        // Initialize the internal buffer:
        try {
            this.outputBuffer = new Float32Array(this.outputBufferSize);
            this.lastOutput = new Float32Array(this.channels);
        } catch (error) {
            this.outputBuffer = [];
            this.lastOutput = [];
        }
    }

}
