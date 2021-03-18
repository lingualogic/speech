/** @packageDocumentation
 * Factory-Interface fuer die Erzeugung von Objekten
 *
 * Letzte Aenderung: 16.10.2020
 * Status: rot
 *
 * @module core/factory
 * @author SB
 */


/**
 * Erzeugt ein neues Objekt
 *
 * @export
 * @interface FactoryInterface
 */

export interface FactoryInterface {


    isMock(): boolean;


    /**
     * gibt den Namen des generischen Objekttyps zurueck, den die Fabrik erzeugt
     *
     * @return {string} name - Name des Objekttyps
     */

    getType(): string;


    /**
     * gibt den Namen der Fabrik zurueck, unter dem sie verwaltet wird
     *
     * @return {string} name - Name der Fabrik
     */

    getName(): string;


    /**
     * Erzeugt ein neues Objekt zum uebergebenen ObjektNamen
     *
     * @param [aObjectName] - einmaliger  Instanzen-Name des zu erzeugenden Objektes
     * @param [aObjectClass] - Klassen-Name des zu erzeugenden Objektes
     * @param [aRegisterFlag] - true, wenn Objekt global in einen Manager eingetragen werden soll
     *
     * @return {any} - Objekt Instanz oder null
     */

    create( aObjectName?: string, aObjectClass?: string, aRegisterFlag?: boolean ): any;

}
