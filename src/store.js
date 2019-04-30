import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: {}
  },
  mutations: {
    login (state, val) {
      state.session = val
    }
  },
  actions: {

  }
})
