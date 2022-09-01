export default {
  namespaced: true,
  state: {
    profile: {
      id: '',
      username: '',
      age: '',
      gender: '',
      email: '',
      roleKey: '',
      status: ''
    }
  },
  mutations: {
    setEmployee(state, payload) {
      // console.log('setEmployee + ' + payload);
      state.profile = payload
    }
  }
}