import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import admin from './modules/admin'
import category from './modules/category'
import employee from "./modules/employee"
import movie from "./modules/movie"
import query from "./modules/query"

export default createStore({
  modules: {
    user,
    category,
    employee,
    movie,
    query,
    admin
  },
  plugins: [
    createPersistedstate({
      key: 'movie-client-pc-store',
      paths: ['user']
    })
  ]
})
