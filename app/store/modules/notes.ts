import { Action } from 'redux'
import { Payload } from 'app/common'
import { call, put } from 'redux-saga/effects'
import { getNotes } from '../../api/notes'
import dayjs from 'dayjs'
export const namespace = 'notes'

export interface NotesState {
  data: NoteSection[]
  page: number
  pageSize: number
  total?: number
  loading: boolean
}

export interface Note {
  title?: string
  createTime?: string
  desc?: string
  id?: string
}

const initialState: NotesState = {
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  loading: false
}

enum NoteActionTypes {
  GET_NOTES = 'GET_NOTES',
  DELETE_NOTE = 'DELETE_NOTE',
  CREATE_NOTE = 'CREATE_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',

  SET_PAGE = 'SET_PAGE',
  SET_PAGE_SIZE = 'SET_PAGE_SIZE',
  SET_LOADING = 'SET_LOADING'
}

type NoteAction = Action<NoteActionTypes> & {
  payload: any
}
export interface NoteSection {
  label: string
  data: Note[]
}

export const notesReducer = (state: NotesState = initialState, action: NoteAction): NotesState => {
  const { payload } = action
  switch (action.type) {
    case NoteActionTypes.GET_NOTES: {
      return Object.assign({}, state, {
        data: payload.data,
        total: payload.total
      })
    }
    case NoteActionTypes.SET_LOADING: {
      return Object.assign({}, state, {
        loading: payload
      })
    }
    case NoteActionTypes.SET_PAGE: {
      if (typeof payload !== undefined) {
        return Object.assign({}, state, {
          page: payload
        })
      } else {
        return state
      }
    }
    case NoteActionTypes.SET_PAGE_SIZE: {
      if (typeof payload !== undefined) {
        return Object.assign({}, state, {
          pageSize: payload
        })
      } else {
        return state
      }
    }
    default:
      return state
  }
}

export const effects = {
  *getNotes({ payload: query = {}, callback }: { payload: Payload; callback?: Function }) {
    console.log('查询notes')
    put({ type: NoteActionTypes.SET_PAGE, payload: query.page })
    put({ type: NoteActionTypes.SET_PAGE_SIZE, payload: query.pageSize })
    put({ type: NoteActionTypes.SET_LOADING, payload: true })
    const res = yield call(getNotes, query)
    put({ type: NoteActionTypes.SET_LOADING, payload: false })
    if (callback) {
      callback()
    }
    if (res.success && res.data) {
      console.log(parseNotes(res.data.list))
      yield put({
        type: NoteActionTypes.GET_NOTES,
        payload: {
          data: parseNotes(res.data.list),
          total: 0
        }
      })
    }
  }
}

const parseNotes = (list: Note[]): NoteSection[] => {
  const result: NoteSection[] = []
  const resultMap: { [key: string]: Note[] } = {}
  if (list.length > 0) {
    list.sort((a, b) => {
      return dayjs(b.createTime).diff(dayjs(a.createTime))
    })

    for (let i = 0; i < list.length; i++) {
      let curTime = dayjs(list[i].createTime).format('YYYY年MM月')
      if (!resultMap[curTime]) {
        resultMap[curTime] = []
      }
      resultMap[curTime].push(list[i])
    }

    Object.entries(resultMap).forEach(([time, data]) => {
      result.push({
        label: time,
        data
      })
    })
  }
  return result
}
