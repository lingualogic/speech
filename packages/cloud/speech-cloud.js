/**
 * Speech-Cloud Bundle
 *
 * Version: 0.6.0
 * Build:   0001
 * TYPE:    alpha
 * Datum:   18.03.2021
 *
 * Autor:   LinguaLogic Team
 * Lizenz:  MIT
 *
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

!function(r, t) {
    'object' == typeof exports && 'undefined' != typeof module ? t(exports, require('@speech/core')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core' ], t) : t((r = 'undefined' != typeof globalThis ? globalThis : r || self).speechCloud = {}, r.speechCore);
}(this, function(r, o) {
    'use strict';
    var t = (e.setErrorOutputOn = function() {
        e.mErrorOutputFlag = !0, o.PortManager.setErrorOutputOn();
    }, e.setErrorOutputOff = function() {
        e.mErrorOutputFlag = !1, o.PortManager.setErrorOutputOff();
    }, e.setErrorOutputFunc = function(r) {
        o.PortManager.setErrorOutputFunc(r);
    }, e.init = function(r) {
        return e.mInitFlag || (r && 'boolean' == typeof r.errorOutputFlag && (r.errorOutputFlag ? e.setErrorOutputOn() : e.setErrorOutputOff()), 
        e.mInitFlag = !0), 0;
    }, e.isInit = function() {
        return e.mInitFlag;
    }, e.done = function() {
        return o.PortManager.clear(), e.mInitFlag = !1, 0;
    }, e.findPort = function(r) {
        return o.PortManager.find(r);
    }, e.findPortTypeList = function(r) {
        for (var t = [], e = o.PortManager.first(); e; ) e.getType() === r && t.push(e), 
        e = o.PortManager.next();
        return t;
    }, e.findPortClassList = function(r) {
        for (var t = [], e = o.PortManager.first(); e; ) e.getClass() === r && t.push(e), 
        e = o.PortManager.next();
        return t;
    }, e.mInitFlag = !1, e.mErrorOutputFlag = !1, e);
    function e() {}
    r.CLOUD_AMAZON_PORT = 'CloudAmazon', r.CLOUD_ASRNLU_ACTION = 'ASRNLU', r.CLOUD_ASR_ACTION = 'ASR', 
    r.CLOUD_GOOGLE_PORT = 'CloudGoogle', r.CLOUD_MICROSOFT_PORT = 'CloudMicrosoft', 
    r.CLOUD_NLU_ACTION = 'NLU', r.CLOUD_NUANCE_PORT = 'CloudNuance', r.CLOUD_PORT_NAME = 'CloudPort', 
    r.CLOUD_PROXYFACTORY_NAME = 'CloudProxyFactory', r.CLOUD_PROXY_NAME = 'CloudProxy', 
    r.CLOUD_RASA_PORT = 'CloudRasa', r.CLOUD_TTS_ACTION = 'TTS', r.CloudManager = t, 
    Object.defineProperty(r, '__esModule', {
        value: !0
    });
});
