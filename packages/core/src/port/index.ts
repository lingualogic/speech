/** @packageDocumentation
 * Globale Export-Datei fuer Plort
 *
 * Version: 2.0
 * Datum:   01.11.2021
 *
 * Definiert das gesamte Port-API:
 *
 *      PortManager     - Manager fuer alle Ports
 *      Port            - Port fuer eine bestimmte Verbindung
 *
 * @module core/port
 * @author SB
 */


// Global API


export {
    PORT_INIT_EVENT,
    PORT_OPEN_EVENT,
    PORT_CLOSE_EVENT,
    PORT_START_EVENT,
    PORT_STOP_EVENT,
    PORT_RESULT_EVENT,
    PORT_ERROR_EVENT
} from './port-event-const';
export {
    PORT_NLP_ACTION,
    PORT_NLU_ACTION,
    PORT_ASR_ACTION,
    PORT_ASRNLU_ACTION,
    PORT_TTS_ACTION
} from './port-action-const';
// TODO: sollte eigentlich erst in CloudPort definiert sein, Abhaengigkeit wird spaeter aufgeloest
//       dazu muessen die Port-Namen als Konfiguration induziert werden
export {
    CLOUD_AMAZON_PORT,
    CLOUD_GOOGLE_PORT,
    CLOUD_MICROSOFT_PORT,
    CLOUD_RASA_PORT
} from './port-cloud-const';
export { PortList } from './port-list';
export { PortManager } from './port-manager';
export { PortTransaction } from './port-transaction';
export { IPortFactory } from './port-factory.interface';
export { PortFactory } from './port-factory';
export { IPort } from './port.interface';
export { Port } from './port';

