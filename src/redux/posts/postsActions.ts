import { AnyAction } from 'redux'
import { PostsConstants } from './postsConstants'

export const setPosts = (posts: any): AnyAction => ({
  type: PostsConstants.SET_POSTS,
  payload: posts,
})

export const setIsPostFetching = (flag: boolean): AnyAction => ({
  type: PostsConstants.SET_IS_DATA_FETCHING,
  payload: flag,
})
