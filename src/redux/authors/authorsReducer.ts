import { Author, AuthorDetails } from '../../models/Author'
import { ResponseError, FormError } from '../../models/Errors'
import { AppAuthorsActions } from './authorsActions'
import { AuthorsConstants } from './authorsConstants'

type AuthorsState = typeof initialState

const initialState = {
  authors: [] as Author[],
  currentAuthor: {} as AuthorDetails,
  responseErrors: {} as ResponseError,
  formErrors: [] as FormError[],
  isDataFetching: false,
  successMessage: '',
}

export const authorsReducer = (
  state = initialState,
  action: AppAuthorsActions
): AuthorsState => {
  switch (action.type) {
    case AuthorsConstants.SET_AUTHORS:
      return { ...state, authors: action.payload }
    case AuthorsConstants.SET_CURRENT_AUTHOR:
      return { ...state, currentAuthor: action.payload }

    case AuthorsConstants.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }

    case AuthorsConstants.SET_RESPONSE_ERROR:
      return { ...state, responseErrors: action.payload }

    case AuthorsConstants.SET_FORM_ERROR:
      return { ...state, formErrors: action.payload }
    default:
      return state
  }
}
