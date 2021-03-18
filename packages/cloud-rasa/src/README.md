# CloudRasa2 Port zur Anbindung an den CloudRasa-Service als NLU-Agent

Hier wird der gesamte Code zur Anbindung an den CloudRasa-Service implementiert.
Primär wird ein CloudRasaPort erstellt, der in anderen Plugins verwandet werden kann.
Der CloudRasaPort beinhaltet bestimmte Grundoperationen, die der Port ausführen kann.
Zusätzlich gibt es einen CloudRasaMock-Port, der für Testzwecke gedacht ist.


## Vorhandene Dateien

Primär zur Audioverarbeitung gehörende Dateien im Verzeichnis audio:

* **cloud-rasa-audio-codec.ts:** AudioCodec-Klasse, dient zur Verarbeitung von Codec
* **cloud-rasa-audio-player.ts:** AudioPlayer-Objekt, dient fuer die Audio-Stream Wiedergabe
* **cloud-rasa-audio-recorder.ts:** AudioRecorder-Klasse, dient fuer die Audio-Stream Aufnahme
* **cloud-rasa-resampler.ts:** Hilfsklasse für Audio-Codierung/Decodierung


Primär zur CloudRasa-Service Anbindung gehörende Dateien im Verzeichnis device:

* **cloud-rasa-asr.ts:** ASR-Klasse zur Anbindung des ASR-Service von CloudRasa
* **cloud-rasa-device.ts:** Device-Basisklasse zur Anbindung eines Service von CloudRasa
* **cloud-rasa-nlu.ts:** NLU-Klasse zur Anbindung des NLU-Service von CloudRasa
* **cloud-rasa-tts.ts:** TTS-Klasse zur Anbindung des TTS-Service von CloudRasa


Primär zum Aufbau der Verbindung zum CloudRasa-Service gehörende Dateien im Verzeichnis net:

* **cloud-rasa-connect.ts:** Connect-Klasse für Verbindungsaufbau zum CloudRasa-Service
* **cloud-rasa-network.ts:** Network-Klasse zum Prüfen auf Netzwerkverbindung
* **cloud-rasa-websocket.ts:** Websocket-Klasse für Verbindungsaufbau zum Websocket des Speech-Server


Port-Dateien für den CloudRasa-Service:

* **cloud-rasa-config.ts:** Config-Klasse zur Konfiguration des CloudRasa-Port
* **cloud-rasa-const.ts:** Const-Datei für alle Konstanten des CloudRasa-Port
* **cloud-rasa-event.ts:** Event-Klasse für die Events des CloudRasa-Port
* **cloud-rasa-factory.ts:** Factory-Klasse zurErzeugung des CloudRasa-Port
* **cloud-rasa-function.type.ts:** FunctionType-Datei für alle Funktionstypen des CloudRasa-Port
* **cloud-rasa-mock.ts:** Mock-Klasse zu Testzwecken
* **cloud-rasa-option.interface.ts:** Option-Interface für die Übergabe optionaler Parameter an den CloudRasa-Port
* **cloud-rasa-port.ts:** Port-Klasse zur Anbindung des CloudRasa-Service
* **cloud-rasa-transaction.ts:** Transaction-Klasse für eine Transaktion des CloudRasa-Ports
* **cloud-rasa.ts:** statische Manager-Klasse für die Verwaltung des CloudRasa-Ports
* **cloud-rasa-manager.ts:** statische Manager-Klasse für die Verwaltung mehrerer CloudRasa-Ports

