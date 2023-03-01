import { AnyAction } from 'redux'
import { AuthConstants } from './authConstants'
import { LoginData, UserProfile } from '../../models/UserProfile'

export const setIsAuth = (flag: boolean): AnyAction => ({
  type: AuthConstants.SET_IS_AUTH,
  payload: flag,
})

export const getAuthData = (LoginFormData: LoginData): AnyAction => ({
  type: AuthConstants.GET_AUTH_DATA,
  payload: LoginFormData,
})

export const setIsFetchingData = (): AnyAction => ({
  type: AuthConstants.IS_FETHCHING_AUTH_DATA,
})

export const setAuthErrorMessage = (errorMessage: string): AnyAction => ({
  type: AuthConstants.SET_AUTH_ERROR_MESSAGE,
  payload: errorMessage,
})

export const setProfileInfo = (profileInfo: UserProfile): AnyAction => ({
  type: AuthConstants.SET_PROFILE_INFO,
  payload: profileInfo,
})

export const logout = (): AnyAction => ({
  type: AuthConstants.LOGOUT_FROM_ACCOUNT,
})
