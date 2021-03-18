/**
 * Speech-File Bundle
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

!function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? t(exports, require('@speech/core'), require('@speech/common')) : 'function' == typeof define && define.amd ? define([ 'exports', '@speech/core', '@speech/common' ], t) : t((e = 'undefined' != typeof globalThis ? globalThis : e || self).speechFile = {}, e.speechCore, e.speechCommon);
}(this, function(e, t, r) {
    'use strict';
    var o = 'FileReaderFactory', n = 'FileReader', i = function(e, t) {
        return (i = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        })(e, t);
    };
    function l(e, t) {
        function r() {
            this.constructor = e;
        }
        i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, 
        new r());
    }
    var p, u = (l(c, p = t.Plugin), c.prototype.getType = function() {
        return 'FileReader';
    }, c.prototype.getClass = function() {
        return 'FileReader';
    }, c.prototype.init = function(e) {
        return this.isInit() ? (this.error('init', 'init doppelt aufgerufen'), -1) : 0 !== this.mFileHtml5Reader.init(e) ? -1 : p.prototype.init.call(this, e);
    }, c.prototype.done = function() {
        return this.mFileHtml5Reader.done(), p.prototype.done.call(this);
    }, c.prototype.setErrorOutput = function(e) {
        p.prototype.setErrorOutput.call(this, e), this.mFileHtml5Reader.setErrorOutput(e);
    }, c.prototype.getReadFunc = function() {
        var t = this;
        return function(e) {
            return t.read(e);
        };
    }, c.prototype.read = function(e) {
        return this.isInit() ? this.mFileHtml5Reader.read(e, r.XMLHTTPREQUEST_TEXT_RESPONSETYPE) : (this.error('read', 'nicht initialisiert'), 
        -1);
    }, c.prototype.loadDialogFile = function(e) {
        return this.read(e);
    }, Object.defineProperty(c.prototype, "onRead", {
        set: function(e) {
            this.mFileHtml5Reader.onRead = e;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(c.prototype, "onLoadDialogFile", {
        set: function(e) {
            this.mFileHtml5Reader.onRead = e;
        },
        enumerable: !1,
        configurable: !0
    }), c);
    function c(e) {
        e = p.call(this, n, e = void 0 === e ? !0 : e) || this;
        return e.mFileHtml5Reader = null, e.mFileHtml5Reader = new r.FileHtml5Reader(), 
        e.mFileHtml5Reader.onError = e.onError, e;
    }
    var a, t = (l(s, a = t.PluginFactory), s.prototype.getName = function() {
        return o;
    }, s.prototype._newPlugin = function(e, t, r) {
        return new u(r);
    }, s.prototype.create = function(e, t, r) {
        void 0 === t && (t = ''), void 0 === r && (r = !0);
        e = e || n;
        try {
            return this._newPlugin(e, t, r);
        } catch (e) {
            return this.exception('create', e), null;
        }
    }, s);
    function s() {
        return a.call(this, 'FileReaderFactory') || this;
    }
    e.FILEREADER_FACTORY_NAME = o, e.FILEREADER_MOCK_NAME = 'FileReaderMock', e.FILEREADER_PLUGIN_NAME = n, 
    e.FileReader = u, e.FileReaderFactory = t, Object.defineProperty(e, '__esModule', {
        value: !0
    });
});
