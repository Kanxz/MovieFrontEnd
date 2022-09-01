import request from '@/utils/request'

/**
 * 帐号登录
 */
export const userLogin = (user) => {
  return request('/user/login', 'post', user)
}

export const userRegister = (user) => {
  return request('/user/register', 'post', user)
}

export const getUsetById = (id) => {
  return request('/user/getById', 'get', { id })
}

export const updateUserInfo = (user) => {
  return request('/user/editById', 'post', user)
}

export const changePd = (user) => {
  return request('/user/editPassword', 'post', user)
}

export const getUserComments = (param) => {
  return request('/comment/getById', 'post', param)
}

export const deleteComment = (id) => {
  return request('/comment/deleteById', 'get', { id })
}
