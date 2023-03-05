import { InferActionsType } from '../store'
import { Post, PostDetails } from '../../models/Posts'
import { PostsConstants } from './postsConstants'

export const postActions = {
  setPosts: (posts: Post[]) =>
    ({
      type: PostsConstants.SET_POSTS,
      payload: posts,
    } as const),

  setIsPostFetching: (flag: boolean) =>
    ({
      type: PostsConstants.SET_IS_DATA_FETCHING,
      payload: flag,
    } as const),

  setEditingPost: (postData: PostDetails) =>
    ({
      type: PostsConstants.SET_CURRENT_POST_DATA,
      payload: postData,
    } as const),

  getPostDetail: (postId: number) =>
    ({
      type: PostsConstants.GET_POST_DETAIL,
      payload: postId,
    } as const),
}

export type AppPostActions = InferActionsType<typeof postActions>
