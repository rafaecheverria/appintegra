import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users'
import roles from './roles'
import permisos from './permisos'
import loading from './loading'
import regiones from './regiones'
import departamentos from './departamentos'
import cargos from './cargos'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    roles,
    permisos,
    loading,
    regiones,
    departamentos,
    cargos
  },
})
