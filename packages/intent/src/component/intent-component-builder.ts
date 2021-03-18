/** @packageDocumentation
 * IntentComponentBuilder fuer lokale IntentComponent
 *
 * Letzte Aenderung: 25.10.2020
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// core

import { Builder, BuilderConfigInterface } from '@speech/core';


// nlu

import { NLU_FACTORY_NAME, NLU_DEFAULT_NAME } from '../nlu/nlu-const';
import { NLUFactory } from '../nlu/nlu-factory';
import { NLUInterface } from '../nlu/nlu.interface';


// intent

import { INTENT_TYPE_NAME, INTENT_COMPONENTBUILDER_NAME, INTENT_COMPONENTFACTORY_NAME, INTENT_COMPONENT_NAME } from '../intent-const';
import { IntentComponentInterface } from './intent-component.interface';
import { IntentComponentFactory } from './intent-component-factory';


/**
 * Klasse Builder zum Erzeugen der Intent-Komponente
 */

export class IntentComponentBuilder extends Builder {


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || INTENT_TYPE_NAME, aRegisterFlag );
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return INTENT_TYPE_NAME;
    }


    getClass(): string {
        return 'IntentComponentBuilder';
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der erzeugten Komponente oder null
     */

    build( aConfig?: BuilderConfigInterface ): IntentComponentInterface {
        // console.log('IntentComponentBuilder.build: start');
        // pruefen, ob Komponente schon vorhanden ist
        const componentName = this._getComponentName( aConfig ) || INTENT_COMPONENT_NAME;
        let intent = this._findComponent( componentName ) as IntentComponentInterface;
        if ( intent ) {
            return intent;
        }
        // neue Komponente erzeugen
        try {
            intent = this._buildComponent( aConfig );
            const nlu = this._getPlugin( NLU_DEFAULT_NAME, NLU_DEFAULT_NAME, NLU_FACTORY_NAME, NLUFactory ) as NLUInterface;
            if ( this._binder( intent, nlu ) !== 0 ) {
                this.error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return intent;
        } catch ( aException ) {
            this.exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente erzeugt
     *
     * @private
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der Komponente
     */

    protected _buildComponent( aConfig?: BuilderConfigInterface ): IntentComponentInterface {
        const componentName = this._getComponentName( aConfig ) || INTENT_COMPONENT_NAME;
        const componentClass = this._getComponentClass( aConfig ) || INTENT_COMPONENT_NAME;
        return this._getPlugin( componentName, componentClass, INTENT_COMPONENTFACTORY_NAME, IntentComponentFactory ) as IntentComponentInterface;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {IntentInterface} aIntent - Intent Komponente
     * @param {NLUInterface} aNLU - NLU Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    protected _binder( aIntent: IntentComponentInterface, aNLU: NLUInterface ): number {
        // console.log('IntentComponentBuilder._binder');
        if ( !aIntent ) {
            this.error( '_binder', 'Keine Intent-Komponente vorhanden' );
            return -1;
        }
        if ( !aNLU ) {
            this.error( '_binder', 'Kein NLU-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen des NLU-Plugins
        if ( aIntent.insertPlugin( aNLU.getName(), aNLU ) !== 0 ) {
            this.error( '_binder', 'NLU-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        // binden der NLU-Funktionen
        aNLU.onInit = aIntent.onInit;
        aNLU.onListenStart = aIntent.onStart;
        aNLU.onListenStop = aIntent.onStop;
        aNLU.onListenResult = aIntent.onListenResult;
        aNLU.onIntentResult = aIntent.onIntentResult;
        aNLU.onError = aIntent.onError;
        return 0;
    }

}
