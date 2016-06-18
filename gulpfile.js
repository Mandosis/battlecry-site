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

gulp.task('uglify', () => {
  let compile = () => {
    // Client
    gulp.src('./src/client/js/**/*.js')
      .pipe(concat('client.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./server/public/assets/js'));

    // Admin
    gulp.src('./src/admin/js/**/*.js')
      .pipe(concat('admin.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./server/public/assets/js'));
  }

  return compile();
});

gulp.task('watch', () => {
  gulp.watch('./src/client/sass/**/*.scss', ['sass']);
  gulp.watch('./src/admin/sass/**/*.scss', ['sass']);

  gulp.watch('./src/client/js/**/*.js', ['uglify']);
  gulp.watch('./src/admin/js/**/*.js', ['uglify']);
});

gulp.task('start', () => {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    ignore: [
      'src/',
      'server/public/'
    ]
  }).on('restart', () => {
    // console.log('Server restarted');
  });
})

gulp.task('default', ['copy', 'sass', 'uglify', 'watch', 'start']);
