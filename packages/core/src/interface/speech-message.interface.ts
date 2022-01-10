/** @packageDocumentation
 * Nachrichten Interface
 *
 * @module speech
 * @author SB
 */


export type SpeechSendMessageFunc = ( aMessage: ISpeechMessage ) => number;


export interface ISpeechMessage {
    event: string;
    features?: any;
    version?: string;
    id?: string;
    type?: string;
    text?: string;
    timeout?: number;
    intent?: any;
    state?: string;
    dialog?: string;
    dialogData?: string;
    action?: string;
    errorCode?: number;
    errorText?: string;
    context?: any;
}


