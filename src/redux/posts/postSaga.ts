import { LOCATION_CHANGE } from 'connected-react-router'
import { select, takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { EditPost, NewPost, Post, PostDetails } from '../../models/Post'
import { FormError, ResponseError } from '../../models/Errors'
import { RootState, actionWithPayload } from '../store'
import { PostsConstants } from './PostsConstants'
import { postsActions } from './postsActions'
import { PostsService } from '../../http/PostsService'

function* getPosts() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )

  if (pathname === '/posts') {
    const postList: AxiosResponse<Post[]> = yield call(PostsService.getPosts)
    yield put(postsActions.setPosts(postList.data))
  }
}

function* getPostDetail({ payload }: actionWithPayload<number>) {
  try {
    const postDetails: AxiosResponse<PostDetails> = yield call(
      PostsService.getPostDetail,
      payload
    )
    yield put(postsActions.setCurrentPostDetail(postDetails.data))
  } catch (error) {}
}

function* addNewPost(action: actionWithPayload<NewPost>) {
  try {
    yield call(PostsService.addPost, action.payload)

    yield put(postsActions.setSuccessMessage('Элемент добавлен.'))

    yield getPosts()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          postsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* updatePost(action: actionWithPayload<EditPost>) {
  try {
    yield call(PostsService.editPost, action.payload)

    yield put(postsActions.setSuccessMessage('Элемент обновлён.'))

    yield getPosts()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          postsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* delPost(action: actionWithPayload<number>) {
  try {
    yield call(PostsService.removePost, action.payload)
    yield put(postsActions.setSuccessMessage('Элемент удалён.'))
    yield getPosts()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

export function* postWather() {
  yield takeLatest(LOCATION_CHANGE, getPosts)
  yield takeEvery(PostsConstants.GET_POST_DETAILS, getPostDetail)
  yield takeEvery(PostsConstants.ADD_POST, addNewPost)
  yield takeEvery(PostsConstants.EDIT_POST, updatePost)
  yield takeEvery(PostsConstants.DEL_POST, delPost)
}
