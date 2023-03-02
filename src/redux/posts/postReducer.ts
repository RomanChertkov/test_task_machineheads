import { AnyAction } from 'redux'
import { Post } from '../../models/Posts'
import { PostsConstants } from './postsConstants'

interface postState {
  posts: Post[]
}

const initialState = {
  posts: [] as Post[],
}
//TODO write generic type for action

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PostsConstants.SET_POSTS:
      return { ...state, posts: action.payload }
    default:
      return state
  }
}
