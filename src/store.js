import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expandState: 'expand-' + Date.now,
    theme: {}
  },
  mutations: {
    expand (state, val) {
      state.expandState = val
    },
    setTheme (state, val) {
      let theme = {}
      let index = 0

      ;['key', 'String', 'Number', 'Boolean', 'Null', 'link-link'].forEach(key => {
        theme[key] = val[index]
        index++
      })
      
      state.theme = {
        obj: theme,
        arr: val
      }
    }
  },
  actions: {

  }
})
