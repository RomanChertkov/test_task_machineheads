import { AnyAction } from 'redux'
import { Post } from '../../models/Posts'
import { PostsConstants } from './postsConstants'

interface PostsState {
  postsList: Post[]
}

const initialState: PostsState = {
  postsList: [] as Post[],
}
//TODO write generic type for action

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PostsConstants.SET_POSTS:
      return { ...state, postsList: action.payload }
    default:
      return state
  }
}
