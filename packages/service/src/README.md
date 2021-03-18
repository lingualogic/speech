# Service Komponente

Die Service-Komponente ist eine abstrakte Komponente, von der alle Service-Komponenten erben.
Hier wird die service-API und die Grundfuktionalität jeder Service-Komponente implementiert. Alle
von der Service-Komponente erbende Komponenten sind Spezialisierungen von Service. Der Service
entkoppelt die Komponenten-Implementierung von der Komponenten-API.

Folgende Komponenten erben von Service:

* **Action** - Aktionsverarbeitung
* **Intent** - Intenterkennung
* **Listen** - Spracheingabe
* **Speak** - Sprachausgabe
