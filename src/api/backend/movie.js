import request from "@/utils/adminRequest"

export const getAllMovie = (queryForm) => {
  return request("/movie/admin/getAll", 'post', queryForm);
}

export const getData = (id) => {
  return request("/movie/admin/getById", 'get', { id });
}

export const editMovie = (param) => {
  return request("/movie/admin/edit", 'post', param);
}

export const addMovie = (param) => {
  return request("/movie/admin/add", 'post', param);
}

export const deleteMovie = (id) => {
  return request("/movie/admin/deleteById", 'get', { id });
}

export const updateCarousel = (param) => {
  return request("/carousel/admin/updateCarousel", 'post', param);
}