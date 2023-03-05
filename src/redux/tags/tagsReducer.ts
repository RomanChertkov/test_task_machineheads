import { Tag } from '../../models/Tag'
import { TagsConstants } from './TagsConstants'
import { AppTagsAction } from './tagsActions'

type TagsState = typeof initialState

const initialState = {
  tags: [] as Tag[],
  currentTag: {} as Tag,
}

export const tagsReducer = (
  state = initialState,
  action: AppTagsAction
): TagsState => {
  switch (action.type) {
    case TagsConstants.SET_TAGS:
      return { ...state, tags: action.payload }
    default:
      return state
  }
}
