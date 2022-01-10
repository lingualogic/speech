/** @packageDocumentation
 * Globale Export-Datei fuer Speak
 *
 * Version: 2.0
 * Datum:   13.10.2021
 *
 * Definiert das gesamte Speak-API:
 *
 * @module speak
 * @author SB
 */


// TODO: nur solange hier, wie es von externen Komponenten verwendet wird
//       wird spaeter wieder entfernt, wenn nur noch intern von Net verwendet
// Common API

export { SpeechSynthesisFactory, SPEECHSYNTHESIS_FACTORY_NAME, SPEECHSYNTHESIS_TYPE_NAME, SPEECHSYNTHESIS_UTTERANCE_NAME } from './common/speechsynthesis-factory';


// Global API

export * from './speak-version';
export * from './speak-const';
export { SpeakComponentBuilder } from './component/speak-component-builder';
export { SpeakComponentFactory } from './component/speak-component-factory';
export { ISpeakComponent } from './component/speak-component.interface';
export { SpeakComponent } from './component/speak-component';
export { ISpeakOption, /* deprecated */ SpeakServiceOptionInterface } from './speak-option.interface';
export { ISpeak } from './speak.interface';
export { SpeakFactory } from './speak-factory';
export { SpeakMobile } from './speak-mobile';
export { Speak } from './speak';


// Service API

export { SpeakServiceConfig } from './speak-service-config';
export { ISpeakService } from './speak-service.interface';
export { SpeakService } from './speak-service';
