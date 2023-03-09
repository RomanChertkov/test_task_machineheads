import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { RootState, actionWithPayload } from '../store'
import axios, { AxiosResponse } from 'axios'
import { TagsService } from '../../http/TagsService'
import { EditTag, NewTag, Tag } from '../../models/Tag'
import { TagsActions } from './tagsActions'
import { LOCATION_CHANGE } from 'connected-react-router'
import { TagsConstants } from './TagsConstants'
import { FormError, ResponseError } from '../../models/Errors'

function* getAllTags() {
  try {
    const tagsListResponse: AxiosResponse<Tag[]> = yield call(
      TagsService.getAllTags
    )
    yield put(TagsActions.setTags(tagsListResponse.data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* getTags() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )

  if (pathname === '/tags') {
    yield getAllTags()
  }
}

function* getTagDetails({ payload }: actionWithPayload<number>) {
  yield put(TagsActions.setCurrentTagDetails({} as Tag))
  try {
    const tagDetailResponse: AxiosResponse<Tag> = yield call(
      TagsService.getCurrentTagDetail,
      payload
    )
    yield put(TagsActions.setCurrentTagDetails(tagDetailResponse.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* AddNewTag(action: actionWithPayload<NewTag>) {
  try {
    yield call(TagsService.saveNewTag, action.payload)

    yield put(TagsActions.setSuccessMessage('Элемент добавлен.'))

    yield getTags()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(TagsActions.setFormErrors(error.response.data as FormError[]))
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* updateTag(action: actionWithPayload<EditTag>) {
  try {
    yield call(TagsService.editTag, action.payload)

    yield put(TagsActions.setSuccessMessage('Элемент обновлён.'))

    yield getTags()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(TagsActions.setFormErrors(error.response.data as FormError[]))
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* delTag(action: actionWithPayload<number>) {
  try {
    yield call(TagsService.removeTag, action.payload)
    yield put(TagsActions.setSuccessMessage('Элемент удалён.'))
    yield getTags()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* delMarkedTags(action: actionWithPayload<number[]>) {
  try {
    yield call(TagsService.multipleRemoveTags, action.payload)
    yield put(TagsActions.setSuccessMessage('Элемент удалён.'))
    yield getTags()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

export function* tagsWather() {
  yield takeLatest(LOCATION_CHANGE, getTags)
  yield takeEvery(TagsConstants.GET_TAG_DETAILS, getTagDetails)
  yield takeEvery(TagsConstants.ADD_TAG, AddNewTag)
  yield takeEvery(TagsConstants.EDIT_TAG, updateTag)
  yield takeEvery(TagsConstants.DEL_TAG, delTag)
  yield takeEvery(TagsConstants.MULTIPLE_TAGS_DEL, delMarkedTags)
  yield takeEvery(TagsConstants.GET_TAGS, getAllTags)
}
