/** @packageDocumentation
 * ActionComponentBuilder fuer die Erzeugung der ActionComponent
 *
 * Letzte Aenderung: 26.10.2020
 * Status: rot
 *
 * @module action/component
 * @author SB
 */


// core

import { Builder, BuilderConfigInterface } from '@speech/core';


// action

import { ACTIONFUNCTION_FACTORY_NAME, ACTIONFUNCTION_PLUGIN_NAME } from './../function/action-function-const';
import { ActionFunctionFactory } from './../function/action-function-factory';
import { ActionFunctionInterface } from './../function/action-function.interface';

import { ACTIONELEMENT_FACTORY_NAME, ACTIONELEMENT_PLUGIN_NAME } from './../element/action-element-const';
import { ActionElementFactory } from './../element/action-element-factory';
import { ActionElementInterface } from './../element/action-element.interface';

import { ACTION_TYPE_NAME, ACTION_COMPONENTFACTORY_NAME, ACTION_COMPONENT_NAME } from '../action-const';
import { ActionComponentFactory } from './action-component-factory';
import { ActionComponentInterface } from './action-component.interface';


/** @export
 * Klasse ActionComponentBuilder zum Erzeugen der Action-Komponente
 */

export class ActionComponentBuilder extends Builder {


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || ACTION_TYPE_NAME, aRegisterFlag );
    }


    getClass(): string {
        return 'ActionComponentBuilder';
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return ACTION_TYPE_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der erzeugten Komponente oder null
     */

    build( aConfig?: BuilderConfigInterface ): ActionComponentInterface {
        // console.log('ActionComponentBuilder.build: start');
        // pruefen, ob Komponente schon vorhanden ist
        const componentName = this._getComponentName( aConfig ) || ACTION_COMPONENT_NAME;
        let action = this._findComponent( componentName ) as ActionComponentInterface;
        if ( action ) {
            return action;
        }
        // neue Komponente erzeugen

        try {
            action = this._buildComponent( aConfig );
            const actionFunction = this._getPlugin( ACTIONFUNCTION_PLUGIN_NAME, ACTIONFUNCTION_PLUGIN_NAME, ACTIONFUNCTION_FACTORY_NAME, ActionFunctionFactory ) as ActionFunctionInterface;
            const actionElement = this._getPlugin( ACTIONELEMENT_PLUGIN_NAME, ACTIONELEMENT_PLUGIN_NAME, ACTIONELEMENT_FACTORY_NAME, ActionElementFactory ) as ActionElementInterface;
            if ( this._binder( action, actionFunction, actionElement ) !== 0 ) {
                this.error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return action;
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

    protected _buildComponent( aConfig?: BuilderConfigInterface ): ActionComponentInterface {
        const componentName = this._getComponentName( aConfig ) || ACTION_COMPONENT_NAME;
        const componentClass = this._getComponentClass( aConfig ) || ACTION_COMPONENT_NAME;
        return this._getPlugin( componentName, componentClass, ACTION_COMPONENTFACTORY_NAME, ActionComponentFactory ) as ActionComponentInterface;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {ActionComponentInterface} aAction - Action Komponente
     * @param {ActionFunctionInterface} aActionFunction - ActionFunction Plugin
     * @param {ActionElementInterface} aActionElement - ActionElement Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    protected _binder( aAction: ActionComponentInterface, aActionFunction: ActionFunctionInterface, aActionElement: ActionElementInterface ): number {
        if ( !aAction ) {
            this.error( '_binder', 'Keine Action-Komponente vorhanden' );
            return -1;
        }
        if ( !aActionFunction ) {
            this.error( '_binder', 'Kein ActionFunction-Plugin vorhanden' );
            return -1;
        }
        if ( !aActionElement ) {
            this.error( '_binder', 'Kein ActionElement-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen aller Komponenten und Plugins in Initialisierungreihenfolge
        if ( aAction.insertPlugin( aActionFunction.getName(), aActionFunction ) !== 0 ) {
            this.error( '_binder', 'ActionFunction-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        if ( aAction.insertPlugin( aActionElement.getName(), aActionElement ) !== 0 ) {
            this.error( '_binder', 'ActionElement-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        aActionFunction.onError = aAction.onError;
        aActionElement.onError = aAction.onError;
        return 0;
    }

}
