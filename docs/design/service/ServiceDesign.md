# Gesamtarchitektur von Speech


Die Speech Architektur umfasst verschiedene Services, die jeweils ein API für ein Feature von Speech für die eigene WebApp zur Verfügung stellen.

![Gesamtarchitektur](ServiceDesign-1.gif)


## Services

Der SpeakService dient zur Sprachausgabe von einzelnen Texten. Dazu verwendet er seinerseits entweder Sprachsynthese oder Audiodateien. Der ListenService dient zur Spracheingabe. Dazu verwendet er seinerseits Spracherkennung. Der DialogService dient zum Abspielen von Skripten zur Ausführung von Aktionen.

Die WebApp kann jeden Service unabhängig von den anderen Services nutzen. [Hier](./../../packages/ServiceList.md) werden alle Services beschrieben.
