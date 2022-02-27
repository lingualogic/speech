/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines Net-Plugins
 *
 * Version: 2.0
 * Datum:   09.02.2022
 *
 * @module net
 * @author SB
 */


// core

import { PluginFactory } from '@lingualogic-speech/core';


// net

import { NET_FACTORY_NAME, NET_PLUGIN_NAME, NET_MOCK_NAME, NET_WEBSOCKET_NAME, NET_WEBWORKER_NAME } from './net-const';
import { INet } from './net.interface';
import { NetWebSocket } from './net-websocket';
import { NetWebWorker } from './net-webworker';


// Global API

export class NetFactory extends PluginFactory {

  // Konstruktor

  constructor() {
    super( 'NetFactory' );
    this._setErrorClassName( 'NetFactory' );
  }

  getName(): string {
    return NET_FACTORY_NAME;
  }


  protected _newPlugin( aPluginName: string, aPluginClass: string, aRegisterFlag: boolean ): INet {
    if ( aPluginName !== NET_WEBWORKER_NAME && ( aPluginName === NET_WEBSOCKET_NAME || aPluginClass === NET_WEBSOCKET_NAME)) {
      // console.log('NetFactory._newPlugin: start new WebSocket');
      const webSocket = new NetWebSocket( aPluginName, aRegisterFlag );
      // console.log('NetFactory._newPlugin: end new WebSocket');
      return webSocket;
    }
    if ( aPluginName === NET_WEBWORKER_NAME || aPluginClass === NET_WEBWORKER_NAME ) {
      return new NetWebWorker( aRegisterFlag );
    }
    return null;
  }


  /**
   * Kann verschiedene Versionen der Net
   * zurueckgeben, einschließlich eines Net-Mocks.
   *
   * @param {string} aNetName - Name der zu erzeugenden Net-Komponente
   * @param {string} aNetClass - Name der zu erzeugenden Net-Klasse
   * @param {boolean} aRegisterFlag - wenn true, wird Plugin in PluginManager eingetragen
   *
   * @return {INet} net wird zurueckgegeben
   */

  create( aNetName?: string, aNetClass = '', aRegisterFlag = true ): INet {
    const netName = aNetName || NET_PLUGIN_NAME;
    const netClass = aNetClass || NET_PLUGIN_NAME;
    // Mock zurueckgeben
    if ( netName === NET_MOCK_NAME ) {
      // TODO: Einbau des Net-Mocks
      // return new NetMock();
    }

    // Net erzeugen

    try {
      return this._newPlugin( netName, netClass, aRegisterFlag );
    } catch ( aException ) {
      this.exception( 'create', aException );
      return null;
    }

  }

}
