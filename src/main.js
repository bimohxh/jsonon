import Vue from 'vue'
import App from './App.vue'
import './plugins/axios.js'
import router from './router'
import store from './store'
import Icon from './components/icon'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
