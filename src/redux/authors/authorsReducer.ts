import { Author } from '../../models/Author'
import { AppAuthorsActions } from './authorsActions'
import { AuthorsConstants } from './authorsConstants'

type AuthorsState = typeof initialState

const initialState = {
  authors: [] as Author[],
}

export const authorsReducer = (
  state = initialState,
  action: AppAuthorsActions
): AuthorsState => {
  switch (action.type) {
    case AuthorsConstants.SET_AUTHORS:
      return { ...state, authors: action.payload }
    default:
      return state
  }
}
