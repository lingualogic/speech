/** @packageDocumentation
 * Kontext fuer den AgentService
 *
 * API-Version: 1.0
 *
 * Letzte Aenderungen: 28.10.2020
 * Quality Status: rot
 *
 * @module agent
 * @author SB
 */

export interface AgentContextInterface {
    intentName: string;
    intentSpeech: string;
    entityName: string;
    entityValue: string;
    intentResult: number;
}
