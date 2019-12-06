import http from '../utils/api.request'

export const getNotes = (query: any) =>
  http.request({
    url: '/notes',
    params: query
  })
