'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var paths = ['app/**','*.js', 'routes/*.js','lib/**', 'models/*.js', 'app/controllers/*', '*.html','css/*'];
var sources = {
  js: ['./app/**.js', './app/controllers/**'],
  test: './test/*_spec.js',
  wp: ['./app/**.js', './app/controllers/**','./app/directives/**', 'lib/**', './app/services/**']
}
// wp: ['node_modules/angular/angular.js','node_modules/angular-route/angular-route.js', './app/**.js', './app/controllers/**','./app/directives/**', 'lib/**', './app/services/**']

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  gulp.watch(paths,['build','buildtemplates', 'buildcss','webpack']);
});

gulp.task('lint', function(){
  return gulp.src(paths)
  .pipe(eslint({
    rules: {
      'no-console': 0,
      'indent': [
        2,
        2
      ],
      'quotes': [
        2,
        'single'
      ],
      'linebreak-style': [
        2,
        'unix'
      ],
      'semi': [
        2,
        'always'
      ]
    },
    env: {
      'es6': true,
      'node': true,
      'browser': true
    },
    globals: {
      'describe': false,
      'it': false,
      'beforeEach': false,
      'afterEach': false,
      'before': false,
      'after': false
    },
    ecmaFeatures: {
      'modules': true,
      'experimentalObjectRestSpread': true
    },
    'extends': 'eslint:recommended'
  }))
  .pipe(eslint.format());
});

gulp.task('mocha', function() {
  return gulp.src('test/', {read: false})
  .pipe(mocha({reporter: 'progress'}));
});

gulp.task('build', function() {
  return gulp.src(['./index.html'])
  .pipe(gulp.dest('./build/'));
});

gulp.task('buildcss', function(){
  return gulp.src(['css/*'])
  .pipe(gulp.dest('./build/css'));
});

gulp.task('buildtemplates', function(){
  return gulp.src(['app/templates/**'])
  .pipe(gulp.dest('./build/templates'))
})


// gulp.task('buildmodules', function(){
//   return gulp.src(['node_modules/angular/angular.js'])
//   .pipe(gulp.dest('./build/node_modules/angular'));
// });
gulp.task('bundle:test', () => {
  return gulp.src(sources.test)
  .pipe(webpack({output: {filename: 'test_bundle.js'}}))
  .pipe(gulp.dest('./test'));
})

gulp.task('webpack', function() {
  return gulp.src(sources.wp)
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build/'));
});
