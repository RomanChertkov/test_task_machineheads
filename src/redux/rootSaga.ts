import { all } from 'redux-saga/effects'
import { authWather } from './auth/authSaga'
import { postWather } from './posts/postSaga'
import { authorsWather } from './authors/authorsSaga'

export function* rootSaga() {
  yield all([authWather(), postWather(), authorsWather()])
}
