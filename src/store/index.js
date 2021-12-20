import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users'
import roles from './roles'
import permisos from './permisos'
import loading from './loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    roles,
    permisos,
    loading
  },
})
