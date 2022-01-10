# Gesamtarchitektur von Speech


Die Speech Architektur umfasst verschiedene Services, die jeweils ein API für ein Feature von Speech für die eigene WebApp zur Verfügung stellen. In der Version Speech-0.6.1 werden ListenService und SpeakService als erste Services eingebaut. Weitere Services folgen.

![Gesamtarchitektur](ServiceDesign-1.gif)

## Services

Der SpeakService dient zur Sprachausgabe von einzelnen Texten. Dazu verwendet er seinerseits entweder Sprachsynthese oder Audiodateien. Der ListenService dient zur Spracheingabe. Dazu verwendet er seinerseits Spracherkennung. Die WebApp kann jeden Service unabhängig von den anderen Services nutzen. [Hier](./../../packages/ServiceList.md) werden alle Services beschrieben.
