// import Storage from './storage'
import qs from 'qs'
import { Alert } from 'react-native'

const defaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8'
}

class Request {
  baseUrl: string
  constructor({ baseUrl = '' }) {
    this.baseUrl = baseUrl
  }
  request(
    {
      url,
      method = 'get',
      params,
      data,
      headers = defaultHeaders,
      ...otherOptions
    }: {
      url: string
      data: any
      method: string
      params: any
      headers: any
    },
    qsStringifyOptions = {} // qs.stringify的配置
  ) {
    let requestUrl = `${this.baseUrl}/${url}`
    const query = qs.stringify(params, qsStringifyOptions)
    if (requestUrl.indexOf('?') > -1) {
      requestUrl = `${requestUrl}&${query}`
    } else {
      requestUrl = `${requestUrl}?${query}`
    }
    return fetch(requestUrl, {
      method,
      body: data, // post时使用
      headers,
      ...otherOptions
    }).then(res => {
      return this.handleResponse(res) // 处理response
    })
  }

  handleResponse(response: Response) {
    return this.checkStatus(response)
      .then(res => {
        return res.json()
      })
      .catch(eRes => {
        const { message } = eRes
        Alert.alert(message)
      })
  }
  checkStatus(response: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        let message = '请求出错'
        switch (response.status) {
          case 400:
            message = '请求错误'
            break

          case 401:
            message = '未授权，请登录'
            break

          case 403:
            message = '拒绝访问'
            break

          case 404:
            message = '请求地址出错'
            break

          case 408:
            message = '请求超时'
            break
          case 413:
            message = '上传文件过大！'
            break
          case 500:
            message = '服务器内部错误'
            break

          case 501:
            message = '服务未实现'
            break

          case 502:
            message = '网关错误'
            break

          case 503:
            message = '服务不可用'
            break

          case 504:
            message = '网关超时'
            break

          case 505:
            message = 'HTTP版本不受支持'
            break
          default:
        }

        reject({ response, message })
      }
    })
  }
}

export default Request
