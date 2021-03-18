/** @packageDocumentation
 * Komponente als semantische Einheit fuer Plugins und Klassen.
 *
 * Letzte Aenderung: 14.10.2020
 * Status: rot
 *
 * @module core/component
 * @author SB
 */


// global

import { SPEECH_API_VERSION } from '../const/speech-version';
import {
    SPEECH_INIT_EVENT,
    SPEECH_ERROR_EVENT
} from '../const/speech-event-const';

import { OnSpeechErrorFunc } from '../interface/speech-function.type';


// event

import { EventFunc } from '../event/event-function.type';
import { EventFunctionList } from '../event/event-function-list';


// message

import { MessageInterface } from './../message/message.interface';


// plugin

import { PluginGroup } from '../plugin/plugin-group';


// component

import { ComponentInterface, ComponentSendMessageFunc, ComponentHandleMessageFunc } from './component.interface';
import { ComponentManager } from './component-manager';


/**
 * Definiert die Basisklasse aller Komponenten
 */

export class Component extends PluginGroup implements ComponentInterface {


    // Nachrichtenfunktion zum Versenden von Nachrichten

    private mSendMessageFunc: ComponentSendMessageFunc = null;


    // Events

    private mInitEvent = new EventFunctionList( SPEECH_INIT_EVENT );
    private mErrorEvent = new EventFunctionList( SPEECH_ERROR_EVENT );


    /**
     * Creates an instance of Component
     *
     * @param {string} aComponentName - Name der Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann wird Komponente in PluginManager eingetragen
     */

    constructor( aComponentName: string, aRegisterFlag = true ) {
        // TODO: Komponenten sollten nicht mehr in den Plugin-Manager eingetragen werden
        // super( aComponentName, false );
        super( aComponentName, aRegisterFlag );
        // anstelle dessen wird die Komponente in den Component-Manager eingetragen
        if ( aRegisterFlag ) {
            ComponentManager.insert( aComponentName, this );
        }
        this.mInitEvent.setComponentName( aComponentName );
        this.mErrorEvent.setComponentName( aComponentName );
        this.mInitEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        this.mErrorEvent.setErrorOutputFunc(this._getErrorOutputFunc());
        // Default-Funktion zum Versenden von Nachrichten
        this.setSendMessageFunc( ComponentManager.getSendMessageFunc());
    }


    // Komponenten-Funktionen


    getType(): string {
        return 'Component';
    }


    getClass(): string {
        return 'Component';
    }


    getVersion(): string {
        return SPEECH_API_VERSION;
    }


    /**
     * Initalisiert das Plugin
     *
     * @param {any} [aOption] - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }
        return 0;
    }


    /**
     * Gibt das plugin frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done(): number {
        this.mInitEvent.clear();
        this.mErrorEvent.clear();
        return super.done();
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    setErrorOutput( aErrorOutputFlag: boolean ): void {
        super.setErrorOutput( aErrorOutputFlag );
        this.mInitEvent.setErrorOutput( aErrorOutputFlag );
        this.mErrorEvent.setErrorOutput( aErrorOutputFlag );
    }


    // Netz-Funktionen


    /**
     * Komponente mit Server verbinden
     *
     * @returns {number} errorCode(0,-1)
     */

    connect(): number {
        return 0;
    }


    /**
     * Pruefen, ob Komponente erfolgreich mit dem Server verbunden ist
     *
     * @return {boolean} true, erfolgreich verbunden, false sonst.
     */

    isConnect(): boolean {
        return true;
    }


    /**
     * Rueckgabe des Typs des Speech-APIs
     *
     * @public
     *
     * @return {string} type des Speech-APIS (web, cordova)
     */

    getNetType(): string {
        return 'undefined';
    }


    /**
     * EventListener in alle registrierten Plugins eintragen
     *
     * @private
     * @param {string} aPluginName - Name des Plugins, welches eine Eventfunktion eintraegt
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorCode (0,-1) - Fehlercode, ob Event eingetragen wurde oder nicht
     */

