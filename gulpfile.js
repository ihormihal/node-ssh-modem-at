'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
//   rename = require('gulp-rename'),
  concatCss = require('gulp-concat-css'),
  minifycss = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', () => {
    return gulp.src('public/scss/theme.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss("styles.css"))
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 10'],
      }))
      .pipe(minifycss(''))
      .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch('public/scss/**/*.scss', gulp.series('scss'));
});
