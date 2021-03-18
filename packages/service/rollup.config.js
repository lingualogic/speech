// rollup.config.js fuer SpeechService

import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

// SpeechFramework

import * as speechVersion from '../../config/speech-version.json';

const SPEECH_VERSION_STRING = speechVersion.SPEECH_VERSION_NUMBER + '.' + speechVersion.SPEECH_VERSION_BUILD + ' (' + speechVersion.SPEECH_VERSION_TYPE + ') vom ' + speechVersion.SPEECH_VERSION_DATE;

console.log('');
console.log('********************************************************************');
console.log('**  Speech-Framework VERSION: ' + SPEECH_VERSION_STRING + '  **');
console.log('**                                                                **');
console.log('**                 Service Bundle wird erzeugt                    **');
console.log('********************************************************************');
console.log('');


// Parameter fuer die Erzeugung der SpeechService.js Datei

let readableSourceCode = true; // true, wenn Code lesbar sein soll, false sonst (uglify/minify)
let preambleText =
`/**
 * Speech-Service Bundle
 *
 * Version: ${speechVersion.SPEECH_VERSION_NUMBER}
 * Build:   ${speechVersion.SPEECH_VERSION_BUILD}
 * TYPE:    ${speechVersion.SPEECH_VERSION_TYPE}
 * Datum:   ${speechVersion.SPEECH_VERSION_DATE}
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
`;


let typescriptDefaults = { compilerOptions: { declaration: true } };
let typescriptOverride = { compilerOptions: { declaration: false } };

export default {
    input: './src/index.ts',
    external: [ 
        '@speech/core',
        '@speech/base'
    ],
    output: {
        file: './speech-service.js',
        format: 'umd',
        name: 'speechService',
        sourcemap: false,
        globals: {
            "@speech/core": "speechCore",
            "@speech/base": "speechBase"
        }

    },
    preserveSymlinks: true,
    plugins: [
        typescript({
            tsconfigDefaults: typescriptDefaults,
            tsconfig: 'tsconfig.rollup.json',
            tsconfigOverride: typescriptOverride
        }),

        json(),

        uglify({
            output: {
                beautify: readableSourceCode,
                preamble: preambleText,
                quote_style: 3
            }
        }),

        nodeResolve({
            jsnext: true,
            module: true,
            main: true,  // for commonjs modules that have an index.js
            browser: true
        }),

        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: /node_modules/,
            transformMixedEsModules: true
        })
    ],

};