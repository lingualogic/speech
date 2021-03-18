/** @packageDocumentation
 * Globale Export-Datei fuer Speak
 *
 * Version: 1.1
 * Datum:   23.01.2021
 *
 * Definiert das gesamte Speak-API:
 *
 * @module speak
 * @author SB
 */


// Global API


export * from './speak-version';
export * from './speak-const';
export { SpeakComponentBuilder } from './component/speak-component-builder';
export { SpeakComponentFactory } from './component/speak-component-factory';
export { SpeakComponentInterface } from './component/speak-component.interface';
export { SpeakComponent } from './component/speak-component';
export { SpeakOptionInterface } from './speak-option.interface';
export { SpeakInterface } from './speak.interface';
export { SpeakFactory } from './speak-factory';
export { SpeakMobile } from './speak-mobile';
export { Speak } from './speak';


// Service API

export { SpeakServiceConfig } from './speak-service-config';
export { SpeakServiceInterface } from './speak-service.interface';
export { SpeakService } from './speak-service';
