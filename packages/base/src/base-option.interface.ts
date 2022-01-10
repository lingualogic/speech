/** @packageDocumentation
 * BaseOption Schnittstelle
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * Letzte Aenderung: 28.06.2021
 * Status: gruen
 *
 * @module base
 * @author SB
 */


/** @export
 * BaseOption Schnittstelle fuer optionale Konfigurationsparameter einer Komponente bei der Initialisierung
 */

export interface IBaseOption {
    /** definiert den zu verwendenden Builder fuer die Erzeugung der Komponente */
    builderName?: string;
    /** definiert den zu verwendenden Instanzen-Namen der inneren Komponente */
    componentName?: string;
    /** definiert den Klassen-Namen fuer die Erzeugung der inneren Komponente */
    componentClass?: string;
    /** ein/ausschalten der Komponente */
    activeFlag?: boolean;
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag?: boolean;
}
