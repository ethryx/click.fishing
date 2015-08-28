var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less');

var path = {
  WATCH_HTML: 'src/index.html',
  WATCH_CSS: ['src/css/*.less', 'src/css/**/*.less'],
  WATCH_IMAGES: ['src/images/*.png', 'src/images/*.jpg'],
  WATCH_FONTS: 'src/fonts/*.woff2',
  VENDOR_JS: ['src/js/vendor/*.js', 'src/js/vendor/**/*.js'],
  LESS_STYLES: 'src/css/styles.less',
  MINIFIED_OUT: 'bundle.min.js',
  OUT: 'bundle.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/js',
  DEST_JS: 'dist/js',
  DEST_JS_VENDOR: 'dist/js/vendor',
  DEST_CSS: 'dist/css',
  DEST_IMAGES: 'dist/images',
  DEST_FONTS: 'dist/fonts',
  ENTRY_POINT: 'src/js/Game.jsx'
};

// Copy index.html to dist
gulp.task('copyAssets', function(){
  // HTML
  gulp.src(path.WATCH_HTML)
    .pipe(gulp.dest(path.DEST));
  // Images
  gulp.src(path.WATCH_IMAGES)
    .pipe(gulp.dest(path.DEST_IMAGES));
  // Fonts
  gulp.src(path.WATCH_FONTS)
    .pipe(gulp.dest(path.DEST_FONTS));
  // Vendor JS
  gulp.src(path.VENDOR_JS)
    .pipe(gulp.dest(path.DEST_JS_VENDOR));
});

// Process styles (LESS)
gulp.task('less', function() {
  return gulp
    .src(path.LESS_STYLES)
    .pipe(less({
      paths: [ __dirname + '/src/css' ]
    }))
    .pipe(gulp.dest(path.DEST_CSS));
});

// Watch files
gulp.task('watch', function() {
  gulp.watch(path.WATCH_HTML, ['copyAssets']);
  gulp.watch(path.WATCH_CSS, ['less']);
  gulp.watch(path.WATCH_IMAGES, ['copyAssets']);
  gulp.watch(path.WATCH_FONTS, ['copyAssets']);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle().on('error', function(err) { console.log(err.message); })
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_JS));
      console.log('JSX Recompiled!');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

// Build for production
gulp.task('buildJs', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.OUT))
    //.pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

// Replace html
gulp.task('replaceHTML', function(){
  gulp.src(path.WATCH_HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('startServer', function() {
  nodemon({
    script: 'server/app.js',
    ignore: ['dist', 'node_modules', 'src', 'gulpfile.js']
  });
});

gulp.task('production', ['buildJs', 'copyAssets', 'less', 'startServer']);

gulp.task('default', ['copyAssets', 'less', 'startServer', 'watch']);
