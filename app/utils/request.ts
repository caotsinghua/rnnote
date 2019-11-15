// import Storage from './storage'
import qs from 'qs'
import Toast from 'react-native-root-toast'

const defaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8'
}
const statusMessageMap = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  413: '上传文件过大！',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
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
      data?: any
      method?: string
      params?: any
      headers?: any
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
    })
      .then(res => {
        return this.handleResponse(res) // 处理response
      })
      .catch(e => {
        return this.handleError(e)
      })
  }

  handleResponse(response: Response) {
    return this.checkStatus(response).then(res => {
      return res.json()
    })
  }
  handleError(error: any) {
    if (error.message === 'Network request failed') {
      Toast.show('网络离线,请联网后重试.', { duration: Toast.durations.LONG })
    } else if (error.response && error.message) {
      Toast.show(error.message, { duration: Toast.durations.LONG })
    }
  }
  checkStatus(response: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        let message = (statusMessageMap as any)[response.status] || response.statusText
        reject({ response, message })
      }
    })
  }
}

export default Request
