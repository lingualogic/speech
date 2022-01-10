/** @packageDocumentation
 * FileBaseReader Schnittstelle
 *
 * Version: 2.0
 * Datum:   12.07.2021
 *
 * @module file/common
 * @author SB
 */


// Events


/**
 * Zu uebergebende Event-Funktion als Callback zur Uebergabe der Daten an den Aufrufer.
 * Muss vor dem Aufruf von read() in onRead eingetragen werden.
 */

export type OnFileBaseReaderReadFunc = (aFileData: any) => void;
export type OnFileBaseErrorFunc = (aErrorText: string) => void;


export interface IFileBaseReader {


    /**
     * Hier wird eine Read-Callback Funktion als Event eingetragen
     */

    onRead: OnFileBaseReaderReadFunc;

    /**
     * Hier wird eine Error-Callback Funktion als Event eingetragen
     */

    onError: OnFileBaseErrorFunc;


    /**
     * Initialisierung
     * 
     * @param aOption 
     */

    init( aOption?: any ): number;


    /**
     * Freibabe
     */

    done(): number;
    
    
    /**
     * pruefen, ob die Initialisierung abgeschlossen ist
     * 
     * @return null oder Promise
     */

    initWait(): Promise<any>;


    /**
     * Laufzeit-Typ abfragen: node oder browser
     */

    getRuntimeType(): string;


    setErrorOutput( aOutputFlag: boolean): void ;

    
    /**
     * Hier wird eine Date eingelesen und ueber die onRead-Funktion die Daten als String zurueckgegeben
     *
     * @param aFileUrl - Pfad und Name der einzulesenden Datei
     *
     * @return {number} Fehlercode 0 oder -1
     */

    read( aFileUrl: string, aResponseType?: string ): number;
}
