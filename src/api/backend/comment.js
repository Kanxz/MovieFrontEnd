import request from "@/utils/adminRequest"

export const getAllComments = (queryForm) => {
  return request("/comment/getAll", 'post', queryForm);
}

export const deleteByIdAdmin = (id) => {
  return request("/comment/deleteByIdAdmin", 'get', { id });
}
