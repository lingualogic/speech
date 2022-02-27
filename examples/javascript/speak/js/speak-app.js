/**
 * SpeakApp fuer Web-Client zum Testen von Speak-API.
 */


function SpeakApp() {

    let speakService = null;

    // Update DOM on a Received Event

    const receivedEvent = function() {

        const startButton = document.getElementById('startClick');
        const stopButton = document.getElementById('stopClick');
        const errorText = document.getElementById('errorText');


        const clearErrorText = () => {
            errorText.value = '';
        };
       

        /**
         * Speak einschalten
         */

        const onStartClick = () => {
            console.log('===> onStartClick: starten der Sprachausgabe ', speakText.value);
            clearErrorText();
            speakService.setText( speakText.value );
            speakService.start();
        };


        /**
         * Speak ausschalten
         */

        const onStopClick = () => {
            console.log('===> onStopClick: stoppen der Sprachausgabe');
            clearErrorText();
            speakService.stop();
        };


        // Eintragen der Event-Funktionen

        startButton.addEventListener('click', onStartClick, false);
        stopButton.addEventListener('click', onStopClick, false);

    };


    // Start Speak

    const startSpeak = function() {
        console.log('SpeakApp.init: startSpeak');

        // erzeugt die Speak-Komponente

        speakService = speechSpeak.SpeakFactory.create();
        console.log('SpeakApp.startSpeak:', speakService);

        // Speak-Events einbinden

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

        // Speak-Version ausgeben

        let versionName = document.getElementById('versionName');
        versionName.innerHTML = speakService.getVersion();

        receivedEvent();
        console.log('SpeakApp.init: end');
    };


    // startet Speak

    startSpeak();

}


