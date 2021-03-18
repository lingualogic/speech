/**
 * Oberstes Gulpfile fuer Cloud-Amazon
 * Dient zur Anpassung des Codes an ein externes SDK
 */


const gulp = require('gulp');
const inject = require('gulp-inject-string');
const runSequence = require('gulp4-run-sequence');


/** 
 * Erzeugt die auszuliefernde Speech-Main Bibliothek
 */

gulp.task('build-append-sdk', () => {
    return gulp.src([
        './lib/index.js'
    ])
    .pipe( inject.append( '\n' ))
    .pipe( inject.append( '/**\n' ))
    .pipe( inject.append( ' * Automatisch eingefuegtes SDK\n' ))
    .pipe( inject.append( ' */\n' ))
    .pipe( inject.append( '\n' ))
    .pipe( inject.append( 'var awssdk = require("./aws-sdk-speech.min");\n' ))
    .pipe( inject.append( '\n' ))
    .pipe( gulp.dest('./lib'));
});


/** 
 * Erzeugt die auszuliefernde Speech-Main Bibliothek
 */

gulp.task('build-copy-sdk', () => {
    return gulp.src([
        './src/extern/aws-sdk-speech.min.js'
    ])
    .pipe( gulp.dest('./lib'));
});


/**
 * importiert aus allen Entwicklungsrepositories
 */

gulp.task('build', function(callback) {
    runSequence(
        'build-append-sdk',
        'build-copy-sdk',
        callback
    );
});
