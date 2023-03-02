import { select, takeLatest, call, put } from 'redux-saga/effects'
import { setPosts } from './postsActions'
import { AxiosResponse } from 'axios'
import { Post } from '../../models/Posts'
import { getPostsFromApi } from '../../http/postService'
import { LOCATION_CHANGE, push } from 'connected-react-router'

function* getPosts() {
  const { isAuth } = yield select((state) => state.auth.isAuth)
  const { pathname } = yield select((state) => state.router.location)
  console.log('isAuth', isAuth)

  // if (!isAuth) {
  //   yield put(push('/login'))
  // }

  if (pathname === '/posts') {
    const postList: AxiosResponse<Post[]> = yield call(getPostsFromApi)
    yield put(setPosts(postList.data))
  }
}

export function* postWather() {
  yield takeLatest(LOCATION_CHANGE, getPosts)
}
