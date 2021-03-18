# Cordova OSX Hinweise

Diese Hinweise beziehen sich nur auf die Cordova-OSX Version für Speech-Apps auf eine Mac.

## Voraussetzungen

## Einschalten des WebAudio-API

Um Audiodateien mit Speech-Framework in Cordova-OSX abspielen zu können, muss dieser Befehl in einem Terminal eingegeben werden:

    $ defaults write de.lingualogic.<app-name> WebKitWebAudioEnabled -bool true

## Testumgebung einschalten

    $ defaults write de.lingualogic.<app-name> WebKitDeveloperExtras -bool true