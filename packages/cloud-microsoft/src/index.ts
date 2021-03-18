/** @packageDocumentation
 * Globale Export-Datei fuer CloudMicrosoft
 *
 * Version: 1.1
 * Datum:   19.10.2020
 *
 * Definiert das gesamte CloudMicrosoft-API:
 *
 *      cloud-microsoft - API fuer Microsoft-CloudService
 *
 * @module cloud-microsoft
 * @author SB
 */


// Global API


export * from './cloud-microsoft-version';
export * from './cloud-microsoft-const';
export { CloudMicrosoftConfigDataInterface } from './cloud-microsoft-config-data.interface';
export { CloudMicrosoftOptionInterface } from './cloud-microsoft-option.interface';
// export { CloudMicrosoftFactory } from './cloud-microsoft-factory';
export { CloudMicrosoftConfig } from './cloud-microsoft-config';
export { CloudMicrosoftConnect } from './net/cloud-microsoft-connect';
export { CloudMicrosoft } from './cloud-microsoft';


// Service API

export { MicrosoftModule } from './microsoft-module';
export { MicrosoftService } from './microsoft-service';
