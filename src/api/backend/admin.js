import request from "@/utils/adminRequest"

export const adminLogin = (user) => {
  return request('/user/admin/login', 'post', user)
}

export const getAuthority = (userId) => {
  return request('/user/admin/getAuthority', 'get', { userId })
}
