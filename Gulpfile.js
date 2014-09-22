var gulp = require('gulp');
var es = require('event-stream');

//Javascript stuff
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

//CSS Stuff
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minifycss = require('gulp-minify-css');

gulp.task('express', function() {
	require('./server');
});


gulp.task('js', function () {
  gulp.src(['public/config.js', 'public/application.js', 'public/modules/**/*.js'])
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('styles', function() {
    var vendorFiles = gulp.src('public/lib/bootstrap/dist/*.css');

    var appFiles = gulp.src('public/modules/**/sass/*.scss')
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(concatCss('application.css'))

    return es.concat(vendorFiles, appFiles)
        .pipe(concat('output-file-name.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss())
        .pipe(gulp.dest(targetCssDir));
});

gulp.task('watch', ['js'], function () {
  gulp.watch('public/**/*.js', ['js']);
});

gulp.task('dist', function() {
	gulp.src(['public/config.js', 'public/application.js', 'public/modules/**/*.js'])
		.pipe(concat('application.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});
