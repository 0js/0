'use strict'

module.exports = function () {
  return new Promise(function (resolve, reject) {
    let conf = require('./config.json')

    let fs = require('fs')
    let request = require('request-promise')
    let r = require('./_libs/requirejs/2.21.0.json')

    let build = function (r) {
      let mirrors = []

      let paths = {}
      let shim = {}
      let libs = fs.readdirSync('./_libs')
      for (let lib of libs) {
        let version = fs.readdirSync('./_libs/' + lib)
        let json = require('./_libs/' + lib + '/' + version)
        // remove '.js' from path
        let path
        if (!json.local) {
          path = json.src.substring(0, json.src.length - 3)
        } else {
          path = conf.url + conf.mirrors + json.src
          mirrors.push(json.src)
        }
        paths[json.name] = path
        if (json.shim) {
          shim[json.name] = {exports: json.shim.exports}
        }
      }

      let out = r
      out +=
      `requirejs.config({
        'paths': ${JSON.stringify(paths)},
        'shim': ${JSON.stringify(shim)}
      })`
      return out
    }

    request(r.src)
    .then(function (rr) {
      resolve(build(rr))
    })
    .catch(console.log)
  })
}
