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
import alerta from './alerta'
import createPersistedState from 'vuex-persistedstate'

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
    cargos,
    alerta
  },
  plugins: [createPersistedState()],
})
