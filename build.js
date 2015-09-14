'use strict'

module.exports = function () {
  return new Promise(function (resolve, reject) {
    let request = require('request-promise')

    let parse_libs = require('./parse_libs')

    let r = require('./_libs/requirejs/2.21.0.json')
    request(r.src)
    .then(function (r_src) {
      parse_libs()
      .then(function (parsed) {
        let out = {
          zero: r_src +
            `requirejs.config({
              'paths': ${JSON.stringify(parsed.paths)},
              'shim': ${JSON.stringify(parsed.shim)}
            })`,
          mirrors: parsed.mirrors
        }
        resolve(out)
      })
    })
    .catch(console.log)
  })
}
