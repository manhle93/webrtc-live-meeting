import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import users from './modules/users'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    sidebar,
    users
  }
})
