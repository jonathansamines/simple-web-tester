const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

gulp.task('compile-sass', function compileSass() {
  return gulp
    .src('./public/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./public/components/foundation/scss']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('compile-sass-watch', function watchCompilation() {
  gulp.watch('./public/sass/**/*.scss', ['compile-sass']);
});

gulp.task('server', ['compile-sass-watch']);
gulp.task('build', ['compile-sass']);
gulp.task('default', ['build']);
