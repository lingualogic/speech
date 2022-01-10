/** @packageDocumentation
 * Builder fuer die Erzeugung von Komponenten
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */


// error

import { ErrorBase } from '../error/error-base';


// factory

import { FactoryManager } from '../factory/factory-manager';


// plugin

import { IPluginFactory } from '../plugin/plugin-factory.interface';
import { PluginFactory } from '../plugin/plugin-factory';
import { PluginManager } from '../plugin/plugin-manager';
import { IPlugin } from '../plugin/plugin.interface';


// component

import { IComponent } from '../component/component.interface';


// builder

import { IBuilderConfig } from './builder-config.interface';
import { IBuilder } from './builder.interface';
import { BuilderManager } from './builder-manager';


/** @export
 * Klasse Builder
 */

export class Builder extends ErrorBase implements IBuilder {

    private mBuilderName = 'Builder';


    /**
     * Erzeugt eine Instanz von Builder
     */

    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( 'Builder' );
        this._setErrorClassName( this.getClass());
        // console.log('Builder.constructor:', aBuilderName);
        if ( aRegisterFlag && BuilderManager.insert( aBuilderName || this.getName(), this ) !== 0 ) {
            throw new Error('Builder ' + this.getName() + ' existiert bereits im BuilderManager');
        }
        if ( aBuilderName ) {
            this.mBuilderName = aBuilderName;
        }
    }


    /**
     * Typ der vom Builder erzeugten Komponenten
     *
     * @return {string} typeName
     */

    getType(): string {
        return '';
    }


    /**
     * Klasse des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getClass(): string {
        return 'Builder';
    }


    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return this.mBuilderName;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @param [aConfig] - optionale Konfigurationsdaten der Komponente
     *
     * @return Rueckgabe der erzeugten Komponente oder null
     */

    build( aConfig?: IBuilderConfig ): IComponent {
        return null;
    }


    // Hilfsfunktionen


    protected _getComponentName( aConfig: IBuilderConfig ): string {
        if ( aConfig && typeof aConfig.componentName === 'string' ) {
            return aConfig.componentName;
        }
        return '';
    }


    protected _getComponentClass( aConfig: IBuilderConfig ): string {
        if ( aConfig && typeof aConfig.componentClass === 'string' ) {
            return aConfig.componentClass;
        }
        return '';
    }


    protected _getRegisterFlag( aConfig: IBuilderConfig ): boolean {
        if ( aConfig && aConfig.componentRegisterFlag ) {
            return aConfig.componentRegisterFlag;
        }
        return false;
    }


    protected _getBuilder( aBuilderName: string, aBuilderClass?: typeof Builder ): IBuilder {
        return BuilderManager.get( aBuilderName, aBuilderClass );
    }


    protected _getFactory( aFactoryName: string, aFactoryClass?: typeof PluginFactory ): IPluginFactory {
        return FactoryManager.get( aFactoryName, aFactoryClass );
    }


    protected _findComponent( aComponentName ): IPlugin {
        // console.log('Builder._findComponent: name = ', aComponentName);
        // Komponente aus Plugin-Manager holen
        if ( !aComponentName ) {
            return null;
        }
        return PluginManager.find( aComponentName );
    }


    protected _getComponent( aConfig?: any, aComponentType?: string, aComponentBuilderClass?: typeof Builder ): IPlugin {
        // console.log('Builder._getComponent: config = ', aConfig);
        // Komponente erzeugen
        if ( aComponentType ) {
            const builder = this._getBuilder( aComponentType, aComponentBuilderClass );
            // console.log('Builder._getComponent: builder=', builder.getName(), builder);
            if ( builder ) {
                return builder.build( aConfig );
            }
        }
        // Komponente aus Plugin-Manager holen
        const componentName = this._getComponentName( aConfig );
        const componentClass = this._getComponentClass( aConfig );
        return PluginManager.get( componentName, componentClass );
    }


    protected _getPlugin( aPluginName: string, aPluginClass?: string, aPluginFactoryName?: string, aPluginFactoryClass?: typeof PluginFactory ): IPlugin {
        if ( aPluginFactoryName && aPluginFactoryClass ) {
            const factory = this._getFactory( aPluginFactoryName, aPluginFactoryClass );
            // console.log('Builder._getPlugin: factory=', factory.getName(), factory);
            if ( factory ) {
                return PluginManager.get( aPluginName, aPluginClass, factory );
            }
        }
        return PluginManager.get( aPluginName, aPluginClass );
    }


    protected _findPlugin( aPluginName: string ): IPlugin {
        return PluginManager.find( aPluginName );
    }

}
