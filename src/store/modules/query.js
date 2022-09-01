export default {
  namespaced: true,
  state: {
    profile: {
      query: null,
      total: null,
      movies: [],
    }

  },
  mutations: {
    setQuery(state, payload) {
      state.profile = payload
    }
  }
}