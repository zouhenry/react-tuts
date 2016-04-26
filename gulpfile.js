var gulp   = require("gulp");
var react  = require("gulp-react");
var watch  = require('gulp-watch');
var concat = require('gulp-concat');
var clean  = require('del');

/*========================================
 =                 configs                =
 ========================================*/
var src = {
  jsx    : ["app/*.jsx",
    "app/app.jsx"],
  index  : ["app/index.html"],
  api    : ["app/api/*.json"],
  vendor : [
    "bower_components/marked/lib/marked.js",
    "bower_components/jquery/dist/jquery.js",
    "bower_components/lodash/dist/lodash.js",
    "bower_components/react/react.js",
    "bower_components/react/react-dom.js"
  ],
  dest   : "./www/",
  destJs : "./www/js/",
  destApi: "./www/api/"
};

/*========================================
 =                 taks                =
 ========================================*/
gulp.task('clean', function () {
  clean(src.destJs);
  clean(src.destApi);
  clean(src.dest);
});

gulp.task('vendor', function () {
  return gulp
    .src(src.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(src.destJs));
});

gulp.task('jsx', function () {
  return gulp
    .src(src.jsx)
    .pipe(react())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(src.destJs));
});

gulp.task('index', function () {
  return gulp
    .src(src.index)
    .pipe(gulp.dest(src.dest));
});

gulp.task('api', function () {
  return gulp
    .src(src.api)
    .pipe(gulp.dest(src.destApi));
});

gulp.task('watch', function () {

  watch(src.jsx, function () {
    gulp.start('jsx');
  });

  watch(src.index, function () {
    gulp.start('index');
  });
});

gulp.task('default', ['clean', 'api', 'vendor', 'jsx', 'index', 'watch']);