// 管理员模块
export default {
  namespaced: true,
  state() {
    return {
      profile: {
        userID: '',
        username: '',
        token: ''
      }
    }
  },
  mutations: {
    setAdmin(state, payload) {
      state.profile = payload
    }
  }
}