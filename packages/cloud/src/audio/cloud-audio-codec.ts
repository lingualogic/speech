/** @packageDocumentation
 * CloudAudioCodec Basisklasse 
 *
 * Letzte Aenderung: 07.11.2021
 * Status: rot
 *
 * @module cloud/audio
 * @author SB
 */


// cloud

import { ICloudAudioCodec } from './cloud-audio-codec.interface';
export { ICloudAudioCodec };


// TODO: Workaround fuer undefinierte globale Variablen von NodeJS und Browser

declare let process: any;
declare let window: any;


/**
 * Basisklasse akller Cloud-Geraete
 */

export class CloudAudioCodec implements ICloudAudioCodec {



    // TODO: Die Codex-Funktionen sollten nicht hier sein, sondern in Audio,
    //       wird in Zuge der Refaktorisierung dorthin verlagert

    // Codier-Funktionen


    /**
     * btoa() Funktion fuer NodeJS
     *
     * @param aText - zu uebersetzender Text
     * @returns String
     */

    private _btoaNode( aText: any ): string {
        // console.log('CloudAudioCodec._btoaNode');
        try {
            let buffer;
            if ( aText instanceof Buffer) {
                buffer = aText;
            } else {
                buffer = Buffer.from( aText.toString(), 'binary' );
            }
            return buffer.toString('base64');
        } catch ( aException ) {
            console.log('CloudCodec._btoaNode: Exception ', aException);
            return '';
        }
    }    


    /**
     * 
     * @param aBuffer 
     * @returns 
     */

    encodeBase64( aBuffer: ArrayBuffer ): string {
        let binary = '';
        const bytes = new Uint8Array( aBuffer );
        const len = bytes.byteLength;
        for ( let i = 0; i < len; i++ ) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        // Unterschiedung btoa nodejs/browser
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            // console.log('CloudAudioCodec.encodeBase64: node');
            return this._btoaNode( binary );
        } else {
            // console.log('CloudAudioCodec.encodeBase64: browser');
            try {
                if ( typeof window !== 'undefined' ) {
                    return window.btoa( binary );
                }
            } catch ( aException ) {
                console.log('CloudCodec.encodeBase64: Exception ', aException);
            }
        }
        return '';
    }


    /**
     * atob() Funktion fuer NodeJS
     *
     * @param aText - zu uebersetzender Text
     * @returns String
     */

     private _atobNode( aText: string ): string {
        // console.log('CloudAudioCodec._atobNode');
        try {
            return Buffer.from( aText, 'base64').toString('binary');            
        } catch ( aException ) {
            console.log('CloudAudioCodec._atobNode: Exception ', aException);
            return '';
        }
    }    


    /**
     * Dekodieren der String-Base64 Codierung
     *
     * @param aBase64Text
     */

    decodeBase64( aBase64Text: string ): ArrayBuffer {
        let binary_string = '';
        if ( !aBase64Text ) {
            return new ArrayBuffer( 0 );
        }
        // Unterschiedung btoa nodejs/browser
        if ( typeof process !== 'undefined' && process.versions && process.versions.node ) {
            // console.log('CloudAudioCodec.encodeBase64: node');
            binary_string = this._atobNode( aBase64Text );
        } else {
            // console.log('CloudAudioCodec.encodeBase64: browser');
            try {
                if ( typeof window !== 'undefined' ) {
                    binary_string = window.atob( aBase64Text );
                }
            } catch ( aException ) {
                console.log('CloudDevice.encodeBase64: Exception ', aException);
            }
        }
        if ( binary_string ) {
            const len = binary_string.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
        return new ArrayBuffer( 0 );
    }


}
