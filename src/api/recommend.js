import request from "@/utils/request"

export const getRecommentMovies = (param) => {
  return request('movie/recommend', 'post', param)
}