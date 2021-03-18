# Speech-Bot

Die Speech-Bot Komponente dient zur Implementierung von Sprachbots, die an einen externen Bot-Dienst angeschlossen sind.


## Letzte Version

* 0.6.0.0001 alpha vom 18.03.2021


## Installation

Es kann eine eigene lokale Version installiert werden, oder die öffentliche Version aus dem globalen NPM-Repository.


### Lokal

Zuerst muss das Speech Github-Repsitory unter [https://github.com/lingualogic/speech](https://github.com/lingualogic/speech) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech
    $ cd speech

danach werden alle NPM-Pakete in Speech mit folgendem Befehl installiert:

    $ npm install

anschließend werden die NPM-Pakete für Speech im dist Ordner erzeugt und die E2E-Tests ausgeführt:

    $ npm run build

Das Speech-Bot NPM-Paket ist zusammen mit allen anderen NP-Paketen von Speech unter speech/dist zu finden und kann in das eigene Projektverzeichnis zusammen mit den abhängigen NPM-Paketen kopiert werden.

Speech-Bot ist von folgenden anderen Speech NPM-Paketen abhängig:

    * Speech-Core
    * Speech-Common
    * Speech-Cloud"
    * Speech-Audio
    * Speech-file
    * Speech-Base
    * Speech-Service
    * Speech-Listen
    * Speech-Speak
    * Speech-Action
    * Speech-Dialog


Diese NPM-Pakete müssen zusammen mit Speech-Bot im eigenen Projekt installiert werden, wenn sie nicht vorher schon installiert worden sind. Das kann mit Hilfe folgenden Befehls durchgeführt werden, wenn alle abhängigen NPM-Pakete zusammen ins eigene Projektverzeichnis kopiert worden sind:

    $ npm install speech-core-0.6.x.tgz speech-common-0.6.x.tgz speech-cloud-0.6.x.tgz speech-base-0.6.x.tgz speech-service-0.6.x.tgz  speech-listen-0.6.x.tgz speech-speak-0.6.x.tgz speech-action-0.6.x.tgz speech-dialog-0.6.x.tgz speech-bot-0.6.x.tgz


### Über globales NPM-Repository

Das öffentliche Speech-Bot NPM-Paket kann über folgenden Befehl zusammen mit seinen abhängigen NPM-Paketen aus dem globalen NPM-Repository installiert werden:

    $ npm install @speech/core @speech/common @speech/cloud @speech/base @speech/service @speech/listen @speech/speak @speech/action @speech/dialog @speech/bot


## Deinstallation

Das Speech-Bot NPM-Paket kann mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall speech-bot


## Bekannte Probleme
