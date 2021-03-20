# IntentService

Der IntentService dient zur Sprachanalyse von Texten zur Erzeugung eines Intents. Für die Sprachanalyse wird die NLU der Cloud-Dienste von Google und Microsoft verwendet. Mit Rasa kann ein eigener Cloud-Dienst für eine NLU eingebunden werden. Der gesamte Code läuft komplett im Browser und verbindet sich mit dem jeweiligen Cloud-Dienst. Der intentService erbt vom abstrakten [Service](./../service/Service.md).


## Architektur

In der folgenden Grafik werden die einzelnen Schichten, angefangen von der WebApp, über den IntentService und die verschiedenen Cloud-Module von Speech, die Intent-Komponente, die Plugins für die NLU (Natural Language Understanding), sowie die verschiedenen Cloud-Komponenten in Speech, bis hinunter zum jeweiligen Cloud-Dienst, dargestellt.


![IntentService-Architektur](IntentService-1.gif)


Ganz oben sind die für den IntentService notwendigen Credentials dargestellt, die der WebApp übergeben werden müssen. Eine Anleitung für die Erstellung der Credentials und die Einbindung der Cloud-Module in die WebApp zur Aktivierung des jeweiligen Cloud-Service findet man unter [docs/packages/CloudList.md](./../CloudList.md)

Die nächste Grafik zeigt die konkrete Vererbungsbeziehung zu Service, sowie die Einbindung von IntentFactory und IntentInterface aus Speech. IntentFactory ist eine statische Klasse und erzeugt das Intent-Objekt zum IntentInterface. Auf der linken Seite sind die Cloud-Module dargestellt, welche als statische Klassen implementiert sind und das jeweilige Cloud-Singleton aus Speech einbinden.
Damit die Cloud-Dienste funktionieren, müssen die jeweiligen Credentials vom Cloud-Module an das Cloud-Singleton (Google, Microsoft oder Rasa) weitergereicht werden. 


![IntentService-Struktur](IntentService-2.gif)


## API

Der IntentService definiert die öffentliche Schnittstelle von Speech für die Sprachanalyse. Die folgende Grafik zeigt einen Überblick über die gesamte API des IntentServices. Die API teilt sich auf in Objektfunktionen, Objektereignisse und Objekteigenschaften. Die API verfügt über eine auf Funktionen und eine auf Eigenschaften basierende Schnittstelle. Die gleiche Aufgabe kann über Funktionsaufrufe oder über das Setzen von Eigenschaften erledigt werden. Z.B. kann die Sprache entweder mit intentService.setLanguage('de') oder mit intentService.language = 'de' eingetragen werden, bevor mit intentService.start() die Sprachanalyse gestartet wird.

![IntentService-API](IntentService-3.gif)


## Importieren

Um den IntentService importieren zu können, muss in der jeweiligen Komponente folgende Zeile eingefügt werden:

	import { IntentService } from '@speech/intent';
	
Dazu müssen die Speech NPM-Pakete in der gleichen Version vorher ins eigene WebApp-Projekt kopiert und installiert worden sein.

	$ npm install speech-*-<version>.tgz

Alternativ kann man Speech aus dem globalen NPM-Repository installieren. 

	$ npm install @speech/*
		 

## Konfiguration

Dier erste Aufgabe vor Nutzung des IntentService besteht in der Festlegung der Konfiguration vor der Erzeugung des Services. In der Defaulteinstellung wird die init()-Funktion im Konstruktor aufgerufen und die voreingestellte Konfiguration übernommen. Will man die Defaultkonfiguration überschreiben, holt man sie sich mittels der Klassenfunktion IntentService.getConfig(). Diese Funktion gibt das IntentConfig-Objekt des IntentServices zurück. 

Auszug aus der Datei: packages/intent/src/intent-service-config.ts:

	// hier sind die Defaultwerte des IntentService festgelegt	
	export const IntentServiceConfig: IntentServiceOptionInterface = {
	    /** ein/ausschalten der Intent-Komponente */
	    activeFlag: true,
	    /** setzt die Sprache fuer die Sprachanalyse ( 'de', 'en' )*/
	    intentLanguage: 'de',
	    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
	    errorOutputFlag: false
	};


## Sprachanalyse

Um Sprache zu analysieren, muss zuerst die Sprache festgelegt werden. Hier hat man die Wahl zwischen den Funktionen zum Eintragen der Werte, oder den Eigenschaften. Die Sprache kann auch in der Konfiguration mit dem Parameter intentLanguage eingetragen werden. Es gibt zwei Konstanten für die Sprache Deutsch ('de') und Englisch ('en'), die immer verwendet werden sollten, wenn man die Sprache eintragen will. Neben der Sprache muss auch der Text für die Sprachanaylse übergeben werden. Dies kann man entweder mit der Übergabe des Textes an die intentService.setText() Funktion oder mit der Zuweisung an intentService.text machen. Hat man diese Werte eingetragen kann man die Sprachanalyse mit intentService.start() beginnen und mit intentService.stop() abbrechen. Nach dem Start der Sprachanalyse erhält man das Ereignis resultEvent und die Sprachanalyse wird automatisch beendet. Das Ereignis resultEvent erhält die Intention und die Confidence für den übergebenen Text. Falls ein Fehler auftritt, erhält man das Ereignis errorEvent.

Angular Beispiel-Komponente für die Integration von Sprache:

	// Angular 
	
	import { Component, OnInit, OnDestroy } from '@angular/core';

	// IntentService 
		
	import { IntentService, INTENT_DE_LANGUAGE, INTENT_EN_LANGUAGE } from '@speech/intent';

	
	@Component({
		selector: 'app-listen',
		templateUrl: './intent.component.html',
		styleUrls: ['./intent.component.css']
	})
	export class IntentComponent implements OnInit, OnDestroy {
	
		intentResultEvent = null;
		intentErrorEvent = null;
		
		intentService: IntentService;
	
		constructor() {
			this.intentService = new IntentService();
		}
		
		// Intent-Ereignisse eintragen
				
		ngOnInit() {
			this.intentService.init();
			this.intentResultEvent = this.intentService.resultEvent.subscribe(aResultIntent => console.log('Sprachanalyse Intent:', aResultIntent.intent, aResultIntent.confidence));
			this.listenErrorEvent = this.intentService.errorEvent.subscribe(aError => console.log('Sprachanalyse Fehler:', aError.message));
		}

		// Intent-Ereignisse freigeben
		
		ngOnDestroy() {
			this.intentResultEvent.unsubscribe();
			this.intentErrorEvent.unsubscribe();
		}

		// eigene Funktionen fuer die Sprachanalyse in einer eigenen Angular-Komponente

		intentGerman( aText: string ): void {
			this.intentService.text = aText;
			this.intentService.language = INTENT_DE_LANGUAGE;
			this.intentService.start();
		}
		
		intentEnglish( aText: string ): void {
			this.intentService.text = aText;
			this.intentService.language = INTENT_EN_LANGUAGE;
			this.intentService.start();
		}	

		intentStop() {
			this.intentService.stop();
		}

	}

