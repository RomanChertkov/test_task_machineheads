import { Author } from '../../models/Author'
import { InferActionsType } from '../store'
import { AuthorsConstants } from './authorsConstants'

export const AuthorsActions = {
  setAuthors: (authors: Author[]) =>
    ({
      type: AuthorsConstants.SET_AUTHORS,
      payload: authors,
    } as const),

  getAuthors: () =>
    ({
      type: AuthorsConstants.GET_AUTHORS,
    } as const),
}

export type AppAuthorsActions = InferActionsType<typeof AuthorsActions>
