import axios from 'axios'
import store from '@/store'
// import router from '@/router'

export const baseURL = 'http://localhost:8080/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const { profile } = store.state.admin
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  // if (res.data.code === 401) {
  //   store.commit('admin/setAdmin', {})
  //   router.push('/admin/login')
  // }
  return res.data
})

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}