var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    inject = require('gulp-inject'),
    path = require('path');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './public'
        }
    });
});

gulp.task('inject', function () {
    return gulp.src('./public/*.html')
        .pipe(inject(gulp.src('./public/css/*.css', {read: false}), {
                ignorePath: 'public',
                relative: true
            }))
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream:true}));
});

gulp.task('jade', function(){
    gulp.src('./jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
    return sass('./scss/')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function(){
    gulp.watch('./jade/*.jade', ['jade']);
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./public/*.html', ['inject']);

});

gulp.task('default', ['jade', 'sass', 'inject', 'watch', 'browser-sync']);
