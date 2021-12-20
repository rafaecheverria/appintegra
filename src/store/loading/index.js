
export default {
  namespaced: true,
  state: {
    loading: true,
    fullPage: false,
  },

  mutations: {
    LOADING(state, parametro) {
      state.loading = parametro;
    },
  },

  actions: {
    async loading({ commit }, parametro) {
      commit('LOADING', parametro)
    },
  },
}
