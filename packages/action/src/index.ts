/** @packageDocumentation
 * Globale Export-Datei fuer Action
 *
 * Version: 1.1
 * Datum:   20.10.2020
 *
 * Definiert das gesamte Action-API:
 *
 * @module action
 * @author SB
 */


// Global API


export { ACTION_API_VERSION, ACTION_VERSION_STRING } from './action-version';
export { ACTION_TYPE_NAME, ACTION_COMPONENT_NAME, ACTION_SERVICE_NAME, ACTION_MOCK_NAME, ACTION_COMPONENTBUILDER_NAME, ACTION_COMPONENTFACTORY_NAME } from './action-const';
export { ActionComponentBuilder } from './component/action-component-builder';
export { ActionComponentFactory } from './component/action-component-factory';
export { ActionComponentInterface } from './component/action-component.interface';
export { ActionComponent } from './component/action-component';
export { ActionDataInterface } from './action-data.interface';
export { ActionOptionInterface } from './action-option.interface';
export { ActionInterface } from './action.interface';
export { ActionFactory } from './action-factory';
export { Action } from './action';


// Service API

export { ActionServiceConfig } from './action-service-config';
export { ActionServiceInterface } from './action-service.interface';
export { ActionService } from './action-service';
