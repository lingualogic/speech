# Get Started Speech mit Javascript Speak

Dieses Tutorial zeigt in einzelnen einfachen Schritten den Einbau von Speech in Javascript am Beispiel der Speak-Komponente.

Das zu diesem Tutorial zugehörige Beispiel-Projekt findet sich unter im Speech-Repository unter examples/javascript/speak.


## Anlegen eines Projektes

Als erstes wird ein NPM-Projekt erstellt, indem ein Projektverzeichnis erstellt und dann mit NPM initialisiert wird.

    $ mkdir MySpeakApp
    $ cd MySpeakApp
    $ npm init

Die Ausgabe von npm init sieht so aus:

    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help init` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.

    Press ^C at any time to quit.
    package name: (myspeakapp) 
    version: (1.0.0) 
    description: Get Started Speak App
    entry point: (index.js) index.html
    test command: 
    git repository: 
    keywords: 
    author: 
    license: (ISC) 
    About to write to /Volumes/MAC-DATEN/Entwicklung/lingualogic/web/temp/MySpeakApp/package.json:

    {
    "name": "myspeakapp",
    "version": "1.0.0",
    "description": "Get Started Speak App",
    "main": "index.html",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
    }

    Is this OK? (yes)

Damit wurde package.json mit einigen Basisdaten angelegt.


## Installation von NPM-Packages

Als erstes NPM-Package benötigen wir einen einfachen Web-Server, um die Speak-App ausführen zu können:

    $ npm install --save-dev http-server

Danach wird die Speak-Komponente als eigenständiges NPM-Packages installiert:

    $ npm install @lingualogic-speech/speak


## Starten der App

Die Speak-App kann durch folgenden Befehl gestartet werden:

    $ npm start


## Einbau von Speech in die Speak-App

Um Speech in die Speak-App zu integrieren, müssen alle Speech-Packages für Speak in index.html eingetragen werden:

    ```html
    <body>

        ...

        <!-- Speech Dateien -->
        <script type="text/javascript" src="node_modules/@lingualogic-speech/core/lib/index.js"></script>
        <script type="text/javascript" src="node_modules/@lingualogic-speech/file/lib/index.js"></script>
        <script type="text/javascript" src="node_modules/@lingualogic-speech/net/lib/index.js"></script>
        <script type="text/javascript" src="node_modules/@lingualogic-speech/audio/lib/index.js"></script>
        <script type="text/javascript" src="node_modules/@lingualogic-speech/base/lib/index.js"></script>
        <script type="text/javascript" src="node_modules/@lingualogic-speech/service/lib/index.js"></script>
        <script type="text/javascript" src="node_modules/@lingualogic-speech/speak/lib/index.js"></script>
        <!-- eigene Dateien -->
        <script type="text/javascript" src="js/speak-app.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
    ```

Im Code kann dann die Speak-Komponente mit folgendem Code eingebunden werden:

    ```js
    speakService = speechSpeak.SpeakFactory.create();
    ```

Das Speech-System basiert auf Events, so dass die Speak-Events eingebunden werden müssen:

    ```js
    speakService.addStartEvent('SpeakApp', () => {
        console.log('SpeakApp.startSpeakEvent');
        return 0;
    });

    speakService.addStopEvent('SpeakApp', () => {
        console.log('SpeakApp.stopSpeakEvent');
        return 0;
    });

    speakService.addErrorEvent('SpeakApp', (aError) => {
        console.log('SpeakApp.errorEvent', aError.message);
        let errorText = document.getElementById('errorText');
        errorText.value = aError.message;
        return 0;
    });
    ```

Damit wurde die Speak-Komponente in die Speak-App eingebunden.
