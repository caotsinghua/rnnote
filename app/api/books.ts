import http from '../utils/api.request'

export const getBooks = (query: any) =>
  http.request({
    url: '/books',
    params: query
  })
