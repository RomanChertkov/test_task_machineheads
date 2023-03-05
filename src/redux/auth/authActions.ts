import { AuthConstants } from './authConstants'
import { LoginData, UserProfile } from '../../models/UserProfile'
import { InferActionsType } from '../store'

export type AppAuthActions = InferActionsType<typeof authActions>

export const authActions = {
  setIsAuth: (flag: boolean) =>
    ({
      type: AuthConstants.SET_IS_AUTH,
      payload: flag,
    } as const),

  getAuthData: (LoginFormData: LoginData) =>
    ({
      type: AuthConstants.GET_AUTH_DATA,
      payload: LoginFormData,
    } as const),

  setIsFetchingData: () =>
    ({
      type: AuthConstants.IS_FETHCHING_AUTH_DATA,
    } as const),

  setAuthErrorMessage: (errorMessage: string) =>
    ({
      type: AuthConstants.SET_AUTH_ERROR_MESSAGE,
      payload: errorMessage,
    } as const),

  setProfileInfo: (profileInfo: UserProfile) =>
    ({
      type: AuthConstants.SET_PROFILE_INFO,
      payload: profileInfo,
    } as const),

  logout: () =>
    ({
      type: AuthConstants.LOGOUT_FROM_ACCOUNT,
    } as const),
}
