# Speech-Agent

Die Speech-Agent Komponente dient zur Implementierung von Sprachagenten, die an einen externen Agenten-Dienst angeschlossen sind.


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

Das Speech-Agent NPM-Paket ist zusammen mit allen anderen NP-Paketen von Speech unter speech/dist zu finden und kann in das eigene Projektverzeichnis zusammen mit den abhängigen NPM-Paketen kopiert werden.

Speech-Agent ist von folgenden anderen Speech NPM-Paketen abhängig:

    * Speech-Core
    * Speech-Common
    * Speech-Cloud"
    * Speech-Base
    * Speech-Service
    * Speech-Intent
    * Speech-Listen
    * Speech-Speak


Diese NPM-Pakete müssen zusammen mit Speech-Agent im eigenen Projekt installiert werden, wenn sie nicht vorher schon installiert worden sind. Das kann mit Hilfe folgenden Befehls durchgeführt werden, wenn alle abhängigen NPM-Pakete zusammen ins eigene Projektverzeichnis kopiert worden sind:

    $ npm install speech-core-0.6.x.tgz speech-common-0.6.x.tgz speech-cloud-0.6.x.tgz speech-base-0.6.x.tgz speech-service-0.6.x.tgz  speech-intent-0.6.x.tgz speech-listen-0.6.x.tgz speech-speak-0.6.x.tgz speech-agent-0.6.x.tgz


### Über globales NPM-Repository

Das öffentliche Speech-Agent NPM-Paket kann über folgenden Befehl zusammen mit seinen abhängigen NPM-Paketen aus dem globalen NPM-Repository installiert werden:

    $ npm install @speech/core @speech/common @speech/cloud @speech/base @speech/service @speech/intent @speech/listen @speech/speak @speech/agent


## Deinstallation

Das Speech-Agent NPM-Paket kann mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall speech-agent


## Bekannte Probleme

