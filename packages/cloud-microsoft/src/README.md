# CloudMicrosoft Port zur Anbindung an den CloudMicrosoft-Service

Hier wird der gesamte Code zur Anbindung an den CloudMicrosoft-Service implementiert.
Primär wird ein CloudMicrosoftPort erstellt, der in anderen Plugins verwandet werden kann.
Der CloudMicrosoftPort beinhaltet bestimmte Grundoperationen, die der Port ausführen kann.
Zusätzlich gibt es einen CloudMicrosoftMock-Port, der für Testzwecke gedacht ist.


## Vorhandene Dateien

Primär zur Audioverarbeitung gehörende Dateien im Verzeichnis audio:

* **cloud-microsoft-audio-codec.ts:** AudioCodec-Klasse, dient zur Verarbeitung von Codec
* **cloud-microsoft-audio-player.ts:** AudioPlayer-Objekt, dient fuer die Audio-Stream Wiedergabe
* **cloud-microsoft-audio-recorder.ts:** AudioRecorder-Klasse, dient fuer die Audio-Stream Aufnahme
* **cloud-microsoft-resampler.ts:** Hilfsklasse für Audio-Codierung/Decodierung


Primär zur CloudMicrosoft-Service Anbindung gehörende Dateien im Verzeichnis device:

* **cloud-microsoft-asr.ts:** ASR-Klasse zur Anbindung des ASR-Service von CloudMicrosoft
* **cloud-microsoft-device.ts:** Device-Basisklasse zur Anbindung eines Service von CloudMicrosoft
* **cloud-microsoft-nlu.ts:** NLU-Klasse zur Anbindung des NLU-Service von CloudMicrosoft
* **cloud-microsoft-tts.ts:** TTS-Klasse zur Anbindung des TTS-Service von CloudMicrosoft


Primär zum Aufbau der Verbindung zum CloudMicrosoft-Service gehörende Dateien im Verzeichnis net:

* **cloud-microsoft-connect.ts:** Connect-Klasse für Verbindungsaufbau zum CloudMicrosoft-Service
* **cloud-microsoft-network.ts:** Network-Klasse für Pruefung auf Netzwerkverbindung


Port-Dateien für den CloudMicrosoft-Service:

* **cloud-microsoft-config.ts:** Config-Klasse zur Konfiguration des CloudMicrosoft-Port
* **cloud-microsoft-const.ts:** Const-Datei für alle Konstanten des CloudMicrosoft-Port
* **cloud-microsoft-event.ts:** Event-Klasse für die Events des CloudMicrosoft-Port
* **cloud-microsoft-factory.ts:** Factory-Klasse zur Erzeugung des CloudMicrosoft-Port
* **cloud-microsoft-function.type.ts:** FunctionType-Datei für alle Funktionstypen des CloudMicrosoft-Port
* **cloud-microsoft-mock.ts:** Mock-Klasse zu Testzwecken
* **cloud-microsoft-option.interface.ts:** Option-Interface für die Übergabe optionaler Parameter an den CloudMicrosoft-Port
* **cloud-microsoft-port.ts:** Port-Klasse zur Anbindung des CloudMicrosoft-Service
* **cloud-microsoft-transaction.ts:** Transaction-Klasse für eine Transaktion des CloudMicrosoft-Ports
* **cloud-microsoft.ts:** statische Manager-Klasse für die Verwaltung des CloudMicrosoft-Ports

