// 分类模块
export default {
  namespaced: true,
  state: {
    sortField: null, // sortField ====> releaseTime, score
    sortMethod: null, // sortMethod ====> asc为正序 desc为倒序
    selectedTag: "全部",
    selectedLan: "全部"
  },
  mutations: {
    changeSelectedTag(state, tagName) {
      state.selectedTag = tagName;
    },
    changeSelectedLan(state, language) {
      state.selectedLan = language;
    },
    changeSortField(state, field) {
      state.sortField = field;
    },
    changeSortMethod(state, method) {
      state.sortMethod = method;
    }
  }
}
