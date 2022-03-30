import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    usersState: {},
    pagination: {},
    tipoAccion: 0,
    array_roles:[],
    roles:[],
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
      cargo_id: '',
      id: 0,
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

    GET_ID_USER(state, data) {
      state.form.id = data
    },

    GET_ALL_ROLES(state, data) {
      state.array_roles = data
    },

    GET_MY_ROLES(state, data) {
      state.roles = data
    },

    CAMBIAR_ACCION(state, accion) {
      state.tipoAccion = accion
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
      state.form.id = data.user.id
    },
  },

  actions: {
    async getUsers({ dispatch, commit, state }, page) { // Obtiene todos los usuarios y los carga a la tabla
      let url = '/users?page='+ page + '&buscar='+ state.buscar
      await axios.get(url)
        .then((response) => {
          commit('GET_USERS', response.data.users)
          commit('GET_PAGINATION', response.data.pagination)
          dispatch('loading/loading', state.load, { root: true })
        })
        .catch(function(error){
          commit('SET_CONSTITUENCY', null);
          this.$router.push({name: 'Login'})
          console.log("se cerro la sesion")
        })
    },

    async getUser({ commit, rootState }, id ) { //Obtienen un usuario y carga los datos al formulario
      let url = `/user/${id}`
      await axios.get(url)
          .then((response) => {
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
          rootState.loading.loading = false
    },

    async insertaUsuario({commit, dispatch, rootState, state},userData){ //Inserta o actualiza usuario dependiendo de la acciòn que el usuario elija.
      let url = ''
      let enviar = ''
      if(userData.accion != 1){
        url = `/user/update/${userData.form.id}`
         enviar = await axios.put
      } else {
        url = '/users/add'
        enviar = await axios.post
      }
        enviar(url, userData.form)
          .then((response) => {
            dispatch('loading/loading', state.load, { root: true })
            dispatch('alerta')
            commit('CLEAR_FORM')
            rootState.departamentos.selectDeptoReg = {}
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

    async eliminarUsuario({dispatch}, id){
      let url = `/user/delete/${id}`
      await axios.post(url)
          .then((response) => {
            dispatch('getUsers')
            dispatch('alertaDelete')
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

    async obtenerRoles({commit}, id){
      var url = `/roles/selectRoles/${id}`
        await axios.get(url)
              .then((response) => {
                console.log(response)
          //Obtiene todos los permisos
          //this.arrayPermisos = respuesta.permisos;
          commit('GET_ALL_ROLES', response.data.roles)
          //Obtiene todos los roles asociados al usuario seleccionado
          commit('GET_MY_ROLES', response.data.my_roles)
          //this.permisos = respuesta.my_permisos;
          commit('GET_ID_USER', response.data.user.id)
        }).catch(function (error) {
          console.log(error);
        })
      },

    async insertarRolUser({dispatch}, data){
      var url = `user/agregarRolUsuario/${data.id}`
      await axios.post(url, data)
            .then((response) => {
              console.log(response)
              dispatch('alerta')
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
  

    clearForm({ commit, rootState }) {
      rootState.departamentos.selectDeptoReg = {}
      commit('CLEAR_FORM')
    },

    cambiarAccion({ commit }, accion) {
      commit('CAMBIAR_ACCION', accion)
    },

    async alerta({rootState}){
      let down = rootState.alerta.down
          Swal.fire(
            down.guardado,
            down.descripcion,
            down.tipo
          )
      },

    async alertaDelete({rootState}){
      let down = rootState.alerta.deletebody
          Swal.fire(
            down.guardado,
            down.descripcion,
            down.tipo
          )
      }
  },
}
