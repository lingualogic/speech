/** @packageDocumentation
 * Agent Logger Wrapper fuer DEBUG
 *
 * Letzte Aenderung: 28.10.2020
 * Status: rot
 *
 * @module agent
 * @author SB
 */


// TODO: debug muss als externes Modul in rollup integriert werden
// import { debug } from 'debug';


// export const AgentLogger = debug('speech');


export const AgentLogger = {
    extend: ( aText: string ) => (aLogMessage: string) => {}
};

