var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var albumService = require('./services/album-service');

// Error handling.
var imageConversionError = function(error) {
    console.log('An error has occurred:');
    console.log('Could not convert images.'
        + ' You probably do not have ImageMagick installed.'
    );
};

gulp.task('minify-css', function() {
    return gulp.src(['assets/css/*.css', '!assets/css/*.min.*'])
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('create-small-committee-images', function() {
    return gulp.src(['assets/images/committee/*.*', '!assets/images/committee/*.*.*'])
        .pipe(imageResize({
            imageMagick: true,
            width: 200,
            height: 200,
            crop: true,
            upscale: true,
            format: 'jpg',
            quality: 0.8,
            filter: 'Catrom'
        }))
            .on('error', imageConversionError)
        .pipe(rename({
            suffix: '.small'
        }))
        .pipe(gulp.dest('assets/images/committee'));
});

gulp.task('assign-album-thumbnails', function() {
    albumService.assignThumbnails();
});

gulp.task('format-album-thumbnails', function() {
    return gulp.src('assets/images/gallery/**/_.thumbnail.jpg', { base: './' })
        .pipe(imageResize({
            imageMagick: true,
            width: 200,
            height: 200,
            crop: true,
            upscale: true,
            format: 'jpg',
            quality: 0.8,
            filter: 'Catrom'
        }))
            .on('error', imageConversionError)
        .pipe(gulp.dest('.'));
});

gulp.task('create-small-gallery-images', function() {
    return gulp.src(['assets/images/gallery/**/*.*', '!assets/images/gallery/**/*.*.*'])
        .pipe(imageResize({
            imageMagick: true,
            width: 150,
            height: 150,
            crop: true,
            upscale: true,
            format: 'jpg',
            quality: 0.8,
            filter: 'Catrom'
        }))
            .on('error', imageConversionError)
        .pipe(rename({
            suffix: '.small'
        }))
        .pipe(gulp.dest('assets/images/gallery'));
});

gulp.task('create-large-gallery-images', function() {
    return gulp.src(['assets/images/gallery/**/*.*', '!assets/images/gallery/**/*.*.*'])
        .pipe(imageResize({
            imageMagick: true,
            height: 720,
            upscale: true,
            format: 'jpg',
            quality: 0.8,
            filter: 'Catrom'
        }))
            .on('error', imageConversionError)
        .pipe(rename({
            suffix: '.large'
        }))
        .pipe(gulp.dest('assets/images/gallery'));
});

gulp.task('generate-gallery', [
    'assign-album-thumbnails',
    'format-album-thumbnails',
    'create-small-gallery-images',
    'create-large-gallery-images'
]);

gulp.task('default', [
    'minify-css',
    'create-small-committee-images',
    'generate-gallery'
]);