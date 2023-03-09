const prefix = 'posts/'
export enum PostsConstants {
  SET_POSTS = prefix + 'SET_POSTS',
  GET_POST_DETAILS = prefix + 'GET_POST_DETAILS',
  SET_CURRENT_POST = prefix + 'SET_CURRENT_POST',

  EDIT_POST = prefix + 'EDIT_POST',
  ADD_POST = prefix + 'ADD_POST',
  DEL_POST = prefix + 'DEL_POST',

  SET_RESPONSE_ERROR = prefix + 'SET_RESPONSE_ERROR',
  SET_FORM_ERROR = prefix + 'SET_FORM_ERROR',
  SET_SUCCESS_MESSAGE = prefix + 'SET_SUCCESS_MESSAGE',

  SET_IS_POSTS_FETCHING = prefix + 'SET_IS_DATA_FETCHING',

  SET_IS_DELETING_POST = prefix + 'SET_IS_DELETING_POST',
  SET_IS_SAVING_POST = prefix + 'SET_IS_SAVING_POST',
}
