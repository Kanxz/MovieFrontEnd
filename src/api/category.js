import request from "@/utils/request"

export const getCategoryFilter = () => {
  return request('/movie-detail/filter', 'get')
}

export const getCategoryMovies = (params) => {
  return request('/movie/category/movies', 'post', params)
}