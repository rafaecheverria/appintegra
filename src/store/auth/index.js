import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    permisos: []
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    /*authenticated(state) {
      return state.token && state.user
    },*/
    user(state) {
      return state.user
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_PERMISOS(state, permisos) {
      state.permisos = permisos
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
  },

  actions: {
    async login({ dispatch, commit}, credentials) {
      const response = await axios.post('auth/login', credentials)
      commit("SET_USER", response.data.usuario.nombres);
      commit('SET_TOKEN', response.data.token)
      commit('SET_PERMISOS', response.data.permisos)
    },

    async attempt({ commit, state }, token) {
      // envía headers por intermedio de subscriber.js
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }
      try {
        const response = await axios.get('auth/user')
        commit('SET_USER', response.data)
      } catch (e) {
        console.log("la sesion expiró")
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_PERMISOS', [])
      }
    },

    async logout({ commit }) {
      return axios.post('auth/logout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    },
  },
  modules: {},
}
