import { AnyAction } from 'redux'
import { Post, PostDetails } from '../../models/Posts'
import { PostsConstants } from './postsConstants'

interface PostsState {
  postsList: Post[]
  currentPostDetail: PostDetails
  isPostSaving: boolean
  savingErrors: string
}

const initialState: PostsState = {
  postsList: [] as Post[],
  currentPostDetail: {} as PostDetails,
  isPostSaving: false,
  savingErrors: '',
}
//TODO write generic type for action

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PostsConstants.SET_POSTS:
      return { ...state, postsList: action.payload }
    case PostsConstants.SET_CURRENT_POST_DATA:
      return { ...state, currentPostDetail: action.payload }
    case PostsConstants.IS_POST_SAVING:
      return { ...state, isPostSaving: action.payload }
    case PostsConstants.SET_SAVING_ERRORS:
      return { ...state, savingErrors: action.payload }
    default:
      return state
  }
}
