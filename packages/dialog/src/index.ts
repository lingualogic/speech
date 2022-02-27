/** @packageDocumentation
 * Globale Export-Datei fuer Dialog
 *
 * Version: 2.0
 * Datum:   13.10.2021
 *
 * Definiert das gesamte Dialog-API:
 *
 * @module dialog
 * @author SB
 */


// Global API

export * from './dialog-version';
export * from './dialog-const';
export * from './dialog-function.type';
export { DialogComponentBuilder } from './component/dialog-component-builder';
export { DialogComponentFactory } from './component/dialog-component-factory';
export { IDialogComponent } from './component/dialog-component.interface';
export { DialogComponent } from './component/dialog-component';
export { IDialogAction, /* deprecated */ DialogServiceActionInterface } from './dialog-action.interface';
export { IDialogData, /* deprecated */ DialogServiceDataInterface  } from './dialog-data.interface';
export { IDialogOption, /* deprecated */ DialogServiceOptionInterface  } from './dialog-option.interface';
export { IDialogSpeak, /* deprecated */ DialogServiceSpeakInterface  } from './dialog-speak.interface';
export { IDialogStateContext } from './dialog-state-context.interface';
export { IDialog } from './dialog.interface';
export { DialogFactory } from './dialog-factory';
export { Dialog } from './dialog';


// Service API

export { DialogServiceConfig } from './dialog-service-config';
export { IDialogService } from './dialog-service.interface';
export { DialogService } from './dialog-service';
