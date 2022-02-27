# Service

Jeder Speech Service ist gleichartig aufgebaut und beinhaltet die gleiche geerbte Grundfunktionalität von Service, die hier kurz beschrieben wird.

## Architektur

In der folgenden Grafik wird der Service als abstrakte Klasse dargestellt. Die anderen Services erben diese Basisfunktionalität.


![Service-Architektur](Service-1.gif)


Service verbindet sich mit dem ServiceManager und bindet die Schnittstelle der Base-Komponente aus Speech-Framework ein, wie in der nächsten Grafik dargestellt. ServiceManager ist das oberste Objekt zur Verwaltung von Services und BaseInterface definiert die abstrakte Basisschnittstelle aller exportierbaren Komponenten von Speech.


![Service-Struktur](Service-2.gif)


## API

Jeder Speech Service besitzt die gleiche Schnittstelle für die hier vorgestellte Grundfunktionalität. Die folgende Grafik zeigt einen Überblick über die gesamte API jedes Speech Services. Die API teilt sich auf in statische Klassenfunktionen, Objektfunktionen, Objektereignisse und Objekteigenschaften. Die API verfügt über eine auf Funktionen und eine auf Eigenschaften basierende Schnittstelle. Die gleiche Aufgabe kann über Funktionsaufrufe oder über das Setzen von Eigenschaften erledigt werden.


![Service-API](Service-3.gif)


Die statischen Klassenfunktionen dienen der Konfiguration eines Services vor seiner Erzeugung, sowie der Festlegung, ob die init()-Funktion im Konstruktor des Services bereits aufgerufen wird oder nicht. Dazu werden die Klassenfunktionen mit dem Klassennamen des Services aufgerufen, wie z.B. die Rückgabe der Konfiguration mit service.getConfig().
Die Objektereignisse geben EventEmitter zurück, diese sollten mit subscribe aufgerufen werden und die Rückgabe sollte in einer Variablen für den Aufruf von unsubscribe gespeichert werden:

	// Setzen einer Ereignisfunktion mit subscribe
	const errorEvent = this.service.errorEvent.subscribe( aError => console.log('Fehlerausgabe:', aError.message));
	...
	// Freigabe der Ereignisfunktion mit unsubscribe
	errorEvent.unsubscribe();


## Importieren

Um einen Service importieren zu können, muss in der jeweiligen Komponente folgende Zeile eingefügt werden:

	import { SpeakService } from '@lingualogic-speech/speak';
	
Dazu müssen die Speech NPM-Pakete in der gleichen Version vorher ins eigene WebApp-Projekt kopiert und installiert worden sein.

	$ npm install --save lingualogic-speech-*-<version>.tgz

Alternativ können die Speech NPM-Pakete auch aus dem NPM-Repository geladen werden:

	$ npm install @lingualogic-speech/*
	 

## Konfiguration

Dier erste Aufgabe vor Nutzung eines Services besteht in der Festlegung der Konfiguration vor der Erzeugung des Services. In der Defaulteinstellung wird die init()-Funktion im Konstruktor aufgerufen und die voreingestellte Konfiguration übernommen. Will man die Defaultkonfiguration überschreiben, holt man sie sich mittels der Klassenfunktion service.getConfig(). Diese Funktion gibt das ServiceConfig-Objekt eines Services zurück. 

Grundelemente jeder Service-Konfiguration:

	// hier sind die Defaultwerte des SpeakService festgelegt	
	export const SpeakServiceConfig: ISpeakServiceOption = {
	    /** ein/ausschalten des Service */
	    activeFlag: true,
	    
	    // hier kommen die servicespezifischen Konfigurationsparameter hin
	    
	    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
	    errorOutputFlag: false
	};


Die Konfiguration kann man beispielsweise in Angular nur in der obersten app.module.ts vornehmen, da sie vor der Erzeugung jedes Speech Services stattfinden muss.

Auszug aus der Angular-Datei: src/app/app.module.ts:

	// Angular
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	
	import { AppComponent } from './app.component';
	
	// SpeakService von Speech
	
	import { SpeakService } from '@lingualogic-speech/speak';
	
	
	@NgModule({
	  declarations: [
	    AppComponent
	  ],
	  imports: [
	    BrowserModule
	  ],
	  providers: [SpeakService],
	  bootstrap: [AppComponent]
	})
	export class AppModule {
		
		// nur hier kann die SpeakService-Konfiguration geaendert werden
		constructor() {
			// SpeakService-Konfiguration holen
			const serviceConfig = SpeakService.getConfig();
			// hier kann man alle Konfigurationswerte aendern, diese werden bei der Initialsierung uebernommen
			// es muessen nur die von den Defaultwerten abweichenden Werte eingetragen werden
			serviceConfig.activeFlag = false;
			
			// hier kommen die servicespezifischen Konfigurationsparameter hin
						
			serviceConfig.errorOutputFlag = true;
		}
	
	}

Soll die init()-Funktion manuell nach der Erzeugung des Service aufgerufen werden, so muss im Angular AppModule-Konstruktor die Klassenfunktion Service.setConstructorInitOff() aufgerufen werden. Damit schaltet man den Aufruf von init() im Service-Konstruktor aus.

Auszug aus der Angular-Datei: src/app/app.module.ts:

	... 
	export class AppModule {
		
		// nur hier kann die SpeakService-Konfiguration geaendert werden, da der Konstruktor von SpeakService
		// noch nicht aufgerufen worden ist
		constructor() {
			SpeakService.setConstructorInitOff();
		}
	
	}

Die init()-Funktion kann man dann zu einem beliebig späteren Zeitpunkt z.B. in der AppComponent mit eigenen optionalen Parametern aufrufen.

