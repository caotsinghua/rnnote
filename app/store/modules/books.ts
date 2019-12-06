import { Action } from 'redux'
import { put, call } from 'redux-saga/effects'
import { getBooks } from '../../api/books'

export const namespace = 'books'

export interface BooksState {
  data: Book[]
  page: number
  pageSize: number
  total?: number
  loading: boolean
}

export interface Book {
  title?: string
  createTime?: string
  desc?: string
}

const initialState: BooksState = {
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  loading: false
}
enum BooksActions {
  GET_BOOKS = 'getBooks',
  SET_PAGE_PAGESIZE = 'setPagePageSize',
  SET_LOADING = 'setLoading'
}

export const booksReducer = (
  state: BooksState = initialState,
  action: Action<BooksActions> & { payload: any }
) => {
  const { payload } = action
  switch (action.type) {
    case BooksActions.GET_BOOKS: {
      return Object.assign({}, state, {
        data: payload.data,
        total: payload.total
      })
    }
    case BooksActions.SET_PAGE_PAGESIZE: {
      let assigned = {
        page: state.page,
        pageSize: state.pageSize
      }
      if (payload.page) {
        assigned.page = payload.page
      }
      if (payload.pageSize) {
        assigned.pageSize = payload.pageSize
      }
      return Object.assign({}, state, assigned)
    }
    case BooksActions.SET_LOADING: {
      return Object.assign({}, state, {
        loading: payload
      })
    }
    default:
      return state
  }
}

export const effects = {
  *getBooks({ payload: query = {} }) {
    yield put({ type: BooksActions.SET_PAGE_PAGESIZE, payload: query })
    yield put({ type: BooksActions.SET_LOADING, payload: true })
    const data = yield call(getBooks, query)
    yield put({ type: BooksActions.SET_LOADING, payload: false })
    if (data.success) {
      yield put({
        type: BooksActions.GET_BOOKS,
        payload: {
          data: data.data.list,
          total: data.total
        }
      })
    }
  }
}
