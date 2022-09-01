export default {
  namespaced: true,
  state: {
    movieId: null
  },
  mutations: {
    setMovieID(state, id) {
      state.movieId = id
    }
  }
}