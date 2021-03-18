/** @packageDocumentation
 * Speech Browser Function
 *
 * Last Change: 23.06.2020
 * Quality Status: red
 *
 * @module common
 */

// for browser detecting

declare const InstallTrigger: any;

/**
 * Browser Helper Class
 */

export class SpeechBrowser {

    static getBrowserName(): string {
        let browserName = '';
        const userAgent = navigator.userAgent;
        if ( typeof InstallTrigger !== 'undefined' ) {
            browserName = 'Firefox';
        } else if ( !!(document as any).documentMode) {
            browserName = 'IE';
        } else if ( !!(window as any).safari ) {
            browserName = 'Safari';
        } else if ( !!(window as any).chrome && userAgent.match(/OPR/)) {
            browserName = 'Opera';
        } else if ( !!(window as any).chrome && userAgent.match(/Edge/)) {
            browserName = 'Edge';
        } else if ( !!(window as any).chrome && userAgent.match(/Edg/)) {
            browserName = 'Edge2';
        } else if ( !!(window as any).chrome && !userAgent.match(/(OPR|Edge|Edg)/)) {
            browserName = 'Chrome';
        }

        /**
         * Expected returns
         * Firefox, Opera, Edge, Chrome
         */
        return browserName;
    }
}
