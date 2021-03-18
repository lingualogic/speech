/** @packageDocumentation
 * ComponentManager zur Verwaltung aller Komponenten
 *
 * Letzte Aenderung: 14.10.2020
 * Status: rot
 *
 * @module core/component
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// error

import { ErrorBase } from './../error/error-base';


// message

import { MESSAGE_COMPONENT_TYPE } from './../message/message-const';
import { MessageInterface } from './../message/message.interface';


// component

import { ComponentInterface, ComponentSendMessageFunc } from './component.interface';
import { ComponentList } from './component-list';


export class ComponentManager {

    private static mComponentList = new ComponentList();


    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    private static mErrorBase = new ErrorBase( 'ComponentManager' );


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        ComponentManager.mComponentList.setErrorOutputOn();
        ComponentManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        ComponentManager.mComponentList.setErrorOutputOff();
        ComponentManager.mErrorBase.setErrorOutputOff();
    }

    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        ComponentManager.mComponentList.setErrorOutputFunc( aErrorFunc );
        ComponentManager.mErrorBase.setErrorOutputFunc( aErrorFunc );
    }


    // Component-Funktionen


    /**
     * Rueckgabe der Anzahl vorhandener Komponenten
     *
     * @return {number} size - Anzahl der Komponenten in der Liste
     */

    static getSize(): number {
        return ComponentManager.mComponentList.getSize();
    }


    /**
     * Rueckgabe aller vorhandenen Komponenten-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */

    static getNameList(): Array<string> {
        return ComponentManager.mComponentList.getNameList();
    }


    /**
     * Rueckgabe aller vorhandenen Komponenten-Namen zu einem Komponenten-Typ
     *
     * @param aComponentType - Name des Komponenten-Typs
     *
     * @return Rueckgabe aller Komponenten-Namen zum Typ als Liste
     */

    static getNameTypeList( aComponentTypeName: string ): string[] {
        return ComponentManager.mComponentList.getNameTypeList( aComponentTypeName );
    }


    /**
     * Rueckgabe aller vorhandenen Komponenten-Typen
     *
     * @return Rueckgabe aller Komponenten-Typen als Liste
     */

    static getTypeList(): string[] {
        return ComponentManager.mComponentList.getTypeList();
    }


    /**
     * Rueckgabe einer Komponente
     *
     * @param {string} aComponentName - Name der Komponente
     *
     * @return {ComponentInterface} - Rueckgabe der Komponente
     */

    static find( aComponentName: string ): ComponentInterface {
        const component = ComponentManager.mComponentList.find( aComponentName );
        if ( !component ) {
            return null;
        }
        return component;
    }


    /**
     * Eintragen einer Komponente
     *
     * @param {string} aComponentName - Name der Komponente
     * @param {ComponentInterface} aComponent - Instanz der Komponente
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    static insert( aComponentName: string, aComponent: ComponentInterface ): number {
        return ComponentManager.mComponentList.insert( aComponentName, aComponent );
    }


    /**
     * Entfernt die Komponente aus der Liste
     *
     * @param {string} aComponentName - Name der Komponente
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    static remove( aComponentName: string ): number {
        return ComponentManager.mComponentList.remove( aComponentName );
    }


    /**
     * Entfernt alle Komponenten. Die Komponenten werden vorher mit done() freigegeben.
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    static clear(): number {
        let component = ComponentManager.mComponentList.first();
        while ( component ) {
            try {
                // Komponenten muessen freigegeben werden, um ihre Ressourcen ebenfalls freizugeben
                component.done();
            } catch ( aException ) {
                ComponentManager.mErrorBase.exception( 'clear', aException );
            }
            component = ComponentManager.mComponentList.next();
        }
        return ComponentManager.mComponentList.clear();
    }


    // Nachrichten-Funktionen


    /**
     * senden einer Nachricht an eine Komponente
     *
     * @param aMessage - zu sendendes Nachrichten-Objekt
     */

    static sendMessage( aMessage: MessageInterface ): number {
        // nur Komponenten-Nachrichten verarbeiten
        if ( aMessage && aMessage.type === MESSAGE_COMPONENT_TYPE ) {
            // Zielkomponente auslesen
            if ( aMessage.dest ) {
                const component = ComponentManager.find( aMessage.dest );
                if ( component ) {
                    // Nachricht in Zielkomponente verarbeiten
                    component.handleMessage( aMessage );
                    return 0;
                } else {
                    ComponentManager.mErrorBase.error('sendMessage', 'Komponente nicht gefunden ' + aMessage.dest);
                }
            } else {
                ComponentManager.mErrorBase.error('sendMessage', 'Komponentenname nicht uebergeben');
            }
        } else {
            ComponentManager.mErrorBase.error('sendMessage', 'keine Komponenten-Nachricht');
        }
        return -1;
    }


    /**
     * Rueckgabe der Nachrichtensendefunktion
     *
     * @return {ComponentSendMessageFunc} handleMessageFunc
     */

    static getSendMessageFunc(): ComponentSendMessageFunc {
        return (aMessage: MessageInterface) => ComponentManager.sendMessage( aMessage );
    }

}
