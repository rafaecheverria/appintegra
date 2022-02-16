import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    usersState: {},
    pagination: {},
    errores: {},
    offset: 4,
    dialog: false,
    loading: true,
    load: { loading: false, fullPage: false },
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
      departamentos: {},
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

    GET_USER(state, data) {
      //state.form.push(data)
      state.form.rut = data.user.rut
      state.form.nombres = data.user.nombres
      state.form.apellidos = data.user.apellidos
      state.form.email = data.user.email
      state.form.fecha_nacimiento = data.user.fecha_nacimiento
      state.form.genero = data.user.genero
      state.form.direccion = data.user.direccion
      state.form.region_id = data.user.region_id
      state.form.cargo_id = data.user.cargo_id
      state.form.departamento_id = data.user.departamento_id
    },
  },

  actions: {
    async getUsers({ dispatch, commit, state }, page) {
      let url = '/users?page='+ page + '&buscar='+ state.buscar
      await axios.get(url)
        .then((response) => {
          commit('GET_USERS', response.data.users)
          commit('GET_PAGINATION', response.data.pagination)
          dispatch('loading/loading', state.load, { root: true })
        })
        .catch(function(error){
          commit('SET_CONSTITUENCY', null);
          this.$router.push({name: 'login'})
        })
    },

    async addUser({ commit, dispatch, state, rootState}, userData) {
      let up = rootState.alerta.up
      let down = rootState.alerta.down
      let url = '/users/add'
      await Swal.fire(up).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            down.guardado,
            down.descripcion,
            down.tipo
          )
          axios.post(url, userData)
          .then((response) => {
            console.log(response)
            }).catch(error => {
              if(error.response.status == 422){
                let data = error.response.data.errors
                Object.keys(data).forEach(
                  key=>{
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: data[key][0],
                    })
                  // console.log(data[key][0])
                  }
                )
              }
          })
          commit('CLEAR_FORM')
          dispatch('loading/loading', state.load, { root: true })
        }
    })
      
    },

    async getUser({ commit, rootState }, id ) {
      let url = `/user/${id}`
      await axios.get(url)
          .then((response) => {
            console.log(response.data)
            rootState.departamentos.selectDeptoReg = response.data.departamentos
            commit('GET_USER', response.data)
            }).catch(error => {
              if(error.response.status == 422){
                let data = error.response.data.errors
                Object.keys(data).forEach(
                  key=>{
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: data[key][0],
                    })
                  }
                )
              }
          })
    },

    clearForm({ commit }) {
      commit('CLEAR_FORM')
    },
  },
}
