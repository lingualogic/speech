/** @packageDocumentation
 * ListenComponentBuilder fuer lokale ListenComponent
 *
 * Letzte Aenderung: 25.10.2020
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// core

import { Builder, BuilderConfigInterface } from '@speech/core';


// asr

import { ASR_FACTORY_NAME, ASR_DEFAULT_NAME } from '../asr/asr-const';
import { ASRFactory } from '../asr/asr-factory';
import { ASRInterface } from '../asr/asr.interface';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENTBUILDER_NAME, LISTEN_COMPONENTFACTORY_NAME, LISTEN_COMPONENT_NAME } from '../listen-const';
import { ListenComponentInterface } from './listen-component.interface';
import { ListenComponentFactory } from './listen-component-factory';


/**
 * Klasse DialogBuilder zum Erzeugen der Dialog-Komponente
 */

export class ListenComponentBuilder extends Builder {


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || LISTEN_TYPE_NAME, aRegisterFlag );
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return LISTEN_TYPE_NAME;
    }


    getClass(): string {
        return 'ListenComponentBuilder';
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der erzeugten Komponente oder null
     */

    build(  aConfig?: BuilderConfigInterface ): ListenComponentInterface {
        // console.log('ListenComponentBuilder.build: start');
        // pruefen, ob Komponente schon vorhanden ist
        const componentName = this._getComponentName( aConfig ) || LISTEN_COMPONENT_NAME;
        let listen = this._findComponent( componentName ) as ListenComponentInterface;
        if ( listen ) {
            return listen;
        }
        // neue Komponente erzeugen
        try {
            listen = this._buildComponent( aConfig );
            const asr = this._getPlugin( ASR_DEFAULT_NAME, ASR_DEFAULT_NAME, ASR_FACTORY_NAME, ASRFactory ) as ASRInterface;
            if ( this._binder( listen, asr ) !== 0 ) {
                this.error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return listen;
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

    protected _buildComponent( aConfig: BuilderConfigInterface ): ListenComponentInterface {
        const componentName = this._getComponentName( aConfig ) || LISTEN_COMPONENT_NAME;
        const componentClass = this._getComponentClass( aConfig ) || LISTEN_COMPONENT_NAME;
        return this._getPlugin( componentName, componentClass, LISTEN_COMPONENTFACTORY_NAME, ListenComponentFactory ) as ListenComponentInterface;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {ListenInterface} aListen - Listen Komponente
     * @param {ASRInterface} aASR - ASR Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    protected _binder( aListen: ListenComponentInterface, aASR: ASRInterface ): number {
        // console.log('ListenComponentBuilder._binder');
        if ( !aListen ) {
            this.error( '_binder', 'Keine Listen-Komponente vorhanden' );
            return -1;
        }
        if ( !aASR ) {
            this.error( '_binder', 'Kein ASR-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen des ASR-Plugins
        if ( aListen.insertPlugin( aASR.getName(), aASR ) !== 0 ) {
            this.error( '_binder', 'ASR-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        // binden der ASR-Funktionen
        aASR.onInit = aListen.onInit;
        aASR.onListenStart = aListen.onStart;
        aASR.onListenStop = aListen.onStop;
        aASR.onListenRecognitionStart = aListen.onListenRecognitionStart;
        aASR.onListenRecognitionStop = aListen.onListenRecognitionStop;
        aASR.onListenAudioStart = aListen.onListenAudioStart;
        aASR.onListenAudioStop = aListen.onListenAudioStop;
        aASR.onListenSoundStart = aListen.onListenSoundStart;
        aASR.onListenSoundStop = aListen.onListenSoundStop;
        aASR.onListenSpeechStart = aListen.onListenSpeechStart;
        aASR.onListenSpeechStop = aListen.onListenSpeechStop;
        aASR.onListenResult = aListen.onListenResult;
        aASR.onListenInterimResult = aListen.onListenInterimResult;
        aASR.onListenNoMatch = aListen.onListenNoMatch;
        aASR.onError = aListen.onError;
        return 0;
    }

}
