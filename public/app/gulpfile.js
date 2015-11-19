var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(done) {
    gulp.src('styles/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./'))
        .on('end', done);
});

gulp.task('default', ['sass']);