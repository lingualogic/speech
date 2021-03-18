/** @packageDocumentation
 * Builder Schnittstelle
 *
 * Letzte Aenderung: 16.10.2020
 * Status: rot
 *
 * @module core/builder
 * @author SB
 */


// builder

import { BuilderConfigInterface } from './builder-config.interface';


// component

import { ComponentInterface } from '../component/component.interface';


/**
 * Builder Interface fuer die Erzeugung von Komponenten
 */

export interface BuilderInterface {


    // Builder-Funktionen

    getType(): string;
    getClass(): string;
    getName(): string;

    build( aConfig?: BuilderConfigInterface ): ComponentInterface;
}
