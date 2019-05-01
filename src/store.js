import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expandState: 'expand-' + Date.now
  },
  mutations: {
    expand (state, val) {
      state.expandState = val
    }
  },
  actions: {

  }
})
