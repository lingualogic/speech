/** @packageDocumentation
 * Builder-Konfiguration Schnittstelle
 *
 * Letzte Aenderung: 16.10.2020
 * Status: rot
 *
 * @module core/builder
 * @author SB
 */


/**
 * Builder-Konfiguration Interface zur Konfiguration einer Komponente
 */

export interface BuilderConfigInterface {

    // Instanzen-Name einer Komponente

    componentName: string;

    // Klassen-Name einer Komponente

    componentClass?: string;

    // Registrierungsflag fuer den Komponenten-Manager

    componentRegisterFlag?: boolean;

    // weitere Komponenten-Optionen

    componentOption?: any;

    // TODO: Hier muessen die Definitionen der inneren Komponenten hin
}
