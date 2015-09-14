'use strict'

let parse_libs = function () {
  let conf = require('./conf.json')

  let fs = require('fs')

  let semver = require('./semver')

  let mirrors = []
  let paths = {}
  let shim = {}

  let libs = fs.readdirSync('./_libs')

  for (let lib of libs) {
    // TODO: make it fail more loudly if there's no [verison].json
    let json = require(semver.latest(lib))

    // compute path
    let path
    if (!json.local) {
      path = json.src.substring(0, json.src.length - 3)
    } else {
      path = conf.url + conf.mirrors + json.src
      mirrors.push(json.src)
    }
    paths[json.name] = path

    // compute shim
    if (json.shim) {
      shim[json.name] = {exports: json.shim.exports}
    }
  }

  let parsed = {
    paths: paths,
    shim: shim,
    mirrors: mirrors
  }
  return parsed
}

module.exports = function () {
  return new Promise(function (resolve, reject) {
    let parsed = parse_libs()
    resolve(parsed)
  })
}
