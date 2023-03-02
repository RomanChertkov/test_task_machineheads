import { call, takeEvery, put, takeLatest, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { AxiosResponse } from 'axios'
import { AuthConstants } from './authConstants'
import { LoginData, UserProfile } from '../../models/UserProfile'
import { actionWithPayload } from '../store'
import {
  getUserProfile,
  login,
  refreshBothTokens,
} from '../../http/authService'
import { AuthResponse } from '../../models/Auth'
import {
  setAuthErrorMessage,
  setIsAuth,
  setIsFetchingData,
  setProfileInfo,
} from './authActions'
import {
  clearTokensFromCookie,
  setTokensInCookie,
  getCookieByKey,
} from '../../utils/cookieUtils'

function* authWorker(action: actionWithPayload<LoginData>) {
  yield put(setIsFetchingData())
  yield put(setAuthErrorMessage(''))

  try {
    const result: AxiosResponse<AuthResponse> = yield call(
      login,
      action.payload
    )

    setTokensInCookie(result.data)

    yield put(setIsAuth(true))

    const profileInfo: AxiosResponse<UserProfile> = yield call(getUserProfile)
    yield put(setProfileInfo(profileInfo.data))
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setAuthErrorMessage(error.message))
    }
  } finally {
    yield put(setIsFetchingData())
  }
}

function* checkAuthToken() {
  const token = getCookieByKey('token')
  const refreshToken = getCookieByKey('refresh_token')

  const isAuth: boolean = yield select((state) => state.auth.isAuth)

  if (token && !isAuth) {
    yield put(setIsAuth(true))
  }

  if (!token && refreshToken) {
    try {
      const result: AxiosResponse<AuthResponse> = yield call(
        refreshBothTokens,
        refreshToken
      )

      setTokensInCookie(result.data)

      yield put(setIsAuth(true))
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        yield put(setAuthErrorMessage(error.message))
      }
    }
  }

  const profile: UserProfile = yield select((state) => state.auth.profile)

  if (!profile.id && isAuth) {
    const profileInfo: AxiosResponse<UserProfile> = yield call(getUserProfile)
    yield put(setProfileInfo(profileInfo.data))
  }
}

function* logoutAndClearData() {
  clearTokensFromCookie()
  yield put(setIsAuth(false))
  yield put(setProfileInfo({} as UserProfile))
}

export function* authWather() {
  yield takeLatest(LOCATION_CHANGE, checkAuthToken)
  yield takeEvery(AuthConstants.GET_AUTH_DATA, authWorker)
  yield takeEvery(AuthConstants.LOGOUT_FROM_ACCOUNT, logoutAndClearData)
}