    protected _addEventListenerAllPlugin( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number {
        // console.log('Component.addEventListenerAllPlugin:', this.getName());
        try {
            let result = -1;
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                // nur Komponenten haben EventListener
                if ( plugin instanceof Component ) {
                    const component = plugin as Component;
                    // console.log('Component.addEventListenerAllPlugin:', plugin.getName(), component);
                    if ( component ) {
                        // console.log('Component.addEventAllPlugin:', this.getName(), component.getName());
                        if ( component.addEventListener( aPluginName, aEventName, aEventFunc ) === 0 ) {
                            result = 0;
                        }
                    }
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this.exception( 'addEventListenerAllPlugin', aException );
            return -1;
        }
    }


    /**
     * EventListener aus allen registrierten Plugins entfernen
     *
     * @private
     * @param {string} aPluginName - Name des Plugins, welches eine Eventfunktion eintraegt
     * @param {string} aEventName - Name des Events
     *
     * @return {number} errorCode (0,-1) - Fehlercode, ob ein Event entfernt wurde
     */

    protected _removeEventListenerAllPlugin( aPluginName: string, aEventName: string ): number {
        // console.log('Component.removeEventListenerAllPlugin:', this.getName());
        try {
            let result = -1;
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                // nur Komponenten haben EventListener
                if ( plugin instanceof Component ) {
                    const component = plugin as Component;
                    // console.log('Component.removeEventListenerAllPlugin:', plugin.getName(), component);
                    if ( component ) {
                        // console.log('Component.removeEventAllPlugin:', this.getName(), component.getName());
                        if ( component.removeEventListener( aPluginName, aEventName ) === 0 ) {
                            result = 0;
                        }
                    }
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this.exception( 'removeEventListenerAllPlugin', aException );
            return -1;
        }
    }



    // Nachrichten-Funktionen


    /**
     * Eintragen der externen SendMessage-Funktion
     *
     * @param  aSendMessageFunc - einzuragende Sende-Funktion fuer Nachrichten
     *
     * @return Fehlercode 0 oder -1
     */

    setSendMessageFunc( aSendMessageFunc: ComponentSendMessageFunc ): number {
        this.mSendMessageFunc = aSendMessageFunc;
        return 0;
    }


    /**
     * Senden einer Nachricht
     *
     * @param {MessageInterface} aMessage - Nachrichtenobjet
     * @return {number}
     */

    sendMessage( aMessage: MessageInterface ): number {
        if ( typeof this.mSendMessageFunc !== 'function' ) {
            return -1;
        }
        return this.mSendMessageFunc( aMessage );
    }


    /**
     * Behandelt alle empfangenen Nachrichten
     *
     * @param {MessageInterface} aMessage - Nachrichtenpaket
     *
     * @return Rueckgabe, ob Nachricht verarbeitet wurde (true) oder nicht (false)
     */

    handleMessage( aMessage: MessageInterface ): boolean {
        try {
            let result = 0;
            let messageConsumeFlag = true;
            switch ( aMessage.action ) {

                case SPEECH_INIT_EVENT:
                    // console.log('Component.handleMessage: error event');
                    result = this.mInitEvent.dispatch( aMessage );
                    break;

                case SPEECH_ERROR_EVENT:
                    // console.log('Component.handleMessage: error event');
                    result = this.mErrorEvent.dispatch( aMessage );
                    break;

                default:
                    this.error( 'handleMessage', 'ungueltige Nachricht: ' + aMessage.action);
                    result = -1;
                    messageConsumeFlag = false;
                    break;
            }
            return messageConsumeFlag;
        } catch ( aException ) {
            this.exception( 'handleMessage', aException );
            return false;
        }
    }


    /**
     * Rueckgabe der Nachrichtenverarbeitungsfunktion
     *
     * @return {ComponentHandleMessageFunc} handleMessageFunc
     */

    getHandleMessageFunc(): ComponentHandleMessageFunc {
        return (aMessage: MessageInterface) => this.handleMessage( aMessage );
    }


    // Event-Funktionen


    /*
     * Kommentar:
     *
     * Generische Eventfunktions-API dient der Verbindung der Kompnenten
     * untereinander ueber Ereignisfunktionen.
     */


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onInit(): number {
        // console.log('Component._onInit:', this.getName());
        return this.mInitEvent.dispatch( this.getName());
    }


    get onInit(): OnSpeechErrorFunc {
        return () => this._onInit();
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    protected _onError( aError: any ): number {
        // console.log('Component._onError:', this.getName(), aError.message);
        return this.mErrorEvent.dispatch( aError );
    }


    get onError(): OnSpeechErrorFunc {
        return (aError: any) => this._onError( aError );
    }


    /**
     * EventFunktion eintragen
     *
     * @param {string} aPluginName - Name des Listeners
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorcode(0,-1)
     */

    addEventListener( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number {
        let result = 0;
        switch ( aEventName ) {

            case SPEECH_INIT_EVENT:
                // console.log('Component.addEventListener: init event');
                result = this.mInitEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_ERROR_EVENT:
                // console.log('Component.addEventListener: error event');
                this._addEventListenerAllPlugin( aPluginName, aEventName, aEventFunc );
                result = this.mErrorEvent.addListener( aPluginName, aEventFunc );
                break;

            default:
                // in alle Unterkomponenten den Event eintragen, wenn moeglich
                result = this._addEventListenerAllPlugin( aPluginName, aEventName, aEventFunc );
                break;
        }
        return result;
    }


    /**
     * EventFunktion entfernen
     *
     * @param {string} aPluginName - Name des Listeners (Pluginname)
     * @param {string} aEventName - Name des Events
     */

    removeEventListener( aPluginName: string, aEventName: string ): number {
        let result = 0;
        switch ( aEventName ) {

            case SPEECH_INIT_EVENT:
                result = this.mInitEvent.removeListener( aPluginName );
                break;

            case SPEECH_ERROR_EVENT:
                this._removeEventListenerAllPlugin( aPluginName, aEventName );
                result = this.mErrorEvent.removeListener( aPluginName );
                break;

            default:
                result = this._removeEventListenerAllPlugin( aPluginName, aEventName );
                break;
        }
        return result;
    }

}
