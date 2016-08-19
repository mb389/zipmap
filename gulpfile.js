var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha'); //backend
var karma = require('gulp-karma');
var istanbul = require('gulp-istanbul');
var notify = require('gulp-notify');
var Server = require('karma').Server; // frontend

var environments = require('gulp-environments');

var development = environments.development;
var production = environments.production;
/** load config file based on enviroment */
var configFile = production() ? "./src/env/prod.js" : "./src/env/dev.js";


gulp.task('lint', function() {
  return gulp.src('./src/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
	return gulp.src(['./src/assets/**/*.js',configFile])
      .pipe(babel())
			.pipe(uglify())
			.pipe(concat('vendor.min.js'))
			.pipe(gulp.dest('./public/'));
});


gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./src/app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/'));
})

gulp.task('copy', ['browserify','scss'], function() {
    gulp.src(['./src/**/*.html','./src/**/*.css'])
        .pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});

gulp.task('scss', function() {
    gulp.src('./src/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/stylesheets/'));
});

gulp.task('build',['lint', 'scss', 'copy', 'scripts']);

gulp.task('browser-sync', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./public",
			// The key is the url to match
			// The value is which folder to serve (relative to your current working directory)
			routes: {
				"/bower_components": "bower_components",
				"/node_modules": "node_modules"
			}
        },
		browser:"chrome"
    });
});


/**
 * Run test once and exit
 */

gulp.task('test',['testBrowserJS']);

// gulp.task('testServerJS', function (done) {
//   return gulp.src('./src/test/server/*.js',{read: false})
//   .pipe(mocha({reporter: 'spec'}));
// });

gulp.task('testBrowserJS', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();

});

gulp.task("heroku:prod", ['default']);



gulp.task('default', ['browser-sync'], function(){

	gulp.watch("./src/**/*.*", ["build"]);
	gulp.watch("./public/**/*.*").on('change', browserSync.reload);
})
