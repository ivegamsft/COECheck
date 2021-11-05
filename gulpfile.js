var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');

var del = require('del');
var fs = require('fs');
var minimist = require('minimist');
var path = require('path');

var paths = {
    scripts: [
        'public/app/app.js',
        'public/app/app.routes.js',
        'public/app/app.auth.js',
        'public/app/app.settings.js',
        'public/app/**/*.js'
    ],
    stylesheets: 'public/stylesheets/**/*',
    images: 'public/images/**/*'
};

// Scripts
gulp.task('scripts', function () {

    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/lib/js'));

});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.stylesheets, ['sass']);
});

// Zip the files into a web deployment package
var knownOptions = {
    string: 'packageName',
    string: 'packagePath',
    default: { packageName: "Package.zip", packagePath: path.join(__dirname, '_package') }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('sass', function () {
    return gulp.src('public/stylesheets/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('public/lib/css'));
});

gulp.task('imagemin', function () {
    var imgDst = './public/lib/img';

    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('imagemin', 'sass', 'scripts'));