/** @packageDocumentation
 * Mock ActionClickService for Unit-Tests
 *
 * API-Version: 1.0
 *
 * Last Change: 07.05.2020
 * Quality Status: red
 *
 * @module speech/action-click
 * @author SB
 */


// action-click

import { ActionClickBaseInterface } from './action-click-base.interface';
import { ActionClickInterface } from './action-click.interface';


// Mock Class for ActionClickService

export class ActionClickMockService implements ActionClickInterface {


  constructor() {
  }


  showButtonHints(): void {}

  hideButtonHints(): void {}


  /**
   * start the Button
   *
   * @param aButtonName - Name of Button
   */

  start( aButtonName: string ): number {
    return 0;
  }


  /**
   * insert button directive for action
   *
   * @param aButtonDirective - Directive
   *
   * @return error code(0,-1)
   */

  addButton( aButtonDirective: ActionClickBaseInterface ): number {
    return 0;
  }


  /**
   * remove button directive
   *
   * @param elementName - Name of remove directive element
   *
   * @return errorcode(0,-1)
   */

  removeButton( aButtonDirective: ActionClickBaseInterface ): number {
    return 0;
  }

}
