/**
 * Testadapter fuer den Zoe-Wissensserver (Query-Server)
 * 
 * TODO: Muss unbedingt auf Query-Server ohne jquery umgebaut werden !
 */

// TODO: einzige Abhaengigkeit von JQuery, muss entfernt werden, Umbau auf XMLHttpRequest
 
// import * as $ from 'jquery';

import { AGENT_QUERYSERVER_URL } from './agent-const';


/**
 * Abfragefunktion fuer uery-Server
 *
 * @param aQuery - Anfrage an Zoe-Wissensserver
 * @param aAnswerCallback - Antwortfunktion
 */

export function queryZoe( aQuery: string, aAnswerCallback: ( aError: any, aAnswer: string ) => void ): void {

    let answer = '';
    // TODO: muss als Parameter uebergeben werden
    const aUrl = AGENT_QUERYSERVER_URL + '/answer';
    const param = 'question=' + encodeURIComponent( aQuery );

    // TODO: XMLHttpRequest einbauen und JQuery komplett ersetzen
    const request = new XMLHttpRequest();
    console.log('AgentQuery: URL = ', aUrl + '?' + param);
    request.open('GET', aUrl + '?' + param, true);
    request.responseType = 'json';
    request.onload = () => {
        console.log( 'AssistantZoeProvider.queryZoe: onload request.response = ', request.response );
        if ( request.response.sentence ) {
            if ( typeof request.response.sentence === 'string') {
                answer = request.response.sentence;
            } else {
                answer = request.response.sentence[ 0 ];
            }
        }
        console.log('AgentQuery.queryZoe: answer = ', answer);
        aAnswerCallback( null, answer );
    };
    /*
    request.onloadend = () => {
        console.log( 'AssistantZoeProvider.queryZoe: onloaded data = ', request.response );
        // $("body").addClass("has-result");
        // answer = data.sentence[ 0 ];
        // $yesNo.show();
        // $results.removeClass("loading");
        // $answer.html(data.sentence).show();
        // aAnswerCallback( null, answer );
    };
    */
    request.onerror = () => {
        console.log( 'AssistantZoeProvider.queryZoe: onerror');
        aAnswerCallback( 'Error: AgentQuery:', answer );
    }

    request.send();


    // JQuery.ajax Syntax
    /*
    const request = $.ajax({
        url: aUrl,
        responseType: 'application/plaintext',
        data: {
            question: aQuery,
            html: false,
            language: 'de'
        }
    });

    request.done( (data: any) => {
        console.log( 'AssistantZoeProvider.queryZoe: data = ', data );
        // $("body").addClass("has-result");
        answer = data.sentence[ 0 ];
        // $yesNo.show();
        // $results.removeClass("loading");
        // $answer.html(data.sentence).show();
        aAnswerCallback( null, answer );
    });

    request.fail( (error: any) => {
        console.log( 'AssistantZoeProvider.queryZoe: error = ', error );
        const sentence = error.responseJSON && error.responseJSON.sentence;
        answer = sentence || 'Das kann ich nicht. Ich lerne aber schnell. Probiere es mal bald wieder!';
        // TODO: Kann erst verwendet werden, wenn es den Chatbot-Lernserver gibt
        //$.ajax({
        //    url: '/result',
        //    type: 'POST',
        //    dataType: 'json',
        //    contentType: 'application/json',
        //    data: JSON.stringify({
        //        answer: {
        //            success: false,
        //            question: aQuery
        //        }
        //    })
        //});
        
        console.log(error.responseJSON && error.responseJSON.log);
        aAnswerCallback( error, answer );
    });
    */

}
