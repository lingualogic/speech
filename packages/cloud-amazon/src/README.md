# CloudAmazon Port zur Anbindung an den CloudAmazon-Service

Hier wird der gesamte Code zur Anbindung an den CloudAmazon-Service implementiert.
Primär wird ein CloudAmazonPort erstellt, der in anderen Plugins verwandet werden kann.
Der CloudAmazonPort beinhaltet bestimmte Grundoperationen, die der Port ausführen kann.
Zusätzlich gibt es einen CloudAmazonMock-Port, der für Testzwecke gedacht ist.


## Vorhandene Dateien

Primär zur Audioverarbeitung gehörende Dateien im Verzeichnis audio:

* **cloud-amazon-audio-codec.ts:** AudioCodec-Klasse, dient zur Verarbeitung von Codec
* **cloud-amazon-audio-player.ts:** AudioPlayer-Objekt, dient fuer die Audio-Stream Wiedergabe
* **cloud-amazon-audio-recorder.ts:** AudioRecorder-Klasse, dient fuer die Audio-Stream Aufnahme
* **cloud-amazon-resampler.ts:** Hilfsklasse für Audio-Codierung/Decodierung


Primär zur CloudAmazon-Service Anbindung gehörende Dateien im Verzeichnis device:

* **cloud-amazon-asr.ts:** ASR-Klasse zur Anbindung des ASR-Service von CloudAmazon
* **cloud-amazon-device.ts:** Device-Basisklasse zur Anbindung eines Service von CloudAmazon
* **cloud-amazon-nlu.ts:** NLU-Klasse zur Anbindung des NLU-Service von CloudAmazon
* **cloud-amazon-tts.ts:** TTS-Klasse zur Anbindung des TTS-Service von CloudAmazon


Primär zum Aufbau der Verbindung zum CloudAmazon-Service gehörende Dateien im Verzeichnis net:

* **cloud-amazon-connect.ts:** Connect-Klasse für Verbindungsaufbau zum CloudAmazon-Service
* **cloud-amazon-network.ts:** Network-Klasse zur Prüfung der Netzwerkverbindung


Port-Dateien für den CloudAmazon-Service:

* **cloud-amazon-config.ts:** Config-Klasse zur Konfiguration des CloudAmazon-Port
* **cloud-amazon-const.ts:** Const-Datei für alle Konstanten des CloudAmazon-Port
* **cloud-amazon-event.ts:** Event-Klasse für die Events des CloudAmazon-Port
* **cloud-amazon-factory.ts:** Factory-Klasse zurErzeugung des CloudAmazon-Port
* **cloud-amazon-function.type.ts:** FunctionType-Datei für alle Funktionstypen des CloudAmazon-Port
* **cloud-amazon-mock.ts:** Mock-Klasse zu Testzwecken
* **cloud-amazon-option.interface.ts:** Option-Interface für die Übergabe optionaler Parameter an den CloudAmazon-Port
* **cloud-amazon-port.ts:** Port-Klasse zur Anbindung des CloudAmazon-Service
* **cloud-amazon-transaction.ts:** Transaction-Klasse für eine Transaktion des CloudAmazon-Ports
* **cloud-amazon.ts:** statische Manager-Klasse für die Verwaltung des CloudAmazon-Ports

