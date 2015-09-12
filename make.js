'use strict'

let fs = require('fs')
let request = require('request-promise')
let uglify = require('uglify-js')
let r = require('./_libs/requirejs/2.21.0.json')

let build = function (r) {
  let out = r

  let paths = {}
  let shim = {}
  let libs = fs.readdirSync('./_libs')
  for (let lib of libs) {
    let version = fs.readdirSync('./_libs/' + lib)
    let json = require('./_libs/' + lib + '/' + version)
    // remove '.js' from path
    let path = json.src.substring(0, json.src.length - 3)
    paths[json.name] = path
    if (json.shim) {
      shim[json.name] = {exports: json.shim.exports}
    }
  }

  out +=
  `requirejs.config({
    'paths': ${JSON.stringify(paths)},
    'shim': ${JSON.stringify(shim)}
  })`

  let ast = uglify.parse(out)
  ast.figure_out_scope()
  let compressor = uglify.Compressor()
  ast = ast.transform(compressor)
  out = ast.print_to_string()
  fs.writeFileSync('gh-pages/0.js', out)
}

request(r.src)
.then(build)
.catch(console.log)
