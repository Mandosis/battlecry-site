var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

gulp.task('copy', () => {

  // List of files to copy
  let vendors = [
    'angular/angular.min.js',
    'angular/angular.min.js.map',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/css/bootstrap.min.css.map',
  ];

  let copy = () => {
    // Append directory of node_modules and add to locations
    for (let it = 0; it < vendors.length; it++) {
      let file = './node_modules/' + vendors[it];
      let dest = './server/public/vendor/' + vendors[it];
      gulp.src(file).pipe(gulp.dest(dest));
    }
  }

  return copy();
});

gulp.task('sass', () => {
  return gulp.src('./client/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./server/public/assets/css'));
});

gulp.task('uglify', () => {
  return gulp.src('./client/js/**/*.js')
    .pipe(concat('client.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./server/public/assets/js'));
});

gulp.task('watch', () => {
  gulp.watch('./client/sass/**/*.scss', ['sass']);
  gulp.watch('./client/js/**/*.js', ['uglify']);
});

gulp.task('start', () => {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    ignore: [
      'client/',
      'server/public/'
    ]
  }).on('restart', () => {
    // console.log('Server restarted');
  });
})

gulp.task('default', ['copy', 'sass', 'uglify', 'watch', 'start']);
