import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    rolesState: {},
    permisos:[],
    array_permisos:[],
    pagination: {},
    load: { loading: false, fullPage: false },
    offset: 4,
    dialog: false,
    tipoAccion: 0,
    buscar: '',
    title: 'Roles',
    category: 'Información exclusiva del administrador del sistema',
    form: {
      name: '',
      id: 0,
    }
  },

  getters: {
    getField,
  },

  mutations: {
    updateField,

    GET_ID_ROL(state, data) {
      state.form.id = data
    },
    GET_ROLES(state, rolesAccion) {
      state.rolesState = rolesAccion
    },
    GET_ROLE(state, data) {
      state.form.name = data.role.name
      state.form.id = data.role.id
    },

    GET_NAME_ROL(state, data) {
      state.form.name = data
    },

    GET_ALL_PERMISSIONS(state, data) {
      state.array_permisos = data
    },

    GET_MY_PERMISSIONS(state, data) {
      state.permisos = data
    },

    CAMBIAR_ACCION(state, accion) {
      state.tipoAccion = accion
    },
    GET_PAGINATION(state, rolesAccion) {
      state.pagination = rolesAccion
    },
    REFRESH_ROLES(state, rol) {
      state.rolesState.push(rol)
    },
    CLEAR_FORM(state) {
      state.form.name = ''
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

    async getRole({ commit, rootState }, id ) { //Obtienen un usuario y carga los datos al formulario
      let url = `/role/${id}`
      await axios.get(url)
          .then((response) => {
            commit('GET_ROLE', response.data)
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

    async insertaRol({commit, dispatch, state},rolData){ //Inserta o actualiza usuario dependiendo de la acciòn que el usuario elija.
      let url = ''
      let enviar = ''
        if(rolData.accion != 1){
          url = `/role/update/${rolData.form.id}`
          enviar = await axios.put
        } else {
          url = '/roles/add'
          enviar = await axios.post
        }
        enviar(url, rolData.form)
          .then((response) => {
            dispatch('loading/loading', state.load, { root: true })
            dispatch('alerta')
            commit('CLEAR_FORM')
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

    async eliminarRol({dispatch}, id){
      let url = `/role/delete/${id}`
      await axios.post(url)
          .then((response) => {
            dispatch('getRoles')
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

async obtenerPermisos({commit}, id){

    var url = `/permisos/selectPermisos/${id}`
      await axios.get(url)
            .then((response) => {
        //Obtiene todos los permisos
        //this.arrayPermisos = respuesta.permisos;
        commit('GET_ALL_PERMISSIONS', response.data.permisos)
        //Obtiene todos los roles asociados al usuario seleccionado
        commit('GET_MY_PERMISSIONS', response.data.my_permisos)
        //this.permisos = respuesta.my_permisos;
        commit('GET_ID_ROL', response.data.rol.id)

        commit('GET_NAME_ROL', response.data.rol.name)

      }).catch(function (error) {
        console.log(error);
      })
    },


  async insertarPermisosRol({dispatch}, data){
    var url = `roles/agregarPermisosRol/${data.id}`
    await axios.post(url, data)
          .then((response) => {
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
      },

    cambiarAccion({ commit }, accion) {
      commit('CAMBIAR_ACCION', accion)
    },

    clearForm({ commit }) {
      commit('CLEAR_FORM')
    },
    async loading({ commit }) {
      commit('LOADING')
    },
  },
}
