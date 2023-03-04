import { AxiosResponse } from 'axios'
import { select, takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import { setEditingPost, setPosts } from './postsActions'
import { Post, PostDetails } from '../../models/Posts'
import { getPostsFromApi, getPostDetailFromApi } from '../../http/postService'
import { LOCATION_CHANGE } from 'connected-react-router'
import { PostsConstants } from './postsConstants'
import { actionWithPayload } from '../store'

function* getPosts() {
  const { pathname } = yield select((state) => state.router.location)
  if (pathname === '/posts') {
    const postList: AxiosResponse<Post[]> = yield call(getPostsFromApi)
    yield put(setPosts(postList.data))
  }
}

function* getPostDetail({ payload }: actionWithPayload<number>) {
  try {
    const postDetails: AxiosResponse<PostDetails> = yield call(
      getPostDetailFromApi,
      payload
    )
    yield put(setEditingPost(postDetails.data))
  } catch (error) {}
}

export function* postWather() {
  yield takeLatest(LOCATION_CHANGE, getPosts)
  yield takeEvery(PostsConstants.GET_POST_DETAIL, getPostDetail)
}
