// gulpfile.js
'use strict'

require('dotenv').load()

// modules
let gulp = require('gulp')
let del = require('del')
let uglify = require('gulp-uglify')
let gzip = require('gulp-gzip')
let make = require('./make')
let fs = require('fs')
let s3 = require('gulp-s3')
let conf = require('./conf.json')

// tasks

gulp.task('del', function () {
  return new Promise(function (resolve, reject) {
    del.sync('./dist/**/*')
    resolve()
  })
})

gulp.task('zero', ['del'], function () {
  return new Promise(function (resolve, reject) {
    make()
    .then(function (made) {
      fs.writeFileSync('dist/0.js', made.js)
      fs.writeFileSync('dist/mirrors.json', JSON.stringify(made.mirrors))
      resolve()
    })
    .catch(console.log)
  })
})

gulp.task('m', ['zero'], function () {
  // return new Promise(function (resolve, reject) {
  //   let mirrors = require('./dist/mirrors.json')
  //   for (let mirror of mirrors) {
  //     gulp.src(`./_mirrors/${mirror}/**/*`)
  //     .pipe(gulp.dest(`./dist/${conf.mirrors}${mirror}/`))
  //   }
  //   resolve('done!')
  // })
  return gulp.src('./_mirrors/**/*')
  .pipe(gulp.dest(`./dist/${conf.mirrors}`))
})

gulp.task('uglify', ['m', 'zero'], function () {
  return gulp.src('./dist/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'))
})

gulp.task('gzip-json', ['m'], function () {
  return gulp.src('./dist/**/*.json')
  .pipe(gzip({append: true}))
  .pipe(gulp.dest('dist/'))
})

gulp.task('gzip-js', ['uglify'], function () {
  return gulp.src('./dist/**/*.js')
  .pipe(gzip({append: true}))
  .pipe(gulp.dest('dist/'))
})

gulp.task('pub', ['del'], function () {
  return gulp.src('./pub/**/*')
  .pipe(gulp.dest('dist/'))
})

gulp.task('gzip-html', ['m', 'pub'], function () {
  return gulp.src('./dist/**/*.html')
  .pipe(gzip({append: true}))
  .pipe(gulp.dest('dist/'))
})

gulp.task('s3', ['gzip'], function () {
  gulp.src(['./dist/**'])
  .pipe(s3(
    {
      'key': process.env.S3_ID,
      'secret': process.env.S3_SECRET,
      'bucket': process.env.S3_BUCKET,
      'region': process.env.S3_REGION
    }, {
      gzippedOnly: true
    }
  ))
})

gulp.task('gzip', ['gzip-html', 'gzip-js', 'gzip-json'])
gulp.task('default', ['gzip'])
