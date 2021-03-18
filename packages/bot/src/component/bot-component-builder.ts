/** @packageDocumentation
 * BotBuilder fuer die Erzeugung der BotComponent
 *
 * Letzte Aenderung: 26.10.2020
 * Status: gelb
 *
 * @module bot/component
 * @author SB
 */


// core

import { Builder, BuilderConfigInterface } from '@speech/core';


// audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AudioPlayerFactory, AudioPlayerInterface } from '@speech/audio';


// speak

import { SPEAK_TYPE_NAME, SPEAK_COMPONENT_NAME, SpeakComponentBuilder, SpeakComponentInterface } from '@speech/speak';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENT_NAME, ListenComponentBuilder, ListenComponentInterface } from '@speech/listen';


// action

import { ACTION_TYPE_NAME, ACTION_COMPONENT_NAME, ActionComponentBuilder, ActionComponentInterface } from '@speech/action';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENT_NAME, DialogComponentBuilder, DialogComponentInterface } from '@speech/dialog';


// bot

import { BOT_TYPE_NAME, BOT_COMPONENTFACTORY_NAME, BOT_COMPONENT_NAME } from '../bot-const';
import { BotComponentFactory } from './bot-component-factory';
import { BotComponentInterface } from './bot-component.interface';


/** @export
 * Klasse BotComponentBuilder zum Erzeugen der Bot-Komponente
 */

export class BotComponentBuilder extends Builder {


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || BOT_TYPE_NAME, aRegisterFlag );
    }


    getClass(): string {
        return 'BotComponentBuilder';
    }


    /**
     * Type der erzeugten Komponente des Builders zurueckgeben
     *
     * @return {string} componentType
     */

    getType(): string {
        return BOT_TYPE_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return Rueckgabe der erzeugten Komponente oder null
     */

    build( aConfig?: BuilderConfigInterface ): BotComponentInterface {
        // console.log('BotComponentBuilder.build: start');
        // pruefen, ob Komponente schon vorhanden ist
        const componentName = this._getComponentName( aConfig ) || BOT_COMPONENT_NAME;
        let bot = this._findComponent( componentName ) as BotComponentInterface;
        if ( bot ) {
            return bot;
        }
        // neue Komponente erzeugen
        try {
            bot = this._buildComponent( aConfig );
            const dialog = this._getComponent({ componentName: DIALOG_COMPONENT_NAME }, DIALOG_TYPE_NAME, DialogComponentBuilder ) as DialogComponentInterface;
            const action = this._getComponent({ componentName: ACTION_COMPONENT_NAME }, ACTION_TYPE_NAME, ActionComponentBuilder ) as ActionComponentInterface;
            const listen = this._getComponent({ componentName: LISTEN_COMPONENT_NAME }, LISTEN_TYPE_NAME, ListenComponentBuilder ) as ListenComponentInterface;
            const speak = this._getComponent({ componentName: SPEAK_COMPONENT_NAME }, SPEAK_TYPE_NAME, SpeakComponentBuilder ) as SpeakComponentInterface;
            const audioPlayer = this._getPlugin( AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_FACTORY_NAME, AudioPlayerFactory ) as AudioPlayerInterface;
            if ( this._binder( bot, dialog, action, listen, speak, audioPlayer ) !== 0 ) {
                this.error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            // console.log('BotComponentBuilder.build: ende');
            return bot;
        } catch ( aException ) {
            this.exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singelton erzeugt
     *
     * @private
     * @param [aConfig] - optionale Konfiguration der Komponente
     *
     * @return {BotComponentInterface} botComponent - Rueckgabe des Component-Singletons
     */

    protected _buildComponent( aConfig?: BuilderConfigInterface ): BotComponentInterface {
        const componentName = this._getComponentName( aConfig ) || BOT_COMPONENT_NAME;
        const componentClass = this._getComponentClass( aConfig ) || BOT_COMPONENT_NAME;
        return this._getPlugin( componentName, componentClass, BOT_COMPONENTFACTORY_NAME, BotComponentFactory ) as BotComponentInterface;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {BotComponentInterface} aBot - Bot Komponente
     * @param {DialogComponentInterface} aDialog - Dialog Komponente
     * @param {ListenComponentInterface} aListen - Listen Komponente
     * @param {SpeakComponentInterface} aSpeak - Speak Komponente
     * @param {AudioPlayerInterface} aAudioPlayer - AudioPlayer Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    protected _binder( aBot: BotComponentInterface,
             aDialog: DialogComponentInterface,
             aAction: ActionComponentInterface,
             aListen: ListenComponentInterface,
             aSpeak: SpeakComponentInterface,
             aAudioPlayer: AudioPlayerInterface ): number {
        // console.log('BotComponentBuilder._binder: start');
        if ( !aBot ) {
            this.error( '_binder', 'Keine Bot-Komponente vorhanden' );
            return -1;
        }
        if ( !aDialog ) {
            this.error( '_binder', 'Keine Dialog-Komponente vorhanden' );
            return -1;
        }
        if ( !aAction ) {
            this.error( '_binder', 'Keine Action-Komponente vorhanden' );
            return -1;
        }
        if ( !aListen ) {
            this.error( '_binder', 'Keine Listen-Komponente vorhanden' );
            return -1;
        }
        if ( !aSpeak ) {
            this.error( '_binder', 'Keine Speak-Komponente vorhanden' );
            return -1;
        }
        if ( !aAudioPlayer ) {
            this.error( '_binder', 'Kein AudioPlayer-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen aller Komponenten und Plugins in Initialisierungreihenfolge
        if ( aBot.insertPlugin( aAudioPlayer.getName(), aAudioPlayer ) !== 0 ) {
            this.error( '_binder', 'AudioPlayer-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aSpeak.getName(), aSpeak ) !== 0 ) {
            this.error( '_binder', 'Speak-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aListen.getName(), aListen ) !== 0 ) {
            this.error( '_binder', 'Listen-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aAction.getName(), aAction ) !== 0 ) {
            this.error( '_binder', 'Action-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aDialog.getName(), aDialog ) !== 0 ) {
            this.error( '_binder', 'Dialog-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        // verbinden von Dialog-ActionEvent mit Bot Action-Funktionen (DialogActionStart fehlt, da DialogAction diese Funktion miterfuellt)
        if ( aDialog.addDialogActionEvent( BOT_COMPONENT_NAME, aBot.getDialogActionFunc()) !== 0 ) { return -1; }
        if ( aDialog.addDialogActionStopEvent( BOT_COMPONENT_NAME, aBot.getDialogActionStopFunc()) !== 0 ) { return -1; }
        // verbinden von Dialog-SpeakEvent mit Bot Speak-Funktion (DialogSpeakStart fehlt, da DialogSpeak diese Funktion miterfuellt)
        if ( aDialog.addDialogSpeakEvent( BOT_COMPONENT_NAME, aBot.getDialogSpeakFunc()) !== 0 ) { return -1; }
        if ( aDialog.addDialogSpeakStopEvent( BOT_COMPONENT_NAME, aBot.getDialogSpeakStopFunc()) !== 0 ) { return -1; }
        // console.log('BotComponentBuilder._binder: ende');
        return 0;
    }

}

