import { FormError, ResponseError } from '../../models/Errors'
import { Post, PostDetails } from '../../models/Post'
import { AppPostActions } from './postsActions'
import { PostsConstants } from './PostsConstants'

const initialState = {
  posts: [] as Post[],
  currentPost: {} as PostDetails,
  responseErrors: {} as ResponseError,
  formErrors: [] as FormError[],
  isDataFetching: false,
  successMessage: '',
}

type PostsState = typeof initialState

export const postsReducer = (
  state = initialState,
  action: AppPostActions
): PostsState => {
  switch (action.type) {
    case PostsConstants.SET_POSTS:
      return { ...state, posts: action.payload }
    case PostsConstants.SET_CURRENT_POST:
      return { ...state, currentPost: action.payload }
    case PostsConstants.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }

    case PostsConstants.SET_RESPONSE_ERROR:
      return { ...state, responseErrors: action.payload }

    case PostsConstants.SET_FORM_ERROR:
      return { ...state, formErrors: action.payload }
    default:
      return state
  }
}
