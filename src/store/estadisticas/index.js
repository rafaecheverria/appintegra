import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    filtros: {
      fecha: {},
      jornada_id:'',
      dia:'',
      mes:'',
      comuna:'',
      departamento_id:'',
      nivel:''
    },
    selectJornadasDepto:{},
  },

  getters: {
    getField,
  },

  mutations: {
    updateField,

    GET_SELECT_JORNADAS(state, jornadasAction) {
      state.selectJornadasDepto = jornadasAction
    },

    RESET_SELECT_JORNADA(state, data){
      state.filtros.jornada_id = data
    },

    CLEAR_FORM_FILTROS(state) {
      state.filtros.fecha = ''
      state.filtros.jornada_id = ''
      state.filtros.dia = ''
      state.filtros.mes = ''
      state.filtros.comuna = ''
      state.filtros.departamento_id = ''
      state.filtros.nivel = ''
    },
  },
  actions: {
    changeDepto({commit, state}, id){
      state.filtros.jornada_id = '' //resetar valor del select departamento en el formulario guardar usuario
      let url = 'jornadas/selectJornadasDepto/'+id;
      axios.get(url).then(function (response) {
      console.log(response.data);
      let respuesta = response.data;
      commit('GET_SELECT_JORNADAS', respuesta.jornadas);
      //Obtiene los departamentos de la region seleccionada
      }).catch(function (error) {
      console.log(error);
      })
    },

    /*changeDepto({commit, state}, id){
      state.filtros.jornada_id = '' //resetar valor del select departamento en el formulario guardar usuario
      let url = 'jornadas/selectJornadasDepto/'+id;
      axios.get(url).then(function (response) {
      console.log(response.data);
      let respuesta = response.data;
      commit('GET_SELECT_JORNADAS', respuesta.jornadas);
      //Obtiene los departamentos de la region seleccionada
      }).catch(function (error) {
      console.log(error);
      })
    },*/

    clearForm({ commit, state}) {
      state.selectJornadasDepto = {}
      commit('CLEAR_FORM_FILTROS')
    },
  },
}
