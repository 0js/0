'use strict'

require('dotenv').load()

let conf = require('./config.json')
let fs = require('fs')
let aws = require('aws-sdk')
var s3bucket = new aws.S3({ params: {Bucket: process.env.AWS_S3_BUCKET} })

let check_extension = function (file, extension) {
  return extension === file.substr(file.length - extension.length, file.length)
}

let dist = fs.readdirSync(conf.dist)
for (let file of dist) {
  if (file === '.git') continue
  let contents = fs.readFileSync(conf.dist + '/' + file)

  let content_type
  if (check_extension(file, 'js')) content_type = 'application/javascript'
  if (check_extension(file, 'html')) content_type = 'text/html'
  var params = {
    'Bucket': process.env.AWS_S3_BUCKET,
    'Key': file,
    'Body': contents,
    'ContentType': content_type,
    'ACL': 'public-read'
  }
  console.log(params)
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log('Error uploading data:', err)
    } else {
      console.log('Successfully uploaded data')
    }
  })
}
