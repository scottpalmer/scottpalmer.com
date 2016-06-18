var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var autoprefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var paths = {
  'bower': 'bower_components',
  'build': 'assets/build',
  'dist': 'assets/dist'
};

// less task
gulp.task('less', function() {
  gulp.src([
    paths.build + '/less/main.less'
  ])
  .pipe(less({compress: true}))
  .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(minifycss())
  .pipe(rename({suffix: '-min'}))
  .pipe(gulp.dest(paths.dist + '/css'))
  .pipe(livereload());
});

// img tasks
gulp.task('img', function () {
  gulp.src([
    paths.build + '/img/**/*'
  ])
  .pipe(gulp.dest(paths.dist + '/img'));
});

// build task
gulp.task('build', ['less', 'img']);

// default task
gulp.task('default', function () {
  livereload.listen();
  gulp.watch(paths.build + '/less/**/*.less', ['less']);
});
