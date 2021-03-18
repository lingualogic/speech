/** @packageDocumentation
 * Mock ActionRouteService for Unit-Tests
 *
 * API-Version: 1.0
 *
 * Last Change: 15.06.2020
 * Quality Status: red
 *
 * @module speech/action-route
 * @author SB
 */


// action-click

import { ActionRouteInterface } from './action-route.interface';


// Mock Class for ActionRouteService

export class ActionRouteMockService  implements ActionRouteInterface {

  constructor() {
  }

  /**
   * execute Route Intent from Route-Assistant
   *
   * @param aIntent - Route-Intent
   */

  executeRouteIntent( aIntent: any ): number {
    return 0;
  }

  /**
   * execute Route Entity
   *
   * @param aEntityName - Route-Entity
   */

  executeRouteEntity( aEntityName: string ): number {
    return 0;
  }

  /**
   * Launch the app
   */

  launchApp( aAppName: string ): number {
    return 0;
  }

}
