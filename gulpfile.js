var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var nodemon = require('gulp-nodemon');

var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/styles.css',
  IMAGES: 'src/images/*.png',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_JS: 'dist/js',
  DEST_CSS: 'dist/css',
  DEST_IMAGES: 'dist/images',
  ENTRY_POINT: './src/js/Game.jsx'
};

// Copy index.html to dist
gulp.task('copy', function(){
  // HTML
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
  // CSS
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_CSS));
  // Images
  gulp.src(path.IMAGES)
    .pipe(gulp.dest(path.DEST_IMAGES));
});

// Watch files
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.CSS, ['copy']);
  gulp.watch(path.IMAGES, ['copy']);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_JS))
      console.log('JSX Recompiled!');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

// Build for production
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

// Replace html
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
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

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['copy', 'startServer', 'watch']);
