import request from "@/utils/request"

export const getMovieDetail = (doubanId) => {
  return request('/movie-detail/getOne', 'get', { doubanId })
}

export const setComment = (comment) => {
  return request('/movie-detail/setComment', 'post', comment)
}

export const getComments = (doubanId) => {
  return request('/movie-detail/getComments', 'get', { doubanId })
}

export const getScore = (param) => {
  return request('/movie-detail/getScore', 'post', param)
}

export const setScore = (param) => {
  return request('/movie-detail/setScore', 'post', param)
}

export const changeClickTimes = (param) => {
  return request('/movie-detail/click', 'post', param)
}