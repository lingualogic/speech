# ServiceManager

Der ServiceManager dient zur Verwaltung der Services. Ein Service kann auch ohne den ServiceManager in einer Web-App verwendet werden. Sinnvoll ist der ServiceManager, wenn der gleiche Service in verschiedenen Komponenten verwendet werden soll.

Der ServiceManager ist eine statische Klasse und muss nicht erst instanziiert werden.


## Funktion get

Ein Service wird im ServiceManager so erzeugt:


    // speech

    import { ServiceManager, SERVICE_SPEAK_NAME } from '@speech/service';
    import { SpeakService } from '@speech/speak';

    // ...

    // im Code einfuegen, dann erhaelt man einen Speak-Service vom ServiceManager

    const speakService = ServiceManager.get( SERVICE_SPEAK_NAME, SpeakService );

    // ...


## Funktion find

Will man einen Service nur holen, so kann folgender Code verwendet werden:

    // ...

    // Rueckgabe des SpeakService, der im ServiceManager bereits erzeugt worden ist

    const speakService = ServideManager.find( SERVICE_SPEAK_NAME );

    // ...

Dazu muss der SpeakService aber wie weiter oben beschrieben, schon erzeugt worden sein.


## Funktion insert

Hat man einen Service direkt erzeugt, kann man ihn nachtraeglich in den ServiceManager eintragen:

    // ...
    
    // Service erzeugen

    const speakService = new SpeakServive();

    // Service in ServiceManager eintragen

    ServiceManager.insert( speakService );

    // ...