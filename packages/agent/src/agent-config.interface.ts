/** @packageDocumentation
 * Assistant Interface for Configuration
 *
 *  listenServiceName    - Name for the current created service
 *  listenServiceVersion - Version Number of created service
 *
 * API-Version: 1.0
 *
 * Last Change: 16.03.2020
 * Quality Status: red
 *
 * @module agent
 * @author SB
 */

export interface AgentConfigInterface {
  listenServiceName?: string;
  listenServiceVersion?: number;
}
