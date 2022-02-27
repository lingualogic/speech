# ListenService

Der ListenService dient zur Spracherkennung von Texten. Für die Spracherkennung wird standardmäßig HTML5 SpeechRecognition Web-API verwendet. Alternativ können auch die Cloud-Services von Google und Microsoft verwendet werden. Der ListenService erbt vom abstrakten [Service](./../service/Service.md).



## Architektur

In der folgenden Grafik werden die einzelnen Schichten, angefangen von der WebApp, über den ListenService, die Listen-Komponente in Speech, das Plugin für ASR (Speech-to-Text), bis hinunter zur Standardschnittstelle des Browsers für SpeechRecognition und den Cloud-Servern von Google und Microsoft, dargestellt. 


![ListenService-Architektur](ListenService-1.gif)


Die nächste Grafik zeigt die konkrete Vererbungsbeziehung zu Service, sowie die Einbindung von ListenFactory und ListenInterface aus Speech. ListenFactory ist eine statische Klasse und erzeugt das Listen-Objekt zum ListenInterface. Auf der linken Seite sind das GoogleModule und das MicrosoftModule dargestellt, welche als statische Klassen implementiert sind und die jeweiligen Cloud-Singletons aus Speech einbinden.
Damit die Cloud-Dienste funktioniern, müssen die Credentials vom jeweiligen Cloud-Module an das Cloud-Singleton weitergereicht werden. 


![ListenService-Struktur](ListenService-2.gif)


## API

Der ListenService definiert die öffentliche Schnittstelle von Speech für die Spracheingabe. Die folgende Grafik zeigt einen Überblick über die gesamte API des ListenServices. Die API teilt sich auf in statische Klassenfunktionen, Objektfunktionen, Objektereignisse und Objekteigenschaften. Die API verfügt über eine auf Funktionen und eine auf Eigenschaften basierende Schnittstelle. Die gleiche Aufgabe kann über Funktionsaufrufe oder über das Setzen von Eigenschaften erledigt werden. Z.B. kann die Sprache entweder mit listenService.setLanguage('de') oder mit listenService.language = 'de' eingetragen werden, bevor mit listenService.start() die Spracheingabe gestartet wird. 

!!! Achtung, Diktiermodus erst später verfügbar !!!

Der Modus bestimmt, ob Listen im Command-Modus oder im Diktier-Modus verwendet wird. Im Command-Modus wird nur ein einziger kurzer Satz erfasst, während im Diktier-Modus die ASR solange Sprache in Text übersetzt, bis Listen gestoppt wird. Dabei werden auch einige Interpunktionszeichen beachtet. Der Diktiermodus funtioniert zur Zeit nur mit der HTML5-ASR und kann nur im Chrome-Browser verwendet werden.


![ListenService-API](ListenService-3.gif)


## Importieren

Um den ListenService importieren zu können, muss in der jeweiligen Komponente folgende Zeile eingefügt werden:

	import { ListenService } from '@lingualogic-speech/listen';
	
Dazu müssen die Speech NPM-Paket in der gleichen Version vorher ins eigene WebApp-Projekt kopiert und installiert worden sein.

	$ npm install lingualogic-speech-*-<version>.tgz
	 
Alternativ kann man Speech aus dem globalen NPM-Repository installieren.

	$ npm install @lingualogic-speech/*
	
	
## Konfiguration

Dier erste Aufgabe vor Nutzung des ListenService besteht in der Festlegung der Konfiguration vor der Erzeugung des Services. In der Defaulteinstellung wird die init()-Funktion im Konstruktor aufgerufen und die voreingestellte Konfiguration übernommen. Will man die Defaultkonfiguration überschreiben, holt man sie sich mittels der Klassenfunktion ListenService.getConfig(). Diese Funktion gibt das ListenConfig-Objekt des ListenServices zurück. 

Auszug aus der Datei: packages/listen/src/listen-service-config.ts:

	// hier sind die Defaultwerte des ListenService festgelegt	
	export const ListenServiceConfig: IListenServiceOption = {
	    /** ein/ausschalten der Listen-Komponente */
	    activeFlag: true,
	    /** setzt die Sprache fuer die Sprachausgabe ( 'de', 'en' )*/
	    listenLanguage: 'de',
	    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
	    errorOutputFlag: false
	};


## Spracheingabe

Um Sprache zu erfassen, muss zuerst die Sprache festgelegt werden. Hier hat man die Wahl zwischen den Funktionen zum Eintragen der Werte, oder den Eigenschaften. Die Sprache kann auch in der Konfiguration mit dem Parameter listenLanguage eingetragen werden. Es gibt zwei Konstanten für die Sprache Deutsch ('de') und Englisch ('en'), die immer verwendet werden sollten, wenn man die Sprache eintragen will. Hat man diese Werte eingetragen kann man die Spracheingabe mit listenService.start() beginnen und mit listenService.stop() wieder beenden. Der ListenService ist so eingestellt, das die Spracherfassung automatisch beendet wird, wenn nicht mehr gesprochen wird. Nach dem Start der Spracheingabe erhält man das Ereignis startEvent und nach dem Ende der Spracheingabe das Ereignis stopEvent. Falls ein Fehler auftritt, erhält man das Ereignis errorEvent. Das Ergebnis der Spracheingabe erhält man über das Ereignis resultEvent, bei dem der erkannte Text mit übergeben wird.

Angular Beispiel-Komponente für die Integration von Sprache:

	// Angular
	
	import { Component, OnInit, OnDestroy } from '@angular/core';

	// ListenService 
		
	import { ListenService, LISTEN_DE_LANGUAGE, LISTEN_EN_LANGUAGE } from '@lingualogic-speech/listen';

	
	@Component({
		selector: 'app-listen',
		templateUrl: './listen.component.html',
		styleUrls: ['./listen.component.css']
	})
	export class ListenComponent implements OnInit, OnDestroy {
	
		listenStartEvent = null;
		listenStopEvent = null;
		listenResultEvent = null;
		listenErrorEvent = null;
	
		listenService: ListenService;
		
		
		constructor() {
			this.listenService = new ListenService();
		}
		
		// Listen-Ereignisse eintragen
				
		ngOnInit() {
			this.listenService.init();
			this.listenStartEvent = this.listenService.startEvent.subscribe(() => console.log('Sprachausgabe gestartet'));
			this.listenStopEvent = this.listenService.stopEvent.subscribe(() => console.log('Sprachausgabe beendet'));
			this.listenResultEvent = this.listenService.resultEvent.subscribe(aResultText => console.log('Spracheingabe Ergebnistext:', aResultText));
			this.listenErrorEvent = this.listenService.errorEvent.subscribe(aError => console.log('Spracheingabe Fehler:', aError.message));
		}

		// Listen-Ereignisse freigeben
		
		ngOnDestroy() {
			this.listenStartEvent.unsubscribe();
			this.listenStopEvent.unsubscribe();
			this.listenResultEvent.unsubscribe();
			this.listenErrorEvent.unsubscribe();
		}

		// eigene Funktionen fuer die Spracheingabe in einer eigenen Angular-Komponente

		listenGerman() {
			this.listenService.language = LISTEN_DE_LANGUAGE;
			this.listenService.start();
		}
		
		listenEnglish()	{
			this.listenService.language = LISTEN_EN_LANGUAGE;
			this.listenService.start();
		}	

		listenStop() {
			this.listenService.stop();
		}

	}

