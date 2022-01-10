/** @packageDocumentation
 * Builder Schnittstelle
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/builder
 * @author SB
 */


// builder

import { IBuilderConfig } from './builder-config.interface';


// component

import { IComponent } from '../component/component.interface';


/**
 * Builder Interface fuer die Erzeugung von Komponenten
 */

export interface IBuilder {


    // Builder-Funktionen

    getType(): string;
    getClass(): string;
    getName(): string;

    build( aConfig?: IBuilderConfig ): IComponent;
}
