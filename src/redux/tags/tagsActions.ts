import { Tag } from '../../models/Tag'
import { InferActionsType } from '../store'
import { TagsConstants } from './TagsConstants'

export type AppTagsAction = InferActionsType<typeof TagsActions>

export const TagsActions = {
  setTags: (tags: Tag[]) => ({ type: TagsConstants.SET_TAGS, payload: tags }),
}
