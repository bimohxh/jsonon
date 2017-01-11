Vue.component('vue-item', {
  props: ['jsondata'],
  template: '#item-template'
})

var App = new Vue({
  el: '#app',
  data: {
    jsoncon: '{}',
    jsonhtml: {
        "name": "hello",
        "child": {
          "name": "hxh",
          "classmates": {
            age: 42
          }
        }
      }
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


