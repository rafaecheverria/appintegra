
import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    departamentosState: {},
    pagination: {},
    offset: 4,
    buscar: '',
    title: 'Departamentos',
    category: 'Información exclusiva del administrador del sistema',
    selectDeptoReg: {}
  },

  getters: {
    getField,
  },
  mutations: {
    updateField,

    GET_SELECT(state, departamentosAction) {
      state.selectDeptoReg = departamentosAction
    },
    GET_PAGINATION(state, departamentosAction) {
      state.pagination = departamentosAction
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
      //SE EJECUTA CUANDO EL SELECT REGIÓN REALIZA UN CAMBIO
      //AQUÍ SE CARGAN LOS DEPARTAMENTOS PERTENECIENTES A LA REGIÓN SELECCIONADA ANTERIORMENTE
      changeRegion({commit}, id){
        commit('GET_SELECT', {});
        let url = 'departamentos/selectDepartamentoReg/'+id;
        axios.get(url).then(function (response) {
        let respuesta = response.data;
        if (respuesta ){
          commit('GET_SELECT', respuesta.departamentos);
        }
        //Obtiene los departamentos de la region seleccionada
        }).catch(function (error) {
        console.log(error);
        })
      },
  },
}

