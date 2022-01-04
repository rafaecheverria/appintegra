
export default {
  namespaced: true,
  state: {
    up: {
      title: '¿Está seguro?',
      text: "Confirma si desea guardar el registro!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar!'
    },
    down: {
       guardado: 'Guardado!',
       descripcion: 'Tu registro ha sido guardado satisfactoriamente!.',
       tipo: 'success'
    }

  },

  getters: {
    up: state => state.up,
    down: state => state.down,
  },

  mutations: {
    ALERTA(state, parametro) {
      state.loading = parametro.loading;
      state.fullPage = parametro.fullPage;
    },
  },
  actions: {
    async loading({ commit }, parametro) {
      commit('LOADING', parametro)
    },
  },
}
