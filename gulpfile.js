var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('minify-css', function() {
    return gulp.src(['assets/css/*.css', '!assets/css/*.min.*'])
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['minify-css']);