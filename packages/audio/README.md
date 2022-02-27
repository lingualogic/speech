# Speech-Audio

Die Speech-Audio Komponente dient dem Aufnehmen und Abspielen von Audiodaten.


## Letzte Version

* 0.6.2.0003 alpha vom 30.01.2022


## Installation

Es kann eine eigene lokale Version installiert werden, oder die öffentliche Version aus dem globalen NPM-Repository.


### Lokal

Zuerst muss das Speech Github-Repsitory unter [https://github.com/lingualogic/speech](https://github.com/lingualogic/speech) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech
    $ cd speech

danach werden alle NPM-Pakete in Speech mit folgendem Befehl installiert:

    $ npm install

anschließend werden alle NPM-Pakete für Speech im dist Ordner erzeugt und die E2E-Tests ausgeführt:

    $ npm run build

Das Speech-Audio NPM-Paket ist zusammen mit allen anderen NP-Paketen von Speech unter speech/dist zu finden und kann in das eigene Projektverzeichnis zusammen mit den abhängigen NPM-Paketen kopiert werden.

Speech-Audio ist von folgenden anderen Speech NPM-Paketen abhängig:

    * Speech-Core

Diese NPM-Pakete müssen zusammen mit Speech-Audio im eigenen Projekt installiert werden, wenn sie nicht vorher schon installiert worden sind. Das kann mit Hilfe folgenden Befehls durchgeführt werden, wenn alle abhängigen NPM-Pakete zusammen ins eigene Projektverzeichnis kopiert worden sind:

    $ npm install speech-core-0.6.x.tgz speech-audio-0.6.x.tgz


### Über globales NPM-Repository

Das öffentliche Speech-Audio NPM-Paket kann über folgenden Befehl zusammen mit seinen abhängigen NPM-Paketen aus dem globalen NPM-Repository installiert werden:

    $ npm install @speech/core @speech/audio


## Deinstallation

Das Speech-Audio NPM-Paket kann mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall @speech/audio


## Bekannte Probleme


