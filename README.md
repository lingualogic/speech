# Speech Monorepo

Das Speech Monorepo ist eine Typescript Browser-Bibliothek zur Integration von Sprachdiensten, wie Sprachausgabe (TTS), Spracherkennung (ASR), Sprachverstehen (NLU), Dialogverarbeitung (NLP) und Aktionsausführung in eine Web-Site oder WebApp. Kern von Speech ist ein **Bot**, der Dialoge eines Dialogskripts ausführen kann.

Daneben git es einzeln verwendbare Dienste:

* **Speak** für die Sprachausgabe (Html5 SpeechSynthesis, Nuance-TTS, Amazon-TTS, Microsoft-TTS)
* **Listen** für die Spracherennung (Html5 SpeechRecognition, Nuance-ASR, Microsoft-ASR)
* **Intent** für das Sprachverstehen (Nuance-NLU, Google-NLU)
* **Action** für die Aktionserzeugung
* **Dialog** für die Ausführung von Dialogskripten

In Speech kann für die Sprachausgabe (TTS), die Spracheingabe (ASR) und das Sprachverstehen (NLU) auch ein Cloud-Dienst verwendet werden. Dazu wird ein eigener Account des Cloud-Dienstes benötigt. Es gibt den Amazon Cloud-Dienst für die Sprachausgabe (TTS), den Microsoft Cloud-Dienst für die Sprachausgabe (TTS) und die Speacheingabe (ASR), sowie den Google Cloud-Dienst für Sprachausgabe(TTS), Spracheingabe( ASR) und Sprachverstehen (NLU). Hinzugekommen ist der Rasa-Server als selbst zu betreibenden Cloud-Dienst für das Sprachverstehen (NLU).
Für die Google Cloud-Dienste wird zusätzlich der Speech-Tokenserver benötigt.


## Letzte Version

* 0.6.0.0001 Alpha vom 18.03.2021 [Release Notizen](./CHANGELOG.md)


## Voraussetzungen

Wir haben Speech auf Mac OS X 10.14, Win 10 und Ubuntu 20.04 getestet. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.14
* Windows 10
* aktuelles Linux (z.B. Ubuntu 20.04)

Grundsätzlich ist Speech in Chrome, Firefox, Opera, Safari und Edge nutzbar, allerdings hängt die Sprachausgabe unter diesen Browsern von der zugrunde liegenden Text-to-Speech Engine der jeweiligen Plattformen ab. Die Spracheingabe funktioniert bisher nur in Chrome ohne die Nutzung von Cloud-Diensten. Mit der Einbindung von Cloud-Diensten kann die Spracheingabe und die Sprachausgabe in allen hier aufgeführten Browsern verwendet werden.

* Chrome >= 80   Windows/Linux/MacOS (Html5: TTS, ASR)(Nuance: TTS, ASR, NLU)
* Firefox >= 80  Windows/Linux/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU)
* Opera >= 72    Windows/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU) Linux (kein Html5)
* Safari >= 14   MacOS/iOS (Html5: TTS)(Nuance: ASR, NLU)
* Edge >= 80     Windows (Html5: TTS)(Nuance: TTS, ASR, NLU)

NodeJS muss installiert sein.

* NodeJS >= 12.x und <= 14.x
* NPM 6.x       Zwingend notwendig, NPM 7.x erzeugt Fehler wegen automatische Peer Dependecies Installation

Als weitere Plattformen können Android und iOS mit Cordova verwendet werden:

* Cordova >= 9 für Android ab 5.1 und iOS ab 10

Für Cordova müssen weitere Programme zur Entwicklung von Android- und iOS-Apps installiert werden.


## Installation

Zuerst muss das Speech Github-Repsitory unter [https://github.com/lingualogic/speech](https://github.com/lingualogic/speech) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech
    $ cd speech

danach werden alle NPM-Pakete für Speech mit folgendem Befehl installiert:

    $ npm install

anschließend werden alle NPM-Pakete für Speech im dist Ordner erzeugt und die E2E-Tests ausgeführt:

    $ npm run build


### E2E-Tests

Die E2E-Tests können mit folgenden Befehl separat ausgeführt werden:

    $ npm test

Zusätzlich können in der Datei karma.conf.js der Browser zum Testen gewechselt und SingleRun=false gesetzt werden.
Beim Chrome werden nicht alle Tests durchgeführt, da Audio- und Sprachausgabe gesperrt sind. Man kann die Sperrung durch drücken
in den Browser aufheben und die Tests inklusive Audio- und Sprachausgabe ausführen.

Alle E2E-Tests sind unter test/e2e zu finden.


### API-Dokumentation

Die API-Dokumentation kann mit folgenden Befehl in docs/api erzeugt werden:

    $ npm run docs


Die im dist Ordner erzeugten npm-Pakete können in den eigenen Web-Projektordner kopiert werden.
Die Installation der Speech npm-Pakete erfolgt im eigenen Web-Projektordner mit folgendem Befehl:

    $ npm install speech-*-0.6.0.tgz

Danach können die installierten NPM-Pakete in Web-Projekt mit Javascript oder Typescript verwendet werden. Es sind keine weiteren Bibliotheken einzubinden.

Alternativ können die Speech NPM-Pakete auch über das offizielle globale NPM-Repository installiert werden:

    $ npm install @speech/<Komponentenname>


## Deinstallation

Die Speech NPM-Pakete können mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall @speech/<Komponentenname>


## Dokumentation


[**Architektur**](./docs/design/service/ServiceDesign.md)

[**Services**](./docs/packages/ServiceList.md)

[**Cloud-Dienste**](./docs/packages/CloudList.md)

[**Roadmap**](./docs/roadmap/Roadmap-2021.md)

[**Release Notizen**](./CHANGELOG.md)


## Bekannte Probleme

* die verschiedenen Browser verhalten sich unterschiedlich, so dass nicht in jedem Browser alle Komponenten von Speech wie erwartet funktionieren.


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation:  **Leo Füchsel** (leo@lingualogic.de)

Technische Umsetzung: **Stefan Brauer** (stefan@lingualogic.de)


## Mitwirkende


## In Projekten verwendet


## Danksagung

Wir haben das Entstehen und die Entwicklung des Projektes vielen Personen zu danken, vor allem dem gesamten Team der [Nepos GmbH](https://nepos.de).

-------------------

## Lizenz

Das Speech Monorepo wurde als Open Source unter der [MIT-Lizenz](./docs/LICENSE.md) veröffentlicht.
