/** @packageDocumentation
 * Interface from ActionRouteService
 *
 * API-Version: 1.0
 *
 * Last Change: 15.06.2020
 * Quality Status: red
 *
 * @module speech/action-route
 * @author SB
 */

/**
 * Interface ActionRouteService
 */

export interface ActionRouteInterface {

  /**
   * execute Route Intent from Route-Assistant
   *
   * @param aIntent - Route-Intent
   */

  executeRouteIntent( aIntent: any ): number;

  /**
   * execute Route Entity
   *
   * @param aEntityName - Route-Entity
   */

  executeRouteEntity( aEntityName: string ): number;

  /**
   * Launch the app
   */

  launchApp( aAppName: string ): number;

}
