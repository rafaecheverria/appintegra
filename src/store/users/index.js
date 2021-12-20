import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    usersState: {},
    pagination: {},
    offset: 4,
    dialog: false,
    loading: true,
    buscar: '',
    title: 'Usuarios',
    category: 'Información exclusiva del administrador del sistema',
    form: {
      nombres: '',
      apellidos: '',
      email: '',
      fecha_nacimiento: '',
      genero: '',
      direccion: '',
    }
  },

  getters: {
    getField,
  },
  mutations: {
    updateField,

    GET_USERS(state, usersAccion) {
      state.usersState = usersAccion
    },
    GET_PAGINATION(state, usersAccion) {
      state.pagination = usersAccion
    },
    SET_CURRENT_PAGE(state, data) {
      state.pagination.current_page = data;
    },
    REFRESH_USERS(state, user) {
      state.usersState.push(user)
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
    async getUsers({ dispatch, commit, state }, page) {
      let url = '/users?page='+ page + '&buscar='+ state.buscar
      await axios.get(url)
        .then((response) => {
          commit('GET_USERS', response.data.users)
          commit('GET_PAGINATION', response.data.pagination)
          dispatch('loading/loading', false, { root: true })
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
