/** @packageDocumentation
 * ActionClick-Base Directive Interface for ActionClickService
 *
 * API-Version: 1.0
 *
 * Last Change: 07.05.2020
 * Quality Status: red
 *
 * @module speech/action-click
 * @author SB
 */

export interface ActionClickBaseInterface {

    buttonName;
    start(): void;

    showHint(): void;
    hideHint(): void;
}
