import axios from 'axios'
import Vue from 'vue'
const env = require('../../env')

var Axios = {}
var store = require('store')

let axiosreq = function (pagination) {
  let _config = {
    baseURL: env.api, // Config.api,
    headers: {
      token: (store.get('login') || {}).token
    }
  }
  if (pagination) {
    let _pagesize = pagination.pageSize || 15
    _config.params = {
      offset: ((pagination.page || 1) - 1) * _pagesize,
      limit: _pagesize,
      show_total_count: true
    }
  }
  return axios.create(_config)
}

Axios.install = function (Vue) {
  Vue.prototype.$axios = function (hideAlert) {
    return ['get', 'post', 'patch', 'put', 'delete'].reduce((result, method) => {
      result[method] = async (...params) => {
        try {
          let res = await axiosreq()[method](...params)
          if (res.data.status !== 200 && !hideAlert) {
            this.$message({
              message: res.data.message || '未知错误',
              duration: 2000,
              type: 'error'
            })
          }
          return res
        } catch (ex) {
          this.$message({
            message: ex.message || '未知错误',
            duration: 2000,
            type: 'error'
          })
          return {}
        }
      }
      return result
    }, {})
  }
}

Vue.use(Axios)
