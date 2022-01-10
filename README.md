# Speech Monorepo

Das Speech Monorepo ist eine Typescript Browser-Bibliothek zur Integration von Sprachdiensten, wie Sprachausgabe (TTS), Spracherkennung (ASR), Sprachverstehen (NLU), Dialogverarbeitung (NLP) und Aktionsausführung in eine Web-Site oder WebApp. Kern von Speech ist ein **Bot**, der Dialoge eines Dialogskripts ausführen kann.

Daneben git es einzeln verwendbare Dienste:

* **Speak** für die Sprachausgabe (Html5 SpeechSynthesis, Amazon-TTS, Google-TTS, Microsoft-TTS )
* **Listen** für die Spracherennung (Html5 SpeechRecognition, Google-ASR, Microsoft-ASR)
* **Intent** für das Sprachverstehen (Google-NLU, Rasa-NLU) (noch nicht in dieser Version verfügbar)
* **Action** für die Aktionserzeugung (noch nicht in dieser Version verfügbar)
* **Dialog** für die Ausführung von Dialogskripten (noch nicht in dieser Version verfügbar)

In Speech kann für die Sprachausgabe (TTS), die Spracheingabe (ASR) und das Sprachverstehen (NLU) auch ein Cloud-Dienst verwendet werden. Dazu wird ein eigener Account des Cloud-Dienstes benötigt. Es gibt den Amazon Cloud-Dienst für die Sprachausgabe (TTS), den Microsoft Cloud-Dienst für die Sprachausgabe (TTS) und die Speacheingabe (ASR), sowie den Google Cloud-Dienst für Sprachausgabe(TTS), Spracheingabe( ASR) und Sprachverstehen (NLU). Hinzugekommen ist der Rasa-Server als selbst zu betreibenden Cloud-Dienst für das Sprachverstehen (NLU). Für die Google Cloud-Dienste wird zusätzlich der Speech-Tokenserver benötigt.

Cloud-Dienste sind in dieser Version noch nicht verfügbar.


## Letzte Version

* 0.6.1.0002 Alpha vom 08.01.2022 [Release Notizen](./CHANGELOG.md)

Diese Version beinhaltet nur Listen und Speak, in späteren 0.6.x Versionen kommen Intent, Action, Dialog und Bot hinzu. Auch die Cloud-Dienste werden erst in späteren Versionen hinzugefügt. 


## Voraussetzungen

Wir haben Speech auf Mac OS X 10.14 - 11.6 getestet, Win 10 und Ubuntu 20.04 folgen später. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.14
* Windows 10 (nicht getestet in dieser Version)
* aktuelles Linux (z.B. Ubuntu 20.04, nicht getestet in dieser Version)

Grundsätzlich ist Speech in Chrome, Firefox, Opera, Safari und Edge nutzbar, allerdings hängt die Sprachausgabe unter diesen Browsern von der zugrunde liegenden Text-to-Speech Engine der jeweiligen Plattformen ab. Die Spracheingabe funktioniert bisher nur in Chrome ohne die Nutzung von Cloud-Diensten. Ab Safari 15 und MacOS Big Sur 11.4 kann die Spracherkennung auch verwendet werden. Mit der Einbindung von Cloud-Diensten (Amazon, Google, Microsoft, Rasa) kann die Spracheingabe und die Sprachausgabe in allen hier aufgeführten Browsern verwendet werden. Weitere Cloud-Dienste werden je nach Bedarf hinzugefügt. Später wird es auch einen eigenen Speech-Server geben, der die Cloud-Dienste bündelt und Audio-Streams vom Browser verarbeiten kann.

* Chrome >= 80   Windows/Linux/MacOS (Html5: TTS, ASR)(Nuance: TTS, ASR, NLU)
* Firefox >= 80  Windows/Linux/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU)
* Opera >= 72    Windows/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU) Linux (kein Html5)
* Safari >= 14   MacOS/iOS (Html5: TTS)(Nuance: ASR, NLU)
* Edge >= 80     Windows (Html5: TTS)(Nuance: TTS, ASR, NLU)

NodeJS muss installiert sein.

* NodeJS >= 14.x und <= 16.x
* NPM >=6.x      

Als weitere Plattformen können Android und iOS mit Cordova verwendet werden:

* Cordova >= 9 für Android ab 5.1 und iOS ab 10.

Für Cordova müssen weitere Programme zur Entwicklung von Android- und iOS-Apps installiert werden.


## Installation

Zuerst muss das Speech Github-Repsitory unter [https://github.com/lingualogic/speech](https://github.com/lingualogic/speech) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech
    $ cd speech

danach werden alle NPM-Pakete für Speech mit folgendem Befehl installiert:

    $ npm install

anschließend werden alle NPM-Pakete für Speech im dist Ordner erzeugt:

    $ npm run build


### Speech NPM-Pakete installieren

Die im dist Ordner erzeugten Speech npm-Pakete können in den eigenen Web-Projektordner kopiert werden.
Die Installation der Speech npm-Pakete erfolgt im eigenen Web-Projektordner mit folgendem Befehl:

    $ npm install speech-<componente>-0.6.x.tgz

Danach können die installierten NPM-Pakete in Web-Projekt mit Javascript oder Typescript verwendet werden. Es sind keine weiteren Bibliotheken einzubinden.

Alternativ können die Speech NPM-Pakete auch über das offizielle globale NPM-Repository installiert werden:

    $ npm install @speech/<Komponentenname>


## Deinstallation

Die Speech NPM-Pakete können mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall @speech/<Komponentenname>


## Break Changes

* Änderung der Interface-Namen von <Class>Interface auf I<Class>. Die Dateinamen bleiben auf <file>.interface.ts.
* Änderung der Importe von import { X } from 'speech-framework' nach import { X } from '@speech/<component>'.
* Services sind jetzt nicht mehr Angular-spezifisch, sondern generell verwendbar. Der ServiceManager muss jetzt auch in Angular eingebaut werden.
* Die Frameworks speech-angular, speech-react und speech-vue entfallen ersatzlos, speech kann jetzt mit jedem GUI-Framework kombiniert werden.


## Dokumentation


[**Architektur**](./docs/design/service/ServiceDesign.md)

[**Services**](./docs/packages/ServiceList.md)

[**Referenz**](https://lingualogic.github.io/speech/api)

[**Roadmap**](./docs/roadmap/Roadmap-2022.md)

[**Release Notizen**](./CHANGELOG.md)


## Bekannte Probleme

* die verschiedenen Browser verhalten sich unterschiedlich, so dass nicht in jedem Browser alle Komponenten von Speech wie erwartet funktionieren.


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation:  **Leo Füchsel** (leo@lingualogic.de)

Technische Umsetzung: **Stefan Brauer** (stefan@lingualogic.de)


-------------------

## Lizenz

Das Speech Monorepo wurde als Open Source unter der [MIT-Lizenz](./docs/LICENSE.md) veröffentlicht.
