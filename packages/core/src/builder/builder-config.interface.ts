/** @packageDocumentation
 * Builder-Konfiguration Schnittstelle
 *
 * Letzte Aenderung: 28.06.2021
 * Status: rot
 *
 * @module core/builder
 * @author SB
 */


/**
 * Builder-Konfiguration Interface zur Konfiguration einer Komponente
 */

export interface IBuilderConfig {

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
