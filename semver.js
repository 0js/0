'use strict'

let fs = require('fs')

let SemVer = function () {
  let API = {}

  API.latest = function (lib) {
    let versions = fs.readdirSync(`./_libs/${lib}`)
    for (let version of versions) {
      // placeholder cuz we currently only have one version of everything
      return path(lib, version)
    }
  }

  let path = function (lib, version) {
    return `./_libs/${lib}/${version}`
  }

  return API
}

module.exports = new SemVer()
