import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    permisosState: {},
    pagination: {},
    load: { loading: false, fullPage: false },
    offset: 4,
    dialog: false,
    tipoAccion: 0,
    buscar: '',
    title: 'Permisos',
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

    GET_PERMISOS(state, permisosAccion) {
      state.permisosState = permisosAccion
    },
    GET_PERMISO(state, data) {
      state.form.name = data.permiso.name
      state.form.id = data.permiso.id
    },
    CAMBIAR_ACCION(state, accion) {
      state.tipoAccion = accion
    },
    GET_PAGINATION(state, permisosAccion) {
      state.pagination = permisosAccion
    },
    REFRESH_PERMISOS(state, rol) {
      state.permisosState.push(rol)
    },
    CLEAR_FORM(state) {
      state.form.name = ''
    },
  },

  actions: {
    async getPermisos({ dispatch, commit, state }, page) {
      let url = '/permisos?page='+ page + '&buscar='+ state.buscar
      let load = {loading: false, fullPage: false}
      await axios.get(url)
        .then((response) => {
          commit('GET_PERMISOS', response.data.permisos)
          commit('GET_PAGINATION', response.data.pagination)
          dispatch('loading/loading', load, { root: true })
        })
        .catch(function(error){
          commit('SET_CONSTITUENCY', null);
        })
    },

    async getPermiso({ commit, rootState }, id ) { //Obtienen un usuario y carga los datos al formulario
      let url = `/permiso/${id}`
      await axios.get(url)
          .then((response) => {
            commit('GET_PERMISO', response.data)
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
                  }
                )
              }
          })
          rootState.loading.loading = false
    },

    async insertaPermiso({commit, dispatch, state},permisoData){ //Inserta o actualiza usuario dependiendo de la acciòn que el usuario elija.
      let url = ''
      let enviar = ''
        if(permisoData.accion != 1){
          url = `/permiso/update/${permisoData.form.id}`
          enviar = await axios.put
        } else {
          url = '/permisos/add'
          enviar = await axios.post
        }
        enviar(url, permisoData.form)
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

    async eliminarPermiso({dispatch}, id){
      let url = `/permiso/delete/${id}`
      await axios.post(url)
          .then((response) => {
            dispatch('getPermisos')
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
