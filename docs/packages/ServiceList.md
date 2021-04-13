# Speech Services

Die Speech Services kapseln die Speech Komponente vollständig und definieren eine öffentliche Speech-Service API für eine WebApp.


![Service-Architektur](ServiceList-1.gif)


Die Speech Services sind Service-Wrapperklassen für die gleichnamigen Speech Komponenten, wie in der oberen Grafik dargestellt.

In der folgenden Grafik werden die Vererbungsbeziehungen der Speech Service Klassen zur Service-Klasse und die Enthaltensein-Beziehungen zu den Speech Komponenten dargestellt.

![Service-Architektur](ServiceList-2.gif)


Folgende Speech Services gibt es:


* **[ActionService](./action/ActionService.md):** erlaubt die Fernsteuerung der Web-App über Aktionen

* **[BotService](./bot/BotService.md):** erlaubt die Ausführung eines Dialogs mit Sprachausgabe und Aktionen

* **[DialogService](./dialog/DialogService.md):** erlaubt die Ausführung eines Dialogs über die [Dialog-Skriptsprache](./bot/DialogScript.md)

* **[IntentService](./intent/IntentService.md):** erlaubt die Intentanalyse eines Textes

* **[ListenService](./listen/ListenService.md):** erlaubt die Spracheingabe und Umwandlung in Text

* **[SpeakService](./speak/SpeakService.md):** erlaubt die Sprachausgabe eines kurzen Textes


Folgende Basis Services gibt es:


* **[Service](./service/Service.md):** beinhaltet die gemeinsame Grundfunktionalität der Speech Services

* **[AmazonService](./cloud-amazon/AmazonService.md):** erlaubt die Änderung der Amazon-Credentials

* **[GoogleService](./cloud-google/GoogleService.md):** erlaubt die Änderung der Google-Credentials

* **[MicrosoftService](./cloud-microsoft/MicrosoftService.md):** erlaubt die Änderung der Microsoft-Credentials

* **[RasaService](./cloud-rasa/RasaService.md):** erlaubt die Änderung der Rasa-Credentials


Folgende Module gibt es:


* **[AmazonModule](./cloud-amazon/AmazonModule.md):** verwaltet die Amazon Cloud-Dienstanbindung

* **[GoogleModule](./cloud-google/GoogleModule.md):** verwaltet die Google Cloud-Dienstanbindung

* **[MicrosoftModule](./cloud-microsoft/MicrosoftModule.md):** verwaltet die Microsoft Cloud-Dienstanbindung

* **[RasaModule](./cloud-rasa/RasaModule.md):** verwaltet die Rasa Cloud-Dienstanbindung
