import * as userModel from './modules/user'
import { takeEvery } from 'redux-saga/effects'

export interface EffectsType {
  [key: string]: any
}

const models = [userModel]
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
