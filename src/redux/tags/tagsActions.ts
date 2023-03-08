import { FormError, ResponseError } from '../../models/Errors'
import { EditTag, NewTag, Tag } from '../../models/Tag'
import { InferActionsType } from '../store'
import { TagsConstants } from './TagsConstants'

export type AppTagsAction = InferActionsType<typeof TagsActions>

export const TagsActions = {
  setTags: (tags: Tag[]) =>
    ({
      type: TagsConstants.SET_TAGS,
      payload: tags,
    } as const),
  getTags: () =>
    ({
      type: TagsConstants.GET_TAGS,
    } as const),

  getTagDetails: (tagId: number) =>
    ({
      type: TagsConstants.GET_TAG_DETAILS,
      payload: tagId,
    } as const),

  setCurrentTagDetails: (currentTag: Tag) =>
    ({
      type: TagsConstants.SET_CURRENT_TAG,
      payload: currentTag,
    } as const),

  addTag: (newTag: NewTag) =>
    ({
      type: TagsConstants.ADD_TAG,
      payload: newTag,
    } as const),

  editTag: (editTag: EditTag) =>
    ({
      type: TagsConstants.EDIT_TAG,
      payload: editTag,
    } as const),

  deleteTag: (tagId: number) =>
    ({
      type: TagsConstants.DEL_TAG,
      payload: tagId,
    } as const),

  setSuccessMessage: (message: string) =>
    ({
      type: TagsConstants.SET_SUCCESS_MESSAGE,
      payload: message,
    } as const),

  setResponseError: (responseError: ResponseError) =>
    ({
      type: TagsConstants.SET_RESPONSE_ERROR,
      payload: responseError,
    } as const),

  setFormErrors: (formErrors: FormError[]) =>
    ({
      type: TagsConstants.SET_FORM_ERROR,
      payload: formErrors,
    } as const),
}
