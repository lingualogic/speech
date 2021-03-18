/** @packageDocumentation
 * Globale Export-Datei fuer Cloud-Amazon
 *
 * Version: 1.1
 * Datum:   19.10.2020
 *
 * Definiert das gesamte Cloud-Amazon-API:
 *
 *      cloud-amazon - API fuer CloudAmazon Service
 *
 * @module cloud-amazon
 * @author SB
 */


// Global API


export * from './cloud-amazon-version';
export * from './cloud-amazon-const';
export { CloudAmazonConfigDataInterface } from './cloud-amazon-config-data.interface';
export { CloudAmazonOptionInterface } from './cloud-amazon-option.interface';
// export { CloudAmazonFactory } from './cloud-amazon-factory';
export { CloudAmazonConfig } from './cloud-amazon-config';
export { CloudAmazonConnect } from './net/cloud-amazon-connect';
export { CloudAmazon } from './cloud-amazon';


// Service API

export { AmazonModule } from './amazon-module';
export { AmazonService } from './amazon-service';
