const prefix = 'posts'
export enum PostsConstants {
  SET_POSTS = `${prefix}/SET_POSTS`,
  SET_IS_DATA_FETCHING = `${prefix}/SET_IS_DATA_FETCHING`,
  SET_CURRENT_POST_DATA = `${prefix}/CURRENT_POST_DATA`,
  IS_POST_SAVING = `${prefix}/IS_POST_SAVING`,
  UPDATE_POST = `${prefix}/UPDATE_POST`,
  ADD_POST = `${prefix}/ADD_POST`,
  SET_SAVING_ERRORS = `${prefix}/SET_SAVING_ERRORS`,
  GET_POST_DETAIL = `${prefix}/GET_POST_DETAIL`,
}
