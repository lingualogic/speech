# CloudGoogle Port zur Anbindung an den CloudGoogle-Service

Hier wird der gesamte Code zur Anbindung an den CloudGoogle-Service implementiert.
Primär wird ein CloudGooglePort erstellt, der in anderen Plugins verwandet werden kann.
Der CloudGooglePort beinhaltet bestimmte Grundoperationen, die der Port ausführen kann.
Zusätzlich gibt es einen CloudGoogleMock-Port, der für Testzwecke gedacht ist.


## Vorhandene Dateien

Primär zur Audioverarbeitung gehörende Dateien im Verzeichnis audio:

* **cloud-google-audio-codec.ts:** AudioCodec-Klasse, dient zur Verarbeitung von Codec
* **cloud-google-audio-player.ts:** AudioPlayer-Objekt, dient fuer die Audio-Stream Wiedergabe
* **cloud-google-audio-recorder.ts:** AudioRecorder-Klasse, dient fuer die Audio-Stream Aufnahme
* **cloud-google-resampler.ts:** Hilfsklasse für Audio-Codierung/Decodierung


Primär zur CloudGoogle-Service Anbindung gehörende Dateien im Verzeichnis device:

* **cloud-google-asr.ts:** ASR-Klasse zur Anbindung des ASR-Service von CloudGoogle
* **cloud-google-device.ts:** Device-Basisklasse zur Anbindung eines Service von CloudGoogle
* **cloud-google-nlu.ts:** NLU-Klasse zur Anbindung des NLU-Service von CloudGoogle
* **cloud-google-tts.ts:** TTS-Klasse zur Anbindung des TTS-Service von CloudGoogle


Primär zum Aufbau der Verbindung zum CloudGoogle-Service gehörende Dateien im Verzeichnis net:

* **cloud-google-connect.ts:** Connect-Klasse für Verbindungsaufbau zum CloudGoogle-Service
* **cloud-google-network.ts:** Network-Klasse zum Prüfen auf Netzwerkverbindung
* **cloud-google-websocket.ts:** Websocket-Klasse für Verbindungsaufbau zum Websocket des Speech-Server


Port-Dateien für den CloudGoogle-Service:

* **cloud-google-config.ts:** Config-Klasse zur Konfiguration des CloudGoogle-Port
* **cloud-google-const.ts:** Const-Datei für alle Konstanten des CloudGoogle-Port
* **cloud-google-event.ts:** Event-Klasse für die Events des CloudGoogle-Port
* **cloud-google-factory.ts:** Factory-Klasse zurErzeugung des CloudGoogle-Port
* **cloud-google-function.type.ts:** FunctionType-Datei für alle Funktionstypen des CloudGoogle-Port
* **cloud-google-mock.ts:** Mock-Klasse zu Testzwecken
* **cloud-google-option.interface.ts:** Option-Interface für die Übergabe optionaler Parameter an den CloudGoogle-Port
* **cloud-google-port.ts:** Port-Klasse zur Anbindung des CloudGoogle-Service
* **cloud-google-transaction.ts:** Transaction-Klasse für eine Transaktion des CloudGoogle-Ports
* **cloud-google.ts:** statische Manager-Klasse für die Verwaltung des CloudGoogle-Ports

