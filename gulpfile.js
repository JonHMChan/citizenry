const gulp      = require('gulp');
const uglify    = require('gulp-uglify');
const sass      = require('gulp-ruby-sass');
const babel     = require('gulp-babel');
const pump      = require('pump');

/* ----------------------------------------------------------------------------
 * Instructions
 * ------------------------------------------------------------------------- */

gulp.task('default', () => {
    console.log(" ")
    console.log("You can run the following commands:")
    console.log("-----------------------------------------")
    console.log("    `gulp assets` - processes and watches web asset changes (.sass, .js, and images)")
    console.log(" ")
})

/* ----------------------------------------------------------------------------
 * Assets
 * ------------------------------------------------------------------------- */

// Start watch
gulp.task('assets', ['assets:sass', 'assets:buildjs', 'assets:minifyjs'], function() {
    gulp.watch('static/css/src/**/*.scss',['assets:sass']);
    gulp.watch('static/js/src/**/*.js',['assets:buildjs']);
    gulp.watch('static/js/dist/**/*.js',['assets:minifyjs']);
});

// Compile Sass into css
gulp.task('assets:sass', () =>
    sass('static/css/src/**/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('static/css/dist'))
);

// Compile ES2015
gulp.task('assets:buildjs', () => {
    return gulp.src('static/js/src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('static/js/dist/'));
});

// Minify javascript
gulp.task('assets:minifyjs', function (cb) {
  pump([
        gulp.src('static/js/dist/**/*.js'),
        uglify(),
        gulp.dest('static/js/dist/')
    ],
    cb
  );
});