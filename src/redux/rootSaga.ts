import { all } from 'redux-saga/effects'
import { authWather } from './auth/authSaga'

export function* rootSaga() {
  yield all([authWather()])
}
