/** @packageDocumentation
 * Service-List for store services singletons
 *
 * Last Change: 19.10.2020
 * Status: red
 *
 * @module service
 * @author SB
 */


export class ServiceList {

    mServiceList = new Map<string, any>();
    mServiceIterator: IterableIterator<any>;

    /**
     * Erzeuge eine Instanz
     */

    constructor() {
        this.mServiceIterator = this.mServiceList.values();
    }

    /**
     * Rueckgabe der Anzahl vorhandener Services
     *
     * @return {number} size - Anzahl der Services in der Liste
     */

    getSize(): number {
        return this.mServiceList.size;
    }

    /**
     * Eintragen eines Services
     *
     * @param {string} aServiceName - Name des Service
     * @param {BaseService} aService - Service Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aServiceName: string, aService: any ): number {
        try {
            if ( !aServiceName ) {
                // tslint:disable-next-line: no-console
                console.log( 'ServiceList.insert: kein Servicename uebergeben' );
                return -1;
            }
            if ( !aService ) {
                // tslint:disable-next-line: no-console
                console.log( 'ServiceList.insert: kein Service uebergeben' );
                return -1;
            }
            if ( this.mServiceList.has( aServiceName )) {
                // tslint:disable-next-line: no-console prefer-template
                console.log( 'ServiceList.insert: Service existiert bereits ' + aServiceName );
                return -1;
            }
            this.mServiceList.set( aServiceName, aService );
            return 0;
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceList.insert: Exception ', aException );
            return -1;
        }
    }

    /**
     * Zurueckgeben eines Services
     *
     * @param {string} aServiceName - Name des Services
     * @returns {BaseService} - Service Instanz oder null
     */

    find( aServiceName: string ): any {
        try {
            return this.mServiceList.get( aServiceName );
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceList.find: Exception ', aException );
            return undefined;
        }
    }

    /**
     * erstes Service der Liste zurueckgeben
     *
     * @return {BaseService} - Service Instanz oder undefined
     */

    first(): any {
        try {
            this.mServiceIterator = this.mServiceList.values();
            return this.mServiceIterator.next().value;
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceList.first: Exception ', aException );
            return undefined;
        }

    }

    /**
     * naechstes Service der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {BaseService} - Service Instanz oder undefined
     */

    next(): any {
        try {
            return this.mServiceIterator.next().value;
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceList.next: Exception ', aException );
            return undefined;
        }
    }

    /**
     * Rueckgabe aller vorhandenen Service-Namen
     *
     * @return {Array<string>} Rueckgabe aller Service-Namen als Liste
     */

    getNameList(): string[] {
        return Array.from( this.mServiceList.keys());
    }

    /**
     * Entfernen eines Services aus der Liste
     *
     * @param {string} aServiceName - Name des Services
     * @return {number} errorCode(0,-1)
     */

    remove( aServiceName: string ): number {
        try {
            this.mServiceList.delete( aServiceName );
            return 0;
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceList.remove: Exception ', aException );
            return -1;
        }
    }

    /**
     * Loeschen aller Services aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mServiceList.clear();
            return 0;
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceList.clear: Exception ', aException );
            return -1;
        }
    }

}
