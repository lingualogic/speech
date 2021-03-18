/**
 * Oberstes Gulpfile fuer das Speech Monorepos
 * Dient zum Umkopieren aller Dateien aus den einzelnen Entwicklungs-Repositories
 */


const fs = require('fs');
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const shell = require('gulp-shell');
const rename = require('gulp-rename');
const runSequence = require('gulp4-run-sequence');


// Konstanten fuer Builds


const exampleFlag = true;               // wenn true, werden alle Beispiele miterzeugt


// Konstanten fuer Verzeichnisse

const rootDir = path.resolve( __dirname );
const configDir = 'config';
const credentialsDir = 'credentials';
const versionDir = 'config';
const srcDir = 'src';
const examplesDir = 'examples';
const distDir = 'dist';
const testDir = 'test';
const coverageDir = 'coverage';


// Konstanten fuer Dateinamen

const versionFile = 'speech-version.json';
const karmaFile = 'karma.conf.js';


// Version

const speechVersion = require( `./${versionDir}/${versionFile}` );
const version = speechVersion.SPEECH_VERSION_NUMBER + '.' + speechVersion.SPEECH_VERSION_BUILD + ' (' + speechVersion.SPEECH_VERSION_TYPE + ') vom ' + speechVersion.SPEECH_VERSION_DATE;
const branch = speechVersion.SPEECH_VERSION_BRANCH;


/**
 * Loeschen des temporaeren Deploy-Verzeichnisses
 */

gulp.task('build-clean', () => {
    return del([
        distDir
    ]);
});


gulp.task('build-folder-dist', function () {
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest( distDir ));
});


gulp.task('build-folder-deploy', function () {
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest( `${distDir}/deploy`));
});


/** 
 * Erzeugt die Links
 */

gulp.task('build-link', shell.task('lerna run link'));


/** 
 * Erzeugt die Packages
 */

gulp.task('build-packages', shell.task('lerna run build'));



/** 
 * Erzeugt die Bundles
 */

gulp.task('build-bundles', shell.task('lerna run bundle'));



/** 
 * Erzeugt die Packages
 */

gulp.task('pack-packages', shell.task('lerna run pack'));


/**
 * importiert aus allen Entwicklungsrepositories
 */

gulp.task('build', function(callback) {
    runSequence(
        'build-clean',
        'build-folder-dist',
        'build-folder-deploy',
        'build-link',
        'build-packages',
        'build-bundles',
        'pack-packages',
        callback);
});
