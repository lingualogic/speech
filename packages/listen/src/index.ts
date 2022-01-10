/** @packageDocumentation
 * Globale Export-Datei fuer Listen
 *
 * Version: 2.0
 * Datum:   31.10.2021
 *
 * Definiert das gesamte Listen-API:
 *
 * @module listen
 * @author SB
 */


// TODO: nur solange hier, wie es von externen Komponenten verwendet wird
//       wird spaeter wieder entfernt, wenn nur noch intern von Net verwendet
// Common API

export { SpeechRecognitionFactory, SPEECHRECOGNITION_FACTORY_NAME, SPEECHRECOGNITION_TYPE_NAME, SPEECHRECOGNITION_GRAMMAR_NAME } from './common/speechrecognition-factory';


// Global API

export * from './listen-version';
export * from './listen-const';
export { IASROption } from './asr/asr-option.interface';
export { ListenComponentBuilder } from './component/listen-component-builder';
export { ListenComponentFactory } from './component/listen-component-factory';
export { IListenComponent } from './component/listen-component.interface';
export { ListenComponent } from './component/listen-component';
export { IListenOption, /* deprecated */ ListenServiceOptionInterface } from './listen-option.interface';
export { IListen } from './listen.interface';
export { ListenFactory } from './listen-factory';
export { ListenMobile } from './listen-mobile';
export { Listen } from './listen';


// Service API

export { ListenServiceConfig } from './listen-service-config';
export { IListenService } from './listen-service.interface';
export { ListenService } from './listen-service';
