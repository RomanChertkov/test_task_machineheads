import { AxiosResponse } from 'axios'
import { select, takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import { postActions } from './postsActions'
import { Post, PostDetails } from '../../models/Posts'
import { PostService } from '../../http/postService'
import { LOCATION_CHANGE } from 'connected-react-router'
import { PostsConstants } from './postsConstants'
import { RootState, actionWithPayload } from '../store'

function* getPosts() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )

  if (pathname === '/posts') {
    const postList: AxiosResponse<Post[]> = yield call(
      PostService.getPostsFromApi
    )
    yield put(postActions.setPosts(postList.data))
  }
}

function* getPostDetail({ payload }: actionWithPayload<number>) {
  try {
    const postDetails: AxiosResponse<PostDetails> = yield call(
      PostService.getPostDetailFromApi,
      payload
    )
    yield put(postActions.setEditingPost(postDetails.data))
  } catch (error) {}
}

export function* postWather() {
  yield takeLatest(LOCATION_CHANGE, getPosts)
  yield takeEvery(PostsConstants.GET_POST_DETAIL, getPostDetail)
}
