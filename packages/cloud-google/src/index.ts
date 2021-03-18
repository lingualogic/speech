/** @packageDocumentation
 * Globale Export-Datei fuer CloudGoogle
 *
 * Version: 1.1
 * Datum:   19.10.2020
 *
 * Definiert das gesamte CloudGoogle-API:
 *
 *      cloud-google - API fuer Google-CloudService
 *
 * @module cloud-google
 * @author SB
 */


// Global API


export * from './cloud-google-version';
export * from './cloud-google-const';
export { CloudGoogleConfigDataInterface } from './cloud-google-config-data.interface';
export { CloudGoogleOptionInterface } from './cloud-google-option.interface';
// export { CloudGoogleFactory } from './cloud-google-factory';
export { CloudGoogleConfig } from './cloud-google-config';
export { CloudGoogleConnect } from './net/cloud-google-connect';
export { CloudGoogle } from './cloud-google';


// Service API

export { GoogleModule } from './google-module';
export { GoogleService } from './google-service';
