/** @packageDocumentation
 * CloudAudioCodec Basisklasse 
 *
 * Letzte Aenderung: 30.10.2021
 * Status: rot
 *
 * @module cloud/audio
 * @author SB
 */


/**
 * Basisklasse akller Cloud-Geraete
 */

export interface ICloudAudioCodec {


    // TODO: Die Codex-Funktionen sollten nicht hier sein, sondern in Audio,
    //       wird in Zuge der Refaktorisierung dorthin verlagert

    // Codier-Funktionen


    /**
     * 
     * @param aBuffer 
     * @returns 
     */

    encodeBase64( aBuffer: ArrayBuffer ): string;


    /**
     * Dekodieren der String-Base64 Codierung
     *
     * @param aBase64Text
     */

    decodeBase64( aBase64Text: string ): ArrayBuffer;

}
