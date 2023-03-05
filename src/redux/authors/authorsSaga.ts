import { LOCATION_CHANGE } from 'connected-react-router'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { RootState } from '../store'
import { AxiosResponse } from 'axios'
import { AuthorsService } from '../../http/AuthorsService'
import { Author } from '../../models/Author'
import { AuthorsActions } from './authorsActions'

function* getAuthors() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )
  const authorsInStore: Author[] = yield select(
    (state: RootState) => state.authors.authors
  )

  if (pathname === '/authors' && authorsInStore.length === 0) {
    try {
      const authors: AxiosResponse<Author[]> = yield call(
        AuthorsService.getAllAuthors
      )
      yield put(AuthorsActions.setAuthors(authors.data))
    } catch (error) {}
  }
}

export function* authorsWather() {
  yield takeLatest(LOCATION_CHANGE, getAuthors)
}
