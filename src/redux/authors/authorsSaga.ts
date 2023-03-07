import { LOCATION_CHANGE } from 'connected-react-router'
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { RootState, actionWithPayload } from '../store'
import axios, { AxiosResponse } from 'axios'
import { AuthorsService } from '../../http/AuthorsService'
import {
  Author,
  AuthorDetails,
  EditAuthor,
  NewAuthor,
} from '../../models/Author'
import { AuthorsActions } from './authorsActions'
import { FormError, ResponseError } from '../../models/Errors'
import { AuthorsConstants } from './authorsConstants'

function* getAuthors() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )
  const authorsInStore: Author[] = yield select(
    (state: RootState) => state.authors.authors
  )

  if (pathname === '/authors') {
    try {
      const authors: AxiosResponse<Author[]> = yield call(
        AuthorsService.getAllAuthors
      )
      yield put(AuthorsActions.setAuthors(authors.data))
    } catch (error) {
      if (error instanceof Error) {
        yield put(
          AuthorsActions.setResponseError({
            name: error.name,
            code: 0,
            message: 'Неизвестная ошибка',
            type: error.message,
          } as ResponseError)
        )
      }
    }
  }
}

function* getAuthorDetails({ payload }: actionWithPayload<number>) {
  yield put(AuthorsActions.setCurrentAuthorDetails({} as AuthorDetails))
  try {
    const authorDetailResponse: AxiosResponse<AuthorDetails> = yield call(
      AuthorsService.getAuthorsDetail,
      payload
    )
    yield put(AuthorsActions.setCurrentAuthorDetails(authorDetailResponse.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* addNewAuthor(action: actionWithPayload<NewAuthor>) {
  try {
    yield call(AuthorsService.addAuthor, action.payload)

    yield put(AuthorsActions.setSuccessMessage('Элемент добавлен.'))

    yield getAuthors()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          AuthorsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* updateAuthor(action: actionWithPayload<EditAuthor>) {
  try {
    yield call(AuthorsService.editAuthor, action.payload)

    yield put(AuthorsActions.setSuccessMessage('Элемент обновлён.'))

    yield getAuthors()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          AuthorsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* delAuthor(action: actionWithPayload<number>) {
  try {
    yield call(AuthorsService.removeAuthor, action.payload)
    yield put(AuthorsActions.setSuccessMessage('Элемент удалён.'))
    yield getAuthors()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

export function* authorsWather() {
  yield takeLatest(LOCATION_CHANGE, getAuthors)
  yield takeEvery(AuthorsConstants.GET_AUTHOR_DETAILS, getAuthorDetails)
  yield takeEvery(AuthorsConstants.ADD_AUTHOR, addNewAuthor)
  yield takeEvery(AuthorsConstants.EDIT_AUTHOR, updateAuthor)
  yield takeEvery(AuthorsConstants.DEL_AUTHOR, delAuthor)
}
