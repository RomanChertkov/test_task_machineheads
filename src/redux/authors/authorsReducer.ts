import { AppAuthorsActions } from './authorsActions'
import { AuthorsConstants } from './authorsConstants'

type AuthorsState = typeof initialState

const initialState = {
  authors: 0,
}

export const authorsReducer = (
  state = initialState,
  action: AppAuthorsActions
): AuthorsState => {
  switch (action.type) {
    case AuthorsConstants.SET_AUTHORS:
      return { ...state, authors: action.payload.data1 }
    case AuthorsConstants.GET_AUTHORS:
    default:
      return state
  }
}
