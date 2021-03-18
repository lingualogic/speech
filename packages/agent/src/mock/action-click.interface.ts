/** @packageDocumentation
 * Interface from ActionClickService
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


/**
 * Interface ActionClickService
 */

export interface ActionClickInterface {

  showButtonHints(): void;

  hideButtonHints(): void;

  /**
   * start the Button
   *
   * @param aButtonName - Name of Button
   */

  start( aButtonName: string ): number;

  /**
   * insert button directive for action
   *
   * @param aButtonDirective - Directive
   *
   * @return error code(0,-1)
   */

  addButton( aButtonDirective: ActionClickBaseInterface ): number ;

  /**
   * remove button directive
   *
   * @param elementName - Name of remove directive element
   *
   * @return errorcode(0,-1)
   */

  removeButton( aButtonDirective: ActionClickBaseInterface ): number;

}
