import { AnyAction } from 'redux'
import { PostsConstants } from './postsConstants'
import { PostDetails } from '../../models/Posts'

export const setPosts = (posts: any): AnyAction => ({
  type: PostsConstants.SET_POSTS,
  payload: posts,
})

export const setIsPostFetching = (flag: boolean): AnyAction => ({
  type: PostsConstants.SET_IS_DATA_FETCHING,
  payload: flag,
})

export const setEditingPost = (postData: PostDetails) => ({
  type: PostsConstants.SET_CURRENT_POST_DATA,
  payload: postData,
})

export const getPostDetail = (postId: number) => ({
  type: PostsConstants.GET_POST_DETAIL,
  payload: postId,
})
