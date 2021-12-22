import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    rolesState: {},
    pagination: {},
    offset: 4,
    dialog: false,
    //loading: true,
    buscar: '',
    title: 'Roles',
    category: 'Información exclusiva del administrador del sistema'
  },

  getters: {
    getField,
    dialog: state => state.dialog,
  },

  mutations: {
    updateField,

    GET_ROLES(state, rolesAccion) {
      state.rolesState = rolesAccion
    },
    GET_PAGINATION(state, rolesAccion) {
      state.pagination = rolesAccion
    },
    REFRESH_ROLES(state, rol) {
      state.rolesState.push(rol)
    },
    OPEN_DIALOG(state) {
      state.dialog = true
    },
    CLOSE_DIALOG(state) {
      state.dialog = false
    },
    GET_USER(response) {
      console.log(response)
     // state.usersState = usersAccion
    },
  },

  actions: {
    async getRoles({ dispatch, commit, state }, page) {
      let url = '/roles?page='+ page + '&buscar='+ state.buscar
      let load = {loading: false, fullPage: false}
      await axios.get(url)
        .then((response) => {
          commit('GET_ROLES', response.data.roles)
          commit('GET_PAGINATION', response.data.pagination)
          dispatch('loading/loading', load, { root: true })
        })
        .catch(function(error){
          commit('SET_CONSTITUENCY', null);
        })
    },

    async loading({ commit }) {
      commit('LOADING')
    },

    async addUser({ commit }, userData) {
      const response = await axios.post('/users/add', userData)
      commit('CLOSE_DIALOG')
      commit('REFRESH_USERS', response.data.user)
    },
    // async getUser(id) {
    //   console.log(id)
    //   const response = await axios.get(`/user/${id}`)
    //   console.log(response.data)
    // commit('GET_USER', response.data)
    // const response = await axios.get('/user/', { id: id })
    // console.log(response)
    // commit('CLOSE_DIALOG')
    // commit('REFRESH_USERS', response.data.user)
    // },
    getUser(ctx, { id }) {
      console.log(id)
      // return new Promise((resolve, reject) => {
      //   axios
      //     .get(`/user/${id}`)
      //     .then(response => resolve(console.log(response)))
      //     .catch(error => reject(error))
      // })
    },
    async openDialog({ commit }) {
      commit('OPEN_DIALOG')
    },
    async closeDialog({ commit }) {
      commit('CLOSE_DIALOG')
    },
  },
}
