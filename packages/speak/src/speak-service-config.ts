/** @packageDocumentation
 * SpeakService Konfiguration, wird in SpeakService im Konstruktor verwendet.
 * Werte koennen hier ueberschrieben werden.
 *
 * API-Version: 2.0
 * Datum:       28.06.2021
 *
 * @module speak
 * @author SB
 */


// speak

import { ISpeakOption } from './speak-option.interface';


/** @export
 * SpeakService Konfiguration, um Speak anzupassen
 */

export const SpeakServiceConfig: ISpeakOption = {
    /** ein/ausschalten der Speak-Komponente */
    activeFlag: true,
    /** setzt die Sprache fuer die Sprachausgabe ( 'de', 'en' )*/
    speakLanguage: 'de',
    /** Audioformat 'mp3' oder 'wav' */
    audioFormat: 'mp3',
    /** lokales Verzeichnis, in dem die Audiodateien liegen, z.B. 'assets/speech/audio/', unbedingt mit '/' am Ende abschliessen! */
    audioFilePath: 'assets/',
    /** True, wenn Audiodateien abgespielt werden sollen, anstelle der Sprachsynthese */
    audioFlag: false,
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag: false
};

