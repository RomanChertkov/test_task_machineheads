import {
  Author,
  AuthorDetails,
  EditAuthor,
  NewAuthor,
} from '../../models/Author'
import { FormError, ResponseError } from '../../models/Errors'
import { InferActionsType } from '../store'
import { AuthorsConstants } from './authorsConstants'

export type AppAuthorsActions = InferActionsType<typeof AuthorsActions>

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

  getAuthorDetails: (authorId: number) =>
    ({
      type: AuthorsConstants.GET_AUTHOR_DETAILS,
      payload: authorId,
    } as const),

  setCurrentAuthorDetails: (currentAuthor: AuthorDetails) =>
    ({
      type: AuthorsConstants.SET_CURRENT_AUTHOR,
      payload: currentAuthor,
    } as const),

  addAuthor: (newAuthor: NewAuthor) =>
    ({
      type: AuthorsConstants.ADD_AUTHOR,
      payload: newAuthor,
    } as const),

  editAuthor: (editAuthor: EditAuthor) =>
    ({
      type: AuthorsConstants.EDIT_AUTHOR,
      payload: editAuthor,
    } as const),

  deleteAuthor: (authorId: number) =>
    ({
      type: AuthorsConstants.DEL_AUTHOR,
      payload: authorId,
    } as const),

  setSuccessMessage: (message: string) =>
    ({
      type: AuthorsConstants.SET_SUCCESS_MESSAGE,
      payload: message,
    } as const),

  setResponseError: (responseError: ResponseError) =>
    ({
      type: AuthorsConstants.SET_RESPONSE_ERROR,
      payload: responseError,
    } as const),

  setFormErrors: (formErrors: FormError[]) =>
    ({
      type: AuthorsConstants.SET_FORM_ERROR,
      payload: formErrors,
    } as const),
}
