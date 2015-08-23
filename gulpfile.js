var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('minify-css', function() {
    gulp.src(['assets/css/*.css', '!assets/css/*.min.*'])
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('create-small-committee-images', function() {
    gulp.src(['assets/images/committee/*.*', '!assets/images/committee/*.*.*'])
        .pipe(imageResize({
            imageMagick: true,
            width: 200,
            height: 200,
            crop: true,
            upscale: true,
            format: 'jpeg',
            quality: 0.8,
            filter: 'Catrom'
        }))
        .pipe(rename({
            suffix: '.small',
            extname: '.jpg'
        }))
        .pipe(gulp.dest('assets/images/committee'));
});

gulp.task('create-small-gallery-images', function() {
    gulp.src(['assets/images/gallery/**/*.*', '!assets/images/gallery/**/*.*.*'])
        .pipe(imageResize({
            imageMagick: true,
            width: 150,
            height: 150,
            crop: true,
            upscale: true,
            format: 'jpeg',
            quality: 0.8,
            filter: 'Catrom'
        }))
        .pipe(rename({
            suffix: '.small',
            extname: '.jpg'
        }))
        .pipe(gulp.dest('assets/images/gallery'));
});

gulp.task('create-large-gallery-images', function() {
    gulp.src(['assets/images/gallery/**/*.*', '!assets/images/gallery/**/*.*.*'])
        .pipe(imageResize({
            imageMagick: true,
            height: 720,
            upscale: true,
            format: 'jpeg',
            quality: 0.8,
            filter: 'Catrom'
        }))
        .pipe(rename({
            suffix: '.large',
            extname: '.jpg'
        }))
        .pipe(gulp.dest('assets/images/gallery'));
});

gulp.task('create-album-thumbnails', function() {
    // TO-DO.
});

gulp.task('load-album-photos', function() {
    // TO-DO.
});

// Requires ImageMagick to be installed.
gulp.task('convert-images', [
    'create-small-committee-images',
    'create-small-gallery-images',
    'create-large-gallery-images',
    'create-album-thumbnails'
]);

gulp.task('run-all', [
    'minify-css',
    'convert-images',
    'load-album-photos'
]);

gulp.task('default', [
    'minify-css',
    'load-album-photos'
]);