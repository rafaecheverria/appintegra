
import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    regionesState: {},
    pagination: {},
    offset: 4,
    buscar: '',
    title: 'Regiones',
    category: 'Información exclusiva del administrador del sistema',
    selectRegion: {}
  },

  getters: {
    getField,
  },
  mutations: {
    updateField,

    GET_SELECT(state, regionesAction) {
      state.selectRegion = regionesAction
    },
    GET_PAGINATION(state, regionesAction) {
      state.pagination = regionesAction
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
    //CARGA TODAS LAS REGIONES AL SELECT REGIONES DEL FORMULARIO
    async selectRegion({ commit }){
        let url = '/regiones/selectRegion/';
        await axios.get(url).then(function (response) {
            commit('GET_SELECT', response.data.regiones)
        }).catch(function (error) {
            console.log(error);
        })
    },
  },
}