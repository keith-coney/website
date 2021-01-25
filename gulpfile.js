var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

sass.compiler = require('node-sass');

gulp.task('sass', function() {
  return gulp
    .src([
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './sass/**/*.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('scripts', function() {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/scrollreveal/dist/scrollreveal.min.js', 
      './js/custom.js',
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  // gulp.watch("*.html").on("change", reload);
});


//watch
gulp.task('watch', ['scripts', 'sass','serve'], function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch("*.html").on("change", reload);
});
