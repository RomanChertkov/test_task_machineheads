import { call, put, select, takeLatest } from 'redux-saga/effects'
import { RootState } from '../store'
import { AxiosResponse } from 'axios'
import { TagsService } from '../../http/TagsService'
import { Tag } from '../../models/Tag'
import { TagsActions } from './tagsActions'
import { LOCATION_CHANGE } from 'connected-react-router'

function* getTags() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )

  if (pathname === '/tags') {
    try {
      const tagsList: AxiosResponse<Tag[]> = yield call(TagsService.getAllTags)
      yield put(TagsActions.setTags(tagsList.data))
    } catch (error) {}
  }
}

export function* tagsWather() {
  yield takeLatest(LOCATION_CHANGE, getTags)
}
