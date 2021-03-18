/** @packageDocumentation
 * globale Dialog Konstanten
 *
 * API-Version: 1.1
 * Datum:   07.09.2019
 *
 * Letzte Aenderung: 07.09.2019
 * Status: rot
 *
 * @module dialog
 * @author SB
 */


// Builder-Name

export const DIALOG_TYPE_NAME = 'Dialog';
export const DIALOG_BUILDER_NAME = 'DialogBuilder';
export const DIALOG_COMPONENTBUILDER_NAME = 'DialogComponentBuilder';
export const DIALOG_PROXYBUILDER_NAME = 'DialogProxyBuilder';
export const DIALOG_SERVERBUILDER_NAME = 'DialogServerBuilder';


// Factory-Namen

export const DIALOG_FACTORY_NAME = 'DialogFactory';
export const DIALOG_COMPONENTFACTORY_NAME = 'DialogComponentFactory';
export const DIALOG_PROXYFACTORY_NAME = 'DialogProxyFactory';


// Component-Namen

export const DIALOG_COMPONENT_NAME = 'DialogComponent';
export const DIALOG_PROXY_NAME = 'DialogProxy';
export const DIALOG_MOCK_NAME = 'DialogMock';

export const DIALOG_PLUGIN_NAME = DIALOG_PROXY_NAME;


/** @export
 * Servicename zur Erzeugung des Default DialogService. Wird in der DialogServiceFactory verwendet.
 */

export const DIALOG_SERVICE_NAME = 'DialogService';


/** @export
 * Servicename zur Erzeugung des DialogService Mock zum testen. Wird in der DialogServiceFactory verwendet.
 */

export const DIALOG_SERVICEMOCK_NAME = 'DialogServiceMock';


/**
 * Stellt ein, ob die Events synchron oder asynchron ausgeliefert werden
 */

export const DIALOG_ASYNC_EVENT = false;


// Dialogdatei-Konstanten

export const DIALOG_PATH_NAME = 'assets/';
export const DIALOG_FILE_NAME = 'speech.def';
export const DIALOG_LOAD_FLAG = false;


/** @export
 * Name der globalen Default Dialogdefinitionsdatei, die in DialogService eingelesen wird.
 */

export const DIALOG_DIALOGFILE_NAME = DIALOG_FILE_NAME;


// festgelegte Startwerte fuer den Dialognamen und den Zustandsnamen

export const DIALOG_MAIN_NAME = 'main';
export const DIALOG_ROOTSTATE_NAME = 'root';


// Knoten-Konstanten

export const DIALOG_GROUP_NODE = 'group';
export const DIALOG_ACTION_NODE = 'action';
export const DIALOG_SPEAK_NODE = 'speak';
export const DIALOG_WAIT_NODE = 'wait';


// vorhandene Kommandos

export const DIALOG_ACTION_COMMAND = 'ACTION';
export const DIALOG_SPEAK_COMMAND = 'SPEAK';
export const DIALOG_WAIT_COMMAND = 'WAIT';
