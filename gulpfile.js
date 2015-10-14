const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const targets = {
  sass: {
    src: './public/sass/**/*.scss',
    dest: './public/css'
  },
  views: {
    src: './src/views/**/*.html'
  }
};

gulp.task('compile-sass', function compileSass() {
  return gulp
    .src(targets.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        './public/components/foundation/scss',
        './public/components/icheck/skins'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(targets.sass.dest))
    .pipe(browserSync.stream());
});

gulp.task('server', ['compile-sass'], function syncBrowser() {
  browserSync.init({
    proxy: 'http://localhost:4000'
  });

  gulp.watch(targets.sass.src, ['compile-sass']);
  gulp.watch(targets.views.src).on('change', browserSync.reload);
});

gulp.task('build', ['compile-sass']);
gulp.task('default', ['build']);
