/** @packageDocumentation
 * Agent Konstanten
 *
 * Letzte Aenderung: 28.10.2020
 * Status: rot
 *
 * @module agent
 * @author SB
 */


// Service on/off

export const AGENT_SERVICE_ON = true;


// Error output to console on/off

export const AGENT_ERROROUTPUT_FLAG = false;


// assistant only active, if dicate active (Currently only Chrome)

export const AGENT_ONLYDICTATE_FLAG = false;


// Timeout

export const AGENT_STOP_TIMEOUT = 5000;


// language

export const AGENT_GERMAN_LANGUAGE = 'de';
export const AGENT_ENGLISH_LANGUAGE = 'en';

export const AGENT_DEFAULT_LANGUAGE = AGENT_GERMAN_LANGUAGE;
// export const AGENT_DEFAULT_LANGUAGE = AGENT_ENGLISH_LANGUAGE;


// assistant mode

export const AGENT_ROUTE_FLAG = true;
export const AGENT_NAVIGATE_FLAG = false;

export const AGENT_ROUTE_MODE = 'route';
export const AGENT_NAVIGATE_MODE = 'navigate';

// TODO: muss als konfigurierbarer Parameter uebergeben werden
export const AGENT_QUERYSERVER_URL = 'http://192.168.178.62:2000';
// export const AGENT_QUERYSERVER_URL = 'http://localhost:2000';