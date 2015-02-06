var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    inject = require('gulp-inject'),
    changed     = require('gulp-changed');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './public'
        }
    });
});

gulp.task('images', function() {
    return gulp.src('./assets/images/**/*')
        .pipe(changed('./public/images'))
        .pipe(gulp.dest('./public/images'));
});

gulp.task('copy:fonts', function() {
    return gulp.src('./assets/fonts/*')
        .pipe(gulp.dest('./public/css/fonts'));
});

gulp.task('jade', function(){
    gulp.src('./views/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
    return sass('./scss/', {
            style: 'compact'
        }).on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream:true}));

});

gulp.task('watch', function(){
    gulp.watch('./views/*.jade', ['jade']);
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./assets/images/**/*', ['images']);
    gulp.watch('./assets/fonts/*', ['copy:fonts']);

});

gulp.task('default', ['jade', 'sass', 'images', 'copy:fonts', 'watch', 'browser-sync']);
