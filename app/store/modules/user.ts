import { login } from '../../api/auth'
import { put, call } from 'redux-saga/effects'
import Storage from '../../utils/storage'
export interface UserState {
  isLogged: boolean
  userInfo: UserInfo
}
export interface UserInfo {
  userName: string
  nickName: string
}

export interface CommonAction {
  type: string
  payload: any
}

const initialState: UserState = {
  isLogged: false,
  userInfo: {
    userName: '',
    nickName: ''
  }
}

const LOGIN = 'login'
const LOGOUT = 'logout'
export function userReducer(state = initialState, action: CommonAction): UserState {
  const { payload } = action
  switch (action.type) {
    case LOGIN: {
      return {
        isLogged: true,
        userInfo: payload
      }
    }
    case LOGOUT: {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}

// 调用effects的方式为 dispatch('user/login')
// 即 dispatch('namespace/effectName')
export const effects = {
  *login({ payload, cb }: { payload: any; cb: Function }) {
    const res = yield call(login, payload)
    if (res && res.success) {
      yield put({
        type: LOGIN,
        payload: res.data
      })
      yield Storage.set('u-token', 'xxxx')
    }
    cb(res)
  },
  *logout({ cb }: { cb: Function }) {
    // 退出接口
    try {
      yield Storage.remove('u-token')
      yield put({
        type: LOGOUT
      })
      cb()
    } catch (e) {
      console.log('[退出登陆-出错了]', e)
    }
  }
}
// 模块名称，必须导出
export const namespace = 'user'
