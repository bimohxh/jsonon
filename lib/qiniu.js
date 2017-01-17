let qn = require('qn')
let localEnv = require('../config/local_env.json')

let client = qn.create({
  accessKey: localEnv.accessKey,
  secretKey: localEnv.secretKey,
  bucket: localEnv.bucket,
  origin: localEnv.origin
})


export default {
  upload: (file) => {
    client.uploadFile(file, {key: 'qn/lib/client.js'}, (err, result) => {
      console.log(result)
    })
  }
}