Auszug aus der Angular-Datei: src/app/app.component.ts:

	// angular
	
	import { Component, OnInit } from '@angular/core';
	
	// speech
	
	import { ServiceManager, SERVICE_SPEAK_NAME } from '@lingualogic-speech/service';
	import { ISpeakService, SpeakService } from '@lingualogic-speech/speak';
	
	// App-Komponente
	
	@Component({
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	
	  title = 'Speech-Angular-App';
	  private service: ISpeakService = null;
	
	  constructor() {
		  // Speak-Service mit optionalen Parametern erzeugen
		  this.service = ServiceManager.get( SERVICE_SPEAK_NAME, SpeakService, { errorOutputFlag: true });
	  }
	
	}


## Service ein/ausschalten

Jeder Speech-Angular Service kann aktiviert und deaktiviert werden. Zu Beginn ist er defaultmäßig immer aktiviert, es sei denn, man hat in der Konfiguration das activeFlag auf false gesetzt, oder die zugrunde liegende Funktionalität des Speech-Frameworks steht nicht zur Verfügung. Für das Setzen auf aktiv ein/aus kann man die Funtionen service.setActiveOn() und service.setActiveOff() benutzen, oder man setzt die Eigenschaft service.active auf true oder false. Ist der Service aktiv, werden alle Funktionen des Service ausgeführt, ist der Service deaktiviert, werden global keine seiner Funktionen ausgeführt. Prüfen kann man den Aktivzustand über service.isActive()-Funktion oder man liest die Eigenschaft service.active aus. 

	// Service einschalten per Funktion
	service.setActiveOn();
	// oder per Eigenschaft
	service.active = true;
	
	// Service ausschalten per Funktion
	service.setActiveOff();
	// oder per Eigenschaft
	service.active = false;
	
	// Abfrage auf aktiv per Funktion
	if ( service.isActive()) { ... }
	// oder per Eigenschaft
	if ( service.active ) { ... }
		

## Fehlerausgabe auf die Entwicklerkonsole

Bei der Integration eines Speech Services ist es mitunter sinnvoll, seine Fehlerausgaben auf die Entwicklerkonsole sofort auszugeben, um die Ursache eines Problems schneller finden zu können. Dazu kann die Fehlerausgabe auf die Konsole ein- und ausgeschaltet werden. Mit den Funktionen service.setErrorOutputOn() und service.setErrorOutputOff() kann man die Fehlerausgabe ein- und ausschalten. Mit der service.isErrorOutput()-Funktion kann man den Zustand für die Fehlerausgabe abfragen. Für das Setzen der Fehlerausgabe gibt es die Eigenschaft service.errorOutput, in die man true oder false eintrqagen kann, die man aber auch auslesen kann. Das errorOutputFlag kann auch in der Konfiguration gesetzt werden.  

	// Fehlerausgabe einschalten per Funktion
	this.service.setErrorOutputOn();
	// oder per Eigenschaft
	this.service.errorOutput = true;
	
	// Fehlerausgabe ausschalten per Funktion
	this.service.setErrorOutputOff();
	// oder per Eigenschaft
	this.service.errorOutput = false;
	
	// Abfrage auf aktiv per Funktion
	if ( this.service.isErrorOutput()) { ... }
	// oder per Eigenschaft
	if ( this.service.errorOutput ) { ... }


## Service initialisieren

Es kann jederzeit die service.init()-Funktion aufgerufen werden, wobei nur die übergebenen optionalen Parameter neu gesetzt werden. Will man den Service komplett auf seine Defaultkonfiguration zurücksetzen sollte man service.reset() verwenden. Ruft man service.init() ohne optionale Parameter auf, hat dies keinen Effekt.


## Service zurücksetzen

Der Service kann mit der service.reset()-Funktion auf seine Defaultkonfiguration und Einstellungen zurückgesetzt werden. 
Auch hier können optionale Parameter mitübergeben werden, die dann gesetzt werden.


## Service Fehlerereignis

Jeder Speech Service besitzt ein errorEvent, den man mit einer eigenen Fehlerfunktion belegen kann, um Fehler zu erhalten und behandeln zu können. Weitere Ereignisse werden spervicespezifisch definiert.


## Service starten und stoppen

Jeder Speech Service wird mit service.start() ausgeführt und mit service.stop() wieder beendet. Optional können vorher Eigenschaften des Services gesetzt werden, die er zu seiner Ausführung benötigt. 

Beispiel-Komponente für die Integration eines Speech Services in Angular:

	// angular
	
	import { Component, OnInit, OnDestroy } from '@angular/core';

	// speech
		
	import { ServiceManager, SPEECH_SPEAK_SERVICE } from '@lingualogic-speech/service';
	import { ISpeakService, SpeakService } from '@lingualogic-speech/speak';

	
	@Component({
		selector: 'app-speak',
		templateUrl: './speak.component.html',
		styleUrls: ['./speak.component.css']
	})
	export class SpeakComponent implements OnInit, OnDestroy {
	
		errorEvent = null;
		private service: ISpeakService = null;
	
		constructor() {
			this.service = ServiceManager.get( SERVICE_SPEAK_NAME, SpeakService );
		}
		
		// Fehlerereignis eintragen
				
		ngOnInit() {
			this.errorEvent = this.service.errorEvent.subscribe(aError => console.log('Fehler:', aError.message));
		}

		// Fehlerereignis freigeben
		
		ngOnDestroy() {
			this.errorEvent.unsubscribe();
		}

		// eigene Funktionen zur Einbindung des Speech-Angular Services in einer eigenen Angular-Komponente

		startService() {
			this.service.start();
		}
		
		stopService() {
			this.service.stop();
		}

	}
