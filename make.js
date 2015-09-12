'use strict'

let fs = require('fs')
let paths = {}
let shim = {}

let libs = fs.readdirSync('./_j')
for (let lib of libs) {
  let version = fs.readdirSync('./_j/' + lib)
  let json = require('./_j/' + lib + '/' + version)
  // remove '.js' from path
  let path = json.src.substring(0, json.src.length - 3)
  paths[json.name] = path
  if (json.shim) {
    shim[json.name] = {exports: json.shim.exports}
  }
}

let out =
`requirejs.config({
  'paths': ${JSON.stringify(paths)},
  'shim': ${JSON.stringify(shim)}
})`

fs.writeFileSync('dist/config.js', out)
