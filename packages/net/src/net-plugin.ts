/** @packageDocumentation
 * Die Net-Plugin Komponente ist die Basiskomponente fuer Net-Plugins
 *
 * Letzte Aenderung: 02.07.2021
 * Status: rot
 *
 * @module net
 * @author SB
 */


// core

import { IMessage, ComponentHandleMessageFunc, Plugin } from '@speech/core';


// net

import { OnNetOpenFunc, OnNetCloseFunc, OnNetMessageFunc } from './net-function.type';
import { INet } from './net.interface';


/**
 * Die NetWebWorker Klasse kapselt einen HTML5-WebWorker
 */

export class NetPlugin extends Plugin implements INet {

    // Liste aller HandleMessage-Funktionen

    private mHandleMessageList = new Map<string, ComponentHandleMessageFunc>();


    // Ereignisse

    protected mOnOpenFunc: OnNetOpenFunc = null;
    protected mOnCloseFunc: OnNetCloseFunc = null;
    protected mOnMessageFunc: OnNetMessageFunc = null;


    /**
     * Creates an instance of NetPlugin.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {boolean} aRegisterFlag - wird in PluginManager eingetragen, wenn true
     */

    constructor( aPluginName: string, aRegisterFlag = true ) {
        super( aPluginName, aRegisterFlag );
    }


    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return 'NetPlugin';
    }


    getClass(): string {
        return 'NetPlugin';
    }


    /**
     * Initialisierung des SpeechWokerManagers
     *
     * @param {Object} aOptions - Optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOptions?: any ): number {
        // console.log('NetPlugin.init:', aOptions);

        // HandleMessage in onMessage eintragen

        this.mOnMessageFunc = this.getHandleMessageFunc();
        return super.init( aOptions );
    }


    /**
     * WebSocket schliessen
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        this.mOnOpenFunc = null;
        this.mOnCloseFunc = null;
        this.mOnMessageFunc = null;
        return super.done();
    }


    // Event-Funktionen


    /**
     * Oeffnen Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onOpen(): number {
        // Open-Ereignisfunktion aufrufen
        if ( typeof this.mOnOpenFunc === 'function' ) {
            try {
                return this.mOnOpenFunc();
            } catch ( aException ) {
                this.exception( '_onOpen', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Schliessen Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    protected _onClose(): number {
        // console.log('NetPlugin._onClose:', aEvent);
        if ( typeof this.mOnCloseFunc === 'function' ) {
            try {
                return this.mOnCloseFunc();
            } catch ( aException ) {
                this.exception( '_onClose', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Nachricht empfangen Ereignis
     *
     * @private
     * @param {IMessage} aMessage - Message
     *
     * @return {number} Nachricht wurde verarbeitet (true) oder nicht (false)
     */

    protected _onMessage( aMessage: IMessage ): number {
        // console.log('NetPlugin._onMesseagee:', aMessage);
        if ( typeof this.mOnMessageFunc === 'function' ) {
            try {
                return this.mOnMessageFunc( aMessage );
            } catch ( aException ) {
                this.exception( '_onMessage', aException );
                return -1;
            }
        }
        return 0;
    }


    // Net-Funktionen


    /**
     * Net oeffnen
     *
     * @return {number} errorCode (0,-1)
     */

    open(): number {
        return -1;
    }


    /**
     * WebWorker beenden
     *
     * @return {number} errorCode (0,-1)
     */

    close(): number {
        return 0;
    }


    /**
     * pruefen auf vorhandenen WebWorker
     *
     * @return {boolean} true, wenn WebWorker vorhanden ist
     */

    isOpen(): boolean {
        return false;
    }


    /**
     * Rueckgabe des Zustands als TEXT
     */

    getState(): string {
        return '';
    }


    // Nachrichten-Funktionen


    /**
     * Nachricht an WebWorker versenden
     *
     * @param {IMessage} aMessage - Nachrichten-Datenobjekt
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendMessage( aMessage: IMessage ): number {
        return 0;
    }


    getSendMessageFunc(): OnNetMessageFunc {
        return (aMessage: IMessage) => {
            return this.sendMessage(aMessage);
        };
    }


    /**
     * Verarbeiten der Nachricht
     *
     * @param { IMessage} aMessage - uebergebene Nachricht
     */

    handleMessage( aMessage: IMessage ): number {
        // TODO: wenn aMessage ein Ziel beinhaltet, darf die Nachricht nur von diesem Ziel verarbeitet werden!
        this.mHandleMessageList.forEach((handleMessage: ComponentHandleMessageFunc) => {
            if ( handleMessage( aMessage )) {
                return 0;
            }
        });
        return -1;
    }


    getHandleMessageFunc(): OnNetMessageFunc {
        return (aMessage: IMessage) => {
            return this.handleMessage( aMessage );
        };
    }


    /**
     * Eintragen von HandleMessage-Funktionen zur Verarbeitung der Nachrichten
     *
     * @param {string} aPluginName - Name des Plugins zur HandleMessage-Funktione
     * @param {ComponentHandleMessageFunc} aHandleMessageFunc
     */

    setHandleMessageFunc( aPluginName: string, aHandleMessageFunc: ComponentHandleMessageFunc ): number {
        this.mHandleMessageList.set( aPluginName, aHandleMessageFunc );
        return 0;
    }


    // Events eintragen


    /**
     * Event-Funktion fuer erzeugten WebWorker
     *
     * @param {function} aOnOpenFunc - Ereignis fuer erzeugten WebWorker
     */

    set onOpen( aOnOpenFunc: OnNetOpenFunc ) {
        this.mOnOpenFunc = aOnOpenFunc;
    }


    get onOpen() {
        return () => this._onOpen();
    }

    /**
     * Event-Funktion fuer geloeschten WebWorker
     *
     * @param {function} aOnCloseFunc - Ereignis fuer geloeschten WebWorker
     */

    set onClose( aOnCloseFunc: OnNetCloseFunc ) {
        this.mOnCloseFunc = aOnCloseFunc;
    }


    get onClose() {
        return () => this._onClose();
    }


    /**
     * Event-Funktion fuer empfangene Nachrichten
     *
     * @param {function} aOnMessageFunc - Ereignis fuer empfangene Nachricht
     */

    set onMessage( aOnMessageFunc: OnNetMessageFunc ) {
        this.mOnMessageFunc = aOnMessageFunc;
    }


    get onMessage() {
        return (aMessage: IMessage) => this._onMessage( aMessage );
    }

}
