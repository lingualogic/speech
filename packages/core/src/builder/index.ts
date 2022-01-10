/** @packageDocumentation
 * Globale Export-Datei fuer Builder
 *
 * Version: 2.0
 * Datum:   28.06.2021
 *
 * Definiert das gesamte Builder-API:
 *
 *      BuilderManager         - Manager aller Builder
 *      Builder                - Komponenten-Builder
 *      IBuilder               - Komponenten-Builder Interface
 *      IBuilderConfig         - Komponenten-Builder Konfigurations-Interface
 *
 * @module core/builder
 * @author SB
 */


// Global API


export { BuilderManager } from './builder-manager';
export { IBuilderConfig } from './builder-config.interface';
export { IBuilder } from './builder.interface';
export { Builder } from './builder';
