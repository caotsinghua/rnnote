import { takeEvery } from 'redux-saga/effects'
import * as userModel from './modules/user'
import * as booksModel from './modules/books'
import * as notesModel from './modules/notes'

export interface EffectsType {
  [key: string]: any
}

const models = [userModel, booksModel, notesModel]

function* rootSaga() {
  for (let i = 0; i < models.length; i++) {
    const { namespace, effects }: { namespace: string; effects: EffectsType | null } = models[i]
    if (effects) {
      for (let effectName in effects) {
        yield takeEvery(`${namespace}/${effectName}`, effects[effectName])
      }
    }
  }
}

export default rootSaga
