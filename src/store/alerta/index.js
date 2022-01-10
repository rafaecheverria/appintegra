
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
    getAlerta(state) {
      return state.up && state.down
    },
  },

  actions: {
    async alerta({ getters }) {
      return getters.getAlerta
    },
  },
}
