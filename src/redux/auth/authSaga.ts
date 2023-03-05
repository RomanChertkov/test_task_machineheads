import { call, takeEvery, put, takeLatest, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { AxiosResponse } from 'axios'
import { AuthConstants } from './authConstants'
import { LoginData, UserProfile } from '../../models/UserProfile'
import { RootState, actionWithPayload } from '../store'
import { AuthService } from '../../http/authService'
import { AuthResponse } from '../../models/Auth'
import { authActions } from './authActions'
import AppCookie from // clearTokensFromCookie,
// setTokensInCookie,
// getCookieByKey,,

'../../utils/cookieUtils'

function* authWorker(action: actionWithPayload<LoginData>) {
  yield put(authActions.setIsFetchingData())
  yield put(authActions.setAuthErrorMessage(''))

  try {
    const result: AxiosResponse<AuthResponse> = yield call(
      AuthService.login,
      action.payload
    )

    AppCookie.setTokensInCookie(result.data)

    yield put(authActions.setIsAuth(true))

    const profileInfo: AxiosResponse<UserProfile> = yield call(
      AuthService.getUserProfile
    )
    yield put(authActions.setProfileInfo(profileInfo.data))
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(authActions.setAuthErrorMessage(error.message))
    }
  } finally {
    yield put(authActions.setIsFetchingData())
  }
}

function* checkAuthToken() {
  const token = AppCookie.getCookieByKey('token')
  const refreshToken = AppCookie.getCookieByKey('refresh_token')

  const isAuth: boolean = yield select((state: RootState) => state.auth.isAuth)

  if (token && !isAuth) {
    yield put(authActions.setIsAuth(true))
  }

  if (!token && refreshToken) {
    try {
      const result: AxiosResponse<AuthResponse> = yield call(
        AuthService.refreshBothTokens,
        refreshToken
      )

      AppCookie.setTokensInCookie(result.data)

      yield put(authActions.setIsAuth(true))
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        yield put(authActions.setAuthErrorMessage(error.message))
      }
    }
  }

  const profile: UserProfile = yield select(
    (state: RootState) => state.auth.profile
  )

  if (!profile.id && isAuth) {
    const profileInfo: AxiosResponse<UserProfile> = yield call(
      AuthService.getUserProfile
    )
    yield put(authActions.setProfileInfo(profileInfo.data))
  }
}

function* logoutAndClearData() {
  AppCookie.clearTokensFromCookie()
  yield put(authActions.setIsAuth(false))
  yield put(authActions.setProfileInfo({} as UserProfile))
}

export function* authWather() {
  yield takeLatest(LOCATION_CHANGE, checkAuthToken)
  yield takeEvery(AuthConstants.GET_AUTH_DATA, authWorker)
  yield takeEvery(AuthConstants.LOGOUT_FROM_ACCOUNT, logoutAndClearData)
}
