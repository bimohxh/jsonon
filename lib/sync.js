var path = require('path')
var approot = path.resolve(path.dirname(__dirname), 'app')
var qiniu = require('./qiniu')
var Helper = require('./helper')
var colors  = require('colors')

 

let actions = Helper.walk(approot).map(file => {
  return qiniu.forceUpload(file)
})


console.log('======开始同步======'.green)
Promise.all(actions).then(() => {
  console.log('======所有文件同步完成======'.green)
})