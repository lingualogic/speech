/** @packageDocumentation
 * Assistant Confirm Map for Intents
 *
 * Last Change: 01.09.2020
 * Quality Status: red
 *
 * @module speech/assistant
 * @author SB
 */


// Mapping between Assistant-Intents and Navigation-Route Names

export const AGENT_INTENTCONFIRM_MAP = {
    CommunicationCategoryIntent: 'Wollen sie die Kategorie Kommunikation öffnen?',
    EmailAppIntent: 'Wollen Sie die E-Mail Anwendung öffnen?',
    EmailNewIntent: 'Wollen Sie die E-Mail Anwendung öffnen?',
    // TODO: calls up page without checking for authentication
    // EmailNewIntent: 'Wollen Sie eine E-Mail schreiben?',
    ContactAppIntent: 'Wollen Sie die Kontakte Anwendung öffnen?',
    ContactNewIntent: 'Wollen Sie die Kontakte Anwendung öffnen?',
    // TODO: calls up page without checking for authentication
    // ContactNewIntent: 'Wollen Sie einen Kontakt anlegen?',
    EntertainmentCategoryIntent: 'Wollen Sie die Kategorie Unterhaltung öffnen?',
    HealthCategoryIntent: 'Wollen Sie die Kategorie Gesundheit öffnen?',
    BerlinNewspaperAppIntent: 'Wollen sie die Berliner Zeitung Anwendung öffnen?',
    ClassicRadioAppIntent: 'Wollen Sie die Klassik Radio Anwendung öffnen?',
    GamesCategoryIntent: 'Wollen Sie die Spiele Anwendung öffnen?',
    PodcastAppIntent: 'Wollen Sie die Podcast Anwendung öffnen?',
    YoutubeAppIntent: 'Wollen Sie die Youtube Anwendung öffnen?',
    YoutubeNewsIntent: 'Wollen Sie Youtube Nachrichten öffnen?',
    YoutubeCultureIntent: 'Wollen Sie Youtube Kultur öffnen?',
    YoutubeCinemaIntent: 'Wollen Sie Youtube Kino öffnen?',
    YoutubeCookingIntent: 'Wollen Sie Youtube Kochen und Backen öffnen?',
    YoutubeTagesschauIntent: 'Wollen Sie Youtube Tagesschau öffnen?',
    YoutubeHeuteIntent: 'Wollen Sie Youtube Heute-Sendung öffnen?',
    SearchCategoryIntent: 'Wollen Sie im Internet suchen?',
    BookmarkCategoryIntent: 'Wollen Sie die Kategorie Nützliches öffnen?',
    PharmacyAppIntent: 'Wollen Sie die Apotheken Anwendung öffnen?',
    PharmacyLocationIntent: `Wollen Sie die Apotheken Anwendung öffnen?`,
    PharmacyMagazineIntent: `Wollen Sie die Apotheken Anwendung öffnen?`,
    PharmacyMedicationIntent: `Wollen Sie die Apotheken Anwendung öffnen?`,
    BookmarkAppIntent: 'Wollen sie die Hilfreiches im Netz Anwendung öffnen?',
    DictionaryAppIntent: 'Wollen Sie die Internetlexikon Anwendung öffnen?',
    OnlineBankingCategoryIntent: 'Wollen Sie die Online-Banking Anwendung öffnen?',
    SettingCategoryIntent: 'Wollen Sie die Mein-Nepos Kategorie öffnen?',
    ShoppingCategoryIntent: 'Wollen sie die Einkaufen Anwendung öffnen?',
    SueddeutscheNewspaperAppIntent: 'Wollen Sie die Süddeutsche Zeitung Anwendung öffnen?',
    VideocallAppIntent: 'Wollen sie die Videocall Anwendung öffnen?',
    WikipediaAppIntent: 'Wollen sie die Wikipedia Anwendung öffnen?',
    ArdMediaAppIntent: 'Wollen sie die ARD Mediathek öffnen?',
    ZdfMediaAppIntent: 'Wollen sie die ZDF Mediathek öffnen?',
    BrainTrainerAppIntent: 'Wollen sie den Gedächtnistrainer öffnen?',
    CoronaInfoAppIntent: 'Wollen sie die Corona Infos öffnen?',
    EventsAppIntent: 'Wollen sie die Veranstaltungen öffnen?',
    RecipesAppIntent: 'Wollen sie die Rezepte öffnen?'
};
