import request from "@/utils/adminRequest"

export const getAllUser = (queryForm) => {
  return request("/user/getAll", 'post', queryForm);
}

export const editEmployee = (param) => {
  return request("/user/editOne", 'post', param);
}

export const addEmployee = (param) => {
  return request("/user/addOne", 'post', param);
}

export const setUserStatus = (id, status) => {
  return request("/user/setStatus", 'get', { id, status });
}

export const deleteUser = (id) => {
  return request("/user/deleteById", 'get', { id });
}