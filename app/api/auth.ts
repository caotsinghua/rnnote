import http from '../utils/api.request'

export const login = ({ userName, password }: { userName: string; password: string }) =>
  http.request({
    url: '/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
