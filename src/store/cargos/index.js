
import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    cargosState: {},
    pagination: {},
    offset: 4,
    buscar: '',
    title: 'Cargos',
    category: 'Información exclusiva del administrador del sistema',
    selectCargo: {}
  },

  getters: {
    getField,
  },
  mutations: {
    updateField,

    GET_SELECT(state, cargosAction) {
      state.selectCargo = cargosAction
    },
    GET_PAGINATION(state, cargoAction) {
      state.pagination = cargoAction
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
    //CARGA TODOS LOS CARGOS AL SELECT CARGOS DEL FORMULARIO
    async selectCargo({ commit }){
        let url = '/cargos/selectCargo/';
        await axios.get(url).then(function (response) {
            commit('GET_SELECT', response.data.cargos)
        }).catch(function (error) {
            console.log(error);
        })
    },
  },
}

