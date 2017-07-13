const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('styles', () => {
  gulp.src('scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePath: ['scss/**/*.scss']
    }))
    .pipe(gulp.dest('app/view/css'));
});

gulp.task('default', [
  'styles'
]);
