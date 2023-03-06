import { FormError, ResponseError } from '../../models/Errors'
import { Tag } from '../../models/Tag'
import { TagsConstants } from './TagsConstants'
import { AppTagsAction } from './tagsActions'

type TagsState = typeof initialState

const initialState = {
  tags: [] as Tag[],
  currentTag: {} as Tag,
  responseErrors: {} as ResponseError,
  formErrors: [] as FormError[],
  isDataFetching: false,
  successMessage: '',
}

export const tagsReducer = (
  state = initialState,
  action: AppTagsAction
): TagsState => {
  switch (action.type) {
    case TagsConstants.SET_TAGS:
      return { ...state, tags: action.payload }

    case TagsConstants.SET_CURRENT_TAG:
      return { ...state, currentTag: action.payload }

    case TagsConstants.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }

    case TagsConstants.SET_RESPONSE_ERROR:
      return { ...state, responseErrors: action.payload }

    case TagsConstants.SET_FORM_ERROR:
      return { ...state, formErrors: action.payload }

    default:
      return state
  }
}
