const prefix = 'authors/'

export enum AuthorsConstants {
  SET_AUTHORS = prefix + 'SET_AUTHORS',
  GET_AUTHORS = prefix + 'GET_AUTHORS',

  GET_AUTHOR_DETAILS = prefix + 'GET_AUTHOR_DETAILS',
  SET_CURRENT_AUTHOR = prefix + 'SET_CURRENT_AUTHOR',
  EDIT_AUTHOR = prefix + 'EDIT_AUTHOR',
  ADD_AUTHOR = prefix + 'ADD_AUTHOR',
  DEL_AUTHOR = prefix + 'DEL_AUTHOR',
  MULTIPLE_DEL_AUTHORS = prefix + 'MULTIPLE_DEL_AUTHORS',
  SET_RESPONSE_ERROR = prefix + 'SET_RESPONSE_ERROR',
  SET_FORM_ERROR = prefix + 'SET_FORM_ERROR',
  SET_SUCCESS_MESSAGE = prefix + 'SET_SUCCESS_MESSAGE',
}
