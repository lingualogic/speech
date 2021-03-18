# Agent

Die Agent-Komponente dient der Verarbeitung von Spracheingaben und deren Agent-Analyse (NLP).
Hier ist der gesamte Quelltext von Agent untergebracht.


## Agent API

Das Agent API besteht aus folgenden Dateien:

* **agent-const.ts:** Globale Konstanten von Agent
* **agent-data.interface.ts:** Datentransferobjekt für Agent-Callbacks 
* **agent-factory.ts:** Fabrik zur Erzeugung einer Agent Instanz
* **agent-function.type.ts:** Agent Funktionstypen
* **agent-option.interface.ts:** Optionale Parameter zur Initialisierung von Agent
* **agent-version.ts:** Agent Version
* **agent.interface.ts:** Agent API 
* **agent.ts:** API Wrapper für die Agent-Komponente


## Agent Komponente

Die Agent Komponente ist im Unterordner component/ untergebracht und besteht aus folgenden Dateien:

* **agent-component-builder.ts:** Baut eine Agent-Komponente und alle inneren Plugins zusammen
* **agent-component-factory.ts:** Erzeugt eine Agent-Komponenteninstanz
* **agent-component.interface.ts:** Komponentenschnittstelle
* **agent-component.ts:** Agent Komponente


## Agent Plugins

Agent beinhaltet folgende Plugins:

* **Agent-NLP:** Sprachanalyse für Agents


### Agent-NLP

Das Agent-NLP Plugin besteht aus folgenden Dateien:

* **nlp-const.ts:** interne Konstanten für das NLP-Plugin
* **nlp-factory.ts:** Erzeugt eine Instanz des NLP-Plugins
* **nlp-google.ts:** Google NLP-Plugin
* **nlp-group.ts:** Gruppe der vorhandenen NLP-Plugins
* **nlp-html5.ts:** Html5 API NLP-Plugin
* **nlp-microsoft.ts:** Microsoft NLP-Plugin
* **nlp-mock.ts:** Mock NLP-Plugin
* **nlp-plugin.ts:** Basisklasse aller NLP-Plugins
* **nlp-rasa.ts:** Rasa NLP-Plugin
* **nlp.interface.ts:** Schnittstelle des NLP-Plugins
