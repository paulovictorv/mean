var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('express', function() {
	require('./server');
});


gulp.task('js', function () {
  gulp.src(['public/config.js', 'public/application.js', 'public/modules/**/*.js'])
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('public/**/*.js', ['js'])
})

gulp.task('dist', function() {
	gulp.src(['public/config.js', 'public/application.js', 'public/modules/**/*.js'])
		.pipe(concat('application.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'))
});
