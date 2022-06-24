import { getField, updateField } from 'vuex-map-fields';

export default {
  namespaced: true,
  state: {
    filtros: {
      fecha: {},
      dia:'',
      mes:'',
      comuna:'',
      jardin:'',
      nivel:''
    }
  },

  getters: {
    getField,
  },

  mutations: {
    updateField,
    

  },
  actions: {

  },
}
