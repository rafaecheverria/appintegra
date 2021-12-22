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
      departamento_id: '',
      region_id: '',
      cargo_id: ''
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
    REFRESH_USERS(state, user) {
      state.usersState.push(user)
    },
    CLEAR_FORM(state) {
      state.form.rut = ''
      state.form.nombres = ''
      state.form.apellidos = ''
      state.form.email = ''
      state.form.fecha_nacimiento = ''
      state.form.genero = ''
      state.form.direccion = ''
      state.form.departamento_id = ''
      state.form.region_id = ''
      state.form.cargo_id = ''
    },
    GET_USER(response) {
      console.log(response)
     // state.usersState = usersAccion
    },
  },

  actions: {
    async getUsers({ dispatch, commit, state }, page) {
      let url = '/users?page='+ page + '&buscar='+ state.buscar
      let load = { loading: false, fullPage: false }
      await axios.get(url)
        .then((response) => {
          commit('GET_USERS', response.data.users)
          commit('GET_PAGINATION', response.data.pagination)
          dispatch('loading/loading', load, { root: true })
        })
        .catch(function(error){
          commit('SET_CONSTITUENCY', null);
          this.$router.push({name: 'login'})
        })
    },

    async addUser({ commit }, userData) {
      let url = '/users/add'
      await axios.post(url, userData)
      .then((response) => {
      commit('REFRESH_USERS', response.data.user)
      commit('CLEAR_FORM')
      this.$router.push({name: 'Usuarios'})
      })
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

    clearForm({ commit }) {
      commit('CLEAR_FORM')
    },
  },
}
