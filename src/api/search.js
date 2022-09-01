import request from "@/utils/request"

export const searchByName = (name) => {
  return request('movie/search', 'get', { name })
}