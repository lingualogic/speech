/**
 * Oberstes Gulpfile fuer Core
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
        'speech-core*',
        'tsconfig.build.tsbuildinfo'
    ]);
});

