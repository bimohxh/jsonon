Vue.component('vue-item', {
  props: ['jsondata'],
  template: '#item-template'
})

Vue.component('vue-outer', {
  props: ['jsondata'],
  template: '#outer-template'
})

Vue.component('vue-expand', {
  props: [],
  template: '#expand-template'
})

Vue.component('vue-val', {
  props: ['field', 'val'],
  template: '#val-template'
})


Vue.use({
  install: function (Vue, options) {
    // 判断数据类型
    Vue.prototype.getTyp = function (val) {
      return toString.call(val).split(']')[0].split(' ')[1]
    }

    // 判断是否是对象或者数组，以对下级进行渲染
    Vue.prototype.isObjectArr = function (val) {
      return ['Object', 'Array'].indexOf(this.getTyp(val)) > -1
    }

    // 折叠
    Vue.prototype.fold = function ($event) {
      var target = Vue.prototype.expandTarget($event)
      target.siblings('svg').show()
      target.hide().parent().siblings('.expand-view').hide()
      target.parent().siblings('.fold-view').show()
      
    }

     // 展开
    Vue.prototype.expand = function ($event) {
      var target = Vue.prototype.expandTarget($event)
      target.siblings('svg').show()
      target.hide().parent().siblings('.expand-view').show()
      target.parent().siblings('.fold-view').hide()
    }

    //获取展开折叠的target
    Vue.prototype.expandTarget = function ($event) {
      switch($event.target.tagName.toLowerCase()) {
        case 'use':
          return $($event.target).parent()
        case 'label':
          return $($event.target).closest('.fold-view').siblings('.expand-wraper').find('.icon-square-plus').first()
        default:
          return $($event.target)
      }
    }

    // 格式化值
    Vue.prototype.formatVal = function (val) { 
      switch(Vue.prototype.getTyp(val)) {
        case 'String':
          return '"' + val + '"'
          break

        case 'Null': 
          return 'null'
          break

        default:
          return val

      }
    }
  }
})

var App = new Vue({
  el: '#app',
  data: {
    jsoncon: '{}',
    jsonhtml: [{
        "name": "hello",
        "favors": [
          {
            "name": "Basketball",
            "year": 10
          }, {
            "name": "play game",
            "year": 32
          }
        ],
        "child": {
          "name": "hxh",
          "age": 43,
          "isboy": true,
          "classmates": {
            "age": 42
          }
        }
    }]
  },
  methods: {
    
  },
  watch: {
    jsoncon: function () {
      try {
        //App.jsonhtml = Parse.structHtml(JSON.parse(this.jsoncon))
        App.jsonhtml = JSON.parse(this.jsoncon)
      } catch (err) {
        App.jsonhtml = err.message
      }
    }
  }
})


