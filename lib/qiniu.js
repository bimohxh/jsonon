var qn = require('qn')
var localEnv = require('../config/local_env.json')
var path = require('path')

var client = qn.create({
  accessKey: localEnv.qiniu.accessKey,
  secretKey: localEnv.qiniu.secretKey,
  bucket: localEnv.qiniu.bucket,
  origin: localEnv.qiniu.origin
})


let getFullName = (file) => {
  var approot = path.resolve(path.dirname(__dirname), 'app') + '/'
  return file.split(approot)[1]
}


var qiniu = {

  // 普通上传
  upload: function (file) { 
    let fullname = getFullName(file)
    return new Promise(resolve => {
      client.uploadFile(file, {key: fullname}, (err, result) => {
        if (err) {
          console.log('[失败]上传文件' + fullname + '失败')
        } else {
          console.log('[成功]上传文件' + fullname + '成功')
        }
        resolve()
      })
    })
  },

  // 删除
  delete: function (file) {
    let fullname = getFullName(file)
    return new Promise(resolve => {
      client.delete(fullname, function (err) {
        if (err) {
          console.log('[失败]删除文件' + fullname + '失败')
        } else {
          console.log('[成功]删除文件' + fullname + '成功')
        }
        resolve(file)
      })
    })
  },
  
  // 覆盖上传
  forceUpload: function (file) {
    return qiniu.delete(file).then(qiniu.upload)
  }
}

module.exports = qiniu