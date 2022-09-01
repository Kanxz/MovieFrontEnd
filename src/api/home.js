import request from "@/utils/request"

export const getHomeMovieNew = () => {
  return request('movie/home/new', 'get')
}

export const getHomeMovieScore = () => {
  return request('movie/home/score', 'get')
}

export const getHomeCarousel = () => {
  return request('carousel/list', 'get')
}