var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var moment = require('moment');
var through = require('through2');
var fs = require('fs');

gulp.task('copy', () => {

  // List of files to copy
  let vendors = [
    'angular/angular.min.js',
    'angular/angular.min.js.map',
    'angular-ui-router/release/angular-ui-router.min.js',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/css/bootstrap.min.css.map',
  ];

  let copy = () => {
    // Append directory of node_modules and add to locations
    for (let it = 0; it < vendors.length; it++) {
      let file = './node_modules/' + vendors[it];
      let tokens = vendors[it].split('/');

      // Remove the last value
      tokens.pop();

      // Join the array to a string
      let path = tokens.join('/');

      let dest = './server/public/vendor/' + path;
      gulp.src(file).pipe(gulp.dest(dest));
    }
  }

  return copy();
});

gulp.task('sass', () => {
  let compile = () => {
    // Client
    gulp.src('./src/client/sass/**/*.scss')
      .pipe(concat('client.min.css'))
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(gulp.dest('./server/public/assets/css'));

    // Admin
    gulp.src('./src/admin/sass/**/*.scss')
      .pipe(concat('admin.min.css'))
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(gulp.dest('./server/public/assets/css'));
  }
  return compile();
});

gulp.task('uglify-client', () => {
    return gulp.src('./src/client/js/**/*.js')
      .pipe(uglify())
      .on('error', notify.onError("Error: <%= error.message %>"))
      .pipe(concat('client'))
      .pipe(through.obj((file, enc, cb) => {
        let contents = file.contents.toString();
        let oneLine = contents.split('\n').join('');

        file.contents = new Buffer(oneLine)

        cb(null, file);
      }))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest('./server/public/assets/js'))
});

gulp.task('uglify-admin', () => {
  return gulp.src('./src/admin/js/**/*.js')
    .pipe(uglify())
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(concat('admin'))
    .pipe(through.obj((file, enc, cb) => {
      let contents = file.contents.toString();
      let oneLine = contents.split('\n').join('');

      file.contents = new Buffer(oneLine)

      cb(null, file);
    }))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest('./server/public/assets/js'))
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.scss', ['sass']);

  gulp.watch('./src/client/**/*.js', ['uglify-client']);
  gulp.watch('./src/admin/**/*.js', ['uglify-admin']);
});

gulp.task('start', () => {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    ignore: [
      'src/',
      'server/public/'
    ]
  }).on('crash', () => {
    gulp.src('./server/server.js')
      .pipe(notify('Server crashed (' + moment().format('MMM Do h:mm:ss A') + ')'))
  })
})

gulp.task('default', ['copy', 'sass', 'uglify-client', 'uglify-admin', 'watch', 'start']);
