import { Post, PostDetails } from '../../models/Post'
import { AppPostActions } from './postsActions'
import { PostsConstants } from './postsConstants'

const initialState = {
  postsList: [] as Post[],
  currentPostDetail: {} as PostDetails,
  isPostSaving: false,
  savingErrors: '',
}

type PostsState = typeof initialState

export const postsReducer = (
  state = initialState,
  action: AppPostActions
): PostsState => {
  switch (action.type) {
    case PostsConstants.SET_POSTS:
      return { ...state, postsList: action.payload }
    case PostsConstants.SET_CURRENT_POST_DATA:
      return { ...state, currentPostDetail: action.payload }
    // case PostsConstants.IS_POST_SAVING:
    //   return { ...state, isPostSaving: action.payload }
    // case PostsConstants.SET_SAVING_ERRORS:
    //   return { ...state, savingErrors: action.payload }
    default:
      return state
  }
}
