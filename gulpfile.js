var gulp = require('gulp');
const browsersync = require('browser-sync').create();
var sass = require('gulp-sass');

sass.compiler =require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');

gulp.task('sass',
function () {
return (
gulp
.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css',
'./sass/**/*.scss'])
// .pipe(sourcemaps.init())
.pipe(sass.sync().on('error',
sass.logError))
.pipe(sourcemaps.write())
.pipe(concat('style.css'))
.pipe(
uglifycss({
maxLineLen:
80,
uglyComments:
true,
})
)
.pipe(gulp.dest('./'))
);

});



gulp.task('watch',
function () {

gulp.watch('./sass/*.scss',
gulp.series('sass'));

});



gulp.task('default',
gulp.series('sass',
'watch'));
