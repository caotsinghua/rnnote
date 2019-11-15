import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from './modules'
import rootSaga from './rootSaga'
const sagaMiddleware = createSagaMiddleware()
const appReducer = combineReducers(reducers)
const store = createStore(appReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store
