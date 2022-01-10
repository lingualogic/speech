/**
 * Oberstes Gulpfile fuer Speak
 * Dient zum loeschen der temporaeren Dateien
 */


const del = require('del');
const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');


/** 
 * loescht alle temporaeren Dateien
 */

gulp.task('clean', () => {
    return del([
        'lib',
        'node-modules',
        'speech-speak*',
        'tsconfig.build.tsbuildinfo'
    ]);
});

